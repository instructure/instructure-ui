---
category: packages
---

## canvas-high-contrast-theme

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][license]
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

ReactDOM.render(
  <EmotionThemeProvider theme={theme}>
    <App />
  </EmotionThemeProvider>,
  element
)
```

To override the variables:

```js
import { theme } from '@instructure/canvas-high-contrast-theme'
const themeOverrides = { colors: { brand: 'red' } }

ReactDOM.render(
  <EmotionThemeProvider theme={{ ...theme, ...themeOverrides }}>
    <App />
  </EmotionThemeProvider>,
  element
)
```

[npm]: https://img.shields.io/npm/v/@instructure/canvas-high-contrast-theme.svg
[npm-url]: https://npmjs.com/package/@instructure/canvas-high-contrast-theme
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
