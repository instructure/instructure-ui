---
title: Visual Regression Testing
category: Contributing/Testing
order: 4
---

# Visual regression testing

InstUI runs visual regression tests on every pull request. They guard against unintended pixel-level changes to rendered components — a padding bump, an accidental color shift, a layout regression that a unit test wouldn't catch.

## How it works

On every PR:

1. **Build & capture.** GitHub Actions builds InstUI, builds the `regression-test` Next.js app as a static site, and serves it. Cypress visits every page under `regression-test/src/app/*` once per theme (via the `?theme=` query param), waits for each to render, and calls `cy.screenshot()` directly in the spec, producing one PNG per page/theme combination.
2. **Diff.** The `ui-scripts visual-diff` command compares each screenshot against the matching baseline fetched from the `visual-baselines` branch of the repo. It uses [pixelmatch](https://github.com/mapbox/pixelmatch) with antialiasing detection enabled, so typical font-rendering noise doesn't register as a diff.
3. **Publish.** The diff script writes an HTML report (with baseline / actual / diff for every row, plus a lightbox viewer) and the action publishes it to the `gh-pages` branch under `visual-regression/pr-<N>/`. The report is reachable at `https://instructure.design/visual-regression/pr-<N>/index.html`.
4. **Comment.** A sticky PR comment summarizes the result, links to the report, and inlines each changed row's diff image inside a collapsed `<details>` block.
5. **Fail.** If any screenshot is marked `Changed` or `Removed`, the `Capture, diff, and publish report` job fails. `New` screenshots (no matching baseline) are tolerated so a contributor who adds a new component page doesn't need to pre-seed a baseline.
6. **Cleanup.** When the PR is closed or merged, a separate workflow removes `visual-regression/pr-<N>/` from `gh-pages`.

Baselines are refreshed automatically: every push to `master` triggers the `Update visual baselines` workflow, which re-runs Cypress and force-pushes the fresh screenshots to the `visual-baselines` branch. There is no manual review or approval step — merging is the approval.

## Local development

### Running the full loop against local changes

From the repo root:

```sh
---
type: code
---
pnpm install && pnpm run bootstrap
cd regression-test
npm install
npm run build       # produces out/
npm start &         # serves the static export on http://localhost:3000
npm run cypress     # captures screenshots
```

The resulting PNGs land in `regression-test/cypress/screenshots/spec.cy.ts/`.

To compare them against a local baseline set:

```sh
---
type: code
---
# Seed baselines by copying a known-good capture run
mkdir -p .baselines
cp cypress/screenshots/spec.cy.ts/*.png .baselines/

# Later, after a visual change, capture again and diff
cp cypress/screenshots/spec.cy.ts/*.png .actual/
npm run visual-diff
open .report/index.html
```

`npm run visual-diff` invokes the same `ui-scripts visual-diff` command CI uses. Pass extra flags to override the defaults:

| Flag                                                           | Default               | Description                                                                                                                                                                                              |
| -------------------------------------------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--actual-dir <dir>`                                           | `cypress/screenshots` | Newly captured screenshots.                                                                                                                                                                              |
| `--baseline-dir <dir>`                                         | `.baselines`          | Baselines to compare against.                                                                                                                                                                            |
| `--output-dir <dir>`                                           | `visual-report`       | Where the HTML report + diff PNGs are written.                                                                                                                                                           |
| `--threshold <0..1>`                                           | `0.1`                 | Per-pixel YIQ color threshold. Lower is stricter.                                                                                                                                                        |
| `--fail-on-missing-baseline` / `--no-fail-on-missing-baseline` | on                    | Whether to exit 1 when actual screenshots have no baseline.                                                                                                                                              |
| `--pr-number <n>`                                              | —                     | Rendered in the report header as a link to the PR.                                                                                                                                                       |
| `--pr-url <url>`                                               | —                     | Target of the PR link.                                                                                                                                                                                   |
| `--meta <file>`                                                | —                     | JSON mapping screenshot slug → visited URL path. Enables per-row source-file links in the report. Produced automatically by `spec.cy.ts` via `cy.task('recordMeta', ...)`.                               |
| `--source-base-url <url>`                                      | —                     | GitHub blob URL of `regression-test/src/app` on the branch being reviewed. Combined with `--meta` to build links like `treebrowser/page.tsx`.                                                            |
| `--facets <list>`                                              | —                     | Comma-separated facet suffixes (e.g. `canvas,light,dark`) rendered as one-click filter chips that match screenshots named `<name>-<facet>`.                                                              |
| `--app-path <path>`                                            | —                     | Path, relative to the report root, where a static export of the app is published (CI uses `app`). Enables the lightbox **HTML** view, which iframes the live rendered page.                              |
| `--a11y <file>`                                                | —                     | JSON of axe violations keyed by screenshot slug. Enables everything in [Accessibility findings](#accessibility-findings) below. Produced automatically by `spec.cy.ts` via `cy.task('recordA11y', ...)`. |

### Interpreting the report

The HTML report is a single self-contained page showing one section per screenshot. Each row has a status badge (`ok`, `changed`, `new`, `removed`), a three-up grid of baseline / actual / diff images, and — when metadata is available — a link to the source `page.tsx`.

Top-bar controls:

- **Filter buttons** (`All`, `Changed`, `New`, `Removed`, `Unchanged`, `⚠ A11y`) — the active one is highlighted.
- **Search input** — live, debounced substring filter on the screenshot name.
- **Theme chips** — narrow to one theme's screenshots.
- **Lightbox** — click any thumbnail to open a fullscreen viewer. Inside:
  - `Baseline`, `Actual`, `Diff` buttons switch between the three images.
  - `Slider` mode overlays baseline and actual with a drag handle so you can scrub the boundary back and forth.
  - `⚠ N a11y` mode shows the screenshot at full size with every violating element boxed, and the findings docked alongside. Shown only for screenshots with findings.
  - `HTML` mode iframes the live rendered page (a static export of the app published next to the report) so you can inspect the real DOM, computed styles, and text alongside the pixels. Shown only when the page still exists and the app was published (`--app-path`).
  - `1:1` / `Fit` toggles between native pixel size (scrollable) and fit-to-window.
  - `‹` / `›` step through visible rows (respects the current filter).

### Accessibility findings

axe runs against every page and theme, and the report shows what it found **on the picture**, so a designer can act on it without reading a selector.

While the page is still on screen, `spec.cy.ts` records each violating element's bounding box, a human-readable name for it, and — for contrast failures — the foreground/background colors and ratios axe computed (see `cypress/support/a11y-capture.ts`). The report then renders:

- **A run-level overview** at the top of the page: one line per rule with its impact, how many elements it affects, and how many screenshots it appears on. The same rule tripping in `canvas`, `light`, and `dark` collapses to a single line. Click a rule to narrow the list to just the screenshots it affects.
- **A `⚠ N a11y` badge** in each affected screenshot's header, colored by the worst impact on it. That badge is the only a11y marking in the list — rows stay a clean three-up image comparison. **Click it** to open the lightbox's **A11y** view.
- **The A11y view**: the screenshot at full size with every violating element boxed and numbered, colored by impact, and the findings listed beside it. Clicking a card highlights its box and vice versa. Findings are ordered worst-impact-first, so `#1` is always the most serious thing on that screenshot.
- **One card per offending element**, leading with a plain-language headline ("Text contrast is too low") rather than the rule id, naming the element (`button “Archive this item”`), and suggesting a fix. Contrast failures show both colors as swatches with the measured and required ratios. The raw axe output — rule id, selector, and `failureSummary` — sits behind **Technical details**.

The boxes and cards are rendered into an inert `<template>` inside each row and cloned when the A11y view opens, so there's one renderer rather than a server-side and a client-side copy.

Plain-language copy comes from a rule dictionary in `packages/ui-scripts/lib/commands/visual-diff.ts` (`RULE_COPY`). A rule that isn't in it still renders correctly — it just falls back to axe's own `help` text. Add an entry when a new rule starts showing up.

A page with a known, tracked a11y issue can opt out of the axe check entirely with `a11y: false` and an `a11ySkipReason` in the `PAGES` array in `spec.cy.ts`.

## Adding a new component page

1. Create `regression-test/src/app/<component-name>/page.tsx`. The page component must start with `'use client'` and render meaningful variations of the component you're covering.

   ```tsx
   ---
   type: code
   ---
   'use client'
   import { Button } from '@instructure/ui/latest'

   export default function Page() {
     return (
       <main className="axe-test p-8 flex flex-col gap-4 items-start">
         <Button>Default</Button>
         <Button color="primary">Primary</Button>
         <Button disabled>Disabled</Button>
       </main>
     )
   }
   ```

   The outer `axe-test` class is required — the axe-core accessibility check runs against elements inside it.

2. Add a test block in `regression-test/cypress/e2e/spec.cy.ts`:

   ```ts
   ---
   type: code
   ---
   it('MyComponent', () => {
     cy.visit('http://localhost:3000/my-component')
     cy.injectAxe()
     cy.checkA11y('.axe-test', axeOptions, terminalLog)
   })
   ```

   If the component renders with an animation or asynchronous layout pass, add a `cy.wait(<ms>)` before `injectAxe()`. Keep waits as short as works — excessive waits compound across the suite.

3. Commit the test page and the spec. On the first PR run the new screenshot will show up as `New`; it becomes a baseline automatically once the PR is merged.

## Tuning stability

Screenshots are captured with `capture: 'fullPage'` and `disableTimersAndAnimations: true`, at a fixed 1280×800 viewport, inside a `cypress/browsers` Docker container pinned in the workflow. That combination eliminates almost all environmental noise. When a real component still flakes:

- **Bump `cy.wait()` modestly** for components with late-rendered content (tooltips, tree animations, image loading). TreeBrowser uses 1000ms.
- **Don't lower the pixel threshold** below 0.1 unless you're chasing a specific subpixel regression — you'll start catching harmless antialiasing drift.
- **Don't raise it above 0.2** — you'll mask real color regressions.

## Troubleshooting

**"View full report" link shows the docs site 404 page.** GitHub Pages' CDN lags ~30–120s behind a push. Hard-refresh (Cmd-Shift-R / Ctrl-F5) or wait a minute.

**Every screenshot shows as `Changed` after a branch rebase.** Baselines may have been captured under a different layout. Merging to `master` refreshes them. If a PR's branch diverged from a baseline-producing commit, expect a one-time cascade of "fixes" that'll reset on merge.

**`visual-baselines` branch missing.** The branch is created lazily on the first push to `master` after this feature landed. If it was force-deleted, the next merge to `master` will recreate it.

**Diffs appear only on certain rows but the component hasn't changed.** Most often this is a font-rendering shift from a Chromium or Fastly CDN upgrade. Merging to `master` lets the baselines pick up the new rendering; no code change needed.
