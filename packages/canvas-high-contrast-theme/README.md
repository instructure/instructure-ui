---
category: packages
---

## canvas-high-contrast-theme

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

A high contrast UI component theme for Canvas LMS made by Instructure Inc.

This theme meets the WCAG 2 Level AA 4.5:1 minimum contrast requirements. 

### Installation

```sh
yarn add @instructure/canvas-high-contrast-theme
```

### Usage

Before mounting (rendering) your React application:

```js
import { theme } from '@instructure/canvas-high-contrast-theme'
theme.use()
```

To override the variables:

```js
theme.use({ overrides: { colors: { brand: 'red' } } })
```

[npm]: https://img.shields.io/npm/v/@instructure/canvas-high-contrast-theme.svg
[npm-url]: https://npmjs.com/package/@instructure/canvas-high-contrast-theme

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
