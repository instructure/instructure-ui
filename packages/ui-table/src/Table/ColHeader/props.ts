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
import PropTypes from 'prop-types'

import type { PropValidators } from '@instructure/shared-types'
import type { WithStyleProps } from '@instructure/emotion'

type TableColHeaderOwnProps = {
  id: string
  stackedSortByLabel?: string
  width?: string | number
  textAlign?: 'start' | 'center' | 'end'
  sortDirection?: 'none' | 'ascending' | 'descending'
  onRequestSort?: (...args: any[]) => any
  scope?: 'row' | 'col' | 'rowgroup' | 'colgroup' | 'auto'
  children?: React.ReactNode | ((...args: any[]) => React.ReactNode)
}

type PropKeys = keyof TableColHeaderOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TableColHeaderProps = TableColHeaderOwnProps & WithStyleProps

const propTypes: PropValidators<PropKeys> = {
  /**
   * A unique id for this column. The `id` is also used as option in combobox,
   * when sortable table is in stacked layout,
   * and no `stackedSortByLabel` is provided.
   */
  id: PropTypes.string.isRequired,
  /**
   * A custom string to display as option text in the combobox (instead of
   * using the `id` prop), when sortable table is in stacked layout.
   */
  stackedSortByLabel: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * Control the width of column.
   */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Control the text alignment in column header
   */
  textAlign: PropTypes.oneOf(['start', 'center', 'end']),
  /**
   * The string of sorting direction
   */
  sortDirection: PropTypes.oneOf(['none', 'ascending', 'descending']),
  /**
   * Callback fired when column header is clicked. Parameters: `(event, { id })`
   */
  onRequestSort: PropTypes.func,
  /**
   * The column header scope attribute. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-scope
   */
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

export type { TableColHeaderProps }
export { propTypes, allowedProps }
