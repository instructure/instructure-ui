## @instructure/ui-docs-plugin

A webpack plugin to generate documentation made by Instructure Inc.

[npm]: https://img.shields.io/npm/v/@instructure/ui-docs-plugin.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-docs-plugin

[![npm][npm]][npm-url]

### Installation

```sh
npm install @instructure/ui-docs-plugin
```

### Usage

In your webpack config add the plugin:

```js
const path = require('path')
const pkg = require('./package.json')

new DocsPlugin({
  title: `${pkg.name} : ${pkg.description} (${pkg.version})`,
  favicon: path.join(__dirname, 'logo.png'),
  library: {
    root: process.cwd(),
    packageName: pkg.name,
    packageMain: path.join(__dirname, pkg.main),
    name: 'MyLibrary',
    description: pkg.description,
    version: pkg.version,
    repository: pkg.repository.url,
    author: pkg.author,
    codepen: { // codpen button form data
      js_external: [
        `${pkg.homepage}common.js`,
        `${pkg.homepage}${pkg.name}.js`,
        `${pkg.homepage}globals.js`
      ]
    }
  },
  globals: { // for component playground and codepen examples
    moment: 'moment'
  },
  files: {
    components: [
      path.join(__dirname, 'lib/components/*/index.js') // only top level components
    ],
    docs: [
      path.join(__dirname, 'README.md'),
      path.join(__dirname, 'CHANGELOG'),
      path.join(__dirname, 'docs/*.md')
    ]
  },
  template: path.join(__dirname, 'templates/docs/index.tmpl.html')
})
```
