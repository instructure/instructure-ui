import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '../../themeable'
import createChainedFunction from '../../util/createChainedFunction'
import contains from '../../util/dom/contains'

import Portal from '../Portal'
import Transition from '../Transition'

import styles from './styles.css'
import theme from './theme'

/**
---
category: utilities
---
  An Overlay component

  ```js_example
  class Example extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        open: false
      }
    }

    handleOverlayToggle = () => {
      const open = !this.state.open
      this.setState({
        open
      })
    };

    render () {
      return (
        <div>
          <Button onClick={this.handleOverlayToggle} ref={(c) => this._showButton = c}>
            Show the Overlay
          </Button>
          <Overlay
            open={this.state.open}
            transition="fade"
            onDismiss={this.handleOverlayToggle}
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
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
     * The children to be rendered within the `<Overlay />`
     */
    children: PropTypes.node,

    /**
     * Whether or not the `<Overlay />` is open
     */
    open: PropTypes.bool,

    /**
     * A function that returns a reference to the  `<Overlay />` content element
     */
    contentRef: PropTypes.func,

    /**
     * Whether or not the `<Overlay />` should close when clicked
     */
    shouldCloseOnClick: PropTypes.bool,

    /**
     * The type of `<Transition />` to use for animating `<Overlay />`.
     */
    transition: Transition.propTypes.type,

    /**
     * Callback fired when `<Overlay />` content has been mounted in the DOM
     */
    onOpen: PropTypes.func,

    /**
     * Callback fired when `<Overlay />` has been closed
     */
    onClose: PropTypes.func,

    /**
     * Callback fired when `<Overlay />` has requested to be closed
     */
    onDismiss: PropTypes.func,

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
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    transition: 'fade',
    open: false,
    shouldCloseOnClick: false,
    contentRef: function (el) {}
  }

  constructor (props) {
    super(props)

    this.state = {
      transitioning: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.transition && (!this.props.open && nextProps.open)) {
      this.setState({
        transitioning: true
      })
    }
  }

  componentWillUnMount () {
    this.isUnMounted = true
  }

  requestClose (event) {
    if (typeof this.props.onDismiss === 'function') {
      this.props.onDismiss(event)
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
        transitioning: false
      })
    }
  }

  renderContent () {
    /* eslint-disable jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events,
      jsx-a11y/no-static-element-interactions */
    let content = (
      <div // eslint-disable-line jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events
        className={styles.root}
        onClick={this.handleClick}
        tabIndex={-1}
        ref={(el) => {
          this._content = el
          this.props.contentRef(el)
        }}
      >
        {this.props.children}
      </div>
    )
    /* eslint-enable jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events,
      jsx-a11y/no-static-element-interactions*/

    if (this.props.transition) {
      content = (
        <Transition
          in={this.props.open}
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
        open={this.props.open || this.state.transitioning}
        onOpen={this.props.onOpen}
        onClose={this.props.onClose}
      >
        {this.renderContent()}
      </Portal>
    )
  }
}
