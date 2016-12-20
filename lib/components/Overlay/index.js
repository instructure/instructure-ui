import React, { Component, PropTypes } from 'react'
import themeable from '../../util/themeable'
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
     * A function that returns a reference to the  `<Overlay />` content element
     */
    contentRef: PropTypes.func,

    /**
     * Whether or not the `<Overlay />` should close when clicked
     */
    shouldCloseOnClick: PropTypes.bool,

    /**
     * The type of `<Transition />` to use for animating `<Overlay />`. No animation used when `null`.
     */
    transition: Transition.propTypes.type,

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
    contentRef: function (el) {}
  }

  constructor (props) {
    super(props)

    this.state = {
      portalIsOpen: props.isOpen
    }
  }

  componentWillMount () {
    if (this.props.isOpen) {
      this.open()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.transition && !this.props.isOpen && nextProps.isOpen) {
      this.setState({
        isTransitioning: true
      })
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.portalIsOpen && !prevState.portalIsOpen) {
      this.open()
    }
  }

  componentWillUnMount () {
    this.isUnMounted = true
  }

  open () {
    if (this.props.isOpen && this.props.onAfterOpen) {
      this.props.onAfterOpen()
    }
  }

  requestClose (event) {
    if (typeof this.props.onRequestClose === 'function') {
      this.props.onRequestClose(event)
    }
  }

  handleClick = (event) => {
    const node = event.target

    if (node !== this._content && contains(this._content, node)) {
      return
    }

    if (this.props.shouldCloseOnClick) {
      this.requestClose(event)
    }
  }

  handleTransitionExited = () => {
    if (!this.isUnMounted) {
      this.setState({
        isTransitioning: false
      })
    }
  }

  renderContent () {
    /* eslint-disable jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
    let content = (
      <div
        className={styles.root}
        onClick={this.handleClick}
        tabIndex={-1}
        style={{ zIndex: this.props.zIndex }}
        ref={(el) => {
          this._content = el
          this.props.contentRef(el)
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
        isOpen={this.props.isOpen || this.state.isTransitioning}
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
