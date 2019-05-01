---
category: packages
---

## ui-pages

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

### Example

```js
import React from 'react'
import { Pages, Page } from '@instructure/ui-pages'

const MyPages = () => {
  return (
    <Pages activePageIndex={1}>
      <Page>
        Page One
      </Page>
      <Page>
        Page Two
      </Page>
    </Pages>
  )
}
```

### Installation

```sh
yarn add @instructure/ui-pages
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-pages.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-pages

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
