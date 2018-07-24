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

//  based on: https://github.com/ai/nanoid/blob/master/non-secure.js

const dictionary = '_getRandomVcryp0123456789bfhijklqsuvwxzABCDEFGHIJKLMNOPQSTUWXYZ'
const dictionaryLengthMinus1 = dictionary.length - 1

function random (size) {
  const result = []
  while (0 < size--) { /* eslint-disable-line no-param-reassign */
    result.push(Math.floor(Math.random() * 256))
  }
  return result
}

/**
 * ---
 * category: utilities
 * ---
 * Generate a unique id. For valid HTML element IDs use [generateElementId](#generateElementId)
 *
 * @module uid
 * @param {String} _ignored this param is ignored but left here so as not to introduce a breaking change in the function signature
 * @param {Number} idLength id length
 * @returns {String} a unique id
 */
export default function uid(_ignored, idLength = 12) {
  var id = ''
  var bytes = random(idLength)
  while (0 < idLength--) { /* eslint-disable-line no-param-reassign */
    id += dictionary[bytes[idLength] & dictionaryLengthMinus1]
  }
  return id
}
