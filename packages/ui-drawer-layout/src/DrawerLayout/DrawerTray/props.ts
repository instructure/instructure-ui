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
import { textDirectionContextConsumer } from '@instructure/ui-i18n'

import type { PositionMountNode } from '@instructure/ui-position'
import type { BidirectionalProps } from '@instructure/ui-i18n'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type {
  PropValidators,
  DrawerLayoutTrayTheme,
  OtherHTMLAttributes,
  LiveRegion,
  UIElement
} from '@instructure/shared-types'
import {
  BaseTransitionStatesType,
  TransitionType
} from '@instructure/ui-motion/src/Transition/BaseTransition/props'

type DrawerTrayPlacement = 'start' | 'end'

type DrawerLayoutTrayOwnProps = {
  label: string

  children?: React.ReactNode | (() => React.ReactNode)

  render?: () => React.ReactNode

  /**
   * Placement of the `<DrawerLayout.Tray />`
   */
  placement?: DrawerTrayPlacement

  /**
   * If the tray is open or closed.
   */
  open?: boolean

  /**
   * Called when the `<DrawerLayout.Tray />` is opened
   */
  onOpen?: (transitionType?: TransitionType) => void

  /**
   * Called when the `<DrawerLayout.Tray />` is closed
   */
  onClose?: (transitionType?: TransitionType) => void

  /**
   * Should the `<DrawerLayout.Tray />` have a border
   */
  border?: boolean

  /**
   * Should the `<DrawerLayout.Tray />` have a shadow
   */
  shadow?: boolean

  /**
   * Ref function for the `<DrawerLayout.Tray />` content
   */
  contentRef?: (element: HTMLDivElement | null) => void

  /**
   * An element or a function returning an element to use as the mount node
   * for the `<DrawerLayout.Tray />` when tray is overlaying content
   */
  mountNode?: PositionMountNode
} & PropsPassedToDialog &
  PropsPassedToTransition &
  BidirectionalProps

type PropsPassedToDialog = {
  /**
   * An element or a function returning an element to focus by default
   */
  defaultFocusElement?: UIElement

  /**
   * An element, function returning an element, or array of elements that will not be hidden from
   * the screen reader when the `<DrawerLayout.Tray />` is open
   */
  liveRegion?: LiveRegion

  onDismiss?: (
    event: React.UIEvent | React.FocusEvent,
    documentClick?: boolean
  ) => void

  shouldContainFocus?: boolean

  shouldReturnFocus?: boolean

  shouldCloseOnDocumentClick?: boolean

  shouldCloseOnEscape?: boolean
}

type PropsPassedToTransition = {
  /**
   * Callback fired when the `<DrawerLayout.Tray />` transitions in/out
   */
  onTransition?: (
    toState: BaseTransitionStatesType,
    fromState: BaseTransitionStatesType
  ) => void

  /**
   * Callback fired before the `<DrawerLayout.Tray />` transitions in
   */
  onEnter?: () => void

  /**
   * Callback fired as the `<DrawerLayout.Tray />` begins to transition in
   */
  onEntering?: () => void

  /**
   * Callback fired after the `<DrawerLayout.Tray />` finishes transitioning in
   */
  onEntered?: (type?: TransitionType) => void

  /**
   * Callback fired right before the `<DrawerLayout.Tray />` transitions out
   */
  onExit?: () => void

  /**
   * Callback fired as the `<DrawerLayout.Tray />` begins to transition out
   */
  onExiting?: () => void

  /**
   * Callback fired after the `<DrawerLayout.Tray />` finishes transitioning out
   */
  onExited?: (type?: TransitionType) => void
}

type DrawerLayoutTrayState = {
  transitioning: boolean
  portalOpen: boolean
}

type DrawerLayoutTrayStyleProps = {
  placement: DrawerTrayPlacement
}

type PropKeys = keyof DrawerLayoutTrayOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type DrawerLayoutTrayProps = DrawerLayoutTrayOwnProps &
  WithStyleProps<DrawerLayoutTrayTheme, DrawerLayoutTrayStyle> &
  OtherHTMLAttributes<DrawerLayoutTrayOwnProps>

type DrawerLayoutTrayStyle = ComponentStyle<
  'drawerTray' | 'drawerTrayWithShadow' | 'drawerTrayContent'
>

const propTypes: PropValidators<PropKeys> = {
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  render: PropTypes.func,
  placement: PropTypes.oneOf(['start', 'end']),
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  border: PropTypes.bool,
  shadow: PropTypes.bool,
  onTransition: PropTypes.func,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,
  contentRef: PropTypes.func,
  mountNode: PropTypes.oneOfType([element, PropTypes.func]),
  defaultFocusElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  liveRegion: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.elementType),
    PropTypes.elementType,
    PropTypes.number
  ]),
  onDismiss: PropTypes.func,
  shouldContainFocus: PropTypes.bool,
  shouldReturnFocus: PropTypes.bool,
  shouldCloseOnDocumentClick: PropTypes.bool,
  shouldCloseOnEscape: PropTypes.bool,
  dir: PropTypes.oneOf(Object.values(textDirectionContextConsumer.DIRECTION))
}

const allowedProps: AllowedPropKeys = [
  'label',
  'children',
  'render',
  'placement',
  'open',
  'onOpen',
  'onClose',
  'border',
  'shadow',
  'onTransition',
  'onEnter',
  'onEntering',
  'onEntered',
  'onExit',
  'onExiting',
  'onExited',
  'contentRef',
  'mountNode',
  'defaultFocusElement',
  'liveRegion',
  'onDismiss',
  'shouldContainFocus',
  'shouldReturnFocus',
  'shouldCloseOnDocumentClick',
  'shouldCloseOnEscape',
  'dir'
]

export type {
  DrawerLayoutTrayProps,
  DrawerLayoutTrayState,
  DrawerLayoutTrayStyleProps,
  DrawerTrayPlacement,
  DrawerLayoutTrayStyle
}
export { propTypes, allowedProps }
