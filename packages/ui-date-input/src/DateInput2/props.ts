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


import type { SyntheticEvent, InputHTMLAttributes } from 'react'
import type { FormMessage } from '@instructure/ui-form-field'
import type {
  OtherHTMLAttributes,
  Renderable
} from '@instructure/shared-types'
import type { Spacing } from '@instructure/emotion'

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
  value?: string
  /**
   * Placeholder text for the input field. If it's left undefined it will display a hint for the date format (like `DD/MM/YYYY`).
   */
  placeholder?: string
  /**
   * Callback fired when the input changes.
   */
  onChange?: (
    event: React.SyntheticEvent,
    inputValue: string,
    utcDateString: string
  ) => void
  /**
   * Callback executed when the input fires a blur event.
   */
  onBlur?: (
    event: React.SyntheticEvent,
    value: string,
    utcDateString: string
  ) => void
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
   * The system timezone will be used if no value is set via a component
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
   * By default the date format is determined by the locale but can be changed via this prop to an alternate locale (passing it in as a string) or a custom parser and formatter (both as functions)
   */
  dateFormat?:
    | {
        parser: (input: string) => Date | null
        formatter: (date: Date) => string
      }
    | string

  /**
   * Callback executed when the input fires a blur event or a date is selected from the picker.
   */
  onRequestValidateDate?: (
    event: React.SyntheticEvent,
    value: string,
    utcDateString: string
  ) => void

  /**
   * Custom icon for the icon button opening the picker.
   */
  renderCalendarIcon?: Renderable

  /**
   * Margin around the component. Accepts a `Spacing` token. See token values and example usage in [this guide](https://instructure.design/#layout-spacing).
   */
  margin?: Spacing
  /*
   * Specify which date(s) will be shown as disabled in the calendar.
   * You can either supply an array of ISO8601 timeDate strings or
   * a function that will be called for each date shown in the calendar.
   */
  disabledDates?: string[] | ((isoDateToCheck: string) => boolean)

  /**
   * A function that provides a reference to the inner input element
   */
  inputRef?: (inputElement: HTMLInputElement | null) => void
}

type DateInput2Props = DateInput2OwnProps &
  OtherHTMLAttributes<
    DateInput2OwnProps,
    InputHTMLAttributes<DateInput2OwnProps & Element>
  >
export type { DateInput2Props }
