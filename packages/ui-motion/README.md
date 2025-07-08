## ui-motion

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

### Components

The `ui-motion` package contains the following:

- [Transition](#Transition)

### Installation

```sh
npm install @instructure/ui-motion
```

### Usage

```js
import React from 'react'
import { Heading } from '@instructure/ui-elements'
import { Transition } from '@instructure/ui-motion'

const HeadingWithTransition = () => {
  return (
    <Transition transitionOnMount in>
      <Heading>Hi there!</Heading>
    </Transition>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-motion.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-motion
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
