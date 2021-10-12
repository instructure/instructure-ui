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

import { controllable } from '@instructure/ui-prop-types'
import { FormPropTypes } from '@instructure/ui-form-field'

import type {
  OtherHTMLAttributes,
  PropValidators,
  TextAreaTheme
} from '@instructure/shared-types'
import type { FormMessage } from '@instructure/ui-form-field'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import { TextareaHTMLAttributes } from 'react'

type TextAreaOwnProps = {
  label: React.ReactNode
  id?: string
  size?: 'small' | 'medium' | 'large'
  layout?: 'stacked' | 'inline'
  autoGrow?: boolean
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
  width?: string
  height?: string
  maxHeight?: number | string
  messages?: FormMessage[]
  inline?: boolean
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  textareaRef?: (...args: any[]) => any
  defaultValue?: string
  value?: any // TODO: controllable(PropTypes.string)
  onChange?: (...args: any[]) => any
}

type PropKeys = keyof TextAreaOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TextAreaProps = TextAreaOwnProps &
  WithStyleProps<TextAreaTheme, TextAreaStyle> &
  OtherHTMLAttributes<
    TextAreaOwnProps,
    TextareaHTMLAttributes<TextAreaOwnProps>
  >

type TextAreaStyle = ComponentStyle<
  'textArea' | 'textAreaLayout' | 'textAreaOutline'
>

const propTypes: PropValidators<PropKeys> = {
  label: PropTypes.node.isRequired,
  id: PropTypes.string,
  /**
   * sets the font-size for the textarea
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  layout: PropTypes.oneOf(['stacked', 'inline']),
  /**
   * the textarea will expand vertically to fit the height of the content,
   * unless its content exceeds `maxHeight`
   */
  autoGrow: PropTypes.bool,
  /**
   * is the textarea resizable (in supported browsers)
   */
  resize: PropTypes.oneOf(['none', 'both', 'horizontal', 'vertical']),
  /**
   * a fixed width for the textarea
   */
  width: PropTypes.string,
  /**
   * Initial height for the textarea (if autoGrow is true it will grow vertically)
   * Accepts CSS units, e.g. '55px'
   */
  height: PropTypes.string,
  /**
   * when autoGrow is true, the textarea will never grow beyond this value
   */
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * object with shape: `{
   * text: PropTypes.string,
   * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
   *   }`
   */
  messages: PropTypes.arrayOf(FormPropTypes.message),
  inline: PropTypes.bool,
  /**
   * Html placeholder text to display when the input has no value. This should be hint text, not a label
   * replacement.
   */
  placeholder: PropTypes.string,
  /**
   * Whether or not to disable the textarea
   */
  disabled: PropTypes.bool,
  /**
   * Works just like disabled but keeps the same styles as if it were active
   */
  readOnly: PropTypes.bool,
  /**
   * Sets the required property on the underlying native textArea
   */
  required: PropTypes.bool,
  /**
   * a function that provides a reference to the actual textarea element
   */
  textareaRef: PropTypes.func,
  /**
   * value to set on initial render
   */
  defaultValue: PropTypes.string,
  /**
   * the selected value (must be accompanied by an `onChange` prop)
   */
  value: controllable(PropTypes.string),
  /**
   * when used with the `value` prop, the component will not control its own state
   */
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
