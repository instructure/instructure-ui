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
  findDOMNode
} from '@instructure/ui-dom-utils'
import type { PositionChangeListenerType } from '@instructure/ui-dom-utils'
import { uid } from '@instructure/uid'
import { shallowEqual, deepEqual } from '@instructure/ui-utils'
import { debounce } from '@instructure/debounce'
import type { Debounced } from '@instructure/debounce'
import { testable } from '@instructure/ui-testable'

import { Portal } from '@instructure/ui-portal'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import { PositionProps, PositionState } from './props'

import { calculateElementPosition } from '../calculateElementPosition'
import { PositionElement, PositionPropTypes } from '../PositionPropTypes'

/**
---
category: components/utilities
---
@tsProps
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Position extends Component<PositionProps, PositionState> {
  static readonly componentId = 'Position'

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    renderTarget: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    target: PropTypes.oneOfType([element, PropTypes.func]),
    placement: PositionPropTypes.placement,
    mountNode: PositionPropTypes.mountNode,
    insertAt: PropTypes.oneOf(['bottom', 'top']),
    constrain: PositionPropTypes.constrain,
    offsetX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    offsetY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.string,
    shouldTrackPosition: PropTypes.bool,
    shouldPositionOverTarget: PropTypes.bool,
    onPositionChanged: PropTypes.func,
    onPositioned: PropTypes.func,
    children: PropTypes.node
  }

  static defaultProps: PositionProps = {
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
    onPositioned: () => {},
    onPositionChanged: () => {},
    children: null
  }

  static locatorAttribute = 'data-position'
  static targetLocatorAttribute = 'data-position-target'
  static contentLocatorAttribute = 'data-position-content'

  constructor(props: PositionProps) {
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

  _id: string
  _timeouts: NodeJS.Timeout[] = []
  _listener: PositionChangeListenerType | null = null
  _content?: PositionElement
  _target?: PositionElement

  shouldComponentUpdate(
    nextProps: PositionProps,
    nextState: PositionState,
    nextContext: any
  ) {
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

  componentDidUpdate(prevProps: PositionProps, prevState: PositionState) {
    this.position()
    this.toggleLocatorAttributes(true)

    if (this.props.shouldTrackPosition !== prevProps.shouldTrackPosition) {
      this.props.shouldTrackPosition
        ? this.startTracking()
        : this.stopTracking()
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

    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  componentWillUnmount() {
    ;(this.position as Debounced).cancel()
    this.stopTracking()
    this._timeouts.forEach((timeout) => clearTimeout(timeout))

    this.toggleLocatorAttributes(false)
  }

  toggleLocatorAttributes(set: boolean) {
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

  toggleLocatorAttribute(
    node: Node | Window | null | undefined,
    locator: string,
    set: boolean
  ) {
    if (node && (node as Element).hasAttribute) {
      if (set && !(node as Element).hasAttribute(locator)) {
        ;(node as Element).setAttribute(locator, this._id)
      }

      if (!set && (node as Element).hasAttribute(locator)) {
        ;(node as Element).removeAttribute(locator)
      }
    }
  }

  handlePortalOpen = () => {
    this.position()

    if (this.props.shouldTrackPosition) {
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

  calculatePosition(props: PositionProps) {
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
        ref: (el: PositionElement) => {
          this._content = el
        },
        style: {
          boxSizing: 'border-box',
          // @ts-expect-error TODO: type withStyle props
          zIndex: this.props.styles.zIndex,
          ...content.props.style,
          ...this.state.style
        },
        ...(content.props.className && { className: content.props.className }),
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
          this._target = el as PositionElement
        },
        [Position.targetLocatorAttribute]: this._id
      })
    } else if (this.props.target) {
      this._target = callRenderProp(this.props.target)
    }
    return null
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
