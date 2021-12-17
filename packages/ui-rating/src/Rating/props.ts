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
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'

type RatingOwnProps = {
  /**
   * A label is required for accessibility
   */
  label: string
  /**
   * A function that returns the current value formatted for screen readers
   */
  formatValueText?: (...args: any[]) => any
  /**
   * Choose from a 0-3 or 0-5 rating system
   */
  iconCount?: 3 | 5
  /**
   * Choose from different rating icon sizes
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * The maximum rating (defaults to iconCount)
   */
  valueMax?: number
  /**
   * The current rating
   */
  valueNow?: number
  /**
   * Set to make the icons animate when they become filled
   */
  animateFill?: boolean
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: Spacing
}

type PropKeys = keyof RatingOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type RatingProps = RatingOwnProps &
  WithStyleProps<null, RatingStyle> &
  OtherHTMLAttributes<RatingOwnProps>

type RatingStyle = ComponentStyle<'rating'>

const propTypes: PropValidators<PropKeys> = {
  label: PropTypes.string.isRequired,
  formatValueText: PropTypes.func,
  iconCount: PropTypes.oneOf([3, 5]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  valueMax: PropTypes.number,
  valueNow: PropTypes.number,
  animateFill: PropTypes.bool,
  margin: ThemeablePropTypes.spacing
}

const allowedProps: AllowedPropKeys = [
  'label',
  'formatValueText',
  'iconCount',
  'size',
  'valueMax',
  'valueNow',
  'animateFill',
  'margin'
]

export type { RatingProps, RatingStyle }
export { propTypes, allowedProps }
