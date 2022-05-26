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

/**
 * ---
 * category: utilities
 * ---
 * Color conversion utilities to transform between `TinyColor` colors (https://github.com/bgrins/TinyColor)
 * @module conversions
 */

import Color from 'tinycolor2'
import type { ColorInputWithoutInstance } from 'tinycolor2'

/**
 * Converts any valid `TinyColor` colors to hex string
 * @param {String} rgb a color string
 * @returns {String} a hex string like `#FF0000`
 * @module color2hex
 */
const color2hex = (rgb: ColorInputWithoutInstance): string => {
  return Color(rgb).toHexString().toUpperCase()
}

/**
 * Transforms any `TinyColor` to 8 length HEX (alpha included)
 * @param {ColorInputWithoutInstance} any color representation from `TinyColor`
 * @returns {String} An 8 length hex string like `#FF0000FF`
 * @module colorTohex8
 */
const colorTohex8 = (color: ColorInputWithoutInstance): string => {
  return Color(color).toHex8String().toUpperCase()
}

/**
 * Transforms any `TinyColor` to RGBA object ( {r:number, g:number, b:number, a:number} )
 * also exported as `hexToRgb` for backward compatiblity reasons
 * @param {ColorInputWithoutInstance} any color representation from `TinyColor`
 * @returns {Color.ColorFormats.RGBA} A `TinyColor` RGBA type
 * @module colorToRGB
 */
const colorToRGB = (
  color: ColorInputWithoutInstance
): Color.ColorFormats.RGBA => {
  return Color(color).toRgb()
}

/**
 * Transforms any `TinyColor` to HSVA object ( {h:number, s:number, v:number, a:number} )
 * @param {ColorInputWithoutInstance} any color representation from `TinyColor`
 * @returns {Color.ColorFormats.HSVA} A `TinyColor` HSVA type
 * @module colorToHsva
 */
const colorToHsva = (
  color: ColorInputWithoutInstance
): Color.ColorFormats.HSVA => {
  return Color(color).toHsv()
}

/**
 * Transforms any `TinyColor` to HSLA object ( {h:number, s:number, l:number, a:number} )
 * @param {ColorInputWithoutInstance} any color representation from `TinyColor`
 * @returns {Color.ColorFormats.HSLA} A `TinyColor` HSLA type
 * @module colorToHsla
 */
const colorToHsla = (
  color: ColorInputWithoutInstance
): Color.ColorFormats.HSLA => {
  return Color(color).toHsl()
}

export {
  color2hex,
  colorTohex8,
  colorToHsva,
  colorToHsla,
  colorToRGB,
  colorToRGB as hexToRgb
}
