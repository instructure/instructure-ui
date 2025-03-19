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
  grey30: string
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

type AdditionalPrimitives = {
  rose12: string
  rose30: string
  rose45: string
  rose70: string
  rose110: string
  rose35: string
  rose40: string
  rose50: string
  rose57: string
  rose90: string

  copper12: string
  copper30: string
  copper45: string
  copper70: string
  copper110: string
  copper35: string
  copper40: string
  copper50: string
  copper57: string
  copper90: string

  honey12: string
  honey30: string
  honey45: string
  honey70: string
  honey110: string
  honey35: string
  honey40: string
  honey50: string
  honey57: string
  honey90: string

  forest12: string
  forest30: string
  forest45: string
  forest70: string
  forest110: string
  forest35: string
  forest40: string
  forest50: string
  forest57: string
  forest90: string

  aurora12: string
  aurora30: string
  aurora45: string
  aurora70: string
  aurora110: string
  aurora35: string
  aurora40: string
  aurora50: string
  aurora57: string
  aurora90: string

  sea12: string
  sea30: string
  sea45: string
  sea70: string
  sea110: string
  sea35: string
  sea40: string
  sea50: string
  sea57: string
  sea90: string

  sky12: string
  sky30: string
  sky45: string
  sky70: string
  sky110: string
  sky35: string
  sky40: string
  sky50: string
  sky57: string
  sky90: string

  ocean12: string
  ocean30: string
  ocean45: string
  ocean70: string
  ocean110: string
  ocean35: string
  ocean40: string
  ocean50: string
  ocean57: string
  ocean90: string

  violet12: string
  violet30: string
  violet45: string
  violet70: string
  violet110: string
  violet35: string
  violet40: string
  violet50: string
  violet57: string
  violet90: string

  plum12: string
  plum30: string
  plum45: string
  plum70: string
  plum110: string
  plum35: string
  plum40: string
  plum50: string
  plum57: string
  plum90: string

  stone12: string
  stone30: string
  stone45: string
  stone70: string
  stone110: string
  stone35: string
  stone40: string
  stone50: string
  stone57: string
  stone90: string
}

type Contrasts = {
  white1010: Primitives['white']
  white1010op75: Primitives['white10op75']

  grey1111: Primitives['grey11']
  grey1214: Primitives['grey12'] | Primitives['grey14']
  grey1424: Primitives['grey14'] | Primitives['grey24']
  grey2414: Primitives['grey24'] | Primitives['grey14']
  grey2424: Primitives['grey24']
  grey3045: Primitives['grey30'] | Primitives['grey45']
  grey4570: Primitives['grey45'] | Primitives['grey70']
  grey5782: Primitives['grey57'] | Primitives['grey82']
  grey8270: Primitives['grey82'] | Primitives['grey70']
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
  textLink: Contrasts['blue5782']
  textPlaceholder: Contrasts['grey2424']
  textSuccess: Contrasts['green5782']
  textWarning: Contrasts['orange5782']
  textError: Contrasts['red5782']

  lineStroke: Contrasts['grey1424']
  lineDivider: Contrasts['grey1214']

  surfaceOverlayGrey: Contrasts['grey100100op75']
  surfaceOverlayWhite: Contrasts['white1010op75']
  surfaceAttention: Contrasts['blue4570']
  surfaceSuccess: Contrasts['green4570']
  surfaceWarning: Contrasts['orange4570']
  surfaceError: Contrasts['red4570']
  surfaceDivider: Contrasts['grey1214']

  textSurfaceColored: Contrasts['white1010']

  iconDefault: Contrasts['grey125125']
  iconSuccess: Contrasts['green4570']
  iconWarning: Contrasts['orange4570']
  iconError: Contrasts['red4570']
  iconSurfaceColored: Contrasts['white1010']

  lineConnector: Contrasts['grey1424']
}

type DataVisualization = {
  rose12Primary: AdditionalPrimitives['rose12']
  rose30Primary: AdditionalPrimitives['rose30']
  rose45Primary: AdditionalPrimitives['rose45']
  rose70Primary: AdditionalPrimitives['rose70']
  rose110Primary: AdditionalPrimitives['rose110']
  rose35Secondary: AdditionalPrimitives['rose35']
  rose40Secondary: AdditionalPrimitives['rose40']
  rose50Secondary: AdditionalPrimitives['rose50']
  rose57Secondary: AdditionalPrimitives['rose57']
  rose90Secondary: AdditionalPrimitives['rose90']

  copper12Primary: AdditionalPrimitives['copper12']
  copper30Primary: AdditionalPrimitives['copper30']
  copper45Primary: AdditionalPrimitives['copper45']
  copper70Primary: AdditionalPrimitives['copper70']
  copper110Primary: AdditionalPrimitives['copper110']
  copper35Secondary: AdditionalPrimitives['copper35']
  copper40Secondary: AdditionalPrimitives['copper40']
  copper50Secondary: AdditionalPrimitives['copper50']
  copper57Secondary: AdditionalPrimitives['copper57']
  copper90Secondary: AdditionalPrimitives['copper90']

  honey12Primary: AdditionalPrimitives['honey12']
  honey30Primary: AdditionalPrimitives['honey30']
  honey45Primary: AdditionalPrimitives['honey45']
  honey70Primary: AdditionalPrimitives['honey70']
  honey110Primary: AdditionalPrimitives['honey110']
  honey35Secondary: AdditionalPrimitives['honey35']
  honey40Secondary: AdditionalPrimitives['honey40']
  honey50Secondary: AdditionalPrimitives['honey50']
  honey57Secondary: AdditionalPrimitives['honey57']
  honey90Secondary: AdditionalPrimitives['honey90']

  forest12Primary: AdditionalPrimitives['forest12']
  forest30Primary: AdditionalPrimitives['forest30']
  forest45Primary: AdditionalPrimitives['forest45']
  forest70Primary: AdditionalPrimitives['forest70']
  forest110Primary: AdditionalPrimitives['forest110']
  forest35Secondary: AdditionalPrimitives['forest35']
  forest40Secondary: AdditionalPrimitives['forest40']
  forest50Secondary: AdditionalPrimitives['forest50']
  forest57Secondary: AdditionalPrimitives['forest57']
  forest90Secondary: AdditionalPrimitives['forest90']

  aurora12Primary: AdditionalPrimitives['aurora12']
  aurora30Primary: AdditionalPrimitives['aurora30']
  aurora45Primary: AdditionalPrimitives['aurora45']
  aurora70Primary: AdditionalPrimitives['aurora70']
  aurora110Primary: AdditionalPrimitives['aurora110']
  aurora35Secondary: AdditionalPrimitives['aurora35']
  aurora40Secondary: AdditionalPrimitives['aurora40']
  aurora50Secondary: AdditionalPrimitives['aurora50']
  aurora57Secondary: AdditionalPrimitives['aurora57']
  aurora90Secondary: AdditionalPrimitives['aurora90']

  sea12Primary: AdditionalPrimitives['sea12']
  sea30Primary: AdditionalPrimitives['sea30']
  sea45Primary: AdditionalPrimitives['sea45']
  sea70Primary: AdditionalPrimitives['sea70']
  sea110Primary: AdditionalPrimitives['sea110']
  sea35Secondary: AdditionalPrimitives['sea35']
  sea40Secondary: AdditionalPrimitives['sea40']
  sea50Secondary: AdditionalPrimitives['sea50']
  sea57Secondary: AdditionalPrimitives['sea57']
  sea90Secondary: AdditionalPrimitives['sea90']

  sky12Primary: AdditionalPrimitives['sky12']
  sky30Primary: AdditionalPrimitives['sky30']
  sky45Primary: AdditionalPrimitives['sky45']
  sky70Primary: AdditionalPrimitives['sky70']
  sky110Primary: AdditionalPrimitives['sky110']
  sky35Secondary: AdditionalPrimitives['sky35']
  sky40Secondary: AdditionalPrimitives['sky40']
  sky50Secondary: AdditionalPrimitives['sky50']
  sky57Secondary: AdditionalPrimitives['sky57']
  sky90Secondary: AdditionalPrimitives['sky90']

  ocean12Primary: AdditionalPrimitives['ocean12']
  ocean30Primary: AdditionalPrimitives['ocean30']
  ocean45Primary: AdditionalPrimitives['ocean45']
  ocean70Primary: AdditionalPrimitives['ocean70']
  ocean110Primary: AdditionalPrimitives['ocean110']
  ocean35Secondary: AdditionalPrimitives['ocean35']
  ocean40Secondary: AdditionalPrimitives['ocean40']
  ocean50Secondary: AdditionalPrimitives['ocean50']
  ocean57Secondary: AdditionalPrimitives['ocean57']
  ocean90Secondary: AdditionalPrimitives['ocean90']

  violet12Primary: AdditionalPrimitives['violet12']
  violet30Primary: AdditionalPrimitives['violet30']
  violet45Primary: AdditionalPrimitives['violet45']
  violet70Primary: AdditionalPrimitives['violet70']
  violet110Primary: AdditionalPrimitives['violet110']
  violet35Secondary: AdditionalPrimitives['violet35']
  violet40Secondary: AdditionalPrimitives['violet40']
  violet50Secondary: AdditionalPrimitives['violet50']
  violet57Secondary: AdditionalPrimitives['violet57']
  violet90Secondary: AdditionalPrimitives['violet90']

  plum12Primary: AdditionalPrimitives['plum12']
  plum30Primary: AdditionalPrimitives['plum30']
  plum45Primary: AdditionalPrimitives['plum45']
  plum70Primary: AdditionalPrimitives['plum70']
  plum110Primary: AdditionalPrimitives['plum110']
  plum35Secondary: AdditionalPrimitives['plum35']
  plum40Secondary: AdditionalPrimitives['plum40']
  plum50Secondary: AdditionalPrimitives['plum50']
  plum57Secondary: AdditionalPrimitives['plum57']
  plum90Secondary: AdditionalPrimitives['plum90']

  stone12Primary: AdditionalPrimitives['stone12']
  stone30Primary: AdditionalPrimitives['stone30']
  stone45Primary: AdditionalPrimitives['stone45']
  stone70Primary: AdditionalPrimitives['stone70']
  stone110Primary: AdditionalPrimitives['stone110']
  stone35Secondary: AdditionalPrimitives['stone35']
  stone40Secondary: AdditionalPrimitives['stone40']
  stone50Secondary: AdditionalPrimitives['stone50']
  stone57Secondary: AdditionalPrimitives['stone57']
  stone90Secondary: AdditionalPrimitives['stone90']
}

type Colors = {
  primitives: Primitives
  contrasts: Contrasts
  ui: UI
}

export type {
  Colors,
  Primitives,
  AdditionalPrimitives,
  Contrasts,
  UI,
  DataVisualization
}
