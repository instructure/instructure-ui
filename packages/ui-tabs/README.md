---
category: packages
---

## ui-tabs

[![npm][npm]][npm-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

### Components

The `ui-tabs` package contains the following:

- [Tabs](#Tabs)

### Installation

```sh
npm install @instructure/ui-tabs
```

### Usage

```jsx
---
type: code
---
import React from 'react'
import { Tabs } from '@instructure/ui-tabs'

export default MyTabs = function () {
  return (
    <Tabs>
      <Tabs.Panel renderTitle="First Tab">
        Tab One
      </Tabs.Panel>
      <Tabs.Panel renderTitle="Second Tab" isSelected>
        Tab Two
      </Tabs.Panel>
      <Tabs.Panel renderTitle="Third Tab" isDisabled>
        Tab Three
      </Tabs.Panel>
    </Tabs>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-tabs.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-tabs
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
