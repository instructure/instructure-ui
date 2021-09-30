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

import { Dialog } from '@instructure/ui-dialog'
import { testable } from '@instructure/ui-testable'
import { createChainedFunction } from '@instructure/ui-utils'
import { omitProps, pickProps } from '@instructure/ui-react-utils'

import { Portal } from '@instructure/ui-portal'
import type { PortalNode } from '@instructure/ui-portal'
import { Transition } from '@instructure/ui-motion'
import type { OverlayProps } from './props'
import { allowedProps, propTypes } from './props'

/**
---
category: components
---
**/
@testable()
class Overlay extends Component<OverlayProps> {
  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    children: null,
    open: false,
    insertAt: 'bottom',
    onOpen: () => {},
    onClose: () => {},
    mountNode: null,
    shouldContainFocus: false,
    shouldReturnFocus: false,
    shouldCloseOnDocumentClick: false,
    shouldCloseOnEscape: true,
    applicationElement: null,
    defaultFocusElement: null,
    contentElement: null,
    onDismiss: () => {},
    transition: null,
    in: false,
    unmountOnExit: false,
    transitionOnMount: false,
    transitionEnter: true,
    transitionExit: true,
    onEnter: function () {},
    onEntering: function () {},
    onEntered: function () {},
    onExit: function () {},
    onExiting: function () {},
    onExited: function () {}
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props)

    this.state = {
      open: props.open,
      transitioning: false
    }
  }

  _timeouts = []
  _DOMNode: PortalNode = null
  ref: Element | null = null

  componentDidMount() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_isMounted' does not exist on type 'Over... Remove this comment to see the full error message
    this._isMounted = true
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
  componentDidUpdate(prevProps) {
    if (prevProps.open && !this.props.open) {
      // closing
      this.setState({
        transitioning: prevProps.transition !== null
      })
    }
  }

  componentWillUnmount() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_isMounted' does not exist on type 'Over... Remove this comment to see the full error message
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
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Timeout' is not assignable to pa... Remove this comment to see the full error message
      setTimeout(() => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_isMounted' does not exist on type 'Over... Remove this comment to see the full error message
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'content' implicitly has an 'any' type.
  renderTransition(content) {
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
    let content = (
      <Dialog
        {...omitProps(this.props, Overlay.allowedProps)}
        {...pickProps(this.props, Dialog.allowedProps)}
        defaultFocusElement={this.props.defaultFocusElement}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'open' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        open={this.state.open}
        elementRef={(element) => {
          this.ref = element
        }}
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
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'transitioning' does not exist on type 'R... Remove this comment to see the full error message
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
