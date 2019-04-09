---
category: packages
---

## @instructure/ui-codemods

The instructure-ui codemods should make it easier to deal with API changes when upgrading instructure-ui libraries.

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

### Installation

The codemod scripts can be installed via the following command:
```sh
yarn add @instructure/ui-codemods
```

The configuration files are located in the [instui-config](#instui-config) package.
This can be installed via the following command:
```sh
yarn add @instructure/instui-config
```

### Executing Codemods Using instui-cli

All available codemods can also be executed using the [instui-cli](#instui-cli) `instui codemod` command. See [instui-cli](#instui-cli) for more detailed documentation.

### Updating Deprecated Props

This codemod helps you update your project by renaming `props` that have had names changed (e.g., `onReady` => `onOpen`).

```sh
jscodeshift -t node_modules/@instructure/ui-codemods/lib/updatePropNames.js <path> --config=node_modules/@instructure/instui-config/codemod-configs/v<version number ex. 5 or 6>/propNames.config.json
```

### Updating Package Imports

This codemod helps you update your project by renaming `imports` that have changed (e.g., `instructure-ui` => `@instructure/<package name>`).

```sh
jscodeshift -t node_modules/@instructure/ui-codemods/lib/updateImports.js <path> --config=node_modules/@instructure/instui-config/codemod-configs/v<version number ex. 5 or 6>/imports.config.json
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-codemods.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-codemods

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
