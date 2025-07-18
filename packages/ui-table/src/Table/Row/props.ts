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
import type {
  OtherHTMLAttributes,
  TableRowTheme
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

type TableRowOwnProps = {
  /**
   * A row's children should be table cells. Its children should have the
   * `header` prop to render the column header in `stacked` layout
   *
   * By default `Table.ColHeader` or `Table.RowHeader` or `Table.Cell`
   */
  children?: React.ReactElement<any> | React.ReactElement<any>[]

  /**
   * Controls the hover state of the row.
   * When set to true, the row will appear highlighted even when not hovered.
   * When set to false, the row will not highlight on hover even if the hover prop is set to true.
   */
  setHoverStateTo?: boolean
}

type PropKeys = keyof TableRowOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TableRowProps = TableRowOwnProps &
  WithStyleProps<TableRowTheme, TableRowStyle> &
  OtherHTMLAttributes<TableRowOwnProps>

type TableRowStyle = ComponentStyle<'row'>

const allowedProps: AllowedPropKeys = ['children', 'setHoverStateTo']

export type { TableRowProps, TableRowStyle }
export { allowedProps }
