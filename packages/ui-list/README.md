---
category: packages
---

## ui-list

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][LICENSE]&nbsp;
[![Code of Conduct][coc-badge]][coc]

Components for displaying vertical or horizontal lists.


### Components
The `ui-list` package contains the following:
- [InlineList](#InlineList)
- [List](#List)


### Installation

```sh
yarn add @instructure/ui-list
```

### Usage

```js
import React from 'react'
import { List } from '@instructure/ui-list'

const MyList = () => {
  return (
    <List>
      <List.Item>List Item One</List.Item>
      <List.Item>List Item Two</List.Item>
      <List.Item>List Item Three</List.Item>
    </List>
  )
}
```
```js
import React from 'react'
import { InlineList } from '@instructure/ui-list'

const MyList = () => {
  return (
    <InlineList>
      <InlineList.Item>List Item One</InlineList.Item>
      <InlineList.Item>List Item Two</InlineList.Item>
      <InlineList.Item>List Item Three</InlineList.Item>
    </InlineList>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-list.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-list

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
