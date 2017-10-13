---
category: packages
---

## @instructure/ui-presets

[npm]: https://img.shields.io/npm/v/@instructure/ui-presets.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-presets

[![npm][npm]][npm-url]

Shared config for building and testing UI code.

### Installation

```sh
yarn add --dev @instructure/ui-presets
```

### Babel

In your .babelrc file:

```json
{
  "presets": ["@instructure/ui-presets"]
}
```

To pass in more options, you can make your own preset:

```js
/* babelrc.js */
module.exports = {
  // eslint-disable-next-line import/no-extraneous-dependencies
  presets: [[ require('@instructure/ui-presets/babel'), {
    themeable: true,
    coverage: Boolean(process.env.COVERAGE)
  }]]
}
```

### Webpack

In your Webpack config file:

```js
/* webpack.config.js */
{
  plugins: require('@instructure/ui-presets/webpack/plugins'),
  module: {
    rules: require('@instructure/ui-presets/webpack/module/rules')
  },
  resolveLoader: require('@instructure/ui-presets/webpack/resolveLoader')
}
```

### Karma

In your Karma config file:

```js
/* karma.config.js */
const path = require('path')
module.exports = require('@instructure/ui-presets/karma')({
  bundle: './tests.bundle.js',
  coverageThreshold: {
    global: {
      lines: 91
    },
    each: {
      lines: 50
    }
  },
  coverageDirectory: path.join(__dirname, '../../coverage/ui-core')
})
```

### PostCSS

In your PostCSS config file:

```js
/* postcss.config.js */
module.exports = require('@instructure/ui-presets/postcss')({
  before: {
    plugin: 'postcss-nested',
    insert: [
      [require.resolve('postcss-input-range')]
    ]
  }
})
```

### Eslint

```js
/* .eslintrc.js */
module.exports = require('@instructure/ui-presets/eslint')
```

### StyleLint

```js
/* stylelint.config.js */
module.exports = require('@instructure/ui-presets/stylelint')
```
