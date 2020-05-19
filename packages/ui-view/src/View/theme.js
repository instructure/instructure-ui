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

/* Global variables (colors, typography, spacing, etc.) are defined in lib/themes */

import { makeThemeVars } from '@instructure/ui-themeable'

export default function generator ({
  typography,
  colors,
  borders,
  spacing,
  shadows,
  stacking,
  breakpoints,
  transitions
}) {
  return {
    fontFamily: typography.fontFamily,

    color: colors.textDarkest,
    colorPrimaryInverse: colors.textLightest,

    borderStyle: borders.style,

    borderColorPrimary: colors.borderMedium,
    borderColorSecondary: colors.borderDark,
    borderColorSuccess: colors.borderSuccess,
    borderColorBrand: colors.borderBrand,
    borderColorInfo: colors.borderInfo,
    borderColorAlert: colors.borderAlert,
    borderColorWarning: colors.borderWarning,
    borderColorDanger: colors.borderDanger,
    borderColorTransparent: 'transparent',

    borderRadiusSmall: borders.radiusSmall,
    borderRadiusMedium: borders.radiusMedium,
    borderRadiusLarge: borders.radiusLarge,

    debugOutlineColor: colors.borderDebug,

    backgroundPrimary: colors.backgroundLightest,
    backgroundSecondary: colors.backgroundLight,
    backgroundPrimaryInverse: colors.backgroundDarkest,
    backgroundBrand: colors.backgroundBrand,
    backgroundInfo: colors.backgroundInfo,
    backgroundAlert: colors.backgroundAlert,
    backgroundSuccess: colors.backgroundSuccess,
    backgroundDanger: colors.backgroundDanger,
    backgroundWarning: colors.backgroundWarning,

    arrowSize: '0.5rem',

    focusOutlineStyle: borders.style,
    focusOutlineWidth: borders.widthMedium,
    focusOutlineOffset: '0.3125rem',
    focusOutlineInset: '0rem', // do not use unitless zero (for CSS calc())

    focusColorInfo: colors.borderInfo,
    focusColorDanger: colors.borderDanger,
    focusColorSuccess: colors.borderSuccess,
    focusColorInverse: colors.borderLightest,

    xSmallMaxWidth: breakpoints.xSmall,
    smallMaxWidth: breakpoints.small,
    mediumMaxWidth: breakpoints.medium,
    largeMaxWidth: breakpoints.large,

    ...makeThemeVars('margin', spacing),
    ...makeThemeVars('padding', spacing),
    ...makeThemeVars('shadow', shadows),
    ...makeThemeVars('stacking', stacking),
    ...makeThemeVars('border', borders)
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark'],
    focusColorInfo: variables['ic-brand-primary'],
    backgroundBrand: variables['ic-brand-primary'],
    backgroundInfo: variables['ic-brand-primary'],
    borderColorBrand: variables['ic-brand-primary'],
    borderColorInfo: variables['ic-brand-primary']
  }
}
