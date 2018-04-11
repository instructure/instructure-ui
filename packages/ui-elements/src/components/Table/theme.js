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

export default function generator ({ colors, typography, spacing }) {
  return {
    color: colors.oxford,
    background: colors.backgroundLightest,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    fontSize: typography.fontSizeMedium,
    borderColor: colors.tiara,

    headerBorderColor: colors.ash,

    hoverBorderColor: colors.brand,

    captionColor: colors.oxford,
    captionFontSize: typography.fontSizeMedium,

    smallFontSize: typography.fontSizeSmall,
    smallLineHeight: typography.lineHeightFit,
    smallPadding: `${spacing.xxSmall} ${spacing.xSmall}`,

    mediumFontSize: typography.fontSizeMedium,
    mediumLineHeight: typography.lineHeightCondensed,
    mediumPadding: `${spacing.xSmall} ${spacing.small}`,

    largeFontSize: typography.fontSizeLarge,
    largeLineHeight: typography.lineHeightCondensed,
    largePadding: `${spacing.small} ${spacing.medium}`,

    stripedBackground: colors.porcelain
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark'],
    captionColor: variables['ic-brand-font-color-dark'],
    hoverBorderColor: variables['ic-brand-primary']
  }
}
