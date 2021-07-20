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

type BaseColors = {
  brand: string
  link: string
  electric: string
  shamrock: string
  barney: string
  crimson: string
  fire: string
  licorice: string
  oxford: string
  ash: string
  slate: string
  tiara: string
  porcelain: string
  white: string
}
type TextColors = {
  textDarkest: BaseColors['licorice']
  textDark: BaseColors['ash']
  textLight: BaseColors['porcelain']
  textLightest: BaseColors['white']
  textBrand: BaseColors['brand']
  textLink: BaseColors['link']
  textAlert: BaseColors['barney']
  textInfo: BaseColors['brand']
  textSuccess: BaseColors['shamrock']
  textDanger: BaseColors['crimson']
  textWarning: BaseColors['fire']
}

type BackgroundColors = {
  backgroundDarkest: BaseColors['licorice']
  backgroundDark: BaseColors['ash']
  backgroundMedium: BaseColors['tiara']
  backgroundLight: BaseColors['porcelain']
  backgroundLightest: BaseColors['white']
  backgroundBrand: BaseColors['brand']
  backgroundBrandSecondary: BaseColors['oxford']
  backgroundAlert: BaseColors['barney']
  backgroundInfo: BaseColors['brand']
  backgroundSuccess: BaseColors['shamrock']
  backgroundDanger: BaseColors['crimson']
  backgroundWarning: BaseColors['fire']
}

type BorderColors = {
  borderLightest: BaseColors['white']
  borderLight: BaseColors['porcelain']
  borderMedium: BaseColors['tiara']
  borderDark: BaseColors['ash']
  borderDarkest: BaseColors['licorice']
  borderBrand: BaseColors['brand']
  borderAlert: BaseColors['barney']
  borderInfo: BaseColors['brand']
  borderSuccess: BaseColors['shamrock']
  borderDanger: BaseColors['crimson']
  borderWarning: BaseColors['fire']
  borderDebug: BaseColors['crimson']
}

type Colors = {
  values: BaseColors
  text: TextColors
  background: BackgroundColors
  border: BorderColors
  brand: string
  link: string
  electric: string
  shamrock: string
  barney: string
  crimson: string
  fire: string
  licorice: string
  oxford: string
  ash: string
  slate: string
  tiara: string
  porcelain: string
  white: string
  borderLightest: BaseColors['white']
  borderLight: BaseColors['porcelain']
  borderMedium: BaseColors['tiara']
  borderDark: BaseColors['ash']
  borderDarkest: BaseColors['licorice']
  borderBrand: BaseColors['brand']
  borderAlert: BaseColors['barney']
  borderInfo: BaseColors['brand']
  borderSuccess: BaseColors['shamrock']
  borderDanger: BaseColors['crimson']
  borderWarning: BaseColors['fire']
  borderDebug: BaseColors['crimson']
  backgroundDarkest: BaseColors['licorice']
  backgroundDark: BaseColors['ash']
  backgroundMedium: BaseColors['tiara']
  backgroundLight: BaseColors['porcelain']
  backgroundLightest: BaseColors['white']
  backgroundBrand: BaseColors['brand']
  backgroundBrandSecondary: BaseColors['oxford']
  backgroundAlert: BaseColors['barney']
  backgroundInfo: BaseColors['brand']
  backgroundSuccess: BaseColors['shamrock']
  backgroundDanger: BaseColors['crimson']
  backgroundWarning: BaseColors['fire']
  textDarkest: BaseColors['licorice']
  textDark: BaseColors['ash']
  textLight: BaseColors['porcelain']
  textLightest: BaseColors['white']
  textBrand: BaseColors['brand']
  textLink: BaseColors['link']
  textAlert: BaseColors['barney']
  textInfo: BaseColors['brand']
  textSuccess: BaseColors['shamrock']
  textDanger: BaseColors['crimson']
  textWarning: BaseColors['fire']
}

export type { BaseColors, TextColors, BorderColors, BackgroundColors, Colors }
