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
import type { SyntheticEvent, InputHTMLAttributes } from 'react'

import { controllable } from '@instructure/ui-prop-types'
import { FormPropTypes } from '@instructure/ui-form-field'
import type { FormMessage } from '@instructure/ui-form-field'
import type {
  OtherHTMLAttributes,
  Renderable,
  PropValidators
} from '@instructure/shared-types'

type DateInput2OwnProps = {
  /**
   * Specifies the input label.
   */
  renderLabel: Renderable
  screenReaderLabels: {
    calendarIcon: string
    prevMonthButton: string
    nextMonthButton: string
  }
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
   * Callback fired when the input changes.
   */
  onChange?: (
    event: React.SyntheticEvent,
    inputValue: string,
    dateString: string
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
   * Specifies the width of the input.
   */
  width?: string
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
   * Callback fired when the input is blurred. Feedback should be provided
   * to the user when this function is called if the selected date or input
   * value is invalid. The component has an internal check whether the date can
   * be parsed to a valid date.
   */
  onRequestValidateDate?: (
    value?: string,
    internalValidationPassed?: boolean
  ) => void | FormMessage[]
  /**
   * The message shown to the user when the date is invalid. If this prop is not set, validation is bypassed.
   * If it's set to an empty string, validation happens and the input border changes to red if validation hasn't passed.
   **/
  invalidDateErrorMessage?: string
  /**
   * A standard language identifier.
   *
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#locales) for
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
    onRequestYearChange?: (e: SyntheticEvent, requestedYear: number) => void
    startYear: number
    endYear: number
  }

  /**
   * Formatting function for how the date should be displayed inside the input field. It will be applied if the user clicks on a date in the date picker of after blur event from the input field.
   */
  formatDate?: (isoDate: string, locale: string, timezone: string) => string

  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  // margin?: Spacing TODO enable this prop
}

type PropKeys = keyof DateInput2OwnProps

type DateInput2Props = DateInput2OwnProps &
  OtherHTMLAttributes<
    DateInput2OwnProps,
    InputHTMLAttributes<DateInput2OwnProps & Element>
  >

const propTypes: PropValidators<PropKeys> = {
  renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  screenReaderLabels: PropTypes.object.isRequired,
  value: controllable(PropTypes.string),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
  isRequired: PropTypes.bool,
  isInline: PropTypes.bool,
  width: PropTypes.string,
  messages: PropTypes.arrayOf(FormPropTypes.message),
  onRequestShowCalendar: PropTypes.func,
  onRequestHideCalendar: PropTypes.func,
  onRequestValidateDate: PropTypes.func,
  invalidDateErrorMessage: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string
  ]),
  locale: PropTypes.string,
  timezone: PropTypes.string,
  withYearPicker: PropTypes.object,
  formatDate: PropTypes.func
}

export type { DateInput2Props }
export { propTypes }
