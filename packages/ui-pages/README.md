## ui-pages

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

### Components

The `ui-pages` package contains the following:

- [Pages](Pages)

### Installation

```sh
npm install @instructure/ui-pages
```

### Usage

```js
import React from 'react'
import { Pages } from '@instructure/ui-pages'

const MyPages = () => {
  return (
    <Pages activePageIndex={1}>
      <Pages.Page>Page One</Pages.Page>
      <Pages.Page>Page Two</Pages.Page>
    </Pages>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-pages.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-pages
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
