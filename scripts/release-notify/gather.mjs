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
 * Collects everything `/release-notify` needs to work out who reported the
 * issues fixed in the latest release, and prints it as JSON on stdout.
 *
 * It gathers and narrows, but never judges: deciding who the reporter is, and
 * whether a thread is a report at all, is left to the skill reading this JSON.
 *
 * Needs SLACK_BOT_TOKEN, JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN in ./.env,
 * an authenticated `gh`, and the bot to be a member of the channel.
 *
 * Options: --channel=<id> --months=<n> --from=<tag> --to=<tag>
 */
import { execFileSync } from 'child_process'
import fs from 'fs'

const DEFAULT_CHANNEL = 'C0JCJ63TR'
const DEFAULT_MONTHS = 6
const REPLIES_THROTTLE_MS = 1200
const FIELD = '\x1f'
const RECORD = '\x1e'

const ISSUE_KEY = /(?<![A-Za-z0-9])([A-Za-z]{4,7})-(\d{3,5})(?!\d)/g
const PROJECT_KEY = 'INSTUI'

// Accepts typo'd prefixes (ISTUI, INSUTI) but not lookalikes such as the design
// token `gray-700`, which Jira would happily resolve to a real old ticket.
const isProjectPrefix = (prefix) =>
  [...new Set(prefix.toUpperCase())].every((letter) =>
    PROJECT_KEY.includes(letter)
  )

export const SLACK_PERMALINK =
  /https?:\/\/[a-z0-9-]+\.slack\.com\/archives\/([a-z0-9]+)\/p(\d{10,})(\?[^\s"'<>|)\]]*)?/gi

const option = (name, fallback) => {
  const found = process.argv
    .slice(2)
    .find((arg) => arg.startsWith(`--${name}=`))
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

export const permalinksIn = (value) => [
  ...new Set(
    (typeof value === 'string' ? value : JSON.stringify(value ?? '')).match(
      SLACK_PERMALINK
    ) ?? []
  )
]

/** `/archives/C123/p1712345678123456` carries the ts without its decimal point. */
export const threadRefOf = (permalink) => {
  const match = new RegExp(SLACK_PERMALINK.source, 'i').exec(permalink ?? '')
  if (!match) return null
  const [, channel, digits, query = ''] = match
  const messageTs = `${digits.slice(0, -6)}.${digits.slice(-6)}`
  const threadTs = new URLSearchParams(query.replace(/^\?/, '')).get('thread_ts')
  return { channel: channel.toUpperCase(), threadTs: threadTs || messageTs }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const slack = async (method, params, attempt = 0) => {
  const url = new URL(`https://slack.com/api/${method}`)
  for (const [name, value] of Object.entries(params)) {
    if (value != null) url.searchParams.set(name, String(value))
  }
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${env('SLACK_BOT_TOKEN')}` }
  })
  if (response.status === 429 && attempt < 3) {
    await sleep((Number(response.headers.get('retry-after')) || 5) * 1000 + 1000)
    return slack(method, params, attempt + 1)
  }
  const body = await response.json()
  if (!body.ok) throw new Error(`slack ${method}: ${body.error}`)
  return body
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
      const pr = slug
        ? shOrNull('gh', [
            'api',
            `repos/${slug}/commits/${commit.sha}/pulls`,
            '--jq',
            '.[0] | select(. != null) | {number, url: .html_url, branch: .head.ref, title, body}'
          ])
        : null
      const pullRequest = pr ? JSON.parse(pr) : null
      return {
        ...commit,
        prNumber: pullRequest?.number ?? null,
        prUrl: pullRequest?.url ?? null,
        keys: issueKeysIn(
          [
            commit.subject,
            commit.body,
            pullRequest?.branch,
            pullRequest?.title,
            pullRequest?.body
          ].join('\n')
        )
      }
    })

const jiraTickets = async (keys) => {
  const authorization = `Basic ${Buffer.from(
    `${env('JIRA_EMAIL')}:${env('JIRA_API_TOKEN')}`
  ).toString('base64')}`
  const tickets = []
  const unknownKeys = []
  for (const key of keys) {
    const response = await fetch(
      `${env('JIRA_BASE_URL')}/rest/api/3/issue/${key}?fields=summary,description`,
      { headers: { Authorization: authorization, Accept: 'application/json' } }
    )
    if (response.status === 404) {
      unknownKeys.push(key)
      continue
    }
    if (!response.ok) throw new Error(`jira ${key}: HTTP ${response.status}`)
    const { fields } = await response.json()
    tickets.push({
      key,
      summary: fields?.summary ?? null,
      slackLinks: permalinksIn(fields?.description)
    })
  }
  return { tickets, unknownKeys }
}

/**
 * Keeps only threads that quote an issue key or that a ticket links to; keys
 * live in replies, so every thread has to be fetched before it can be filtered.
 */
const relevantThreads = async ({ channel, months, linkedRefs, log }) => {
  const oldest = Math.floor(Date.now() / 1000) - months * 30 * 24 * 60 * 60
  const roots = []
  let cursor
  do {
    const page = await slack('conversations.history', {
      channel,
      limit: 200,
      oldest,
      cursor
    })
    roots.push(...(page.messages ?? []))
    cursor = page.response_metadata?.next_cursor || null
  } while (cursor)

  const linked = new Set(
    linkedRefs.filter((ref) => ref.channel === channel).map((ref) => ref.threadTs)
  )
  const candidates = roots.filter(
    (message) => message.reply_count || linked.has(message.ts)
  )
  log(`fetching ${candidates.length} of ${roots.length} threads`)

  const threads = []
  for (const [index, root] of candidates.entries()) {
    if (index > 0) await sleep(REPLIES_THROTTLE_MS)
    const { messages = [] } = await slack('conversations.replies', {
      channel,
      ts: root.ts,
      limit: 200,
      inclusive: true
    })
    const texts = messages.map((message) => message.text ?? '').join('\n')
    if (!linked.has(root.ts) && issueKeysIn(texts).length === 0) continue
    threads.push({
      channel,
      threadTs: root.ts,
      keys: issueKeysIn(texts),
      linkedFromTicket: linked.has(root.ts),
      messages: messages.map((message) => ({
        author: message.user ?? null,
        bot: Boolean(message.bot_id) && !message.user,
        isRoot: message.ts === root.ts,
        text: message.text ?? ''
      }))
    })
  }
  return threads
}

const withDisplayNames = async (threads) => {
  const names = new Map()
  for (const thread of threads) {
    for (const message of thread.messages) {
      if (!message.author || names.has(message.author)) continue
      const { user } = await slack('users.info', { user: message.author })
      names.set(message.author, {
        name:
          user?.profile?.display_name?.trim() ||
          user?.profile?.real_name?.trim() ||
          message.author,
        isBot: Boolean(user?.is_bot)
      })
    }
  }
  return Object.fromEntries(names)
}

const main = async () => {
  const missing = [
    'SLACK_BOT_TOKEN',
    'JIRA_BASE_URL',
    'JIRA_EMAIL',
    'JIRA_API_TOKEN'
  ].filter((name) => !env(name))
  if (missing.length) {
    throw new Error(`missing in ./.env: ${missing.join(', ')} — see /slack-setup`)
  }
  const log = (message) => process.stderr.write(`release-notify: ${message}\n`)
  const channel = option('channel', DEFAULT_CHANNEL)
  const months = Number(option('months', DEFAULT_MONTHS))

  const range = releaseRange()
  log(`range ${range.from}..${range.to}`)
  const commits = commitsWithPullRequests(range)
  const keys = [...new Set(commits.flatMap((commit) => commit.keys))]
  log(`${commits.length} commits, ${keys.length} issue keys`)

  const { tickets, unknownKeys } = await jiraTickets(keys)
  const linkedRefs = tickets
    .flatMap((ticket) => ticket.slackLinks.map(threadRefOf))
    .filter(Boolean)
  log(`${tickets.length} tickets, ${linkedRefs.length} linked from Jira`)

  const threads = await relevantThreads({ channel, months, linkedRefs, log })
  log(`${threads.length} relevant threads`)

  process.stdout.write(
    `${JSON.stringify(
      {
        range: { from: range.from, to: range.to, releaseUrl: range.releaseUrl },
        commitsWithoutKey: commits.filter((commit) => !commit.keys.length).length,
        unknownKeys,
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
        })),
        threads,
        users: await withDisplayNames(threads)
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
