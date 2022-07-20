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

import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type {
  OtherHTMLAttributes,
  PropValidators,
  TrayTheme,
  LiveRegion,
  UIElement
} from '@instructure/shared-types'
import type { BidirectionalProps } from '@instructure/ui-i18n'
import type {
  TransitionType,
  BaseTransitionStatesType
} from '@instructure/ui-motion'

type TrayOwnProps = {
  label: string
  /**
   * The size (width) of the `<Tray />` when placement is `start` or `end`
   */
  size?: 'x-small' | 'small' | 'regular' | 'medium' | 'large'
  /**
   * Placement to determine where the `<Tray />` should display in the viewport
   */
  placement?: 'top' | 'bottom' | 'start' | 'end' | 'center'
  /**
   * Whether or not the `<Tray />` is open
   */
  open?: boolean
  /**
   * An element or a function returning an element to focus by default
   */
  defaultFocusElement?: UIElement
  /**
   *
   * A function that returns a reference to the content element
   */
  contentRef?: (el: HTMLSpanElement | null) => void
  /**
   * Whether focus should be contained within the `<Tray/>` when it is open
   */
  shouldContainFocus?: boolean
  /**
   * Whether focus should be restored when the `<Tray/>` is closed
   */
  shouldReturnFocus?: boolean
  /**
   * Should the `<Tray />` hide when clicks occur outside the content
   */
  shouldCloseOnDocumentClick?: boolean
  /**
   * Callback fired when `<Tray />` content has been mounted in the DOM
   */
  onOpen?: (type?: TransitionType) => void
  /**
   * Callback fired when `<Tray />` has been unmounted from the DOM
   */
  onClose?: (type?: TransitionType) => void
  /**
   * Callback fired when the `<Tray />` is requesting to be closed
   */
  onDismiss?: (
    event: React.UIEvent | React.FocusEvent,
    documentClick?: boolean
  ) => void
  /**
   * An element or a function returning an element to use as the mount node
   * for the `<Tray />` (defaults to `document.body`)
   */
  mountNode?: Element | (() => Element | null) | null
  /**
   * Insert the element at the 'top' of the mountNode or at the 'bottom'
   */
  insertAt?: 'bottom' | 'top'
  /**
   * An element, function returning an element, or array of elements that will not be hidden from
   * the screen reader when the `<Tray />` is open
   */
  liveRegion?: LiveRegion
  /**
   * Callback fired when the <Tray /> transitions in/out
   */
  onTransition?: (
    toState: BaseTransitionStatesType,
    fromState: BaseTransitionStatesType
  ) => void
  /**
   * Callback fired before the <Tray /> transitions in
   */
  onEnter?: () => void
  /**
   * Callback fired as the <Tray /> begins to transition in
   */
  onEntering?: () => void
  /**
   * Callback fired after the <Tray /> finishes transitioning in
   */
  onEntered?: (type?: TransitionType) => void
  /**
   * Callback fired right before the <Tray /> transitions out
   */
  onExit?: () => void
  /**
   * Callback fired as the <Tray /> begins to transition out
   */
  onExiting?: () => void
  /**
   * Callback fired after the <Tray /> finishes transitioning out
   */
  onExited?: (type?: TransitionType) => void
  /**
   * Should the `<Tray />` have a border
   */
  border?: boolean
  /**
   * Should the `<Tray />` have a box shadow
   */
  shadow?: boolean
  children?: React.ReactNode
}

type PropKeys = keyof TrayOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TrayProps = TrayOwnProps &
  BidirectionalProps &
  WithStyleProps<TrayTheme, TrayStyle> &
  OtherHTMLAttributes<TrayOwnProps>

type TrayStyle = ComponentStyle<'tray' | 'content'>

const propTypes: PropValidators<PropKeys> = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
  size: PropTypes.oneOf(['x-small', 'small', 'regular', 'medium', 'large']),
  placement: PropTypes.oneOf(['top', 'bottom', 'start', 'end', 'center']),
  open: PropTypes.bool,
  defaultFocusElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  contentRef: PropTypes.func,
  shouldContainFocus: PropTypes.bool,
  shouldReturnFocus: PropTypes.bool,
  shouldCloseOnDocumentClick: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onDismiss: PropTypes.func,
  mountNode: PropTypes.oneOfType([element, PropTypes.func]),
  insertAt: PropTypes.oneOf(['bottom', 'top']),
  liveRegion: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.elementType),
    PropTypes.elementType,
    PropTypes.func
  ]),
  onTransition: PropTypes.func,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,
  border: PropTypes.bool,
  shadow: PropTypes.bool
}

const allowedProps: AllowedPropKeys = [
  'label',
  'children',
  'size',
  'placement',
  'open',
  'defaultFocusElement',
  'contentRef',
  'shouldContainFocus',
  'shouldReturnFocus',
  'shouldCloseOnDocumentClick',
  'onOpen',
  'onClose',
  'onDismiss',
  'mountNode',
  'insertAt',
  'liveRegion',
  'onTransition',
  'onEnter',
  'onEntering',
  'onEntered',
  'onExit',
  'onExiting',
  'onExited',
  'border',
  'shadow'
]
type TrayState = { transitioning: boolean }
export type { TrayProps, TrayStyle, TrayState }
export { propTypes, allowedProps }
