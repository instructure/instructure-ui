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

import type {
  AsElementType,
  OtherHTMLAttributes,
  
  UIElement
} from '@instructure/shared-types'
import type { FocusRegionOptions } from '@instructure/ui-a11y-utils'

type DialogOwnProps = {
  /**
   * The children to be rendered within the `<Dialog />`
   */
  children?: React.ReactNode
  /**
   * The element to render as the component root, `span` by default
   */
  as?: AsElementType
  display?: 'auto' | 'block' | 'inline-block'
  /**
   * The aria-label to read for screen reader. When specified, it will automatically set role="dialog".
   */
  label?: string
  /**
   * Whether or not the `<Dialog />` is open
   */
  open?: boolean
  /**
   * An element or a function returning an element that wraps the content of the `<Dialog />`
   */
  contentElement?: UIElement
} & FocusRegionOptions

type PropKeys = keyof DialogOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type DialogProps = DialogOwnProps & OtherHTMLAttributes<DialogOwnProps>

// JSDoc comments are here, because the doc app is not able to pick them up if
// they are in another package


const allowedProps: AllowedPropKeys = [
  'children',
  'as',
  'display',
  'label',
  'open',
  'onBlur',
  'onDismiss',
  'defaultFocusElement',
  'contentElement',
  'liveRegion',
  'shouldContainFocus',
  'shouldReturnFocus',
  'shouldCloseOnDocumentClick',
  'shouldCloseOnEscape',
  'shouldFocusOnOpen',
  'elementRef'
]

export type { DialogProps }
export { allowedProps }
