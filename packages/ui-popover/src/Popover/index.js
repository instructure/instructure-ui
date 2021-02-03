/* eslint-disable react/require-default-props */
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
  Position,
  PositionPropTypes,
  parsePlacement,
  mirrorHorizontalPlacement
} from '@instructure/ui-position'
import { ContextView, View } from '@instructure/ui-view'
import { Dialog } from '@instructure/ui-dialog'
import { bidirectional } from '@instructure/ui-i18n'
import { element } from '@instructure/ui-prop-types'
import {
  findDOMNode,
  containsActiveElement,
  requestAnimationFrame,
  handleMouseOverOut
} from '@instructure/ui-dom-utils'
import { safeCloneElement, callRenderProp } from '@instructure/ui-react-utils'
import { createChainedFunction, shallowEqual, px } from '@instructure/ui-utils'
import { error } from '@instructure/console/macro'
import { uid } from '@instructure/uid'
import { ThemeablePropTypes } from '@instructure/ui-themeable'
import { testable } from '@instructure/ui-testable'
import { FocusRegion } from '@instructure/ui-a11y-utils'

/**
---
category: components
tags: overlay, portal, dialog
---
**/
@testable()
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
    placement: PositionPropTypes.placement,
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
    defaultFocusElement: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func
    ]),
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
    constrain: PositionPropTypes.constrain,
    /**
     * Target element for positioning the Popover (if it differs from the trigger)
     */
    positionTarget: PropTypes.oneOfType([element, PropTypes.func]),
    /**
     * An element or a function returning an element to use as the mount node
     * for the `<Popover />` (defaults to `document.body`)
     */
    mountNode: PositionPropTypes.mountNode,
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
    onShowContent: PropTypes.func,
    /**
     * Callback fired when content is hidden. When controlled, this callback is
     * fired when the Popover expects to be hidden
     */
    onHideContent: PropTypes.func,
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
     * Callback fired on keyup
     */
    onKeyUp: PropTypes.func,
    /**
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
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

    /* eslint-disable react/require-default-props */
    /**
     * __Deprecated - use `isShowingContent` instead__
     */
    show: PropTypes.bool,
    /**
     * __Deprecated - use `defaultIsShowingContent` instead__
     */
    defaultShow: PropTypes.bool,
    /**
     * __Deprecated - use `color`__
     */
    variant: PropTypes.oneOf(['default', 'inverse']),
    /**
     * __Deprecated - use `shouldAlignArrow`__
     */
    alignArrow: PropTypes.bool,
    /**
     * __Deprecated - use `screenReaderLabel`__
     */
    label: PropTypes.string,
    /**
     * __Deprecated - use `shouldTrackPosition`__
     */
    trackPosition: PropTypes.bool,
    /**
     * __Deprecated - use `onShowContent`__
     */
    onShow: PropTypes.func,
    /**
     * __Deprecated - use `onHideContent`__
     */
    onDismiss: PropTypes.func,
    /**
     * __Deprecated - use `onShowContent` and `onHideContent`__
     */
    onToggle: PropTypes.func,
    dir: PropTypes.oneOf(Object.values(bidirectional.DIRECTION)),
    rtl: PropTypes.bool,
    ltr: PropTypes.bool
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
    contentRef: (el) => {},
    withArrow: true,
    constrain: 'window',
    defaultFocusElement: undefined,
    screenReaderLabel: undefined,
    mountNode: undefined,
    insertAt: 'bottom',
    liveRegion: undefined,
    positionTarget: undefined,
    id: undefined,
    shouldAlignArrow: false,
    shouldTrackPosition: true,
    shouldRenderOffscreen: false,
    shouldContainFocus: false,
    shouldReturnFocus: true,
    shouldCloseOnDocumentClick: true,
    shouldFocusContentOnTriggerBlur: false,
    shouldCloseOnEscape: true,
    onShowContent: (event) => {},
    onHideContent: (event, { documentClick }) => {},
    onClick: (event) => {},
    onFocus: (event) => {},
    onBlur: (event) => {},
    onMouseOver: (event) => {},
    onMouseOut: (event) => {},
    onKeyDown: (event) => {},
    onKeyUp: (event) => {},
    onPositioned: (position) => {},
    onPositionChanged: (position) => {},
    renderTrigger: null,
    children: null
  }

  constructor(props) {
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

    this._handleMouseOver = handleMouseOverOut.bind(null, (event) => {
      this.show(event)
    })
    this._handleMouseOut = handleMouseOverOut.bind(null, (event) => {
      this.hide(event)
    })
  }

  get isTooltip() {
    return (
      this.props.shouldRenderOffscreen &&
      !this.props.shouldReturnFocus &&
      !this.props.shouldContainFocus &&
      !this.props.shouldFocusContentOnTriggerBlur
    )
  }

  componentDidMount() {
    if (this.isTooltip) {
      // if popover is being used as a tooltip with no focusable content
      // manage its FocusRegion internally rather than registering it with
      // the FocusRegionManager via Dialog
      this._focusRegion = new FocusRegion(this._contentElement, {
        shouldCloseOnEscape: false,
        shouldCloseOnDocumentClick: true,
        onDismiss: this.hide
      })

      if (this.shown) {
        this._focusRegion.activate()
      }
    }
  }

  componentWillUnmount() {
    this._raf.forEach((request) => request.cancel())
    this._raf = []

    if (this._focusRegion) {
      this._focusRegion.deactivate()
      this._focusRegion.blur()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if (this._focusRegion && this.isTooltip) {
      // if focus region exists, popover is acting as a tooltip
      // so we manually activate and deactivate the region when showing/hiding
      if (
        (!prevProps.isShowingContent && this.props.isShowingContent) ||
        (!prevState.isShowingContent && this.state.isShowingContent)
      ) {
        // changed from hiding to showing
        this._focusRegion.activate()
        this._focusRegion.focus()
      }

      if (
        (prevProps.isShowingContent && !this.props.isShowingContent) ||
        (prevState.isShowingContent && !this.state.isShowingContent)
      ) {
        // changed from showing to hiding
        this._focusRegion.deactivate()
      }
    }
  }

  computeOffsets(placement) {
    let { offsetX, offsetY } = this.props

    if (this.props.shouldAlignArrow && this._view) {
      const secondaryPlacement = parsePlacement(placement)[1]

      // arrowSize and arrowBorderWidth are component theme variables
      // declared in ContextView's styles.js
      const { arrowSize, arrowBorderWidth } = this._view.props.styles

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

  get placement() {
    let { placement, rtl } = this.props

    if (rtl) {
      placement = mirrorHorizontalPlacement(placement, ' ')
    }

    return !this.shown && this.props.shouldRenderOffscreen
      ? 'offscreen'
      : placement
  }

  get positionProps() {
    return {
      offsetX: this.state.offsetX,
      offsetY: this.state.offsetY,
      shouldTrackPosition: this.props.shouldTrackPosition && this.shown,
      insertAt: this.props.insertAt,
      placement: this.placement,
      constrain: this.props.constrain,
      onPositioned: this.handlePositioned,
      onPositionChanged: this.handlePositionChanged,
      target: this.props.positionTarget,
      mountNode: this.props.mountNode,
      id: this._id
    }
  }

  get shown() {
    return typeof this.props.isShowingContent === 'undefined'
      ? this.state.isShowingContent
      : this.props.isShowingContent
  }

  get defaultFocusElement() {
    return this.props.defaultFocusElement
  }

  show = (event) => {
    if (typeof this.props.isShowingContent === 'undefined') {
      this.setState({ isShowingContent: true })
    }
    this.props.onShowContent(event)
  }

  hide = (event, documentClick = false) => {
    const { onHideContent, isShowingContent } = this.props

    if (typeof isShowingContent === 'undefined') {
      // uncontrolled, set state, fire callbacks
      this.setState(({ isShowingContent }) => {
        if (isShowingContent) {
          onHideContent(event, { documentClick })
        }
        return { isShowingContent: false }
      })
    } else if (isShowingContent) {
      // controlled, fire callback
      onHideContent(event, { documentClick })
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
    if (
      !this.props.shouldReturnFocus &&
      this.props.shouldFocusContentOnTriggerBlur
    ) {
      const trigger = findDOMNode(this._trigger)

      if (trigger && typeof trigger.focus === 'function') {
        trigger.focus()
      }
    }
    this.hide(...args)
  }

  handleDialogBlur = (event) => {
    if (
      event.keyCode === keycode.codes.tab &&
      event.shiftKey &&
      this.props.shouldFocusContentOnTriggerBlur
    ) {
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
      this._raf.push(
        requestAnimationFrame(() => {
          this._dialog && this._dialog.focus()
        })
      )
    }
  }

  handleTriggerKeyUp = (event) => {
    if (event.keyCode === keycode.codes.esc && this.shown && this.isTooltip) {
      // if popover is tooltip, it is managing its own focus region so we need
      // to prevent esc keyup event from reaching FocusRegionManager
      event.preventDefault()
      this.hide(event)
    }
  }

  handleTriggerBlur = (event) => {
    if (this.props.on.indexOf('focus') > -1) {
      this._raf.push(
        requestAnimationFrame(() => {
          if (!containsActiveElement(this._view)) {
            this.hide(event)
          }
        })
      )
    }
  }

  handlePositioned = (position) => {
    const placement = position.placement
    this.setState({
      placement,
      ...this.computeOffsets(placement)
    })
    this.props.onPositioned(position)
  }

  handlePositionChanged = (position) => {
    const placement = position.placement
    this.setState({
      placement,
      ...this.computeOffsets(placement)
    })
    this.props.onPositionChanged(position)
  }

  renderTrigger() {
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
        ref: (el) => (this._trigger = el),
        'aria-expanded': expanded,
        'data-popover-trigger': true,
        onKeyDown: createChainedFunction(
          this.handleTriggerKeyDown,
          this.props.onKeyDown
        ),
        onKeyUp: createChainedFunction(
          this.handleTriggerKeyUp,
          this.props.onKeyUp
        ),
        onClick: createChainedFunction(onClick, this.props.onClick),
        onBlur: createChainedFunction(
          this.handleTriggerBlur,
          this.props.onBlur
        ),
        onFocus: createChainedFunction(onFocus, this.props.onFocus),
        onMouseOut: createChainedFunction(onMouseOut, this.props.onMouseOut),
        onMouseOver: createChainedFunction(onMouseOver, this.props.onMouseOver)
      })
    }

    return trigger
  }

  renderContent() {
    let content = callRenderProp(this.props.children)

    if (this.shown && !this.isTooltip) {
      // if popover is NOT being used as a tooltip, create a Dialog
      // to manage the content FocusRegion, when showing
      content = (
        <Dialog
          open={this.shown}
          label={this.props.screenReaderLabel}
          ref={(el) => (this._dialog = el)}
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
      let color = this.props.color

      let viewProps = {
        ref: (c) => (this._view = c),
        elementRef: (el) => {
          this._contentElement = el
          this.props.contentRef(el)
        },
        background: color,
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
          background: color === 'primary' ? 'default' : 'inverse',
          placement: this.props.rtl
            ? mirrorHorizontalPlacement(placement, ' ')
            : placement
        }
      } else {
        ViewElement = View
        viewProps = {
          ...viewProps,
          borderWidth: 'small',
          borderRadius: 'medium'
        }
      }

      if (this.isTooltip) {
        // preventing pointerEvents reduces tooltip flicker
        viewProps = {
          ...viewProps,
          style: { pointerEvents: 'none' }
        }
      }

      return <ViewElement {...viewProps}>{content}</ViewElement>
    } else {
      return null
    }
  }

  render() {
    const positionProps = this.positionProps

    if (this.props.positionTarget) {
      return (
        <span>
          {this.renderTrigger()}
          <Position {...positionProps}>{this.renderContent()}</Position>
        </span>
      )
    } else {
      return (
        <Position {...positionProps} renderTarget={this.renderTrigger()}>
          {this.renderContent()}
        </Position>
      )
    }
  }
}

export default Popover
export { Popover }
