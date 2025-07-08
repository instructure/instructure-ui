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

import type { RGBAType } from './colorTypes'

/**
 * ---
 * category: utilities/Color
 * ---
 * Place two RGBA colors on top of each other. The second one (c2) goes on top.
 * The method calculates what color would be visible. If the second color (c2) is opaque, the result
 * will be c2, if fully transparent, c1. If anything in between, it calculates the real color.
 * Alpha is always set to 1 after the calculation
 * @module overlayColors
 * @param c1
 * @param c2
 * @returns color as rgb string
 */
const overlayColors = (c1: RGBAType, c2: RGBAType): RGBAType => {
  const alpha = 1 - (1 - c1.a) * (1 - c2.a)
  return {
    r: (c2.r * c2.a) / alpha + (c1.r * c1.a * (1 - c2.a)) / alpha,
    g: (c2.g * c2.a) / alpha + (c1.g * c1.a * (1 - c2.a)) / alpha,
    b: (c2.b * c2.a) / alpha + (c1.b * c1.a * (1 - c2.a)) / alpha,
    a: 1
  }
}

export { overlayColors }
