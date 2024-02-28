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

import PropTypes from 'prop-types'

import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import { ThemeablePropTypes } from '@instructure/emotion'

import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type {
  OtherHTMLAttributes,
  PropValidators,
  TableTheme
} from '@instructure/shared-types'

import { Head } from './Head'
import type { TableHeadProps } from './Head/props'
import { Body } from './Body'
import type { TableBodyProps } from './Body/props'
import { Row } from './Row'
import type { TableRowProps } from './Row/props'
import { ColHeader } from './ColHeader'
import type { TableColHeaderProps } from './ColHeader/props'
import { RowHeader } from './RowHeader'
import type { TableRowHeaderProps } from './RowHeader/props'
import { Cell } from './Cell'
import type { TableCellProps } from './Cell/props'

type HeadChild = React.ComponentElement<TableHeadProps, Head>
type BodyChild = React.ComponentElement<TableBodyProps, Body>
type RowChild = React.ComponentElement<TableRowProps, Row>
type ColHeaderChild = React.ComponentElement<TableColHeaderProps, ColHeader>
type RowHeaderChild = React.ComponentElement<TableRowHeaderProps, RowHeader>
type CellChild = React.ComponentElement<TableCellProps, Cell>

type TableOwnProps = {
  /**
   * Provide a screen reader friendly description. Anything passed to this
   * prop will be wrapped by `<ScreenReaderContent>` when it is rendered.
   */
  caption?: React.ReactNode
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: Spacing
  /**
   * Provide a reference to the underlying html element
   */
  elementRef?: (element: Element | null) => void
  /**
   * Highlight each row on hover
   */
  hover?: boolean
  /**
   * `auto` lets the browser determine table column widths based on cell content,
   * while `fixed` forces columns of equal width. `stacked` renders table in one
   * column to be more readable on narrow screens
   */
  layout?: 'auto' | 'fixed' | 'stacked'
  /**
   * Build table via `Table.Head` and `Table.Body`
   */
  children?: React.ReactNode
}

type PropKeys = keyof TableOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TableProps = TableOwnProps &
  WithStyleProps<TableTheme, TableStyle> &
  OtherHTMLAttributes<TableOwnProps>

type TableStyle = ComponentStyle<'table'>

const propTypes: PropValidators<PropKeys> = {
  caption: PropTypes.node.isRequired,
  children: ChildrenPropTypes.oneOf([Head, Body]),
  margin: ThemeablePropTypes.spacing,
  elementRef: PropTypes.func,
  hover: PropTypes.bool,
  layout: PropTypes.oneOf(['auto', 'fixed', 'stacked'])
}

const allowedProps: AllowedPropKeys = [
  'caption',
  'children',
  'margin',
  'elementRef',
  'hover',
  'layout'
]

export type {
  TableProps,
  TableStyle,
  // children
  HeadChild,
  BodyChild,
  RowChild,
  ColHeaderChild,
  RowHeaderChild,
  CellChild
}
export { propTypes, allowedProps }
