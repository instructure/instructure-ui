---
category: packages
---

## ui-text-area

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

A TextArea Component.

### Installation

```sh
yarn add @instructure/ui-text-area
```

### Usage

```js
import React from 'react'
import { TextArea } from '@instructure/ui-text-area'

const MyTextArea = () => {
  return (
    <TextArea
      label="Course Description"
      maxHeight="10rem"
    />
  )
}
```

### Components
The `ui-text-area` package contains the following:
- [TextArea](#TextArea)

### Contribute

See the [contributing guidelines](#contributing) for details.

### License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/@instructure/ui-text-area.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-text-area

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
