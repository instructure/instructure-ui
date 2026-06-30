---
description: Create a commit following InstUI conventions
---

Commit staged + relevant unstaged changes using Conventional Commits.

## Format

```
type(scope): imperative subject

<optional body>

BREAKING CHANGE: <only if applicable>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

- **type**: one of `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`. `commitlint.config.js` extends [`@commitlint/config-conventional`](https://www.npmjs.com/package/@commitlint/config-conventional), which defines the allowed set — pick the type that genuinely matches the change (`feat`/`fix` only for actual features/bug fixes).
- **scope**: full package name (`ui-button`, `ui-select`). Comma-separate for a few, use `many` for several, omit for repo-wide.
- **subject**: imperative ("add loading state", not "added"). Must start with a lowercase letter (commitlint's `subject-case` rejects sentence/Start/PascalCase). No trailing period.
- **Body lines: hard-wrap at 100 characters.** Commitlint (`body-max-line-length: 100`) runs in CI and will reject longer lines. The footer lines (Claude Code attribution, Co-Authored-By) are exempt.
- **Breaking changes**: add a `BREAKING CHANGE:` line in the body describing what breaks. See CLAUDE.md for what counts as breaking.

## Steps

1. `git status` + `git diff` (and `git diff --staged` if anything's staged), and **check the current branch is the right place for this commit**:
   - **Never commit on `master`/`main`.** If you're on it, stop and **offer to create a feature branch** from the current HEAD — `git switch -c <type>/<short-desc>` carries the uncommitted changes onto the new branch — then commit there. Don't proceed on `master` even if the user didn't mention branching; confirm first.
   - If you're on a feature branch, glance at its name. If it looks **unrelated** to the change you're about to commit, flag it and offer to branch off (so you don't pile an unrelated commit onto someone else's WIP); otherwise proceed.
2. Stage the files that belong in this commit — be specific, don't `git add -A`.
3. Commit normally — let the git hooks run. The interactive Commitizen prompt is **no longer** a hook (it now lives behind `pnpm run commit` for humans), so a non-interactive `-m` commit works while `pre-commit` (lint-staged + TS references check) and `commit-msg` (commitlint) still fire:

   ```bash
   git commit -m "$(cat <<'EOF'
   <message>
   EOF
   )"
   ```

4. `git status` to confirm.

If the `pre-commit` hook reformats files (lint-staged runs prettier/eslint), they're restaged into the same commit — that's expected. If a hook **fails** (TS references check, commitlint), fix the underlying issue and create a **new** commit — never `--amend` after a failed hook. Don't reach for `HUSKY=0` to bypass a failing hook; fix the cause.
