# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [7.2.1](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.1) (2020-10-07)

**Note:** Version bump only for package @instructure/ui-buttons





# [7.2.0](https://github.com/instructure/instructure-ui/compare/v7.1.4...v7.2.0) (2020-09-23)

**Note:** Version bump only for package @instructure/ui-buttons





## [7.1.4](https://github.com/instructure/instructure-ui/compare/v7.1.3...v7.1.4) (2020-09-09)

**Note:** Version bump only for package @instructure/ui-buttons





## [7.1.3](https://github.com/instructure/instructure-ui/compare/v7.1.2...v7.1.3) (2020-08-10)

**Note:** Version bump only for package @instructure/ui-buttons





## [7.1.2](https://github.com/instructure/instructure-ui/compare/v7.1.1...v7.1.2) (2020-07-17)

**Note:** Version bump only for package @instructure/ui-buttons





## [7.1.1](https://github.com/instructure/instructure-ui/compare/v7.1.0...v7.1.1) (2020-07-01)

**Note:** Version bump only for package @instructure/ui-buttons





# [7.1.0](https://github.com/instructure/instructure-ui/compare/v7.0.0...v7.1.0) (2020-06-25)

**Note:** Version bump only for package @instructure/ui-buttons





# [7.0.0](https://github.com/instructure/instructure-ui/compare/v6.26.0...v7.0.0) (2020-05-27)


### chore

* bump minimum react version to 16.8.0 ([7a96f00](https://github.com/instructure/instructure-ui/commit/7a96f00))
* remove references to React 15 ([4bb2426](https://github.com/instructure/instructure-ui/commit/4bb2426))
* remove canvas-ams-theme ([91f1336](https://github.com/instructure/instructure-ui/commit/91f1336))


### Features

* remove 'experimental' tag along with '__dangerouslyIgnore...' ([92bf753](https://github.com/instructure/instructure-ui/commit/92bf753))


### BREAKING CHANGES

* - Removed the `canvas-ams-theme` package. Use `canvas-theme` instead.

Change-Id: I077f6b8cbbef9ee12e5904fb4c9dc4b48409acbb
Reviewed-on: https://gerrit.instructure.com/c/instructure-ui/+/237960
Tested-by: Service Cloud Jenkins <svc.cloudjenkins@instructure.com>
Reviewed-by: Steve Jensen <sejensen@instructure.com>
QA-Review: Daniel Sasaki <dsasaki@instructure.com>
Product-Review: Steve Jensen <sejensen@instructure.com>
Visual-Regression-Test: Steve Jensen <sejensen@instructure.com>
* - Minimum react and react-dom version raised to 16.8.0

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
* Dropping support for React 15.

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

**Note:** Version bump only for package @instructure/ui-buttons





# [6.25.0](https://github.com/instructure/instructure-ui/compare/v6.24.0...v6.25.0) (2020-04-27)

**Note:** Version bump only for package @instructure/ui-buttons





# [6.24.0](https://github.com/instructure/instructure-ui/compare/v6.23.0...v6.24.0) (2020-04-14)

**Note:** Version bump only for package @instructure/ui-buttons





# [6.23.0](https://github.com/instructure/instructure-ui/compare/v6.22.0...v6.23.0) (2020-04-02)


### Bug Fixes

* **ui-buttons:** fix canvas custom theming for primary Button text ([7672ee9](https://github.com/instructure/instructure-ui/commit/7672ee9))
* **ui-buttons:** fix issue with button theme overrides ([4022c95](https://github.com/instructure/instructure-ui/commit/4022c95))


### Features

* **instui-config,canvas-ams-theme,ui-themes,ui-view:** add canvas-ams-theme ([f31849f](https://github.com/instructure/instructure-ui/commit/f31849f))
* **ui-docs-client:** update deprecated components still in use ([4543717](https://github.com/instructure/instructure-ui/commit/4543717))





# [6.22.0](https://github.com/instructure/instructure-ui/compare/v6.21.0...v6.22.0) (2020-03-16)

**Note:** Version bump only for package @instructure/ui-buttons





# [6.21.0](https://github.com/instructure/instructure-ui/compare/v6.20.0...v6.21.0) (2020-02-26)

**Note:** Version bump only for package @instructure/ui-buttons





# [6.20.0](https://github.com/instructure/instructure-ui/compare/v6.19.0...v6.20.0) (2020-02-13)

**Note:** Version bump only for package @instructure/ui-buttons





# [6.19.0](https://github.com/instructure/instructure-ui/compare/v6.18.0...v6.19.0) (2020-02-11)


### Features

* **instructure-theme:** add instructure-theme ([df088ec](https://github.com/instructure/instructure-ui/commit/df088ec))
* **ui-docs-client:** use updated Button throughout docs/components ([9f0be81](https://github.com/instructure/instructure-ui/commit/9f0be81))





# [6.18.0](https://github.com/instructure/instructure-ui/compare/v6.17.0...v6.18.0) (2020-02-04)


### Features

* **instui-config,ui-buttons,ui-react-utils:** un-deprecate disabled and readOnly in button ([8041bbf](https://github.com/instructure/instructure-ui/commit/8041bbf))
* **instui-config,ui-buttons,ui-themeable:** upgrade Button ([ed73df1](https://github.com/instructure/instructure-ui/commit/ed73df1))
* **ui-buttons:** Add ToggleButton component ([4e25cfc](https://github.com/instructure/instructure-ui/commit/4e25cfc))
* **ui-buttons:** Update CloseButton to use upgraded Button props ([365e0ac](https://github.com/instructure/instructure-ui/commit/365e0ac))





# [6.17.0](https://github.com/instructure/instructure-ui/compare/v6.16.0...v6.17.0) (2020-01-22)


### Bug Fixes

* Update Package READMEs and align deprecation statements ([8f892e4](https://github.com/instructure/instructure-ui/commit/8f892e4))





# [6.16.0](https://github.com/instructure/instructure-ui/compare/v6.15.0...v6.16.0) (2019-12-13)


### Features

* **ui-buttons:** add a CondensedButton component ([e807b1c](https://github.com/instructure/instructure-ui/commit/e807b1c))
* **ui-buttons:** add an IconButton component ([e170d95](https://github.com/instructure/instructure-ui/commit/e170d95))





# [6.15.0](https://github.com/instructure/instructure-ui/compare/v6.14.0...v6.15.0) (2019-11-18)


### Features

* **ui-a11y-content:** remove experimental flag from ui-a11y-content package ([ce96006](https://github.com/instructure/instructure-ui/commit/ce96006))
* **ui-a11y-utils,ui-dialog:** add ui-a11y-utils and ui-dialog ([c88cf8e](https://github.com/instructure/instructure-ui/commit/c88cf8e))
* **ui-buttons:** add a BaseButton component ([dbb83cd](https://github.com/instructure/instructure-ui/commit/dbb83cd))
* **ui-flex,ui-layout:** make ui-flex backwards compatible ([c11cc6b](https://github.com/instructure/instructure-ui/commit/c11cc6b))
* **ui-view:** Make ui-view backwards-compatible ([7dd2a2f](https://github.com/instructure/instructure-ui/commit/7dd2a2f))





# [6.14.0](https://github.com/instructure/instructure-ui/compare/v6.13.0...v6.14.0) (2019-10-14)

**Note:** Version bump only for package @instructure/ui-buttons





# [6.13.0](https://github.com/instructure/instructure-ui/compare/v6.12.0...v6.13.0) (2019-09-24)

**Note:** Version bump only for package @instructure/ui-buttons





# [6.12.0](https://github.com/instructure/instructure-ui/compare/v6.11.0...v6.12.0) (2019-09-17)

**Note:** Version bump only for package @instructure/ui-buttons





# [6.11.0](https://github.com/instructure/instructure-ui/compare/v6.10.0...v6.11.0) (2019-09-16)


### Features

* **ui-a11y-content,ui-a11y:** add ui-a11y-content package ([cb49c7a](https://github.com/instructure/instructure-ui/commit/cb49c7a))
* **ui-flex:** add ui-flex package ([98730ff](https://github.com/instructure/instructure-ui/commit/98730ff))
* **ui-view:** add ui-view Package for View Component ([7799577](https://github.com/instructure/instructure-ui/commit/7799577))
* **ui-view:** mark ui-view as experimental ([6b805fa](https://github.com/instructure/instructure-ui/commit/6b805fa))





# [6.10.0](https://github.com/instructure/instructure-ui/compare/v6.9.0...v6.10.0) (2019-08-27)

**Note:** Version bump only for package @instructure/ui-buttons





# [6.9.0](https://github.com/instructure/instructure-ui/compare/v6.8.1...v6.9.0) (2019-08-07)

**Note:** Version bump only for package @instructure/ui-buttons





## [6.8.1](https://github.com/instructure/instructure-ui/compare/v6.8.0...v6.8.1) (2019-08-02)

**Note:** Version bump only for package @instructure/ui-buttons





# [6.8.0](https://github.com/instructure/instructure-ui/compare/v6.7.0...v6.8.0) (2019-07-31)

**Note:** Version bump only for package @instructure/ui-buttons





# [6.7.0](https://github.com/instructure/instructure-ui/compare/v6.6.0...v6.7.0) (2019-07-15)

**Note:** Version bump only for package @instructure/ui-buttons





# [6.6.0](https://github.com/instructure/instructure-ui/compare/v6.5.0...v6.6.0) (2019-07-03)

**Note:** Version bump only for package @instructure/ui-buttons





# [6.5.0](https://github.com/instructure/instructure-ui/compare/v6.4.0...v6.5.0) (2019-07-01)

**Note:** Version bump only for package @instructure/ui-buttons





# [6.4.0](https://github.com/instructure/instructure-ui/compare/v6.3.0...v6.4.0) (2019-06-13)

**Note:** Version bump only for package @instructure/ui-buttons





# [6.3.0](https://github.com/instructure/instructure-ui/compare/v6.2.0...v6.3.0) (2019-05-28)

**Note:** Version bump only for package @instructure/ui-buttons





# [6.2.0](https://github.com/instructure/instructure-ui/compare/v6.1.0...v6.2.0) (2019-05-13)

**Note:** Version bump only for package @instructure/ui-buttons





# [6.1.0](https://github.com/instructure/instructure-ui/compare/v6.0.0...v6.1.0) (2019-05-09)

**Note:** Version bump only for package @instructure/ui-buttons





# [6.0.0](https://github.com/instructure/instructure-ui/compare/v5.52.3...v6.0.0) (2019-05-03)


### Features

* remove deprecated packages/props ([1d8813c](https://github.com/instructure/instructure-ui/commit/1d8813c))
* **ui-babel-preset:** transform member imports to full paths ([d02cc45](https://github.com/instructure/instructure-ui/commit/d02cc45))
* **ui-dom-utils,ui-react-utils,ui-color-utils:** new utils packages ([03e8ee2](https://github.com/instructure/instructure-ui/commit/03e8ee2))


### Performance Improvements

* **ui-icons,ui-icons-build:** remove default exports for React icons ([95195ee](https://github.com/instructure/instructure-ui/commit/95195ee))


### BREAKING CHANGES

* - ui-core package has been removed


## [5.52.3](https://github.com/instructure/instructure-ui/compare/v5.52.2...v5.52.3) (2019-04-25)

**Note:** Version bump only for package @instructure/ui-buttons





## [5.52.2](https://github.com/instructure/instructure-ui/compare/v5.52.1...v5.52.2) (2019-04-17)


### Bug Fixes

* **ui-utils:** allow to prop on elements that allow href ([208fa09](https://github.com/instructure/instructure-ui/commit/208fa09))





## [5.52.1](https://github.com/instructure/instructure-ui/compare/v5.52.0...v5.52.1) (2019-04-08)

**Note:** Version bump only for package @instructure/ui-buttons





# [5.52.0](https://github.com/instructure/instructure-ui/compare/v5.51.1...v5.52.0) (2019-04-03)


### Features

* **console:** remove console statements in prod env ([603c738](https://github.com/instructure/instructure-ui/commit/603c738))





## [5.51.1](https://github.com/instructure/instructure-ui/compare/v5.51.0...v5.51.1) (2019-03-30)

**Note:** Version bump only for package @instructure/ui-buttons





# [5.51.0](https://github.com/instructure/instructure-ui/compare/v5.50.0...v5.51.0) (2019-03-29)

**Note:** Version bump only for package @instructure/ui-buttons





# [5.50.0](https://github.com/instructure/instructure-ui/compare/v5.49.0...v5.50.0) (2019-03-28)

**Note:** Version bump only for package @instructure/ui-buttons





# [5.49.0](https://github.com/instructure/instructure-ui/compare/v5.48.0...v5.49.0) (2019-03-22)


### Features

* **ui-calendar,ui-focusable:** a Calendar component ([7a4f96e](https://github.com/instructure/instructure-ui/commit/7a4f96e))





# [5.48.0](https://github.com/instructure/instructure-ui/compare/v5.47.0...v5.48.0) (2019-03-18)

**Note:** Version bump only for package @instructure/ui-buttons





# [5.47.0](https://github.com/instructure/instructure-ui/compare/v5.46.1...v5.47.0) (2019-03-15)

**Note:** Version bump only for package @instructure/ui-buttons





## [5.46.1](https://github.com/instructure/instructure-ui/compare/v5.46.0...v5.46.1) (2019-03-13)

**Note:** Version bump only for package @instructure/ui-buttons





# [5.46.0](https://github.com/instructure/instructure-ui/compare/v5.45.1...v5.46.0) (2019-03-12)

**Note:** Version bump only for package @instructure/ui-buttons





## [5.45.1](https://github.com/instructure/instructure-ui/compare/v5.45.0...v5.45.1) (2019-03-12)

**Note:** Version bump only for package @instructure/ui-buttons





# [5.45.0](https://github.com/instructure/instructure-ui/compare/v5.44.0...v5.45.0) (2019-03-11)


### Features

* A ui-prop-types package ([0fbc609](https://github.com/instructure/instructure-ui/commit/0fbc609))





# [5.44.0](https://github.com/instructure/instructure-ui/compare/v5.43.0...v5.44.0) (2019-03-01)


### Features

* **ui-buttons,ui-elements,ui-themes:** underline the Link component by default ([9a90a7f](https://github.com/instructure/instructure-ui/commit/9a90a7f)), closes [#008EE2](https://github.com/instructure/instructure-ui/issues/008EE2)





# [5.43.0](https://github.com/instructure/instructure-ui/compare/v5.42.0...v5.43.0) (2019-02-27)


### Bug Fixes

* **postcss-themeable-styles,ui-buttons:** add missing Button theme variables ([ac626ec](https://github.com/instructure/instructure-ui/commit/ac626ec))
* **ui-buttons:** scope Button styles more tightly to HTML ([92f044f](https://github.com/instructure/instructure-ui/commit/92f044f))


### Features

* **ui-test-utils:** add a11y test generator util ([16240d8](https://github.com/instructure/instructure-ui/commit/16240d8))





<a name="5.42.0"></a>
# [5.42.0](https://github.com/instructure/instructure-ui/compare/v5.41.1...v5.42.0) (2019-02-15)


### Features

* **ui-scripts,ui-test-utils:** add a --mocha option to ui-test ([bd37e2b](https://github.com/instructure/instructure-ui/commit/bd37e2b))





<a name="5.41.1"></a>
## [5.41.1](https://github.com/instructure/instructure-ui/compare/v5.41.0...v5.41.1) (2019-01-30)

**Note:** Version bump only for package @instructure/ui-buttons





<a name="5.41.0"></a>
# [5.41.0](https://github.com/instructure/instructure-ui/compare/v5.40.0...v5.41.0) (2019-01-29)

**Note:** Version bump only for package @instructure/ui-buttons





<a name="5.40.0"></a>
# [5.40.0](https://github.com/instructure/instructure-ui/compare/v5.39.0...v5.40.0) (2019-01-15)

**Note:** Version bump only for package @instructure/ui-buttons





<a name="5.39.0"></a>
# [5.39.0](https://github.com/instructure/instructure-ui/compare/v5.38.0...v5.39.0) (2019-01-11)

**Note:** Version bump only for package @instructure/ui-buttons





<a name="5.38.0"></a>
# [5.38.0](https://github.com/instructure/instructure-ui/compare/v5.37.0...v5.38.0) (2019-01-04)


### Bug Fixes

* **ui-test-utils:** logic that determines visibility is incorrect ([f0d59b1](https://github.com/instructure/instructure-ui/commit/f0d59b1))





<a name="5.37.0"></a>
# [5.37.0](https://github.com/instructure/instructure-ui/compare/v5.36.0...v5.37.0) (2018-12-18)

**Note:** Version bump only for package @instructure/ui-buttons





<a name="5.36.0"></a>
# [5.36.0](https://github.com/instructure/instructure-ui/compare/v5.35.0...v5.36.0) (2018-12-12)

**Note:** Version bump only for package @instructure/ui-buttons





<a name="5.35.0"></a>
# [5.35.0](https://github.com/instructure/instructure-ui/compare/v5.34.0...v5.35.0) (2018-12-06)


### Bug Fixes

* **ui-buttons,ui-elements,ui-forms:** remove aria-disabled for input components ([512fb92](https://github.com/instructure/instructure-ui/commit/512fb92))
* **ui-test-utils:** handle React 16 uncaught errors ([7fd8bec](https://github.com/instructure/instructure-ui/commit/7fd8bec))


### Features

* **ui-buttons,ui-elements,ui-themes:** update link color for standard theme ([78a18fa](https://github.com/instructure/instructure-ui/commit/78a18fa)), closes [#2578](https://github.com/instructure/instructure-ui/issues/2578)
* **ui-test-utils:** support Sizzle selectors ([65481ff](https://github.com/instructure/instructure-ui/commit/65481ff))





<a name="5.34.0"></a>
# [5.34.0](https://github.com/instructure/instructure-ui/compare/v5.33.0...v5.34.0) (2018-11-20)


### Features

* **ui-focusable:** update focus outline to 2px ([962e689](https://github.com/instructure/instructure-ui/commit/962e689))





<a name="5.33.0"></a>
# [5.33.0](https://github.com/instructure/instructure-ui/compare/v5.32.0...v5.33.0) (2018-11-14)


### Bug Fixes

* **ui-test-utils:** locator find/findAll return component root ([5866235](https://github.com/instructure/instructure-ui/commit/5866235))
* **ui-test-utils:** update clickable requirement ([ef9d12d](https://github.com/instructure/instructure-ui/commit/ef9d12d))





<a name="5.32.0"></a>
# [5.32.0](https://github.com/instructure/instructure-ui/compare/v5.31.0...v5.32.0) (2018-10-31)


### Features

* **ui-buttons:** update tests to run on React 16 ([8c3b7c8](https://github.com/instructure/instructure-ui/commit/8c3b7c8))





<a name="5.31.0"></a>
# [5.31.0](https://github.com/instructure/instructure-ui/compare/v5.30.0...v5.31.0) (2018-10-26)

**Note:** Version bump only for package @instructure/ui-buttons





<a name="5.30.0"></a>
# [5.30.0](https://github.com/instructure/instructure-ui/compare/v5.29.0...v5.30.0) (2018-09-27)

**Note:** Version bump only for package @instructure/ui-buttons





<a name="5.29.0"></a>
# [5.29.0](https://github.com/instructure/instructure-ui/compare/v5.28.1...v5.29.0) (2018-09-26)

**Note:** Version bump only for package @instructure/ui-buttons





<a name="5.28.1"></a>
## [5.28.1](https://github.com/instructure/instructure-ui/compare/v5.28.0...v5.28.1) (2018-09-18)

**Note:** Version bump only for package @instructure/ui-buttons





<a name="5.28.0"></a>
# [5.28.0](https://github.com/instructure/instructure-ui/compare/v5.27.0...v5.28.0) (2018-09-13)

**Note:** Version bump only for package @instructure/ui-buttons





<a name="5.27.0"></a>
# [5.27.0](https://github.com/instructure/instructure-ui/compare/v5.26.0...v5.27.0) (2018-09-10)


### Bug Fixes

* **ui-buttons:** no role="button" for buttons ([be78aac](https://github.com/instructure/instructure-ui/commit/be78aac))


### Features

* **docs-examples,generate-examples:** autogenerate component examples ([b50fae5](https://github.com/instructure/instructure-ui/commit/b50fae5))





<a name="5.26.0"></a>
# [5.26.0](https://github.com/instructure/instructure-ui/compare/v5.25.0...v5.26.0) (2018-09-06)


### Features

* **ui-docs-client:** add figure/guideline for do/don't section ([b253910](https://github.com/instructure/instructure-ui/commit/b253910))





<a name="5.25.0"></a>
# [5.25.0](https://github.com/instructure/instructure-ui/compare/v5.24.0...v5.25.0) (2018-08-24)


### Bug Fixes

* **ui-buttons,ui-elements:** Fix Safari focus issue ([7825b13](https://github.com/instructure/instructure-ui/commit/7825b13))





<a name="5.24.0"></a>
# [5.24.0](https://github.com/instructure/instructure-ui/compare/v5.23.0...v5.24.0) (2018-08-08)


### Bug Fixes

* **ui-elements:** remove relative import ([d0a184e](https://github.com/instructure/instructure-ui/commit/d0a184e))


### Features

* **ui-buttons:** add cursor prop to Button ([b47fbb5](https://github.com/instructure/instructure-ui/commit/b47fbb5))


### Performance Improvements

* get babel helpers from 'babel-runtime' instead of inlining them ([1472658](https://github.com/instructure/instructure-ui/commit/1472658))





<a name="5.23.0"></a>
# [5.23.0](https://github.com/instructure/instructure-ui/compare/v5.22.0...v5.23.0) (2018-08-03)


### Bug Fixes

* **ui-buttons,ui-elements:** Fix event target ([8e29910](https://github.com/instructure/instructure-ui/commit/8e29910))


### Performance Improvements

* **ui-buttons,ui-tabs:** a couple more small perf improvements ([2b00c1b](https://github.com/instructure/instructure-ui/commit/2b00c1b))





<a name="5.22.0"></a>
# [5.22.0](https://github.com/instructure/instructure-ui/compare/v5.21.0...v5.22.0) (2018-07-27)


### Bug Fixes

* move React/ReactDOM back to peerDependencies ([99e9458](https://github.com/instructure/instructure-ui/commit/99e9458))


### Performance Improvements

* **ui-buttons:** speed up <Button>s ([54d7c71](https://github.com/instructure/instructure-ui/commit/54d7c71))





<a name="5.21.0"></a>
# [5.21.0](https://github.com/instructure/instructure-ui/compare/v5.20.1...v5.21.0) (2018-07-25)


### Bug Fixes

* add React,React-DOM 16 to dependencies ([d49430f](https://github.com/instructure/instructure-ui/commit/d49430f))
* **ui-buttons:** prevent error on null child in Button component ([5681198](https://github.com/instructure/instructure-ui/commit/5681198))


### Performance Improvements

* **ui-buttons:** avoid work just to show a warning in production ([0f2cbe9](https://github.com/instructure/instructure-ui/commit/0f2cbe9))





<a name="5.20.1"></a>
## [5.20.1](https://github.com/instructure/instructure-ui/compare/v5.20.0...v5.20.1) (2018-07-18)

**Note:** Version bump only for package @instructure/ui-buttons





<a name="5.20.0"></a>
# [5.20.0](https://github.com/instructure/instructure-ui/compare/v5.19.0...v5.20.0) (2018-07-17)

**Note:** Version bump only for package @instructure/ui-buttons





<a name="5.19.0"></a>
# [5.19.0](https://github.com/instructure/instructure-ui/compare/v5.18.0...v5.19.0) (2018-07-12)

**Note:** Version bump only for package @instructure/ui-buttons





<a name="5.18.0"></a>
# [5.18.0](https://github.com/instructure/instructure-ui/compare/v5.17.0...v5.18.0) (2018-07-09)

**Note:** Version bump only for package @instructure/ui-buttons





<a name="5.17.0"></a>
# [5.17.0](https://github.com/instructure/instructure-ui/compare/v5.16.0...v5.17.0) (2018-07-06)

**Note:** Version bump only for package @instructure/ui-buttons





<a name="5.16.0"></a>
# [5.16.0](https://github.com/instructure/instructure-ui/compare/v5.15.0...v5.16.0) (2018-07-06)

**Note:** Version bump only for package @instructure/ui-buttons





<a name="5.15.0"></a>
# [5.15.0](https://github.com/instructure/instructure-ui/compare/v5.14.0...v5.15.0) (2018-06-28)

**Note:** Version bump only for package @instructure/ui-buttons





<a name="5.14.0"></a>
# [5.14.0](https://github.com/instructure/instructure-ui/compare/v5.13.1...v5.14.0) (2018-06-28)

**Note:** Version bump only for package @instructure/ui-buttons





<a name="5.13.1"></a>
## [5.13.1](https://github.com/instructure/instructure-ui/compare/v5.13.0...v5.13.1) (2018-06-22)

**Note:** Version bump only for package @instructure/ui-buttons





<a name="5.13.0"></a>
# [5.13.0](https://github.com/instructure/instructure-ui/compare/v5.12.0...v5.13.0) (2018-06-16)


### Features

* **ui-buttons,Button:** Add circle-default variant ([addb97c](https://github.com/instructure/instructure-ui/commit/addb97c))





<a name="5.12.0"></a>
# [5.12.0](https://github.com/instructure/instructure-ui/compare/v5.11.0...v5.12.0) (2018-06-11)


### Features

* **ui-buttons,Button:** Add icon prop ([3e63ef7](https://github.com/instructure/instructure-ui/commit/3e63ef7))
* **ui-buttons,Button:** Responsive button docs ([4f52006](https://github.com/instructure/instructure-ui/commit/4f52006))





<a name="5.11.0"></a>
# [5.11.0](https://github.com/instructure/instructure-ui/compare/v5.10.0...v5.11.0) (2018-06-06)


### Features

* **ui-presets:** Add stylelint rules for bidrectional text support ([b58ea17](https://github.com/instructure/instructure-ui/commit/b58ea17))





See the instructure-ui mono-repo [change log](#CHANGELOG) for past changes.
