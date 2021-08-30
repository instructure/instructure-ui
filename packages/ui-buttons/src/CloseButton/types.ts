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

import type { Spacing } from '@instructure/emotion'
import { AsElementType } from '@instructure/shared-types'

export type CloseButtonProps = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  screenReaderLabel: string | React.ReactNode
  color?: 'primary' | 'primary-inverse'
  interaction?: 'enabled' | 'disabled' | 'readonly'
  elementRef?: (...args: any[]) => any
  size?: 'small' | 'medium' | 'large'
  onClick?: (...args: any[]) => any
  margin?: Spacing
  placement?: 'start' | 'end' | 'static'
  offset?: 'none' | 'x-small' | 'small' | 'medium'
  type?: 'button' | 'submit' | 'reset'
  as?: AsElementType
  href?: string
  cursor?: string
  tabIndex?: number | string
}
