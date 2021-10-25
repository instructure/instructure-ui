---
category: packages
---

## ui-themes

[![npm][npm]][npm-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

### Installation

```sh
yarn add @instructure/ui-themes
```

### Usage

Before mounting (rendering) your React application:

```js
import { canvas } from '@instructure/ui-themes'

ReactDOM.render(
  <InstUISettingsProvider theme={canvas}>
    <App />
  </InstUISettingsProvider>,
  element
)
```

To override the variables:

```js
import { canvas } from '@instructure/ui-themes'
const themeOverrides = { colors: { brand: 'red' } }

ReactDOM.render(
  <InstUISettingsProvider theme={{ ...canvas, ...themeOverrides }}>
    <App />
  </InstUISettingsProvider>,
  element
)
```

To use the high contrast theme:

```js
import { canvasHighContrast } from '@instructure/ui-themes'

ReactDOM.render(
  <InstUISettingsProvider theme={canvasHighContrast}>
    <App />
  </InstUISettingsProvider>,
  element
)
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-themes.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-themes
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
