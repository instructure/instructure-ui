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
import { ProgressBarTheme } from '@instructure/shared-types'

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme: Theme): ProgressBarTheme => {
  const { borders, colors, spacing, typography, key: themeName } = theme

  const themeSpecificStyle: ThemeSpecificStyle<ProgressBarTheme> = {
    canvas: {
      meterColorBrand: theme['ic-brand-primary']
    },
    'canvas-high-contrast': {
      meterColorBrandInverse: colors?.contrasts?.white1010,
      meterColorSuccessInverse: colors?.contrasts?.white1010,
      meterColorInfoInverse: colors?.contrasts?.white1010,
      meterColorAlertInverse: colors?.contrasts?.white1010,
      meterColorWarningInverse: colors?.contrasts?.white1010,
      meterColorDangerInverse: colors?.contrasts?.white1010
    }
  }

  const componentVariables: ProgressBarTheme = {
    fontFamily: typography?.fontFamily,
    fontWeight: typography?.fontWeightNormal,
    lineHeight: typography?.lineHeightCondensed,
    fontSize: typography?.fontSizeMedium,

    xSmallHeight: spacing?.xSmall,
    xSmallValueFontSize: typography?.fontSizeXSmall,

    smallHeight: '1.125rem', // product design wants = 18px
    smallValueFontSize: typography?.fontSizeXSmall,

    mediumHeight: spacing?.medium,
    mediumValueFontSize: typography?.fontSizeSmall,

    largeHeight: spacing?.large,
    largeValueFontSize: typography?.fontSizeMedium,

    valuePadding: `${spacing?.xxSmall}`,

    // variables are split out for inverse to allow
    // color value changes for inverse-high-constrast
    meterColorBrand: colors?.contrasts?.blue4570,
    meterColorBrandInverse: colors?.contrasts?.blue4570,

    meterColorInfo: colors?.contrasts?.blue4570,
    meterColorInfoInverse: colors?.contrasts?.blue4570,

    meterColorSuccess: colors?.contrasts?.green4570,
    meterColorSuccessInverse: colors?.contrasts?.green4570,

    meterColorDanger: colors?.contrasts?.red4570,
    meterColorDangerInverse: colors?.contrasts?.red4570,

    meterColorAlert: colors?.contrasts?.blue4570,
    meterColorAlertInverse: colors?.contrasts?.blue4570,

    meterColorWarning: colors?.contrasts?.orange4570,
    meterColorWarningInverse: colors?.contrasts?.orange4570,

    meterBorderWidthInverse: borders?.widthSmall,
    meterBorderColorInverse: 'transparent',

    trackColor: colors?.contrasts?.white1010,
    trackColorInverse: 'transparent',
    trackBottomBorderWidth: borders?.widthSmall,
    trackBottomBorderColor: colors?.contrasts?.grey3045,
    trackBottomBorderColorInverse: colors?.contrasts?.white1010,

    borderRadius: '0px'
  }

  return {
    ...componentVariables,
    ...themeSpecificStyle[themeName]
  }
}
export default generateComponentTheme
