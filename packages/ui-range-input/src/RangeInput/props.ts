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
import { deprecated } from '@instructure/ui-react-utils'
import { FormPropTypes } from '@instructure/ui-form-field'

import type {
  OtherHTMLAttributes,
  PropValidators,
  RangeInputTheme,
  PickPropsWithExceptions
} from '@instructure/shared-types'
import type { FormFieldOwnProps, FormMessage } from '@instructure/ui-form-field'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
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
   * The "default" variant has an outer shadow on focus.
   * The "accessible" variant has better color contrast, border and inset focus ring for better accessibility.
   */
  thumbVariant?:
    | 'deprecated' // TODO: deprecated, remove in V9.
    | 'accessible'
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

const propTypes: PropValidators<PropKeys> = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  defaultValue: PropTypes.number,
  value: controllable(PropTypes.number),
  onChange: PropTypes.func,
  messages: PropTypes.arrayOf(FormPropTypes.message),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  layout: PropTypes.oneOf(['stacked', 'inline']),
  id: PropTypes.string,
  label: PropTypes.node.isRequired,
  displayValue: PropTypes.bool,
  step: PropTypes.number,
  formatValue: PropTypes.func,
  inline: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  thumbVariant: deprecated.deprecatePropValues(
    PropTypes.oneOf(['deprecated', 'accessible']),
    ['deprecated'],
    'The `deprecated` variant is not fully accessible and will be removed in V9. The connected theme variables will be removed as well: `handleShadowColor`, `handleFocusOutlineColor`, `handleFocusOutlineWidth`. Please use the `accessible` variant.'
  )
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
  'thumbVariant'
]

export type { RangeInputProps, RangeInputState, RangeInputStyle }
export { propTypes, allowedProps }
