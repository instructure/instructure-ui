---
category: packages
---

## ui-menu

[![npm][npm]][npm-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A dropdown menu component.

### Components

The `ui-menu` package contains the following:

- [Menu](#Menu)

### Installation

```sh
yarn add @instructure/ui-menu
```

### Usage

```js
import React from 'react'
import { Menu } from '@instructure/ui-menu'

const MyMenu = () => {
  return (
    <Menu>
      <Menu.Item value="foo">Foo</Menu.Item>
      <Menu.Item value="bar">Bar</Menu.Item>
    </Menu>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-menu.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-menu
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
