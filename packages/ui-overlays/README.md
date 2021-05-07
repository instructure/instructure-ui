---
category: packages
---

## ui-overlays

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

### Components

The `ui-overlays` package contains the following:

- [Mask](#Mask)
- [Overlay](#Overlay)

### Installation

```sh
yarn add @instructure/ui-overlays
```

### Usage

```js
import React from 'react'
import { Mask } from '@instructure/ui-overlays'

const MyMask = () => {
  return (
    <Mask>
      <Text>Hello mask</Text>
    </Mask>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-overlays.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-overlays
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
