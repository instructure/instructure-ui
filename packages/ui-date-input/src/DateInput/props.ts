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

import {
  controllable,
  Children as ChildrenPropTypes
} from '@instructure/ui-prop-types'
import { FormPropTypes } from '@instructure/ui-form-field'
import { PositionPropTypes } from '@instructure/ui-position'
import { Calendar } from '@instructure/ui-calendar'
import type { CalendarDayProps } from '@instructure/ui-calendar'
import type { FormMessage } from '@instructure/ui-form-field'
import type { PlacementPropValues } from '@instructure/ui-position'
import type {
  Renderable,
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import { InputHTMLAttributes, ReactElement, SyntheticEvent } from 'react'

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
   * The placement of the calendar in relation to the input.
   */
  placement?: PlacementPropValues
  /**
   * Controls whether the calendar is showing.
   */
  isShowingCalendar?: boolean
  /**
   * Callback fired when the input is blurred. Feedback should be provided
   * to the user when this function is called if the selected date or input
   * value is not valid. The component calculates date validity and if it's
   * disabled or nor and passes that information to this callback.
   */
  onRequestValidateDate?: (
    event: SyntheticEvent,
    dateString?: string,
    validation?: FormMessage[]
  ) => void | FormMessage[]
  /**
   * Callback fired requesting the calendar be shown.
   */
  onRequestShowCalendar?: (event: SyntheticEvent) => void
  /**
   * Callback fired requesting the calendar be hidden.
   */
  onRequestHideCalendar?: (event: SyntheticEvent) => void
  /**
   * Callback fired requesting the next day be selected. If no date is currently
   * selected should default to the first day of the currently rendered month.
   */
  onRequestSelectNextDay?: (event: SyntheticEvent) => void
  /**
   * Callback fired requesting the previous day be selected. If no date is currently
   * selected should default to the first day of the currently rendered month.
   */
  onRequestSelectPrevDay?: (event: SyntheticEvent) => void
  /**
   * Callback fired requesting the next month be rendered.
   */
  onRequestRenderNextMonth?: (e: React.MouseEvent) => void
  /**
   * Callback fired requesting the previous month be rendered.
   */
  onRequestRenderPrevMonth?: (e: React.MouseEvent) => void
  /**
   * Content to render in the calendar navigation header. The recommendation is
   * to include the name of the current rendered month along with the year.
   */
  renderNavigationLabel?: React.ReactNode | (() => React.ReactNode)
  /**
   * An array of labels containing the name of each day of the week. The visible
   * portion of the label should be abbreviated (no longer than three characters).
   * Note that screen readers will read this content preceding each date as the
   * `<Calendar />` is navigated. Consider using
   * [AccessibleContent](#AccessibleContent) with the `alt` prop containing the
   * full day name for assistive technologies and the children containing the
   * abbreviation. ex. `[<AccessibleContent alt="Sunday">Sun</AccessibleContent>, ...]`
   */
  renderWeekdayLabels?: (React.ReactNode | (() => React.ReactNode))[]
  /**
   * A button to render in the calendar navigation header. The recommendation is
   * to compose it with the [Button](#Button) component, setting the `variant`
   * prop to `icon`, the `size` prop to `small`, and setting the `icon` prop to
   * [IconArrowOpenEnd](#icons).
   */
  renderNextMonthButton?: Renderable
  /**
   * A button to render in the calendar navigation header. The recommendation is
   * to compose it with the [Button](#Button) component, setting the `variant`
   * prop to `icon`, the `size` prop to `small`, and setting the `icon` prop to
   * [IconArrowOpenStart](#icons).
   */
  renderPrevMonthButton?: Renderable
  /**
   * children of type `<DateInput.Day />` There should be exactly 42 provided (6
   * weeks).
   */
  children?: ReactElement<CalendarDayProps>[] // TODO: oneOf([Calendar.Day])
  /*
   * Specify which date(s) will be shown as disabled in the calendar.
   * You can either supply an array of ISO8601 timeDate strings or
   * a function that will be called for each date shown in the calendar.
   */
  disabledDates?: string[] | ((isoDateToCheck: string) => boolean)
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
   * Error message shown to the user if they enter a date that is disabled.
   * If not specified the component will show the `invalidDateTimeMessage`.
   */
  disabledDateErrorMessage?: string | ((rawDateValue: string) => FormMessage)
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
  placement: PositionPropTypes.placement,
  isShowingCalendar: PropTypes.bool,
  onRequestValidateDate: PropTypes.func,
  onRequestShowCalendar: PropTypes.func,
  onRequestHideCalendar: PropTypes.func,
  onRequestSelectNextDay: PropTypes.func,
  onRequestSelectPrevDay: PropTypes.func,
  onRequestRenderNextMonth: PropTypes.func,
  onRequestRenderPrevMonth: PropTypes.func,
  renderNavigationLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  renderWeekdayLabels: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.node])
  ),
  renderNextMonthButton: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  renderPrevMonthButton: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  children: ChildrenPropTypes.oneOf([Calendar.Day]),
  disabledDates: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  currentDate: PropTypes.string,
  disabledDateErrorMessage: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string
  ]),
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
  'placement',
  'isShowingCalendar',
  'onRequestValidateDate',
  'onRequestShowCalendar',
  'onRequestHideCalendar',
  'onRequestSelectNextDay',
  'onRequestSelectPrevDay',
  'onRequestRenderNextMonth',
  'onRequestRenderPrevMonth',
  'renderNavigationLabel',
  'renderWeekdayLabels',
  'renderNextMonthButton',
  'renderPrevMonthButton',
  'children',
  'disabledDates',
  'currentDate',
  'disabledDateErrorMessage',
  'invalidDateErrorMessage',
  'locale',
  'timezone'
]

type DateInputState = {
  hasInputRef: boolean
  isShowingCalendar: boolean
  validatedDate?: string
  messages: FormMessage[]
}

export type { DateInputProps, DateInputStyle, DateInputState }
export { propTypes, allowedProps }
