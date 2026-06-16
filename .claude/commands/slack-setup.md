---
description: One-time setup for the Slack bot token used by /slack-triage — create/scope the Slack app, store the credentials, and verify they work
---

Set up (or repair) the Slack credentials that `/slack-triage` needs to read threads. This is a
one-time concern; once it's working, run `/slack-triage` directly.

The `slack` server reads `SLACK_BOT_TOKEN` and `SLACK_TEAM_ID` from the root `.env`, which
`.mcp.json` sources when it launches the server. **That file is the single source of truth** for
these secrets (gitignored via `.env`) and the same file the rest of the repo's tooling uses, so
there's no second env file to keep in sync. See `.env.example` for the documented keys. The bot is
**read-only** — it does not post — so it never needs `chat:write`.

## Step 1 — Check what's already there

Verify whether credentials are present **without printing their values** (source the env file first,
since that's what the server uses — they won't be in the plain shell otherwise):

```sh
[ -f ./.env ] && . ./.env
( [ -n "${SLACK_BOT_TOKEN:-}" ] && [ -n "${SLACK_TEAM_ID:-}" ] \
  && ! printf '%s' "${SLACK_BOT_TOKEN:-}" | grep -q REPLACE ) && echo creds-present || echo creds-missing
```

- If `creds-missing` → go to Step 2 (create/configure the app and store the token).
- If `creds-present` → skip to Step 5 to verify scopes are actually sufficient. (A token can be set
  but lack scopes — e.g. name resolution fails — so verifying is worthwhile even when present.)

## Step 2 — Create or open the Slack app and set scopes

If the user doesn't have a bot token yet, walk them through it:

- Go to https://api.slack.com/apps → *Create New App* → *From scratch*, pick the workspace (or open
  the existing app).
- *OAuth & Permissions* → *Bot Token Scopes*. Add these **read-only** scopes:
  - `channels:history`, `channels:read` — read public channels
  - `groups:history`, `groups:read` — read private channels
  - `users:read`, `users.profile:read` — resolve reporter display names
  - Do **not** add `chat:write` — the user posts the reply themselves; the bot only reads.
- `SLACK_TEAM_ID` is the workspace id (`T…`), e.g. from the URL `app.slack.com/client/T0XXXXXX/…`.

## Step 3 — Install (or reinstall) to the workspace

- *OAuth & Permissions* → *Install to Workspace* → *Allow*. Copy the **Bot User OAuth Token**
  (`xoxb-…`).
- **Adding scopes later requires a *Reinstall to Workspace*** — Slack only grants newly-added scopes
  on (re)install, which mints a **new** token. Changing the scope list in the config alone does
  nothing until you reinstall. After reinstalling, copy the new `xoxb-…` token.

## Step 4 — Invite the bot to the channel

In the target Slack channel, run `/invite @<app-name>`. This is required to read a **private**
channel even with the scopes above (and harmless for public channels).

## Step 5 — Store the credentials

Ask the user to paste their `SLACK_BOT_TOKEN` (`xoxb-…`) and `SLACK_TEAM_ID` (`T…`). **Never echo the
token back** in your replies. Then write them into the root `.env` as `KEY=value` lines — this is the
file `.mcp.json` sources for the slack server:

```
SLACK_BOT_TOKEN=xoxb-…
SLACK_TEAM_ID=T…
```

- The `.env` almost always already exists with other secrets — **preserve every other line**, only
  set/replace the `SLACK_BOT_TOKEN` and `SLACK_TEAM_ID` lines (append them if absent). Edit it without
  printing the existing contents.
- It's gitignored via `.env` — never commit it or write the token anywhere else. Keep `.env.example`
  in sync if you introduce a new key.

Tell the user to **restart Claude Code** afterward — `.mcp.json` sources this file only when it
launches the server at startup, so a new/changed token is picked up only after a restart.

> Note: if the token string is unchanged and you only *reinstalled* to grant new scopes, Slack grants
> the new scopes to the existing token server-side, so a restart isn't strictly required for scope
> changes. A restart is required whenever the **token value** changes.

## Step 6 — Verify

After the restart, confirm the credentials actually work and carry the right scopes:

- Re-run the Step 1 check (expect `creds-present`).
- Discover the read tools with `ToolSearch` `slack thread replies conversation history permalink`,
  then make one real read call — e.g. fetch a user profile or the users list. A successful response
  means scopes are sufficient.
- If a call fails with `missing_scope`, the error names the scope it `needed` and lists what the token
  currently `provided`. Add the missing scope in Step 2, **reinstall** (Step 3), and re-verify. Common
  cases: `users.profile:read` (resolve a single user's name) and `users:read` (list users).
- The `atlassian` server (used by `/slack-triage` for Jira) authenticates via OAuth, not a token — if
  Jira calls error with auth, run `/mcp` and finish the Atlassian login. No token to store here.

When the read call succeeds, setup is done — run `/slack-triage <thread-link>`.
