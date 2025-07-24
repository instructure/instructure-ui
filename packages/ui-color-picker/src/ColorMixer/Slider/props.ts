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
  
  ColorMixerSliderTheme
} from '@instructure/shared-types'

type SliderOwnProps = {
  isColorSlider?: boolean
  onChange: (position: number) => void
  width: number
  value: number
  minValue: number
  maxValue: number
  indicatorRadius: number
  height: number
  elementRef?: (element: Element | null) => void
  navigationExplanationScreenReaderLabel: string
}

type PropKeys = keyof SliderOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type SliderProps = SliderOwnProps &
  WithStyleProps<ColorMixerSliderTheme, SliderStyle> &
  OtherHTMLAttributes<SliderOwnProps>

type SliderStyleProps = {
  sliderPositionFromValue: number
}

type SliderStyle = ComponentStyle<
  | 'colorSlider'
  | 'indicator'
  | 'slider'
  | 'sliderBackground'
  | 'disabledOverlay'
>
const allowedProps: AllowedPropKeys = [
  'isColorSlider',
  'onChange',
  'width',
  'value',
  'minValue',
  'maxValue',
  'indicatorRadius',
  'height',
  'elementRef',
  'navigationExplanationScreenReaderLabel'
]

export type { SliderProps, SliderStyle, SliderStyleProps }
export { allowedProps }
