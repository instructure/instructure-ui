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

import type { ComponentStyle, WithStyleProps } from '@instructure/emotion'
import type {
  Colors,
  Spacing,
  Breakpoints,
  Border,
  PropValidators
} from '@instructure/shared-types'
import PropTypes from 'prop-types'

type VariantOwnProps = {
  name: string
  variant: string
  glyph: GlyphData
  onClick: (...args: any[]) => any
}

type VariantProps = VariantOwnProps & WithStyleProps<GlyphTheme, GlyphStyle>

type GlyphOwnProps = {
  name: string
  variants: Record<string, GlyphData>
  onClick: (...args: any[]) => any
  rtl: boolean
}

type PropKeys = keyof GlyphOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type GlyphTheme = {
  padding: Spacing['small']
  glyphMinWidth: Breakpoints['xSmall']
  borderRadius: Border['radiusMedium']
  backgroundColor: Colors['backgroundLightest']
  border: string
  backgroundColorInverse: string
  gradientCheckerboardSize: string
  gradientCheckerboard: string
  gradientCheckerboardInverse: string
  glyphColor: Colors['textDarkest']
  glyphHoverBackgroundColor: string
  glyphFocusBorderColor: Colors['borderBrand']
}

type GlyphStyle = ComponentStyle<
  'glyph' | 'info' | 'variants' | 'iconFontWrapper' | 'button'
>

type GlyphProps = GlyphOwnProps & WithStyleProps<GlyphTheme, GlyphStyle>

const propTypes: PropValidators<PropKeys> = {
  name: PropTypes.string.isRequired,
  variants: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  rtl: PropTypes.bool
}

export type GlyphData = {
  classes?: string[]
  name: string
  src?: string
  glyphName: string
  codepoint: string
}

const allowedProps: AllowedPropKeys = ['name', 'onClick', 'rtl', 'variants']

export type { GlyphStyle, GlyphTheme, GlyphProps, VariantProps }
export { allowedProps, propTypes }
