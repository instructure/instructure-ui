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

//  based on: https://github.com/ai/nanoid/blob/main/non-secure/index.js

const dictionary =
  'getRandomVcryp0123456789bfhijklqsuvwxzABCDEFGHIJKLMNOPQSTUWXYZ'
const dictionaryLengthMinus1 = dictionary.length - 1

/**
 * ---
 * category: utilities/utils
 * ---
 * Generate a unique (CSS-safe) id string
 *
 * @module uid
 * @param {String} prefix a string to prefix the id for debugging in non-production env
 * @param {Number} length id length (in characters, minus the prefix). Default is 12
 * @returns {String} a unique id
 */
function uid(prefix = '', length = 12) {
  const id = `u${_uid(length - 1)}`
  if (prefix && process.env.NODE_ENV !== 'production') {
    return `${prefix}__${id}`
  } else {
    return id
  }
}

function _random(size: number) {
  const result = []
  /* eslint-disable-next-line no-param-reassign */
  while (0 < size--) {
    // `| 0` is faster than `Math.floor()`.
    result.push((Math.random() * 256) | 0)
  }
  return result
}

function _uid(idLength: number) {
  let id = ''
  const bytes = _random(idLength)
  /* eslint-disable-next-line no-param-reassign */
  while (0 < idLength--) {
    id += dictionary[bytes[idLength] & dictionaryLengthMinus1]
  }
  return id
}

export default uid
export { uid }
