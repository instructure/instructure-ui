---
category: packages
---

## ui-pill

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

Use Pills to communicate concise status with an identifiable color and supportive text.

### Components

The `ui-pill` package contains the following:

- [Pill](#Pill)

### Installation

```sh
npm install @instructure/ui-pill
```

### Usage

```jsx
---
type: code
---
import React from 'react'
import { Pill } from '@instructure/ui-pill'

const MyPill = () => {
  return (
    <Pill
      color="info"
      margin="x-small"
    >
      Draft
    </Pill>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-pill.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-pill
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
