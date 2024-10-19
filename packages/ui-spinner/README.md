---
category: packages
---

## ui-spinner

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

A spinner/loading component

### Components

The `ui-spinner` package contains the following:

- [Spinner](#Spinner)

### Installation

```sh
npm install @instructure/ui-spinner
```

### Usage

```jsx
---
type: code
---
import React from 'react'
import { Spinner } from '@instructure/ui-spinner'

const MySpinner = () => {
  return (
    <Spinner renderTitle="Loading" />
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-spinner.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-spinner
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
