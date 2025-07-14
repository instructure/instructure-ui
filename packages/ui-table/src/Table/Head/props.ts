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



import type {
  OtherHTMLAttributes,
  
  Renderable,
  TableHeadTheme
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import { RowChild } from '../props'

type TableHeadOwnProps = {
  /**
   * The sort `Select`'s label when using `stacked` layout and the table is
   * sortable.
   * If you don't want to display anything you should use `ScreenReaderContent`
   * so screen readers can read the `Select`'s purpose
   */
  renderSortLabel?: Renderable
  /**
   * The header row(s).
   * Default type: `Table.Row`
   *
   * Its first child is treated specially if the table is sortable and has
   * `stacked` layout:
   *
   * A `Select` is created which reads options from the first child's
   * children, that tries to read the following props: `id`,
   * `stackedSortByLabel`,`sortDirection`, `onRequestSort` (Available on
   * `Table.ColHeader`).
   * These are used to sort the table in this layout.
   */
  children?: RowChild
}
type PropKeys = keyof TableHeadOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TableHeadProps = TableHeadOwnProps &
  WithStyleProps<TableHeadTheme, TableHeadStyle> &
  OtherHTMLAttributes<TableHeadOwnProps>

type TableHeadStyle = ComponentStyle<'head'>
const allowedProps: AllowedPropKeys = ['children', 'renderSortLabel']

export type { TableHeadProps, TableHeadStyle }
export { allowedProps }
