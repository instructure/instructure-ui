import React, { Component } from 'react'
import PropTypes from 'prop-types'
import createChainedFunction from '../../util/createChainedFunction'
import contains from '../../util/dom/contains'
import { pickProps } from '../../util/passthroughProps'

import Portal from '../Portal'
import Dialog from '../Dialog'
import Mask from '../Mask'
import Transition from '../Transition'

/**
---
category: utilities
---
  The Overlay component is a utility used by the [Modal](#Modal) and [Tray](#Tray)
  components.

  ```js_example
  class Example extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        open: false
      }
    }

    render () {
      return (
        <div>
          <Button
            onClick={() => { this.setState({ open: true })}}
            ref={(c) => this._showButton = c}
          >
            Show the Overlay
          </Button>
          <Overlay
            open={this.state.open}
            withMask
            transition="fade"
            onDismiss={() => { this.setState({ open: false })}}
            label="Overlay Example"
            defaultFocusElement={() => { return this._hideButton }}
            shouldReturnFocus
          >
            <Button
              onClick={() => { this.setState({ open: false })}}
              ref={(c) => this._hideButton = c}
            >
              Hide the Overlay
            </Button>
          </Overlay>
        </div>
      )
    }
  }

  <Example />
  ```
**/
class Overlay extends Component {
  static propTypes = {
    ...Portal.propTypes,
    ...Mask.propTypes,
    ...Dialog.propTypes,
    ...Transition.propTypes,

    /**
     * The type of `<Transition />` to use for animating in/out
     */
    transition: Transition.propTypes.type, // eslint-disable-line react/require-default-props

    withMask: PropTypes.bool
  }

  static defaultProps = {
    withMask: false,
    closeButtonRef: el => {},
    shouldCloseOnDocumentClick: false
  }

  constructor (props) {
    super(props)

    this.state = {
      open: props.open,
      transitioning: false
    }
  }

  _timeouts = []

  componentDidMount () {
    this._isMounted = true
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.open && !nextProps.open) {
      // closing
      this.setState({
        transitioning: !!this.props.transition,
        open: false
      })
    }
  }

  componentWillUnmount () {
    this._isMounted = false
    this._timeouts.forEach(timeout => clearTimeout(timeout))
  }

  handlePortalOpen = () => {
    this._timeouts.push(
      setTimeout(() => {
        if (this._isMounted) {
          this.setState({
            open: true
          })
        }
      })
    )
  }

  handleTransitionExited = () => {
    this.setState({
      open: false,
      transitioning: false
    })

    if (typeof this.props.onExited === 'function') {
      this.props.onExited()
    }
  }

  get defaultFocusElement () {
    return this.props.defaultFocusElement || (() => this._closeButton)
  }

  renderContent () {
    return (
      <Dialog
        {...pickProps(this.props, Dialog.propTypes)}
        defaultFocusElement={this.defaultFocusElement}
        open={this.state.open}
        role="region"
        closeButtonRef={el => {
          this._closeButton = el
          this.props.closeButtonRef(el)
        }}
      >
        {this.props.children}
      </Dialog>
    )
  }

  renderMask (content) {
    return (
      <Mask
        ref={el => {
          this._mask = el
        }}
      >
        {content}
      </Mask>
    )
  }

  renderTransition (content) {
    return (
      <Transition
        {...pickProps(this.props, Transition.propTypes)}
        in={this.state.open}
        transitionOnMount
        unmountOnExit
        type={this.props.transition}
        onExited={createChainedFunction(this.handleTransitionExited, this.props.onExited)}
      >
        {content}
      </Transition>
    )
  }

  render () {
    let content = this.renderContent()

    if (this.props.withMask) {
      content = this.renderMask(content)
    }

    if (this.props.transition) {
      content = this.renderTransition(content)
    }

    return (
      <Portal
        {...pickProps(this.props, Portal.propTypes)}
        open={this.props.open || this.state.transitioning}
        onOpen={createChainedFunction(this.handlePortalOpen, this.props.onOpen)}
      >
        {content}
      </Portal>
    )
  }
}

export default Overlay
