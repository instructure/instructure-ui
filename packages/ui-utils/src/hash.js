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

import stringify from 'json-stable-stringify'

function toBase64 (input) {
  const tab = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  let output = ''
  const length = input.length
  let triplet

  const b64pad = '='

  for (let i = 0; i < length; i += 3) {
    triplet = (input.charCodeAt(i) << 16) | (i + 1 < length ? input.charCodeAt(i + 1) << 8 : 0) | (i + 2 < length ? input.charCodeAt(i + 2) : 0)

    for (let j = 0; j < 4; j += 1) {
      if (i * 8 + j * 6 > input.length * 8) {
        output += b64pad
      } else {
        output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F)
      }
    }
  }

  return output
}

function executeHash (input) {
  let hash = 0

  if (input.length === 0) return hash

  for (let i = 0; i < input.length; i++) {
    const c = input.charCodeAt(i)
    hash = ((hash << 5) - hash) + c
    hash |= 0 // Convert to 32bit integer
  }

  return toBase64(String(hash))
}

function hash (value, maxLength) {
  if (typeof value === 'undefined') {
    throw new Error('Cannot hash a value which is undefined')
  }

  let hashedValue = ''
  let valueToHash = value

  if (typeof valueToHash !== 'string') {
    if (typeof valueToHash === 'object') {
      // Ensure we are robust to things like objects that are identical, but with keys in diff orders
      valueToHash = stringify(valueToHash)
    } else {
      valueToHash = valueToHash.toString()
    }
  }

  hashedValue = executeHash(valueToHash)

  if (maxLength) {
    hashedValue = hashedValue.slice(0, maxLength)
  }

  return hashedValue
}

export default hash
export { hash }
