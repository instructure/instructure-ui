---
title: Component versioning
category: Guides
order: 2
relevantForAI: true
---

## Why components are versioned

When InstUI needs to make a breaking change to a component (renamed props, changed behaviour, etc.), the old version is **kept alongside the new one** instead of being replaced. Upgrading the library no longer forces you to immediately rewrite every component usage — you can migrate to new versions on your own schedule.

New component versions appear with InstUI **minor** version bumps (e.g. `11.7` → `11.8`). Patch releases never include breaking changes.

## Import paths

Every InstUI component package supports three import styles:

### Default — `@instructure/ui-<name>`

Always points to the **oldest** still-supported component version. Upgrading the library without changing your imports will keep your code working without surprises.

```js
---
type: code
---
import { Alert } from '@instructure/ui-alerts'
```

### Pinned — `@instructure/ui-<name>/v11_X`

Locks the import to a specific InstUI minor version of the component. When you are ready to adopt a breaking change, update the path to the next pinned version.

```js
---
type: code
---
import { Alert } from '@instructure/ui-alerts/v11_7'
```

### Latest — `@instructure/ui-<name>/latest`

Always points to the newest component version. This may bring breaking changes when you upgrade InstUI itself.

```js
---
type: code
---
import { Alert } from '@instructure/ui-alerts/latest'
```

### Per-package or umbrella package

InstUI also ships an umbrella package, `@instructure/ui`, which re-exports every component from the individual `@instructure/ui-*` packages. Two equivalent import styles work — both resolve to the same component:

```js
---
type: code
---
// per-package import
import { Alert } from '@instructure/ui-alerts/v11_7'

// umbrella package import
import { Alert } from '@instructure/ui/v11_7'
```

The same three path styles (default / `/v11_X` / `/latest`) work on the umbrella package as well. Pick per-package imports when you want better tree-shaking and only pull in what you use, or the umbrella package when you'd rather depend on a single `@instructure/ui` entry in your `package.json`.

## Versions and theming engines

InstUI is in the middle of a transition between two theming systems. Which engine a component uses depends on which version you import:

- **`v11_6` and earlier** — legacy theming. Components are configured through the Canvas theme variables and the `themeOverride` prop, which accepts a function or object that maps to the component's own theme map. See the [Legacy theme overrides](legacy-theme-overrides) guide.

- **`v11_7` and newer** — new theming system. Components consume pre-resolved design tokens, and theming is done through the new token override structure. See the [New theme overrides](new-theme-overrides) guide.

Mixing imports from both groups in the same app is fully supported — the two engines run side-by-side without conflict.

### Supported themes per version

You import themes the same way as before — from `@instructure/ui-themes` — and pass them to `InstUISettingsProvider`:

```js
---
type: code
---
import { canvas } from '@instructure/ui-themes'

<InstUISettingsProvider theme={canvas}>
  <App />
</InstUISettingsProvider>
```

The `canvas` (and `canvasHighContrast`) export works for **both `v11_6` and `v11_7+` components in the same app** — internally it carries the data each engine needs. You don't need to switch theme objects when you bump a component import to `/v11_7`.

- **`v11_6` and earlier** — supports the original two themes:

  - `canvas` — default theme used by Canvas products
  - `canvasHighContrast` — same as `canvas`, with colors WCAG-tuned for high-contrast accessibility

- **`v11_7` and newer** — supports the same two themes (rendered through the new engine, labelled `(legacy)` in the docs UI Theme selector) plus two brand-new ones:

  - `canvas` — same import as above, now driven by the new engine (labelled as `(legacy)`)
  - `canvasHighContrast` — same import as above, now driven by the new engine (labelled as `(legacy)`)
  - `light` — new light theme
  - `dark` — new dark theme

This means that when you move a component import from `/v11_6` to `/v11_7`, you can continue using the `canvas` theme to maintain a familiar look and feel, and opt in to `light` or `dark` only when you're ready.

> The `@instructure/ui-themes` package also exports `legacyCanvas` and `legacyCanvasHighContrast`. These are the raw new-engine forms that `canvas` / `canvasHighContrast` wrap internally — most consumers don't need to import them directly.
