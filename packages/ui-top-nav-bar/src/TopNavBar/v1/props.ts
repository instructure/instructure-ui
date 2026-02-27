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

import type { OtherHTMLAttributes } from '@instructure/shared-types'

import type { ActionItemsChild } from './TopNavBarActionItems/props'
import type { BrandChild } from './TopNavBarBrand/props'
import type { ItemChild } from './TopNavBarItem/props'
import type { LayoutChild } from './TopNavBarLayout/props'
import type { MenuItemsChild } from './TopNavBarMenuItems/props'
import type { UserChild } from './TopNavBarUser/props'
import type { TopNavBarContextType } from './TopNavBarContext'

type TopNavBarOwnProps = {
  /**
   * A required children function that returns a `<TopNavBar.Layout>` component.
   * The function has the 2 parameters: the current layout ('desktop' or 'smallViewport') and whether it is currently in "inverseColor" mode.
   */
  children: (props: {
    currentLayout: TopNavBarContextType['layout']
    inverseColor: TopNavBarContextType['inverseColor']
  }) => LayoutChild

  /**
   * The breakpoint between 'desktop' and 'smallViewport' mode.
   */
  breakpoint?: string | number

  /**
   * Specifies if the underlying `<Responsive />` component should use element or media queries
   */
  mediaQueryMatch?: 'element' | 'media'

  /**
   * Displays the TopNavBar in inverse color mode.
   * If a function is passed, the function has the current layout ('desktop' or 'smallViewport') as its parameter.
   */
  inverseColor?:
    | boolean
    | ((currentLayout: TopNavBarContextType['layout']) => boolean)

  /**
   * A function that returns a reference to root HTML element
   */
  elementRef?: (el: HTMLDivElement | null) => void
}

type PropKeys = keyof TopNavBarOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TopNavBarProps = TopNavBarOwnProps & OtherHTMLAttributes<TopNavBarOwnProps>
const allowedProps: AllowedPropKeys = [
  'children',
  'breakpoint',
  'mediaQueryMatch',
  'inverseColor',
  'elementRef'
]

export type {
  TopNavBarProps,
  TopNavBarOwnProps,
  // Child types:
  ActionItemsChild,
  BrandChild,
  LayoutChild,
  ItemChild,
  MenuItemsChild,
  UserChild
}
export { allowedProps }
