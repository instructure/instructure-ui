---
category: packages
---

## ui-pagination

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

### Components

The `ui-pagination` package contains the following:

- [Pagination](#Pagination)

### Installation

```sh
yarn add @instructure/ui-pagination
```

### Usage

```js
import React from 'react'
import { Pagination } from '@instructure/ui-pagination'

const MyPagination = () => {
  return (
    <Pagination>
      <Pagination.Page current>1</Pagination.Page>
      <Pagination.Page>2</Pagination.Page>
      <Pagination.Page>3</Pagination.Page>
    </Pagination>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-pagination.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-pagination
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
