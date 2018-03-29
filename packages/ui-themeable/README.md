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

### Motivation

1. Two-tiered theme variable system: system-wide variables + component level variables. With this variable system, components can be themed, tested, and rendered in isolation from the rest of the system, and we can mitigate issues that may arise with system-wide theme updates.

2. Runtime theme application and definition: to apply user/account level themes *without using the CSS cascade*.

3. Prevent CSS Cascade bugs: All components should specify variants via props or component level theme variables only (no className or style overrides) with a clear API and should not rely on any external styles.

4. Theme variables should be accessible in both JS and CSS.

5. All component styles and variables should scoped to the component.

6. Pre-render/server-side render support (inline critical CSS).


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

Note: Don't worry about scoping your CSS variables (the [ui-themable](#ui-themeable) library will take care of that for you):

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


### How it works

The [babel plugin](#babel-plugin-themeable-styles) does a few things:

 1. It uses the [css-modules-require-hook](https://github.com/css-modules/css-modules-require-hook)
    to namespace the class names (configurable via themeable.config.js).
 2. It runs [postcss](https://github.com/postcss/postcss) on the contents of the `theme.css` file using plugins defined in postcss.config.js, plus [postcss-themeable-styles](#postcss-themeable-styles).
 3. It converts the processed CSS string to a function that provides a JS template
    so that variable values from `theme.js` can be injected into the CSS
    for browsers that don't support CSS variables.

 The [ui-themable](#ui-themeable) library will call the theme function and inject the resulting CSS string into the document
 when the component mounts. If the browser supports CSS variables, it will
 inject namespaced CSS variables into the CSS before adding it to the document.

 e.g. The following is injected into the document for browsers with CSS var support:

 ```css
 .list__root {
   color: var(--list__color);
   background: var(--list__background);
 }

 :root {
   --list__color: #8893A2;
   --list__background: #FFFFFF;
 }
 ```

 Whereas if the browser does not support CSS variables:

 ```css
 .list__root {
   color: #8893A2;
   background: #FFFFFF;
 }
 ```

 The [ui-themable](#ui-themeable) library also supports runtime themes as follows:

 For browsers that support CSS variables, it will add variables via the
 style attribute on the component root (when the theme is changed, either
 via the theme property or via React context using the [ApplyTheme](#ApplyTheme) component).

  ```html
  <div style="--list-background: red">
  ```

 For browsers that don't support CSS variables it will update the DOM like:

 ```html
 <div data-theme="XYZ">
   <style type="text/css">
     [data-theme="XYZ"].list__root {
       background: red;
     }
   </style>
 </div>
 ```


[npm]: https://img.shields.io/npm/v/@instructure/ui-themeable.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-themeable

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
