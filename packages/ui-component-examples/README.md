---
category: packages
---

## ui-component-examples

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

A utility for automatically generating component examples.

### Installation

```sh
yarn add @instructure/ui-component-examples
```

### Usage

#### Calling the `generateComponentExamples` function directly

The `generateComponentExamples` function can be called directly as follows:

```js
import generateComponentExamples from '@instructure/ui-component-examples'

const result = generateComponentExamples(config)
```

For more detailed documentation including an example config object, see
[generateComponentExamples](#generateComponentExamples)

#### Using the webpack loader

For convenience, this package also contains a webpack loader which can be used
to load example configuration files. Each configuration file is passed to the `generateComponentExamples`
function above. See [generateComponentExamples](#generateComponentExamples) for an example of a configuration file.

In your webpack.config.js:

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [/\.examples\.js/],
        use: [
          'component-examples-loader',
          'babel-loader'
        ]
      }
    ]
  }
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-ui-component-examples.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-ui-component-examples

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
