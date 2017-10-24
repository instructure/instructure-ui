---
category: packages
---

## ui-layout

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]


### Installation

```sh
yarn add --dev @instructure/ui-layout
```
### Usage

```js
import React from 'react'
import Layout, { LayoutTray, LayoutContent } from '@instructure/ui-layout/lib/components/Layout'

export default MyLayout = function () {
  return (
    <Layout>
      <LayoutTray>Hello from layout tray</LayoutTray>
      <LayoutContent>Hello from layout content</LayoutContent>
    </Layout>
  )
}
```

See more detailed documentation and usage for [Layout](#Layout)

### Contribute

See the [contributing guidelines](#contributing) for details.

### License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/@instructure/ui-layout.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-layout

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
