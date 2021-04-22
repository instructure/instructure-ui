# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [7.6.0](https://github.com/instructure/instructure-ui/compare/v7.5.1...v7.6.0) (2021-04-22)

### Features

- **ui-tree-browser:** remove dash at root icon ([dfe51d7](https://github.com/instructure/instructure-ui/commit/dfe51d7))

## [7.5.1](https://github.com/instructure/instructure-ui/compare/v7.5.0...v7.5.1) (2021-04-15)

### Bug Fixes

- **ui-select:** fix exception when selecting all items and clicking outside ([71421cf](https://github.com/instructure/instructure-ui/commit/71421cf))
- **ui-tree-browser:** backport fix to remove line extending into root icon ([07e5e71](https://github.com/instructure/instructure-ui/commit/07e5e71)), closes [#460](https://github.com/instructure/instructure-ui/issues/460)
- **ui-tree-browser:** list root items too when `showRootCollection` is `false` ([f36c002](https://github.com/instructure/instructure-ui/commit/f36c002)), closes [#476](https://github.com/instructure/instructure-ui/issues/476)

# [7.5.0](https://github.com/instructure/instructure-ui/compare/v7.4.4...v7.5.0) (2021-03-22)

### Features

- **ui-tree-browser:** allow tree browser to render before, after nodes ([ca1dfaa](https://github.com/instructure/instructure-ui/commit/ca1dfaa))

## [7.4.4](https://github.com/instructure/instructure-ui/compare/v7.4.3...v7.4.4) (2021-03-12)

### Bug Fixes

- Add CommonJS build to @instructure/ui-themes ([7e99643](https://github.com/instructure/instructure-ui/commit/7e99643))

## [7.4.3](https://github.com/instructure/instructure-ui/compare/v7.4.1...v7.4.3) (2021-03-11)

### Bug Fixes

- fix release script path issue ([ea56688](https://github.com/instructure/instructure-ui/commit/ea5668850fcfb1e82486d8072fef2120222a3d70))
- fix tagging ([a3e4fbc](https://github.com/instructure/instructure-ui/commit/a3e4fbcd6ed6db7372c2dafd61053f7ac88c1446))
- **ui-scripts:** add comment on annotated tags ([ac8d075](https://github.com/instructure/instructure-ui/commit/ac8d075206567368290ba8b05d9f5676ac48c647))
- **ui-scripts:** fix bump tagging and rename prerelease builds from nightly to snapshot ([3473ed5](https://github.com/instructure/instructure-ui/commit/3473ed5a2aa659c92b7a5243e79e619eaab021c7))
- **ui-scripts:** fix typo ([96d704a](https://github.com/instructure/instructure-ui/commit/96d704aa5aab1ee4dddf279b4a01b0e6c3d9e424))

## [7.4.2](https://github.com/instructure/instructure-ui/compare/v7.4.1...v7.4.2) (2021-03-11)

### Bug Fixes

- fix release script path issue ([ea56688](https://github.com/instructure/instructure-ui/commit/ea56688))
- fix tagging ([a3e4fbc](https://github.com/instructure/instructure-ui/commit/a3e4fbc))
- **ui-scripts:** add comment on annotated tags ([ac8d075](https://github.com/instructure/instructure-ui/commit/ac8d075))
- **ui-scripts:** fix bump tagging and rename prerelease builds from nightly to snapshot ([3473ed5](https://github.com/instructure/instructure-ui/commit/3473ed5))
- **ui-scripts:** fix typo ([96d704a](https://github.com/instructure/instructure-ui/commit/96d704a))

## [7.4.1](https://github.com/instructure/instructure-ui/compare/v7.4.0...v7.4.1) (2021-03-04)

### Bug Fixes

- **all:** Fix package imports, now everything can be imported; fix test:all in main package.json ([2f11024](https://github.com/instructure/instructure-ui/commit/2f11024))
- **ui-docs-plugin:** fix favicon ([1ede99f](https://github.com/instructure/instructure-ui/commit/1ede99f))

# [7.4.0](https://github.com/instructure/instructure-ui/compare/v7.3.5...v7.4.0) (2021-02-01)

### Bug Fixes

- fix release script ([e5b7e1f](https://github.com/instructure/instructure-ui/commit/e5b7e1f))
- fix review issues ([33ee9d8](https://github.com/instructure/instructure-ui/commit/33ee9d8))
- fix review issues ([fe349c7](https://github.com/instructure/instructure-ui/commit/fe349c7))
- fix typo ([9aeced9](https://github.com/instructure/instructure-ui/commit/9aeced9))
- **ui-scripts:** fix ui-scripts config for deploy-docs-via-github ([14bae47](https://github.com/instructure/instructure-ui/commit/14bae47))

### Features

- **ui-icons:** add new icons and update old ones ([4b524b3](https://github.com/instructure/instructure-ui/commit/4b524b3))

## [7.3.5](https://github.com/instructure/instructure-ui/compare/v7.3.2...v7.3.5) (2021-01-21)

### Bug Fixes

- **browserslist-config-instui:** fix broken tests caused by IE11 support removal ([965cf1b](https://github.com/instructure/instructure-ui/commit/965cf1b))
- **browserslist-config-instui:** remove IE from supported browserslist ([09c0888](https://github.com/instructure/instructure-ui/commit/09c0888))
- **esm:** don't mark commonjs as esm ([957c7cd](https://github.com/instructure/instructure-ui/commit/957c7cd))
- **esm:** fix rebasing artifacts ([a791afe](https://github.com/instructure/instructure-ui/commit/a791afe))
- **esm:** improve esm support ([b9184cc](https://github.com/instructure/instructure-ui/commit/b9184cc))
- **esm:** remove packaging-test/ ([1bfb15f](https://github.com/instructure/instructure-ui/commit/1bfb15f))
- **esm:** rewrite specify-commonjs-format in js ([005905e](https://github.com/instructure/instructure-ui/commit/005905e))
- **esm:** specify "exports" in package manifests ([6007684](https://github.com/instructure/instructure-ui/commit/6007684))
- **esm:** upgrade babel ([173a310](https://github.com/instructure/instructure-ui/commit/173a310))
- **esm:** validate esm packaging ([687ea0e](https://github.com/instructure/instructure-ui/commit/687ea0e))
- **ui-modal:** fix modal resetting contents when size is changed to/from fullscreen ([397c2b8](https://github.com/instructure/instructure-ui/commit/397c2b8))

## [7.3.4](https://github.com/instructure/instructure-ui/compare/v7.3.2...v7.3.4) (2021-01-14)

### Bug Fixes

- **browserslist-config-instui:** fix broken tests caused by IE11 support removal ([1ecf80b](https://github.com/instructure/instructure-ui/commit/1ecf80b))
- **browserslist-config-instui:** remove IE from supported browserslist ([09c0888](https://github.com/instructure/instructure-ui/commit/09c0888))
- **esm:** don't mark commonjs as esm ([957c7cd](https://github.com/instructure/instructure-ui/commit/957c7cd))
- **esm:** fix rebasing artifacts ([a791afe](https://github.com/instructure/instructure-ui/commit/a791afe))
- **esm:** improve esm support ([b9184cc](https://github.com/instructure/instructure-ui/commit/b9184cc))
- **esm:** remove packaging-test/ ([1bfb15f](https://github.com/instructure/instructure-ui/commit/1bfb15f))
- **esm:** rewrite specify-commonjs-format in js ([005905e](https://github.com/instructure/instructure-ui/commit/005905e))
- **esm:** specify "exports" in package manifests ([6007684](https://github.com/instructure/instructure-ui/commit/6007684))
- **esm:** upgrade babel ([173a310](https://github.com/instructure/instructure-ui/commit/173a310))
- **esm:** validate esm packaging ([687ea0e](https://github.com/instructure/instructure-ui/commit/687ea0e))

## [7.3.3](https://github.com/instructure/instructure-ui/compare/v7.3.2...v7.3.3) (2021-01-13)

### Bug Fixes

- **browserslist-config-instui:** remove IE from supported browserslist ([09c0888](https://github.com/instructure/instructure-ui/commit/09c0888))
- **esm:** don't mark commonjs as esm ([957c7cd](https://github.com/instructure/instructure-ui/commit/957c7cd))
- **esm:** fix rebasing artifacts ([a791afe](https://github.com/instructure/instructure-ui/commit/a791afe))
- **esm:** improve esm support ([b9184cc](https://github.com/instructure/instructure-ui/commit/b9184cc))
- **esm:** remove packaging-test/ ([1bfb15f](https://github.com/instructure/instructure-ui/commit/1bfb15f))
- **esm:** rewrite specify-commonjs-format in js ([005905e](https://github.com/instructure/instructure-ui/commit/005905e))
- **esm:** specify "exports" in package manifests ([6007684](https://github.com/instructure/instructure-ui/commit/6007684))
- **esm:** upgrade babel ([173a310](https://github.com/instructure/instructure-ui/commit/173a310))
- **esm:** validate esm packaging ([687ea0e](https://github.com/instructure/instructure-ui/commit/687ea0e))

## [7.3.2](https://github.com/instructure/instructure-ui/compare/v7.3.1...v7.3.2) (2020-12-10)

### Bug Fixes

- **ui-a11y-utils:** don't hide elements with aria-live ([440fbd5](https://github.com/instructure/instructure-ui/commit/440fbd5))

## [7.3.1](https://github.com/instructure/instructure-ui/compare/v7.3.0...v7.3.1) (2020-11-30)

**Note:** Version bump only for package instructure-ui

# [7.3.0](https://github.com/instructure/instructure-ui/compare/v7.2.4...v7.3.0) (2020-10-26)

### Features

- **ui-icons:** add calculator-desmos icon to the project ([df9bb2b](https://github.com/instructure/instructure-ui/commit/df9bb2b))

## [7.2.4](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.4) (2020-10-09)

**Note:** Version bump only for package instructure-ui

## [7.2.3](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.3) (2020-10-08)

**Note:** Version bump only for package instructure-ui

## [7.2.2](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.2) (2020-10-08)

**Note:** Version bump only for package instructure-ui

## [7.2.1](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.1) (2020-10-07)

**Note:** Version bump only for package instructure-ui

# [7.2.0](https://github.com/instructure/instructure-ui/compare/v7.1.4...v7.2.0) (2020-09-23)

### Features

- **ui-icons:** add new icons: compass, line-reader, notepad, protactor, review-screen, ruler ([ea218ca](https://github.com/instructure/instructure-ui/commit/ea218ca))

## [7.1.4](https://github.com/instructure/instructure-ui/compare/v7.1.3...v7.1.4) (2020-09-09)

### Bug Fixes

- **ui-simple-select:** add missing event args ([ab18a17](https://github.com/instructure/instructure-ui/commit/ab18a17))

## [7.1.3](https://github.com/instructure/instructure-ui/compare/v7.1.2...v7.1.3) (2020-08-10)

### Bug Fixes

- **ui-docs-plugin:** make sure utilities are categorized properly ([9dd6118](https://github.com/instructure/instructure-ui/commit/9dd6118))
- **ui-options:** Don't let words overflow in Options component ([dbb6dfe](https://github.com/instructure/instructure-ui/commit/dbb6dfe))

## [7.1.2](https://github.com/instructure/instructure-ui/compare/v7.1.1...v7.1.2) (2020-07-17)

**Note:** Version bump only for package instructure-ui

## [7.1.1](https://github.com/instructure/instructure-ui/compare/v7.1.0...v7.1.1) (2020-07-01)

**Note:** Version bump only for package instructure-ui

# [7.1.0](https://github.com/instructure/instructure-ui/compare/v7.0.0...v7.1.0) (2020-06-25)

### Features

- **ui-table:** allow valid values for ColHeader scope prop ([3133e55](https://github.com/instructure/instructure-ui/commit/3133e55))
- **ui-tree-browser:** allow specifying a different icon for each item ([ea98f06](https://github.com/instructure/instructure-ui/commit/ea98f06))

# [7.0.0](https://github.com/instructure/instructure-ui/compare/v6.26.0...v7.0.0) (2020-05-27)

> **Note:** For instructions on upgrading to version 7.0.0 and more information about breaking changes, see [the upgrade guide](#v7-upgrade-guide).

### Bug Fixes

- **docs,ui-toggle-details:** update under the hood props + a couple README prop ([ccbb0b2](https://github.com/instructure/instructure-ui/commit/ccbb0b2))
- **ui-code-editor:** make it work as a controlled component ([586de21](https://github.com/instructure/instructure-ui/commit/586de21))
- **ui-docs-client:** Make sidebar search not wrap ([6015661](https://github.com/instructure/instructure-ui/commit/6015661))
- **ui-list:** fix style collisions in the docs for list and inline list ([0d1b29a](https://github.com/instructure/instructure-ui/commit/0d1b29a))
- **ui-popover:** reduce tooltip flickering ([461d3fe](https://github.com/instructure/instructure-ui/commit/461d3fe))
- **ui-position:** account for offsetTop discrepency in firefox ([c46c4d1](https://github.com/instructure/instructure-ui/commit/c46c4d1))
- **ui-range-input:** patch CSS for legacy Edge ([d7372fe](https://github.com/instructure/instructure-ui/commit/d7372fe))
- **ui-react-utils:** ensure ComponentIdentifier renders in the docs ([044b9f3](https://github.com/instructure/instructure-ui/commit/044b9f3))
- **ui-testable:** fixes for createSuper being undefined ([ce73f32](https://github.com/instructure/instructure-ui/commit/ce73f32))
- **ui-theme-tokens,ui-token-scripts:** fix ui-token-scripts build ([e2e7105](https://github.com/instructure/instructure-ui/commit/e2e7105))

### chore

- bump minimum react version to 16.8.0 ([7a96f00](https://github.com/instructure/instructure-ui/commit/7a96f00))
- remove references to React 15 ([4bb2426](https://github.com/instructure/instructure-ui/commit/4bb2426))
- remove canvas-ams-theme ([91f1336](https://github.com/instructure/instructure-ui/commit/91f1336))
- **ui-component-examples,ui-theme-tokens:** switch component examples loader to cjs ([3abd6ca](https://github.com/instructure/instructure-ui/commit/3abd6ca))
- **ui-react-utils:** remove react-lifecycles-compat polyfill ([aa698ae](https://github.com/instructure/instructure-ui/commit/aa698ae))
- **ui-themeable:** remove support for IE11 ([bf6f5f7](https://github.com/instructure/instructure-ui/commit/bf6f5f7))

### Code Refactoring

- decouple theme properties from ui-themeable ([d5a8827](https://github.com/instructure/instructure-ui/commit/d5a8827))

### Features

- remove 'experimental' tag along with '\_\_dangerouslyIgnore...' ([92bf753](https://github.com/instructure/instructure-ui/commit/92bf753))
- **docs:** Newsletter for version 7 release ([86ed6d3](https://github.com/instructure/instructure-ui/commit/86ed6d3))
- **ui-breadcrumb:** Add responsive breadcrumb docs ([3ab5566](https://github.com/instructure/instructure-ui/commit/3ab5566))
- **ui-codemods:** read consumer config for prettier if it exists when applying codemods ([e38cbf9](https://github.com/instructure/instructure-ui/commit/e38cbf9))
- **ui-docs-client:** add a ToggleBlockquote to be used internally for upgrade guides ([0e87dc9](https://github.com/instructure/instructure-ui/commit/0e87dc9))
- **ui-docs-client:** Docs/homepage refresh ([ee4957b](https://github.com/instructure/instructure-ui/commit/ee4957b))
- **ui-icons:** add "sort" icon ([3a76f0b](https://github.com/instructure/instructure-ui/commit/3a76f0b))
- **ui-icons:** added margin to 'add' and 'x' icons ([c7632c4](https://github.com/instructure/instructure-ui/commit/c7632c4))
- **ui-scripts:** Add flags to ui-test to opt out of linting and coverage ([d4ea03e](https://github.com/instructure/instructure-ui/commit/d4ea03e))
- **ui-tabs:** Responsive tabs ([df2c642](https://github.com/instructure/instructure-ui/commit/df2c642))
- **ui-text-area:** update deprecated lifecycle ([7e13cb3](https://github.com/instructure/instructure-ui/commit/7e13cb3))

### BREAKING CHANGES

- - Removed the `canvas-ams-theme` package. Use `canvas-theme` instead.

Change-Id: I077f6b8cbbef9ee12e5904fb4c9dc4b48409acbb
Reviewed-on: https://gerrit.instructure.com/c/instructure-ui/+/237960
Tested-by: Service Cloud Jenkins <svc.cloudjenkins@instructure.com>
Reviewed-by: Steve Jensen <sejensen@instructure.com>
QA-Review: Daniel Sasaki <dsasaki@instructure.com>
Product-Review: Steve Jensen <sejensen@instructure.com>
Visual-Regression-Test: Steve Jensen <sejensen@instructure.com>

- **ui-react-utils:** - removed lifecycle polyfill from ui-react-utils

TEST PLAN:

- No regressions to Expandable, Focusable, Transition,
  or Playground
- ui-react-utils should no longer export or document
  polyfill

Change-Id: Ib714de4dc2a4ef048af2f43f272bcb8a2e545a5c
Reviewed-on: https://gerrit.instructure.com/c/instructure-ui/+/237790
Tested-by: Service Cloud Jenkins <svc.cloudjenkins@instructure.com>
Reviewed-by: Chris Guerrero <cguerrero@instructure.com>
Product-Review: Ken Meleta <kmeleta@instructure.com>
QA-Review: Daniel Sasaki <dsasaki@instructure.com>
Visual-Regression-Test: Ken Meleta <kmeleta@instructure.com>

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

- - Changed arguments for `ui-token-scripts` commands

* Changed structure of `ui-token-scripts` configuration file

Change-Id: I33213d2350f9ce07c157a6ad3f8cd2e6bccb14e9
Reviewed-on: https://gerrit.instructure.com/c/instructure-ui/+/236552
Reviewed-by: Steve Jensen <sejensen@instructure.com>
Product-Review: Steve Jensen <sejensen@instructure.com>
Tested-by: Service Cloud Jenkins <svc.cloudjenkins@instructure.com>
QA-Review: Daniel Sasaki <dsasaki@instructure.com>
Visual-Regression-Test: Steve Jensen <sejensen@instructure.com>

- **ui-code-editor:** CodeEditor is now controlled-only.

TEST PLAN:

- playground examples should work as before in docs
- automated tests should pass
- in dev environment, no react lifecycles warnings should
  show in console

Change-Id: I68398d56447af2a03c9db51bee5cce96f1fe5bd2
Reviewed-on: https://gerrit.instructure.com/c/instructure-ui/+/224132
Tested-by: Service Cloud Jenkins <svc.cloudjenkins@instructure.com>
Reviewed-by: Chris Hart <chart@instructure.com>
Visual-Regression-Test: Ken Meleta <kmeleta@instructure.com>
Product-Review: Chris Hart <chart@instructure.com>
QA-Review: Daniel Sasaki <dsasaki@instructure.com>

- **ui-themeable:** - Removed support for IE11 by eliminating custom properties polyfill

* Removed `scopeStylesToNode`, `scopeCssText`, and `customPropertiesSupported`
  utility helpers.

Change-Id: I41de82b6167f1aa9f25d87ddc279e5d3c5f0b413
Reviewed-on: https://gerrit.instructure.com/c/instructure-ui/+/235818
Tested-by: Service Cloud Jenkins <svc.cloudjenkins@instructure.com>
Reviewed-by: Steve Jensen <sejensen@instructure.com>
Product-Review: Steve Jensen <sejensen@instructure.com>
QA-Review: Daniel Sasaki <dsasaki@instructure.com>
Visual-Regression-Test: Chris Guerrero <cguerrero@instructure.com>

# [6.26.0](https://github.com/instructure/instructure-ui/compare/v6.25.0...v6.26.0) (2020-04-30)

### Features

- **instui-config:** finish adding codemod configs for universal package ([142d52b](https://github.com/instructure/instructure-ui/commit/142d52b))
- **ui-file-drop:** add a height prop ([4fc0c4a](https://github.com/instructure/instructure-ui/commit/4fc0c4a))

# [6.25.0](https://github.com/instructure/instructure-ui/compare/v6.24.0...v6.25.0) (2020-04-27)

### Bug Fixes

- **instui-config:** publish import codemod configs to npm ([93fc574](https://github.com/instructure/instructure-ui/commit/93fc574))

### Features

- **instui-cli,instui-config,ui-codemods,ui-upgrade-scripts:** allow option to migrate to universal ([2090d6c](https://github.com/instructure/instructure-ui/commit/2090d6c))
- **instui-config,ui:** add a universal export package ([9e74450](https://github.com/instructure/instructure-ui/commit/9e74450))

# [6.24.0](https://github.com/instructure/instructure-ui/compare/v6.23.0...v6.24.0) (2020-04-14)

### Bug Fixes

- **ui-drawer-layout:** Fix no styles applied on root ([689780a](https://github.com/instructure/instructure-ui/commit/689780a))
- **ui-view:** optimize View in test and prod ([3d4ea25](https://github.com/instructure/instructure-ui/commit/3d4ea25))

### Features

- **instui-cli,instui-config:** add a default parser configuration file ([c25bb88](https://github.com/instructure/instructure-ui/commit/c25bb88))

# [6.23.0](https://github.com/instructure/instructure-ui/compare/v6.22.0...v6.23.0) (2020-04-02)

### Bug Fixes

- **ui-buttons:** fix canvas custom theming for primary Button text ([7672ee9](https://github.com/instructure/instructure-ui/commit/7672ee9))
- **ui-buttons:** fix issue with button theme overrides ([4022c95](https://github.com/instructure/instructure-ui/commit/4022c95))
- **ui-docs-client,ui-modal:** modalbody using undefined theme var ([66e0a16](https://github.com/instructure/instructure-ui/commit/66e0a16))
- **ui-tabs:** correct mis-named theme variable for Tabs.Panel ([35ce38b](https://github.com/instructure/instructure-ui/commit/35ce38b))

### Features

- **instui-config,canvas-ams-theme,ui-themes,ui-view:** add canvas-ams-theme ([f31849f](https://github.com/instructure/instructure-ui/commit/f31849f))
- **instui-config,ui-codemods,ui-scripts,ui-upgrade-scripts:** named imports for codemods ([a7db548](https://github.com/instructure/instructure-ui/commit/a7db548))
- **ui-docs-client:** update deprecated components still in use ([4543717](https://github.com/instructure/instructure-ui/commit/4543717))
- **ui-icons:** add-folder, add-media and record icons ([c1c7d67](https://github.com/instructure/instructure-ui/commit/c1c7d67))
- **ui-select,ui-text-input:** allow size attr on Select/TextInput ([025a564](https://github.com/instructure/instructure-ui/commit/025a564))
- **ui-simple-select,ui-table:** update select in sortable tables ([36e8b19](https://github.com/instructure/instructure-ui/commit/36e8b19))

# [6.22.0](https://github.com/instructure/instructure-ui/compare/v6.21.0...v6.22.0) (2020-03-16)

### Bug Fixes

- **ui-date-input:** allow passthrough props in DateInput ([7228baa](https://github.com/instructure/instructure-ui/commit/7228baa))
- **ui-popover:** allow tooltip to manage its focus region ([8391f4f](https://github.com/instructure/instructure-ui/commit/8391f4f))
- **ui-tag:** show cut off letter descenders ([b4cad27](https://github.com/instructure/instructure-ui/commit/b4cad27))
- **ui-time-select:** make TimeSelect test less brittle ([42a90c7](https://github.com/instructure/instructure-ui/commit/42a90c7))

### Features

- **canvas-theme,ui-docs-client:** theme color docs enhancements ([69a1938](https://github.com/instructure/instructure-ui/commit/69a1938))
- **ui-docs-client:** add Google analytics to docs app ([748c1e2](https://github.com/instructure/instructure-ui/commit/748c1e2))
- **ui-docs-client:** ensure button upgrade examples render 'canvas theme' ([4d68de9](https://github.com/instructure/instructure-ui/commit/4d68de9))
- **ui-menu:** restore support for mountNode ([b53ec24](https://github.com/instructure/instructure-ui/commit/b53ec24))
- **ui-select:** allow override of autocomplete attr in Select ([41e09ac](https://github.com/instructure/instructure-ui/commit/41e09ac))
- **ui-select,ui-simple-select:** add mountNode prop to Select ([a8b60a6](https://github.com/instructure/instructure-ui/commit/a8b60a6))
- **ui-time-select:** add TimeSelect component ([1dfa39b](https://github.com/instructure/instructure-ui/commit/1dfa39b))

# [6.21.0](https://github.com/instructure/instructure-ui/compare/v6.20.0...v6.21.0) (2020-02-26)

### Bug Fixes

- **ui-breadcrumb:** ensure Breakcrumb.Link icon + renderIcon props work ([14e5f1c](https://github.com/instructure/instructure-ui/commit/14e5f1c))
- **ui-navigation:** fix position/transition of Nav expand/collapse button ([c18dcab](https://github.com/instructure/instructure-ui/commit/c18dcab))

### Features

- **ui-heading:** Accept multiple font families ([da12bb8](https://github.com/instructure/instructure-ui/commit/da12bb8))
- **ui-select:** Add a SimpleSelect component ([a7ed234](https://github.com/instructure/instructure-ui/commit/a7ed234))
- **ui-themeable:** use hash instead of randomly generated component id when styles are null ([62ac665](https://github.com/instructure/instructure-ui/commit/62ac665))

# [6.20.0](https://github.com/instructure/instructure-ui/compare/v6.19.0...v6.20.0) (2020-02-13)

### Bug Fixes

- **ui-themeable:** check JSDOM environment ([5ef3244](https://github.com/instructure/instructure-ui/commit/5ef3244))

### Features

- **ui-docs-client:** update deprecated lifecycle in Playground ([9c6888f](https://github.com/instructure/instructure-ui/commit/9c6888f))
- **ui-motion:** update deprecated lifeycles from ui-motion ([9d0593e](https://github.com/instructure/instructure-ui/commit/9d0593e))
- **ui-text-input:** Add shouldNotWrap property ([cca1201](https://github.com/instructure/instructure-ui/commit/cca1201))
- **ui-themeable:** allow theme adapter to map a single old value to multiple new values ([8b5bb3f](https://github.com/instructure/instructure-ui/commit/8b5bb3f))

# [6.19.0](https://github.com/instructure/instructure-ui/compare/v6.18.0...v6.19.0) (2020-02-11)

### Bug Fixes

- **ui-expandable:** replace componentWillReceiveProps ([d59f529](https://github.com/instructure/instructure-ui/commit/d59f529))
- **ui-select:** ensure Select.Group imports .Option ([8dc609f](https://github.com/instructure/instructure-ui/commit/8dc609f))

### Features

- undeprecate disabled and readOnly in inputs ([79cf68f](https://github.com/instructure/instructure-ui/commit/79cf68f))
- **instructure-theme:** add instructure-theme ([df088ec](https://github.com/instructure/instructure-ui/commit/df088ec))
- **instui-cli,instui-config,ui-upgrade-scripts:** eliminate parser errors when running codemods ([0430c6b](https://github.com/instructure/instructure-ui/commit/0430c6b))
- **ui-docs-client:** use updated Button throughout docs/components ([9f0be81](https://github.com/instructure/instructure-ui/commit/9f0be81))
- **ui-link:** un-deprecate disabled in Link ([a8df168](https://github.com/instructure/instructure-ui/commit/a8df168))

# [6.18.0](https://github.com/instructure/instructure-ui/compare/v6.17.0...v6.18.0) (2020-02-04)

### Bug Fixes

- **ui-flex:** adopt more children types ([1f2ac25](https://github.com/instructure/instructure-ui/commit/1f2ac25))
- **ui-menu:** update Popover import to new package align updated props ([77176a7](https://github.com/instructure/instructure-ui/commit/77176a7))
- **ui-pill:** update TruncateText import to new package ([8957e76](https://github.com/instructure/instructure-ui/commit/8957e76))
- **ui-responsive:** responsive rendering fixes ([93627a6](https://github.com/instructure/instructure-ui/commit/93627a6))
- **ui-table:** loosen caption prop ([97cf3e7](https://github.com/instructure/instructure-ui/commit/97cf3e7))

### Features

- **instui-config,ui-buttons,ui-react-utils:** un-deprecate disabled and readOnly in button ([8041bbf](https://github.com/instructure/instructure-ui/commit/8041bbf))
- **instui-config,ui-buttons,ui-themeable:** upgrade Button ([ed73df1](https://github.com/instructure/instructure-ui/commit/ed73df1))
- **ui-buttons:** Add ToggleButton component ([4e25cfc](https://github.com/instructure/instructure-ui/commit/4e25cfc))
- **ui-buttons:** Update CloseButton to use upgraded Button props ([365e0ac](https://github.com/instructure/instructure-ui/commit/365e0ac))
- **ui-react-utils,ui-scripts,ui-webpack-config:** env variable to omit deprecation warnings ([6cc3193](https://github.com/instructure/instructure-ui/commit/6cc3193))

# [6.17.0](https://github.com/instructure/instructure-ui/compare/v6.16.0...v6.17.0) (2020-01-22)

### Bug Fixes

- Update Package READMEs and align deprecation statements ([8f892e4](https://github.com/instructure/instructure-ui/commit/8f892e4))
- **docs:** Update MIT License link ([13a9dff](https://github.com/instructure/instructure-ui/commit/13a9dff))
- **ui-billboard,ui-dialog,ui-expandable,ui-options,ui-text-input,ui-tooltip:** devDep audit ([c1f0dc0](https://github.com/instructure/instructure-ui/commit/c1f0dc0))
- **ui-forms:** add back the export of CheckboxFacade and ToggleFacade ([e5dc547](https://github.com/instructure/instructure-ui/commit/e5dc547))
- **ui-karma-config:** Stop eating top-level test suite errors ([7324d35](https://github.com/instructure/instructure-ui/commit/7324d35))
- **ui-number-input:** add type="button" to buttons ([5f66aff](https://github.com/instructure/instructure-ui/commit/5f66aff))
- **ui-table:** sort arrow should not change place based on cell alignment ([f1e0c29](https://github.com/instructure/instructure-ui/commit/f1e0c29))
- **ui-test-utils:** prevent test sandbox initialization in production and development ([80d9bc1](https://github.com/instructure/instructure-ui/commit/80d9bc1))

### Features

- **babel-plugin-transform-imports:** allow imports that are not at the root level of src ([d239362](https://github.com/instructure/instructure-ui/commit/d239362))
- **template-app:** update import paths to new packages ([bd78d0b](https://github.com/instructure/instructure-ui/commit/bd78d0b))
- **ui-babel-preset:** allow for specifying additional import transforms ([908c8d5](https://github.com/instructure/instructure-ui/commit/908c8d5))
- **ui-breadcrumb,ui-link,ui-elements:** address Links underlining ([388b8cc](https://github.com/instructure/instructure-ui/commit/388b8cc))
- **ui-docs-client:** allow for embedding code inline with markdown ([aea7989](https://github.com/instructure/instructure-ui/commit/aea7989))
- **ui-editable:** use IconButton internally for edit button ([8031721](https://github.com/instructure/instructure-ui/commit/8031721))
- **ui-forms:** export old Select subcomponents ([ecbcbf6](https://github.com/instructure/instructure-ui/commit/ecbcbf6))
- **ui-icons:** add 'audio-off' icon ([8f5030c](https://github.com/instructure/instructure-ui/commit/8f5030c))
- **ui-icons:** add comments-off and comments-on icons ([650a42a](https://github.com/instructure/instructure-ui/commit/650a42a))
- **ui-overlays:** update deprecated lifecycles in Overlay ([dddda64](https://github.com/instructure/instructure-ui/commit/dddda64))
- **ui-pagination:** use IconButton internally for the "previous/next" ([a0075e1](https://github.com/instructure/instructure-ui/commit/a0075e1))
- **ui-svg-images:** add `auto` height/width ([abf52f1](https://github.com/instructure/instructure-ui/commit/abf52f1))
- **ui-toggle-details:** use IconButton internally for the toggle btn ([f1679c4](https://github.com/instructure/instructure-ui/commit/f1679c4))

### Performance Improvements

- **ui-responsive:** responsive performance enhancements ([5096c00](https://github.com/instructure/instructure-ui/commit/5096c00))

# [6.16.0](https://github.com/instructure/instructure-ui/compare/v6.15.0...v6.16.0) (2019-12-13)

### Bug Fixes

- **ui-a11y-utils:** fix ui-a11y-utils dependencies ([d431666](https://github.com/instructure/instructure-ui/commit/d431666))
- **ui-docs-client:** remove unnecessary import of ScreenReaderContent ([07d453b](https://github.com/instructure/instructure-ui/commit/07d453b))
- **ui-modal:** update deprecated lifecycles in modal ([eaa0c9d](https://github.com/instructure/instructure-ui/commit/eaa0c9d))
- **ui-tooltip:** uncontrolled example broken ([9d19413](https://github.com/instructure/instructure-ui/commit/9d19413))

### Features

- **instui-cli,ui-scripts,ui-template-scripts:** add a new ui-template-scripts package ([e3669ba](https://github.com/instructure/instructure-ui/commit/e3669ba))
- **instui-cli,ui-upgrade-scripts:** add a new ui-upgrade-scripts package ([f5067ee](https://github.com/instructure/instructure-ui/commit/f5067ee))
- **ui-badge:** add ui-badge package ([8de4dae](https://github.com/instructure/instructure-ui/commit/8de4dae))
- **ui-buttons:** add a CondensedButton component ([e807b1c](https://github.com/instructure/instructure-ui/commit/e807b1c))
- **ui-buttons:** add an IconButton component ([e170d95](https://github.com/instructure/instructure-ui/commit/e170d95))
- **ui-byline,ui-layout:** add ui-byline package ([4be733d](https://github.com/instructure/instructure-ui/commit/4be733d))
- **ui-checkbox:** add ui-checkbox package ([94840fa](https://github.com/instructure/instructure-ui/commit/94840fa))
- **ui-docs-client:** make content within docs pages navigable via linking ([595f155](https://github.com/instructure/instructure-ui/commit/595f155))
- **ui-docs-client:** updates to compileMarkdown for id generation ([832f7b2](https://github.com/instructure/instructure-ui/commit/832f7b2))
- **ui-drawer-layout:** add ui-drawer-layout package ([2c59227](https://github.com/instructure/instructure-ui/commit/2c59227))
- **ui-elements:** add isWithinText prop to ui-element Link ([9d0ee8e](https://github.com/instructure/instructure-ui/commit/9d0ee8e))
- **ui-elements,ui-truncate-text:** add ui-truncate-text package ([75500f9](https://github.com/instructure/instructure-ui/commit/75500f9))
- **ui-expandable:** add ui-expandable package ([6e5bfd3](https://github.com/instructure/instructure-ui/commit/6e5bfd3))
- **ui-forms,ui-radio-input:** add ui-radio-input package ([151edd9](https://github.com/instructure/instructure-ui/commit/151edd9))
- **ui-forms,ui-text-area:** add ui-text-area package ([e116712](https://github.com/instructure/instructure-ui/commit/e116712))
- **ui-navigation:** remove experimental pill from AppNav ([e460042](https://github.com/instructure/instructure-ui/commit/e460042))
- **ui-range-input:** ui-range-input package ([48c2786](https://github.com/instructure/instructure-ui/commit/48c2786))
- **ui-responsive:** add ui-responsive package ([13616d2](https://github.com/instructure/instructure-ui/commit/13616d2))
- **ui-spinner:** ui-spinner and design updates ([c80c40c](https://github.com/instructure/instructure-ui/commit/c80c40c))
- **ui-themeable:** update deprecated lifecycles in themeable ([a581b70](https://github.com/instructure/instructure-ui/commit/a581b70))
- **ui-tray:** ui-tray package ([07d7399](https://github.com/instructure/instructure-ui/commit/07d7399))

# [6.15.0](https://github.com/instructure/instructure-ui/compare/v6.14.0...v6.15.0) (2019-11-18)

### Bug Fixes

- **ui-dom-utils:** prevent recursive textNode checks ([c06a7f9](https://github.com/instructure/instructure-ui/commit/c06a7f9))
- **ui-elements:** remove redundant TruncateText test ([ea222d3](https://github.com/instructure/instructure-ui/commit/ea222d3))
- **ui-focusable:** fix edge case with getSnapshotBeforeUpdate ([895d131](https://github.com/instructure/instructure-ui/commit/895d131))
- **ui-react-utils:** fix deprecated util functions in production ([1c09675](https://github.com/instructure/instructure-ui/commit/1c09675))
- **ui-react-utils:** omit children from passthroughProps ([c0e9cff](https://github.com/instructure/instructure-ui/commit/c0e9cff))
- **ui-select:** prevent cursor for uneditable selects ([2e2540a](https://github.com/instructure/instructure-ui/commit/2e2540a))
- **ui-tooltip:** update Tooltip dependency ([98a1617](https://github.com/instructure/instructure-ui/commit/98a1617))
- **ui-view:** allow View to use native browser focus ([7686f1b](https://github.com/instructure/instructure-ui/commit/7686f1b))

### Features

- ensure all packages have build script for types ([4891dc4](https://github.com/instructure/instructure-ui/commit/4891dc4))
- Move React to a peer dependency ([9648ca3](https://github.com/instructure/instructure-ui/commit/9648ca3))
- **instui-cli,template-component:** add react as a peer dep when generating components ([b8ca302](https://github.com/instructure/instructure-ui/commit/b8ca302))
- **template-component:** include types in component generation template ([ae9ce15](https://github.com/instructure/instructure-ui/commit/ae9ce15))
- **ui-a11y-content:** remove experimental flag from ui-a11y-content package ([ce96006](https://github.com/instructure/instructure-ui/commit/ce96006))
- **ui-a11y-utils,ui-dialog:** add ui-a11y-utils and ui-dialog ([c88cf8e](https://github.com/instructure/instructure-ui/commit/c88cf8e))
- **ui-alerts:** update deprecated lifeycles in Alert ([aac0930](https://github.com/instructure/instructure-ui/commit/aac0930))
- **ui-alerts,Alert:** make aria-atomic configurable ([502b3d9](https://github.com/instructure/instructure-ui/commit/502b3d9))
- **ui-avatar:** make ui-avatar backwards compatible ([c94255d](https://github.com/instructure/instructure-ui/commit/c94255d))
- **ui-buttons:** add a BaseButton component ([dbb83cd](https://github.com/instructure/instructure-ui/commit/dbb83cd))
- **ui-calendar:** reduce calendar test noise ([b5fea9b](https://github.com/instructure/instructure-ui/commit/b5fea9b))
- **ui-docs-client:** Add first InstUI Insider content ([acc4744](https://github.com/instructure/instructure-ui/commit/acc4744))
- **ui-docs-client,ui-elements:** ensure ui-docs-client is using Table from ui-table ([5788fce](https://github.com/instructure/instructure-ui/commit/5788fce))
- **ui-file-drop:** make ui-file-drop backwards compatible ([0534ca2](https://github.com/instructure/instructure-ui/commit/0534ca2))
- **ui-flex,ui-layout:** make ui-flex backwards compatible ([c11cc6b](https://github.com/instructure/instructure-ui/commit/c11cc6b))
- **ui-focusable:** update deprecated lifecycles in Focusable ([696c998](https://github.com/instructure/instructure-ui/commit/696c998))
- **ui-grid:** add ui-grid package ([3921f32](https://github.com/instructure/instructure-ui/commit/3921f32))
- **ui-heading:** make ui-heading backwards compatible ([c4f9541](https://github.com/instructure/instructure-ui/commit/c4f9541))
- **ui-icons-build,ui-icons:** fix icon build and add studio, certified ([90d01f4](https://github.com/instructure/instructure-ui/commit/90d01f4))
- **ui-img:** make ui-img backwards compatible ([ff7d2b6](https://github.com/instructure/instructure-ui/commit/ff7d2b6))
- **ui-link:** Make ui-link/Link backwards compatible ([3e62c49](https://github.com/instructure/instructure-ui/commit/3e62c49))
- **ui-list:** add ui-list package ([7c867af](https://github.com/instructure/instructure-ui/commit/7c867af))
- **ui-metric:** add ui-metric package ([d4b6dd3](https://github.com/instructure/instructure-ui/commit/d4b6dd3))
- **ui-modal:** add ui-modal package ([a9c5cee](https://github.com/instructure/instructure-ui/commit/a9c5cee))
- **ui-overlays,ui-tooltip:** expose positionTarget prop on Tooltip ([6c1a545](https://github.com/instructure/instructure-ui/commit/6c1a545))
- **ui-pill:** make ui-pill backwards compatible ([480eeb7](https://github.com/instructure/instructure-ui/commit/480eeb7))
- **ui-popover:** make ui-popover backwards compatible ([d9437ae](https://github.com/instructure/instructure-ui/commit/d9437ae))
- **ui-position:** make ui-position backwards compatible ([24e90d1](https://github.com/instructure/instructure-ui/commit/24e90d1))
- **ui-progress:** add ui-progress package ([4dfcf4a](https://github.com/instructure/instructure-ui/commit/4dfcf4a))
- **ui-rating:** add ui-rating package ([3fa4129](https://github.com/instructure/instructure-ui/commit/3fa4129))
- **ui-react-utils:** allow for completely custom message in deprecatePropValues ([9a86beb](https://github.com/instructure/instructure-ui/commit/9a86beb))
- **ui-react-utils:** update deprecated lifecycles in decorators ([87295bf](https://github.com/instructure/instructure-ui/commit/87295bf))
- **ui-tag:** ui-tag package ([dbf87ca](https://github.com/instructure/instructure-ui/commit/dbf87ca))
- **ui-text:** make ui-text backwards compatible ([7aabd6a](https://github.com/instructure/instructure-ui/commit/7aabd6a))
- **ui-text-input:** make ui-text-input backwards compatible ([b9d889d](https://github.com/instructure/instructure-ui/commit/b9d889d))
- **ui-themeable:** allow components to specify a theme adapter ([8be3d42](https://github.com/instructure/instructure-ui/commit/8be3d42))
- **ui-tooltip:** make ui-tooltip backwards compatible ([7608e7c](https://github.com/instructure/instructure-ui/commit/7608e7c))
- **ui-tooltip:** update tooltip callback naming ([2b26d54](https://github.com/instructure/instructure-ui/commit/2b26d54))
- **ui-view:** Make ui-view backwards-compatible ([7dd2a2f](https://github.com/instructure/instructure-ui/commit/7dd2a2f))
- **ui-view:** move ContextView to ui-view package ([4601b4a](https://github.com/instructure/instructure-ui/commit/4601b4a))

### Performance Improvements

- **ui-tooltip:** remove Focusable from Tooltip ([83aa0c9](https://github.com/instructure/instructure-ui/commit/83aa0c9))

# [6.14.0](https://github.com/instructure/instructure-ui/compare/v6.13.0...v6.14.0) (2019-10-14)

### Bug Fixes

- **instui-config:** fix typos in propName codemod config ([81f1975](https://github.com/instructure/instructure-ui/commit/81f1975))
- **ui-elements:** fix TruncateText's componentDidUpdate logic ([5055515](https://github.com/instructure/instructure-ui/commit/5055515))
- **ui-file-drop,ui-pill:** update babel ([a7a8489](https://github.com/instructure/instructure-ui/commit/a7a8489))
- **ui-react-utils:** fix production errors for decorator functions ([f5da64c](https://github.com/instructure/instructure-ui/commit/f5da64c))
- **ui-table:** ignore falsy children in Table.Row ([dae5db6](https://github.com/instructure/instructure-ui/commit/dae5db6))

### Features

- **ui-file-drop:** add ui-file-drop package ([b275521](https://github.com/instructure/instructure-ui/commit/b275521))
- **ui-heading:** add ui-heading package ([b681432](https://github.com/instructure/instructure-ui/commit/b681432))
- **ui-link:** add ui-link package ([fa75902](https://github.com/instructure/instructure-ui/commit/fa75902))
- **ui-position:** add ui-position package ([5511a88](https://github.com/instructure/instructure-ui/commit/5511a88))
- **ui-tooltip:** add ui-tooltip package ([2e88e8a](https://github.com/instructure/instructure-ui/commit/2e88e8a))

### Performance Improvements

- **ui-react-utils:** make dev-only decorators really noops in prod ([f2f4865](https://github.com/instructure/instructure-ui/commit/f2f4865))
- **ui-testable:** make ui-testable have no cost in prod ([5ab79fa](https://github.com/instructure/instructure-ui/commit/5ab79fa))
- **ui-view:** don't call verifySpanMargin in prod mode ([60e0c2f](https://github.com/instructure/instructure-ui/commit/60e0c2f))

# [6.13.0](https://github.com/instructure/instructure-ui/compare/v6.12.0...v6.13.0) (2019-09-24)

### Bug Fixes

- **instui-config:** fix v7 codemod paths ([918d38f](https://github.com/instructure/instructure-ui/commit/918d38f))
- **ui-focusable:** fix focus race condition with label / checkbox ([54da3ed](https://github.com/instructure/instructure-ui/commit/54da3ed))
- **ui-scripts:** follow-up fix to g/209544 ([bc6945b](https://github.com/instructure/instructure-ui/commit/bc6945b))

### Features

- **ui-elements:** allow TruncateText to force truncation of hidden text ([66bbf82](https://github.com/instructure/instructure-ui/commit/66bbf82))
- **ui-elements,ui-pill:** add ui-pill package for the Pill Component ([4a71024](https://github.com/instructure/instructure-ui/commit/4a71024))
- **ui-react-utils:** add hack decorator ([1351477](https://github.com/instructure/instructure-ui/commit/1351477))

### Performance Improvements

- **console:** help terser dead-code-eliminate console funcs ([323c469](https://github.com/instructure/instructure-ui/commit/323c469))

# [6.12.0](https://github.com/instructure/instructure-ui/compare/v6.11.0...v6.12.0) (2019-09-17)

### Bug Fixes

- **ui-utils:** export isEdge from the root of @instructure/ui-utils ([b97f3fe](https://github.com/instructure/instructure-ui/commit/b97f3fe))

### Features

- **ui-babel-preset:** add support for javascript optional chaining ([e56d64b](https://github.com/instructure/instructure-ui/commit/e56d64b))

# [6.11.0](https://github.com/instructure/instructure-ui/compare/v6.10.0...v6.11.0) (2019-09-16)

### Bug Fixes

- **instui-cli:** fix incorrect spacing for dependencies when generating package ([b1bbfe9](https://github.com/instructure/instructure-ui/commit/b1bbfe9))
- **ui-babel-preset:** ensure runtime helper is used for \_objectSpread ([2eb42d7](https://github.com/instructure/instructure-ui/commit/2eb42d7))
- **ui-karma-config:** run all tests if one test file fails to load ([a8dab36](https://github.com/instructure/instructure-ui/commit/a8dab36))
- **ui-layout:** DrawerTray content needs 100% height ([500af47](https://github.com/instructure/instructure-ui/commit/500af47))
- **ui-overlays:** do not unset duration for modals ([0b304e7](https://github.com/instructure/instructure-ui/commit/0b304e7))
- **ui-react-utils:** provide correct contextual binding for lifecycle methods in experimental ([9aeeb19](https://github.com/instructure/instructure-ui/commit/9aeeb19))
- **ui-tabs:** pass id in Tabs onRequestTabChange handler ([6d58611](https://github.com/instructure/instructure-ui/commit/6d58611))
- **ui-view:** fix border colors in Edge HCM ([091dde3](https://github.com/instructure/instructure-ui/commit/091dde3))

### Features

- **ui-a11y-content,ui-a11y:** add ui-a11y-content package ([cb49c7a](https://github.com/instructure/instructure-ui/commit/cb49c7a))
- **ui-avatar,ui-elements:** add ui-avatar package for Avatar component ([34a6001](https://github.com/instructure/instructure-ui/commit/34a6001))
- **ui-elements,ui-img:** add ui-img package for Img Component ([c2e4e7d](https://github.com/instructure/instructure-ui/commit/c2e4e7d))
- **ui-elements,ui-text:** add ui-text Package for Text Component ([5bdb65a](https://github.com/instructure/instructure-ui/commit/5bdb65a))
- **ui-flex:** add ui-flex package ([98730ff](https://github.com/instructure/instructure-ui/commit/98730ff))
- **ui-navigation:** Responsive AppNav ([dd843d0](https://github.com/instructure/instructure-ui/commit/dd843d0))
- **ui-popover:** Add ui-popover package ([62c1165](https://github.com/instructure/instructure-ui/commit/62c1165))
- **ui-react-utils:** add flag to suppress experimental warnings ([d30e678](https://github.com/instructure/instructure-ui/commit/d30e678))
- **ui-react-utils:** pass props in callRenderProp ([042bc84](https://github.com/instructure/instructure-ui/commit/042bc84))
- **ui-scripts:** enable ui-scripts to post to multiple slack channels ([ee796c2](https://github.com/instructure/instructure-ui/commit/ee796c2))
- **ui-view:** add ui-view Package for View Component ([7799577](https://github.com/instructure/instructure-ui/commit/7799577))
- **ui-view:** mark ui-view as experimental ([6b805fa](https://github.com/instructure/instructure-ui/commit/6b805fa))

### Performance Improvements

- **ui-utils:** stop using bowser for browser detection ([95f1232](https://github.com/instructure/instructure-ui/commit/95f1232))

# [6.10.0](https://github.com/instructure/instructure-ui/compare/v6.9.0...v6.10.0) (2019-08-27)

### Bug Fixes

- **ui-a11y:** prevent errors w/ x-domain iframes in FocusRegion ([83267f1](https://github.com/instructure/instructure-ui/commit/83267f1))
- **ui-alerts:** fix React warnings emitted from Alert.updateScreenreaderAlert ([c97e64d](https://github.com/instructure/instructure-ui/commit/c97e64d))
- **ui-docs-plugin:** fix docs in IE11 ([65a875c](https://github.com/instructure/instructure-ui/commit/65a875c))
- **ui-layout:** Map theme vars to Canvas vars ([7f21fec](https://github.com/instructure/instructure-ui/commit/7f21fec))
- **ui-pagination:** fix pagination buttons ([be78f69](https://github.com/instructure/instructure-ui/commit/be78f69))
- **ui-stylesheet,ui-themeable:** error when gt 1 copies of themeable ([b1e8164](https://github.com/instructure/instructure-ui/commit/b1e8164))
- **ui-table:** add aria-sort attributes to Table header ([eb802f1](https://github.com/instructure/instructure-ui/commit/eb802f1))
- **ui-tabs:** don't pass through onChange attr ([3e185d1](https://github.com/instructure/instructure-ui/commit/3e185d1))
- **ui-themeable:** revert the "newless" change ([c4ce9ba](https://github.com/instructure/instructure-ui/commit/c4ce9ba))

### Features

- **ui-forms:** disabled/readOnly in FileDrop ([86f323c](https://github.com/instructure/instructure-ui/commit/86f323c))

# [6.9.0](https://github.com/instructure/instructure-ui/compare/v6.8.1...v6.9.0) (2019-08-07)

### Bug Fixes

- **ui-themeable:** make themeable work with real `class`es ([ec0d5b9](https://github.com/instructure/instructure-ui/commit/ec0d5b9))

### Features

- **ui-forms:** add labelPlacement property ([39225ca](https://github.com/instructure/instructure-ui/commit/39225ca))

## [6.8.1](https://github.com/instructure/instructure-ui/compare/v6.8.0...v6.8.1) (2019-08-02)

### Bug Fixes

- **ui-a11y:** convert getElementsByTagName results to Array ([4e7c07a](https://github.com/instructure/instructure-ui/commit/4e7c07a))

# [6.8.0](https://github.com/instructure/instructure-ui/compare/v6.7.0...v6.8.0) (2019-07-31)

### Bug Fixes

- **template-component:** Update template and docs ([c1913e1](https://github.com/instructure/instructure-ui/commit/c1913e1))
- **ui-a11y,ui-overlays:** fix tray/dialog document click behaviors ([1130a73](https://github.com/instructure/instructure-ui/commit/1130a73))
- **ui-forms:** keep escape from closing modals when a file selection dialog is open ([321c246](https://github.com/instructure/instructure-ui/commit/321c246))
- **ui-react-utils:** handle fat arrow functions in callRenderProp ([6e0d0c8](https://github.com/instructure/instructure-ui/commit/6e0d0c8))
- **ui-select,ui-selectable:** stop event propagation from selectable ([fc75997](https://github.com/instructure/instructure-ui/commit/fc75997))
- **ui-test-utils:** reset viewport in init/before hook ([f271a5b](https://github.com/instructure/instructure-ui/commit/f271a5b))

### Features

- **browserslist-config-instui,ui-eslint-config:** add browserslist pkg, browser compat linting ([6fcee36](https://github.com/instructure/instructure-ui/commit/6fcee36))
- **ui-webpack-config:** Add a env var to disable linter failure on warnings ([ace5500](https://github.com/instructure/instructure-ui/commit/ace5500))

# [6.7.0](https://github.com/instructure/instructure-ui/compare/v6.6.0...v6.7.0) (2019-07-15)

### Bug Fixes

- **ui-editable:** move keyUp handler for escape handling ([4d197d3](https://github.com/instructure/instructure-ui/commit/4d197d3))

### Features

- **ui-forms:** allow all children in RadioInputGroup ([d7ca99a](https://github.com/instructure/instructure-ui/commit/d7ca99a))
- **ui-icons:** add Admin Tools, ePortfolio, Permissions, Sub-Accounts ([7c910ad](https://github.com/instructure/instructure-ui/commit/7c910ad))

# [6.6.0](https://github.com/instructure/instructure-ui/compare/v6.5.0...v6.6.0) (2019-07-03)

### Bug Fixes

- **template-app,template-component,template-package:** remove npmignore files from template packages ([e0b7136](https://github.com/instructure/instructure-ui/commit/e0b7136))
- **template-app,template-component,template-package,ui-scripts:** rename templates for npm ([1749abd](https://github.com/instructure/instructure-ui/commit/1749abd))

### Features

- **ui-scripts:** retrieve GitHub url from config instead of package.json ([c62b01e](https://github.com/instructure/instructure-ui/commit/c62b01e))

# [6.5.0](https://github.com/instructure/instructure-ui/compare/v6.4.0...v6.5.0) (2019-07-01)

### Bug Fixes

- add missing exports ([10044d4](https://github.com/instructure/instructure-ui/commit/10044d4))
- **instui-config,ui-tabs:** deprecate focus prop and add shouldFocusOnRender ([6f26701](https://github.com/instructure/instructure-ui/commit/6f26701))
- **ui-date-input:** align calendar icon ([32c9d9d](https://github.com/instructure/instructure-ui/commit/32c9d9d))
- **ui-date-input,ui-text-input:** add assistiveText prop to DateInput ([20ed322](https://github.com/instructure/instructure-ui/commit/20ed322))
- **ui-elements:** replace componentWillReceiveProps logic in TruncateText ([a7fa13d](https://github.com/instructure/instructure-ui/commit/a7fa13d))
- **ui-number-input:** update NumberInput prop names ([7cad427](https://github.com/instructure/instructure-ui/commit/7cad427))
- **ui-scripts:** Make fix flag work when no paths are passed to the lint command ([ed0cb15](https://github.com/instructure/instructure-ui/commit/ed0cb15))
- **ui-select:** scroll logic and example updates ([fd91714](https://github.com/instructure/instructure-ui/commit/fd91714))
- **ui-tabs:** tabbable content in a tab panel should be tabbable ([4753bd3](https://github.com/instructure/instructure-ui/commit/4753bd3))
- **ui-tabs:** update canvas theme variables to new variants ([6472a51](https://github.com/instructure/instructure-ui/commit/6472a51))
- **ui-test-utils:** remove window/document event listener cleanup ([9fb45b3](https://github.com/instructure/instructure-ui/commit/9fb45b3))
- **ui-text-input:** set line height to prevent truncating descenders ([4cb3666](https://github.com/instructure/instructure-ui/commit/4cb3666))
- **ui-text-input:** update TextInput prop names ([3aedab8](https://github.com/instructure/instructure-ui/commit/3aedab8))

### Features

- **instui-cli,template-app,ui-scripts:** add an instui starter app ([3f0f00e](https://github.com/instructure/instructure-ui/commit/3f0f00e))
- **instui-cli,template-component,ui-scripts:** Generate component script ([8b8480e](https://github.com/instructure/instructure-ui/commit/8b8480e))
- **instui-cli,template-package,ui-scripts:** move generate package script to instui-cli ([69f1613](https://github.com/instructure/instructure-ui/commit/69f1613))
- **instui-config,ui-date-input:** dateInput change label prop to renderLabel ([a172999](https://github.com/instructure/instructure-ui/commit/a172999))
- **ui-docs-client:** Add What's New page to docs ([64126d6](https://github.com/instructure/instructure-ui/commit/64126d6))
- **ui-elements:** Added `wrap` prop to Text ([b17daba](https://github.com/instructure/instructure-ui/commit/b17daba))
- **ui-icons:** add "code" icon ([b330455](https://github.com/instructure/instructure-ui/commit/b330455))
- **ui-icons:** add text-direction rtl and ltr icons ([3b91145](https://github.com/instructure/instructure-ui/commit/3b91145))
- **ui-navigation:** appNav component ([8f2d874](https://github.com/instructure/instructure-ui/commit/8f2d874))
- **ui-scripts:** allow open sandbox script to function in monorepo without repo name or username ([919d966](https://github.com/instructure/instructure-ui/commit/919d966))
- **ui-scripts:** expand codemod extensions to accept .jsx ([e217bb2](https://github.com/instructure/instructure-ui/commit/e217bb2))

# [6.4.0](https://github.com/instructure/instructure-ui/compare/v6.3.0...v6.4.0) (2019-06-13)

### Bug Fixes

- **ui-breadcrumb:** separator color ([e0c7fe0](https://github.com/instructure/instructure-ui/commit/e0c7fe0))
- **ui-component-examples:** prevent OOM when generating View examples ([df5f505](https://github.com/instructure/instructure-ui/commit/df5f505))
- **ui-component-examples:** support components w/ no props/values ([4c76e2b](https://github.com/instructure/instructure-ui/commit/4c76e2b))
- **ui-layout:** pass down elementRef to Flex and Flex.Item ([4dfb941](https://github.com/instructure/instructure-ui/commit/4dfb941))

### Features

- **ui-alerts:** add renderCloseButtonLabel to Alert ([4684530](https://github.com/instructure/instructure-ui/commit/4684530))
- **ui-eslint-config:** enable react/no-typos rule ([d8fc415](https://github.com/instructure/instructure-ui/commit/d8fc415))
- **ui-forms,ui-selectable:** deprecate ui-forms select ([1f7b53d](https://github.com/instructure/instructure-ui/commit/1f7b53d))
- **ui-icons:** add closed-captioning icon ([58444ee](https://github.com/instructure/instructure-ui/commit/58444ee))
- **ui-icons:** add miscellaneous 'table' icons to ui-icons ([8ec7a8b](https://github.com/instructure/instructure-ui/commit/8ec7a8b))
- **ui-icons:** update solid version of 'Dashboard' and 'Inbox' icons ([33a8b4c](https://github.com/instructure/instructure-ui/commit/33a8b4c))
- **ui-icons:** update svg exports for misc icons ([319abb7](https://github.com/instructure/instructure-ui/commit/319abb7))
- **ui-layout:** Add focus styles to View ([2dd401c](https://github.com/instructure/instructure-ui/commit/2dd401c))
- **ui-scripts:** add open-sandbox script ([093076a](https://github.com/instructure/instructure-ui/commit/093076a))
- **ui-scripts:** addition of a monorepo open sandbox command ([7fd349d](https://github.com/instructure/instructure-ui/commit/7fd349d))
- **ui-select:** add controlled select ([634ab1a](https://github.com/instructure/instructure-ui/commit/634ab1a))

# [6.3.0](https://github.com/instructure/instructure-ui/compare/v6.2.0...v6.3.0) (2019-05-28)

### Bug Fixes

- **ui-a11y:** dialogs with non focusable children should contain focus when shouldContainFocus ([f72a179](https://github.com/instructure/instructure-ui/commit/f72a179))
- **ui-elements:** Change scoping of Link color ([09028b8](https://github.com/instructure/instructure-ui/commit/09028b8))
- **ui-elements:** fix typo in componentWillUnmount ([093c47e](https://github.com/instructure/instructure-ui/commit/093c47e))
- **ui-portal:** remove ui-testable from Portal ([9421d63](https://github.com/instructure/instructure-ui/commit/9421d63))
- **ui-test-utils:** prevent test pollution related failures ([626bd7a](https://github.com/instructure/instructure-ui/commit/626bd7a))
- **ui-themeable:** Fix polyfill class selector ([0527709](https://github.com/instructure/instructure-ui/commit/0527709))

### Features

- **ui-icons:** update existing text-subscript icon per design ([fea49f4](https://github.com/instructure/instructure-ui/commit/fea49f4))
- **ui-layout:** add functional colors as background values for View ([18938fa](https://github.com/instructure/instructure-ui/commit/18938fa))
- **ui-options:** add Options component ([c0df653](https://github.com/instructure/instructure-ui/commit/c0df653))

# [6.2.0](https://github.com/instructure/instructure-ui/compare/v6.1.0...v6.2.0) (2019-05-13)

### Bug Fixes

- **ui-docs-client:** escape regexp chars in icon search term ([00b3ef9](https://github.com/instructure/instructure-ui/commit/00b3ef9))
- **ui-elements:** don’t set type=button on any non-button <Link>s ([67084ae](https://github.com/instructure/instructure-ui/commit/67084ae))
- **ui-forms:** use renderTitle prop on Spinner ([dce5248](https://github.com/instructure/instructure-ui/commit/dce5248))

### Features

- **ui-breadcrumb,ui-elements:** remove default as='button' on Link ([c23e859](https://github.com/instructure/instructure-ui/commit/c23e859))
- **ui-elements:** add renderTitle prop to Spinner component ([6b66b89](https://github.com/instructure/instructure-ui/commit/6b66b89))
- **ui-elements,ui-svg-images:** adds alert color to Text and InlineSVG components ([118ba53](https://github.com/instructure/instructure-ui/commit/118ba53))
- **ui-portal:** Use built-in React 16 Portal ([1e334e3](https://github.com/instructure/instructure-ui/commit/1e334e3))

# [6.1.0](https://github.com/instructure/instructure-ui/compare/v6.0.0...v6.1.0) (2019-05-09)

### Bug Fixes

- **instui-config,ui-forms:** deprecate DateInput from ui-forms ([d02c7ea](https://github.com/instructure/instructure-ui/commit/d02c7ea))
- **ui-docs-client,ui-docs-plugin:** update icon import paths ([5a3eda2](https://github.com/instructure/instructure-ui/commit/5a3eda2))
- **ui-prop-types:** Update childrenOrValue error message ([b36f61a](https://github.com/instructure/instructure-ui/commit/b36f61a))
- **ui-scripts:** fix tags for patch releases ([a479911](https://github.com/instructure/instructure-ui/commit/a479911))
- **ui-tabs:** Selected tab animations ([1313023](https://github.com/instructure/instructure-ui/commit/1313023))

### Features

- **ui-form-field:** add input container ref to FormField ([16bebbf](https://github.com/instructure/instructure-ui/commit/16bebbf))
- **ui-icons:** add new bullet-list-(option) icons to icon library ([c2433af](https://github.com/instructure/instructure-ui/commit/c2433af))

# [6.0.0](https://github.com/instructure/instructure-ui/compare/v5.52.3...v6.0.0) (2019-05-03)

### Bug Fixes

- **instui-cli:** don't use yarn to run jscodeshift ([992e250](https://github.com/instructure/instructure-ui/commit/992e250))
- **instui-cli,ui-codemods:** codemod paths should work when cli is globally installed ([0948a76](https://github.com/instructure/instructure-ui/commit/0948a76))
- **instui-cli,ui-codemods,ui-scripts:** require uncached version of configs ([7130c12](https://github.com/instructure/instructure-ui/commit/7130c12))
- **ui-docs-client:** fix search icon import path ([7390556](https://github.com/instructure/instructure-ui/commit/7390556))
- **ui-layout:** position should account for documentElement offset ([701b08e](https://github.com/instructure/instructure-ui/commit/701b08e))
- **ui-utils:** ensure 'getActiveElement' is using the instui 'contains' ([26f7d98](https://github.com/instructure/instructure-ui/commit/26f7d98))

### Features

- remove deprecated packages/props ([1d8813c](https://github.com/instructure/instructure-ui/commit/1d8813c))
- **babel-plugin-themeable-styles:** deprecate themeable config ([f3228bc](https://github.com/instructure/instructure-ui/commit/f3228bc))
- **canvas-theme,canvas-high-contrast-theme:** separate canvas theme packages ([ef2e1d0](https://github.com/instructure/instructure-ui/commit/ef2e1d0))
- **instui-cli,instui-config,ui-codemods:** add upgrade command ([a805ed6](https://github.com/instructure/instructure-ui/commit/a805ed6))
- **instui-cli,instui-config,ui-scripts:** Allow upgrade to specific version ([55c3c16](https://github.com/instructure/instructure-ui/commit/55c3c16))
- **instui-config,ui-codemods:** configure codemod updates for simple prop values ([4049122](https://github.com/instructure/instructure-ui/commit/4049122))
- **instui-config,ui-forms:** add deprecation + codemod for old TextInput to TextInputControlled ([eb83528](https://github.com/instructure/instructure-ui/commit/eb83528))
- **ui-babel-preset:** transform member imports to full paths ([d02cc45](https://github.com/instructure/instructure-ui/commit/d02cc45))
- **ui-dom-utils,ui-react-utils,ui-color-utils:** new utils packages ([03e8ee2](https://github.com/instructure/instructure-ui/commit/03e8ee2))

### Performance Improvements

- **ui-icons,ui-icons-build:** remove default exports for React icons ([95195ee](https://github.com/instructure/instructure-ui/commit/95195ee))

### BREAKING CHANGES

- **ui-core:** entire package has been removed
- **ui-elements:** ContextBox has been removed
- **ui-testbed:** entire package has been removed
- **ui-forms:** NumberInput has been removed
- **ui-container:** entire package has been removed
- **ui-menu:** MenuItemFlyout has been removed
- **ui-forms:** FormField & FormFieldGroup have been removed
- **ui-svg-images:** height and width props removed from SVGIcon
- **ui-utils:** Decimal has been removed
- **ui-overlays:** applicationElement, closeButtonLabel, closeButtonRef, closeButtonVariant props removed from Tray (as well as dep warnings from InstUI 3)
- **ui-overlays:** applicationElement, closeButtonLabel, closeButtonRef props removed from Popover (as well as dep warnings from InstUI 3)
- **ui-overlays:** applicationElement, closeButtonLabel, closeButtonRef props removed from Modal (as well as dep warnings from InstUI 3)
- **ui-overlays:** fullScreen prop removed from Mask
- **ui-menu:** active prop removed from MenuItem
- **ui-menu:** title, labelledBy and controls props removed from Menu
- **ui-a11y:** applicationElement prop removed from Dialog
- **ui-code-editor:** code prop removed from CodeEditor
- **ui-layout:** size prop removed from View
- **ui-elements:** ellipsis prop removed from Link
- **ui-overlays:** size prop removed from Tooltip, switched variant so the inverse Tooltip is what a consumer gets out of the box, default (light has to be explicitly set)
- **ui-alerts:** 3.0 deprecations removed from Alert
- **ui-elements:** 3.0 deprecations removed from Table, prop values from Heading, ListItem
- **ui-portal:** 3.0 deprecations removed from Portal
- **ui-component-examples:** should not be referencing a size prop for Tooltip
- **ui-utils:** deprecated util has updated messaging
- **scripts:** update component and package template dependancy from '^5' to '^6'
- **ui-forms, ui-icons, ui-overlays, ui-utils:** remove 'config' folder as they now reside in their own package
- **ui-themeable:** added warning in dev env when using react version < 15
- All package peerDependencies updated to remove support for React v0.14
- **ui-utils:** deprecated utils removed
- **ui-themes:** remove deprecated canvas-a11y theme
- removed /components and /utils directories, add codemods to update imports

## [5.52.3](https://github.com/instructure/instructure-ui/compare/v5.52.2...v5.52.3) (2019-04-25)

### Bug Fixes

- **ui-layout:** position should account for documentElement offset ([f70bde6](https://github.com/instructure/instructure-ui/commit/f70bde6))

## [5.52.2](https://github.com/instructure/instructure-ui/compare/v5.52.1...v5.52.2) (2019-04-17)

### Bug Fixes

- **ui-calendar,ui-date-input,ui-table:** align week labels in center ([2ec0d82](https://github.com/instructure/instructure-ui/commit/2ec0d82))
- **ui-date-input:** improve onRequestValidateDate documentation ([faa04db](https://github.com/instructure/instructure-ui/commit/faa04db))
- **ui-elements:** fix role for Rating so it reads correctly for SR ([8b3a4c0](https://github.com/instructure/instructure-ui/commit/8b3a4c0))
- **ui-elements:** MetricsList/MetricsListItem allow data attributes to be passed thru ([319188c](https://github.com/instructure/instructure-ui/commit/319188c))
- **ui-form-field:** allow data attributes to be passed thru FormField ([05ecfd5](https://github.com/instructure/instructure-ui/commit/05ecfd5))
- **ui-utils:** allow to prop on elements that allow href ([208fa09](https://github.com/instructure/instructure-ui/commit/208fa09))

### Performance Improvements

- **console:** fix production error/warning stripping ([f03d6e6](https://github.com/instructure/instructure-ui/commit/f03d6e6))

## [5.52.1](https://github.com/instructure/instructure-ui/compare/v5.52.0...v5.52.1) (2019-04-08)

### Bug Fixes

- **ui-scripts:** remove DEBUG var for babel transpile ([e8cd217](https://github.com/instructure/instructure-ui/commit/e8cd217))
- **ui-table:** deprecate prop `mode` ([d9282c1](https://github.com/instructure/instructure-ui/commit/d9282c1))
- **ui-text-input:** readOnly input should not look disabled ([1c13287](https://github.com/instructure/instructure-ui/commit/1c13287))

# [5.52.0](https://github.com/instructure/instructure-ui/compare/v5.51.1...v5.52.0) (2019-04-03)

### Bug Fixes

- **ui-scripts:** resolve promise for gerritbot review ([23a7123](https://github.com/instructure/instructure-ui/commit/23a7123))
- **ui-table:** use flex on sortable button ([f03eeb1](https://github.com/instructure/instructure-ui/commit/f03eeb1))

### Features

- **console:** remove console statements in prod env ([603c738](https://github.com/instructure/instructure-ui/commit/603c738))
- **ui-scripts:** ui-build --modules option ([0be81cc](https://github.com/instructure/instructure-ui/commit/0be81cc))

## [5.51.1](https://github.com/instructure/instructure-ui/compare/v5.51.0...v5.51.1) (2019-03-30)

### Bug Fixes

- **ui-elements,ui-layout:** prevent prop warnings due to defaults ([5a7128d](https://github.com/instructure/instructure-ui/commit/5a7128d))

# [5.51.0](https://github.com/instructure/instructure-ui/compare/v5.50.0...v5.51.0) (2019-03-29)

### Bug Fixes

- **ui-forms:** fix too much recursion error ([08dedf3](https://github.com/instructure/instructure-ui/commit/08dedf3))
- **ui-menu:** prevent menu from focusing single item ([6d8ac37](https://github.com/instructure/instructure-ui/commit/6d8ac37))

### Features

- **ui-scripts:** post gerrit reviews from publish script ([b63ec87](https://github.com/instructure/instructure-ui/commit/b63ec87))
- **ui-table:** make table responsive ([1ec9a2b](https://github.com/instructure/instructure-ui/commit/1ec9a2b))
- **ui-utils:** add React's render stack to console messages ([4226153](https://github.com/instructure/instructure-ui/commit/4226153))

# [5.50.0](https://github.com/instructure/instructure-ui/compare/v5.49.0...v5.50.0) (2019-03-28)

### Bug Fixes

- **ui-core:** update menu ui-core/config ([04dc453](https://github.com/instructure/instructure-ui/commit/04dc453))
- **ui-forms:** allow Select to render without inline mountNode ([44e9176](https://github.com/instructure/instructure-ui/commit/44e9176))
- **ui-forms:** prevent select from closing prematurely in IE ([785c9dd](https://github.com/instructure/instructure-ui/commit/785c9dd))
- **ui-forms:** remove explicit mountNode in Select ([8542b79](https://github.com/instructure/instructure-ui/commit/8542b79))
- **ui-overlays:** deprecate size prop for Tooltip ([07fddac](https://github.com/instructure/instructure-ui/commit/07fddac))
- **ui-scripts:** CSS changes should auto-reload with yarn dev ([071a1a9](https://github.com/instructure/instructure-ui/commit/071a1a9))
- **ui-scripts:** split DEBUG env variable ([0b0033e](https://github.com/instructure/instructure-ui/commit/0b0033e))

### Features

- **ui-billboard:** allow node and function for message prop ([88ebd37](https://github.com/instructure/instructure-ui/commit/88ebd37))
- **ui-text-input:** Add flex layout ([6613d27](https://github.com/instructure/instructure-ui/commit/6613d27))

# [5.49.0](https://github.com/instructure/instructure-ui/compare/v5.48.0...v5.49.0) (2019-03-22)

### Bug Fixes

- **ui-a11y:** convert NodeList to Array in ScreenReaderFocusRegion ([ab482a6](https://github.com/instructure/instructure-ui/commit/ab482a6))
- **ui-a11y:** prevent focus from escaping dialog ([899dd5e](https://github.com/instructure/instructure-ui/commit/899dd5e))
- **ui-component-examples:** improve loadtime for storybook ([679b37d](https://github.com/instructure/instructure-ui/commit/679b37d))
- **ui-menu:** always focus the entire menu when opened ([9bec477](https://github.com/instructure/instructure-ui/commit/9bec477))
- **ui-scripts:** don't update x-package deps when bumping versions ([5550000](https://github.com/instructure/instructure-ui/commit/5550000))
- **ui-tabs:** update Tabs sub-directories to support dot notation naming convention ([6bb2616](https://github.com/instructure/instructure-ui/commit/6bb2616))
- **ui-test-utils:** better error message when sinon sandbox is undef ([19d65df](https://github.com/instructure/instructure-ui/commit/19d65df))
- **ui-test-utils:** preserve built-in behavior of chai contain method ([a7b266e](https://github.com/instructure/instructure-ui/commit/a7b266e))
- **ui-themeable:** prevent setting a component theme to an empty object ([04d8bc2](https://github.com/instructure/instructure-ui/commit/04d8bc2))

### Features

- **ui-calendar,ui-focusable:** a Calendar component ([7a4f96e](https://github.com/instructure/instructure-ui/commit/7a4f96e))
- **ui-date-input:** A controlled DateInput ([e558771](https://github.com/instructure/instructure-ui/commit/e558771))
- **ui-scripts:** read dotenv file from project root ([6886dcb](https://github.com/instructure/instructure-ui/commit/6886dcb))
- **ui-test-utils:** add unmount util ([4d508be](https://github.com/instructure/instructure-ui/commit/4d508be))

# [5.48.0](https://github.com/instructure/instructure-ui/compare/v5.47.0...v5.48.0) (2019-03-18)

### Bug Fixes

- **ui-prop-types:** require prop-types >= 15.7 ([30c105a](https://github.com/instructure/instructure-ui/commit/30c105a))

### Features

- **ui-component-examples,ui-test-utils:** add parameters to example config ([19e4cfd](https://github.com/instructure/instructure-ui/commit/19e4cfd))
- **ui-table:** add controlled table ([20f39f9](https://github.com/instructure/instructure-ui/commit/20f39f9))

# [5.47.0](https://github.com/instructure/instructure-ui/compare/v5.46.1...v5.47.0) (2019-03-15)

### Bug Fixes

- **ui-utils:** updates to CustomPropTypes.Children ([4679cbb](https://github.com/instructure/instructure-ui/commit/4679cbb))

### Features

- **ui-selectable:** add Selectable component ([de742b4](https://github.com/instructure/instructure-ui/commit/de742b4))
- **ui-tabs:** new Tabs component ([b8fe295](https://github.com/instructure/instructure-ui/commit/b8fe295))
- **ui-test-utils:** add a few more test helpers ([386a867](https://github.com/instructure/instructure-ui/commit/386a867))

## [5.46.1](https://github.com/instructure/instructure-ui/compare/v5.46.0...v5.46.1) (2019-03-13)

### Bug Fixes

- **ui-icons:** add missing unpublish icon ([de613be](https://github.com/instructure/instructure-ui/commit/de613be))

# [5.46.0](https://github.com/instructure/instructure-ui/compare/v5.45.1...v5.46.0) (2019-03-12)

### Bug Fixes

- **ui-scripts:** include merged tags for bump and RCs ([62c3dbe](https://github.com/instructure/instructure-ui/commit/62c3dbe))

### Features

- **ui-text-input:** prepend/append content ([183d589](https://github.com/instructure/instructure-ui/commit/183d589))

## [5.45.1](https://github.com/instructure/instructure-ui/compare/v5.45.0...v5.45.1) (2019-03-12)

**Note:** Version bump only for package instructure-ui

# [5.45.0](https://github.com/instructure/instructure-ui/compare/v5.44.0...v5.45.0) (2019-03-11)

### Bug Fixes

- fix yarn test --scope ([92ba95e](https://github.com/instructure/instructure-ui/commit/92ba95e))
- **ui-babel-preset:** load themeable config ([b5b8397](https://github.com/instructure/instructure-ui/commit/b5b8397))
- **ui-forms:** prevent "duplicate adjacent keys" react warning ([1cf778f](https://github.com/instructure/instructure-ui/commit/1cf778f))
- **ui-scripts:** disable git reset for RC releases ([e02cf7a](https://github.com/instructure/instructure-ui/commit/e02cf7a))
- **ui-scripts:** move working directory check ([174e2d1](https://github.com/instructure/instructure-ui/commit/174e2d1))
- **ui-scripts:** update repo package version for RCs ([0573f5c](https://github.com/instructure/instructure-ui/commit/0573f5c))
- **ui-scripts:** use correct version in post-publish for RCs ([fa1c985](https://github.com/instructure/instructure-ui/commit/fa1c985))
- **ui-scripts,ui-test-utils:** make sure test teardown always runs ([be84200](https://github.com/instructure/instructure-ui/commit/be84200))
- **ui-text-input:** fix layout with inline and width props ([0a8dfea](https://github.com/instructure/instructure-ui/commit/0a8dfea))
- **ui-webpack-config:** add missing dependency ([234d7cd](https://github.com/instructure/instructure-ui/commit/234d7cd))

### Features

- A ui-prop-types package ([0fbc609](https://github.com/instructure/instructure-ui/commit/0fbc609))
- **ui-eslint-config:** remove async test rule ([607b878](https://github.com/instructure/instructure-ui/commit/607b878))
- **ui-karma-config,ui-scripts:** --randomize test order flag ([dee991c](https://github.com/instructure/instructure-ui/commit/dee991c))
- **ui-menu:** Fix roles on menu item group items for NVDA/JAWS ([76de5d0](https://github.com/instructure/instructure-ui/commit/76de5d0))
- **ui-postcss-config:** minify the css we publish to npm ([9aa49dc](https://github.com/instructure/instructure-ui/commit/9aa49dc))
- **ui-scripts,ui-test-utils:** move jsdom to ui-scripts ([9d1f063](https://github.com/instructure/instructure-ui/commit/9d1f063))
- **ui-test-utils:** add aliases for finding by text, label ([14fdb9e](https://github.com/instructure/instructure-ui/commit/14fdb9e))

### Performance Improvements

- **ui-babel-preset:** don't add polyfills to js we publish to npm ([2d2e859](https://github.com/instructure/instructure-ui/commit/2d2e859))

# [5.44.0](https://github.com/instructure/instructure-ui/compare/v5.43.0...v5.44.0) (2019-03-01)

### Bug Fixes

- **ui-scripts:** fix publish and post-publish ([1d863e3](https://github.com/instructure/instructure-ui/commit/1d863e3))

### Features

- **ui-buttons,ui-elements,ui-themes:** underline the Link component by default ([9a90a7f](https://github.com/instructure/instructure-ui/commit/9a90a7f))
- **ui-forms,ui-test-utils:** add locators, assertions, typeIn helper ([7d36c3d](https://github.com/instructure/instructure-ui/commit/7d36c3d))
- **ui-layout:** Add overflow props to View ([d0d779f](https://github.com/instructure/instructure-ui/commit/d0d779f))
- **ui-text-input:** add controlled TextInput ([a372757](https://github.com/instructure/instructure-ui/commit/a372757))

# [5.43.0](https://github.com/instructure/instructure-ui/compare/v5.42.0...v5.43.0) (2019-02-27)

### Bug Fixes

- **jenkins:** SSH directory doesn’t have access on post merge ([907b123](https://github.com/instructure/instructure-ui/commit/907b123))
- **postcss-themeable-styles,ui-buttons:** add missing Button theme variables ([ac626ec](https://github.com/instructure/instructure-ui/commit/ac626ec))
- **ui-buttons:** scope Button styles more tightly to HTML ([92f044f](https://github.com/instructure/instructure-ui/commit/92f044f))

### Features

- **ui-component-examples:** add a new examples generator ([eefb1e7](https://github.com/instructure/instructure-ui/commit/eefb1e7))
- **ui-overlays:** add overflow property to Modal ([614933c](https://github.com/instructure/instructure-ui/commit/614933c))
- **ui-test-utils:** add a11y test generator util ([16240d8](https://github.com/instructure/instructure-ui/commit/16240d8))

<a name="5.42.0"></a>

# [5.42.0](https://github.com/instructure/instructure-ui/compare/v5.41.1...v5.42.0) (2019-02-15)

### Bug Fixes

- generate:component should work w/ an existing package ([54be01b](https://github.com/instructure/instructure-ui/commit/54be01b))
- **ui-elements:** remove relative position from Link ([cd96e4c](https://github.com/instructure/instructure-ui/commit/cd96e4c))
- **ui-postcss-config:** use requires to prevent missing deps ([d6735a4](https://github.com/instructure/instructure-ui/commit/d6735a4))

### Features

- **ui-overlays:** deprecate small, medium tooltip - remove shadow ([0be0008](https://github.com/instructure/instructure-ui/commit/0be0008))
- **ui-scripts:** add examples and server scripts ([e229eef](https://github.com/instructure/instructure-ui/commit/e229eef))
- **ui-scripts,ui-test-utils:** add a --mocha option to ui-test ([bd37e2b](https://github.com/instructure/instructure-ui/commit/bd37e2b))

### Performance Improvements

- **babel-plugin-themeable-styles:** speed up babel transpile ([2df2a22](https://github.com/instructure/instructure-ui/commit/2df2a22))

<a name="5.41.1"></a>

## [5.41.1](https://github.com/instructure/instructure-ui/compare/v5.41.0...v5.41.1) (2019-01-30)

### Bug Fixes

- **docs-app:** fix codepen links ([1f8a56f](https://github.com/instructure/instructure-ui/commit/1f8a56f))
- **ui-babel-preset:** add missing babel-plugin-macros dep ([9e97e77](https://github.com/instructure/instructure-ui/commit/9e97e77))
- **ui-scripts:** switch to npm publish from yarn ([f22c2b2](https://github.com/instructure/instructure-ui/commit/f22c2b2))

<a name="5.41.0"></a>

# [5.41.0](https://github.com/instructure/instructure-ui/compare/v5.40.0...v5.41.0) (2019-01-29)

### Bug Fixes

- **cz-lerna-changelog:** add missing dependency ([4352282](https://github.com/instructure/instructure-ui/commit/4352282))
- **ui-editable,ui-forms:** select blurs when it shouldn't ([65563e8](https://github.com/instructure/instructure-ui/commit/65563e8))
- **ui-elements:** Make Link work with TruncateText ([5f49edc](https://github.com/instructure/instructure-ui/commit/5f49edc))
- **ui-elements:** remove gradiant from HCM progress ([00d5b7b](https://github.com/instructure/instructure-ui/commit/00d5b7b))
- **ui-focusable:** Focusable should retain focus ([2891d8c](https://github.com/instructure/instructure-ui/commit/2891d8c))
- **ui-form-field:** design alignment with form helper/error text ([9e7de74](https://github.com/instructure/instructure-ui/commit/9e7de74))
- **ui-forms:** fix enablePreview prop on FileDrop ([3c44424](https://github.com/instructure/instructure-ui/commit/3c44424))
- **ui-forms:** prevent multiple onChange events from controlled selects ([cef91d7](https://github.com/instructure/instructure-ui/commit/cef91d7))
- **ui-number-input:** use a large font when size="large" ([5f00619](https://github.com/instructure/instructure-ui/commit/5f00619))

### Features

- **ui-editable:** add "inline" prop to InPlaceEdit ([5caedc1](https://github.com/instructure/instructure-ui/commit/5caedc1))
- **ui-overlays:** allow support for icons alongside close button in inverse variant ([932a468](https://github.com/instructure/instructure-ui/commit/932a468))

<a name="5.40.0"></a>

# [5.40.0](https://github.com/instructure/instructure-ui/compare/v5.39.0...v5.40.0) (2019-01-15)

### Bug Fixes

- **ui-forms:** pass NumberInput props to input ([4b61a84](https://github.com/instructure/instructure-ui/commit/4b61a84))
- **ui-overlays:** ensure null can be passed as children to Modal ([80d7483](https://github.com/instructure/instructure-ui/commit/80d7483))
- **ui-test-utils:** use MutationObserver shim ([2b0128c](https://github.com/instructure/instructure-ui/commit/2b0128c))

### Features

- **ui-presets:** check if version is published already ([57b8e8f](https://github.com/instructure/instructure-ui/commit/57b8e8f))

<a name="5.39.0"></a>

# [5.39.0](https://github.com/instructure/instructure-ui/compare/v5.38.0...v5.39.0) (2019-01-11)

### Bug Fixes

- **docs-app:** add missing changelog in docs ([7c18ccd](https://github.com/instructure/instructure-ui/commit/7c18ccd))
- **NumberInput:** display '0' passed as a number ([4935f95](https://github.com/instructure/instructure-ui/commit/4935f95))
- **ui-forms:** fix disabled opacity for select options ([66101a6](https://github.com/instructure/instructure-ui/commit/66101a6))
- **ui-overlays:** prevent ModalBody focus when scrollable ([a1fafa5](https://github.com/instructure/instructure-ui/commit/a1fafa5))
- **ui-overlays:** set Modal transition to 0s for IE11 ([7a669e5](https://github.com/instructure/instructure-ui/commit/7a669e5))
- **ui-pagination:** Fix hidden label text layout ([4b15da4](https://github.com/instructure/instructure-ui/commit/4b15da4))

### Features

- **ui-billboard:** use link color for billboard message ([d0049db](https://github.com/instructure/instructure-ui/commit/d0049db))
- **ui-decorator:** add a ui-decorator package/util ([8179186](https://github.com/instructure/instructure-ui/commit/8179186))
- **ui-overlays:** add inverse variant to modal ([d0f6332](https://github.com/instructure/instructure-ui/commit/d0f6332))
- **ui-test-utils:** add MutationObserver, setImmediate shims ([97adeba](https://github.com/instructure/instructure-ui/commit/97adeba))
- **uid:** Add a uid package/util ([279bcda](https://github.com/instructure/instructure-ui/commit/279bcda))

<a name="5.38.0"></a>

# [5.38.0](https://github.com/instructure/instructure-ui/compare/v5.37.0...v5.38.0) (2019-01-04)

### Bug Fixes

- **ui-a11y,ui-test-utils:** handle iframes with inaccessible documents ([f155829](https://github.com/instructure/instructure-ui/commit/f155829))
- **ui-form-field:** ensure legend is the first child of fieldset ([1bd67a5](https://github.com/instructure/instructure-ui/commit/1bd67a5))
- **ui-forms:** use pointer cursor for toggle ([75d00d2](https://github.com/instructure/instructure-ui/commit/75d00d2))
- **ui-overlays:** remove border-radius from fullscreen modal ([552ab68](https://github.com/instructure/instructure-ui/commit/552ab68))
- **ui-overlays:** stop Modal inheriting parent font color ([68eb293](https://github.com/instructure/instructure-ui/commit/68eb293))
- **ui-test-utils:** logic that determines visibility is incorrect ([f0d59b1](https://github.com/instructure/instructure-ui/commit/f0d59b1))

### Features

- **media-capture:** Update type for returned file ([6238b6f](https://github.com/instructure/instructure-ui/commit/6238b6f))
- **ui-docs-client:** use Button in docs nav ([36bd57e](https://github.com/instructure/instructure-ui/commit/36bd57e))
- **ui-icons:** update lti sketch file with existing integrations icon ([85a8e49](https://github.com/instructure/instructure-ui/commit/85a8e49))
- **ui-layout:** allow node to be passed to Media description ([2987cd3](https://github.com/instructure/instructure-ui/commit/2987cd3))
- **ui-overlays:** add a 'regular' size tray option ([396b9ad](https://github.com/instructure/instructure-ui/commit/396b9ad))
- **ui-tree-browser:** allow item thumbnails in TreeBrowser ([a1ec11b](https://github.com/instructure/instructure-ui/commit/a1ec11b))

<a name="5.37.0"></a>

# [5.37.0](https://github.com/instructure/instructure-ui/compare/v5.36.0...v5.37.0) (2018-12-18)

### Bug Fixes

- **ui-a11y,ui-overlays:** shift+tab shouldn't skip Popover trigger ([8838a11](https://github.com/instructure/instructure-ui/commit/8838a11))
- **ui-billboard:** fix margin + href/onClick alignment issues ([181746a](https://github.com/instructure/instructure-ui/commit/181746a))
- **ui-docs-client,ui-docs-plugin:** fix ES path in usage examples ([2bd2baa](https://github.com/instructure/instructure-ui/commit/2bd2baa))
- **ui-elements:** truncateText should handle the empty string ([ff2f69d](https://github.com/instructure/instructure-ui/commit/ff2f69d))
- **ui-elements:** update focus styles to use outline ([1b044d3](https://github.com/instructure/instructure-ui/commit/1b044d3))
- **ui-forms:** eliminate unnecessary console warnings in Select ([9d9c3de](https://github.com/instructure/instructure-ui/commit/9d9c3de))
- **ui-forms:** fix the closeOnSelect prop in Select ([2b6b5f4](https://github.com/instructure/instructure-ui/commit/2b6b5f4))
- **ui-layout:** add default max-width to View styles ([019557b](https://github.com/instructure/instructure-ui/commit/019557b))

### Features

- **ui-elements:** add layout prop to Table ([976a2f7](https://github.com/instructure/instructure-ui/commit/976a2f7))
- **ui-icons:** add 'duplicate' icon ([b79ddb5](https://github.com/instructure/instructure-ui/commit/b79ddb5))

<a name="5.36.0"></a>

# [5.36.0](https://github.com/instructure/instructure-ui/compare/v5.35.0...v5.36.0) (2018-12-12)

### Bug Fixes

- **ui-a11y:** Fix opening non kb focusable dialog from another dialog ([cf3af9a](https://github.com/instructure/instructure-ui/commit/cf3af9a))
- **ui-elements:** fix delimeter in HC mode - IE11/EDGE ([9af87dc](https://github.com/instructure/instructure-ui/commit/9af87dc))
- **ui-elements,ui-overlays:** Focus state for truncated Pill ([a5d5b1b](https://github.com/instructure/instructure-ui/commit/a5d5b1b))
- **ui-number-input:** add missing dotfiles ([372eea9](https://github.com/instructure/instructure-ui/commit/372eea9))
- **ui-overlays,ui-a11y:** fix Popover with inline content ([6ec67ad](https://github.com/instructure/instructure-ui/commit/6ec67ad))

### Features

- **ui-forms:** display dashed line around FileDrop component in default state ([9c9181d](https://github.com/instructure/instructure-ui/commit/9c9181d))
- **ui-presets,ui-test-utils:** add karma viewport plugin ([138a2f8](https://github.com/instructure/instructure-ui/commit/138a2f8))

<a name="5.35.0"></a>

# [5.35.0](https://github.com/instructure/instructure-ui/compare/v5.34.0...v5.35.0) (2018-12-06)

### Bug Fixes

- **ui-a11y:** hide iframe content from screenreaders when outside of focus region ([573ef9d](https://github.com/instructure/instructure-ui/commit/573ef9d))
- **ui-buttons,ui-elements,ui-forms:** remove aria-disabled for input components ([512fb92](https://github.com/instructure/instructure-ui/commit/512fb92))
- **ui-elements:** fix focus outline for ellipsis Links ([7365c3c](https://github.com/instructure/instructure-ui/commit/7365c3c))
- **ui-form-field:** add missing files to ui-form-field package ([ace6c0e](https://github.com/instructure/instructure-ui/commit/ace6c0e))
- **ui-forms:** fix focus outline for fixed-width TextArea ([dad6e65](https://github.com/instructure/instructure-ui/commit/dad6e65))
- **ui-forms:** focus lost with RadioInputGroup in Dialog ([73f7fb8](https://github.com/instructure/instructure-ui/commit/73f7fb8))
- **ui-forms:** include select option groups in onChange ([f45c04b](https://github.com/instructure/instructure-ui/commit/f45c04b))
- **ui-forms:** prevent disabled and readonly selects from expanding ([b9c3586](https://github.com/instructure/instructure-ui/commit/b9c3586))
- **ui-forms:** prevent select arrow icon shrinking ([e47af0b](https://github.com/instructure/instructure-ui/commit/e47af0b))
- **ui-forms:** TextArea overflow and focus ring updates ([4157ea9](https://github.com/instructure/instructure-ui/commit/4157ea9))
- **ui-layout:** margin warning shouldn't apply to flexed elements ([854f3a3](https://github.com/instructure/instructure-ui/commit/854f3a3))
- **ui-layout:** position miscalculates offset with body margin ([bb16787](https://github.com/instructure/instructure-ui/commit/bb16787))
- **ui-overlays:** simplify Modal to rely solely on open prop in place of state ([a52ceaf](https://github.com/instructure/instructure-ui/commit/a52ceaf))
- **ui-tabs,ui-utils:** allow null children in TabList ([496fceb](https://github.com/instructure/instructure-ui/commit/496fceb))
- **ui-test-utils:** handle React 16 uncaught errors ([7fd8bec](https://github.com/instructure/instructure-ui/commit/7fd8bec))
- **ui-testable:** look up the DOM node inside the timeout ([e212f64](https://github.com/instructure/instructure-ui/commit/e212f64))

### Features

- **debounce,ui-utils:** add debounce package ([862294b](https://github.com/instructure/instructure-ui/commit/862294b))
- **ui-buttons,ui-elements,ui-themes:** update link color for standard theme ([78a18fa](https://github.com/instructure/instructure-ui/commit/78a18fa)), closes [#2578](https://github.com/instructure/instructure-ui/issues/2578)
- **ui-editable,ui-elements:** In place edit ([d98d6b4](https://github.com/instructure/instructure-ui/commit/d98d6b4))
- **ui-number-input:** add controlled NumberInput ([0d71026](https://github.com/instructure/instructure-ui/commit/0d71026))
- **ui-test-utils:** add findParent, findParents utils ([1d5aeb7](https://github.com/instructure/instructure-ui/commit/1d5aeb7))
- **ui-test-utils:** add selector to query failure messages ([e77358e](https://github.com/instructure/instructure-ui/commit/e77358e))
- **ui-test-utils:** support Sizzle selectors ([65481ff](https://github.com/instructure/instructure-ui/commit/65481ff))

<a name="5.34.0"></a>

# [5.34.0](https://github.com/instructure/instructure-ui/compare/v5.33.0...v5.34.0) (2018-11-20)

### Bug Fixes

- **ui-forms:** SelectSingle capitalization ([c740561](https://github.com/instructure/instructure-ui/commit/c740561))

### Features

- **ui-elements:** copy focusable styles to link ([36e76e9](https://github.com/instructure/instructure-ui/commit/36e76e9))
- **ui-focusable:** update focus outline to 2px ([962e689](https://github.com/instructure/instructure-ui/commit/962e689))
- **ui-forms:** copy focusable styles to numberinput ([e865a02](https://github.com/instructure/instructure-ui/commit/e865a02))
- **ui-forms:** update focus styles for Select ([3d6912b](https://github.com/instructure/instructure-ui/commit/3d6912b))
- **ui-icons:** add new icons ([4a83f6b](https://github.com/instructure/instructure-ui/commit/4a83f6b))
- **ui-tree-browser:** update TreeBrowser styles ([3c8bc94](https://github.com/instructure/instructure-ui/commit/3c8bc94))
- **ui-tree-browser:** use outlined icons for TreeBrowser ([5d89c38](https://github.com/instructure/instructure-ui/commit/5d89c38))

<a name="5.33.0"></a>

# [5.33.0](https://github.com/instructure/instructure-ui/compare/v5.32.0...v5.33.0) (2018-11-14)

### Bug Fixes

- **ui-elements:** increase maxWidth of Pill ([ce94e5f](https://github.com/instructure/instructure-ui/commit/ce94e5f))
- **ui-forms:** fix aria-checked on checkbox ([42351cc](https://github.com/instructure/instructure-ui/commit/42351cc))
- **ui-layout:** FlexItems width fix ([b161d96](https://github.com/instructure/instructure-ui/commit/b161d96))
- **ui-test-utils:** locator find/findAll return component root ([5866235](https://github.com/instructure/instructure-ui/commit/5866235))
- **ui-test-utils:** update clickable requirement ([ef9d12d](https://github.com/instructure/instructure-ui/commit/ef9d12d))

### Features

- **media-capture:** Allow MediaCapture to work without a webcam ([1fd0ba7](https://github.com/instructure/instructure-ui/commit/1fd0ba7))
- **ui-forms:** update TextArea focus styles ([19ae400](https://github.com/instructure/instructure-ui/commit/19ae400))
- **ui-forms:** update TextInput focus styles ([8acc504](https://github.com/instructure/instructure-ui/commit/8acc504))
- **ui-layout:** add omitViewProps function to View ([55556a4](https://github.com/instructure/instructure-ui/commit/55556a4))
- **ui-overlays:** add test fixture for Popover, Tooltip, Position ([aea476a](https://github.com/instructure/instructure-ui/commit/aea476a))
- **ui-presets:** Use major version for x-package deps ([47b793b](https://github.com/instructure/instructure-ui/commit/47b793b))
- **ui-test-utils:** add tabbable, clickable helpers ([2fbe6c2](https://github.com/instructure/instructure-ui/commit/2fbe6c2))

### Performance Improvements

- **ui-overlays:** fix ref in Mask to work w/shallowCompare ([0a0a706](https://github.com/instructure/instructure-ui/commit/0a0a706))

<a name="5.32.0"></a>

# [5.32.0](https://github.com/instructure/instructure-ui/compare/v5.31.0...v5.32.0) (2018-10-31)

### Bug Fixes

- **ui-i18n:** fix moment-timezone double import ([b2662a0](https://github.com/instructure/instructure-ui/commit/b2662a0))
- **ui-test-utils:** fix event firing ([3852beb](https://github.com/instructure/instructure-ui/commit/3852beb))

### Features

- **ui-buttons:** update tests to run on React 16 ([8c3b7c8](https://github.com/instructure/instructure-ui/commit/8c3b7c8))
- **ui-forms:** allow SingleSelect to accept arbitrary typed input ([8e324c8](https://github.com/instructure/instructure-ui/commit/8e324c8))
- **ui-icons:** add filter icon to iconography ([5f8162e](https://github.com/instructure/instructure-ui/commit/5f8162e))
- **ui-navigation:** update tests to run on React 16 ([9ea84f2](https://github.com/instructure/instructure-ui/commit/9ea84f2))

### Performance Improvements

- **ui-overlays:** improve perf of <Modal> ([dc1085f](https://github.com/instructure/instructure-ui/commit/dc1085f))
- **ui-overlays:** improve perf of <Tray> ([7b4e622](https://github.com/instructure/instructure-ui/commit/7b4e622))
- **ui-themeable:** avoid a forEach loop when possible ([3273839](https://github.com/instructure/instructure-ui/commit/3273839))
- **ui-utils:** simplify getClassList since all browsers we support have classList API ([d388c04](https://github.com/instructure/instructure-ui/commit/d388c04))

<a name="5.31.0"></a>

# [5.31.0](https://github.com/instructure/instructure-ui/compare/v5.30.0...v5.31.0) (2018-10-26)

### Bug Fixes

- **media-capture:** esc key propagation for device inputs ([ea04778](https://github.com/instructure/instructure-ui/commit/ea04778))
- **ui-a11y:** fix focus trapping for Dialog ([945b74c](https://github.com/instructure/instructure-ui/commit/945b74c))
- **ui-elements:** Link role, type, tabIndex ([f42ab3b](https://github.com/instructure/instructure-ui/commit/f42ab3b))
- **ui-focusable:** fix display property ([08a0bd5](https://github.com/instructure/instructure-ui/commit/08a0bd5))
- **ui-forms:** DateInput should reset given an empty value ([b2130f8](https://github.com/instructure/instructure-ui/commit/b2130f8))
- **ui-forms:** fix autogrow + resize interaction ([b65fdcd](https://github.com/instructure/instructure-ui/commit/b65fdcd))
- **ui-layout,ui-overlays,ui-portal:** prevent error when Portal DOM node is not defined ([ad29d11](https://github.com/instructure/instructure-ui/commit/ad29d11))
- **ui-presets:** fix publish-packages script ([1cca5af](https://github.com/instructure/instructure-ui/commit/1cca5af))
- **ui-test-utils:** .focus helper should programmatically focus ([36abbd6](https://github.com/instructure/instructure-ui/commit/36abbd6))
- **ui-test-utils:** add tests for components that render null ([e684860](https://github.com/instructure/instructure-ui/commit/e684860))
- **ui-test-utils:** filter in query instead of after ([50ae1c5](https://github.com/instructure/instructure-ui/commit/50ae1c5))
- **ui-test-utils:** fix setContext method ([6834f87](https://github.com/instructure/instructure-ui/commit/6834f87))
- **ui-test-utils,ui-testbed:** queries should work with SVG elements ([a25f720](https://github.com/instructure/instructure-ui/commit/a25f720))

### Features

- **ui-billboard:** update tests to run on React 16 ([a9b7912](https://github.com/instructure/instructure-ui/commit/a9b7912))
- **ui-breadcrumb:** update tests to run on React 16 ([02e9900](https://github.com/instructure/instructure-ui/commit/02e9900))
- **ui-layout,View:** add light option to background prop ([764a372](https://github.com/instructure/instructure-ui/commit/764a372))
- **ui-presets:** add warning for non-async tests ([00033a3](https://github.com/instructure/instructure-ui/commit/00033a3))
- **ui-presets:** upgrade eslint ([a1dcf1f](https://github.com/instructure/instructure-ui/commit/a1dcf1f))
- **ui-svg-images:** update tests to run on React 16 ([0f4e40a](https://github.com/instructure/instructure-ui/commit/0f4e40a))
- **ui-test-utils:** add spy on Event.preventDefault, focusable selector ([1e68a42](https://github.com/instructure/instructure-ui/commit/1e68a42))

### Reverts

- WIP(\*): adding Accessibility documentation to the docs ([f082fa4](https://github.com/instructure/instructure-ui/commit/f082fa4))

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

- **generate-examples:** add npmignore ([80e54cb](https://github.com/instructure/instructure-ui/commit/80e54cb))
- **ui-elements,ui-utils:** prevent TruncateText from rendering hidden text ([b489a32](https://github.com/instructure/instructure-ui/commit/b489a32))
- **ui-portal,ui-test-utils:** fix empty selectors for testable.findAll ([1ced426](https://github.com/instructure/instructure-ui/commit/1ced426))
- **ui-test-utils:** clear themeable stylesheet between tests ([215f075](https://github.com/instructure/instructure-ui/commit/215f075))
- **ui-test-utils:** expectEmpty should work with testable.findAll ([3cf77f9](https://github.com/instructure/instructure-ui/commit/3cf77f9))
- **ui-test-utils:** fix findAll by label ([bbb3a8b](https://github.com/instructure/instructure-ui/commit/bbb3a8b))
- **ui-test-utils:** fix query by attribute ([b6ba1ad](https://github.com/instructure/instructure-ui/commit/b6ba1ad))
- **ui-test-utils:** fix query by text/contents ([5f1cf80](https://github.com/instructure/instructure-ui/commit/5f1cf80))
- **ui-test-utils:** fix testable component matches ([255fef7](https://github.com/instructure/instructure-ui/commit/255fef7))

### Features

- **ui-breadcrumb:** add icon support ([aab8e8c](https://github.com/instructure/instructure-ui/commit/aab8e8c))
- **ui-test-utils:** Add a ui-test-utils package ([1e9f4ec](https://github.com/instructure/instructure-ui/commit/1e9f4ec))
- **ui-test-utils:** add helpers to get tag, computedStyle ([b456764](https://github.com/instructure/instructure-ui/commit/b456764))

<a name="5.28.1"></a>

## [5.28.1](https://github.com/instructure/instructure-ui/compare/v5.28.0...v5.28.1) (2018-09-18)

### Bug Fixes

- **ui-breadcrumb:** vertical alignment ([699416a](https://github.com/instructure/instructure-ui/commit/699416a))
- **ui-forms:** fix asyncronous Select option highlighting ([5638ccb](https://github.com/instructure/instructure-ui/commit/5638ccb))
- **ui-forms:** Fix time input in DateTimeInput ([372d8ff](https://github.com/instructure/instructure-ui/commit/372d8ff))

<a name="5.28.0"></a>

# [5.28.0](https://github.com/instructure/instructure-ui/compare/v5.27.0...v5.28.0) (2018-09-13)

### Bug Fixes

- **ui-elements:** escape HTML strings used in TruncateText measurements ([3c7d7a7](https://github.com/instructure/instructure-ui/commit/3c7d7a7))
- **ui-forms:** Render selected option when not exist in options ([c821efa](https://github.com/instructure/instructure-ui/commit/c821efa))
- **ui-forms:** Update DateTimeInput when changing locale or timezone ([524307d](https://github.com/instructure/instructure-ui/commit/524307d))

### Features

- **ui-overlays:** add constrain to Modal ([3392939](https://github.com/instructure/instructure-ui/commit/3392939))
- **ui-tree-browser:** add selection styling to TreeBrowser ([4643c66](https://github.com/instructure/instructure-ui/commit/4643c66))

<a name="5.27.0"></a>

# [5.27.0](https://github.com/instructure/instructure-ui/compare/v5.26.0...v5.27.0) (2018-09-10)

### Bug Fixes

- **pkg-utils:** downgrade lerna to fix the release script ([7bfc540](https://github.com/instructure/instructure-ui/commit/7bfc540))
- **ui-buttons:** no role="button" for buttons ([be78aac](https://github.com/instructure/instructure-ui/commit/be78aac))

### Features

- **docs-examples,generate-examples:** autogenerate component examples ([b50fae5](https://github.com/instructure/instructure-ui/commit/b50fae5))

<a name="5.26.0"></a>

# [5.26.0](https://github.com/instructure/instructure-ui/compare/v5.25.0...v5.26.0) (2018-09-06)

### Bug Fixes

- **ui-a11y:** evaluate functional liveRegion prop in ScreenReaderFocusRegion ([3425bf7](https://github.com/instructure/instructure-ui/commit/3425bf7))
- **ui-a11y:** remove aria-hidden before node is removed ([112f9ba](https://github.com/instructure/instructure-ui/commit/112f9ba))
- **ui-forms:** invalid aria attributes when closed ([410f1a9](https://github.com/instructure/instructure-ui/commit/410f1a9))
- **ui-forms:** Update input when selected options updated ([128e3dd](https://github.com/instructure/instructure-ui/commit/128e3dd))
- **ui-layout:** improve vertical margin warning on View ([9c4fb19](https://github.com/instructure/instructure-ui/commit/9c4fb19))
- **ui-menu,ui-overlays:** Remove aria-expanded from Menu ([2ea110d](https://github.com/instructure/instructure-ui/commit/2ea110d))
- **ui-presets:** don't write incorrect npmrc files ([0528899](https://github.com/instructure/instructure-ui/commit/0528899))
- **ui-presets:** pass args to karma ([5cbeb21](https://github.com/instructure/instructure-ui/commit/5cbeb21))

### Features

- **ui-axe-check:** Add axe-core wrapper utility ([3264318](https://github.com/instructure/instructure-ui/commit/3264318))
- **ui-docs-client:** add figure/guideline for do/don't section ([b253910](https://github.com/instructure/instructure-ui/commit/b253910))
- **ui-menu,ui-overlays:** add constrain prop to tooltip and menu ([98797aa](https://github.com/instructure/instructure-ui/commit/98797aa))
- **ui-presets:** Add --no-headless flag for karma ([be4b0c0](https://github.com/instructure/instructure-ui/commit/be4b0c0))

<a name="5.25.0"></a>

# [5.25.0](https://github.com/instructure/instructure-ui/compare/v5.24.0...v5.25.0) (2018-08-24)

### Bug Fixes

- **ui-breadcrumb:** Implement WebAIM recommendations ([4e3ec0e](https://github.com/instructure/instructure-ui/commit/4e3ec0e))
- **ui-buttons,ui-elements:** Fix Safari focus issue ([7825b13](https://github.com/instructure/instructure-ui/commit/7825b13))
- **ui-forms:** do not clear input when receiving new options ([e4ca8ca](https://github.com/instructure/instructure-ui/commit/e4ca8ca))
- **ui-forms:** fix select expand/collapse click events ([3d3bcc1](https://github.com/instructure/instructure-ui/commit/3d3bcc1))
- **ui-forms:** RangeInput needs min-width ([d1118d1](https://github.com/instructure/instructure-ui/commit/d1118d1))
- **ui-forms,ui-layout:** add constrain prop to select ([25bfc2e](https://github.com/instructure/instructure-ui/commit/25bfc2e))
- **ui-layout:** account for stretch positioning in constrain logic ([d21ac1c](https://github.com/instructure/instructure-ui/commit/d21ac1c))

### Features

- **ui-pagination:** Add tooltips to Pagination ([0df511b](https://github.com/instructure/instructure-ui/commit/0df511b))

### Performance Improvements

- **babel-plugin-themeable-styles,ui-themeable:** more small perf improvements ([cf51ab9](https://github.com/instructure/instructure-ui/commit/cf51ab9))

<a name="5.24.0"></a>

# [5.24.0](https://github.com/instructure/instructure-ui/compare/v5.23.0...v5.24.0) (2018-08-08)

### Bug Fixes

- **ui-docs-client,ui-themeable:** always apply theme when component updates ([a9f7d74](https://github.com/instructure/instructure-ui/commit/a9f7d74))
- **ui-elements:** add aria attributes to Rating ([9b859ba](https://github.com/instructure/instructure-ui/commit/9b859ba))
- **ui-elements:** remove relative import ([d0a184e](https://github.com/instructure/instructure-ui/commit/d0a184e))
- **ui-forms:** clear out DateInput when passed an empty value ([0b8bbcb](https://github.com/instructure/instructure-ui/commit/0b8bbcb))
- **ui-layout:** Make Flex ignore null children ([c49ec3d](https://github.com/instructure/instructure-ui/commit/c49ec3d))
- **ui-presets:** trim command results ([eeb62c0](https://github.com/instructure/instructure-ui/commit/eeb62c0))
- **ui-themeable,ui-themes,ui-utils:** remove immutable variable ([5b6178e](https://github.com/instructure/instructure-ui/commit/5b6178e))

### Features

- **ui-buttons:** add cursor prop to Button ([b47fbb5](https://github.com/instructure/instructure-ui/commit/b47fbb5))
- **ui-elements:** add warning and message variants to pill ([7665242](https://github.com/instructure/instructure-ui/commit/7665242))

### Performance Improvements

- get babel helpers from 'babel-runtime' instead of inlining them ([1472658](https://github.com/instructure/instructure-ui/commit/1472658))
- **ui-presets:** add babel constant elements transform ([a62f424](https://github.com/instructure/instructure-ui/commit/a62f424))

<a name="5.23.0"></a>

# [5.23.0](https://github.com/instructure/instructure-ui/compare/v5.22.0...v5.23.0) (2018-08-03)

### Bug Fixes

- **docs-app:** fix codepens ([4c755f5](https://github.com/instructure/instructure-ui/commit/4c755f5))
- **ui-buttons,ui-elements:** Fix event target ([8e29910](https://github.com/instructure/instructure-ui/commit/8e29910))
- **ui-presets:** fix bump script ([14e6668](https://github.com/instructure/instructure-ui/commit/14e6668))

### Features

- **ui-elements:** handle Pill overflow with Tooltip ([64d75d1](https://github.com/instructure/instructure-ui/commit/64d75d1))
- **ui-media-player:** Add SourceChooser to VideoPlayerControls ([44fdb71](https://github.com/instructure/instructure-ui/commit/44fdb71))
- **ui-presets:** add an install-react script ([d4e87fe](https://github.com/instructure/instructure-ui/commit/d4e87fe))
- **ui-presets:** Allow files passed to ui-test --lint ([47c1e5c](https://github.com/instructure/instructure-ui/commit/47c1e5c))
- **ui-presets:** better cross platform support for scripts ([9343a7e](https://github.com/instructure/instructure-ui/commit/9343a7e))
- **ui-presets:** run tests with react 15 and 16 ([148fe88](https://github.com/instructure/instructure-ui/commit/148fe88))
- **ui-tree-browser:** improve aria support ([bad6cc9](https://github.com/instructure/instructure-ui/commit/bad6cc9))

### Performance Improvements

- **ui-buttons,ui-tabs:** a couple more small perf improvements ([2b00c1b](https://github.com/instructure/instructure-ui/commit/2b00c1b))

<a name="5.22.0"></a>

# [5.22.0](https://github.com/instructure/instructure-ui/compare/v5.21.0...v5.22.0) (2018-07-27)

### Bug Fixes

- move React/ReactDOM back to peerDependencies ([99e9458](https://github.com/instructure/instructure-ui/commit/99e9458))
- **docs:** add id to README ([d3a43d4](https://github.com/instructure/instructure-ui/commit/d3a43d4))
- **ui-elements:** prevent invalid props error for Text ([1452a12](https://github.com/instructure/instructure-ui/commit/1452a12))
- **ui-themeable,ui-themes:** fix theme.use({ accessible: true }) ([fe07a3a](https://github.com/instructure/instructure-ui/commit/fe07a3a))

### Features

- **ui-presets:** Separate out node test from karma ([01aea24](https://github.com/instructure/instructure-ui/commit/01aea24))

### Performance Improvements

- **ui-buttons:** speed up <Button>s ([54d7c71](https://github.com/instructure/instructure-ui/commit/54d7c71))
- **ui-elements:** speed up <Text> ([6fff58b](https://github.com/instructure/instructure-ui/commit/6fff58b))
- **ui-forms:** don't even render options <ul> when not open ([e3fa113](https://github.com/instructure/instructure-ui/commit/e3fa113))
- **ui-i18n:** cache the default "dir" lookup ([ac746a8](https://github.com/instructure/instructure-ui/commit/ac746a8))
- **ui-layout:** avoid View::verifySpanMargin check in prod ([b0c2691](https://github.com/instructure/instructure-ui/commit/b0c2691))
- **ui-utils:** a faster uid() ([d0fc68e](https://github.com/instructure/instructure-ui/commit/d0fc68e))
- **ui-utils:** speed up pickProps and omitProps ([e286ef6](https://github.com/instructure/instructure-ui/commit/e286ef6))

<a name="5.21.0"></a>

# [5.21.0](https://github.com/instructure/instructure-ui/compare/v5.20.1...v5.21.0) (2018-07-25)

### Bug Fixes

- add React,React-DOM 16 to dependencies ([d49430f](https://github.com/instructure/instructure-ui/commit/d49430f))
- fix typo in \`build:examples\` script ([e0f9772](https://github.com/instructure/instructure-ui/commit/e0f9772))
- **ui-a11y:** remove role presentation on PresentationContent ([0c777a0](https://github.com/instructure/instructure-ui/commit/0c777a0))
- **ui-buttons:** prevent error on null child in Button component ([5681198](https://github.com/instructure/instructure-ui/commit/5681198))
- **ui-docs-plugin:** fix docs build w/ docker ([565147e](https://github.com/instructure/instructure-ui/commit/565147e))
- **ui-elements,ui-focusable,ui-navigation:** docs app fixes ([fe4f121](https://github.com/instructure/instructure-ui/commit/fe4f121))
- **ui-forms:** prevent scroll jumping with long textareas ([61d7a2e](https://github.com/instructure/instructure-ui/commit/61d7a2e))
- **ui-layout:** fix position constrain logic ([656d7c1](https://github.com/instructure/instructure-ui/commit/656d7c1))
- **ui-motion:** apply aria-hidden to transition content when transitioned out ([ca818c1](https://github.com/instructure/instructure-ui/commit/ca818c1))

### Features

- **ui-alerts,ui-icons:** update/add icons, update icons within alerts ([da0c3f6](https://github.com/instructure/instructure-ui/commit/da0c3f6))
- **ui-elements,ui-themes:** add link decoration brand variable to canvas theme ([e88ca27](https://github.com/instructure/instructure-ui/commit/e88ca27))
- **ui-overlays:** make label prop required for overlay ([3fdd14c](https://github.com/instructure/instructure-ui/commit/3fdd14c))

### Performance Improvements

- **ui-buttons:** avoid work just to show a warning in production ([0f2cbe9](https://github.com/instructure/instructure-ui/commit/0f2cbe9))
- **ui-themeable:** avoid doing work per-instance ([9b2a84c](https://github.com/instructure/instructure-ui/commit/9b2a84c))
- **ui-themeable:** only run the code that adds "dir" to <html> once ([954ab88](https://github.com/instructure/instructure-ui/commit/954ab88))
- **ui-utils:** use a constant array in omitProps to avoid garbage ([6b5d868](https://github.com/instructure/instructure-ui/commit/6b5d868))

<a name="5.20.1"></a>

## [5.20.1](https://github.com/instructure/instructure-ui/compare/v5.20.0...v5.20.1) (2018-07-18)

### Bug Fixes

- **ui-presets:** more release script updates ([387808c](https://github.com/instructure/instructure-ui/commit/387808c))
- **ui-utils:** fix recent change of `DeprecatedComponent` ([c7dd5d7](https://github.com/instructure/instructure-ui/commit/c7dd5d7))
- **ui-utils,ui-themeable:** fix bug applying high-contrast theme ([f42b126](https://github.com/instructure/instructure-ui/commit/f42b126))

<a name="5.20.0"></a>

# [5.20.0](https://github.com/instructure/instructure-ui/compare/v5.19.0...v5.20.0) (2018-07-17)

### Bug Fixes

- **docker,ui-presets:** fix a few bugs with the post-publish script ([c75f5cc](https://github.com/instructure/instructure-ui/commit/c75f5cc))
- **ui-a11y:** resolve issues with multiple focus regions in FF and Safari ([a6cc584](https://github.com/instructure/instructure-ui/commit/a6cc584))
- **ui-elements:** Improve circle Progress for SRs ([76c6ecb](https://github.com/instructure/instructure-ui/commit/76c6ecb))

### Features

- **ui-elements:** add constrain prop to Img ([d2911a2](https://github.com/instructure/instructure-ui/commit/d2911a2))
- **ui-presets:** Include changelogs in rc packages ([edd1873](https://github.com/instructure/instructure-ui/commit/edd1873))

<a name="5.19.0"></a>

# [5.19.0](https://github.com/instructure/instructure-ui/compare/v5.18.0...v5.19.0) (2018-07-12)

### Bug Fixes

- **babel-plugin-themeable-styles,ui-presets:** add hashPrefix to CSS classes ([3e0d269](https://github.com/instructure/instructure-ui/commit/3e0d269))
- **docs,ui-docs-client:** make menu closed by default ([2f5b14f](https://github.com/instructure/instructure-ui/commit/2f5b14f))
- **ui-a11y:** dismiss FocusRegion even when source event's default is prevented ([babd1fc](https://github.com/instructure/instructure-ui/commit/babd1fc))
- **ui-forms:** stop JAWS always reading the first option ([b41bd4f](https://github.com/instructure/instructure-ui/commit/b41bd4f))
- **ui-presets:** quiet down some noisy output ([09c2789](https://github.com/instructure/instructure-ui/commit/09c2789))
- **ui-presets:** remove no-verify for bump commit ([b7a6be1](https://github.com/instructure/instructure-ui/commit/b7a6be1))

### Features

- **ui-a11y,ui-focusable:** add Focusable component ([555bb30](https://github.com/instructure/instructure-ui/commit/555bb30))
- **ui-icons-build,ui-icons:** add es modules version of ui-icons ([b6b8de5](https://github.com/instructure/instructure-ui/commit/b6b8de5))
- **ui-media-player:** Add Volume to VideoPlayerControls ([762242e](https://github.com/instructure/instructure-ui/commit/762242e))

### Performance Improvements

- **ui-forms,ui-utils:** use 'fast-deep-equal' instead of 'deep-equal' ([7732ff3](https://github.com/instructure/instructure-ui/commit/7732ff3))
- **ui-themeable:** some things to make themeable faster ([fc0a269](https://github.com/instructure/instructure-ui/commit/fc0a269))
- **ui-utils:** improve perf of `DeprecatedComponent` in prod ([66888e5](https://github.com/instructure/instructure-ui/commit/66888e5))

<a name="5.18.0"></a>

# [5.18.0](https://github.com/instructure/instructure-ui/compare/v5.17.0...v5.18.0) (2018-07-09)

### Bug Fixes

- **ui-presets:** add git user and email ([f210506](https://github.com/instructure/instructure-ui/commit/f210506))

### Features

- **ui-presets:** move .env variables into package.json for ui-scripts ([5e97982](https://github.com/instructure/instructure-ui/commit/5e97982))

<a name="5.17.0"></a>

# [5.17.0](https://github.com/instructure/instructure-ui/compare/v5.16.0...v5.17.0) (2018-07-06)

### Features

- **ui-icons:** add calculator icon ([df2f9ce](https://github.com/instructure/instructure-ui/commit/df2f9ce))

<a name="5.16.0"></a>

# [5.16.0](https://github.com/instructure/instructure-ui/compare/v5.15.0...v5.16.0) (2018-07-06)

### Bug Fixes

- **ui-layout,ui-motion,ui-overlays:** theme prop should work w/ Portal ([2c20181](https://github.com/instructure/instructure-ui/commit/2c20181))
- **ui-pagination:** fix perf for lots of pages ([40e18e9](https://github.com/instructure/instructure-ui/commit/40e18e9))

### Features

- **ui-code-editor:** add bash language type to code editor ([5fba1f9](https://github.com/instructure/instructure-ui/commit/5fba1f9))
- **ui-icons:** add check-mark-indeterminate icon ([886e700](https://github.com/instructure/instructure-ui/commit/886e700))
- **ui-icons:** add quiz-title and quiz-instructions icon ([6cf0691](https://github.com/instructure/instructure-ui/commit/6cf0691))

<a name="5.15.0"></a>

# [5.15.0](https://github.com/instructure/instructure-ui/compare/v5.14.0...v5.15.0) (2018-06-28)

### Bug Fixes

- **ui-a11y,ui-overlays:** Improve KO navigation for Popover ([8d547ce](https://github.com/instructure/instructure-ui/commit/8d547ce))
- **ui-presets:** don't PSA for release candidates ([7cf8648](https://github.com/instructure/instructure-ui/commit/7cf8648))

### Features

- **ui-forms:** add screenreader announcements to Select ([0ccfc36](https://github.com/instructure/instructure-ui/commit/0ccfc36))

<a name="5.14.0"></a>

# [5.14.0](https://github.com/instructure/instructure-ui/compare/v5.13.1...v5.14.0) (2018-06-28)

### Bug Fixes

- **cz-lerna-changelog:** ensure changeID is the last element of commit msg ([fe64e52](https://github.com/instructure/instructure-ui/commit/fe64e52))
- **ui-forms:** [NumberInput](#NumberInput) don't strip trailing zeros ([9ddfeb8](https://github.com/instructure/instructure-ui/commit/9ddfeb8))
- **ui-a11y:** use unique ids for [FocusRegion](#FocusRegion), [Dialog](#Dialog) ([f4fccb9](https://github.com/instructure/instructure-ui/commit/f4fccb9))
- **ui-presets:** fix post publish script ([693a7a4](https://github.com/instructure/instructure-ui/commit/693a7a4))
- **ui-pagination:** make default ArrowIcon for [Pagination](#Pagination) small ([e8d5a95](https://github.com/instructure/instructure-ui/commit/e8d5a95))

### Features

- **ui-forms:** add indeterminate state to [Checkbox](#Checkbox) ([8752390](https://github.com/instructure/instructure-ui/commit/8752390))
- **ui-svg-images:** add color property to [InlineSVG](#InlineSVG) ([596b9c6](https://github.com/instructure/instructure-ui/commit/596b9c6))

<a name="5.13.1"></a>

## [5.13.1](https://github.com/instructure/instructure-ui/compare/v5.13.0...v5.13.1) (2018-06-22)

### Bug Fixes

- **ui-a11y:** absolutely position offscreen content at top ([f0d6305](https://github.com/instructure/instructure-ui/commit/f0d6305))
- **ui-a11y:** dialog should return focus on blur ([f7eb47e](https://github.com/instructure/instructure-ui/commit/f7eb47e))
- **ui-forms:** accept zero for decimal places in [NumberInput](#NumberInput) ([d4cdd6b](https://github.com/instructure/instructure-ui/commit/d4cdd6b))
- **ui-forms:** don't use window.event in [NumberInput](#NumberInput) ([943a0c9](https://github.com/instructure/instructure-ui/commit/943a0c9))
- **ui-forms:** handle min={0} and max={0} props in [NumberInput](#NumberInput) ([5b09754](https://github.com/instructure/instructure-ui/commit/5b09754))
- **ui-forms:** [NumberInput](#NumberInput) onChange w/ updated precision ([fa33d06](https://github.com/instructure/instructure-ui/commit/fa33d06))
- **ui-forms:** fix inline input and label alignment in [Select](#Select) ([a696dcc](https://github.com/instructure/instructure-ui/commit/a696dcc))
- **ui-forms:** [Select](#Select) should return focus to input on close ([0baa76f](https://github.com/instructure/instructure-ui/commit/0baa76f))
- **ui-layout:** [Position](#Position), absolutely position offscreen content ([8c85b25](https://github.com/instructure/instructure-ui/commit/8c85b25))

<a name="5.13.0"></a>

# [5.13.0](https://github.com/instructure/instructure-ui/compare/v5.12.0...v5.13.0) (2018-06-16)

### Bug Fixes

- **cz-lerna-changelog:** pass in config for footer prefix ([9822f1f](https://github.com/instructure/instructure-ui/commit/9822f1f))
- **karma:** Improve plugin support inside monorepos ([94d0d2a](https://github.com/instructure/instructure-ui/commit/94d0d2a))
- **NumberInput:** fix controlled component ([1ec816a](https://github.com/instructure/instructure-ui/commit/1ec816a))
- **Tag:** pass down elementRef ([ccb7a11](https://github.com/instructure/instructure-ui/commit/ccb7a11))
- **ui-forms:** fix aria-selected values on Select options ([d84098a](https://github.com/instructure/instructure-ui/commit/d84098a))
- **ui-forms:** Select input shouldn't be wrapped w/label ([4c6e6c1](https://github.com/instructure/instructure-ui/commit/4c6e6c1))
- **ui-forms,RangeInput:** focus styles for Edge 16 up ([bbdf9e6](https://github.com/instructure/instructure-ui/commit/bbdf9e6))
- **ui-i18n:** Fix leading zero decimal parsing ([3224dc8](https://github.com/instructure/instructure-ui/commit/3224dc8))
- **ui-layout:** Make body scrollTop attribute consistent for positioning ([55e5ed2](https://github.com/instructure/instructure-ui/commit/55e5ed2))
- **ui-presets:** catch error w/ no issues ([0443262](https://github.com/instructure/instructure-ui/commit/0443262))
- **ui-presets:** include version in slack message ([c762e86](https://github.com/instructure/instructure-ui/commit/c762e86))
- **ui-presets:** only run deploy after a stable release ([387501c](https://github.com/instructure/instructure-ui/commit/387501c))
- **ui-presets:** release script changes for Jenkins ([511ddb3](https://github.com/instructure/instructure-ui/commit/511ddb3))

### Features

- **cz-lerna-changelog,ui-presets:** add lerna changelog package ([f7592eb](https://github.com/instructure/instructure-ui/commit/f7592eb))
- **ui-buttons,Button:** Add circle-default variant ([addb97c](https://github.com/instructure/instructure-ui/commit/addb97c))
- **ui-elements,Link:** Add icon prop to Link ([8953edb](https://github.com/instructure/instructure-ui/commit/8953edb))
- **ui-media-player:** Add FullScreenButton to ([2ba3722](https://github.com/instructure/instructure-ui/commit/2ba3722))

<a name="5.12.0"></a>

# [5.12.0](https://github.com/instructure/instructure-ui/compare/v5.11.0...v5.12.0) (2018-06-11)

### Bug Fixes

- **ui-i18n,Decimal:** fix toLocaleString ([b32e06c](https://github.com/instructure/instructure-ui/commit/b32e06c))
- **ui-elements:** Fix lineHeight default in TruncateText ([cbbf35f](https://github.com/instructure/instructure-ui/commit/cbbf35f))
- **ui-forms,Select:** Change selected option when Select children update ([5dc9391](https://github.com/instructure/instructure-ui/commit/5dc9391))
- **ui-presets:** Always pass an npm tag to publish ([da06936](https://github.com/instructure/instructure-ui/commit/da06936))
- **ui-presets:** Remove meta data from pre-release versions ([ecc8d1c](https://github.com/instructure/instructure-ui/commit/ecc8d1c))
- **ui-tabs:** add min-width so long string doesn't break layout ([a0a9981](https://github.com/instructure/instructure-ui/commit/a0a9981))

### Features

- **ui-buttons,Button:** Add icon prop ([3e63ef7](https://github.com/instructure/instructure-ui/commit/3e63ef7))
- **ui-buttons,Button:** Responsive button docs ([4f52006](https://github.com/instructure/instructure-ui/commit/4f52006))
- **ui-presets:** Add ui-scripts for release and publish ([1e7409f](https://github.com/instructure/instructure-ui/commit/1e7409f))

<a name="5.11.0"></a>

# [5.11.0](https://github.com/instructure/instructure-ui/compare/v5.10.0...v5.11.0) (2018-06-06)

### Bug Fixes

- **docs:** Add Object.values polyfill to fix IE11 ([af17ebd](https://github.com/instructure/instructure-ui/commit/af17ebd))
- **inputs:** remove negative z-index from radio and checkbox inputs ([b49249b](https://github.com/instructure/instructure-ui/commit/b49249b))
- **Locale:** use documentElement.lang prior to window.navigator for defaults ([2ea6603](https://github.com/instructure/instructure-ui/commit/2ea6603))
- **ui-core,codemod:** add import from ui-core to ui-alerts for Alert ([6e524f5](https://github.com/instructure/instructure-ui/commit/6e524f5))
- **ui-docs-client:** Update usage examples for commonjs imports ([b8ef639](https://github.com/instructure/instructure-ui/commit/b8ef639))
- **ui-forms:** Fix selected option matching in SelectSingle ([193da1f](https://github.com/instructure/instructure-ui/commit/193da1f))
- **ui-pagination:** Change focus only when necessary ([fc5642f](https://github.com/instructure/instructure-ui/commit/fc5642f))
- **ui-utils:** fix console.warn.apply(undefined) ([e7dc6ad](https://github.com/instructure/instructure-ui/commit/e7dc6ad))

### Features

- **config-loader:** Add a config-loader package ([832ff12](https://github.com/instructure/instructure-ui/commit/832ff12))
- **release:** Add a post-release script to update Jira ([eb3642d](https://github.com/instructure/instructure-ui/commit/eb3642d))
- **ui-elements,Badge:** RTL support start center/end center placement ([175f25c](https://github.com/instructure/instructure-ui/commit/175f25c))
- **ui-elements,Progress:** RTL support for ProgressBar with visible val ([5756a8e](https://github.com/instructure/instructure-ui/commit/5756a8e))
- **ui-elements,Tag:** RTL support for the inline variant ([953f870](https://github.com/instructure/instructure-ui/commit/953f870))
- **ui-forms:** Rtl support for Checkbox toggle variant ([1de3e0a](https://github.com/instructure/instructure-ui/commit/1de3e0a))
- **ui-forms:** Rtl support for select ([f0732d4](https://github.com/instructure/instructure-ui/commit/f0732d4))
- **ui-forms,RangeInput:** ensure the min max values switch when "rtl" ([5bdc70a](https://github.com/instructure/instructure-ui/commit/5bdc70a))
- **ui-i18n,docs:** ApplyTextDirection child func/position docs ([248c7e6](https://github.com/instructure/instructure-ui/commit/248c7e6))
- **ui-layout:** Rtl support for DrawerLayout ([fdeee39](https://github.com/instructure/instructure-ui/commit/fdeee39))
- **ui-layout,Media:** RTL support for Media ([1b8790a](https://github.com/instructure/instructure-ui/commit/1b8790a))
- **ui-media-player:** Adopt Legacy Context API ([7416dd4](https://github.com/instructure/instructure-ui/commit/7416dd4))
- **ui-media-player,media-capture:** Rtl support for VideoPlayer ([bbe0f60](https://github.com/instructure/instructure-ui/commit/bbe0f60))
- **ui-navigation,Navigation:** RTL support for nav toggle action ([dca378d](https://github.com/instructure/instructure-ui/commit/dca378d))
- **ui-overlays:** Mirror Popover placement for rtl ([046ec0c](https://github.com/instructure/instructure-ui/commit/046ec0c))
- **ui-presets:** Add stylelint rules for bidrectional text support ([b58ea17](https://github.com/instructure/instructure-ui/commit/b58ea17))
- **ui-toggle-details:** ToggleGroup component ([d828826](https://github.com/instructure/instructure-ui/commit/d828826))

<a name="5.10.0"></a>

# [5.10.0](https://github.com/instructure/instructure-ui/compare/v5.9.0...v5.10.0) (2018-05-23)

### Bug Fixes

- **docs:** Fix codepens ([0e70c81](https://github.com/instructure/instructure-ui/commit/0e70c81))
- **eslint-plugin-instructure-ui:** Add publishConfig ([ac4640c](https://github.com/instructure/instructure-ui/commit/ac4640c))
- **NumberInput:** formatValueOnRender prop ([e734b8a](https://github.com/instructure/instructure-ui/commit/e734b8a))
- **scripts:** Fix generate:component script ([24f5e21](https://github.com/instructure/instructure-ui/commit/24f5e21))

### Features

- **scripts:** Update generate:component template to reflect new pattern ([69a10ce](https://github.com/instructure/instructure-ui/commit/69a10ce))
- **ui-forms,RadioInputGroup:** let toggle support inline layout ([ca611da](https://github.com/instructure/instructure-ui/commit/ca611da))
- **ui-i18n:** ApplyDirection and bidirectional components ([06f052b](https://github.com/instructure/instructure-ui/commit/06f052b))

<a name="5.9.0"></a>

# [5.9.0](https://github.com/instructure/instructure-ui/compare/v5.8.1...v5.9.0) (2018-05-21)

### Bug Fixes

- **build:** Add scripts, cname, and update env vars ([576a6ca](https://github.com/instructure/instructure-ui/commit/576a6ca))
- **Decimal:** allow in progress negative numbers ([fab4a48](https://github.com/instructure/instructure-ui/commit/fab4a48))
- **docs:** Fix broken component examples in ie11 ([ea091ab](https://github.com/instructure/instructure-ui/commit/ea091ab))
- **scripts:** fix bump script ([64f1eef](https://github.com/instructure/instructure-ui/commit/64f1eef))
- **ui-a11y:** focus manager does not steal focus on document click ([0d59b0b](https://github.com/instructure/instructure-ui/commit/0d59b0b))
- **ui-a11y:** IE11 compatibility fix ([1a03ff1](https://github.com/instructure/instructure-ui/commit/1a03ff1))
- **ui-alerts,Alert:** remove flex rule on contents ([240ba81](https://github.com/instructure/instructure-ui/commit/240ba81))
- **ui-pagination,Pagination:** Manage focus ([b0a3364](https://github.com/instructure/instructure-ui/commit/b0a3364))

### Features

- **ui-alerts,Alert:** make aria-live configurable ([8689784](https://github.com/instructure/instructure-ui/commit/8689784))
- **ui-code-editor:** support yaml/yml formats ([2ffc130](https://github.com/instructure/instructure-ui/commit/2ffc130))
- **ui-docs-client:** prop to showMenu by default ([7fb0fd5](https://github.com/instructure/instructure-ui/commit/7fb0fd5))
- **ui-elements,List:** add line delimiters for vertical lists ([9cba13d](https://github.com/instructure/instructure-ui/commit/9cba13d))
- **ui-elements,ListItem:** Add padding prop to ListItem ([5d866a2](https://github.com/instructure/instructure-ui/commit/5d866a2))
- **ui-icons:** Adds closed captioning and full screen icons ([57a0abb](https://github.com/instructure/instructure-ui/commit/57a0abb))
- **ui-icons,ui-icons-build,ui-svg-images:** RTL for icon build ([f5f40f6](https://github.com/instructure/instructure-ui/commit/f5f40f6))
- **ui-media-player:** Add ui-media-player package ([fb5689e](https://github.com/instructure/instructure-ui/commit/fb5689e))
- **ui-toggle-details,ToggleDetails:** allow full-width summary ([fa39e0f](https://github.com/instructure/instructure-ui/commit/fa39e0f))

<a name="5.8.1"></a>

## [5.8.1](https://github.com/instructure/instructure-ui/compare/v5.8.0...v5.8.1) (2018-05-11)

### Bug Fixes

- Set a default text direction to fix broken bidirectional styles ([77f6aed](https://github.com/instructure/instructure-ui/commit/77f6aed))

<a name="5.8.0"></a>

# [5.8.0](https://github.com/instructure/instructure-ui/compare/v5.7.0...v5.8.0) (2018-05-11)

### Bug Fixes

- **build:** Fixes so that the release script doesn't fail ([72eca18](https://github.com/instructure/instructure-ui/commit/72eca18))
- **ui-docs-plugin:** handle missing icons config ([3168132](https://github.com/instructure/instructure-ui/commit/3168132))

### Features

- **storybook,RTLaddon:** add a RTL button for switching storybook examp ([2b9e0dd](https://github.com/instructure/instructure-ui/commit/2b9e0dd))
- **ToggleDetails:** Add focus and focused ([d80db8a](https://github.com/instructure/instructure-ui/commit/d80db8a))
- **ui-elements:** Add a TruncateText component ([86ee847](https://github.com/instructure/instructure-ui/commit/86ee847))
- **ui-presets:** Webpack loading for gif and otf ([ffa0fa4](https://github.com/instructure/instructure-ui/commit/ffa0fa4))

<a name="5.7.0"></a>

# [5.7.0](https://github.com/instructure/instructure-ui/compare/v5.6.0...v5.7.0) (2018-05-07)

### Bug Fixes

- **release:** Fix auto-release script ([f2b99d3](https://github.com/instructure/instructure-ui/commit/f2b99d3))
- **ui-overlays,Popover:** Pass down stacking/z-index to ContextView/View ([a2a39ef](https://github.com/instructure/instructure-ui/commit/a2a39ef))

### Features

- **ui-docs-client:** Add RTL toggle to Playground ([21a0a34](https://github.com/instructure/instructure-ui/commit/21a0a34))

<a name="5.6.0"></a>

# [5.6.0](https://github.com/instructure/instructure-ui/compare/v5.5.0...v5.6.0) (2018-05-04)

### Bug Fixes

- **ui-utils:** Remove relative package imports ([b8fd970](https://github.com/instructure/instructure-ui/commit/b8fd970))

### Features

- **ui-presets:** Add an eslint rule to prevent relative package imports ([d23b53d](https://github.com/instructure/instructure-ui/commit/d23b53d))

<a name="5.5.0"></a>

# [5.5.0](https://github.com/instructure/instructure-ui/compare/v5.4.0...v5.5.0) (2018-04-26)

### Bug Fixes

- **media-capture:** Update the FileSave submit button to prevent default ([fd47f2a](https://github.com/instructure/instructure-ui/commit/fd47f2a))
- **ui-docs-client:** Fix source code path ([7c23cac](https://github.com/instructure/instructure-ui/commit/7c23cac))
- **ui-docs-client:** Use resource displayName instead of name for usage ([8357c5c](https://github.com/instructure/instructure-ui/commit/8357c5c))
- **ui-forms:** Preserve [FileDrop](#FileDrop) event during onDrop ([e45b70d](https://github.com/instructure/instructure-ui/commit/e45b70d))
- **ui-i18n:** Fix moment version dependency ([b6289c2](https://github.com/instructure/instructure-ui/commit/b6289c2))
- **ui-overlays:** Fix a11y issues in Tooltip and Popover ([352b8ca](https://github.com/instructure/instructure-ui/commit/352b8ca))

### Features

- **ui-forms,DateInput:** Add support for disabled days ([c1067ad](https://github.com/instructure/instructure-ui/commit/c1067ad))
- **ui-icons,IconX:** Updated IconX to be a little smaller ([1bdcd86](https://github.com/instructure/instructure-ui/commit/1bdcd86))
- **ui-layout,View:** Add style prop white list (incl backgroundImage) ([d8a35ab](https://github.com/instructure/instructure-ui/commit/d8a35ab))
- **ui-overlays,Tray:** Replace timeout with requestAnimationFrame ([ddd9096](https://github.com/instructure/instructure-ui/commit/ddd9096))
- **ui-presets,eslint:** Add no-undefined eslint rule ([ff896ea](https://github.com/instructure/instructure-ui/commit/ff896ea))

<a name="5.4.0"></a>

# [5.4.0](https://github.com/instructure/instructure-ui/compare/v5.3.1...v5.4.0) (2018-04-25)

### Bug Fixes

- **ui-a11y:** Update Focus Region to focus on next tick ([eef1df2](https://github.com/instructure/instructure-ui/commit/eef1df2))
- **ui-forms:** Only render checkmark when checked ([592d533](https://github.com/instructure/instructure-ui/commit/592d533))
- **ui-forms,DateInput:** set newState to textInputValue vs raw ([dd16c75](https://github.com/instructure/instructure-ui/commit/dd16c75))
- **ui-i18n:** Fix moment's version to >= 2.20 for toISOString(keepOffset ([5103a81](https://github.com/instructure/instructure-ui/commit/5103a81))
- **ui-themes:** Make high-contrast theme backwards compatible with < 5.3 ([28b75ef](https://github.com/instructure/instructure-ui/commit/28b75ef))

### Features

- **build:** Add no semi lint rule until we can add prettier config ([cd97004](https://github.com/instructure/instructure-ui/commit/cd97004))
- **ui-layout:** Add View and ContextView components ([497ccd5](https://github.com/instructure/instructure-ui/commit/497ccd5))

### Performance Improvements

- **ui-elements:** async avatar loading ([0501ae2](https://github.com/instructure/instructure-ui/commit/0501ae2))

<a name="5.3.1"></a>

## [5.3.1](https://github.com/instructure/instructure-ui/compare/v5.3.0...v5.3.1) (2018-04-24)

### Bug Fixes

- **ui-themes:** Should be backwards compatible with <= 5.3 components ([6f44e11](https://github.com/instructure/instructure-ui/commit/6f44e11))

<a name="5.3.0"></a>

# [5.3.0](https://github.com/instructure/instructure-ui/compare/v5.2.0...v5.3.0) (2018-04-20)

### Bug Fixes

- **ui-alerts:** Fix an issue where removing screenreader alerts could fail ([4fac6e6](https://github.com/instructure/instructure-ui/commit/4fac6e6))
- **ui-docs-client:** Update GithubCorner styles ([57ddbec](https://github.com/instructure/instructure-ui/commit/57ddbec))
- **ui-icons,IconAssignment:** Assignment should show for line & solid ([fbfcf59](https://github.com/instructure/instructure-ui/commit/fbfcf59))
- **ui-utils,getFontSize:** Improve performance ([702c923](https://github.com/instructure/instructure-ui/commit/702c923))

### Features

- **build:** Add visual diff scripts ([792d958](https://github.com/instructure/instructure-ui/commit/792d958))
- **build:** Generate Sketch assets from component examples ([33f88ae](https://github.com/instructure/instructure-ui/commit/33f88ae))
- **ui-forms:** allow persistent options in MultipleSelect ([ffc5946](https://github.com/instructure/instructure-ui/commit/ffc5946))
- **ui-icons:** import codemod config ([3b96226](https://github.com/instructure/instructure-ui/commit/3b96226))
- **ui-navigation:** new Navigation/NavigationItem component ([29da924](https://github.com/instructure/instructure-ui/commit/29da924))

<a name="5.2.0"></a>

# [5.2.0](https://github.com/instructure/instructure-ui/compare/v5.1.1...v5.2.0) (2018-04-06)

### Bug Fixes

- **ui-forms:** Fix warning issue in [DateTimeInput](#DateTimeInput) ([1704c53](https://github.com/instructure/instructure-ui/commit/1704c53))
- **ui-i18n:** Fix [DateTime](#DateTime). Should use moment-timezone. ([c78de61](https://github.com/instructure/instructure-ui/commit/c78de61))
- **ui-tabs:** Fix [TabList](#TabList) support for nodes as title ([eb33479](https://github.com/instructure/instructure-ui/commit/eb33479))

### Features

- **ui-billboard:** Size icons in [Billboard](#Billboard) with [SVGIcon](#SVGIcon) size prop ([11d3bfe](https://github.com/instructure/instructure-ui/commit/11d3bfe))
- **ui-forms:** Add readOnly to ui-forms components ([f494d0d](https://github.com/instructure/instructure-ui/commit/f494d0d))

<a name="5.1.1"></a>

## [5.1.1](https://github.com/instructure/instructure-ui/compare/v5.1.0...v5.1.1) (2018-04-05)

### Bug Fixes

- **ui-utils:** Generated element ids can't start with a number ([c6e159e](https://github.com/instructure/instructure-ui/commit/c6e159e))

<a name="5.1.0"></a>

# [5.1.0](https://github.com/instructure/instructure-ui/compare/v5.0.1...v5.1.0) (2018-04-04)

### Deprecations

#### **ui-menu: Deprecate MenuItemFlyout ([dc82765](https://github.com/instructure/instructure-ui/commit/dc82765))**

Don't panic. You can still create menu fly-outs. In order to simplify the component
API, the `MenuItemFlyout` component has been consolidated with `Menu`.

To create fly-out menus moving forward you can replace `MenuItemFlyout` with `Menu`.

See the updated [Menu](#Menu) documentation for examples.

### Bug Fixes

- **ui-forms:** remove 0.01em top padding ([14a5675](https://github.com/instructure/instructure-ui/commit/14a5675))
- **ui-code-editor:** CodeEditor content should update when value changes ([eb7ecdd](https://github.com/instructure/instructure-ui/commit/eb7ecdd))
- **ui-toggle-details:** iconColor should be themeable ([14e6577](https://github.com/instructure/instructure-ui/commit/14e6577))

### Features

- **DateTimeInput:** new DateTimeInput component ([2aaf29b](https://github.com/instructure/instructure-ui/commit/2aaf29b))

### Performance Improvements

- **ui-utils:** Replace shortid with nanoid ([5d0a93e](https://github.com/instructure/instructure-ui/commit/5d0a93e))

<a name="5.0.1"></a>

## [5.0.1](https://github.com/instructure/instructure-ui/compare/v5.0.0...v5.0.1) (2018-04-02)

### Bug Fixes

- Add missing dependencies ([d66826b](https://github.com/instructure/instructure-ui/commit/d66826b))

<a name="5.0.0"></a>

# [5.0.0](https://github.com/instructure/instructure-ui/compare/v4.8.0...v5.0.0) (2018-03-29)

### Upgrade Guide

The easiest way to upgrade is to run `yarn upgrade --scope @instructure`. Once you've done this, make sure
you check the 'BREAKING CHANGES' section below so that you can make those changes as necessary.

After upgrading you should see deprecation warnings in dev and test environments that will help you prepare
for future releases (or check out the 'Deprecations' section below). The [ui-codemods](#ui-codemods) scripts
should make it easy to update your import/require statements to get rid of a lot of the warnings. Note: you'll
need to update your package.json file manually to add the new packages.

Note though, that it's not necessary to upgrade everything at once. Depending on the size of your application
you may want to upgrade a package (or component) at a time. This is a major release, but in this case
it's safe to do that.

### Release Highlights

#### **Breaking up is hard to do: Goodbye, `ui-core`!**

We have broken `ui-core` into smaller packages like [ui-breadcrumb](#ui-breadcrumb), [ui-buttons](#ui-buttons),
and [ui-container](#ui-container). This change is intended to make consuming Instructure UI components easier by
allowing applications to only import and update the packages they need. You're welcome.

#### **...and hello, `ui-icons`!**

This release brings Instructure's [SVG icon library](#iconography) into Instructure UI. Icons can now be imported
from the [ui-icons](#ui-icons) package. We have also added a [ui-svg-images](#ui-svg-images) package, with components for
handling [inline SVGs](#InlineSVG) and [SVG icons](#SVGIcon).

#### **A [Responsive 🕶🎸](#Responsive) component ([abe0cb3](https://github.com/instructure/instructure-ui/commit/abe0cb3))**

If this release has a rock star, it's the [Responsive](#Responsive) component. It will swagger into
your application wearing shades, rock the greatest guitar solo you've ever heard, and basically
solve every responsive front-end problem ever. The true "one ring to rule them all" of responsive
development, Responsive allows you to -- _wait for it_ -- choose between element queries and
media queries, specify your own breakpoints, and conditionally render content at those breakpoints.
Enjoy.

#### **Add RFC generator and docs ([64d6368](https://github.com/instructure/instructure-ui/commit/64d6368))**

RFC stands for _Request for Comment_ and reflects our new process for contributing to Instructure
UI. An RFC is a markdown document that describes the purpose of the proposed change or addition,
including the API, props and theme variables. RFC documents are committed to Instructure UI
and iterated on by the contributor and the UI Development team. Once the RFC is approved and merged
to master, development can begin. Take a look at the [RFC for the Flex component](#FlexRFC), for
an example, or create your own by running `yarn generate:rfc` in your local repository.

#### **A media-capture Package**

This package was contributed recently for use in the [Arc video platform](https://www.arcmedia.com/) and includes a native [VideoPlayer](#VideoPlayer) as well as a [MediaCapture](#MediaCapture) component for recording and uploading videos.

#### **Add [Flex](#Flex) component ([7f702ac](https://github.com/instructure/instructure-ui/commit/7f702ac))**

Feeling like [Grid](#Grid) is just overkill for a simple column layout? Struggling to line up icons,
buttons, and text? Thinking of just giving up and quietly using `<table>`? Well, you're in for a
[real treat](#Flex), my friend.

#### **Add screen reader only variant to [Alert](#Alert)**

[Alert](#Alert) now has a `screenReaderOnly` property. When set to `true`, the alert should only be
visible to screen readers.

#### **Add experimental flag and decorator ([9bbcbab](https://github.com/instructure/instructure-ui/commit/9bbcbab))**

This feature allows component developers to indicate that their component uses JS or CSS features
that are not fully supported by all browsers, or that the component is still in experimentation mode
and the API may change. Putting `experimental: true` in the YAML front matter
of a doc will render a [Pill](#Pill) with the text 'Experimental' before the page heading in the
documentation. A console warning will also display in dev environments.

#### **Add [Img](#Img) cover property ([edcc5ce](https://github.com/instructure/instructure-ui/commit/edcc5ce))**

CSS's `object-fit: cover` comes to the [Img](#Img) component, with polyfill support for IE11. When
the new `cover` prop is `true`, Img fills the full width and height of its containing element, while
maintaining the aspect ratio of the source image. Great for full-page or section background images.

#### **Update [Select](#Select) to use non-native options dropdown ([c291a38](https://github.com/instructure/instructure-ui/commit/c291a38))**

We have combined Autocomplete and [Select](#Select) into a single, amazing component. No more ugly
browser-styled select options! With this change, Select moves to the new [ui-forms](#ui-forms) package. The
original Select and Autocomplete components in `ui-core` are now deprecated and will be removed in a
future release. We've also fixed a bunch of accessibility bugs in the process, so upgrade as soon
as you can!

### Deprecations

#### **applicationElement ([ee7d1e9](https://github.com/instructure/instructure-ui/commit/ee7d1e9))**

Remember when you used to have to pass in an `applicationElement` prop to [Moda](#Modal), [Popover](#Popover),
and [Tray](#Tray)?

Forget about it. You no longer have to supply an `applicationElement` prop because it's all done automagically 🎩.

#### **ui-core Deprecations**

Nearly all components in ui-core have been deprecated in the 5.0.0 release and have been moved into separate,
smaller packages. As you upgrade, you can run a [ui-codemod](#ui-codemods) script to update the import/require
statements in your code, or check the `config/imports.config.json` file in the ui-core package to see where
things have moved. Also note that if you upgrade the `ui-core` package, you'll see deprecation warnings
in dev and test environments that will also tell you what the new package is for each component. Note: you'll
need to update your package.json file manually to add the new packages.

#### **PopoverMenu ([893f628](https://github.com/instructure/instructure-ui/commit/893f6289d2bb9ca0dee0327b0e75759e7d5dc074))**

Speaking of `ui-core`... `PopoverMenu` will remain in ui-core _but_ it does not make the move to the new `ui-menu` package on its own, PopoverMenu functionality has now been consolidated into [Menu](#Menu). By assigning a node to the `trigger` prop it will create a menu from the triggering element (ie: <Button>).

#### **Close Buttons**

The `closeButtonLabel` prop is deprecated in [Modal](#Modal), [Tray](#Tray), and [Popover](#Popover). To migrate
to the new versions of these components, render a [CloseButton](#CloseButton) as a child (see the examples in the
documentation for implementation details). This change should give consuming applications more control over the
layout of the content.

#### **Icon width and height**

The `width` and `height` props have been deprecated in the [SVGIcon](#SVGIcon) component. Going forward, you
can use the `size` prop instead. This should make the icons sizes more consistent across the consuming application.

### BREAKING CHANGES

- **ui-forms:** [MetricsList](#MetricsList) text alignment is now a prop instead of a theme variable
- **ui-motion,ui-alerts:** - The [Transition](#Transition).duration and [Alert](#Alert).transitionDuration static
  attributes have been removed. These values are now distributed
  via a duration theme variable located in
  `ui-themes/lib/canvas/base/transition.js`
- **ui-presets:** Themes have to be imported in a `mocha.config.js` file for mocha/jsdom tests
- **ui-forms:** [DateInput](#DateInput) onDateChange prop arguments have changed and the
  invalidDateMessage prop is now required.
- **ui-forms:** [RadioInputGroup](#RadioInputGroup) onChange prop arguments have changed
- **ui-a11y:** FocusManager is no longer exported as a singleton. You now need to import and create a new instance. Ex:
  `const myFocusManager = new FocusManager()`
- **ui-tabs:** [TabList](#TabList) deprecated `accordion` variant is removed. Use the [ToggleDetails](#ToggleDetails)
  component instead.
- **ui-utils:** Usage of [CustomPropTypes](#CustomPropTypes) will need to be updated for
  the types that have been split out into [LayoutPropTypes](#LayoutPropTypes), [I18nPropTypes](#I18I18nPropTypes),
  [FormPropTypes](#FormPropTypes), and [ThemeablePropTypes](#ThemeablePropTypes)

### Bug Fixes

- **docs:** Prevent console warnings in docs app ([e4729ec](https://github.com/instructure/instructure-ui/commit/e4729ec))
- **media-capture:** Do not trigger device dialog on finished ([5cdc70f](https://github.com/instructure/instructure-ui/commit/5cdc70f))
- **media-capture:** User-friendly device names on Firefox
- **scripts:** Fix release script for pre-releases ([03d11a4](https://github.com/instructure/instructure-ui/commit/03d11a4))
- **scripts:** Add babel and postcss config to package template
- **ui-a11y:** [focusManager](#focusManager) should handle multiple dialogs ([9722dbe](https://github.com/instructure/instructure-ui/commit/9722dbe))
- **ui-alerts:** add min-width to [Alert](#Alert) so flex items don't collapse ([9861c9b](https://github.com/instructure/instructure-ui/commit/9861c9b))
- **ui-buttons:** Fix icon centering with as=div [Button](#Button) ([659f3a4](https://github.com/instructure/instructure-ui/commit/659f3a4))
- **ui-buttons:** Fix inverse link [Button](#Button) :focus outline ([b9abdb0](https://github.com/instructure/instructure-ui/commit/b9abdb0))
- **ui-buttons:** [Button](#Button) Fire onClick with href prop ([f7c22c9](https://github.com/instructure/instructure-ui/commit/f7c22c9))
- **ui-elements:** rename Image component to [Img](#Img) ([668479f](https://github.com/instructure/instructure-ui/commit/668479f))
- **ui-elements:** Fix high contrast mode for [ProgressBar](#ProgressBar) ([2aed758](https://github.com/instructure/instructure-ui/commit/2aed758))
- **ui-elements:** trim whitespace in [Avatar](#Avatar) makeInitialsFromName ([212e92a](https://github.com/instructure/instructure-ui/commit/212e92a))
- **ui-elements:** deprecate [Heading](#Heading) color prop ([74b86e0](https://github.com/instructure/instructure-ui/commit/74b86e0))
- **ui-elements:** fix [Image](#Image) display property ([a72961c](https://github.com/instructure/instructure-ui/commit/a72961c))
- **ui-elements:** Make [Spinner](#Spinner) look better in IE11 ([081f7a0](https://github.com/instructure/instructure-ui/commit/081f7a0))
- **ui-elements:** Disabled [Tag](#Tag) should not be keyboard focusable ([6bb66bc](https://github.com/instructure/instructure-ui/commit/6bb66bc))
- **ui-elements:** allow node prop type for [MetricsList](#MetricsList) label and value props ([ffaaeea](https://github.com/instructure/instructure-ui/commit/ffaaeea))
- **ui-forms:** Resolve [Select](#Select) a11y issues ([a66a03c](https://github.com/instructure/instructure-ui/commit/a66a03c))
- **ui-forms:** [Select](#Select) doesn't expand with Space key ([866709f](https://github.com/instructure/instructure-ui/commit/866709f))
- **ui-forms:** Fix [TextArea](#TextArea) resizing when text is deleted ([682d336](https://github.com/instructure/instructure-ui/commit/682d336))
- **ui-forms:** [TextInput](#TextInput) not reading [Tooltip](#Tooltip) id ([5d6adee](https://github.com/instructure/instructure-ui/commit/5d6adee))
- **ui-forms:** increase CSS specificity for [NumberInput](#NumberInput),[TimeInput](#TimeInput) ([a6b08b3](https://github.com/instructure/instructure-ui/commit/a6b08b3))
- **ui-forms:** [RadioInputGroup](#RadioInputGroup) should pass event to onChange cb ([4268eec](https://github.com/instructure/instructure-ui/commit/4268eec))
  ([74fa7eb](https://github.com/instructure/instructure-ui/commit/74fa7eb))
- **ui-forms:** Allow [Select](#Select) selectedOption to be cleared ([2aa2b94](https://github.com/instructure/instructure-ui/commit/2aa2b94))
- **ui-forms:** Ensure [Select](#Select) resets results on close ([b26c8b3](https://github.com/instructure/instructure-ui/commit/b26c8b3))
- **ui-forms:** Fix [Select](#Select) component onChange handlers ([c6ef9fc](https://github.com/instructure/instructure-ui/commit/c6ef9fc))
- **ui-forms:** Prevent value change of disabled controlled [Select](#Select) ([525a4e4](https://github.com/instructure/instructure-ui/commit/525a4e4))
- **ui-forms:** [TextArea](#TextArea) should shrink when cleared ([3320d9d](https://github.com/instructure/instructure-ui/commit/3320d9d))
- **ui-icons:** Add Sketch template file ([42a5c3f](https://github.com/instructure/instructure-ui/commit/42a5c3f))
- **ui-layout:** Fix [Position](#Position) constraint logic ([9763ef3](https://github.com/instructure/instructure-ui/commit/9763ef3))
- **ui-layout:** Fix [Position](#Position) getOffsetParents in IE11 ([15797b5](https://github.com/instructure/instructure-ui/commit/15797b5))
- **ui-layout:** [Position](#Position) should handle transformed/relative position parents ([26bc897](https://github.com/instructure/instructure-ui/commit/26bc897))
- **media-capture:** Utilize ts-ebml to get duration and cues headers in ([8aadc43](https://github.com/instructure/instructure-ui/commit/8aadc43))
- **ui-menu:** Remove transition from :focus ring on [Menu](#Menu) ([cba89db](https://github.com/instructure/instructure-ui/commit/cba89db))
- **ui-menu:** Resolve issues with [Menu](#Menu) inside [Modal](#Modal) ([c6f3c18](https://github.com/instructure/instructure-ui/commit/c6f3c18))
- **ui-presets:** Remove cycle in dependency graph ([352a58b](https://github.com/instructure/instructure-ui/commit/352a58b))
- **ui-presets:** Remove unnecessary dependency ([943bab4](https://github.com/instructure/instructure-ui/commit/943bab4))
- **ui-testbed:** update CSS to disable transitions ([fa75264](https://github.com/instructure/instructure-ui/commit/fa75264))
- **ui-svg-images:** fix [InlineSVG](#InlineSVG) example size ([0369e7e](https://github.com/instructure/instructure-ui/commit/0369e7e))
- **ui-svg-images:** Fix size prop for [SVGIcon](#SVGIcon) ([2ef69e9](https://github.com/instructure/instructure-ui/commit/2ef69e9))

### Features

- **build:** Add RFC generator and docs ([64d6368](https://github.com/instructure/instructure-ui/commit/64d6368))
- **build:** Add copyright notice eslint plugin ([0153907](https://github.com/instructure/instructure-ui/commit/0153907))
- **media-capture:** add feature detection for [MediaCapture](#MediaCapture) ([c7450f6](https://github.com/instructure/instructure-ui/commit/c7450f6))
- **media-capture:** Add [MediaCapture](#MediaCapture), [VideoPlayer](#VideoPlayer) ([39ebb9e](https://github.com/instructure/instructure-ui/commit/39ebb9e))
- **media-capture:** [VideoPlayer](#VideoPlayer) playback onCanPlay handler ([c00de06](https://github.com/instructure/instructure-ui/commit/c00de06))
- **scripts:** Add ability to specify a package to generate:component ([1a890ee](https://github.com/instructure/instructure-ui/commit/1a890ee))
- **ui-a11y:** add ui-a11y package ([e913843](https://github.com/instructure/instructure-ui/commit/e913843))
- **ui-a11y:** add a [FocusRegion](#FocusRegion) component ([f395fd8](https://github.com/instructure/instructure-ui/commit/f395fd8))
- **ui-a11y:** Add [FocusRegionManager](#FocusRegionManager), [FocusRegion](#FocusRegion) utilities ([d14eaa0](https://github.com/instructure/instructure-ui/commit/d14eaa0))
- **ui-a11y:** add hasVisibleChildren ([bf31684](https://github.com/instructure/instructure-ui/commit/bf31684))
- **ui-alerts:** Add a ui-alerts package ([d078984](https://github.com/instructure/instructure-ui/commit/d078984))
- **ui-alerts:** Add screen reader only variant to [Alert](#Alert) ([d764e94](https://github.com/instructure/instructure-ui/commit/d764e94))
- **ui-billboard:** Add ui-billboard package ([4272911](https://github.com/instructure/instructure-ui/commit/4272911))
- **ui-breadcrumb:** Add ui-breadcrumb package ([b990973](https://github.com/instructure/instructure-ui/commit/b990973))
- **ui-buttons:** Add a ui-buttons package ([21bde2f](https://github.com/instructure/instructure-ui/commit/21bde2f))
- **ui-code-editor:** Add ui-code-editor package ([7d6bd1c](https://github.com/instructure/instructure-ui/commit/7d6bd1c))
- **ui-container:** Add a ui-container package ([b90aade](https://github.com/instructure/instructure-ui/commit/b90aade))
- **ui-docs-plugin,ui-utils:** Add experimental flag and decorator ([9bbcbab](https://github.com/instructure/instructure-ui/commit/9bbcbab))
- **ui-elements:** Add a ui-elements package ([12483d7](https://github.com/instructure/instructure-ui/commit/12483d7))
- **ui-elements:** add [Img](#Img) component ([9d0cb9e](https://github.com/instructure/instructure-ui/commit/9d0cb9e))
- **ui-elements:** Deprecate colors for [Heading](#Heading) ([26cc418](https://github.com/instructure/instructure-ui/commit/26cc418))
- **ui-elements:** Add [Img](#Img) cover property ([edcc5ce](https://github.com/instructure/instructure-ui/commit/edcc5ce))
- **ui-elements:** Add [Rating](#Rating) to ui-elements package ([77eaa11](https://github.com/instructure/instructure-ui/commit/77eaa11))
- **ui-forms:** Add ui-forms package ([ca6b694](https://github.com/instructure/instructure-ui/commit/ca6b694))
- **ui-forms:** Update [NumberInput](#NumberInput) i18n solution ([572bb3a](https://github.com/instructure/instructure-ui/commit/572bb3a))
- **ui-forms:** [Checkbox](#Checkbox) Update checkmark icon and border ([e75b0e6](https://github.com/instructure/instructure-ui/commit/e75b0e6))
- **ui-forms:** Update [Select](#Select) to use non-native options dropdown ([c291a38](https://github.com/instructure/instructure-ui/commit/c291a38))
- **ui-forms:** [TextArea](#TextArea) maxHeight should accept ems, rems ([8817c07](https://github.com/instructure/instructure-ui/commit/8817c07))
- **ui-i18n:** Adding ui-i18n package ([823f89a](https://github.com/instructure/instructure-ui/commit/823f89a))
- **ui-icons:** Add icons (from instructure-icons) as a new package ([8c3b3f0](https://github.com/instructure/instructure-ui/commit/8c3b3f0))
- **ui-icons:** add share and video-camera icons ([5c7a3fb](https://github.com/instructure/instructure-ui/commit/5c7a3fb))
- **ui-icons:** add progress icon ([0f4207b](https://github.com/instructure/instructure-ui/commit/0f4207b))
- **ui-layout:** Add ui-layout package ([c461644](https://github.com/instructure/instructure-ui/commit/c461644))
- **ui-layout:** A [Responsive](#Responsive) component ([abe0cb3](https://github.com/instructure/instructure-ui/commit/abe0cb3))
- **ui-layout:** A [DrawerLayout](#DrawerLayout) component ([1cfb7b5](https://github.com/instructure/instructure-ui/commit/1cfb7b5))
- **ui-layout:** Add [Flex](#Flex) component ([7f702ac](https://github.com/instructure/instructure-ui/commit/7f702ac))
- **ui-menu:** Add ui-menu package ([7a7fb35](https://github.com/instructure/instructure-ui/commit/7a7fb35))
- **ui-motion:** Add ui-motion package ([638c6a9](https://github.com/instructure/instructure-ui/commit/638c6a9))
- **ui-overlays:** Add a ui-overlays package ([c9762a4](https://github.com/instructure/instructure-ui/commit/c9762a4))
- **ui-overlays:** [Tray](#Tray),[Modal](#Modal) Deprecate closeButtonLabel and closeButtonRef ([85a76b8](https://github.com/instructure/instructure-ui/commit/85a76b8))
- **ui-overlays,ui-i18n:** Add RTL language support to [Tray](#Tray) ([3309bcb](https://github.com/instructure/instructure-ui/commit/3309bcb))
- **ui-overlays:** deprecate applicationElement prop ([ee7d1e9](https://github.com/instructure/instructure-ui/commit/ee7d1e9))
- **ui-pages:** Add [Pages](#Pages) component ([6fda3e3](https://github.com/instructure/instructure-ui/commit/6fda3e3))
- **ui-pagination:** Add ui-pagination package ([ef3ee97](https://github.com/instructure/instructure-ui/commit/ef3ee97))
- **ui-portal:** Add ui-portal package ([d4ed6db](https://github.com/instructure/instructure-ui/commit/d4ed6db))
- **ui-presets,ui-core:** Add support for node test environments ([5d3a452](https://github.com/instructure/instructure-ui/commit/5d3a452))
- **ui-svg-images:** Add ui-svg-images, remove instructure-icons imports ([6201628](https://github.com/instructure/instructure-ui/commit/6201628))
- **ui-svg-images:** Add [SVGIcon](#SVGIcon) size prop, deprecate height/width ([24501ea](https://github.com/instructure/instructure-ui/commit/24501ea))
- **ui-svg-images:** Add `inline` prop to [SVGIcon](#SVGIcon) and [InlineSVG](#InlineSVG) ([72fe27f](https://github.com/instructure/instructure-ui/commit/72fe27f))
- **ui-tabs:** Add ui-tabs package ([7b984c7](https://github.com/instructure/instructure-ui/commit/7b984c7))
- **ui-themeable:** Add [ApplyTheme](#ApplyTheme) to ui-themeable package
- **ui-themeable:** Add shorthandPropType ([066d1f0](https://github.com/instructure/instructure-ui/commit/066d1f0))
  ([c69644c](https://github.com/instructure/instructure-ui/commit/c69644c))
- **ui-toggle-details:** Add ui-toggle-details package ([6b606de](https://github.com/instructure/instructure-ui/commit/6b606de))
- **ui-tree-browser:** Add ui-tree-browser package ([1c59c1f](https://github.com/instructure/instructure-ui/commit/1c59c1f))
- **ui-utils:** Split up CustomPropTypes ([25fb0e0](https://github.com/instructure/instructure-ui/commit/25fb0e0))

<a name="4.8.0"></a>

# [4.8.0](https://github.com/instructure/instructure-ui/compare/v4.7.3...v4.8.0) (2018-03-26)

### Bug Fixes

- **ui-buttons:** Button href prop should work with onClick ([b2a78bb](https://github.com/instructure/instructure-ui/commit/b2a78bb))

### Features

- **ui-overlay,ui-i18n:** add RTL language support to Tray ([92679d7](https://github.com/instructure/instructure-ui/commit/92679d7))

<a name="4.7.3"></a>

## [4.7.3](https://github.com/instructure/instructure-ui/compare/v4.7.2...v4.7.3) (2018-03-06)

### Bug Fixes

- **FileDrop:** Fix positioning of the inner native file input element ([3664ccb](https://github.com/instructure/instructure-ui/commit/3664ccb))

<a name="4.7.2"></a>

## [4.7.2](https://github.com/instructure/instructure-ui/compare/v4.7.1...v4.7.2) (2018-02-14)

### Bug Fixes

- **ListItem:** stop :not selector selecting everything ([8209b8c](https://github.com/instructure/instructure-ui/commit/8209b8c))

<a name="4.7.1"></a>

## [4.7.1](https://github.com/instructure/instructure-ui/compare/v4.7.0...v4.7.1) (2018-01-25)

### Bug Fixes

- **ui-menu:** Pass href prop down to ElementType ([e876404](https://github.com/instructure/instructure-ui/commit/e876404))

<a name="4.7.0"></a>

# [4.7.0](https://github.com/instructure/instructure-ui/compare/v4.6.0...v4.7.0) (2018-01-24)

### Bug Fixes

- **babel-plugin-transform-class-display-name:** Add empty statement ([92473b3](https://github.com/instructure/instructure-ui/commit/92473b3))
- **Button:** fix icon alignment for small/large circle variant ([2853f53](https://github.com/instructure/instructure-ui/commit/2853f53))
- **Button,TreeBrowser:** Focus outline on focus only w/ MS Edge ([30ee7b2](https://github.com/instructure/instructure-ui/commit/30ee7b2))
- **DateInput:** fire onDateChange when transitioning to/from empty ([9765f55](https://github.com/instructure/instructure-ui/commit/9765f55))
- **MetricsList:** fix alignment for edge ([58333cd](https://github.com/instructure/instructure-ui/commit/58333cd))
- **MetricsList:** Vertically align MetricsListItems ([b666c09](https://github.com/instructure/instructure-ui/commit/b666c09))
- **Popover:** adds alignArrow prop to Popover ([46414dc](https://github.com/instructure/instructure-ui/commit/46414dc))
- **TimeInput:** allow disabled prop to pass down ([6e9f444](https://github.com/instructure/instructure-ui/commit/6e9f444))

### Features

- **List:** Add itemSpacing prop ([36cf537](https://github.com/instructure/instructure-ui/commit/36cf537))

<a name="4.6.0"></a>

# [4.6.0](https://github.com/instructure/instructure-ui/compare/v4.5.0...v4.6.0) (2018-01-03)

### Bug Fixes

- **List:** don't render delimiter when delimiter=none unless it's inline ([3e81b1f](https://github.com/instructure/instructure-ui/commit/3e81b1f))
- **List:** ignore falsy children ([cb7a45c](https://github.com/instructure/instructure-ui/commit/cb7a45c)), closes [/github.com/facebook/react/issues/2956#issuecomment-338041943](https://github.com//github.com/facebook/react/issues/2956/issues/issuecomment-338041943)

### Features

- **build:** Support a beta release branch ([b9b187c](https://github.com/instructure/instructure-ui/commit/b9b187c))
- **Button:** Handle text color for :hover/:focus ([8c77678](https://github.com/instructure/instructure-ui/commit/8c77678))
- **PopoverMenu:** re-export MenuItem, etc. for simplicity ([52ecc4c](https://github.com/instructure/instructure-ui/commit/52ecc4c))
- **postcss:** Add config option to opt into nesting instead of nested ([5443bbb](https://github.com/instructure/instructure-ui/commit/5443bbb))

<a name="4.5.0"></a>

# [4.5.0](https://github.com/instructure/instructure-ui/compare/v4.4.1...v4.5.0) (2017-12-19)

### Bug Fixes

- **CloseButton:** remove inline size to allow size prop to work correctl ([0c01510](https://github.com/instructure/instructure-ui/commit/0c01510))
- **DateInput:** Allow text input when component is controlled ([05e0112](https://github.com/instructure/instructure-ui/commit/05e0112))
- **FormFieldLayout:** fix inline input issues ([35ca6bb](https://github.com/instructure/instructure-ui/commit/35ca6bb))
- **ui-codemods:** Update Typography to Text ([ff9d596](https://github.com/instructure/instructure-ui/commit/ff9d596))
- **ui-docs-plugin:** Pass down config to loaders correctly ([62f01f6](https://github.com/instructure/instructure-ui/commit/62f01f6))
- **ui-presets:** Remove unnecessary dependency that's causing issues dow ([a55b8b3](https://github.com/instructure/instructure-ui/commit/a55b8b3))

### Features

- **List:** Updates variant prop. Adds delimiter prop. ([7b29a44](https://github.com/instructure/instructure-ui/commit/7b29a44))

<a name="4.4.1"></a>

## [4.4.1](https://github.com/instructure/instructure-ui/compare/v4.4.0...v4.4.1) (2017-12-14)

### Bug Fixes

- **ui-docs-plugin:** Pass down config to loaders correctly ([deabfc4](https://github.com/instructure/instructure-ui/commit/deabfc4))
- **ui-presets:** Remove unnecessary dependency that's causing issues dow ([bd2d81e](https://github.com/instructure/instructure-ui/commit/bd2d81e))

<a name="4.4.0"></a>

# [4.4.0](https://github.com/instructure/instructure-ui/compare/v4.3.0...v4.4.0) (2017-12-13)

### Bug Fixes

- **Avatar:** trim whitespace in makeInitialsFromName ([4317939](https://github.com/instructure/instructure-ui/commit/4317939))
- **docs:** Add missing docs app dependency ([fea9a70](https://github.com/instructure/instructure-ui/commit/fea9a70))
- **TextArea:** shrink when cleared ([0b45287](https://github.com/instructure/instructure-ui/commit/0b45287))

### Features

- **ui-presets,ui-core:** Add support for node test environments + tweaks for quizzes ([dc7a484](https://github.com/instructure/instructure-ui/commit/dc7a484))

<a name="4.3.0"></a>

# [4.3.0](https://github.com/instructure/instructure-ui/compare/v4.2.0...v4.3.0) (2017-12-11)

### Bug Fixes

- **Alert:** close button focus overlapping edge of container ([aeb2130](https://github.com/instructure/instructure-ui/commit/aeb2130))
- **Alert:** Convert border values to theme vars ([273c86e](https://github.com/instructure/instructure-ui/commit/273c86e))
- **Autocomplete:** fix controlled behavior ([8af7d62](https://github.com/instructure/instructure-ui/commit/8af7d62))
- **browser:** fix accessing style when it's undefined in Position ([806a861](https://github.com/instructure/instructure-ui/commit/806a861))
- **build:** Always ask for the release tag ([e01629c](https://github.com/instructure/instructure-ui/commit/e01629c))
- **build:** Use correct format for release (git) tags ([c9ec4df](https://github.com/instructure/instructure-ui/commit/c9ec4df))
- **Checkbox:** Update disabled/readonly checkboxes to not be tabbable ([8b37729](https://github.com/instructure/instructure-ui/commit/8b37729))
- **ContextBox:** Position close button correctly in dialog example ([7c0e846](https://github.com/instructure/instructure-ui/commit/7c0e846))
- **DateInput:** fix controlled component version ([af6208e](https://github.com/instructure/instructure-ui/commit/af6208e))
- **DateInput:** Link messages to inputs for SR ([fe8f2bc](https://github.com/instructure/instructure-ui/commit/fe8f2bc))
- **DateInput:** Prevent inputRef from getting called multiple times ([1dbd960](https://github.com/instructure/instructure-ui/commit/1dbd960))
- **FileDrop:** allow extensions without leading dot ([9a155e9](https://github.com/instructure/instructure-ui/commit/9a155e9))
- **Grid:** Make GridCols equal-width by default ([cb8e5d3](https://github.com/instructure/instructure-ui/commit/cb8e5d3))
- **Link:** fix inverse focus for a11y ([c98a4af](https://github.com/instructure/instructure-ui/commit/c98a4af))
- **List:** remove ellipsis styles from pipe variant ([390a60a](https://github.com/instructure/instructure-ui/commit/390a60a))
- **Mask:** Make full-screen Mask work in Safari ([029f467](https://github.com/instructure/instructure-ui/commit/029f467))
- **Menu:** Long menu item alignment is off ([3cfc435](https://github.com/instructure/instructure-ui/commit/3cfc435))
- **Menu,MenuItem,PopoverMenu:** Fix VO double select on radio,checkbox ([28b733b](https://github.com/instructure/instructure-ui/commit/28b733b))
- **NumberInput:** add sv locale ([40c6cb7](https://github.com/instructure/instructure-ui/commit/40c6cb7))
- **NumberInput:** extend `disabled` styling to the arrow container ([d3ac1d4](https://github.com/instructure/instructure-ui/commit/d3ac1d4))
- **Popover:** Popover onDismiss callback never fired ([28d236c](https://github.com/instructure/instructure-ui/commit/28d236c))
- **RadioInput:** Disabled/read-only radios selectable in Safari ([5fbba2c](https://github.com/instructure/instructure-ui/commit/5fbba2c))
- **RadioInput,Checkbox:** Move inputs outside label elements ([7531488](https://github.com/instructure/instructure-ui/commit/7531488))
- **release:** Run tests only once for a release ([c3710fb](https://github.com/instructure/instructure-ui/commit/c3710fb))
- **Select:** Make arrowColor theme variable work ([3731899](https://github.com/instructure/instructure-ui/commit/3731899))
- **Spinner:** adjust large spinner animation ([36d9ea6](https://github.com/instructure/instructure-ui/commit/36d9ea6))
- **Tag:** Tag components render wrong title value ([88b9bf1](https://github.com/instructure/instructure-ui/commit/88b9bf1))
- **ToggleDetails:** Fix filled variant in IE11 ([f1970d1](https://github.com/instructure/instructure-ui/commit/f1970d1))
- **Tooltip:** Move focus on single tab press with tooltip ([dd7d4d0](https://github.com/instructure/instructure-ui/commit/dd7d4d0))
- **ui-core:** Audit/add missing Canvas variables ([a9cefe9](https://github.com/instructure/instructure-ui/commit/a9cefe9))
- **ui-core:** Fix canvas-high-contrast component themes ([c577019](https://github.com/instructure/instructure-ui/commit/c577019))
- **ui-docs-client:** Codepen links are missing some globals ([9e620e2](https://github.com/instructure/instructure-ui/commit/9e620e2))
- **ui-docs-plugin:** misc fixes ([aff7b27](https://github.com/instructure/instructure-ui/commit/aff7b27))
- **ui-presets:** Build CSS with webpack in dev/debug mode ([d3083be](https://github.com/instructure/instructure-ui/commit/d3083be))
- **ui-presets:** Don't remove width/height from SVG tags ([639f620](https://github.com/instructure/instructure-ui/commit/639f620))

### Features

- **build:** Default release script to HEAD commit ([f96b34a](https://github.com/instructure/instructure-ui/commit/f96b34a))
- **build:** Use headless chrome ([39339fd](https://github.com/instructure/instructure-ui/commit/39339fd))
- **ContextBox,Container:** Moving border from ContextBox to Container ([8bf314a](https://github.com/instructure/instructure-ui/commit/8bf314a))
- **FileDrop:** Add support for validation messages ([37a9106](https://github.com/instructure/instructure-ui/commit/37a9106))
- **FormField:** Add prop to allow left aligned FormField label ([089833a](https://github.com/instructure/instructure-ui/commit/089833a))
- **Menu:** Add focus state ([b5f4069](https://github.com/instructure/instructure-ui/commit/b5f4069))
- **Menu:** Focus first menu item when menu only has one item ([d03d1f2](https://github.com/instructure/instructure-ui/commit/d03d1f2))
- **TextInput:** add textAlign variant to support `center` ([53843e1](https://github.com/instructure/instructure-ui/commit/53843e1))
- **ui-core:** Move moment dependency to ui-utils ([0d12a6a](https://github.com/instructure/instructure-ui/commit/0d12a6a))
- **ui-presets:** Add build and test scripts ([6921a48](https://github.com/instructure/instructure-ui/commit/6921a48))
- **ui-themes:** Add canvas-high-contrast theme ([e6cd8e8](https://github.com/instructure/instructure-ui/commit/e6cd8e8))
- **ui-utils:** Add a uid helper ([c9cc6c3](https://github.com/instructure/instructure-ui/commit/c9cc6c3))
- **ui-utils:** Addition of utils needed for the layout component ([501ada3](https://github.com/instructure/instructure-ui/commit/501ada3))

<a name="4.2.0"></a>

# [4.2.0](https://github.com/instructure/instructure-ui/compare/4.1.0...4.2.0) (2017-12-08)

### Features

- **button:** remove focus on disabled buttons ([863e055](https://github.com/instructure/instructure-ui/commit/863e055))

<a name="4.1.0"></a>

# [4.1.0](https://github.com/instructure/instructure-ui/compare/4.0.1...4.1.0) (2017-11-29)

### Bug Fixes

- **Tag:** Focus state hidden in IE11 ([22d5d5c](https://github.com/instructure/instructure-ui/commit/22d5d5c))
- **ui-docs-client:** Codepen links are missing some globals ([0a3f30c](https://github.com/instructure/instructure-ui/commit/0a3f30c))

### Features

- **Tag:** inline variant ([7ad7f7a](https://github.com/instructure/instructure-ui/commit/7ad7f7a))

<a name="4.0.1"></a>

## [4.0.1](https://github.com/instructure/instructure-ui/compare/v4.0.0...v4.0.1) (2017-11-17)

### Bug Fixes

- **Mask:** Fullscreen modal footer hidden on iPad ([ebb76d5](https://github.com/instructure/instructure-ui/commit/ebb76d5))
- **ui-codemods:** add lib to imports path for ui-themes and ui-themeable ([973cf9b](https://github.com/instructure/instructure-ui/commit/973cf9b))

<a name="4.0.0"></a>

# [4.0.0](https://github.com/instructure/instructure-ui/compare/v3.3.1...v4.0.0) (2017-10-13)

The two major themes of the 4.0 release are mono-repo and documentation!

### Mono-repo

In 4.0 we've split the `instructure-ui` library into a bunch of smaller libraries
and we're publishing them all as separate modules to NPM.

This should make it easier to upgrade going forward. (e.g you can upgrade to a
patch or minor release of [@instructure/ui-core](#ui-core) without upgrading
[@instructure/ui-themeable](#ui-themeable)).

Unfortunately this also means that paths for imports will have to change when applying
this upgrade.

However, the codemod script provided by [@instructure/ui-codemods](#ui-codemods)
should help with that, and you can see what paths have changed in the `ui-core/config/imports.config.json` file.

### Documentation

The [@instructure/ui-docs-plugin](#ui-docs-plugin) module has gotten an overhaul and now supports
[JSDoc](http://usejsdoc.org/) and generates documentation from any file format that
supports JS style code blocks, in addition to markdown.

All of the utilities, and packages have been documented, so finding your way
around the libraries and seeing how they fit together should be a lot easier.

### Bug Fixes

- **Alert:** Announce live region content in the docs ([493440a](https://github.com/instructure/instructure-ui/commit/493440a))
- **Autocomplete:** add calls for onInputChange ([33ad3cb](https://github.com/instructure/instructure-ui/commit/33ad3cb))
- **Autocomplete,Codepen:** Codepen examples should render ([36ef124](https://github.com/instructure/instructure-ui/commit/36ef124))
- **Autocomplete,Menu,Dialog:** Prevent esc from closing Dialog ([284eeed](https://github.com/instructure/instructure-ui/commit/284eeed))
- **Avatar:** include canvas theme generator ([dc27b6a](https://github.com/instructure/instructure-ui/commit/dc27b6a))
- **build:** ignore lib directories ([cb56606](https://github.com/instructure/instructure-ui/commit/cb56606))
- **build:** Use local version of yarn for scripts ([fcf7732](https://github.com/instructure/instructure-ui/commit/fcf7732))
- **build:** use relative paths for entries so that app rebuilds in dev ([f60d94d](https://github.com/instructure/instructure-ui/commit/f60d94d))
- **Button:** Correct fluidWidth Button heights ([5ede261](https://github.com/instructure/instructure-ui/commit/5ede261))
- **CheckboxGroup,RadioInputGroup:** Link messages to inputs for SR ([fba6550](https://github.com/instructure/instructure-ui/commit/fba6550))
- **documentation:** Examples should have valid URLs for hrefs ([18eeaa4](https://github.com/instructure/instructure-ui/commit/18eeaa4))
- **FileDrop:** make input sibling of label ([d892cff](https://github.com/instructure/instructure-ui/commit/d892cff))
- **Forms:** fix css placeholder color ([7c63393](https://github.com/instructure/instructure-ui/commit/7c63393))
- **Forms:** Update size prop ([95ecfd2](https://github.com/instructure/instructure-ui/commit/95ecfd2))
- **Grid:** width and offset not working ([1a2fa45](https://github.com/instructure/instructure-ui/commit/1a2fa45))
- **Grid:** GridCol with width="auto" should not shrink ([ae82286](https://github.com/instructure/instructure-ui/commit/ae82286))
- **Mask:** Prevent mask from calling onDismiss when defaultPrevented ([4f42ad0](https://github.com/instructure/instructure-ui/commit/4f42ad0))
- **Mask:** Update Mask example text ([77deb7e](https://github.com/instructure/instructure-ui/commit/77deb7e))
- **Modal:** Modify modal to dismiss for Mask click instead of document ([64f6816](https://github.com/instructure/instructure-ui/commit/64f6816))
- **ToggleDetails:** Fix fluidWidth prop / updates ([de9ef24](https://github.com/instructure/instructure-ui/commit/de9ef24))
- **ui-docs-client:** Fix navigation issues ([193399e](https://github.com/instructure/instructure-ui/commit/193399e))
- **ui-docs-client:** Make version link to changelog ([581fca4](https://github.com/instructure/instructure-ui/commit/581fca4))

### Features

- **Autocomplete:** implement value getter ([1a8a730](https://github.com/instructure/instructure-ui/commit/1a8a730))
- **ui-codemods:** Adding codemod for updating imports ([f4907cb](https://github.com/instructure/instructure-ui/commit/f4907cb))
- **build:** Monorepo second pass ([5fae316](https://github.com/instructure/instructure-ui/commit/5fae316))
- **build:** Monorepo, yarn workspaces and Lerna setup ([edd71af](https://github.com/instructure/instructure-ui/commit/edd71af))
- **DateInput:** Add conversion status as part of onDateChange ([1ecb819](https://github.com/instructure/instructure-ui/commit/1ecb819))
- **Forms:** Update component font sizes ([13f77c6](https://github.com/instructure/instructure-ui/commit/13f77c6))
- **List:** Remove margin from unstyled list item ([0e39d75](https://github.com/instructure/instructure-ui/commit/0e39d75))
- **ToggleDetails:** add controllable behavior ([f767b50](https://github.com/instructure/instructure-ui/commit/f767b50))
- **ui-docs-plugin:** Doc comment blocks in all file types & JSdocs ([6189147](https://github.com/instructure/instructure-ui/commit/6189147))
- **ui-docs-plugin:** Integrate react-axe in dev mode ([6a29682](https://github.com/instructure/instructure-ui/commit/6a29682))
- **ui-utils:** Add jsdocs for util functions ([c6b5834](https://github.com/instructure/instructure-ui/commit/c6b5834))

### BREAKING CHANGES

- **Autocomplete,Codepen:** JS examples will need to include a call to render and will need to
  include `render: false` as front matter inside the code block
- **ui-docs-plugin:** Inverse examples will need to include `inverse: true` as front matter inside
  the code block
- **Typography,Text:** Typography component is renamed to Text, so
  imports/requires will need to be updated (it's added to the codemod
  config in ui-core)
- **Forms:** The font size of the components will have increased
- **Forms:** Font-sizes for `large` and `small`
  simple RadioInputs and Checkboxes have changed. In
  particular, Checkbox toggles have gone from using the
  same font-size for every size to changing the
  font-size based on the `size` prop (to be
  consistent with other InstUI components).
- **List:** ListItem with `unstyled` variant won't have margins.
- **build:** Imports of instructure-ui/babel/, instructure-ui/lib/themeable and
  instructure-ui/lib/themes will need to be updated
- **build:** Imports of instructure-ui and ui-docs packages will
  need to be updated to use the new packages: @instructure/ui-core, @instructure/ui-codemods, @instructure/ui-config
- **build:** Imports of ui-docs will need to be updated to: @instructure/ui-docs-plugin, @instructure/ui-docs-client
- **Autocomplete:** onInputChange prop now has a new argument providing the
  value and the event argument is now nullable
- **ToggleDetails:** expanded prop now means ToggleDetails is controlled
  and defaultExpanded prop fills the same job expanded did previously

<a name="3.4.0"></a>

# [3.4.0](https://github.com/instructure/instructure-ui/compare/v3.3.1...v3.4.0) (2017-09-12)

### Bug Fixes

- **babel:** Warn on unlocatable css imports ([c6d82fc](https://github.com/instructure/instructure-ui/commit/c6d82fc))

### Features

- **themeing:** Allow ignoring certain files ([c24e4bc](https://github.com/instructure/instructure-ui/commit/c24e4bc))

<a name="3.3.1"></a>

## [3.3.1](https://github.com/instructure/instructure-ui/compare/v3.3.0...v3.3.1) (2017-09-11)

### Bug Fixes

- **Autocomplete:** Autocomplete clears text on select ([143ce14](https://github.com/instructure/instructure-ui/commit/143ce14))
- **Container:** add missing prop-type ([946604d](https://github.com/instructure/instructure-ui/commit/946604d))
- **DateInput:** Fix multiple setState calls via input ref function ([0cce6d7](https://github.com/instructure/instructure-ui/commit/0cce6d7))
- **file-drop:** Fix dropping the same file twice ([34aa303](https://github.com/instructure/instructure-ui/commit/34aa303))
- **Modal:** Added fullScreen prop to Mask component ([7ddea42](https://github.com/instructure/instructure-ui/commit/7ddea42))
- **Modal:** disable page scrolling when fullScreen prop is set ([207780e](https://github.com/instructure/instructure-ui/commit/207780e))
- **themeable:** Allow multiple themeable components with the same name ([779fc7d](https://github.com/instructure/instructure-ui/commit/779fc7d))

<a name="3.3.0"></a>

# [3.3.0](https://github.com/instructure/instructure-ui/compare/v3.2.0...v3.3.0) (2017-09-06)

### Bug Fixes

- **Alert:** Apply a11y theme to added alerts ([531a4ad](https://github.com/instructure/instructure-ui/commit/531a4ad))
- **Autocomplete:** add index argument to formatSelectedOption ([a7dfccb](https://github.com/instructure/instructure-ui/commit/a7dfccb))
- **Autocomplete:** Add more end padding to input ([4496b4a](https://github.com/instructure/instructure-ui/commit/4496b4a))
- **Checkbox:** Add min-width rule to label ([4e35459](https://github.com/instructure/instructure-ui/commit/4e35459))
- **ContextBox,Position:** ContextBox positioning is incorrect ([0e44db0](https://github.com/instructure/instructure-ui/commit/0e44db0))
- **DateInput:** Make popover target the input element ([5ad19e7](https://github.com/instructure/instructure-ui/commit/5ad19e7))
- **DatePicker:** DatePicker UI improvements ([b0872ce](https://github.com/instructure/instructure-ui/commit/b0872ce))
- **Modal:** Max-width for Modal content ([af0607c](https://github.com/instructure/instructure-ui/commit/af0607c))
- **Modal:** positioned content breaks out of Modal ([9ef840a](https://github.com/instructure/instructure-ui/commit/9ef840a))
- **Popover:** Fix focus trapping to work with Menu ([bfcccf4](https://github.com/instructure/instructure-ui/commit/bfcccf4))
- **Popover,Dialog:** Prevent Popover jumping to bottom of screen ([426f4ff](https://github.com/instructure/instructure-ui/commit/426f4ff))
- **Position:** fix out-of-bounds calculation for Position ([9c1aa4b](https://github.com/instructure/instructure-ui/commit/9c1aa4b))

### Features

- **TabList:** Add tabRef prop to TabPanel ([77a8def](https://github.com/instructure/instructure-ui/commit/77a8def))

### Performance Improvements

- **lib/util/time.js:** Don't force all locales to be included in bundle ([6a62bd4](https://github.com/instructure/instructure-ui/commit/6a62bd4))

<a name="3.2.0"></a>

# [3.2.0](https://github.com/instructure/instructure-ui/compare/v3.1.0...v3.2.0) (2017-08-18)

### Bug Fixes

- **Autocomplete:** adds optionsMaxWidth prop to Autocomplete ([f2e0f2f](https://github.com/instructure/instructure-ui/commit/f2e0f2f))
- **button:** Firefox - Return button needs to be pressed twice ([4a6fe9f](https://github.com/instructure/instructure-ui/commit/4a6fe9f))

### Features

- **autocomplete:** Change autocomplete min-width ([03a7652](https://github.com/instructure/instructure-ui/commit/03a7652))

<a name="3.1.0"></a>

# [3.1.0](https://github.com/instructure/instructure-ui/compare/v3.0.0...v3.1.0) (2017-08-16)

### Bug Fixes

- **autocomplete:** add min-width to autocomplete ([587f074](https://github.com/instructure/instructure-ui/commit/587f074))
- **build:** release script should run the deploy ([3ed1b20](https://github.com/instructure/instructure-ui/commit/3ed1b20))
- **codepen:** use the correct format for js_external param ([9398a93](https://github.com/instructure/instructure-ui/commit/9398a93))
- **NumberInput:** Fix hidden arrows in Firefox ([727609c](https://github.com/instructure/instructure-ui/commit/727609c))
- **Position:** ContextBox arrow should be correct in example ([4406d57](https://github.com/instructure/instructure-ui/commit/4406d57))
- **warning:** use console.error instead of throwing errors ([5aa3a7b](https://github.com/instructure/instructure-ui/commit/5aa3a7b))

### Features

- **Checkbox,CheckboxGroup:** Add Readonly to Checkbox values ([a77624f](https://github.com/instructure/instructure-ui/commit/a77624f))
- **RadioInput:** Allow readonly on radioinput values ([5248571](https://github.com/instructure/instructure-ui/commit/5248571))

<a name="3.0.0"></a>

# [3.0.0](https://github.com/instructure/instructure-ui/compare/v2.5.0...v3.0.0) (2017-08-08)

This release is all about dialogs. We've made a new [Dialog](#Dialog) component, and
we're now using it in [Popover](#Popover), [Modal](#Modal), and [Tray](#Tray), so
that they all get the new functionality and have a consistent API.

We've also done a lot of property renaming to also help with that consistency and
developer UX going forward.

Note: We've included a codemod and DEV environment warnings to make it easy to update
your code to use the new property names.

### BREAKING CHANGES

To help with this upgrade, deprecated props should now emit console warnings in DEV
environments. You can also run the codemod to update properties for this release:

```sh
yarn add @instructure/ui-codemods
```

```sh
jscodeshift -t node_modules/@instructure/ui-codemods/lib/updatePropNames.js <path> --config=node_modules/@instructure/ui-core/config/propNames.config.json
```

- **DateInput:** add `value` prop for controlled component support
- **build:** `themeable.config.js` now required for babel preset.
- **DateInput, DatePicker:** callback function arguments changed
- **Table:** deprecated props
- **Portal, Position, Overlay, Modal, Tray, Popover:** deprecated props
- **Menu, PopoverMenu:** deprecated props
- **Tag:** deprecated props
- **Alert:** deprecated props

### Bug Fixes

- **Autocomplete:** Add z-index to avoid overlap ([a588081](https://github.com/instructure/instructure-ui/commit/a588081))
- **Autocomplete:** fix duplicate calls to onChange ([856e67b](https://github.com/instructure/instructure-ui/commit/856e67b))
- **Autocomplete:** Make options menu expand to full input width ([d6dfe87](https://github.com/instructure/instructure-ui/commit/d6dfe87))
- **Autocomplete:** Resolve VO issues ([e4d4592](https://github.com/instructure/instructure-ui/commit/e4d4592))
- **Autocomplete:** The options list should close on select ([d672875](https://github.com/instructure/instructure-ui/commit/d672875))
- **Autocomplete:** visual bug fixes ([27d858b](https://github.com/instructure/instructure-ui/commit/27d858b))
- **Billboard, omitProp 'padding':** don't allow padding to get styled ([c860d3f](https://github.com/instructure/instructure-ui/commit/c860d3f))
- **build:** Remove `.js` from theme import in template ([cad860e](https://github.com/instructure/instructure-ui/commit/cad860e))
- **Button:** buttonRef prop should return the button DOM element ([29474cd](https://github.com/instructure/instructure-ui/commit/29474cd))
- **Button:** Fix :focus ring issue in Firefox ([430cf7d](https://github.com/instructure/instructure-ui/commit/430cf7d))
- **Button, fluidWidth:** replace min-height with top/bottom padding ([30b3073](https://github.com/instructure/instructure-ui/commit/30b3073))
- **Button, omitProp 'padding':** padding was getting passed down through ([c005760](https://github.com/instructure/instructure-ui/commit/c005760))
- **Checkbox:** Make size prop work for CheckboxFacade ([53523f8](https://github.com/instructure/instructure-ui/commit/53523f8))
- **DateInput:** Make props align better with controlled and uncontrolled ([712447d](https://github.com/instructure/instructure-ui/commit/712447d))
- **DateInput, DatePicker:** Provide the event object in the callback arg ([37cd10a](https://github.com/instructure/instructure-ui/commit/37cd10a))
- **DatePicker:** Fix :focus states in Edge 15 ([ae620ef](https://github.com/instructure/instructure-ui/commit/ae620ef))
- **dependencies:** Resolve empty styles in transpiled JS ([f79c154](https://github.com/instructure/instructure-ui/commit/f79c154))
- **Dialog:** Render Dialog example outside aria-hidden region ([3b614db](https://github.com/instructure/instructure-ui/commit/3b614db))
- **docs:** Upgrade ui-docs to prevent theme conflicts ([db23135](https://github.com/instructure/instructure-ui/commit/db23135))
- **ensureSingleChild:** Fix ensureSingleChild when child is a string ([f796ca0](https://github.com/instructure/instructure-ui/commit/f796ca0))
- **FormFieldGroup:** Handle null children ([9b9019a](https://github.com/instructure/instructure-ui/commit/9b9019a))
- **generate:** Fix the component template for the generate task ([76d86f0](https://github.com/instructure/instructure-ui/commit/76d86f0))
- **Heading, omitProp 'padding':** don't allow padding to get passed down ([c4dbd6b](https://github.com/instructure/instructure-ui/commit/c4dbd6b))
- **Image, omitProps 'padding':** keep padding from getting passed down f ([df1c2ec](https://github.com/instructure/instructure-ui/commit/df1c2ec))
- **lint:** lint errors shouldn't fail build when debugging ([5e21641](https://github.com/instructure/instructure-ui/commit/5e21641))
- **List, omitProps 'padding':** don't let padding get styled ([9fa375e](https://github.com/instructure/instructure-ui/commit/9fa375e))
- **Media, omitProps 'padding':** padding should not be a media property ([d966622](https://github.com/instructure/instructure-ui/commit/d966622))
- **Menu,PopoverMenu:** Menu flyouts should close onSelect ([b8185a0](https://github.com/instructure/instructure-ui/commit/b8185a0))
- **Pagination, omitProps 'margin/padding':** don't allow margin/padding ([3d27f40](https://github.com/instructure/instructure-ui/commit/3d27f40))
- **Pill, omitProps 'padding':** dont' allow padding to be added as a pro ([7b8502f](https://github.com/instructure/instructure-ui/commit/7b8502f))
- **PopoverMenu,MenuItemFlyout:** Only close flyout on ESC press ([a767adf](https://github.com/instructure/instructure-ui/commit/a767adf))
- **Position:** Fix mountNode prop in rel position container ([c59c339](https://github.com/instructure/instructure-ui/commit/c59c339))
- **Position:** Negative offsets should work ([7c35e8f](https://github.com/instructure/instructure-ui/commit/7c35e8f))
- **Table:** Deprecate the tableData prop ([5c9a5f6](https://github.com/instructure/instructure-ui/commit/5c9a5f6))
- **Table, omitProps 'padding':** don't allow padding to be added as a pr ([67c79e3](https://github.com/instructure/instructure-ui/commit/67c79e3))
- **Tag, omitProps 'padding':** don't allow padding to be added as a prop ([fcb251c](https://github.com/instructure/instructure-ui/commit/fcb251c))
- **themeable:** Fix transform-themable with empty css files ([1d05744](https://github.com/instructure/instructure-ui/commit/1d05744))
- **themeable:** Polyfill Edge 15 until improved css var support ([427a13c](https://github.com/instructure/instructure-ui/commit/427a13c))
- **TreeBrowser:** Component broken in Edge v15 ([f6aab8b](https://github.com/instructure/instructure-ui/commit/f6aab8b))

### Features

- **Autocomplete:** Adds editable prop to Autocomplete ([15c70d1](https://github.com/instructure/instructure-ui/commit/15c70d1))
- **Button, Link:** Add inverse link variants to Link and Button ([8b499c5](https://github.com/instructure/instructure-ui/commit/8b499c5))
- **CloseButton:** Add a CloseButton component ([7475cb2](https://github.com/instructure/instructure-ui/commit/7475cb2))
- **DateInput:** Return raw input for onDateChange ([9195dd1](https://github.com/instructure/instructure-ui/commit/9195dd1))
- **Dialog:** Add a Dialog component ([0c197e1](https://github.com/instructure/instructure-ui/commit/0c197e1))
- **Mask:** Add a Mask component ([5db3aa2](https://github.com/instructure/instructure-ui/commit/5db3aa2))
- **Popover:** Add Dialog component behavior to Popover ([fcb2b89](https://github.com/instructure/instructure-ui/commit/fcb2b89))
- **Position:** Add 'stretch', 'constrain' and 'over' props ([6930e83](https://github.com/instructure/instructure-ui/commit/6930e83))
- **Spinner:** Add x-small Spinner size ([14e49e6](https://github.com/instructure/instructure-ui/commit/14e49e6))
- **SVGIcon,InlineSVG:** Add icon components and new rotation prop ([02cd4b5](https://github.com/instructure/instructure-ui/commit/02cd4b5))
- **Modal:** Add Dialog component behavior to Modal ([8597802](https://github.com/instructure/instructure-ui/commit/8597802))
- **Tray:** Add Dialog component behavior to Tray ([ffd181e](https://github.com/instructure/instructure-ui/commit/ffd181e))

<a name="2.5.0"></a>

# [2.5.0](https://github.com/instructure/instructure-ui/compare/v2.4.0...v2.5.0) (2017-06-20)

### Bug Fixes

- **Autocomplete:** Fix apply a11y theme ([0e6c3b3](https://github.com/instructure/instructure-ui/commit/0e6c3b3))
- **Autocomplete:** fix typo in autocomplete prop documentation ([ce8bad9](https://github.com/instructure/instructure-ui/commit/ce8bad9))
- **Container:** Fix Transition issue with children visibility ([0ec49ab](https://github.com/instructure/instructure-ui/commit/0ec49ab))
- **DateInput:** Preserve time portion of provided value across date selections ([bb46db1](https://github.com/instructure/instructure-ui/commit/bb46db1))
- **NumberInput:** make arrows work for large numbers ([99b7d70](https://github.com/instructure/instructure-ui/commit/99b7d70))
- **TextInput:** Handle icons better ([5fc761b](https://github.com/instructure/instructure-ui/commit/5fc761b))
- **themeable:** CSS variables polyfill shouldn't scope root selectors ([1545a8f](https://github.com/instructure/instructure-ui/commit/1545a8f))
- **themeable:** IE11 CSS variable polyfill should scope media queries ([1f54b62](https://github.com/instructure/instructure-ui/commit/1f54b62))

### Features

- **Alert:** Add live region support and transitions ([948b00d](https://github.com/instructure/instructure-ui/commit/948b00d))
- **Autocomplete:** Added 'multiple' feature ([520a005](https://github.com/instructure/instructure-ui/commit/520a005))
- **Badge:** Support rtl text ([3bce62f](https://github.com/instructure/instructure-ui/commit/3bce62f))
- **Breadcrumb:** Support rtl text for breadcrumb ([46c9ecf](https://github.com/instructure/instructure-ui/commit/46c9ecf))
- **Button:** Support rtl text ([6f64f5d](https://github.com/instructure/instructure-ui/commit/6f64f5d))
- **Checkbox:** Support rtl text in checkbox ([9038f86](https://github.com/instructure/instructure-ui/commit/9038f86))
- **ContextBox:** Support rtl text in ContextBox ([7747bef](https://github.com/instructure/instructure-ui/commit/7747bef))
- **Docs, ColorSwatch:** Support rtl text in ColorSwatch ([9237071](https://github.com/instructure/instructure-ui/commit/9237071))
- **FormField, TextInput:** Support rtl text for text inputs ([c7dbdc2](https://github.com/instructure/instructure-ui/commit/c7dbdc2))
- **FormFieldLayout:** Support rtl text ([2445616](https://github.com/instructure/instructure-ui/commit/2445616))
- **GridCol:** Support rtl text in GridCol ([cb687fd](https://github.com/instructure/instructure-ui/commit/cb687fd))
- **List:** Support rtl text in List ([56b6541](https://github.com/instructure/instructure-ui/commit/56b6541))
- **Menu:** Support rtl text in Menu ([08b5253](https://github.com/instructure/instructure-ui/commit/08b5253))
- **Modal:** Support rtl text in modal ([1d340b5](https://github.com/instructure/instructure-ui/commit/1d340b5))
- **NumberInput:** Support rtl text in NumberInput ([9a9a878](https://github.com/instructure/instructure-ui/commit/9a9a878))
- **RadioInput:** Support rtl text in RadioInput ([377b150](https://github.com/instructure/instructure-ui/commit/377b150))
- **Select:** Support rtl text in Select ([7caf740](https://github.com/instructure/instructure-ui/commit/7caf740))
- **Tag:** Support rtl text in Tag ([ef69bfb](https://github.com/instructure/instructure-ui/commit/ef69bfb))
- **TextArea:** Support rtl text in TextArea ([cd58264](https://github.com/instructure/instructure-ui/commit/cd58264))
- **ToggleDetails:** Support rtl in ToggleDetails ([5e8aad4](https://github.com/instructure/instructure-ui/commit/5e8aad4))
- **TreeBrowser:** a11y navigation improvements ([272c873](https://github.com/instructure/instructure-ui/commit/272c873))
- **TreeBrowser:** Support rtl text in TreeBrowser ([9e6b91e](https://github.com/instructure/instructure-ui/commit/9e6b91e))

<a name="2.4.0"></a>

# [2.4.0](https://github.com/instructure/instructure-ui/compare/v2.3.0...v2.4.0) (2017-06-12)

### Bug Fixes

- **Badge:** Make it possible to add SR-only text ([4e3737f](https://github.com/instructure/instructure-ui/commit/4e3737f))
- **DateInput:** add messages to date input ([1d18fc0](https://github.com/instructure/instructure-ui/commit/1d18fc0))
- **themeable:** Remove all 'ms-' hacks for non-IE browsers ([0a491de](https://github.com/instructure/instructure-ui/commit/0a491de))
- **NumberInput:** NumberInput bug fix ([ea84a69](https://github.com/instructure/instructure-ui/commit/ea84a69))
- **themeable:** default theme overrides aren't applied to components ([e58424f](https://github.com/instructure/instructure-ui/commit/e58424f))

### Features

- **Grid:** Forward aria/role attributes on <Grid> components ([04adaea](https://github.com/instructure/instructure-ui/commit/04adaea))
- **TabList:** Deprecate 'accordion' variant ([30c7a2d](https://github.com/instructure/instructure-ui/commit/30c7a2d))
- **TimeInput:** Add a TimeInput component ([78201d3](https://github.com/instructure/instructure-ui/commit/78201d3))
- **TreeBrowser:** Add expanded/defaultExpanded props ([52a6ce1](https://github.com/instructure/instructure-ui/commit/52a6ce1))
- **Breadcrumb:** Add onClick to BreadcrumbLink ([c6af374](https://github.com/instructure/instructure-ui/commit/c6af374))

<a name="2.3.0"></a>

# [2.3.0](https://github.com/instructure/instructure-ui/compare/v2.2.2...v2.3.0) (2017-06-01)

### Bug Fixes

- **Badge:** Make SVGs display block ([102207f](https://github.com/instructure/instructure-ui/commit/102207f))
- **codepen examples:** fix codepen example links ([866af50](https://github.com/instructure/instructure-ui/commit/866af50))
- **DatePicker:** Make DatePicker KO navigable with arrow keys ([059f947](https://github.com/instructure/instructure-ui/commit/059f947))
- **npm:** Update shrinkwrap file so app compiles again ([0ec660a](https://github.com/instructure/instructure-ui/commit/0ec660a))
- **NumberInput:** Fixed-width input layout bug ([fa6d9b8](https://github.com/instructure/instructure-ui/commit/fa6d9b8))
- **NumberInput:** support i18n ([4e814f5](https://github.com/instructure/instructure-ui/commit/4e814f5))

### Features

- **Autocomplete:** Add an Autocomplete component ([d3e0d47](https://github.com/instructure/instructure-ui/commit/d3e0d47))
- **List:** Add List component ([1ee5c4d](https://github.com/instructure/instructure-ui/commit/1ee5c4d))

<a name="2.2.2"></a>

## [2.2.2](https://github.com/instructure/instructure-ui/compare/v2.2.1...v2.2.2) (2017-05-22)

### Bug Fixes

- **MenuItem:** Prevent onSelect from firing twice ([2c67d78](https://github.com/instructure/instructure-ui/commit/2c67d78))

<a name="2.2.1"></a>

## [2.2.1](https://github.com/instructure/instructure-ui/compare/v2.2.0...v2.2.1) (2017-05-22)

### Bug Fixes

- **Menu:** Prevent UL margin style overrides ([4522876](https://github.com/instructure/instructure-ui/commit/4522876))
- **ToolTip:** Events on the child of Trigger not being passed through to Popover ([69513b8](https://github.com/instructure/instructure-ui/commit/69513b8))
- **MenuItem,Button:** should support target="\_blank" ([99b8544](https://github.com/instructure/instructure-ui/commit/99b8544))
- **MenuItemFlyout:** Expose ref for flyout content ([5e0622e](https://github.com/instructure/instructure-ui/commit/5e0622e))

<a name="2.2.0"></a>

## [2.2.0](https://github.com/instructure/instructure-ui/compare/v2.1.1...v2.2.0) (2017-05-22)

### Bug Fixes

- **Position:** Fix flaky Position test for Firefox ([8ea348d](https://github.com/instructure/instructure-ui/commit/8ea348d))
- **Button:** Fix heights and add icon support ([faef77a](https://github.com/instructure/instructure-ui/commit/faef77a))
- **ToggleDetails:** Fix button type and fluidWidth ([e1da0f4](https://github.com/instructure/instructure-ui/commit/e1da0f4))
- **Modal:** Fix fullscreen in safari cutting off content ([d1d4ec7](https://github.com/instructure/instructure-ui/commit/d1d4ec7))
- **containerQuery:** Should support ems ([4a09603](https://github.com/instructure/instructure-ui/commit/4a09603))
- **sinon-chai:** Use the correct sinon-chai testing assertions ([453a211](https://github.com/instructure/instructure-ui/commit/453a211))

### Features

- **ApplyTheme:** Make accessible themes 'immutable' ([144a4fb](https://github.com/instructure/instructure-ui/commit/144a4fb))
- **MenuFlyout:** Add MenuFlyout option to Menu ([6ea4f71](https://github.com/instructure/instructure-ui/commit/6ea4f71))

<a name="2.1.1"></a>

## [2.1.1](https://github.com/instructure/instructure-ui/compare/v2.1.0...v2.1.1) (2017-05-18)

### Bug Fixes

- **build:** Fix compilation errors from missing moment-timezone ([501184d](https://github.com/instructure/instructure-ui/commit/501184d))

<a name="2.1.0"></a>

# [2.1.0](https://github.com/instructure/instructure-ui/compare/v2.0.0...v2.1.0) (2017-05-17)

### Bug Fixes

- **Button:** fix display getting overridden ([0409876](https://github.com/instructure/instructure-ui/commit/0409876))
- **requestAnimationFrame:** requestAnimationFrame util should fall back ([2352de8](https://github.com/instructure/instructure-ui/commit/2352de8))
- **Tag, Pagination:** fix margin-padding values ([e34eb57](https://github.com/instructure/instructure-ui/commit/e34eb57))
- **text-align:** Fix text alignment CSS rules for IE ([1c22ba6](https://github.com/instructure/instructure-ui/commit/1c22ba6))
- **themes:** Provide a way to import accessible themes separately ([7e556df](https://github.com/instructure/instructure-ui/commit/7e556df))
- **Transition:** Fix Transition component example ([c197cba](https://github.com/instructure/instructure-ui/commit/c197cba))

### Features

- **Badge:** Add Badge component ([3247199](https://github.com/instructure/instructure-ui/commit/3247199))
- **Button:** add a danger variant ([7d741aa](https://github.com/instructure/instructure-ui/commit/7d741aa))
- **DatePicker, DateInput:** Add DatePicker and DateInput components ([457dea7](https://github.com/instructure/instructure-ui/commit/457dea7))
- **NumberInput:** Add a NumberInput component ([c37afdc](https://github.com/instructure/instructure-ui/commit/c37afdc))

<a name="2.0.0"></a>

# [2.0.0](https://github.com/instructure/instructure-ui/compare/v1.4.1...v2.0.0) (2017-05-10)

### Bug Fixes

- **release:** Fix typo in release script ([9850924](https://github.com/instructure/instructure-ui/commit/9850924))
- **Spinner:** Fix illegal rule console warning ([d0820aa](https://github.com/instructure/instructure-ui/commit/d0820aa))
- **TabList:** Fix TabList transitions and unmountOnExit ([fcc5961](https://github.com/instructure/instructure-ui/commit/fcc5961))
- **themes:** Don't depend on import order for themeable components, themes ([10396c8](https://github.com/instructure/instructure-ui/commit/10396c8))

### Dependencies and Build

- Remove UMD output and build scripts ([5d5eb65](https://github.com/instructure/instructure-ui/commit/5d5eb65))
- Upgrade React to the latest version ([c422be7](https://github.com/instructure/instructure-ui/commit/c422be7))

### API Changes

- **Avatar:** Update the Avatar component API ([56f4eab](https://github.com/instructure/instructure-ui/commit/56f4eab))
- **Container:** Make `size` property values consistent ([f75465a](https://github.com/instructure/instructure-ui/commit/f75465a))
- **isBlock:** Replace `isBlock` props with `inline` ([c1dcdff](https://github.com/instructure/instructure-ui/commit/c1dcdff))
- **ToggleDetails:** Update the ToggleDetails component API ([c8348b5](https://github.com/instructure/instructure-ui/commit/c8348b5))
- **RTL support:** Replace left/right with start/end ([c855ea1](https://github.com/instructure/instructure-ui/commit/c855ea1))
- **Grid:** Change breakpoints and media to use 'small', 'medium', etc. ([15f592a](https://github.com/instructure/instructure-ui/commit/15f592a))

### Features

- **Button:** Wrap text when 'isBlock' prop is set ([d8af67d](https://github.com/instructure/instructure-ui/commit/d8af67d))
- **Pagination:** Add Pagination ([76ee0f0](https://github.com/instructure/instructure-ui/commit/76ee0f0))
- **Pill:** Add Pill component ([354795c](https://github.com/instructure/instructure-ui/commit/354795c))
- **RTL support:** Rename placement props ([099795a](https://github.com/instructure/instructure-ui/commit/099795a))
- **Tag:** Add Tag component ([6a0d804](https://github.com/instructure/instructure-ui/commit/6a0d804))

### Upgrade Guide

We've introduced some improved API and component changes that are not backwards compatible with previous versions. To help with migrating to 2.x, here is a list of specific areas where changes will be required in order to upgrade.

#### Build and Dependency Updates

- **React 0.14.9 or 15.4.0 is required**
- **UMD format is no longer supported**
- **instructure-icons is now a peer dependency**

#### Themes no longer dependent on import order

You no longer have to call `setDefaultTheme`. If you import just the theme that you need, it will be used as the default (otherwise the first theme imported will be the default).

If you'd like to add user overrides or toggle on the a11y version, you can do:

```
import { canvas } from 'instructure-ui/lib/themes'
canvas.use({ accessible: true, overrides: brandVariables })
```

Note: this also splits out the a11y themes from the base so they can be
imported separately.

BREAKING CHANGES:

- removed `ApplyTheme.setDefaultTheme`
- removed `themeable.setDefaultTheme`
- trigger a11y themes using `theme.use()`

#### `size` prop changes

Camel-case values in `Container` component `margin` and `padding` props will need to be changed to use dashes (for consistency with other components).

<table>
  <caption> Alert, Avatar, Billboard, Breadcrumb, Button, ContextBox, Heading, Image, Link, Media, Modal, Pill, Progress, Rating, Spinner, Table, TabList</caption>
  <thead><tr><th>1.x</th><th>2.x</th></tr></thead>
  <tbody>
    <tr>
    <td>
    'xxxSmall'
    </td>
    <td>
    'xxx-small'
    </td>
    </tr>
    <tr>
    <td>
    'xxSmall'
    </td>
    <td>
    'xx-small'
    </td>
    </tr>
    <tr>
      <td>
      'xSmall'
      </td>
      <td>
      'x-small'
      </td>
    </tr>
    <tr>
      <td>
      'xLarge'
      </td>
      <td>
      'x-large'
      </td>
    </tr>
    <tr>
      <td>
      'xxLarge'
      </td>
      <td>
      'xx-large'
      </td>
    </tr>
  </tbody>
</table>

#### Position API Changes

Components previously using `left` and `right` for positioning have been updated to use `start` and `end` to better support RTL languages in the future.

<table>
  <caption>ContextBox, Popover, Position, Tooltip, Tray </caption>
  <thead><tr><th>1.x</th><th>2.x</th></tr></thead>
  <tbody>
    <tr>
    <td>
    placement: 'left'
    </td>
    <td>
    placement: 'start'
    </td>
    </tr>
    <tr>
    <td>
    placement: 'right'
    </td>
    <td>
    placement: 'end'
    </td>
    </tr>
    <tr>
    <td>
    placement: 'middle'
    </td>
    <td>
    placement: 'center'
    </td>
    </tr>
  </tbody>
</table>

#### `textAlign` prop Values

Components previously using `left` and `right` for the `textAlign` prop have been updated to use `start` and `end` to better support RTL languages in the future.

<table>
  <caption>Container, ContextBox, FormField, Grid, GridCol, TabList</caption>
  <thead><tr><th>1.x</th><th>2.x</th></tr></thead>
  <tbody>
    <tr>
      <td>
      textAlign: 'left'
      </td>
      <td>
      textAlign: 'start'
      </td>
    </tr>
    <tr>
      <td>
      textAlign: 'right'
      </td>
      <td>
      textAlign: 'end'
      </td>
    </tr>
  </tbody>
</table>

#### `isBlock` prop

Changes for consistency in component APIs

<table>
  <caption>Button, ToggleDetails</caption>
  <thead><tr><th>1.x</th><th>2.x</th></tr></thead>
  <tbody>
    <tr>
      <td>
      isBlock: true
      </td>
      <td>
      fluidWidth: true
      </td>
    </tr>
  </tbody>
</table>
<br/>
<table>
  <caption>Checkbox, FormField, FormFieldLayout, Image, RadioInput, Select, TextArea, TextInput, Tooltip, Transition </caption>
  <thead><tr><th>1.x</th><th>2.x</th></tr></thead>
  <tbody>
    <tr>
      <td>
      isBlock: true
      </td>
      <td>
      inline: false
      </td>
    </tr>
  </tbody>
</table>

#### `Avatar` Component API

Changes to our `<Avatar>` component:

<table>
  <thead><tr><th>1.x</th><th>2.x</th></tr></thead>
  <tbody>
    <tr>
      <td>
      userName: 'Sarah'
      </td>
      <td>
      name: 'Sarah'
      </td>
    </tr>
    <tr>
      <td>
      userImgUrl: {avatarSquare}
      </td>
      <td>
      src: {avatarSquare}
      </td>
    </tr>
  </tbody>
</table>

#### `ToggleDetails` Component API

Changes to our `<ToggleDetails>` component:

<table>
  <thead><tr><th>1.x</th><th>2.x</th></tr></thead>
  <tbody>
    <tr>
      <td>
      isExpanded
      </td>
      <td>
      expanded
      </td>
    </tr>
  </tbody>
</table>

#### Breakpoint (`startAt`) props

Changes to the allowed values for the `<Grid>` component props, with extension into a few components where we allow breakpoints to be set:

<table>
  <caption>Grid, FormFieldGroup, RadioInputGroup, CheckboxGroup</caption>
  <thead><tr><th>1.x</th><th>2.x</th></tr></thead>
  <tbody>
    <tr>
      <td>phone</td>
      <td>small</td>
    </tr>
    <tr>
      <td>tablet</td>
      <td>medium</td>
    </tr>
    <tr>
      <td>desktop</td>
      <td>large</td>
    </tr>
    <tr>
      <td>wide</td>
      <td>x-large</td>
    </tr>
  </tbody>
</table>

<a name="1.4.1"></a>

## [1.4.1](https://github.com/instructure/instructure-ui/compare/v1.4.0...v1.4.1) (2017-04-14)

<a name="1.4.0"></a>

## [1.4.0](https://github.com/instructure/instructure-ui/compare/v1.3.4...v1.4.0) (2017-04-13)

### Bug Fixes

- **MenuItemGroup:** Prevent errors when MenuItemGroup has only one child ([ec333dc](https://github.com/instructure/instructure-ui/commit/ec333dc))
- **Modal:** Focus 'Open Modal' button in Modal example when Modal closes ([ee02811](https://github.com/instructure/instructure-ui/commit/ee02811))
- **Position:** Improve Position component (for PopoverMenu bug fixes) ([3e06a07](https://github.com/instructure/instructure-ui/commit/3e06a07))
- **Rating:** Rating component should be themeable when `animateFill` pro ([ce17907](https://github.com/instructure/instructure-ui/commit/ce17907))

### Performance Improvements

- **themeable:** Update shouldComponentUpdate for themeable components ([3ad419b](https://github.com/instructure/instructure-ui/commit/3ad419b))

## 1.3.4

#### Upgrade instructure-icons @jstern

#### Prevent normalize.css from breaking the [Button](#Button) component styles @mphillips

## 1.3.3

#### Add option to show on click to [Tooltip](#Tooltip) @sburnett

## 1.3.2

#### Update onItemClick and onCollectionClick return values for [TreeBrowser](#TreeBrowser) @mberns

## 1.3.1

#### Remove PureComponent so that the library still works with React 0.14.8 @jstern

#### Call [PopoverMenu](#PopoverMenu) event handlers after setState @jstern

## 1.3.0

#### Resolve [PopoverMenu](#PopoverMenu) focus issues @sejensen

#### Only render [Portal](#Portal)/[Position](#Position) if it has content @mzabriskie

#### Add a [FileDrop](#FileDrop) component @ddoumecq

#### Update [modern](#modern) theme for [TextArea](#TextArea) @phiett

#### Add a [Container](#Container) component @chart

#### Fix console warnings for invalid placeholder [TextArea](#TextArea) and [TextInput](#TextInput) styles @jsimon

#### Fix IE11 bug with thin line on triangle for [ContextBox](#ContextBox) @phiett

#### Enter key should trigger onClick on [Button](#Button) component for any element @jstern

#### Add ellipsis prop to [Heading](#Heading) component @chart

#### [MetricsList](#MetricsList) read item label before value @cprescott

#### Fix URL to docs in the docs @eschiebel

## 1.2.0

#### Add a `trackPosition` prop to [Position](#Position) component so that positioning can be toggled on/off @mzabriskie

#### Fix [Grid](#Grid) component/remove extra padding on left and right sides @jstern

## 1.1.0

#### Fix "illegal rule inserted" console warning @jstern

#### Allow [Billboard](#Billboard) to render as a link if `href` prop is provided @chart

#### Update look of [Avatar](#Avatar) @phiett

#### Update [modern](#modern) theme for [RadioInput](#RadioInput) @phiett

#### Update [modern](#modern) theme for [Checkbox](#Checkbox) @phiett

#### Prevent referencing window at require time @bburgoyne

#### Allow [Billboard](#Billboard) to pass props to button @chart

#### Allow `inverse` close button on [Tray](#Tray) @ctennety

## 1.0.2

#### Do not focus [PopoverMenu](#PopoverMenu) trigger on mount @sejensen

#### Fix `shouldCloseOnOverlayClick` prop for [Modal](#Modal) @mzabriskie

#### Fix [PopoverMenu](#PopoverMenu) bug when MenuItems are triggered by ENTER key press @jstern

## 1.0.1

#### Fix focus state for RadioInput and Checkbox @chart

#### Fix message display for form components at `wide` screens @jstern

#### Fix focus for [Menu](#Menu) component when first item is a MenuItemGroup @sejensen

#### Add [Billboard](#Billboard) component @chart

## 1.0.0

#### Add a [Position](#Position) component @mzabriskie

#### Update design of [Checkbox](#Checkbox) `toggle` variant @chart

#### Fix [Grid](#Grid) component bugs with `spaceAround` and `spaceBetween` props in IE 11 @jstern

#### Update design of [RadioInputGroup](#RadioInputGroup) `toggle` variant @chart

#### Minimize CSS in JS bundles @jbelser

#### Update `modern` design of [Checkbox](#Checkbox) component @andy

#### Fix CSS specificity bug with [Link](#Link) component @jstern

#### Optimize style injection (using [glamor](https://github.com/threepointone/glamor) Stylesheet) @jstern

#### Import themes individually and change the API for setting the default theme. See [theme](#canvas) documentation. @jstern

#### Make box-shadows consistent (use [theme config](#canvas) for shadows) @phiett

#### Add `x-small` size to [Progress](#Progress) component @brinaca

#### Fix margins on [FormFieldLabel](#FormFieldLabel) when there is no visible label text @chart

#### Fix [Link](#Link) component in `a11y` theme @chart

#### Fix alignment of close button on [Alert](#Alert) component @phiett

#### Add `as` prop to (note `tag` and `tagName` props have been removed): @sejensen

- [AccessibleContent](#AccessibleContent)
- [Button](#Button)
- [Heading](#Heading)
- [Link](#Link)
- [PresentationContent](#PresentationContent)
- [ScreenReaderContent](#ScreenReaderContent)
- [Typography](#Typography)

#### Update [Button](#Button) for `modern` theme @andy

#### Add a `buttonRef` prop to the [Button](#Button) component @jstern

#### Replace `style` prop on [Typography](#Typography) component with `fontStyle` @jstern

#### Fix spacing on [Button](#Button) component so that it lines up with TextInput @chart

#### Fix [Progress](#Progress) component VoiceOver bug @cpalmer

#### Add focus management to [Tray](#Tray) @jcorrigan

#### Make onChange handler for [TextArea](#TextArea) consistent with TextInput @jstern

#### Add an index file to the components directory in /dist build output @jstern

#### Add focus ring to a11y theme of [Link](#Link) and [Button](#Button) components

#### Add new color `mediumLighter` to canvas and modern themes @phiett

#### Updates to [Menu](#Menu) component `checkbox` and `radio` item types @sejensen

#### Prevent errors when [Transition](#Transition) steps occur after the component unmounts @jstern

#### Ensure modern theme for [Checkbox](#Checkbox) and [RadioInput](#RadioInput) are brand vs gray @phiett

#### [ToggleDetails](#ToggleDetails) customization updates

#### Change [Checkbox](#Checkbox) and [RadioInput](#RadioInput) to dark vs brand @phiett

#### Fix bugs in [CheckboxGroup](#CheckboxGroup) and [MenuItemGroup](#MenuItemGroup) due to unintentional state modification @sejensen

#### [Popover](#Popover) refactor and bug fixes @mzabriskie

#### Fix [TextArea](#TextArea) ENTER key support and horizontal scroll on FF and IE 11 @jstern

#### Remove three Item limit from [MetricList](#MetricList) @cprescott

#### Replace [Checkbox](#Checkbox) & [RadioInput](#RadioInput) focus states with single outline state @phiett

#### Add `inline` layout option to [FormField](#FormField)/all form components

#### Add `column` layout optino to [FormFieldGroup](#FormFieldGroup), [RadioInputGroup](#RadioInputGroup), [CheckboxGroup](#CheckboxGroup) @jstern, @chart

#### Add `offset` prop to [GridCol](#GridCol) @jstern

#### Make [Tooltip](#Tooltip) default to `default` variant @jstern

#### Remove zIndex props and add them to component themes @jstern

#### Allow any trigger content for [Tooltip](#Tooltip) @jstern

#### Prevent overwriting existing keys @jstern

#### Update color theme variable names @phiett

#### Fix screen reader bugs in [Progress](#Progress) component @phiett

#### Add [TreeBrowser](#TreeBrowser) component @mberns

## 0.18.2

#### Remove babel-polyfill peer dependency (required polyfills are listed in build.config.js)

#### [Modal](#Modal) should focus close button by default

#### Add generateTheme and setDefaultTheme to both [ApplyTheme](#ApplyTheme) and themeable

#### Add Modern theme

#### Fix [Modal](#Modal) scrolling issues in FF

## 0.18.1

#### Upgrade to Webpack 2/bundle size improvements

#### Adjust [Heading](#Heading) component styles

#### Add LatoWeb to font-family to match Canvas

#### [Tray](#Tray) component updates

#### Reduce height of [Progress](#Progress) bars

## 0.18.0

#### Document theme variables for each component

#### Fix [Select](#Select) component disabled state

#### Fix [Button](#Button) component 'circle' variant in Firefox

#### [Heading](#Heading) component updates

#### Fix [Progress](#Progress)

#### Make codepens work for non jsx examples (e.g. [Modal](#Modal))

#### Updates to [Tray](#Tray) component

#### Update [TextArea](#TextArea) and [Select](#Select) focus styles

#### Add a [Canvas theme](#canvas)

#### Add an [accessible theme](#a11y)

#### Add [Media](#Media) component

## 0.17.3

#### Replace CSSTransitionGroup with [Transition](#Transition) component

#### Fix [RadioInput](#RadioInput) and [Checkbox](#Checkbox) focus issues in Safari

#### Remove `max-width` prop from the [Alert](#Alert) component

#### Fix [Transition](#Transition) component `unmountOnExit` prop

#### Add [AccessibleContent](#AccessibleContent) and [PresentationContent](#PresentationContent)

#### Upgrade instructure-icons

#### Update [Progress](#Progress) component styles

#### Add [Tray](#Tray) component

#### Update [Transition](#Transition) component styles

#### Prevent errors in the [Avatar](#Avatar) component when `userName` prop is not provided

## 0.17.2

#### Add option to [RangeInput](#RangeInput) to turn off value display

#### Fix [Popover](#Popover) bug, uninitialized state when show prop is set

#### Define all variables in theme.js for each component

#### Add a dismissable decorator

## 0.17.1

#### Added support for linux in the generate script

See [commit](https://github.com/instructure/instructure-ui/commit/a9153714552d1dd0f300421de320264140ac4912) for details.

#### Fix for [Table](#Table) component to prevent nested tables from inheriting hover or stripe styling

#### Fix for [TabList](#TabList) component `minimal`, `simple` variants so they no longer break in a flexed container

#### Fix [Modal](#Modal) component footer behavior when there is minimal body content

#### Add `zIndex` prop to the [Overlay](#Overlay) and [Popover](#Popover) components

#### Add custom chai assertion to verify that a dom element exists for testing

See [commit](https://github.com/instructure/instructure-ui/commit/fcea0dd9ee67d172a5eb04e348fb5caf0b93472d) for details.

## 0.17.0

#### Add a [Breadcrumb](#Breadcrumb) component

#### Prevent Bootstrap or other CSS from interfering with component styles

## 0.16.0

#### Add a [Modal](#Modal) component

#### Add a [Overlay](#Overlay) component

#### Add a [Portal](#Portal) component

#### Add focused getter to the [Button](#Button) component

#### Fix focus state for [Checkbox](#Checkbox) `toggle` variant

#### Fix [RangeInput](#RangeInput) passing `props` to it's input

#### Update to [Button](#Button) design

#### Update to [Select](#Select) don't set disabled attribute

#### Update [Transition](#Transition) component

## 0.15.0

#### Add a [ToggleDetails](#ToggleDetails) component

#### Add a [Table](#Table) component

#### Don't trigger [PopoverMenu](#PopoverMenu) on focus by default

#### Move [Checkbox](#Checkbox) label to the right of the toggle

#### Add a [TextArea](#TextArea) component

#### Updates to font sizes (see [Typography](#Typography) component)

## 0.14.4

#### Add getDisplayName util and use it to determine component type

## 0.14.3

#### Remove umd named define from webpack config

## 0.14.2

#### Add missing type attribute on button elements rendered by the Button component

## 0.14.1

#### Don't bundle babel-polyfill with the library

This prevents the "only one instance of babel-polyfill is allowed" errors.

## 0.14.0

### Breaking changes (code changes required to upgrade)

#### Inject Component CSS into the document

Components will now inject the required CSS into the document when they are mounted, so importing the CSS dependencies is no longer required. The usage documentation for each component has been updated to reflect this change.

#### Added babel-polyfill as a peer dependency

The components now require babel-polyfill.

#### Updates to form input components

All of the form input components now consistently handle focus and validation messages. As a result the `errors` prop is now the `messages` prop for all form inputs.

### New components and bug fixes

#### Add Progress component

See [documentation and examples](#Progress) for details.

#### Fix Spinner component animation in Firefox

See [commit](https://github.com/instructure/instructure-ui/commit/f7a0fec6bb95b1baa42e83593a01b50bdab77438) for details.

#### Remove references to the DOM at require time

This should allow for running tests using instructure-ui components without a browser.

#### Updates to colors and typography

The global colors have been updated and the required font family is now Lato. A [Typography](#Typography) component has been added.

#### Fix imports of instructure-icons components

Icons are now imported individually to reduce the overall library bundle size.

#### Prevent React warnings by removing invalid props passed down to children

#### Add levels to Heading component

The [Heading](#Heading) component now supports levels 1-5 (and a reset) and also supports overriding the root
element.
