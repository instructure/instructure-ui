---
category: packages
---

## instui-cli

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A cli for working with Instructure UI packages.

#### Using npx

```bash
$ npx @instructure/instui-cli create app --name MyInstuiApp
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
instui create app --name MyInstuiApp
```

### Available commands

- **create app** | Create a starter app with all Instructure UI presets configured (webpack, babel, etc). Similar to create react app.
- **create component** | Create an Instructure UI component.
- **create package** | Create an Instructure UI package.
- **upgrade** | Upgrades instructure-ui in a designated repository to the latest stable version including upgrading packages and applying codemods.
- **upgrade-packages** | Upgrade instructure-ui packages to the latest stable version.
- **codemod** | Apply instructure-ui codemods to source at a specified path.
- **codemod-v8** | Apply instructure-ui v8 codemods to source at a specified path.

### Documentation

For more documentation on available options and parameters for individual commands do:

```sh
instui <command> --help
```

[npm]: https://img.shields.io/npm/v/@instructure/instui-cli.svg
[npm-url]: https://npmjs.com/package/@instructure/instui-cli
[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui 'Travis CI'
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
