---
title: Theming Components
category: guides
---

## Theming Components

### Themeable Components

The `ui-core` components use the [@instructure/ui-themeable](#themeable) decorator along
with a [babel plugin](#babel-plugin-themeable-styles) to import CSS styles and generate theme
variables.

The [@instructure/ui-themeable](#themeable) library provides the ability for each component to be used in
isolation and support multiple themes, including dynamic themes provided at runtime, while still working within
a system of components that use a [shared global theme](#canvas).

### Theme variables and adding component themes

All component level theme variables should be defined in a `theme.js` file in the component directory.
This theme is applied to the component via the `@themeable` decorator (defined in `packages/ui-themeable`),
which transforms the JS variables in the `theme.js` file into CSS custom properties that are automatically
scoped and applied to the component.

For example, to add a variable for the `hover` state of a `Button` component,
the `theme.js` file might contain the following:

```js
// Button/theme.js
export default function generator ({ colors }) {
  return (
    background: colors.tiara,
    color: colors.licorice,

    hoverColor: colors.white,
    hoverBackground: colors.licorice
  )
}
```

The arguments to the generator function are the global theme variables. In the above example, we've defined
the default theme for the Button component.

The purpose of the generator function is to take the global variables and apply them as values to the functional
component level variables. When coming up with names for the component level variables, try to make them describe
how they are used in the component (vs describing the variable value).

### Supporting multiple themes

If we want to make the Button transform the global theme variables differently with a another theme,
(e.g. 'canvas-high-contrast') we can make a generator for that theme:

```js
// Button/theme.js
...
generator['canvas-high-contrast'] = function ({ colors }) {
  return {
    background: colors.white
  }
}
```

This will override the default Button theme and use the global theme variable `colors.white` for the
value of its `background` theme variable instead of `colors.tiara`.

The rest of the variables will pick up from the default Button theme generator (applying the global theme variables
from the `canvas-high-contrast` theme).

### Using theme variables in CSS

The `@themeable` decorator will generate the CSS custom properties `--Button-background`, `--Button-color`, `--Button-hoverColor`, `--Button-hoverBackground`, in order to scope them to the component. The `--Button-` prefix is applied at build time,
so you can use these variables in `styles.css` like `var(--background)` and `var(--hoverColor)`:

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
