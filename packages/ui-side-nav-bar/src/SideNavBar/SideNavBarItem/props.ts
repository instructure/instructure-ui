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
import type {
  AsElementType,
  
  SideNavBarItemTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

type SideNavBarItemOwnProps = {
  /**
   * The reference to the underlying HTML element
   */
  elementRef?: (el: Element | null) => void
  /**
   * The visual to display (ex. an Image, Logo, Avatar, or Icon)
   */
  icon: React.ReactNode
  /**
   * The text to display  for the SideNavBar Link
   */
  label: React.ReactNode
  /**
   * The element type to render as (will default to `<a>` if href is provided)
   */
  as?: AsElementType
  /**
   * If the SideNavBarItem goes to a new page, pass an href
   */
  href?: string
  /**
   * If the SideNavBarItem does not go to a new page pass an onClick
   */
  onClick?: (event: React.MouseEvent) => void
  /**
   * Denotes which SideNavBarItem is currently selected
   */
  selected?: boolean
  /**
   * When minimized is set to true, the `<SideNavBar />` shows icons only while the text becomes a tooltip. When it is set to false, the `<SideNavBar />` shows text in addition to the icons
   */
  minimized?: boolean
}

type PropKeys = keyof SideNavBarItemOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type SideNavBarItemProps = SideNavBarItemOwnProps &
  WithStyleProps<SideNavBarItemTheme, SideNavBarItemStyle> &
  OtherHTMLAttributes<SideNavBarItemOwnProps>

type SideNavBarItemStyle = ComponentStyle<'navigationItem' | 'icon' | 'label'>
const allowedProps: AllowedPropKeys = [
  'elementRef',
  'icon',
  'label',
  'as',
  'href',
  'onClick',
  'selected',
  'minimized'
]

export type { SideNavBarItemProps, SideNavBarItemStyle }
export { allowedProps }
