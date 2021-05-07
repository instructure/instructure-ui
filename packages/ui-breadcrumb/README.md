---
category: packages
---

## ui-breadcrumb

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A breadcrumb component.

### Components

The `ui-breadcrumb` package contains the following:

- [Breadcrumb](#Breadcrumb)

### Installation

```sh
yarn add @instructure/ui-breadcrumb
```

### Usage

```jsx
---
example: false
---
import React from 'react'
import { Breadcrumb } from '@instructure/ui-breadcrumb'

const MyBreadcrumb = () => {
  return (
    <Breadcrumb label="You are here">
      <Breadcrumb.Link href="https://instructure.github.io/instructure-ui/">Course A</Breadcrumb.Link>
      <Breadcrumb.Link href="https://instructure.github.io/instructure-ui/">Modules</Breadcrumb.Link>
      <Breadcrumb.Link>A Great Module</Breadcrumb.Link>
    </Breadcrumb>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-breadcrumb.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-breadcrumb
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
