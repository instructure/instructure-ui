# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [11.0.0](https://github.com/instructure/instructure-ui/compare/v10.26.0...v11.0.0) (2025-10-06)


### Bug Fixes

* **ui-drilldown:** fix for prevent option selection when Drilldown or its sub-components get disabled prop ([5fc37f6](https://github.com/instructure/instructure-ui/commit/5fc37f6b7c7622ab248a4d1bd575b2bbac97e0a0))


### Features

* **many:** instUI v11 release ([36f5438](https://github.com/instructure/instructure-ui/commit/36f54382669186227ba24798bbf7201ef2f5cd4c))


### BREAKING CHANGES

* **many:** InstUI v11 contains the following breaking changes:
- React 16 and 17 are no longer supported
- remove `PropTypes` from all packages
- remove `CodeEditor` component
- remove `@instui/theme-registry` package
- remove `@testable`, `@experimental`, `@hack` decorators
- InstUISettingsProvider's `as` prop is removed
- `canvas.use()`, `canvasHighContrast.use()` functions are removed
- `canvasThemeLocal`, `canvasHighContrastThemeLocal` are removed
- `variables` field on theme objects are removed
- remove deprecated props from Table: Row's `isStacked`, Body's
  `isStacked`, `hover`, and `headers`
- `Table`'s `caption` prop is now required
- `ui-dom-utils`'s `getComputedStyle` can now return `undefined`





# [10.26.0](https://github.com/instructure/instructure-ui/compare/v10.25.0...v10.26.0) (2025-10-01)


### Bug Fixes

* **ui-utils,ui-drilldown:** make NDVA read options in Drilldown.Group correctly in Firefox ([994f158](https://github.com/instructure/instructure-ui/commit/994f15887ff7e1112208031514aa7e0ae134231b))


### Features

* **ui-drilldown:** make Drilldown.Page handle optional Options ([18f6a06](https://github.com/instructure/instructure-ui/commit/18f6a06f6a8b69ed0cd83bae7c11395f34375e9a))





# [10.25.0](https://github.com/instructure/instructure-ui/compare/v10.24.2...v10.25.0) (2025-09-09)

**Note:** Version bump only for package @instructure/ui-drilldown





## [10.24.2](https://github.com/instructure/instructure-ui/compare/v10.24.1...v10.24.2) (2025-08-11)

**Note:** Version bump only for package @instructure/ui-drilldown





## [10.24.1](https://github.com/instructure/instructure-ui/compare/v10.24.0...v10.24.1) (2025-07-30)


### Bug Fixes

* **ui-view,ui-position,ui-popover:** fix 'stretch' placement in Popover/ContextView ([f65acd5](https://github.com/instructure/instructure-ui/commit/f65acd5da879fb814c2e5a0d22319a502851fff3))





# [10.24.0](https://github.com/instructure/instructure-ui/compare/v10.23.0...v10.24.0) (2025-07-18)

**Note:** Version bump only for package @instructure/ui-drilldown





# [10.23.0](https://github.com/instructure/instructure-ui/compare/v10.22.0...v10.23.0) (2025-07-09)

**Note:** Version bump only for package @instructure/ui-drilldown





# [10.22.0](https://github.com/instructure/instructure-ui/compare/v10.21.0...v10.22.0) (2025-07-04)

**Note:** Version bump only for package @instructure/ui-drilldown





# [10.21.0](https://github.com/instructure/instructure-ui/compare/v10.20.1...v10.21.0) (2025-06-27)

**Note:** Version bump only for package @instructure/ui-drilldown





## [10.20.1](https://github.com/instructure/instructure-ui/compare/v10.20.0...v10.20.1) (2025-06-17)

**Note:** Version bump only for package @instructure/ui-drilldown





# [10.20.0](https://github.com/instructure/instructure-ui/compare/v10.19.1...v10.20.0) (2025-06-13)


### Bug Fixes

* **many:** update dependencies, browsersdb and moment timezone database ([3813636](https://github.com/instructure/instructure-ui/commit/3813636458c901ad4bc74a4d5ae015cb55defcb2))
* **ui-top-nav-bar,ui-popover,ui-drilldown:** automatically set aria-expanded, allow override with shouldSetAriaExpanded ([b8e1367](https://github.com/instructure/instructure-ui/commit/b8e13674a2e700e44162a29ca61ead4fd98ce193))





## [10.19.1](https://github.com/instructure/instructure-ui/compare/v10.19.0...v10.19.1) (2025-06-05)


### Bug Fixes

* **ui-drilldown:** fix highlighting first drilldown option if it is in a group ([3cc159b](https://github.com/instructure/instructure-ui/commit/3cc159bb0b6591bfb10eeeb6558dd384b09649d6))





# [10.19.0](https://github.com/instructure/instructure-ui/compare/v10.18.1...v10.19.0) (2025-06-03)


### Bug Fixes

* **many:** fix "not a valid selector" exception when an option ID contains quotes ([78e0b96](https://github.com/instructure/instructure-ui/commit/78e0b96edf29f3d476ba30b03134f1726bbdd0f4))





## [10.18.1](https://github.com/instructure/instructure-ui/compare/v10.18.0...v10.18.1) (2025-05-29)


### Bug Fixes

* **ui-top-nav-bar,ui-popover,ui-drilldown:** fix Drilldown's and TopNavBar's keyboard navigation issues ([6d7d3fa](https://github.com/instructure/instructure-ui/commit/6d7d3faa6c9fe8e7f2b987cb11ec2d9b00732d5b))





# [10.18.0](https://github.com/instructure/instructure-ui/compare/v10.17.0...v10.18.0) (2025-05-26)

**Note:** Version bump only for package @instructure/ui-drilldown





# [10.17.0](https://github.com/instructure/instructure-ui/compare/v10.16.4...v10.17.0) (2025-05-20)

**Note:** Version bump only for package @instructure/ui-drilldown





## [10.16.4](https://github.com/instructure/instructure-ui/compare/v10.16.3...v10.16.4) (2025-05-09)

**Note:** Version bump only for package @instructure/ui-drilldown





## [10.16.3](https://github.com/instructure/instructure-ui/compare/v10.16.1...v10.16.3) (2025-04-30)

**Note:** Version bump only for package @instructure/ui-drilldown





## [10.16.2](https://github.com/instructure/instructure-ui/compare/v10.16.1...v10.16.2) (2025-04-22)

**Note:** Version bump only for package @instructure/ui-drilldown





## [10.16.1](https://github.com/instructure/instructure-ui/compare/v10.16.0...v10.16.1) (2025-04-22)

**Note:** Version bump only for package @instructure/ui-drilldown





# [10.16.0](https://github.com/instructure/instructure-ui/compare/v10.15.2...v10.16.0) (2025-04-11)

**Note:** Version bump only for package @instructure/ui-drilldown





## [10.15.2](https://github.com/instructure/instructure-ui/compare/v10.15.1...v10.15.2) (2025-04-07)

**Note:** Version bump only for package @instructure/ui-drilldown





## [10.15.1](https://github.com/instructure/instructure-ui/compare/v10.15.0...v10.15.1) (2025-04-03)

**Note:** Version bump only for package @instructure/ui-drilldown





# [10.15.0](https://github.com/instructure/instructure-ui/compare/v10.14.0...v10.15.0) (2025-03-31)

**Note:** Version bump only for package @instructure/ui-drilldown





# [10.14.0](https://github.com/instructure/instructure-ui/compare/v10.13.0...v10.14.0) (2025-03-17)

**Note:** Version bump only for package @instructure/ui-drilldown





# [10.13.0](https://github.com/instructure/instructure-ui/compare/v10.12.0...v10.13.0) (2025-03-06)

**Note:** Version bump only for package @instructure/ui-drilldown





# [10.12.0](https://github.com/instructure/instructure-ui/compare/v10.11.0...v10.12.0) (2025-02-24)

**Note:** Version bump only for package @instructure/ui-drilldown





# [10.11.0](https://github.com/instructure/instructure-ui/compare/v10.10.0...v10.11.0) (2025-02-03)

**Note:** Version bump only for package @instructure/ui-drilldown





# [10.10.0](https://github.com/instructure/instructure-ui/compare/v10.9.0...v10.10.0) (2024-12-18)

**Note:** Version bump only for package @instructure/ui-drilldown





# [10.9.0](https://github.com/instructure/instructure-ui/compare/v10.8.0...v10.9.0) (2024-12-12)


### Features

* **many:** make meta package export every component and type definition ([dee9abb](https://github.com/instructure/instructure-ui/commit/dee9abb9cbffa4abc9edf48fb7d8ad41fea385b4))





# [10.8.0](https://github.com/instructure/instructure-ui/compare/v10.7.0...v10.8.0) (2024-12-09)

**Note:** Version bump only for package @instructure/ui-drilldown





# [10.7.0](https://github.com/instructure/instructure-ui/compare/v10.6.1...v10.7.0) (2024-12-03)

**Note:** Version bump only for package @instructure/ui-drilldown





## [10.6.1](https://github.com/instructure/instructure-ui/compare/v10.6.0...v10.6.1) (2024-11-26)

**Note:** Version bump only for package @instructure/ui-drilldown





# [10.6.0](https://github.com/instructure/instructure-ui/compare/v10.5.0...v10.6.0) (2024-11-18)


### Bug Fixes

* **many:** adjust border colors to meet a11y contrast standards ([2f47e06](https://github.com/instructure/instructure-ui/commit/2f47e066f7107c67e37ce8b7aff483586cf7a6b7))





# [10.5.0](https://github.com/instructure/instructure-ui/compare/v10.4.1...v10.5.0) (2024-11-07)

**Note:** Version bump only for package @instructure/ui-drilldown





## [10.4.1](https://github.com/instructure/instructure-ui/compare/v10.4.0...v10.4.1) (2024-10-28)


### Bug Fixes

* update license ([1c039d9](https://github.com/instructure/instructure-ui/commit/1c039d9cbf5a3ea99b59803ddde5c6c0b2d76ba5))





# [10.4.0](https://github.com/instructure/instructure-ui/compare/v10.3.0...v10.4.0) (2024-10-16)

**Note:** Version bump only for package @instructure/ui-drilldown





# [10.3.0](https://github.com/instructure/instructure-ui/compare/v10.2.2...v10.3.0) (2024-10-03)

**Note:** Version bump only for package @instructure/ui-drilldown





## [10.2.2](https://github.com/instructure/instructure-ui/compare/v10.2.1...v10.2.2) (2024-09-13)

**Note:** Version bump only for package @instructure/ui-drilldown





## [10.2.1](https://github.com/instructure/instructure-ui/compare/v10.2.0...v10.2.1) (2024-08-30)

**Note:** Version bump only for package @instructure/ui-drilldown





# [10.2.0](https://github.com/instructure/instructure-ui/compare/v10.0.0...v10.2.0) (2024-08-23)

**Note:** Version bump only for package @instructure/ui-drilldown





# [10.1.0](https://github.com/instructure/instructure-ui/compare/v10.0.0...v10.1.0) (2024-08-23)

**Note:** Version bump only for package @instructure/ui-drilldown





# [10.0.0](https://github.com/instructure/instructure-ui/compare/v9.5.1...v10.0.0) (2024-07-31)


### Features

* **many:** rewrite color system ([1e5809e](https://github.com/instructure/instructure-ui/commit/1e5809e28dee8c2a71703a429609b8d2f95d76e6))


### BREAKING CHANGES

* **many:** Breaks color overrides in certain cases





## [9.5.1](https://github.com/instructure/instructure-ui/compare/v9.5.0...v9.5.1) (2024-07-30)

**Note:** Version bump only for package @instructure/ui-drilldown





# [9.5.0](https://github.com/instructure/instructure-ui/compare/v9.3.0...v9.5.0) (2024-07-26)

**Note:** Version bump only for package @instructure/ui-drilldown





# [9.4.0](https://github.com/instructure/instructure-ui/compare/v9.3.0...v9.4.0) (2024-07-26)

**Note:** Version bump only for package @instructure/ui-drilldown





# [9.3.0](https://github.com/instructure/instructure-ui/compare/v9.2.0...v9.3.0) (2024-07-17)

**Note:** Version bump only for package @instructure/ui-drilldown





# [9.2.0](https://github.com/instructure/instructure-ui/compare/v9.1.0...v9.2.0) (2024-07-09)


### Bug Fixes

* **ui-drilldown:** index drilldown options to always preserve the correct order ([3159d06](https://github.com/instructure/instructure-ui/commit/3159d06eb7aad8573c2227f379af1e716b09e391))





# [9.1.0](https://github.com/instructure/instructure-ui/compare/v9.0.1...v9.1.0) (2024-06-14)

**Note:** Version bump only for package @instructure/ui-drilldown





## [9.0.1](https://github.com/instructure/instructure-ui/compare/v9.0.0...v9.0.1) (2024-05-09)

**Note:** Version bump only for package @instructure/ui-drilldown





# [9.0.0](https://github.com/instructure/instructure-ui/compare/v8.56.0...v9.0.0) (2024-05-09)

**Note:** Version bump only for package @instructure/ui-drilldown





# [8.56.0](https://github.com/instructure/instructure-ui/compare/v8.55.1...v8.56.0) (2024-05-06)

**Note:** Version bump only for package @instructure/ui-drilldown





## [8.55.1](https://github.com/instructure/instructure-ui/compare/v8.55.0...v8.55.1) (2024-04-30)

**Note:** Version bump only for package @instructure/ui-drilldown





# [8.55.0](https://github.com/instructure/instructure-ui/compare/v8.54.0...v8.55.0) (2024-04-09)

**Note:** Version bump only for package @instructure/ui-drilldown





# [8.54.0](https://github.com/instructure/instructure-ui/compare/v8.53.2...v8.54.0) (2024-03-21)

**Note:** Version bump only for package @instructure/ui-drilldown





## [8.53.2](https://github.com/instructure/instructure-ui/compare/v8.53.1...v8.53.2) (2024-02-15)

**Note:** Version bump only for package @instructure/ui-drilldown





## [8.53.1](https://github.com/instructure/instructure-ui/compare/v8.53.0...v8.53.1) (2024-02-09)

**Note:** Version bump only for package @instructure/ui-drilldown





# [8.53.0](https://github.com/instructure/instructure-ui/compare/v8.52.0...v8.53.0) (2024-02-08)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.52.0](https://github.com/instructure/instructure-ui/compare/v8.51.0...v8.52.0) (2024-02-02)

### Features

- **ui-drilldown,ui-top-nav-bar:** add shouldCloseOnClick ([c3df722](https://github.com/instructure/instructure-ui/commit/c3df7221b185996713a05d06ef585020bfa67c6b))

# [8.51.0](https://github.com/instructure/instructure-ui/compare/v8.50.0...v8.51.0) (2023-12-14)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.50.0](https://github.com/instructure/instructure-ui/compare/v8.49.0...v8.50.0) (2023-12-05)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.49.0](https://github.com/instructure/instructure-ui/compare/v8.48.3...v8.49.0) (2023-11-24)

**Note:** Version bump only for package @instructure/ui-drilldown

## [8.48.3](https://github.com/instructure/instructure-ui/compare/v8.48.2...v8.48.3) (2023-11-23)

**Note:** Version bump only for package @instructure/ui-drilldown

## [8.48.2](https://github.com/instructure/instructure-ui/compare/v8.48.1...v8.48.2) (2023-11-21)

**Note:** Version bump only for package @instructure/ui-drilldown

## [8.48.1](https://github.com/instructure/instructure-ui/compare/v8.48.0...v8.48.1) (2023-11-17)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.48.0](https://github.com/instructure/instructure-ui/compare/v8.47.1...v8.48.0) (2023-11-10)

**Note:** Version bump only for package @instructure/ui-drilldown

## [8.47.1](https://github.com/instructure/instructure-ui/compare/v8.47.0...v8.47.1) (2023-11-06)

### Bug Fixes

- **ui-drilldown:** fix cmd+click not working on drilldown items ([10e53ff](https://github.com/instructure/instructure-ui/commit/10e53ff8960885a09e5626d95eabbb6590526f52))

# [8.47.0](https://github.com/instructure/instructure-ui/compare/v8.46.1...v8.47.0) (2023-10-27)

**Note:** Version bump only for package @instructure/ui-drilldown

## [8.46.1](https://github.com/instructure/instructure-ui/compare/v8.46.0...v8.46.1) (2023-10-13)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.46.0](https://github.com/instructure/instructure-ui/compare/v8.45.0...v8.46.0) (2023-10-11)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.45.0](https://github.com/instructure/instructure-ui/compare/v8.44.0...v8.45.0) (2023-10-03)

### Bug Fixes

- **ui-drilldown:** call onBackButtonClicked function when ArrowLeft got pressed ([cd5e681](https://github.com/instructure/instructure-ui/commit/cd5e6814746b3fc42530c82c18409c6b7ad34ac3))

# [8.44.0](https://github.com/instructure/instructure-ui/compare/v8.43.1...v8.44.0) (2023-09-21)

**Note:** Version bump only for package @instructure/ui-drilldown

## [8.43.1](https://github.com/instructure/instructure-ui/compare/v8.43.0...v8.43.1) (2023-09-11)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.43.0](https://github.com/instructure/instructure-ui/compare/v8.41.1...v8.43.0) (2023-09-07)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.42.0](https://github.com/instructure/instructure-ui/compare/v8.41.1...v8.42.0) (2023-09-07)

**Note:** Version bump only for package @instructure/ui-drilldown

## [8.41.1](https://github.com/instructure/instructure-ui/compare/v8.41.0...v8.41.1) (2023-08-24)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.41.0](https://github.com/instructure/instructure-ui/compare/v8.40.1...v8.41.0) (2023-08-21)

**Note:** Version bump only for package @instructure/ui-drilldown

## [8.40.1](https://github.com/instructure/instructure-ui/compare/v8.40.0...v8.40.1) (2023-08-18)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.40.0](https://github.com/instructure/instructure-ui/compare/v8.39.0...v8.40.0) (2023-08-17)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.39.0](https://github.com/instructure/instructure-ui/compare/v8.38.1...v8.39.0) (2023-07-21)

**Note:** Version bump only for package @instructure/ui-drilldown

## [8.38.1](https://github.com/instructure/instructure-ui/compare/v8.38.0...v8.38.1) (2023-06-13)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.38.0](https://github.com/instructure/instructure-ui/compare/v8.37.0...v8.38.0) (2023-05-15)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.37.0](https://github.com/instructure/instructure-ui/compare/v8.36.0...v8.37.0) (2023-04-25)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.36.0](https://github.com/instructure/instructure-ui/compare/v8.35.1...v8.36.0) (2023-03-23)

**Note:** Version bump only for package @instructure/ui-drilldown

## [8.35.1](https://github.com/instructure/instructure-ui/compare/v8.35.0...v8.35.1) (2023-03-10)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.35.0](https://github.com/instructure/instructure-ui/compare/v8.34.0...v8.35.0) (2023-02-17)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.34.0](https://github.com/instructure/instructure-ui/compare/v8.33.2...v8.34.0) (2023-02-10)

**Note:** Version bump only for package @instructure/ui-drilldown

## [8.33.2](https://github.com/instructure/instructure-ui/compare/v8.33.1...v8.33.2) (2023-01-25)

**Note:** Version bump only for package @instructure/ui-drilldown

## [8.33.1](https://github.com/instructure/instructure-ui/compare/v8.33.0...v8.33.1) (2023-01-06)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.33.0](https://github.com/instructure/instructure-ui/compare/v8.32.1...v8.33.0) (2023-01-04)

### Bug Fixes

- **ui-drilldown:** selectableType=single works like radio buttons ([3a20ddb](https://github.com/instructure/instructure-ui/commit/3a20ddb132bf5efd15f719df1236cd98933f1219))

### Features

- **ui-drilldown:** add `selected` prop to Drilldown.Option which allows controlled behavior ([5776937](https://github.com/instructure/instructure-ui/commit/57769376930e8f6201ce603b9e9e832564db2dd6))

## [8.32.1](https://github.com/instructure/instructure-ui/compare/v8.30.0...v8.32.1) (2022-12-01)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.32.0](https://github.com/instructure/instructure-ui/compare/v8.31.0...v8.32.0) (2022-11-23)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.31.0](https://github.com/instructure/instructure-ui/compare/v8.30.0...v8.31.0) (2022-11-21)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.30.0](https://github.com/instructure/instructure-ui/compare/v8.29.0...v8.30.0) (2022-10-26)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.29.0](https://github.com/instructure/instructure-ui/compare/v8.28.0...v8.29.0) (2022-09-29)

### Bug Fixes

- support react 18 ([972bb93](https://github.com/instructure/instructure-ui/commit/972bb93d2835fcca3548d624b1ba2497661b4243))

## [8.28.2](https://github.com/instructure/instructure-ui/compare/v8.28.0...v8.28.2) (2022-09-16)

### Bug Fixes

- support react 18 ([972bb93](https://github.com/instructure/instructure-ui/commit/972bb93d2835fcca3548d624b1ba2497661b4243))

## [8.28.1](https://github.com/instructure/instructure-ui/compare/v8.28.0...v8.28.1) (2022-09-12)

### Bug Fixes

- support react 18 ([972bb93](https://github.com/instructure/instructure-ui/commit/972bb93d2835fcca3548d624b1ba2497661b4243))

# [8.28.0](https://github.com/instructure/instructure-ui/compare/v8.27.0...v8.28.0) (2022-09-02)

### Features

- **ui-drilldown:** add `minHeight` and `minWidth` props to Drilldown ([7e10b29](https://github.com/instructure/instructure-ui/commit/7e10b2966f4dfb79dfdecca62f12c3f9ba5b62b4))
- **ui-drilldown:** add `positionContainerDisplay` prop to Drilldown ([834302c](https://github.com/instructure/instructure-ui/commit/834302c1510c96bde8436307465fa480957719bc))

# [8.27.0](https://github.com/instructure/instructure-ui/compare/v8.26.3...v8.27.0) (2022-07-25)

### Features

- support React 18 ([0a2bf0c](https://github.com/instructure/instructure-ui/commit/0a2bf0cdd4d8bcec6e42a7ccf28a787e4a35bc40))

## [8.26.3](https://github.com/instructure/instructure-ui/compare/v8.26.2...v8.26.3) (2022-07-14)

**Note:** Version bump only for package @instructure/ui-drilldown

## [8.26.2](https://github.com/instructure/instructure-ui/compare/v8.26.1...v8.26.2) (2022-07-11)

**Note:** Version bump only for package @instructure/ui-drilldown

## [8.26.1](https://github.com/instructure/instructure-ui/compare/v8.26.0...v8.26.1) (2022-07-06)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.26.0](https://github.com/instructure/instructure-ui/compare/v8.25.0...v8.26.0) (2022-06-30)

### Features

- **ui-color-picker:** Add `ColorPicker` component ([1cbd877](https://github.com/instructure/instructure-ui/commit/1cbd87783da67144ffbd1f6ed535ccd370fd4eeb))

# [8.25.0](https://github.com/instructure/instructure-ui/compare/v8.24.5...v8.25.0) (2022-06-03)

**Note:** Version bump only for package @instructure/ui-drilldown

## [8.24.5](https://github.com/instructure/instructure-ui/compare/v8.24.3...v8.24.5) (2022-05-31)

**Note:** Version bump only for package @instructure/ui-drilldown

## [8.24.4](https://github.com/instructure/instructure-ui/compare/v8.24.3...v8.24.4) (2022-05-27)

**Note:** Version bump only for package @instructure/ui-drilldown

## [8.24.3](https://github.com/instructure/instructure-ui/compare/v8.24.2...v8.24.3) (2022-05-25)

**Note:** Version bump only for package @instructure/ui-drilldown

## [8.24.2](https://github.com/instructure/instructure-ui/compare/v8.24.1...v8.24.2) (2022-05-02)

**Note:** Version bump only for package @instructure/ui-drilldown

## [8.24.1](https://github.com/instructure/instructure-ui/compare/v8.24.0...v8.24.1) (2022-04-29)

### Bug Fixes

- **ui-drilldown,ui-options:** fix VoiceOver and Safari not reading Options.Item elements ([102c13d](https://github.com/instructure/instructure-ui/commit/102c13da991ad65ffde83ca7e0f23cbb760b8c68))

# [8.24.0](https://github.com/instructure/instructure-ui/compare/v8.23.0...v8.24.0) (2022-04-26)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.23.0](https://github.com/instructure/instructure-ui/compare/v8.22.0...v8.23.0) (2022-04-07)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.22.0](https://github.com/instructure/instructure-ui/compare/v8.21.0...v8.22.0) (2022-03-31)

### Features

- **ui-drilldown,ui:** add new `Drilldown` component ([44e7e13](https://github.com/instructure/instructure-ui/commit/44e7e13f1720680be9f7e76a3d3ec0cf94e88d5b))

##### Drilldown component

The [Drilldown](#Drilldown) component exists to support navigating and managing tree structures in compact spaces.
It is a diverse component that displays hierarchical data in a fashion that allows the users to “drill down” and dig deeper into the layers (pages) of the data structure.
It has similar look and features to the [Menu](#Menu), [Select](#Select) and [TreeBrowser](#TreeBrowser) components.

# [8.21.0](https://github.com/instructure/instructure-ui/compare/v8.20.0...v8.21.0) (2022-03-30)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.20.0](https://github.com/instructure/instructure-ui/compare/v8.19.0...v8.20.0) (2022-03-22)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.19.0](https://github.com/instructure/instructure-ui/compare/v8.18.0...v8.19.0) (2022-03-16)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.18.0](https://github.com/instructure/instructure-ui/compare/v8.17.0...v8.18.0) (2022-02-23)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.17.0](https://github.com/instructure/instructure-ui/compare/v8.16.0...v8.17.0) (2022-02-07)

### Bug Fixes

- remove type:"commonjs" from package.json files ([0b243be](https://github.com/instructure/instructure-ui/commit/0b243bee389ee14493e6b3dbb30a8b660c295d3d))

# [8.16.0](https://github.com/instructure/instructure-ui/compare/v8.15.0...v8.16.0) (2022-02-03)

**Note:** Version bump only for package @instructure/ui-drilldown

# [8.15.0](https://github.com/instructure/instructure-ui/compare/v8.14.0...v8.15.0) (2022-01-26)

**Note:** Version bump only for package @instructure/ui-drilldown

See the instructure-ui mono-repo [change log](#CHANGELOG) for past changes.
