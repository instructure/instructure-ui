---
category: packages
---

## ui-table

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A styled HTML table component.

### Components

The `ui-table` package contains the following:

- [Table](#Table)

### Installation

```sh
yarn add @instructure/ui-table
```

### Usage

```jsx
---
example: false
---
import React from 'react'
import { Table } from '@instructure/ui-table'

const MyTable = () => {
  return (
    <Table caption='Top rated movies'>
      <Table.Head>
        <Table.Row>
          <Table.ColHeader>Rank</Table.ColHeader>
          <Table.ColHeader>Title</Table.ColHeader>
          <Table.ColHeader>Year</Table.ColHeader>
          <Table.ColHeader>Rating</Table.ColHeader>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.RowHeader>1</Table.RowHeader>
          <Table.Cell>The Shawshank Redemption</Table.Cell>
          <Table.Cell>1994</Table.Cell>
          <Table.Cell>9.3</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.RowHeader>2</Table.RowHeader>
          <Table.Cell>The Godfather</Table.Cell>
          <Table.Cell>1972</Table.Cell>
          <Table.Cell>9.2</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.RowHeader>3</Table.RowHeader>
          <Table.Cell>The Godfather: Part II</Table.Cell>
          <Table.Cell>1974</Table.Cell>
          <Table.Cell>9.0</Table.Cell>
        </Table.Row>
      </Table.Body>
  </Table>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-table.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-table
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
