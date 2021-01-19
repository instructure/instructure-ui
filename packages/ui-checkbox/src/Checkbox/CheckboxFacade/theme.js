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

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @param  {Object} themeOverride User provided overrides of the default theme mapping.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme, themeOverride = {}) => {
  const { colors, borders, spacing, typography, key: themeName } = theme

  const themeSpecificStyle = {
    canvas: {
      focusBorderColor: theme['ic-brand-primary'],
      labelColor: theme['ic-brand-font-color-dark'],
      checkedLabelColor: theme['ic-brand-font-color-dark'],
      checkedBackground: theme['ic-brand-font-color-dark'],
      checkedBorderColor: theme['ic-brand-font-color-dark'],
      hoverBorderColor: theme['ic-brand-font-color-dark']
    }
  }

  const componentVariables = {
    color: colors?.textLightest,
    borderWidth: borders?.widthSmall,
    borderColor: colors?.borderDark,
    borderRadius: borders?.radiusMedium,
    background: colors?.backgroundLightest,
    marginRight: spacing?.xSmall,
    padding: spacing?.xxxSmall,

    checkedBackground: colors?.backgroundDarkest,
    checkedBorderColor: colors?.borderDarkest,

    hoverBorderColor: colors?.borderDarkest,

    focusBorderColor: colors?.borderBrand,
    focusBorderWidth: borders?.widthMedium,
    focusBorderStyle: borders?.style,

    labelColor: colors?.textDarkest,
    checkedLabelColor: colors?.textDarkest,
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
    ...themeSpecificStyle[themeName],
    ...themeOverride
  }
}

export default generateComponentTheme
