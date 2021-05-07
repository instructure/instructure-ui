---
category: packages
---

## ui-toggle-details

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A styled toggleable, accordion-like component.

### Components

The `ui-toggle-details` package contains the following:

- [ToggleDetails](#ToggleDetails)
- [ToggleGroup](#ToggleGroup)

### Installation

```sh
yarn add @instructure/ui-toggle-details
```

### Usage

```js
import React from 'react'
import { ToggleDetails } from '@instructure/ui-toggle-details'

const MyToggleDetails = () => {
  return (
    <ToggleDetails summary="Hello toggle">
      <Text>Hello details</Text>
    </ToggleDetails>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-toggle-details.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-toggle-details
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
