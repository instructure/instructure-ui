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
import type { HSVType } from '../props'

type ColorPaletteOwnProps = {
  hue: number
  color: HSVType
  internalColor: HSVType
  width: number
  height: number
  indicatorRadius: number
  onChange: (rgb: HSVType) => void
}

type ColorPaletteState = {
  colorPosition: { x: number; y: number }
}

type PropKeys = keyof ColorPaletteOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ColorPaletteProps = ColorPaletteOwnProps &
  WithStyleProps<null, ColorPaletteStyle> &
  OtherHTMLAttributes<ColorPaletteOwnProps>

type ColorPaletteStyle = ComponentStyle<'ColorPalette' | 'indicator' | 'canvas'>
const propTypes: PropValidators<PropKeys> = {
  hue: PropTypes.number,
  color: PropTypes.object,
  internalColor: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  indicatorRadius: PropTypes.number,
  onChange: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'hue',
  'color',
  'internalColor',
  'width',
  'height',
  'indicatorRadius',
  'onChange'
]

export type { ColorPaletteProps, ColorPaletteState, ColorPaletteStyle }
export { propTypes, allowedProps }
