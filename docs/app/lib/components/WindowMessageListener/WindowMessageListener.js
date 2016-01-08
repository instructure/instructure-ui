import React, {PropTypes, Component} from 'react'
import window from 'global/window'

const origin = (function () {
  const { location } = window

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
})()

export default class WindowMessageListener extends Component {
  static propTypes = {
    sourceName: PropTypes.string,
    onReceiveMessage: PropTypes.func,
    children: PropTypes.node
  };

  static defaultProps = {
    onReceiveMessage: function () {}
  };

  static postMessage (target, message) {
    target.postMessage(message, origin)
  };

  componentDidMount () {
    window.addEventListener('message', this.handleMessage.bind(this), false)
  }

  componentWillUnmount () {
    window.removeEventListener('message', this.handleMessage, false)
  }

  sourceIsValid (eventSource) {
    if (!this.props.sourceName) {
      return true
    } else {
      const sourceFrame = eventSource.frameElement
      const sourceName = sourceFrame ? sourceFrame.getAttribute('name') : null
      return sourceName === this.props.sourceName
    }
  }

  handleMessage (e) {
    if (this.sourceIsValid(e.source) && e.origin === origin && e.data) {
      this.props.onReceiveMessage(e.data)
    }
  }

  render () {
    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    )
  }
}
