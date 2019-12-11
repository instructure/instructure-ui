---
category: packages
---

## ui-testable

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][LICENSE]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A decorator that adds a `data-` attribute to the React component root node
to make it easier to test.

**NOTE: by default, when NODE_ENV==='production' the `data-` attributes will not be appended**
(since they are specifically there for testing and appending them takes a non-trivial
amount of time at runtime, slowing things down for your actual users).
If you would like the `data-cid` attributes on elements even in your production
builds  (like if you are using them in your e2e builds or something),
you need to set the environment variable:
```sh
ALWAYS_APPEND_UI_TESTABLE_LOCATORS=1
```

### Installation

```sh
yarn add @instructure/ui-testable
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-testable.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-testable

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
