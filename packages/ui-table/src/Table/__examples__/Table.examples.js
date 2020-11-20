/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from 'react'

import { Table } from '../index'

export default {
  sectionProp: 'layout',
  propValues: {
    layout: ['auto', 'fixed', 'stacked']
  },
  getComponentProps: (props) => {
    return {
      caption: 'Top rated movies',
      children: [
        <Table.Head key={'head'}>
          <Table.Row>
            <Table.ColHeader id="rank">Rank</Table.ColHeader>
            <Table.ColHeader id="title">Title</Table.ColHeader>
            <Table.ColHeader id="year">Year</Table.ColHeader>
            <Table.ColHeader id="rating">Rating</Table.ColHeader>
          </Table.Row>
        </Table.Head>,
        <Table.Body key={'body'}>
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
      ]
    }
  }
}
