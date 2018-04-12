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

export default function generator ({ colors, borders, spacing, typography, forms }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    color: colors.textDarkest,

    background: colors.backgroundLightest,

    borderWidth: borders.widthSmall,
    borderStyle: borders.style,
    borderTopColor: colors.borderMedium,
    borderRightColor: colors.borderMedium,
    borderBottomColor: colors.borderMedium,
    borderLeftColor: colors.borderMedium,
    borderRadius: borders.radiusMedium,

    padding: spacing.small,

    focusBorderTopColor: colors.borderBrand,
    focusBorderRightColor: colors.borderBrand,
    focusBorderBottomColor: colors.borderBrand,
    focusBorderLeftColor: colors.borderBrand,
    focusOutlineColor: alpha(colors.borderBrand, 50),
    boxShadowColor: 'transparent',

    errorBorderColor: colors.borderDanger,
    errorOutlineColor: alpha(colors.borderDanger, 50),
    boxShadowErrorColor: 'transparent',

    placeholderColor: colors.textDark,

    smallFontSize: typography.fontSizeSmall,
    smallHeight: forms.inputHeightSmall,

    mediumFontSize: typography.fontSizeMedium,
    mediumHeight: forms.inputHeightMedium,

    largeFontSize: typography.fontSizeLarge,
    largeHeight: forms.inputHeightLarge
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark'],
    focusBorderTopColor: variables['ic-brand-primary'],
    focusBorderRightColor: variables['ic-brand-primary'],
    focusBorderBottomColor: variables['ic-brand-primary'],
    focusBorderLeftColor: variables['ic-brand-primary'],
    focusOutlineColor: alpha(variables['ic-brand-primary'], 50)
  }
}
