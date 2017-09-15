[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

## instructure-ui monorepo

[![build-status][build-status]][build-status-url]


### Packages

This repository contains multiple projects in the `packages/` directory that are
published as separate packages on NPM:

[![npm](https://img.shields.io/npm/v/@blueprintjs/core.svg?label=@instructure/ui-core)](https://www.npmjs.com/package/@instructure/ui-core) &ndash; UI component library

[![npm](https://img.shields.io/npm/v/@blueprintjs/core.svg?label=@instructure/ui-utils)](https://www.npmjs.com/package/@instructure/ui-utils) &ndash; UI utilities

[![npm](https://img.shields.io/npm/v/@blueprintjs/core.svg?label=@instructure/ui-themeable)](https://www.npmjs.com/package/@instructure/ui-themeable) &ndash; A library for applying themes to UI components

[![npm](https://img.shields.io/npm/v/@blueprintjs/core.svg?label=@instructure/ui-themes)](https://www.npmjs.com/package/@instructure/ui-themes) &ndash; Themes that can be applied to themeable components

[![npm](https://img.shields.io/npm/v/@blueprintjs/core.svg?label=@instructure/babel-plugin-themeable-styles)](https://www.npmjs.com/package/@instructure/babel-plugin-themeable-styles) &ndash; A babel plugin to transform CSS imports for themeable components

[![npm](https://img.shields.io/npm/v/@blueprintjs/core.svg?label=@instructure/ui-testbed)](https://www.npmjs.com/package/@instructure/ui-testbed) &ndash; A testbed and utilities for writing UI tests

[![npm](https://img.shields.io/npm/v/@blueprintjs/core.svg?label=@instructure/ui-presets)](https://www.npmjs.com/package/@instructure/ui-presets) &ndash; Shared build config for UI libraries

[![npm](https://img.shields.io/npm/v/@blueprintjs/core.svg?label=@instructure/ui-codemods)](https://www.npmjs.com/package/@instructure/ui-codemods) &ndash; "Codemod" scripts to help with upgrades that contain API changes

[![npm](https://img.shields.io/npm/v/@blueprintjs/core.svg?label=@instructure/ui-docs-client)](https://www.npmjs.com/package/@instructure/ui-docs-client) &ndash; Documentation client application

[![npm](https://img.shields.io/npm/v/@blueprintjs/core.svg?label=@instructure/ui-docs-plugin)](https://www.npmjs.com/package/@instructure/ui-docs-plugin) &ndash; Webpack plugin to generate documentation

[![npm](https://img.shields.io/npm/v/@blueprintjs/core.svg?label=@instructure/ui-polyfill-loader)](https://www.npmjs.com/package/@instructure/ui-polyfill-loader) &ndash; Webpack loader for custom UI poly-fills

The `__docs__` package is not published to NPM as it is used to build the [documentation](http://instructure.github.io/instructure-ui/).


### Browser Support

- Internet Explorer 11 and Edge
- Chrome, Safari, Firefox (last two versions)


### Contribute

Before contributing please read our [code of conduct](CODE_OF_CONDUCT.md)


### Prerequisites and Installation

You'll need to have [Git](http://git-scm.com/) installed on your system.

We use [Lerna](https://lernajs.io/) to manage inter-package dependencies in this monorepo.

__Prerequisites__: Node.js v6+, Yarn v0.27+

Installation steps:

1. Install [Git](http://git-scm.com/).
1. Install [Node](https://nodejs.org/en/)) and [nvm](https://github.com/creationix/nvm).
1. Install [Yarn](https://yarnpkg.com/lang/en/docs/install/).
1. Clone this repository: `git clone https://github.com/instructure/instructure-ui.git`.
1. Run `cd instructure-ui`
1. Run `yarn`
1. Run `yarn bootstrap`


### Usage

1. Run `yarn start`
1. Open [http://localhost:8001](http://localhost:8001) in your browser


### Development

- `yarn start:watch` runs the dev server to run/develop examples and documentation. You can then visit [http://localhost:8080](http://localhost:8080) in a browser. When you make changes to the source code in the `packages/ui-core` directory you should see the page auto-reload.
- `yarn test` will run the tests for all of the packages.
- `yarn test:watch --scope [package name]` will run the tests for 'package name' and will watch for changes to the source code.
- `yarn start` will build the production version of the documentation. You can view it at [http://localhost:8001](http://localhost:8001).

Run `yarn run` to list the available commands.


### Updating build dependencies

1. `yarn add <package-name>` or `yarn upgrade <package-name>`.
1. Commit the result.

### Updating package dependencies

1. Update the relevant `package.json` file. Make sure to retain the `^` semver range.
1. Run `yarn bootstrap` and commit the result.


### Linting and Code Formatting

Linting is run as part of the build. If you use the Sublime Text or Atom editors you can set up the following plugins to catch
linting and formatting errors earlier.

1. Install the *EditorConfig* plugin [Sublime](https://github.com/sindresorhus/editorconfig-sublime), [Atom](https://github.com/sindresorhus/atom-editorconfig)
1. Install the *Linter* plugin [Sublime](http://sublimelinter.readthedocs.org/en/latest/), [Atom](https://atom.io/packages/linter)
1. Install the *Eslint* plugin [Sublime](https://github.com/roadhump/SublimeLinter-eslint), [Atom](https://github.com/AtomLinter/linter-eslint)
1. Install the *Stylelint* plugin [Sublime](https://github.com/kungfusheep/SublimeLinter-contrib-stylelint), [Atom](https://atom.io/packages/linter-stylelint)
1. Run `yarn` to install the dependencies
1. Restart your editor


### Commit Guidelines

1. Run `yarn commit` to commit your changes and follow our commit message format.
1. Please do not include the output of `yarn build` in your commits.


### Documentation

Please update the documentation and examples with any changes, the code and docs should
always be in sync.


### Releases

1. Run `yarn bump` to update the package version. Ignore the advice to push the tag (we do that after we publish the release due to our gerrit review workflow).
1. Optionally update the [CHANGELOG](#CHANGELOG) to optionally add any additional information about the release.
1. Push up the version bump commit to gerrit for review and testing.
1. Once the version bump commit is merged, run `yarn release`
1. Verify that the documentation was updated on gh-pages and the release was tagged in github.


### License

[MIT](LICENSE)
