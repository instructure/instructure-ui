## ui-simple-select

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

A component for standard select element behavior.

### Components

The `ui-simple-select` package contains the following:

- [SimpleSelect](#SimpleSelect)

### Installation

```sh
npm install @instructure/ui-simple-select
```

### Usage

```js
import React from 'react'
import { Select } from '@instructure/ui-select'

const MySelect = () => {
  return (
    <SimpleSelect>
      <SimpleSelect.Option>Option one</SimpleSelect.Option>
      <SimpleSelect.Option>Option two</SimpleSelect.Option>
    </SimpleSelect>
  )
}
```

For detailed usage and documentation, see SimpleSelect examples.

[npm]: https://img.shields.io/npm/v/@instructure/ui-simple-select.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-simple-select
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
