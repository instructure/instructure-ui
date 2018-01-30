---
category: packages
---

## ui-navigation

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]


### Installation

```sh
yarn add @instructure/ui-navigation
```

### Usage

```js
import React from 'react'
import Navigation, { NavigationItem } from '@instructure/ui-navigation/lib/components/Navigation'
import Avatar from '@instructure/ui-elements/lib/components/Avatar'

export default MyNavigation = function () {
  return (
    <Navigation label="My Navigation">
      <NavigationItem
        icon={<Avatar name="Joel Andrews" size="x-small" />}
        label="My Account"
        href="http://example.com"
      />
    </Navigation>
  )
}
```

### Components
The `ui-navigation` package contains the following:
- [Navigation](#Navigation)

### Contribute
See the [contributing guidelines](#contributing) for details.

### License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/@instructure/ui-navigation.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-navigation

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
