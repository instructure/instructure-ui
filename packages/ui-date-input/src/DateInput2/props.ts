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
import type { FormMessage } from '@instructure/ui-form-field'
import type {
  Renderable,
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import React, { InputHTMLAttributes, SyntheticEvent } from 'react'

type DateInputOwnProps = {
  /**
   * Specifies the input label.
   */
  renderLabel: Renderable
  /**
   * Specifies the input value.
   */
  value?: string // TODO: controllable(PropTypes.string)
  /**
   * Specifies the input size.
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Html placeholder text to display when the input has no value. This should
   * be hint text, not a label replacement.
   */
  placeholder?: string
  /**
   * Callback executed when the input fires a change event.
   * @param {Object} event - the event object
   * @param {Object} data - additional data
   * @param data.value - the new value
   */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: { value: string }
  ) => void
  /**
   * Callback executed when the input fires a blur event.
   */
  onBlur?: (event: React.SyntheticEvent) => void
  /**
   * Specifies if interaction with the input is enabled, disabled, or readonly.
   * When "disabled", the input changes visibly to indicate that it cannot
   * receive user interactions. When "readonly" the input still cannot receive
   * user interactions but it keeps the same styles as if it were enabled.
   */
  interaction?: 'enabled' | 'disabled' | 'readonly'
  /**
   * Specifies if the input is required.
   */
  isRequired?: boolean
  /**
   * Controls whether the input is rendered inline with other elements or if it
   * is rendered as a block level element.
   */
  isInline?: boolean
  /**
   * Additional helpful text to provide to screen readers about the operation
   * of the component.
   */
  assistiveText?: string
  /**
   * Controls the layout. When set to `stacked`, the label rests on top of the
   * input. When set to `inline` the label is next to the input.
   */
  layout?: 'stacked' | 'inline'
  /**
   * Specifies the width of the input.
   */
  width?: string
  /**
   * Specifies the display property of the container.
   */
  display?: 'inline-block' | 'block'
  /**
   * Provides a ref to the underlying input element.
   */
  inputRef?: (element: HTMLInputElement | null) => void
  /**
   * Displays messages and validation for the input. It should be an object
   * with the following shape:
   * `{
   *   text: PropTypes.node,
   *   type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
   * }`
   */
  messages?: FormMessage[]
  /**
   * Callback fired requesting the calendar be shown.
   */
  onRequestShowCalendar?: (event: SyntheticEvent) => void
  /**
   * Callback fired requesting the calendar be hidden.
   */
  onRequestHideCalendar?: (event: SyntheticEvent) => void
  /**
   * ISO date string for the current date if necessary. Defaults to the current
   * date in the user's timezone.
   */
  currentDate?: string
  /**
   * The message shown to the user when the data is invalid.
   * If a string, shown to the user anytime the input is invalid.
   *
   * If a function, receives a single parameter:
   * - *rawDateValue*: the string entered as a date by the user.
   **/
  invalidDateErrorMessage?: string | ((rawDateValue: string) => FormMessage)
  /**
   * A standard language identifier.
   *
   * See [Moment.js](https://momentjs.com/timezone/docs/#/using-timezones/parsing-in-zone/) for
   * more details.
   *
   * This property can also be set via a context property and if both are set
   * then the component property takes precedence over the context property.
   *
   * The web browser's locale will be used if no value is set via a component
   * property or a context property.
   **/
  locale?: string
  /**
   * A timezone identifier in the format: *Area/Location*
   *
   * See [List of tz database time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) for the list
   * of possible options.
   *
   * This property can also be set via a context property and if both are set
   * then the component property takes precedence over the context property.
   *
   * The web browser's timezone will be used if no value is set via a component
   * property or a context property.
   **/
  timezone?: string

  /**
   * If set, years can be picked from a dropdown.
   * It accepts an object.
   * screenReaderLabel: string // e.g.: i18n("pick a year")
   *
   * onRequestYearChange?:(e: React.MouseEvent,requestedYear: number): void // if set, on year change, only this will be called and no internal change will take place
   *
   * startYear: number // e.g.: 2001, sets the start year of the selectable list
   *
   * endYear: number // e.g.: 2030, sets the end year of the selectable list
   */
  withYearPicker?: {
    screenReaderLabel: string
    onRequestYearChange?: (e: any, requestedYear: number) => void
    startYear: number
    endYear: number
  }
}

type PropKeys = keyof DateInputOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type DateInputProps = DateInputOwnProps &
  WithStyleProps<null, DateInputStyle> &
  OtherHTMLAttributes<
    DateInputOwnProps,
    InputHTMLAttributes<DateInputOwnProps & Element>
  >

type DateInputStyle = ComponentStyle<'dateInput' | 'assistiveText'>

const propTypes: PropValidators<PropKeys> = {
  renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  value: controllable(PropTypes.string),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
  isRequired: PropTypes.bool,
  isInline: PropTypes.bool,
  assistiveText: PropTypes.string,
  layout: PropTypes.oneOf(['stacked', 'inline']),
  width: PropTypes.string,
  display: PropTypes.oneOf(['inline-block', 'block']),
  inputRef: PropTypes.func,
  messages: PropTypes.arrayOf(FormPropTypes.message),
  onRequestShowCalendar: PropTypes.func,
  onRequestHideCalendar: PropTypes.func,
  currentDate: PropTypes.string,
  invalidDateErrorMessage: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string
  ]),
  locale: PropTypes.string,
  timezone: PropTypes.string,
  withYearPicker: PropTypes.object
}

const allowedProps: AllowedPropKeys = [
  'renderLabel',
  'value',
  'size',
  'placeholder',
  'onChange',
  'onBlur',
  'interaction',
  'isRequired',
  'isInline',
  'assistiveText',
  'layout',
  'width',
  'display',
  'inputRef',
  'messages',
  'onRequestShowCalendar',
  'onRequestHideCalendar',
  'currentDate',
  'invalidDateErrorMessage',
  'locale',
  'timezone'
]

export type { DateInputProps, DateInputStyle }
export { propTypes, allowedProps }
