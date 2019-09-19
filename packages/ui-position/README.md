---
category: packages
---

## ui-position

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

A component for positioning content with respect to a designated target.

### Installation

```sh
yarn add @instructure/ui-position
```

### Usage
For detailed usage and documentation, see [Position](#Position).

```js
import React from 'react'
import { Position } from '@instructure/ui-position'

const MyPosition = () => {
  return (
    <Position renderTarget={<div>Target</div>}>
      Hello world
    </Position>
  )
}
```
[npm]: https://img.shields.io/npm/v/@instructure/ui-position.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-position

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
