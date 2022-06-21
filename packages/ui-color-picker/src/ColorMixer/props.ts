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

type RGBType = {
  r: number
  g: number
  b: number
}
type HSVType = {
  h: number
  s: number
  v: number
}
type HSLType = {
  h: number
  s: number
  l: number
}
type RGBAType = {
  r: number
  g: number
  b: number
  a: number
}
type ColorMixerOwnProps = {
  /**
   * Makes the component uninteractable
   */
  disabled?: boolean
  /**
   * Provides a reference to the component's underlying html element.
   */
  elementRef?: (element: Element | null) => void
  /**
   * Gets called each time the color changes
   */
  onChange: (hex: string) => void
  /**
   * Sets the value of the component. If changes, the color changes inside the component as well
   */
  value: string
  /**
   * Toggles alpha. If true, alpha slider will appear
   */
  withAlpha: boolean
  /**
   * screenReaderLabel for the RGBA input's red input field
   */
  rgbRedInputScreenReaderLabel: string
  /**
   * screenReaderLabel for the RGBA input's green input field
   */
  rgbGreenInputScreenReaderLabel: string
  /**
   * screenReaderLabel for the RGBA input's blue input field
   */
  rgbBlueInputScreenReaderLabel: string
  /**
   * screenReaderLabel for the RGBA input's alpha input field
   */
  rgbAlphaInputScreenReaderLabel: string
}

type ColorMixerState = {
  h: number
  s: number
  v: number
  a: number
}

type PropKeys = keyof ColorMixerOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ColorMixerProps = ColorMixerOwnProps &
  WithStyleProps<null, ColorMixerStyle> &
  OtherHTMLAttributes<ColorMixerOwnProps>

type ColorMixerStyle = ComponentStyle<
  'colorMixer' | 'sliderAndPaletteContainer'
>

const propTypes: PropValidators<PropKeys> = {
  disabled: PropTypes.bool,
  elementRef: PropTypes.func,
  value: PropTypes.object,
  onChange: PropTypes.func,
  withAlpha: PropTypes.bool,
  rgbRedInputScreenReaderLabel: PropTypes.string,
  rgbGreenInputScreenReaderLabel: PropTypes.string,
  rgbBlueInputScreenReaderLabel: PropTypes.string,
  rgbAlphaInputScreenReaderLabel: PropTypes.string
}

const allowedProps: AllowedPropKeys = [
  'disabled',
  'elementRef',
  'value',
  'onChange',
  'withAlpha',
  'rgbRedInputScreenReaderLabel',
  'rgbGreenInputScreenReaderLabel',
  'rgbBlueInputScreenReaderLabel',
  'rgbAlphaInputScreenReaderLabel'
]

export type {
  ColorMixerProps,
  ColorMixerStyle,
  ColorMixerState,
  RGBType,
  RGBAType,
  HSVType,
  HSLType
}
export { propTypes, allowedProps }
