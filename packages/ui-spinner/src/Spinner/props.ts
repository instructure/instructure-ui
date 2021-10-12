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
import PropTypes from 'prop-types'

import { ThemeablePropTypes } from '@instructure/emotion'

import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type {
  AsElementType,
  OtherHTMLAttributes,
  PropValidators,
  SpinnerTheme
} from '@instructure/shared-types'

type SpinnerOwnProps = {
  renderTitle?: ((...args: any[]) => any) | React.ReactNode
  size?: 'x-small' | 'small' | 'medium' | 'large'
  variant?: 'default' | 'inverse'
  margin?: Spacing
  elementRef?: (element: Element | null) => void
  as?: AsElementType
}

type PropKeys = keyof SpinnerOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type SpinnerProps = SpinnerOwnProps &
  WithStyleProps<SpinnerTheme, SpinnerStyle> &
  OtherHTMLAttributes<SpinnerOwnProps>

type SpinnerStyle = ComponentStyle<
  'spinner' | 'circle' | 'circleTrack' | 'circleSpin'
>

const propTypes: PropValidators<PropKeys> = {
  /**
   * Give the spinner a title to be read by screenreaders
   */
  renderTitle: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  /**
   * Different-sized spinners
   */
  size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
  /**
   * Different color schemes for use with light or dark backgrounds
   */
  variant: PropTypes.oneOf(['default', 'inverse']),
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin: ThemeablePropTypes.spacing,
  elementRef: PropTypes.func,
  as: PropTypes.elementType
}

const allowedProps: AllowedPropKeys = [
  'renderTitle',
  'size',
  'variant',
  'margin',
  'elementRef',
  'as'
]

export type { SpinnerProps, SpinnerStyle }
export { propTypes, allowedProps }
