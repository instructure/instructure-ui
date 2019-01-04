---
category: packages
---

## ui-babel-preset

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

A UI component library made by Instructure Inc.

### Installation

```sh
yarn add @instructure/ui-babel-preset
```

### Usage

In your .babelrc file:

```json
{
  "presets": ["@instructure/ui-babel-preset"]
}
```

To pass in more options, you can make your own preset:

```js
/* babelrc.js */
module.exports = {
  presets: [[ require('@instructure/ui-babel-preset'), {
    coverage: Boolean(process.env.COVERAGE),
    esModules: Boolean(process.env.ES_MODULES)
  }]]
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-babel-preset.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-babel-preset

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
