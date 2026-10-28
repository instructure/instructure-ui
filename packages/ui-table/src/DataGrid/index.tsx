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

import { useEffect } from 'react'
import {
  createExpandedRowModel,
  createPaginatedRowModel,
  rowExpandingFeature,
  rowPaginationFeature,
  tableFeatures,
  useTable
} from '@tanstack/react-table'
import type { Row, RowData, Cell } from '@tanstack/react-table'
import { IconButton } from '@instructure/ui-buttons/latest'
import {
  ChevronDownInstUIIcon,
  ChevronRightInstUIIcon
} from '@instructure/ui-icons'
import { Pagination } from '@instructure/ui-pagination/latest'

import type { DataGridProps } from './props'

const features = tableFeatures({
  rowExpandingFeature,
  expandedRowModel: createExpandedRowModel(), // if using client-side expanding
  // manualExpanding: true, // if using manual server-side expanding
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel() // if using client-side pagination
  // manualPagination: true, // if using manual server-side pagination TODO needed?
})

/**
---
category: components
isWIP: true
---
**/
const DataGrid = <TData extends RowData>({
  data,
  columns,
  caption,
  pagination,
  expandedRows
}: DataGridProps<typeof features, TData>) => {
  const showExpandButtons = expandedRows?.showExpandButtons ?? true

  const table = useTable({
    features,
    columns,
    data,
    getSubRows: expandedRows?.getSubRows,
    // consumers commonly rebuild `data` on every render, which would otherwise collapse everything
    autoResetExpanded: false,
    initialState: {
      expanded: showExpandButtons ? {} : true,
      pagination: pagination && {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize
      }
    }
    //manualPagination: true needed for server side pagination
    //rowCount: dataQuery.data?.rowCount needed for server side pagination
  })

  // initialState only applies on mount, so a later change of the prop has to be pushed into the state.
  // `table` is not a dependency: useTable returns a new object on every render, which would loop
  useEffect(() => {
    table.setExpanded(showExpandButtons ? {} : true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showExpandButtons])

  // the paginated row model always slices to a page, so skip it when pagination is off
  const rows = pagination
    ? table.getRowModel().rows
    : table.getPrePaginatedRowModel().rows

  const expandableCell = (
    row: Row<typeof features, TData>,
    cell: Cell<typeof features, TData>,
    labelCollapseRow: string,
    labelExpandRow: string
  ) => (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        // TODO figure out the exact size of a button
        paddingInlineStart: `${row.depth * 2}rem`
      }}
    >
      {showExpandButtons && row.getCanExpand() && (
        <IconButton
          size="small"
          withBackground={false}
          withBorder={false}
          screenReaderLabel={
            row.getIsExpanded() ? labelCollapseRow : labelExpandRow
          }
          aria-expanded={row.getIsExpanded()}
          onClick={() => row.toggleExpanded()}
        >
          {row.getIsExpanded() ? (
            <ChevronDownInstUIIcon size="md" />
          ) : (
            <ChevronRightInstUIIcon size="md" />
          )}
        </IconButton>
      )}
      <table.FlexRender cell={cell} />
    </span>
  )

  return (
    <>
      <table>
        <caption>{caption}</caption>
        <thead>
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan} scope="col">
                  {header.isPlaceholder ? null : (
                    <table.FlexRender header={header} />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {row.getAllCells().map((cell, index) => (
                <td key={cell.id}>
                  {expandedRows && index === 0 ? (
                    // first column needs indent and expand buttons
                    expandableCell(
                      row,
                      cell,
                      expandedRows.labelCollapseRow,
                      expandedRows.labelExpandRow
                    )
                  ) : (
                    <table.FlexRender cell={cell} />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && (
        <Pagination
          as="nav"
          variant="compact"
          labelNext={pagination.labelNext}
          labelPrev={pagination.labelPrev}
          screenReaderLabelPageButton={pagination.screenReaderLabelPageButton}
          margin="general.spaceMd 0 0"
          currentPage={table.state.pagination.pageIndex + 1}
          totalPageNumber={table.getPageCount()}
          onPageChange={(nextPage) => table.setPageIndex(nextPage - 1)}
        />
      )}
    </>
  )
}

DataGrid.displayName = 'DataGrid'

export default DataGrid
export { DataGrid }
