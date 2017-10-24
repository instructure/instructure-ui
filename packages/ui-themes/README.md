---
category: packages
---

## @instructure/ui-themes

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

### Installation

```sh
yarn add @instructure/ui-themes
```

### Usage

Before mounting (rendering) your React application:

```js
import theme from '@instructure/ui-themes/lib/canvas'
theme.use()
```

To override the variables:

```js
theme.use({ overrides: { colors: { brand: 'red' } } })
```

To use the high contrast theme:

```js
import theme from '@instructure/ui-themes/lib/canvas/high-contrast'
theme.use()
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-themes.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-themes

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
