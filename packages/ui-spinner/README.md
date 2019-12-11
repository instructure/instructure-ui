---
category: packages
---

## ui-spinner

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][LICENSE]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A spinner/loading component

### Components
The `ui-spinner` package contains the following:
- [Spinner](#Spinner)


### Installation

```sh
yarn add @instructure/ui-spinner
```

### Usage
```jsx
---
example: false
---
import React from 'react'
import { Spinner } from '@instructure/ui-spinner'

const MySpinner = () => {
  return (
    <Spinner renderTitle="Loading" />
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-spinner.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-spinner

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
