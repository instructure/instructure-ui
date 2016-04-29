// Based on https://github.com/joelburget/react-live-editor/blob/master/live-compile.jsx
import React, { Component, PropTypes } from 'react'
import WindowMessageListener from '../WindowMessageListener'
import shortid from 'shortid'
import classnames from 'classnames'

import { Modal } from 'react-overlays'
import Button from '../Button'
import { ScreenReaderContent } from 'instructure-ui'

import styles from './ComponentPreview.css'

export default class ComponentPreview extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    isFullScreen: PropTypes.bool,
    onMinimize: PropTypes.func
  };

  static defaultProps = {
    isFullScreen: false,
    onMinimize: function () {}
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

  componentDidUpdate () {
    this.renderPreview()
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

  handleMinimize = () => {
    this.props.onMinimize()
  };

  renderPreview = () => {
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
  };

  renderMinimizeButton () {
    return (
      <span className={styles.button}>
        <Button onClick={this.handleMinimize}>
          <ScreenReaderContent>Minimize</ScreenReaderContent>
          <svg className={styles.icon}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em" height="1.5em">
            <path fill="none" d="M0 0h24v24H0z" />
            <g fill="currentColor">
              <path d="M2 2h15v4h2V2c0-1.102-.897-2-2-2H2C.897 0 0 .898 0 2v15c0 1.103.897 2 2 2h4v-2H2V2z" />
              <path d="M10 12h6v2h-6z" />
              <path d="M21.207 19.793l-3.322-3.322C18.585 15.49 19 14.295 19
              13c0-3.31-2.69-6-6-6s-6 2.69-6 6 2.69 6 6 6c1.294 0 2.49-.416
              3.47-1.115l3.323 3.32 1.414-1.412zM9 13c0-2.206 1.794-4 4-4s4 1.794 4 4-1.794 4-4 4-4-1.794-4-4z" />
            </g>
          </svg>
        </Button>
      </span>
    )
  }

  render () {
    const { isFullScreen, name } = this.props
    const classes = {
      [styles.root]: true,
      [styles['is-fullscreen']]:  isFullScreen
    }
    // TODO: open example in new page/tab

    const iframe = (
      <WindowMessageListener
        sourceName={this.frameName}
        onReceiveMessage={this.handleMessage}
        className={classnames(classes)}>
        <iframe ref="frame"
          className={styles.frame}
          name={this.frameName}
          title={name + ' Example'}
          src={'example.html'}></iframe>
      </WindowMessageListener>
    )

    return isFullScreen ? (
      <Modal
        backdrop={false}
        container={document.body}
        show
        className={styles.modal}
        onEscapeKeyUp={this.handleMinimize}>
        <div>
          {this.renderMinimizeButton()}
          {iframe}
        </div>
      </Modal>
    ) : iframe
  }
} // 'examples/components/' + this.props.name + '.html'
