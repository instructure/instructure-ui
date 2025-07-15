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

import { Component } from 'react'

import { Dialog } from '@instructure/ui-dialog'
import { omitProps } from '@instructure/ui-react-utils'
import { createChainedFunction } from '@instructure/ui-utils'
import { textDirectionContextConsumer } from '@instructure/ui-i18n'
import { testable } from '@instructure/ui-testable'
import { Portal } from '@instructure/ui-portal'
import type { PortalNode } from '@instructure/ui-portal'
import { mirrorHorizontalPlacement } from '@instructure/ui-position'
import { Transition } from '@instructure/ui-motion'
import type { TransitionType } from '@instructure/ui-motion'
import { withStyle } from '@instructure/emotion'
import generateStyle from './styles'
import generateComponentTheme from './theme'
import { allowedProps } from './props'
import type { TrayProps, TrayState } from './props'
import { Mask } from '@instructure/ui-overlays'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@textDirectionContextConsumer()
@testable()
class Tray extends Component<TrayProps> {
  static readonly componentId = 'Tray'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    defaultFocusElement: null,
    open: false,
    insertAt: 'bottom',
    shouldCloseOnDocumentClick: false,
    shouldContainFocus: true,
    shouldReturnFocus: true,
    size: 'small',
    placement: 'start',
    transitionOnMount: true,
    transitionEnter: true,
    transitionExit: true,
    shadow: true,
    border: false,
    enableMask: false
  }
  ref: Element | null = null
  dialogRef: Dialog | null = null

  state: TrayState

  constructor(props: TrayProps) {
    super(props)
    this.state = {
      transitioning: false,
      open: props.open ?? false
    }
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate(prevProps: TrayProps, _prevState: TrayState) {
    if (this.props.open !== prevProps.open) {
      if (!this.props.open) {
        // calling Dialog.close() to remove focusregion immediately when transition starts
        // so if a new Tray is opened (during transition) the new focusregion won't get treated as a child of this one
        this.dialogRef?.close()
      }

      this.setState({ transitioning: true, open: this.props.open })
    }
    this.props.makeStyles?.()
  }

  get placement() {
    const { placement, dir } = this.props
    const isRtl = dir === textDirectionContextConsumer.DIRECTION.rtl
    return isRtl ? mirrorHorizontalPlacement(placement!, ' ') : placement
  }

  get direction() {
    switch (this.placement) {
      case 'top':
        return 'up'
      case 'bottom':
        return 'down'
      case 'end':
        return 'right'
      default:
        // start
        return 'left'
    }
  }

  get transition(): TransitionType {
    return `slide-${this.direction}`
  }

  handleTransitionComplete = (_type?: TransitionType) => {
    this.setState({ transitioning: false })
  }

  get DOMNode() {
    // The DOMNode property is needed for Portal type components
    return this.ref
  }

  set DOMNode(el) {
    this.ref = el ? el : null
  }

  handlePortalOpen = (DOMNode: PortalNode) => {
    if (DOMNode) {
      this.DOMNode = DOMNode
    }
  }

  render() {
    const {
      label,
      children,
      size,
      placement,
      open,
      defaultFocusElement,
      contentRef,
      shouldContainFocus,
      shouldReturnFocus,
      shouldCloseOnDocumentClick,
      onOpen,
      onClose,
      onDismiss,
      mountNode,
      insertAt,
      liveRegion,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      onTransition,
      transitionOnMount,
      transitionEnter,
      transitionExit,
      border,
      shadow,
      role,
      enableMask,
      ...props
    } = this.props

    const portalIsOpen = this.state.open || this.state.transitioning

    const content = (
      <Transition
        in={open}
        type={this.transition}
        onTransition={onTransition}
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
        transitionOnMount={transitionOnMount}
        transitionEnter={transitionEnter}
        transitionExit={transitionExit}
      >
        <span
          {...omitProps(props, Tray.allowedProps)}
          css={this.props.styles?.tray}
          ref={contentRef}
        >
          <Dialog
            ref={(element) => (this.dialogRef = element)}
            as="div"
            label={label}
            defaultFocusElement={defaultFocusElement}
            open
            shouldContainFocus={shouldContainFocus}
            shouldReturnFocus={shouldReturnFocus}
            shouldCloseOnDocumentClick={shouldCloseOnDocumentClick}
            shouldCloseOnEscape
            liveRegion={liveRegion}
            onDismiss={onDismiss}
            role={role}
          >
            <div css={this.props.styles?.content}>{children}</div>
          </Dialog>
        </span>
      </Transition>
    )

    return (
      <Portal
        open={portalIsOpen}
        onOpen={this.handlePortalOpen}
        insertAt={insertAt}
        mountNode={mountNode}
      >
        {enableMask ? (
          <Mask placement={'center'} fullscreen={true}>
            {content}
          </Mask>
        ) : (
          content
        )}
      </Portal>
    )
  }
}

export default Tray
export { Tray }
