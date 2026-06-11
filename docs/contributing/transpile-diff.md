---
title: Comparing Transpiled Output
category: Contributing
order: 8
---

# Comparing Transpiled Output

When migrating build tooling — Babel → SWC, `tsc` → `tsgo`, a Babel preset
bump, a TypeScript upgrade — you want to know whether the change actually
altered the emitted code. `transpile-diff` builds two git refs in isolation
and diffs their `es/`, `lib/` and `types/` output.

```bash
pnpm run transpile-diff [refA] [refB]
```

- `refA` defaults to `master`, `refB` to the current branch (`HEAD`).
- **Any git ref works** — a branch, a tag (`v9.0.0`), or a commit SHA.

```bash
pnpm run transpile-diff                      # current branch vs master
pnpm run transpile-diff master my-swc-branch # two branches
pnpm run transpile-diff v9.0.0 HEAD          # a release vs now
```

## How it works

For each ref the command:

1. checks it out into a temporary git worktree under `.transpile-diff/`,
2. runs `pnpm install --frozen-lockfile` then `pnpm run bootstrap` (a clean,
   full build — so `types/` declarations are included),
3. snapshots the built output, passing each file through a normalization step
   that strips the license banner, sourcemap comments and whitespace noise.

It then diffs the two snapshots, prints a `changed / added / removed` summary,
writes an HTML report to `.transpile-diff/report-<a>-<b>.html` (opened
automatically), and exits non-zero if anything differs.

Snapshots are cached by commit SHA, so re-running against an unchanged ref
(e.g. `master`) skips its rebuild.

## Options

| Option        | Default        | Description                                                                                                                                                                                                                         |
| ------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--modules`   | `es,lib,types` | Which output dirs to compare.                                                                                                                                                                                                       |
| `--semantic`  | `false`        | Reprint each file with the repo's `dprint` config before diffing, so pure-formatting differences are ignored. **Recommended for Babel→SWC / tsc→tsgo**, where output is never byte-identical but should be semantically equivalent. |
| `--raw`       | `false`        | Skip normalization entirely — compare raw bytes (banner, whitespace included).                                                                                                                                                      |
| `--no-frozen` | _(off)_        | Allow lockfile changes when installing. Useful for old refs whose lockfile no longer resolves under the current toolchain.                                                                                                          |
| `--no-open`   | _(off)_        | Don't open the HTML report automatically.                                                                                                                                                                                           |

### Which mode to use

- **Same compiler, config bump** (e.g. a TypeScript version upgrade): the default normalization is enough — output formatting is stable, so any diff is a real change.
- **Different compiler** (Babel→SWC, tsc→tsgo): add `--semantic`. Babel and SWC will never produce byte-identical output, but after reprinting through `dprint` the diff reduces to genuine code differences.

`--semantic` uses `dprint`, which is already a ui-scripts dependency — it adds no new packages.

## Notes

- A full `bootstrap` runs per ref, so a cold run takes several minutes — this
  is meant to be run occasionally, not in CI.
- Comparing very old commits can fail at the **build** step (lockfile or Node
  version drift), not the diff step. The command aborts with a clear message
  identifying which ref failed to build rather than reporting a misleading diff.
