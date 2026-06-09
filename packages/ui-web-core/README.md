## ui-web-core

InstUI primitives delivered as Lit-based Web Components, plus the SSR/theming
infrastructure needed to run them in the Parchment stack.

Today this package ships:

- **`<instui-theme-provider>`** — a Lit element that maps InstUI design tokens
  (the modern `primitives` / `semantics` / `sharedTokens` / `components` shape
  from `@instructure/ui-themes`) onto global CSS custom properties, with
  automatic `prefers-color-scheme` and `prefers-contrast` switching.

The dependency direction is one-way: consumers (apps, future Parchment
composition layers) depend on `ui-web-core`, never the reverse.

### Development

```sh
pnpm --filter @instructure/ui-web-core storybook
```

Storybook runs on port 6006. The static build is also embedded into the main
InstUI docs site at `https://instructure.design/parchment`.

### Build

`pnpm --filter @instructure/ui-web-core build` runs a **Vite library build**
(`vite.config.ts`) emitting ESM to `es/` with three entries — `index`, `react/index`
(`@lit/react` wrappers), `ssr/index` (server theme helper + skeleton CSS). The build
resolves the source aliases (`@alerts`, `@drilldown`, `@popover`, `@position`,
`@a11y`, `@menu` — shared with Storybook via `aliases.mjs`) and **inlines** the
React-free neutral modules **and** the `@instructure/*` utility packages they import
(incl. `ui-themes`) + `keycode` into a **self-contained bundle**. Only the framework
peers (`lit`, `@lit/react`, `react`, `@angular/*`) stay external, so the package is
a drop-in consumable cross-repo via a `file:` link with no unresolvable
`workspace:*` deps. A bundler resolving the aliases is what makes the alias approach
production-ready (neither `tsc` nor Babel rewrite aliases in emitted output), which
is why this package is built with Vite and excluded from the repo's composite
`tsc -b` (`tsconfig.references.json`).

> **Type declarations (`.d.ts`) — partial / tracked follow-up.** Single-entry
> `vite-plugin-dts` `bundleTypes` (+ `@microsoft/api-extractor`, with `rootDir`
> widened to `packages/`) **does** produce a clean, self-contained `es/index.d.ts`
> with the neutral types inlined and no `@alias` leaks. But **multi-entry**
> `bundleTypes` (needed once `react`/`ssr` became build entries) cross-wires the
> per-entry outputs, so declaration emission is currently disabled — consumers get
> untyped (`any`) imports. The package is `private`, and Web Component consumers use
> the custom-element tags from HTML (no TS types required). Robust fix when types
> are wanted for the JS/wrapper API: emit a self-contained types tree via `tsc`
> (`rootDir=packages/`) + `tsc-alias`, or run api-extractor once per entry.
