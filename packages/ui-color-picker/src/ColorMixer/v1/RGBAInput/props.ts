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

import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

import type {
  OtherHTMLAttributes,
  ColorMixerRGBAInputTheme
} from '@instructure/shared-types'
import type { RGBAType } from '@instructure/ui-color-utils'

type RGBAInputOwnProps = {
  disabled?: boolean
  label?: string
  width: number
  value: RGBAType
  onChange: (rgba: RGBAType) => void
  withAlpha?: boolean
  rgbRedInputScreenReaderLabel: string
  rgbGreenInputScreenReaderLabel: string
  rgbBlueInputScreenReaderLabel: string
  rgbAlphaInputScreenReaderLabel: string
  elementRef?: (element: Element | null) => void
}

type RGBAInputState = {
  value: RGBAType
}

type PropKeys = keyof RGBAInputOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type RGBAInputProps = RGBAInputOwnProps &
  WithStyleProps<ColorMixerRGBAInputTheme, RGBAInputStyle> &
  OtherHTMLAttributes<RGBAInputOwnProps>

type RGBAInputStyle = ComponentStyle<
  'RGBAInput' | 'label' | 'inputContainer' | 'rgbInput' | 'aInput'
>
const allowedProps: AllowedPropKeys = [
  'disabled',
  'label',
  'width',
  'value',
  'onChange',
  'withAlpha',
  'rgbRedInputScreenReaderLabel',
  'rgbGreenInputScreenReaderLabel',
  'rgbBlueInputScreenReaderLabel',
  'rgbAlphaInputScreenReaderLabel',
  'elementRef'
]

export type { RGBAInputProps, RGBAInputState, RGBAInputStyle }
export { allowedProps }
