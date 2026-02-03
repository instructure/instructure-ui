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

import canvas from '@instructure/ui-themes'

import type { CanvasTheme } from '@instructure/ui-themes'

const borders: CanvasTheme['borders'] = canvas.borders
const breakpoints: CanvasTheme['breakpoints'] = canvas.breakpoints
const colors: CanvasTheme['colors'] = canvas.colors
const forms: CanvasTheme['forms'] = canvas.forms
const media: CanvasTheme['media'] = canvas.media
const shadows: CanvasTheme['shadows'] = canvas.shadows
const spacing: CanvasTheme['spacing'] = canvas.spacing
const stacking: CanvasTheme['stacking'] = canvas.stacking
const transitions: CanvasTheme['transitions'] = canvas.transitions
const typography: CanvasTheme['typography'] = canvas.typography

const theme = canvas
const key = 'canvas'

export default canvas
export {
  theme,
  key,
  borders,
  breakpoints,
  colors,
  forms,
  media,
  shadows,
  spacing,
  stacking,
  transitions,
  typography
}

export type { CanvasTheme }
