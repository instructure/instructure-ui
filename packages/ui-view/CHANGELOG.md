# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [8.6.0](https://github.com/instructure/instructure-ui/compare/v8.5.0...v8.6.0) (2021-06-18)

**Note:** Version bump only for package @instructure/ui-view

# [8.5.0](https://github.com/instructure/instructure-ui/compare/v8.4.0...v8.5.0) (2021-06-09)

### Bug Fixes

- **emotion:** add componentId to match with componenet name in docs ([cc255eb](https://github.com/instructure/instructure-ui/commit/cc255ebef149ffe19a2102a179c1e7765b633888))

# [8.4.0](https://github.com/instructure/instructure-ui/compare/v8.3.0...v8.4.0) (2021-05-11)

### Bug Fixes

- fix all inter-package dependencies using fix version ([75cd898](https://github.com/instructure/instructure-ui/commit/75cd8983b7e206e4e14dc67c490c103cb4a3d915))

# [8.3.0](https://github.com/instructure/instructure-ui/compare/v8.2.1...v8.3.0) (2021-05-04)

**Note:** Version bump only for package @instructure/ui-view

## [8.2.1](https://github.com/instructure/instructure-ui/compare/v8.2.0...v8.2.1) (2021-04-22)

**Note:** Version bump only for package @instructure/ui-view

# [8.2.0](https://github.com/instructure/instructure-ui/compare/v8.1.0...v8.2.0) (2021-04-22)

**Note:** Version bump only for package @instructure/ui-view

# [8.1.0](https://github.com/instructure/instructure-ui/compare/v8.0.0...v8.1.0) (2021-04-15)

**Note:** Version bump only for package @instructure/ui-view

# [8.0.0](https://github.com/instructure/instructure-ui/compare/v7.5.0...v8.0.0) (2021-03-29)

### Code Refactoring

- **Migrated the package and it's component(s) from using `ui-themeable` to using the new theming solution based on [emotion.js](https://emotion.sh/).**
- **emotion,ui-themeable:** move ThemeablePropValues and ThemeablePropTypes util to emotion pack ([2d0ac1d](https://github.com/instructure/instructure-ui/commit/2d0ac1d3d4ae60802f639bee2545f9a8a32446b6))
- **emotion,ui-themeable,ui-view:** move `getShorthandPropValue` from `ui-themeable` to emotion ([91fd876](https://github.com/instructure/instructure-ui/commit/91fd876068b535e159367d46115782156e6a159a))
- **emotion,`ui-themeable`,ui-view:** move `makeThemeVars` util from `ui-themeable` to emotion ([f2291ba](https://github.com/instructure/instructure-ui/commit/f2291ba19ae680fe5202e2ea9508157950f14a38))
- **emotion,`ui-themeable`,ui-view:** move `mirrorShorthand` utils to emotion ([c779407](https://github.com/instructure/instructure-ui/commit/c77940764c1ee2b99d6fe7a55a8fd6aaf2b07197))
- **ui-view:** remove deprecated themeAdapter ([bbfb295](https://github.com/instructure/instructure-ui/commit/bbfb2950223a718a31eac4eb78bd95680e0981a5))
- **ui-view:** removed deprecated `focused` prop ([3980814](https://github.com/instructure/instructure-ui/commit/3980814a1c2780249dd41a373721c22298895a30))
- **ui-view:** removed deprecated `visualDebug` prop ([6d8e0bb](https://github.com/instructure/instructure-ui/commit/6d8e0bb55ef5a6ffa1d30b65879bcdc2ead99569))

### BREAKING CHANGES

- **emotion,ui-themeable,ui-view:** Moved `mirrorShorthand`, `mirrorShorthandEdges`, `mirrorShorthandCorners` utils to from
  `ui-themeable` to `emotion` package.
- **emotion,ui-themeable,ui-view:** Moved `getShorthandPropValue` from `ui-themeable` to `emotion` package.
- **emotion,ui-themeable,ui-view:** Moved `makeThemeVars` util from `ui-themeable` to `emotion` package.
- **emotion,ui-themeable:** Moved `ThemeablePropValues` and `ThemeablePropTypes` utils from `ui-themeable`to `emotion` package.
- **ui-view:** Removed themeAdapter for deprecated theme variables: 'borderColorDefault' is now
  `borderColorPrimary`, 'borderColorInverse' is now `borderColorTransparent`, 'colorInverse' is now
  `colorPrimaryInverse`, 'background' is now `backgroundPrimary`, 'backgroundLight' is now
  `backgroundSecondary`, 'backgroundInverse' is now `backgroundPrimaryInverse`.
- **ui-view:** Removed deprecated `visualDebug` prop, use `withVisualDebug` instead.
- **ui-view:** Removed deprecated `focused` prop, use `withFocusOutline` instead.
- **ui-position,ui-view:** The "box-sizing" and "z-index" css properties are now added as inline css on the Content element,
  might break other rules added in class.

# [7.5.0](https://github.com/instructure/instructure-ui/compare/v7.4.4...v7.5.0) (2021-03-22)

**Note:** Version bump only for package @instructure/ui-view

## [7.4.4](https://github.com/instructure/instructure-ui/compare/v7.4.3...v7.4.4) (2021-03-12)

**Note:** Version bump only for package @instructure/ui-view

## [7.4.3](https://github.com/instructure/instructure-ui/compare/v7.4.1...v7.4.3) (2021-03-11)

**Note:** Version bump only for package @instructure/ui-view

## [7.4.2](https://github.com/instructure/instructure-ui/compare/v7.4.1...v7.4.2) (2021-03-11)

**Note:** Version bump only for package @instructure/ui-view

## [7.4.1](https://github.com/instructure/instructure-ui/compare/v7.4.0...v7.4.1) (2021-03-04)

### Bug Fixes

- **all:** Fix package imports, now everything can be imported; fix test:all in main package.json ([2f11024](https://github.com/instructure/instructure-ui/commit/2f11024))

# [7.4.0](https://github.com/instructure/instructure-ui/compare/v7.3.5...v7.4.0) (2021-02-01)

**Note:** Version bump only for package @instructure/ui-view

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

**Note:** Version bump only for package @instructure/ui-view

## [7.3.1](https://github.com/instructure/instructure-ui/compare/v7.3.0...v7.3.1) (2020-11-30)

**Note:** Version bump only for package @instructure/ui-view

# [7.3.0](https://github.com/instructure/instructure-ui/compare/v7.2.4...v7.3.0) (2020-10-26)

**Note:** Version bump only for package @instructure/ui-view

## [7.2.4](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.4) (2020-10-09)

**Note:** Version bump only for package @instructure/ui-view

## [7.2.3](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.3) (2020-10-08)

**Note:** Version bump only for package @instructure/ui-view

## [7.2.2](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.2) (2020-10-08)

**Note:** Version bump only for package @instructure/ui-view

## [7.2.1](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.1) (2020-10-07)

**Note:** Version bump only for package @instructure/ui-view

# [7.2.0](https://github.com/instructure/instructure-ui/compare/v7.1.4...v7.2.0) (2020-09-23)

**Note:** Version bump only for package @instructure/ui-view

## [7.1.4](https://github.com/instructure/instructure-ui/compare/v7.1.3...v7.1.4) (2020-09-09)

**Note:** Version bump only for package @instructure/ui-view

## [7.1.3](https://github.com/instructure/instructure-ui/compare/v7.1.2...v7.1.3) (2020-08-10)

**Note:** Version bump only for package @instructure/ui-view

## [7.1.2](https://github.com/instructure/instructure-ui/compare/v7.1.1...v7.1.2) (2020-07-17)

**Note:** Version bump only for package @instructure/ui-view

## [7.1.1](https://github.com/instructure/instructure-ui/compare/v7.1.0...v7.1.1) (2020-07-01)

**Note:** Version bump only for package @instructure/ui-view

# [7.1.0](https://github.com/instructure/instructure-ui/compare/v7.0.0...v7.1.0) (2020-06-25)

**Note:** Version bump only for package @instructure/ui-view

# [7.0.0](https://github.com/instructure/instructure-ui/compare/v6.26.0...v7.0.0) (2020-05-27)

### Bug Fixes

- **ui-popover:** reduce tooltip flickering ([461d3fe](https://github.com/instructure/instructure-ui/commit/461d3fe))

### chore

- bump minimum react version to 16.8.0 ([7a96f00](https://github.com/instructure/instructure-ui/commit/7a96f00))
- remove references to React 15 ([4bb2426](https://github.com/instructure/instructure-ui/commit/4bb2426))
- remove canvas-ams-theme ([91f1336](https://github.com/instructure/instructure-ui/commit/91f1336))

### BREAKING CHANGES

- - Removed the `canvas-ams-theme` package. Use `canvas-theme` instead.

Change-Id: I077f6b8cbbef9ee12e5904fb4c9dc4b48409acbb
Reviewed-on: https://gerrit.instructure.com/c/instructure-ui/+/237960
Tested-by: Service Cloud Jenkins <svc.cloudjenkins@instructure.com>
Reviewed-by: Steve Jensen <sejensen@instructure.com>
QA-Review: Daniel Sasaki <dsasaki@instructure.com>
Product-Review: Steve Jensen <sejensen@instructure.com>
Visual-Regression-Test: Steve Jensen <sejensen@instructure.com>

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

**Note:** Version bump only for package @instructure/ui-view

# [6.25.0](https://github.com/instructure/instructure-ui/compare/v6.24.0...v6.25.0) (2020-04-27)

**Note:** Version bump only for package @instructure/ui-view

# [6.24.0](https://github.com/instructure/instructure-ui/compare/v6.23.0...v6.24.0) (2020-04-14)

### Bug Fixes

- **ui-view:** optimize View in test and prod ([3d4ea25](https://github.com/instructure/instructure-ui/commit/3d4ea25))

# [6.23.0](https://github.com/instructure/instructure-ui/compare/v6.22.0...v6.23.0) (2020-04-02)

### Features

- **instui-config,canvas-ams-theme,ui-themes,ui-view:** add canvas-ams-theme ([f31849f](https://github.com/instructure/instructure-ui/commit/f31849f))

# [6.22.0](https://github.com/instructure/instructure-ui/compare/v6.21.0...v6.22.0) (2020-03-16)

**Note:** Version bump only for package @instructure/ui-view

# [6.21.0](https://github.com/instructure/instructure-ui/compare/v6.20.0...v6.21.0) (2020-02-26)

**Note:** Version bump only for package @instructure/ui-view

# [6.20.0](https://github.com/instructure/instructure-ui/compare/v6.19.0...v6.20.0) (2020-02-13)

**Note:** Version bump only for package @instructure/ui-view

# [6.19.0](https://github.com/instructure/instructure-ui/compare/v6.18.0...v6.19.0) (2020-02-11)

**Note:** Version bump only for package @instructure/ui-view

# [6.18.0](https://github.com/instructure/instructure-ui/compare/v6.17.0...v6.18.0) (2020-02-04)

**Note:** Version bump only for package @instructure/ui-view

# [6.17.0](https://github.com/instructure/instructure-ui/compare/v6.16.0...v6.17.0) (2020-01-22)

### Bug Fixes

- Update Package READMEs and align deprecation statements ([8f892e4](https://github.com/instructure/instructure-ui/commit/8f892e4))

# [6.16.0](https://github.com/instructure/instructure-ui/compare/v6.15.0...v6.16.0) (2019-12-13)

**Note:** Version bump only for package @instructure/ui-view

# [6.15.0](https://github.com/instructure/instructure-ui/compare/v6.14.0...v6.15.0) (2019-11-18)

### Bug Fixes

- **ui-view:** allow View to use native browser focus ([7686f1b](https://github.com/instructure/instructure-ui/commit/7686f1b))

### Features

- **ui-list:** add ui-list package ([7c867af](https://github.com/instructure/instructure-ui/commit/7c867af))
- **ui-view:** Make ui-view backwards-compatible ([7dd2a2f](https://github.com/instructure/instructure-ui/commit/7dd2a2f))
- **ui-view:** move ContextView to ui-view package ([4601b4a](https://github.com/instructure/instructure-ui/commit/4601b4a))

# [6.14.0](https://github.com/instructure/instructure-ui/compare/v6.13.0...v6.14.0) (2019-10-14)

### Performance Improvements

- **ui-view:** don't call verifySpanMargin in prod mode ([60e0c2f](https://github.com/instructure/instructure-ui/commit/60e0c2f))

# [6.13.0](https://github.com/instructure/instructure-ui/compare/v6.12.0...v6.13.0) (2019-09-24)

### Features

- **ui-elements,ui-pill:** add ui-pill package for the Pill Component ([4a71024](https://github.com/instructure/instructure-ui/commit/4a71024))

# [6.12.0](https://github.com/instructure/instructure-ui/compare/v6.11.0...v6.12.0) (2019-09-17)

**Note:** Version bump only for package @instructure/ui-view

# [6.11.0](https://github.com/instructure/instructure-ui/compare/v6.10.0...v6.11.0) (2019-09-16)

### Bug Fixes

- **ui-view:** fix border colors in Edge HCM ([091dde3](https://github.com/instructure/instructure-ui/commit/091dde3))

### Features

- **ui-view:** add ui-view Package for View Component ([7799577](https://github.com/instructure/instructure-ui/commit/7799577))
- **ui-view:** mark ui-view as experimental ([6b805fa](https://github.com/instructure/instructure-ui/commit/6b805fa))

See the instructure-ui mono-repo [change log](#CHANGELOG) for past changes.
