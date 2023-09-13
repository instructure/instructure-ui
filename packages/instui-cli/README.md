---
category: packages
---

## instui-cli

[![npm][npm]][npm-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A cli for working with Instructure UI packages.

#### Using npx

```bash
$ npx @instructure/instui-cli create component
```

#### Globally installing `instui-cli` with `yarn` or `npm`

```bash
$ yarn global add @instructure/instui-cli
```

or

```bash
$ npm install -g @instructure/instui-cli
```

You now have access to `instui` commands

```bash
instui create component
```

### Available commands

- **create component** | Create an Instructure UI component. DEPRECATED, will be removed in InstUI v9.
- **create package** | Create an Instructure UI package. DEPRECATED, will be removed in InstUI v9.
- **create-from-template** | Copy template source file or directory to a specified destination and replace variables with designated values.
- **upgrade** | Upgrades instructure-ui in a designated repository to the latest stable version including upgrading packages and applying codemods.
- **upgrade-packages** | Upgrade instructure-ui packages to the latest stable version.
- **codemod** | Apply instructure-ui codemods to source at a specified path.
- **version** | Return the current version of instui-cli and exit.

### Documentation

For more documentation on available options and parameters for individual commands do:

```sh
instui <command> --help
```

[npm]: https://img.shields.io/npm/v/@instructure/instui-cli.svg
[npm-url]: https://npmjs.com/package/@instructure/instui-cli
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
