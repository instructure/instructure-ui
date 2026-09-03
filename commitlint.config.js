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

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const ignoredPackages = ['__docs__']

function getChangedPackages() {
  try {
    const output = execSync('git diff --cached --name-only', {
      encoding: 'utf-8'
    })
    return Array.from(
      new Set(
        output
          .split('\n')
          .filter((line) => line.startsWith('packages/'))
          .map((line) => line.split('/')[1])
          .filter((pkg) => !ignoredPackages.includes(pkg))
      )
    )
  } catch (error) {
    console.error(error.message)
    return []
  }
}

function getAllPackages() {
  try {
    const packagesDir = path.resolve('packages')
    return fs
      .readdirSync(packagesDir)
      .filter(
        (pkg) =>
          fs.statSync(path.join(packagesDir, pkg)).isDirectory() &&
          !ignoredPackages.includes(pkg)
      )
  } catch (error) {
    console.error(error.message)
    return []
  }
}

// Trailers and ticket ids carry no prose, so they don't count towards the body
// limits.
const isTrailer = (line) =>
  /^[A-Za-z][A-Za-z-]*:\s/.test(line) ||
  /^[A-Z][A-Z0-9]+-\d+$/.test(line) ||
  line.startsWith('🤖')

function bodyLines(raw) {
  return (raw || '')
    .split('\n')
    .slice(1)
    .map((line) => line.trim())
    .filter((line) => line !== '' && !line.startsWith('#') && !isTrailer(line))
}

/**
 * Caps body length. Set well above the longest real commit so it only catches a
 * body that has turned into a full changelog of the diff.
 */
function bodyMaxLines(parsed, _when, max) {
  const count = bodyLines(parsed.raw).length
  return [
    count <= max,
    `body has ${count} lines, the limit is ${max}. Explain why the change was ` +
      'made; the diff already covers what changed.'
  ]
}

/**
 * Rejects a body shaped like a changelog: grouped under several headings, or a
 * long bullet list naming the files that changed. Thresholds sit above the
 * heaviest legitimate usage in this repo - one "The fixes:" style lead-in and a
 * handful of bullets are fine.
 */
function bodyNoChangelog(parsed) {
  const lines = bodyLines(parsed.raw)
  const headings = lines.filter((line) =>
    /^[A-Z][A-Za-z /()]{2,40}:$/.test(line)
  )
  const bullets = lines.filter((line) => /^[-*] /.test(line))
  const pathBullets = bullets.filter((line) =>
    /(packages\/|scripts\/|\.(ts|tsx|js|jsx|mjs|cjs|json|ya?ml|md)\b)/.test(
      line
    )
  )

  if (headings.length > 1) {
    return [
      false,
      `body groups changes under ${headings.length} headings (${headings.join(
        ' '
      )}). ` + 'Write prose explaining why, not a grouped changelog.'
    ]
  }
  if (bullets.length > 12) {
    return [
      false,
      `body has ${bullets.length} bullets. Summarise the reason for the change instead.`
    ]
  }
  if (pathBullets.length > 6) {
    return [
      false,
      `body lists ${pathBullets.length} changed files. The diff already lists them.`
    ]
  }
  return [true, '']
}

module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'body-max-lines': bodyMaxLines,
        'body-no-changelog': bodyNoChangelog
      }
    }
  ],
  // https://commitlint.js.org/reference/rules.html
  rules: {
    // The header is unbounded because multi-package scopes are long, e.g.
    // `fix(ui-drawer-layout,ui-a11y-utils):`. The subject itself is capped.
    'header-max-length': [0, 'always', 150], // 0 === rule is disabled
    'subject-max-length': [2, 'always', 72],
    'body-max-line-length': [2, 'always', 100],
    'body-max-lines': [2, 'always', 28],
    'body-no-changelog': [2, 'always']
  },

  // https://cz-git.qbb.sh/config/
  prompt: {
    enableMultipleScopes: true,
    scopeEnumSeparator: ',',
    scopes: getAllPackages(),
    defaultScope: getChangedPackages(),
    skipQuestions: ['footerPrefix', 'confirmCommit'],
    // If more than 3 packages are selected display 'many', e.g. `refactor(many): some message`
    formatMessageCB: ({ scope, defaultMessage }) => {
      return scope.split(',').length > 3
        ? defaultMessage.replace(scope, 'many')
        : defaultMessage
    }
  }
}
