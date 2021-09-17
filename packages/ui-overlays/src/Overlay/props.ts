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
import { transitionTypes } from '@instructure/ui-motion'

import type { PortalNode } from '@instructure/ui-portal'
import type { PositionMountNode } from '@instructure/ui-position'
import type { TransitionType } from '@instructure/ui-motion'
import type { PropValidators } from '@instructure/shared-types'

type OverlayOwnProps = {
  open?: boolean
  onOpen?: (DOMNode: PortalNode) => any
  onClose?: (...args: any[]) => any
  mountNode?: PositionMountNode
  insertAt?: 'bottom' | 'top'
  label: string
  onDismiss?: (...args: any[]) => any
  defaultFocusElement?: React.ReactElement | ((...args: any[]) => any)
  applicationElement?:
    | React.ReactElement[]
    | React.ReactElement
    | ((...args: any[]) => any)
  contentElement?: React.ReactElement | ((...args: any[]) => any)
  shouldContainFocus?: boolean
  shouldReturnFocus?: boolean
  shouldCloseOnDocumentClick?: boolean
  shouldCloseOnEscape?: boolean
  transition?: TransitionType
  in?: boolean
  unmountOnExit?: boolean
  transitionOnMount?: boolean
  transitionEnter?: boolean
  transitionExit?: boolean
  onEnter?: (...args: any[]) => any
  onEntering?: (...args: any[]) => any
  onEntered?: (...args: any[]) => any
  onExit?: (...args: any[]) => any
  onExiting?: (...args: any[]) => any
  onExited?: (...args: any[]) => any
  children?: React.ReactNode
}

type PropKeys = keyof OverlayOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type OverlayProps = OverlayOwnProps

const propTypes: PropValidators<PropKeys> = {
  children: PropTypes.node,
  /**
   * Whether or not the `<Overlay />` is open
   */
  open: PropTypes.bool,
  /**
   * Callback fired when `<Portal />` content has been mounted in the DOM
   */
  onOpen: PropTypes.func,
  /**
   * Callback fired when `<Portal />` has been unmounted from the DOM
   */
  onClose: PropTypes.func,
  /**
   * An element or a function returning an element to use as the mount node
   * for the `<Portal />` (defaults to `document.body`)
   */
  mountNode: PropTypes.oneOfType([element, PropTypes.func]),
  /**
   * Insert the element at the 'top' of the mountNode or at the 'bottom'
   */
  insertAt: PropTypes.oneOf(['bottom', 'top']),
  /**
   * An accessible label for the `<Overlay />` content
   */
  label: PropTypes.string.isRequired,
  /**
   * Callback fired when the `<Overlay />` is requesting to be closed
   */
  onDismiss: PropTypes.func,
  /**
   * An element or a function returning an element to focus by default
   */
  defaultFocusElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /**
   * An element or a function returning an element to apply `aria-hidden` to
   */
  applicationElement: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.func
  ]),
  /**
   * An element or a function returning an element that wraps the content of the `<Overlay />`
   */
  contentElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

  shouldContainFocus: PropTypes.bool,
  shouldReturnFocus: PropTypes.bool,
  shouldCloseOnDocumentClick: PropTypes.bool,
  shouldCloseOnEscape: PropTypes.bool,
  /**
   * The type of `<Transition />` to use for animating in/out
   */
  transition: transitionTypes,
  /**
   * Show the component; triggers the enter or exit animation
   */
  in: PropTypes.bool,
  /**
   * Unmount the component (remove it from the DOM) when it is not shown
   */
  unmountOnExit: PropTypes.bool,
  /**
   * Run the enter animation when the component mounts, if it is initially
   * shown
   */
  transitionOnMount: PropTypes.bool,
  /**
   * Run the enter animation
   */
  transitionEnter: PropTypes.bool,
  /**
   * Run the exit animation
   */
  transitionExit: PropTypes.bool,
  /**
   * Callback fired before the "entering" classes are applied
   */
  onEnter: PropTypes.func,
  /**
   * Callback fired after the "entering" classes are applied
   */
  onEntering: PropTypes.func,
  /**
   * Callback fired after the "enter" classes are applied
   */
  onEntered: PropTypes.func,
  /**
   * Callback fired before the "exiting" classes are applied
   */
  onExit: PropTypes.func,
  /**
   * Callback fired after the "exiting" classes are applied
   */
  onExiting: PropTypes.func,
  /**
   * Callback fired after the "exited" classes are applied
   */
  onExited: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'children',
  'open',
  'onOpen',
  'onClose',
  'mountNode',
  'insertAt',
  'label',
  'onDismiss',
  'defaultFocusElement',
  'applicationElement',
  'contentElement',
  'shouldReturnFocus',
  'shouldCloseOnDocumentClick',
  'shouldCloseOnEscape',
  'transition',
  'in',
  'unmountOnExit',
  'transitionOnMount',
  'transitionEnter',
  'transitionExit',
  'onEnter',
  'onEntering',
  'onEntered',
  'onExit',
  'onExiting',
  'onExited'
]

export type { OverlayProps }
export { propTypes, allowedProps }
