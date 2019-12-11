---
category: packages
---

## generate-examples

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][LICENSE]&nbsp;
[![Code of Conduct][coc-badge]][coc]

**DEPRECATED:** use [@instructure/ui-component-examples](#ui-component-examples) instead.

A utility for automatically generating component examples.

### Installation

```sh
yarn add @instructure/generate-examples
```

### Usage

```js
import generateExamples from '@instructure/generate-examples/lib/generateExamples'

const examples = generateExamples(modules, options)
```

For more detailed usage and documentation, see [generateExamples](#generateExamples)

[npm]: https://img.shields.io/npm/v/@instructure/ui-generate-examples.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-generate-examples

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
