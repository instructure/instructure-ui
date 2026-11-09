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

import type { GlobalNavAccount } from '../props.js'

type AccountItemProps = {
  /**
   * The data of the account.
   */
  account: GlobalNavAccount
  /**
   * Whether the rail is collapsed.
   */
  collapsed: boolean
  /**
   * Whether the account panel is open.
   */
  open: boolean
  /**
   * The id of the open account panel, set only while it is open.
   */
  panelId?: string
  /**
   * Called when the user clicks the item.
   */
  onActivate: (event: MouseEvent<HTMLElement>) => void
  /**
   * Called with the button element of the item.
   */
  elementRef: (element: HTMLElement | null) => void
}

type AccountItemStyle = ComponentStyle<
  | 'item'
  | 'avatar'
  | 'verification'
  | 'pill'
  | 'name'
  | 'end'
  | 'tooltipTrigger'
>

export type { AccountItemProps, AccountItemStyle }
