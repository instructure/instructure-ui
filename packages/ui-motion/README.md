---
category: packages
---

## ui-motion

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]


### Installation

```sh
yarn add --dev @instructure/ui-motion
```

### Usage

```js
import React from 'react'
import Heading from '@instructure/ui-elements/lib/components/Heading'
import Transition from '@instructure/ui-motion/lib/components/Transition'

export default MyTransition = function () {
  return (
    <Transition transitionOnMount in>
      <Heading>Hi there!</Heading>
    </Transition>
  )
}
```

### Components
The `ui-motion` package contains the following:
- [Transition](#Transition)

### Contribute
See the [contributing guidelines](#contributing) for details.

[npm]: https://img.shields.io/npm/v/@instructure/ui-motion.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-motion

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
