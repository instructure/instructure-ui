---
category: packages
---

## @instructure/babel-plugin-themeable-styles

[npm]: https://img.shields.io/npm/v/@instructure/babel-plugin-themeable-styles.svg
[npm-url]: https://npmjs.com/package/@instructure/babel-plugin-themeable-styles

[![npm][npm]][npm-url]

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
