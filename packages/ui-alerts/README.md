---
category: packages
---

## ui-alerts

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][LICENSE]&nbsp;
[![Code of Conduct][coc-badge]][coc]

An alert component.

### Components
The `ui-alerts` package contains the following:
- [Alert](#Alert)


### Installation

```sh
yarn add @instructure/ui-alerts
```

### Usage

```js
import React from 'react'
import { Alert } from '@instructure/ui-alerts'

const MyAlert = function () {
  return (
    <Alert>Hello alert</Alert>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-alerts.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-alerts

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
