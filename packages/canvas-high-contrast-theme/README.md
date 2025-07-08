## canvas-high-contrast-theme

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

A high contrast UI component theme made by Instructure Inc.

This theme meets the WCAG 2.1 Level AAA minimum contrast requirements.

### Installation

```sh
npm install @instructure/canvas-high-contrast-theme
```

### Usage

Before mounting (rendering) your React application:

- global theming (DEPRECATED):

  ```js
  import { theme } from '@instructure/canvas-high-contrast-theme'

  theme.use()
  ```

- application level theming:

  ```jsx
  import { theme } from '@instructure/canvas-high-contrast-theme'

  ReactDOM.render(
    <InstUISettingsProvider theme={theme}>
      <App />
    </InstUISettingsProvider>,
    element
  )
  ```

To override the variables:

- globally (DEPRECATED):

  ```js
  import { theme } from '@instructure/canvas-high-contrast-theme'

  theme.use({ overrides: { spacing: { xxxSmall: '0.3rem' } } })
  ```

- application level:

  ```jsx
  import { theme } from '@instructure/canvas-high-contrast-theme'
  const themeOverrides = { spacing: { xxxSmall: '0.3rem' } }

  ReactDOM.render(
    <InstUISettingsProvider theme={{ ...theme, ...themeOverrides }}>
      <App />
    </InstUISettingsProvider>,
    element
  )
  ```

[npm]: https://img.shields.io/npm/v/@instructure/canvas-high-contrast-theme.svg
[npm-url]: https://npmjs.com/package/@instructure/canvas-high-contrast-theme
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
