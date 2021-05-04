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
import { matchMedia as defaultMatchMedia } from '@instructure/ui-dom-utils'

import { jsonToMediaQuery } from './jsonToMediaQuery'

/**
 * ---
 * category: utilities/layout
 * ---
 * Given an object of named queries, listens for changes in the
 * window size and notifies which queries match via a function
 * callback. The callback method is only called when the query
 * matches change, not on all window resizes.
 *
 * This function shares an interface with
 * [addElementQueryMatchListener](#addElementQueryMatchListener)
 * so that they can be used interchangeably.
 *
 * The [Responsive](#Responsive) component with the `match` prop
 * set to `media` utilizes this function. This is a low level utility
 * method and, in most cases, [Responsive](#Responsive) should be
 * used instead.
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
 *     this._listener = addMediaQueryMatchListener(query, el, this.updateMatches)
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
 * @module addMediaQueryMatchListener
 * @param {Object} query - object consisting of names and query objects
 * @param {ReactComponent|DomNode} el - a DOM node or a function returning a DOM node
 * @param {function} cb - called with an array of the names of the currently
 * matching queries whenever a matching query changes
 * @returns {function} remove() function to call to remove the listener
 */
function addMediaQueryMatchListener(
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'query' implicitly has an 'any' type.
  query,
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
  el,
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cb' implicitly has an 'any' type.
  cb,
  matchMedia = defaultMatchMedia
) {
  const node = typeof el === 'function' ? el() : el

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'mediaQueryLists' implicitly has an 'any... Remove this comment to see the full error message
  const updateMediaMatches = (mediaQueryLists) => {
    const matches = Object.keys(mediaQueryLists)
      .filter((key) => mediaQueryLists[key].matches)
      .map((key) => key)

    cb(matches)
  }

  const mediaQueryLists = {}

  const listenerCallback = () => {
    updateMediaMatches(mediaQueryLists)
  }

  Object.keys(query).forEach((key) => {
    const mediaQueryList = matchMedia(jsonToMediaQuery(query[key], node), node)
    mediaQueryList.addListener(listenerCallback)
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    mediaQueryLists[key] = mediaQueryList
  })
  updateMediaMatches(mediaQueryLists)

  return {
    remove() {
      if (mediaQueryLists) {
        Object.keys(mediaQueryLists).forEach((key) => {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          mediaQueryLists[key].removeListener(listenerCallback)
        })
      }
    }
  }
}

export default addMediaQueryMatchListener
export { addMediaQueryMatchListener }
