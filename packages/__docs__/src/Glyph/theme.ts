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

import { alpha } from '@instructure/ui-color-utils'
import type { Theme } from '@instructure/ui-themes'
import type { GlyphTheme } from './props'

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme: Theme): GlyphTheme => {
  const { borders, colors, spacing, breakpoints } = theme

  const colorCheckerboard = '#eee'
  const colorCheckerboardInverse = '#444'

  const componentVariables = {
    padding: spacing?.small,
    glyphMinWidth: breakpoints?.xSmall,
    borderRadius: borders?.radiusMedium,
    backgroundColor: colors?.backgroundLightest,
    border: `${borders?.widthSmall} solid #eee`,
    backgroundColorInverse: '#333',
    gradientCheckerboardSize: '1rem',
    gradientCheckerboard: `
      45deg,
      ${colorCheckerboard} 25%,
      transparent 25%,
      transparent 75%,
      ${colorCheckerboard} 75%,
      ${colorCheckerboard}`,
    gradientCheckerboardInverse: `
      45deg,
      ${colorCheckerboardInverse} 25%,
      transparent 25%,
      transparent 75%,
      ${colorCheckerboardInverse} 75%,
      ${colorCheckerboardInverse}`,
    glyphColor: colors?.textDarkest,
    glyphHoverBackgroundColor: alpha(colors?.textDarkest, 10),
    glyphFocusBorderColor: colors?.borderBrand
  }

  return {
    ...componentVariables
  }
}

export default generateComponentTheme
