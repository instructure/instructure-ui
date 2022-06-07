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

const calcBlendedColor = (c1: RGBAType, c2: RGBAType) => {
  // 0.4 as decided by design
  const c2Alpha = c2.a * 0.4
  const c1Alpha = 1 - c2Alpha
  const alpha = 1 - c1Alpha * (1 - c1Alpha)

  return `rgba(
      ${(c2.r * c2Alpha) / alpha + (c1.r * c1Alpha * (1 - c2Alpha)) / alpha},
      ${(c2.g * c2Alpha) / alpha + (c1.g * c1Alpha * (1 - c2Alpha)) / alpha},
      ${(c2.b * c2Alpha) / alpha + (c1.b * c1Alpha * (1 - c2Alpha)) / alpha},
      ${c2.a})`
}

export { calcBlendedColor }
