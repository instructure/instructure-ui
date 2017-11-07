---
category: packages
---

## @instructure/ui-core

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

### Installation

```sh
yarn add @instructure/ui-core
```

### Usage

```js
import React from 'react'
import Heading from '@instructure/ui-core/lib/components/Heading'

export default MyHeading = function () {
  return (
    <Heading>Hello World</Heading>
  )
}
```

For the default theme you'll also need to include the ['Lato' font](http://www.google.com/fonts#UsePlace:use/Collection:Lato:300,400,400i,700,700i) in your application.

### Browser Support

- Internet Explorer 11 and Edge
- Chrome, Safari, Firefox (last two versions)

### Contribute

See the [contributing guidelines](#contributing) for details.

### License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/@instructure/ui-core.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-core

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
