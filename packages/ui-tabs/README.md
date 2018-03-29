---
category: packages
---

## ui-tabs

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]


### Installation

```sh
yarn add @instructure/ui-tabs
```

### Usage

```js
import React from 'react'
import TabList, { TabPanel } from '@instructure/ui-tabs/lib/components'

export default MyTabList = function () {
  return (
    <TabList defaultSelectedIndex={1}>
      <TabPanel title="First Tab">
        Tab One
      </TabPanel>
      <TabPanel title="Second Tab">
        Tab Two (selected)
      </TabPanel>
    </TabList>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-tabs.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-tabs

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
