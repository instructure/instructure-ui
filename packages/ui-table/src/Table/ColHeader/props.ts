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
import React, { ThHTMLAttributes } from 'react'
import PropTypes from 'prop-types'

import type {
  OtherHTMLAttributes,
  PropValidators,
  TableColHeaderTheme
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

type TableColHeaderOwnProps = {
  /**
   * A unique id for this column. The `id` is also used as option in combobox,
   * when sortable table is in stacked layout,
   * and no `stackedSortByLabel` is provided.
   */
  id: string
  /**
   * A custom string to display as option text in the combobox (instead of
   * using the `id` prop), when sortable table is in stacked layout.
   */
  stackedSortByLabel?: string
  /**
   * Control the width of column.
   */
  width?: string | number
  /**
   * Control the text alignment in column header
   */
  textAlign?: 'start' | 'center' | 'end'
  /**
   * The string of sorting direction
   */
  sortDirection?: 'none' | 'ascending' | 'descending'
  /**
   * Callback fired when column header is clicked. Parameters: `(event, { id })`
   */
  onRequestSort?: (
    event: React.SyntheticEvent,
    param: { id: TableColHeaderOwnProps['id'] }
  ) => void
  /**
   * The column header scope attribute. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-scope
   */
  scope?: 'row' | 'col' | 'rowgroup' | 'colgroup' | 'auto'
  children?: React.ReactNode | (() => React.ReactNode)
}

type PropKeys = keyof TableColHeaderOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TableColHeaderProps = TableColHeaderOwnProps &
  WithStyleProps<TableColHeaderTheme, TableColHeaderStyle> &
  OtherHTMLAttributes<
    TableColHeaderOwnProps,
    ThHTMLAttributes<TableColHeaderOwnProps>
  >

type TableColHeaderStyle = ComponentStyle<
  'colHeader' | 'button' | 'buttonContent'
>

const propTypes: PropValidators<PropKeys> = {
  id: PropTypes.string.isRequired,
  stackedSortByLabel: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  textAlign: PropTypes.oneOf(['start', 'center', 'end']),
  sortDirection: PropTypes.oneOf(['none', 'ascending', 'descending']),
  onRequestSort: PropTypes.func,
  scope: PropTypes.oneOf(['row', 'col', 'rowgroup', 'colgroup', 'auto'])
}

const allowedProps: AllowedPropKeys = [
  'id',
  'stackedSortByLabel',
  'children',
  'width',
  'textAlign',
  'sortDirection',
  'onRequestSort',
  'scope'
]

export type { TableColHeaderProps, TableColHeaderStyle }
export { propTypes, allowedProps }
