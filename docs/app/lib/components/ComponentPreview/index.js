// Based on https://github.com/joelburget/react-live-editor/blob/master/live-compile.jsx
import React, { Component, PropTypes } from 'react'
import shortid from 'shortid'
import classnames from 'classnames'

import Button from '../Button'

import Modal, {ModalBody} from 'instructure-ui/lib/components/Modal'
import windowMessageListener, { origin } from 'instructure-ui/lib/util/windowMessageListener'

import ScreenReaderContent from 'instructure-ui/lib/components/ScreenReaderContent'
import ReactDOM from 'react-dom'

import styles from './ComponentPreview.css'

const DEFAULT_FRAME_HEIGHT = 70

const messageHandler = function (message) {
  try {
    if (message && message.isMounted && this.state) {
      this.setState({
        frameIsLoaded: true
      })
    }
    if (message && message.contentHeight && this._frame) {
      this._frame.height = message.contentHeight
    }
  } catch (e) {
    // TODO: prevent 'TypeErrors' in IE
  }
}

const sourceName = function () {
  return this._frameName
}

@windowMessageListener(messageHandler, sourceName)
export default class ComponentPreview extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    themeKey: PropTypes.string,
    variant: PropTypes.string,
    isFullScreen: PropTypes.bool,
    onMinimize: PropTypes.func
  }

  static defaultProps = {
    isFullScreen: false,
    onMinimize: function () {}
  }

  constructor (props) {
    super(props)
    this.state = {
      frameIsLoaded: false
    }
    this._frameName = 'ComponentPreviewExample_' + shortid.generate()
  }

  componentDidMount () {
    this.renderPreview()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.name !== this.props.name) {
      this._frame.height = DEFAULT_FRAME_HEIGHT
    }
    this.renderPreview()
  }

  handleMinimize = () => {
    this.props.onMinimize()
  }

  renderPreview = () => {
    if (!this._frame) {
      return
    }

    if (this.state.frameIsLoaded) {
      windowMessageListener.postMessage(this._frame.contentWindow, {
        code: this.props.code,
        variant: this.props.variant,
        themeKey: this.props.themeKey
      }, origin(ReactDOM.findDOMNode(this)))
    } else {
      window.setTimeout(this.renderPreview.bind(this), 0)
    }
  }

  renderMinimizeButton () {
    return (
      <span className={styles.button}>
        <Button onClick={this.handleMinimize} ref={(c) => { this._minimizeButton = c }}>
          <ScreenReaderContent>Minimize</ScreenReaderContent>
          <svg className={styles.icon}
            aria-hidden="true"
            width="1em" height="1em">
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

  getDefaultFocusElement = () => {
    return this._minimizeButton
  }

  render () {
    const { isFullScreen, name } = this.props
    const classes = {
      [styles.root]: true,
      [styles.modal]: isFullScreen
    }

    const iframe = (
      <div className={classnames(classes)}>
        <iframe ref={(c) => { this._frame = c }}
          height={DEFAULT_FRAME_HEIGHT}
          className={styles.frame}
          name={this._frameName}
          title={name + ' Example'}
          src={'example.html'} />
      </div>
    )

    return isFullScreen ? (
      <Modal
        isOpen
        label="Fullscreen"
        size="fullscreen"
        isDismissable={false}
        getDefaultFocusElement={this.getDefaultFocusElement}
        onRequestClose={this.handleMinimize}
        closeButtonRef={function (el) {
          // Hide the close button so we can use our own
          if (el) {
            const node = ReactDOM.findDOMNode(el)
            if (node) {
              node.style.display = 'none'
            }
          }
        }}
      >
        <ModalBody>
          {this.renderMinimizeButton()}
          {iframe}
        </ModalBody>
      </Modal>
    ) : iframe
  }
}
