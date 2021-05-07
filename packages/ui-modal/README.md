---
category: packages
---

## ui-modal

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A component for displaying content in a dialog overlay.

### Components

The `ui-modal` package contains the following:

- [Modal](#Modal)

### Installation

```sh
yarn add @instructure/ui-modal
```

### Usage

```js
import React from 'react'
import { Modal } from '@instructure/ui-modal'

const MyModal = () => {
  return (
    <Modal>
      <Modal.Header>My Modal</Modal.Header>
      <Modal.Content>Hello world</Modal.Content>
    </Modal>
  )
}
```

For detailed usage and documentation, see Modal examples.

[npm]: https://img.shields.io/npm/v/@instructure/ui-modal.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-modal
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
