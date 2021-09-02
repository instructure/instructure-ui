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
import { bidirectional } from '@instructure/ui-i18n'

import type { PositionMountNode } from '@instructure/ui-position'
import type { BidirectionalProps } from '@instructure/ui-i18n'
import type { WithStyleProps } from '@instructure/emotion'
import type { PropValidators } from '@instructure/shared-types'

type DrawerTrayPlacement = 'start' | 'end'

type DrawerLayoutTrayOwnProps = {
  label: string
  children?: React.ReactNode | ((...args: any[]) => React.ReactNode)
  render?: (...args: any[]) => any
  placement?: DrawerTrayPlacement
  open?: boolean
  onOpen?: (...args: any[]) => any
  onClose?: (...args: any[]) => any
  border?: boolean
  shadow?: boolean
  onTransition?: (...args: any[]) => any
  onEnter?: (...args: any[]) => any
  onEntering?: (...args: any[]) => any
  onEntered?: (...args: any[]) => any
  onExit?: (...args: any[]) => any
  onExiting?: (...args: any[]) => any
  onExited?: (...args: any[]) => any
  contentRef?: (...args: any[]) => any
  mountNode?: PositionMountNode
  defaultFocusElement?: React.ReactElement | ((...args: any[]) => any)
  liveRegion?:
    | React.ReactElement[]
    | React.ReactElement
    | ((...args: any[]) => any)
  onDismiss?: (...args: any[]) => any
  shouldContainFocus?: boolean
  shouldReturnFocus?: boolean
  shouldCloseOnDocumentClick?: boolean
  shouldCloseOnEscape?: boolean
} & BidirectionalProps

type DrawerLayoutTrayState = {
  transitioning: boolean
  portalOpen: boolean
}

type DrawerLayoutTrayStyleProps = {
  placement: DrawerTrayPlacement
}

type PropKeys = keyof DrawerLayoutTrayOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type DrawerLayoutTrayProps = DrawerLayoutTrayOwnProps & WithStyleProps

const propTypes: PropValidators<PropKeys> = {
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  render: PropTypes.func,
  /**
   * Placement of the `<DrawerLayout.Tray />`
   */
  placement: PropTypes.oneOf(['start', 'end']),
  /**
   * If the tray is open or closed.
   */
  open: PropTypes.bool,
  /**
   * Called when the `<DrawerLayout.Tray />` is opened
   */
  onOpen: PropTypes.func,
  /**
   * Called when the `<DrawerLayout.Tray />` is closed
   */
  onClose: PropTypes.func,
  /**
   * Should the `<DrawerLayout.Tray />` have a border
   */
  border: PropTypes.bool,
  /**
   * Should the `<DrawerLayout.Tray />` have a shadow
   */
  shadow: PropTypes.bool,
  /**
   * Callback fired when the `<DrawerLayout.Tray />` transitions in/out
   */
  onTransition: PropTypes.func,
  /**
   * Callback fired before the `<DrawerLayout.Tray />` transitions in
   */
  onEnter: PropTypes.func,
  /**
   * Callback fired as the `<DrawerLayout.Tray />` begins to transition in
   */
  onEntering: PropTypes.func,
  /**
   * Callback fired after the `<DrawerLayout.Tray />` finishes transitioning in
   */
  onEntered: PropTypes.func,
  /**
   * Callback fired right before the `<DrawerLayout.Tray />` transitions out
   */
  onExit: PropTypes.func,
  /**
   * Callback fired as the `<DrawerLayout.Tray />` begins to transition out
   */
  onExiting: PropTypes.func,
  /**
   * Callback fired after the `<DrawerLayout.Tray />` finishes transitioning out
   */
  onExited: PropTypes.func,
  /**
   * Ref function for the `<DrawerLayout.Tray />` content
   */
  contentRef: PropTypes.func,
  /**
   * An element or a function returning an element to use as the mount node
   * for the `<DrawerLayout.Tray />` when tray is overlaying content
   */
  mountNode: PropTypes.oneOfType([element, PropTypes.func]),
  /**
   * An element or a function returning an element to focus by default
   */
  defaultFocusElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /**
   * An element, function returning an element, or array of elements that will not be hidden from
   * the screen reader when the `<DrawerLayout.Tray />` is open
   */
  liveRegion: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.func
  ]),
  onDismiss: PropTypes.func,
  shouldContainFocus: PropTypes.bool,
  shouldReturnFocus: PropTypes.bool,
  shouldCloseOnDocumentClick: PropTypes.bool,
  shouldCloseOnEscape: PropTypes.bool,
  dir: PropTypes.oneOf(Object.values(bidirectional.DIRECTION))
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
  DrawerTrayPlacement
}
export { propTypes, allowedProps }
