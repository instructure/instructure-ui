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
import { px } from '@instructure/ui-utils'

import { Query, ValidQueryKey } from './QueryType'
import React from 'react'

/**
 * ---
 * category: utilities/layout
 * ---
 *
 * Given a valid json query object, converts it to a standard media query
 * string. Valid queries should be an object consisting of exactly one of
 * the following `minWidth`, `maxWidth`, `minHeight`, or `maxHeight` and
 * a value as a string or number.
 *
 * Example input
 * ```js
 * { minWidth: 350 }
 * ```
 * Example output
 * ```js
 * '(min-width: 350px)'
 * ```
 * @module jsonToMediaQuery
 * @param {Object} query - an object consisting of the query type and value
 * @param {Document | Window | Node | React.ReactElement | React.Component} el - component or DOM node which will be passed to the pixel conversion if the unit type is `em`
 * @returns {string} media query string
 */
function jsonToMediaQuery(
  query: Query,
  el?: Document | Window | Node | React.ReactElement | React.Component
) {
  // Ensure the query is of the correct form
  const keys = Object.keys(query) as Array<keyof typeof query>
  if (keys.length !== 1) {
    throw new Error('Expected exactly one key in query object.')
  }

  const key = keys[0]

  const validKeys: ValidQueryKey[] = [
    'minHeight',
    'maxHeight',
    'minWidth',
    'maxWidth'
  ]

  if (validKeys.indexOf(key) === -1) {
    throw new Error(
      `Invalid key \`${key}\` in query object. Valid keys should consist of one of the following: ` +
        `${validKeys.join(', ')} (case sensitive)`
    )
  }

  const value = query[key]

  // TS catches this, but we want to throw error in runtime too
  if (typeof value !== 'string' && typeof value !== 'number') {
    throw new Error('The value of the query object must be a string or number.')
  }

  if (!value) {
    throw new Error('No value supplied for query object')
  }

  return `(${hyphenateQueryKey(key)}: ${px(value, el)}px)`
}

function hyphenateQueryKey(key: ValidQueryKey) {
  const lowerCaseKey = key.toLowerCase()
  return lowerCaseKey.slice(0, 3) + '-' + lowerCaseKey.slice(3)
}

export default jsonToMediaQuery
export { jsonToMediaQuery }
