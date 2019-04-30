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

import { addResizeListener, findDOMNode, getBoundingClientRect } from '@instructure/ui-dom-utils'
import { debounce } from '@instructure/debounce'

/**
 * ---
 * category: utilities/layout
 * ---
 * Given an object of named queries, listens for changes in the
 * element size and notifies which queries match via a function
 * callback. The callback method is only called when the query
 * matches change, not on all element resizes. (If you are looking
 * to call a method on all element resizes see
 * [addResizeListener](#addResizeListener) instead)
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
 *
 * @param {Object} query - object consisting of names and query objects
 * @param {ReactComponent|DomNode} el - component or DOM node
 * @param {function} cb - called with an array of the names of the currently
 * matching queries whenever a matching query changes
 * @returns {function} remove() function to call to remove the listener
 */
function addElementQueryMatchListener (query, el, cb) {
  const node = findDOMNode(el)
  let matches = []

  const updateElementMatches = (size) => {
    const matchingQueries = parseQuery(query, node)(size)
    const newMatches = Object.keys(matchingQueries)
      .filter(key => matchingQueries[key])
      .map(key => key)

    // we only call back if the matches have changed
    if (matches.length !== newMatches.length) {
      matches = newMatches
      cb(matches)
    }

    if (matches.filter(match => newMatches.indexOf(match) === -1).length > 0) {
      matches = newMatches
      cb(matches)
    }
  }

  const debounced = debounce(updateElementMatches, 100, { leading: false, trailing: true })
  const elementResizeListener = addResizeListener(node, debounced)
  const { width, height } = getBoundingClientRect(node)

  updateElementMatches({ width, height })

  return {
    remove () {
      if (elementResizeListener) {
        elementResizeListener.remove()
      }

      if (debounced) {
        debounced.cancel()
      }
    }
  }
}

export default addElementQueryMatchListener
export { addElementQueryMatchListener }
