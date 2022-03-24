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
  ColorMixerTheme,
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'

type ContrastStrength = 'min' | 'mid' | 'max'
type MessageType = Array<{
  type: 'success' | 'hint' | 'error' | 'screenreader-only'
  text: string
}>

type RGBType = {
  r: number
  g: number
  b: number
}
type RGBAType = {
  r: number
  g: number
  b: number
  a: number
}
type ColorMixerOwnProps = {
  value: RGBAType
  onChange: (rgba: RGBAType) => void
  width?: number
}

type ColorMixerState = {
  baseColor: RGBType
  internalColor: RGBType
  value: RGBAType
}

type PropKeys = keyof ColorMixerOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ColorMixerProps = ColorMixerOwnProps &
  WithStyleProps<ColorMixerTheme, ColorMixerStyle> &
  OtherHTMLAttributes<ColorMixerOwnProps>

type ColorMixerStyle = ComponentStyle<'colorMixer'>

const propTypes: PropValidators<PropKeys> = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  width: PropTypes.string
}

const allowedProps: AllowedPropKeys = ['onChange', 'value', 'width']

export type {
  ColorMixerProps,
  ColorMixerStyle,
  ColorMixerState,
  ContrastStrength,
  MessageType,
  RGBType,
  RGBAType
}
export { propTypes, allowedProps }
