---
category: packages
---

## ui-tooltip

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][LICENSE]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A component for showing small text-only overlays on hover/focus.

### Components
The `ui-tooltip` package contains the following:
- [Tooltup](#Tooltip)


### Installation

```sh
yarn add @instructure/ui-tooltip
```

### Usage

```js
import React from 'react'
import { Tooltip } from '@instructure/ui-tooltip'

const MyTooltip = () => {
  return (
    <Tooltip renderTip="Hello world">
      Hover or focus me
    </Popover>
  )
}
```
For detailed usage and documentation, see Tooltip examples.


[npm]: https://img.shields.io/npm/v/@instructure/ui-tooltip.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-tooltip

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
