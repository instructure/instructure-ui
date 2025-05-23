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
import { CheckboxFacadeTheme } from '@instructure/shared-types'

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme: Theme): CheckboxFacadeTheme => {
  const { colors, borders, spacing, typography, key: themeName } = theme

  const themeSpecificStyle: ThemeSpecificStyle<CheckboxFacadeTheme> = {
    canvas: {
      focusBorderColor: theme['ic-brand-primary'],
      labelColor: theme['ic-brand-font-color-dark'],
      checkedLabelColor: theme['ic-brand-font-color-dark'],
      checkedBackground: theme['ic-brand-font-color-dark'],
      checkedBorderColor: theme['ic-brand-font-color-dark'],
      hoverBorderColor: theme['ic-brand-font-color-dark']
    }
  }

  const componentVariables: CheckboxFacadeTheme = {
    color: colors?.contrasts?.white1010,
    borderWidth: borders?.widthSmall,
    borderColor: colors?.contrasts?.grey3045,
    errorBorderColor: colors?.contrasts?.red5782,
    borderRadius: borders?.radiusMedium,
    background: colors?.contrasts?.white1010,
    marginRight: spacing?.xSmall,
    padding: spacing?.xxxSmall,

    checkedBackground: colors?.contrasts?.grey125125,
    checkedBorderColor: colors?.contrasts?.grey125125,

    hoverBorderColor: colors?.contrasts?.grey125125,

    focusBorderColor: colors?.contrasts?.blue4570,
    focusBorderWidth: borders?.widthMedium,
    focusBorderStyle: borders?.style,

    labelColor: colors?.contrasts?.grey125125,
    checkedLabelColor: colors?.contrasts?.grey125125,
    labelFontFamily: typography?.fontFamily,
    labelFontWeight: typography?.fontWeightNormal,
    labelLineHeight: typography?.lineHeightCondensed,

    facadeSizeSmall: '1rem',
    facadeSizeMedium: '1.25rem',
    facadeSizeLarge: '1.75rem',

    labelFontSizeSmall: typography?.fontSizeSmall,
    labelFontSizeMedium: typography?.fontSizeMedium,
    labelFontSizeLarge: typography?.fontSizeLarge,

    iconSizeSmall: '0.625rem',
    iconSizeMedium: '0.75rem',
    iconSizeLarge: '1rem'
  }

  return {
    ...componentVariables,
    ...themeSpecificStyle[themeName]
  }
}

export default generateComponentTheme
