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

import type {
  OtherHTMLAttributes,
  RangeInputTheme,
  PickPropsWithExceptions
} from '@instructure/shared-types'
import type { FormFieldOwnProps, FormMessage } from '@instructure/ui-form-field'
import type {
  WithStyleProps,
  ComponentStyle,
  Spacing
} from '@instructure/emotion'
import type { InputHTMLAttributes } from 'react'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'

type RangeInputOwnProps = {
  min: number

  max: number

  /**
   * value to set on initial render
   */
  defaultValue?: number

  /**
   * the selected value (must be accompanied by an `onChange` prop)
   */
  value?: number // TODO: controllable(PropTypes.number)

  /**
   * when used with the `value` prop, the component will not control its own state
   */
  onChange?: (value: number | string) => void

  /**
   * Margin around the component. Accepts a `Spacing` token. See token values and example usage in [this guide](https://instructure.design/#layout-spacing).
   */
  margin?: Spacing

  messages?: FormMessage[]

  /**
   * The size of the value label
   */
  size?: 'small' | 'medium' | 'large'

  layout?: 'stacked' | 'inline'

  id?: string

  label: React.ReactNode

  /**
   * whether to display the current value
   */
  displayValue?: boolean

  step?: number

  /**
   * A function to format the displayed value
   */
  formatValue?: (value?: number, max?: number) => string

  inline?: boolean

  disabled?: boolean

  readOnly?: boolean

  /**
   * The "deprecated" variant has an outer shadow on focus.
   * The "accessible" variant has better color contrast, border and inset focus ring for better accessibility.
   */
  thumbVariant?:
    | 'deprecated' // TODO: deprecated, remove in V9.
    | 'accessible'

  /**
   * A function that provides a reference to the actual underlying input element
   */
  inputRef?: (inputElement: HTMLInputElement | null) => void
}

type PropKeys = keyof RangeInputOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type RangeInputProps =
  // pickProps passes through FormField.allowedProps, except the ones set manually
  PickPropsWithExceptions<
    FormFieldOwnProps,
    'label' | 'inline' | 'id' | 'elementRef'
  > &
    RangeInputOwnProps &
    WithStyleProps<RangeInputTheme, RangeInputStyle> &
    OtherHTMLAttributes<
      RangeInputOwnProps,
      InputHTMLAttributes<RangeInputOwnProps & Element>
    > &
    WithDeterministicIdProps

type RangeInputStyle = ComponentStyle<
  'rangeInput' | 'rangeInputInput' | 'rangeInputInputValue'
>

type RangeInputState = {
  value?: number | string
}
const allowedProps: AllowedPropKeys = [
  'min',
  'max',
  'defaultValue',
  'value',
  'onChange',
  'messages',
  'size',
  'layout',
  'id',
  'label',
  'displayValue',
  'step',
  'formatValue',
  'inline',
  'disabled',
  'readOnly',
  'thumbVariant',
  'margin',
  'inputRef'
]

export type { RangeInputProps, RangeInputState, RangeInputStyle }
export { allowedProps }
