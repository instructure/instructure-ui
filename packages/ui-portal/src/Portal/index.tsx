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
import ReactDOM from 'react-dom'

import { passthroughProps } from '@instructure/ui-react-utils'
import { textDirectionContextConsumer } from '@instructure/ui-i18n'
import { canUseDOM } from '@instructure/ui-dom-utils'

import { propTypes, allowedProps } from './props'
import type { PortalNode, PortalProps, PortalState } from './props'

/**
---
category: components/utilities
---
@module Portal
@tsProps
**/
@textDirectionContextConsumer()
class Portal extends Component<PortalProps, PortalState> {
  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    open: false,
    insertAt: 'bottom',
    onOpen: () => {},
    onClose: () => {},
    mountNode: null,
    children: null,
    elementRef: () => {}
  }

  constructor(props: PortalProps) {
    super(props)

    if (!canUseDOM) {
      return
    }

    this.state = {
      mountNode: this.findMountNode(props)
    }
  }

  DOMNode: PortalNode = null

  componentDidMount() {
    if (!canUseDOM) {
      return
    }
    // If Portal is mounting in an open condition fire onOpen handler
    if (this.props.open && typeof this.props.onOpen === 'function') {
      this.props.onOpen(this.DOMNode)
    }
  }

  componentDidUpdate(prevProps: PortalProps) {
    if (!canUseDOM) {
      return
    }
    const mountNode = this.findMountNode(this.props)

    if (mountNode !== this.state.mountNode) {
      // set state here to make the component re-render
      this.setState({ mountNode })
    }

    // If Portal was closed but is now open fire onOpen handler
    if (
      this.props.open &&
      !prevProps.open &&
      typeof this.props.onOpen === 'function'
    ) {
      this.props.onOpen(this.DOMNode)
    }

    // If Portal was open but is now closed fire onClose handler
    if (
      !this.props.open &&
      prevProps.open &&
      typeof this.props.onClose === 'function'
    ) {
      this.props.onClose()
    }
  }

  componentWillUnmount() {
    if (!canUseDOM) {
      return
    }
    this.removeNode()

    // If Portal was open fire onClose handler
    if (this.props.open && typeof this.props.onClose === 'function') {
      this.props.onClose()
    }
  }

  removeNode() {
    if (
      this.DOMNode &&
      this.DOMNode.parentNode &&
      typeof this.DOMNode.parentNode.removeChild === 'function'
    ) {
      this.DOMNode.parentNode.removeChild(this.DOMNode)
      this.DOMNode = null

      if (typeof this.props.elementRef === 'function') {
        this.props.elementRef(this.DOMNode)
      }
    }
  }

  insertNode() {
    const {
      open,
      insertAt,
      onOpen,
      onClose,
      mountNode,
      children,
      elementRef,
      dir,
      ...props
    } = this.props

    // Create node if it doesn't already exist
    if (!this.DOMNode) {
      const node = document.createElement('span')
      const attributes: Partial<PortalProps> = {
        ...passthroughProps(props as Partial<PortalProps>),
        dir
      }

      ;(Object.keys(attributes) as Array<keyof PortalProps>).forEach((name) => {
        node.setAttribute(name, attributes[name] as string)
      })

      if (typeof elementRef === 'function') {
        elementRef(node)
      }

      this.DOMNode = node
    }

    // Append node to container if it isn't already
    if (this.DOMNode.parentNode !== this.state.mountNode) {
      if (insertAt === 'bottom') {
        this.state.mountNode.appendChild(this.DOMNode)
      } else {
        this.state.mountNode.insertBefore(
          this.DOMNode,
          this.state.mountNode.firstChild
        )
      }
    }

    return this.DOMNode
  }

  findMountNode(props: PortalProps) {
    let mountNode: Element | undefined | null

    if (typeof props.mountNode === 'function') {
      mountNode = props.mountNode()
    } else if (props.mountNode) {
      mountNode = props.mountNode
    }

    if (!mountNode || !mountNode.nodeName) {
      mountNode = document.body
    }

    return mountNode
  }

  get node() {
    return this.DOMNode
  }

  render(): React.ReactPortal | null {
    if (!canUseDOM) {
      return null
    }

    const { children } = this.props

    return this.props.open && React.Children.count(children) > 0
      ? ReactDOM.createPortal(children, this.insertNode())
      : null
  }
}

export default Portal
export { Portal }
