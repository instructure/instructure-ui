## ui-view

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

A component for basic styles including spacing, sizing, borders, display, positioning, and focus states.

### Components

The `ui-view` package contains the following:

- [ContextView](ContextView)
- [View](View)

### Installation

```sh
npm install @instructure/ui-view
```

### Usage

```js
import React from 'react'
import { View } from '@instructure/ui-view'

const MyView = () => {
  return (
    <View as="div" padding="small" borderWidth="small">
      Hello World
    </View>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-view.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-view
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
