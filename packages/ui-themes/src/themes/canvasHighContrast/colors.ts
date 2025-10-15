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

import {
  primitives,
  additionalPrimitives
} from '../../sharedThemeTokens/colors/primitives.js'
import dataVisualization from '../../sharedThemeTokens/colors/dataVisualization.js'
import getUIColors from '../../utils/getUIColors.js'

import type { UI, Contrasts } from '@instructure/shared-types'

const contrasts: Contrasts = {
  white1010: primitives.white,
  white1010op75: primitives.white10op75,

  grey1111: primitives.grey11,
  grey1214: primitives.grey14,
  grey1424: primitives.grey24,
  grey2424: primitives.grey24,
  grey3045: primitives.grey45,
  grey4570: primitives.grey70,
  grey5782: primitives.grey82,
  grey100100: primitives.grey100,
  grey100100op75: primitives.grey100op75,
  grey125125: primitives.grey125,

  blue1212: primitives.blue12,
  blue4570: primitives.blue70,
  blue5782: primitives.blue82,

  green1212: primitives.green12,
  green4570: primitives.green70,
  green5782: primitives.green82,

  orange1212: primitives.orange12,
  orange3045: primitives.orange45,
  orange4570: primitives.orange70,
  orange5782: primitives.orange82,

  red1212: primitives.red12,
  red4570: primitives.red70,
  red5782: primitives.red82,

  violet1212: primitives.violet12,
  violet4570: primitives.violet70,
  violet5790: primitives.violet90,
  sea4570: primitives.sea70,
  sea5790: primitives.sea90
}

const ui: UI = getUIColors(contrasts)

const colors = {
  primitives,
  additionalPrimitives,
  contrasts,
  ui,
  dataVisualization
}
export default { primitives, contrasts, ui }
export { colors }
