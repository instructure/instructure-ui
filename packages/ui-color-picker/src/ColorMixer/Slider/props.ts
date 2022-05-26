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
import type { RGBType, RGBAType } from '../props'

type SliderOwnProps = {
  isColorSlider: boolean
  onChange: (position: number) => void
  width: number
  value: number
  indicatorRadius: number
  height: number
}

type SliderState = {
  baseColor: RGBType
  internalColor: RGBType
  value: RGBAType
}

type PropKeys = keyof SliderOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type SliderProps = SliderOwnProps &
  WithStyleProps<null, SliderStyle> &
  OtherHTMLAttributes<SliderOwnProps>

type SliderStyle = ComponentStyle<
  'colorSlider' | 'indicator' | 'slider' | 'sliderBackground'
>

const propTypes: PropValidators<PropKeys> = {
  isColorSlider: PropTypes.bool,
  onChange: PropTypes.func,
  width: PropTypes.number,
  value: PropTypes.object,
  indicatorRadius: PropTypes.number,
  height: PropTypes.number
}

const allowedProps: AllowedPropKeys = [
  'isColorSlider',
  'onChange',
  'width',
  'value',
  'indicatorRadius',
  'height'
]

export type { SliderProps, SliderStyle, SliderState }
export { propTypes, allowedProps }
