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

import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type {
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'

type ColorContrastOwnProps = {
  /**
   * Provides a reference to the component's underlying html element.
   */
  elementRef?: (element: Element | null) => void
  /**
   * Text of the failure indicator (Suggested english text: FAIL)
   */
  failureLabel: string
  /**
   * The first color to compare (HEX code)
   */
  firstColor: string
  /**
   * The name of the first color which will be compared
   */
  firstColorLabel?: string
  /**
   * Text of the third check (Suggested english text: Graphics text)
   */
  graphicsTextLabel: string
  /**
   * Label of the component
   */
  label: string
  /**
   * Text of the second check (Suggested english text: Large text)
   */
  largeTextLabel: string
  /**
   * Text of the first check (Suggested english text: Normal text)
   */
  normalTextLabel: string
  /**
   * The second color to compare (HEX code)
   */
  secondColor: string
  /**
   * The name of the second color which will be compared
   */
  secondColorLabel?: string
  /**
   * Text of the success indicator (Suggested english text: PASS)
   */
  successLabel: string
  /**
   * toggles the color preview part of the component
   * if true, firstColorLabel and secondColorLabel is not necessary. Otherwise required
   */
  withoutColorPreview?: boolean
}

type PropKeys = keyof ColorContrastOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ColorContrastProps = ColorContrastOwnProps &
  WithStyleProps<null, ColorContrastStyle> &
  OtherHTMLAttributes<ColorContrastOwnProps>

type ColorContrastStyle = ComponentStyle<
  | 'colorContrast'
  | 'successDescription'
  | 'failureDescription'
  | 'statusWrapper'
  | 'colorIndicator'
  | 'statusIndicatorWrapper'
  | 'colorIndicatorLabel'
  | 'pickedColorHex'
  | 'colorPreview'
  | 'firstColorPreview'
  | 'secondColorPreview'
>

const propTypes: PropValidators<PropKeys> = {
  elementRef: PropTypes.func,
  failureLabel: PropTypes.string.isRequired,
  firstColor: PropTypes.string.isRequired,
  firstColorLabel: PropTypes.string,
  graphicsTextLabel: PropTypes.string.isRequired,
  withoutColorPreview: PropTypes.bool,
  label: PropTypes.string.isRequired,
  largeTextLabel: PropTypes.string.isRequired,
  normalTextLabel: PropTypes.string.isRequired,
  secondColor: PropTypes.string.isRequired,
  secondColorLabel: PropTypes.string,
  successLabel: PropTypes.string.isRequired
}

const allowedProps: AllowedPropKeys = [
  'failureLabel',
  'firstColor',
  'firstColorLabel',
  'graphicsTextLabel',
  'withoutColorPreview',
  'label',
  'largeTextLabel',
  'normalTextLabel',
  'secondColor',
  'secondColorLabel',
  'successLabel'
]

export type { ColorContrastProps, ColorContrastStyle }
export { propTypes, allowedProps }
