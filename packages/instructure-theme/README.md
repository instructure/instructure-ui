---
category: packages
---

## instructure-theme

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

A UI component theme for Instructure made by Instructure Inc.

This theme has a 3:1 minimum contrast requirement.

### Installation

```sh
yarn add @instructure/instructure-theme
```

### Usage

Before mounting (rendering) your React application:

```js
import { theme } from '@instructure/instructure-theme'

ReactDOM.render(
  <EmotionThemeProvider theme={theme}>
    <App />
  </EmotionThemeProvider>,
  element
)
```

To override the variables:

```js
import { theme } from '@instructure/instructure-theme'
const themeOverrides = { colors: { brand: 'red' } }

ReactDOM.render(
  <EmotionThemeProvider theme={{ ...theme, ...themeOverrides }}>
    <App />
  </EmotionThemeProvider>,
  element
)
```

[npm]: https://img.shields.io/npm/v/@instructure/instructure-theme.svg
[npm-url]: https://npmjs.com/package/@instructure/instructure-theme
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
