---
category: packages
---

## ui-themes

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

### Installation

```sh
npm install @instructure/ui-themes
```

### Usage

##### Before mounting (rendering) your React application:

- application level theming:

  ```jsx
  ---
  type: code
  ---
  import canvas from '@instructure/ui-themes'

  ReactDOM.render(
    <InstUISettingsProvider theme={canvas}>
      <App />
    </InstUISettingsProvider>,
    element
  )
  ```

- (DEPRECATED) global theming:

  ```js
  ---
  type: code
  ---
  import canvas from '@instructure/ui-themes'

  canvas.use()
  ```

##### To override the theme variables:

- (DEPRECATED) globally:

  ```js
  ---
  type: code
  ---
  import canvas from '@instructure/ui-themes'

  canvas.use({ overrides: { colors: { brand: 'red' } } })
  ```

- application level:

  ```jsx
  ---
  type: code
  ---
  import canvas from '@instructure/ui-themes'
  const themeOverrides = { colors: { brand: 'red' } }

  ReactDOM.render(
    <InstUISettingsProvider theme={{ ...canvas, ...themeOverrides }}>
      <App />
    </InstUISettingsProvider>,
    element
  )
  ```

> You can read more about how our theming system works and how to use it [here](/#using-theme-overrides)

[npm]: https://img.shields.io/npm/v/@instructure/ui-themes.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-themes
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
