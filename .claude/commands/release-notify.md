---
description: Draft a Slack message that credits the people whose reported issues got fixed in the latest release — gathers the release's Jira tickets and the channel's threads, works out who reported what, and hands you a copy-pasteable block
---

Work out who reported the issues fixed in the **latest release**, and produce a **copy-pasteable Slack message** that credits them by name.

Usage: `/release-notify` — no arguments. The range is always the two most recent `v*` tags.

## Behavior contract (do not deviate)

- **Never post anything to Slack.** You produce a draft; the user posts it. The token is read-only by design — don't look for a post tool.
- **The reporter is the author of the thread's root message.** Whoever pasted the Jira link into the thread is the _developer_. Tagging them instead is this skill's worst failure mode: it credits our own team and misses the actual reporter.
- **Read the threads, don't just count the fields.** The JSON gives you every message. A root author discussing their own PR or gerrit CL is a contributor, not a reporter — no metadata reveals that, only the text does.
- **Never invent a person, thread or link.** Everything in the draft comes from the gathered JSON. Unsure means unresolved, not guessed.
- **A commit with no Jira key is internal work.** Nobody to notify; don't speculate.
- **Don't decide a genuine ambiguity.** Show the options and ask.

## Config

- Jira project: **`INSTUI`**. The script normalizes typo'd prefixes (`ISTUI`, `INSUTI`) and drops keys Jira 404s.
- Channel: `#instui` (`C0JCJ63TR`), both the release-notes channel and where reports land.
- Credentials in the root `.env`: `SLACK_BOT_TOKEN` (read-only, bot must be a channel member) and `JIRA_BASE_URL` / `JIRA_EMAIL` / `JIRA_API_TOKEN`. Missing or broken → tell the user to run `/slack-setup`.
- Private channels are out of scope (no `groups:history`).

## Step 1 — Gather

```sh
node scripts/release-notify/gather.mjs
```

**Takes about 2.5 minutes** — every thread in the window is fetched, throttled for the rate limit. That's not a hang. Progress goes to stderr, the JSON to stdout; write it to a temp file if you want to re-read it.

It gathers and narrows but never judges:

- `range` — tags plus the release URL for the draft's header
- `tickets[]` — `key`, `summary`, `slackLinks` (permalinks found in the Jira description), `prUrls`
- `threads[]` — `channel`, `threadTs`, `keys` (issue keys quoted anywhere in the thread), `linkedFromTicket`, and every `messages[]` entry with `author`, `bot`, `isRoot`, `text`
- `users` — author id → display name
- `commitsWithoutKey`, `unknownKeys`

Report the shape in one line before going on: _"22 tickets, 35 relevant threads, 9 commits with no key."_

## Step 2 — Pair each ticket with its threads

Two directions, both of which matter because either can be missing:

- **From Jira:** the ticket's `slackLinks` → the thread whose `threadTs` matches. Reply links carry `thread_ts` in the query and the script already resolved them to the root, so match `threadTs` directly.
- **From Slack:** any thread whose `keys` contain the ticket's key.

Both pointing at the same thread is the strongest signal. Measured on a recent release: 6 of 22 tickets had a Jira link, and the scan found others independently — neither direction substitutes for the other.

## Step 3 — Decide who gets credited

For each paired thread the root message's author is the _candidate_. Rule these out:

- **`bot: true` on the root** — in practice the release-notes thread: the GitHub app posts it and developers reply with issue keys, so it looks like it reported everything. Measured live: one such thread quoted five different keys.
- **The key appears in the root message** — the developer opened the thread about their own work.
- **The root author also wrote the message carrying the key** — internal work.
- **The thread reads as developer discussion** — the root author shares their own CL/PR and later says the fix is up. Real case: two tickets both linked one thread whose root author was a contributor discussing his own PRs. Only the text shows this, so read it.

Then weigh what's left:

- **Three or more keys in the thread** → status/catch-all thread; ask rather than credit. **Two is normal** — a report often spawns a follow-up ticket and the root author reported both.
- **One thread linked from several tickets** → usually a developer thread pasted into each; ask.
- **Two or more plausible reporter threads for one ticket** → ask, don't pick.

Group by person: one line per human even with several issues.

## Step 4 — The draft

One fenced block, Slack mrkdwn, no user IDs and no internal paths — the user pastes it verbatim:

```
*InstUI 11.7.5* — <https://github.com/instructure/instructure-ui/releases/tag/v11.7.5|release notes>

@panna.kristof: the Checkbox toggle accessibility issue you raised <https://instructure.slack.com/…|here> is fixed — <https://github.com/…/pull/2673|#2673>
@tamas.laszlo: the Checkbox hint alignment issue you raised <https://instructure.slack.com/…|here> is fixed — <https://github.com/…/pull/2674|#2674>
```

- One sentence per person, written from the Jira `summary` in words the reporter would recognize — not the ticket title verbatim, not the commit subject. Strip boilerplate like `Fix: [Checkbox]`.
- `<url|text>` links so it isn't a wall of URLs. Several issues for one person: one line, links comma-separated.
- No emojis.

**Tell the user plainly:** Slack does not turn pasted text into real mentions. They must retype each `@` in the composer and pick from the autocomplete, or nobody is notified.

## Step 5 — Under the block, in chat (not in it)

- **Name → user ID** table, so two people with the same display name can be told apart.
- **Which direction** resolved each person, one line.
- **Needs a decision** — every "ask" case from Step 3, with its threads, as an explicit question. Don't bury these; a wrong guess tags the wrong person.
- **Unresolved** — keys where neither direction found a report thread. A ticket with no Slack link and no key quoted in the channel is invisible here, so a real reporter may be hiding. Some are unreachable in principle: if the report thread never quoted the key and the ticket never linked the thread, no automation can connect them.
- **Skipped** — count and reason, so a wrongly-skipped person can be caught.

## Step 6 — Summarize

Range, how many people to credit, how many unresolved, and that the draft is ready. If the unresolved list is long, say so — it means the Slack-link step of `/slack-triage` is being skipped upstream, and that's worth fixing at the source.
