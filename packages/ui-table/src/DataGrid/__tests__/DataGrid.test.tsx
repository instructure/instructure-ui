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
import { describe, it, expect } from 'vitest'
import { DataGrid } from '@instructure/ui-table/latest'
import { runAxeCheck } from '@instructure/ui-axe-check'

type Person = { name: string; age: number }

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'age', header: 'Age' }
]
const data: Person[] = [
  { name: 'Ada', age: 36 },
  { name: 'Grace', age: 85 }
]

describe('<DataGrid />', () => {
  it('renders a header cell per column and a row per data item', async () => {
    await render(<DataGrid caption="People" columns={columns} data={data} />)

    expect(page.getByRole('columnheader').elements()).toHaveLength(2)
    expect(page.getByText('Ada').element()).toBeInTheDocument()
    expect(page.getByText('85').element()).toBeInTheDocument()
    // header row + 2 data rows
    expect(page.getByRole('row').elements()).toHaveLength(3)
  })

  it('renders every row and no pagination without the pagination prop', async () => {
    const many = Array.from({ length: 25 }, (_, i) => ({
      name: `Person ${i}`,
      age: i
    }))
    await render(<DataGrid caption="People" columns={columns} data={many} />)

    // header row + 25 data rows
    expect(page.getByRole('row').elements()).toHaveLength(26)
    expect(page.getByRole('navigation').elements()).toHaveLength(0)
  })

  describe('pagination', () => {
    const many = Array.from({ length: 25 }, (_, i) => ({
      name: `Person ${i}`,
      age: i
    }))

    const labels = { labelNext: 'Next page', labelPrev: 'Previous page' }

    it('shows only pageSize rows, starting at the initial pageIndex', async () => {
      await render(
        <DataGrid
          caption="People"
          columns={columns}
          data={many}
          pagination={{ pageIndex: 1, pageSize: 10, ...labels }}
        />
      )

      // header row + 10 data rows
      expect(page.getByRole('row').elements()).toHaveLength(11)
      expect(page.getByText('Person 10').element()).toBeInTheDocument()
      expect(page.getByText('Person 19').element()).toBeInTheDocument()
      expect(page.getByText('Person 9').elements()).toHaveLength(0)
    })

    it('changes the visible rows when a page is selected', async () => {
      await render(
        <DataGrid
          caption="People"
          columns={columns}
          data={many}
          pagination={{ pageIndex: 0, pageSize: 10, ...labels }}
        />
      )

      await page.getByRole('button', { name: '3', exact: true }).click()

      // the last page holds the remaining 5 rows
      expect(page.getByRole('row').elements()).toHaveLength(6)
      expect(page.getByText('Person 20').element()).toBeInTheDocument()
      expect(
        page.getByText('Person 0', { exact: true }).elements()
      ).toHaveLength(0)
    })

    // compact variant only renders the arrow buttons from 5 pages up
    it('uses the provided labels for the arrow buttons', async () => {
      await render(
        <DataGrid
          caption="People"
          columns={columns}
          data={many}
          pagination={{
            pageIndex: 1,
            pageSize: 3,
            labelNext: 'Go forward',
            labelPrev: 'Go back'
          }}
        />
      )

      expect(
        page.getByRole('button', { name: 'Go forward' }).element()
      ).toBeInTheDocument()
      expect(
        page.getByRole('button', { name: 'Go back' }).element()
      ).toBeInTheDocument()
    })

    it('should meet a11y standards', async () => {
      const { container } = await render(
        <DataGrid
          caption="People"
          columns={columns}
          data={many}
          pagination={{ pageIndex: 0, pageSize: 10, ...labels }}
        />
      )

      expect(await runAxeCheck(container)).toBe(true)
    })
  })

  it('should meet a11y standards', async () => {
    const { container } = await render(
      <DataGrid caption="People" columns={columns} data={data} />
    )

    expect(await runAxeCheck(container)).toBe(true)
  })
})
