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

import {
  theme as canvasHighContrast,
  CanvasHighContrastTheme
} from '@instructure/canvas-high-contrast-theme'

import {
  theme as canvas,
  CanvasTheme,
  CanvasBrandVariables
} from '@instructure/canvas-theme'

import {
  theme as instructure,
  InstructureTheme
} from '@instructure/instructure-theme'

import { BaseTheme } from '@instructure/shared-types'

type ThemeMap = {
  canvas: CanvasTheme
  'canvas-high-contrast': CanvasHighContrastTheme
  instructure: InstructureTheme

  // needed for custom theme support
  [k: string]: BaseTheme
}

type ThemeKeys = keyof ThemeMap

type Theme = BaseTheme & {
  key: ThemeKeys
} & Partial<CanvasBrandVariables>

type ThemeSpecificStyle<ComponentTheme> = {
  [themeKey in ThemeKeys]?: Partial<ComponentTheme>
}

export { canvas, canvasHighContrast, instructure }
export default canvas
export type {
  ThemeMap,
  BaseTheme,
  Theme,
  ThemeKeys,
  ThemeSpecificStyle,
  CanvasTheme,
  CanvasBrandVariables,
  CanvasHighContrastTheme,
  InstructureTheme
}
