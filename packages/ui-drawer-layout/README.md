---
category: packages
---

## ui-drawer-layout

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

A main-content-plus-tray layout component

### Installation

```sh
yarn add @instructure/ui-drawer-layout
```

### Components
The `ui-drawer-layout` package contains the following:
- [DrawerLayout](#DrawerLayout)

### Usage
```js
import React from 'react'
import { DrawerLayout } from '@instructure/ui-drawer-layout'

const MyLayout = () => {
  return (
    <DrawerLayout>
      <DrawerLayout.Tray>Hello from layout tray</DrawerLayout.Tray>
      <DrawerLayout.Content>Hello from layout content</DrawerLayout.Content>
    </DrawerLayout>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-drawer-layout.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-drawer-layout

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
