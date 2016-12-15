import getDisplayName from './getDisplayName'
import ReactDOM from 'react-dom'
import { ownerWindow } from 'dom-helpers'

export function origin (node) {
  const ownWindow = ownerWindow(node)

  const { location } = ownWindow

  // see https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
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

const windowMessageListener = function (messageHandler, validSource) {
  return function (ComposedComponent) {
    return class extends ComposedComponent {

      static displayName = getDisplayName(ComposedComponent)

      componentDidMount () {
        const win = ownerWindow(ReactDOM.findDOMNode(this))

        win.addEventListener('message', this.handleMessage, false)

        if (super.componentDidMount) {
          super.componentDidMount()
        }
      }

      componentWillUnmount () {
        const win = ownerWindow(ReactDOM.findDOMNode(this))
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
        if (this.sourceIsValid(e.source) && e.origin === origin(ReactDOM.findDOMNode(this)) && e.data) {
          messageHandler.call(this, e.data)
        }
      }
    }
  }
}

windowMessageListener.postMessage = function (target, message, origin) {
  target.postMessage(message, origin)
}

export default windowMessageListener
