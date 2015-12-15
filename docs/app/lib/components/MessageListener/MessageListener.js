import React, {PropTypes, Component} from 'react'

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

export default class MessageListener extends Component {
  static propTypes = {
    onReceiveMessage: PropTypes.func,
    children: PropTypes.node
  }

  static defaultProps = {
    onReceiveMessage: function () {}
  }

  static postMessage (target, message) {
    target.postMessage(message, origin)
  }

  componentDidMount () {
    window.addEventListener('message', this.handleMessage.bind(this), false)
  }

  componentWillUnmount () {
    window.removeEventListener('message', this.handleMessage, false)
  }

  handleMessage (e) {
    if (e.origin === origin && e.data) {
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
