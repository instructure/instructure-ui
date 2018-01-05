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

import getFontSize from './dom/getFontSize'
import parseUnit from './parseUnit'

/**
 * ---
 * category: utilities
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
 * @param {String} val
 * @param {DomNode} el - containing element, for context measure is em (defaults to document.body)
 * @returns {Number} Returns numerical representation of pixels
*/
export default function px (val, el) {
  const container = el || document.body

  if (!val || typeof val === 'number') {
    return val
  }

  const [ num, unit ] = parseUnit(val)

  if (unit === 'rem') {
    return num * getFontSize()
  } else if (unit === 'em') {
    return num * getFontSize(container)
  } else {
    return num
  }
}
