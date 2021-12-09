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
import keycode from 'keycode'

import {
  Position,
  parsePlacement,
  mirrorHorizontalPlacement
} from '@instructure/ui-position'
import { ContextView, View } from '@instructure/ui-view'
import { Dialog } from '@instructure/ui-dialog'
import { textDirectionContextConsumer } from '@instructure/ui-i18n'
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
import { testable } from '@instructure/ui-testable'
import { FocusRegion } from '@instructure/ui-a11y-utils'

import type { RequestAnimationFrameType } from '@instructure/ui-dom-utils'
import type { ViewProps, ContextViewProps } from '@instructure/ui-view'
import type { PositionProps } from '@instructure/ui-position'
import type { DialogProps } from '@instructure/ui-dialog'

import type { PopoverProps, PopoverState } from './props'
import { allowedProps, propTypes } from './props'

/**
---
category: components
tags: overlay, portal, dialog
---
@tsProps
**/
@textDirectionContextConsumer()
@testable()
class Popover extends Component<PopoverProps, PopoverState> {
  static readonly componentId = 'Popover'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    defaultIsShowingContent: false,
    placement: 'bottom center',
    stacking: 'topmost',
    shadow: 'resting',
    offsetX: 0,
    offsetY: 0,
    color: 'primary',
    on: ['hover', 'focus'],
    withArrow: true,
    constrain: 'window',
    insertAt: 'bottom',
    shouldAlignArrow: false,
    shouldTrackPosition: true,
    shouldRenderOffscreen: false,
    shouldContainFocus: false,
    shouldReturnFocus: true,
    shouldCloseOnDocumentClick: true,
    shouldFocusContentOnTriggerBlur: false,
    shouldCloseOnEscape: true
  }

  constructor(props: PopoverProps) {
    super(props)

    this.state = {
      placement: props.placement,
      offsetX: props.offsetX,
      offsetY: props.offsetY,
      isShowingContent:
        typeof props.isShowingContent === 'undefined'
          ? props.defaultIsShowingContent
          : undefined
    }

    this._id = this.props.id || uid('Popover')
    this._raf = []

    this._handleMouseOver = handleMouseOverOut.bind(
      null,
      (event: React.MouseEvent) => {
        this.show(event)
        clearTimeout(this.mouseOutTimeout!)
      }
    )
    this._handleMouseOut = handleMouseOverOut.bind(
      null,
      (event: React.MouseEvent) => {
        // this is needed bc the trigger mouseOut fires before tooltip mouseOver
        this.mouseOutTimeout = setTimeout(() => {
          this.hide(event)
        }, 1)
      }
    )
  }

  private _handleMouseOver: React.MouseEventHandler
  private _handleMouseOut: React.MouseEventHandler

  private _id: string
  private _raf: RequestAnimationFrameType[] = []
  private _trigger: React.ReactInstance | null = null
  private _view: View | ContextView | null = null
  private _dialog: Dialog | null = null
  private _contentElement: Element | null = null
  private _focusRegion?: FocusRegion

  private mouseOutTimeout?: ReturnType<typeof setTimeout>

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
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

  shouldComponentUpdate(nextProps: PopoverProps, nextState: PopoverState) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    )
  }

  componentDidUpdate(prevProps: PopoverProps, prevState: PopoverState) {
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

    // since `offsetX`, `offsetY` and `placement` are saved into the state
    // in the constructor and used from the state later,
    // we need to update the state if these props change
    if (
      this.props.offsetX !== prevProps.offsetX ||
      this.props.offsetY !== prevProps.offsetY ||
      this.props.placement !== prevProps.placement ||
      this.props.shouldAlignArrow !== prevProps.shouldAlignArrow ||
      this.props.withArrow !== prevProps.withArrow
    ) {
      this.setState({
        ...this.computeOffsets(this.placement)
      })
    }
  }

  computeOffsets(placement: PopoverProps['placement']) {
    let { offsetX, offsetY } = this.props

    if (this.props.shouldAlignArrow && this._view) {
      const secondaryPlacement = parsePlacement(placement!)[1]

      // arrowSize and arrowBorderWidth are component theme variables
      // declared in ContextView's styles.js
      const { arrowSize = 0, arrowBorderWidth = 0 } = (
        this._view as ContextView
      ).props.styles!

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

  get placement(): PopoverProps['placement'] {
    let { placement } = this.props
    const { dir } = this.props
    const isRtl = dir === textDirectionContextConsumer.DIRECTION.rtl
    if (isRtl) {
      placement = mirrorHorizontalPlacement(placement!, ' ')
    }

    return !this.shown && this.props.shouldRenderOffscreen
      ? 'offscreen'
      : placement
  }

  get positionProps(): Partial<PositionProps> {
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

  show = (event: React.UIEvent | React.FocusEvent) => {
    if (typeof this.props.isShowingContent === 'undefined') {
      this.setState({ isShowingContent: true })
    }
    this.props.onShowContent?.(event)
  }

  hide = (event: React.UIEvent | React.FocusEvent, documentClick = false) => {
    const { onHideContent, isShowingContent } = this.props

    if (typeof isShowingContent === 'undefined') {
      // uncontrolled, set state, fire callbacks
      this.setState(({ isShowingContent }) => {
        if (isShowingContent) {
          onHideContent?.(event, { documentClick })
        }
        return { isShowingContent: false }
      })
    } else if (isShowingContent) {
      // controlled, fire callback
      onHideContent?.(event, { documentClick })
    }
  }

  toggle = (event: React.MouseEvent) => {
    if (this.shown) {
      this.hide(event)
    } else {
      this.show(event)
    }
  }

  handleDialogDismiss: DialogProps['onDismiss'] = (event, documentClick) => {
    if (
      !this.props.shouldReturnFocus &&
      this.props.shouldFocusContentOnTriggerBlur
    ) {
      const trigger = findDOMNode(this._trigger)

      if (trigger && typeof (trigger as HTMLElement).focus === 'function') {
        ;(trigger as HTMLElement).focus()
      }
    }
    this.hide(event, documentClick)
  }

  handleDialogBlur = (event: React.UIEvent | React.FocusEvent) => {
    if (
      (event as React.KeyboardEvent).keyCode === keycode.codes.tab &&
      (event as React.KeyboardEvent).shiftKey &&
      this.props.shouldFocusContentOnTriggerBlur
    ) {
      return
    }
    this.hide(event)
  }

  handleTriggerKeyDown = (event: React.KeyboardEvent) => {
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

  handleTriggerKeyUp = (event: React.KeyboardEvent) => {
    if (event.keyCode === keycode.codes.esc && this.shown && this.isTooltip) {
      // if popover is tooltip, it is managing its own focus region so we need
      // to prevent esc keyup event from reaching FocusRegionManager
      event.preventDefault()
      this.hide(event)
    }
  }

  handleTriggerBlur = (event: React.FocusEvent) => {
    const { on } = this.props

    if (on && on.indexOf('focus') > -1) {
      this._raf.push(
        requestAnimationFrame(() => {
          if (!containsActiveElement(this._view)) {
            this.hide(event)
          }
        })
      )
    }
  }

  handlePositioned: PositionProps['onPositioned'] = (position) => {
    const placement = position.placement
    this.setState({
      placement,
      ...this.computeOffsets(placement)
    })
    this.props.onPositioned?.(position)
  }

  handlePositionChanged: PositionProps['onPositionChanged'] = (position) => {
    const placement = position.placement
    this.setState({
      placement,
      ...this.computeOffsets(placement)
    })
    this.props.onPositionChanged?.(position)
  }

  renderTrigger() {
    let trigger: React.ReactElement = callRenderProp(this.props.renderTrigger)

    if (trigger) {
      const { on, shouldContainFocus } = this.props

      let onClick: React.MouseEventHandler | undefined = undefined
      let onFocus: React.FocusEventHandler | undefined = undefined
      let onMouseOut: React.MouseEventHandler | undefined = undefined
      let onMouseOver: React.MouseEventHandler | undefined = undefined
      let expanded: string | undefined

      if (on && on.indexOf('click') > -1) {
        onClick = (event: React.MouseEvent) => {
          this.toggle(event)
        }
      }

      if (on && on.indexOf('hover') > -1) {
        error(
          !(on === 'hover'),
          '[Popover] Specifying only the `"hover"` trigger limits the visibility' +
            ' of the Popover to just mouse users. Consider also including the `"focus"` trigger ' +
            'so that touch and keyboard only users can see the Popover content as well.'
        )
        onMouseOver = this._handleMouseOver
        onMouseOut = this._handleMouseOut
      }

      if (on && on.indexOf('focus') > -1) {
        onFocus = (event: React.FocusEvent) => {
          this.show(event)
        }
      }

      if (shouldContainFocus) {
        // only set aria-expanded if popover can contain focus
        expanded = this.shown ? 'true' : 'false'
      } else {
        expanded = undefined
      }

      trigger = safeCloneElement(trigger, {
        ref: (el: React.ReactInstance | null) => {
          this._trigger = el
        },
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
      const color = this.props.color

      let viewProps: (Partial<ViewProps> | Partial<ContextViewProps>) & {
        ref: any
      } = {
        // TODO: try to type `ref` better, LegacyRef<T> was not compatible
        ref: (c: View | ContextView | null) => (this._view = c),
        elementRef: (el: Element | null) => {
          this._contentElement = el
          this.props.contentRef?.(el)
        },
        background: color,
        stacking: this.props.stacking,
        shadow: this.props.shadow,
        display: 'block'
      }

      if (this.isTooltip) {
        viewProps = {
          ...viewProps,
          // Because of a11y reasons popovers should not be hidden when hovered over
          onMouseOver: this._handleMouseOver as any,
          onMouseOut: this._handleMouseOut as any
        }
      }

      const { placement } = this.state

      if (this.props.withArrow) {
        viewProps = {
          ...viewProps,
          // TODO: remove background override after contextview is updated
          background: color === 'primary' ? 'default' : 'inverse',
          placement:
            this.props.dir === textDirectionContextConsumer.DIRECTION.rtl
              ? mirrorHorizontalPlacement(placement!, ' ')
              : placement
        } as Partial<ContextViewProps> & { ref: any }

        return <ContextView {...viewProps}>{content}</ContextView>
      } else {
        viewProps = {
          ...viewProps,
          borderWidth: 'small',
          borderRadius: 'medium',
          ...(color === 'primary-inverse' && { borderColor: 'transparent' })
        } as Partial<ViewProps> & { ref: any }

        return <View {...viewProps}>{content}</View>
      }
    } else {
      return null
    }
  }

  render() {
    const positionProps = this.positionProps

    if (this.props.positionTarget) {
      return (
        <span ref={this.handleRef}>
          {this.renderTrigger()}
          <Position {...positionProps}>{this.renderContent()}</Position>
        </span>
      )
    } else {
      return (
        <Position
          {...positionProps}
          renderTarget={this.renderTrigger()}
          elementRef={this.handleRef}
        >
          {this.renderContent()}
        </Position>
      )
    }
  }
}

export default Popover
export { Popover }
