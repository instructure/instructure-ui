---
category: packages
---

## ui-template-scripts

[![npm][npm]][npm-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A collection of UI scripts and utils to automate upgrades.

#### Using npx

```bash
$ npx @instructure/ui-template-scripts <command>
```

#### Globally installing `ui-template-scripts` with `yarn` or `npm`

```bash
$ yarn global add @instructure/ui-template-scripts
```

or

```bash
$ npm install -g @instructure/ui-template-scripts
```

You now have access to `ui-template-scripts` commands

```bash
ui-template-scripts <command>
```

### Available commands

- **create-component** | Generate a component within a new package or within an existing package.
- **create-from-template** | Copy template source file or directory to a specified destination and replace variables with designated values.
- **create-package** | Generate a package from a template.

### Documentation

For more documentation on available options and parameters for individual commands do:

```sh
ui-template-scripts <command> --help
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-template-scripts.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-template-scripts
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
