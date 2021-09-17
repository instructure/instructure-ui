---
category: packages
---

## ui-prop-types

[![npm][npm]][npm-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A collection of custom prop type validators.

### Functions

The `ui-prop-types` package contains the following:

- [children](#children)
- [childrenOrValue](#childrenOrValue)
- [controllable](#controllable)
- [cursor](#cursor)
- [element](#element)
- [makeRequirable](#makeRequirable)
- [xor](#xor)

### Installation

```sh
yarn add @instructure/ui-prop-types
```

### Usage

```js
import React from 'react'
import PropTypes from 'prop-types'

import { Children, controllable } from '@instructure/ui-prop-types'

class MyComponent extends React.Component {
  static propTypes = {
    children: Children.oneOf([SomeOtherComponent, AnotherComponent])
    selected: controllable(PropTypes.bool, 'onSelect'),
    onSelect: PropTypes.func
  }
  ...
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-prop-types.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-prop-types
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
