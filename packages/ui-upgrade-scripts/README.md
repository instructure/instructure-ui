---
category: packages
---

## ui-upgrade-scripts

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A collection of UI scripts and utils to automate upgrades.

#### Using npx

```bash
$ npx @instructure/ui-upgrade-scripts upgrade-dependencies --deps react react-dom
```

#### Globally installing `ui-upgrade-scripts` with `yarn` or `npm`

```bash
$ yarn global add @instructure/ui-upgrade-scripts
```

or

```bash
$ npm install -g @instructure/ui-upgrade-scripts
```

You now have access to `ui-upgrade-scripts` commands

```bash
ui-upgrade-scripts upgrade-dependencies --deps classnames keycode
```

### Available commands

- **upgrade-dependencies** | Upgrade dependencies to a specified version or latest (if no version is specified)

### Documentation

For more documentation on available options and parameters for individual commands do:

```sh
ui-upgrade-scripts <command> --help
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-upgrade-scripts.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-upgrade-scripts
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
