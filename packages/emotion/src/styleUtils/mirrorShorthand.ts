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
 * category: utilities/themes
 * ---
 * @module mirrorShorthand
 */

/**
 * Mirror shorthand CSS properties for bidirectional text
 *
 * Given a string representing a CSS shorthand for edges,
 * swaps the values such that 4 value syntax is RTL instead
 * of LTR.
 *
 * See the following for further reference:
 * https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties
 *
 * @param {String} values - space delimited string values representing a CSS shorthand
 * @returns {String} a space delimited CSS shorthand string converted to RTL
 */
function mirrorShorthandEdges(values: string) {
  if (typeof values !== 'string') {
    return
  }

  const valuesArr = values.split(' ')
  if (valuesArr.length === 4) {
    // swap the 2nd and 4th values
    ;[valuesArr[1], valuesArr[3]] = [valuesArr[3], valuesArr[1]]
  }

  return valuesArr.join(' ')
}

/**
 * Convert shorthand CSS properties for corners to rtl
 *
 * Given a string representing a CSS shorthand for corners,
 * swaps the values such that 2,3 and 4 value syntax is rtl
 * instead of ltr.
 *
 * See the following for further reference:
 * https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties
 *
 * @param {String} values - space delimited string values representing a CSS shorthand
 * @returns {String} a space delimited CSS shorthand string converted to RTL
 */
function mirrorShorthandCorners(values: string) {
  if (typeof values !== 'string') {
    return
  }

  const valuesArr = values.split(' ')
  if (valuesArr.length === 2) {
    // swap the 1st and 2nd values
    ;[valuesArr[0], valuesArr[1]] = [valuesArr[1], valuesArr[0]]
  }

  if (valuesArr.length === 3) {
    // convert 3 value syntax to 4 value syntax
    valuesArr.push(valuesArr[1])
  }

  if (valuesArr.length === 4) {
    ;[valuesArr[0], valuesArr[1], valuesArr[2], valuesArr[3]] = [
      valuesArr[1],
      valuesArr[0],
      valuesArr[3],
      valuesArr[2]
    ]
  }

  return valuesArr.join(' ')
}

export { mirrorShorthandEdges, mirrorShorthandCorners }
