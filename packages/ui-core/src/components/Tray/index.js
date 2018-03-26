import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { omitProps, pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import createChainedFunction from '@instructure/ui-utils/lib/createChainedFunction'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import deprecated from '@instructure/ui-utils/lib/react/deprecated'
import getTextDirection from '@instructure/ui-utils/lib/i18n/getTextDirection'

import Portal from '../Portal'
import Dialog from '../Dialog'
import CloseButton from '../CloseButton'
import Transition from '../Transition'

import TrayContent from './TrayContent'

/**
---
category: components/dialogs
---
**/
@deprecated('3.0.0', {
  onRequestClose: 'onDismiss',
  isOpen: 'open',
  onReady: 'onOpen',
  onAfterOpen: 'onOpen',
  getDefaultFocusElement: 'defaultFocusElement',
  trapFocus: 'shouldContainFocus'
})
class Tray extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,

    closeButtonLabel: PropTypes.string,

    children: PropTypes.node,

    /*
     * The size (width) of the `<Tray />` when placement is `start` or `end`
     */
    size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),

    /**
    * Placment to determine where the `<Tray />` should display in the viewport
    */
    placement: PropTypes.oneOf(['top', 'bottom', 'start', 'end']),

    /**
     * Wheter or not the `<Tray />` is open
     */
    open: PropTypes.bool,

    /**
     * An element or a function returning an element to focus by default
     */
    defaultFocusElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

    /**
     * An element or a function returning an element to apply `aria-hidden` to
     */
    applicationElement: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.func]),

    /**
     *
     * A function that returns a reference to the content element
     */
    contentRef: PropTypes.func,

    /**
     *
     * A function that returns a reference to the close button element
     */
    closeButtonRef: PropTypes.func,

    /**
     * Whether focus should contained within the `<Tray/>` when it is open
     */
    shouldContainFocus: PropTypes.bool,

    /**
     * Whether focus should be restored when the `<Tray/>` is closed
     */
    shouldReturnFocus: PropTypes.bool,

    /**
     * Should the `<Tray />` hide when clicks occur outside the content
     */
    shouldCloseOnDocumentClick: PropTypes.bool,

    /**
     * Callback fired when `<Tray />` content has been mounted in the DOM
     */
    onOpen: PropTypes.func,

    /**
     * Callback fired when `<Tray />` has been unmounted from the DOM
     */
    onClose: PropTypes.func,

    /**
     * Callback fired when the `<Tray />` is requesting to be closed
     */
    onDismiss: PropTypes.func,

    /**
     * An element or a function returning an element to use as the mount node
     * for the `<Tray />` (defaults to `document.body`)
     */
    mountNode: PropTypes.oneOfType([CustomPropTypes.element, PropTypes.func]),

    /**
     * Insert the element at the 'top' of the mountNode or at the 'bottom'
     */
    insertAt: PropTypes.oneOf(['bottom', 'top']),

    /**
     * Callback fired before the <Modal /> transitions in
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired as the <Modal /> begins to transition in
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired after the <Modal /> finishes transitioning in
     */
    onEntered: PropTypes.func,
    /**
     * Callback fired right before the <Modal /> transitions out
     */
    onExit: PropTypes.func,
    /**
     * Callback fired as the <Modal /> begins to transition out
     */
    onExiting: PropTypes.func,
    /**
     * Callback fired after the <Modal /> finishes transitioning out
     */
    onExited: PropTypes.func,

    closeButtonVariant: PropTypes.oneOf(['icon', 'icon-inverse']),

    /**
     *
     * Should the `<Tray />` have a border
     */
    border: PropTypes.bool,

    /**
     *
     * Should the `<Tray />` have a box shadow
     */
    shadow: PropTypes.bool
  }

  static defaultProps = {
    open: false,
    onOpen: event => {},
    onClose: event => {},
    onDismiss: event => {},
    onEnter: () => {},
    onEntering: () => {},
    onEntered: () => {},
    onExit: () => {},
    onExiting: () => {},
    onExited: () => {},
    mountNode: null,
    insertAt: 'bottom',
    contentRef: el => {},
    closeButtonRef: el => {},
    shouldCloseOnDocumentClick: false,
    shouldContainFocus: true,
    shouldReturnFocus: true,
    applicationElement: null,
    defaultFocusElement: null,
    size: 'small',
    placement: 'start',
    shadow: true,
    border: false,
    closeButtonVariant: 'icon',
    closeButtonLabel: null,
    children: null
  }

  constructor (props) {
    super(props)

    this.state = {
      portalOpen: false,
      transitioning: false,
      dir: 'ltr'
    }
  }

  _timeouts = []

  componentDidMount () {
    this._isMounted = true

    /* eslint-disable react/no-did-mount-set-state */
    this.setState({
      dir: getTextDirection(this._content)
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.open && !nextProps.open) {
      // closing
      this.setState({
        transitioning: true
      })
    }
  }

  componentWillUnmount () {
    this._isMounted = false
    this._timeouts.forEach(timeout => clearTimeout(timeout))
  }

  get transition () {
    const { placement, open } = this.props
    const { dir } = this.state

    return classnames({
      'slide-down':
        (placement === 'top' && open) || (placement === 'bottom' && !open),
      'slide-up':
        (placement === 'bottom' && open) || (placement === 'top' && !open),
      [`slide-${dir === 'rtl' ? 'right' : 'left'}`]:
        (placement === 'start' && !open) || (placement === 'end' && open),
      [`slide-${dir === 'rtl' ? 'left' : 'right'}`]:
        (placement === 'end' && !open) || (placement === 'start' && open)
    })
  }

  get defaultFocusElement () {
    return this.props.defaultFocusElement || (() => this._closeButton)
  }

  handlePortalOpen = () => {
    this._timeouts.push(
      setTimeout(() => {
        if (this._isMounted) {
          this.setState({
            portalOpen: true
          })
        }
      })
    )
  }

  handleTransitionExited = () => {
    this.setState({
      transitioning: false
    })
  }

  renderCloseButton () {
    return this.props.closeButtonLabel
      ? <CloseButton
        placement={this.props.placement === 'end' ? 'start' : 'end'}
        offset="x-small"
        variant={this.props.closeButtonVariant}
        buttonRef={el => {
          this._closeButton = el
          this.props.closeButtonRef(el)
        }}
        onClick={this.props.onDismiss}
      >
        {this.props.closeButtonLabel}
      </CloseButton>
      : null
  }

  render () {
    const { children, contentRef, open, onOpen, ...props } = this.props
    return (
      <Portal
        {...pickProps(props, Portal.propTypes)}
        open={this.props.open || this.state.transitioning}
        onOpen={createChainedFunction(this.handlePortalOpen, onOpen)}
      >
        <Transition
          {...pickProps(this.props, Transition.propTypes)}
          in={this.props.open}
          transitionOnMount
          transitionExit
          unmountOnExit
          type={this.transition}
          onExited={createChainedFunction(this.handleTransitionExited, this.props.onExited)}
        >
          <TrayContent
            {...pickProps(props, TrayContent.propTypes)}
            ref={(el) => {
              this._content = el
              if (typeof contentRef === 'function') contentRef(el)
            }}
          >
            <Dialog
              {...pickProps(props, Dialog.propTypes)}
              defaultFocusElement={this.defaultFocusElement}
              open={this.state.portalOpen || this.state.transitioning}
              role="region"
              shouldCloseOnEscape
            >
              {this.renderCloseButton()}
              {children}
            </Dialog>
          </TrayContent>
        </Transition>
      </Portal>
    )
  }
}

export default Tray
