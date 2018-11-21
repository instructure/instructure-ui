---
category: packages
---

## ui-number-input

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

This package contains the `NumberInput` component. This is a low-level
controlled component that only handles rendering. All behavior (stepping, number
parsing, localization, etc.) should be handled by a wrapper component.

### Installation

```sh
yarn add @instructure/ui-number-input
```

### Usage

```js
import React from 'react'
import NumberInput from '@instructure/ui-number-input'

export default function Example () {
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

See [this working example][example] for details.

### License

[MIT][license]

[npm]: https://img.shields.io/npm/v/@instructure/ui-forms.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-forms

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md

[example]: https://instructure.design/#NumberInputControlled
