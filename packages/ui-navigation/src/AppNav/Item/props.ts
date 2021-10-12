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

type AppNavItemOwnProps = {
  renderLabel: React.ReactNode | ((...args: any[]) => any)
  renderAfter?: React.ReactNode | ((...args: any[]) => any)
  renderIcon?: React.ReactNode | ((...args: any[]) => any)
  href?: string
  onClick?: (...args: any[]) => any
  isSelected?: boolean
  elementRef?: (element: Element | null) => void
  as?: AsElementType
  cursor?: string
  isDisabled?: boolean
}

type PropKeys = keyof AppNavItemOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type AppNavItemProps = AppNavItemOwnProps &
  WithStyleProps<AppNavItemTheme, AppNavItemStyle> &
  OtherHTMLAttributes<AppNavItemOwnProps>

type AppNavItemStyle = ComponentStyle<'item' | 'label'>

const propTypes: PropValidators<PropKeys> = {
  /**
   * The text to display. If the `icon` prop is used, label text must be wrapped
   * in `ScreenReaderContent`.
   */
  renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  /**
   * Content to display after the renderLabel text, such as a badge
   */
  renderAfter: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * The visual to display (ex. an Image, Logo, Avatar, or Icon)
   */
  renderIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * If the item goes to a new page, pass an href
   */
  href: PropTypes.string,
  /**
   * If the item does not go to a new page, pass an onClick
   */
  onClick: PropTypes.func,
  /**
   * Denotes which item is currently selected
   */
  isSelected: PropTypes.bool,
  /**
   * provides a reference to the underlying focusable (`button` or `a`) element
   */
  elementRef: PropTypes.func,
  /**
   * The element type to render as (will default to `<a>` if href is provided)
   */
  as: PropTypes.elementType,
  /**
   * Specify the mouse cursor to use on :hover.
   * The `pointer` cursor is used by default.
   */
  cursor: PropTypes.string,
  /**
   * Disables the link or button visually and functionally
   */
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
