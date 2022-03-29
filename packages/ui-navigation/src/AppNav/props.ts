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

import { Item } from './Item'

import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type {
  PropValidators,
  AppNavTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'

type AppNavOwnProps = {
  /**
   * Screenreader label for the overall navigation
   */
  screenReaderLabel: string
  /**
   * The rate (in ms) the component responds to container resizing or
   * an update to one of its child items
   */
  debounce?: number
  /**
   * Content to display before the navigation items, such as a logo
   */
  renderBeforeItems?: React.ReactNode | ((...args: any[]) => any)
  /**
   * Content to display after the navigation items, aligned to the far end
   * of the navigation
   */
  renderAfterItems?: React.ReactNode | ((...args: any[]) => any)
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: Spacing
  /**
   * Provides a reference to the underlying nav element
   */
  elementRef?: (element: Element | null) => void
  /**
   * Customize the text displayed in the menu trigger when links overflow
   * the overall nav width.
   */
  renderTruncateLabel?: React.ReactNode | ((...args: any[]) => any)
  /**
   * Called whenever the navigation items are updated or the size of
   * the navigation changes. Passes in the `visibleItemsCount` as
   * a parameter.
   */
  onUpdate?: ({ visibleItemsCount }: { visibleItemsCount: number }) => void
  /**
   * Sets the number of navigation items that are visible.
   */
  visibleItemsCount?: number
  /**
   * Only accepts `AppNav.Item` as children
   */
  children?: React.ReactNode
}

type PropKeys = keyof AppNavOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type AppNavProps = AppNavOwnProps &
  WithStyleProps<AppNavTheme, AppNavStyle> &
  OtherHTMLAttributes<AppNavOwnProps>

type AppNavStyle = ComponentStyle<
  | 'appNav'
  | 'alignCenter'
  | 'listItemWithMenuTrigger'
  | 'listItem'
  | 'list'
  | 'menuTriggerWidth'
>

const propTypes: PropValidators<PropKeys> = {
  screenReaderLabel: PropTypes.string.isRequired,
  children: ChildrenPropTypes.oneOf([Item]),
  debounce: PropTypes.number,
  renderBeforeItems: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  renderAfterItems: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  margin: ThemeablePropTypes.spacing,
  elementRef: PropTypes.func,
  renderTruncateLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onUpdate: PropTypes.func,
  visibleItemsCount: PropTypes.number
}

const allowedProps: AllowedPropKeys = [
  'screenReaderLabel',
  'children',
  'debounce',
  'renderBeforeItems',
  'renderAfterItems',
  'margin',
  'elementRef',
  'renderTruncateLabel',
  'onUpdate',
  'visibleItemsCount'
]

export type { AppNavProps, AppNavStyle }
export { propTypes, allowedProps }
