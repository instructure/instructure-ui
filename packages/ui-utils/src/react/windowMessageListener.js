import getDisplayName from './getDisplayName'
import ownerWindow from '../dom/ownerWindow'
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
export default function windowMessageListener (messageHandler, validSource) {
  return function (ComposedComponent) {
    return class extends ComposedComponent {
      static displayName = getDisplayName(ComposedComponent)

      static postMessage = function (target, message, origin) {
        target.postMessage(message, origin)
      }

      componentDidMount () {
        const win = ownerWindow(this)

        win.addEventListener('message', this.handleMessage, false)

        if (super.componentDidMount) {
          super.componentDidMount()
        }
      }

      componentWillUnmount () {
        const win = ownerWindow(this)
        win.removeEventListener('message', this.handleMessage, false)

        if (super.componentDidMount) {
          super.componentDidMount()
        }
      }

      sourceIsValid (eventSource) {
        const expectedSource = (typeof validSource === 'function') ? validSource.call(this) : validSource
        if (!expectedSource) {
          return true
        } else if (eventSource) {
          const sourceFrame = eventSource.frameElement
          const sourceName = sourceFrame ? sourceFrame.getAttribute('name') : null
          return sourceName === expectedSource
        } else {
          return false
        }
      }

      handleMessage = (e) => {
        if (this.sourceIsValid(e.source) && e.origin === origin(this) && e.data) {
          messageHandler.call(this, e.data)
        }
      }
    }
  }
}

/**
 * Return the origin of the owner window of the DOM element
 *
 * see https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 *
 * @param {DOMElement} node
 * @returns {String} the origin
 */
export function origin (node) {
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
