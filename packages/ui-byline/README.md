## ui-byline

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

A byline component.

### Components

The `ui-byline` package contains the following:

- [Byline](Byline)

### Installation

```sh
npm install @instructure/ui-byline
```

### Usage

```js
import React from 'react'
import { Byline } from '@instructure/ui-byline'

const MyByline = () => {
  return (
    <Byline description={lorem.sentence()}>
      <Avatar name="Julia Childer" />
    </Byline>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-byline.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-byline
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
