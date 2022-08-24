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

import { Dialog } from '@instructure/ui-dialog'

import { ModalHeader } from './ModalHeader'
import { ModalBody } from './ModalBody'
import { ModalFooter } from './ModalFooter'

import type {
  AsElementType,
  PropValidators,
  ModalTheme,
  OtherHTMLAttributes,
  LiveRegion,
  UIElement
} from '@instructure/shared-types'
import type { PortalNode } from '@instructure/ui-portal'
import type { PositionMountNode } from '@instructure/ui-position'
import type { TransitionType } from '@instructure/ui-motion'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

type ModalPropsForPortal = {
  /**
   * Whether or not the `<Modal />` is open
   */
  open?: boolean

  /**
   * An element or a function returning an element to use as the mount node
   * for the `<Modal />` (defaults to `document.body`)
   */
  mountNode?: PositionMountNode

  /**
   * Insert the element at the 'top' of the mountNode or at the 'bottom'
   */
  insertAt?: 'bottom' | 'top'

  /**
   * Callback fired when `<Modal />` content has been mounted in the DOM
   */
  onOpen?: (DOMNode: PortalNode) => void

  /**
   * Callback fired when `<Modal />` has been unmounted from the DOM
   */
  onClose?: () => void
}

type ModalPropsForTransition = {
  transition?: TransitionType

  /**
   * Callback fired before the <Modal /> transitions in
   */
  onEnter?: () => void

  /**
   * Callback fired as the <Modal /> begins to transition in
   */
  onEntering?: () => void

  /**
   * Callback fired after the <Modal /> finishes transitioning in
   */
  onEntered?: (type?: TransitionType) => void

  /**
   * Callback fired right before the <Modal /> transitions out
   */
  onExit?: () => void

  /**
   * Callback fired as the <Modal /> begins to transition out
   */
  onExiting?: () => void

  /**
   * Callback fired after the <Modal /> finishes transitioning out
   */
  onExited?: (type?: TransitionType) => void
}

type ModalPropsForDialog = {
  /**
   * An accessible label for the `<Modal />` content
   */
  label: string

  /**
   * The element to render the dialog as, `span` by default
   */
  as?: AsElementType

  /**
   * Whether focus should be returned to the trigger when the `<Modal/>` is closed
   */
  shouldReturnFocus?: boolean

  /**
   * Whether the `<Modal/>` should request close when the document is clicked
   */
  shouldCloseOnDocumentClick?: boolean

  /**
   * Callback fired when the `<Modal />` is requesting to be closed
   */
  onDismiss?: (
    event: React.UIEvent | React.FocusEvent,
    documentClick?: boolean
  ) => void

  /**
   * An element, function returning an element, or array of elements that will not be hidden from
   * the screen reader when the `<Modal />` is open
   */
  liveRegion?: LiveRegion

  /**
   * An element or a function returning an element to focus by default
   */
  defaultFocusElement?: UIElement
}

type ModalOwnProps = {
  /**
   * The children to be rendered within the `<Modal />`. Children must be type of: `Modal.Header`, `Modal.Body`, `Modal.Footer`. The `Modal.Body` child is required, and they have to follow this order.
   */
  children: React.ReactNode // TODO: enforceOrder([ModalHeader, ModalBody, ModalFooter], [ModalHeader, ModalBody], [ModalBody, ModalFooter], [ModalBody])

  /**
   * The size of the `<Modal />` content
   */
  size?: 'auto' | 'small' | 'medium' | 'large' | 'fullscreen'

  /**
   * Designates the background style of the `<Modal />`
   */
  variant?: 'default' | 'inverse'

  /**
   *
   * A function that returns a reference to the content element
   */
  contentRef?: (dialog: Dialog | null) => void

  /**
   * Constrain the Modal to the document window or its closest positioned parent
   */
  constrain?: 'window' | 'parent'

  /**
   * Should ModalBody handle overflow with scrollbars, or fit its
   * content within its own height?
   */
  overflow?: 'scroll' | 'fit'
} & ModalPropsForPortal &
  ModalPropsForTransition &
  ModalPropsForDialog

type PropKeys = keyof ModalOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ModalProps = ModalOwnProps &
  WithStyleProps<ModalTheme, ModalStyle> &
  OtherHTMLAttributes<ModalOwnProps>

type ModalStyle = ComponentStyle<'modal' | 'constrainContext'>

type ModalState = {
  transitioning: boolean
}

const propTypes: PropValidators<PropKeys> = {
  label: PropTypes.string.isRequired,
  children: ChildrenPropTypes.enforceOrder(
    [ModalHeader, ModalBody, ModalFooter],
    [ModalHeader, ModalBody],
    [ModalBody, ModalFooter],
    [ModalBody]
  ),
  as: PropTypes.elementType,
  size: PropTypes.oneOf(['auto', 'small', 'medium', 'large', 'fullscreen']),
  variant: PropTypes.oneOf(['default', 'inverse']),
  open: PropTypes.bool,
  defaultFocusElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  shouldReturnFocus: PropTypes.bool,
  shouldCloseOnDocumentClick: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onDismiss: PropTypes.func,
  contentRef: PropTypes.func,
  mountNode: PropTypes.oneOfType([element, PropTypes.func]),
  insertAt: PropTypes.oneOf(['bottom', 'top']),
  liveRegion: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.instanceOf(Element)),
    PropTypes.instanceOf(Element),
    PropTypes.func
  ]),
  transition: transitionTypePropType,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,
  constrain: PropTypes.oneOf(['window', 'parent']),
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

export type {
  ModalProps,
  ModalStyle,
  ModalState,
  ModalPropsForPortal,
  ModalPropsForTransition,
  ModalPropsForDialog
}
export { propTypes, allowedProps }
