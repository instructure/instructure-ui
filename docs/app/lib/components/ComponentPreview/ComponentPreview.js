// Based on https://github.com/joelburget/react-live-editor/blob/master/live-compile.jsx
import React, { Component, PropTypes } from 'react'
import MessageListener from '../MessageListener'

import styles from './ComponentPreview.css'

export default class ComponentPreview extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired
  }

  constructor (props) {
    super()
    this.state = {
      frameIsLoaded: false
    }
  }

  componentDidMount () {
    this.renderPreview()
  }

  componentDidUpdate (prevProps) {
    if (this.props.code !== prevProps.code) {
      this.renderPreview()
    }
  }

  handleMessage (message) {
    if (message && message.isMounted) {
      this.setState({
        frameIsLoaded: true
      })
    }
  }

  renderPreview () {
    if (this.state.frameIsLoaded) {
      MessageListener.postMessage(this.refs.frame.contentWindow, {
        code: this.props.code
      })
    } else {
      setTimeout(this.renderPreview.bind(this), 0)
    }
  }

  render () {
    return (
      <MessageListener
        onReceiveMessage={this.handleMessage.bind(this)}>
        <iframe className={styles.frame} ref="frame" src="example.html"></iframe>
      </MessageListener>
    )
  }
}
