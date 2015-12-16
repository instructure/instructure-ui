// Based on https://github.com/joelburget/react-live-editor/blob/master/live-compile.jsx
import React, { Component, PropTypes } from 'react'
import MessageListener from '../MessageListener'
import _ from 'lodash'
import classnames from 'classnames'

import styles from './ComponentPreview.css'

export default class ComponentPreview extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired
  }

  constructor (props) {
    super()
    this.state = {
      frameIsLoaded: false,
      isFullScreen: false
    }
    this.frameName = _.uniqueId('frame_')
  }

  componentDidMount () {
    this.renderPreview()
  }

  componentDidUpdate (prevProps) {
    if (this.props.code !== prevProps.code) {
      this.renderPreview()
    }
  }

  handleToggle = () => {
    this.setState({
      isFullScreen: !this.state.isFullScreen
    })
  }

  handleMessage (message) {
    if (message && message.isMounted) {
      this.setState({
        frameIsLoaded: true
      })
    }
    if (message && message.contentHeight) {
      this.refs.frame.height = message.contentHeight
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
    const buttonText = this.state.isFullScreen ? 'Minimize' : 'Full Screen'
    const classes = {
      [styles.fullscreen]:  this.state.isFullScreen
    }
    // TODO: use a modal here
    return (
      <MessageListener
        sourceName={this.frameName}
        onReceiveMessage={this.handleMessage.bind(this)}
        className={classnames(classes)}>
        <button className={styles.button} type="button" onClick={this.handleToggle}>
          { buttonText }
        </button>
        <iframe ref="frame"
          className={styles.frame}
          name={this.frameName}
          src="example.html"></iframe>
      </MessageListener>
    )
  }
}
