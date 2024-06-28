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

import primitives from '../common/colors/pirimitves'

import type { Contrasts } from '@instructure/shared-types'

const contrasts: Contrasts = {
  white: primitives.white,

  grey11: primitives.grey11,
  grey1214: primitives.grey12,
  grey1424: primitives.grey14,
  grey24: primitives.grey24,
  grey4570: primitives.grey45,
  grey5782: primitives.grey57,
  grey100: primitives.grey100,
  grey125: primitives.grey125,

  blue12: primitives.blue12,
  blue4570: primitives.blue45,
  blue5782: primitives.blue57,

  green12: primitives.green12,
  green4570: primitives.green45,
  green5782: primitives.green57,

  orange12: primitives.orange12,
  orange3045: primitives.orange30,
  orange4570: primitives.orange45,
  orange5782: primitives.orange57,

  red12: primitives.red12,
  red4570: primitives.red45,
  red5782: primitives.red57
}

const colors = { primitives, contrasts }
export default colors
export { colors }
