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
import type { InputHTMLAttributes } from 'react'
import type {
  OtherHTMLAttributes,
  
  RadioInputTheme
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'

type RadioInputOwnProps = {
  /**
   * The label displayed next to the checkbox
   */
  label: React.ReactNode
  /**
   * This maps to the low level HTML attribute
   * [with the same name](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#value)
   */
  value?: string | number
  id?: string
  /**
   * The [name](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#defining_a_radio_group)
   * defines which group it belongs to, it's managed by the `RadioInputGroup`
   * this component belongs to.
   *
   * Do not set it manually.
   */
  name?: string
  checked?: boolean
  /**
   * Whether to disable the input
   */
  disabled?: boolean
  /**
   * Works just like disabled but keeps the same styles as if it were active
   */
  readOnly?: boolean
  variant?: 'simple' | 'toggle'
  size?: 'small' | 'medium' | 'large'
  context?: 'success' | 'warning' | 'danger' | 'off'
  inline?: boolean
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
  /**
   * Callback fired when the input fires a change event.
   * event.target.value will contain the new value. It will always be a string.
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * A function that provides a reference to the actual underlying input element
   */
  inputRef?: (inputElement: HTMLInputElement | null) => void
}

type PropKeys = keyof RadioInputOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type RadioInputProps = RadioInputOwnProps &
  WithStyleProps<RadioInputTheme, RadioInputStyle> &
  OtherHTMLAttributes<
    RadioInputOwnProps,
    InputHTMLAttributes<RadioInputOwnProps & Element>
  > &
  WithDeterministicIdProps

type RadioInputStyle = ComponentStyle<
  'radioInput' | 'input' | 'control' | 'facade' | 'label' | 'container'
>

type RadioInputState = {
  checked?: boolean
}
const allowedProps: AllowedPropKeys = [
  'label',
  'value',
  'id',
  'name',
  'checked',
  'disabled',
  'readOnly',
  'variant',
  'size',
  'context',
  'inline',
  'onClick',
  'onChange',
  'inputRef'
]

export type { RadioInputProps, RadioInputState, RadioInputStyle }
export { allowedProps }
