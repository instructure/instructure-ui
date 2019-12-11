---
category: packages
---

## ui-webpack-config

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][LICENSE]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A shared webpack config made by Instructure Inc.

### Installation

```sh
yarn add @instructure/ui-webpack-config
```

### Usage

In your Webpack config file:

```js
/* webpack.config.js */
const baseConfig = require('@instructure/ui-webpack-config')
module.exports = {
  ...baseConfig,
  plugins: [ ...baseConfig.plugins, ...myPlugins ],
  module: {
    // note: put your rules first
    rules: [ ...myModuleRules, ...baseConfig.module.rules ]
  },
  resolveLoader: {
    alias: { ...baseConfig.resolveLoader.alias, ...myLoaderAliases }
  }
}
```

### Themeable Components

If your application already has a babel config and webpack config,
and it is costly to convert fully to the shared webpack config, you can introduce
themeable components incrementally by adding the appropriate loader and resolve loader
to your existing webpack config.

```js
/* webpack.config.js */
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: [
          'babel-loader',
          'themeable-css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  resolveLoader: {
    alias: require('@instructure/ui-webpack-config').resolveLoader.alias
  }
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-webpack-config.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-webpack-config

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
