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
import React, { Children, Component } from 'react'

import {
  passthroughProps,
  safeCloneElement,
  matchComponentTypes
} from '@instructure/ui-react-utils'
import { createChainedFunction } from '@instructure/ui-utils'
import { testable } from '@instructure/ui-testable'

import { Transition } from '@instructure/ui-motion'
import { Portal } from '@instructure/ui-portal'
import type { PortalNode } from '@instructure/ui-portal'
import { Dialog } from '@instructure/ui-dialog'
import { Mask } from '@instructure/ui-overlays'
import {
  findDOMNode,
  contains,
  ownerDocument,
  addEventListener
} from '@instructure/ui-dom-utils'

import { ModalHeader } from './ModalHeader'
import type { ModalHeaderProps } from './ModalHeader/props'
import { ModalBody } from './ModalBody'
import type { ModalBodyProps } from './ModalBody/props'
import { ModalFooter } from './ModalFooter'
import type { ModalFooterProps } from './ModalFooter/props'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type {
  ModalProps,
  ModalState,
  ModalPropsForPortal,
  ModalPropsForTransition
} from './props'

type HeaderChild = React.ComponentElement<ModalHeaderProps, ModalHeader>
type BodyChild = React.ComponentElement<ModalBodyProps, ModalBody>
type FooterChild = React.ComponentElement<ModalFooterProps, ModalFooter>

/**
---
category: components
tags: overlay, portal, dialog
---
@tsProps
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Modal extends Component<ModalProps, ModalState> {
  static readonly componentId = 'Modal'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    open: false,
    size: 'auto',
    variant: 'default',
    transition: 'fade',
    insertAt: 'bottom',
    shouldCloseOnDocumentClick: true,
    shouldReturnFocus: true,
    constrain: 'window',
    overflow: 'scroll'
  }

  static Header = ModalHeader
  static Body = ModalBody
  static Footer = ModalFooter

  constructor(props: ModalProps) {
    super(props)

    this.state = {
      transitioning: false
    }
  }

  _DOMNode: PortalNode = null
  _content: Dialog | null = null
  _captureDialog = false
  _preventCloseOnDocumentClick = false
  _ownerDocument: Node | null = null
  ref?: Element | null = null

  handleRef = (el?: Element | null) => {
    this.ref = el
    this._ownerDocument = ownerDocument(this.ref)
    addEventListener(
      this._ownerDocument,
      'mousedown',
      this.captureDocumentClick,
      true
    )
    addEventListener(this._ownerDocument, 'click', this.onClick, true)
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate(prevProps: ModalProps) {
    if (prevProps.open && !this.props.open) {
      // closing
      this.setState({
        transitioning: prevProps.transition !== null
      })
    }
    this.props.makeStyles?.()
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

  handleTransitionExited: ModalProps['onExited'] = () => {
    this.setState({
      transitioning: false
    })
  }

  contentRef = (el: Dialog | null) => {
    this._content = el
    if (typeof this.props.contentRef === 'function') {
      this.props.contentRef(el)
    }
  }

  renderChildren() {
    const { children, variant, overflow } = this.props

    return Children.map(
      children as (HeaderChild | BodyChild | FooterChild)[],
      (child) => {
        if (!child) return // ignore null, falsy children

        if (matchComponentTypes<BodyChild>(child, [ModalBody])) {
          return safeCloneElement(child, {
            variant: variant,
            overflow: child.props.overflow || overflow
          })
        } else {
          return safeCloneElement(child, {
            variant: variant
          })
        }
      }
    )
  }

  captureDocumentClick: React.MouseEventHandler<any> = (event) => {
    const { target } = event
    const _dialogElement = findDOMNode(this._content) as Element
    this._preventCloseOnDocumentClick =
      event.button !== 0 || contains(_dialogElement, target as Node)
  }

  onClick: React.MouseEventHandler<any> = (event) => {
    const { shouldCloseOnDocumentClick } = this.props
    if (shouldCloseOnDocumentClick && !this._preventCloseOnDocumentClick) {
      this.props.onDismiss?.(event, true)
    }
  }

  renderDialog(
    props: Omit<
      ModalProps,
      | keyof ModalPropsForPortal
      | keyof ModalPropsForTransition
      | 'constrain'
      | 'overflow'
    >
  ) {
    const {
      onDismiss,
      label,
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
        shouldCloseOnDocumentClick={false}
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
