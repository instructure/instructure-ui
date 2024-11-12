---
category: packages
---

## ui-checkbox

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

A styled HTML input type="checkbox" component.

### Components

The `ui-checkbox` package contains the following:

- [Checkbox](#Checkbox)
- [CheckboxGroup](#CheckboxGroup)

### Installation

```sh
npm install @instructure/ui-checkbox
```

### Usage

```js
import React from 'react'
import { Checkbox } from '@instructure/ui-checkbox'

const MyCheckbox = () => {
  return <Checkbox label="Turn on Features for all Participants" value="on" />
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-checkbox.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-checkbox
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
