# Vendored token source

This directory is a **local, committed vendor copy** of `@instructure/instructure-design-tokens`, pinned at the exact `v1.5.0` release.

- Upstream repo: https://github.com/instructure/instructure-design-tokens
- Upstream tag: `v1.5.0`
- Upstream commit: `ae8f600e8ad4cbadddbaad857f0b6477c4a1e1d6`
- Vendored on: this branch (`feature/banner-component-vendored-tokens`), for local, from-scratch authoring of `Banner` component tokens without depending on any newer upstream release.

## Why this exists

`packages/ui-scripts/package.json` normally depends on the token source as a git dependency:

```
"@instructure/instructure-design-tokens": "github:instructure/instructure-design-tokens#v1.5.0"
```

On this branch, that line instead points here via `link:../../design-tokens`, so the JSON token source can be edited locally (to add a `Banner` token set) without bumping the pinned release or touching the upstream repo.

## How it was vendored

The `tokensStudio/**`, `src/`, `package.json`, `LICENSE`, and `README.md` were copied byte-for-byte from the resolved `v1.5.0` package in `node_modules/.pnpm`. Before any local edits, `pnpm run build:themes` was run and the output diffed against a pre-vendor snapshot of `packages/ui-themes/src/themes/newThemeTokens` — it was byte-identical, confirming the vendoring step itself changes nothing.

This directory also has its own `node_modules/glob` (installed via plain `npm install` inside `design-tokens/`) because it is consumed via `link:`, not as a pnpm workspace member — pnpm does not install a linked package's own dependencies, and the package's `src/index.js` needs `glob` to enumerate the `tokensStudio/**/*.json` files at import time.

## Re-syncing with upstream

To pick up a newer upstream release instead of hand-editing this copy indefinitely: delete this directory, re-vendor from the desired tag the same way, and re-apply any local-only edits (like the `Banner` token set) on top, or migrate them into the real `instructure-design-tokens` repo and go back to the `github:` dependency.

## Reverting to the real dependency

Change `packages/ui-scripts/package.json`'s `@instructure/instructure-design-tokens` entry back to `github:instructure/instructure-design-tokens#<tag>`, remove the `"glob"` dependency added alongside it (unless something else in `ui-scripts` needs it), delete this directory, and run `pnpm install`.
