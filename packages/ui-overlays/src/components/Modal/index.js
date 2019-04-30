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

import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Dialog from '@instructure/ui-a11y/lib/Dialog'

import { element, Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import { omitProps } from '@instructure/ui-react-utils/lib/passthroughProps'
import safeCloneElement from '@instructure/ui-react-utils/lib/safeCloneElement'
import createChainedFunction from '@instructure/ui-utils/lib/createChainedFunction'

import Transition from '@instructure/ui-motion/lib/components/Transition'
import Portal from '@instructure/ui-portal/lib/components/Portal'

import themeable from '@instructure/ui-themeable'
import testable from '@instructure/ui-testable'
import Browser from '@instructure/ui-utils/lib/Browser'
import matchComponentTypes from '@instructure/ui-react-utils/lib/matchComponentTypes'

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
@testable()
@themeable(theme, styles)
export default class Modal extends Component {
  static propTypes = {
    /**
     * An accessible label for the `<Modal />` content
     */
    label: PropTypes.string.isRequired,

    /**
     * The children to be rendered within the `<Modal />`
     */
    children: ChildrenPropTypes.enforceOrder(
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
    * Designates the background style of the `<Modal />`
    */
    variant: PropTypes.oneOf(['default', 'inverse']),

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
     * An element or a function returning an element to use as the mount node
     * for the `<Modal />` (defaults to `document.body`)
     */
    mountNode: PropTypes.oneOfType([element, PropTypes.func]),
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
    constrain: PropTypes.oneOf(['window', 'parent']),
    /**
     * Should ModalBody handle overflow with scrollbars, or fit its
     * content within its own height?
     */
    overflow: PropTypes.oneOf(['scroll', 'fit'])
  }

  static defaultProps = {
    open: false,
    size: 'auto',
    variant: 'default',
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
    constrain: 'window',
    overflow: 'scroll'
  }

  constructor (props) {
    super(props)

    this.state = {
      transitioning: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.open && !nextProps.open) {
      // closing
      this.setState({
        transitioning: this.props.transition !== null
      })
    }
  }

  get defaultFocusElement () {
    return this.props.defaultFocusElement
  }

  get ie11 () {
    return Browser.msie && Browser.version > 10
  }

  get DOMNode () {
    return this._DOMNode
  }

  get maskPlacement () {
    if (this.ie11) {
      return 'top'
    } else if (this.props.overflow === 'fit') {
      return 'stretch'
    } else {
      return 'center'
    }
  }

  set DOMNode (el) {
    this._DOMNode = el
  }

  handlePortalOpen = (DOMNode) => {
    this.DOMNode = DOMNode
    DOMNode && this.applyTheme(DOMNode)
  }

  handleTransitionExited = () => {
    this.setState({
      transitioning: false
    })
  }

  contentRef = el => {
    this._content = el
    if (typeof this.props.contentRef === 'function') {
      this.props.contentRef(el)
    }
  }

  renderChildren() {
    const {
      children,
      variant,
      overflow
    } = this.props

    return Children.map(children, (child) => {
      if (!child) return // ignore null, falsy children

      if (matchComponentTypes(child, [ModalBody])) {
        return safeCloneElement(child, {
          variant: variant,
          overflow: child.props.overflow || overflow
        })
      } else {
        return safeCloneElement(child, {
          variant: variant
        })
      }
    })
  }

  renderModal () {
    const {
      onDismiss,
      label,
      shouldCloseOnDocumentClick,
      shouldReturnFocus,
      liveRegion,
      size,
      variant,
      contentRef,
      constrain,
      ...props
    } = this.props

    const dialog = (
      <Dialog
        {...omitProps(props, Modal.propTypes)}
        onDismiss={onDismiss}
        label={label}
        defaultFocusElement={this.defaultFocusElement}
        shouldCloseOnDocumentClick={shouldCloseOnDocumentClick}
        shouldCloseOnEscape
        shouldContainFocus
        shouldReturnFocus={shouldReturnFocus}
        liveRegion={liveRegion}
        open
        className={classnames({
          [styles.root]: true,
          [styles[size]]: true,
          [styles.inverse]: this.props.variant === 'inverse',
          [styles['overflow--fit']]: this.props.overflow === 'fit',
          [styles.ie11]: this.ie11
        })}
        ref={this.contentRef}
        // aria-modal="true" see VO bug https://bugs.webkit.org/show_bug.cgi?id=174667
      >
        {this.renderChildren()}
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
          placement={this.maskPlacement}
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
            theme={{ duration: this.ie11 && '0s' }} // IE11 doesn't always complete transition
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
