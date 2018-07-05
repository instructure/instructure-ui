---
category: packages
---

## ui-focusable

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]


### Installation

```sh
yarn add @instructure/ui-focusable
```

### Usage

```js
import React from 'react'
import Focusable from '@instructure/ui-focusable/lib/components/Focusable'

export default MyFocusable = function () {
  return (
    <Focusable>
    {({ focused }) => (
      <FocusableView focused={focused}>
        Hello! Focus me!
      </FocusableView>
    )}
    </Focusable>
  )
}
```

### Components
The `ui-focusable` package contains the following:
- [Focusable](#Focusable)

[npm]: https://img.shields.io/npm/v/@instructure/ui-focusable.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-focusable

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
