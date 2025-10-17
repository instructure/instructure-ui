## ui-buttons

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

Accessible button components.

### Components

The `ui-buttons` package contains the following:

- [Button](Button)
- [CloseButton](CloseButton)
- [CondensedButton](CondensedButton)
- [IconButton](IconButton)
- [ToggleButton](ToggleButton)

### Installation

```sh
npm install @instructure/ui-buttons
```

### Usage

```js
import React from 'react'
import { Button } from '@instructure/ui-buttons'

const MyButton = function () {
  return <Button>Hello button</Button>
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-buttons.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-buttons
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
