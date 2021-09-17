---
category: packages
---

## ui-token-scripts

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

Utility scripts for generating cross-platform tokens from InstUI themes.

### Installation

```sh
yarn add @instructure/ui-token-scripts
```

### Supported Platforms & Languages

`ui-token-scripts` currently only targets SCSS. In the future, we will explore adding support for additional platforms and languages.

### Available Commands

#### `generate-tokens <options>`

Generate cross-platform design tokens for the given theme.

#### `generate-all-tokens`

Generate cross-platform design tokens for all themes in configuration.

**Note**: Project root must contain a configuration file containing a collection of configuration objects. This configuration may be leveraged to support theme-specific platform targeting in the future.

```
// ui-token-scripts.config.js

module.exports = [
  {
    themeKey: 'canvas',
    tokensPackage: '@instructure/ui-theme-tokens',
    tokensPath: 'lib/canvas',
  },
  {
    themeKey: 'canvas-ams',
    tokensPackage: '@instructure/ui-theme-tokens',
    tokensPath: 'lib/canvas-ams',
  },
]
```

### Documentation

For more documentation on available options and parameters for individual commands run:

```sh
ui-token-scripts <command> --help
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-token-scripts.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-token-scripts
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
