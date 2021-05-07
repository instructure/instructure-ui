---
category: packages
---

## ui-drawer-layout

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A main-content-plus-tray layout component

### Components

The `ui-drawer-layout` package contains the following:

- [DrawerLayout](#DrawerLayout)

### Installation

```sh
yarn add @instructure/ui-drawer-layout
```

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
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
