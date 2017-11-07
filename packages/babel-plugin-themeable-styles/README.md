---
category: packages
---

## @instructure/babel-plugin-themeable-styles

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

Transforms CSS imports (via [css-modules-require-hook](https://github.com/css-modules/css-modules-require-hook))
into a JavaScript object that provides a [CSS Module](https://github.com/css-modules/css-modules),
along with a template function that, given a theme variables object, will return the
themed CSS as a string.

Given CSS file:

```css
/* style.css */
.root {
  background: var(--background);
  color: var(--color);

  &:hover {
    background: var(--hoverBackground);
    color: var(--hoverColor);
  }
}
```

and a JavaScript module that imports the CSS file:

```js
/* Button.js */
import styles from './styles.css'
import theme from './theme.js'
```

The plugin will run [postcss](https://github.com/postcss/postcss) on the CSS source
and transform the CSS import into:

```js
/* Button.js */
const styles = {
  template: function (theme) {
      const tmpl = function () {
        return `.Button__root {
          background: ${theme.background};
          color: ${theme.color};
        }
        .Button__root:hover {
          background: ${theme.hoverBackground};
          color: ${theme.hoverColor};
        }`
      }
      return tmpl.call(theme, theme)
    },
    root: 'Button__root'
}
```

### Installation

```sh
yarn add --dev @instructure/babel-plugin-themeable-styles
```

### Usage

Note: the easiest way to use this plugin is to use the babel preset provided by [@instructure/ui-presets](#ui-presets).

However the plugin can be configured on its own as follows:

In your .babelrc file:

```json
{
  "plugins": [
    [
      "@instructure/babel-plugin-themeable-styles",
      {
        ignore: "node_modules/**/*"
      }
    ],
  ]
}
```


[npm]: https://img.shields.io/npm/v/@instructure/babel-plugin-themeable-styles.svg
[npm-url]: https://npmjs.com/package/@instructure/babel-plugin-themeable-styles

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
