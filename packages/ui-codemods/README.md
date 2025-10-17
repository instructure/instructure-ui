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
npm install @instructure/ui-codemods@11
```

Then run them with `jscodeshift`:

```sh
---
type: code
---
# substitute updateV10Breaking with the codemod name you want to run
npx jscodeshift@latest -t node_modules/@instructure/ui-codemods/lib/updateV10Breaking.ts <path>
```

For more information about what the codemods do, see the [major version upgrade guides](upgrade-guide)

[npm]: https://img.shields.io/npm/v/@instructure/ui-codemods.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-codemods
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
