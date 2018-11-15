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

export default function generator ({ colors, borders, forms, shadows, spacing, typography }) {
  return {
    color: colors.textLightest,
    background: colors.backgroundLight,
    borderColor: colors.borderMedium,
    borderWidth: borders.widthMedium,
    borderRadius: '4rem',
    marginEnd: spacing.small,
    checkedBackground: colors.backgroundSuccess,
    uncheckedIconColor: colors.textDark,
    checkedIconColor: colors.textSuccess,
    focusOutlineColor: colors.borderBrand,
    focusBorderWidth: borders.widthMedium,
    focusBorderStyle: borders.style,
    toggleBackground: colors.backgroundLightest,
    toggleShadow: shadows.depth1,
    baseSizeSmall: forms.inputHeightSmall,
    baseSizeMedium: forms.inputHeightMedium,
    baseSizeLarge: forms.inputHeightLarge,
    labelColor: colors.textDarkest,
    labelFontFamily: typography.fontFamily,
    labelFontWeight: typography.fontWeightNormal,
    labelLineHeight: typography.lineHeightCondensed,
    labelFontSizeSmall: typography.fontSizeSmall,
    labelFontSizeMedium: typography.fontSizeMedium,
    labelFontSizeLarge: typography.fontSizeLarge
  }
}

generator['canvas-a11y'] = generator['canvas-high-contrast'] = function ({ colors }) {
  return {
    uncheckedIconColor: colors.textDarkest,
    background: colors.backgroundDarkest,
    borderColor: colors.borderDarkest
  }
}

generator.canvas = function (variables) {
  return {
    focusOutlineColor: variables['ic-brand-primary'],
    labelColor: variables['ic-brand-font-color-dark']
  }
}
