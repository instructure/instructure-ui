---
category: packages
---

## ui-rating

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A static rating component.

### Components

The `ui-rating` package contains the following:

- [Rating](#Rating)

### Installation

```sh
yarn add @instructure/ui-rating
```

### Usage

```js
import React from 'react'
import { Rating } from '@instructure/ui-rating'

const MyRating = () => {
  return (
    <Rating
      label="Product rating"
      size="small"
      iconCount={5}
      valueNow={3.76}
      valueMax={5}
      margin="x-small medium xx-small none"
    />
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-rating.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-rating
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
