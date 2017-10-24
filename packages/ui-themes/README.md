---
category: packages
---

## @instructure/ui-themes

[npm]: https://img.shields.io/npm/v/@instructure/ui-themes.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-themes

[![npm][npm]][npm-url]

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
