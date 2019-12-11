---
category: packages
---

## ui-badge

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][LICENSE]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A badge component.

### Components
The `ui-badge` package contains the following:
- [Badge](#Badge)


### Installation

```sh
yarn add @instructure/ui-badge
```

### Usage
```jsx
---
example: false
---
import React from 'react'
import { Badge } from '@instructure/ui-badge'

const MyBadge = () => {
  return (
    <Badge count={99}>
      <Button>Edits</Button>
    </Badge>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-badge.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-badge

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
