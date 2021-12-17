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
import { transitionTypePropType } from '@instructure/ui-motion'

import type { PortalNode, PortalProps } from '@instructure/ui-portal'
import type { PositionMountNode } from '@instructure/ui-position'
import type { TransitionProps, TransitionType } from '@instructure/ui-motion'
import type { DialogProps } from '@instructure/ui-dialog'
import type {
  OtherHTMLAttributes,
  PickPropsWithExceptions,
  PropValidators,
  UIElement
} from '@instructure/shared-types'

type OverlayOwnProps = {
  /**
   * Whether or not the `<Overlay />` is open
   */
  open?: boolean

  /**
   * The type of `<Transition />` to use for animating in/out
   */
  transition?: TransitionType // passed as to Transition as `type`

  // TODO: deprecate applicationElement, it was removed from Dialog in v6
  /**
   * An element or a function returning an element to apply `aria-hidden` to
   */
  applicationElement?:
    | React.ReactElement[]
    | React.ReactElement
    | (() => React.ReactElement[] | React.ReactElement)
} & PropsForPortal &
  PropsForDialog &
  PropsForTransition

type PropsForPortal = {
  /**
   * Callback fired when `<Portal />` content has been mounted in the DOM
   */
  onOpen?: (DOMNode: PortalNode) => void

  /**
   * Callback fired when `<Portal />` has been unmounted from the DOM
   */
  onClose?: () => void

  /**
   * An element or a function returning an element to use as the mount node
   * for the `<Portal />` (defaults to `document.body`)
   */
  mountNode?: PositionMountNode

  /**
   * Insert the element at the 'top' of the mountNode or at the 'bottom'
   */
  insertAt?: 'bottom' | 'top'
}

type PropsForDialog = {
  children?: React.ReactNode

  /**
   * An accessible label for the `<Overlay />` content
   */
  label: string

  /**
   * An element or a function returning an element to focus by default
   */
  defaultFocusElement?: UIElement

  /**
   * An element or a function returning an element that wraps the content of the `<Overlay />`
   */
  contentElement?: UIElement

  shouldContainFocus?: boolean

  shouldReturnFocus?: boolean

  shouldCloseOnDocumentClick?: boolean

  shouldCloseOnEscape?: boolean

  /**
   * Callback fired when the `<Overlay />` is requesting to be closed
   */
  onDismiss?: (
    event: React.UIEvent | React.FocusEvent,
    documentClick?: boolean
  ) => void
}

type PropsForTransition = {
  /**
   * Show the component; triggers the enter or exit animation
   */
  in?: boolean

  /**
   * Unmount the component (remove it from the DOM) when it is not shown
   */
  unmountOnExit?: boolean

  /**
   * Run the enter animation when the component mounts, if it is initially
   * shown
   */
  transitionOnMount?: boolean

  /**
   * Run the enter animation
   */
  transitionEnter?: boolean

  /**
   * Run the exit animation
   */
  transitionExit?: boolean

  /**
   * Callback fired before the "entering" classes are applied
   */
  onEnter?: () => void

  /**
   * Callback fired after the "entering" classes are applied
   */
  onEntering?: () => void

  /**
   * Callback fired after the "enter" classes are applied
   */
  onEntered?: (type?: TransitionType) => void

  /**
   * Callback fired before the "exiting" classes are applied
   */
  onExit?: () => void

  /**
   * Callback fired after the "exiting" classes are applied
   */
  onExiting?: () => void

  /**
   * Callback fired after the "exited" classes are applied
   */
  onExited?: (type?: TransitionType) => void
}

type PropKeys = keyof OverlayOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type OverlayProps =
  // pickProps can pass props to Dialog
  PickPropsWithExceptions<
    DialogProps,
    keyof PropsForDialog | 'open' | 'elementRef'
  > &
    // pickProps can pass props to Portal
    PickPropsWithExceptions<
      PortalProps,
      keyof PropsForPortal | 'open' | 'children'
    > &
    // pickProps can pass props to Transition
    PickPropsWithExceptions<
      TransitionProps,
      keyof PropsForTransition | 'children' | 'type'
    > &
    OverlayOwnProps &
    OtherHTMLAttributes<OverlayOwnProps>

type OverlayState = {
  open: boolean
  transitioning: boolean
}

const propTypes: PropValidators<PropKeys> = {
  children: PropTypes.node,
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  mountNode: PropTypes.oneOfType([element, PropTypes.func]),
  insertAt: PropTypes.oneOf(['bottom', 'top']),
  label: PropTypes.string.isRequired,
  onDismiss: PropTypes.func,
  defaultFocusElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  applicationElement: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.func
  ]),
  contentElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  shouldContainFocus: PropTypes.bool,
  shouldReturnFocus: PropTypes.bool,
  shouldCloseOnDocumentClick: PropTypes.bool,
  shouldCloseOnEscape: PropTypes.bool,
  transition: transitionTypePropType,
  in: PropTypes.bool,
  unmountOnExit: PropTypes.bool,
  transitionOnMount: PropTypes.bool,
  transitionEnter: PropTypes.bool,
  transitionExit: PropTypes.bool,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
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

export type { OverlayProps, OverlayState }
export { propTypes, allowedProps }
