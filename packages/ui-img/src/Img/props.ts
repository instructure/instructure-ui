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
  PropValidators,
  ImgTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'

type ImgOwnProps = {
  src: string
  alt?: string
  display?: 'inline-block' | 'block'
  /**
   * Gets passed down to  the img component. Same as the native HTML img's loading attribute
   */
  loading?: 'eager' | 'lazy'
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: Spacing
  /**
   * Valid values for `opacity` are `0` - `10`. Valid values for `blend` are
   * `normal` (default), `multiply`, `screen`, `overlay`, and `color-burn`.
   */
  overlay?: {
    color: string
    opacity: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    blend?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'color-burn'
  }
  withGrayscale?: boolean
  withBlur?: boolean
  constrain?: 'cover' | 'contain'
  elementRef?: (element: Element | null) => void
  height?: string | number
  width?: string | number
}

type PropKeys = keyof ImgOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ImgProps = ImgOwnProps &
  WithStyleProps<ImgTheme, ImgStyle> &
  OtherHTMLAttributes<ImgOwnProps>

type ImgStyle = ComponentStyle<'overlay' | 'container' | 'img'>

const propTypes: PropValidators<PropKeys> = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  display: PropTypes.oneOf(['inline-block', 'block']),
  loading: PropTypes.oneOf(['eager', 'lazy']),
  margin: ThemeablePropTypes.spacing,
  overlay: PropTypes.shape({
    color: PropTypes.string.isRequired,
    opacity: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).isRequired,
    blend: PropTypes.oneOf([
      'normal',
      'multiply',
      'screen',
      'overlay',
      'color-burn'
    ])
  }),
  withGrayscale: PropTypes.bool,
  withBlur: PropTypes.bool,
  constrain: PropTypes.oneOf(['cover', 'contain']),
  /**
   * provides a reference to the underlying html root element
   */
  elementRef: PropTypes.func,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

const allowedProps: AllowedPropKeys = [
  'src',
  'alt',
  'display',
  'loading',
  'margin',
  'overlay',
  'withGrayscale',
  'withBlur',
  'constrain',
  'elementRef',
  'height',
  'width'
]

export type { ImgProps, ImgStyle }
export { propTypes, allowedProps }
