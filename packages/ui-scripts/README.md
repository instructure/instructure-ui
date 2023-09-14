---
category: packages
---

## ui-scripts

[![npm][npm]][npm-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A CLI tool for InstUI build and publish tools made by Instructure Inc.

### Scripts

For more documentation on available options and parameters for individual commands run:

```sh
ui-scripts <command> --help
```

#### build

To build (babel transpile) a package to be consumed as a library:

`npm run ui-scripts build --modules cjs` writes commonjs modules to the lib/ directory.

`npm run ui-scripts build --modules es` writes es modules to the es/ directory.

`npm run ui-scripts build --modules es,cjs` writes es modules to both directories.

If not specified, `modules` defaults to `es`.

To build (webpack) a package to be consumed as an application:

`npm run ui-scripts bundle`

#### bump version

To update all package versions
(defaults to determining the version automatically using commit messages):

`npm run ui-scripts bump [version|major|minor|patch]`

#### clean

To clean out built/generated files from a package:

`npm run ui-scripts clean`

#### deprecate

Deprecates ALL of a certain version of instUI npm packages by running `npm deprecate`.
`versionToDeprecate` defaults to the current version.

`npm run ui-scripts deprecate --versionToDeprecate 5.11.0 --fixVersion 5.11.1`

#### examples (Storybook)

To build component examples and start up a dev server with hot reloading:

`npm run ui-scripts examples --watch -p 8080`

To build component examples for deploying:

`npm run ui-scripts examples`

#### generating design tokens

`npm run generate-tokens <options>`

Generate cross-platform design tokens for the given theme.

`npm run generate-all-tokens`

Generate cross-platform design tokens for all themes in the repo.

#### lint

To lint (eslint/stylelint) all files:

`npm run ui-scripts lint`

To lint specific files:

`npm run ui-scripts lint ./somefile.ts ./someotherfile.css`

To fix lint issues:

`npm run ui-scripts lint --fix`

#### publish to npm

To publish all packages (defaults to current version):

`npm run ui-scripts publish [version]`

#### server

To start up a server to test production builds of examples or docs:

`npm run ui-scripts server -p 8080`

#### npm tag

To add an NPM dist-tag for all packages:

`npm run ui-scripts tag add 5.11.0 latest`

To remove an NPM dist-tag for all packages:

`npm run ui-scripts tag rm 5.11.0 latest`

#### running tests

To run all tests:

`npm run ui-scripts test`

To run tests for a package:

`npm run ui-scripts test -- --scope @instructure/ui-avatar`

### Configuration

If you'd like to use the publish, deploy, and release scripts, you'll need to configure your project as follows:

Add a `.env` file to your project root or define these env vars for your shell:

```sh
NPM_TOKEN=
NPM_USERNAME=
NPM_EMAIL=
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-scripts.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-scripts
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
