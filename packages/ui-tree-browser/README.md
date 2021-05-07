---
category: packages
---

## ui-tree-browser

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A component for displaying a hierarchical view of information.

### Components

The `ui-tree-browser` package contains the following:

- [TreeBrowser](#TreeBrowser)

### Installation

```sh
yarn add @instructure/ui-tree-browser
```

### Usage

```js
import React from 'react'
import { TreeBrowser } from '@instructure/ui-tree-browser'

const MyTreeBrowser = () => {
  return (
    <TreeBrowser
      collections={{
        1: {
          id: 1,
          name: 'Collection',
          items: [1],
          descriptor: 'My Collection'
        }
      }}
      items={{ 1: { id: 1, name: 'Item' } }}
    />
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-tree-browser.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-tree-browser
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
