---
category: packages
---

## @instructure/ui-themeable

The [@instructure/ui-themeable](#themeable) library is meant to be used along with a [babel plugin](#babel-plugin-themeable-styles)
to import CSS styles and generate theme variables. With this framework, each UI component can be used in
isolation and support multiple themes, including dynamic themes provided at runtime, while still working within
a system of components that use a [shared global theme](#canvas).

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

### Installation

```sh
yarn add @instructure/ui-themeable
```

### Usage

Make a UI component [themeable](#themeable):

```js
// Button/index.js
import themeable from '@instructure/ui-themeable'

import styles from 'styles.css'
import theme from 'theme.js'

class Button extends React.Component {
  render () {
    return <button className={styles.root}>{this.props.children}</button>
  }
}
export default themeable(theme, styles)(Example)
```

Themeable components inject their themed styles into the document when they are mounted.

After the initial mount, a themeable component's theme can be configured explicitly
via its `theme` prop or passed via React context using the [ApplyTheme](#ApplyTheme) component.

Themeable components register themselves with the [global theme registry](#registry)
when they are imported into the application, so you will need to be sure to import them
before you mount your application so that the default themed styles can be generated and injected.

### Defining variables

The themeable component transforms the JS variables defined in the `theme.js` file into CSS custom properties
that are automatically scoped and applied to the component.

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

The arguments to the generator function are the [global theme variables](#canvas). In the above example, we've defined
the default theme for the Button component.

The purpose of the generator function is to take the global variables and apply them as values to the functional
component level variables. When coming up with names for the component level variables, try to make them describe
how they are used in the component (vs describing the variable value).

### Supporting multiple themes

If we want to make the Button transform the global theme variables differently with a another theme,
(e.g. [canvas-high-contrast](#canvas-high-contrast)) we can make a generator for that theme:

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


[npm]: https://img.shields.io/npm/v/@instructure/ui-themeable.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-themeable

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
