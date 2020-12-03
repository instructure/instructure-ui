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

export default function generator({ colors, typography, stacking }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    lineHeight: typography.lineHeightCondensed,
    fontSize: typography.fontSizeMedium,

    defaultColor: colors.textDarkest,
    defaultlHoverBorderColor: colors.borderMedium,
    defaultSelectedBorderColor: colors.borderBrand,

    secondaryColor: colors.textBrand,
    secondarySelectedBackground: colors.backgroundLightest,
    secondarySelectedBorderColor: colors.borderMedium,
    secondarySelectedColor: colors.textDarkest,

    zIndex: stacking.above
  }
}

generator.canvas = function (variables) {
  return {
    defaultColor: variables['ic-brand-font-color-dark'],
    defaultSelectedBorderColor: variables['ic-brand-primary'],

    secondaryColor: variables['ic-brand-primary'],
    secondarySelectedColor: variables['ic-brand-font-color-dark']
  }
}
