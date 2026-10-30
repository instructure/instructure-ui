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
          pagination={{ initialPageIndex: 1, pageSize: 10, ...labels }}
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
          pagination={{ initialPageIndex: 0, pageSize: 10, ...labels }}
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
            initialPageIndex: 1,
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
          pagination={{ initialPageIndex: 0, pageSize: 10, ...labels }}
        />
      )

      expect(await runAxeCheck(container)).toBe(true)
    })
  })

  describe('expanding rows', () => {
    type Node = { name: string; age: number; subRows?: Node[] }
    const tree: Node[] = [
      {
        name: 'Parent',
        age: 50,
        subRows: [
          { name: 'Child', age: 20, subRows: [{ name: 'Grandchild', age: 1 }] }
        ]
      },
      { name: 'Leaf', age: 30 }
    ]
    // the cell name starts with the expand button label, so match the row name at the end
    const rowCell = (name: string) =>
      page.getByRole('cell', { name: new RegExp(`(^|\\s)${name}$`) })

    const renderTree = (showExpandButtons?: boolean) =>
      render(treeGrid(showExpandButtons))

    const treeGrid = (showExpandButtons?: boolean) => (
      <DataGrid
        caption="People"
        columns={columns}
        data={tree}
        expandedRows={{
          getSubRows: (row) => row.subRows,
          showExpandButtons,
          labelExpandRow: 'Expand row',
          labelCollapseRow: 'Collapse row'
        }}
      />
    )

    it('shows no buttons and all rows collapsed without the expandedRows prop', async () => {
      await render(<DataGrid caption="People" columns={columns} data={tree} />)

      expect(page.getByRole('button').elements()).toHaveLength(0)
      expect(rowCell('Child').elements()).toHaveLength(0)
    })

    it('starts collapsed and expands a row on button click', async () => {
      await renderTree()

      expect(rowCell('Parent').element()).toBeInTheDocument()
      expect(rowCell('Child').elements()).toHaveLength(0)

      const button = page.getByRole('button', { name: 'Expand row' })
      await button.click()

      expect(rowCell('Child').element()).toBeInTheDocument()
      // grandchildren stay collapsed until their own row is expanded
      expect(rowCell('Grandchild').elements()).toHaveLength(0)
      expect(
        page.getByRole('button', { name: 'Collapse row' }).element()
      ).toHaveAttribute('aria-expanded', 'true')
    })

    it('does not render a button for rows without sub rows', async () => {
      await renderTree()

      // only "Parent" is expandable
      expect(page.getByRole('button').elements()).toHaveLength(1)
    })

    it('expands every row and hides the buttons when showExpandButtons is false', async () => {
      await renderTree(false)

      expect(rowCell('Grandchild').element()).toBeInTheDocument()
      expect(page.getByRole('button').elements()).toHaveLength(0)
    })

    it('expands every row when the buttons are turned off after rows were expanded', async () => {
      const { rerender } = await renderTree()

      await page.getByRole('button', { name: 'Expand row' }).click()
      await rerender(treeGrid(false))

      expect(rowCell('Grandchild').element()).toBeInTheDocument()
      expect(page.getByRole('button').elements()).toHaveLength(0)
    })

    it('keeps rows expanded when the parent re-renders with a new data array', async () => {
      const { rerender } = await renderTree()
      const withNewData = (showExpandButtons: boolean) => (
        <DataGrid
          caption="People"
          columns={columns}
          data={structuredClone(tree)}
          expandedRows={{
            getSubRows: (row) => row.subRows,
            showExpandButtons,
            labelExpandRow: 'Expand row',
            labelCollapseRow: 'Collapse row'
          }}
        />
      )

      await rerender(withNewData(false))
      await rerender(withNewData(false))

      expect(rowCell('Grandchild').element()).toBeInTheDocument()
    })

    it('collapses all rows again when the buttons are turned back on', async () => {
      const { rerender } = await renderTree(false)

      await rerender(treeGrid(true))

      expect(rowCell('Child').elements()).toHaveLength(0)
    })

    it('should meet a11y standards', async () => {
      const { container } = await renderTree()

      expect(await runAxeCheck(container)).toBe(true)
    })
  })

  describe('sorting', () => {
    const people: Person[] = [
      { name: 'Grace', age: 85 },
      { name: 'Ada', age: 36 },
      { name: 'Katherine', age: 101 }
    ]
    const labelSortColumn = (header: string, direction: string) =>
      `Sort by ${header}, currently ${direction}`

    // the first cell of each body row, in display order
    const names = () =>
      page
        .getByRole('row')
        .elements()
        .slice(1)
        .map((row) => row.querySelector('td')?.textContent)

    const renderSortable = (
      defaultSort?: { columnId: string; direction: 'ascending' | 'descending' },
      rows = people
    ) =>
      render(
        <DataGrid
          caption="People"
          columns={columns}
          data={rows}
          sorting={{ labelSortColumn, defaultSort }}
        />
      )

    const sortButton = (header: string, direction = 'none') =>
      page.getByRole('button', { name: labelSortColumn(header, direction) })

    it('renders no sort buttons without the sorting prop', async () => {
      await render(
        <DataGrid caption="People" columns={columns} data={people} />
      )

      expect(page.getByRole('button').elements()).toHaveLength(0)
      expect(
        page.getByRole('columnheader').first().element()
      ).not.toHaveAttribute('aria-sort')
    })

    it('keeps the original order and reports no sort initially', async () => {
      await renderSortable()

      expect(names()).toEqual(['Grace', 'Ada', 'Katherine'])
      expect(page.getByRole('button').elements()).toHaveLength(2)
      expect(page.getByRole('columnheader').first().element()).toHaveAttribute(
        'aria-sort',
        'none'
      )
    })

    it('cycles a column through ascending, descending and none', async () => {
      await renderSortable()

      await sortButton('Name').click()
      expect(names()).toEqual(['Ada', 'Grace', 'Katherine'])
      expect(page.getByRole('columnheader').first().element()).toHaveAttribute(
        'aria-sort',
        'ascending'
      )

      await sortButton('Name', 'ascending').click()
      expect(names()).toEqual(['Katherine', 'Grace', 'Ada'])
      expect(page.getByRole('columnheader').first().element()).toHaveAttribute(
        'aria-sort',
        'descending'
      )

      await sortButton('Name', 'descending').click()
      expect(names()).toEqual(['Grace', 'Ada', 'Katherine'])
      expect(page.getByRole('columnheader').first().element()).toHaveAttribute(
        'aria-sort',
        'none'
      )
    })

    it('starts numeric columns ascending too', async () => {
      await renderSortable()

      await sortButton('Age').click()

      expect(names()).toEqual(['Ada', 'Grace', 'Katherine'])
    })

    it('sorts by the last clicked column only', async () => {
      await renderSortable()

      await sortButton('Name').click()
      await sortButton('Age').click()

      expect(names()).toEqual(['Ada', 'Grace', 'Katherine'])
      expect(page.getByRole('columnheader').first().element()).toHaveAttribute(
        'aria-sort',
        'none'
      )
      expect(page.getByRole('columnheader').last().element()).toHaveAttribute(
        'aria-sort',
        'ascending'
      )
    })

    it('applies the default sort', async () => {
      await renderSortable({ columnId: 'age', direction: 'descending' })

      expect(names()).toEqual(['Katherine', 'Grace', 'Ada'])
      expect(page.getByRole('columnheader').last().element()).toHaveAttribute(
        'aria-sort',
        'descending'
      )
      expect(sortButton('Age', 'descending').element()).toBeInTheDocument()
    })

    it('does not render a sort button for columns with sorting disabled', async () => {
      await render(
        <DataGrid
          caption="People"
          columns={[
            { accessorKey: 'name', header: 'Name', enableSorting: false },
            { accessorKey: 'age', header: 'Age' }
          ]}
          data={people}
          sorting={{ labelSortColumn }}
        />
      )

      expect(page.getByRole('button').elements()).toHaveLength(1)
      expect(
        page.getByRole('columnheader').first().element()
      ).not.toHaveAttribute('aria-sort')
    })

    it('sorts across pages', async () => {
      const many = Array.from({ length: 25 }, (_, i) => ({
        name: `Person ${String(i).padStart(2, '0')}`,
        age: i
      }))
      await render(
        <DataGrid
          caption="People"
          columns={columns}
          data={many}
          sorting={{
            labelSortColumn,
            defaultSort: { columnId: 'age', direction: 'descending' }
          }}
          pagination={{
            initialPageIndex: 0,
            pageSize: 10,
            labelNext: 'Next page',
            labelPrev: 'Previous page'
          }}
        />
      )

      expect(names()[0]).toBe('Person 24')
      expect(names()).toHaveLength(10)
    })

    it('sorts sub rows within their parent', async () => {
      type Node = { name: string; age: number; subRows?: Node[] }
      await render(
        <DataGrid
          caption="People"
          columns={columns}
          data={
            [
              {
                name: 'Parent',
                age: 50,
                subRows: [
                  { name: 'Zed', age: 1 },
                  { name: 'Amy', age: 2 }
                ]
              }
            ] as Node[]
          }
          sorting={{
            labelSortColumn,
            defaultSort: { columnId: 'name', direction: 'ascending' }
          }}
          expandedRows={{
            getSubRows: (row) => row.subRows,
            showExpandButtons: false,
            labelExpandRow: 'Expand row',
            labelCollapseRow: 'Collapse row'
          }}
        />
      )

      expect(names()).toEqual(['Parent', 'Amy', 'Zed'])
    })

    it('should meet a11y standards', async () => {
      const { container } = await renderSortable({
        columnId: 'name',
        direction: 'ascending'
      })

      expect(await runAxeCheck(container)).toBe(true)
    })
  })

  it('counts expanded sub rows toward the page size when pagination and expandedRows are combined', async () => {
    type Team = { name: string; age: number; subRows?: Team[] }
    const teams: Team[] = Array.from({ length: 4 }, (_, i) => ({
      name: `Team ${i + 1}`,
      age: i,
      subRows: [
        { name: `Member ${i + 1}.1`, age: 1 },
        { name: `Member ${i + 1}.2`, age: 2 }
      ]
    }))
    await render(
      <DataGrid
        caption="Teams"
        columns={columns}
        data={teams}
        pagination={{
          initialPageIndex: 0,
          pageSize: 3,
          labelNext: 'Next page',
          labelPrev: 'Previous page'
        }}
        expandedRows={{
          getSubRows: (row) => row.subRows,
          labelExpandRow: 'Expand row',
          labelCollapseRow: 'Collapse row'
        }}
      />
    )

    // header row + 3 collapsed teams
    expect(page.getByRole('row').elements()).toHaveLength(4)

    await page.getByRole('button', { name: 'Expand row' }).first().click()

    // the first team and its two members fill the page
    expect(page.getByRole('row').elements()).toHaveLength(4)
    expect(page.getByText('Member 1.2').element()).toBeInTheDocument()
    expect(page.getByText('Team 2').elements()).toHaveLength(0)
  })

  it('should meet a11y standards', async () => {
    const { container } = await render(
      <DataGrid caption="People" columns={columns} data={data} />
    )

    expect(await runAxeCheck(container)).toBe(true)
  })
})
