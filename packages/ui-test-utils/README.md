---
category: packages
---

## ui-test-utils

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A UI testing library made by Instructure Inc.

### Installation

```sh
yarn add @instructure/ui-test-utils
```

### Usage

```javascript
import { mount, expect, find } from '@instructure/ui-test-utils'

import MyComponent from '../'

it('should render children', async () => {
  await mount(<MyComponent>Hello World</MyComponent>)
  expect(await find(':contains(Hello World)')).to.exist()
})
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-test-utils.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-test-utils
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
