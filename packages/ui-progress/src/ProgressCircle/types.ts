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

export type ProgressCircleMeterColor =
  | 'info'
  | 'warning'
  | 'danger'
  | 'alert'
  | 'success'
  | 'brand'

export type ProgressCircleProps = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  screenReaderLabel: string
  size?: 'x-small' | 'small' | 'medium' | 'large'
  valueMax?: number
  valueNow?: number
  formatScreenReaderValue?: ((...args: any[]) => any) | React.ReactNode
  renderValue?: ((...args: any[]) => any) | React.ReactNode
  color?: 'primary' | 'primary-inverse'
  meterColor?:
    | ((...args: any[]) => ProgressCircleMeterColor)
    | ProgressCircleMeterColor
  margin?: Spacing
  elementRef?: (...args: any[]) => any
  as?: AsElementType
  shouldAnimateOnMount?: boolean
  animationDelay?: number
}

export type ProgressCircleState = {
  shouldAnimateOnMount: boolean
}
