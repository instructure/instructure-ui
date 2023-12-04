---
category: packages
---

## ui-range-input

[![npm][npm]][npm-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A styled HTML range input.

### Components

The `ui-range-input` package contains the following:

- [RangeInput](#RangeInput)

### Installation

```sh
npm install @instructure/ui-range-input
```

### Usage

```jsx
---
type: code
---
import React from 'react'
import { RangeInput } from '@instructure/ui-range-input'

const MyRange = () => {
  return (
    <RangeInput
      label="Grading range"
      defaultValue={50}
      max={100}
      min={0}
    />
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-range-input.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-range-input
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
