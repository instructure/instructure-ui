---
category: packages
---

## ui-buttons

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][LICENSE]&nbsp;
[![Code of Conduct][coc-badge]][coc]

Accessible button components.

### Components
The `ui-buttons` package contains the following:
- [Button](#Button)
- [CloseButton](#CloseButton)
- [CondensedButton](#CondensedButton)
- [IconButton](#IconButton)


### Installation

```sh
yarn add @instructure/ui-buttons
```

### Usage

```js
import React from 'react'
import { Button } from '@instructure/ui-buttons'

const MyButton = function () {
  return (
    <Button>Hello button</Button>
  )
}
```


[npm]: https://img.shields.io/npm/v/@instructure/ui-buttons.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-buttons

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
