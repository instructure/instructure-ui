---
category: packages
---

## ui-overlays

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]


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

### Components
The `ui-overlays` package contains the following:
- [Mask](#Mask)
- [Overlay](#Overlay)
- [Tray](#Tray)

### Deprecated components
The following components have been deprecated and will be removed from the `ui-overlays` package:
- [Popover](#DeprecatedPopover) \(use [Popover from ui-popover](#Popover) instead)
- [Tooltip](#DeprecatedTooltip) \(use [Tooltip from ui-tooltip](#Tooltip) instead)
- [Modal](#DeprecatedModal) \(use [Modal from ui-modal](#Modal) instead)

### Contribute
See the [contributing guidelines](#contributing) for details.

### License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/@instructure/ui-overlays.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-overlays

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
