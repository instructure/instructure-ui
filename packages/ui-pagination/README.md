---
category: packages
---

## ui-pagination

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]


### Installation

```sh
yarn add --dev @instructure/ui-pagination
```

### Usage

```js
import React from 'react'
import Pagination, { PaginationButton } from '@instructure/ui-pagination/lib/components/Pagination'

export default MyPagination = function () {
  return (
    <Pagination>
      <PaginationButton current>1</PaginationButton>
      <PaginationButton>2</PaginationButton>
      <PaginationButton>3</PaginationButton>
    </Pagination>
  )
}
```

### Components
The `ui-pagination` package contains the following:
- [Pagination](#Pagination)

### Contribute

See the [contributing guidelines](#contributing) for details.

### License

[npm]: https://img.shields.io/npm/v/@instructure/ui-pagination.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-pagination

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
