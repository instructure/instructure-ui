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
import { decorator } from '@instructure/ui-decorator'
import { ownerWindow } from '@instructure/ui-dom-utils'

/**
 * ---
 * category: utilities/react
 * ---
 * A decorator or higher order component that provides methods
 * for cross-origin communication (between iframes/windows).
 *
 * see https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 * @module windowMessageListener
 * @param {Function} messageHandler a handler for messages recieved by the component
 * @param {Function} validSource an optional function that would restrict message handling to a specified source.
 * @returns {Function} a function that decorates a React component with the behavior
 */
const windowMessageListener = decorator(
  (ComposedComponent, messageHandler, validSource) => {
    return class extends ComposedComponent {
      static postMessage = function (target, message, origin) {
        target.postMessage(message, origin)
      }

      componentDidMount() {
        const win = ownerWindow(this)

        win.addEventListener('message', this.handleMessage, false)

        if (super.componentDidMount) {
          super.componentDidMount()
        }
      }

      componentWillUnmount() {
        const win = ownerWindow(this)
        win.removeEventListener('message', this.handleMessage, false)

        if (super.componentDidMount) {
          super.componentDidMount()
        }
      }

      sourceIsValid(eventSource) {
        const expectedSource =
          typeof validSource === 'function'
            ? validSource.call(this)
            : validSource
        if (!expectedSource) {
          return true
        } else if (eventSource) {
          const sourceFrame = eventSource.frameElement
          const sourceName = sourceFrame
            ? sourceFrame.getAttribute('name')
            : null
          return sourceName === expectedSource
        } else {
          return false
        }
      }

      handleMessage = (e) => {
        if (
          this.sourceIsValid(e.source) &&
          e.origin === origin(this) &&
          e.data
        ) {
          messageHandler.call(this, e.data)
        }
      }
    }
  }
)

/**
 * Return the origin of the owner window of the DOM element
 *
 * see https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 *
 * @param {DOMElement} node
 * @returns {String} the origin
 */
function origin(node) {
  const ownWindow = ownerWindow(node)

  const { location } = ownWindow

  if (location.protocol === 'file:') {
    return '*'
  } else if (location.origin) {
    return location.origin
  } else if (location.port) {
    return `${location.protocol}//${location.hostname}:${location.port}`
  } else {
    return `${location.protocol}//${location.hostname}`
  }
}

export default windowMessageListener
export { origin, windowMessageListener }
