---
category: packages
---

## ui-tree-browser

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]


### Installation

```sh
yarn add @instructure/ui-tree-browser
```

### Usage

```js
import React from 'react'
import TreeBrowser from '@instructure/ui-tree-browser/lib/components/TreeBrowser'

export default MyTreeBrowser = function () {
  return (
    <TreeBrowser
      collections={{ 1: { id: 1, name: "Collection", items: [1], descriptor: "My Collection" }}}
      items={{ 1: { id: 1, name: "Item"}}}
    />
  )
}
```

### Components
The `ui-tree-browser` package contains the following:
- [TreeBrowser](#TreeBrowser)

### Contribute
See the [contributing guidelines](#contributing) for details.

### License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/@instructure/ui-tree-browser.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-tree-browser

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
