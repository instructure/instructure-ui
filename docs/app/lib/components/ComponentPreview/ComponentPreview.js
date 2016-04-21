// Based on https://github.com/joelburget/react-live-editor/blob/master/live-compile.jsx
import React, { Component, PropTypes } from 'react'
import WindowMessageListener from '../WindowMessageListener'
import shortid from 'shortid'
import classnames from 'classnames'

import styles from './ComponentPreview.css'

export default class ComponentPreview extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    isFullScreen: PropTypes.bool
  };

  static defaultProps = {
    isFullScreen: false
  };

  constructor (props) {
    super()
    this.state = {
      frameIsLoaded: false
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

  handleMessage = (message) => {
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
    const classes = {
      [styles.root]: true,
      [styles['is-fullscreen']]:  this.props.isFullScreen
    }
    // TODO: open example in new page/tab

    return (
      <WindowMessageListener
        sourceName={this.frameName}
        onReceiveMessage={this.handleMessage}
        className={classnames(classes)}>
        <iframe ref="frame"
          className={styles.frame}
          name={this.frameName}
          title={this.props.name + ' Example'}
          src={'example.html'}></iframe>
      </WindowMessageListener>
    )
  }
} // 'examples/components/' + this.props.name + '.html'
