---
description: Draft a Slack message that credits the people whose reported issues got fixed in the latest release — reads the reporter recorded by /slack-triage on each ticket and writes a copy-pasteable block
---

Credit the people whose reported issues were fixed in the **latest release**, as a **copy-pasteable Slack message**.

Usage: `/release-notify` — no arguments. The range is always the two most recent `v*` tags.

## Behavior contract (do not deviate)

- **Never post anything to Slack.** You produce a draft; the user posts it. This skill makes no Slack calls at all.
- **The reporter comes from the ticket, not from judgement.** `/slack-triage` records it in the description's Context Links block at triage time. Read that line; never infer a reporter from anything else.
- **Never invent a person, thread or link.** A ticket with no `Reported by (Slack):` line gets no line in the draft.

## Config

- Jira project: **`INSTUI`**.
- Credentials in the root `.env`: `JIRA_BASE_URL` / `JIRA_EMAIL` / `JIRA_API_TOKEN`, plus an authenticated `gh`. No Slack token needed.

## Step 1 — Gather

```sh
node scripts/release-notify/gather.mjs
```

Prints JSON on stdout: `range` (tags + release URL) and `tickets[]` with `key`, `summary`, `reportedBy`, `threadLink`, `prUrls`. Progress goes to stderr.

If it fails on the tag range, `git fetch --tags` usually fixes it; `--from=` / `--to=` override it.

## Step 2 — Write the draft

Take every ticket that has a `reportedBy`. One block per person, so nobody gets pinged twice.

**Never use `<url|text>` mrkdwn** — Slack doesn't parse it on paste. The sentence carries `<Slack>` and `<PR>` as placeholders, and the raw URLs sit on their own lines below, easy to select and drop into place by hand.

```
Tagging folks whose reports/threads are fixed in this release:
@<reportedBy>: <what they raised> <Slack> is fixed — <PR>
Slack: <threadLink>
PR: <prUrl>
```

- **Opening line always verbatim**, and no release header or release-notes link.
- `@` + the `reportedBy` value verbatim — it is the Slack display name, so don't reword or re-case it.
- Keep every sentence to that one shape. Write `<what they raised>` from the ticket `summary` in words the reporter would recognize — strip boilerplate like `Fix: [Checkbox]`, don't paste the title as-is. For example: _the bundle-size growth you reported_.
- Raw URLs on the `Slack:` and `PR:` lines, one blank line between people.
- If `threadLink` is null, drop the `<Slack>` placeholder and the `Slack:` line with it.
- Several issues from one person: one block, themes merged into the sentence, a `Slack:` / `PR:` line per issue.
- No emojis.

**Tell the user plainly:** the `@` mentions have to be retyped in the composer and picked from the autocomplete — pasted text never becomes a real mention — and the URLs moved into the `<Slack>` / `<PR>` spots before posting.

## Step 3 — Close out

Below the block, in chat: the tag range, how many people are credited, and anything that would make a line wrong — a `reportedBy` of `unknown`, or a name that appears without a `threadLink`.
