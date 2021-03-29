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
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme) => {
  const { borders, colors, spacing, typography, key: themeName } = theme

  const themeSpecificStyle = {
    canvas: {
      color: theme['ic-brand-font-color-dark'],
      meterColorBrand: theme['ic-brand-primary']
    },
    'canvas-high-contrast': {
      meterBorderColorInverse: colors?.borderLightest,
      meterColorBrandInverse: colors?.backgroundLightest,
      meterColorSuccessInverse: colors?.backgroundLightest,
      meterColorInfoInverse: colors?.backgroundLightest,
      meterColorAlertInverse: colors?.backgroundLightest,
      meterColorWarningInverse: colors?.backgroundLightest,
      meterColorDangerInverse: colors?.backgroundLightest
    }
  }

  const componentVariables = {
    color: colors?.textDarkest,

    fontFamily: typography?.fontFamily,
    fontWeight: typography?.fontWeightNormal,
    lineHeight: typography?.lineHeightCondensed,
    fontSize: typography?.fontSizeMedium,

    xSmallHeight: spacing?.xSmall,
    xSmallValueFontSize: typography?.fontSizeXSmall,

    smallHeight: spacing?.small,
    smallValueFontSize: typography?.fontSizeXSmall,

    mediumHeight: spacing?.medium,
    mediumValueFontSize: typography?.fontSizeSmall,

    largeHeight: spacing?.large,
    largeValueFontSize: typography?.fontSizeMedium,

    valuePadding: `${spacing?.xxSmall}`,

    // variables are split out for inverse to allow
    // color value changes for inverse-high-constrast
    meterColorBrand: colors?.backgroundBrand,
    meterColorBrandInverse: colors?.backgroundBrand,

    meterColorInfo: colors?.backgroundInfo,
    meterColorInfoInverse: colors?.backgroundInfo,

    meterColorSuccess: colors?.backgroundSuccess,
    meterColorSuccessInverse: colors?.backgroundSuccess,

    meterColorDanger: colors?.backgroundDanger,
    meterColorDangerInverse: colors?.backgroundDanger,

    meterColorAlert: colors?.backgroundAlert,
    meterColorAlertInverse: colors?.backgroundAlert,

    meterColorWarning: colors?.backgroundWarning,
    meterColorWarningInverse: colors?.backgroundWarning,

    meterBorderWidthInverse: borders?.widthSmall,
    meterBorderColorInverse: 'transparent',

    trackColor: colors?.backgroundLightest,
    trackColorInverse: 'transparent',
    trackBottomBorderWidth: borders?.widthSmall,
    trackBottomBorderColor: colors?.borderMedium,
    trackBottomBorderColorInverse: colors?.borderLightest
  }

  return {
    ...componentVariables,
    ...themeSpecificStyle[themeName]
  }
}

export default generateComponentTheme
