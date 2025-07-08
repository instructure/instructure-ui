## babel-plugin-transform-imports

This will convert any non-default imports that are referencing the package only to reference the full path to the module instead. For example:

```js
---
  type: code
---
// a named member import:
import { Text } from '@instructure/ui-elements'
```

would be converted to

```js
---
  type: code
---
// a named import using the full module path:
import { Text } from '@instructure/ui-elements/lib/Text'
```

Note that any default imports you are currently using will not be transformed:

```js
---
  type: code
---
// a default import using the full path (will not be transformed):
import Text from '@instructure/ui-elements/lib/Text'
```

Note that this plugin will fail if the exported name is not the filename! This means that it cannot handle multiple exports from the same file.

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

A babel plugin made by Instructure Inc.

### Installation

```sh
npm install @instructure/babel-plugin-transform-imports
```

[npm]: https://img.shields.io/npm/v/@instructure/babel-plugin-transform-imports.svg
[npm-url]: https://npmjs.com/package/@instructure/babel-plugin-transform-imports
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
