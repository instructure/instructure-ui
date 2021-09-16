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

import {
  element,
  Children as ChildrenPropTypes
} from '@instructure/ui-prop-types'
import { transitionTypePropType } from '@instructure/ui-motion'
import { ModalHeader } from './ModalHeader'
import { ModalBody } from './ModalBody'
import { ModalFooter } from './ModalFooter'

import type {
  AsElementType,
  PropValidators,
  ModalTheme
} from '@instructure/shared-types'
import type { PortalNode } from '@instructure/ui-portal'
import type { PositionMountNode } from '@instructure/ui-position'
import type { TransitionType } from '@instructure/ui-motion'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

type ModalOwnProps = {
  label: string
  children: React.ReactNode // TODO: enforceOrder([ModalHeader, ModalBody, ModalFooter], [ModalHeader, ModalBody], [ModalBody, ModalFooter], [ModalBody])
  as?: AsElementType
  size?: 'auto' | 'small' | 'medium' | 'large' | 'fullscreen'
  variant?: 'default' | 'inverse'
  open?: boolean
  defaultFocusElement?: React.ReactElement | ((...args: any[]) => any)
  shouldReturnFocus?: boolean
  shouldCloseOnDocumentClick?: boolean
  onOpen?: (DOMNode: PortalNode) => any
  onClose?: (...args: any[]) => any
  onDismiss?: (...args: any[]) => any
  contentRef?: (...args: any[]) => any
  mountNode?: PositionMountNode
  insertAt?: 'bottom' | 'top'
  liveRegion?:
    | React.ReactElement[]
    | React.ReactElement
    | ((...args: any[]) => any)
  transition?: TransitionType
  onEnter?: (...args: any[]) => any
  onEntering?: (...args: any[]) => any
  onEntered?: (...args: any[]) => any
  onExit?: (...args: any[]) => any
  onExiting?: (...args: any[]) => any
  onExited?: (...args: any[]) => any
  constrain?: 'window' | 'parent'
  overflow?: 'scroll' | 'fit'
}

type PropKeys = keyof ModalOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ModalProps = ModalOwnProps & WithStyleProps<ModalTheme, ModalStyle>

type ModalStyle = ComponentStyle<'modal' | 'constrainContext'>

const propTypes: PropValidators<PropKeys> = {
  /**
   * An accessible label for the `<Modal />` content
   */
  label: PropTypes.string.isRequired,

  /**
   * The children to be rendered within the `<Modal />`
   */
  children: ChildrenPropTypes.enforceOrder(
    [ModalHeader, ModalBody, ModalFooter],
    [ModalHeader, ModalBody],
    [ModalBody, ModalFooter],
    [ModalBody]
  ),

  /**
   * The element to render the dialog as, `span` by default
   */
  as: PropTypes.elementType,

  /**
   * The size of the `<Modal />` content
   */
  size: PropTypes.oneOf(['auto', 'small', 'medium', 'large', 'fullscreen']),

  /**
   * Designates the background style of the `<Modal />`
   */
  variant: PropTypes.oneOf(['default', 'inverse']),

  /**
   * Whether or not the `<Modal />` is open
   */
  open: PropTypes.bool,

  /**
   * An element or a function returning an element to focus by default
   */
  defaultFocusElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

  /**
   * Whether focus should be returned to the trigger when the `<Modal/>` is closed
   */
  shouldReturnFocus: PropTypes.bool,

  /**
   * Whether the `<Modal/>` should request close when the document is clicked
   */
  shouldCloseOnDocumentClick: PropTypes.bool,

  /**
   * Callback fired when `<Modal />` content has been mounted in the DOM
   */
  onOpen: PropTypes.func,

  /**
   * Callback fired when `<Modal />` has been unmounted from the DOM
   */
  onClose: PropTypes.func,

  /**
   * Callback fired when the `<Modal />` is requesting to be closed
   */
  onDismiss: PropTypes.func,

  /**
   *
   * A function that returns a reference to the content element
   */
  contentRef: PropTypes.func,

  /**
   * An element or a function returning an element to use as the mount node
   * for the `<Modal />` (defaults to `document.body`)
   */
  mountNode: PropTypes.oneOfType([element, PropTypes.func]),
  /**
   * Insert the element at the 'top' of the mountNode or at the 'bottom'
   */
  insertAt: PropTypes.oneOf(['bottom', 'top']),

  /**
   * An element, function returning an element, or array of elements that will not be hidden from
   * the screen reader when the `<Modal />` is open
   */
  liveRegion: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.func
  ]),

  transition: transitionTypePropType,

  /**
   * Callback fired before the <Modal /> transitions in
   */
  onEnter: PropTypes.func,
  /**
   * Callback fired as the <Modal /> begins to transition in
   */
  onEntering: PropTypes.func,
  /**
   * Callback fired after the <Modal /> finishes transitioning in
   */
  onEntered: PropTypes.func,
  /**
   * Callback fired right before the <Modal /> transitions out
   */
  onExit: PropTypes.func,
  /**
   * Callback fired as the <Modal /> begins to transition out
   */
  onExiting: PropTypes.func,
  /**
   * Callback fired after the <Modal /> finishes transitioning out
   */
  onExited: PropTypes.func,
  /**
   * Constrain the Modal to the document window or its closest positioned parent
   */
  constrain: PropTypes.oneOf(['window', 'parent']),
  /**
   * Should ModalBody handle overflow with scrollbars, or fit its
   * content within its own height?
   */
  overflow: PropTypes.oneOf(['scroll', 'fit'])
}

const allowedProps: AllowedPropKeys = [
  'label',
  'children',
  'as',
  'size',
  'variant',
  'open',
  'defaultFocusElement',
  'shouldReturnFocus',
  'shouldCloseOnDocumentClick',
  'onOpen',
  'onClose',
  'onDismiss',
  'contentRef',
  'mountNode',
  'insertAt',
  'liveRegion',
  'transition',
  'onEnter',
  'onEntering',
  'onEntered',
  'onExit',
  'onExiting',
  'onExited',
  'constrain',
  'overflow'
]

export type { ModalProps, ModalStyle }
export { propTypes, allowedProps }
