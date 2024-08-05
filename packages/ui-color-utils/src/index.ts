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

export { alpha } from './alpha'
export { darken } from './darken'
export { lighten } from './lighten'
export { contrast } from './contrast'
export { isValid } from './isValid'
export {
  color2hex,
  colorToHex8,
  colorToHsva,
  colorToHsla,
  colorToRGB
} from './conversions'

import {
  color2hex,
  colorToHex8,
  colorToHsva,
  colorToHsla,
  colorToRGB
} from './conversions'

// TODO remove when we get rid of babel-plugin-transform-imports
// This default export is needed because babel-plugin-transform-imports will
// fail if the exported name is not the same as the filename
export default {
  color2hex: color2hex,
  colorToHex8: colorToHex8,
  colorToHsva: colorToHsva,
  colorToHsla: colorToHsla,
  colorToRGB: colorToRGB
}

export type { RGBType, HSVType, HSLType, RGBAType } from './colorTypes'
