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

import { AsElementType } from '@instructure/shared-types'
import type { Spacing } from '@instructure/emotion'
import type { PlacementPropValues } from '@instructure/ui-position'

export type BadgeProps = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  count?: number
  /**
   * The number at which the count gets truncated by
   * formatOverflowText. For example, a countUntil of 100
   * would stop the count at 99.
   */
  countUntil?: number
  /**
   * Render Badge as a counter (`count`) or as a smaller dot (`notification`) with
   * no count number displayed.
   */
  type?: 'count' | 'notification'
  /**
   * Render Badge as an inline html element that is not positioned relative
   * to a child.
   */
  standalone?: boolean
  /**
   * Make the Badge slowly pulse twice to get the user's attention.
   */
  pulse?: boolean
  variant?: 'primary' | 'success' | 'danger'
  /**
   * provides a reference to the underlying html root element
   */
  elementRef?: (element: HTMLElement | null) => void
  formatOverflowText?: (count: number, countUntil: number) => string
  formatOutput?: (formattedCount: string) => string
  as?: AsElementType
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin: Spacing
  /**
   * Supported values are `top start`, `top end`, `end center`, `bottom end`,
   * `bottom start`, and `start center`
   */
  placement: PlacementPropValues
}
