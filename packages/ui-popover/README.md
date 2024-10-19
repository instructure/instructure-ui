---
category: packages
---

## ui-popover

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

A component for hiding or showing content based on user interaction.

### Components

The `ui-popover` package contains the following:

- [Popover](#Popover)

### Installation

```sh
npm install @instructure/ui-popover
```

### Usage

For detailed usage and documentation, see [Popover](#Popover).

```js
import React from 'react'
import { Popover } from '@instructure/ui-popover'

const MyPopover = () => {
  return (
    <Popover on="click" renderTrigger={<button>Click me!</button>}>
      Hello world
    </Popover>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-popover.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-popover
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
