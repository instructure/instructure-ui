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

import sharedThemeTokens from '../../sharedThemeTokens'
import { BaseTheme, Colors } from '@instructure/shared-types'
import { ThemeRegistry } from '@instructure/theme-registry'
import colors from './colors'

const key = 'canvas-high-contrast'

export type CanvasHighContrastTheme = BaseTheme & {
  key: 'canvas-high-contrast'
} & typeof sharedThemeTokens & { colors: Colors }

const __theme: CanvasHighContrastTheme = {
  key,
  description: 'This theme meets WCAG 2.0 AA rules for color contrast.',
  ...sharedThemeTokens,
  colors
}

const theme = ThemeRegistry.registerTheme(__theme)
export default theme
// theme without the use() function and `variables` prop
export { __theme as canvasHighContrastThemeLocal }
