---
description: Create a commit following InstUI conventions
---

Commit staged + relevant unstaged changes using Conventional Commits.

## Format

```
type(scope): imperative subject

<optional body>

BREAKING CHANGE: <only if applicable>

Co-Authored-By: Claude <noreply@anthropic.com>
```

- **type**: one of `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`. `commitlint.config.js` extends [`@commitlint/config-conventional`](https://www.npmjs.com/package/@commitlint/config-conventional), which defines the allowed set — pick the type that genuinely matches the change (`feat`/`fix` only for actual features/bug fixes).
- **scope**: full package name (`ui-button`, `ui-select`). Comma-separate for a few, use `many` for several, omit for repo-wide.
- **subject**: imperative ("add loading state", not "added"). Must start with a lowercase letter (commitlint's `subject-case` rejects sentence/Start/PascalCase). No trailing period. **Max 72 characters** (`subject-max-length`) — if it doesn't fit, you're listing everything the change touches instead of naming the change.
- **Breaking changes**: add a `BREAKING CHANGE:` line in the body describing what breaks. See CLAUDE.md for what counts as breaking.
- **Attribution**: end with `Co-Authored-By: Claude <noreply@anthropic.com>` — that exact form, not a model-specific one, so history stays consistent. **No `🤖 Generated with` line in commit messages**; that belongs in PR bodies (`/pr` handles it).

### Body

**Omit the body when the subject says it all.** When you do write one, it explains **why** — the constraint, the cause, the thing the diff cannot show. Never restate what changed.

- **Hard-wrap at 100 characters** (`body-max-line-length`). Trailers are exempt.
- ❌ **Never turn the body into a changelog.** No grouping headings (`Configuration:`, `Build Tooling:`), no numbered sections, no long bullet list of the files you touched. Commitlint's `body-no-changelog` rejects 2+ headings, more than 12 bullets, or more than 6 bullets naming files.
- ✅ A single lead-in like `The fixes:` followed by a few bullets is fine, and naming a specific file is fine when the file _is_ the point.
- Hard ceiling of 28 body lines (`body-max-lines`) — a backstop for runaway bodies, not a target.

```
❌ feat(many): migrate from npm to pnpm          ✅ feat(many): migrate from npm to pnpm

    Configuration:                                   regression-test stays on npm so it keeps
    - Add pnpm-workspace.yaml                        installing @instructure/ui the way an
    - Add .npmrc with hoisted node linker            external consumer would.
    Build Tooling:
    - Update scripts/bootstrap.js
    ...25 more lines...
```

Writing about _before_ and _after_ is encouraged — "Previously the placeholder only showed on hover" is exactly right in a commit message, which is permanently anchored to its own diff. (Code comments are different: see CLAUDE.md.)

## Steps

1. `git status` + `git diff` (and `git diff --staged` if anything's staged), and **check the current branch is the right place for this commit**:
   - **Never commit on `master`/`main`.** If you're on it, stop and **offer to create a feature branch** from the current HEAD — `git switch -c <type>/<short-desc>` carries the uncommitted changes onto the new branch — then commit there. Don't proceed on `master` even if the user didn't mention branching; confirm first.
   - If you're on a feature branch, glance at its name. If it looks **unrelated** to the change you're about to commit, flag it and offer to branch off (so you don't pile an unrelated commit onto someone else's WIP); otherwise proceed.
2. Stage the files that belong in this commit — be specific, don't `git add -A`.
3. Propose a type(scope) and subject based on the diff, then **ask the user to confirm or override the commit type** before writing the message — don't assume `fix`/`feat` silently; **`feat`/`fix` types are used for non-test/tooling code in our public packages.**
4. Commit normally — let the git hooks run. The interactive Commitizen prompt is **no longer** a hook (it now lives behind `pnpm run commit` for humans), so a non-interactive `-m` commit works while `pre-commit` (lint-staged + TS references check) and `commit-msg` (commitlint) still fire:

   ```bash
   git commit -m "$(cat <<'EOF'
   <message>
   EOF
   )"
   ```

5. `git status` to confirm.

If the `pre-commit` hook reformats files (lint-staged runs prettier/eslint), they're restaged into the same commit — that's expected. If a hook **fails** (TS references check, commitlint), fix the underlying issue and create a **new** commit — never `--amend` after a failed hook. Don't reach for `HUSKY=0` to bypass a failing hook; fix the cause.
