---
title: Component versioning
category: Guides
order: 2
---

## Why components are versioned

When InstUI needs to make a breaking change to a component (renamed props, changed behaviour, etc.), the old version is **kept alongside the new one** instead of being replaced. Upgrading the library no longer forces you to immediately rewrite every component usage — you can migrate to new versions on your own schedule.

New component versions appear with InstUI **minor** version bumps (e.g. `11.7` → `11.8`). Patch releases never include breaking changes.

> The docs UI "Component version" selector labels library `v11_6` as **`v1 (legacy)`** and library `v11_7` as **`v2`**. This page uses the `v11_X` form because it matches the actual NPM import paths.

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

- **`v1`** (library `v11_6` and earlier) — legacy theming. Components are configured through the Canvas theme variables and the `themeOverride` prop, which accepts a function or object that maps to the component's own theme map. See the [Legacy theme overrides](legacy-theme-overrides) guide.

- **`v2`** (library `v11_7` and newer) — new theming system. Components consume pre-resolved design tokens, and theming is done through the new token override structure. See the [New theme overrides](new-theme-overrides) guide.

Mixing imports from both groups in the same app is fully supported — the two engines run side-by-side without conflict.

### Supported themes per version

Each version of the library is only compatible with the themes built for its theming engine:

- **`v1`** (library `v11_6` and earlier) supports the legacy themes:

  - `canvas`
  - `canvasHighContrast`

- **`v2`** (library `v11_7` and newer) supports themes built on the new token system. The legacy Canvas looks are preserved (re-implemented on the new engine) and two brand-new themes are added:

  - `legacyCanvas` — same visual style as the old `canvas`, but on the new engine
  - `legacyCanvasHighContrast` — same visual style as the old `canvasHighContrast`, on the new engine
  - `light` — new light theme
  - `dark` — new dark theme

This means that when you move a component import from `/v11_6` to `/v11_7` you don't have to change anything visually — you can stay on the `legacyCanvas` theme and opt in to `light` or `dark` only when you're ready.
