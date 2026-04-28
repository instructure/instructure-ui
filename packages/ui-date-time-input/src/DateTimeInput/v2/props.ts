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

import { SyntheticEvent } from 'react'
import type { FormMessage } from '@instructure/ui-form-field/latest'
import type { InteractionType } from '@instructure/ui-react-utils'
import type { Renderable } from '@instructure/shared-types'

type DateTimeInputProps = {
  /**
   * The label over the composite `DateTimeInput` component
   **/
  description: React.ReactNode
  /**
   * The label over the DateInput
   **/
  dateRenderLabel: Renderable
  /**
   * Accessible labels for the calendar icon button, month navigation buttons, and date picker dialog.
   */
  screenReaderLabels: {
    calendarIcon: string
    prevMonthButton: string
    nextMonthButton: string
    datePickerDialog?: string
  }
  /**
   * HTML placeholder text to display when the date input has no value.
   * This should be hint text, not a label replacement.
   **/
  datePlaceholder?: string

  /**
   * HTML placeholder text to display when the time input has no value.
   * This should be hint text, not a label replacement.
   **/
  timePlaceholder?: string
  /**
   * Controls how the date is displayed in the input and parsed when the user types.
   * When omitted, the locale determines the format.
   * Pass a locale string (e.g. `"en-US"`) to use an alternate locale's format,
   * or pass `{ parser, formatter }` functions for fully custom behaviour.
   **/
  dateFormat?:
    | {
        parser: (input: string) => Date | null
        formatter: (date: Date) => string
      }
    | string
  /**
   * The label over the time input
   **/
  timeRenderLabel: Renderable
  /**
   * The number of minutes to increment by when generating the allowable time options.
   */
  timeStep?: 5 | 10 | 15 | 20 | 30 | 60
  /**
   * The format of the time shown in the `TimeSelect` when a time is selected.
   * Valid formats are compatible with
   * [Moment formats](https://momentjs.com/docs/#/displaying/format/),
   * including localized formats.
   *
   * If omitted, defers to the underlying `TimeSelect`'s default.
   **/
  timeFormat?: string
  /**
   * A standard language identifier (BCP 47, e.g. `"en-US"`, `"fr"`).
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
   * The message shown to the user when the data is invalid.
   * If a string, shown to the user anytime the input is invalid.
   *
   * If a function, receives a single parameter:
   * - *rawDateValue*: the string entered as a date by the user.
   *
   * Currently, times must be selected from a list, it can never be incorrect,
   * Though `invalidDateTimeMessage()` will be called if the user selects a time without
   * setting the date.
   **/
  invalidDateTimeMessage: string | ((rawDateValue: string) => string)
  /**
   * Toggles whether to show built-in messages (the date/time, or the
   * `invalidDateTimeMessage`). Even when set to `false` the component will
   * show user supplied messages by the `messages` prop.
   * @default true
   */
  showMessages?: boolean
  /**
   * Extra message(s) to be displayed.
   */
  messages?: FormMessage[]
  /**
   * Formatter used for the success message shown below the inputs.
   * Receives the parsed date plus the active locale and timezone, returns the
   * string to display. Defaults to a long localized weekday + date + time
   * (e.g. `"Monday, May 1, 2017 1:30 PM"` in `en-US`).
   **/
  messageFormat?: (date: Date, locale: string, timezone: string) => string
  /**
   * The layout of this component.
   * Vertically stacked, horizontally arranged in 2 columns, or inline (default).
   * See [FormFieldGroup](FormFieldGroup) for details.
   **/
  layout?: 'stacked' | 'columns' | 'inline'
  /**
   * Controls the spacing between the inputs when they are in a vertical layout.
   **/
  rowSpacing?: 'none' | 'small' | 'medium' | 'large'
  /**
   * Controls the spacing between the inputs when they are in a horizontal layout.
   **/
  colSpacing?: 'none' | 'small' | 'medium' | 'large'
  /**
   * An ISO 8601 formatted date string representing the current date-time
   * (must be accompanied by an onChange prop).
   **/
  value?: string
  /**
   * An ISO 8601 formatted date string to use if `value` isn't provided.
   **/
  defaultValue?: string
  /**
   * If set, years can be picked from a dropdown in the calendar.
   *
   * - `screenReaderLabel`: accessible label for the year picker (e.g. `"Pick a year"`).
   * - `onRequestYearChange`: when provided, only this is called on year change; no internal state change happens.
   * - `startYear` / `endYear`: inclusive bounds of the selectable range.
   */
  withYearPicker?: {
    screenReaderLabel: string
    onRequestYearChange?: (e: SyntheticEvent, requestedYear: number) => void
    startYear: number
    endYear: number
  }
  /**
   * Specifies if the input is required (its passed down to the native DOM
   * elements). If its `true` then an empty input will produce an error message
   * (`invalidDateTimeMessage`)
   */
  isRequired?: boolean
  /**
   * Specifies if interaction with the input is enabled, disabled, or readonly.
   * When "disabled", the input changes visibly to indicate that it cannot
   * receive user interactions. When "readonly" the input still cannot receive
   * user interactions but it keeps the same styles as if it were enabled.
   */
  interaction?: InteractionType
  /**
   * Called when the date-time value has changed.
   * The passed in parameters are:
   * - *event*: The triggering event (which may be from the underlying
   *   `DateInput` or `TimeSelect`)
   * - *isoValue*: The new date value in ISO8601 format, undefined if its invalid
   **/
  onChange?: (event: SyntheticEvent, isoValue?: string) => void
  /**
   * The HTML `input` element where the date is entered.
   **/
  dateInputRef?: (el: HTMLInputElement | null) => void
  /**
   * The HTML `input` element where the time is entered.
   **/
  timeInputRef?: (el: HTMLInputElement | null) => void
  /**
   * onBlur event handler for when focus leaves DateTimeInput.
   * Does not fire when focus moves between DateInput and TimeSelect within the
   * component
   */
  onBlur?: (e: SyntheticEvent) => void
  /*
   * Specify which date(s) will be shown as disabled in the calendar.
   * You can either supply an array of ISO8601 timeDate strings or
   * a function that will be called for each date shown in the calendar.
   */
  disabledDates?: string[] | ((isoDateToCheck: string) => boolean)
  /**
   * Error message shown to the user if they enter a date that is disabled.
   * If not specified the component will show the `invalidDateTimeMessage`.
   */
  disabledDateTimeMessage?: string | ((rawDateValue: string) => string)
  /**
   * Whether to allow the user to enter non-step divisible values in the time
   * input field. Note that even if this is set to false one can enter non-step
   * divisible values programmatically. The user will need to enter the value
   * exactly (except for lower/uppercase) as specified by the `timeFormat` prop
   * for it to be accepted.
   * Default is `undefined` which equals to `false`
   */
  allowNonStepInput?: boolean
  /**
   * The default time to be prefilled if a day is selected. The time input has to be empty for this to be applied.
   * An error is thrown if the time format is not HH:MM.
   */
  initialTimeForNewDate?: string
  /**
   * Used for getting the internal reset function of DateTimeInput. If that
   * function is called, the component will reset to its default inner state.
   * The callback function will be called in componentDidMount
   * NOTE: this won't call onChange, so you have to reset the value manually when calling reset
   */
  reset?: (reset: () => void) => void
}

type DateTimeInputState = {
  // UTC ISO of the currently selected date+time
  iso?: string
  // What's displayed in the date input (formatted date or in-progress raw text)
  dateInputText: string
  // UTC ISO held by the time picker
  timeSelectValue?: string
  // The message (success/error) shown below the component
  message?: FormMessage
}

type PropKeys = keyof DateTimeInputProps
type AllowedPropKeys = Readonly<Array<PropKeys>>

const allowedProps: AllowedPropKeys = [
  'description',
  'dateRenderLabel',
  'screenReaderLabels',
  'datePlaceholder',
  'timePlaceholder',
  'dateFormat',
  'interaction',
  'timeRenderLabel',
  'timeStep',
  'timeFormat',
  'locale',
  'timezone',
  'invalidDateTimeMessage',
  'showMessages',
  'messages',
  'messageFormat',
  'layout',
  'rowSpacing',
  'colSpacing',
  'value',
  'defaultValue',
  'isRequired',
  'onChange',
  'dateInputRef',
  'timeInputRef',
  'onBlur',
  'disabledDates',
  'disabledDateTimeMessage',
  'allowNonStepInput',
  'reset',
  'withYearPicker'
]

export type { DateTimeInputProps, DateTimeInputState }
export { allowedProps }
