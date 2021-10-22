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
import { withStyle, jsx } from '@instructure/emotion'
import generateStyle from './styles'
import generateComponentTheme from './theme'
import { propTypes, allowedProps } from './props'
import type { TrayProps } from './props'

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
    open: false,
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
    mountNode: null,
    insertAt: 'bottom',
    liveRegion: null,
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    contentRef: (el) => {},
    shouldCloseOnDocumentClick: false,
    shouldContainFocus: true,
    shouldReturnFocus: true,
    defaultFocusElement: null,
    size: 'small',
    placement: 'start',
    shadow: true,
    border: false,
    children: null
  }

  state = {
    transitioning: false
  }

  ref: Element | null = null

  componentDidMount() {
    this.props.makeStyles?.()
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.open !== prevProps.open) {
      this.setState({ transitioning: true })
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

  get transition() {
    return `slide-${this.direction}`
  }

  get defaultFocusElement() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_closeButton' does not exist on type 'Tr... Remove this comment to see the full error message
    return this.props.defaultFocusElement || (() => this._closeButton)
  }

  handleTransitionComplete = () => {
    this.setState({ transitioning: false })
  }

  get DOMNode() {
    console.warn(
      'DOMNode property is deprecated and will be removed in v9, please use ref instead'
    )

    return this.ref
  }

  set DOMNode(el) {
    this.ref = el ? el : null
  }

  handlePortalOpen = (DOMNode: PortalNode) => {
    this.DOMNode = DOMNode
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
      border,
      shadow,
      ...props
    } = this.props

    const portalIsOpen = open || this.state.transitioning

    return (
      <Portal
        open={portalIsOpen}
        onOpen={this.handlePortalOpen}
        insertAt={insertAt}
        mountNode={mountNode}
      >
        {portalIsOpen && (
          <Transition
            in={open}
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
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
            transitionOnMount
            transitionEnter
            transitionExit
          >
            <span
              {...omitProps(props, Tray.allowedProps)}
              css={this.props.styles?.tray}
              ref={contentRef}
            >
              {this.state.transitioning ? (
                children
              ) : (
                <Dialog
                  as="div"
                  label={label}
                  defaultFocusElement={this.defaultFocusElement}
                  open
                  shouldContainFocus={shouldContainFocus}
                  shouldReturnFocus={shouldReturnFocus}
                  shouldCloseOnDocumentClick={shouldCloseOnDocumentClick}
                  shouldCloseOnEscape
                  liveRegion={liveRegion}
                  onDismiss={onDismiss}
                >
                  <div css={this.props.styles?.content}>{children}</div>
                </Dialog>
              )}
            </span>
          </Transition>
        )}
      </Portal>
    )
  }
}

export default Tray
export { Tray }
