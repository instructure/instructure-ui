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

import { canvasHighContrast } from '@instructure/ui-themes'
import type { CanvasHighContrastTheme } from '@instructure/ui-themes'

const borders: CanvasHighContrastTheme['borders'] = canvasHighContrast.borders
const breakpoints: CanvasHighContrastTheme['breakpoints'] =
  canvasHighContrast.breakpoints
const colors: CanvasHighContrastTheme['colors'] = canvasHighContrast.colors
const forms: CanvasHighContrastTheme['forms'] = canvasHighContrast.forms
const media: CanvasHighContrastTheme['media'] = canvasHighContrast.media
const shadows: CanvasHighContrastTheme['shadows'] = canvasHighContrast.shadows
const spacing: CanvasHighContrastTheme['spacing'] = canvasHighContrast.spacing
const stacking: CanvasHighContrastTheme['stacking'] =
  canvasHighContrast.stacking
const transitions: CanvasHighContrastTheme['transitions'] =
  canvasHighContrast.transitions
const typography: CanvasHighContrastTheme['typography'] =
  canvasHighContrast.typography

const key = 'canvas-high-contrast'

const theme = canvasHighContrast

export default theme
export {
  theme,
  key,
  colors,
  borders,
  transitions,
  typography,
  spacing,
  forms,
  media,
  breakpoints,
  shadows,
  stacking
}

export type { CanvasHighContrastTheme }
