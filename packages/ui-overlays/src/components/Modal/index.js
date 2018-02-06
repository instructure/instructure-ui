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

import FocusRegion from '@instructure/ui-a11y/lib/components/FocusRegion'
import CloseButton from '@instructure/ui-buttons/lib/components/CloseButton'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import { omitProps, pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import createChainedFunction from '@instructure/ui-utils/lib/createChainedFunction'
import deprecated from '@instructure/ui-utils/lib/react/deprecated'

import Transition from '@instructure/ui-motion/lib/components/Transition'
import Portal from '@instructure/ui-portal/lib/components/Portal'

import ModalContent from './ModalContent'
import ModalHeader from './ModalHeader'
import ModalBody from './ModalBody'
import ModalFooter from './ModalFooter'

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
  closeButtonVariant: true,
  padding: true
})
@deprecated('5.0.0', {
  closeButtonLabel: true,
  closeButtonRef: true
})
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
     * An element or a function returning an element to apply `aria-hidden` to
     */
    applicationElement: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.func]),

    /**
     * Whether focus should be returned to the trigger when the `<Modal/>` is closed
     */
    shouldReturnFocus: PropTypes.bool,

    /**
     * Whether the `<Modal/>` should request close when the overlay is clicked
     */
    shouldCloseOnOverlayClick: PropTypes.bool,

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
    onExited: PropTypes.func
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
    contentRef: el => {},
    shouldCloseOnOverlayClick: true,
    shouldReturnFocus: true,
    applicationElement: null,
    defaultFocusElement: null,
    children: null
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
  }

  renderCloseButton() {
    return this.props.closeButtonLabel
      ? <CloseButton
        buttonRef={el => {
          this._closeButton = el
          if (typeof this.props.closeButtonRef === 'function') {
            this.props.closeButtonRef(el)
          }
        }}
        placement="end"
        offset="medium"
        onClick={this.props.onDismiss}
      >
        {this.props.closeButtonLabel}
      </CloseButton>
      : null
  }

  get defaultFocusElement () {
    return this.props.defaultFocusElement || (() => this._closeButton)
  }

  render () {
    const { children, contentRef, ...props } = this.props

    return (
      <Portal
        {...pickProps(this.props, Portal.propTypes)}
        open={this.props.open || this.state.transitioning}
        onOpen={createChainedFunction(this.handlePortalOpen, this.props.onOpen)}
      >
        <Transition
          {...pickProps(this.props, Transition.propTypes)}
          in={this.props.open}
          transitionOnMount
          unmountOnExit
          type={this.props.transition}
          onExited={createChainedFunction(this.handleTransitionExited, this.props.onExited)}
        >
          <FocusRegion
            {...pickProps(this.props, FocusRegion.propTypes)}
            defaultFocusElement={this.defaultFocusElement}
            contentElement={() => this._content}
            shouldCloseOnDocumentClick={false}
            shouldCloseOnEscape
            shouldContainFocus
            open={this.state.open}
            role="region"
          >
            <ModalContent
              {...omitProps(props, Modal.propTypes)}
              {...pickProps(props, ModalContent.propTypes)}
              contentRef={el => {
                this._content = el
                if (typeof contentRef === 'function') {
                  contentRef(el)
                }
              }}
            >
              {this.renderCloseButton()}
              {children}
            </ModalContent>
          </FocusRegion>
        </Transition>
      </Portal>
    )
  }
}

export { default as ModalHeader } from './ModalHeader'
export { default as ModalBody } from './ModalBody'
export { default as ModalFooter } from './ModalFooter'
