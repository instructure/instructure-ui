---
category: packages
---

## ui-overlays

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][LICENSE]&nbsp;
[![Code of Conduct][coc-badge]][coc]


### Components
The `ui-overlays` package contains the following:
- [Mask](#Mask)
- [Overlay](#Overlay)

### Deprecated components
The following components have been deprecated and will be removed from the `ui-overlays` package in v 7.0.0:
- [Modal](#DeprecatedModal) \(use [Modal from ui-modal](#Modal) instead)
- [Popover](#DeprecatedPopover) \(use [Popover from ui-popover](#Popover) instead)
- [Tooltip](#DeprecatedTooltip) \(use [Tooltip from ui-tooltip](#Tooltip) instead)
- [Tray](#DeprecatedTray) \(use [Tray from ui-tray](#Tray) instead)


### Installation

```sh
yarn add @instructure/ui-overlays
```

### Usage

```js
import React from 'react'
import { Mask } from '@instructure/ui-overlays'

const MyMask = () => {
  return (
    <Mask>
      <Text>Hello mask</Text>
    </Mask>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-overlays.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-overlays

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
