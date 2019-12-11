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

import { LayoutPropTypes } from '@instructure/ui-layout'
import { Popover as UIPopover } from '@instructure/ui-popover'
import { bidirectional } from '@instructure/ui-i18n'
import { Children, controllable, element } from '@instructure/ui-prop-types'
import { ComponentIdentifier, deprecated } from '@instructure/ui-react-utils'
import { ThemeablePropTypes } from '@instructure/ui-themeable'
import { testable } from '@instructure/ui-testable'

@testable()
class PopoverTrigger extends ComponentIdentifier {
  static displayName = 'PopoverTrigger'
}

@testable()
class PopoverContent extends ComponentIdentifier {
  static displayName = 'PopoverContent'
}

/**
---
category: components/deprecated
id: DeprecatedPopover
---
**/
@deprecated('7.0.0', null, 'Use Popover from ui-popover instead.')
@testable()
@bidirectional()
class Popover extends Component {
  static Trigger = PopoverTrigger
  static Content = PopoverContent

  static propTypes = {
    /**
     * Children of the `<Popover />`
     */
    children: Children.oneOf([PopoverTrigger, PopoverContent]),

    /**
     * The placement of the content in relation to the trigger
     */
    placement: LayoutPropTypes.placement,

    /**
     * The action that causes the Content to display (`click`, `hover`, `focus`)
     */
    on: PropTypes.oneOfType([
      PropTypes.oneOf(['click', 'hover', 'focus']),
      PropTypes.arrayOf(PropTypes.oneOf(['click', 'hover', 'focus']))
    ]),

    variant: PropTypes.oneOf(['default', 'inverse']),

    /**
    * Controls the shadow depth for the `<Popover />`
    */
    shadow: ThemeablePropTypes.shadow,

    /**
    * Controls the z-index depth for the `<Popover />` content
    */
    stacking: ThemeablePropTypes.stacking,

    /**
     * Whether or not the content should be rendered on initial render.
     */
    defaultShow: PropTypes.bool,

    /**
    * Whether or not the `<Popover />` is shown (should be accompanied by `onToggle`)
    */
    show: controllable(PropTypes.bool, 'onToggle', 'defaultShow'),

    /**
     *
     * A function that returns a reference to the content element
     */
    contentRef: PropTypes.func,

    /**
     * Call this function when the content visibility is toggled. When used with `show`,
     * `<Popover />` will not control its own state.
     */
    onToggle: PropTypes.func,

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

    onKeyDown: PropTypes.func,

    /**
     * Callback fired when content is rendered and positioned
     */
    onShow: PropTypes.func,

    /**
     * Callback fired when mouse is over trigger
     */
    onMouseOver: PropTypes.func,

    /**
     * Callback fired when mouse leaves trigger
     */
    onMouseOut: PropTypes.func,

    /**
     * Callback fired when the `<Popover />` requests to be hidden (via close button, escape key, etc.)
     */
    onDismiss: PropTypes.func,

    /**
    * Should the `<Popover />` display with an arrow pointing to the trigger
    */
    withArrow: PropTypes.bool,

    /**
     * An accessible label for the `<Popover />` content
     */
    label: PropTypes.string,

    /**
     * An element or a function returning an element to focus by default
     */
    defaultFocusElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

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
     * The horizontal offset for the positioned content
     */
    offsetX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * The vertical offset for the positioned content
     */
    offsetY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Callback fired when the position changes
     */
    onPositionChanged: PropTypes.func,

    /**
     * Callback fired when content has been mounted and is initially positioned
     */
    onPositioned: PropTypes.func,

    /**
     * Whether or not position should be tracked or just set on initial render
     */
    trackPosition: PropTypes.bool,

    /**
     * The parent in which to constrain the popover.
     * One of: 'window', 'scroll-parent', 'parent', 'none', an element,
     * or a function returning an element
     */
    constrain: LayoutPropTypes.constrain,

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
     * An element, function returning an element, or array of elements that will not be hidden from
     * the screen reader when the `<Popover />` is open
     */
    liveRegion: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.func]),

    /**
     * Target element for positioning the Popover (if it differs from the trigger)
     */
    positionTarget: PropTypes.oneOfType([element, PropTypes.func]),

    /**
     * should the content offset to align by its arrow
     */
    alignArrow: PropTypes.bool,
    id: PropTypes.string,

    /**
     * should the content become focused when the trigger is blurred
     */
    shouldFocusContentOnTriggerBlur: PropTypes.bool
  }

  static defaultProps = {
    children: null,
    onToggle: open => {},
    onClick: event => {},
    onFocus: event => {},
    onBlur: event => {},
    onMouseOver: event => {},
    onMouseOut: event => {},
    onShow: position => {},
    onDismiss: (event, documentClick) => {},
    placement: 'bottom center',
    stacking: 'topmost',
    shadow: 'resting',
    offsetX: 0,
    offsetY: 0,
    variant: 'default',
    on: ['hover', 'focus'],
    contentRef: el => {},
    defaultShow: false,
    withArrow: true,
    trackPosition: true,
    constrain: 'window',
    onPositioned: position => {},
    onPositionChanged: position => {},
    shouldRenderOffscreen: false,
    shouldContainFocus: false,
    shouldReturnFocus: true,
    shouldCloseOnDocumentClick: true,
    shouldFocusContentOnTriggerBlur: false,
    shouldCloseOnEscape: true,
    defaultFocusElement: null,
    label: null,
    mountNode: null,
    insertAt: 'bottom',
    liveRegion: null,
    positionTarget: null,
    alignArrow: false,
    id: undefined,
    show: undefined,
    closeButtonRef: undefined,
    closeButtonLabel: undefined,
    onKeyDown: undefined
  }

  get placement () {
    return this._popover && this._popover.placement
  }

  get shown () {
    return this._popover && this._popover.shown
  }

  get defaultFocusElement () {
    return this._popover && this._popover.defaultFocusElement
  }

  show = (e) => {
    this._popover && this._popover.show(e)
  }

  hide = (e, documentClick) => {
    this._popover && this._popover.hide(e, documentClick)
  }

  toggle = (e) => {
    this._popover && this._popover.toggle(e)
  }

  render () {
    const {
      show,
      defaultShow,
      label,
      variant,
      alignArrow,
      trackPosition,
      onShow,
      onDismiss,
      onToggle,
      children,
      ...passthroughProps
    } = this.props

    let trigger = ComponentIdentifier.pick(Popover.Trigger, children)
    let content = ComponentIdentifier.pick(Popover.Content, children)

    return (
      <UIPopover
        {...passthroughProps}
        isShowingContent={show}
        defaultIsShowingContent={defaultShow}
        screenReaderLabel={label}
        color={variant === 'inverse' ? 'primary-inverse' : 'primary'}
        shouldAlignArrow={alignArrow}
        shouldTrackPosition={trackPosition}
        onShowContent={() => {
          onToggle(true)
        }}
        onHideContent={(e, { documentClick }) => {
          onDismiss(e, documentClick)
          onToggle(false)
        }}
        onPositioned={onShow}
        ref={(el) => this._popover = el}
        renderTrigger={trigger}
        __dangerouslyIgnoreExperimentalWarnings
      >
        { content }
      </UIPopover>
    )
  }
}

export default Popover
export { Popover, PopoverTrigger, PopoverContent }
