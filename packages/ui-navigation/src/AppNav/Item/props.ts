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

import type {
  AsElementType,
  PropValidators,
  AppNavItemTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type { Cursor } from '@instructure/ui-prop-types'
import type { ViewProps } from '@instructure/ui-view'

type AppNavItemOwnProps = {
  /**
   * The text to display. If the `icon` prop is used, label text must be wrapped
   * in `ScreenReaderContent`.
   */
  renderLabel: React.ReactNode | string | ((...args: any[]) => string)
  /**
   * Content to display after the renderLabel text, such as a badge
   */
  renderAfter?: React.ReactNode | ((...args: any[]) => any)
  /**
   * The visual to display (ex. an Image, Logo, Avatar, or Icon)
   */
  renderIcon?: React.ReactNode | ((...args: any[]) => any)
  /**
   * If the item goes to a new page, pass an href
   */
  href?: string
  /**
   * If the item does not go to a new page, pass an onClick
   */
  onClick?: (event: React.MouseEvent<ViewProps>) => void
  /**
   * Denotes which item is currently selected
   */
  isSelected?: boolean
  /**
   * provides a reference to the underlying focusable (`button` or `a`) element
   */
  elementRef?: (element: Element | null) => void
  /**
   * The element type to render as (will default to `<a>` if href is provided)
   */
  as?: AsElementType
  /**
   * Specify the mouse cursor to use on :hover.
   * The `pointer` cursor is used by default.
   */
  cursor?: Cursor
  /**
   * Disables the link or button visually and functionally
   */
  isDisabled?: boolean
}

type PropKeys = keyof AppNavItemOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type AppNavItemProps = AppNavItemOwnProps &
  WithStyleProps<AppNavItemTheme, AppNavItemStyle> &
  OtherHTMLAttributes<AppNavItemOwnProps>

type AppNavItemStyle = ComponentStyle<'item' | 'label'>

const propTypes: PropValidators<PropKeys> = {
  renderLabel: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.func
  ]).isRequired,
  renderAfter: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  renderIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  href: PropTypes.string,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool,
  elementRef: PropTypes.func,
  as: PropTypes.elementType,
  cursor: PropTypes.string,
  isDisabled: PropTypes.bool
}

const allowedProps: AllowedPropKeys = [
  'renderLabel',
  'renderAfter',
  'renderIcon',
  'href',
  'onClick',
  'isSelected',
  'elementRef',
  'as',
  'cursor',
  'isDisabled'
]

export type { AppNavItemProps, AppNavItemStyle }
export { propTypes, allowedProps }
