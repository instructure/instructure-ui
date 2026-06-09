---
description: Create a commit following InstUI conventions with HUSKY=0
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

1. `git status` + `git diff` (and `git diff --staged` if anything's staged). **Abort if on `master`** — commit on a feature branch instead.
2. Stage the files that belong in this commit — be specific, don't `git add -A`.
3. Commit with `HUSKY=0` to skip the interactive husky prompt:

   ```bash
   HUSKY=0 git commit -m "$(cat <<'EOF'
   <message>
   EOF
   )"
   ```

4. `git status` to confirm.

If the husky hook fails, fix the underlying issue and create a **new** commit — never `--amend` after a failed hook.
