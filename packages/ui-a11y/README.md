---
category: packages
---

## ui-a11y

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][LICENSE]&nbsp;
[![Code of Conduct][coc-badge]][coc]

### Deprecated Components
The `ui-a11y` package contains will be removed in v7.0.0. Please update your imports as follows:
- `AccessibleContent` will be removed in version 7.0.0. Use [AccessibleContent](#AccessibleContent) from [ui-a11y-content](#ui-a11y-content) instead.
- `PresentationContent` will be removed in version 7.0.0. Use [PresentationContent](#PresentationContent) [ui-a11y-content](#ui-a11y-content) instead.
- `ScreenReaderContent` will be removed in version 7.0.0. Use [ScreenReaderContent](#ScreenReaderContent) [ui-a11y-content](#ui-a11y-content) instead.

### Deprecated Utilities
- `Dialog` will be removed in version 7.0.0. Use [Dialog](#Dialog) from [ui-dialog](#ui-dialog) instead.
- `findTabbable` will be removed in version 7.0.0. Use [findTabbable](#findTabbable) from [ui-dom-utils](#ui-dom-utils) instead.
- `findFocusable` will be removed in version 7.0.0. Use [findFocusable](#findFocusable) from [ui-dom-utils](#ui-dom-utils) instead.
- `FocusRegion` will be removed in version 7.0.0. Use [FocusRegion](#FocusRegion) from [ui-a11y-utils](#ui-a11y-utils) instead.
- `scopeTab` will be removed in version 7.0.0. Use [findTabbable](#findTabbable) from [ui-a11y-utils](#ui-a11y-utils) instead.

### Installation

```sh
yarn add @instructure/ui-a11y
```

### Usage

```js
import React from 'react'
import { Dialog } from '@instructure/ui-a11y'

const MyAccessibleContent = () => {
  return (
    <AccessibleContent alt="Alternative text for a screenreader only">
        Presentational content goes here
    </AccessibleContent>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-a11y.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-a11y

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
