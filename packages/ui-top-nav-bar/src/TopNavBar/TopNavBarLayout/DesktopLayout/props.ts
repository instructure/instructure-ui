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
import type {
  TopNavBarLayoutDesktopTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type { TopNavBarContextType } from '../../TopNavBarContext'
import { commonAllowedProps, desktopAllowedProps } from '../props'
import type { CommonTopNavBarLayoutProps } from '../props'

import { TopNavBarDesktopLayout } from './index'

type DesktopLayoutChild = React.ComponentElement<
  TopNavBarDesktopLayoutProps,
  TopNavBarDesktopLayout
>

type DesktopLayoutOwnProps = {
  /**
   * Hides the separator between the action items and the user block.
   */
  hideActionsUserSeparator?: boolean
}

type TopNavBarDesktopLayoutOwnProps = CommonTopNavBarLayoutProps &
  DesktopLayoutOwnProps

type PropKeys = keyof TopNavBarDesktopLayoutOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TopNavBarDesktopLayoutProps = TopNavBarDesktopLayoutOwnProps &
  WithStyleProps<TopNavBarLayoutDesktopTheme, TopNavBarDesktopLayoutStyle> &
  OtherHTMLAttributes<TopNavBarDesktopLayoutOwnProps>

type TopNavBarDesktopLayoutStyle = ComponentStyle<
  | 'topNavBarDesktopLayout'
  | 'brandContainer'
  | 'menuItemsContainer'
  | 'actionItemsContainer'
  | 'spacer'
  | 'userContainer'
  | 'breadcrumbContainer'
>

type TopNavBarDesktopLayoutStyleProps = {
  inverseColor: TopNavBarContextType['inverseColor']
  hasBrandBlock: boolean
  hasActionItemsBlock: boolean
  hasUserBlock: boolean
}
const allowedProps: AllowedPropKeys = [
  // Edit allowed props in TopNabBarLayout/props.ts
  ...commonAllowedProps,
  ...desktopAllowedProps
]

export type {
  DesktopLayoutChild,
  DesktopLayoutOwnProps,
  TopNavBarDesktopLayoutProps,
  TopNavBarDesktopLayoutOwnProps,
  TopNavBarDesktopLayoutStyle,
  TopNavBarDesktopLayoutStyleProps
}
export { allowedProps }
