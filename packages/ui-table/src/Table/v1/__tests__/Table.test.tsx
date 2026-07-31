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

import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import type { MockInstance } from 'vitest'
import { Table } from '../index.js'
import type { TableColHeaderProps } from '../ColHeader/props'

describe('<Table /> (v1)', () => {
  let consoleErrorMock: MockInstance<typeof console.error>

  beforeEach(() => {
    // Mocking console to prevent test output pollution
    consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorMock.mockRestore()
  })

  const renderTable = (colHeaderProps?: Partial<TableColHeaderProps>) =>
    render(
      <Table caption="Movies">
        <Table.Head>
          <Table.Row>
            <Table.ColHeader id="foo" {...colHeaderProps}>
              Foo
            </Table.ColHeader>
            <Table.ColHeader id="bar">Bar</Table.ColHeader>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )

  describe('with a string caption', () => {
    it('uses the caption verbatim when no column is sorted', async () => {
      const { container } = await renderTable()

      expect(container.querySelector('caption')).toHaveTextContent(/^Movies$/)
      await expect
        .element(page.getByRole('table', { name: 'Movies' }))
        .toBeInTheDocument()
    })

    it('does not describe a sort state that does not exist', async () => {
      const { container } = await renderTable()
      const caption = container.querySelector('caption')

      expect(caption).not.toHaveTextContent('Sorted by')
      expect(caption).not.toHaveTextContent('undefined')
    })

    it('appends the sort state when a column is sorted', async () => {
      const { container } = await renderTable({
        id: 'foo',
        sortDirection: 'ascending'
      })

      expect(container.querySelector('caption')).toHaveTextContent(
        'Movies Sorted by Foo (ascending)'
      )
    })
  })
})
