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
import { Children, Component, isValidElement, ReactElement } from 'react'

import { passthroughProps, safeCloneElement } from '@instructure/ui-react-utils'
import { createChainedFunction } from '@instructure/ui-utils'
import { testable } from '@instructure/ui-testable'
import { canUseDOM } from '@instructure/ui-dom-utils'

import { Transition } from '@instructure/ui-motion'
import { Portal } from '@instructure/ui-portal'
import type { PortalNode } from '@instructure/ui-portal'
import { Dialog } from '@instructure/ui-dialog'
import { Mask } from '@instructure/ui-overlays'

import { ModalHeader } from './ModalHeader'
import { ModalBody } from './ModalBody'
import { ModalFooter } from './ModalFooter'

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

/**
---
category: components
tags: overlay, portal, dialog
---
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

  getWindowHeightInRem = (): number => {
    if (!canUseDOM) {
      return Infinity
    }
    const rootFontSize = parseFloat(
      getComputedStyle(document.documentElement)?.fontSize || '16'
    )
    if (isNaN(rootFontSize) || rootFontSize <= 0) {
      return Infinity
    }
    return window.innerHeight / rootFontSize
  }

  renderChildren() {
    const { children, variant, overflow } = this.props

    // header should be non-sticky for small viewport height (ca. 320px)
    if (this.getWindowHeightInRem() <= 20) {
      return this.renderForSmallViewportHeight()
    }

    return Children.map(children as ReactElement, (child) => {
      if (!child) return // ignore null, falsy children
      return this.cloneChildWithProps(child, variant, overflow)
    })
  }

  renderForSmallViewportHeight() {
    const { children, variant, overflow, styles } = this.props

    const headerAndBody: React.ReactNode[] = []

    const childrenArray = Children.toArray(children)

    // Separate header and body elements
    const filteredChildren = childrenArray.filter((child) => {
      if (isValidElement(child)) {
        if (child.type === Modal.Header || child.type === Modal.Body) {
          if (child.type === Modal.Header) {
            const headerWithProp = safeCloneElement(child, {
              smallViewPort: true
            })
            headerAndBody.push(headerWithProp)
          } else {
            headerAndBody.push(child)
          }
          return false
        }
      }
      return true
    })

    // Adds the <div> to the beginning of the filteredChildren array
    if (headerAndBody.length > 0) {
      filteredChildren.unshift(
        <div css={styles?.joinedHeaderAndBody}>{headerAndBody}</div>
      )
    }

    return Children.map(filteredChildren as ReactElement[], (child) => {
      if (!child) return // ignore null, falsy children
      return this.cloneChildWithProps(child, variant, overflow)
    })
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
