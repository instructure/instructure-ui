---
title: How themes work
category: Guides
order: 5
---

## Themes

InstUI provides two main themes.

- [canvas](/#canvas)
- [canvas-high-contrast](/#canvas-high-contrast)

They are meant to be used together. `canvas` provides 4.5:1 contrast, while `canvas-high-contrast` 7.0:1.

InstUI uses `canvas` as the default theme. You can change the default theme by calling the `.use()` method on the theme object.

```jsx
---
type: code
---
import { canvasHighContrast } from '@instructure/ui-themes'

canvasHighContrast.use()
```

or with the `InstUISettingsProvider` component

```jsx
---
type: code
---
import { canvasHighContrast } from '@instructure/ui-themes'
// app/component root sets the app theme
<InstUISettingsProvider theme={canvasHighContrast}>
  <ASubtreeToBeThemedWithCanvasHighContrast />
</InstUISettingsProvider>
```

## Colors

InstUI uses a multi layered color system. These layers are

- Primitives
- Contrasts
- UI (colors)

### Primitives

InstUI has a cross-theme (meaning they are the same for every theme) color palette, the `primitives`:

```jsx
---
type: example
---
<ThemeColors colors={canvas.colors.primitives}></ThemeColors>
```

Everythig is built using these colors. Ideally, our users should never interact directly with this palette, displayed only for reference.

Primitives are exposed by the theme object. E.g.: `canvas.primitives.green45`.

### Contrasts

`contrasts` are built from the `primitives`. They are theme specific, but they give hints on how they are used in normal and high contrast themes.

For example, there is the `grey1214` contrast. It has a 4 digit last part, which means that it uses the`grey12` primitive for `canvas` and the`grey14` primitive for `canvas-high-contrast`.

Contrasts are used internally by instUI and they are also the building blocks of the `UI` colors (see below). Ideally, our users should rarely or never interact directly with this abstraction, only in special cases, involving theme overrides or making components "intsUI-style".

Contrasts are exposed by the theme object. E.g.: `canvas.contrasts.grey1214`.

See [canvas](/#canvas), `contrasts` section.

### UI

`UI` colors refer to the curated list of color-tokens that our users should be using when coloring the UI. Ideally, this list should contain every color, that an `Instructure` product will ever need. In rare exceptions, `contrasts` can be used if the design requires it.

`UI` colors are built from `contrasts`.

`UI` colors are exposed by the theme object. E.g.: `canvas.UI.textPrimary`.

See [canvas](/#canvas), `UI` section.
