---
title: Contributing
category: Getting Started
order: 2
---

## Contributing

Contributions are welcome! If you want to submit a change you will need to open a pull request on Github. To do so first fork the repository to your own Github account.

**Installation steps:**

Follow these steps to download and run Instructure-UI on your machine:

1. Install [Git](http://git-scm.com/).
1. Install [Node >= 12](https://nodejs.org/en/)) (we recommend [nvm](https://github.com/creationix/nvm) to manage multiple Node versions).
1. Install [Yarn >=1.6](https://yarnpkg.com/lang/en/docs/install/)
1. Clone the repository with `git clone` (If you want to make changes clone the forked repo in your account.)
1. Run `cd instructure-ui`
1. Run `yarn`
1. Run `yarn bootstrap`

Run `yarn run` to list the available commands.

When you are ready with your changes open a pull request on Github to the `master` branch and the maintainers will review and merge it.

### Running the documentation app

1. Run `yarn start`
1. Open [http://localhost:8001](http://localhost:8001) in your browser

### Development

1. Run `yarn build:watch` to build all of the packages for a development environment and watch for changes.
1. Run `yarn dev` to start the dev server to run/develop examples and documentation. You can then visit [http://localhost:8080](http://localhost:8080) in a browser. When you make changes to the source code you should see the page auto-reload.
1. Run `yarn test:watch --scope @instructure/[package name]` to run the tests for 'package name' and watch for changes.
1. Run `yarn test` to run all the tests for every package.

### Testing

See the [testing documentation](#testing-components) for details.

### Linters and Code Formatting

Linters are run as part of the build. If you use the Sublime Text, Atom, or VSCode editors, you can set up the following plugins to catch lint and formatting errors earlier.

1. Install the _Linter_ plugin [Sublime](http://sublimelinter.readthedocs.org/en/latest/), [Atom](https://atom.io/packages/linter). Linting is included in VSCode.
1. Install the _EditorConfig_ plugin [Sublime](https://github.com/sindresorhus/editorconfig-sublime), [Atom](https://github.com/sindresorhus/atom-editorconfig), [VSCode](https://github.com/editorconfig/editorconfig-vscode)
1. Install the _Eslint_ plugin [Sublime](https://github.com/roadhump/SublimeLinter-eslint), [Atom](https://github.com/AtomLinter/linter-eslint), [VSCode](https://github.com/Microsoft/vscode-eslint)
1. Install the _Stylelint_ plugin [Sublime](https://github.com/kungfusheep/SublimeLinter-contrib-stylelint), [Atom](https://atom.io/packages/linter-stylelint), [VSCode](https://github.com/shinnn/vscode-stylelint)
1. Run `yarn` to install the dependencies
1. Restart your editor

### Documentation

Please update the documentation and examples with any changes.

- `yarn start` will build the production version of the documentation. You can view it at [http://localhost:8001](http://localhost:8001).
- All components and utilities should be well documented, including examples.
- Write documentation inline in code comment blocks. The code and docs should
  always be in sync.

### Commit Guidelines

1. Run `yarn commit` to commit your changes and follow our commit message format.
1. Please do not include the output of `yarn build` in your commits.

### Updating build (repository) dependencies

1. `yarn add <package-name>` or `yarn upgrade <package-name>`.
1. Commit the result.

### Updating individual package dependencies

1. Update the relevant `package.json` file. Make sure to retain the `^` semver range.
1. Run `yarn bootstrap` and commit the result.

### Adding a package

1. Run `yarn generate:package` and choose a name for your package (use "kebab" case (dashes), e.g. 'my-package').
1. Add an alias for your package in `packages/__docs__/resolve.js`.
1. Stop the dev server (if you have it running), and run `yarn dev` to pick up the new package.
1. Visit [http://localhost:8080](http://localhost:8080) in a browser. You should see your package listed in the docs.

### Adding a component

1. Run `yarn generate:component` and choose a name for your component (use Pascal case: e.g., 'MyComponent').
1. Choose to create a new package for your component, add it to an existing package, or create the component with no package.
1. If you created a new package for your component, an export for the component will automatically be added to `packages/[package]/src/components/index.js`. If you're adding your component to an existing package, you will need to add the export manually.
1. Run `yarn bootstrap` to generate the `es` and `lib` directories for your component.
1. Add your component to `packages/__docs__/components.js`.
1. If you created a new package for your component, add an alias for it in `packages/__docs__/resolve.js`.
1. If you added your component to an existing package, confirm that the component's dependencies are listed in the package's `package.json`.
1. Stop the dev server (if you have it running), and run `yarn dev` to pick up the new component.
1. Visit [http://localhost:8080](http://localhost:8080) in a browser. You should see your component listed in the docs.
1. Start making changes to your component, and watch it update in the browser automatically.

### Proposing API changes

If you'd like to propose changes to a component API or a new component, you'll need to fill out an RFC ("request for change") document and have it reviewed before implementing your change. Be sure to note any breaking changes or deprecations in the RFC document.

1. Run `yarn generate:rfc`. This script creates an RFC document for you in `/rfcs`.
1. Fill out this document and submit it for review.
1. Once the RFC is approved and merged you can go ahead and make your change.

### Accessibility and Internationalization Requirements

All components should:

1. be accessible (See the [accessibility requirements](#accessibility) for more information).
1. support RTL languages.
1. localize all dates, times, numbers and strings (or require localized content passed in via props).

### Releases

See the [releases documentation](#releases) for information on the release process.
