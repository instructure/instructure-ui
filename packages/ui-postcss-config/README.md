---
category: packages
---

## ui-postcss-config

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][LICENSE]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A shared postcss config made by Instructure Inc.

### Installation

```sh
yarn add @instructure/ui-postcss-config
```

### Usage

In your PostCSS config file:

```js
/* postcss.config.js */
module.exports = require('@instructure/ui-postcss-config')({
  before: {
    plugin: 'postcss-nested',
    insert: [
      [require.resolve('postcss-input-range')]
    ]
  },
  nesting: false // Set to true to use postcss-nesting instead of postcss-nested, defaults to false
})
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-postcss-config.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-postcss-config

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
