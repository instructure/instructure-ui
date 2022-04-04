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

import { PositionPropTypes } from '@instructure/ui-position'
import {
  controllable,
  Children as ChildrenPropTypes
} from '@instructure/ui-prop-types'

import type {
  PropValidators,
  MenuTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type {
  PlacementPropValues,
  PositionConstraint,
  PositionMountNode
} from '@instructure/ui-position'
import type { Popover } from '@instructure/ui-popover'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'

import { MenuItem } from './MenuItem'
import type { Menu } from './index'
import type { MenuItemProps } from './MenuItem/props'

type MenuOwnProps = {
  /**
   * Children of type `Menu.Item`, `Menu.Group`, `Menu.Separator`, or `Menu`
   */
  children?: React.ReactNode // TODO: oneOf(['MenuItem', 'MenuItemGroup', 'MenuItemSeparator', 'Menu'])
  /**
   * Description of the `<Menu />`. The component uses it to add its value to
   * the `aria-label` attribute.
   */
  label?: string
  /**
   * Is the `<Menu />` disabled
   */
  disabled?: boolean
  /**
   * The trigger element, if the `<Menu />` is to render as a popover
   */
  trigger?: React.ReactNode
  /**
   * If a trigger is supplied, where should the `<Menu />` be placed (relative to the trigger)
   */
  placement?: PlacementPropValues
  /**
   * Should the `<Menu />` be open for the initial render
   */
  defaultShow?: boolean
  /**
   * Is the `<Menu />` open (should be accompanied by `onToggle`)
   */
  show?: boolean // TODO: controllable(PropTypes.bool, 'onToggle', 'defaultShow')
  /**
   * Callback fired when the `<Menu />` is toggled open/closed. When used with `show`,
   * the component will not control its own state.
   */
  onToggle?: (show: boolean, menu: Menu) => void
  /**
   * Callback fired when an item within the `<Menu />` is selected
   */
  onSelect?: (
    e: React.MouseEvent,
    value: MenuItemProps['value'] | MenuItemProps['value'][],
    selected: MenuItemProps['selected'],
    args: MenuItem
  ) => void
  /**
   * If a trigger is supplied, callback fired when the `<Menu />` is closed
   */
  onDismiss?: (
    event: React.UIEvent | React.FocusEvent,
    documentClick: boolean
  ) => void
  /**
   * If a trigger is supplied, callback fired when the `<Menu />` trigger is focused
   */
  onFocus?: (event: React.FocusEvent) => void
  /**
   * If a trigger is supplied, callback fired onMouseOver for the `<Menu />` trigger
   */
  onMouseOver?: (event: React.MouseEvent) => void
  /**
   * Callback fired on the onKeyDown of the `<Menu />`
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLUListElement>) => void
  /**
   * Callback fired on the onKeyUp of the `<Menu />`
   */
  onKeyUp?: (event: React.KeyboardEvent<HTMLUListElement>) => void
  /**
   * A function that returns a reference to the `<Menu />`
   */
  menuRef?: (el: HTMLUListElement | null) => void
  /**
   * A function that returns a reference to the `<Popover />`
   */
  popoverRef?: (el: Popover | null) => void
  /**
   * If a trigger is supplied, an element or a function returning an element to use as the mount node
   * for the `<Menu />` (defaults to `document.body`)
   */
  mountNode?: PositionMountNode
  /**
   * The parent in which to constrain the menu.
   * One of: 'window', 'scroll-parent', 'parent', 'none', an element,
   * or a function returning an element
   */
  constrain?: PositionConstraint
  /**
   * If a trigger is supplied, should the `<Menu />` hide when an item is selected
   */
  shouldHideOnSelect?: boolean
  /**
   * If a trigger is supplied, should the `<Menu />` focus the trigger on after closing
   */
  shouldFocusTriggerOnClose?: boolean
  /**
   * The type of `<Menu />`
   */
  type?: 'flyout'
  id?: string
  /**
   * Whether or not an arrow pointing to the trigger should be rendered
   */
  withArrow?: boolean
  /**
   * The horizontal offset for the positioned content.
   * Works only if `trigger` is provided.
   */
  offsetX?: string | number
  /**
   * The vertical offset for the positioned content.
   * Works only if `trigger` is provided.
   */
  offsetY?: string | number
}

type PropKeys = keyof MenuOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type MenuProps = MenuOwnProps &
  WithStyleProps<MenuTheme, MenuStyle> &
  // controls can be passed in renderChildren and used later as aria-controls
  Omit<OtherHTMLAttributes<MenuOwnProps>, 'controls'> & {
    controls?: React.AriaAttributes['aria-controls']
  } & WithDeterministicIdProps

type MenuStyle = ComponentStyle<'menu'>

const propTypes: PropValidators<PropKeys> = {
  children: ChildrenPropTypes.oneOf([
    'MenuItem',
    'MenuItemGroup',
    'MenuItemSeparator',
    'Menu'
  ]),
  label: PropTypes.string,
  disabled: PropTypes.bool,
  trigger: PropTypes.node,
  placement: PositionPropTypes.placement,
  defaultShow: PropTypes.bool,
  show: controllable(PropTypes.bool, 'onToggle', 'defaultShow'),
  onToggle: PropTypes.func,
  onSelect: PropTypes.func,
  onDismiss: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseOver: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  menuRef: PropTypes.func,
  popoverRef: PropTypes.func,
  mountNode: PositionPropTypes.mountNode,
  constrain: PositionPropTypes.constrain,
  shouldHideOnSelect: PropTypes.bool,
  shouldFocusTriggerOnClose: PropTypes.bool,
  type: PropTypes.oneOf(['flyout']),
  id: PropTypes.string,
  withArrow: PropTypes.bool,
  offsetX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  offsetY: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

const allowedProps: AllowedPropKeys = [
  'children',
  'label',
  'disabled',
  'trigger',
  'placement',
  'defaultShow',
  'show',
  'onToggle',
  'onSelect',
  'onDismiss',
  'onFocus',
  'onMouseOver',
  'onKeyDown',
  'onKeyUp',
  'menuRef',
  'popoverRef',
  'mountNode',
  'constrain',
  'shouldHideOnSelect',
  'shouldFocusTriggerOnClose',
  'type',
  'id',
  'withArrow',
  'offsetX',
  'offsetY'
]

export type { MenuProps, MenuStyle }
export { propTypes, allowedProps }
