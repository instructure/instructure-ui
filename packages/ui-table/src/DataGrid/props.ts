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

import type { ColumnDef, RowData, TableFeatures } from '@tanstack/react-table'

type DataGridPagination = {
  /**
   * The zero-based index of the page to show initially.
   */
  initialPageIndex: number
  /**
   * The number of rows on each page.
   */
  pageSize: number
  /**
   * Accessible label for the next page button.
   */
  labelNext: string
  /**
   * Accessible label for the previous page button.
   */
  labelPrev: string
  /**
   * Accessible label for a page number button, given the page and the total page count.
   */
  screenReaderLabelPageButton?: (
    currentPage: number,
    totalPageNumber: number
  ) => string
}

type DataGridExpandedRows<TData extends RowData> = {
  /**
   * Returns the child rows of a row, which makes the row expandable.
   * Rows without children have no expand button.
   */
  getSubRows: (
    originalRow: TData,
    index: number
  ) => undefined | ReadonlyArray<TData>
  /**
   * Whether the expand/collapse buttons are visible. When they are hidden,
   * all rows are expanded. Defaults to `true`.
   */
  showExpandButtons?: boolean
  /**
   * Accessible label for the expand button of a collapsed row.
   */
  labelExpandRow: string
  /**
   * Accessible label for the collapse button of an expanded row.
   */
  labelCollapseRow: string
}

type DataGridSortDirection = 'none' | 'ascending' | 'descending'

type DataGridSorting = {
  /**
   * Returns the accessible label of a sortable header button, given the header
   * text and the current sort direction of its column.
   */
  labelSortColumn: (
    sortByHeader: string,
    sortDirection: DataGridSortDirection
  ) => string
  /**
   * The sort to apply initially. Without it the rows start in their original order.
   */
  defaultSort?: {
    /**
     * id of the column (the `accessorKey` unless the column has an `id`)
     */
    columnId: string
    direction: Exclude<DataGridSortDirection, 'none'>
  }
}

type DataGridOwnProps<
  TFeatures extends TableFeatures,
  TData extends RowData
> = {
  /**
   * The rows to display. Each item becomes one row.
   */
  data: TData[]
  /**
   * TanStack Table column definitions describing how to read and render each column.
   */
  columns: ColumnDef<TFeatures, TData>[]
  /**
   * A screen reader friendly description of the table.
   */
  caption: string
  /**
   * Turns on pagination. `initialPageIndex` is the zero-based initial page and
   * `pageSize` is the number of rows per page. The label props are the text
   * for the pagination controls.
   */
  pagination?: DataGridPagination
  /**
   * Turns on expandable rows. Rows with children (see `getSubRows`) get an expand button, and all rows start collapsed.
   */
  expandedRows?: DataGridExpandedRows<TData>
  /**
   * Turns on sorting. Clicking a column header changes sorting order, and only
   * one column is sorted at a time.
   * Columns opt out with `enableSorting: false` in their definition.
   */
  sorting?: DataGridSorting
}

type DataGridProps<
  TFeatures extends TableFeatures,
  TData extends RowData
> = DataGridOwnProps<TFeatures, TData>

export type {
  DataGridProps,
  DataGridPagination,
  DataGridExpandedRows,
  DataGridSorting,
  DataGridSortDirection
}
