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
 * Deep merge N objects into a single result object.
 * Merging creates a new object, so that none of the arguments are modified.
 *
 * @param {Object} arguments objects to merge
 * @returns {Object} a new object with items from all arguments
 */
export default function mergeDeep () {
  const args = [...arguments]
  let target = {}

  args.forEach((arg) => {
    target = mergeSourceIntoTarget(target, arg)
  })

  return target
}

function mergeSourceIntoTarget (target, source) {
  if (isObject(source)) {
    const keys = [ ...Object.keys(source), ...Object.getOwnPropertySymbols(source) ]
    const merged = { ...target }

    keys.forEach((key) => {
      if (isObject(target[key]) && isObject(source[key])) {
        merged[key] = mergeSourceIntoTarget(target[key], source[key])
      } else if (isArray(source[key]) && isArray(target[key])) {
        merged[key] = [...new Set([...target[key], ...source[key]])]
      } else if (isArray(target[key])) {
        merged[key] = [...new Set([...target[key], ...[source[key]]])]
      } else {
        merged[key] = source[key]
      }
    })

    return merged
  } else {
    return {...target}
  }
}

function isObject (item) {
  return (item && (typeof item === 'object' || typeof item === 'function') && !Array.isArray(item))
}

function isArray (item) {
  return (item && Array.isArray(item))
}
