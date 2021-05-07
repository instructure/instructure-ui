---
category: packages
---

## ui-time-select

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

A component for selecting time values.

### Components

The `ui-time-select` package contains the following:

- [TimeSelect](#TimeSelect)

### Installation

```sh
yarn add @instructure/ui-time-select
```

### Usage

```js
import React from 'react'
import { TimeSelect } from '@instructure/ui-time-select'

const MyTimeSelect = () => {
  return <TimeSelect renderLabel="Time Select" />
}
```

For detailed usage and documentation, see TimeSelect examples.

[npm]: https://img.shields.io/npm/v/@instructure/ui-time-select.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-time-select
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
