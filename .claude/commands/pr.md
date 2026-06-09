---
description: Create a pull request following InstUI conventions
---

Open a PR for the current branch.

## Steps

1. `git status` — confirm branch + remote tracking. **Abort** if on `master` or if the branch has no commits ahead of `master` (`git rev-list --count master..HEAD` is 0) — there's nothing to open a PR for.
2. `git log master..HEAD` and `git diff master...HEAD` — read **all** commits in the branch (not just the latest) so the summary covers everything that's changed.
3. If not pushed: `git push -u origin <branch>`.
4. Create the PR (see invocation below).
5. Return the PR URL.

If the branch name or any commit references a Jira ticket (e.g. `INSTUI-1234`), include it. If you can't find one, ask the user once before opening — don't invent one.

## gh invocation

Use `--body-file -` with a heredoc on stdin. This avoids shell-quoting issues and is the form supported by current `gh` versions. If unsure about flags, run `gh pr create --help` first — do **not** fall back to older forms like `gh pr create -t ... -b ...` with inline `-b`.

```bash
gh pr create --title "<title>" --body-file - <<'EOF'
<body>
EOF
```

Open as draft (`--draft`) if the work is in progress.

## Body format

Keep it **short**. No preamble, no restating the title, no "this PR does X" filler.

```
## Summary
- <one line per logically distinct change; 1–4 bullets total>

## Test Plan
- <only manual / non-CI checks a reviewer should do>

Fixes INSTUI-XXXX

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

Rules:

- **Summary**: terse bullets. Each bullet is one change, not a paragraph. Skip context the diff already shows.
- **Test Plan**: only what CI **doesn't** cover — manual UI checks, RTL, a11y spot-checks, visual regression cases to look at, edge cases worth poking. Never include "tests pass", "lint passes", "types check", "build succeeds" — CI runs those.
- If there's genuinely nothing to manually verify (e.g. pure refactor with full test coverage), write `- No manual verification needed; covered by existing tests.` and move on.
- Omit the `Fixes` line entirely if no ticket applies. Don't write `Fixes INSTUI-XXXX (or omit if not applicable)`.
- Keep the Claude Code footer.
