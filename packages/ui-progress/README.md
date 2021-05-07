---
category: packages
---

## ui-progress

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A styled HTML 'progress' element

### Components

The `ui-progress` package contains the following:

- [ProgressBar](#ProgressBar)
- [ProgressCircle](#ProgressCircle)

### Installation

```sh
yarn add @instructure/ui-progress
```

### Usage

```jsx
---
example: false
---
import React from 'react'
import { ProgressBar } from '@instructure/ui-progress'

const MyProgress = () => {
  return (
    <ProgressBar
      screenReaderLabel="Loading completion"
      valueNow={40}
      valueMax={60}
    />
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-progress.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-progress
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
