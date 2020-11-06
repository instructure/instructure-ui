# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [7.3.0](https://github.com/instructure/instructure-ui/compare/v7.2.4...v7.3.0) (2020-10-26)

**Note:** Version bump only for package @instructure/ui-react-utils





## [7.2.4](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.4) (2020-10-09)

**Note:** Version bump only for package @instructure/ui-react-utils





## [7.2.3](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.3) (2020-10-08)

**Note:** Version bump only for package @instructure/ui-react-utils





## [7.2.2](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.2) (2020-10-08)

**Note:** Version bump only for package @instructure/ui-react-utils





## [7.2.1](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.1) (2020-10-07)

**Note:** Version bump only for package @instructure/ui-react-utils





# [7.2.0](https://github.com/instructure/instructure-ui/compare/v7.1.4...v7.2.0) (2020-09-23)

**Note:** Version bump only for package @instructure/ui-react-utils





## [7.1.4](https://github.com/instructure/instructure-ui/compare/v7.1.3...v7.1.4) (2020-09-09)

**Note:** Version bump only for package @instructure/ui-react-utils





## [7.1.3](https://github.com/instructure/instructure-ui/compare/v7.1.2...v7.1.3) (2020-08-10)

**Note:** Version bump only for package @instructure/ui-react-utils





## [7.1.2](https://github.com/instructure/instructure-ui/compare/v7.1.1...v7.1.2) (2020-07-17)

**Note:** Version bump only for package @instructure/ui-react-utils





## [7.1.1](https://github.com/instructure/instructure-ui/compare/v7.1.0...v7.1.1) (2020-07-01)

**Note:** Version bump only for package @instructure/ui-react-utils





# [7.1.0](https://github.com/instructure/instructure-ui/compare/v7.0.0...v7.1.0) (2020-06-25)

**Note:** Version bump only for package @instructure/ui-react-utils





# [7.0.0](https://github.com/instructure/instructure-ui/compare/v6.26.0...v7.0.0) (2020-05-27)


### Bug Fixes

* **ui-react-utils:** ensure ComponentIdentifier renders in the docs ([044b9f3](https://github.com/instructure/instructure-ui/commit/044b9f3))


### chore

* bump minimum react version to 16.8.0 ([7a96f00](https://github.com/instructure/instructure-ui/commit/7a96f00))
* remove references to React 15 ([4bb2426](https://github.com/instructure/instructure-ui/commit/4bb2426))
* **ui-react-utils:** remove react-lifecycles-compat polyfill ([aa698ae](https://github.com/instructure/instructure-ui/commit/aa698ae))


### BREAKING CHANGES

* **ui-react-utils:** - removed lifecycle polyfill from ui-react-utils

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

**Note:** Version bump only for package @instructure/ui-react-utils





# [6.25.0](https://github.com/instructure/instructure-ui/compare/v6.24.0...v6.25.0) (2020-04-27)

**Note:** Version bump only for package @instructure/ui-react-utils





# [6.24.0](https://github.com/instructure/instructure-ui/compare/v6.23.0...v6.24.0) (2020-04-14)

**Note:** Version bump only for package @instructure/ui-react-utils





# [6.23.0](https://github.com/instructure/instructure-ui/compare/v6.22.0...v6.23.0) (2020-04-02)

**Note:** Version bump only for package @instructure/ui-react-utils





# [6.22.0](https://github.com/instructure/instructure-ui/compare/v6.21.0...v6.22.0) (2020-03-16)

**Note:** Version bump only for package @instructure/ui-react-utils





# [6.21.0](https://github.com/instructure/instructure-ui/compare/v6.20.0...v6.21.0) (2020-02-26)


### Features

* **ui-select:** Add a SimpleSelect component ([a7ed234](https://github.com/instructure/instructure-ui/commit/a7ed234))





# [6.20.0](https://github.com/instructure/instructure-ui/compare/v6.19.0...v6.20.0) (2020-02-13)

**Note:** Version bump only for package @instructure/ui-react-utils





# [6.19.0](https://github.com/instructure/instructure-ui/compare/v6.18.0...v6.19.0) (2020-02-11)

**Note:** Version bump only for package @instructure/ui-react-utils





# [6.18.0](https://github.com/instructure/instructure-ui/compare/v6.17.0...v6.18.0) (2020-02-04)


### Features

* **instui-config,ui-buttons,ui-react-utils:** un-deprecate disabled and readOnly in button ([8041bbf](https://github.com/instructure/instructure-ui/commit/8041bbf))
* **ui-react-utils,ui-scripts,ui-webpack-config:** env variable to omit deprecation warnings ([6cc3193](https://github.com/instructure/instructure-ui/commit/6cc3193))





# [6.17.0](https://github.com/instructure/instructure-ui/compare/v6.16.0...v6.17.0) (2020-01-22)


### Bug Fixes

* Update Package READMEs and align deprecation statements ([8f892e4](https://github.com/instructure/instructure-ui/commit/8f892e4))





# [6.16.0](https://github.com/instructure/instructure-ui/compare/v6.15.0...v6.16.0) (2019-12-13)

**Note:** Version bump only for package @instructure/ui-react-utils





# [6.15.0](https://github.com/instructure/instructure-ui/compare/v6.14.0...v6.15.0) (2019-11-18)


### Bug Fixes

* **ui-react-utils:** fix deprecated util functions in production ([1c09675](https://github.com/instructure/instructure-ui/commit/1c09675))
* **ui-react-utils:** omit children from passthroughProps ([c0e9cff](https://github.com/instructure/instructure-ui/commit/c0e9cff))


### Features

* **ui-focusable:** update deprecated lifecycles in Focusable ([696c998](https://github.com/instructure/instructure-ui/commit/696c998))
* **ui-react-utils:** allow for completely custom message in deprecatePropValues ([9a86beb](https://github.com/instructure/instructure-ui/commit/9a86beb))
* **ui-react-utils:** update deprecated lifecycles in decorators ([87295bf](https://github.com/instructure/instructure-ui/commit/87295bf))





# [6.14.0](https://github.com/instructure/instructure-ui/compare/v6.13.0...v6.14.0) (2019-10-14)


### Bug Fixes

* **ui-react-utils:** fix production errors for decorator functions ([f5da64c](https://github.com/instructure/instructure-ui/commit/f5da64c))


### Performance Improvements

* **ui-react-utils:** make dev-only decorators really noops in prod ([f2f4865](https://github.com/instructure/instructure-ui/commit/f2f4865))





# [6.13.0](https://github.com/instructure/instructure-ui/compare/v6.12.0...v6.13.0) (2019-09-24)


### Features

* **ui-react-utils:** add hack decorator ([1351477](https://github.com/instructure/instructure-ui/commit/1351477))





# [6.12.0](https://github.com/instructure/instructure-ui/compare/v6.11.0...v6.12.0) (2019-09-17)

**Note:** Version bump only for package @instructure/ui-react-utils





# [6.11.0](https://github.com/instructure/instructure-ui/compare/v6.10.0...v6.11.0) (2019-09-16)


### Bug Fixes

* **ui-react-utils:** provide correct contextual binding for lifecycle methods in experimental ([9aeeb19](https://github.com/instructure/instructure-ui/commit/9aeeb19))


### Features

* **ui-react-utils:** add flag to suppress experimental warnings ([d30e678](https://github.com/instructure/instructure-ui/commit/d30e678))
* **ui-react-utils:** pass props in callRenderProp ([042bc84](https://github.com/instructure/instructure-ui/commit/042bc84))





# [6.10.0](https://github.com/instructure/instructure-ui/compare/v6.9.0...v6.10.0) (2019-08-27)

**Note:** Version bump only for package @instructure/ui-react-utils





# [6.9.0](https://github.com/instructure/instructure-ui/compare/v6.8.1...v6.9.0) (2019-08-07)

**Note:** Version bump only for package @instructure/ui-react-utils





## [6.8.1](https://github.com/instructure/instructure-ui/compare/v6.8.0...v6.8.1) (2019-08-02)

**Note:** Version bump only for package @instructure/ui-react-utils





# [6.8.0](https://github.com/instructure/instructure-ui/compare/v6.7.0...v6.8.0) (2019-07-31)


### Bug Fixes

* **ui-react-utils:** handle fat arrow functions in callRenderProp ([6e0d0c8](https://github.com/instructure/instructure-ui/commit/6e0d0c8))





# [6.7.0](https://github.com/instructure/instructure-ui/compare/v6.6.0...v6.7.0) (2019-07-15)

**Note:** Version bump only for package @instructure/ui-react-utils





# [6.6.0](https://github.com/instructure/instructure-ui/compare/v6.5.0...v6.6.0) (2019-07-03)

**Note:** Version bump only for package @instructure/ui-react-utils





# [6.5.0](https://github.com/instructure/instructure-ui/compare/v6.4.0...v6.5.0) (2019-07-01)

**Note:** Version bump only for package @instructure/ui-react-utils





# [6.4.0](https://github.com/instructure/instructure-ui/compare/v6.3.0...v6.4.0) (2019-06-13)


### Bug Fixes

* **ui-component-examples:** prevent OOM when generating View examples ([df5f505](https://github.com/instructure/instructure-ui/commit/df5f505))





# [6.3.0](https://github.com/instructure/instructure-ui/compare/v6.2.0...v6.3.0) (2019-05-28)


### Features

* **ui-options:** add Options component ([c0df653](https://github.com/instructure/instructure-ui/commit/c0df653))





# [6.2.0](https://github.com/instructure/instructure-ui/compare/v6.1.0...v6.2.0) (2019-05-13)

**Note:** Version bump only for package @instructure/ui-react-utils





# [6.1.0](https://github.com/instructure/instructure-ui/compare/v6.0.0...v6.1.0) (2019-05-09)

**Note:** Version bump only for package @instructure/ui-react-utils





# [6.0.0](https://github.com/instructure/instructure-ui/compare/v5.52.3...v6.0.0) (2019-05-03)


### Features

* **ui-babel-preset:** transform member imports to full paths ([d02cc45](https://github.com/instructure/instructure-ui/commit/d02cc45))
* **ui-dom-utils,ui-react-utils,ui-color-utils:** new utils packages ([03e8ee2](https://github.com/instructure/instructure-ui/commit/03e8ee2))





See the instructure-ui mono-repo [change log](#CHANGELOG) for past changes.
