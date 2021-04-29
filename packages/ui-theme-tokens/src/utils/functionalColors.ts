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

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'colors' implicitly has an 'any' type.
function functionalColors(colors) {
  const text = {
    textDarkest: colors.licorice,
    textDark: colors.ash,
    textLight: colors.porcelain,
    textLightest: colors.white,
    textBrand: colors.brand,
    textLink: colors.link,
    textAlert: colors.barney,
    textInfo: colors.brand,
    textSuccess: colors.shamrock,
    textDanger: colors.crimson,
    textWarning: colors.fire
  }

  const background = {
    backgroundDarkest: colors.licorice,
    backgroundDark: colors.ash,
    backgroundMedium: colors.tiara,
    backgroundLight: colors.porcelain,
    backgroundLightest: colors.white,
    backgroundBrand: colors.brand,
    backgroundBrandSecondary: colors.oxford,
    backgroundAlert: colors.barney,
    backgroundInfo: colors.brand,
    backgroundSuccess: colors.shamrock,
    backgroundDanger: colors.crimson,
    backgroundWarning: colors.fire
  }

  const border = {
    borderLightest: colors.white,
    borderLight: colors.porcelain,
    borderMedium: colors.tiara,
    borderDark: colors.ash,
    borderDarkest: colors.licorice,
    borderBrand: colors.brand,
    borderAlert: colors.barney,
    borderInfo: colors.brand,
    borderSuccess: colors.shamrock,
    borderDanger: colors.crimson,
    borderWarning: colors.fire,
    borderDebug: colors.crimson
  }

  return {
    ...colors,
    ...text,
    ...background,
    ...border,
    values: colors,
    text: text,
    background: background,
    border: border
  }
}

export default functionalColors
export { functionalColors }
