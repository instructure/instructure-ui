# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [8.1.0](https://github.com/instructure/instructure-ui/compare/v8.0.0...v8.1.0) (2021-04-15)

**Note:** Version bump only for package @instructure/ui-svg-images

# [8.0.0](https://github.com/instructure/instructure-ui/compare/v7.5.0...v8.0.0) (2021-03-29)

### Code Refactoring

- **Migrated the package and it's component(s) from using `ui-themeable` to using the new theming solution based on [emotion.js](https://emotion.sh/).**
- **emotion,ui-themeable:** move ThemeablePropValues and ThemeablePropTypes util to emotion pack ([2d0ac1d](https://github.com/instructure/instructure-ui/commit/2d0ac1d3d4ae60802f639bee2545f9a8a32446b6))

### BREAKING CHANGES

- **emotion,ui-themeable:** Moved `ThemeablePropValues` and `ThemeablePropTypes` utils from `ui-themeable`to `emotion` package.

# [7.5.0](https://github.com/instructure/instructure-ui/compare/v7.4.4...v7.5.0) (2021-03-22)

**Note:** Version bump only for package @instructure/ui-svg-images

## [7.4.4](https://github.com/instructure/instructure-ui/compare/v7.4.3...v7.4.4) (2021-03-12)

**Note:** Version bump only for package @instructure/ui-svg-images

## [7.4.3](https://github.com/instructure/instructure-ui/compare/v7.4.1...v7.4.3) (2021-03-11)

**Note:** Version bump only for package @instructure/ui-svg-images

## [7.4.2](https://github.com/instructure/instructure-ui/compare/v7.4.1...v7.4.2) (2021-03-11)

**Note:** Version bump only for package @instructure/ui-svg-images

## [7.4.1](https://github.com/instructure/instructure-ui/compare/v7.4.0...v7.4.1) (2021-03-04)

### Bug Fixes

- **all:** Fix package imports, now everything can be imported; fix test:all in main package.json ([2f11024](https://github.com/instructure/instructure-ui/commit/2f11024))

# [7.4.0](https://github.com/instructure/instructure-ui/compare/v7.3.5...v7.4.0) (2021-02-01)

**Note:** Version bump only for package @instructure/ui-svg-images

## [7.3.5](https://github.com/instructure/instructure-ui/compare/v7.3.2...v7.3.5) (2021-01-21)

### Bug Fixes

- **esm:** specify "exports" in package manifests ([6007684](https://github.com/instructure/instructure-ui/commit/6007684))

## [7.3.4](https://github.com/instructure/instructure-ui/compare/v7.3.2...v7.3.4) (2021-01-14)

### Bug Fixes

- **esm:** specify "exports" in package manifests ([6007684](https://github.com/instructure/instructure-ui/commit/6007684))

## [7.3.3](https://github.com/instructure/instructure-ui/compare/v7.3.2...v7.3.3) (2021-01-13)

### Bug Fixes

- **esm:** specify "exports" in package manifests ([6007684](https://github.com/instructure/instructure-ui/commit/6007684))

## [7.3.2](https://github.com/instructure/instructure-ui/compare/v7.3.1...v7.3.2) (2020-12-10)

**Note:** Version bump only for package @instructure/ui-svg-images

## [7.3.1](https://github.com/instructure/instructure-ui/compare/v7.3.0...v7.3.1) (2020-11-30)

**Note:** Version bump only for package @instructure/ui-svg-images

# [7.3.0](https://github.com/instructure/instructure-ui/compare/v7.2.4...v7.3.0) (2020-10-26)

**Note:** Version bump only for package @instructure/ui-svg-images

## [7.2.4](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.4) (2020-10-09)

**Note:** Version bump only for package @instructure/ui-svg-images

## [7.2.3](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.3) (2020-10-08)

**Note:** Version bump only for package @instructure/ui-svg-images

## [7.2.2](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.2) (2020-10-08)

**Note:** Version bump only for package @instructure/ui-svg-images

## [7.2.1](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.1) (2020-10-07)

**Note:** Version bump only for package @instructure/ui-svg-images

# [7.2.0](https://github.com/instructure/instructure-ui/compare/v7.1.4...v7.2.0) (2020-09-23)

**Note:** Version bump only for package @instructure/ui-svg-images

## [7.1.4](https://github.com/instructure/instructure-ui/compare/v7.1.3...v7.1.4) (2020-09-09)

**Note:** Version bump only for package @instructure/ui-svg-images

## [7.1.3](https://github.com/instructure/instructure-ui/compare/v7.1.2...v7.1.3) (2020-08-10)

**Note:** Version bump only for package @instructure/ui-svg-images

## [7.1.2](https://github.com/instructure/instructure-ui/compare/v7.1.1...v7.1.2) (2020-07-17)

**Note:** Version bump only for package @instructure/ui-svg-images

## [7.1.1](https://github.com/instructure/instructure-ui/compare/v7.1.0...v7.1.1) (2020-07-01)

**Note:** Version bump only for package @instructure/ui-svg-images

# [7.1.0](https://github.com/instructure/instructure-ui/compare/v7.0.0...v7.1.0) (2020-06-25)

**Note:** Version bump only for package @instructure/ui-svg-images

# [7.0.0](https://github.com/instructure/instructure-ui/compare/v6.26.0...v7.0.0) (2020-05-27)

### chore

- bump minimum react version to 16.8.0 ([7a96f00](https://github.com/instructure/instructure-ui/commit/7a96f00))
- remove references to React 15 ([4bb2426](https://github.com/instructure/instructure-ui/commit/4bb2426))

### BREAKING CHANGES

- - Minimum react and react-dom version raised to 16.8.0

TEST PLAN:

- no regressions in docs app
- homepage should note the react version change
- automated tests should pass

Change-Id: I7cd9dd6423fb9524e0a1a0dd490caeee3a2c2c17
Reviewed-on: https://gerrit.instructure.com/c/instructure-ui/+/237727
Tested-by: Service Cloud Jenkins <svc.cloudjenkins@instructure.com>
Reviewed-by: Chris Guerrero <cguerrero@instructure.com>
Product-Review: Steve Jensen <sejensen@instructure.com>
QA-Review: Daniel Sasaki <dsasaki@instructure.com>
Visual-Regression-Test: Ken Meleta <kmeleta@instructure.com>

- Dropping support for React 15.

TEST PLAN:

- yarn dev/yarn start should work
- yarn test/test:watch should work
- there should be no mention of react 15 in code
- there should be nothing depending on react 15
  or reactDOM 15

Change-Id: I2c054c986421014ffe15f0402e14bd2725cbc267
Reviewed-on: https://gerrit.instructure.com/c/instructure-ui/+/229009
Tested-by: Service Cloud Jenkins <svc.cloudjenkins@instructure.com>
QA-Review: Daniel Sasaki <dsasaki@instructure.com>
Visual-Regression-Test: Ken Meleta <kmeleta@instructure.com>
Reviewed-by: Steve Jensen <sejensen@instructure.com>
Product-Review: Steve Jensen <sejensen@instructure.com>

# [6.26.0](https://github.com/instructure/instructure-ui/compare/v6.25.0...v6.26.0) (2020-04-30)

**Note:** Version bump only for package @instructure/ui-svg-images

# [6.25.0](https://github.com/instructure/instructure-ui/compare/v6.24.0...v6.25.0) (2020-04-27)

**Note:** Version bump only for package @instructure/ui-svg-images

# [6.24.0](https://github.com/instructure/instructure-ui/compare/v6.23.0...v6.24.0) (2020-04-14)

**Note:** Version bump only for package @instructure/ui-svg-images

# [6.23.0](https://github.com/instructure/instructure-ui/compare/v6.22.0...v6.23.0) (2020-04-02)

**Note:** Version bump only for package @instructure/ui-svg-images

# [6.22.0](https://github.com/instructure/instructure-ui/compare/v6.21.0...v6.22.0) (2020-03-16)

**Note:** Version bump only for package @instructure/ui-svg-images

# [6.21.0](https://github.com/instructure/instructure-ui/compare/v6.20.0...v6.21.0) (2020-02-26)

**Note:** Version bump only for package @instructure/ui-svg-images

# [6.20.0](https://github.com/instructure/instructure-ui/compare/v6.19.0...v6.20.0) (2020-02-13)

**Note:** Version bump only for package @instructure/ui-svg-images

# [6.19.0](https://github.com/instructure/instructure-ui/compare/v6.18.0...v6.19.0) (2020-02-11)

**Note:** Version bump only for package @instructure/ui-svg-images

# [6.18.0](https://github.com/instructure/instructure-ui/compare/v6.17.0...v6.18.0) (2020-02-04)

**Note:** Version bump only for package @instructure/ui-svg-images

# [6.17.0](https://github.com/instructure/instructure-ui/compare/v6.16.0...v6.17.0) (2020-01-22)

### Bug Fixes

- Update Package READMEs and align deprecation statements ([8f892e4](https://github.com/instructure/instructure-ui/commit/8f892e4))

### Features

- **ui-svg-images:** add `auto` height/width ([abf52f1](https://github.com/instructure/instructure-ui/commit/abf52f1))

# [6.16.0](https://github.com/instructure/instructure-ui/compare/v6.15.0...v6.16.0) (2019-12-13)

**Note:** Version bump only for package @instructure/ui-svg-images

# [6.15.0](https://github.com/instructure/instructure-ui/compare/v6.14.0...v6.15.0) (2019-11-18)

**Note:** Version bump only for package @instructure/ui-svg-images

# [6.14.0](https://github.com/instructure/instructure-ui/compare/v6.13.0...v6.14.0) (2019-10-14)

**Note:** Version bump only for package @instructure/ui-svg-images

# [6.13.0](https://github.com/instructure/instructure-ui/compare/v6.12.0...v6.13.0) (2019-09-24)

**Note:** Version bump only for package @instructure/ui-svg-images

# [6.12.0](https://github.com/instructure/instructure-ui/compare/v6.11.0...v6.12.0) (2019-09-17)

**Note:** Version bump only for package @instructure/ui-svg-images

# [6.11.0](https://github.com/instructure/instructure-ui/compare/v6.10.0...v6.11.0) (2019-09-16)

**Note:** Version bump only for package @instructure/ui-svg-images

# [6.10.0](https://github.com/instructure/instructure-ui/compare/v6.9.0...v6.10.0) (2019-08-27)

**Note:** Version bump only for package @instructure/ui-svg-images

# [6.9.0](https://github.com/instructure/instructure-ui/compare/v6.8.1...v6.9.0) (2019-08-07)

**Note:** Version bump only for package @instructure/ui-svg-images

## [6.8.1](https://github.com/instructure/instructure-ui/compare/v6.8.0...v6.8.1) (2019-08-02)

**Note:** Version bump only for package @instructure/ui-svg-images

# [6.8.0](https://github.com/instructure/instructure-ui/compare/v6.7.0...v6.8.0) (2019-07-31)

**Note:** Version bump only for package @instructure/ui-svg-images

# [6.7.0](https://github.com/instructure/instructure-ui/compare/v6.6.0...v6.7.0) (2019-07-15)

**Note:** Version bump only for package @instructure/ui-svg-images

# [6.6.0](https://github.com/instructure/instructure-ui/compare/v6.5.0...v6.6.0) (2019-07-03)

**Note:** Version bump only for package @instructure/ui-svg-images

# [6.5.0](https://github.com/instructure/instructure-ui/compare/v6.4.0...v6.5.0) (2019-07-01)

**Note:** Version bump only for package @instructure/ui-svg-images

# [6.4.0](https://github.com/instructure/instructure-ui/compare/v6.3.0...v6.4.0) (2019-06-13)

### Bug Fixes

- **ui-breadcrumb:** separator color ([e0c7fe0](https://github.com/instructure/instructure-ui/commit/e0c7fe0)), closes [#8B969](https://github.com/instructure/instructure-ui/issues/8B969)

# [6.3.0](https://github.com/instructure/instructure-ui/compare/v6.2.0...v6.3.0) (2019-05-28)

**Note:** Version bump only for package @instructure/ui-svg-images

# [6.2.0](https://github.com/instructure/instructure-ui/compare/v6.1.0...v6.2.0) (2019-05-13)

### Features

- **ui-elements,ui-svg-images:** adds alert color to Text and InlineSVG components ([118ba53](https://github.com/instructure/instructure-ui/commit/118ba53))

# [6.1.0](https://github.com/instructure/instructure-ui/compare/v6.0.0...v6.1.0) (2019-05-09)

**Note:** Version bump only for package @instructure/ui-svg-images

# [6.0.0](https://github.com/instructure/instructure-ui/compare/v5.52.3...v6.0.0) (2019-05-03)

### Features

- remove deprecated packages/props ([1d8813c](https://github.com/instructure/instructure-ui/commit/1d8813c))
- **ui-babel-preset:** transform member imports to full paths ([d02cc45](https://github.com/instructure/instructure-ui/commit/d02cc45))
- **ui-dom-utils,ui-react-utils,ui-color-utils:** new utils packages ([03e8ee2](https://github.com/instructure/instructure-ui/commit/03e8ee2))

### BREAKING CHANGES

- - ui-core package has been removed

## [5.52.3](https://github.com/instructure/instructure-ui/compare/v5.52.2...v5.52.3) (2019-04-25)

**Note:** Version bump only for package @instructure/ui-svg-images

## [5.52.2](https://github.com/instructure/instructure-ui/compare/v5.52.1...v5.52.2) (2019-04-17)

**Note:** Version bump only for package @instructure/ui-svg-images

## [5.52.1](https://github.com/instructure/instructure-ui/compare/v5.52.0...v5.52.1) (2019-04-08)

**Note:** Version bump only for package @instructure/ui-svg-images

# [5.52.0](https://github.com/instructure/instructure-ui/compare/v5.51.1...v5.52.0) (2019-04-03)

### Features

- **console:** remove console statements in prod env ([603c738](https://github.com/instructure/instructure-ui/commit/603c738))

## [5.51.1](https://github.com/instructure/instructure-ui/compare/v5.51.0...v5.51.1) (2019-03-30)

**Note:** Version bump only for package @instructure/ui-svg-images

# [5.51.0](https://github.com/instructure/instructure-ui/compare/v5.50.0...v5.51.0) (2019-03-29)

**Note:** Version bump only for package @instructure/ui-svg-images

# [5.50.0](https://github.com/instructure/instructure-ui/compare/v5.49.0...v5.50.0) (2019-03-28)

**Note:** Version bump only for package @instructure/ui-svg-images

# [5.49.0](https://github.com/instructure/instructure-ui/compare/v5.48.0...v5.49.0) (2019-03-22)

**Note:** Version bump only for package @instructure/ui-svg-images

# [5.48.0](https://github.com/instructure/instructure-ui/compare/v5.47.0...v5.48.0) (2019-03-18)

**Note:** Version bump only for package @instructure/ui-svg-images

# [5.47.0](https://github.com/instructure/instructure-ui/compare/v5.46.1...v5.47.0) (2019-03-15)

**Note:** Version bump only for package @instructure/ui-svg-images

## [5.46.1](https://github.com/instructure/instructure-ui/compare/v5.46.0...v5.46.1) (2019-03-13)

**Note:** Version bump only for package @instructure/ui-svg-images

# [5.46.0](https://github.com/instructure/instructure-ui/compare/v5.45.1...v5.46.0) (2019-03-12)

**Note:** Version bump only for package @instructure/ui-svg-images

## [5.45.1](https://github.com/instructure/instructure-ui/compare/v5.45.0...v5.45.1) (2019-03-12)

**Note:** Version bump only for package @instructure/ui-svg-images

# [5.45.0](https://github.com/instructure/instructure-ui/compare/v5.44.0...v5.45.0) (2019-03-11)

### Features

- **ui-test-utils:** add aliases for finding by text, label ([14fdb9e](https://github.com/instructure/instructure-ui/commit/14fdb9e))

# [5.44.0](https://github.com/instructure/instructure-ui/compare/v5.43.0...v5.44.0) (2019-03-01)

**Note:** Version bump only for package @instructure/ui-svg-images

# [5.43.0](https://github.com/instructure/instructure-ui/compare/v5.42.0...v5.43.0) (2019-02-27)

**Note:** Version bump only for package @instructure/ui-svg-images

<a name="5.42.0"></a>

# [5.42.0](https://github.com/instructure/instructure-ui/compare/v5.41.1...v5.42.0) (2019-02-15)

### Features

- **ui-scripts,ui-test-utils:** add a --mocha option to ui-test ([bd37e2b](https://github.com/instructure/instructure-ui/commit/bd37e2b))

<a name="5.41.1"></a>

## [5.41.1](https://github.com/instructure/instructure-ui/compare/v5.41.0...v5.41.1) (2019-01-30)

**Note:** Version bump only for package @instructure/ui-svg-images

<a name="5.41.0"></a>

# [5.41.0](https://github.com/instructure/instructure-ui/compare/v5.40.0...v5.41.0) (2019-01-29)

**Note:** Version bump only for package @instructure/ui-svg-images

<a name="5.40.0"></a>

# [5.40.0](https://github.com/instructure/instructure-ui/compare/v5.39.0...v5.40.0) (2019-01-15)

**Note:** Version bump only for package @instructure/ui-svg-images

<a name="5.39.0"></a>

# [5.39.0](https://github.com/instructure/instructure-ui/compare/v5.38.0...v5.39.0) (2019-01-11)

### Features

- **uid:** Add a uid package/util ([279bcda](https://github.com/instructure/instructure-ui/commit/279bcda))

<a name="5.38.0"></a>

# [5.38.0](https://github.com/instructure/instructure-ui/compare/v5.37.0...v5.38.0) (2019-01-04)

**Note:** Version bump only for package @instructure/ui-svg-images

<a name="5.37.0"></a>

# [5.37.0](https://github.com/instructure/instructure-ui/compare/v5.36.0...v5.37.0) (2018-12-18)

**Note:** Version bump only for package @instructure/ui-svg-images

<a name="5.36.0"></a>

# [5.36.0](https://github.com/instructure/instructure-ui/compare/v5.35.0...v5.36.0) (2018-12-12)

**Note:** Version bump only for package @instructure/ui-svg-images

<a name="5.35.0"></a>

# [5.35.0](https://github.com/instructure/instructure-ui/compare/v5.34.0...v5.35.0) (2018-12-06)

### Bug Fixes

- **ui-test-utils:** handle React 16 uncaught errors ([7fd8bec](https://github.com/instructure/instructure-ui/commit/7fd8bec))

### Features

- **ui-test-utils:** support Sizzle selectors ([65481ff](https://github.com/instructure/instructure-ui/commit/65481ff))

<a name="5.34.0"></a>

# [5.34.0](https://github.com/instructure/instructure-ui/compare/v5.33.0...v5.34.0) (2018-11-20)

**Note:** Version bump only for package @instructure/ui-svg-images

<a name="5.33.0"></a>

# [5.33.0](https://github.com/instructure/instructure-ui/compare/v5.32.0...v5.33.0) (2018-11-14)

### Bug Fixes

- **ui-test-utils:** update clickable requirement ([ef9d12d](https://github.com/instructure/instructure-ui/commit/ef9d12d))

<a name="5.32.0"></a>

# [5.32.0](https://github.com/instructure/instructure-ui/compare/v5.31.0...v5.32.0) (2018-10-31)

### Bug Fixes

- **ui-test-utils:** fix event firing ([3852beb](https://github.com/instructure/instructure-ui/commit/3852beb))

<a name="5.31.0"></a>

# [5.31.0](https://github.com/instructure/instructure-ui/compare/v5.30.0...v5.31.0) (2018-10-26)

### Features

- **ui-svg-images:** update tests to run on React 16 ([0f4e40a](https://github.com/instructure/instructure-ui/commit/0f4e40a))

<a name="5.30.0"></a>

# [5.30.0](https://github.com/instructure/instructure-ui/compare/v5.29.0...v5.30.0) (2018-09-27)

**Note:** Version bump only for package @instructure/ui-svg-images

<a name="5.29.0"></a>

# [5.29.0](https://github.com/instructure/instructure-ui/compare/v5.28.1...v5.29.0) (2018-09-26)

**Note:** Version bump only for package @instructure/ui-svg-images

<a name="5.28.1"></a>

## [5.28.1](https://github.com/instructure/instructure-ui/compare/v5.28.0...v5.28.1) (2018-09-18)

**Note:** Version bump only for package @instructure/ui-svg-images

<a name="5.28.0"></a>

# [5.28.0](https://github.com/instructure/instructure-ui/compare/v5.27.0...v5.28.0) (2018-09-13)

**Note:** Version bump only for package @instructure/ui-svg-images

<a name="5.27.0"></a>

# [5.27.0](https://github.com/instructure/instructure-ui/compare/v5.26.0...v5.27.0) (2018-09-10)

**Note:** Version bump only for package @instructure/ui-svg-images

<a name="5.26.0"></a>

# [5.26.0](https://github.com/instructure/instructure-ui/compare/v5.25.0...v5.26.0) (2018-09-06)

**Note:** Version bump only for package @instructure/ui-svg-images

<a name="5.25.0"></a>

# [5.25.0](https://github.com/instructure/instructure-ui/compare/v5.24.0...v5.25.0) (2018-08-24)

**Note:** Version bump only for package @instructure/ui-svg-images

<a name="5.24.0"></a>

# [5.24.0](https://github.com/instructure/instructure-ui/compare/v5.23.0...v5.24.0) (2018-08-08)

### Bug Fixes

- **ui-elements:** remove relative import ([d0a184e](https://github.com/instructure/instructure-ui/commit/d0a184e))

### Performance Improvements

- get babel helpers from 'babel-runtime' instead of inlining them ([1472658](https://github.com/instructure/instructure-ui/commit/1472658))

<a name="5.23.0"></a>

# [5.23.0](https://github.com/instructure/instructure-ui/compare/v5.22.0...v5.23.0) (2018-08-03)

**Note:** Version bump only for package @instructure/ui-svg-images

<a name="5.22.0"></a>

# [5.22.0](https://github.com/instructure/instructure-ui/compare/v5.21.0...v5.22.0) (2018-07-27)

### Bug Fixes

- move React/ReactDOM back to peerDependencies ([99e9458](https://github.com/instructure/instructure-ui/commit/99e9458))

<a name="5.21.0"></a>

# [5.21.0](https://github.com/instructure/instructure-ui/compare/v5.20.1...v5.21.0) (2018-07-25)

### Bug Fixes

- add React,React-DOM 16 to dependencies ([d49430f](https://github.com/instructure/instructure-ui/commit/d49430f))

<a name="5.20.1"></a>

## [5.20.1](https://github.com/instructure/instructure-ui/compare/v5.20.0...v5.20.1) (2018-07-18)

**Note:** Version bump only for package @instructure/ui-svg-images

<a name="5.20.0"></a>

# [5.20.0](https://github.com/instructure/instructure-ui/compare/v5.19.0...v5.20.0) (2018-07-17)

**Note:** Version bump only for package @instructure/ui-svg-images

<a name="5.19.0"></a>

# [5.19.0](https://github.com/instructure/instructure-ui/compare/v5.18.0...v5.19.0) (2018-07-12)

**Note:** Version bump only for package @instructure/ui-svg-images

<a name="5.18.0"></a>

# [5.18.0](https://github.com/instructure/instructure-ui/compare/v5.17.0...v5.18.0) (2018-07-09)

**Note:** Version bump only for package @instructure/ui-svg-images

<a name="5.17.0"></a>

# [5.17.0](https://github.com/instructure/instructure-ui/compare/v5.16.0...v5.17.0) (2018-07-06)

**Note:** Version bump only for package @instructure/ui-svg-images

<a name="5.16.0"></a>

# [5.16.0](https://github.com/instructure/instructure-ui/compare/v5.15.0...v5.16.0) (2018-07-06)

**Note:** Version bump only for package @instructure/ui-svg-images

<a name="5.15.0"></a>

# [5.15.0](https://github.com/instructure/instructure-ui/compare/v5.14.0...v5.15.0) (2018-06-28)

**Note:** Version bump only for package @instructure/ui-svg-images

<a name="5.14.0"></a>

# [5.14.0](https://github.com/instructure/instructure-ui/compare/v5.13.1...v5.14.0) (2018-06-28)

### Features

- **ui-svg-images:** add color property to InlineSVG ([596b9c6](https://github.com/instructure/instructure-ui/commit/596b9c6))

<a name="5.13.1"></a>

## [5.13.1](https://github.com/instructure/instructure-ui/compare/v5.13.0...v5.13.1) (2018-06-22)

**Note:** Version bump only for package @instructure/ui-svg-images

<a name="5.13.0"></a>

# [5.13.0](https://github.com/instructure/instructure-ui/compare/v5.12.0...v5.13.0) (2018-06-16)

**Note:** Version bump only for package @instructure/ui-svg-images

<a name="5.12.0"></a>

# [5.12.0](https://github.com/instructure/instructure-ui/compare/v5.11.0...v5.12.0) (2018-06-11)

### Features

- **ui-buttons,Button:** Add icon prop ([3e63ef7](https://github.com/instructure/instructure-ui/commit/3e63ef7))

<a name="5.11.0"></a>

# [5.11.0](https://github.com/instructure/instructure-ui/compare/v5.10.0...v5.11.0) (2018-06-06)

**Note:** Version bump only for package @instructure/ui-svg-images

See the instructure-ui mono-repo [change log](#CHANGELOG) for past changes.
