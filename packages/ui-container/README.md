---
category: packages
---

## ui-container

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

Use Container as a wrapper to separate content and/or to set the
text alignment for a section of content.

### Installation

```sh
yarn add @instructure/ui-container
```
### Usage

```js
import React from 'react'
import Container from '@instructure/ui-container/lib/components/Container'

export default MyContainer = function () {
  return (
    <Container>
      <Text>Hello from Container</Text>
    </Container>
  )
}
```

### Components
The `ui-container` package contains the following:
- [Container](#Container)

### Contribute

See the [contributing guidelines](#contributing) for details.

### License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/@instructure/ui-container.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-container

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
