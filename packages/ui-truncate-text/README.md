---
category: packages
---

## ui-truncate-text

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][LICENSE]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A TruncateText component made by Instructure Inc.


### Components

The `ui-truncate-text` package contains the following:
- [TruncateText](#TruncateText)


### Installation

```sh
yarn add @instructure/ui-truncate-text
```

### Usage
```js
---
example: false
---
import React from 'react'
import { TruncateText } from '@instructure/ui-truncate-text'

const MyTruncateText = () => {
  return (
    <TruncateText
      position="middle"
      truncate="word"
    >
      <span>This line of text should be truncated from the middle of the string <strong>instead of the end.</strong></span>
    </TruncateText>
  )
}
```


[npm]: https://img.shields.io/npm/v/@instructure/ui-truncate-text.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-truncate-text

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
