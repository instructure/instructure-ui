---
category: packages
---

## ui-select

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A component for select and autocomplete behavior.

### Components

The `ui-select` package contains the following:

- [Select](#Select)

### Installation

```sh
yarn add @instructure/ui-select
```

### Usage

```js
import React from 'react'
import { Select } from '@instructure/ui-select'

const MySelect = () => {
  return (
    <Select>
      <Select.Option>Option one</Select.Option>
      <Select.Option>Option two</Select.Option>
    </Select>
  )
}
```

For detailed usage and documentation, see Select examples.

[npm]: https://img.shields.io/npm/v/@instructure/ui-select.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-select
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
