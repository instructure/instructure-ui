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
import { BaseButtonTheme } from '@instructure/shared-types'
import { alpha } from '@instructure/ui-color-utils'

const activeShadow = 'inset 0 0 0.1875rem 0.0625rem'

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme: Theme): BaseButtonTheme => {
  const { borders, colors, forms, spacing, typography } = theme

  const componentVariables: BaseButtonTheme = {
    transform: 'none',
    hoverTransform: 'none',
    fontFamily: typography?.fontFamily,
    fontWeight: typography?.fontWeightNormal,
    textTransform: 'none',
    letterSpacing: 'normal',
    borderRadius: borders?.radiusMedium,
    borderStyle: borders?.style,
    borderWidth: borders?.widthSmall,

    smallHeight: forms?.inputHeightSmall,
    smallFontSize: typography?.fontSizeSmall,
    smallPaddingHorizontal: spacing?.xSmall,
    smallPaddingTop: '0.375rem',
    smallPaddingBottom: '0.3125rem',

    mediumHeight: forms?.inputHeightMedium,
    mediumFontSize: typography?.fontSizeMedium,
    mediumPaddingHorizontal: spacing?.small,
    mediumPaddingTop: '0.5625rem',
    mediumPaddingBottom: '0.5625rem',

    largeHeight: forms?.inputHeightLarge,
    largeFontSize: typography?.fontSizeLarge,
    largePaddingHorizontal: spacing?.medium,
    largePaddingTop: '0.6875rem',
    largePaddingBottom: '0.6875rem',

    lineHeight: typography?.lineHeightFit,

    iconSizeSmall: '1rem',
    iconSizeMedium: '1.25rem',
    iconSizeLarge: '1.625rem',
    iconTextGap: spacing.xSmall,
    iconTextGapCondensed: spacing.xxSmall,

    primaryColor: colors?.contrasts?.white1010,
    primaryBorderColor: colors?.contrasts?.blue5782,
    primaryBackground: colors?.contrasts?.blue4570,
    primaryHoverBackground: colors?.contrasts?.blue5782,
    primaryActiveBackground: colors?.contrasts?.blue5782,
    primaryActiveBoxShadow: `${activeShadow} "#013451"}`,
    primaryGhostColor: colors?.contrasts?.blue4570,
    primaryGhostBorderColor: colors?.contrasts?.blue4570,
    primaryGhostBackground: 'transparent',
    primaryGhostHoverBackground: alpha(colors?.contrasts?.blue4570, 10),
    primaryGhostActiveBackground: 'transparent',
    primaryGhostActiveBoxShadow: `${activeShadow} ${alpha(
      colors?.contrasts?.blue1212,
      28
    )}`,

    secondaryColor: colors?.contrasts?.grey125125,
    secondaryBorderColor: colors?.contrasts?.grey1214,
    secondaryBackground: colors?.contrasts?.grey1111,
    secondaryHoverBackground: colors?.contrasts?.grey1214,
    secondaryActiveBackground: colors?.contrasts?.grey1214,
    secondaryActiveBoxShadow: `${activeShadow} ${colors?.contrasts?.white1010}`,
    secondaryGhostColor: colors?.contrasts?.grey125125,
    secondaryGhostBorderColor: colors?.contrasts?.grey125125,
    secondaryGhostBackground: 'transparent',
    secondaryGhostHoverBackground: alpha(colors?.contrasts?.grey125125, 10),
    secondaryGhostActiveBackground: 'transparent',
    secondaryGhostActiveBoxShadow: `${activeShadow} ${alpha(
      colors?.contrasts?.grey125125,
      28
    )}`,

    successColor: colors?.contrasts?.white1010,
    successBorderColor: colors?.contrasts?.green5782,
    successBackground: colors?.contrasts?.green4570,
    successHoverBackground: colors?.contrasts?.green5782,
    successActiveBackground: colors?.contrasts?.green5782,
    successActiveBoxShadow: `${activeShadow} ${colors?.contrasts?.white1010}`,
    successGhostColor: colors?.contrasts?.green4570,
    successGhostBorderColor: colors?.contrasts?.green4570,
    successGhostBackground: 'transparent',
    successGhostHoverBackground: alpha(colors?.contrasts?.green4570, 10),
    successGhostActiveBackground: 'transparent',
    successGhostActiveBoxShadow: `${activeShadow} ${alpha(
      colors?.contrasts?.green4570,
      28
    )}`,

    dangerColor: colors?.contrasts?.white1010,
    dangerBorderColor: colors?.contrasts?.red5782,
    dangerBackground: colors?.contrasts?.red4570,
    dangerHoverBackground: colors?.contrasts?.red5782,
    dangerActiveBackground: colors?.contrasts?.red5782,
    dangerActiveBoxShadow: `${activeShadow} ${colors?.contrasts?.white1010}`,
    dangerGhostColor: colors?.contrasts?.red4570,
    dangerGhostBorderColor: colors?.contrasts?.red4570,
    dangerGhostBackground: 'transparent',
    dangerGhostHoverBackground: alpha(colors?.contrasts?.red4570, 10),
    dangerGhostActiveBackground: 'transparent',
    dangerGhostActiveBoxShadow: `${activeShadow} ${alpha(
      colors?.contrasts?.red4570,
      28
    )}`,

    primaryInverseColor: colors?.contrasts?.grey125125,
    primaryInverseBorderColor: colors?.contrasts?.grey1214,
    primaryInverseBackground: colors?.contrasts?.white1010,
    primaryInverseHoverBackground: colors?.contrasts?.grey1111,
    primaryInverseActiveBackground: colors?.contrasts?.white1010,
    primaryInverseActiveBoxShadow: `${activeShadow} ${colors?.contrasts?.white1010}`,
    primaryInverseGhostColor: colors?.contrasts?.white1010,
    primaryInverseGhostBorderColor: colors?.contrasts?.white1010,
    primaryInverseGhostBackground: 'transparent',
    primaryInverseGhostHoverBackground: alpha(colors?.contrasts?.white1010, 10),
    primaryInverseGhostActiveBackground: 'transparent',
    primaryInverseGhostActiveBoxShadow: `${activeShadow}  ${alpha(
      colors?.contrasts?.white1010,
      28
    )}`
  }

  return {
    ...componentVariables
  }
}

export default generateComponentTheme
