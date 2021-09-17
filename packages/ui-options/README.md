---
category: packages
---

## ui-options

[![npm][npm]][npm-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A view-only component for composing interactive lists and menus.

### Components

The `ui-options` package contains the following:

- [Options](#Options)

### Installation

```sh
yarn add @instructure/ui-options
```

### Usage

```js
import React from 'react'
import { Options } from '@instructure/ui-options'

const MyOptions = () => {
  return (
    <Options>
      <Options.Item>Option one</Options.Item>
      <Options.Item>Option two</Options.Item>
    </Options>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-options.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-options
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
