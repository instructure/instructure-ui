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

import { canUseDOM, getFontSize } from '@instructure/ui-dom-utils'
import { parseUnit } from './parseUnit'
import React from 'react'

/**
 * ---
 * category: utilities/utils
 * ---
 * Converts a unit value size combination (em, rem, px) to a number representing px
 *
 * Example inputs:
 *  - '100rem'
 *  - '20em'
 *  - '40px'
 *
 * @module px
 *
 * @param {String|number} val The value to look up. If it's a number its just returned as is.
 * @param {Document|Window|Node|React.ReactElement |React.Component|null} el - containing element, for context measure is em (defaults to `document.body`)
 * @returns {Number} Returns numerical representation of pixels
 */
function px(
  val: string | number,
  el?: Document | Window | Node | React.ReactElement | React.Component | null
): number {
  // TODO !val should not be needed
  if (!val || typeof val === 'number') {
    return val as number
  }
  const [num, unit] = parseUnit(val)
  if (unit === 'rem') {
    return num * getFontSize()
  } else if (unit === 'em') {
    const doc = canUseDOM ? document.body : null
    const container = el || doc
    return num * getFontSize(container)
  } else {
    return num
  }
}

export default px
export { px }
