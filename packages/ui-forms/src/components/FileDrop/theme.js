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

export default function generator ({ borders, colors }) {
  return {
    backgroundColor: colors.backgroundLightest,
    borderRadius: borders.radiusLarge,
    borderWidth: borders.widthMedium,
    borderStyle: 'dashed',
    hoverBorderColor: colors.borderBrand,
    focusBorderWidth: borders.widthMedium,
    focusBorderStyle: 'solid',
    focusBorderColor: colors.borderBrand,
    acceptedColor: colors.textBrand,
    rejectedColor: colors.textDanger
  }
}

generator.canvas = function (variables) {
  return {
    hoverBorderColor: variables['ic-brand-primary'],
    acceptedColor: variables['ic-brand-primary']
  }
}
