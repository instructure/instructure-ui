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

import PropTypes from 'prop-types'

import { FormPropTypes } from '../FormPropTypes'

import type {
  AsElementType,
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type { FormMessage } from '../FormPropTypes'

type FormFieldLayoutOwnProps = {
  label: React.ReactNode
  id?: string
  as?: AsElementType
  messages?: FormMessage[]
  messagesId?: string
  children?: React.ReactNode
  inline?: boolean
  layout?: 'stacked' | 'inline'
  labelAlign?: 'start' | 'end'
  width?: string
  inputContainerRef?: (...args: any[]) => any
  elementRef?: (element: Element | null) => void
}

type PropKeys = keyof FormFieldLayoutOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type FormFieldLayoutProps = FormFieldLayoutOwnProps &
  WithStyleProps<null, FormFieldLayoutStyle> &
  OtherHTMLAttributes<FormFieldLayoutOwnProps>

type FormFieldLayoutStyle = ComponentStyle<'formFieldLayout'>

const propTypes: PropValidators<PropKeys> = {
  label: PropTypes.node.isRequired,
  /**
   * the id of the input (to link it to its label for a11y)
   */
  id: PropTypes.string,
  /**
   * the element type to render as
   */
  as: PropTypes.elementType,
  /**
   * object with shape: `{
   * text: PropTypes.string,
   * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
   *   }`
   */
  messages: PropTypes.arrayOf(FormPropTypes.message),
  /**
   * id for the form field messages
   */
  messagesId: PropTypes.string,
  children: PropTypes.node,
  inline: PropTypes.bool,
  layout: PropTypes.oneOf(['stacked', 'inline']),
  labelAlign: PropTypes.oneOf(['start', 'end']),
  width: PropTypes.string,
  inputContainerRef: PropTypes.func,
  /**
   * provides a reference to the underlying html root element
   */
  elementRef: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'label',
  'id',
  'as',
  'messages',
  'messagesId',
  'children',
  'inline',
  'layout',
  'labelAlign',
  'width',
  'inputContainerRef',
  'elementRef'
]

export type { FormFieldLayoutProps, FormFieldLayoutStyle }
export { propTypes, allowedProps }
