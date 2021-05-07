---
category: packages
---

## babel-plugin-transform-imports

This will convert any non-default imports that are referencing the package only to reference the full path to the module instead. For example:

```js
// a named member import:
import { Text } from '@instructure/ui-elements'

would be converted to

// a named import using the full module path:
import { Text } from '@instructure/ui-elements/lib/Text'

Note that any default imports you are currently using will not be transformed:

// a default import using the full path (will not be transformed):
import Text from '@instructure/ui-elements/lib/Text'
```

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A babel plugin made by Instructure Inc.

### Installation

```sh
yarn add @instructure/babel-plugin-transform-imports
```

[npm]: https://img.shields.io/npm/v/@instructure/babel-plugin-transform-imports.svg
[npm-url]: https://npmjs.com/package/@instructure/babel-plugin-transform-imports
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
