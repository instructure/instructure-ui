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

import { controllable } from '@instructure/ui-prop-types'

import type {
  AsElementType,
  PropValidators,
  MenuItemTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

type MenuItemOwnProps = {
  children: React.ReactNode
  defaultSelected?: boolean
  selected?: any // TODO: controllable(PropTypes.bool, 'onSelect', 'defaultSelected')
  onSelect?: (...args: any[]) => any
  onClick?: (...args: any[]) => any
  onKeyDown?: (...args: any[]) => any
  onKeyUp?: (...args: any[]) => any
  onMouseOver?: (...args: any[]) => any
  controls?: string
  disabled?: boolean
  as?: AsElementType
  type?: 'button' | 'checkbox' | 'radio' | 'flyout'
  value?: string | number
  href?: string
}

type PropKeys = keyof MenuItemOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type MenuItemProps = MenuItemOwnProps &
  WithStyleProps<MenuItemTheme, MenuItemStyle> &
  OtherHTMLAttributes<MenuItemOwnProps>

type MenuItemStyle = ComponentStyle<'menuItem' | 'icon' | 'label'>

const propTypes: PropValidators<PropKeys> = {
  /**
   * the menu item label
   */
  children: PropTypes.node.isRequired,
  /**
   * whether to set the menu item state to selected or not on initial render
   */
  defaultSelected: PropTypes.bool,
  /**
   * whether the menu item is selected or not (must be accompanied by an `onSelect` prop)
   */
  selected: controllable(PropTypes.bool, 'onSelect', 'defaultSelected'),
  /**
   * when used with the `selected` prop, the component will not control its own state
   */
  onSelect: PropTypes.func,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onMouseOver: PropTypes.func,
  /**
   * the id of the element that the menu item will act upon
   */
  controls: PropTypes.string,
  disabled: PropTypes.bool,
  /**
   * the element type to render as (will default to `<a>` if href is provided)
   */
  as: PropTypes.elementType, // eslint-disable-line react/require-default-props
  type: PropTypes.oneOf(['button', 'checkbox', 'radio', 'flyout']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  href: PropTypes.string
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
  'href'
]

export type { MenuItemProps, MenuItemStyle }
export { propTypes, allowedProps }
