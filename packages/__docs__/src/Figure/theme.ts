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

import type { Theme } from '@instructure/ui-themes'

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
import { FigureTheme } from './props'
const generateComponentTheme = (theme: Theme): FigureTheme => {
  const {
    borders,
    colors,
    spacing,
    shadows,
    stacking,
    typography,
    key: themeName
  } = theme

  const themeSpecificStyles: Record<string, any> = {}

  const componentVariables = {
    shadow: shadows?.depth2,
    captionFontFamily: typography?.fontFamily,
    captionFontSize: typography?.fontSizeSmall,
    captionBackground: colors?.contrasts?.green1212,
    captionPadding: spacing?.small,
    captionColor: colors?.contrasts?.grey100100,
    borderWidth: borders.widthMedium,
    borderColor: colors?.contrasts?.grey100100,
    contentPadding: spacing?.medium,
    contentBackground: colors?.contrasts?.white1010,
    yesColor: colors?.contrasts?.green4570,
    noColor: colors?.contrasts?.red4570,
    a11yColor: colors?.contrasts?.blue4570,
    iconColor: colors?.contrasts?.white1010,
    iconContainerStacking: stacking?.above,
    iconContainerSize: spacing?.large,
    floatMargin: spacing?.large,
    floatMarginSmall: spacing?.xxSmall
  }

  return {
    ...componentVariables,
    ...themeSpecificStyles[themeName]
  }
}

export default generateComponentTheme
