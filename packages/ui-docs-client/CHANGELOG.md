# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [7.4.1](https://github.com/instructure/instructure-ui/compare/v7.4.0...v7.4.1) (2021-03-04)

### Bug Fixes

- **all:** Fix package imports, now everything can be imported; fix test:all in main package.json ([2f11024](https://github.com/instructure/instructure-ui/commit/2f11024))

# [7.4.0](https://github.com/instructure/instructure-ui/compare/v7.3.5...v7.4.0) (2021-02-01)

**Note:** Version bump only for package @instructure/ui-docs-client

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

**Note:** Version bump only for package @instructure/ui-docs-client

## [7.3.1](https://github.com/instructure/instructure-ui/compare/v7.3.0...v7.3.1) (2020-11-30)

**Note:** Version bump only for package @instructure/ui-docs-client

# [7.3.0](https://github.com/instructure/instructure-ui/compare/v7.2.4...v7.3.0) (2020-10-26)

**Note:** Version bump only for package @instructure/ui-docs-client

## [7.2.4](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.4) (2020-10-09)

**Note:** Version bump only for package @instructure/ui-docs-client

## [7.2.3](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.3) (2020-10-08)

**Note:** Version bump only for package @instructure/ui-docs-client

## [7.2.2](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.2) (2020-10-08)

**Note:** Version bump only for package @instructure/ui-docs-client

## [7.2.1](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.1) (2020-10-07)

**Note:** Version bump only for package @instructure/ui-docs-client

# [7.2.0](https://github.com/instructure/instructure-ui/compare/v7.1.4...v7.2.0) (2020-09-23)

**Note:** Version bump only for package @instructure/ui-docs-client

## [7.1.4](https://github.com/instructure/instructure-ui/compare/v7.1.3...v7.1.4) (2020-09-09)

**Note:** Version bump only for package @instructure/ui-docs-client

## [7.1.3](https://github.com/instructure/instructure-ui/compare/v7.1.2...v7.1.3) (2020-08-10)

**Note:** Version bump only for package @instructure/ui-docs-client

## [7.1.2](https://github.com/instructure/instructure-ui/compare/v7.1.1...v7.1.2) (2020-07-17)

**Note:** Version bump only for package @instructure/ui-docs-client

## [7.1.1](https://github.com/instructure/instructure-ui/compare/v7.1.0...v7.1.1) (2020-07-01)

**Note:** Version bump only for package @instructure/ui-docs-client

# [7.1.0](https://github.com/instructure/instructure-ui/compare/v7.0.0...v7.1.0) (2020-06-25)

**Note:** Version bump only for package @instructure/ui-docs-client

# [7.0.0](https://github.com/instructure/instructure-ui/compare/v6.26.0...v7.0.0) (2020-05-27)

### Bug Fixes

- **ui-code-editor:** make it work as a controlled component ([586de21](https://github.com/instructure/instructure-ui/commit/586de21))
- **ui-docs-client:** Make sidebar search not wrap ([6015661](https://github.com/instructure/instructure-ui/commit/6015661))

### chore

- bump minimum react version to 16.8.0 ([7a96f00](https://github.com/instructure/instructure-ui/commit/7a96f00))
- remove references to React 15 ([4bb2426](https://github.com/instructure/instructure-ui/commit/4bb2426))
- **ui-react-utils:** remove react-lifecycles-compat polyfill ([aa698ae](https://github.com/instructure/instructure-ui/commit/aa698ae))

### Features

- remove 'experimental' tag along with '\_\_dangerouslyIgnore...' ([92bf753](https://github.com/instructure/instructure-ui/commit/92bf753))
- **ui-docs-client:** add a ToggleBlockquote to be used internally for upgrade guides ([0e87dc9](https://github.com/instructure/instructure-ui/commit/0e87dc9))
- **ui-docs-client:** Docs/homepage refresh ([ee4957b](https://github.com/instructure/instructure-ui/commit/ee4957b))

### BREAKING CHANGES

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

# [6.26.0](https://github.com/instructure/instructure-ui/compare/v6.25.0...v6.26.0) (2020-04-30)

**Note:** Version bump only for package @instructure/ui-docs-client

# [6.25.0](https://github.com/instructure/instructure-ui/compare/v6.24.0...v6.25.0) (2020-04-27)

**Note:** Version bump only for package @instructure/ui-docs-client

# [6.24.0](https://github.com/instructure/instructure-ui/compare/v6.23.0...v6.24.0) (2020-04-14)

**Note:** Version bump only for package @instructure/ui-docs-client

# [6.23.0](https://github.com/instructure/instructure-ui/compare/v6.22.0...v6.23.0) (2020-04-02)

### Bug Fixes

- **ui-docs-client,ui-modal:** modalbody using undefined theme var ([66e0a16](https://github.com/instructure/instructure-ui/commit/66e0a16))

### Features

- **instui-config,canvas-ams-theme,ui-themes,ui-view:** add canvas-ams-theme ([f31849f](https://github.com/instructure/instructure-ui/commit/f31849f))
- **ui-docs-client:** update deprecated components still in use ([4543717](https://github.com/instructure/instructure-ui/commit/4543717))

# [6.22.0](https://github.com/instructure/instructure-ui/compare/v6.21.0...v6.22.0) (2020-03-16)

### Features

- **canvas-theme,ui-docs-client:** theme color docs enhancements ([69a1938](https://github.com/instructure/instructure-ui/commit/69a1938))
- **ui-docs-client:** add Google analytics to docs app ([748c1e2](https://github.com/instructure/instructure-ui/commit/748c1e2))
- **ui-docs-client:** ensure button upgrade examples render 'canvas theme' ([4d68de9](https://github.com/instructure/instructure-ui/commit/4d68de9))

# [6.21.0](https://github.com/instructure/instructure-ui/compare/v6.20.0...v6.21.0) (2020-02-26)

**Note:** Version bump only for package @instructure/ui-docs-client

# [6.20.0](https://github.com/instructure/instructure-ui/compare/v6.19.0...v6.20.0) (2020-02-13)

### Features

- **ui-docs-client:** update deprecated lifecycle in Playground ([9c6888f](https://github.com/instructure/instructure-ui/commit/9c6888f))

# [6.19.0](https://github.com/instructure/instructure-ui/compare/v6.18.0...v6.19.0) (2020-02-11)

### Features

- **ui-docs-client:** use updated Button throughout docs/components ([9f0be81](https://github.com/instructure/instructure-ui/commit/9f0be81))

# [6.18.0](https://github.com/instructure/instructure-ui/compare/v6.17.0...v6.18.0) (2020-02-04)

### Features

- **instui-config,ui-buttons,ui-themeable:** upgrade Button ([ed73df1](https://github.com/instructure/instructure-ui/commit/ed73df1))
- **ui-buttons:** Update CloseButton to use upgraded Button props ([365e0ac](https://github.com/instructure/instructure-ui/commit/365e0ac))

# [6.17.0](https://github.com/instructure/instructure-ui/compare/v6.16.0...v6.17.0) (2020-01-22)

### Bug Fixes

- Update Package READMEs and align deprecation statements ([8f892e4](https://github.com/instructure/instructure-ui/commit/8f892e4))

### Features

- **ui-docs-client:** allow for embedding code inline with markdown ([aea7989](https://github.com/instructure/instructure-ui/commit/aea7989))

# [6.16.0](https://github.com/instructure/instructure-ui/compare/v6.15.0...v6.16.0) (2019-12-13)

### Bug Fixes

- **ui-docs-client:** remove unnecessary import of ScreenReaderContent ([07d453b](https://github.com/instructure/instructure-ui/commit/07d453b))

### Features

- **ui-checkbox:** add ui-checkbox package ([94840fa](https://github.com/instructure/instructure-ui/commit/94840fa))
- **ui-docs-client:** make content within docs pages navigable via linking ([595f155](https://github.com/instructure/instructure-ui/commit/595f155))
- **ui-docs-client:** updates to compileMarkdown for id generation ([832f7b2](https://github.com/instructure/instructure-ui/commit/832f7b2))
- **ui-drawer-layout:** add ui-drawer-layout package ([2c59227](https://github.com/instructure/instructure-ui/commit/2c59227))

# [6.15.0](https://github.com/instructure/instructure-ui/compare/v6.14.0...v6.15.0) (2019-11-18)

### Features

- **ui-a11y-content:** remove experimental flag from ui-a11y-content package ([ce96006](https://github.com/instructure/instructure-ui/commit/ce96006))
- **ui-docs-client:** Add first InstUI Insider content ([acc4744](https://github.com/instructure/instructure-ui/commit/acc4744))
- **ui-docs-client,ui-elements:** ensure ui-docs-client is using Table from ui-table ([5788fce](https://github.com/instructure/instructure-ui/commit/5788fce))
- **ui-flex,ui-layout:** make ui-flex backwards compatible ([c11cc6b](https://github.com/instructure/instructure-ui/commit/c11cc6b))
- **ui-heading:** make ui-heading backwards compatible ([c4f9541](https://github.com/instructure/instructure-ui/commit/c4f9541))
- **ui-link:** Make ui-link/Link backwards compatible ([3e62c49](https://github.com/instructure/instructure-ui/commit/3e62c49))
- **ui-list:** add ui-list package ([7c867af](https://github.com/instructure/instructure-ui/commit/7c867af))
- **ui-pill:** make ui-pill backwards compatible ([480eeb7](https://github.com/instructure/instructure-ui/commit/480eeb7))
- **ui-text:** make ui-text backwards compatible ([7aabd6a](https://github.com/instructure/instructure-ui/commit/7aabd6a))
- **ui-tooltip:** make ui-tooltip backwards compatible ([7608e7c](https://github.com/instructure/instructure-ui/commit/7608e7c))
- **ui-view:** Make ui-view backwards-compatible ([7dd2a2f](https://github.com/instructure/instructure-ui/commit/7dd2a2f))

# [6.14.0](https://github.com/instructure/instructure-ui/compare/v6.13.0...v6.14.0) (2019-10-14)

### Features

- **ui-heading:** add ui-heading package ([b681432](https://github.com/instructure/instructure-ui/commit/b681432))
- **ui-link:** add ui-link package ([fa75902](https://github.com/instructure/instructure-ui/commit/fa75902))
- **ui-tooltip:** add ui-tooltip package ([2e88e8a](https://github.com/instructure/instructure-ui/commit/2e88e8a))

# [6.13.0](https://github.com/instructure/instructure-ui/compare/v6.12.0...v6.13.0) (2019-09-24)

### Features

- **ui-elements,ui-pill:** add ui-pill package for the Pill Component ([4a71024](https://github.com/instructure/instructure-ui/commit/4a71024))

# [6.12.0](https://github.com/instructure/instructure-ui/compare/v6.11.0...v6.12.0) (2019-09-17)

**Note:** Version bump only for package @instructure/ui-docs-client

# [6.11.0](https://github.com/instructure/instructure-ui/compare/v6.10.0...v6.11.0) (2019-09-16)

### Features

- **ui-a11y-content,ui-a11y:** add ui-a11y-content package ([cb49c7a](https://github.com/instructure/instructure-ui/commit/cb49c7a))
- **ui-elements,ui-img:** add ui-img package for Img Component ([c2e4e7d](https://github.com/instructure/instructure-ui/commit/c2e4e7d))
- **ui-elements,ui-text:** add ui-text Package for Text Component ([5bdb65a](https://github.com/instructure/instructure-ui/commit/5bdb65a))
- **ui-flex:** add ui-flex package ([98730ff](https://github.com/instructure/instructure-ui/commit/98730ff))
- **ui-view:** add ui-view Package for View Component ([7799577](https://github.com/instructure/instructure-ui/commit/7799577))
- **ui-view:** mark ui-view as experimental ([6b805fa](https://github.com/instructure/instructure-ui/commit/6b805fa))

# [6.10.0](https://github.com/instructure/instructure-ui/compare/v6.9.0...v6.10.0) (2019-08-27)

**Note:** Version bump only for package @instructure/ui-docs-client

# [6.9.0](https://github.com/instructure/instructure-ui/compare/v6.8.1...v6.9.0) (2019-08-07)

**Note:** Version bump only for package @instructure/ui-docs-client

## [6.8.1](https://github.com/instructure/instructure-ui/compare/v6.8.0...v6.8.1) (2019-08-02)

**Note:** Version bump only for package @instructure/ui-docs-client

# [6.8.0](https://github.com/instructure/instructure-ui/compare/v6.7.0...v6.8.0) (2019-07-31)

**Note:** Version bump only for package @instructure/ui-docs-client

# [6.7.0](https://github.com/instructure/instructure-ui/compare/v6.6.0...v6.7.0) (2019-07-15)

**Note:** Version bump only for package @instructure/ui-docs-client

# [6.6.0](https://github.com/instructure/instructure-ui/compare/v6.5.0...v6.6.0) (2019-07-03)

**Note:** Version bump only for package @instructure/ui-docs-client

# [6.5.0](https://github.com/instructure/instructure-ui/compare/v6.4.0...v6.5.0) (2019-07-01)

### Bug Fixes

- **ui-tabs:** tabbable content in a tab panel should be tabbable ([4753bd3](https://github.com/instructure/instructure-ui/commit/4753bd3))
- **ui-text-input:** update TextInput prop names ([3aedab8](https://github.com/instructure/instructure-ui/commit/3aedab8))

### Features

- **ui-docs-client:** Add What's New page to docs ([64126d6](https://github.com/instructure/instructure-ui/commit/64126d6))

# [6.4.0](https://github.com/instructure/instructure-ui/compare/v6.3.0...v6.4.0) (2019-06-13)

### Features

- **ui-forms,ui-selectable:** deprecate ui-forms select ([1f7b53d](https://github.com/instructure/instructure-ui/commit/1f7b53d))

# [6.3.0](https://github.com/instructure/instructure-ui/compare/v6.2.0...v6.3.0) (2019-05-28)

**Note:** Version bump only for package @instructure/ui-docs-client

# [6.2.0](https://github.com/instructure/instructure-ui/compare/v6.1.0...v6.2.0) (2019-05-13)

### Bug Fixes

- **ui-docs-client:** escape regexp chars in icon search term ([00b3ef9](https://github.com/instructure/instructure-ui/commit/00b3ef9))

# [6.1.0](https://github.com/instructure/instructure-ui/compare/v6.0.0...v6.1.0) (2019-05-09)

### Bug Fixes

- **ui-docs-client,ui-docs-plugin:** update icon import paths ([5a3eda2](https://github.com/instructure/instructure-ui/commit/5a3eda2))

# [6.0.0](https://github.com/instructure/instructure-ui/compare/v5.52.3...v6.0.0) (2019-05-03)

### Bug Fixes

- **ui-docs-client:** fix search icon import path ([7390556](https://github.com/instructure/instructure-ui/commit/7390556))

### Features

- remove deprecated packages/props ([1d8813c](https://github.com/instructure/instructure-ui/commit/1d8813c))
- **canvas-theme,canvas-high-contrast-theme:** separate canvas theme packages ([ef2e1d0](https://github.com/instructure/instructure-ui/commit/ef2e1d0))
- **instui-config,ui-forms:** add deprecation + codemod for old TextInput to TextInputControlled ([eb83528](https://github.com/instructure/instructure-ui/commit/eb83528))
- **ui-babel-preset:** transform member imports to full paths ([d02cc45](https://github.com/instructure/instructure-ui/commit/d02cc45))
- **ui-dom-utils,ui-react-utils,ui-color-utils:** new utils packages ([03e8ee2](https://github.com/instructure/instructure-ui/commit/03e8ee2))

### Performance Improvements

- **ui-icons,ui-icons-build:** remove default exports for React icons ([95195ee](https://github.com/instructure/instructure-ui/commit/95195ee))

### BREAKING CHANGES

- - ui-core package has been removed

## [5.52.3](https://github.com/instructure/instructure-ui/compare/v5.52.2...v5.52.3) (2019-04-25)

**Note:** Version bump only for package @instructure/ui-docs-client

## [5.52.2](https://github.com/instructure/instructure-ui/compare/v5.52.1...v5.52.2) (2019-04-17)

**Note:** Version bump only for package @instructure/ui-docs-client

## [5.52.1](https://github.com/instructure/instructure-ui/compare/v5.52.0...v5.52.1) (2019-04-08)

**Note:** Version bump only for package @instructure/ui-docs-client

# [5.52.0](https://github.com/instructure/instructure-ui/compare/v5.51.1...v5.52.0) (2019-04-03)

### Features

- **console:** remove console statements in prod env ([603c738](https://github.com/instructure/instructure-ui/commit/603c738))

## [5.51.1](https://github.com/instructure/instructure-ui/compare/v5.51.0...v5.51.1) (2019-03-30)

**Note:** Version bump only for package @instructure/ui-docs-client

# [5.51.0](https://github.com/instructure/instructure-ui/compare/v5.50.0...v5.51.0) (2019-03-29)

**Note:** Version bump only for package @instructure/ui-docs-client

# [5.50.0](https://github.com/instructure/instructure-ui/compare/v5.49.0...v5.50.0) (2019-03-28)

**Note:** Version bump only for package @instructure/ui-docs-client

# [5.49.0](https://github.com/instructure/instructure-ui/compare/v5.48.0...v5.49.0) (2019-03-22)

**Note:** Version bump only for package @instructure/ui-docs-client

# [5.48.0](https://github.com/instructure/instructure-ui/compare/v5.47.0...v5.48.0) (2019-03-18)

**Note:** Version bump only for package @instructure/ui-docs-client

# [5.47.0](https://github.com/instructure/instructure-ui/compare/v5.46.1...v5.47.0) (2019-03-15)

**Note:** Version bump only for package @instructure/ui-docs-client

## [5.46.1](https://github.com/instructure/instructure-ui/compare/v5.46.0...v5.46.1) (2019-03-13)

**Note:** Version bump only for package @instructure/ui-docs-client

# [5.46.0](https://github.com/instructure/instructure-ui/compare/v5.45.1...v5.46.0) (2019-03-12)

**Note:** Version bump only for package @instructure/ui-docs-client

## [5.45.1](https://github.com/instructure/instructure-ui/compare/v5.45.0...v5.45.1) (2019-03-12)

**Note:** Version bump only for package @instructure/ui-docs-client

# [5.45.0](https://github.com/instructure/instructure-ui/compare/v5.44.0...v5.45.0) (2019-03-11)

### Features

- A ui-prop-types package ([0fbc609](https://github.com/instructure/instructure-ui/commit/0fbc609))

# [5.44.0](https://github.com/instructure/instructure-ui/compare/v5.43.0...v5.44.0) (2019-03-01)

### Features

- **ui-buttons,ui-elements,ui-themes:** underline the Link component by default ([9a90a7f](https://github.com/instructure/instructure-ui/commit/9a90a7f)), closes [#008EE2](https://github.com/instructure/instructure-ui/issues/008EE2)

# [5.43.0](https://github.com/instructure/instructure-ui/compare/v5.42.0...v5.43.0) (2019-02-27)

**Note:** Version bump only for package @instructure/ui-docs-client

<a name="5.42.0"></a>

# [5.42.0](https://github.com/instructure/instructure-ui/compare/v5.41.1...v5.42.0) (2019-02-15)

### Performance Improvements

- **babel-plugin-themeable-styles:** speed up babel transpile ([2df2a22](https://github.com/instructure/instructure-ui/commit/2df2a22))

<a name="5.41.1"></a>

## [5.41.1](https://github.com/instructure/instructure-ui/compare/v5.41.0...v5.41.1) (2019-01-30)

**Note:** Version bump only for package @instructure/ui-docs-client

<a name="5.41.0"></a>

# [5.41.0](https://github.com/instructure/instructure-ui/compare/v5.40.0...v5.41.0) (2019-01-29)

**Note:** Version bump only for package @instructure/ui-docs-client

<a name="5.40.0"></a>

# [5.40.0](https://github.com/instructure/instructure-ui/compare/v5.39.0...v5.40.0) (2019-01-15)

**Note:** Version bump only for package @instructure/ui-docs-client

<a name="5.39.0"></a>

# [5.39.0](https://github.com/instructure/instructure-ui/compare/v5.38.0...v5.39.0) (2019-01-11)

**Note:** Version bump only for package @instructure/ui-docs-client

<a name="5.38.0"></a>

# [5.38.0](https://github.com/instructure/instructure-ui/compare/v5.37.0...v5.38.0) (2019-01-04)

### Features

- **ui-docs-client:** use Button in docs nav ([36bd57e](https://github.com/instructure/instructure-ui/commit/36bd57e))

<a name="5.37.0"></a>

# [5.37.0](https://github.com/instructure/instructure-ui/compare/v5.36.0...v5.37.0) (2018-12-18)

### Bug Fixes

- **ui-docs-client,ui-docs-plugin:** fix ES path in usage examples ([2bd2baa](https://github.com/instructure/instructure-ui/commit/2bd2baa))

<a name="5.36.0"></a>

# [5.36.0](https://github.com/instructure/instructure-ui/compare/v5.35.0...v5.36.0) (2018-12-12)

**Note:** Version bump only for package @instructure/ui-docs-client

<a name="5.35.0"></a>

# [5.35.0](https://github.com/instructure/instructure-ui/compare/v5.34.0...v5.35.0) (2018-12-06)

### Features

- **ui-number-input:** add controlled NumberInput ([0d71026](https://github.com/instructure/instructure-ui/commit/0d71026))

<a name="5.34.0"></a>

# [5.34.0](https://github.com/instructure/instructure-ui/compare/v5.33.0...v5.34.0) (2018-11-20)

**Note:** Version bump only for package @instructure/ui-docs-client

<a name="5.33.0"></a>

# [5.33.0](https://github.com/instructure/instructure-ui/compare/v5.32.0...v5.33.0) (2018-11-14)

**Note:** Version bump only for package @instructure/ui-docs-client

<a name="5.32.0"></a>

# [5.32.0](https://github.com/instructure/instructure-ui/compare/v5.31.0...v5.32.0) (2018-10-31)

**Note:** Version bump only for package @instructure/ui-docs-client

<a name="5.31.0"></a>

# [5.31.0](https://github.com/instructure/instructure-ui/compare/v5.30.0...v5.31.0) (2018-10-26)

### Features

- **ui-presets:** upgrade eslint ([a1dcf1f](https://github.com/instructure/instructure-ui/commit/a1dcf1f))

<a name="5.30.0"></a>

# [5.30.0](https://github.com/instructure/instructure-ui/compare/v5.29.0...v5.30.0) (2018-09-27)

**Note:** Version bump only for package @instructure/ui-docs-client

<a name="5.29.0"></a>

# [5.29.0](https://github.com/instructure/instructure-ui/compare/v5.28.1...v5.29.0) (2018-09-26)

**Note:** Version bump only for package @instructure/ui-docs-client

<a name="5.28.1"></a>

## [5.28.1](https://github.com/instructure/instructure-ui/compare/v5.28.0...v5.28.1) (2018-09-18)

**Note:** Version bump only for package @instructure/ui-docs-client

<a name="5.28.0"></a>

# [5.28.0](https://github.com/instructure/instructure-ui/compare/v5.27.0...v5.28.0) (2018-09-13)

**Note:** Version bump only for package @instructure/ui-docs-client

<a name="5.27.0"></a>

# [5.27.0](https://github.com/instructure/instructure-ui/compare/v5.26.0...v5.27.0) (2018-09-10)

**Note:** Version bump only for package @instructure/ui-docs-client

<a name="5.26.0"></a>

# [5.26.0](https://github.com/instructure/instructure-ui/compare/v5.25.0...v5.26.0) (2018-09-06)

### Features

- **ui-axe-check:** Add axe-core wrapper utility ([3264318](https://github.com/instructure/instructure-ui/commit/3264318))
- **ui-docs-client:** add figure/guideline for do/don't section ([b253910](https://github.com/instructure/instructure-ui/commit/b253910))

<a name="5.25.0"></a>

# [5.25.0](https://github.com/instructure/instructure-ui/compare/v5.24.0...v5.25.0) (2018-08-24)

**Note:** Version bump only for package @instructure/ui-docs-client

<a name="5.24.0"></a>

# [5.24.0](https://github.com/instructure/instructure-ui/compare/v5.23.0...v5.24.0) (2018-08-08)

### Bug Fixes

- **ui-docs-client,ui-themeable:** always apply theme when component updates ([a9f7d74](https://github.com/instructure/instructure-ui/commit/a9f7d74))

### Performance Improvements

- get babel helpers from 'babel-runtime' instead of inlining them ([1472658](https://github.com/instructure/instructure-ui/commit/1472658))

<a name="5.23.0"></a>

# [5.23.0](https://github.com/instructure/instructure-ui/compare/v5.22.0...v5.23.0) (2018-08-03)

**Note:** Version bump only for package @instructure/ui-docs-client

<a name="5.22.0"></a>

# [5.22.0](https://github.com/instructure/instructure-ui/compare/v5.21.0...v5.22.0) (2018-07-27)

### Bug Fixes

- move React/ReactDOM back to peerDependencies ([99e9458](https://github.com/instructure/instructure-ui/commit/99e9458))

<a name="5.21.0"></a>

# [5.21.0](https://github.com/instructure/instructure-ui/compare/v5.20.1...v5.21.0) (2018-07-25)

### Bug Fixes

- add React,React-DOM 16 to dependencies ([d49430f](https://github.com/instructure/instructure-ui/commit/d49430f))

### Performance Improvements

- **ui-themeable:** avoid doing work per-instance ([9b2a84c](https://github.com/instructure/instructure-ui/commit/9b2a84c))

<a name="5.20.1"></a>

## [5.20.1](https://github.com/instructure/instructure-ui/compare/v5.20.0...v5.20.1) (2018-07-18)

**Note:** Version bump only for package @instructure/ui-docs-client

<a name="5.20.0"></a>

# [5.20.0](https://github.com/instructure/instructure-ui/compare/v5.19.0...v5.20.0) (2018-07-17)

**Note:** Version bump only for package @instructure/ui-docs-client

<a name="5.19.0"></a>

# [5.19.0](https://github.com/instructure/instructure-ui/compare/v5.18.0...v5.19.0) (2018-07-12)

### Bug Fixes

- **docs,ui-docs-client:** make menu closed by default ([2f5b14f](https://github.com/instructure/instructure-ui/commit/2f5b14f))

<a name="5.18.0"></a>

# [5.18.0](https://github.com/instructure/instructure-ui/compare/v5.17.0...v5.18.0) (2018-07-09)

**Note:** Version bump only for package @instructure/ui-docs-client

<a name="5.17.0"></a>

# [5.17.0](https://github.com/instructure/instructure-ui/compare/v5.16.0...v5.17.0) (2018-07-06)

**Note:** Version bump only for package @instructure/ui-docs-client

<a name="5.16.0"></a>

# [5.16.0](https://github.com/instructure/instructure-ui/compare/v5.15.0...v5.16.0) (2018-07-06)

### Bug Fixes

- **ui-layout,ui-motion,ui-overlays:** theme prop should work w/ Portal ([2c20181](https://github.com/instructure/instructure-ui/commit/2c20181))

<a name="5.15.0"></a>

# [5.15.0](https://github.com/instructure/instructure-ui/compare/v5.14.0...v5.15.0) (2018-06-28)

**Note:** Version bump only for package @instructure/ui-docs-client

<a name="5.14.0"></a>

# [5.14.0](https://github.com/instructure/instructure-ui/compare/v5.13.1...v5.14.0) (2018-06-28)

**Note:** Version bump only for package @instructure/ui-docs-client

<a name="5.13.1"></a>

## [5.13.1](https://github.com/instructure/instructure-ui/compare/v5.13.0...v5.13.1) (2018-06-22)

**Note:** Version bump only for package @instructure/ui-docs-client

<a name="5.13.0"></a>

# [5.13.0](https://github.com/instructure/instructure-ui/compare/v5.12.0...v5.13.0) (2018-06-16)

**Note:** Version bump only for package @instructure/ui-docs-client

<a name="5.12.0"></a>

# [5.12.0](https://github.com/instructure/instructure-ui/compare/v5.11.0...v5.12.0) (2018-06-11)

### Features

- **ui-buttons,Button:** Add icon prop ([3e63ef7](https://github.com/instructure/instructure-ui/commit/3e63ef7))

<a name="5.11.0"></a>

# [5.11.0](https://github.com/instructure/instructure-ui/compare/v5.10.0...v5.11.0) (2018-06-06)

### Bug Fixes

- **ui-docs-client:** Update usage examples for commonjs imports ([b8ef639](https://github.com/instructure/instructure-ui/commit/b8ef639))

### Features

- **ui-presets:** Add stylelint rules for bidrectional text support ([b58ea17](https://github.com/instructure/instructure-ui/commit/b58ea17))

See the instructure-ui mono-repo [change log](#CHANGELOG) for past changes.
