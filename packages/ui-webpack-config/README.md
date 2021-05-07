---
category: packages
---

## ui-webpack-config

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
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
  plugins: [...baseConfig.plugins, ...myPlugins],
  module: {
    // note: put your rules first
    rules: [...myModuleRules, ...baseConfig.module.rules]
  },
  resolveLoader: {
    alias: { ...baseConfig.resolveLoader.alias, ...myLoaderAliases }
  }
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-webpack-config.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-webpack-config
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
