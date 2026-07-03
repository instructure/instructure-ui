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

import { Component } from 'react'

import {
  callRenderProp,
  ensureSingleChild,
  safeCloneElement,
  withDeterministicId
} from '@instructure/ui-react-utils'
import {
  addPositionChangeListener,
  findDOMNode
} from '@instructure/ui-dom-utils'
import type { PositionChangeListenerType } from '@instructure/ui-dom-utils'
import type { Debounced } from '@instructure/debounce'
import { deepEqual, shallowEqual, combineDataCid } from '@instructure/ui-utils'
import { debounce } from '@instructure/debounce'
import { Portal } from '@instructure/ui-portal'
import { withStyle } from '@instructure/emotion'

import generateStyle from './styles.js'
import generateComponentTheme from './theme.js'
import type { PositionProps, PositionState } from './props'
import { allowedProps } from './props.js'

import { calculateElementPosition } from '../calculateElementPosition.js'
import { PositionElement } from '../PositionPropTypes.js'

/**
---
category: components/Util Components
---
**/
@withDeterministicId()
@withStyle(generateStyle, generateComponentTheme)
class Position extends Component<PositionProps, PositionState> {
  static displayName = 'Position'
  static readonly componentId = 'Position'

  static allowedProps = allowedProps

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

    const initial = this.calculatePosition(props)
    this._availableHeight = initial.availableHeight
    this._availableWidth = initial.availableWidth
    this.state = {
      positioned: false,
      placement: initial.placement,
      style: initial.style
    }
    this.position = debounce(this.position, 0, {
      leading: false,
      trailing: true
    })

    this._id = this.props.id || props.deterministicId!()
  }

  ref: Element | null = null
  _id: string
  _timeouts: ReturnType<typeof setTimeout>[] = []
  _listener: PositionChangeListenerType | null = null
  _content?: PositionElement
  _target?: PositionElement
  _availableHeight?: number
  _availableWidth?: number

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
      !shallowEqual(this.context as any, nextContext)
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
    ;(this.position as Debounced<typeof this.position>).cancel()
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

  // Write `--ui-position-available-{height,width}` directly on the content
  // node's inline style
  applyAvailableSpaceCustomProperties() {
    const node = findDOMNode(this._content) as HTMLElement | null
    if (!node?.style) return
    const set = (name: string, value: number | undefined) => {
      if (typeof value === 'number' && Number.isFinite(value)) {
        node.style.setProperty(name, `${value}px`)
      } else {
        node.style.removeProperty(name)
      }
    }
    set('--ui-position-available-height', this._availableHeight)
    set('--ui-position-available-width', this._availableWidth)
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
    const { placement, style, availableHeight, availableWidth } =
      this.calculatePosition(this.props)
    this._availableHeight = availableHeight
    this._availableWidth = availableWidth
    this.applyAvailableSpaceCustomProperties()
    this.setState({ positioned: true, placement, style })
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
      <span
        {...props}
        css={this.props.styles?.position}
        ref={this.handleRef}
        data-cid={combineDataCid('Position', this.props)}
      >
        {this.renderTarget()}
        {this.renderContent()}
      </span>
    )
  }
}

export default Position
export { Position }
