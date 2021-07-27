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
import PropTypes from 'prop-types'

import { element } from '@instructure/ui-prop-types'
import {
  safeCloneElement,
  callRenderProp,
  ensureSingleChild
} from '@instructure/ui-react-utils'
import {
  addPositionChangeListener,
  PositionChangeListenerType,
  findDOMNode
} from '@instructure/ui-dom-utils'
import { uid } from '@instructure/uid'
import { shallowEqual, deepEqual } from '@instructure/ui-utils'
import { debounce } from '@instructure/debounce'
import { testable } from '@instructure/ui-testable'

import { Portal } from '@instructure/ui-portal'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { calculateElementPosition } from '../calculateElementPosition'
import {
  PositionConstaint,
  PositionMountNode,
  PositionPlacement,
  PositionPropTypes
} from '../PositionPropTypes'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  renderTarget?: React.ReactNode | ((...args: any[]) => any)
  target?: PositionMountNode
  placement?: PositionPlacement
  mountNode?: PositionMountNode
  insertAt?: 'bottom' | 'top'
  constrain?: PositionConstaint
  offsetX?: string | number
  offsetY?: string | number
  id?: string
  shouldTrackPosition?: boolean
  shouldPositionOverTarget?: boolean
  onPositionChanged?: (...args: any[]) => any
  onPositioned?: (...args: any[]) => any
}

/**
---
category: components/utilities
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Position extends Component<Props> {
  static readonly componentId = 'Position'

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
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
    children: PropTypes.node
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
    // @ts-expect-error ts-migrate(6133) FIXME: 'position' is declared but its value is never read... Remove this comment to see the full error message
    onPositioned: (position) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'position' is declared but its value is never read... Remove this comment to see the full error message
    onPositionChanged: (position) => {},
    children: null
  }

  static locatorAttribute = 'data-position'
  static targetLocatorAttribute = 'data-position-target'
  static contentLocatorAttribute = 'data-position-content'

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
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
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_id' does not exist on type 'Position'.
    this._id = this.props.id || uid('Position')
  }

  _timeouts = []
  _listener: PositionChangeListenerType | null = null

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'nextProps' implicitly has an 'any' type... Remove this comment to see the full error message
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !deepEqual(this.state, nextState) ||
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.context, nextContext)
    )
  }

  componentDidMount() {
    this.toggleLocatorAttributes(true)
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState) {
    this.position()
    this.toggleLocatorAttributes(true)

    if (this.props.shouldTrackPosition !== prevProps.shouldTrackPosition) {
      this.props.shouldTrackPosition
        ? this.startTracking()
        : this.stopTracking()
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Readonly<... Remove this comment to see the full error message
    const { style, placement } = this.state

    if (
      style &&
      prevState.style &&
      (placement !== prevState.placement ||
        style.top !== prevState.style.top ||
        style.left !== prevState.style.left)
    ) {
      // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      this.props.onPositionChanged({
        top: style.top,
        left: style.left,
        placement
      })
    }

    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  componentWillUnmount() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'cancel' does not exist on type '() => vo... Remove this comment to see the full error message
    this.position.cancel()
    this.stopTracking()
    this._timeouts.forEach((timeout) => clearTimeout(timeout))

    this.toggleLocatorAttributes(false)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'set' implicitly has an 'any' type.
  toggleLocatorAttributes(set) {
    // We have to find the actual DOM nodes and append the attributes
    // directly, as we can't be sure when safe cloning the child that
    // it will accept the data attribute as a prop
    this.toggleLocatorAttribute(
      // @ts-expect-error ts-migrate(2551) FIXME: Property '_content' does not exist on type 'Positi... Remove this comment to see the full error message
      findDOMNode(this._content),
      Position.contentLocatorAttribute,
      set
    )

    this.toggleLocatorAttribute(
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_target' does not exist on type 'Positio... Remove this comment to see the full error message
      findDOMNode(this._target),
      Position.targetLocatorAttribute,
      set
    )
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
  toggleLocatorAttribute(node, locator, set) {
    if (node && node.hasAttribute) {
      if (set && !node.hasAttribute(locator)) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_id' does not exist on type 'Position'.
        node.setAttribute(locator, this._id)
      }

      if (!set && node.hasAttribute(locator)) {
        node.removeAttribute(locator)
      }
    }
  }

  handlePortalOpen = () => {
    this.position()

    if (this.props.shouldTrackPosition) {
      this.startTracking()
    }

    this._timeouts.push(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Timeout' is not assignable to pa... Remove this comment to see the full error message
      setTimeout(() => {
        if (
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'positioned' does not exist on type 'Read... Remove this comment to see the full error message
          this.state.positioned &&
          typeof this.props.onPositioned === 'function'
        ) {
          this.props.onPositioned({
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Readonly<... Remove this comment to see the full error message
            top: this.state.style.top,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Readonly<... Remove this comment to see the full error message
            left: this.state.style.left,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'placement' does not exist on type 'Reado... Remove this comment to see the full error message
            placement: this.state.placement
          })
        }
      }, 0)
    )
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  calculatePosition(props) {
    // @ts-expect-error ts-migrate(2551) FIXME: Property '_content' does not exist on type 'Positi... Remove this comment to see the full error message
    return calculateElementPosition(this._content, this._target, {
      placement: props.placement,
      offsetX: props.offsetX,
      offsetY: props.offsetY,
      constrain: props.constrain,
      container: props.mountNode,
      over: props.shouldPositionOverTarget
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
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_listener' does not exist on type 'Posit... Remove this comment to see the full error message
      this._listener || addPositionChangeListener(this._target, this.position)
  }

  stopTracking() {
    if (this._listener) {
      this._listener.remove()
      this._listener = null
    }
  }

  renderContent() {
    let content = ensureSingleChild(this.props.children)

    if (content) {
      content = safeCloneElement(content, {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
        ref: (el) => {
          // @ts-expect-error ts-migrate(2551) FIXME: Property '_content' does not exist on type 'Positi... Remove this comment to see the full error message
          this._content = el
        },
        style: {
          boxSizing: 'border-box',
          zIndex: this.props.styles.zIndex,
          ...content.props.style,
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Readonly<... Remove this comment to see the full error message
          ...this.state.style
        },
        ...(content.props.className && { className: content.props.className }),
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_id' does not exist on type 'Position'.
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
    const target = callRenderProp(this.props.renderTarget)

    if (target) {
      return safeCloneElement(target, {
        ref: (el) => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property '_target' does not exist on type 'Positio... Remove this comment to see the full error message
          this._target = el
        },
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_id' does not exist on type 'Position'.
        [Position.targetLocatorAttribute]: this._id
      })
    } else if (this.props.target) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_target' does not exist on type 'Positio... Remove this comment to see the full error message
      this._target = callRenderProp(this.props.target)
    }
    return null
  }

  render() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_id' does not exist on type 'Position'.
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
