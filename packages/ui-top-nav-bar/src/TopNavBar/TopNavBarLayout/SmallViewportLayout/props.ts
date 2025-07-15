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
  TopNavBarLayoutSmallViewportTheme,
  OtherHTMLAttributes,
} from '@instructure/shared-types'

import type { DrilldownProps } from '@instructure/ui-drilldown'
import type { TopNavBarItemTooltipType } from '../../TopNavBarItem/props'
import type { TopNavBarContextType } from '../../TopNavBarContext'

import {
  commonAllowedProps,
  smallViewportAllowedProps
} from '../props'
import type { CommonTopNavBarLayoutProps } from '../props'

import { TopNavBarSmallViewportLayout } from './index'

type SmallViewportLayoutChild = React.ComponentElement<
  TopNavBarSmallViewportLayoutProps,
  TopNavBarSmallViewportLayout
>

type SmallViewportLayoutOwnProps = {
  /**
   * A __required__ label for the hamburger menu icon, used as an accessible screen reader label.
   */
  dropdownMenuToggleButtonLabel: string

  /**
   * An optional tooltip for the hamburger menu icon.
   */
  dropdownMenuToggleButtonTooltip?: TopNavBarItemTooltipType

  /**
   * An 'aria-label' for the dropdown menu.
   */
  dropdownMenuLabel?: string

  /**
   * Instead of the Brand logo and link, display other data (e.g.: page title).
   *
   * In this case, the hamburger menu icon will be replaced with a chevron.
   */
  alternativeTitle?: React.ReactNode

  /**
   * Renders a custom `<Dialog>` that renders in place of the navbar.
   * Useful for features like full width search bars, etc.
   *
   * Use `returnFocusElement` prop for returning focus after close.
   */
  renderInPlaceDialogConfig?: {
    open: boolean
    onClose: () => void
    closeButtonLabel: string
    content?:
      | React.ReactNode
      | ((args: { closeInPlaceDialog: () => void }) => React.ReactNode)
    /**
     * Function that returns an element the focus needs to return to on close
     */
    returnFocusElement?: () => HTMLElement | null
    shouldContainFocus?: boolean
    shouldCloseOnDocumentClick?: boolean
    shouldCloseOnEscape?: boolean
  }

  /**
   * An element or a function returning an element to use as the mount node for the dropdown menu's `<Tray>` container.
   *
   * Use this prop when the default Tray placement doesn't work for your layout (e.g.: when the TopNavBar is not the main navbar of the window).
   */
  trayMountNode?: Element | (() => Element | null) | null

  /**
   * Callback fired on dropdown menu open and close
   */
  onDropdownMenuToggle?: (isMenuOpen: boolean) => void

  /**
   * Callback fired when an item is selected in the dropdown menu
   */
  onDropdownMenuSelect?: DrilldownProps['onSelect']

  /**
   * A way to add generic html/react content to the start (left side) of the nav bar. This is a temporary workaround if you are using a design that is not possible to achive in the TopNavBar normally.
   */
  renderNavbarStartDangerousHack?: React.ReactNode
}

type TopNavBarSmallViewportLayoutOwnProps = CommonTopNavBarLayoutProps &
  SmallViewportLayoutOwnProps

type PropKeys = keyof TopNavBarSmallViewportLayoutOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TopNavBarSmallViewportLayoutProps = TopNavBarSmallViewportLayoutOwnProps &
  WithStyleProps<
    TopNavBarLayoutSmallViewportTheme,
    TopNavBarSmallViewportLayoutStyle
  > &
  OtherHTMLAttributes<TopNavBarSmallViewportLayoutOwnProps> &
  WithDeterministicIdProps

type TopNavBarSmallViewportLayoutStyle = ComponentStyle<
  | 'topNavBarSmallViewportLayout'
  | 'navbar'
  | 'inPlaceDialogContainer'
  | 'inPlaceDialogContainerContent'
  | 'inPlaceDialogContainerButton'
  | 'menuTriggerContainer'
  | 'menuTrigger'
  | 'dropdownMenuOption'
  | 'dropdownMenuOptionActive'
  | 'dropdownMenuOptionWithAvatar'
  | 'brandContainer'
  | 'alternativeTitleContainer'
  | 'trayContainer'
  | 'globalStyles'
> & {
  navbarHeight: string | number
}

type TopNavBarSmallViewportLayoutState = {
  isDropdownMenuOpen: boolean
  isDropdownMenuVisible: boolean
  menuBottomPosition: number
}

type TopNavBarSmallViewportLayoutStyleProps = {
  isDropdownMenuVisible: boolean
  drilldownId: string
  trayId: string
  menuBottomPosition: number
  inverseColor: TopNavBarContextType['inverseColor']
}
const allowedProps: AllowedPropKeys = [
  // Edit allowed props in TopNavBarLayout/props.ts
  ...commonAllowedProps,
  ...smallViewportAllowedProps
]

export type {
  SmallViewportLayoutChild,
  SmallViewportLayoutOwnProps,
  TopNavBarSmallViewportLayoutProps,
  TopNavBarSmallViewportLayoutOwnProps,
  TopNavBarSmallViewportLayoutStyle,
  TopNavBarSmallViewportLayoutState,
  TopNavBarSmallViewportLayoutStyleProps
}
export { allowedProps }
