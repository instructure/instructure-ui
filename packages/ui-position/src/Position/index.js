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
import classnames from 'classnames'

import { themeable } from '@instructure/ui-themeable'
import { element } from '@instructure/ui-prop-types'
import {
  ComponentIdentifier,
  safeCloneElement,
  callRenderProp,
  ensureSingleChild,
  deprecated
} from '@instructure/ui-react-utils'
import {
  addPositionChangeListener,
  findDOMNode
} from '@instructure/ui-dom-utils'
import { uid } from '@instructure/uid'
import { shallowEqual, deepEqual } from '@instructure/ui-utils'
import { debounce } from '@instructure/debounce'
import { testable } from '@instructure/ui-testable'

import { Portal } from '@instructure/ui-portal'

import { calculateElementPosition } from '../calculateElementPosition'
import { PositionPropTypes } from '../PositionPropTypes'

import styles from './styles.css'
import theme from './theme'

@deprecated('8.0.0', null, "Use Position's `renderTarget` prop instead.")
@testable()
class PositionTarget extends ComponentIdentifier {
  static displayName = 'PositionTarget'
  static locatorAttribute = 'data-position-target'
}

@deprecated('8.0.0', null, "Use Posiition's `children` instead.")
@testable()
class PositionContent extends ComponentIdentifier {
  static displayName = 'PositionContent'
  static propTypes = {
    children: PropTypes.node,
    placement: PositionPropTypes.placement
  }
  static locatorAttribute = 'data-position-content'
}

/**
---
category: components/utilities
---
**/
@deprecated('8.0.0', {
  trackPosition: 'shouldTrackPosition',
  over: 'shouldPositionOverTarget'
})
@testable()
@themeable(theme, styles)
class Position extends Component {
  static Target = PositionTarget
  static Content = PositionContent
  static locatorAttribute = 'data-position'
  static targetLocatorAttribute = 'data-position-target'
  static contentLocatorAttribute = 'data-position-content'

  static propTypes = {
    /**
     * The node to use as the position target
     */
    renderTarget: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * The target to be used when not using `renderTarget`
     */
    target: PropTypes.oneOfType([element, PropTypes.func]),
    /**
     * The placement of the content in relation to the target
     */
    placement: PositionPropTypes.placement,
    /**
     * An element or a function returning an element to use as the mount node
     * for the `<Position />` (defaults to `document.body`)
     */
    mountNode: PositionPropTypes.mountNode,
    /**
     * Insert the element at the 'top' of the mountNode or at the 'bottom'
     */
    insertAt: PropTypes.oneOf(['bottom', 'top']),
    /**
     * The parent in which to constrain the placement.
     * One of: 'window', 'scroll-parent', 'parent', 'none', an element,
     * or a function returning an element
     */
    constrain: PositionPropTypes.constrain,
    /**
     * The horizontal offset for the positioned content
     */
    offsetX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * The vertical offset for the positioned content
     */
    offsetY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * An id will be generated if not provided
     */
    id: PropTypes.string,
    /**
     * Whether or not position of the target should be tracked or just set statically on render
     */
    shouldTrackPosition: PropTypes.bool,
    /**
     * Whether or not you want the content to position over the target
     */
    shouldPositionOverTarget: PropTypes.bool,
    /**
     * Callback fired when the position changes
     */
    onPositionChanged: PropTypes.func,
    /**
     * Callback fired when `<Position />` content has been mounted and is initially positioned
     */
    onPositioned: PropTypes.func,
    /**
     * The content to be positioned
     */
    children: PropTypes.node,

    /* eslint-disable react/require-default-props */
    /**
     * __Deprecated - use `shouldTrackPosition`__
     */
    trackPosition: PropTypes.bool,
    /**
     * __Deprecated - use `shouldPositionOverTarget`__
     */
    over: PropTypes.bool
    /* eslint-enable react/require-default-props */
  }

  static defaultProps = {
    renderTarget: undefined,
    target: undefined,
    placement: 'bottom center',
    mountNode: null,
    insertAt: 'bottom',
    constrain: 'window',
    offsetX: 0,
    offsetY: 0,
    id: undefined,
    shouldTrackPosition: true,
    shouldPositionOverTarget: false,
    onPositioned: (position) => {},
    onPositionChanged: (position) => {},
    children: null
  }

  constructor(props) {
    super(props)

    this.state = {
      positioned: false,
      ...this.calculatePosition(props)
    }

    this.position = debounce(this.position, 0, {
      leading: false,
      trailing: true
    })
    this._id = this.props.id || uid('Position')
  }

  _timeouts = []

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !deepEqual(this.state, nextState) ||
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.context, nextContext)
    )
  }

  componentDidMount() {
    this.toggleLocatorAttributes(true)
  }

  componentDidUpdate(prevProps, prevState) {
    this.position()
    this.toggleLocatorAttributes(true)

    if (this.props.shouldTrackPosition !== prevProps.shouldTrackPosition) {
      this.props.shouldTrackPosition
        ? this.startTracking()
        : this.stopTracking()
    } else if (this.props.trackPosition !== prevProps.trackPosition) {
      this.props.trackPosition ? this.startTracking() : this.stopTracking()
    }

    const { style, placement } = this.state

    if (
      style &&
      prevState.style &&
      (placement !== prevState.placement ||
        style.top !== prevState.style.top ||
        style.left !== prevState.style.left)
    ) {
      this.props.onPositionChanged({
        top: style.top,
        left: style.left,
        placement
      })
    }
  }

  componentWillUnmount() {
    this.position.cancel()
    this.stopTracking()
    this._timeouts.forEach((timeout) => clearTimeout(timeout))

    this.toggleLocatorAttributes(false)
  }

  toggleLocatorAttributes(set) {
    // We have to find the actual DOM nodes and append the attributes
    // directly, as we can't be sure when safe cloning the child that
    // it will accept the data attribute as a prop
    this.toggleLocatorAttribute(
      findDOMNode(this._content),
      Position.contentLocatorAttribute,
      set
    )

    this.toggleLocatorAttribute(
      findDOMNode(this._target),
      Position.targetLocatorAttribute,
      set
    )
  }

  toggleLocatorAttribute(node, locator, set) {
    if (node && node.hasAttribute) {
      if (set && !node.hasAttribute(locator)) {
        node.setAttribute(locator, this._id)
      }

      if (!set && node.hasAttribute(locator)) {
        node.removeAttribute(locator)
      }
    }
  }

  handlePortalOpen = () => {
    this.position()

    if (this.props.shouldTrackPosition || this.props.trackPosition) {
      this.startTracking()
    }

    this._timeouts.push(
      setTimeout(() => {
        if (
          this.state.positioned &&
          typeof this.props.onPositioned === 'function'
        ) {
          this.props.onPositioned({
            top: this.state.style.top,
            left: this.state.style.left,
            placement: this.state.placement
          })
        }
      }, 0)
    )
  }

  calculatePosition(props) {
    return calculateElementPosition(this._content, this._target, {
      placement: props.placement,
      offsetX: props.offsetX,
      offsetY: props.offsetY,
      constrain: props.constrain,
      container: props.mountNode,
      over: props.shouldPositionOverTarget || props.over
    })
  }

  position = () => {
    this.setState({
      positioned: true,
      ...this.calculatePosition(this.props)
    })
  }

  startTracking() {
    this._listener =
      this._listener || addPositionChangeListener(this._target, this.position)
  }

  stopTracking() {
    if (this._listener) {
      this._listener.remove()
      this._listener = null
    }
  }

  renderContent() {
    let content = ComponentIdentifier.pick(
      Position.Content,
      this.props.children
    )
    if (!content) {
      content = ensureSingleChild(this.props.children)
    }

    if (content) {
      content = safeCloneElement(content, {
        ref: (el) => {
          this._content = el
        },
        style: {
          ...content.props.style,
          ...this.state.style
        },
        className: classnames({
          [styles.root]: true,
          [content.props.className]: content.props.className // eslint-disable-line react/prop-types
        }),
        [Position.contentLocatorAttribute]: this._id
      })

      content = (
        <Portal
          open
          onOpen={this.handlePortalOpen}
          mountNode={this.props.mountNode}
          insertAt={this.props.insertAt}
        >
          {content}
        </Portal>
      )
    }

    return content
  }

  renderTarget() {
    let target = ComponentIdentifier.pick(Position.Target, this.props.children)
    if (!target) {
      target = callRenderProp(this.props.renderTarget)
    }

    if (target) {
      return safeCloneElement(target, {
        ref: (el) => {
          this._target = el
        },
        [Position.targetLocatorAttribute]: this._id
      })
    } else if (this.props.target) {
      this._target = callRenderProp(this.props.target)
    } else {
      return null
    }
  }

  render() {
    const props = { [Position.locatorAttribute]: this._id }
    return (
      <span {...props}>
        {this.renderTarget()}
        {this.renderContent()}
      </span>
    )
  }
}

export default Position
export { Position }
