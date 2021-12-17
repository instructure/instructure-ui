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

import React, { Component, ComponentClass, ReactElement } from 'react'

import { testable } from '@instructure/ui-testable'
import { createChainedFunction } from '@instructure/ui-utils'
import { omitProps, pickProps } from '@instructure/ui-react-utils'

import { Dialog } from '@instructure/ui-dialog'
import type { DialogProps } from '@instructure/ui-dialog'
import { Portal } from '@instructure/ui-portal'
import type { PortalNode } from '@instructure/ui-portal'
import { Transition } from '@instructure/ui-motion'
import type { TransitionType } from '@instructure/ui-motion'

import type { OverlayProps, OverlayState } from './props'
import { allowedProps, propTypes } from './props'

/**
---
category: components
---
@tsProps
**/
@testable()
class Overlay extends Component<OverlayProps, OverlayState> {
  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    open: false,
    insertAt: 'bottom',
    shouldContainFocus: false,
    shouldReturnFocus: false,
    shouldCloseOnDocumentClick: false,
    shouldCloseOnEscape: true,
    in: false,
    unmountOnExit: false,
    transitionOnMount: false,
    transitionEnter: true,
    transitionExit: true
  }

  constructor(props: OverlayProps) {
    super(props)

    this.state = {
      open: props.open!,
      transitioning: false
    }
  }

  private _timeouts: ReturnType<typeof setTimeout>[] = []
  private _DOMNode: PortalNode = null
  private _isMounted = false

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentDidUpdate(prevProps: OverlayProps) {
    if (prevProps.open && !this.props.open) {
      // closing
      this.setState({
        transitioning: !!prevProps.transition
      })
    }
  }

  componentWillUnmount() {
    this._isMounted = false
    this._timeouts.forEach((timeout) => clearTimeout(timeout))
  }

  get DOMNode() {
    return this._DOMNode
  }

  set DOMNode(el) {
    this._DOMNode = el
  }

  handlePortalOpen = (DOMNode: PortalNode) => {
    this.DOMNode = DOMNode

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

  handleTransitionExited = (_type?: TransitionType) => {
    this.setState({
      open: false,
      transitioning: false
    })
  }

  renderTransition(
    content: ReactElement<DialogProps, ComponentClass<DialogProps>>
  ) {
    return (
      <Transition
        {...pickProps(this.props, Transition.allowedProps)}
        in={this.props.open}
        transitionOnMount
        unmountOnExit
        type={this.props.transition}
        onExited={createChainedFunction(
          this.handleTransitionExited,
          this.props.onExited
        )}
      >
        {content}
      </Transition>
    )
  }

  render() {
    let content: ReactElement<DialogProps, ComponentClass<DialogProps>> = (
      <Dialog
        {...omitProps(this.props, Overlay.allowedProps)}
        {...pickProps(this.props, Dialog.allowedProps)}
        defaultFocusElement={this.props.defaultFocusElement}
        open={this.state.open}
        elementRef={this.handleRef}
      >
        {this.props.children}
      </Dialog>
    )

    if (this.props.transition) {
      content = this.renderTransition(content)
    }

    return (
      <Portal
        {...pickProps(this.props, Portal.allowedProps)}
        open={this.props.open || this.state.transitioning}
        onOpen={createChainedFunction(this.handlePortalOpen, this.props.onOpen)}
      >
        {content}
      </Portal>
    )
  }
}

export default Overlay
export { Overlay }
