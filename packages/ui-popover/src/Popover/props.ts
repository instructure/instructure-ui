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
  PositionMountNode
} from '@instructure/ui-position'
import type { BidirectionalProps } from '@instructure/ui-i18n'
import type { PropValidators, LiveRegion } from '@instructure/shared-types'

// Copied list from "PositionPropTypes.placement" so that it appears as options in the properties table.
// TODO: try to use "PositionPropTypes.placement" again once Popover is fully typed and uses @tsProps
const placementPropValues = [
  'top',
  'bottom',
  'start',
  'end',
  'top start',
  'top center',
  'top end',
  'top stretch',
  'bottom start',
  'bottom center',
  'bottom end',
  'bottom stretch',
  'start top',
  'start center',
  'start bottom',
  'start stretch',
  'end top',
  'end center',
  'end bottom',
  'end stretch',
  'center start',
  'center end',
  'offscreen'
]

type PopoverOwnProps = {
  isShowingContent?: boolean
  defaultIsShowingContent?: boolean
  on?: ('click' | 'hover' | 'focus') | ('click' | 'hover' | 'focus')[]
  withArrow?: boolean
  color?: 'primary' | 'primary-inverse'
  shadow?: Shadow
  stacking?: Stacking
  contentRef?: (...args: any[]) => any
  defaultFocusElement?: React.ReactElement | ((...args: any[]) => any)
  screenReaderLabel?: string
  offsetX?: string | number
  offsetY?: string | number
  placement: PlacementPropValues
  constrain?: PositionConstraint
  mountNode?: PositionMountNode
  positionTarget?: PositionMountNode
  insertAt?: 'bottom' | 'top'
  liveRegion?: LiveRegion
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
  children?: React.ReactNode | ((...args: any[]) => React.ReactNode)
  elementRef?: (element: Element | null) => void
}

type PopoverProps = PopoverOwnProps & BidirectionalProps

type PropKeys = keyof PopoverOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

const propTypes: PropValidators<PropKeys> = {
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
  placement: PropTypes.oneOf(placementPropValues),
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

  /**
   * Provides a reference to the underlying HTML root element
   */
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

export type { PopoverProps }
export { propTypes, allowedProps }
