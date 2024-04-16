---
category: packages
---

## ui-codemods

The ui-codemods should make it easier to deal with API changes when upgrading Instructure UI libraries.

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

### Installation

The codemod scripts can be installed via the following command:

```sh
---
type: code
---
npm install @instructure/ui-codemods
```

The configuration files are located in the [instui-config](#instui-config) package.
This can be installed via the following command:

```sh
---
type: code
---
npm install @instructure/instui-config
```

### Executing Codemods Using instui-cli

All available codemods can also be executed using the [instui-cli](#instui-cli) `instui codemod` command. See [instui-cli](#instui-cli) for more detailed documentation.

### Updating Deprecated Props

This codemod helps you update your project by renaming `props` that have had names changed (e.g., `onReady` => `onOpen`).

```sh
---
type: code
---
jscodeshift -t node_modules/@instructure/ui-codemods/lib/updatePropNames.ts <path> --config=node_modules/@instructure/instui-config/codemod-configs/v<version number ex. 5 or 6>/propNames.config.json
```

### Updating Package Imports

This codemod helps you update your project by renaming `imports` that have changed (e.g., `instructure-ui` => `@instructure/<package name>`).

```sh
---
type: code
---
jscodeshift -t node_modules/@instructure/ui-codemods/lib/updateImports.ts <path> --config=node_modules/@instructure/instui-config/codemod-configs/v<version number ex. 5 or 6>/imports.config.js
```

### Updating more complex props to the InstUI v8 syntax

This codemod upgrades more complex changes like Button, also outputs any manual changes needed to the console. Run this in a InstUI v7 codebase only. This command has an optional fileName parameter, supplying this will append to the given file the warnings.

```sh
---
type: code
---
jscodeshift -t node_modules/@instructure/ui-codemods/lib/updateV7Props.ts <path> -fileName updateV7PropsWarnings.txt
```

### Codemod for breaking changes after updating the dependencies to V8

```sh
---
type: code
---
jscodeshift -t node_modules/@instructure/ui-codemods/lib/updateV8Breaking.ts <path>
```

This codemod updates breaking changes after a v8 upgrade. Run this in a project after you have upgraded your dependencies to InstUI v8.

### Codemod for breaking changes after updating the dependencies to V9

```sh
---
type: code
---
jscodeshift -t node_modules/@instructure/ui-codemods/lib/updateV9Breaking.ts <path> --parser=tsx --usePrettier=false
```

This codemod addresses breaking changes following a v9 upgrade. Notably, it updates `EmotionThemeProvider` to `InstUISettingsProvider`. Execute this in your project post-upgrade to InstUI v9. Prettier is turned on by default for output formatting, and you can also use the `usePrettier` flag. Additionally, the parser flag can specify the parser for jsx and tsx files.

### Codemod for adding a wrapper to ReactDOM.render()

```sh
---
type: code
---
jscodeshift -t node_modules/@instructure/ui-codemods/lib/updateV8ReactDOM.ts <path> -fileName updateV8ReactDOM.txt
```

This codemod updates ReactDOM.render calls with a given wrapper, for example:
ReactDOM.render(<div />) -> ReactDOM.render(<Root><div /></Root>).
Parameters (all optional):

- `fileName`: supplying this will append to the given file the warnings.
- `wrapperPath`: The import path for the wrapper, default value is '@canvas/react-root'.
- `wrapperTag`: The tag to wrap render calls in, default is 'Root'.
- `isDefaultImport`: Is the given tag a default import? Default value is `true`.

[npm]: https://img.shields.io/npm/v/@instructure/ui-codemods.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-codemods
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
