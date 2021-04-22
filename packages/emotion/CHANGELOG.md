# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
