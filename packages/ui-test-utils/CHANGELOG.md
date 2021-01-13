# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [7.3.3](https://github.com/instructure/instructure-ui/compare/v7.3.2...v7.3.3) (2021-01-13)

### Bug Fixes

- **esm:** specify "exports" in package manifests ([6007684](https://github.com/instructure/instructure-ui/commit/6007684))

## [7.3.2](https://github.com/instructure/instructure-ui/compare/v7.3.1...v7.3.2) (2020-12-10)

**Note:** Version bump only for package @instructure/ui-test-utils

## [7.3.1](https://github.com/instructure/instructure-ui/compare/v7.3.0...v7.3.1) (2020-11-30)

**Note:** Version bump only for package @instructure/ui-test-utils

# [7.3.0](https://github.com/instructure/instructure-ui/compare/v7.2.4...v7.3.0) (2020-10-26)

**Note:** Version bump only for package @instructure/ui-test-utils

## [7.2.4](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.4) (2020-10-09)

**Note:** Version bump only for package @instructure/ui-test-utils

## [7.2.3](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.3) (2020-10-08)

**Note:** Version bump only for package @instructure/ui-test-utils

## [7.2.2](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.2) (2020-10-08)

**Note:** Version bump only for package @instructure/ui-test-utils

## [7.2.1](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.1) (2020-10-07)

**Note:** Version bump only for package @instructure/ui-test-utils

# [7.2.0](https://github.com/instructure/instructure-ui/compare/v7.1.4...v7.2.0) (2020-09-23)

**Note:** Version bump only for package @instructure/ui-test-utils

## [7.1.4](https://github.com/instructure/instructure-ui/compare/v7.1.3...v7.1.4) (2020-09-09)

**Note:** Version bump only for package @instructure/ui-test-utils

## [7.1.3](https://github.com/instructure/instructure-ui/compare/v7.1.2...v7.1.3) (2020-08-10)

**Note:** Version bump only for package @instructure/ui-test-utils

## [7.1.2](https://github.com/instructure/instructure-ui/compare/v7.1.1...v7.1.2) (2020-07-17)

**Note:** Version bump only for package @instructure/ui-test-utils

## [7.1.1](https://github.com/instructure/instructure-ui/compare/v7.1.0...v7.1.1) (2020-07-01)

**Note:** Version bump only for package @instructure/ui-test-utils

# [7.1.0](https://github.com/instructure/instructure-ui/compare/v7.0.0...v7.1.0) (2020-06-25)

**Note:** Version bump only for package @instructure/ui-test-utils

# [7.0.0](https://github.com/instructure/instructure-ui/compare/v6.26.0...v7.0.0) (2020-05-27)

### chore

- **ui-component-examples,ui-theme-tokens:** switch component examples loader to cjs ([3abd6ca](https://github.com/instructure/instructure-ui/commit/3abd6ca))
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

- **ui-component-examples,ui-theme-tokens:** - renderPage and renderExample are no longer supplied by the webpack
  component-examples-loader

Change-Id: I5c632274264d7c934abc86f41399b8a7cda23e26
Reviewed-on: https://gerrit.instructure.com/c/instructure-ui/+/236873
Tested-by: Service Cloud Jenkins <svc.cloudjenkins@instructure.com>
Reviewed-by: Ken Meleta <kmeleta@instructure.com>
Product-Review: Ken Meleta <kmeleta@instructure.com>
QA-Review: Daniel Sasaki <dsasaki@instructure.com>
Visual-Regression-Test: Steve Jensen <sejensen@instructure.com>

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

**Note:** Version bump only for package @instructure/ui-test-utils

# [6.25.0](https://github.com/instructure/instructure-ui/compare/v6.24.0...v6.25.0) (2020-04-27)

**Note:** Version bump only for package @instructure/ui-test-utils

# [6.24.0](https://github.com/instructure/instructure-ui/compare/v6.23.0...v6.24.0) (2020-04-14)

**Note:** Version bump only for package @instructure/ui-test-utils

# [6.23.0](https://github.com/instructure/instructure-ui/compare/v6.22.0...v6.23.0) (2020-04-02)

**Note:** Version bump only for package @instructure/ui-test-utils

# [6.22.0](https://github.com/instructure/instructure-ui/compare/v6.21.0...v6.22.0) (2020-03-16)

**Note:** Version bump only for package @instructure/ui-test-utils

# [6.21.0](https://github.com/instructure/instructure-ui/compare/v6.20.0...v6.21.0) (2020-02-26)

**Note:** Version bump only for package @instructure/ui-test-utils

# [6.20.0](https://github.com/instructure/instructure-ui/compare/v6.19.0...v6.20.0) (2020-02-13)

**Note:** Version bump only for package @instructure/ui-test-utils

# [6.19.0](https://github.com/instructure/instructure-ui/compare/v6.18.0...v6.19.0) (2020-02-11)

**Note:** Version bump only for package @instructure/ui-test-utils

# [6.18.0](https://github.com/instructure/instructure-ui/compare/v6.17.0...v6.18.0) (2020-02-04)

**Note:** Version bump only for package @instructure/ui-test-utils

# [6.17.0](https://github.com/instructure/instructure-ui/compare/v6.16.0...v6.17.0) (2020-01-22)

### Bug Fixes

- Update Package READMEs and align deprecation statements ([8f892e4](https://github.com/instructure/instructure-ui/commit/8f892e4))
- **ui-test-utils:** prevent test sandbox initialization in production and development ([80d9bc1](https://github.com/instructure/instructure-ui/commit/80d9bc1))

# [6.16.0](https://github.com/instructure/instructure-ui/compare/v6.15.0...v6.16.0) (2019-12-13)

**Note:** Version bump only for package @instructure/ui-test-utils

# [6.15.0](https://github.com/instructure/instructure-ui/compare/v6.14.0...v6.15.0) (2019-11-18)

**Note:** Version bump only for package @instructure/ui-test-utils

# [6.14.0](https://github.com/instructure/instructure-ui/compare/v6.13.0...v6.14.0) (2019-10-14)

**Note:** Version bump only for package @instructure/ui-test-utils

# [6.13.0](https://github.com/instructure/instructure-ui/compare/v6.12.0...v6.13.0) (2019-09-24)

**Note:** Version bump only for package @instructure/ui-test-utils

# [6.12.0](https://github.com/instructure/instructure-ui/compare/v6.11.0...v6.12.0) (2019-09-17)

**Note:** Version bump only for package @instructure/ui-test-utils

# [6.11.0](https://github.com/instructure/instructure-ui/compare/v6.10.0...v6.11.0) (2019-09-16)

**Note:** Version bump only for package @instructure/ui-test-utils

# [6.10.0](https://github.com/instructure/instructure-ui/compare/v6.9.0...v6.10.0) (2019-08-27)

### Bug Fixes

- **ui-stylesheet,ui-themeable:** error when gt 1 copies of themeable ([b1e8164](https://github.com/instructure/instructure-ui/commit/b1e8164))

# [6.9.0](https://github.com/instructure/instructure-ui/compare/v6.8.1...v6.9.0) (2019-08-07)

**Note:** Version bump only for package @instructure/ui-test-utils

## [6.8.1](https://github.com/instructure/instructure-ui/compare/v6.8.0...v6.8.1) (2019-08-02)

**Note:** Version bump only for package @instructure/ui-test-utils

# [6.8.0](https://github.com/instructure/instructure-ui/compare/v6.7.0...v6.8.0) (2019-07-31)

### Bug Fixes

- **ui-test-utils:** reset viewport in init/before hook ([f271a5b](https://github.com/instructure/instructure-ui/commit/f271a5b))

# [6.7.0](https://github.com/instructure/instructure-ui/compare/v6.6.0...v6.7.0) (2019-07-15)

**Note:** Version bump only for package @instructure/ui-test-utils

# [6.6.0](https://github.com/instructure/instructure-ui/compare/v6.5.0...v6.6.0) (2019-07-03)

**Note:** Version bump only for package @instructure/ui-test-utils

# [6.5.0](https://github.com/instructure/instructure-ui/compare/v6.4.0...v6.5.0) (2019-07-01)

### Bug Fixes

- **ui-tabs:** tabbable content in a tab panel should be tabbable ([4753bd3](https://github.com/instructure/instructure-ui/commit/4753bd3))
- **ui-test-utils:** remove window/document event listener cleanup ([9fb45b3](https://github.com/instructure/instructure-ui/commit/9fb45b3))

# [6.4.0](https://github.com/instructure/instructure-ui/compare/v6.3.0...v6.4.0) (2019-06-13)

**Note:** Version bump only for package @instructure/ui-test-utils

# [6.3.0](https://github.com/instructure/instructure-ui/compare/v6.2.0...v6.3.0) (2019-05-28)

### Bug Fixes

- **ui-test-utils:** prevent test pollution related failures ([626bd7a](https://github.com/instructure/instructure-ui/commit/626bd7a))

# [6.2.0](https://github.com/instructure/instructure-ui/compare/v6.1.0...v6.2.0) (2019-05-13)

**Note:** Version bump only for package @instructure/ui-test-utils

# [6.1.0](https://github.com/instructure/instructure-ui/compare/v6.0.0...v6.1.0) (2019-05-09)

**Note:** Version bump only for package @instructure/ui-test-utils

# [6.0.0](https://github.com/instructure/instructure-ui/compare/v5.52.3...v6.0.0) (2019-05-03)

### Features

- remove deprecated packages/props ([1d8813c](https://github.com/instructure/instructure-ui/commit/1d8813c))
- **ui-babel-preset:** transform member imports to full paths ([d02cc45](https://github.com/instructure/instructure-ui/commit/d02cc45))

### BREAKING CHANGES

- - ui-core package has been removed

## [5.52.3](https://github.com/instructure/instructure-ui/compare/v5.52.2...v5.52.3) (2019-04-25)

**Note:** Version bump only for package @instructure/ui-test-utils

## [5.52.2](https://github.com/instructure/instructure-ui/compare/v5.52.1...v5.52.2) (2019-04-17)

**Note:** Version bump only for package @instructure/ui-test-utils

## [5.52.1](https://github.com/instructure/instructure-ui/compare/v5.52.0...v5.52.1) (2019-04-08)

**Note:** Version bump only for package @instructure/ui-test-utils

# [5.52.0](https://github.com/instructure/instructure-ui/compare/v5.51.1...v5.52.0) (2019-04-03)

### Features

- **console:** remove console statements in prod env ([603c738](https://github.com/instructure/instructure-ui/commit/603c738))

## [5.51.1](https://github.com/instructure/instructure-ui/compare/v5.51.0...v5.51.1) (2019-03-30)

**Note:** Version bump only for package @instructure/ui-test-utils

# [5.51.0](https://github.com/instructure/instructure-ui/compare/v5.50.0...v5.51.0) (2019-03-29)

**Note:** Version bump only for package @instructure/ui-test-utils

# [5.50.0](https://github.com/instructure/instructure-ui/compare/v5.49.0...v5.50.0) (2019-03-28)

**Note:** Version bump only for package @instructure/ui-test-utils

# [5.49.0](https://github.com/instructure/instructure-ui/compare/v5.48.0...v5.49.0) (2019-03-22)

### Bug Fixes

- **ui-component-examples:** improve loadtime for storybook ([679b37d](https://github.com/instructure/instructure-ui/commit/679b37d))
- **ui-test-utils:** better error message when sinon sandbox is undef ([19d65df](https://github.com/instructure/instructure-ui/commit/19d65df))
- **ui-test-utils:** preserve built-in behavior of chai contain method ([a7b266e](https://github.com/instructure/instructure-ui/commit/a7b266e))

### Features

- **ui-test-utils:** add unmount util ([4d508be](https://github.com/instructure/instructure-ui/commit/4d508be))

# [5.48.0](https://github.com/instructure/instructure-ui/compare/v5.47.0...v5.48.0) (2019-03-18)

### Features

- **ui-component-examples,ui-test-utils:** add parameters to example config ([19e4cfd](https://github.com/instructure/instructure-ui/commit/19e4cfd))

# [5.47.0](https://github.com/instructure/instructure-ui/compare/v5.46.1...v5.47.0) (2019-03-15)

### Features

- **ui-test-utils:** add a few more test helpers ([386a867](https://github.com/instructure/instructure-ui/commit/386a867))

## [5.46.1](https://github.com/instructure/instructure-ui/compare/v5.46.0...v5.46.1) (2019-03-13)

**Note:** Version bump only for package @instructure/ui-test-utils

# [5.46.0](https://github.com/instructure/instructure-ui/compare/v5.45.1...v5.46.0) (2019-03-12)

**Note:** Version bump only for package @instructure/ui-test-utils

## [5.45.1](https://github.com/instructure/instructure-ui/compare/v5.45.0...v5.45.1) (2019-03-12)

**Note:** Version bump only for package @instructure/ui-test-utils

# [5.45.0](https://github.com/instructure/instructure-ui/compare/v5.44.0...v5.45.0) (2019-03-11)

### Bug Fixes

- **ui-scripts,ui-test-utils:** make sure test teardown always runs ([be84200](https://github.com/instructure/instructure-ui/commit/be84200))

### Features

- A ui-prop-types package ([0fbc609](https://github.com/instructure/instructure-ui/commit/0fbc609))
- **ui-scripts,ui-test-utils:** move jsdom to ui-scripts ([9d1f063](https://github.com/instructure/instructure-ui/commit/9d1f063))
- **ui-test-utils:** add aliases for finding by text, label ([14fdb9e](https://github.com/instructure/instructure-ui/commit/14fdb9e))

# [5.44.0](https://github.com/instructure/instructure-ui/compare/v5.43.0...v5.44.0) (2019-03-01)

### Features

- **ui-forms,ui-test-utils:** add locators, assertions, typeIn helper ([7d36c3d](https://github.com/instructure/instructure-ui/commit/7d36c3d))

# [5.43.0](https://github.com/instructure/instructure-ui/compare/v5.42.0...v5.43.0) (2019-02-27)

### Features

- **ui-test-utils:** add a11y test generator util ([16240d8](https://github.com/instructure/instructure-ui/commit/16240d8))

<a name="5.42.0"></a>

# [5.42.0](https://github.com/instructure/instructure-ui/compare/v5.41.1...v5.42.0) (2019-02-15)

### Features

- **ui-scripts,ui-test-utils:** add a --mocha option to ui-test ([bd37e2b](https://github.com/instructure/instructure-ui/commit/bd37e2b))

<a name="5.41.1"></a>

## [5.41.1](https://github.com/instructure/instructure-ui/compare/v5.41.0...v5.41.1) (2019-01-30)

**Note:** Version bump only for package @instructure/ui-test-utils

<a name="5.41.0"></a>

# [5.41.0](https://github.com/instructure/instructure-ui/compare/v5.40.0...v5.41.0) (2019-01-29)

**Note:** Version bump only for package @instructure/ui-test-utils

<a name="5.40.0"></a>

# [5.40.0](https://github.com/instructure/instructure-ui/compare/v5.39.0...v5.40.0) (2019-01-15)

### Bug Fixes

- **ui-test-utils:** use MutationObserver shim ([2b0128c](https://github.com/instructure/instructure-ui/commit/2b0128c))

<a name="5.39.0"></a>

# [5.39.0](https://github.com/instructure/instructure-ui/compare/v5.38.0...v5.39.0) (2019-01-11)

### Features

- **ui-test-utils:** add MutationObserver, setImmediate shims ([97adeba](https://github.com/instructure/instructure-ui/commit/97adeba))

<a name="5.38.0"></a>

# [5.38.0](https://github.com/instructure/instructure-ui/compare/v5.37.0...v5.38.0) (2019-01-04)

### Bug Fixes

- **ui-a11y,ui-test-utils:** handle iframes with inaccessible documents ([f155829](https://github.com/instructure/instructure-ui/commit/f155829))
- **ui-test-utils:** logic that determines visibility is incorrect ([f0d59b1](https://github.com/instructure/instructure-ui/commit/f0d59b1))

<a name="5.37.0"></a>

# [5.37.0](https://github.com/instructure/instructure-ui/compare/v5.36.0...v5.37.0) (2018-12-18)

**Note:** Version bump only for package @instructure/ui-test-utils

<a name="5.36.0"></a>

# [5.36.0](https://github.com/instructure/instructure-ui/compare/v5.35.0...v5.36.0) (2018-12-12)

### Features

- **ui-presets,ui-test-utils:** add karma viewport plugin ([138a2f8](https://github.com/instructure/instructure-ui/commit/138a2f8))

<a name="5.35.0"></a>

# [5.35.0](https://github.com/instructure/instructure-ui/compare/v5.34.0...v5.35.0) (2018-12-06)

### Bug Fixes

- **ui-layout:** margin warning shouldn't apply to flexed elements ([854f3a3](https://github.com/instructure/instructure-ui/commit/854f3a3))
- **ui-test-utils:** handle React 16 uncaught errors ([7fd8bec](https://github.com/instructure/instructure-ui/commit/7fd8bec))

### Features

- **ui-test-utils:** add findParent, findParents utils ([1d5aeb7](https://github.com/instructure/instructure-ui/commit/1d5aeb7))
- **ui-test-utils:** add selector to query failure messages ([e77358e](https://github.com/instructure/instructure-ui/commit/e77358e))
- **ui-test-utils:** support Sizzle selectors ([65481ff](https://github.com/instructure/instructure-ui/commit/65481ff))

<a name="5.34.0"></a>

# [5.34.0](https://github.com/instructure/instructure-ui/compare/v5.33.0...v5.34.0) (2018-11-20)

**Note:** Version bump only for package @instructure/ui-test-utils

<a name="5.33.0"></a>

# [5.33.0](https://github.com/instructure/instructure-ui/compare/v5.32.0...v5.33.0) (2018-11-14)

### Bug Fixes

- **ui-test-utils:** locator find/findAll return component root ([5866235](https://github.com/instructure/instructure-ui/commit/5866235))
- **ui-test-utils:** update clickable requirement ([ef9d12d](https://github.com/instructure/instructure-ui/commit/ef9d12d))

### Features

- **ui-test-utils:** add tabbable, clickable helpers ([2fbe6c2](https://github.com/instructure/instructure-ui/commit/2fbe6c2))

<a name="5.32.0"></a>

# [5.32.0](https://github.com/instructure/instructure-ui/compare/v5.31.0...v5.32.0) (2018-10-31)

### Bug Fixes

- **ui-test-utils:** fix event firing ([3852beb](https://github.com/instructure/instructure-ui/commit/3852beb))

<a name="5.31.0"></a>

# [5.31.0](https://github.com/instructure/instructure-ui/compare/v5.30.0...v5.31.0) (2018-10-26)

### Bug Fixes

- **ui-test-utils:** .focus helper should programmatically focus ([36abbd6](https://github.com/instructure/instructure-ui/commit/36abbd6))
- **ui-test-utils:** add tests for components that render null ([e684860](https://github.com/instructure/instructure-ui/commit/e684860))
- **ui-test-utils:** filter in query instead of after ([50ae1c5](https://github.com/instructure/instructure-ui/commit/50ae1c5))
- **ui-test-utils:** fix setContext method ([6834f87](https://github.com/instructure/instructure-ui/commit/6834f87))
- **ui-test-utils,ui-testbed:** queries should work with SVG elements ([a25f720](https://github.com/instructure/instructure-ui/commit/a25f720))

### Features

- **ui-presets:** upgrade eslint ([a1dcf1f](https://github.com/instructure/instructure-ui/commit/a1dcf1f))
- **ui-svg-images:** update tests to run on React 16 ([0f4e40a](https://github.com/instructure/instructure-ui/commit/0f4e40a))
- **ui-test-utils:** add spy on Event.preventDefault, focusable selector ([1e68a42](https://github.com/instructure/instructure-ui/commit/1e68a42))

<a name="5.30.0"></a>

# [5.30.0](https://github.com/instructure/instructure-ui/compare/v5.29.0...v5.30.0) (2018-09-27)

### Bug Fixes

- **ui-portal:** ui-testable should be a dependency ([64117ad](https://github.com/instructure/instructure-ui/commit/64117ad))
- **ui-portal,ui-test-utils:** return a DOM node from getComponentRoot ([2903d29](https://github.com/instructure/instructure-ui/commit/2903d29))

### Features

- **ui-test-utils:** add hasClass helper to test utils ([72c21ad](https://github.com/instructure/instructure-ui/commit/72c21ad))
- **ui-test-utils:** add utils for making custom queries ([7ca0da9](https://github.com/instructure/instructure-ui/commit/7ca0da9))

<a name="5.29.0"></a>

# [5.29.0](https://github.com/instructure/instructure-ui/compare/v5.28.1...v5.29.0) (2018-09-26)

### Bug Fixes

- **ui-portal,ui-test-utils:** fix empty selectors for testable.findAll ([1ced426](https://github.com/instructure/instructure-ui/commit/1ced426))
- **ui-test-utils:** clear themeable stylesheet between tests ([215f075](https://github.com/instructure/instructure-ui/commit/215f075))
- **ui-test-utils:** expectEmpty should work with testable.findAll ([3cf77f9](https://github.com/instructure/instructure-ui/commit/3cf77f9))
- **ui-test-utils:** fix findAll by label ([bbb3a8b](https://github.com/instructure/instructure-ui/commit/bbb3a8b))
- **ui-test-utils:** fix query by attribute ([b6ba1ad](https://github.com/instructure/instructure-ui/commit/b6ba1ad))
- **ui-test-utils:** fix query by text/contents ([5f1cf80](https://github.com/instructure/instructure-ui/commit/5f1cf80))
- **ui-test-utils:** fix testable component matches ([255fef7](https://github.com/instructure/instructure-ui/commit/255fef7))

### Features

- **ui-test-utils:** Add a ui-test-utils package ([1e9f4ec](https://github.com/instructure/instructure-ui/commit/1e9f4ec))
- **ui-test-utils:** add helpers to get tag, computedStyle ([b456764](https://github.com/instructure/instructure-ui/commit/b456764))
