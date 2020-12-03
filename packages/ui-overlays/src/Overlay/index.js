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

import { Dialog } from '@instructure/ui-dialog'
import { testable } from '@instructure/ui-testable'
import { createChainedFunction } from '@instructure/ui-utils'
import { omitProps, pickProps } from '@instructure/ui-react-utils'
import { element } from '@instructure/ui-prop-types'

import { Portal } from '@instructure/ui-portal'
import { Transition } from '@instructure/ui-motion'

/**
---
category: components
---
**/
@testable()
class Overlay extends Component {
  static propTypes = {
    children: PropTypes.node,
    /**
     * Whether or not the `<Overlay />` is open
     */
    open: PropTypes.bool,
    /**
     * Callback fired when `<Portal />` content has been mounted in the DOM
     */
    onOpen: PropTypes.func,
    /**
     * Callback fired when `<Portal />` has been unmounted from the DOM
     */
    onClose: PropTypes.func,
    /**
     * An element or a function returning an element to use as the mount node
     * for the `<Portal />` (defaults to `document.body`)
     */
    mountNode: PropTypes.oneOfType([element, PropTypes.func]),
    /**
     * Insert the element at the 'top' of the mountNode or at the 'bottom'
     */
    insertAt: PropTypes.oneOf(['bottom', 'top']),
    /**
     * An accessible label for the `<Overlay />` content
     */
    label: PropTypes.string.isRequired,
    /**
     * Callback fired when the `<Overlay />` is requesting to be closed
     */
    onDismiss: PropTypes.func,
    /**
     * An element or a function returning an element to focus by default
     */
    defaultFocusElement: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func
    ]),
    /**
     * An element or a function returning an element to apply `aria-hidden` to
     */
    applicationElement: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
      PropTypes.func
    ]),
    /**
     * An element or a function returning an element that wraps the content of the `<Overlay />`
     */
    contentElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

    shouldContainFocus: PropTypes.bool,
    shouldReturnFocus: PropTypes.bool,
    shouldCloseOnDocumentClick: PropTypes.bool,
    shouldCloseOnEscape: PropTypes.bool,
    /**
     * The type of `<Transition />` to use for animating in/out
     */
    transition: Transition.propTypes.type,
    /**
     * Show the component; triggers the enter or exit animation
     */
    in: PropTypes.bool,
    /**
     * Unmount the component (remove it from the DOM) when it is not shown
     */
    unmountOnExit: PropTypes.bool,
    /**
     * Run the enter animation when the component mounts, if it is initially
     * shown
     */
    transitionOnMount: PropTypes.bool,
    /**
     * Run the enter animation
     */
    transitionEnter: PropTypes.bool,
    /**
     * Run the exit animation
     */
    transitionExit: PropTypes.bool,
    /**
     * Callback fired before the "entering" classes are applied
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired after the "entering" classes are applied
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired after the "enter" classes are applied
     */
    onEntered: PropTypes.func,
    /**
     * Callback fired before the "exiting" classes are applied
     */
    onExit: PropTypes.func,
    /**
     * Callback fired after the "exiting" classes are applied
     */
    onExiting: PropTypes.func,
    /**
     * Callback fired after the "exited" classes are applied
     */
    onExited: PropTypes.func
  }

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

  constructor(props) {
    super(props)

    this.state = {
      open: props.open,
      transitioning: false
    }
  }

  _timeouts = []

  componentDidMount() {
    this._isMounted = true
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open && !this.props.open) {
      // closing
      this.setState({
        transitioning: prevProps.transition !== null
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

  handlePortalOpen = (DOMNode) => {
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

  handleTransitionExited = () => {
    this.setState({
      open: false,
      transitioning: false
    })
  }

  renderTransition(content) {
    return (
      <Transition
        {...pickProps(this.props, Transition.propTypes)}
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
        {...omitProps(this.props, Overlay.propTypes)}
        {...pickProps(this.props, Dialog.propTypes)}
        defaultFocusElement={this.props.defaultFocusElement}
        open={this.state.open}
      >
        {this.props.children}
      </Dialog>
    )

    if (this.props.transition) {
      content = this.renderTransition(content)
    }

    return (
      <Portal
        {...pickProps(this.props, Portal.propTypes)}
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
