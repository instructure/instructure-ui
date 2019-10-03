---
category: packages
---

## ui-progress

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

A styled HTML `<progress />` element

### Components
The `ui-progress` package contains the following:
- [ProgressBar](#ProgressBar)
- [ProgressCircle](#ProgressCircle)
- [Progress](#Progress): will be deprecated in version 8.0.0


### Usage
```jsx
---
example: false
---
<ProgressBar
  screenReaderLabel="Loading completion"
  valueNow={40}
  valueMax={60}
/>
```

### Installation
```sh
yarn add @instructure/ui-progress
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-progress.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-progress

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
