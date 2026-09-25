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

/**
 * Collects what `/release-notify` needs for its draft, as JSON on stdout: the
 * release range, its Jira tickets, and for each ticket the reporter and Slack
 * thread that `/slack-triage` recorded in the description.
 *
 * Needs JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN in ./.env and an
 * authenticated `gh`.
 *
 * Defaults to the two most recent tags; --from=<tag> --to=<tag> override it.
 */
import { execFileSync } from 'child_process'
import fs from 'fs'

const FIELD = '\x1f'
const RECORD = '\x1e'
const PROJECT_KEY = 'INSTUI'
const ISSUE_KEY = /(?<![A-Za-z0-9])([A-Za-z]{4,7})-(\d{3,5})(?!\d)/g

const SLACK_PERMALINK =
  /https?:\/\/[a-z0-9-]+\.slack\.com\/archives\/[a-z0-9]+\/p\d{10,}(?:\?[^\s"'<>|)\]]*)?/gi

// Written by /slack-triage; the value is the Slack display name verbatim.
const REPORTED_BY = /Reported by \(Slack\):\s*([^"\\\n]+)/

// Accepts typo'd prefixes (ISTUI, INSUTI) but not lookalikes such as the design
// token `gray-700`, which Jira would happily resolve to a real old ticket.
const isProjectPrefix = (prefix) =>
  [...new Set(prefix.toUpperCase())].every((letter) =>
    PROJECT_KEY.includes(letter)
  )

const option = (name, fallback) => {
  const found = process.argv.slice(2).find((arg) => arg.startsWith(`--${name}=`))
  return found ? found.slice(name.length + 3) : fallback
}

const env = (() => {
  const file = Object.fromEntries(
    (fs.existsSync('./.env') ? fs.readFileSync('./.env', 'utf8') : '')
      .split('\n')
      .map((line) => line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/))
      .filter(Boolean)
      .map(([, key, value]) => [key, value.replace(/^["']|["']$/g, '')])
  )
  return (name) => process.env[name] || file[name] || null
})()

const sh = (command, args) =>
  execFileSync(command, args, {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'pipe']
  }).trim()

const shOrNull = (command, args) => {
  try {
    return sh(command, args) || null
  } catch {
    return null
  }
}

export const issueKeysIn = (text) => [
  ...new Set(
    [...String(text ?? '').matchAll(ISSUE_KEY)]
      .filter(([, prefix]) => isProjectPrefix(prefix))
      .map(([, , number]) => `${PROJECT_KEY}-${number}`)
  )
]

/** Reads the description as serialized ADF, so link marks match as well as text. */
const describedIn = (description) =>
  typeof description === 'string'
    ? description
    : JSON.stringify(description ?? '')

export const reporterIn = (description) =>
  describedIn(description).match(REPORTED_BY)?.[1].trim() || null

/** A reply link carries the thread root in `thread_ts`; point at the root instead. */
export const threadLinkIn = (description) => {
  const link = describedIn(description).match(SLACK_PERMALINK)?.[0]
  if (!link) return null
  const threadTs = new URL(link).searchParams.get('thread_ts')
  return threadTs
    ? link.replace(/\/p\d+.*$/, `/p${threadTs.replace('.', '')}`)
    : link
}

const releaseRange = () => {
  const tags = (shOrNull('git', ['tag', '--list', 'v*', '--sort=-v:refname']) ?? '')
    .split('\n')
    .filter(Boolean)
  const to = option('to', tags[0])
  const from = option('from', tags[tags.indexOf(to) + 1])
  if (!from || !to) {
    throw new Error('cannot resolve the tag range — pass --from= and --to=')
  }
  const slug = shOrNull('gh', [
    'repo',
    'view',
    '--json',
    'nameWithOwner',
    '--jq',
    '.nameWithOwner'
  ])
  return {
    from,
    to,
    slug,
    releaseUrl:
      shOrNull('gh', ['release', 'view', to, '--json', 'url', '--jq', '.url']) ??
      (slug ? `https://github.com/${slug}/releases/tag/${to}` : null)
  }
}

/** Squash merges drop the branch name, so the PR is the only place to find it. */
const commitsWithPullRequests = ({ from, to, slug }) =>
  sh('git', [
    'log',
    '--no-merges',
    `--format=%H${FIELD}%s${FIELD}%b${RECORD}`,
    `${from}..${to}`
  ])
    .split(RECORD)
    .map((record) => record.trim())
    .filter(Boolean)
    .map((record) => {
      const [sha, subject, body = ''] = record.split(FIELD)
      return { sha: sha.trim(), subject: subject.trim(), body: body.trim() }
    })
    .filter(({ subject }) => !subject.startsWith('chore(release)'))
    .map((commit) => {
      const raw = slug
        ? shOrNull('gh', [
            'api',
            `repos/${slug}/commits/${commit.sha}/pulls`,
            '--jq',
            '.[0] | select(. != null) | {url: .html_url, branch: .head.ref, title, body}'
          ])
        : null
      const pr = raw ? JSON.parse(raw) : null
      return {
        prUrl: pr?.url ?? null,
        keys: issueKeysIn(
          [commit.subject, commit.body, pr?.branch, pr?.title, pr?.body].join('\n')
        )
      }
    })

const jiraTickets = async (keys) => {
  const authorization = `Basic ${Buffer.from(
    `${env('JIRA_EMAIL')}:${env('JIRA_API_TOKEN')}`
  ).toString('base64')}`
  const tickets = []
  for (const key of keys) {
    const response = await fetch(
      `${env('JIRA_BASE_URL')}/rest/api/3/issue/${key}?fields=summary,description`,
      { headers: { Authorization: authorization, Accept: 'application/json' } }
    )
    // A 404 means a typo'd key normalized onto a number that does not exist.
    if (response.status === 404) continue
    if (!response.ok) throw new Error(`jira ${key}: HTTP ${response.status}`)
    const { fields } = await response.json()
    tickets.push({
      key,
      summary: fields?.summary ?? null,
      reportedBy: reporterIn(fields?.description),
      threadLink: threadLinkIn(fields?.description)
    })
  }
  return tickets
}

const main = async () => {
  const missing = ['JIRA_BASE_URL', 'JIRA_EMAIL', 'JIRA_API_TOKEN'].filter(
    (name) => !env(name)
  )
  if (missing.length) {
    throw new Error(`missing in ./.env: ${missing.join(', ')}`)
  }
  const log = (message) => process.stderr.write(`release-notify: ${message}\n`)

  const range = releaseRange()
  log(`range ${range.from}..${range.to}`)
  const commits = commitsWithPullRequests(range)
  const keys = [...new Set(commits.flatMap((commit) => commit.keys))]
  log(`${commits.length} commits, ${keys.length} issue keys`)

  const tickets = await jiraTickets(keys)
  log(
    `${tickets.length} tickets, ${tickets.filter((t) => t.reportedBy).length} with a reporter`
  )

  process.stdout.write(
    `${JSON.stringify(
      {
        range: { from: range.from, to: range.to, releaseUrl: range.releaseUrl },
        tickets: tickets.map((ticket) => ({
          ...ticket,
          prUrls: [
            ...new Set(
              commits
                .filter((commit) => commit.keys.includes(ticket.key))
                .map((commit) => commit.prUrl)
                .filter(Boolean)
            )
          ]
        }))
      },
      null,
      2
    )}\n`
  )
}

if (process.argv[1]?.endsWith('gather.mjs')) {
  main().catch((error) => {
    process.stderr.write(`release-notify: ${error.message}\n`)
    process.exit(1)
  })
}
