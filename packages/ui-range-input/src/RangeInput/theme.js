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

import { alpha, darken } from '@instructure/ui-color-utils'

export default function generator({
  colors,
  borders,
  typography,
  spacing,
  forms
}) {
  return {
    minWidth: '12.5rem',

    handleSize: '1.5rem',
    handleBackground: colors.backgroundBrand,
    handleBorderColor: colors.borderLightest,
    handleBorderSize: borders.widthMedium,
    handleShadow:
      '0 0.0625rem 0.125rem rgba(0, 0, 0, .2), 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.1)',

    handleFocusInset: borders?.widthSmall,
    handleFocusRingSize: borders?.widthMedium,
    handleFocusRingColor: colors?.backgroundLightest,

    handleFocusBackground: colors.backgroundBrand,
    handleHoverBackground: colors.backgroundBrand,

    // Deprecated, remove with "deprecated" thumbVariant
    handleShadowColor: darken(colors.borderBrand, 15),
    handleFocusOutlineColor: alpha(colors.borderBrand, 40),
    handleFocusOutlineWidth: '0.75em',

    trackBackground: colors.backgroundDark,

    valueColor: colors.textLightest,
    valueFontFamily: typography.fontFamily,
    valueFontWeight: typography.fontWeightNormal,

    valueSmallFontSize: typography.fontSizeSmall,
    valueSmallPadding: `0 ${spacing.xSmall}`,
    valueSmallLineHeight: forms.inputHeightSmall,

    valueMediumFontSize: typography.fontSizeMedium,
    valueMediumPadding: `0 ${spacing.small}`,
    valueMediumLineHeight: forms.inputHeightMedium,

    valueLargeFontSize: typography.fontSizeLarge,
    valueLargePadding: `0 ${spacing.medium}`,
    valueLargeLineHeight: forms.inputHeightLarge
  }
}

generator.canvas = function (variables) {
  return {
    handleBackground: variables['ic-brand-primary'],
    handleHoverBackground: variables['ic-brand-primary'],
    handleFocusBackground: variables['ic-brand-primary'],
    valueBackground: variables['ic-brand-font-color-dark'],

    // Deprecated, remove with "deprecated" thumbVariant
    handleShadowColor: darken(variables['ic-brand-primary'], 15),
    handleFocusOutlineColor: alpha(variables['ic-brand-primary'], 40)
  }
}
