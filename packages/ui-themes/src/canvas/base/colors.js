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
const colors = {
  brand: '#008EE2',
  electric: '#008EE2',
  shamrock: '#00AC18',
  barney: '#BF32A4',
  crimson: '#EE0612',
  fire: '#FC5E13',
  licorice: '#2D3B45',
  oxford: '#394B58',
  ash: '#8B969E',
  tiara: '#C7CDD1',
  porcelain: '#F5F5F5',
  white: '#FFFFFF'
}

export function makeFunctionalColors (colors) {
  return {
    ...colors,

    textDarkest: colors.licorice,
    textDark: colors.ash,
    textLight: colors.porcelain,
    textLightest: colors.white,

    textBrand: colors.electric,
    textAlert: colors.barney,
    textInfo: colors.electric,
    textSuccess: colors.shamrock,
    textWarning: colors.fire,

    backgroundDarkest: colors.licorice,
    backgroundDark: colors.oxford,
    // backgroundMedium: colors.ash, // TODO: what text color does this work with?
    backgroundLight: colors.porcelain,
    backgroundLightest: colors.white,

    backgroundBrand: colors.electric,
    backgroundAlert: colors.barney,
    backgroundInfo: colors.electric,
    backgroundSuccess: colors.shamrock,
    backgroundWarning: colors.fire,

    borderLight: colors.tiara,
    borderDark: colors.ash,

    borderBrand: colors.electric,
    borderAlert: colors.barney,
    borderInfo: colors.electric,
    borderSuccess: colors.shamrock,
    borderWarning: colors.fire
  }
}

export default Object.freeze(makeFunctionalColors(colors))
