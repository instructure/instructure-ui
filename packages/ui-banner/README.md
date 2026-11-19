## ui-banner

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

A banner component for highlighted, non-urgent messages.

### Components

The `ui-banner` package contains the following:

- [Banner](Banner)

### Installation

```sh
npm install @instructure/ui-banner
```

### Usage

```js
import React from 'react'
import { Banner } from '@instructure/ui-banner'

const MyBanner = function () {
  return <Banner title="Hello">Hello banner</Banner>
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-banner.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-banner
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
