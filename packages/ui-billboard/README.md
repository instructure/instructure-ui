---
category: packages
---

## ui-billboard

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A billboard component for empty states, 404 pages, redirects, etc.

### Components

The `ui-billboard` package contains the following:

- [Billboard](#Billboard)

### Installation

```sh
yarn add @instructure/ui-billboard
```

### Usage

```js
---
example: false
---
import React from 'react'
import { Billboard } from '@instructure/ui-billboard'

const MyBillboard = () => {
  return (
    <Billboard
      size="medium"
      heading="Well, this is awkward."
      message="Think there should be something here?"
      hero={<Img src={placeholderImage(900, 500)} />} />
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-billboard.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-billboard
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
