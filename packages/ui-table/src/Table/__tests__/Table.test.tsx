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

import { Component } from 'react'
import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import type { MockInstance } from 'vitest'
import { Table } from '@instructure/ui-table/latest'
import type {
  TableProps,
  TableColHeaderProps
} from '@instructure/ui-table/latest'
import { runAxeCheck } from '@instructure/ui-axe-check'

describe('<Table />', async () => {
  let consoleErrorMock: MockInstance<typeof console.error>

  beforeEach(() => {
    // Mocking console to prevent test output pollution
    consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorMock.mockRestore()
  })

  const renderTable = (props?: TableProps) =>
    render(
      <Table caption={() => 'Test table'} {...props}>
        <Table.Head>
          <Table.Row>
            <Table.ColHeader id="foo">ColHeader</Table.ColHeader>
            <Table.ColHeader id="bar">Bar-header</Table.ColHeader>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.RowHeader>RowHeader</Table.RowHeader>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )

  it('should render a caption', async () => {
    const { container } = await renderTable()
    const caption = container.querySelector('caption')

    expect(caption).toBeInTheDocument()
    expect(caption).toMatchTextContent('Test table')
  })

  it('should meet a11y standards', async () => {
    const { container } = await renderTable()
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  it('applies a fixed column layout', async () => {
    await renderTable({
      layout: 'fixed',
      caption: () => 'Test table'
    })
    const table = page.getByRole('table').element()

    expect(table).toHaveStyle({ tableLayout: 'fixed' })
  })

  it('passes hover to table row', async () => {
    await renderTable({
      hover: true,
      caption: () => 'Test table'
    })
    const tableRows = page.getByRole('row').elements()

    tableRows.forEach((tableRow) => {
      expect(tableRow).not.toHaveAttribute('border-left', 'none')
      expect(tableRow).not.toHaveAttribute('border-right', 'none')
    })
  })

  it('sets the scope of column header to col', async () => {
    await renderTable()
    const columnHeaders = page.getByRole('columnheader').elements()

    columnHeaders.forEach((columnHeader) => {
      expect(columnHeader).toHaveAttribute('scope', 'col')
    })
  })

  it('sets the scope of row header to row', async () => {
    await renderTable()
    const rowHeaders = page.getByRole('rowheader').elements()

    rowHeaders.forEach((rowHeader) => {
      expect(rowHeader).toHaveAttribute('scope', 'row')
    })
  })

  it('can render table in stacked layout', async () => {
    await renderTable({
      layout: 'stacked',
      caption: () => 'Test table'
    })
    const stackedTable = page.getByRole('table').element()

    expect(stackedTable).toBeInTheDocument()
    expect(stackedTable).toMatchTextContent('RowHeader')
    expect(stackedTable).toMatchTextContent('Cell')
    expect(stackedTable).not.toMatchTextContent('ColHeader')
  })

  it('can handle non-existent head in stacked layout', async () => {
    await render(
      <Table caption={() => 'Test table'} layout="stacked">
        <Table.Body></Table.Body>
      </Table>
    )
    const stackedTable = page.getByRole('table').element()

    expect(stackedTable).toBeInTheDocument()
  })

  it('can handle empty head in stacked layout', async () => {
    await render(
      <Table caption={() => 'Test table'} layout="stacked">
        <Table.Head></Table.Head>
      </Table>
    )
    const stackedTable = page.getByRole('table').element()

    expect(stackedTable).toBeInTheDocument()
  })

  it('can handle invalid header in stacked layout', async () => {
    await render(
      <Table caption={() => 'Test table'} layout="stacked">
        <Table.Head>
          <Table.Row>
            <Table.Cell>Foo</Table.Cell>
            {}
            {false}
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
        </Table.Body>
      </Table>
    )
    const stackedTable = page.getByRole('table').element()

    expect(stackedTable).toBeInTheDocument()
    expect(stackedTable).not.toMatchTextContent('Foo')
  })

  it('does not crash for invalid children in stacked layout', async () => {
    await render(
      <Table caption={() => 'Test table'} layout="stacked">
        test1
        <span>test</span>
        {/* @ts-ignore error is normal here */}
        <Table.Head>
          <span>test</span>
          test2
          {/* @ts-ignore error is normal here */}
          <Table.Row>
            test3
            <span>test</span>
            <Table.Cell>Foo</Table.Cell>
          </Table.Row>
          test4
          <span>test</span>
        </Table.Head>
        test5
        <Table.Body>
          test
          <span>test</span>
          {/* @ts-ignore error is normal here */}
          <Table.Row>
            test
            <span>test</span>
            {/* @ts-ignore error is normal here */}
            <Table.Cell>Foo</Table.Cell>
            test
            <span>test</span>
          </Table.Row>
        </Table.Body>
      </Table>
    )
    const table = page.getByRole('table').element()

    expect(table).toBeInTheDocument()
    expect(table).toMatchTextContent('Foo')
  })

  describe('when table is sortable', async () => {
    const renderSortableTable = (
      props: TableColHeaderProps | null,
      handlers = {},
      layout: TableProps['layout'] = 'auto'
    ) =>
      render(
        <Table caption={() => 'Sortable table'} layout={layout}>
          <Table.Head>
            <Table.Row>
              <Table.ColHeader id="foo" {...props} {...handlers}>
                Foo
              </Table.ColHeader>
              <Table.ColHeader id="bar" {...handlers}>
                Bar
              </Table.ColHeader>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row></Table.Row>
            <Table.Row></Table.Row>
          </Table.Body>
        </Table>
      )

    it('can render up arrow for ascending order', async () => {
      const { container } = await renderSortableTable({
        id: 'id',
        sortDirection: 'ascending'
      })
      const arrow = container.querySelector('svg')

      expect(arrow).toHaveAttribute('name', 'ChevronUp')
    })

    it('can render down arrow for descending order', async () => {
      const { container } = await renderSortableTable({
        id: 'id',
        sortDirection: 'descending'
      })
      const arrow = container.querySelector('svg')

      expect(arrow).toHaveAttribute('name', 'ChevronDown')
    })

    it('calls onRequestSort when column header is clicked', async () => {
      const onRequestSort = vi.fn()
      await renderSortableTable(
        {
          id: 'id'
        },
        {
          onRequestSort
        }
      )
      const button = page.getByRole('button', { name: 'Foo' }).element()

      await userEvent.click(button)

      await vi.waitFor(() => {
        expect(onRequestSort).toHaveBeenCalledTimes(1)
      })
    })

    it('can display custom label in the select in stacked layout', async () => {
      await renderSortableTable(
        {
          id: 'id',
          stackedSortByLabel: 'Custom Text'
        },
        {
          onRequestSort: vi.fn()
        },
        'stacked'
      )
      const input = page.getByRole('combobox').element()

      await userEvent.click(input)

      await vi.waitFor(async () => {
        const options = page.getByRole('option').elements()

        expect(options[0]).toMatchTextContent('Custom Text')
        expect(options[1]).toMatchTextContent('bar')
      })
    })

    it('can render check mark for sorted column in stacked layout', async () => {
      const { container } = await renderSortableTable(
        {
          id: 'id',
          sortDirection: 'ascending'
        },
        {
          onRequestSort: vi.fn()
        },
        'stacked'
      )
      const icon = container.querySelector('svg')

      expect(icon).toHaveAttribute('name', 'Check')
    })

    it('creates proper aria-sort attributes (ascending)', async () => {
      await renderSortableTable({
        id: 'id',
        sortDirection: 'ascending'
      })
      const header = page.getByRole('columnheader', { name: 'Foo' }).element()

      expect(header).toHaveAttribute('aria-sort', 'ascending')
    })

    it('creates proper aria-sort attributes (descending)', async () => {
      await renderSortableTable({
        id: 'id',
        sortDirection: 'descending'
      })
      const header = page.getByRole('columnheader', { name: 'Foo' }).element()

      expect(header).toHaveAttribute('aria-sort', 'descending')
    })

    it('calls the caption function with the sorted header and direction', async () => {
      const caption = vi.fn((header: string, direction: string) =>
        header ? `Movies, sorted by ${header} ${direction}` : 'Movies'
      )
      const { container } = await render(
        <Table caption={caption}>
          <Table.Head>
            <Table.Row>
              <Table.ColHeader id="foo" sortDirection="ascending">
                Foo
              </Table.ColHeader>
              <Table.ColHeader id="bar">Bar</Table.ColHeader>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row></Table.Row>
          </Table.Body>
        </Table>
      )

      expect(caption).toHaveBeenCalledWith('Foo', 'ascending')
      expect(container.querySelector('caption')).toMatchTextContent(
        'Movies, sorted by Foo ascending'
      )
    })

    it('calls the caption function with an empty header and "none" when nothing is sorted', async () => {
      const caption = vi.fn(() => 'Movies')
      await renderTable({ caption } as Partial<TableProps> as TableProps)

      expect(caption).toHaveBeenCalledWith('', 'none')
    })
  })

  describe('when using custom components', () => {
    it('should render wrapper HOCs', async () => {
      class CustomTableCell extends Component<any> {
        render() {
          return <Table.Cell {...this.props}>{this.props.children}</Table.Cell>
        }
      }
      class CustomTableRow extends Component {
        render() {
          return (
            <Table.Row {...this.props}>
              <Table.RowHeader>1</Table.RowHeader>
              <Table.Cell>The Shawshank Redemption</Table.Cell>
              <CustomTableCell>9.3</CustomTableCell>
            </Table.Row>
          )
        }
      }
      const table = await render(
        <Table caption={() => 'Test custom table'}>
          <Table.Head>
            <Table.Row>
              <Table.ColHeader id="foo">ColHeader</Table.ColHeader>
              <Table.ColHeader id="bar">Bar-header</Table.ColHeader>
              <Table.ColHeader id="baz">Bar-header</Table.ColHeader>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <CustomTableRow />
            <Table.Row>
              <Table.RowHeader>RowHeader</Table.RowHeader>
              <Table.Cell>Cell</Table.Cell>
              <Table.Cell>Cell2</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      )
      const stackedTable = page.getByRole('table').element()

      expect(stackedTable).toBeInTheDocument()
      const { container } = table
      expect(container).toBeInTheDocument()
      expect(container).toMatchTextContent('The Shawshank Redemption')
      expect(container).toMatchTextContent('9.3')
    })

    it('should render fully custom components', async () => {
      class CustomTableCell extends Component<any> {
        render() {
          return <td>{this.props.children}</td>
        }
      }

      class CustomTableRow extends Component<any> {
        render() {
          return <tr>{this.props.children}</tr>
        }
      }

      const table = await render(
        <Table caption={() => 'Test custom table'}>
          <Table.Head>
            <CustomTableRow>
              <CustomTableCell id="foo">ColHeader</CustomTableCell>
              <CustomTableCell id="bar">Bar-header</CustomTableCell>
              <Table.ColHeader id="baz">Bar-header</Table.ColHeader>
            </CustomTableRow>
          </Table.Head>
          <Table.Body>
            <CustomTableRow>
              <Table.RowHeader>RowHeader2</Table.RowHeader>
              <CustomTableCell>Cell</CustomTableCell>
              <Table.Cell>Cell2</Table.Cell>
            </CustomTableRow>
          </Table.Body>
        </Table>
      )
      const stackedTable = page.getByRole('table').element()

      expect(stackedTable).toBeInTheDocument()
      const { container } = table
      expect(container).toBeInTheDocument()
      expect(container).toMatchTextContent('ColHeader')
      expect(container).toMatchTextContent('Bar-header')
      expect(container).toMatchTextContent('RowHeader2')
      expect(container).toMatchTextContent('Cell')
      expect(container).toMatchTextContent('Cell2')
    })
  })

  describe('Component tests', () => {
    const TestTable = ({
      setHoverStateTo,
      hover
    }: {
      setHoverStateTo?: boolean
      hover?: boolean
    }) => (
      <Table caption={() => 'Test table'} hover={hover}>
        <Table.Head>
          <Table.Row data-testid="target-row" setHoverStateTo={setHoverStateTo}>
            <Table.ColHeader id="foo">ColHeader</Table.ColHeader>
            <Table.ColHeader id="bar">Bar-header</Table.ColHeader>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row data-testid="control-row">
            <Table.RowHeader>RowHeader</Table.RowHeader>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )

    const borderLeftColorOf = (testId: string) =>
      getComputedStyle(page.getByTestId(testId).element()).borderLeftColor

    it('can render table head as a combobox when in stacked layout', async () => {
      const sortFoo = vi.fn()

      await render(
        <Table caption={() => 'Sortable table'} layout="stacked">
          <Table.Head>
            <Table.Row>
              <Table.ColHeader id="id" onRequestSort={sortFoo}>
                Foo
              </Table.ColHeader>
              <Table.ColHeader id="bar" onRequestSort={sortFoo}>
                Bar
              </Table.ColHeader>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row></Table.Row>
            <Table.Row></Table.Row>
          </Table.Body>
        </Table>
      )
      const input = page.getByRole('combobox').element()

      await userEvent.click(input)
      await userEvent.click(page.getByRole('option').elements()[0])

      await vi.waitFor(() => {
        expect(sortFoo).toHaveBeenCalledOnce()
      })
    })

    it('should highlight row when setHoverStateTo is set to true', async () => {
      const { rerender } = await render(<TestTable />)
      const initialTargetColor = borderLeftColorOf('target-row')
      const initialControlColor = borderLeftColorOf('control-row')

      await rerender(<TestTable setHoverStateTo={true} />)

      await vi.waitFor(() => {
        expect(borderLeftColorOf('target-row')).not.toBe(initialTargetColor)
      })
      expect(borderLeftColorOf('control-row')).toBe(initialControlColor)
    })

    it('should not highlight row when setHoverStateTo is set to false', async () => {
      const { rerender } = await render(<TestTable />)
      const initialTargetColor = borderLeftColorOf('target-row')
      const initialControlColor = borderLeftColorOf('control-row')

      await rerender(<TestTable setHoverStateTo={false} />)

      expect(borderLeftColorOf('target-row')).toBe(initialTargetColor)
      expect(borderLeftColorOf('control-row')).toBe(initialControlColor)
    })

    it('should not highlight table row when hover is true but setHoverStateTo is false', async () => {
      await render(<TestTable setHoverStateTo={false} hover={true} />)

      const initialTargetColor = borderLeftColorOf('target-row')
      await userEvent.hover(page.getByTestId('target-row'))
      expect(borderLeftColorOf('target-row')).toBe(initialTargetColor)

      const initialControlColor = borderLeftColorOf('control-row')
      await userEvent.hover(page.getByTestId('control-row'))
      await vi.waitFor(() => {
        expect(borderLeftColorOf('control-row')).not.toBe(initialControlColor)
      })
    })

    it('should highlight table row when hover is false but setHoverStateTo is true', async () => {
      const { rerender } = await render(<TestTable />)
      const initialTargetColor = borderLeftColorOf('target-row')
      const initialControlColor = borderLeftColorOf('control-row')

      await rerender(<TestTable setHoverStateTo={true} hover={false} />)

      await vi.waitFor(() => {
        expect(borderLeftColorOf('target-row')).not.toBe(initialTargetColor)
      })
      expect(borderLeftColorOf('control-row')).toBe(initialControlColor)
    })

    it('should highlight table row when hover is true but setHoverStateTo is undefined', async () => {
      await render(<TestTable setHoverStateTo={undefined} hover={true} />)

      const initialTargetColor = borderLeftColorOf('target-row')
      await userEvent.hover(page.getByTestId('target-row'))
      await vi.waitFor(() => {
        expect(borderLeftColorOf('target-row')).not.toBe(initialTargetColor)
      })

      const initialControlColor = borderLeftColorOf('control-row')
      await userEvent.hover(page.getByTestId('control-row'))
      await vi.waitFor(() => {
        expect(borderLeftColorOf('control-row')).not.toBe(initialControlColor)
      })
    })

    it('should not highlight table row when hover is false and setHoverStateTo is undefined', async () => {
      await render(<TestTable setHoverStateTo={undefined} hover={false} />)

      const initialTargetColor = borderLeftColorOf('target-row')
      await userEvent.hover(page.getByTestId('target-row'))
      expect(borderLeftColorOf('target-row')).toBe(initialTargetColor)

      const initialControlColor = borderLeftColorOf('control-row')
      await userEvent.hover(page.getByTestId('control-row'))
      expect(borderLeftColorOf('control-row')).toBe(initialControlColor)
    })
  })
})
