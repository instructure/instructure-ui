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
import { FormPropTypes } from '../FormPropTypes'

import type {
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'
import type { FormMessage } from '../FormPropTypes'
import type { Spacing } from '@instructure/emotion'

type FormFieldOwnProps = {
  label: React.ReactNode
  /**
   * the id of the input (to link it to its label for a11y).
   * Applied as the `for` HTML prop on the label.
   */
  id: string
  /**
   * Array of objects with shape: `{
   *   text: React.ReactNode,
   *   type: One of: ['newError', 'error', 'hint', 'success', 'screenreader-only']
   * }`
   */
  messages?: FormMessage[]
  /**
   * id for the form field messages
   */
  messagesId?: string
  children?: React.ReactNode
  inline?: boolean
  layout?: 'stacked' | 'inline'
  labelAlign?: 'start' | 'end'
  vAlign?: 'top' | 'middle' | 'bottom'
  width?: string
  inputContainerRef?: (element: HTMLSpanElement | null) => void
  /**
   * provides a reference to the underlying html root element
   */
  elementRef?: (element: Element | null) => void

  /**
   * Margin around the component. Accepts a `Spacing` token. See token values and example usage in [this guide](https://instructure.design/#layout-spacing).
   */
  margin?: Spacing
}

type PropKeys = keyof FormFieldOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type FormFieldProps = FormFieldOwnProps & OtherHTMLAttributes<FormFieldOwnProps>
const allowedProps: AllowedPropKeys = [
  'label',
  'id',
  'messages',
  'messagesId',
  'children',
  'inline',
  'layout',
  'labelAlign',
  'vAlign',
  'width',
  'inputContainerRef',
  'elementRef',
  'margin'
]

export type { FormFieldOwnProps, FormFieldProps }
export { allowedProps }
