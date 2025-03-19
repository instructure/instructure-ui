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
} from '../../sharedThemeTokens/colors/primitives'
import dataVisualization from '../../sharedThemeTokens/colors/dataVisualization'
import getUIColors from '../../utils/getUIColors'

import type { Contrasts, UI } from '@instructure/shared-types'

const contrasts: Contrasts = {
  white1010: primitives.white,
  white1010op75: primitives.white10op75,

  grey1111: primitives.grey11,
  grey1214: primitives.grey12,
  grey1424: primitives.grey14,
  grey2424: primitives.grey24,
  grey2414: primitives.grey24,
  grey3045: primitives.grey30,
  grey4570: primitives.grey45,
  grey5782: primitives.grey57,
  grey8270: primitives.grey82,
  grey100100: primitives.grey100,
  grey100100op75: primitives.grey100op75,
  grey125125: primitives.grey125,

  blue1212: primitives.blue12,
  blue4570: primitives.blue45,
  blue5782: primitives.blue57,

  green1212: primitives.green12,
  green4570: primitives.green45,
  green5782: primitives.green57,

  orange1212: primitives.orange12,
  orange3045: primitives.orange30,
  orange4570: primitives.orange45,
  orange5782: primitives.orange57,

  red1212: primitives.red12,
  red4570: primitives.red45,
  red5782: primitives.red57,

  violet1212: primitives.violet12,
  violet4570: primitives.violet45,
  violet5790: primitives.violet57,
  sea4570: primitives.sea45,
  sea5790: primitives.sea57
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
