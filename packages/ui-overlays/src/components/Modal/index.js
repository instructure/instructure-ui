/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Dialog from '@instructure/ui-a11y/lib/components/Dialog'
import CloseButton from '@instructure/ui-buttons/lib/components/CloseButton'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import createChainedFunction from '@instructure/ui-utils/lib/createChainedFunction'
import deprecated from '@instructure/ui-utils/lib/react/deprecated'

import Transition from '@instructure/ui-motion/lib/components/Transition'
import Portal from '@instructure/ui-portal/lib/components/Portal'

import themeable from '@instructure/ui-themeable'
import Browser from '@instructure/ui-utils/lib/Browser'

import Mask from '../Mask'

import styles from './styles.css'
import theme from './theme'

import ModalHeader from './ModalHeader'
import ModalBody from './ModalBody'
import ModalFooter from './ModalFooter'

/**
---
category: components
---
**/

@deprecated('3.0.0', {
  onRequestClose: 'onDismiss',
  isOpen: 'open',
  onReady: 'onOpen',
  onAfterOpen: 'onOpen',
  getDefaultFocusElement: 'defaultFocusElement',
  closeButtonVariant: true,
  padding: true
})
@deprecated('5.0.0', {
  closeButtonLabel: true,
  closeButtonRef: true,
  applicationElement: true,
  shouldCloseOnOverlayClick: 'shouldCloseOnDocumentClick'
})
@themeable(theme, styles)
export default class Modal extends Component {
  static propTypes = {
    /**
     * An accessible label for the `<Modal />` content
     */
    label: PropTypes.string.isRequired,

    /**
     * An accessible label for the close button. The close button won't display without this label.
     */
    closeButtonLabel: PropTypes.string,

    /**
     * The children to be rendered within the `<Modal />`
     */
    children: CustomPropTypes.Children.enforceOrder(
      [ModalHeader, ModalBody, ModalFooter],
      [ModalHeader, ModalBody],
      [ModalBody, ModalFooter],
      [ModalBody]
    ),

    /*
     * The size of the `<Modal />` content
     */
    size: PropTypes.oneOf(['auto', 'small', 'medium', 'large', 'fullscreen']),

    /**
     * Whether or not the `<Modal />` is open
     */
    open: PropTypes.bool,

    /**
     * An element or a function returning an element to focus by default
     */
    defaultFocusElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

    /**
     * Whether focus should be returned to the trigger when the `<Modal/>` is closed
     */
    shouldReturnFocus: PropTypes.bool,

    /**
     * Whether the `<Modal/>` should request close when the document is clicked
     */
    shouldCloseOnDocumentClick: PropTypes.bool,

    /**
     * Callback fired when `<Modal />` content has been mounted in the DOM
     */
    onOpen: PropTypes.func,

    /**
     * Callback fired when `<Modal />` has been unmounted from the DOM
     */
    onClose: PropTypes.func,

    /**
     * Callback fired when the `<Modal />` is requesting to be closed
     */
    onDismiss: PropTypes.func,

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
     * An element or a function returning an element to use as the mount node
     * for the `<Modal />` (defaults to `document.body`)
     */
    mountNode: PropTypes.oneOfType([CustomPropTypes.element, PropTypes.func]),
    /**
     * Insert the element at the 'top' of the mountNode or at the 'bottom'
     */
    insertAt: PropTypes.oneOf(['bottom', 'top']),

    /**
     * An element, function returning an element, or array of elements that will not be hidden from
     * the screen reader when the `<Modal />` is open
     */
    liveRegion: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.func]),

    transition: Transition.propTypes.type,

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
    /**
     * Constrain the Modal to the document window or its closest positioned parent
     */
    constrain: PropTypes.oneOf(['window', 'parent'])
  }

  static defaultProps = {
    open: false,
    size: 'auto',
    transition: 'fade',
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
    liveRegion: null,
    contentRef: el => {},
    shouldCloseOnDocumentClick: true,
    shouldReturnFocus: true,
    defaultFocusElement: null,
    children: null,
    constrain: 'window'
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
        transitioning: this.props.transition !== null
      })
    }
  }

  componentWillUnmount () {
    this._isMounted = false
    this._timeouts.forEach(timeout => clearTimeout(timeout))
  }

  get defaultFocusElement () {
    return this.props.defaultFocusElement || (() => this._closeButton)
  }

  get ie11 () {
    return Browser.msie && Browser.version > 10
  }

  get DOMNode () {
    return this._DOMNode
  }

  set DOMNode (el) {
    this._DOMNode = el
  }

  handlePortalOpen = (DOMNode) => {
    this.DOMNode = DOMNode
    DOMNode && this.applyTheme(DOMNode)
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
  }

  buttonRef = el => {
    this._closeButton = el
    if (typeof this.props.closeButtonRef === 'function') {
      this.props.closeButtonRef(el)
    }
  }

  contentRef = el => {
    this._content = el
    if (typeof this.props.contentRef === 'function') {
      this.props.contentRef(el)
    }
  }

  renderCloseButton() {
    return this.props.closeButtonLabel
      ? <CloseButton
        buttonRef={this.buttonRef}
        placement="end"
        offset="medium"
        onClick={this.props.onDismiss}
      >
        {this.props.closeButtonLabel}
      </CloseButton>
      : null
  }

  renderModal () {
    const {
      onDismiss,
      label,
      shouldCloseOnOverlayClick, // eslint-disable-line react/prop-types
      shouldCloseOnDocumentClick,
      shouldReturnFocus,
      liveRegion,
      size,
      contentRef,
      children,
      constrain,
      ...props
    } = this.props

    const dialog = (
      <Dialog
        {...omitProps(props, Modal.propTypes)}
        onDismiss={onDismiss}
        label={label}
        defaultFocusElement={this.defaultFocusElement}
        shouldCloseOnDocumentClick={
          (typeof shouldCloseOnOverlayClick === 'undefined')
            ? shouldCloseOnDocumentClick
            : shouldCloseOnOverlayClick
        }
        shouldCloseOnEscape
        shouldContainFocus
        shouldReturnFocus={shouldReturnFocus}
        liveRegion={liveRegion}
        open={this.state.open}
        className={classnames({
          [styles.root]: true,
          [styles[size]]: true,
          [styles.ie11]: this.ie11
        })}
        ref={this.contentRef}
        // aria-modal="true" see VO bug https://bugs.webkit.org/show_bug.cgi?id=174667
      >
        {this.renderCloseButton()}
        {children}
      </Dialog>
    )

    if (size === 'fullscreen') {
      return (
        <span
          className={classnames({
            [styles.fullscreenLayout]: true,
            [styles[`fullscreenLayout--${constrain}`]]: true
          })}>
            {dialog}
          </span>
      )
    } else {
      return (
        <Mask
          placement={this.ie11 ? 'top' : 'center'}
          fullscreen={constrain === 'window'}
        >
          {dialog}
        </Mask>
      )
    }
  }

  render () {
    const {
      open,
      onOpen,
      onClose,
      mountNode,
      insertAt,
      transition,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      constrain
    } = this.props

    const portalIsOpen = open || this.state.transitioning

    return (
      <Portal
        mountNode={mountNode}
        insertAt={insertAt}
        open={portalIsOpen}
        onOpen={createChainedFunction(this.handlePortalOpen, onOpen)}
        onClose={onClose}
      >
        {portalIsOpen && (
          <Transition
            in={open}
            transitionOnMount
            unmountOnExit
            type={transition}
            onEnter={onEnter}
            onEntering={onEntering}
            onEntered={onEntered}
            onExit={onExit}
            onExiting={onExiting}
            onExited={createChainedFunction(this.handleTransitionExited, onExited)}
          >
            {
              (constrain === 'parent') ?
                <span className={styles.constrainContext}>
                  {this.renderModal()}
                </span>
                : this.renderModal()
            }
          </Transition>
        )}
      </Portal>
    )
  }
}

export { default as ModalHeader } from './ModalHeader'
export { default as ModalBody } from './ModalBody'
export { default as ModalFooter } from './ModalFooter'
