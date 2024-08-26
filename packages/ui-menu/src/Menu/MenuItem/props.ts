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
import MenuItem from '../MenuItem'
import { controllable } from '@instructure/ui-prop-types'

import type {
  AsElementType,
  PropValidators,
  MenuItemTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'

type OnMenuItemSelect = (
  e: React.MouseEvent,
  value: MenuItemProps['value'],
  selected: MenuItemProps['selected'],
  args: MenuItem
) => void

type MenuItemOwnProps = {
  /**
   * the menu item label
   */
  children: React.ReactNode
  /**
   * whether to set the menu item state to selected or not on initial render
   */
  defaultSelected?: boolean
  /**
   * whether the menu item is selected or not (must be accompanied by an `onSelect` prop)
   */
  selected?: boolean // TODO: controllable(PropTypes.bool, 'onSelect', 'defaultSelected')
  /**
   * when used with the `selected` prop, the component will not control its own state
   */
  onSelect?: OnMenuItemSelect
  onClick?: (e: React.MouseEvent) => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  onKeyUp?: (e: React.KeyboardEvent) => void
  onMouseOver?: (e: React.MouseEvent, args: MenuItem) => void
  /**
   * the id of the element that the menu item will act upon
   */
  controls?: string
  disabled?: boolean
  /**
   * the element type to render as (will default to `<a>` if href is provided)
   */
  as?: AsElementType
  /**
   * How this component should be rendered. If it's `checkbox` or `radio` it will
   * display a checkmark based on its own 'selected' state, if it's `flyout` it will
   * render an arrow after the label.
   */
  type?: 'button' | 'checkbox' | 'radio' | 'flyout'
  /**
   * Arbitrary value that you can store in this component. Is sent out by the
   * `onSelect` event
   */
  value?: string | number
  /**
   * Value of the `href` prop that will be put on the underlying DOM element.
   */
  href?: string
  /**
   * Where to display the linked URL, as the name for a browsing context (a tab, window, or <iframe>).
   */
  target?: string
  /**
   * Content to render in the label's info region
   */
  renderLabelInfo?: React.ReactNode | (() => React.ReactNode)
}

type PropKeys = keyof MenuItemOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type MenuItemProps = MenuItemOwnProps &
  WithStyleProps<MenuItemTheme, MenuItemStyle> &
  OtherHTMLAttributes<MenuItemOwnProps> &
  WithDeterministicIdProps

type MenuItemStyle = ComponentStyle<'menuItem' | 'icon' | 'labelInfo' | 'label'>

const propTypes: PropValidators<PropKeys> = {
  children: PropTypes.node.isRequired,
  defaultSelected: PropTypes.bool,
  selected: controllable(PropTypes.bool, 'onSelect', 'defaultSelected'),
  onSelect: PropTypes.func,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onMouseOver: PropTypes.func,
  controls: PropTypes.string,
  disabled: PropTypes.bool,
  as: PropTypes.elementType, // eslint-disable-line react/require-default-props
  type: PropTypes.oneOf(['button', 'checkbox', 'radio', 'flyout']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  href: PropTypes.string,
  target: PropTypes.string,
  renderLabelInfo: PropTypes.node
}

const allowedProps: AllowedPropKeys = [
  'children',
  'defaultSelected',
  'selected',
  'onSelect',
  'onClick',
  'onKeyDown',
  'onKeyUp',
  'onMouseOver',
  'controls',
  'disabled',
  'as',
  'type',
  'value',
  'href',
  'target',
  'renderLabelInfo'
]
type MenuItemState = {
  selected: boolean
}
export type { MenuItemProps, MenuItemStyle, MenuItemState, OnMenuItemSelect }
export { propTypes, allowedProps }
