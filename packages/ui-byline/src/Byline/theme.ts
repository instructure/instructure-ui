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

import type { Theme, ThemeSpecificStyle } from '@instructure/ui-themes'
import type { BylineTheme } from '@instructure/shared-types'

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme: Theme): BylineTheme => {
  const { colors, spacing, typography, breakpoints, key: themeName } = theme

  const themeSpecificStyle: ThemeSpecificStyle<BylineTheme> = {
    canvas: {
      color: theme['ic-brand-font-color-dark']
    }
  }

  const componentVariables: BylineTheme = {
    fontFamily: typography?.fontFamily,
    background: colors?.backgroundLightest,
    color: colors?.textDarkest,

    figureMargin: spacing?.small,
    titleMargin: `0 0 ${spacing?.xSmall} 0`,

    titleFontSize: typography?.fontSizeLarge,
    titleFontWeight: typography?.fontWeightNormal,
    titleLineHeight: typography?.lineHeightFit,

    descriptionFontSize: typography?.fontSizeMedium,
    descriptionFontWeight: typography?.fontWeightNormal,
    descriptionLineHeight: typography?.lineHeightCondensed,

    small: breakpoints?.small,
    medium: breakpoints?.medium,
    large: breakpoints?.large
  }

  return {
    ...componentVariables,
    ...themeSpecificStyle[themeName]
  }
}

export default generateComponentTheme
