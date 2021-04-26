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

import { parseUnit } from './parseUnit'

/**
 * ---
 * category: utilities
 * ---
 * Converts a unit value time combination (s, ms) to a number representing ms
 *
 * @module ms
 *
 * Example inputs:
 *  - '100s'
 *  - '20ms'
 *
 * @param {String} val
 * @returns {Number} Returns numerical representation of milliseconds
 */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'val' implicitly has an 'any' type.
function ms(val) {
  if (!val || typeof val === 'number') {
    return val
  }

  const [num, unit] = parseUnit(val)

  if (unit === 'ms') {
    return num
  } else if (unit === 's') {
    // @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
    return num * 1000
  } else {
    return num
  }
}

export default ms
export { ms }
