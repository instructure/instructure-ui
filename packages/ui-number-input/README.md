---
category: packages
---

## ui-number-input

[![npm][npm]][npm-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A low-level controlled number input component that only handles rendering. All behavior (stepping, number
parsing, localization, etc.) should be handled by a wrapper component.

### Components

- [NumberInput](#NumberInput)

### Installation

```sh
npm install @instructure/ui-number-input
```

### Usage

```js
import React from 'react'
import { NumberInput } from '@instructure/ui-number-input'

const MyNumber = () => {
  return (
    <NumberInput
      label="..."
      onChange={...}
      onDecrement={...}
      onIncrement={...}
      value={...}
    />
  )
}
```

For detailed usage and documentation, see NumberInput examples.

[npm]: https://img.shields.io/npm/v/@instructure/ui-number-input.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-number-input
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
