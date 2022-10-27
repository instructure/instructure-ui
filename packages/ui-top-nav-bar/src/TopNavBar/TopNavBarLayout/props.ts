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

import {
  Children as ChildrenPropTypes,
  element
} from '@instructure/ui-prop-types'

import type { WithStyleProps } from '@instructure/emotion'
import type {
  TopNavBarLayoutTheme,
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'

import { TopNavBarActionItems } from '../TopNavBarActionItems'
import { TopNavBarBrand } from '../TopNavBarBrand'
import { TopNavBarMenuItems } from '../TopNavBarMenuItems'
import { TopNavBarUser } from '../TopNavBarUser'

import type { ActionItemsChild } from '../TopNavBarActionItems/props'
import type { BrandChild } from '../TopNavBarBrand/props'
import type { MenuItemsChild } from '../TopNavBarMenuItems/props'
import type { UserChild } from '../TopNavBarUser/props'

import { topNavBarItemTooltipPropType } from '../TopNavBarItem/props'

import { TopNavBarLayout } from './index'
import type { DesktopLayoutOwnProps } from './DesktopLayout/props'
import type { SmallViewportLayoutOwnProps } from './SmallViewportLayout/props'

type LayoutChild = React.ComponentElement<TopNavBarLayoutProps, TopNavBarLayout>

type CommonTopNavBarLayoutProps = {
  /**
   * Displays the app/product/brand/company/etc. name and/or logo.
   *
   * Accepts a `<TopNavBar.Brand>` component.
   */
  renderBrand?: BrandChild

  /**
   * Displays the main navbar items.
   *
   * In __desktop__ mode the items are listed on the navbar,
   * in __smallViewport__ mode the items are accessible under the main "hamburger" menu.
   *
   * Accepts a `<TopNavBar.MenuItems>` component.
   */
  renderMenuItems?: MenuItemsChild

  /**
   * Displays the action items, icons, buttons, etc.
   *
   * Renders in the top right corner of the navbar in both __desktop__ and __smallViewport__ mode.
   *
   * Accepts a `<TopNavBar.ActionItems>` component.
   */
  renderActionItems?: ActionItemsChild

  /**
   * Displays the user menu.
   *
   * In __desktop__ mode it renders in the top right corner of the navbar,
   * in __smallViewport__ mode it is rendered under the main "hamburger" menu, above the menu items.
   *
   * Accepts a `<TopNavBar.User>` component.
   */
  renderUser?: UserChild

  /**
   * The 'aria-label' for the underlying `<nav>` element
   */
  navLabel?: string

  /**
   * A function that returns a reference to root HTML element
   */
  elementRef?: (el: HTMLElement | null) => void
}

type TopNavBarLayoutOwnProps = CommonTopNavBarLayoutProps & {
  /**
   * Config object for the "desktop" mode:
   */
  desktopConfig?: DesktopLayoutOwnProps

  /**
   * Config object for the "small viewport" mode:
   */
  smallViewportConfig: SmallViewportLayoutOwnProps
}

type CommonPropKeys = keyof CommonTopNavBarLayoutProps
type PropKeys = keyof TopNavBarLayoutOwnProps
type DesktopPropKeys = keyof DesktopLayoutOwnProps
type SmallViewportPropKeys = keyof SmallViewportLayoutOwnProps

type CommonAllowedPropKeys = Readonly<Array<CommonPropKeys>>
type DesktopAllowedPropKeys = Readonly<Array<DesktopPropKeys>>
type SmallViewportAllowedPropKeys = Readonly<Array<SmallViewportPropKeys>>
type AllowedPropKeys = Readonly<Array<PropKeys>>

type TopNavBarLayoutProps = TopNavBarLayoutOwnProps &
  WithStyleProps<TopNavBarLayoutTheme, null> &
  OtherHTMLAttributes<TopNavBarLayoutOwnProps>

const commonPropTypes: PropValidators<CommonPropKeys> = {
  renderBrand: ChildrenPropTypes.oneOf([TopNavBarBrand]),
  renderMenuItems: ChildrenPropTypes.oneOf([TopNavBarMenuItems]),
  renderActionItems: ChildrenPropTypes.oneOf([TopNavBarActionItems]),
  renderUser: ChildrenPropTypes.oneOf([TopNavBarUser]),
  navLabel: PropTypes.string,
  elementRef: PropTypes.func
}

const desktopPropTypes: PropValidators<DesktopPropKeys> = {
  hideActionsUserSeparator: PropTypes.bool
}

const smallViewportPropTypes: PropValidators<SmallViewportPropKeys> = {
  dropdownMenuToggleButtonLabel: PropTypes.string.isRequired,
  dropdownMenuToggleButtonTooltip: topNavBarItemTooltipPropType,
  dropdownMenuLabel: PropTypes.string,
  alternativeTitle: PropTypes.node,
  renderInPlaceDialogConfig: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    closeButtonLabel: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    returnFocusElement: PropTypes.func,
    shouldContainFocus: PropTypes.bool,
    shouldCloseOnDocumentClick: PropTypes.bool,
    shouldCloseOnEscape: PropTypes.bool
  }),
  trayMountNode: PropTypes.oneOfType([element, PropTypes.func]),
  onDropdownMenuToggle: PropTypes.func,
  onDropdownMenuSelect: PropTypes.func
}

const propTypes: PropValidators<PropKeys> = {
  ...commonPropTypes,
  desktopConfig: PropTypes.shape(desktopPropTypes),
  smallViewportConfig: PropTypes.shape(smallViewportPropTypes).isRequired
}

const commonAllowedProps: CommonAllowedPropKeys = [
  'renderBrand',
  'renderMenuItems',
  'renderActionItems',
  'renderUser',
  'navLabel',
  'elementRef'
]

const desktopAllowedProps: DesktopAllowedPropKeys = ['hideActionsUserSeparator']

const smallViewportAllowedProps: SmallViewportAllowedPropKeys = [
  'dropdownMenuToggleButtonLabel',
  'dropdownMenuToggleButtonTooltip',
  'dropdownMenuLabel',
  'alternativeTitle',
  'renderInPlaceDialogConfig',
  'trayMountNode',
  'onDropdownMenuToggle',
  'onDropdownMenuSelect'
]

const allowedProps: AllowedPropKeys = [
  ...commonAllowedProps,
  'desktopConfig',
  'smallViewportConfig'
]

export type { LayoutChild, CommonTopNavBarLayoutProps, TopNavBarLayoutProps }
export {
  propTypes,
  allowedProps,
  commonPropTypes,
  commonAllowedProps,
  desktopPropTypes,
  smallViewportPropTypes,
  desktopAllowedProps,
  smallViewportAllowedProps
}
