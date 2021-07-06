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
import React from 'react'

import { parseQuery, Size } from './parseQuery'

import { findDOMNode, getBoundingClientRect } from '@instructure/ui-dom-utils'
import { debounce } from '@instructure/debounce'

import { BreakpointQueries, QueriesMatching } from './QueryType'

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
 * @param {Node|Window|React.ReactElement|React.Component|function} el - a DOM node or a function returning a DOM node
 * @param {function} cb - called with an array of the names of the currently
 * matching queries whenever a matching query changes
 * @returns {function} remove() function to call to remove the listener
 */
function addElementQueryMatchListener(
  query: BreakpointQueries,
  el:
    | Node
    | Window
    | React.ReactElement
    | React.Component
    | ((
        ...args: any[]
      ) => Node | Window | React.ReactElement | React.Component),
  cb: (queriesMatching: QueriesMatching) => any
): { remove(): void } {
  const node = typeof el === 'function' ? el() : el
  const { width, height } = getBoundingClientRect(node)

  let matches: QueriesMatching = []

  const update = (size: Size) => {
    const newMatches = updateElementMatches(query, node, matches, size)
    if (newMatches) {
      matches = newMatches
      cb(matches)
    }
    return
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

  elementResizeListener.observe(node as Element)

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

function updateElementMatches(
  query: BreakpointQueries,
  el?:
    | Node
    | Window
    | React.ReactElement
    | React.Component
    | ((...args: any[]) => any),
  matches: string[] = [],
  size?: Size
): QueriesMatching | null {
  const node = findDOMNode(el)
  const { width, height } = size || getBoundingClientRect(node)
  const matchingQueries = parseQuery(query, node)({ width, height })
  const newMatches = Object.keys(matchingQueries)
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
