---
category: packages
---

## ui-toggle-details

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]


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

### Components
The `ui-toggle-details` package contains the following:
- [ToggleDetails](#ToggleDetails)
- [ToggleGroup](#ToggleGroup)

### Contribute

See the [contributing guidelines](#contributing) for details.

### License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/@instructure/ui-toggle-details.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-toggle-details

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
