---
category: packages
---

## ui-billboard

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

Use Billboard for empty states, 404 pages, redirects, etc.

### Installation

```sh
yarn add --dev @instructure/ui-billboard
```

### Usage

```js
---
example: true
---
<Billboard
  size="medium"
  heading="Well, this is awkward."
  message="Think there should be something here?"
  hero={<Img src={placeholderImage(900, 500)} />} />
```

### Components
The `ui-billboard` package contains the following:
- [Billboard](#Billboard)

[npm]: https://img.shields.io/npm/v/@instructure/ui-billboard.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-billboard

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
