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
- [Avatar](#DeprecatedAvatar) will be removed in version 7.0.0. Use the [Avatar](#Avatar) from [ui-avatar](#ui-avatar).
- [Badge](#Badge)
- [Img](#DeprecatedImg) will be removed in version 7.0.0. Use [Img](#Img) from [ui-img](#ui-img).
- [Link](#DeprecatedLink) will be removed in version 7.0.0. Use [Link](#Link) from [ui-link](#ui-link).
- [Heading](#DeprecatedHeading) will be removed in version 7.0.0. Use the [Heading](#Heading) from [ui-heading](#ui-heading).
- [List](#DeprecatedList) will be removed in version 7.0.0. Use [List](#List) or [InlineList](#InlineList) from [ui-list](#ui-list).
- [MetricsList](#DeprecatedMetricsList) will be removed in version 7.0.0. Use the [MetricGroup](#MetricGroup) or [Metric](#Metric) from [ui-metric](#ui-metric).
- [Pill](#DeprecatedPill) will be removed in version 7.0.0. Use [Pill](#Pill) from [ui-pill](#ui-pill).
- Progress will be removed in version 7.0.0. Use [ProgressBar](#ProgressBar) or [ProgressCircle](#ProgressCircle) from `ui-progress` instead.
- [Rating](#DeprecatedRating) will be removed in version 7.0.0. Use the [Rating](#Rating) in [ui-rating](#ui-rating).
- [Spinner](#Spinner)
- [Table](#DeprecatedTable) has been deprecated within this package. Use [Table](#Table) from [ui-table](#ui-table).
- [Tag](#Tag)
- [Text](#DeprecatedText) will be removed in version 7.0.0. Use [Text](#Text) from [ui-text](#ui-text).
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
