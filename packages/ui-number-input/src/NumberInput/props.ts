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

import { FormPropTypes } from '@instructure/ui-form-field'

import type {
  PropValidators,
  NumberInputTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type { FormMessage } from '@instructure/ui-form-field'
import type { InteractionType } from '@instructure/ui-react-utils'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import { InputHTMLAttributes } from 'react'

type NumberInputOwnProps = {
  renderLabel: React.ReactNode | ((...args: any[]) => any)
  id?: string
  interaction?: InteractionType
  messages?: FormMessage[]
  placeholder?: string
  isRequired?: boolean
  showArrows?: boolean
  size?: 'medium' | 'large'
  value?: string | number
  width?: string
  display?: 'inline-block' | 'block'
  inputRef?: (...args: any[]) => any
  onFocus?: (...args: any[]) => any
  onBlur?: (...args: any[]) => any
  onChange?: (...args: any[]) => any
  onDecrement?: (...args: any[]) => any
  onIncrement?: (...args: any[]) => any
  onKeyDown?: (...args: any[]) => any
  inputMode?: 'numeric' | 'decimal' | 'tel'
}

type NumberInputState = {
  hasFocus: boolean
}

type NumberInputStyleProps = NumberInputState & {
  interaction: InteractionType
  invalid: boolean
}

type PropKeys = keyof NumberInputOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type NumberInputProps = NumberInputOwnProps &
  WithStyleProps<NumberInputTheme, NumberInputStyle> &
  OtherHTMLAttributes<
    NumberInputOwnProps,
    InputHTMLAttributes<NumberInputOwnProps>
  >

type NumberInputStyle = ComponentStyle<
  | 'numberInput'
  | 'arrowContainer'
  | 'arrow'
  | 'inputWidth'
  | 'inputContainer'
  | 'input'
>

const propTypes: PropValidators<PropKeys> = {
  /**
   * The form field label.
   */
  renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  /**
   * The id of the input. One is generated if not supplied.
   */
  id: PropTypes.string,
  /**
   * Specifies if interaction with the input is enabled, disabled, or readonly.
   * When "disabled", the input changes visibly to indicate that it cannot
   * receive user interactions. When "readonly" the input still cannot receive
   * user interactions but it keeps the same styles as if it were enabled.
   */
  interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
  /**
   * Object with shape: `{
   *   text: PropTypes.node,
   *   type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
   * }`
   */
  messages: PropTypes.arrayOf(FormPropTypes.message),
  /**
   * Html placeholder text to display when the input has no value. This
   * should be hint text, not a label replacement.
   */
  placeholder: PropTypes.string,
  /**
   * Whether or not the text input is required.
   */
  isRequired: PropTypes.bool,
  /**
   * Whether or not to display the up/down arrow buttons.
   */
  showArrows: PropTypes.bool,
  /**
   * The size of the input.
   */
  size: PropTypes.oneOf(['medium', 'large']),
  /**
   * The value of the input (should be accompanied by an `onChange` prop).
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * The width of the input.
   */
  width: PropTypes.string,
  /**
   * The display of the root element.
   */
  display: PropTypes.oneOf(['inline-block', 'block']),
  /**
   * A function that provides a reference to the actual input element.
   */
  inputRef: PropTypes.func,
  /**
   * Callback fired when input receives focus.
   */
  onFocus: PropTypes.func,
  /**
   * Callback fired when the input loses focus.
   */
  onBlur: PropTypes.func,
  /**
   * Callback executed when the input fires a change event.
   * @param {Object} event - the event object
   * @param {Object} value - the string value of the input
   */
  onChange: PropTypes.func,
  /**
   * Called when the down arrow button is clicked, or the down arrow key is
   * pressed.
   */
  onDecrement: PropTypes.func,
  /**
   * Called when the up arrow button is clicked, or the up arrow key is
   * pressed.
   */
  onIncrement: PropTypes.func,
  /**
   * Callback fired when a key is pressed.
   */
  onKeyDown: PropTypes.func,
  /**
   * The inputMode attribute of the underlying `input` element can be one of ['numeric', 'decimal', 'tel']
   */
  inputMode: PropTypes.oneOf(['numeric', 'decimal', 'tel'])
}

const allowedProps: AllowedPropKeys = [
  'renderLabel',
  'id',
  'interaction',
  'messages',
  'placeholder',
  'isRequired',
  'showArrows',
  'size',
  'value',
  'width',
  'display',
  'inputRef',
  'onFocus',
  'onBlur',
  'onChange',
  'onDecrement',
  'onIncrement',
  'onKeyDown',
  'inputMode'
]

export type {
  NumberInputProps,
  NumberInputState,
  NumberInputStyleProps,
  NumberInputStyle
}
export { propTypes, allowedProps }
