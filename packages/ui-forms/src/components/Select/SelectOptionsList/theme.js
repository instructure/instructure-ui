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


export default function generator ({ colors, typography, borders, spacing, stacking, forms }) {
  return {
    zIndex: stacking.topmost,

    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    groupFontWeight: typography.fontWeightBold,
    lineHeight: typography.lineHeightCondensed,

    labelColor: colors.textDarkest,
    background: colors.backgroundLightest,

    highlightedBackground: colors.backgroundBrand,
    activeBackground: colors.backgroundDark,
    activeLabelColor: colors.textLightest,

    padding: `${spacing.xSmall} ${spacing.small}`,
    iconPaddingEnd: spacing.small,
    groupPadding: spacing.medium,

    smallFontSize: typography.fontSizeSmall,
    mediumFontSize: typography.fontSizeMedium,
    largeFontSize: typography.fontSizeLarge
  }
}

generator.canvas = function (variables) {
  return {
    labelColor: variables['ic-brand-font-color-dark'],
    highlightedBackground: variables['ic-brand-primary']
  }
}
