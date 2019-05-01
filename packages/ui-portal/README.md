---
category: packages
---

## ui-portal

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

### Installation

```sh
yarn add @instructure/ui-portal
```

### Usage

```js
import React from 'react'
import { Portal } from '@instructure/ui-portal'

const MyPortal = () => {
  return (
    <Portal open>
      <Text>Hello from Portal</Text>
    </Portal>
  )
}
```

### Components
The `ui-portal` package contains the following:
- [Portal](#Portal)

### Contribute

See the [contributing guidelines](#contributing) for details.

### License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/@instructure/ui-portal.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-portal

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
