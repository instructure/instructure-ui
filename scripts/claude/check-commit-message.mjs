/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * PreToolUse hook. Rejects a `git commit` whose message breaks the rules in
 * .claude/commands/commit.md, so the model gets the reason before the commit is
 * attempted rather than as a commit-msg hook failure afterwards.
 *
 * Thresholds match commitlint.config.js and are calibrated against this repo's
 * history: they sit above the heaviest legitimate commit and below the
 * changelog-shaped ones.
 *
 * Exit 0 to allow, exit 2 to block and send the reasons back to the model.
 * Anything it cannot parse is allowed through - a commit must never fail
 * because a regex did not match.
 */

const SUBJECT_MAX = 72
const BODY_MAX_LINES = 28
const BODY_MAX_LINE_LENGTH = 100
const MAX_HEADINGS = 1
const MAX_BULLETS = 12
const MAX_PATH_BULLETS = 6

// `git commit` at a command position: start of the string, or after a
// separator, optionally preceded by env assignments and git's own flags.
// Anchored so a command that merely quotes "git commit" as data is left alone.
const COMMIT_INVOCATION =
  /(?:^|[\n;&|(]|&&|\|\|)\s*(?:[A-Za-z_][A-Za-z0-9_]*=\S*\s+)*git\s+(?:-\S+\s+)*commit\b/

const isTrailer = (line) =>
  /^[A-Za-z][A-Za-z-]*:\s/.test(line) ||
  /^[A-Z][A-Z0-9]+-\d+$/.test(line) ||
  line.startsWith('🤖')

function readStdin() {
  return new Promise((resolve) => {
    let data = ''
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', (chunk) => (data += chunk))
    process.stdin.on('end', () => resolve(data))
    process.stdin.on('error', () => resolve(''))
  })
}

// Pulls the commit message out of a shell command, handling both the heredoc
// form `/commit` uses and plain -m flags.
function extractMessage(command) {
  const heredoc = command.match(
    /<<-?\s*['"]?(\w+)['"]?\r?\n([\s\S]*?)\r?\n\1\b/
  )
  if (heredoc) {
    return heredoc[2]
  }

  const paragraphs = []
  const flag = /(?:^|\s)-m\s*(?:=\s*)?(['"])([\s\S]*?)\1/g
  let match
  while ((match = flag.exec(command)) !== null) {
    // a -m whose value is a command substitution is not a literal message
    if (!match[2].includes('$(')) {
      paragraphs.push(match[2])
    }
  }
  return paragraphs.length > 0 ? paragraphs.join('\n\n') : null
}

function checkMessage(message) {
  const problems = []
  const all = message.split('\n').filter((line) => !line.startsWith('#'))
  const subject = (all[0] || '').trim()

  if (subject.length > SUBJECT_MAX) {
    problems.push(
      `Subject is ${subject.length} characters, the limit is ${SUBJECT_MAX}. ` +
        'Name the single change being made; drop the enumeration of everything it touches.'
    )
  }

  const body = all
    .slice(1)
    .map((line) => line.trim())
    .filter((line) => line !== '' && !isTrailer(line))

  if (body.length > BODY_MAX_LINES) {
    problems.push(
      `Body has ${body.length} lines, the limit is ${BODY_MAX_LINES}. Explain ` +
        'why the change was made; the diff already covers what changed.'
    )
  }

  const tooLong = body.find((line) => line.length > BODY_MAX_LINE_LENGTH)
  if (tooLong) {
    problems.push(
      `A body line is ${tooLong.length} characters, the limit is ` +
        `${BODY_MAX_LINE_LENGTH}. Hard-wrap the body at 100 columns.`
    )
  }

  const headings = body.filter((line) =>
    /^[A-Z][A-Za-z /()]{2,40}:$/.test(line)
  )
  if (headings.length > MAX_HEADINGS) {
    problems.push(
      `Body groups changes under ${headings.length} headings ` +
        `(${headings.join(
          ' '
        )}). Write prose explaining why, not a grouped changelog.`
    )
  }

  const bullets = body.filter((line) => /^[-*] /.test(line))
  if (bullets.length > MAX_BULLETS) {
    problems.push(
      `Body has ${bullets.length} bullets. Summarise the reason for the change instead.`
    )
  }

  const pathBullets = bullets.filter((line) =>
    /(packages\/|scripts\/|\.(ts|tsx|js|jsx|mjs|cjs|json|ya?ml|md)\b)/.test(
      line
    )
  )
  if (pathBullets.length > MAX_PATH_BULLETS) {
    problems.push(
      `Body lists ${pathBullets.length} changed files. The diff already lists them.`
    )
  }

  if (message.includes('🤖 Generated with')) {
    problems.push(
      'Drop the "🤖 Generated with [Claude Code]" line from commit messages. ' +
        'Keep only the Co-Authored-By trailer; the 🤖 line belongs in PR bodies.'
    )
  }

  return problems
}

const input = await readStdin()

let command
try {
  command = JSON.parse(input)?.tool_input?.command
} catch {
  process.exit(0)
}

if (typeof command !== 'string' || !COMMIT_INVOCATION.test(command)) {
  process.exit(0)
}

const problems = []

if (/\bHUSKY=0\b/.test(command) || /--no-verify\b/.test(command)) {
  problems.push(
    'Do not skip the git hooks (HUSKY=0, --no-verify). A -m commit is already ' +
      'non-interactive, and commit-msg runs commitlint. Fix the cause instead of ' +
      'bypassing the hook.'
  )
}

const message = extractMessage(command)
if (message !== null) {
  problems.push(...checkMessage(message))
}

if (problems.length > 0) {
  console.error(
    'Commit message rejected by scripts/claude/check-commit-message.mjs:\n\n' +
      problems.map((problem) => `- ${problem}`).join('\n') +
      '\n\nSee .claude/commands/commit.md for the rules. Fix the message and retry.'
  )
  process.exit(2)
}

process.exit(0)
