# Regression testing app

A small Next.js app that imports `@instructure/ui` locally and exposes one page per component. Cypress visits each page to:

- **Detect visual changes** — screenshots are diffed against baselines by the `ui-scripts visual-diff` command; an interactive HTML report is published to GitHub Pages on every PR.
- **Detect a11y issues** — axe-core runs against every page.
- **Detect unexpected console errors** — the spec's `afterEach` hook asserts `console.error` was not called.

See the [visual regression testing guide](../docs/testing/visual-regression.md) for the full CI pipeline, the diff report UI, and tuning notes.

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
2. Add a corresponding `it(...)` block in `cypress/e2e/spec.cy.ts` that visits `http://localhost:3000/<component-name>`, calls `cy.injectAxe()`, and `cy.checkA11y('.axe-test', axeOptions, terminalLog)`.
3. If the component animates or loads content asynchronously, add a `cy.wait(<ms>)` before `injectAxe()`.
4. Commit and push. The first PR run will show the new screenshot as "New"; merging the PR promotes it to a baseline automatically.
