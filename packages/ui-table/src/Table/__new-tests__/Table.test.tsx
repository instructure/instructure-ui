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
import { render, screen, waitFor } from '@testing-library/react'
import { MockInstance, vi } from 'vitest'
import { userEvent } from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { Table } from '../index'
import type { TableProps } from '../props'
import type { TableColHeaderProps } from '../ColHeader/props'
import { runAxeCheck } from '@instructure/ui-axe-check'

// see https://github.com/vitest-dev/eslint-plugin-vitest/issues/511
// eslint-disable-next-line vitest/valid-describe-callback
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
      <Table caption="Test table" {...props}>
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
    const { container } = renderTable()
    const caption = container.querySelector('caption')

    expect(caption).toBeInTheDocument()
    expect(caption).toHaveTextContent('Test table')
  })

  it('should meet a11y standards', async () => {
    const { container } = renderTable()
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  it('applies a fixed column layout', async () => {
    await renderTable({
      layout: 'fixed'
    })
    const table = screen.getByRole('table')

    expect(table).toHaveStyle({ tableLayout: 'fixed' })
  })

  it('passes hover to table row', async () => {
    renderTable({
      hover: true
    })
    const tableRows = screen.getAllByRole('row')

    tableRows.forEach((tableRow) => {
      expect(tableRow).not.toHaveAttribute('border-left', 'none')
      expect(tableRow).not.toHaveAttribute('border-right', 'none')
    })
  })

  it('sets the scope of column header to col', async () => {
    await renderTable()
    const columnHeaders = screen.getAllByRole('columnheader')

    columnHeaders.forEach((columnHeader) => {
      expect(columnHeader).toHaveAttribute('scope', 'col')
    })
  })

  it('sets the scope of row header to row', async () => {
    renderTable()
    const rowHeaders = screen.getAllByRole('rowheader')

    rowHeaders.forEach((rowHeader) => {
      expect(rowHeader).toHaveAttribute('scope', 'row')
    })
  })

  it('can render table in stacked layout', async () => {
    renderTable({
      layout: 'stacked'
    })
    const stackedTable = screen.getByRole('table')

    expect(stackedTable).toBeInTheDocument()
    expect(stackedTable).toHaveTextContent('RowHeader')
    expect(stackedTable).toHaveTextContent('Cell')
    expect(stackedTable).not.toHaveTextContent('ColHeader')
  })

  it('can handle non-existent head in stacked layout', async () => {
    render(
      <Table caption="Test table" layout="stacked">
        <Table.Body></Table.Body>
      </Table>
    )
    const stackedTable = screen.getByRole('table')

    expect(stackedTable).toBeInTheDocument()
  })

  it('can handle empty head in stacked layout', async () => {
    render(
      <Table caption="Test table" layout="stacked">
        <Table.Head></Table.Head>
      </Table>
    )
    const stackedTable = screen.getByRole('table')

    expect(stackedTable).toBeInTheDocument()
  })

  it('can handle invalid header in stacked layout', async () => {
    render(
      <Table caption="Test table" layout="stacked">
        <Table.Head>
          <Table.Row>
            <Table.Cell>Foo</Table.Cell>
          </Table.Row>
        </Table.Head>
      </Table>
    )
    const stackedTable = screen.getByRole('table')

    expect(stackedTable).toBeInTheDocument()
    expect(stackedTable).not.toHaveTextContent('Foo')
  })

  it('does not crash for invalid children', async () => {
    render(
      <Table caption="Test table" layout="stacked">
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
            <Table.Cell>Foo</Table.Cell>
            test
            <span>test</span>
          </Table.Row>
        </Table.Body>
      </Table>
    )
    const table = screen.getByRole('table')

    expect(table).toBeInTheDocument()
    expect(table).toHaveTextContent('Foo')
  })

  // see https://github.com/vitest-dev/eslint-plugin-vitest/issues/511
  // eslint-disable-next-line vitest/valid-describe-callback
  describe('when table is sortable', async () => {
    const renderSortableTable = (
      props: TableColHeaderProps | null,
      handlers = {},
      layout: TableProps['layout'] = 'auto'
    ) =>
      render(
        <Table caption="Sortable table" layout={layout}>
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
      const { container } = renderSortableTable({
        id: 'id',
        sortDirection: 'ascending'
      })
      const arrow = container.querySelector('svg')

      expect(arrow).toHaveAttribute('name', 'IconMiniArrowUp')
    })

    it('can render down arrow for descending order', async () => {
      const { container } = renderSortableTable({
        id: 'id',
        sortDirection: 'descending'
      })
      const arrow = container.querySelector('svg')

      expect(arrow).toHaveAttribute('name', 'IconMiniArrowDown')
    })

    it('calls onRequestSort when column header is clicked', async () => {
      const onRequestSort = vi.fn()
      renderSortableTable(
        {
          id: 'id'
        },
        {
          onRequestSort
        }
      )
      const button = screen.getByRole('button', { name: 'Foo' })

      userEvent.click(button)

      await waitFor(() => {
        expect(onRequestSort).toHaveBeenCalledTimes(1)
      })
    })

    it('can display custom label in the select in stacked layout', async () => {
      renderSortableTable(
        {
          id: 'id',
          stackedSortByLabel: 'Custom Text'
        },
        {
          onRequestSort: vi.fn()
        },
        'stacked'
      )
      const input = screen.getByRole('combobox')

      userEvent.click(input)

      await waitFor(async () => {
        const options = screen.getAllByRole('option')

        expect(options[0]).toHaveTextContent('Custom Text')
        expect(options[1]).toHaveTextContent('bar')
      })
    })

    it('can render check mark for sorted column in stacked layout', async () => {
      const { container } = renderSortableTable(
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

      expect(icon).toHaveAttribute('name', 'IconCheck')
    })

    it('creates proper aria-sort attributes (ascending)', async () => {
      renderSortableTable({
        id: 'id',
        sortDirection: 'ascending'
      })
      const header = screen.getByRole('columnheader', { name: 'Foo' })

      expect(header).toHaveAttribute('aria-sort', 'ascending')
    })

    it('creates proper aria-sort attributes (descending)', async () => {
      renderSortableTable({
        id: 'id',
        sortDirection: 'descending'
      })
      const header = screen.getByRole('columnheader', { name: 'Foo' })

      expect(header).toHaveAttribute('aria-sort', 'descending')
    })
  })

  describe('when using custom components', () => {
    it('should render wrapper HOCs', () => {
      class CustomTableCell extends React.Component<any> {
        render() {
          return <Table.Cell {...this.props}>{this.props.children}</Table.Cell>
        }
      }
      class CustomTableRow extends React.Component {
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
      const table = render(
        <Table caption="Test custom table">
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
      const stackedTable = screen.getByRole('table')

      expect(stackedTable).toBeInTheDocument()
      const { container } = table
      expect(container).toBeInTheDocument()
      expect(container).toHaveTextContent('The Shawshank Redemption')
      expect(container).toHaveTextContent('9.3')
    })

    it('should render fully custom components', () => {
      class CustomTableCell extends React.Component<any> {
        render() {
          return <td>{this.props.children}</td>
        }
      }

      class CustomTableRow extends React.Component<any> {
        render() {
          return <tr>{this.props.children}</tr>
        }
      }

      const table = render(
        <Table caption="Test custom table">
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
      const stackedTable = screen.getByRole('table')

      expect(stackedTable).toBeInTheDocument()
      const { container } = table
      expect(container).toBeInTheDocument()
      expect(container).toHaveTextContent('ColHeader')
      expect(container).toHaveTextContent('Bar-header')
      expect(container).toHaveTextContent('RowHeader2')
      expect(container).toHaveTextContent('Cell')
      expect(container).toHaveTextContent('Cell2')
    })
  })
})
