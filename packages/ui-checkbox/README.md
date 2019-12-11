---
category: packages
---

## ui-checkbox

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][LICENSE]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A styled HTML input type="checkbox" component.

### Components
The `ui-checkbox` package contains the following:
- [Checkbox](#Checkbox)
- [CheckboxGroup](#CheckboxGroup)

### Installation

```sh
yarn add @instructure/ui-checkbox
```

### Usage
```js
import React from 'react'
import { Checkbox } from '@instructure/ui-checkbox'

const MyCheckbox = () => {
  return (
     <Checkbox label="Turn on Features for all Participants" value="on" />
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-checkbox.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-checkbox

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
