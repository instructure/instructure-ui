---
category: packages
---

## ui-docs-plugin

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][LICENSE]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A webpack plugin to generate documentation made by Instructure Inc.

### Installation

```sh
yarn add --dev @instructure/ui-docs-plugin
```

### Usage

Set up a new webpack config for your documentation app, and add the plugin:

```js
// webpack.docs.config.js
const pkg = require('./package.json')

const DocsPlugin = require('@instructure/ui-docs-plugin')

module.exports = {
  entry: {
    common: [ 'react', 'react-dom' ],
    'my-library': [ 'src'],
    globals: './globals'
  },
  plugins: [
    new DocsPlugin({
      // absolute path for resolving webpack requires (should be where you're running webpack)
      context: __dirname,
      // search path for documentation files (needs to be an absolute path)
      projectRoot: __dirname,
      // html document title
      title: `${pkg.name} : ${pkg.description} (${pkg.version})`,
      // optional favicon image (path should be absolute or relative to context)
      favicon: 'logo.png',
      library: {
        name: pkg.name,
        version: pkg.version,
        repository: pkg.repository.url, // optional
        author: pkg.author // optional
      },
      // paths should be absolute or relative to projectRoot
      files: [
        'src/components/*/index.js',
        'docs/*.md'
      ],
      ignore: [ // optional
        '**/node_modules/**',
        '**/__tests__/**'
      ],
      // optional html template (path should be absolute or relative to context)
      template: 'index.ejs'
    })
  ]
}
```

### Globals/Code examples

`React` and `ReactDOM` are both in scope for use in code examples, and a `render` function is also provided
if you want to be able to control what is rendered (see below).

Anything else that you would like to be available in scope, you can define
in one of your entries (e.g. `./globals` in the example above) like:

```js
// globals.js
import * as MyLibrary from './index'

// Make all of the library exports global so we can use them in code examples
Object.keys(MyLibrary).forEach((key) => {
  global[key] = MyLibrary[key]
})
```

### Themes

The plugin will generate documentation for themes that are compatible with [@instructure/ui-themeable].
You can make your own theme or import one from [@instructure/ui-themes](ui-themes) and then add them
to the plugin options:

```js
// webpack.docs.config.js

new DocsPlugin({
  themes: [
    'src/themes/*/index.js'
  ],
})
```

### Codepen links

To display a link to open examples in [codepen](https://codepen.io/), add the codepen API data to the plugin options:

```js
// webpack.docs.config.js

new DocsPlugin({
  library: {
    codepen: {
      // codepen button form data (https://blog.codepen.io/documentation/api/prefill/)
      js_external: [ // usually whatever webpack entries you've defined for the documentation
        `${pkg.homepage}common.js`,
        `${pkg.homepage}instructure-ui.js`,
        `${pkg.homepage}globals.js`
      ].join(';')
    }
  }
})
```

### Documenting a mono-repo

If you need to document multiple packages in the same repo, configure the library as follows:

```js
// webpack.docs.config.js

new DocsPlugin({
  library: {
    ...
    packages: 'packages', // relative path (from project root) to the packages directory
    scope: '@instructure' // optional
  }
})
```

### Customizing generated paths and IDS

You can add custom functions to the plugin config to change how document identifiers, titles and
paths to JS modules are generated:

```js
// docs.config.js (in the directory where you're running webpack)

module.exports = {
  ...
  document: {
    identifier: function (docData, context) { // a unique identifier for the document
      ...
    },
    title: function (docData, context) { // title for the document
      ...
    },
    srcPath: function (docPath, context) { // the path to src that will display in the documentation
      ...
    },
    srcUrl: function (docPath, context) { // the href that links to the src
      ...
    },
    requirePath: function (docPath, context) { // the path that displays for the 'commonJS' example in the 'Usage' section
      ...
    },
    esPath: function (docPath, context) { // the path that displays for the 'ES Modules' example in the 'Usage' section
      ...
    }
  }
}
```

### Writing documentation

You can write documentation in markdown files or in code comment blocks in your source files.

#### Documentation meta data:

You can configure optional meta data about a document with [YAML](http://yaml.org/) front matter inside your markdown content.

````js
---
example: false
---
---
category: guides/contributing
id: code_of_conduct
order: 3
title: Code of Conduct
---
````

The front matter must be the first content in the markdown file or comment block.

Note: categories can be nested via the `/` delimiter.

#### README files

In README files you can add the meta data:

````js
---
example: false
---
---
describes: MyComponent
---

````

To have the README file content serve as the description for the resource with the id 'MyComponent'. Usually this will
be the `index.js` file in that directory.

Documents with the `describes` meta data won't show up in the documentation navigation.

#### Code examples

If you would like to display an example of a rendered component along with the code example, you can include a
markdown code block like:

````md
```js
---
example: true
---
<Button>Click Me</Button>
```
````

If you would like to display the component on a dark background or dark checkerboard, you can add some extra data as
yaml front matter to your code block:

````md
```js
---
example: true
background: 'checkerboard-inverse'
---
<Button color="primary" withBackground={false}>Click Me</Button>
```
````

If you would like to show a more complex code example, you can control what's rendered yourself with the following
configuration:

````md
```js
---
render: false
example: true
---
const MyButton = () => <Button>Click Me</Button>
render(MyButton)
```
````

To make the code editor read-only you can configure the code block as:

````md
```js
---
readOnly: true
---
<Button>Click Me</Button>
```
````

### Development

From the root of the `instructure-ui` repo:

1. Run `yarn build:watch`
2. Run `yarn dev`
3. Open [http://localhost:8080/](http://localhost:8080/) in your browser

[npm]: https://img.shields.io/npm/v/@instructure/ui-docs-plugin.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-docs-plugin

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
