# Regression testing app

A small Next.js app that imports `@instructure/ui` locally and exposes one page per component. Cypress visits each page to:

- **Detect visual changes** — screenshots are diffed against baselines by the `ui-scripts visual-diff` command; an interactive HTML report is published to GitHub Pages on every PR. Each screenshot opens in a lightbox that switches between Baseline / Actual / Diff / Slider views and an **HTML** view that iframes the live rendered page (a static export of this app is published next to the report), so you can inspect the real DOM alongside the pixels.
- **Detect a11y issues** — axe-core runs against every page. Violations are recorded with the offending element's position and name (`cypress/support/a11y-capture.ts`), so the diff report can box them on the screenshot itself and describe each one in plain language instead of printing a CSS selector.
- **Detect unexpected console errors** — the spec's `afterEach` hook asserts `console.error` was not called.

Each page is captured once **per theme** (`canvas`, `light`, `dark`), so screenshots are named `<slug>-<theme>.png`. The theme is selected with the `?theme=<key>` query param, which `src/app/layout.tsx` reads and applies via `InstUISettingsProvider`. The page background is painted from the active theme's own `background.page` semantic token, so each theme is captured on the surface it's actually used on — most visibly, the dark theme renders on its near-black surface rather than on white. Add or remove themes with the `THEMES` array in `cypress/e2e/spec.cy.ts` (this multiplies the screenshot/baseline count).

See the [visual regression testing guide](../docs/contributing/testing/visual-regression.md) for the full CI pipeline, the diff report UI, and tuning notes.

## Why npm instead of pnpm?

This app uses **npm** for package management, while the main InstUI monorepo uses **pnpm**. This is intentional to simulate how external consumers would use the `@instructure/ui` package.

Since most external users install packages via npm, using it here helps us:

- Test the package as it would be consumed in real-world scenarios.
- Catch potential issues with dependency resolution that differ between npm and pnpm.
- Ensure published packages work correctly with npm's installation behavior.

## Running locally

From the repo root:

```sh
pnpm install && pnpm run bootstrap
cd regression-test
npm install
```

Then either:

- `npm run dev` — Next dev server on `localhost:3000`, hot-reloads, great for authoring new pages.
- `npm run build && npm start` — builds a static export to `out/` and serves it with `http-server` on `localhost:3000`. This is what CI uses.

Run the Cypress suite against the running server:

- `npm run cypress` — headless.
- `npm run cypress-chrome` — opens the Cypress GUI.

## Adding a new component

1. Create `src/app/<component-name>/page.tsx`. Start the file with `'use client'` and wrap the rendered markup in an element with the `axe-test` class — that's what the axe-core check selects against.
2. Add an entry to the `PAGES` array in `cypress/e2e/spec.cy.ts` with the page's `slug` and a human-readable `title`. The suite generates the visit, per-theme screenshots, and the axe check for you.
   - If the component animates or loads content asynchronously, set `wait: <ms>`.
   - If the page has a known a11y issue, set `a11y: false` with an `a11ySkipReason` (ticket or short note) until it's fixed.
3. Commit and push. The first PR run will show the new screenshots (one per theme) as "New"; merging the PR promotes them to baselines automatically.
