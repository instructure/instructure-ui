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

import { PositionPropTypes } from '@instructure/ui-position'
import {
  controllable,
  Children as ChildrenPropTypes
} from '@instructure/ui-prop-types'

import type { PropValidators, MenuTheme } from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type {
  PlacementPropValues,
  PositionConstraint,
  PositionMountNode
} from '@instructure/ui-position'

type MenuOwnProps = {
  children?: React.ReactNode // TODO: oneOf(['MenuItem', 'MenuItemGroup', 'MenuItemSeparator', 'Menu'])
  label?: string
  disabled?: boolean
  trigger?: React.ReactNode
  placement?: PlacementPropValues
  defaultShow?: boolean
  show?: any // TODO: controllable(PropTypes.bool, 'onToggle', 'defaultShow')
  onToggle?: (...args: any[]) => any
  onSelect?: (...args: any[]) => any
  onDismiss?: (...args: any[]) => any
  onBlur?: (...args: any[]) => any
  onFocus?: (...args: any[]) => any
  onMouseOver?: (...args: any[]) => any
  onKeyDown?: (...args: any[]) => any
  onKeyUp?: (...args: any[]) => any
  menuRef?: (...args: any[]) => any
  popoverRef?: (...args: any[]) => any
  mountNode?: PositionMountNode
  constrain?: PositionConstraint
  liveRegion?:
    | React.ReactElement[]
    | React.ReactElement
    | ((...args: any[]) => any)
  shouldHideOnSelect?: boolean
  shouldFocusTriggerOnClose?: boolean
  type?: 'flyout'
  id?: string
  withArrow?: boolean
  offsetX?: string | number
  offsetY?: string | number
}

type PropKeys = keyof MenuOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type MenuProps = MenuOwnProps & WithStyleProps<MenuTheme, MenuStyle>

type MenuStyle = ComponentStyle<'menu'>

const propTypes: PropValidators<PropKeys> = {
  /**
   * Children of type `Menu.Item`, `Menu.Group`, `Menu.Separator`, or `Menu`
   */
  children: ChildrenPropTypes.oneOf([
    'MenuItem',
    'MenuItemGroup',
    'MenuItemSeparator',
    'Menu'
  ]),
  /**
   * Description of the `<Menu />`
   */
  label: PropTypes.string,
  /**
   * Is the `<Menu />` disabled
   */
  disabled: PropTypes.bool,
  /**
   * The trigger element, if the `<Menu />` is to render as a popover
   */
  trigger: PropTypes.node,
  /**
   * If a trigger is supplied, where should the `<Menu />` be placed (relative to the trigger)
   */
  placement: PositionPropTypes.placement,
  /**
   * Should the `<Menu />` be open for the initial render
   */
  defaultShow: PropTypes.bool,
  /**
   * Is the `<Menu />` open (should be accompanied by `onToggle`)
   */
  show: controllable(PropTypes.bool, 'onToggle', 'defaultShow'),
  /**
   * Callback fired when the `<Menu />` is toggled open/closed. When used with `show`,
   * the component will not control its own state.
   */
  onToggle: PropTypes.func,
  /**
   * Callback fired when an item within the `<Menu />` is selected
   */
  onSelect: PropTypes.func,
  /**
   * If a trigger is supplied, callback fired when the `<Menu />` is closed
   */
  onDismiss: PropTypes.func,
  /**
   * If a trigger is supplied, callback fired when the `<Menu />` trigger is blurred
   */
  onBlur: PropTypes.func,
  /**
   * If a trigger is supplied, callback fired when the `<Menu />` trigger is focused
   */
  onFocus: PropTypes.func,
  /**
   * If a trigger is supplied, callback fired onMouseOver for the `<Menu />` trigger
   */
  onMouseOver: PropTypes.func,
  /**
   * Callback fired on the onKeyDown of the `<Menu />`
   */
  onKeyDown: PropTypes.func,
  /**
   * Callback fired on the onKeyUp of the `<Menu />`
   */
  onKeyUp: PropTypes.func,
  /**
   * A function that returns a reference to the `<Menu />`
   */
  menuRef: PropTypes.func,
  /**
   * A function that returns a reference to the `<Popover />`
   */
  popoverRef: PropTypes.func,
  /**
   * If a trigger is supplied, an element or a function returning an element to use as the mount node
   * for the `<Menu />` (defaults to `document.body`)
   */
  mountNode: PositionPropTypes.mountNode,
  /**
   * The parent in which to constrain the menu.
   * One of: 'window', 'scroll-parent', 'parent', 'none', an element,
   * or a function returning an element
   */
  constrain: PositionPropTypes.constrain,
  /**
   * If a trigger is supplied, an element, function returning an element, or array of elements that will not
   * be hidden from the screen reader when the `<Menu />` is open
   */
  liveRegion: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.func
  ]),
  /**
   * If a trigger is supplied, should the `<Menu />` hide when an item is selected
   */
  shouldHideOnSelect: PropTypes.bool,
  /**
   * If a trigger is supplied, should the `<Menu />` focus the trigger on after closing
   */
  shouldFocusTriggerOnClose: PropTypes.bool,
  /**
   * The type of `<Menu />`
   */
  type: PropTypes.oneOf(['flyout']),
  id: PropTypes.string,
  /**
   * Whether or not an arrow pointing to the trigger should be rendered
   */
  withArrow: PropTypes.bool,
  /**
   * The horizontal offset for the positioned content.
   * Works only if `trigger` is provided.
   */
  offsetX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * The vertical offset for the positioned content.
   * Works only if `trigger` is provided.
   */
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
  'onBlur',
  'onFocus',
  'onMouseOver',
  'onKeyDown',
  'onKeyUp',
  'menuRef',
  'popoverRef',
  'mountNode',
  'constrain',
  'liveRegion',
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
