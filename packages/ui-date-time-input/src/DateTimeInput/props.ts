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

import React, { SyntheticEvent } from 'react'
import { FormPropTypes } from '@instructure/ui-form-field'
import type { FormMessage } from '@instructure/ui-form-field'
import type { InteractionType } from '@instructure/ui-react-utils'
import { I18nPropTypes } from '@instructure/ui-i18n'
import type { Moment } from '@instructure/ui-i18n'
import PropTypes from 'prop-types'
import { controllable } from '@instructure/ui-prop-types'
import type { PropValidators, Renderable } from '@instructure/shared-types'

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
   * The screen reader label for the calendar navigation header's prev month
   * button
   */
  prevMonthLabel: string
  /**
   * The screen reader label for the calendar navigation header's next month
   * button
   */
  nextMonthLabel: string
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
   * The format of the date shown in the `DateInput` when a date is selected.
   * Valid formats are compatible with
   * [Moment formats](https://momentjs.com/docs/#/displaying/format/),
   * including localized formats.
   *
   * If omitted, it will use 'LL' which is a localized date with full month,
   * e.g. "August 6, 2014"
   **/
  dateFormat?: string
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
   * This format of the composite date-time when displayed in messages.
   * Valid formats are defined in the
   * [Moment docs](https://momentjs.com/docs/#/displaying/format/)
   **/
  messageFormat?: string
  /**
   * The layout of this component.
   * Vertically stacked, horizontally arranged in 2 columns, or inline (default).
   * See [FormFieldGroup](#FormFieldGroup) for details.
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
  value?: string // TODO: controllable(I18nPropTypes.iso8601, 'onChange')
  /**
   * An ISO 8601 formatted date string to use if `value` isn't provided.
   **/
  defaultValue?: string
  /**
   * An array of labels containing the name of each day of the week. The visible
   * portion of the label should be abbreviated (no longer than three characters).
   * Note that screen readers will read this content preceding each date as the
   * `<Calendar />` is navigated. Consider using
   * [AccessibleContent](#AccessibleContent) with the `alt` prop containing the
   * full day name for assistive technologies and the children containing the
   * abbreviation. ex. `[<AccessibleContent alt="Monday">Mon</AccessibleContent>, ...]`
   *
   * You must render set the starting day of the week to the one specified by
   * the current locale (e.g. Sunday in the US, Monday in Germany),
   * dates are already displayed this way.
   *
   * By default it will render accessible, localized, abbreviated weekdays
   * with week starts according to the current locale.
   */
  renderWeekdayLabels?: (
    | React.ReactNode
    | ((...args: any[]) => React.ReactNode)
  )[]
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
}

type DateTimeInputState = {
  // the time and date currently selected
  iso?: Moment
  // set when the user types text into the DateInput
  dateInputTextChanged: boolean
  // The currently selected dateTime in the calendar. Will be final when
  // the calendar closes.
  calendarSelectedDate?: Moment
  // the date rendered by the opened calendar. Not selected just determines
  // which month/year to show
  renderedDate: Moment
  // The value currently displayed in the dateInput component.
  // Just the date part is visible
  dateInputText: string
  // The value currently displayed in the timeSelect component as ISO datetime
  timeSelectValue?: string
  // The message (success/error) shown below the component
  message?: FormMessage
  // Whether the calendar is open
  isShowingCalendar?: boolean
}

type PropKeys = keyof DateTimeInputProps
type AllowedPropKeys = Readonly<Array<PropKeys>>

const propTypes: PropValidators<PropKeys> = {
  description: PropTypes.node.isRequired,
  dateRenderLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
    .isRequired,
  prevMonthLabel: PropTypes.string.isRequired,
  nextMonthLabel: PropTypes.string.isRequired,
  datePlaceholder: PropTypes.string,
  timePlaceholder: PropTypes.string,
  dateFormat: PropTypes.string,
  interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
  timeRenderLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
    .isRequired,
  timeStep: PropTypes.oneOf([5, 10, 15, 20, 30, 60]),
  timeFormat: PropTypes.string,
  locale: PropTypes.string,
  timezone: PropTypes.string,
  invalidDateTimeMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]).isRequired,
  showMessages: PropTypes.bool,
  messages: PropTypes.arrayOf(FormPropTypes.message),
  messageFormat: PropTypes.string,
  layout: PropTypes.oneOf(['stacked', 'columns', 'inline']),
  rowSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  colSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  value: controllable(I18nPropTypes.iso8601, 'onChange'),
  defaultValue: I18nPropTypes.iso8601,
  renderWeekdayLabels: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.node])
  ),
  isRequired: PropTypes.bool,
  onChange: PropTypes.func,
  dateInputRef: PropTypes.func,
  timeInputRef: PropTypes.func,
  onBlur: PropTypes.func,
  disabledDates: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  disabledDateTimeMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  allowNonStepInput: PropTypes.bool
}

const allowedProps: AllowedPropKeys = [
  'description',
  'dateRenderLabel',
  'prevMonthLabel',
  'nextMonthLabel',
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
  'renderWeekdayLabels',
  'isRequired',
  'onChange',
  'dateInputRef',
  'timeInputRef',
  'onBlur',
  'disabledDates',
  'disabledDateTimeMessage',
  'allowNonStepInput'
]

export type { DateTimeInputProps, DateTimeInputState }
export { propTypes, allowedProps }
