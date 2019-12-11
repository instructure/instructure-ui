---
category: packages
---

## ui-navigation

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][LICENSE]&nbsp;
[![Code of Conduct][coc-badge]][coc]

Main and application level navigational components.

### Components
The `ui-navigation` package contains the following:
- [Navigation](#Navigation)
- [AppNav](#AppNav)


### Installation

```sh
yarn add @instructure/ui-navigation
```

### Usage

```js
import React from 'react'
import { Navigation } from '@instructure/ui-navigation'
import { Avatar } from '@instructure/ui-avatar'

const MyNavigation = () => {
  return (
    <Navigation label="My Navigation">
      <Navigation.Item
        icon={<Avatar name="Joel Andrews" size="x-small" />}
        label="My Account"
        href="http://example.com"
      />
    </Navigation>
  )
}
```
For detailed usage and documentation, see individual component examples.

[npm]: https://img.shields.io/npm/v/@instructure/ui-navigation.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-navigation

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
