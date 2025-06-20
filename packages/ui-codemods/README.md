---
category: packages
---

## ui-codemods

The `ui-codemods` package should make it easier to deal with API changes when upgrading Instructure UI libraries.

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

### Installation

The codemod scripts can be installed via the following command:

```sh
---
type: code
---
# use here the InstUI version number you are upgrading to
npm install @instructure/ui-codemods@10
```

### Codemod for changing the color palette to the v10 color palette

```sh
---
type: code
---
npx jscodeshift@17.3.0 -t node_modules/@instructure/ui-codemods/lib/updateV10Breaking.ts <path> --usePrettier=false
```

This codemod updates the `canvas` and `canvas-high-contrast` color palettes. Execute this in your project post-upgrade to InstUI v10. Prettier is turned on by default for output formatting, and you can also use the `usePrettier` flag.

[npm]: https://img.shields.io/npm/v/@instructure/ui-codemods.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-codemods
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
