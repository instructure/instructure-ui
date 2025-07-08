## canvas-theme

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

A UI component theme made by Instructure Inc.

This theme has WCAG 2.1 Level AA minimum contrast requirement.

### Installation

```sh
npm install @instructure/canvas-theme
```

### Usage

Before mounting (rendering) your React application:

```jsx
import { theme } from '@instructure/canvas-theme'

ReactDOM.render(
  <InstUISettingsProvider theme={theme}>
    <App />
  </InstUISettingsProvider>,
  element
)
```

To override the variables:

```jsx
import { theme } from '@instructure/canvas-theme'
const themeOverrides = { spacing: { xxxSmall: '0.3rem' } }

ReactDOM.render(
  <InstUISettingsProvider theme={{ ...theme, ...themeOverrides }}>
    <App />
  </InstUISettingsProvider>,
  element
)
```

[npm]: https://img.shields.io/npm/v/@instructure/canvas-theme.svg
[npm-url]: https://npmjs.com/package/@instructure/canvas-theme
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
