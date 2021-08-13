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

import { AlertTheme } from '@instructure/shared-types'
import { Theme, ThemeSpecificStyle } from '@instructure/ui-themes'

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme: Theme): AlertTheme => {
  const {
    colors,
    spacing,
    borders,
    typography,
    shadows,
    key: themeName
  } = theme

  const themeSpecificStyle: ThemeSpecificStyle<AlertTheme> = {
    canvas: {
      color: theme['ic-brand-font-color-dark']
    }
  }

  const componentVariables: AlertTheme = {
    background: colors?.backgroundLightest,
    color: colors?.textDarkest,
    marginTop: spacing?.small,

    borderRadius: borders?.radiusMedium,
    borderWidth: borders?.widthMedium,
    borderStyle: borders?.style,

    contentPadding: `${spacing?.small} ${spacing?.medium}`,
    contentFontSize: typography?.fontSizeMedium,
    contentFontFamily: typography?.fontFamily,
    contentFontWeight: typography?.fontWeightNormal,
    contentLineHeight: typography?.lineHeightCondensed,

    closeButtonMarginTop: spacing?.xSmall,
    closeButtonMarginRight: spacing?.xxSmall,

    iconColor: colors?.textLightest,

    successBorderColor: colors?.borderSuccess,
    successIconBackground: colors?.backgroundSuccess,

    infoBorderColor: colors?.borderInfo,
    infoIconBackground: colors?.backgroundInfo,

    warningBorderColor: colors?.borderWarning,
    warningIconBackground: colors?.backgroundWarning,

    dangerBorderColor: colors?.borderDanger,
    dangerIconBackground: colors?.backgroundDanger,

    boxShadow: shadows?.depth2
  }

  return {
    ...componentVariables,
    ...themeSpecificStyle[themeName]
  }
}

export default generateComponentTheme
