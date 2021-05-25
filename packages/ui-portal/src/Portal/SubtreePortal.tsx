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
import ReactDOM from 'react-dom'

import { passthroughProps } from '@instructure/ui-react-utils'
import { bidirectional } from '@instructure/ui-i18n'
import { element } from '@instructure/ui-prop-types'
import { shallowEqual } from '@instructure/ui-utils'

/* istanbul ignore file */

type Props = {
  open?: boolean
  onOpen?: (...args: any[]) => any
  onClose?: (...args: any[]) => any
  mountNode?: any // TODO: PropTypes.oneOfType([element, PropTypes.func]),
  insertAt?: 'bottom' | 'top'
  elementRef?: (...args: any[]) => any
  dir?: any // TODO: PropTypes.oneOf(Object.values(bidirectional.DIRECTION))
}

/**
---
private: true
---
@module SubtreePortal
**/
@bidirectional()
class SubtreePortal extends Component<Props> {
  static propTypes = {
    /**
     * Wheter or not the `<Portal />` is open
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
     * The children to be rendered within the `<Portal />`
     */
    children: PropTypes.node,
    /**
     * provides a reference to the underlying html element
     */
    elementRef: PropTypes.func,
    //@ts-expect-error FIXME:
    // eslint-disable-next-line react/require-default-props
    dir: PropTypes.oneOf(Object.values(bidirectional.DIRECTION))
  }

  static defaultProps = {
    open: false,
    insertAt: 'bottom',
    // @ts-expect-error ts-migrate(6133) FIXME: 'DOMNode' is declared but its value is never read.
    onOpen: (DOMNode) => {},
    onClose: () => {},
    mountNode: null,
    children: null,
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    elementRef: (el) => {}
  }

  componentDidMount() {
    this.renderPortal(this.props)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'nextProps' implicitly has an 'any' type... Remove this comment to see the full error message
  shouldComponentUpdate(nextProps, nextState) {
    return !(
      shallowEqual(this.props, nextProps) && shallowEqual(this.state, nextState)
    )
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'nextProps' implicitly has an 'any' type... Remove this comment to see the full error message
  componentWillReceiveProps(nextProps) {
    this.renderPortal(nextProps)
  }

  componentWillUnmount() {
    this.removePortal(this.props)
  }

  render() {
    return null
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  renderPortal(props) {
    const {
      open,
      insertAt,
      onOpen,
      onClose,
      elementRef,
      children,
      ...passThroughProps
    } = props

    const isInitialMount = !this.DOMNode
    const mountNode = this.mountNode

    let content = children

    // Wrap text in a span since subtree will only render a single top-level node
    if (typeof content === 'string' && content.length > 0) {
      content = <span>{content}</span>
    }

    // Render subtree if Portal is open and has children to render
    if (open && React.Children.count(content) > 0) {
      // Create node if it doesn't already exist
      if (!this.DOMNode) {
        const node = document.createElement('span')
        const attributes = {
          ...passthroughProps(passThroughProps),
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'dir' does not exist on type 'SubtreePort... Remove this comment to see the full error message
          dir: this.dir
        }
        Object.keys(attributes).forEach((name) => {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          node.setAttribute(name, attributes[name])
        })
        elementRef(node)
        this.DOMNode = node
      }

      // Append node to container if it isn't already
      if (this.DOMNode.parentNode !== mountNode) {
        if (insertAt === 'bottom') {
          mountNode.appendChild(this.DOMNode)
        } else {
          mountNode.insertBefore(this.DOMNode, mountNode.firstChild)
        }
      }

      // Notify that subtree has been rendered if props ask for it
      const handleMount = () => {
        // Only fire onOpen if Portal was closed and is now open
        if (
          (isInitialMount || (!this.props.open && open)) &&
          typeof onOpen === 'function'
        ) {
          onOpen(this.DOMNode)
        }
      }

      ReactDOM.unstable_renderSubtreeIntoContainer(
        this,
        content,
        this.DOMNode,
        handleMount
      )
    } else {
      this.removePortal(props)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  removePortal(props) {
    let unmounted

    if (this.DOMNode) {
      unmounted = ReactDOM.unmountComponentAtNode(this.DOMNode)
      this.DOMNode.parentNode &&
        this.DOMNode.parentNode.removeChild(this.DOMNode)
      this.DOMNode = null
      // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      this.props.elementRef(this.DOMNode)
    }

    if (unmounted && typeof props.onClose === 'function') {
      props.onClose()
    }
  }

  get mountNode() {
    let mountNode

    if (typeof this.props.mountNode === 'function') {
      mountNode = this.props.mountNode()
    } else if (this.props.mountNode) {
      mountNode = this.props.mountNode
    }

    if (!mountNode || !mountNode.nodeName) {
      mountNode = document.body
    }

    return mountNode
  }

  get DOMNode() {
    // @ts-expect-error ts-migrate(2551) FIXME: Property '_node' does not exist on type 'SubtreePo... Remove this comment to see the full error message
    return this._node
  }

  set DOMNode(el) {
    // @ts-expect-error ts-migrate(2551) FIXME: Property '_node' does not exist on type 'SubtreePo... Remove this comment to see the full error message
    this._node = el
  }

  // for backwards compatibility:
  get node() {
    return this.DOMNode
  }
}

export default SubtreePortal
export { SubtreePortal }
