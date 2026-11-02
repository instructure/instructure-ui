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

import type { MouseEvent } from 'react'

import type { ComponentStyle } from '@instructure/emotion'

import type { GlobalNavMainNavItem } from '../props.js'

type MainNavItemProps = {
  /**
   * The data of the item.
   */
  item: GlobalNavMainNavItem
  /**
   * Whether the rail is collapsed.
   */
  collapsed: boolean
  /**
   * Whether the SubNav of the item is open.
   */
  open: boolean
  /**
   * The id of the open SubNav panel, set only while the SubNav of this item is open.
   */
  subNavId?: string
  /**
   * Called when the user activates the item, after `item.onClick`.
   */
  onActivate: (
    event: MouseEvent<HTMLElement>,
    item: GlobalNavMainNavItem
  ) => void
  /**
   * Called with the link or button element of the item.
   */
  elementRef: (element: HTMLElement | null) => void
}

type MainNavItemStyle = ComponentStyle<
  'item' | 'icon' | 'label' | 'chevron' | 'tooltipTrigger'
>

export type { MainNavItemProps, MainNavItemStyle }
