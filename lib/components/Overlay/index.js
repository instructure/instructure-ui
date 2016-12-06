import React, { Component, PropTypes } from 'react'
import themeable from '../../util/themeable'
import scopeTab from '../../util/scopeTab'
import focusManager from '../../util/focusManager'
import createChainedFunction from '../../util/createChainedFunction'
import contains from 'dom-helpers/query/contains'

import Portal from '../Portal'
import Transition from '../Transition'

import styles from './styles.css'
import theme from './theme.js'

/**
  An Overlay component

  ```js_example
  class Example extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        isOverlayOpen: false
      }
    }

    handleOverlayToggle = () => {
      const isOverlayOpen = !this.state.isOverlayOpen
      this.setState({
        isOverlayOpen
      })

      if (!isOverlayOpen) {
        this._showButton.focus()
      }
    };

    render () {
      return (
        <div>
          <Button onClick={this.handleOverlayToggle} ref={(c) => this._showButton = c}>
            Show the Overlay
          </Button>
          <Overlay
            isOpen={this.state.isOverlayOpen}
            transition="fade"
            onRequestClose={this.handleOverlayToggle}
            getDefaultFocusElement={() => { return this._hideButton }}
          >
          <p style={{textAlign: 'center'}}>
            <Button onClick={this.handleOverlayToggle} ref={(c) => this._hideButton = c}>
              Hide the Overlay
            </Button>
          </p>
          </Overlay>
        </div>
      )
    }
  }

  <Example />
  ```
**/
@themeable(theme, styles)
export default class Overlay extends Component {
  static propTypes = {
    /**
     * The children to be rendered within the `<Overlay />`
     */
    children: PropTypes.node,

    /**
     * Whether or not the `<Overlay />` is open
     */
    isOpen: PropTypes.bool,

    zIndex: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]),

    /**
     * Whether or not the `<Overlay />` should close when clicked
     */
    shouldCloseOnClick: PropTypes.bool,

    /**
     * The type of `<Transition />` to use for animating `<Overlay />`. No animation used when `null`.
     */
    transition: Transition.propTypes.type,

    /**
     * Get the default element to focus when the `<Overlay />` opens. Will be main content by default.
     */
    getDefaultFocusElement: PropTypes.func,

    /**
     * Callback fired when `<Overlay />` content has been rendered
     */
    onReady: PropTypes.func,

    /**
     * Callback fired when `<Overlay />` has been closed
     */
    onClose: PropTypes.func,

    /**
     * Callback fired when `<Overlay />` has requested to be closed
     */
    onRequestClose: PropTypes.func,

    /**
     * Callback fired when `<Overlay />` has been opened
     */
    onAfterOpen: PropTypes.func,

    /**
     * Callback fired before the `<Overlay />` transitions in
     */
    onEnter: PropTypes.func,

    /**
     * Callback fired as the `<Overlay />` begins to transition in
     */
    onEntering: PropTypes.func,

    /**
     * Callback fired after the `<Overlay />` finishes transitioning in
     */
    onEntered: PropTypes.func,

    /**
     * Callback fired right before the `<Overlay />` transitions out
     */
    onExit: PropTypes.func,

    /**
     * Callback fired as the `<Overlay />` begins to transition out
     */
    onExiting: PropTypes.func,

    /**
     * Callback fired after the `<Overlay />` finishes transitioning out
     */
    onExited: PropTypes.func
  }

  static defaultProps = {
    isOpen: false,
    shouldCloseOnClick: false,
    transition: null
  }

  componentWillMount () {
    if (this.props.isOpen) {
      this.setFocusAfterRender(true)
      this.open()
    }
  }

  componentWillReceiveProps (nextProps) {
    // Flag component to be forced open while transition is running
    if (this.props.transition &&
        this.props.isOpen && !nextProps.isOpen) {
      this.setForceOpen(true)
    }

    // Focus only needs to be set once when the modal is being opened
    if (!this.props.isOpen && nextProps.isOpen) {
      this.setFocusAfterRender(true)
      this.open()
    } else if (this.props.isOpen && !nextProps.isOpen) {
      this.close()
    }
  }

  setForceOpen (open) {
    this.forceOpen = open
  }

  setFocusAfterRender (focus) {
    this.focusAfterRender = focus
  }

  maybeFocusContent () {
    if (this.focusAfterRender) {
      this.focusContent()
      this.setFocusAfterRender(false)
    }
  }

  focusContent () {
    let el = this._content

    if (typeof this.props.getDefaultFocusElement === 'function') {
      el = this.props.getDefaultFocusElement()
    }

    if (el) {
      el.focus()
    }
  }

  open () {
    focusManager.setupScopedFocus(this._content)
    focusManager.markForFocusLater()

    if (this.props.isOpen && this.props.onAfterOpen) {
      this.props.onAfterOpen()
    }
  }

  close () {
    if (this.ownerHandlesClose()) {
      focusManager.returnFocus()
      focusManager.teardownScopedFocus()
    }
  }

  ownerHandlesClose () {
    return typeof this.props.onRequestClose === 'function'
  }

  requestClose (event) {
    if (this.ownerHandlesClose()) {
      this.props.onRequestClose(event)
    }
  }

  handleKeyDown = (event) => {
    // Tab
    if (event.keyCode === 9) {
      scopeTab(this._content, event)
    }

    // Esc
    if (event.keyCode === 27) {
      event.preventDefault()
      this.requestClose(event)
    }
  }

  handleClick = (event) => {
    const node = event.target

    if (node !== this._content && contains(this._content, node)) {
      return
    }

    if (this.props.shouldCloseOnClick) {
      if (this.ownerHandlesClose()) {
        this.requestClose(event)
      } else {
        this.focusContent()
      }
    }
  }

  handlePortalReady = () => {
    this.maybeFocusContent()
  }

  handleTransitionExited = () => {
    if (this.forceOpen) {
      this.setForceOpen(false)
      this.forceUpdate()
    }
  }

  renderContent () {
    /* eslint-disable jsx-a11y/onclick-has-role */
    let content = (
      <div
        className={styles.root}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        tabIndex={-1}
        style={{ zIndex: this.props.zIndex }}
        ref={(el) => {
          this._content = el
        }}
      >
        {this.props.children}
      </div>
    )
    /* eslint-enable jsx-a11y/onclick-has-role */

    if (this.props.transition) {
      content = (
        <Transition
          in={this.props.isOpen}
          transitionOnMount
          unmountOnExit
          type={this.props.transition}
          onEnter={this.props.onEnter}
          onEntering={this.props.onEntering}
          onEntered={this.props.onEntered}
          onExit={this.props.onExit}
          onExiting={this.props.onExiting}
          onExited={createChainedFunction(
            this.handleTransitionExited,
            this.props.onExited
          )}
        >
          {content}
        </Transition>
      )
    }

    return content
  }

  render () {
    return (
      <Portal
        isOpen={this.props.isOpen || this.forceOpen}
        onReady={createChainedFunction(
          this.handlePortalReady,
          this.props.onReady
        )}
        onClose={this.props.onClose}
      >
        {this.renderContent()}
      </Portal>
    )
  }
}
