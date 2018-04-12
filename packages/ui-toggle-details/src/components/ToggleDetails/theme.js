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

export default function generator ({ colors, spacing, borders, typography }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    lineHeight: typography.lineHeight,
    textColor: colors.textDarkest,

    fontSizeSmall: typography.fontSizeSmall,
    fontSizeMedium: typography.fontSizeMedium,
    fontSizeLarge: typography.fontSizeLarge,

    smallIconSize: '0.5rem',
    mediumIconSize: '0.75rem',
    largeIconSize: '1rem',
    iconMargin: spacing.xxSmall,
    iconColor: colors.textDarkest,

    togglePadding: spacing.xxSmall,
    toggleBorderRadius: borders.radiusMedium,
    toggleBorderWidth: borders.widthSmall,
    toggleBorderStyle: borders.style,
    toggleFocusBorderColor: colors.borderBrand,

    filledBackgroundColor: colors.porcelain,
    filledBorderWidth: borders.widthSmall,
    filledBorderStyle: borders.style,
    filledBorderColor: colors.borderMedium,
    filledBorderRadius: borders.radiusMedium,
    filledPadding: spacing.small
  }
}

generator['canvas'] = function (variables) {
  return {
    toggleFocusBorderColor: variables['ic-brand-primary'],
    iconColor: variables['ic-brand-font-color-dark'],
    textColor: variables['ic-brand-font-color-dark']
  }
}
