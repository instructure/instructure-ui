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
import React from 'react'
import PropTypes from 'prop-types'

import { element } from '@instructure/ui-prop-types'
import { ThemeablePropTypes } from '@instructure/emotion'
import { PositionPropTypes } from '@instructure/ui-position'

import type { Shadow, Stacking } from '@instructure/emotion'

import type {
  PlacementPropValues,
  PositionConstraint,
  PositionMountNode,
  PositionObject
} from '@instructure/ui-position'
import type { BidirectionalProps } from '@instructure/ui-i18n'
import type {
  PropValidators,
  LiveRegion,
  UIElement
} from '@instructure/shared-types'

type PopoverOwnProps = {
  /**
   * Whether or not the `<Popover />` content is shown
   */
  isShowingContent?: boolean

  /**
   * Whether or not to show the content by default, when uncontrolled
   */
  defaultIsShowingContent?: boolean

  /**
   * The action that causes the content to display (`click`, `hover`, `focus`)
   */
  on?: ('click' | 'hover' | 'focus') | ('click' | 'hover' | 'focus')[]

  /**
   * Whether or not an arrow pointing to the trigger should be rendered
   */
  withArrow?: boolean

  /**
   * Color variant of the popover content
   */
  color?: 'primary' | 'primary-inverse'

  /**
   * Controls the shadow depth for the `<Popover />`
   */
  shadow?: Shadow

  /**
   * Controls the z-index depth for the `<Popover />` content
   */
  stacking?: Stacking

  /**
   * A function that returns a reference to the content element
   */
  contentRef?: (contentElement: Element | null) => void

  /**
   * An element or a function returning an element to focus by default
   */
  defaultFocusElement?: UIElement

  /**
   * An element, function returning an element, or array of elements that will
   * not be hidden from the screen reader when the `<Popover />` is open
   */
  liveRegion?: LiveRegion

  /**
   * An accessible label for the `<Popover />` content
   */
  screenReaderLabel?: string

  /**
   * The horizontal offset for the positioned content
   */
  offsetX?: string | number

  /**
   * The vertical offset for the positioned content
   */
  offsetY?: string | number

  // TODO: remove list when types can be read from other packages
  /**
   * The placement of the content in relation to the trigger
   *
   * One of: 'top', 'bottom', 'start', 'end', 'top start', 'top center',
   * 'top end', 'top stretch', 'bottom start', 'bottom center', 'bottom end',
   * 'bottom stretch', 'start top', 'start center', 'start bottom',
   * 'start stretch', 'end top', 'end center', 'end bottom', 'end stretch',
   * 'center start', 'center end', 'offscreen'
   */
  placement?: PlacementPropValues

  /**
   * The parent in which to constrain the popover.
   *
   * One of: 'window', 'scroll-parent', 'parent', 'none', an element,
   * or a function returning an element
   */
  constrain?: PositionConstraint

  /**
   * An element or a function returning an element to use as the mount node
   * for the `<Popover />` (defaults to `document.body`)
   */
  mountNode?: PositionMountNode

  /**
   * Target element for positioning the Popover (if it differs from the trigger)
   */
  positionTarget?: PositionMountNode

  /**
   * Insert the element at the 'top' of the mountNode or at the 'bottom'
   */
  insertAt?: 'bottom' | 'top'

  /**
   * An id is generated if not supplied.
   */
  id?: string

  /**
   * Whether or not the content should offset to align by its arrow
   */
  shouldAlignArrow?: boolean

  /**
   * Whether or not position should be tracked or just set on initial render
   */
  shouldTrackPosition?: boolean

  /**
   * Should the `<Popover />` render offscreen when visually hidden
   */
  shouldRenderOffscreen?: boolean

  /**
   * Whether focus should contained within the `<Popover/>` when it is open
   */
  shouldContainFocus?: boolean

  /**
   * Whether focus should be returned to the trigger when the `<Popover/>` is closed
   */
  shouldReturnFocus?: boolean

  /**
   * Should the `<Popover />` hide when clicks occur outside the content
   */
  shouldCloseOnDocumentClick?: boolean

  /**
   * Should the `<Popover />` hide when the escape key is pressed
   */
  shouldCloseOnEscape?: boolean

  /**
   * Should the content become focused when the trigger is blurred
   */
  shouldFocusContentOnTriggerBlur?: boolean

  /**
   * Callback fired when content is shown. When controlled, this callback is
   * fired when the Popover expects to be shown
   */
  onShowContent?: (event: React.UIEvent | React.FocusEvent) => void

  /**
   * Callback fired when content is hidden. When controlled, this callback is
   * fired when the Popover expects to be hidden
   */
  onHideContent?: (
    event: React.UIEvent | React.FocusEvent,
    args: { documentClick: boolean }
  ) => void

  /**
   * Callback fired when content has been is initially positioned.
   * If `shouldRenderOffscreen` is true, it will only fire once, the first
   * time the content is shown
   */
  onPositioned?: (position: PositionObject) => void

  /**
   * Callback fired when the position changes
   */
  onPositionChanged?: (position: PositionObject) => void

  /**
   * Callback fired when component is clicked
   */
  onClick?: (event: React.MouseEvent) => void

  /**
   * Callback fired when trigger is focused
   */
  onFocus?: (event: React.FocusEvent) => void

  /**
   * Callback fired when component is blurred
   */
  onBlur?: (event: React.FocusEvent) => void

  /**
   * Callback fired on keydown
   */
  onKeyDown?: (event: React.KeyboardEvent) => void

  /**
   * Callback fired on keyup
   */
  onKeyUp?: (event: React.KeyboardEvent) => void

  /**
   * Callback fired when mouse is over trigger
   */
  onMouseOver?: (event: React.MouseEvent) => void

  /**
   * Callback fired when mouse leaves trigger
   */
  onMouseOut?: (event: React.MouseEvent) => void

  /**
   * The element that triggers the popover
   */
  renderTrigger?: React.ReactNode | (() => React.ReactNode)

  /**
   * The content to be shown by the popover
   */
  children?: React.ReactNode | (() => React.ReactNode)

  /**
   * Provides a reference to the underlying HTML root element
   */
  elementRef?: (element: Element | null) => void
}

type PopoverProps = PopoverOwnProps & BidirectionalProps

type PopoverState = {
  placement: PopoverOwnProps['placement']
  offsetX: PopoverOwnProps['offsetX']
  offsetY: PopoverOwnProps['offsetY']
  isShowingContent?: boolean
}

type PropKeys = keyof PopoverOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

const propTypes: PropValidators<PropKeys> = {
  isShowingContent: PropTypes.bool,
  defaultIsShowingContent: PropTypes.bool,
  on: PropTypes.oneOfType([
    PropTypes.oneOf(['click', 'hover', 'focus']),
    PropTypes.arrayOf(PropTypes.oneOf(['click', 'hover', 'focus']))
  ]),
  withArrow: PropTypes.bool,
  color: PropTypes.oneOf(['primary', 'primary-inverse']),
  placement: PositionPropTypes.placement,
  shadow: ThemeablePropTypes.shadow,
  stacking: ThemeablePropTypes.stacking,
  contentRef: PropTypes.func,
  defaultFocusElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  screenReaderLabel: PropTypes.string,
  offsetX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  offsetY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  constrain: PositionPropTypes.constrain,
  positionTarget: PropTypes.oneOfType([element, PropTypes.func]),
  mountNode: PositionPropTypes.mountNode,
  insertAt: PropTypes.oneOf(['bottom', 'top']),
  liveRegion: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.func
  ]),
  id: PropTypes.string,
  shouldAlignArrow: PropTypes.bool,
  shouldTrackPosition: PropTypes.bool,
  shouldRenderOffscreen: PropTypes.bool,
  shouldContainFocus: PropTypes.bool,
  shouldReturnFocus: PropTypes.bool,
  shouldCloseOnDocumentClick: PropTypes.bool,
  shouldCloseOnEscape: PropTypes.bool,
  shouldFocusContentOnTriggerBlur: PropTypes.bool,
  onShowContent: PropTypes.func,
  onHideContent: PropTypes.func,
  onPositioned: PropTypes.func,
  onPositionChanged: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  renderTrigger: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  elementRef: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'isShowingContent',
  'defaultIsShowingContent',
  'on',
  'withArrow',
  'color',
  'placement',
  'shadow',
  'stacking',
  'contentRef',
  'defaultFocusElement',
  'screenReaderLabel',
  'offsetX',
  'offsetY',
  'constrain',
  'positionTarget',
  'mountNode',
  'insertAt',
  'liveRegion',
  'id',
  'shouldAlignArrow',
  'shouldTrackPosition',
  'shouldRenderOffscreen',
  'shouldContainFocus',
  'shouldReturnFocus',
  'shouldCloseOnDocumentClick',
  'shouldCloseOnEscape',
  'shouldFocusContentOnTriggerBlur',
  'onShowContent',
  'onHideContent',
  'onPositioned',
  'onPositionChanged',
  'onClick',
  'onFocus',
  'onBlur',
  'onKeyDown',
  'onKeyUp',
  'onMouseOver',
  'onMouseOut',
  'renderTrigger',
  'children',
  'elementRef'
]

export type { PopoverProps, PopoverState }
export { propTypes, allowedProps }
