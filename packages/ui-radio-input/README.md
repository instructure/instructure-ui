---
category: packages
---

## ui-radio-input

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][LICENSE]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A styled HTML input type="radio" element

### Components
The `ui-radio-input` package contains the following:
- [RadioInput](#RadioInput)
- [RadioInputGroup](#RadioInputGroup)


### Installation

```sh
yarn add @instructure/ui-radio-input
```

### Usage
```js
import React from 'react'
import { RadioInput } from '@instrucutre/ui-radio-input'

const MyRadioInput = () => {
  return (
    <RadioInput
      label="Turn on all the features"
      value="foo"
      name="bar"
    />
  )
}
```


[npm]: https://img.shields.io/npm/v/@instructure/ui-radio-input.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-radio-input

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
