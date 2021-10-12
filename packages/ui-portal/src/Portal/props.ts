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

import type { BidirectionalProps } from '@instructure/ui-i18n'
import type {
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'

/**
 * The DOM Node of the Portal. It is created as a `span` element.
 */
type PortalNode = HTMLSpanElement | null

type PortalOwnProps = {
  /**
   * Whether or not the `<Portal />` is open
   */
  open?: boolean

  /**
   * Callback fired when `<Portal />` content has been mounted in the DOM. Ha the Portal DOMNode as parameter.
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
  mountNode?: Element | (() => Element | null) | null

  /**
   * Insert the element at the 'top' of the mountNode or at the 'bottom'
   */
  insertAt?: 'bottom' | 'top'

  /**
   * The children to be rendered within the `<Portal />`
   */
  children?: React.ReactNode

  /**
   * Provides a reference to the underlying html element. Ha the Portal DOMNode as parameter.
   */
  elementRef?: (el?: PortalNode) => void
} & BidirectionalProps

type PropKeys = keyof PortalOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type PortalProps = PortalOwnProps & OtherHTMLAttributes<PortalOwnProps>

type PortalState = {
  mountNode: Element
}

const propTypes: PropValidators<PropKeys> = {
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  mountNode: PropTypes.oneOfType([element, PropTypes.func]),
  insertAt: PropTypes.oneOf(['bottom', 'top']),
  children: PropTypes.node,
  elementRef: PropTypes.func,
  dir: PropTypes.oneOf(Object.values(bidirectional.DIRECTION))
}

const allowedProps: AllowedPropKeys = [
  'open',
  'onOpen',
  'onClose',
  'mountNode',
  'insertAt',
  'children',
  'elementRef',
  'dir'
]

export type { PortalProps, PortalState, PortalNode }
export { propTypes, allowedProps }
