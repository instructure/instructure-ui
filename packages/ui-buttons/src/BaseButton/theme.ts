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

    primaryColor: colors?.contrasts?.white,
    primaryBorderColor: colors?.contrasts?.blue5782,
    primaryBackground: colors?.contrasts?.blue4570,
    primaryHoverBackground: colors?.contrasts?.blue5782,
    primaryActiveBackground: colors?.contrasts?.blue5782,
    primaryActiveBoxShadow: `${activeShadow} "#013451"}`,
    primaryGhostColor: colors?.contrasts?.blue4570,
    primaryGhostBorderColor: colors?.contrasts?.blue4570,
    primaryGhostBackground: 'transparent',
    primaryGhostHoverBackground: colors?.contrasts?.blue12,
    primaryGhostActiveBackground: 'transparent',
    primaryGhostActiveBoxShadow: `${activeShadow} ${colors?.contrasts?.white}`,

    secondaryColor: colors?.contrasts?.grey125,
    secondaryBorderColor: colors?.contrasts?.grey1214,
    secondaryBackground: colors?.contrasts?.grey11,
    secondaryHoverBackground: colors?.contrasts?.grey1214,
    secondaryActiveBackground: colors?.contrasts?.grey1214,
    secondaryActiveBoxShadow: `${activeShadow} ${colors?.contrasts?.white}`,
    secondaryGhostColor: colors?.contrasts?.grey125,
    secondaryGhostBorderColor: colors?.contrasts?.grey125,
    secondaryGhostBackground: 'transparent',
    secondaryGhostHoverBackground: colors?.contrasts?.grey11,
    secondaryGhostActiveBackground: 'transparent',
    secondaryGhostActiveBoxShadow: `${activeShadow} ${colors?.contrasts?.white}`,

    successColor: colors?.contrasts?.white,
    successBorderColor: colors?.contrasts?.green5782,
    successBackground: colors?.contrasts?.green4570,
    successHoverBackground: colors?.contrasts?.green5782,
    successActiveBackground: colors?.contrasts?.green5782,
    successActiveBoxShadow: `${activeShadow} ${colors?.contrasts?.white}`,
    successGhostColor: colors?.contrasts?.green4570,
    successGhostBorderColor: colors?.contrasts?.green4570,
    successGhostBackground: 'transparent',
    successGhostHoverBackground: colors?.contrasts?.green12,
    successGhostActiveBackground: 'transparent',
    successGhostActiveBoxShadow: `${activeShadow} ${colors?.contrasts?.white}`,

    dangerColor: colors?.contrasts?.white,
    dangerBorderColor: colors?.contrasts?.red5782,
    dangerBackground: colors?.contrasts?.red4570,
    dangerHoverBackground: colors?.contrasts?.red5782,
    dangerActiveBackground: colors?.contrasts?.red5782,
    dangerActiveBoxShadow: `${activeShadow} ${colors?.contrasts?.white}`,
    dangerGhostColor: colors?.contrasts?.red4570,
    dangerGhostBorderColor: colors?.contrasts?.red4570,
    dangerGhostBackground: 'transparent',
    dangerGhostHoverBackground: colors?.contrasts?.red12,
    dangerGhostActiveBackground: 'transparent',
    dangerGhostActiveBoxShadow: `${activeShadow} ${colors?.contrasts?.white}`,

    primaryInverseColor: colors?.contrasts?.grey125,
    primaryInverseBorderColor: colors?.contrasts?.grey1214,
    primaryInverseBackground: colors?.contrasts?.white,
    primaryInverseHoverBackground: colors?.contrasts?.grey11,
    primaryInverseActiveBackground: colors?.contrasts?.white,
    primaryInverseActiveBoxShadow: `${activeShadow} ${colors?.contrasts?.white}`,
    primaryInverseGhostColor: colors?.contrasts?.white,
    primaryInverseGhostBorderColor: colors?.contrasts?.white,
    primaryInverseGhostBackground: 'transparent',
    primaryInverseGhostHoverBackground: colors?.contrasts?.grey11,
    primaryInverseGhostActiveBackground: 'transparent',
    primaryInverseGhostActiveBoxShadow: `${activeShadow} ${colors?.contrasts?.white}`
  }

  return {
    ...componentVariables
  }
}

export default generateComponentTheme
