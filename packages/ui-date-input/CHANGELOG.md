# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [7.4.1](https://github.com/instructure/instructure-ui/compare/v7.4.0...v7.4.1) (2021-03-04)

### Bug Fixes

- **all:** Fix package imports, now everything can be imported; fix test:all in main package.json ([2f11024](https://github.com/instructure/instructure-ui/commit/2f11024))

# [7.4.0](https://github.com/instructure/instructure-ui/compare/v7.3.5...v7.4.0) (2021-02-01)

**Note:** Version bump only for package @instructure/ui-date-input

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

**Note:** Version bump only for package @instructure/ui-date-input

## [7.3.1](https://github.com/instructure/instructure-ui/compare/v7.3.0...v7.3.1) (2020-11-30)

**Note:** Version bump only for package @instructure/ui-date-input

# [7.3.0](https://github.com/instructure/instructure-ui/compare/v7.2.4...v7.3.0) (2020-10-26)

**Note:** Version bump only for package @instructure/ui-date-input

## [7.2.4](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.4) (2020-10-09)

**Note:** Version bump only for package @instructure/ui-date-input

## [7.2.3](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.3) (2020-10-08)

**Note:** Version bump only for package @instructure/ui-date-input

## [7.2.2](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.2) (2020-10-08)

**Note:** Version bump only for package @instructure/ui-date-input

## [7.2.1](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.1) (2020-10-07)

**Note:** Version bump only for package @instructure/ui-date-input

# [7.2.0](https://github.com/instructure/instructure-ui/compare/v7.1.4...v7.2.0) (2020-09-23)

**Note:** Version bump only for package @instructure/ui-date-input

## [7.1.4](https://github.com/instructure/instructure-ui/compare/v7.1.3...v7.1.4) (2020-09-09)

**Note:** Version bump only for package @instructure/ui-date-input

## [7.1.3](https://github.com/instructure/instructure-ui/compare/v7.1.2...v7.1.3) (2020-08-10)

**Note:** Version bump only for package @instructure/ui-date-input

## [7.1.2](https://github.com/instructure/instructure-ui/compare/v7.1.1...v7.1.2) (2020-07-17)

**Note:** Version bump only for package @instructure/ui-date-input

## [7.1.1](https://github.com/instructure/instructure-ui/compare/v7.1.0...v7.1.1) (2020-07-01)

**Note:** Version bump only for package @instructure/ui-date-input

# [7.1.0](https://github.com/instructure/instructure-ui/compare/v7.0.0...v7.1.0) (2020-06-25)

**Note:** Version bump only for package @instructure/ui-date-input

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

**Note:** Version bump only for package @instructure/ui-date-input

# [6.25.0](https://github.com/instructure/instructure-ui/compare/v6.24.0...v6.25.0) (2020-04-27)

**Note:** Version bump only for package @instructure/ui-date-input

# [6.24.0](https://github.com/instructure/instructure-ui/compare/v6.23.0...v6.24.0) (2020-04-14)

**Note:** Version bump only for package @instructure/ui-date-input

# [6.23.0](https://github.com/instructure/instructure-ui/compare/v6.22.0...v6.23.0) (2020-04-02)

**Note:** Version bump only for package @instructure/ui-date-input

# [6.22.0](https://github.com/instructure/instructure-ui/compare/v6.21.0...v6.22.0) (2020-03-16)

### Bug Fixes

- **ui-date-input:** allow passthrough props in DateInput ([7228baa](https://github.com/instructure/instructure-ui/commit/7228baa))

# [6.21.0](https://github.com/instructure/instructure-ui/compare/v6.20.0...v6.21.0) (2020-02-26)

**Note:** Version bump only for package @instructure/ui-date-input

# [6.20.0](https://github.com/instructure/instructure-ui/compare/v6.19.0...v6.20.0) (2020-02-13)

**Note:** Version bump only for package @instructure/ui-date-input

# [6.19.0](https://github.com/instructure/instructure-ui/compare/v6.18.0...v6.19.0) (2020-02-11)

### Features

- undeprecate disabled and readOnly in inputs ([79cf68f](https://github.com/instructure/instructure-ui/commit/79cf68f))

# [6.18.0](https://github.com/instructure/instructure-ui/compare/v6.17.0...v6.18.0) (2020-02-04)

**Note:** Version bump only for package @instructure/ui-date-input

# [6.17.0](https://github.com/instructure/instructure-ui/compare/v6.16.0...v6.17.0) (2020-01-22)

### Bug Fixes

- Update Package READMEs and align deprecation statements ([8f892e4](https://github.com/instructure/instructure-ui/commit/8f892e4))

# [6.16.0](https://github.com/instructure/instructure-ui/compare/v6.15.0...v6.16.0) (2019-12-13)

**Note:** Version bump only for package @instructure/ui-date-input

# [6.15.0](https://github.com/instructure/instructure-ui/compare/v6.14.0...v6.15.0) (2019-11-18)

### Features

- **ui-calendar:** reduce calendar test noise ([b5fea9b](https://github.com/instructure/instructure-ui/commit/b5fea9b))
- **ui-popover:** make ui-popover backwards compatible ([d9437ae](https://github.com/instructure/instructure-ui/commit/d9437ae))

# [6.14.0](https://github.com/instructure/instructure-ui/compare/v6.13.0...v6.14.0) (2019-10-14)

### Features

- **ui-position:** add ui-position package ([5511a88](https://github.com/instructure/instructure-ui/commit/5511a88))

# [6.13.0](https://github.com/instructure/instructure-ui/compare/v6.12.0...v6.13.0) (2019-09-24)

**Note:** Version bump only for package @instructure/ui-date-input

# [6.12.0](https://github.com/instructure/instructure-ui/compare/v6.11.0...v6.12.0) (2019-09-17)

**Note:** Version bump only for package @instructure/ui-date-input

# [6.11.0](https://github.com/instructure/instructure-ui/compare/v6.10.0...v6.11.0) (2019-09-16)

### Features

- **ui-popover:** Add ui-popover package ([62c1165](https://github.com/instructure/instructure-ui/commit/62c1165))

# [6.10.0](https://github.com/instructure/instructure-ui/compare/v6.9.0...v6.10.0) (2019-08-27)

**Note:** Version bump only for package @instructure/ui-date-input

# [6.9.0](https://github.com/instructure/instructure-ui/compare/v6.8.1...v6.9.0) (2019-08-07)

**Note:** Version bump only for package @instructure/ui-date-input

## [6.8.1](https://github.com/instructure/instructure-ui/compare/v6.8.0...v6.8.1) (2019-08-02)

**Note:** Version bump only for package @instructure/ui-date-input

# [6.8.0](https://github.com/instructure/instructure-ui/compare/v6.7.0...v6.8.0) (2019-07-31)

### Bug Fixes

- **ui-select,ui-selectable:** stop event propagation from selectable ([fc75997](https://github.com/instructure/instructure-ui/commit/fc75997))

# [6.7.0](https://github.com/instructure/instructure-ui/compare/v6.6.0...v6.7.0) (2019-07-15)

**Note:** Version bump only for package @instructure/ui-date-input

# [6.6.0](https://github.com/instructure/instructure-ui/compare/v6.5.0...v6.6.0) (2019-07-03)

**Note:** Version bump only for package @instructure/ui-date-input

# [6.5.0](https://github.com/instructure/instructure-ui/compare/v6.4.0...v6.5.0) (2019-07-01)

### Bug Fixes

- **ui-date-input:** align calendar icon ([32c9d9d](https://github.com/instructure/instructure-ui/commit/32c9d9d))
- **ui-date-input,ui-text-input:** add assistiveText prop to DateInput ([20ed322](https://github.com/instructure/instructure-ui/commit/20ed322))
- **ui-text-input:** update TextInput prop names ([3aedab8](https://github.com/instructure/instructure-ui/commit/3aedab8))

### Features

- **instui-config,ui-date-input:** dateInput change label prop to renderLabel ([a172999](https://github.com/instructure/instructure-ui/commit/a172999))

# [6.4.0](https://github.com/instructure/instructure-ui/compare/v6.3.0...v6.4.0) (2019-06-13)

**Note:** Version bump only for package @instructure/ui-date-input

# [6.3.0](https://github.com/instructure/instructure-ui/compare/v6.2.0...v6.3.0) (2019-05-28)

**Note:** Version bump only for package @instructure/ui-date-input

# [6.2.0](https://github.com/instructure/instructure-ui/compare/v6.1.0...v6.2.0) (2019-05-13)

**Note:** Version bump only for package @instructure/ui-date-input

# [6.1.0](https://github.com/instructure/instructure-ui/compare/v6.0.0...v6.1.0) (2019-05-09)

**Note:** Version bump only for package @instructure/ui-date-input

# [6.0.0](https://github.com/instructure/instructure-ui/compare/v5.52.3...v6.0.0) (2019-05-03)

### Features

- remove deprecated packages/props ([1d8813c](https://github.com/instructure/instructure-ui/commit/1d8813c))
- **ui-babel-preset:** transform member imports to full paths ([d02cc45](https://github.com/instructure/instructure-ui/commit/d02cc45))
- **ui-dom-utils,ui-react-utils,ui-color-utils:** new utils packages ([03e8ee2](https://github.com/instructure/instructure-ui/commit/03e8ee2))

### Performance Improvements

- **ui-icons,ui-icons-build:** remove default exports for React icons ([95195ee](https://github.com/instructure/instructure-ui/commit/95195ee))

### BREAKING CHANGES

- - ui-core package has been removed

## [5.52.3](https://github.com/instructure/instructure-ui/compare/v5.52.2...v5.52.3) (2019-04-25)

**Note:** Version bump only for package @instructure/ui-date-input

## [5.52.2](https://github.com/instructure/instructure-ui/compare/v5.52.1...v5.52.2) (2019-04-17)

### Bug Fixes

- **ui-calendar,ui-date-input,ui-table:** align week labels in center ([2ec0d82](https://github.com/instructure/instructure-ui/commit/2ec0d82))
- **ui-date-input:** improve onRequestValidateDate documentation ([faa04db](https://github.com/instructure/instructure-ui/commit/faa04db))

## [5.52.1](https://github.com/instructure/instructure-ui/compare/v5.52.0...v5.52.1) (2019-04-08)

**Note:** Version bump only for package @instructure/ui-date-input

# [5.52.0](https://github.com/instructure/instructure-ui/compare/v5.51.1...v5.52.0) (2019-04-03)

### Features

- **console:** remove console statements in prod env ([603c738](https://github.com/instructure/instructure-ui/commit/603c738))

## [5.51.1](https://github.com/instructure/instructure-ui/compare/v5.51.0...v5.51.1) (2019-03-30)

**Note:** Version bump only for package @instructure/ui-date-input

# [5.51.0](https://github.com/instructure/instructure-ui/compare/v5.50.0...v5.51.0) (2019-03-29)

**Note:** Version bump only for package @instructure/ui-date-input

# [5.50.0](https://github.com/instructure/instructure-ui/compare/v5.49.0...v5.50.0) (2019-03-28)

**Note:** Version bump only for package @instructure/ui-date-input

# [5.49.0](https://github.com/instructure/instructure-ui/compare/v5.48.0...v5.49.0) (2019-03-22)

### Bug Fixes

- **ui-test-utils:** preserve built-in behavior of chai contain method ([a7b266e](https://github.com/instructure/instructure-ui/commit/a7b266e))

### Features

- **ui-date-input:** A controlled DateInput ([e558771](https://github.com/instructure/instructure-ui/commit/e558771))

See the instructure-ui mono-repo [change log](#CHANGELOG) for past changes.
