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

import { FormPropTypes } from '../FormPropTypes'

import type {
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'
import type { FormMessage } from '../FormPropTypes'

type FormFieldOwnProps = {
  label: React.ReactNode
  id: string
  messages?: FormMessage[]
  messagesId?: string
  children?: React.ReactNode
  inline?: boolean
  layout?: 'stacked' | 'inline'
  labelAlign?: 'start' | 'end'
  vAlign?: 'top' | 'middle' | 'bottom'
  width?: string
  inputContainerRef?: (...args: any[]) => any
  elementRef?: (element: Element | null) => void
}

type PropKeys = keyof FormFieldOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type FormFieldProps = FormFieldOwnProps & OtherHTMLAttributes<FormFieldOwnProps>

const propTypes: PropValidators<PropKeys> = {
  label: PropTypes.node.isRequired,
  /**
   * the id of the input (to link it to its label for a11y)
   */
  id: PropTypes.string.isRequired,
  /**
   * object with shape: `{
   *   text: PropTypes.string,
   *   type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
   * }`
   */
  messages: PropTypes.arrayOf(FormPropTypes.message),
  messagesId: PropTypes.string,
  children: PropTypes.node,
  inline: PropTypes.bool,
  layout: PropTypes.oneOf(['stacked', 'inline']),
  labelAlign: PropTypes.oneOf(['start', 'end']),
  vAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
  width: PropTypes.string,
  inputContainerRef: PropTypes.func,
  elementRef: PropTypes.func
}

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
  'elementRef'
]

export type { FormFieldProps }
export { propTypes, allowedProps }
