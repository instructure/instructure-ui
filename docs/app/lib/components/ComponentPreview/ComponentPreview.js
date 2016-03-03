// Based on https://github.com/joelburget/react-live-editor/blob/master/live-compile.jsx
import React, { Component, PropTypes } from 'react'
import WindowMessageListener from '../WindowMessageListener'
import shortid from 'shortid'
import classnames from 'classnames'

import styles from './ComponentPreview.css'

export default class ComponentPreview extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired
  };

  constructor (props) {
    super()
    this.state = {
      frameIsLoaded: false,
      isFullScreen: false
    }
    this.frameName = 'ComponentPreviewExample_' + shortid.generate()
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
  };

  handleMessage (message) {
    if (message && message.isMounted) {
      this.setState({
        frameIsLoaded: true
      })
    }
    if (message && message.contentHeight) {
      this.refs.frame.height = message.contentHeight
    }
  };

  renderPreview () {
    if (!this.refs.frame) {
      return
    }

    if (this.state.frameIsLoaded) {
      WindowMessageListener.postMessage(this.refs.frame.contentWindow, {
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
      <WindowMessageListener
        sourceName={this.frameName}
        onReceiveMessage={this.handleMessage.bind(this)}
        className={classnames(classes)}>
        <button className={styles.button} type="button" onClick={this.handleToggle}>
          { buttonText }
        </button>
        <iframe ref="frame"
          className={styles.frame}
          name={this.frameName}
          title={this.props.name + ' Example'}
          src={'example.html'}></iframe>
      </WindowMessageListener>
    )
  }
} // 'examples/components/' + this.props.name + '.html'
