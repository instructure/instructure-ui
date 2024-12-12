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
import type {
  WithStyleProps,
  ComponentStyle,
  Spacing
} from '@instructure/emotion'
import type { FormMessage } from '../FormPropTypes'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'

type FormFieldLayoutOwnProps = {
  label: React.ReactNode
  /**
   * the id of the input (to link it to its label for a11y)
   */
  id?: string
  /**
   * the element type to render as
   */
  as?: AsElementType
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
  isGroup?: boolean

  /**
   * Margin around the component. Accepts a `Spacing` token. See token values and example usage in [this guide](https://instructure.design/#layout-spacing).
   */
  margin?: Spacing
}

type PropKeys = keyof FormFieldLayoutOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type FormFieldLayoutProps = FormFieldLayoutOwnProps &
  WithStyleProps<null, FormFieldLayoutStyle> &
  OtherHTMLAttributes<FormFieldLayoutOwnProps> &
  WithDeterministicIdProps

type FormFieldLayoutStyle = ComponentStyle<
  'formFieldLayout' | 'groupErrorMessage'
>

const propTypes: PropValidators<PropKeys> = {
  label: PropTypes.node.isRequired,
  id: PropTypes.string,
  as: PropTypes.elementType,
  messages: PropTypes.arrayOf(FormPropTypes.message),
  messagesId: PropTypes.string,
  children: PropTypes.node,
  inline: PropTypes.bool,
  layout: PropTypes.oneOf(['stacked', 'inline']),
  labelAlign: PropTypes.oneOf(['start', 'end']),
  vAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
  width: PropTypes.string,
  inputContainerRef: PropTypes.func,
  elementRef: PropTypes.func,
  isGroup: PropTypes.bool,
  margin: PropTypes.string
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
  'elementRef',
  'margin'

  // added vAlign because FormField and FormFieldGroup passes it, but not adding
  // it to allowedProps to prevent it from getting passed through accidentally
  //'vAlign'
]

export type {
  FormFieldLayoutProps,
  FormFieldLayoutStyle,
  FormFieldLayoutOwnProps
}
export { propTypes, allowedProps }
