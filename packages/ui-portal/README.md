---
category: packages
---

## ui-portal

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

### Components

The `ui-portal` package contains the following:

- [Portal](#Portal)

### Installation

```sh
npm install @instructure/ui-portal
```

### Usage

```js
import React from 'react'
import { Portal } from '@instructure/ui-portal'

const MyPortal = () => {
  return (
    <Portal open>
      <Text>Hello from Portal</Text>
    </Portal>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-portal.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-portal
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
