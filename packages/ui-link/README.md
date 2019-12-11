---
category: packages
---

## ui-link

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][LICENSE]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A styled HTML link component

### Components
The `ui-link` package contains the following:
- [Link](#Link)

### Installation

```sh
yarn add @instructure/ui-link
```

### Usage
```jsx
---
example: false
---
import React from 'react'
import { Link } from '@instructure/ui-link'

const MyLink = () => {
  return (
    <Text>This is <Link href="http://instructure.design">a link</Link>!</Text>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-link.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-link

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
