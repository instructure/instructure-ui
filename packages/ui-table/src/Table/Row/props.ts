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

import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'

import { ColHeader } from '../ColHeader'
import { RowHeader } from '../RowHeader'
import { Cell } from '../Cell'
import type { TableCellProps } from '../Cell/props'

import type {
  OtherHTMLAttributes,
  PropValidators,
  TableRowTheme
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

type TableRowOwnProps = {
  hover?: boolean
  isStacked?: boolean
  headers?: TableCellProps['header'][]
  /**
   * `Table.ColHeader`, `Table.RowHeader` or `Table.Cell`
   */
  children?: React.ReactNode
}

type PropKeys = keyof TableRowOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TableRowProps = TableRowOwnProps &
  WithStyleProps<TableRowTheme, TableRowStyle> &
  OtherHTMLAttributes<TableRowOwnProps>

type TableRowStyle = ComponentStyle<'row'>

const propTypes: PropValidators<PropKeys> = {
  children: ChildrenPropTypes.oneOf([ColHeader, RowHeader, Cell]),
  hover: PropTypes.bool,
  isStacked: PropTypes.bool,
  headers: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  )
}

const allowedProps: AllowedPropKeys = [
  'children',
  'hover',
  'isStacked',
  'headers'
]

export type { TableRowProps, TableRowStyle }
export { propTypes, allowedProps }
