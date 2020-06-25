# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [7.1.0](https://github.com/instructure/instructure-ui/compare/v7.0.0...v7.1.0) (2020-06-25)

**Note:** Version bump only for package @instructure/ui-popover





# [7.0.0](https://github.com/instructure/instructure-ui/compare/v6.26.0...v7.0.0) (2020-05-27)


### Bug Fixes

* **ui-popover:** reduce tooltip flickering ([461d3fe](https://github.com/instructure/instructure-ui/commit/461d3fe))


### chore

* bump minimum react version to 16.8.0 ([7a96f00](https://github.com/instructure/instructure-ui/commit/7a96f00))
* remove references to React 15 ([4bb2426](https://github.com/instructure/instructure-ui/commit/4bb2426))


### Features

* **ui-docs-client:** Docs/homepage refresh ([ee4957b](https://github.com/instructure/instructure-ui/commit/ee4957b))


### BREAKING CHANGES

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

**Note:** Version bump only for package @instructure/ui-popover





# [6.25.0](https://github.com/instructure/instructure-ui/compare/v6.24.0...v6.25.0) (2020-04-27)

**Note:** Version bump only for package @instructure/ui-popover





# [6.24.0](https://github.com/instructure/instructure-ui/compare/v6.23.0...v6.24.0) (2020-04-14)

**Note:** Version bump only for package @instructure/ui-popover





# [6.23.0](https://github.com/instructure/instructure-ui/compare/v6.22.0...v6.23.0) (2020-04-02)

**Note:** Version bump only for package @instructure/ui-popover





# [6.22.0](https://github.com/instructure/instructure-ui/compare/v6.21.0...v6.22.0) (2020-03-16)


### Bug Fixes

* **ui-popover:** allow tooltip to manage its focus region ([8391f4f](https://github.com/instructure/instructure-ui/commit/8391f4f))





# [6.21.0](https://github.com/instructure/instructure-ui/compare/v6.20.0...v6.21.0) (2020-02-26)

**Note:** Version bump only for package @instructure/ui-popover





# [6.20.0](https://github.com/instructure/instructure-ui/compare/v6.19.0...v6.20.0) (2020-02-13)

**Note:** Version bump only for package @instructure/ui-popover





# [6.19.0](https://github.com/instructure/instructure-ui/compare/v6.18.0...v6.19.0) (2020-02-11)

**Note:** Version bump only for package @instructure/ui-popover





# [6.18.0](https://github.com/instructure/instructure-ui/compare/v6.17.0...v6.18.0) (2020-02-04)


### Features

* **ui-buttons:** Update CloseButton to use upgraded Button props ([365e0ac](https://github.com/instructure/instructure-ui/commit/365e0ac))





# [6.17.0](https://github.com/instructure/instructure-ui/compare/v6.16.0...v6.17.0) (2020-01-22)


### Bug Fixes

* Update Package READMEs and align deprecation statements ([8f892e4](https://github.com/instructure/instructure-ui/commit/8f892e4))





# [6.16.0](https://github.com/instructure/instructure-ui/compare/v6.15.0...v6.16.0) (2019-12-13)

**Note:** Version bump only for package @instructure/ui-popover





# [6.15.0](https://github.com/instructure/instructure-ui/compare/v6.14.0...v6.15.0) (2019-11-18)


### Features

* ensure all packages have build script for types ([4891dc4](https://github.com/instructure/instructure-ui/commit/4891dc4))
* Move React to a peer dependency ([9648ca3](https://github.com/instructure/instructure-ui/commit/9648ca3))
* **ui-a11y-utils,ui-dialog:** add ui-a11y-utils and ui-dialog ([c88cf8e](https://github.com/instructure/instructure-ui/commit/c88cf8e))
* **ui-popover:** make ui-popover backwards compatible ([d9437ae](https://github.com/instructure/instructure-ui/commit/d9437ae))
* **ui-position:** make ui-position backwards compatible ([24e90d1](https://github.com/instructure/instructure-ui/commit/24e90d1))
* **ui-view:** Make ui-view backwards-compatible ([7dd2a2f](https://github.com/instructure/instructure-ui/commit/7dd2a2f))
* **ui-view:** move ContextView to ui-view package ([4601b4a](https://github.com/instructure/instructure-ui/commit/4601b4a))





# [6.14.0](https://github.com/instructure/instructure-ui/compare/v6.13.0...v6.14.0) (2019-10-14)


### Features

* **ui-position:** add ui-position package ([5511a88](https://github.com/instructure/instructure-ui/commit/5511a88))





# [6.13.0](https://github.com/instructure/instructure-ui/compare/v6.12.0...v6.13.0) (2019-09-24)

**Note:** Version bump only for package @instructure/ui-popover





# [6.12.0](https://github.com/instructure/instructure-ui/compare/v6.11.0...v6.12.0) (2019-09-17)

**Note:** Version bump only for package @instructure/ui-popover





# [6.11.0](https://github.com/instructure/instructure-ui/compare/v6.10.0...v6.11.0) (2019-09-16)


### Features

* **ui-popover:** Add ui-popover package ([62c1165](https://github.com/instructure/instructure-ui/commit/62c1165))
* **ui-view:** mark ui-view as experimental ([6b805fa](https://github.com/instructure/instructure-ui/commit/6b805fa))





See the instructure-ui mono-repo [change log](#CHANGELOG) for past changes.
