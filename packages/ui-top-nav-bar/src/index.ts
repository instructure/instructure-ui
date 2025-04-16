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

export { TopNavBar } from './TopNavBar'
export { TopNavBarActionItems } from './TopNavBar/TopNavBarActionItems'
export { TopNavBarBrand } from './TopNavBar/TopNavBarBrand'
export { TopNavBarBreadcrumb } from './TopNavBar/TopNavBarBreadcrumb'
export { TopNavBarItem } from './TopNavBar/TopNavBarItem'
export { TopNavBarLayout } from './TopNavBar/TopNavBarLayout'
export { TopNavBarMenuItems } from './TopNavBar/TopNavBarMenuItems'
export { TopNavBarUser } from './TopNavBar/TopNavBarUser'

export type { TopNavBarProps, TopNavBarOwnProps } from './TopNavBar/props'
export type {
  TopNavBarActionItemsProps,
  TopNavBarActionItemsOwnProps
} from './TopNavBar/TopNavBarActionItems/props'
export type {
  TopNavBarBrandProps,
  TopNavBarBrandOwnProps
} from './TopNavBar/TopNavBarBrand/props'
export type {
  TopNavBarItemProps,
  TopNavBarItemOwnProps,
  TopNavBarItemTooltipType
} from './TopNavBar/TopNavBarItem/props'
export type {
  TopNavBarLayoutProps,
  CommonTopNavBarLayoutProps
} from './TopNavBar/TopNavBarLayout/props'
export type {
  TopNavBarDesktopLayoutProps,
  TopNavBarDesktopLayoutOwnProps,
  DesktopLayoutOwnProps
} from './TopNavBar/TopNavBarLayout/DesktopLayout/props'
export type {
  TopNavBarSmallViewportLayoutProps,
  TopNavBarSmallViewportLayoutOwnProps,
  SmallViewportLayoutOwnProps
} from './TopNavBar/TopNavBarLayout/SmallViewportLayout/props'
export type {
  TopNavBarMenuItemsProps,
  TopNavBarMenuItemsOwnProps
} from './TopNavBar/TopNavBarMenuItems/props'
export type {
  TopNavBarUserProps,
  TopNavBarUserOwnProps
} from './TopNavBar/TopNavBarUser/props'

export { MobileTopNav } from './MobileTopNav'
export { DesktopTopNav } from './DesktopTopNav'
export { CanvasTopNav } from './CanvasTopNav'
export { SubNav } from './SubNav'
