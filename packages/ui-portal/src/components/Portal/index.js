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

import bidirectional from '@instructure/ui-i18n/lib/bidirectional'

import shallowEqual from '@instructure/ui-utils/lib/shallowEqual'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import deprecated from '@instructure/ui-utils/lib/react/deprecated'
import testable from '@instructure/ui-testable'

/**
---
category: components/utilities
---
**/
@testable()
@deprecated('3.0.0', {
  container: 'mountNode',
  isOpen: 'open',
  onReady: 'onOpen'
})
@bidirectional()
export default class Portal extends Component {
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
    mountNode: PropTypes.oneOfType([CustomPropTypes.element, PropTypes.func]),
    /**
     * Insert the element at the 'top' of the mountNode or at the 'bottom'
     */
    insertAt: PropTypes.oneOf(['bottom', 'top']),

    /**
     * The children to be rendered within the `<Portal />`
     */
    children: PropTypes.node
  }

  static defaultProps = {
    open: false,
    insertAt: 'bottom',
    onOpen: () => {},
    onClose: () => {},
    mountNode: null,
    children: null
  }

  componentDidMount () {
    this.renderPortal(this.props)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !(shallowEqual(this.props, nextProps) && shallowEqual(this.state, nextState))
  }

  componentWillReceiveProps (nextProps) {
    this.renderPortal(nextProps)
  }

  componentWillUnmount () {
    this.removePortal(this.props)
  }

  render () {
    return null
  }

  renderPortal (props) {
    const isInitialMount = !this.DOMNode
    const mountNode = this.mountNode

    let children = props.children

    // Wrap text in a span since subtree will only render a single top-level node
    if (typeof children === 'string' && children.length > 0) {
      children = (
        <span>
          {children}
        </span>
      )
    }

    // Render subtree if Portal is open and has children to render
    if (props.open && React.Children.count(children) > 0) {
      // Create node if it doesn't already exist
      if (!this.DOMNode) {
        this.DOMNode = document.createElement('span')
        this.DOMNode.setAttribute('dir', this.dir)
      }

      // Append node to container if it isn't already
      if (this.DOMNode.parentNode !== mountNode) {
        if (this.props.insertAt === 'bottom') {
          mountNode.appendChild(this.DOMNode)
        } else {
          mountNode.insertBefore(this.DOMNode, mountNode.firstChild)
        }
      }

      // Notify that subtree has been rendered if props ask for it
      const handleMount = () => {
        // Only fire onOpen if Portal was closed and is now open
        if ((isInitialMount || (!this.props.open && props.open)) && typeof props.onOpen === 'function') {
          props.onOpen(this.DOMNode)
        }
      }

      ReactDOM.unstable_renderSubtreeIntoContainer(this, children, this.DOMNode, handleMount)
    } else {
      this.removePortal(props)
    }
  }

  removePortal (props) {
    let unmounted

    if (this.DOMNode) {
      unmounted = ReactDOM.unmountComponentAtNode(this.DOMNode)
      this.DOMNode.parentNode && this.DOMNode.parentNode.removeChild(this.DOMNode)
      this.DOMNode = null
    }

    if (unmounted && typeof props.onClose === 'function') {
      props.onClose()
    }
  }

  get mountNode () {
    let mountNode

    if (typeof this.props.mountNode === 'function') {
      mountNode = ReactDOM.findDOMNode(this.props.mountNode.call(null)) // eslint-disable-line react/no-find-dom-node
    } else if (this.props.mountNode) {
      mountNode = ReactDOM.findDOMNode(this.props.mountNode) // eslint-disable-line react/no-find-dom-node
    }

    if (!mountNode || !mountNode.nodeName) {
      mountNode = document.body
    }

    return mountNode
  }

  get DOMNode () {
    return this._node
  }

  set DOMNode (el) {
    this._node = el
  }

  // for backwards compatibility:
  get node () {
    return this.DOMNode
  }
}
