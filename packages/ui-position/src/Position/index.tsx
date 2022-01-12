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

import {
  safeCloneElement,
  callRenderProp,
  ensureSingleChild,
  withSSR
} from '@instructure/ui-react-utils'
import {
  addPositionChangeListener,
  findDOMNode
} from '@instructure/ui-dom-utils'
import type { PositionChangeListenerType } from '@instructure/ui-dom-utils'
import { shallowEqual, deepEqual, hashInstance } from '@instructure/ui-utils'
import { debounce } from '@instructure/debounce'
import type { Debounced } from '@instructure/debounce'
import { testable } from '@instructure/ui-testable'

import { Portal } from '@instructure/ui-portal'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { PositionProps, PositionState } from './props'
import { allowedProps, propTypes } from './props'

import { calculateElementPosition } from '../calculateElementPosition'
import { PositionElement } from '../PositionPropTypes'

/**
---
category: components/utilities
---
@tsProps
**/
@withSSR()
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Position extends Component<PositionProps, PositionState> {
  static readonly componentId = 'Position'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps: PositionProps = {
    placement: 'bottom center',
    mountNode: null,
    insertAt: 'bottom',
    constrain: 'window',
    offsetX: 0,
    offsetY: 0,
    shouldTrackPosition: true,
    shouldPositionOverTarget: false,
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
    //@ts-expect-error props.ssr
    this._id = this.props.id || hashInstance('Position', this.props.ssr)
  }

  ref: Element | null = null
  _id: string
  _timeouts: NodeJS.Timeout[] = []
  _listener: PositionChangeListenerType | null = null
  _content?: PositionElement
  _target?: PositionElement

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

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
    this.props.makeStyles?.()
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
        style.left !== prevState.style.left) &&
      typeof this.props.onPositionChanged === 'function'
    ) {
      this.props.onPositionChanged({
        top: style.top,
        left: style.left,
        placement
      })
    }

    this.props.makeStyles?.()
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

  // content that needs to be positioned relative to the target
  renderContent() {
    let content = ensureSingleChild(this.props.children)

    if (content) {
      content = safeCloneElement(content, {
        ref: (el: PositionElement) => {
          this._content = el
        },
        style: {
          boxSizing: 'border-box',
          zIndex: this.props.styles?.zIndex,
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
        ref: (el: PositionElement) => {
          this._target = el
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
      <span {...props} ref={this.handleRef}>
        {this.renderTarget()}
        {this.renderContent()}
      </span>
    )
  }
}

export default Position
export { Position }
