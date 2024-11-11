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
import type { TextareaHTMLAttributes } from 'react'
import PropTypes from 'prop-types'

import { controllable } from '@instructure/ui-prop-types'
import { FormPropTypes } from '@instructure/ui-form-field'

import type {
  OtherHTMLAttributes,
  PropValidators,
  TextAreaTheme,
  PickPropsWithExceptions
} from '@instructure/shared-types'
import type { FormMessage, FormFieldOwnProps } from '@instructure/ui-form-field'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'

type TextAreaOwnProps = {
  label: React.ReactNode
  id?: string
  /**
   * sets the font-size for the textarea
   */
  size?: 'small' | 'medium' | 'large'
  layout?: 'stacked' | 'inline'
  /**
   * the textarea will expand vertically to fit the height of the content,
   * unless its content exceeds `maxHeight`
   */
  autoGrow?: boolean
  /**
   * is the textarea resizable (in supported browsers)
   */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
  /**
   * a fixed width for the textarea
   */
  width?: string
  /**
   * Initial height for the textarea (if autoGrow is true it will grow vertically)
   * Accepts CSS units, e.g. '55px'
   */
  height?: string
  /**
   * when autoGrow is true, the textarea will never grow beyond this value
   */
  maxHeight?: number | string
  /**
   * Array of objects with shape: `{
   *   text: React.ReactNode,
   *   type: One of: ['newError', 'error', 'hint', 'success', 'screenreader-only']
   * }`
   */
  messages?: FormMessage[]
  inline?: boolean
  /**
   * Html placeholder text to display when the input has no value. This should be hint text, not a label
   * replacement.
   */
  placeholder?: string
  /**
   * Whether or not to disable the textarea
   */
  disabled?: boolean
  /**
   * Works just like disabled but keeps the same styles as if it were active
   */
  readOnly?: boolean
  /**
   * Sets the required property on the underlying native textArea
   */
  required?: boolean
  /**
   * a function that provides a reference to the actual textarea element
   */
  textareaRef?: (textarea: HTMLTextAreaElement | null) => void
  /**
   * value to set on initial render
   */
  defaultValue?: string
  /**
   * the selected value (must be accompanied by an `onChange` prop)
   */
  value?: string // TODO: controllable(PropTypes.string)
  /**
   * when used with the `value` prop, the component will not control its own state
   */
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

type PropKeys = keyof TextAreaOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TextAreaProps =
  // pickProps passes through FormField.allowedProps, except the ones set manually
  PickPropsWithExceptions<
    FormFieldOwnProps,
    'label' | 'inline' | 'id' | 'elementRef'
  > &
    TextAreaOwnProps &
    WithStyleProps<TextAreaTheme, TextAreaStyle> &
    OtherHTMLAttributes<
      TextAreaOwnProps,
      TextareaHTMLAttributes<TextAreaOwnProps & Element>
    > &
    WithDeterministicIdProps

type TextAreaStyle = ComponentStyle<
  'textArea' | 'textAreaLayout' | 'textAreaOutline' | 'requiredInvalid'
>

const propTypes: PropValidators<PropKeys> = {
  label: PropTypes.node.isRequired,
  id: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  layout: PropTypes.oneOf(['stacked', 'inline']),
  autoGrow: PropTypes.bool,
  resize: PropTypes.oneOf(['none', 'both', 'horizontal', 'vertical']),
  width: PropTypes.string,
  height: PropTypes.string,
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  messages: PropTypes.arrayOf(FormPropTypes.message),
  inline: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  textareaRef: PropTypes.func,
  defaultValue: PropTypes.string,
  value: controllable(PropTypes.string),
  onChange: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'label',
  'id',
  'size',
  'layout',
  'autoGrow',
  'resize',
  'width',
  'height',
  'maxHeight',
  'messages',
  'inline',
  'placeholder',
  'disabled',
  'readOnly',
  'required',
  'textareaRef',
  'defaultValue',
  'value',
  'onChange'
]

export type { TextAreaProps, TextAreaStyle }
export { propTypes, allowedProps }
