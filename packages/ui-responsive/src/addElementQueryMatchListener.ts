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
import { parseQuery } from './parseQuery'

import { findDOMNode, getBoundingClientRect } from '@instructure/ui-dom-utils'
import { debounce } from '@instructure/debounce'

/**
 * ---
 * category: utilities/layout
 * ---
 * Given an object of named queries, listens for changes in the
 * element size and notifies which queries match via a function
 * callback. The callback method is only called when the query
 * matches change, not on all element resizes. (If you are looking
 * to call a method on all element resizes use
 * [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) instead)
 *
 *
 * This function shares an interface with
 * [addMediaQueryMatchListener](#addMediaQueryMatchListener)
 * so that they can be used interchangeably.
 *
 * The [Responsive](#Responsive) component with the `match` prop
 * set to `element` utilizes this function. This is a low level
 * utility method and, in most cases, [Responsive](#Responsive)
 * should be used instead.
 *
 * ```js
 * class MyComponent extends Component {
 *   state = {
 *     matches: []
 *   }
 *
 *   _listener = null
 *
 *   componentDidMount () {
 *     const query = {myFirstQuery: { minWidth: 100 }, mySecondQuery: { maxHeight: '30rem'}}
 *     const el = findDOMNode(this)
 *
 *     this._listener = addElementQueryMatchListener(query, el, this.updateMatches)
 *   }
 *
 *   componentWillUnmount () {
 *     if (this._listener) {
 *       this._listener.remove()
 *     }
 *   }
 *
 *   updateMatches = (matches) => {
 *     this.setState({ matches })
 *   }
 *   ...
 * }
 * ```
 * @module addElementQueryMatchListener
 * @param {Object} query - object consisting of names and query objects
 * @param {ReactComponent|DomNode} el - a DOM node or a function returning a DOM node
 * @param {function} cb - called with an array of the names of the currently
 * matching queries whenever a matching query changes
 * @returns {function} remove() function to call to remove the listener
 */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'query' implicitly has an 'any' type.
function addElementQueryMatchListener(query, el, cb) {
  const node = typeof el === 'function' ? el() : el
  const { width, height } = getBoundingClientRect(node)

  // @ts-expect-error ts-migrate(7034) FIXME: Variable 'matches' implicitly has type 'any[]' in ... Remove this comment to see the full error message
  let matches = []

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'size' implicitly has an 'any' type.
  const update = (size) => {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any[]' is not assignable to para... Remove this comment to see the full error message
    const newMatches = updateElementMatches(query, node, matches, size)
    if (newMatches) {
      matches = newMatches
      cb(matches)
    }
  }

  const debounced = debounce(update, 100, { leading: false, trailing: true })
  const elementResizeListener = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width: newWidth, height: newHeight } = entry.contentRect

      if (width !== newWidth) {
        debounced({ width: newWidth, height: newHeight })
      }
    }
  })

  elementResizeListener.observe(node)

  update({ width, height })

  return {
    remove() {
      if (elementResizeListener) {
        elementResizeListener.disconnect()
      }

      if (debounced) {
        debounced.cancel()
      }
    }
  }
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'query' implicitly has an 'any' type.
function updateElementMatches(query, el, matches = [], size) {
  const node = findDOMNode(el)
  const { width, height } = size || getBoundingClientRect(node)
  const matchingQueries = parseQuery(query, node)({ width, height })
  const newMatches = Object.keys(matchingQueries)
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    .filter((key) => matchingQueries[key])
    .map((key) => key)

  // only return matches if they have changed
  if (matches.length !== newMatches.length) {
    return newMatches
  }
  if (matches.filter((match) => newMatches.indexOf(match) === -1).length > 0) {
    return newMatches
  }

  return null
}

export default addElementQueryMatchListener
export { addElementQueryMatchListener, updateElementMatches }
