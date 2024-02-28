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

import {
  controllable,
  Children as ChildrenPropTypes
} from '@instructure/ui-prop-types'

import { MenuItem } from '../MenuItem'
import { MenuItemSeparator } from '../MenuItemSeparator'

import type {
  PropValidators,
  MenuGroupTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type { MenuItemProps } from '../MenuItem/props'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'
import type { ViewOwnProps } from '@instructure/ui-view'

type MenuGroupOwnProps = {
  label: React.ReactNode
  allowMultiple?: boolean
  /**
   * children of type `Menu.Item`, `Menu.Separator`
   */
  children?: React.ReactNode // TODO: oneOf([MenuItem, MenuItemSeparator])
  /**
   * an array of the values (or indices by default) for the selected items
   */
  selected?: (string | number)[] // TODO: controllable(PropTypes.array, 'onSelect', 'defaultSelected')
  /**
   * an array of the values (or indices by default) for the selected items on initial render
   */
  defaultSelected?: (string | number)[]
  /**
   * call this function when a menu item is selected
   */
  onSelect?: (
    e: React.MouseEvent<ViewOwnProps>,
    updated: MenuItemProps['value'][],
    selected: MenuItemProps['selected'],
    item: MenuItem
  ) => void
  onMouseOver?: (e: React.MouseEvent, args: MenuItem) => void
  /**
   * the id of the element that the menu items will act upon
   */
  controls?: string
  /**
   * returns a reference to the `MenuItem`
   */
  itemRef?: (element: MenuItem | null) => void
  disabled?: boolean
  /**
   * should the group appear in the tab order (the first item will have a tabIndex of 0)
   */
  isTabbable?: boolean
}

type PropKeys = keyof MenuGroupOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type MenuGroupProps = MenuGroupOwnProps &
  WithStyleProps<MenuGroupTheme, MenuGroupStyle> &
  OtherHTMLAttributes<MenuGroupOwnProps> &
  WithDeterministicIdProps

type MenuGroupStyle = ComponentStyle<'menuItemGroup' | 'label' | 'items'>

const propTypes: PropValidators<PropKeys> = {
  label: PropTypes.node.isRequired,
  allowMultiple: PropTypes.bool,
  children: ChildrenPropTypes.oneOf([MenuItem, MenuItemSeparator]),
  selected: controllable(PropTypes.array, 'onSelect', 'defaultSelected'),
  defaultSelected: PropTypes.array,
  onSelect: PropTypes.func,
  onMouseOver: PropTypes.func,
  controls: PropTypes.string,
  itemRef: PropTypes.func,
  disabled: PropTypes.bool,
  isTabbable: PropTypes.bool
}

const allowedProps: AllowedPropKeys = [
  'label',
  'allowMultiple',
  'children',
  'selected',
  'defaultSelected',
  'onSelect',
  'onMouseOver',
  'controls',
  'itemRef',
  'disabled',
  'isTabbable'
]

type MenuGroupState = {
  selected: (string | number)[]
}
export type { MenuGroupProps, MenuGroupStyle, MenuGroupState }
export { propTypes, allowedProps }
