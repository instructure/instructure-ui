---
category: packages
---

## @instructure/ui-presets

Shared config for building and testing UI code.

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

### Installation

```sh
yarn add --dev @instructure/ui-presets
```

### Babel

In your .babelrc file:

```json
{
  "presets": ["@instructure/ui-presets/babel"]
}
```

To pass in more options, you can make your own preset:

```js
/* babelrc.js */
module.exports = {
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
  },
  nesting: false // Set to true to use postcss-nesting instead of postcss-nested, defaults to false
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

### Themeable Components

If your application already has a babel config and webpack config,
and it is costly to convert fully to the ui-presets, you can introduce
themeable components incrementally by adding the appropriate loader and resolve loader
to your existing webpack config.

```js
/* webpack.config.js */
{
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: [ 'babel-loader', 'themeable-css-loader' ]
      }
    ]
  },
  resolveLoader: require('@instructure/ui-presets/webpack/resolveLoader')
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-presets.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-presets

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
