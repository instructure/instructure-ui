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

type Primitives = {
  white: string
  white10op75: string

  grey11: string
  grey12: string
  grey14: string
  grey24: string
  grey45: string
  grey57: string
  grey70: string
  grey82: string
  grey100: string
  grey100op75: string
  grey125: string

  blue12: string
  blue45: string
  blue57: string
  blue70: string
  blue82: string

  green12: string
  green45: string
  green57: string
  green70: string
  green82: string

  orange12: string
  orange30: string
  orange45: string
  orange57: string
  orange70: string
  orange82: string

  red12: string
  red45: string
  red57: string
  red70: string
  red82: string
}

type Contrasts = {
  white1010: Primitives['white']
  white1010op75: Primitives['white10op75']

  grey1111: Primitives['grey11']
  grey1214: Primitives['grey12'] | Primitives['grey14']
  grey1424: Primitives['grey14'] | Primitives['grey24']
  grey2424: Primitives['grey24']
  grey4570: Primitives['grey45'] | Primitives['grey70']
  grey5782: Primitives['grey57'] | Primitives['grey82']
  grey100100: Primitives['grey100']
  grey100100op75: Primitives['grey100op75']
  grey125125: Primitives['grey125']

  blue1212: Primitives['blue12']
  blue4570: Primitives['blue45'] | Primitives['blue70']
  blue5782: Primitives['blue57'] | Primitives['blue82']

  green1212: Primitives['green12']
  green4570: Primitives['green45'] | Primitives['green70']
  green5782: Primitives['green57'] | Primitives['green82']

  orange1212: Primitives['orange12']
  orange3045: Primitives['orange30'] | Primitives['orange45']
  orange4570: Primitives['orange45'] | Primitives['orange70']
  orange5782: Primitives['orange57'] | Primitives['orange82']

  red1212: Primitives['red12']
  red4570: Primitives['red45'] | Primitives['red70']
  red5782: Primitives['red57'] | Primitives['red82']
}

type UI = {
  surfacePagePrimary: Contrasts['white1010']
  surfacePageSecondary: Contrasts['grey1111']
  surfaceCardPrimary: Contrasts['white1010']
  surfaceCardSecondary: Contrasts['grey1111']
  surfaceDark: Contrasts['grey100100']

  textTitle: Contrasts['grey125125']
  textDescription: Contrasts['grey125125']
  textBody: Contrasts['grey125125']
  textTimestamp: Contrasts['grey5782']
  textAuthor: Contrasts['grey5782']
  textDatapoint: Contrasts['grey5782']
  textLink: Contrasts['blue4570']
  textPlaceholder: Contrasts['grey2424']
  textSuccess: Contrasts['green4570']
  textWarning: Contrasts['orange4570']
  textError: Contrasts['red4570']

  lineStroke: Contrasts['grey1424']
  lineDivider: Contrasts['grey1214']

  surfaceOverlayGrey: Contrasts['grey100100op75']
  surfaceOverlayWhite: Contrasts['white1010op75']
  surfaceDivider: Contrasts['grey1424']
}

type Colors = {
  primitives: Primitives
  contrasts: Contrasts
  ui: UI
}

export type { Colors, Primitives, Contrasts, UI }
