# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [8.3.0](https://github.com/instructure/instructure-ui/compare/v8.2.1...v8.3.0) (2021-05-04)

**Note:** Version bump only for package @instructure/ui-popover

## [8.2.1](https://github.com/instructure/instructure-ui/compare/v8.2.0...v8.2.1) (2021-04-22)

**Note:** Version bump only for package @instructure/ui-popover

# [8.2.0](https://github.com/instructure/instructure-ui/compare/v8.1.0...v8.2.0) (2021-04-22)

**Note:** Version bump only for package @instructure/ui-popover

# [8.1.0](https://github.com/instructure/instructure-ui/compare/v8.0.0...v8.1.0) (2021-04-15)

**Note:** Version bump only for package @instructure/ui-popover

# [8.0.0](https://github.com/instructure/instructure-ui/compare/v7.5.0...v8.0.0) (2021-03-29)

### Bug Fixes

- **ui-popover:** tooltips dont dismiss when hovered over (a11y) ([7b166c1](https://github.com/instructure/instructure-ui/commit/7b166c1a0c6701bf95a2f85059bdfecf514271f2))

### Code Refactoring

- **emotion,ui-themeable:** move ThemeablePropValues and ThemeablePropTypes util to emotion pack ([2d0ac1d](https://github.com/instructure/instructure-ui/commit/2d0ac1d3d4ae60802f639bee2545f9a8a32446b6))
- **ui-popover:** removed deprecated `alignArrow` prop ([3799228](https://github.com/instructure/instructure-ui/commit/3799228e2a80284422e96bc5053b217055a6b324))
- **ui-popover:** removed deprecated `defaultShow` prop ([ecfb67f](https://github.com/instructure/instructure-ui/commit/ecfb67f1ff45893295d0fc4a916fecc0751b6b30))
- **ui-popover:** removed deprecated `label` prop ([efb32a7](https://github.com/instructure/instructure-ui/commit/efb32a7e97f3b0a3ada4528ed408d405d5c89f39))
- **ui-popover:** removed deprecated `onDismiss` prop ([5a39dd6](https://github.com/instructure/instructure-ui/commit/5a39dd6c54d3e26d9a06e1d875f12a29a8d08e7f))
- **ui-popover:** removed deprecated `onShow` prop ([43007c0](https://github.com/instructure/instructure-ui/commit/43007c028f4d790297d78dd95b151177c0d28e73))
- **ui-popover:** removed deprecated `onToggle` prop ([bdfcda8](https://github.com/instructure/instructure-ui/commit/bdfcda8963a720335ee51bdf14a7a2f8ceb86de2))
- **ui-popover:** removed deprecated `PopoverContent` component ([5e5cf71](https://github.com/instructure/instructure-ui/commit/5e5cf7153eea46664df346089d39de10621caa9f))
- **ui-popover:** removed deprecated `PopoverTrigger` component ([9768ade](https://github.com/instructure/instructure-ui/commit/9768adef486c2dfcbe1bbded0ac17ec6698adfaa))
- **ui-popover:** removed deprecated `show` prop ([6000c93](https://github.com/instructure/instructure-ui/commit/6000c9366fd2d6820aa366f3caaea59edd032f3f))
- **ui-popover:** removed deprecated `trackPosition` prop ([e60e89b](https://github.com/instructure/instructure-ui/commit/e60e89b60d6f6bb37612cfc7935df1a3b8e00e4c))
- **ui-popover:** removed deprecated `variant` prop ([1d16dff](https://github.com/instructure/instructure-ui/commit/1d16dff819b1f15b8f684be8fb317da70c31812b))

### BREAKING CHANGES

- **emotion,ui-themeable:** Moved `ThemeablePropValues` and `ThemeablePropTypes` utils from `ui-themeable`to `emotion` package.
- **ui-popover:** Removed deprecated `onDismiss` prop, use `onHideContent` instead.
- **ui-popover:** Removed deprecated `alignArrow` prop, use `shouldAlignArrow` instead.
- **ui-popover:** Removed deprecated `trackPosition` prop, use `shouldTrackPosition` instead.
- **ui-popover:** Removed deprecated `label` prop, use `screenReaderLabel` instead.
- **ui-popover:** Removed deprecated `variant` prop, use `color` ('primary' or 'primary-inverse') instead.
- **ui-popover:** Removed deprecated `defaultShow` prop, use `defaultIsShowingContent` instead.
- **ui-popover:** Removed deprecated `show` prop, use `isShowingContent` instead.
- **ui-popover:** Removed deprecated `onToggle` prop, use `onShowContent` and `onHideContent` instead.
- **ui-popover:** Removed deprecated `onShow` prop, use `onPositioned` instead.
- **ui-popover:** Removed deprecated `PopoverContent` component, use Popover's `children` instead.
- **ui-popover:** Removed deprecated `PopoverTrigger` component, use Popover's `renderTrigger` prop instead.

# [7.5.0](https://github.com/instructure/instructure-ui/compare/v7.4.4...v7.5.0) (2021-03-22)

**Note:** Version bump only for package @instructure/ui-popover

## [7.4.4](https://github.com/instructure/instructure-ui/compare/v7.4.3...v7.4.4) (2021-03-12)

**Note:** Version bump only for package @instructure/ui-popover

## [7.4.3](https://github.com/instructure/instructure-ui/compare/v7.4.1...v7.4.3) (2021-03-11)

**Note:** Version bump only for package @instructure/ui-popover

## [7.4.2](https://github.com/instructure/instructure-ui/compare/v7.4.1...v7.4.2) (2021-03-11)

**Note:** Version bump only for package @instructure/ui-popover

## [7.4.1](https://github.com/instructure/instructure-ui/compare/v7.4.0...v7.4.1) (2021-03-04)

### Bug Fixes

- **all:** Fix package imports, now everything can be imported; fix test:all in main package.json ([2f11024](https://github.com/instructure/instructure-ui/commit/2f11024))

# [7.4.0](https://github.com/instructure/instructure-ui/compare/v7.3.5...v7.4.0) (2021-02-01)

**Note:** Version bump only for package @instructure/ui-popover

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

**Note:** Version bump only for package @instructure/ui-popover

## [7.3.1](https://github.com/instructure/instructure-ui/compare/v7.3.0...v7.3.1) (2020-11-30)

**Note:** Version bump only for package @instructure/ui-popover

# [7.3.0](https://github.com/instructure/instructure-ui/compare/v7.2.4...v7.3.0) (2020-10-26)

**Note:** Version bump only for package @instructure/ui-popover

## [7.2.4](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.4) (2020-10-09)

**Note:** Version bump only for package @instructure/ui-popover

## [7.2.3](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.3) (2020-10-08)

**Note:** Version bump only for package @instructure/ui-popover

## [7.2.2](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.2) (2020-10-08)

**Note:** Version bump only for package @instructure/ui-popover

## [7.2.1](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.1) (2020-10-07)

**Note:** Version bump only for package @instructure/ui-popover

# [7.2.0](https://github.com/instructure/instructure-ui/compare/v7.1.4...v7.2.0) (2020-09-23)

**Note:** Version bump only for package @instructure/ui-popover

## [7.1.4](https://github.com/instructure/instructure-ui/compare/v7.1.3...v7.1.4) (2020-09-09)

**Note:** Version bump only for package @instructure/ui-popover

## [7.1.3](https://github.com/instructure/instructure-ui/compare/v7.1.2...v7.1.3) (2020-08-10)

**Note:** Version bump only for package @instructure/ui-popover

## [7.1.2](https://github.com/instructure/instructure-ui/compare/v7.1.1...v7.1.2) (2020-07-17)

**Note:** Version bump only for package @instructure/ui-popover

## [7.1.1](https://github.com/instructure/instructure-ui/compare/v7.1.0...v7.1.1) (2020-07-01)

**Note:** Version bump only for package @instructure/ui-popover

# [7.1.0](https://github.com/instructure/instructure-ui/compare/v7.0.0...v7.1.0) (2020-06-25)

**Note:** Version bump only for package @instructure/ui-popover

# [7.0.0](https://github.com/instructure/instructure-ui/compare/v6.26.0...v7.0.0) (2020-05-27)

### Bug Fixes

- **ui-popover:** reduce tooltip flickering ([461d3fe](https://github.com/instructure/instructure-ui/commit/461d3fe))

### chore

- bump minimum react version to 16.8.0 ([7a96f00](https://github.com/instructure/instructure-ui/commit/7a96f00))
- remove references to React 15 ([4bb2426](https://github.com/instructure/instructure-ui/commit/4bb2426))

### Features

- **ui-docs-client:** Docs/homepage refresh ([ee4957b](https://github.com/instructure/instructure-ui/commit/ee4957b))

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

**Note:** Version bump only for package @instructure/ui-popover

# [6.25.0](https://github.com/instructure/instructure-ui/compare/v6.24.0...v6.25.0) (2020-04-27)

**Note:** Version bump only for package @instructure/ui-popover

# [6.24.0](https://github.com/instructure/instructure-ui/compare/v6.23.0...v6.24.0) (2020-04-14)

**Note:** Version bump only for package @instructure/ui-popover

# [6.23.0](https://github.com/instructure/instructure-ui/compare/v6.22.0...v6.23.0) (2020-04-02)

**Note:** Version bump only for package @instructure/ui-popover

# [6.22.0](https://github.com/instructure/instructure-ui/compare/v6.21.0...v6.22.0) (2020-03-16)

### Bug Fixes

- **ui-popover:** allow tooltip to manage its focus region ([8391f4f](https://github.com/instructure/instructure-ui/commit/8391f4f))

# [6.21.0](https://github.com/instructure/instructure-ui/compare/v6.20.0...v6.21.0) (2020-02-26)

**Note:** Version bump only for package @instructure/ui-popover

# [6.20.0](https://github.com/instructure/instructure-ui/compare/v6.19.0...v6.20.0) (2020-02-13)

**Note:** Version bump only for package @instructure/ui-popover

# [6.19.0](https://github.com/instructure/instructure-ui/compare/v6.18.0...v6.19.0) (2020-02-11)

**Note:** Version bump only for package @instructure/ui-popover

# [6.18.0](https://github.com/instructure/instructure-ui/compare/v6.17.0...v6.18.0) (2020-02-04)

### Features

- **ui-buttons:** Update CloseButton to use upgraded Button props ([365e0ac](https://github.com/instructure/instructure-ui/commit/365e0ac))

# [6.17.0](https://github.com/instructure/instructure-ui/compare/v6.16.0...v6.17.0) (2020-01-22)

### Bug Fixes

- Update Package READMEs and align deprecation statements ([8f892e4](https://github.com/instructure/instructure-ui/commit/8f892e4))

# [6.16.0](https://github.com/instructure/instructure-ui/compare/v6.15.0...v6.16.0) (2019-12-13)

**Note:** Version bump only for package @instructure/ui-popover

# [6.15.0](https://github.com/instructure/instructure-ui/compare/v6.14.0...v6.15.0) (2019-11-18)

### Features

- ensure all packages have build script for types ([4891dc4](https://github.com/instructure/instructure-ui/commit/4891dc4))
- Move React to a peer dependency ([9648ca3](https://github.com/instructure/instructure-ui/commit/9648ca3))
- **ui-a11y-utils,ui-dialog:** add ui-a11y-utils and ui-dialog ([c88cf8e](https://github.com/instructure/instructure-ui/commit/c88cf8e))
- **ui-popover:** make ui-popover backwards compatible ([d9437ae](https://github.com/instructure/instructure-ui/commit/d9437ae))
- **ui-position:** make ui-position backwards compatible ([24e90d1](https://github.com/instructure/instructure-ui/commit/24e90d1))
- **ui-view:** Make ui-view backwards-compatible ([7dd2a2f](https://github.com/instructure/instructure-ui/commit/7dd2a2f))
- **ui-view:** move ContextView to ui-view package ([4601b4a](https://github.com/instructure/instructure-ui/commit/4601b4a))

# [6.14.0](https://github.com/instructure/instructure-ui/compare/v6.13.0...v6.14.0) (2019-10-14)

### Features

- **ui-position:** add ui-position package ([5511a88](https://github.com/instructure/instructure-ui/commit/5511a88))

# [6.13.0](https://github.com/instructure/instructure-ui/compare/v6.12.0...v6.13.0) (2019-09-24)

**Note:** Version bump only for package @instructure/ui-popover

# [6.12.0](https://github.com/instructure/instructure-ui/compare/v6.11.0...v6.12.0) (2019-09-17)

**Note:** Version bump only for package @instructure/ui-popover

# [6.11.0](https://github.com/instructure/instructure-ui/compare/v6.10.0...v6.11.0) (2019-09-16)

### Features

- **ui-popover:** Add ui-popover package ([62c1165](https://github.com/instructure/instructure-ui/commit/62c1165))
- **ui-view:** mark ui-view as experimental ([6b805fa](https://github.com/instructure/instructure-ui/commit/6b805fa))

See the instructure-ui mono-repo [change log](#CHANGELOG) for past changes.
