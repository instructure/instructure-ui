---
description: Take a triaged bug or feature request through to a verified change on a branch, ready for /commit and /pr — using this session's investigation plus the Jira ticket
---

Implement a triaged fix or feature (typically from `/slack-triage` earlier this session) and land it as a **verified change on a branch, stopping before commit**. The bridge between a Jira ticket and `/commit` → `/pr`. Works for bugs *and* feature requests.

Usage: `/implement [INSTUI-1234]` — pass a ticket key if you have one; otherwise use this session's ticket and investigation.

**Confirm direction at every decision point.** A wrong assumption here wastes a branch. At each step, state your read and proposed next move, then pause for the user before investing effort.

## Step 1 — Context: WHAT is happening (prefer this session over the ticket)

Triage captured **WHAT** happens and **WHAT SHOULD** — confirmed repro, observed-vs-expected, affected component, v1/v2 notes — and deliberately skipped the cause. That confirmed behavior is your spec; the WHY is Step 2. Source it in priority order:

1. **This session's triage** (primary) — carry forward the confirmed repro and agreed expected behavior as the working spec.
2. **The Jira ticket** (durable anchor) — read it (Jira MCP / `$ARGUMENTS` key) for scope, acceptance criteria, and the Slack link. If it conflicts with verified session findings, prefer the session findings and note the discrepancy.
3. **Cold start** (no prior triage) — reconstruct the WHAT before coding: read the ticket, then re-establish observed/expected from README/`props.ts`/`theme.ts`, cross-check the published docs, and rebuild the repro. Don't start from a one-paragraph ticket.

State which sources you're using and confirm the WHAT before moving on.

## Step 2 — Diagnose the cause (the WHY) and confirm the approach

The investigation triage skipped — where most wrong turns happen, so **confirm before you code**.

- **Find the root cause.** Trace the confirmed repro to the responsible code path; cite exact `file:line`. Use the Chrome DevTools MCP against `pnpm run dev` (http://localhost:9090) to inspect state/DOM/console where it helps.
- **For a regression, trace the introducing commit/PR.** Use `git log -p` / `git blame` / `git log -S'<symbol>'`, or bisect against `CHANGELOG.md` / release tags. Capture short SHA + subject, author/date (`git show -s --format='%an <%ae>, %ad' <sha>`), and the merging PR (`gh pr list --search <sha> --state merged --json number,title,url`). **Verify the suspect code is actually on `master`/the released tag** — a commit on an unmerged branch isn't the shipped regression. Skip the archaeology only for a clear original defect (say so).
- **Propose the fix and get sign-off.** State the root cause and intended change (which file(s), v1 vs v2, prop vs theme vs logic) plus any alternatives, in a few lines. **Wait for the user to confirm** before editing.

## Step 3 — Branch (confirm first)

The change goes on a **new branch off `master`** — not the current branch (CLAUDE.md: branch from master, integrate by rebasing). Before `git switch -c`:

- Show the current branch and the proposed name (descriptive; include the ticket key if any) and wait for confirmation.
- Flag anything off — e.g. if you're on a feature branch with unrelated WIP (or the `/slack-triage` session itself), the user may want to branch off `master` instead of stacking.

## Step 4 — Implement, honoring InstUI conventions

Make the confirmed change. Enforce the rules `/commit` and `/pr` don't:

- **No hardcoded user-facing strings** — all UI text from props for i18n (the most common review comment).
- **New components: functional + hooks only**; styling via co-located Emotion `theme.ts`.
- **No breaking changes unless explicitly asked** — removing/renaming a prop, component, theme variable, or exported util; changing a prop type or behavior-altering default. Adding optional props / components / theme variables is fine. If a break is required, flag it, get sign-off, and carry `BREAKING CHANGE:` in the commit.
- **v1/v2:** change the right version (default v2; confirm before touching deprecated v1).
- **Docs & tests in the same change:** update the component **README** for any prop change; add/extend co-located **unit tests** (`*.test.tsx`), a **regression-test page** (`/regression-test/src/app/<name>/page.tsx`), and a **Cypress entry** (`/regression-test/cypress/e2e/spec.cy.ts`). Maintain WCAG 2.1 AA and RTL.

## Step 5 — Verify against the original repro

Not done until it's shown to work:

- Run the package's unit tests: `pnpm run test:vitest <pkg>`.
- Re-run the **confirmed repro from triage** live via the Chrome DevTools MCP (or the `verify` skill) against `pnpm run dev` — open the exact spot, exercise the repro, capture the now-correct behavior (snapshot/console/screenshot). The exact failing repro should now pass (bug) / the ticket's use case should work (feature). Report what you observed.

## Step 6 — Hand off (stop before commit)

Stop at a **verified diff on the branch** and summarize: what changed and why (now you can state the confirmed cause), files touched, test/repro results, follow-ups. **Do not commit or open a PR** — tell the user to run `/commit` then `/pr` (PR body references the `INSTUI-` ticket) once they're happy.

If you only got partway, **say so plainly** — leave a documented WIP branch listing what's left, rather than forcing an incomplete change to look finished.
