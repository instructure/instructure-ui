## ui-icons-lucide

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

Lucide icon library with InstUI theming and RTL support.

### Components

The `ui-icons-lucide` package contains the following:

- 1,500+ Lucide icons wrapped with InstUI theming
- [wrapLucideIcon](wrapLucideIcon) - HOC for wrapping Lucide icons

### Installation

```sh
pnpm install @instructure/ui-icons-lucide lucide-react
```

### Usage

```jsx
---
type: code
---
import React from 'react'
import { Plus, ArrowLeft, Check } from '@instructure/ui-icons-lucide'

const MyComponent = () => {
  return (
    <div>
      <Plus size="medium" />
      <ArrowLeft size={24} />
      <Check size="large" color="success" />
    </div>
  )
}
```

For detailed usage and documentation, see [Lucide Icons documentation](https://instructure.design/#lucide-icons).

[npm]: https://img.shields.io/npm/v/@instructure/ui-icons-lucide.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-icons-lucide
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
