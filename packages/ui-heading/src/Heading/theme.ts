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
import { HeadingTheme } from '@instructure/shared-types'

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme: Theme): HeadingTheme => {
  const { typography, colors, spacing, borders, key: themeName } = theme

  const themeSpecificStyle: ThemeSpecificStyle<HeadingTheme> = {
    canvas: {
      primaryColor: theme['ic-brand-font-color-dark']
    },
    instructure: {
      h1FontFamily: typography?.fontFamilyHeading,
      h2FontFamily: typography?.fontFamilyHeading,
      h3FontWeight: typography?.fontWeightBold,
      h3FontSize: '2.125rem',
      h4FontWeight: typography?.fontWeightBold,
      h4FontSize: typography?.fontSizeLarge,
      h5FontWeight: typography?.fontWeightBold,
      h5FontSize: typography?.fontSizeMedium
    }
  }

  const componentVariables: HeadingTheme = {
    lineHeight: typography?.lineHeightCondensed,

    h1FontSize: typography?.fontSizeXXLarge,
    h1FontWeight: typography?.fontWeightBold,
    h1FontFamily: typography?.fontFamily,

    h2FontSize: typography?.fontSizeXLarge,
    h2FontWeight: typography?.fontWeightNormal,
    h2FontFamily: typography?.fontFamily,

    h3FontSize: typography?.fontSizeLarge,
    h3FontWeight: typography?.fontWeightBold,
    h3FontFamily: typography?.fontFamily,

    h4FontSize: typography?.fontSizeMedium,
    h4FontWeight: typography?.fontWeightBold,
    h4FontFamily: typography?.fontFamily,

    h5FontSize: typography?.fontSizeSmall,
    h5FontWeight: typography?.fontWeightNormal,
    h5FontFamily: typography?.fontFamily,

    primaryInverseColor: colors?.textLightest,
    primaryColor: colors?.textDarkest,

    secondaryColor: colors?.textDark,
    secondaryInverseColor: colors?.textLight,

    borderPadding: spacing?.xxxSmall,
    borderColor: colors?.borderMedium,
    borderWidth: borders?.widthSmall,
    borderStyle: borders?.style
  }

  return {
    ...componentVariables,
    ...themeSpecificStyle[themeName]
  }
}

export default generateComponentTheme
