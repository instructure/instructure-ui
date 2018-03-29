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
 * category: utilities/DOM
 * ---
 *
 * transformSelection - Calculate the resulting text selection
 * of a changing text-containing HTML element
 * @module transformSelection
 * @param {DomNode} element - HTML element with selection capabilities
 * @param {string} cleanedValue - new value that will be given to the HTML element
 * @return {Object} resulting selection values
 */
export default function transformSelection (element, cleanedValue) {
  const {
    selectionStart,
    selectionEnd,
    selectionDirection,
    value
  } = element

  return {
    selectionStart: transformCursor(selectionStart, value, cleanedValue),
    selectionEnd: transformCursor(selectionEnd, value, cleanedValue),
    selectionDirection
  }
}

/**
 * Calculate the resulting cursor position
 * within a string when some characters are removed
 *
 * @param {number} cursorIndex - original cursor index
 * @param {string} dirtyValue - original string
 * @param {string} cleanedValue - original string with some characters removed
 * @returns {number} resulting cursor index
 */
export function transformCursor (cursorIndex, dirtyValue, cleanedValue) {
  if (dirtyValue.length === cleanedValue.length) {
    return cursorIndex
  }
  if (cursorIndex === 0) {
    return 0
  }
  if (cursorIndex === dirtyValue.length) {
    return cleanedValue.length
  }

  return dirtyValue
    .split('')
    .slice(0, cursorIndex)
    .reduce((result, value) => {
      if (value === cleanedValue[result]) {
        return result + 1
      }
      return result
    }, 0)
}
