---
category: packages
---

## ui-a11y

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]


### Installation

```sh
yarn add @instructure/ui-a11y
```

### Usage

```js
import React from 'react'
import { AccessibleContent } from '@instructure/ui-a11y'

const MyAccessibleContent = () => {
  return (
    <AccessibleContent alt="Alternative text for a screenreader only">
        Presentational content goes here
    </AccessibleContent>
  )
}
```

### Components
The `ui-a11y` package contains the following components:
- [AccessibleContent](#AccessibleContent)
- [Dialog](#Dialog)
- [PresentationContent](#PresentationContent)
- [ScreenReaderContent](#ScreenReaderContent)

### Utilities
The `ui-a11y` package contains the following utilities:
- [findTabbable](#findTabbable)
- [findFocusable](#findFocusable)
- [FocusManager](#FocusManager)
- [scopeTab](#scopeTab)

### Contribute

See the [contributing guidelines](#contributing) for details.

### License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/@instructure/ui-a11y.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-a11y

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
