---
category: packages
---

## ui-elements

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]


### Installation

```sh
yarn add @instructure/ui-elements
```

### Usage

```js
import React from 'react'
import { Avatar } from '@instructure/ui-elements'

const MyAvatar = () => {
  return (
    <Avatar name="Kyle Montgomery" />
  )
}
```

### Components
The `ui-elements` package contains the following:
- Avatar will be removed in version 7.0.0. Use the [Avatar from ui-avatar](#Avatar) instead.
- [Badge](#Badge)
- Img will be removed in version 7.0.0. Use the [Img from ui-img](#Img) instead.
- Link will be removed in version 7.0.0. Use the [Link from ui-link](#Link) instead.
- Heading will be removed in version 7.0.0. Use the [Heading from ui-heading](#Heading) instead.
- [List](#List)
- [MetricsList](#MetricsList)
- Pill will be removed in version 7.0.0. Use the [Pill from ui-pill](#Pill) instead.
- Progress will be removed in version 7.0.0. Use [ProgressBar](#ProgressBar) or [ProgressCircle](#ProgressCircle) from `ui-progress` instead.
- [Rating](#Rating)
- [Spinner](#Spinner)
- [Table (deprecated)](#DeprecatedTable)
- [Tag](#Tag)
- Text will be removed in version 7.0.0. Use the [Text from ui-text](#Text) instead.
- [TruncateText](#TruncateText)

### Contribute

See the [contributing guidelines](#contributing) for details.

### License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/@instructure/ui-elements.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-elements

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
