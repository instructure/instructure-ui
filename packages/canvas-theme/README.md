---
category: packages
---

## canvas-theme

[![npm][npm]][npm-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A UI component theme for Canvas LMS made by Instructure Inc.

This theme has a 3:1 minimum contrast requirement.

### Installation

```sh
yarn add @instructure/canvas-theme
```

### Usage

Before mounting (rendering) your React application:

- global theming:

  ```js
  import { theme } from '@instructure/canvas-theme'

  theme.use()
  ```

- application level theming:

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

- globally:

  ```js
  import { theme } from '@instructure/canvas-theme'

  theme.use({ overrides: { colors: { brand: 'red' } } })
  ```

- application level:

  ```jsx
  import { theme } from '@instructure/canvas-theme'
  const themeOverrides = { colors: { brand: 'red' } }

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
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
