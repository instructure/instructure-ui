---
category: packages
---

## ui-icons-build

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][LICENSE]&nbsp;
[![Code of Conduct][coc-badge]][coc]


Build scripts to generate icon sets from source Sketch files for multiple platforms (web, iOS, Android).


### Installation

```sh
yarn add --dev @instructure/ui-icons-build
```

If you don't have [Sketch](https://www.sketchapp.com/) installed,
you'll need [SketchTool](https://www.sketchapp.com/tool/).

```sh
curl -L https://raw.githubusercontent.com/cognitom/gulp-sketch/master/install-sketchtool.sh | sudo sh
```

### Supported formats:

- Accessible React components for each icon/variant
- SVG files optimized for the web with configurable bounding boxes/margins
- Icon font


## Requirements

- Node >= 8
- Mac OSX
- [Sketch](http://bohemiancoding.com/sketch/)


[npm]: https://img.shields.io/npm/v/@instructure/ui-icons-build.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-icons-build

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
