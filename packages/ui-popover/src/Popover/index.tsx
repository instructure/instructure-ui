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
import { logError as error } from '@instructure/console'
import { uid } from '@instructure/uid'
import { ThemeablePropTypes } from '@instructure/emotion'
import { testable } from '@instructure/ui-testable'

import { FocusRegion } from '@instructure/ui-a11y-utils'

type Props = {
  isShowingContent?: boolean
  defaultIsShowingContent?: boolean
  on?: ('click' | 'hover' | 'focus') | ('click' | 'hover' | 'focus')[]
  withArrow?: boolean
  color?: 'primary' | 'primary-inverse'
  placement?: any // TODO: PositionPropTypes.placement
  shadow?: any // TODO: ThemeablePropTypes.shadow
  stacking?: any // TODO: ThemeablePropTypes.stacking
  contentRef?: (...args: any[]) => any
  defaultFocusElement?: React.ReactElement | ((...args: any[]) => any)
  screenReaderLabel?: string
  offsetX?: string | number
  offsetY?: string | number
  constrain?: any // TODO: PositionPropTypes.constrain
  positionTarget?: any // TODO: PropTypes.oneOfType([element, PropTypes.func]),
  mountNode?: any // TODO: PositionPropTypes.mountNode
  insertAt?: 'bottom' | 'top'
  liveRegion?:
    | React.ReactElement[]
    | React.ReactElement
    | ((...args: any[]) => any)
  id?: string
  shouldAlignArrow?: boolean
  shouldTrackPosition?: boolean
  shouldRenderOffscreen?: boolean
  shouldContainFocus?: boolean
  shouldReturnFocus?: boolean
  shouldCloseOnDocumentClick?: boolean
  shouldCloseOnEscape?: boolean
  shouldFocusContentOnTriggerBlur?: boolean
  onShowContent?: (...args: any[]) => any
  onHideContent?: (...args: any[]) => any
  onPositioned?: (...args: any[]) => any
  onPositionChanged?: (...args: any[]) => any
  onClick?: (...args: any[]) => any
  onFocus?: (...args: any[]) => any
  onBlur?: (...args: any[]) => any
  onKeyDown?: (...args: any[]) => any
  onKeyUp?: (...args: any[]) => any
  onMouseOver?: (...args: any[]) => any
  onMouseOut?: (...args: any[]) => any
  renderTrigger?: React.ReactNode | ((...args: any[]) => any)
  dir?: any // TODO: PropTypes.oneOf(Object.values(bidirectional.DIRECTION))
}

/**
---
category: components
tags: overlay, portal, dialog
---
**/
@bidirectional()
@testable()
class Popover extends Component<Props> {
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
    // eslint-disable-next-line react/require-default-props
    dir: PropTypes.oneOf(Object.values(bidirectional.DIRECTION))
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
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
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
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onShowContent: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onHideContent: (event, { documentClick }) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onClick: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onFocus: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onBlur: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onMouseOver: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onMouseOut: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onKeyDown: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onKeyUp: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'position' is declared but its value is never read... Remove this comment to see the full error message
    onPositioned: (position) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'position' is declared but its value is never read... Remove this comment to see the full error message
    onPositionChanged: (position) => {},
    renderTrigger: null,
    children: null
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props)

    this.state = {
      placement: props.placement,
      offsetX: props.offsetX,
      offsetY: props.offsetY
    }

    if (typeof props.isShowingContent === 'undefined') {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isShowingContent' does not exist on type... Remove this comment to see the full error message
      this.state.isShowingContent = props.defaultIsShowingContent
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_id' does not exist on type 'Popover'.
    this._id = this.props.id || uid('Popover')
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_raf' does not exist on type 'Popover'.
    this._raf = []

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_handleMouseOver' does not exist on type... Remove this comment to see the full error message
    this._handleMouseOver = handleMouseOverOut.bind(null, (event) => {
      this.show(event)
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'mouseOutTimeout' does not exist on type ... Remove this comment to see the full error message
      clearTimeout(this.mouseOutTimeout)
    })
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_handleMouseOut' does not exist on type ... Remove this comment to see the full error message
    this._handleMouseOut = handleMouseOverOut.bind(null, (event) => {
      // this is needed bc the trigger mouseOut fires before tooltip mouseOver
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'mouseOutTimeout' does not exist on type ... Remove this comment to see the full error message
      this.mouseOutTimeout = setTimeout(() => {
        this.hide(event)
      }, 1)
    })
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mouseOutTimeout' does not exist on type ... Remove this comment to see the full error message
    this.mouseOutTimeout = undefined
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
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_focusRegion' does not exist on type 'Po... Remove this comment to see the full error message
      this._focusRegion = new FocusRegion(this._contentElement, {
        shouldCloseOnEscape: false,
        shouldCloseOnDocumentClick: true,
        onDismiss: this.hide
      })

      if (this.shown) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_focusRegion' does not exist on type 'Po... Remove this comment to see the full error message
        this._focusRegion.activate()
      }
    }
  }

  componentWillUnmount() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_raf' does not exist on type 'Popover'.
    this._raf.forEach((request) => request.cancel())
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_raf' does not exist on type 'Popover'.
    this._raf = []

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_focusRegion' does not exist on type 'Po... Remove this comment to see the full error message
    if (this._focusRegion) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_focusRegion' does not exist on type 'Po... Remove this comment to see the full error message
      this._focusRegion.deactivate()
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_focusRegion' does not exist on type 'Po... Remove this comment to see the full error message
      this._focusRegion.blur()
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'nextProps' implicitly has an 'any' type... Remove this comment to see the full error message
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    )
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapShot) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_focusRegion' does not exist on type 'Po... Remove this comment to see the full error message
    if (this._focusRegion && this.isTooltip) {
      // if focus region exists, popover is acting as a tooltip
      // so we manually activate and deactivate the region when showing/hiding
      if (
        (!prevProps.isShowingContent && this.props.isShowingContent) ||
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isShowingContent' does not exist on type... Remove this comment to see the full error message
        (!prevState.isShowingContent && this.state.isShowingContent)
      ) {
        // changed from hiding to showing
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_focusRegion' does not exist on type 'Po... Remove this comment to see the full error message
        this._focusRegion.activate()
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_focusRegion' does not exist on type 'Po... Remove this comment to see the full error message
        this._focusRegion.focus()
      }

      if (
        (prevProps.isShowingContent && !this.props.isShowingContent) ||
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isShowingContent' does not exist on type... Remove this comment to see the full error message
        (prevState.isShowingContent && !this.state.isShowingContent)
      ) {
        // changed from showing to hiding
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_focusRegion' does not exist on type 'Po... Remove this comment to see the full error message
        this._focusRegion.deactivate()
      }
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'placement' implicitly has an 'any' type... Remove this comment to see the full error message
  computeOffsets(placement) {
    let { offsetX, offsetY } = this.props

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_view' does not exist on type 'Popover'.
    if (this.props.shouldAlignArrow && this._view) {
      const secondaryPlacement = parsePlacement(placement)[1]

      // arrowSize and arrowBorderWidth are component theme variables
      // declared in ContextView's styles.js
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_view' does not exist on type 'Popover'.
      const { arrowSize, arrowBorderWidth } = this._view.props.styles

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
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
    let { placement } = this.props
    const { dir } = this.props
    const isRtl = dir === bidirectional.DIRECTION.rtl

    if (isRtl) {
      placement = mirrorHorizontalPlacement(placement, ' ')
    }

    return !this.shown && this.props.shouldRenderOffscreen
      ? 'offscreen'
      : placement
  }

  get positionProps() {
    return {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'offsetX' does not exist on type 'Readonl... Remove this comment to see the full error message
      offsetX: this.state.offsetX,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'offsetY' does not exist on type 'Readonl... Remove this comment to see the full error message
      offsetY: this.state.offsetY,
      shouldTrackPosition: this.props.shouldTrackPosition && this.shown,
      insertAt: this.props.insertAt,
      placement: this.placement,
      constrain: this.props.constrain,
      onPositioned: this.handlePositioned,
      onPositionChanged: this.handlePositionChanged,
      target: this.props.positionTarget,
      mountNode: this.props.mountNode,
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_id' does not exist on type 'Popover'.
      id: this._id
    }
  }

  get shown() {
    return typeof this.props.isShowingContent === 'undefined'
      ? // @ts-expect-error ts-migrate(2339) FIXME: Property 'isShowingContent' does not exist on type... Remove this comment to see the full error message
        this.state.isShowingContent
      : this.props.isShowingContent
  }

  get defaultFocusElement() {
    return this.props.defaultFocusElement
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  show = (event) => {
    if (typeof this.props.isShowingContent === 'undefined') {
      this.setState({ isShowingContent: true })
    }
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.onShowContent(event)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  hide = (event, documentClick = false) => {
    const { onHideContent, isShowingContent } = this.props

    if (typeof isShowingContent === 'undefined') {
      // uncontrolled, set state, fire callbacks
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isShowingContent' does not exist on type... Remove this comment to see the full error message
      this.setState(({ isShowingContent }) => {
        if (isShowingContent) {
          // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
          onHideContent(event, { documentClick })
        }
        return { isShowingContent: false }
      })
    } else if (isShowingContent) {
      // controlled, fire callback
      // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      onHideContent(event, { documentClick })
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  toggle = (event) => {
    if (this.shown) {
      this.hide(event)
    } else {
      this.show(event)
    }
  }

  // @ts-expect-error ts-migrate(7019) FIXME: Rest parameter 'args' implicitly has an 'any[]' ty... Remove this comment to see the full error message
  handleDialogDismiss = (...args) => {
    if (
      !this.props.shouldReturnFocus &&
      this.props.shouldFocusContentOnTriggerBlur
    ) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_trigger' does not exist on type 'Popove... Remove this comment to see the full error message
      const trigger = findDOMNode(this._trigger)

      if (trigger && typeof trigger.focus === 'function') {
        trigger.focus()
      }
    }
    // @ts-expect-error ts-migrate(2556) FIXME: Expected 1-2 arguments, but got 0 or more.
    this.hide(...args)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleTriggerKeyDown = (event) => {
    if (!this.props.shouldFocusContentOnTriggerBlur) {
      return
    }

    if (event.keyCode === keycode.codes.tab && !event.shiftKey) {
      event.preventDefault()
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_raf' does not exist on type 'Popover'.
      this._raf.push(
        requestAnimationFrame(() => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property '_dialog' does not exist on type 'Popover... Remove this comment to see the full error message
          this._dialog && this._dialog.focus()
        })
      )
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleTriggerKeyUp = (event) => {
    if (event.keyCode === keycode.codes.esc && this.shown && this.isTooltip) {
      // if popover is tooltip, it is managing its own focus region so we need
      // to prevent esc keyup event from reaching FocusRegionManager
      event.preventDefault()
      this.hide(event)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleTriggerBlur = (event) => {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    if (this.props.on.indexOf('focus') > -1) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_raf' does not exist on type 'Popover'.
      this._raf.push(
        requestAnimationFrame(() => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property '_view' does not exist on type 'Popover'.
          if (!containsActiveElement(this._view)) {
            this.hide(event)
          }
        })
      )
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'position' implicitly has an 'any' type.
  handlePositioned = (position) => {
    const placement = position.placement
    this.setState({
      placement,
      ...this.computeOffsets(placement)
    })
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.onPositioned(position)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'position' implicitly has an 'any' type.
  handlePositionChanged = (position) => {
    const placement = position.placement
    this.setState({
      placement,
      ...this.computeOffsets(placement)
    })
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
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

      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      if (on.indexOf('click') > -1) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
        onClick = (event) => {
          this.toggle(event)
        }
      }

      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      if (on.indexOf('hover') > -1) {
        // @ts-expect-error ts-migrate(2555) FIXME: Expected at least 5 arguments, but got 2.
        error(
          !(on === 'hover'),
          '[Popover] Specifying only the `"hover"` trigger limits the visibility' +
            ' of the Popover to just mouse users. Consider also including the `"focus"` trigger ' +
            'so that touch and keyboard only users can see the Popover content as well.'
        )
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_handleMouseOver' does not exist on type... Remove this comment to see the full error message
        onMouseOver = this._handleMouseOver
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_handleMouseOut' does not exist on type ... Remove this comment to see the full error message
        onMouseOut = this._handleMouseOut
      }

      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      if (on.indexOf('focus') > -1) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
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
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
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
          // @ts-expect-error ts-migrate(2339) FIXME: Property '_dialog' does not exist on type 'Popover... Remove this comment to see the full error message
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
      const color = this.props.color

      let viewProps = {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'c' implicitly has an 'any' type.
        ref: (c) => (this._view = c),
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
        elementRef: (el) => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property '_contentElement' does not exist on type ... Remove this comment to see the full error message
          this._contentElement = el
          // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
          this.props.contentRef(el)
        },
        background: color,
        stacking: this.props.stacking,
        shadow: this.props.shadow,
        display: 'block'
      }

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'placement' does not exist on type 'Reado... Remove this comment to see the full error message
      const { placement } = this.state

      if (this.props.withArrow) {
        ViewElement = ContextView
        viewProps = {
          ...viewProps,
          // TODO: remove background override after contextview is updated
          // @ts-expect-error ts-migrate(2322) FIXME: Type '"default" | "inverse"' is not assignable to ... Remove this comment to see the full error message
          background: color === 'primary' ? 'default' : 'inverse',
          placement:
            this.props.dir === bidirectional.DIRECTION.rtl
              ? mirrorHorizontalPlacement(placement, ' ')
              : placement
        }
      } else {
        ViewElement = View
        viewProps = {
          ...viewProps,
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ borderWidth: string; borderRadius: string;... Remove this comment to see the full error message
          borderWidth: 'small',
          borderRadius: 'medium'
        }
      }

      if (this.isTooltip) {
        viewProps = {
          ...viewProps,
          // Because of a11y reasons popovers should not be hidden when hovered over
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ onMouseOver: any; onMouseOut: any; ref: (c... Remove this comment to see the full error message
          onMouseOver: this._handleMouseOver,
          // @ts-expect-error ts-migrate(2339) FIXME: Property '_handleMouseOut' does not exist on type ... Remove this comment to see the full error message
          onMouseOut: this._handleMouseOut
        }
      }
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
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
