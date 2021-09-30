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
import { ThemeablePropTypes } from '@instructure/emotion'

import { Head } from './Head'
import { Body } from './Body'

import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type { PropValidators, TableTheme } from '@instructure/shared-types'

type TableOwnProps = {
  caption: React.ReactNode
  margin?: Spacing
  elementRef?: (element: Element | null) => void
  hover?: boolean
  layout?: 'auto' | 'fixed' | 'stacked'
  children?: React.ReactNode
}

type PropKeys = keyof TableOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TableProps = TableOwnProps & WithStyleProps<TableTheme, TableStyle>

type TableStyle = ComponentStyle<'table'>

const propTypes: PropValidators<PropKeys> = {
  /**
   * Provide a screen reader friendly description. Anything passed to this
   * prop will be wrapped by `<ScreenReaderContent>` when it is rendered.
   */
  caption: PropTypes.node.isRequired,
  /**
   * Build table via `Table.Head` and `Table.Body`
   */
  children: ChildrenPropTypes.oneOf([Head, Body]),
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin: ThemeablePropTypes.spacing,
  /**
   * Provide a reference to the underlying html element
   */
  elementRef: PropTypes.func,
  /**
   * Highlight each row on hover
   */
  hover: PropTypes.bool,
  /**
   * `auto` lets the browser determine table column widths based on cell content,
   * while `fixed` forces columns of equal width. `stacked` renders table in one
   * column to be more readable on narrow screens
   */
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

export type { TableProps, TableStyle }
export { propTypes, allowedProps }
