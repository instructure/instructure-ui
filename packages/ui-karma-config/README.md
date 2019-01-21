---
category: packages
---

## ui-karma-config

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

A shared karma config made by Instructure Inc.

### Installation

```sh
yarn add @instructure/ui-karma-config
```

### Usage

In your Karma config file:

```javascript
/* karma.config.js */
const path = require('path')

module.exports = require('@instructure/ui-karma-config')({
  bundle: './tests.bundle.js',
  coverageThreshold: {
    global: {
      lines: 91
    },
    each: {
      lines: 50
    }
  },
  coverageDirectory: path.join(__dirname, '/coverage')
})
```

In your `tests.bundle.js` file:

```javascript
/* tests.bundle.js */

// import anything else you want to include before the tests here

// import the tests:
require('ui-tests-loader!')
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-karma-config.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-karma-config

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
