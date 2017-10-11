---
category: packages
---

## @instructure/ui-docs-plugin

A webpack plugin to generate documentation made by Instructure Inc.

[npm]: https://img.shields.io/npm/v/@instructure/ui-docs-plugin.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-docs-plugin

[![npm][npm]][npm-url]

### Installation

```sh
yarn add --dev @instructure/ui-docs-plugin
```

### Usage

In your webpack config add the plugin:

```js
const DocsPlugin = require('@instructure/ui-docs-plugin')

module.exports = {
  entry: {
    common: [ 'react', 'react-dom' ],
    'my-library': [ 'src'],
    globals: './globals'
  },
  output: {
    path: outputPath,
    filename: '[name].js'
  },
  devServer: {
    disableHostCheck: true,
    contentBase: outputPath,
    host: '0.0.0.0',
    port: 8080
  },
  plugins: [
    new DocsPlugin()
  ],
  module: {
    rules: require('@instructure/ui-presets/webpack/module/rules')
  },
  resolveLoader: require('@instructure/ui-presets/webpack/resolveLoader'),
  devtool: 'cheap-module-source-map'
}
```

Anything that you would like to be available in scope for code examples, you can define
in one of your entries (e.g. globals in the example above) like:

```js
import React from React
import * as MyLibrary from './index'

global[React] = React

Object.keys(MyLibrary).forEach((key) => {
  global[key] = MyLibrary[key]
})
```

You can configure the plugin by adding a `docs.config.js` file:

```js
const path = require('path')
const rootPath = path.resolve(__dirname, '../../')
const pkg = require('./package.json')

module.exports = {
  rootPath,
  title: `${pkg.name} : ${pkg.description} (${pkg.version})`,
  favicon: path.resolve(rootPath, 'logo.png'),
  library: {
    name: pkg.name,
    version: pkg.version,
    repository: pkg.repository.url,
    author: pkg.author,
    packages: 'packages',
    scope: '@instructure',
    codepen: {
      // codepen button form data (https://blog.codepen.io/documentation/api/prefill/)
      // this is usually whatever webpack entries you've defined
      js_external: [
        `${pkg.homepage}common.js`,
        `${pkg.homepage}instructure-ui.js`,
        `${pkg.homepage}globals.js`
      ].join(';')
    }
  },
  files: [
    path.resolve(rootPath, 'CHANGELOG.md'),
    path.resolve(rootPath, 'packages/ui-core/src/components/*/index.js'),
    path.resolve(rootPath, 'packages/ui-core/src/utils/*/**.js'),
    path.resolve(rootPath, 'packages/ui-themeable/src/*/**.js'),
    path.resolve(rootPath, 'packages/ui-utils/src/*/**.js'),
    path.resolve(rootPath, 'packages/*/README.md'),
    path.resolve(rootPath, 'packages/*/docs/*.md')
  ],
  ignore: [
    path.resolve(rootPath, '**/node_modules/**'),
    path.resolve(rootPath, '**/__tests__/**'),
    path.resolve(rootPath, '**/config/**')
  ],
  identifier: (resourcePath, matter, context) => {
    if (matter.name) {
      return matter.name
    } else if (resourcePath.includes('/index.js') || resourcePath.includes('README.md')) {
      return '[folder]'
    } else {
      return '[name]'
    }
  },
  template: path.resolve(__dirname, 'index.tmpl.html')
}
```
