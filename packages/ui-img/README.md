---
category: packages
---

## ui-img

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

An accessible image component.

### Components

The `ui-img` package contains the following:

- [Img](#Img)

### Installation

```sh
yarn add @instructure/ui-img
```

### Usage

```jsx
---
example: false
---
import React from 'react'
import { Img } from '@instructure/ui-img'

const MyImg = () => {
  return (
    <Img src={placeholderImage(250, 350)} alt="A Placeholder Image" />
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-img.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-img
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
