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

import { colorToRGB, colorToHex8 } from './conversions'
import { overlayColors } from './overlayColors'
import { contrast } from './contrast'

/**
 * ---
 * category: utilities/Color
 * ---
 * Calculates two, not necessarily opaque color's contrast on top of each other.
 * The method assumes that the bottom color is on top of a white background (only important if it isn't opaque)
 * @module contrastWithAlpha
 * @param color1
 * @param color2
 * @returns color contrast ratio
 */
const contrastWithAlpha = (color1: string, color2: string): number => {
  const c1RGBA = colorToRGB(color1)
  const c2RGBA = colorToRGB(color2)
  const c1OnWhite = overlayColors({ r: 255, g: 255, b: 255, a: 1 }, c1RGBA)
  const c2OnC1OnWhite = overlayColors(c1OnWhite, c2RGBA)

  return contrast(colorToHex8(c1OnWhite), colorToHex8(c2OnC1OnWhite), 2)
}

export { contrastWithAlpha }
