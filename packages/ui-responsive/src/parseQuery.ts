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

/**
 * ---
 * category: utilities/layout
 * ---
 *
 * Given a query and an element, return a function that takes
 * size as an argument and returns an object consisting of
 * query names and a boolean true false if it matches.
 *
 * @param {Object} query - an object consisting of query names
 *  mapped to individual queries
 * @param {ReactComponent|DomNode} el - component or DOM node
 * @returns {function} takes size {width, height} as an argument
 *  and returns an object consisting of query names and boolean
 *  true false if it matches
 */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'query' implicitly has an 'any' type.
function parseQuery(query, el) {
  // @ts-expect-error ts-migrate(7034) FIXME: Variable 'rules' implicitly has type 'any[]' in so... Remove this comment to see the full error message
  const rules = []

  Object.keys(query).forEach((selectorName) => {
    const { minWidth, maxWidth, minHeight, maxHeight } = query[selectorName]
    rules.push([
      selectorName,
      {
        minWidth: px(minWidth, el) || 0,
        maxWidth: px(maxWidth, el) || Infinity,
        minHeight: px(minHeight, el) || 0,
        maxHeight: px(maxHeight, el) || Infinity
      }
    ])
  })

  // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'width' implicitly has an 'any' ty... Remove this comment to see the full error message
  return function ({ width, height }) {
    const selectorMap = {}

    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'rules' implicitly has an 'any[]' type.
    rules.forEach((rule) => {
      const [selectorName, { minWidth, maxWidth, minHeight, maxHeight }] = rule
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
