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
  PropValidators,
  FormFieldGroupTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type { FormFieldLayoutOwnProps } from '../FormFieldLayout/props'
import type { FormMessage } from '../FormPropTypes'

type FormFieldGroupOwnProps = {
  description: React.ReactNode
  /**
   * the element type to render as
   */
  as?: AsElementType
  /**
   * Array of objects with shape: `{
   *   text: React.ReactNode,
   *   type: One of: ['error', 'hint', 'success', 'screenreader-only']
   * }`
   */
  messages?: FormMessage[]
  /**
   * id for the form field messages
   */
  messagesId?: string
  disabled?: boolean
  children?: React.ReactNode
  layout?: 'stacked' | 'columns' | 'inline'
  rowSpacing?: 'none' | 'small' | 'medium' | 'large'
  colSpacing?: 'none' | 'small' | 'medium' | 'large'
  vAlign?: 'top' | 'middle' | 'bottom'
  startAt?: 'small' | 'medium' | 'large' | 'x-large' | null
  /**
   * provides a reference to the underlying html root element
   */
  elementRef?: (element: Element | null) => void
}

type FormFieldGroupStyleProps = {
  invalid: boolean
}

type PropKeys = keyof FormFieldGroupOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type FormFieldGroupProps = FormFieldGroupOwnProps &
  WithStyleProps<FormFieldGroupTheme, FormFieldGroupStyle> &
  OtherHTMLAttributes<FormFieldGroupOwnProps> &
  // Adding other props that can be passed to FormFieldLayout,
  // excluding the ones we set manually
  Omit<
    FormFieldLayoutOwnProps,
    'messages' | 'messagesId' | 'vAlign' | 'layout' | 'label' | 'children'
  >

type FormFieldGroupStyle = ComponentStyle<'formFieldGroup'>

const propTypes: PropValidators<PropKeys> = {
  description: PropTypes.node.isRequired,
  as: PropTypes.elementType,
  messages: PropTypes.arrayOf(FormPropTypes.message),
  messagesId: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  layout: PropTypes.oneOf(['stacked', 'columns', 'inline']),
  rowSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  colSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  vAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
  startAt: PropTypes.oneOf(['small', 'medium', 'large', 'x-large', null]),
  elementRef: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'description',
  'as',
  'messages',
  'messagesId',
  'disabled',
  'children',
  'layout',
  'rowSpacing',
  'colSpacing',
  'vAlign',
  'startAt',
  'elementRef'
]

export type {
  FormFieldGroupProps,
  FormFieldGroupStyleProps,
  FormFieldGroupStyle
}
export { propTypes, allowedProps }
