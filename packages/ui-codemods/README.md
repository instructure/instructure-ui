---
category: packages
---

## ui-codemods

The ui-codemods should make it easier to deal with API changes when upgrading Instructure UI libraries.

[![npm][npm]][npm-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
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
jscodeshift -t node_modules/@instructure/ui-codemods/lib/updateImports.js <path> --config=node_modules/@instructure/instui-config/codemod-configs/v<version number ex. 5 or 6>/imports.config.js
```

### Updating more complex props to the InstUI v8 syntax

This codemod upgrades more complex changes like Button, also outputs any manual changes needed to the console. Run this in a InstUI v7 codebase only. This command has an optional fileName parameter, supplying this will append to the given file the warnings.

```sh
jscodeshift -t node_modules/@instructure/ui-codemods/lib/updateV7Props.js <path> -fileName updateV7PropsWarnings.txt
```

### Codemod for breaking changes after updating the dependencies to V8

```sh
jscodeshift -t node_modules/@instructure/ui-codemods/lib/updateV8Breaking.js <path>
```

This codemod updates breaking changes after a v8 upgrade. Run this in a project after you have upgraded your dependencies to InstUI v8.

[npm]: https://img.shields.io/npm/v/@instructure/ui-codemods.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-codemods
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
