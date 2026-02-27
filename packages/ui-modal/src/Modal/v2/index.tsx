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

import { Children, Component, isValidElement } from 'react'

import { passthroughProps, safeCloneElement } from '@instructure/ui-react-utils'
import { createChainedFunction } from '@instructure/ui-utils'

import { Transition } from '@instructure/ui-motion'
import { Portal } from '@instructure/ui-portal'
import type { PortalNode } from '@instructure/ui-portal'
import { Dialog } from '@instructure/ui-dialog'
import { Mask } from '@instructure/ui-overlays/latest'

import { ModalHeader } from './ModalHeader'
import { ModalBody } from './ModalBody'
import { ModalFooter } from './ModalFooter'

import { withStyle } from '@instructure/emotion'

import generateStyle from './styles'

import { allowedProps } from './props'
import type {
  ModalProps,
  ModalState,
  ModalPropsForPortal,
  ModalPropsForTransition
} from './props'

/**
---
category: components
tags: overlay, portal, dialog
---
**/
@withStyle(generateStyle)
class Modal extends Component<ModalProps, ModalState> {
  static readonly componentId = 'Modal'

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
      transitioning: false,
      open: props.open ?? false,
      windowHeight: 99999
    }
  }

  _DOMNode: PortalNode = null
  _content: Dialog | null = null

  ref?: Element | null = null

  handleRef = (el?: Element | null) => {
    this.ref = el
  }

  componentDidMount() {
    this.props.makeStyles?.()
    window.addEventListener('resize', this.updateHeight)
  }

  componentDidUpdate(prevProps: ModalProps) {
    if (this.props.open !== prevProps.open) {
      this.setState({ transitioning: true, open: !!this.props.open })
    }
    this.props.makeStyles?.()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateHeight)
  }

  updateHeight = () => {
    this.setState({ windowHeight: window.innerHeight })
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

  handleTransitionComplete: ModalProps['onEntered' | 'onExited'] = () => {
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
    const { children, variant, overflow, styles } = this.props
    const childrenArray = Children.toArray(children)

    const headerAndBody: React.ReactNode[] = []
    const others: React.ReactNode[] = []

    childrenArray.forEach((child) => {
      if (isValidElement(child)) {
        if (child.type === Modal.Header || child.type === Modal.Body) {
          headerAndBody.push(this.cloneChildWithProps(child, variant, overflow))
        } else {
          others.push(this.cloneChildWithProps(child, variant, overflow))
        }
      }
    })

    // Putting ModalHeader and ModalBody into the same container, so they can be styled together;
    // this is needed to apply a media query breakpoint
    const wrappedHeaderAndBody =
      headerAndBody.length > 0 ? (
        <div key="header-and-body" css={styles?.joinedHeaderAndBody}>
          {headerAndBody}
        </div>
      ) : null

    return [...(wrappedHeaderAndBody ? [wrappedHeaderAndBody] : []), ...others]
  }

  cloneChildWithProps(
    child: React.ReactNode,
    variant: string | undefined,
    overflow: string | undefined
  ) {
    if (isValidElement(child)) {
      return safeCloneElement(child, {
        variant: variant,
        overflow: (child?.props as { overflow: string })?.overflow || overflow
      })
    } else {
      return child
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
      overflow, // TODO this is not used currently
      ...passthroughProps
    } = this.props

    const portalIsOpen = this.state.open || this.state.transitioning

    return (
      <Portal
        mountNode={mountNode}
        insertAt={insertAt}
        open={portalIsOpen}
        onOpen={this.handlePortalOpen}
        data-cid="Modal"
      >
        <Transition
          in={open}
          transitionOnMount
          type={transition}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={createChainedFunction(
            this.handleTransitionComplete,
            onEntered,
            onOpen
          )}
          onExit={onExit}
          onExiting={onExiting}
          onExited={createChainedFunction(
            this.handleTransitionComplete,
            onExited,
            onClose
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
      </Portal>
    )
  }
}

export default Modal
export { Modal, ModalHeader, ModalBody, ModalFooter }
