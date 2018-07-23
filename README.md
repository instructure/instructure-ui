---
id: instructure-ui
---

## instructure-ui

[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

### Browser Support

- Internet Explorer 11 and Edge
- Chrome, Safari, Firefox (last two versions)

### Quick Start

Instructure-UI has a number of beautiful and accessible React components with baked-in styles and theming and helpful utility functions.

To start using Instructure-UI React components, you must do the following:

1. Activate a style theme.
2. Import and render an Instructure-UI component.

To get the default styles as shown in the examples, use the pre-built Canvas theme.

Example:
```bash
$ yarn add @instructure/ui-themes @instructure/ui-elements
```

```javascript
import React, { Component } from 'react'
import theme from '@instructure/ui-themes/lib/canvas'
import Heading from '@instructure/ui-elements/lib/components/Heading'

theme.use()

class App extends Component {
  render() {
    return (
      <div className="App">
        <Heading>Now using Instructure-UI components with default Canvas theme!</Heading>
      </div>
    )
  }
}

export default App
```

### Contribute

Before contributing please read our [code of conduct](#CODE_OF_CONDUCT)


### Prerequisites and Installation

>You'll need to have [Git](http://git-scm.com/) installed on your system.
>
>We use [Lerna](https://lernajs.io/) to manage inter-package dependencies in this monorepo.
>
>__Prerequisites__: Node.js v8+, Yarn v1.1.0+

__Installation steps:__

1. Install [Git](http://git-scm.com/).
1. Install [Node](https://nodejs.org/en/)) and [nvm](https://github.com/creationix/nvm).
1. Install [Yarn](https://yarnpkg.com/lang/en/docs/install/).
1. Clone this repository: `git clone gerrit:instructure-ui`.
1. Run `cd instructure-ui`
1. Run `yarn`
1. Run `yarn bootstrap`

Run `yarn run` to list the available commands.


### Usage

1. Run `yarn start`
1. Open [http://localhost:8001](http://localhost:8001) in your browser


### Development

1. Run `yarn build:watch` to build all of the packages for a development environment and watch for changes.
1. Run `yarn start:watch` to start the dev server to run/develop examples and documentation. You can then visit [http://localhost:8080](http://localhost:8080) in a browser. When you make changes to the source code you should
see the page auto-reload.
1. Run `yarn test:watch --scope @instructure/[package name]` to run the tests for 'package name' and watch for changes.
1. Run `yarn test` to run all the tests for every package.


### Updating build dependencies

1. `yarn add <package-name>` or `yarn upgrade <package-name>`.
1. Commit the result.

### Updating package dependencies

1. Update the relevant `package.json` file. Make sure to retain the `^` semver range.
1. Run `yarn bootstrap` and commit the result.


### Linting and Code Formatting

Linting is run as part of the build. If you use the Sublime Text, Atom, or VSCode editors, you can set up the following plugins to catch linting and formatting errors earlier.

1. Install the *Linter* plugin [Sublime](http://sublimelinter.readthedocs.org/en/latest/), [Atom](https://atom.io/packages/linter). Linting is included in VSCode.
1. Install the *EditorConfig* plugin [Sublime](https://github.com/sindresorhus/editorconfig-sublime), [Atom](https://github.com/sindresorhus/atom-editorconfig), [VSCode](https://github.com/editorconfig/editorconfig-vscode)
1. Install the *Eslint* plugin [Sublime](https://github.com/roadhump/SublimeLinter-eslint), [Atom](https://github.com/AtomLinter/linter-eslint), [VSCode](https://github.com/Microsoft/vscode-eslint)
1. Install the *Stylelint* plugin [Sublime](https://github.com/kungfusheep/SublimeLinter-contrib-stylelint), [Atom](https://atom.io/packages/linter-stylelint), [VSCode](https://github.com/shinnn/vscode-stylelint)
1. Run `yarn` to install the dependencies
1. Restart your editor


### Commit Guidelines

1. Run `yarn commit` to commit your changes and follow our commit message format.
1. Please do not include the output of `yarn build` in your commits.


### Documentation

Please update the documentation and examples with any changes, the code and docs should always be in sync.


### License

[MIT](LICENSE)

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
