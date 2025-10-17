## ui-badge

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

A badge component.

### Components

The `ui-badge` package contains the following:

- [Badge](Badge)

### Installation

```sh
npm install @instructure/ui-badge
```

### Usage

```jsx
---
type: code
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
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
