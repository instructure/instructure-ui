# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [8.7.0](https://github.com/instructure/instructure-ui/compare/v8.6.0...v8.7.0) (2021-07-16)

### Features

- add support for React 17 ([f647826](https://github.com/instructure/instructure-ui/commit/f64782688b404f950e03c7f83a8328f0ca588248))

# [8.6.0](https://github.com/instructure/instructure-ui/compare/v8.5.0...v8.6.0) (2021-06-18)

**Note:** Version bump only for package @instructure/emotion

# [8.5.0](https://github.com/instructure/instructure-ui/compare/v8.4.0...v8.5.0) (2021-06-09)

### Bug Fixes

- **emotion:** add componentId to match with componenet name in docs ([cc255eb](https://github.com/instructure/instructure-ui/commit/cc255ebef149ffe19a2102a179c1e7765b633888))

# [8.4.0](https://github.com/instructure/instructure-ui/compare/v8.3.0...v8.4.0) (2021-05-11)

### Bug Fixes

- fix all inter-package dependencies using fix version ([75cd898](https://github.com/instructure/instructure-ui/commit/75cd8983b7e206e4e14dc67c490c103cb4a3d915))

# [8.3.0](https://github.com/instructure/instructure-ui/compare/v8.2.1...v8.3.0) (2021-05-04)

### Performance improvements

- **emotion:** upgrade to Emotion 11 whose parser was updated to a more performant one ([bcafe99](https://github.com/instructure/instructure-ui/commit/bcafe99382ea329af78931ab07adfb09c7fec415))

## [8.2.1](https://github.com/instructure/instructure-ui/compare/v8.2.0...v8.2.1) (2021-04-22)

**Note:** Version bump only for package @instructure/emotion

# [8.2.0](https://github.com/instructure/instructure-ui/compare/v8.1.0...v8.2.0) (2021-04-22)

**Note:** Version bump only for package @instructure/emotion

# [8.1.0](https://github.com/instructure/instructure-ui/compare/v8.0.0...v8.1.0) (2021-04-15)

### Bug Fixes

- **emotion:** fix ui-babel-preset dependency ([fb1443e](https://github.com/instructure/instructure-ui/commit/fb1443ebb581663160df868f2d44c6927d8aa1ab))

# [8.0.0](https://github.com/instructure/instructure-ui/compare/v7.5.0...v8.0.0) (2021-03-29)

### Code Refactoring

- **emotion,ui-themeable:** move ThemeablePropValues and ThemeablePropTypes util to emotion pack ([2d0ac1d](https://github.com/instructure/instructure-ui/commit/2d0ac1d3d4ae60802f639bee2545f9a8a32446b6))
- **emotion,ui-themeable,ui-view:** move getShorthandPropValue from ui-themeable to emotion ([91fd876](https://github.com/instructure/instructure-ui/commit/91fd876068b535e159367d46115782156e6a159a))
- **emotion,ui-themeable,ui-view:** move makeThemeVars util from ui-themeable to emotion ([f2291ba](https://github.com/instructure/instructure-ui/commit/f2291ba19ae680fe5202e2ea9508157950f14a38))
- **emotion,ui-themeable,ui-view:** move mirrorShorthand utils to emotion ([c779407](https://github.com/instructure/instructure-ui/commit/c77940764c1ee2b99d6fe7a55a8fd6aaf2b07197))

### BREAKING CHANGES

- **emotion,ui-themeable,ui-view:** Moved `mirrorShorthand`, `mirrorShorthandEdges`, `mirrorShorthandCorners` utils to from
  `ui-themeable` to `emotion` package.
- **emotion,ui-themeable,ui-view:** Moved `getShorthandPropValue` from `ui-themeable` to `emotion` package.
- **emotion,ui-themeable,ui-view:** Moved `makeThemeVars` util from `ui-themeable` to `emotion` package.
- **emotion,ui-themeable:** Moved `ThemeablePropValues` and `ThemeablePropTypes` utils from `ui-themeable`to `emotion` package.

See the instructure-ui mono-repo [change log](#CHANGELOG) for past changes.
