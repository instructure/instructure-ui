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

/** @jsx jsx */
import { Children, Component, ReactElement } from 'react'

import { Dialog } from '@instructure/ui-dialog'
import {
  passthroughProps,
  safeCloneElement,
  matchComponentTypes
} from '@instructure/ui-react-utils'
import { createChainedFunction } from '@instructure/ui-utils'
import { Transition } from '@instructure/ui-motion'
import { Portal } from '@instructure/ui-portal'
import type { PortalNode } from '@instructure/ui-portal'
import { testable } from '@instructure/ui-testable'
import { withStyle, jsx } from '@instructure/emotion'
import { Mask } from '@instructure/ui-overlays'
import { ModalHeader } from './ModalHeader'
import { ModalBody } from './ModalBody'
import { ModalFooter } from './ModalFooter'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { ModalProps } from './props'

/**
---
category: components
tags: overlay, portal, dialog
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Modal extends Component<ModalProps> {
  static readonly componentId = 'Modal'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    open: false,
    size: 'auto',
    variant: 'default',
    transition: 'fade',
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onOpen: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onClose: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onDismiss: (event) => {},
    onEnter: () => {},
    onEntering: () => {},
    onEntered: () => {},
    onExit: () => {},
    onExiting: () => {},
    onExited: () => {},
    as: undefined,
    mountNode: null,
    insertAt: 'bottom',
    liveRegion: null,
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    contentRef: (el) => {},
    shouldCloseOnDocumentClick: true,
    shouldReturnFocus: true,
    defaultFocusElement: null,
    children: null,
    constrain: 'window',
    overflow: 'scroll'
  }

  static Header = ModalHeader
  static Body = ModalBody
  static Footer = ModalFooter

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props)

    this.state = {
      transitioning: false
    }
  }

  _DOMNode: PortalNode = null

  ref?: Element | null = null

  handleRef = (el?: Element | null) => {
    this.ref = el
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.open && !this.props.open) {
      // closing
      this.setState({
        transitioning: prevProps.transition !== null
      })
    }
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  get defaultFocusElement() {
    return this.props.defaultFocusElement
  }

  get DOMNode() {
    return this._DOMNode
  }
  set DOMNode(el: PortalNode) {
    this._DOMNode = el
  }

  get maskPlacement() {
    if (this.props.overflow === 'fit') {
      return 'stretch'
    } else {
      return 'center'
    }
  }

  handlePortalOpen = (DOMNode: PortalNode) => {
    this.DOMNode = DOMNode
  }

  handleTransitionExited = () => {
    this.setState({
      transitioning: false
    })
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
  contentRef = (el) => {
    // @ts-expect-error ts-migrate(2551) FIXME: Property '_content' does not exist on type 'Modal'... Remove this comment to see the full error message
    this._content = el
    if (typeof this.props.contentRef === 'function') {
      this.props.contentRef(el)
    }
  }

  renderChildren() {
    const { children, variant, overflow } = this.props

    return Children.map(children, (child) => {
      if (!child) return // ignore null, falsy children

      if (matchComponentTypes(child, [ModalBody])) {
        return safeCloneElement(child as ReactElement, {
          variant: variant,
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'string | ... Remove this comment to see the full error message
          overflow: child.props.overflow || overflow
        })
      } else {
        return safeCloneElement(child as ReactElement, {
          variant: variant
        })
      }
    })
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  renderDialog(props) {
    const {
      onDismiss,
      label,
      shouldCloseOnDocumentClick,
      shouldReturnFocus,
      liveRegion,
      size,
      constrain,
      as,
      styles
    } = this.props

    const isFullScreen = size === 'fullscreen'
    const dialog = (
      <Dialog
        {...passthroughProps(props)}
        as={as}
        open
        label={label}
        defaultFocusElement={this.defaultFocusElement}
        shouldCloseOnDocumentClick={shouldCloseOnDocumentClick}
        shouldCloseOnEscape
        shouldContainFocus
        shouldReturnFocus={shouldReturnFocus}
        liveRegion={liveRegion}
        onDismiss={onDismiss}
        css={styles?.modal}
        ref={this.contentRef}
        // aria-modal="true" see VO bug https://bugs.webkit.org/show_bug.cgi?id=174667
      >
        {this.renderChildren()}
      </Dialog>
    )

    return (
      <Mask
        placement={this.maskPlacement}
        fullscreen={constrain === 'window'}
        themeOverride={
          isFullScreen ? { borderRadius: '0em', borderWidth: '0em' } : {}
        }
      >
        {dialog}
      </Mask>
    )
  }

  render() {
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
      constrain,
      overflow,
      ...passthroughProps
    } = this.props

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'transitioning' does not exist on type 'R... Remove this comment to see the full error message
    const portalIsOpen = open || this.state.transitioning

    return (
      <Portal
        mountNode={mountNode}
        insertAt={insertAt}
        open={portalIsOpen}
        onOpen={createChainedFunction(this.handlePortalOpen, onOpen)}
        onClose={onClose}
        elementRef={this.handleRef}
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
            onExited={createChainedFunction(
              this.handleTransitionExited,
              onExited
            )}
          >
            {constrain === 'parent' ? (
              <span css={this.props.styles?.constrainContext}>
                {this.renderDialog(passthroughProps)}
              </span>
            ) : (
              this.renderDialog(passthroughProps)
            )}
          </Transition>
        )}
      </Portal>
    )
  }
}

export default Modal
export { Modal, ModalHeader, ModalBody, ModalFooter }
