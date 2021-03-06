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
import { BreakpointQueries, ValidQueryKey } from './QueryType'

/**
 * An object consisting of query names and boolean true false if it matches
 */
type MatchingQueries = Record<string, boolean>

type Size = {
  width: number
  height: number
}

/**
 * ---
 * category: utilities/layout
 * ---
 *
 * Given a query and an element, return a function that takes
 * size as an argument and returns an object consisting of
 * query names and a boolean true false if it matches.
 * @module parseQuery
 * @param {Object} query - an object consisting of query names
 *  mapped to individual queries
 * @param {Document | Window | Node | null} el - component or DOM node
 * @returns {function} takes size {width, height} as an argument
 *  and returns an object consisting of query names and boolean
 *  true false if it matches
 */
function parseQuery(
  query: BreakpointQueries,
  el?: Document | Window | Node | null
) {
  const rules: Record<string, Record<ValidQueryKey, number>> = {}

  // converting values to numerical values and adding initial values to all query keys
  Object.keys(query).forEach((selectorName) => {
    const { minWidth, maxWidth, minHeight, maxHeight } = query[selectorName]
    rules[selectorName] = {
      minWidth: (minWidth && px(minWidth, el)) || 0,
      maxWidth: (maxWidth && px(maxWidth, el)) || Infinity,
      minHeight: (minHeight && px(minHeight, el)) || 0,
      maxHeight: (maxHeight && px(maxHeight, el)) || Infinity
    }
  })

  return function ({ width, height }: Size) {
    const selectorMap: MatchingQueries = {}

    Object.entries(rules).forEach(([selectorName, query]) => {
      const { minWidth, maxWidth, minHeight, maxHeight } = query

      selectorMap[selectorName] =
        minWidth <= width &&
        width <= maxWidth &&
        minHeight <= height &&
        height <= maxHeight
    })

    return selectorMap
  }
}

export default parseQuery
export { parseQuery }
export type { Size }
