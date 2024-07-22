---
category: packages
---

## eslint-plugin-instructure-ui

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

An eslint configuration for Instructure UI.

### Installation

Install eslint

```sh
npm install eslint --dev
```

```sh
npm install eslint-plugin-instructure-ui --dev
```

### Configuration

Use our preset to get reasonable defaults:

```json
  "extends": [
    "eslint:recommended",
    "plugin:instructure-ui/recommended"
  ]
```

If you do not use a preset you will need to specify individual rules and add extra configuration.

Add "instructure-ui" to the plugins section.

```json
{
  "plugins": ["instructure-ui"]
}
```

Enable the rules that you would like to use.

```json
  "rules": {
    "inst/no-relative-package-imports": "error"
  }
```

[npm]: https://img.shields.io/npm/v/eslint-plugin-instructure-ui.svg
[npm-url]: https://npmjs.com/package/eslint-plugin-instructure-ui
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
