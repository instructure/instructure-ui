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
import keycode from 'keycode'

import {
  ContextView,
  Position,
  LayoutPropTypes,
  parsePlacement,
  mirrorHorizontalPlacement
} from '@instructure/ui-layout'
import { View } from '@instructure/ui-view'
import { Dialog } from '@instructure/ui-a11y'
import { bidirectional } from '@instructure/ui-i18n'
import { element } from '@instructure/ui-prop-types'
import {
  findDOMNode,
  containsActiveElement,
  requestAnimationFrame,
  handleMouseOverOut
} from '@instructure/ui-dom-utils'
import {
  safeCloneElement,
  callRenderProp,
  experimental
} from '@instructure/ui-react-utils'
import { createChainedFunction, shallowEqual, px } from '@instructure/ui-utils'
import { error } from '@instructure/console/macro'
import { uid } from '@instructure/uid'
import { ThemeablePropTypes } from '@instructure/ui-themeable'
import { testable } from '@instructure/ui-testable'

/**
---
category: components
experimental: true
---
**/
@testable()
@experimental()
@bidirectional()
class Popover extends Component {
  static propTypes = {
    /**
    * Whether or not the `<Popover />` content is shown
    */
    isShowingContent: PropTypes.bool,
    /**
     * Whether or not to show the content by default, when uncontrolled
     */
    defaultIsShowingContent: PropTypes.bool,
    /**
     * The action that causes the content to display (`click`, `hover`, `focus`)
     */
    on: PropTypes.oneOfType([
      PropTypes.oneOf(['click', 'hover', 'focus']),
      PropTypes.arrayOf(PropTypes.oneOf(['click', 'hover', 'focus']))
    ]),
    /**
    * Whether or not an arrow pointing to the trigger should be rendered
    */
    withArrow: PropTypes.bool,
    /**
    * Color variant of the popover content
    */
    color: PropTypes.oneOf(['primary', 'primary-inverse']),
    /**
     * The placement of the content in relation to the trigger
     */
    placement: LayoutPropTypes.placement,
    /**
    * Controls the shadow depth for the `<Popover />`
    */
    shadow: ThemeablePropTypes.shadow,
    /**
    * Controls the z-index depth for the `<Popover />` content
    */
    stacking: ThemeablePropTypes.stacking,
    /**
     * A function that returns a reference to the content element
     */
    contentRef: PropTypes.func,
    /**
     * An element or a function returning an element to focus by default
     */
    defaultFocusElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
     * An accessible label for the `<Popover />` content
     */
    screenReaderLabel: PropTypes.string,
    /**
     * The horizontal offset for the positioned content
     */
    offsetX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * The vertical offset for the positioned content
     */
    offsetY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * The parent in which to constrain the popover.
     * One of: 'window', 'scroll-parent', 'parent', 'none', an element,
     * or a function returning an element
     */
    constrain: LayoutPropTypes.constrain,
    /**
     * Target element for positioning the Popover (if it differs from the trigger)
     */
    positionTarget: PropTypes.oneOfType([element, PropTypes.func]),
    /**
     * An element or a function returning an element to use as the mount node
     * for the `<Popover />` (defaults to `document.body`)
     */
    mountNode: LayoutPropTypes.mountNode,
    /**
     * Insert the element at the 'top' of the mountNode or at the 'bottom'
     */
    insertAt: PropTypes.oneOf(['bottom', 'top']),
    /**
     * An element, function returning an element, or array of elements that will
     * not be hidden from the screen reader when the `<Popover />` is open
     */
    liveRegion: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
      PropTypes.func
    ]),
    /**
    * An id is generated if not supplied.
    */
    id: PropTypes.string,
    /**
     * Whether or not the content should offset to align by its arrow
     */
    shouldAlignArrow: PropTypes.bool,
    /**
     * Whether or not position should be tracked or just set on initial render
     */
    shouldTrackPosition: PropTypes.bool,
    /**
    * Should the `<Popover />` render offscreen when visually hidden
    */
    shouldRenderOffscreen: PropTypes.bool,
    /**
     * Whether focus should contained within the `<Popover/>` when it is open
     */
    shouldContainFocus: PropTypes.bool,
    /**
     * Whether focus should be returned to the trigger when the `<Popover/>` is closed
     */
    shouldReturnFocus: PropTypes.bool,
    /**
     * Should the `<Popover />` hide when clicks occur outside the content
     */
    shouldCloseOnDocumentClick: PropTypes.bool,
    /**
     * Should the `<Popover />` hide when the escape key is pressed
     */
    shouldCloseOnEscape: PropTypes.bool,
    /**
     * Should the content become focused when the trigger is blurred
     */
    shouldFocusContentOnTriggerBlur: PropTypes.bool,
    /**
     * Callback fired when content is shown. When controlled, this callback is
     * fired when the Popover expects to be shown
     */
    onRequestShowContent: PropTypes.func,
    /**
     * Callback fired when content is hidden. When controlled, this callback is
     * fired when the Popover expects to be hidden
     */
    onRequestHideContent: PropTypes.func,
    /**
     * Callback fired when content has been is initially positioned.
     * If `shouldRenderOffscreen` is true, it will only fire once, the first
     * time the content is shown
     */
    onPositioned: PropTypes.func,
    /**
     * Callback fired when the position changes
     */
    onPositionChanged: PropTypes.func,
    /**
     * Callback fired when component is clicked
     */
    onClick: PropTypes.func,
    /**
     * Callback fired when trigger is focused
     */
    onFocus: PropTypes.func,
    /**
     * Callback fired when component is blurred
     */
    onBlur: PropTypes.func,
    /**
     * Callback fired on keydown
     */
    onKeyDown: PropTypes.func,
    /**
     * Callback fired when mouse is over trigger
     */
    onMouseOver: PropTypes.func,
    /**
     * Callback fired when mouse leaves trigger
     */
    onMouseOut: PropTypes.func,
    /**
     * The element that triggers the popover
     */
    renderTrigger: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * The content to be shown by the popover
     */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  }

  static defaultProps = {
    isShowingContent: undefined,
    defaultIsShowingContent: false,
    placement: 'bottom center',
    stacking: 'topmost',
    shadow: 'resting',
    offsetX: 0,
    offsetY: 0,
    color: 'primary',
    on: ['hover', 'focus'],
    contentRef: el => {},
    withArrow: true,
    constrain: 'window',
    defaultFocusElement: null,
    screenReaderLabel: null,
    mountNode: null,
    insertAt: 'bottom',
    liveRegion: null,
    positionTarget: null,
    id: undefined,
    shouldAlignArrow: false,
    shouldTrackPosition: true,
    shouldRenderOffscreen: false,
    shouldContainFocus: false,
    shouldReturnFocus: true,
    shouldCloseOnDocumentClick: true,
    shouldFocusContentOnTriggerBlur: false,
    shouldCloseOnEscape: true,
    onRequestShowContent: (event) => {},
    onRequestHideContent: (event, { documentClick }) => {},
    onClick: (event) => {},
    onFocus: (event) => {},
    onBlur: (event) => {},
    onMouseOver: (event) => {},
    onMouseOut: (event) => {},
    onKeyDown: (event) => {},
    onPositioned: (position) => {},
    onPositionChanged: (position) => {},
    renderTrigger: null,
    children: null
  }

  constructor (props) {
    super(props)

    this.state = {
      placement: props.placement,
      offsetX: props.offsetX,
      offsetY: props.offsetY
    }

    if (typeof props.isShowingContent === 'undefined') {
      this.state.isShowingContent = props.defaultIsShowingContent
    }

    this._id = this.props.id || uid('Popover')
    this._raf = []
  }

  componentWillMount () {
    this._handleMouseOver = handleMouseOverOut.bind(null, (event) => {
      this.show(event)
    })
    this._handleMouseOut = handleMouseOverOut.bind(null, (event) => {
      this.hide(event)
    })
  }

  componentWillUnmount () {
    this._raf.forEach(request => request.cancel())
    this._raf = []
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    )
  }

  computeOffsets (placement) {
    let { offsetX, offsetY } = this.props

    if (this.props.shouldAlignArrow && this._view) {
      const secondaryPlacement = parsePlacement(placement)[1]
      const { arrowSize, arrowBorderWidth } = this._view.theme
      const offsetAmount = (px(arrowSize) + px(arrowBorderWidth)) * 2
      if (secondaryPlacement === 'start') {
        offsetX = offsetAmount
      } else if (secondaryPlacement === 'end') {
        offsetX = -offsetAmount
      } else if (secondaryPlacement === 'top') {
        offsetY = offsetAmount
      } else if (secondaryPlacement === 'bottom') {
        offsetY = -offsetAmount
      }
    }

    return { offsetX, offsetY }
  }

  get placement () {
    let { placement } = this.props

    if (this.rtl) {
      placement = mirrorHorizontalPlacement(placement, ' ')
    }

    return !this.shown && this.props.shouldRenderOffscreen
      ? 'offscreen'
      : placement
  }

  get positionProps () {
    return {
      offsetX: this.state.offsetX,
      offsetY: this.state.offsetY,
      trackPosition: this.props.shouldTrackPosition && this.shown,
      insertAt: this.props.insertAt,
      placement: this.placement,
      constrain: this.props.constrain,
      onPositioned: createChainedFunction(this.handlePositionChanged, this.props.onPositioned),
      onPositionChanged: createChainedFunction(this.handlePositionChanged, this.props.onPositionChanged),
      target: this.props.positionTarget,
      mountNode: this.props.mountNode,
      id: this._id
    }
  }

  get shown () {
    return (typeof this.props.isShowingContent === 'undefined')
      ? this.state.isShowingContent
      : this.props.isShowingContent
  }

  get defaultFocusElement () {
    return this.props.defaultFocusElement
  }

  show = (event) => {
    if (typeof this.props.isShowingContent === 'undefined') {
      this.setState({ isShowingContent: true })
    }
    this.props.onRequestShowContent(event)
  }

  hide = (event, documentClick = false) => {
    const { onRequestHideContent, isShowingContent } = this.props

    if (typeof isShowingContent === 'undefined') {
      // uncontrolled, set state, fire callbacks
      this.setState(({ isShowingContent }) => {
        if (isShowingContent) {
          onRequestHideContent(event, { documentClick })
        }
        return { isShowingContent: false }
      })
    } else if (isShowingContent) {
      // controlled, fire callback
      onRequestHideContent(event, { documentClick })
    }
  }

  toggle = (event) => {
    if (this.shown) {
      this.hide(event)
    } else {
      this.show(event)
    }
  }

  handleDialogDismiss = (...args) => {
    if (!this.props.shouldReturnFocus && this.props.shouldFocusContentOnTriggerBlur) {
      const trigger = findDOMNode(this._trigger)

      if (trigger && typeof trigger.focus === 'function') {
        trigger.focus()
      }
    }
    this.hide(...args)
  }

  handleDialogBlur = (event) => {
    if (event.keyCode === keycode.codes.tab && event.shiftKey &&
      this.props.shouldFocusContentOnTriggerBlur) {
      return
    }
    this.hide(event)
  }

  handleTriggerKeyDown = (event) => {
    if (!this.props.shouldFocusContentOnTriggerBlur) {
      return
    }

    if (event.keyCode === keycode.codes.tab && !event.shiftKey) {
      event.preventDefault()
      this._raf.push(requestAnimationFrame(() => {
        this._dialog && this._dialog.focus()
      }))
    }
  }

  handleTriggerBlur = (event) => {
    if (this.props.on.indexOf('focus') > -1) {
      this._raf.push(requestAnimationFrame(() => {
        if (!containsActiveElement(this._view)) {
          this.hide(event)
        }
      }))
    }
  }

  handlePositionChanged = ({ placement }) => {
    this.setState({
      placement,
      ...this.computeOffsets(placement)
    })
  }

  renderTrigger () {
    let trigger = callRenderProp(this.props.renderTrigger)

    if (trigger) {
      const { on, shouldContainFocus } = this.props
      let onClick
      let onFocus
      let onMouseOut
      let onMouseOver
      let expanded

      if (on.indexOf('click') > -1) {
        onClick = (event) => {
          this.toggle(event)
        }
      }

      if (on.indexOf('hover') > -1) {
        error(
          !(on === 'hover'),
          '[Popover] Specifying only the `"hover"` trigger limits the visibilty of the Popover to just mouse users. ' +
          'Consider also including the `"focus"` trigger ' +
          'so that touch and keyboard only users can see the Popover content as well.'
        )

        onMouseOver = this._handleMouseOver
        onMouseOut = this._handleMouseOut
      }

      if (on.indexOf('focus') > -1) {
        onFocus = (event) => {
          this.show(event)
        }
      }

      if (shouldContainFocus) {
        // only set aria-expanded if popover can contain focus
        expanded = this.shown ? 'true' : 'false'
      } else {
        expanded = null
      }

      trigger = safeCloneElement(trigger, {
        ref: el => this._trigger = el,
        'aria-expanded': expanded,
        'data-popover-trigger': true,
        onKeyDown: createChainedFunction(this.handleTriggerKeyDown, this.props.onKeyDown),
        onClick: createChainedFunction(onClick, this.props.onClick),
        onBlur: createChainedFunction(this.handleTriggerBlur, this.props.onBlur),
        onFocus: createChainedFunction(onFocus, this.props.onFocus),
        onMouseOut: createChainedFunction(onMouseOut, this.props.onMouseOut),
        onMouseOver: createChainedFunction(onMouseOver, this.props.onMouseOver)
      })
    }

    return trigger
  }

  renderContent () {
    let content = callRenderProp(this.props.children)

    if (this.shown) {
      content = (
        <Dialog
          open={this.shown}
          label={this.props.screenReaderLabel}
          ref={(el) => this._dialog = el}
          display="block"
          onBlur={this.handleDialogBlur}
          onDismiss={this.handleDialogDismiss}
          liveRegion={this.props.liveRegion}
          defaultFocusElement={this.props.defaultFocusElement}
          shouldContainFocus={this.props.shouldContainFocus}
          shouldReturnFocus={this.props.shouldReturnFocus}
          shouldFocusOnOpen={!this.props.shouldFocusContentOnTriggerBlur}
          shouldCloseOnDocumentClick={this.props.shouldCloseOnDocumentClick}
          shouldCloseOnEscape={this.props.shouldCloseOnEscape}
        >
          {content}
        </Dialog>
      )
    }

    if (this.shown || this.props.shouldRenderOffscreen) {
      let ViewElement
      let viewProps = {
        ref: c => this._view = c,
        elementRef: this.props.contentRef,
        background: this.props.color,
        stacking: this.props.stacking,
        shadow: this.props.shadow,
        display: 'block'
      }

      const { placement } = this.state

      if (this.props.withArrow) {
        ViewElement = ContextView
        viewProps = {
          ...viewProps,
          // TODO: remove background override after contextview is updated
          background: this.props.color === 'primary' ? 'default' : 'inverse',
          placement: this.rtl ? mirrorHorizontalPlacement(placement, ' ') : placement
        }
      } else {
        ViewElement = View
        viewProps = {
          ...viewProps,
          borderWidth: 'small',
          borderRadius: 'medium',
          __dangerouslyIgnoreExperimentalWarnings: true
        }
      }

      return (
        <ViewElement {...viewProps}>
          {content}
        </ViewElement>
      )
    } else {
      return null
    }
  }

  render () {
    const positionProps = this.positionProps

    if (this.props.positionTarget) {
      return (
        <span>
          {this.renderTrigger()}
          <Position {...positionProps}>
            <Position.Content>
              {this.renderContent()}
            </Position.Content>
          </Position>
        </span>
      )
    } else {
      return (
        <Position {...positionProps}>
          <Position.Target>
            {this.renderTrigger()}
          </Position.Target>
          <Position.Content>
            {this.renderContent()}
          </Position.Content>
        </Position>
      )
    }
  }
}

export default Popover
export { Popover }
