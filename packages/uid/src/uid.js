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

const dictionary = 'getRandomVcryp0123456789bfhijklqsuvwxzABCDEFGHIJKLMNOPQSTUWXYZ'
const dictionaryLengthMinus1 = dictionary.length - 1

/**
 * ---
 * category: utilities
 * id: uid_doc
 * ---
 * Generate a unique (CSS-safe) id string
 *
 * @module uid
 * @param {String} prefix a string to prefix the id for debugging in non-production env
 * @param {Number} length id length (in characters, minus the prefix)
 * @returns {String} a unique id
 */
function uid (prefix = '', length = 12) {
  const id = `u${_uid('', length - 1)}`
  if (prefix && process.env.NODE_ENV !== 'production') {
    return `${prefix}__${id}`
  } else {
    return id
  }
}

function _random (size) {
  const result = []
  while (0 < size--) { /* eslint-disable-line no-param-reassign */
    result.push(Math.floor(Math.random() * 256))
  }
  return result
}


function _uid(_ignored, idLength = 12) {
  var id = ''
  var bytes = _random(idLength)
  while (0 < idLength--) { /* eslint-disable-line no-param-reassign */
    id += dictionary[bytes[idLength] & dictionaryLengthMinus1]
  }
  return id
}

export default uid
export { uid }
