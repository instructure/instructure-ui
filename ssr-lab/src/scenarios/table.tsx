'use client'

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

import { Table as tb, View as vw } from '@instructure/ui/latest'

const Table = tb as any
const View = vw as any

const rows = [
  ['1', 'The Shawshank Redemption', '1994', '9.3'],
  ['2', 'The Godfather', '1972', '9.2'],
  ['3', 'The Godfather: Part II', '1974', '9.0'],
  ['4', 'The Dark Knight', '2008', '9.0'],
  ['5', '12 Angry Men', '1957', '9.0'],
  ['6', "Schindler's List", '1993', '8.9'],
  ['7', 'The Lord of the Rings', '2003', '8.9'],
  ['8', 'Pulp Fiction', '1994', '8.9']
]

export default function Scenario() {
  return (
    <View as="div" maxWidth="48rem">
      <Table caption={() => 'Auto layout'} layout="auto" hover>
        <Table.Head>
          <Table.Row>
            <Table.ColHeader id="rank">Rank</Table.ColHeader>
            <Table.ColHeader id="title">Title</Table.ColHeader>
            <Table.ColHeader id="year">Year</Table.ColHeader>
            <Table.ColHeader id="rating">Rating</Table.ColHeader>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row[0]}>
              <Table.RowHeader>{row[0]}</Table.RowHeader>
              <Table.Cell>{row[1]}</Table.Cell>
              <Table.Cell>{row[2]}</Table.Cell>
              <Table.Cell>{row[3]}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* `layout="stacked"` is the row style that changes the most between the
          first render and the mounted one. */}
      <View as="div" margin="large 0 0">
        <Table caption={() => 'Stacked layout'} layout="stacked">
          <Table.Head>
            <Table.Row>
              <Table.ColHeader id="s-rank">Rank</Table.ColHeader>
              <Table.ColHeader id="s-title">Title</Table.ColHeader>
              <Table.ColHeader id="s-year">Year</Table.ColHeader>
              <Table.ColHeader id="s-rating">Rating</Table.ColHeader>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {rows.slice(0, 4).map((row) => (
              <Table.Row key={row[0]}>
                <Table.RowHeader>{row[0]}</Table.RowHeader>
                <Table.Cell>{row[1]}</Table.Cell>
                <Table.Cell>{row[2]}</Table.Cell>
                <Table.Cell>{row[3]}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </View>
    </View>
  )
}
