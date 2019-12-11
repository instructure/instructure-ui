---
category: packages
---

## ui-layout

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][LICENSE]&nbsp;
[![Code of Conduct][coc-badge]][coc]

### Deprecated Components
The `ui-layout` package will be removed in version 7.0.0. Please update your imports as follows:
- [Flex](#DeprecatedFlex) will be removed in version 7.0.0. Use [Flex](#Flex) from [ui-flex](#ui-flex).
- [Grid](#DeprecatedGrid) will be removed in version 7.0.0. Use [Grid](#Grid) from [ui-grid](#ui-grid).
- [Media](#DeprecatedMedia) will be removed in version 7.0.0. Use [Byline](#Byline) from [ui-byline](#ui-byline).
- [Position](#DeprecatedPosition) will be removed in version 7.0.0. Use [Position](#Position) from [ui-position](#ui-position).
- [Responsive](#DeprecatedResponsive) will be removed in version 7.0.0. Use [Responsive](#Responsive) from [ui-responsive](#ui-responsive).
- [View](#DeprecatedView) will be removed in version 7.0.0. Use [View](#View) from [ui-view](#ui-view).
- [ContextView](#DeprecatedContextView) will be removed in version 7.0.0. Use [ContextView](#ContextView) from [ui-view](#ui-iew).
- [DrawerLayout](#DeprecatedDrawerLayout) will be removed in version 7.0.0. Use [DrawerLayout](#DrawerLayout) from [ui-drawer-layout](#ui-drawer-layout).

Codemods are provided to assist in updating the packages. See [ui-codemods](#ui-codemods)

### Deprecated Utilities
The `ui-layout` package will be removed in version 7.0.0. Please update your imports as follows:
- `calculateElementPosition` will be removed in version 7.0.0. Use [calculateElementPosition](#calculateElementPosition) from [ui-position](#ui-position).
- `addElementQueryMatchListener` will be removed in version 7.0.0. Use [addElementQueryMatchListener](#addElementQueryMatchListener) from [ui-position](#ui-position).
- `addMediaQueryMatchListener` will be removed in version 7.0.0. Use [addMediaQueryMatchListener](#addMediaQueryMatchListener) from [ui-position](#ui-position).


### Installation

```sh
yarn add @instructure/ui-layout
```
### Usage

```js
import React from 'react'
import { DrawerLayout } from '@instructure/ui-layout'

const MyLayout = () => {
  return (
    <DrawerLayout>
      <DrawerLayout.Tray>Hello from layout tray</DrawerLayout.Tray>
      <DrawerLayout.Content>Hello from layout content</DrawerLayout.Content>
    </DrawerLayout>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-layout.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-layout

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
