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

import { alpha } from '@instructure/ui-themeable/lib/utils/color'

export default function generator ({ colors, borders, typography, forms, spacing }) {
  return {
    borderTopColor: colors.tiara,
    borderRightColor: colors.tiara,
    borderBottomColor: colors.tiara,
    borderLeftColor: colors.tiara,
    borderWidth: borders.widthSmall,
    borderStyle: borders.style,
    borderRadius: borders.radiusMedium,

    background: colors.backgroundLightest,
    color: colors.oxford,

    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,

    padding: spacing.small,

    arrowColor: colors.oxford,

    smallHeight: forms.inputHeightSmall,
    smallFontSize: typography.fontSizeSmall,
    smallArrowWidth: '0.75rem',

    mediumHeight: forms.inputHeightMedium,
    mediumFontSize: typography.fontSizeMedium,
    mediumArrowWidth: '0.875rem',

    largeHeight: forms.inputHeightLarge,
    largeFontSize: typography.fontSizeLarge,
    largeArrowWidth: '1rem',

    focusBorderColor: colors.borderBrand,
    focusOutlineColor: alpha(colors.borderBrand, 50),

    errorBorderColor: colors.crimson,
    errorOutlineColor: alpha(colors.crimson, 50)
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark'],
    arrowColor: variables['ic-brand-font-color-dark'],
    focusBorderColor: variables['ic-brand-primary'],
    focusOutlineColor: alpha(variables['ic-brand-primary'], 50)
  }
}
