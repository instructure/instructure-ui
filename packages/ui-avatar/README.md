---
category: packages
---

## ui-avatar

[![npm][npm]][npm-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

An image or letters that represents a user.

### Components

The `ui-avatar` package contains the following:

- [Avatar](#Avatar)

### Installation

```sh
npm install @instructure/ui-avatar
```

### Usage

```jsx
---
type: example
---
import React from 'react'
import { Avatar } from '@instructure/ui-avatar'

const MyAvatar = () => {
  return (
    <Avatar
      name="Kyle Montgomery"
      src={avatarSquare}
      shape="rectangle"
      margin="0 small 0 0"
    />
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-avatar.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-avatar
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
