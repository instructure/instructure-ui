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

import React, { InputHTMLAttributes } from 'react'
import PropTypes from 'prop-types'

import { FormPropTypes } from '@instructure/ui-form-field'
import { controllable } from '@instructure/ui-prop-types'

import type { InteractionType } from '@instructure/ui-react-utils'
import type { FormFieldProps, FormMessage } from '@instructure/ui-form-field'
import type {
  OtherHTMLAttributes,
  PropValidators,
  TextInputTheme
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'

type TextInputOwnProps = {
  /**
   * The form field label.
   */
  renderLabel?: React.ReactNode | (() => React.ReactNode)

  /**
   * Determines the underlying native HTML `<input>` element's `type`.
   *
   * For more see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/url
   */
  type?: 'text' | 'email' | 'url' | 'tel' | 'search' | 'password'

  /**
   * The id of the text input. One is generated if not supplied.
   */
  id?: string

  /**
   * the selected value (must be accompanied by an `onChange` prop)
   */
  value?: string // TODO: controllable(PropTypes.string)

  /**
   * value to set on initial render
   */
  defaultValue?: string

  /**
   * Specifies if interaction with the input is enabled, disabled, or readonly.
   * When "disabled", the input changes visibly to indicate that it cannot
   * receive user interactions. When "readonly" the input still cannot receive
   * user interactions but it keeps the same styles as if it were enabled.
   */
  interaction?: InteractionType

  /**
   * Array of objects with shape: `{
   *   text: React.ReactNode,
   *   type: One of ['error', 'hint', 'success', 'screenreader-only']
   * }`
   */
  messages?: FormMessage[]

  /**
   * The size of the text input.
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * The text alignment of the input.
   */
  textAlign?: 'start' | 'center'

  /**
   * The width of the input.
   */
  width?: string

  /**
   * The width of the input (integer value 0 or higher), if a width is not explicitly
   * provided via the `width` prop.
   *
   * Only applicable if `display="inline-block"`.
   *
   * For more see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/size
   */
  htmlSize?: number

  /**
   * The display of the root element.
   */
  display?: 'inline-block' | 'block'

  /**
   * Prevents the default behavior of wrapping the input and rendered content
   * when available space is exceeded.
   */
  shouldNotWrap?: boolean

  /**
   * Html placeholder text to display when the input has no value. This should be hint text, not a label replacement.
   */
  placeholder?: string

  /**
   * Whether or not the text input is required.
   */
  isRequired?: boolean

  /**
   * provides a reference to the underlying html root element
   */
  elementRef?: (element: Element | null) => void

  /**
   * a function that provides a reference to the actual input element
   */
  inputRef?: (inputElement: HTMLInputElement | null) => void

  /**
   * a function that provides a reference a parent of the input element
   */
  inputContainerRef?: (element: HTMLSpanElement | null) => void

  /**
   * Content to display before the input text, such as an icon
   */
  renderBeforeInput?: React.ReactNode | (() => React.ReactNode)

  /**
   * Content to display after the input text, such as an icon
   */
  renderAfterInput?: React.ReactNode | (() => React.ReactNode)

  /**
   * Callback executed when the input fires a change event.
   * @param {Object} event - the event object
   * @param {string} value - the string value of the input
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void

  /**
   * Callback fired when input loses focus.
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void

  /**
   * Callback fired when input receives focus.
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
}

type PropKeys = keyof TextInputOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TextInputProps = TextInputOwnProps &
  WithStyleProps<TextInputTheme, TextInputStyle> &
  OtherHTMLAttributes<
    TextInputOwnProps,
    InputHTMLAttributes<TextInputOwnProps>
  > &
  // The component will handle pass this prop to FormField, but it shouldn't be
  // listed as a prop
  Pick<FormFieldProps, 'layout'> &
  WithDeterministicIdProps

type TextInputStyle = ComponentStyle<
  | 'textInput'
  | 'facade'
  | 'layout'
  | 'beforeElement'
  | 'innerWrapper'
  | 'inputLayout'
  | 'afterElement'
>

const propTypes: PropValidators<PropKeys> = {
  renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  type: PropTypes.oneOf(['text', 'email', 'url', 'tel', 'search', 'password']),
  id: PropTypes.string,
  value: controllable(PropTypes.string),
  defaultValue: PropTypes.string,
  interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
  messages: PropTypes.arrayOf(FormPropTypes.message),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  textAlign: PropTypes.oneOf(['start', 'center']),
  width: PropTypes.string,
  htmlSize: PropTypes.number,
  display: PropTypes.oneOf(['inline-block', 'block']),
  shouldNotWrap: PropTypes.bool,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  elementRef: PropTypes.func,
  inputRef: PropTypes.func,
  inputContainerRef: PropTypes.func,
  renderBeforeInput: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  renderAfterInput: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
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
  'elementRef',
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
  beforeElementHasWidth?: boolean
  afterElementHasWidth?: boolean
}

type TextInputStyleProps = {
  disabled: boolean
  invalid: boolean
  focused: TextInputState['hasFocus']
  beforeElementHasWidth: TextInputState['beforeElementHasWidth']
  afterElementHasWidth: TextInputState['afterElementHasWidth']
}

export type {
  TextInputProps,
  TextInputState,
  TextInputStyleProps,
  TextInputStyle
}
export { propTypes, allowedProps }
