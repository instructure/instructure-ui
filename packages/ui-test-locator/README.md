---
category: packages
---

## ui-test-locator

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

A locator component for finding components by their defined selector in tests.

### Installation

```sh
yarn add @instructure/ui-test-locator
```

### Usage

```javascript
// MyComponent.js
import { testable } from '@instructure/ui-testable'

@testable()
export class MyComponent extends React.Component {
  ...
}

// MyComponentLocator.js
import { locator } from '@instructure/ui-test-locator'
import { MyComponent } from './MyComponent'

export const MyComponentLocator = locator(MyComponent.selector)

// MyComponent.test.js
import { MyComponent } from './MyComponent'
import { MyComponentLocator } from './MyComponentLocator.js'

it('should render', () => {
  await mount(<MyComponent />)

  const myComponent = await MyComponentLocator.find()

  expect(myComponent).to.exist()
})
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-test-locator.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-test-locator

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
