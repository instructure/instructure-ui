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

import PropTypes from 'prop-types'
import getDisplayName from './getDisplayName'
import findDOMNode from '../dom/findDOMNode'
import addResizeListener from '../dom/addResizeListener'
import debounce from '../debounce'
import px from '../px'

/**
 * ---
 * category: utilities/react
 * ---
 * A decorator or higher order component to provide the ability to style a
 * React component with container queries.
 *
 * The containerQuery HOC provides a `size` getter so that you can alter the behavior
 * of the component based on the size of its container.
 *
 * The `size` will be updated whenever the dimensions of the container change,
 * and will be passed as a parameter to the onSizeChange prop provided.
 *
 * So that CSS rules can be applied based on the dimensions of the container,
 * custom data attributes are added to the container DOM element.
 *
 * @param {Object} query
 * @returns {Function} a function that creates an element with containerQuery behavior
 */
export default function containerQuery (query) {
  const getSelectorMap = function (el) {
    return query && parseQuery(query, el)
  }

  return function (ComposedComponent) {
    return class extends ComposedComponent {
      static displayName = getDisplayName(ComposedComponent)
      static getSelectorMap = getSelectorMap

      static propTypes = {
        ...ComposedComponent.propTypes,
        onSizeChange: PropTypes.func
      }

      updateAttributes = (size) => {
        if (this._size && (this._size.width === size.width && this._size.height === size.height)) {
          return
        }

        this._size = size

        if (typeof this.props.onSizeChange === 'function') {
          this.props.onSizeChange(size)
        }

        const container = findDOMNode(this)

        if (typeof getSelectorMap(container) !== 'function') {
          return
        }
        const selectorMap = getSelectorMap(container)(size)

        // eslint-disable-next-line no-restricted-syntax
        for (const [selectorName, isOn] of toPairs(selectorMap)) {
          if (isOn) {
            container.setAttribute(`data-${selectorName}`, '')
          } else {
            container.removeAttribute(`data-${selectorName}`)
          }
        }
      }

      componentDidMount () {
        const node = findDOMNode(this)

        const size = {
          width: node.offsetWidth,
          height: node.offsetHeight
        }

        this._debounced = debounce(this.updateAttributes, 100, {leading: false, trailing: true})
        this._resizeListener = addResizeListener(node, this._debounced)

        this.updateAttributes(size)

        if (super.componentDidMount) {
          super.componentDidMount()
        }
      }

      componentWillUnmount () {
        if (this._resizeListener) {
          this._resizeListener.remove()
        }

        if (this._debounced) {
          this._debounced.cancel()
        }

        if (super.componentWillUnmount) {
          super.componentWillUnmount()
        }
      }

      get size () {
        return this._size
      }
    }
  }
}

function parseQuery (query, el) {
  const rules = []

  // eslint-disable-next-line no-restricted-syntax
  for (const [selectorName, {minWidth, maxWidth, minHeight, maxHeight}] of toPairs(query)) {
    rules.push([
      selectorName,
      {
        minWidth: px(minWidth, el) || 0,
        maxWidth: px(maxWidth, el) || Infinity,
        minHeight: px(minHeight, el) || 0,
        maxHeight: px(maxHeight, el) || Infinity
      }
    ])
  }

  return function ({width, height}) {
    const selectorMap = {}

    // eslint-disable-next-line no-restricted-syntax
    for (const [selectorName, {minWidth, maxWidth, minHeight, maxHeight}] of rules) {
      selectorMap[selectorName] = (
        minWidth <= width && width <= maxWidth &&
        minHeight <= height && height <= maxHeight
      )
    }

    return selectorMap
  }
}

function toPairs (obj) {
  return Object.keys(obj).map((key) => [key, obj[key]])
}
