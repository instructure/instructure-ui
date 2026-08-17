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

```jsx
import canvas from '@instructure/ui-themes'

ReactDOM.render(
  <InstUISettingsProvider theme={canvas}>
    <App />
  </InstUISettingsProvider>,
  element
)
```

##### To override the theme variables:

```jsx
import canvas from '@instructure/ui-themes'
const themeOverrides = { colors: { brand: 'red' } }

ReactDOM.render(
  <InstUISettingsProvider theme={{ ...canvas, ...themeOverrides }}>
    <App />
  </InstUISettingsProvider>,
  element
)
```

##### Using the themes as CSS custom properties:

Every theme also ships as a plain stylesheet that declares its shared tokens as CSS custom
properties. Import the one you need directly from the package:

```js
import '@instructure/ui-themes/light.css'
import '@instructure/ui-themes/dark.css'
import '@instructure/ui-themes/legacyCanvas.css'
import '@instructure/ui-themes/legacyCanvasHighContrast.css'
```

Each of these scopes its custom properties to a class named `instui-theme-` plus the theme
name — `instui-theme-light`, `instui-theme-dark`, `instui-theme-legacyCanvas`, and
`instui-theme-legacyCanvasHighContrast`. Pick a theme by putting that class on an element.
Everything inside it reads the theme's values:

```html
<div class="instui-theme-light">
  <!-- --colors-* and the other tokens resolve to the light theme here -->
</div>
```

There is one more stylesheet that follows the operating system setting instead of a class. It
declares the light theme on `:root` and swaps to the dark theme under
`prefers-color-scheme: dark`:

```js
import '@instructure/ui-themes/cssThemesWithMediaQueries.css'
```

> You can read more about how our theming system works and how to use it:

- [Legacy theme overrides](/#legacy-theme-overrides).
- [New theme overrides](/#new-theme-overrides).

[npm]: https://img.shields.io/npm/v/@instructure/ui-themes.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-themes
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
