
## Themes

Instructure UI ships with two built-in themes: [canvas theme](#canvas) (default), [high contrast canvas theme](#canvas-high-contrast).
They are meant to be used together, `canvas` provides 4.5:1 contrast, while `canvas-high-contrast` 7.0:1.

You can change the theme used with the [InstUISettingsProvider](#InstUISettingsProvider) component:

```jsx
---
type: code
---
import { canvasHighContrast } from '@instructure/ui-themes'
//...
// app/component root sets the app theme
render() {
  return <InstUISettingsProvider theme={canvasHighContrast}>
    <ASubtreeToBeThemedWithCanvasHighContrast />
  </InstUISettingsProvider>
}
```

For more details on how to customize themes or apply different ones to parts of you application see [Using Theme Overrides](/#using-theme-overrides).

If you are interested in how InstUI's theming engine works and/or you want to make your own components that use the themes,
read our documentation on the theming engine [here](#theming-basics).

## Colors

InstUI uses a multi layered color system. These layers are:

- Primitives: Base colors, not to be used directly.
- Contrasts: Theme building block, a color that takes up the value of a primitive based on the theme
- UI: Theme-specific color of a UI element like link text

### Primitives

InstUI's color palette is the same for every theme. The numbers in the color names denote the contrast ratio to white.

```jsx
---
type: example
---
<ThemeColors colors={canvas.colors.primitives} label=""></ThemeColors>
```

Every theme in InstUI is built using these colors. Ideally users should never interact directly with this palette, here it's only displayed only for reference.

Primitives are exposed by the theme object. E.g.: `canvas.primitives.green45`.

### Contrasts

`contrasts` are built from the `primitives`. They are theme specific, but they give hints on how they are used in normal and high contrast themes.

For example, there is the `grey1214` contrast. It has a 4 digit last part, which means that it uses the`grey12`
primitive for `canvas` and the`grey14` primitive for `canvas-high-contrast`.

Contrasts are used internally by instUI, and they are also the building blocks of the `UI` colors (see below).
Ideally, our users should rarely or never interact directly with this abstraction, only in special cases, involving theme overrides or making components "instUI-style".

Contrasts are exposed by the theme object. E.g.: `canvas.contrasts.grey1214`.

See [canvas](/#canvas), `contrasts` section.

### UI

`UI` colors refer to the curated list of color-tokens that our users should be using when coloring the UI. Ideally, this list should contain every color, that an `Instructure` product will ever need. In rare exceptions, `contrasts` can be used if the design requires it.

`UI` colors are built from `contrasts`.

`UI` colors are exposed by the theme object. E.g.: `canvas.UI.textPrimary`.

See [canvas](/#canvas), `UI` section.


