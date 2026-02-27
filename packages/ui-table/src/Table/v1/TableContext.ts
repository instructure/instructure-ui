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

import { createContext } from 'react'
import { Renderable } from '@instructure/shared-types'

type TableContextType = {
  /**
   * If `true` the table gets rendered in one column to be more readable on
   * narrow screens.
   */
  isStacked: boolean
  /**
   * Highlight each row on hover.
   */
  hover: boolean
  /**
   * Contents of the first row of cells. Has value if `isStacked` is `true`.
   */
  headers?: Renderable[]
}

/**
 * ---
 * category: components/contexts
 * ---
 * React context created by the `Table` component to hold its data which are
 * read by its children. You can access these to make custom Table cells/rows.
 *
 * It stores the following parameters:
 * - `isStacked`: Whether the `Table` is in `stacked` layout.
 * - `hover`: Whether highlight rows on mouse hover
 * - `headers`: in `stacked` layout the children of the first row of cells
 *   (e.g. the titles in a table). This is used in `stacked` layout to display
 *   the titles inline
 * @module
 */
const TableContext = createContext<TableContextType>({
  isStacked: false,
  hover: false
})

export default TableContext
export { TableContext }
export type { TableContextType }
