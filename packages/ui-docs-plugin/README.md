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

In the webpack config for your documentation app, add the plugin:

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

`React` and `ReactDOM` are both set as global variables for use in the code examples.

A `render` function is also provided if you want to be able to control what is rendered in your examples.

Anything else that you would like to be available in scope, you can define
in one of your entries (e.g. `./globals` in the example above) like:

```js
import * as MyLibrary from './index'

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
    if (matter.data.id) {
      return matter.data.id
    } else if (resourcePath.includes('/index.js') || resourcePath.includes('README.md')) {
      return '[folder]'
    } else {
      return '[name]'
    }
  },
  template: path.resolve(__dirname, 'index.tmpl.html')
}
```

### Writing documentation

You can write documentation in markdown files or in code comment blocks in your source files.

#### Documentation meta data:

You can configure optional meta data about a document with [YAML](http://yaml.org/) front matter inside your markdown content.

````md
---
category: guides/contributing
id: code_of_conduct
order: 3
title: Code of Conduct
---
````

The front matter must be the first content in the markdown file or comment block.

Note: categories can be nested via the `/` delimiter.

#### Code examples

If you would like to display an example of a rendered component along with the code example, you can include a
markdown code block like:

````md
```jsx_example
<Button>Click Me</Button>
```
````

If you would like to display the component on a dark background, you can add some extra data as
yaml front matter to your code block:

````md
```jsx_example
---
inverse: true
---
<Button variant"ghost-inverse">Click Me</Button>
```
````

If you would like to show a more complex code example, you can control what's rendered yourself with the following
configuration:

````md
```jsx_example
---
render: false
---
const MyButton = () => <Button>Click Me</Button>
render(MyButton)
```
````

To make the code editor read-only you can configure the code block as:

````md
```jsx_example
---
readOnly: true
---
<Button>Click Me</Button>
```
````

### Development

From the root of the `instructure-ui` repo:

1. Run `yarn build:watch`
1. Run `yarn start:watch`
1. Open [http://localhost:8080](http://localhost:8080) in your browser
