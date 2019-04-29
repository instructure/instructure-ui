---
category: packages
---

## canvas-theme

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

A UI component theme for Canvas LMS made by Instructure Inc.

This theme has a 3:1 minimum contrast requirement. 

### Installation

```sh
yarn add @instructure/canvas-theme
```

### Usage

Before mounting (rendering) your React application:

```js
import { theme } from '@instructure/canvas-theme'
theme.use()
```

To override the variables:

```js
theme.use({ overrides: { colors: { brand: 'red' } } })
```

[npm]: https://img.shields.io/npm/v/@instructure/canvas-theme.svg
[npm-url]: https://npmjs.com/package/@instructure/canvas-theme

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
