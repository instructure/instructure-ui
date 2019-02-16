---
category: packages
---

## ui-table

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

A UI component library made by Instructure Inc.

### Installation

```sh
yarn add @instructure/ui-table
```

### Components

The `ui-table` package contains the following:
- [TableControlled](#TableControlled)

```javascript
---
example: true
---
<TableControlled
  caption='Top rated movies'
>
  <TableControlled.Head>
    <TableControlled.Row>
      <TableControlled.ColHeader>Rank</TableControlled.ColHeader>
      <TableControlled.ColHeader>Title</TableControlled.ColHeader>
      <TableControlled.ColHeader>Year</TableControlled.ColHeader>
      <TableControlled.ColHeader>Rating</TableControlled.ColHeader>
    </TableControlled.Row>
  </TableControlled.Head>
  <TableControlled.Body>
    <TableControlled.Row>
      <TableControlled.RowHeader>1</TableControlled.RowHeader>
      <TableControlled.Cell>The Shawshank Redemption</TableControlled.Cell>
      <TableControlled.Cell>1994</TableControlled.Cell>
      <TableControlled.Cell>9.3</TableControlled.Cell>
    </TableControlled.Row>
    <TableControlled.Row>
      <TableControlled.RowHeader>2</TableControlled.RowHeader>
      <TableControlled.Cell>The Godfather</TableControlled.Cell>
      <TableControlled.Cell>1972</TableControlled.Cell>
      <TableControlled.Cell>9.2</TableControlled.Cell>
    </TableControlled.Row>
    <TableControlled.Row>
      <TableControlled.RowHeader>3</TableControlled.RowHeader>
      <TableControlled.Cell>The Godfather: Part II</TableControlled.Cell>
      <TableControlled.Cell>1974</TableControlled.Cell>
      <TableControlled.Cell>9.0</TableControlled.Cell>
    </TableControlled.Row>
  </TableControlled.Body>
</TableControlled>
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-table.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-table

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
