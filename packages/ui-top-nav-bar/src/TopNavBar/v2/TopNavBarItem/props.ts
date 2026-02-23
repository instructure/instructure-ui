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

import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'
import type {
  TopNavBarItemTheme,
  OtherHTMLAttributes,
  Renderable,
  AsElementType
} from '@instructure/shared-types'

import { Drilldown } from '@instructure/ui-drilldown'
import type { DrilldownProps } from '@instructure/ui-drilldown'
import type { PopoverProps } from '@instructure/ui-popover'
import type { TooltipProps } from '@instructure/ui-tooltip'
import type { BaseButtonOwnProps } from '@instructure/ui-buttons/latest'
import type { ViewOwnProps, ViewProps } from '@instructure/ui-view'

import { TopNavBarContextType } from '../TopNavBarContext'
import { TopNavBarItem } from './index'

type ItemChild = React.ComponentElement<TopNavBarItemProps, TopNavBarItem>
type DrilldownSubmenu = React.ComponentElement<DrilldownProps, Drilldown>
type ShouldCloseOnClick = 'auto' | 'always' | 'never'

type TopNavBarItemTooltipType =
  | string
  | {
      renderTip: TooltipProps['renderTip']
      color?: TooltipProps['color']
      placement?: TooltipProps['placement']
      offsetX?: TooltipProps['offsetX']
      offsetY?: TooltipProps['offsetY']
      onShowContent?: TooltipProps['onShowContent']
      onHideContent?: TooltipProps['onHideContent']
    }

type TopNavBarItemOwnProps = {
  /**
   * the element type to render as (will default to `<a>` if href is provided)
   */
  as?: AsElementType

  /**
   * Required id, used for internal tracking,
   * and it also appears as an id on the item element.
   */
  id: string

  /**
   * A required label of the navbar item.
   *
   * __Note__ that it is required even for the `variant="icon"` type items: the label will be used as an accessible label for screen readers.
   */
  children: React.ReactNode

  /**
   * The display variant of the item.
   *
   * The __"default"__ variant is displayed as a normal menu item.
   *
   * The __"button"__ variant is displayed as a button.
   *
   * The __"icon"__ variant is displayed as an icon without label.
   *
   * The __"avatar"__ variant is displayed as an avatar without label.
   *
   * The __"forceIconWithLabel"__ variant is displayed as default on desktop and the same way (with label) on mobile.
   */
  variant?: 'default' | 'button' | 'icon' | 'avatar' | 'forceIconWithLabel'

  /**
   * The status of the item.
   *
   * The __"active"__ status indicates current page or currently active menu item.
   * Only `variant="default"` items can be set to active.
   *
   * The __"disabled"__ status indicates that the items is disabled.
   */
  status?: 'default' | 'active' | 'disabled'

  /**
   * Renders the submenu for the item.
   * Accepts a [Drilldown](Drilldown) component.
   * The menu toggle logic is controlled by the menu item.
   *
   * If you need more customization, use the `customPopoverConfig` prop.
   */
  renderSubmenu?: DrilldownSubmenu

  /**
   * Displays the open/close chevron next to the item,
   * when it has a submenu or custom popover.
   */
  showSubmenuChevron?: boolean

  /**
   * Configures a custom Popover for the menu item.
   * Accepts [Popover](Popover) props (except "renderTrigger").
   *
   * Use this prop for features like search, tooltips, etc., and use
   * the `renderSubmenu` prop for the default submenu!
   *
   * In small viewport mode only items in `<TopNavBar.ActionItems>` can display custom popovers.
   */
  customPopoverConfig?: Omit<
    PopoverProps,
    'renderTrigger' | 'positionContainerDisplay'
  >

  /**
   * Configures a Tooltip for the menu item.
   *
   * Tooltips can be useful for `variant="icon"` or `variant="avatar"` type
   * menu items where there is no visible text.
   *
   * Accepts a string or a config object containing a subset of props from [Tooltip](Tooltip).
   */
  tooltip?: TopNavBarItemTooltipType

  /**
   * Config for displaying an avatar.
   *
   * Used only in `<TopNavBar.User>`, and it is a __required__ prop for the `variant="avatar"` type menu items.
   *
   * - __avatarSrc__: Avatar url
   * - __avatarName__: A __required__ name (user's name) for the avatar
   * - __avatarAlt__: Accessible label for the avatar
   */
  renderAvatar?: {
    avatarSrc?: string
    avatarName: string
    avatarAlt?: string
  }

  /**
   * Renders an icon before the label, or by itself.
   *
   * It is __required__ for the `variant="icon"` type menu items.
   * It is also __required__ for items in `<TopNavBar.ActionItems>`
   * in small viewport mode, because only the icons are displayed
   * due to the lack of space.
   */
  renderIcon?: Renderable

  /**
   * If the item goes to a new page, pass a href.
   * Items with submenus cannot have href prop.
   */
  href?: string

  /**
   * If the item does not go to a new page, pass an onClick.
   * Items with submenus cannot have onClick prop, use the `onSubmenuToggle` prop instead.
   */
  onClick?: (
    event: React.MouseEvent<ViewOwnProps> | React.KeyboardEvent<ViewOwnProps>
  ) => void

  /**
   * Only fires when the item is hidden because of truncation or mobile view. Intended to be used for navigation when the item would otherwise be a link.
   */
  onHiddenClick?: (
    event: React.MouseEvent<ViewOwnProps> | React.KeyboardEvent<ViewOwnProps>
  ) => void

  /**
   * __In desktop mode__, the callback fired when the item's submenu ([Drilldown](Drilldown)) is toggled open/closed.
   */
  onSubmenuToggle?: DrilldownProps['onToggle']

  /**
   * __In desktop mode__, the callback fired when mouse is over item.
   */
  onMouseOver?: (event: React.MouseEvent<BaseButtonOwnProps>) => void

  /**
   * __In desktop mode__, the callback fired when mouse leaves item.
   */
  onMouseOut?: (event: React.MouseEvent<BaseButtonOwnProps>) => void

  /**
   * __In desktop mode__, the callback fired when the item is focused.
   */
  onFocus?: (event: React.FocusEvent<BaseButtonOwnProps>) => void

  /**
   * __In desktop mode__, the callback fired when the item is blurred.
   */
  onBlur?: (event: React.FocusEvent<BaseButtonOwnProps>) => void

  /**
   * __In desktop mode__, the callback fired on keydown.
   */
  onKeyDown?: (event: React.KeyboardEvent<ViewProps>) => void

  /**
   * __In desktop mode__, the callback fired on keyup.
   */
  onKeyUp?: (event: React.KeyboardEvent<BaseButtonOwnProps>) => void

  /**
   * A function that returns a reference to root HTML element
   */
  elementRef?: (el: Element | null) => void

  /**
   * A function that returns a reference to the button/link HTML element
   */
  itemRef?: (el: HTMLButtonElement | HTMLLinkElement | null) => void

  /**
   * Should close the container menu component, if clicked on the option marked with this prop
   */
  shouldCloseOnClick?: ShouldCloseOnClick

  /**
   * Manually control if this component should display a focus outline.
   *
   * When left `undefined` (which is the default) the focus outline will display
   * if this component is focusable and receives focus or has an open popover.
   */
  withFocusOutline?: boolean
}

type PropKeys = keyof TopNavBarItemOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TopNavBarItemProps = TopNavBarItemOwnProps &
  WithStyleProps<TopNavBarItemTheme, TopNavBarItemStyle> &
  OtherHTMLAttributes<TopNavBarItemOwnProps> &
  WithDeterministicIdProps

type TopNavBarItemStyle = ComponentStyle<
  | 'topNavBarItem'
  | 'container'
  | 'content'
  | 'contentText'
  | 'avatarContainer'
  | 'submenuTriggerContainer'
  | 'submenuIcon'
> & {
  focusOutlineOffset: string | 0
  itemInlinePadding: string | 0
}

type TopNavBarItemState = {
  isSubmenuOpen: boolean
  isPopoverOpen: boolean
  isFocused: boolean
}

type TopNavBarItemStyleProps = {
  layout: TopNavBarContextType['layout']
  inverseColor: TopNavBarContextType['inverseColor']
}
const allowedProps: AllowedPropKeys = [
  'id',
  'as',
  'children',
  'variant',
  'status',
  'renderSubmenu',
  'showSubmenuChevron',
  'customPopoverConfig',
  'tooltip',
  'renderAvatar',
  'renderIcon',
  'href',
  'onClick',
  'onHiddenClick',
  'onSubmenuToggle',
  'onMouseOver',
  'onMouseOut',
  'onFocus',
  'onBlur',
  'onKeyDown',
  'onKeyUp',
  'elementRef',
  'itemRef',
  'shouldCloseOnClick',
  'withFocusOutline'
]

export type {
  ItemChild,
  TopNavBarItemProps,
  TopNavBarItemOwnProps,
  TopNavBarItemStyle,
  TopNavBarItemState,
  TopNavBarItemStyleProps,
  DrilldownSubmenu,
  TopNavBarItemTooltipType
}
export { allowedProps }
