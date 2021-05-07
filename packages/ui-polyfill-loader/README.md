---
category: packages
---

## babel-polyfill-loader

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A [webpack](https://www.npmjs.com/package/webpack) loader that generates a
customized polyfill

### Installation

```sh
yarn add --dev @instructure/ui-polyfill-loader
```

### Usage

Add a .polyfillrc (in JSON or YAML format) or a polyfill.config.js file to your project:

```json
{
  [
    "es6.object.assign",
    "es6.array.find",
    "es6.array.find-index",
    "es6.array.from",
    "es6.string.starts-with",
    "es7.array.includes",
    "es6.symbol"
  ]
}
```

See the [core-js README](https://github.com/zloirock/core-js#custom-build-from-external-scripts) for more options.

Add an entry to your webpack config:

```js
entry: {
  polyfill: '@instructure/ui-polyfill-loader!'
}
```

Or require the loader in your project:

```js
require('@instructure/ui-polyfill-loader!')
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-polyfill-loader.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-polyfill-loader
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
