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

import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type {
  OtherHTMLAttributes,
  SpinnerTheme
} from '@instructure/shared-types'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'
import { Renderable } from '@instructure/shared-types'

type SpinnerOwnProps = {
  /**
   * delay spinner rendering for a time (in ms). Used to prevent flickering in case of very fast load times
   */
  delay?: number
  /**
   * provides a reference to the underlying html root element
   */
  elementRef?: (element: Element | null) => void
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: Spacing
  /**
   * Give the spinner a title to be read by screenreaders
   */
  renderTitle?: Renderable
  /**
   * Different-sized spinners
   */
  size?: 'x-small' | 'small' | 'medium' | 'large'
  /**
   * Different color schemes for use with light or dark backgrounds
   */
  variant?: 'default' | 'inverse'
}

type PropKeys = keyof SpinnerOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type SpinnerProps = SpinnerOwnProps &
  WithStyleProps<SpinnerTheme, SpinnerStyle> &
  OtherHTMLAttributes<SpinnerOwnProps> &
  WithDeterministicIdProps

type SpinnerState = {
  shouldRender: boolean
}

type SpinnerStyle = ComponentStyle<
  'spinner' | 'circle' | 'circleTrack' | 'circleSpin' | 'radius'
>

const allowedProps: AllowedPropKeys = [
  'delay',
  'renderTitle',
  'size',
  'variant',
  'margin',
  'elementRef'
]

export type { SpinnerProps, SpinnerState, SpinnerStyle }
export { allowedProps }
