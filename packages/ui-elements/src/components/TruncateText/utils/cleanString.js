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
 * parent: TruncateText
 * ---
 * Removes given characters, such as whitespace and punctuation, from either end of a string.
 *
 * @param {string} string The string to clean.
 * @param {string[]} ignore Array of characters to remove.
 * @param {boolean} start Whether or not to clean start of string.
 * @param {boolean} end Whether or not to clean end of string.
 * @param {boolean} repeat=false Do a thorough clean.
 */
export default function cleanString (string, ignore, start = true, end = true, repeat = false) {
  let text = string
  let firstChar = text.charAt(0)
  let lastChar = text.slice(-1)

  if (start && ignore.indexOf(firstChar) !== -1) {
    text = text.slice(1)
  }

  if (end && ignore.indexOf(lastChar) !== -1) {
    text = text.slice(0, -1)
  }

  if (repeat) {
    text = cleanString(text, ignore, start, end, false)
  }

  return text
}
