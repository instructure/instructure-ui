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

import { lighten } from '@instructure/ui-themeable/lib/utils/color'

export default function generator ({ colors, spacing, typography }) {
  return {
    color: colors.textDarkest,

    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    lineHeight: typography.lineHeightCondensed,
    fontSize: typography.fontSizeMedium,

    xSmallHeight: spacing.xSmall,
    xSmallValueFontSize: typography.fontSizeXSmall,

    smallHeight: spacing.small,
    smallValueFontSize: typography.fontSizeXSmall,

    mediumHeight: spacing.medium,
    mediumValueFontSize: typography.fontSizeSmall,

    largeHeight: spacing.large,
    largeValueFontSize: typography.fontSizeMedium,

    valuePadding: `${spacing.xxSmall}`,

    meterColorStart: colors.backgroundBrand,
    meterColorEnd: lighten(colors.backgroundBrand, 12),

    doneMeterColorStart: colors.backgroundSuccess,
    doneMeterColorEnd: lighten(colors.backgroundSuccess, 12),

    trackColor: colors.porcelain,

    inverseColor: colors.textLightest,
    inverseTrackColor: 'rgba(0, 0, 0, 0.25)'
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark'],
    meterColorStart: variables['ic-brand-primary'],
    meterColorEnd: lighten(variables['ic-brand-primary'], 12)
  }
}
