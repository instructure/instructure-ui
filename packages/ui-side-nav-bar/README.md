---
category: packages
---

## ui-side-nav-bar

[![npm][npm]][npm-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

Main and application level navigational components.

### Components

The `ui-side-nav-bar` package contains the following:

- [SideNavBar](#SideNavBar)
- [AppNav](#AppNav)

### Installation

```sh
yarn add @instructure/ui-side-nav-bar
```

### Usage

```js
import React from 'react'
import { SideNavBar } from '@instructure/ui-side-nav-bar'
import { Avatar } from '@instructure/ui-avatar'

const MySideNavBar = () => {
  return (
    <SideNavBar label="My SideNavBar">
      <SideNavBar.Item
        icon={<Avatar name="Joel Andrews" size="x-small" />}
        label="My Account"
        href="http://example.com"
      />
    </SideNavBar>
  )
}
```

For detailed usage and documentation, see individual component examples.

[npm]: https://img.shields.io/npm/v/@instructure/ui-side-nav-bar.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-side-nav-bar
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
