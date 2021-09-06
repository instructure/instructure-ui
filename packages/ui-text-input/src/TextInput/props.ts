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

import { FormPropTypes } from '@instructure/ui-form-field'
import { controllable } from '@instructure/ui-prop-types'
import type { InteractionType } from '@instructure/ui-react-utils'
import type { FormMessage } from '@instructure/ui-form-field'
import type { PropValidators } from '@instructure/shared-types'
import type { WithStyleProps } from '@instructure/emotion'

export type TextInputOwnProps = {
  renderLabel?: React.ReactNode | ((...args: any[]) => any)
  type?: 'text' | 'email' | 'url' | 'tel' | 'search' | 'password'
  id?: string
  value?: any // TODO: controllable(PropTypes.string)
  defaultValue?: string
  interaction?: InteractionType
  messages?: FormMessage[]
  size?: 'small' | 'medium' | 'large'
  textAlign?: 'start' | 'center'
  width?: string
  htmlSize?: string | number
  display?: 'inline-block' | 'block'
  shouldNotWrap?: boolean
  placeholder?: string
  isRequired?: boolean
  inputRef?: (...args: any[]) => any
  inputContainerRef?: (...args: any[]) => any
  renderBeforeInput?: React.ReactNode | ((...args: any[]) => any)
  renderAfterInput?: React.ReactNode | ((...args: any[]) => any)
  onChange?: (...args: any[]) => any
  onBlur?: (...args: any[]) => any
  onFocus?: (...args: any[]) => any
}

type PropKeys = keyof TextInputOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TextInputProps = TextInputOwnProps & WithStyleProps

const propTypes: PropValidators<PropKeys> = {
  /**
   * The form field label.
   */
  renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * Determines the underlying native HTML `<input>` element's `type`.
   * For more see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/url
   */
  type: PropTypes.oneOf(['text', 'email', 'url', 'tel', 'search', 'password']),
  /**
   * The id of the text input. One is generated if not supplied.
   */
  id: PropTypes.string,
  /**
   * the selected value (must be accompanied by an `onChange` prop)
   */
  value: controllable(PropTypes.string),
  /**
   * value to set on initial render
   */
  defaultValue: PropTypes.string,
  /**
   * Specifies if interaction with the input is enabled, disabled, or readonly.
   * When "disabled", the input changes visibly to indicate that it cannot
   * receive user interactions. When "readonly" the input still cannot receive
   * user interactions but it keeps the same styles as if it were enabled.
   */
  interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
  /**
   * object with shape: `{
   * text: PropTypes.string,
   * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
   *   }`
   */
  messages: PropTypes.arrayOf(FormPropTypes.message),
  /**
   * The size of the text input.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * The text alignment of the input.
   */
  textAlign: PropTypes.oneOf(['start', 'center']),
  /**
   * The width of the input.
   */
  width: PropTypes.string,
  /**
   * The width of the input, in characters, if a width is not explicitly
   * provided via the `width` prop. Only applicable if `isInline={true}`.
   */
  htmlSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * The display of the root element.
   */
  display: PropTypes.oneOf(['inline-block', 'block']),
  /**
   * Prevents the default behavior of wrapping the input and rendered content
   * when available space is exceeded.
   */
  shouldNotWrap: PropTypes.bool,
  /**
   * Html placeholder text to display when the input has no value. This should be hint text, not a label
   * replacement.
   */
  placeholder: PropTypes.string,
  /**
   * Whether or not the text input is required.
   */
  isRequired: PropTypes.bool,
  /**
   * a function that provides a reference to the actual input element
   */
  inputRef: PropTypes.func,
  /**
   * a function that provides a reference a parent of the input element
   */
  inputContainerRef: PropTypes.func,
  /**
   * Content to display before the input text, such as an icon
   */
  renderBeforeInput: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * Content to display after the input text, such as an icon
   */
  renderAfterInput: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * Callback executed when the input fires a change event.
   * @param {Object} event - the event object
   * @param {Object} value - the string value of the input
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when input loses focus.
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when input receives focus.
   */
  onFocus: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'renderLabel',
  'type',
  'id',
  'value',
  'defaultValue',
  'interaction',
  'messages',
  'size',
  'textAlign',
  'width',
  'htmlSize',
  'display',
  'shouldNotWrap',
  'placeholder',
  'isRequired',
  'inputRef',
  'inputContainerRef',
  'renderBeforeInput',
  'renderAfterInput',
  'onChange',
  'onBlur',
  'onFocus'
]

type TextInputState = {
  hasFocus: boolean
}

type TextInputStyleProps = {
  disabled: boolean
  invalid: boolean
  focused: TextInputState['hasFocus']
}

export type { TextInputProps, TextInputState, TextInputStyleProps }
export { propTypes, allowedProps }
