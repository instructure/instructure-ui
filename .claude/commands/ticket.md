---
description: Create a Jira ticket for work that has none — draft from the current session/branch, confirm the fields, then create it in Jira
---

Create a Jira ticket for work that isn't tracked yet — typically because you're about to run `/pr` (or `/commit`) and there's no `INSTUI-` reference to cite. Unlike `/slack-triage`, there's no Slack thread: the source is **this session and the current branch**.

Usage: `/ticket [short description]` — pass a one-line description if you have one; otherwise the skill infers scope from the branch, commits, and diff. If nothing's committed or described yet, ask the user what the ticket is for before drafting.

## Behavior contract (do not deviate)

- **Never create a ticket without explicit confirmation.** Draft → walk the user through the fields → they approve → create. This is the single most important rule.
- **Confirm, don't assume.** Title, type, project, and scope are the user's call. Propose your read, then pause.
- **Describe only what's real** — the change being made and why it's needed. No invented acceptance criteria, no speculative scope. If the work is a chore/tooling change with no user-facing behavior, say that plainly; don't dress it up as a feature.
- **One ticket per logical unit of work.** If the branch spans two unrelated changes, flag it and ask whether that's one ticket or two (or whether the branch should be split) rather than cramming both into one summary.

## Config

- Default Jira project key: **`INSTUI`** (confirm if another fits).
- Issue types: **Bug** (something is broken), **Story** (user-facing capability), **Task** (chore, tooling, refactor, docs, infra). Tooling/config work like CI, hooks, or skills is a **Task**.

## Step 0 — Discover the Jira tools, handle auth

The Atlassian MCP server (`atlassian` in `.mcp.json`) uses OAuth. Discover tools at runtime — names depend on the connected server:

- `ToolSearch` `jira create issue project atlassian` → the create-issue tool (and, if present, project/issue-type metadata + JQL search tools).

On an auth error, tell the user to run `/mcp` and finish the login, then re-run. If the tool doesn't resolve at all, the server may still be starting — check `/mcp`.

If available, fetch the project's valid issue types (e.g. `getJiraProjectIssueTypesMetadata` for `INSTUI`) so the **Type** you propose is one the project actually accepts — don't guess a type name that the create call will reject.

## Step 1 — Gather context (prefer the session over guessing)

Build the ticket from what's actually been done or planned, in priority order:

1. **`$ARGUMENTS`** — if the user gave a description, that's the spec; refine it, don't override it.
2. **This session** — what was investigated/changed and *why*. Carry forward the real motivation (e.g. "CODEOWNERS auto-requested every reviewer with no way to remove them").
3. **The branch** — `git log master..HEAD` (all commits, not just the latest) and `git diff master...HEAD --stat` to see the full scope. The branch name often hints at the type and summary.

State which sources you used and your read of *what the work is and why it's needed* before drafting.

## Step 2 — Light dup check (optional, shallow)

A quick JQL search via the Atlassian MCP for an obvious existing ticket on the same work — so you don't open a duplicate. Keep it shallow; present any hit as "might already be tracked — your call" and let the user decide. Don't block on it.

## Step 3 — Draft the ticket and confirm the fields

Draft and show, then **walk the user through each field and let them adjust**:

- **Summary** — short, specific, imperative; name the affected area (package, `/pr` skill, CI, etc.).
- **Type** — Bug / Story / Task (see Config), validated against Step 0 metadata if available.
- **Description** — what's being changed and the motivation (the problem it solves). For a code change, mention the affected package(s)/component(s); note v1/v2 if relevant (see CLAUDE.md). Link the PR/branch if one already exists. Keep it to confirmed facts.
- **Labels / component** — best guess; user adjusts.
- **Project key** — default `INSTUI`.

**Only after the user approves**, create it via the Jira MCP create-issue tool. Report the **issue key + URL**.

## Step 4 — Thread the key back into the work (offer, don't force)

Once created, offer to connect the ticket to the work in flight:

- **Open PR for this branch** (`gh pr view --json number,url,body -q .`): offer to add a `Fixes <KEY>` line to the body via `gh pr edit <pr> --body-file -`, preserving the existing body.
- **No PR yet**: remind the user that `/pr` will pick up the key, and `/commit` can reference it.

Don't edit the PR or commit without confirmation. Finish by restating the issue key + URL.
