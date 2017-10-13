---
title: Theming Components
category: guides
---

## Theming Components

### Themeable Components

The `ui-core` components use the [@instructure/ui-themeable](#themeable) decorator along
with a [babel plugin](#babel-plugin-themeable-styles) to import CSS styles and generate theme
variables.

This provides the ability for each component to be used in isolation and support multiple themes,
including dynamic themes provided at runtime, while still working within a system of components
that use a [shared global theme](#canvas).

### Theme variables and adding component themes

All component level theme variables should be defined in a `theme.js` file in the component directory. The theme is applied to the component via the `@themeable` decorator (defined in `packages/ui-themeable`), which transforms the JS variables in the `theme.js` file into CSS custom properties that are automatically scoped and applied to the component.

For example, to add a variable for the `hover` state of a `Button` component the `theme.js` file would contain the following:

```js
export default function ({ colors }) {
  return (
    background: colors.white,
    color: colors.licorice,

    hoverColor: colors.white,
    hoverBackground: colors.licorice
  )
}
```

### Using theme variables in CSS

The `@themeable` decorator will generate the CSS custom properties `--Button-background`, `--Button-color`, `--Button-hoverColor`, `--Button-hoverBackground`, in order to scope them to the component, but you can use these variables in `styles.css` like `var(--background)`
and `var(--hoverColor)`:

```css
.root {
  background: var(--background);
  color: var(--color);

  &:hover {
    background: var(--hoverBackground);
    color: var(--hoverColor);
  }
}
```

### Using theme variables in JavaScript

Since the variables are defined in JS you can also access them in your component JS (e.g. `this.theme.hoverColor`) which will give
you the theme values applied via React context with `ApplyTheme` or the `theme` prop (falling back to the defaults provided in the `theme.js` file).
