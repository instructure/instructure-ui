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


/**
 * ---
 * category: utilities
 * ---
 * Converts a CSS unit value combination into an array of type [ value, unit ]
 *
 * @module parseUnit
 *
 * Example inputs:
 *  - '100px'
 *  - '20rem'
 *  - '10vh'
 *  - '400vmin'
 *
 * @param {string} str
 * @returns {Array} Returns array of shape [ value, unit ]
*/

export default function parseUnit (str) {
  const value = `${str}`
  return [
    parseFloat(value, 10),
    // eslint-disable-next-line no-useless-escape
    value.match(/[\d.\-\+]*\s*(.*)/)[1] || ''
  ]
}
