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

'use client'
import React from 'react'
import { Table as tb } from '@instructure/ui/latest'

const Table = tb as any

export default function TablePage() {
  return (
    <main className="flex gap-12 p-8 flex-col items-start axe-test">
      <section>
        <Table caption="Top rated movies" layout="auto">
          <Table.Head>
            <Table.Row>
              <Table.ColHeader id="Rank">Rank</Table.ColHeader>
              <Table.ColHeader id="Title">Title</Table.ColHeader>
              <Table.ColHeader id="Year">Year</Table.ColHeader>
              <Table.ColHeader id="Rating">Rating</Table.ColHeader>
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
      </section>

      <section>
        <Table caption="Top rated movies (fixed layout)" layout="fixed" hover>
          <Table.Head>
            <Table.Row>
              <Table.ColHeader id="Title" width="40%" textAlign="start">
                Title
              </Table.ColHeader>
              <Table.ColHeader id="Year" width="20%" textAlign="start">
                Year
              </Table.ColHeader>
              <Table.ColHeader id="Rating" width="20%" textAlign="end">
                Rating
              </Table.ColHeader>
              <Table.ColHeader id="BoxOffice" width="20%" textAlign="end">
                Box Office
              </Table.ColHeader>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>The Shawshank Redemption</Table.Cell>
              <Table.Cell>1994</Table.Cell>
              <Table.Cell>9.3</Table.Cell>
              <Table.Cell>$28,341,469</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>The Godfather</Table.Cell>
              <Table.Cell>1972</Table.Cell>
              <Table.Cell>9.2</Table.Cell>
              <Table.Cell>$133,698,921</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>The Godfather: Part II</Table.Cell>
              <Table.Cell>1974</Table.Cell>
              <Table.Cell>9.0</Table.Cell>
              <Table.Cell>$47,542,841</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </section>
    </main>
  )
}
