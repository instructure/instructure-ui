---
category: packages
---

## ui-dialog

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A utility component for managing keyboard accessibility and screen reader behavior.

### Components

The `ui-dialog` package contains the following:

- [Dialog](#Dialog)

### Installation

```sh
yarn add @instructure/ui-dialog
```

### Usage

```js
import React from 'react'
import { Dialog } from '@instructure/ui-dialog'

const MyDialog = () => {
  return <Dialog open={this.state.open}>Hello world</Dialog>
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-dialog.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-dialog
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
