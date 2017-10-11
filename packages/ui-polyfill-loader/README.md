---
category: packages
---

[npm]: https://img.shields.io/npm/v/@instructure/ui-polyfill-loader.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-polyfill-loader

## babel-polyfill-loader

[![npm][npm]][npm-url]


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
