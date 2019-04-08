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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'

import { controllable } from '@instructure/ui-prop-types'
import { DateTime, I18nPropTypes, Locale } from '@instructure/ui-i18n'
import { FormPropTypes } from '@instructure/ui-form-field'
import { LayoutPropTypes } from '@instructure/ui-layout'
import { Popover } from '@instructure/ui-overlays'
import { createChainedFunction } from '@instructure/ui-utils'
import { error } from '@instructure/console/macro'
import { isActiveElement } from '@instructure/ui-dom-utils'
import { themeable } from '@instructure/ui-themeable'
import { deprecated, omitProps, pickProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'
import { TextInput } from '@instructure/ui-text-input'

import { DatePicker } from './DatePicker'

import styles from './styles.css'
import theme from './theme'

import { isDayDisabled } from "./utils/dateHelpers"

/**
---
category: components
id: DeprecatedDateInput
---
**/
@testable()
@deprecated('7.0.0', null, 'Use @instructure/ui-date-input instead')
@themeable(theme, styles)
class DateInput extends Component {
  static propTypes = {
    /**
      The label to put on the previous month button of the calendar.
    **/
    previousLabel: PropTypes.string.isRequired,
    /**
      The label to put on the next month button of the calendar.
    **/
    nextLabel: PropTypes.string.isRequired,
    /**
     * The message that's used when the data is invalid.
     */
    invalidDateMessage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]).isRequired,
    /**
     * The message that's used when a date is disabled
     */
    disabledDateMessage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]),
    /**
     * Where the calendar popover should be placed.
     */
    placement: LayoutPropTypes.placement,
    /**
      This display to show in the input when a date is selected.
      Valid formats are compatible with
      [moment.js formats](https://momentjs.com/docs/#/displaying/format/),
      including localized formats.
    **/
    format: PropTypes.string, // display format
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(FormPropTypes.message),
    /**
      A standard language id
    **/
    locale: PropTypes.string,
    /**
      A timezone identifier in the format: Area/Location
    **/
    timezone: PropTypes.string,

    /**
      An ISO 8601 formatted string. The initial date value to display on render.
      It should only be used when using this component as an uncontrolled input.
    **/
    defaultDateValue: I18nPropTypes.iso8601,

    /**
      Called when the date value of the input has changed.
      The parameters are the triggering event, new date value in ISO 8601 format,
      the raw user input, if the conversion from raw to a date was successful, and
      if the selected date is disabled.
    **/
    onDateChange: PropTypes.func,

    /**
    * the selected value (must be accompanied by an `onDateChange` prop)
    */
    dateValue: controllable(I18nPropTypes.iso8601, 'onDateChange', 'defaultDateValue'),

    /**
      Whether to display validation feedback while typing.
    **/
    validationFeedback: PropTypes.bool,

    datePickerRef: PropTypes.func,

    inputRef: PropTypes.func,

    /**
      An ISO 8601 formatted string. Defaults to the current date.
    **/
    todayValue: I18nPropTypes.iso8601,

    size: PropTypes.oneOf(['small', 'medium', 'large']),
    layout: PropTypes.oneOf(['stacked', 'inline']),
    width: PropTypes.string,
    inline: PropTypes.bool,
    /**
    * Html placeholder text to display when the input has no value. This should be hint text, not a label
    * replacement.
    */
    placeholder: PropTypes.string,
    /**
     * Whether or not to disable the input
     */
    disabled: PropTypes.bool,
    /**
     * Works just like disabled but keeps the same styles as if it were active
     */
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    /**
      An array of weekdays that should be unselectable. Each day should be an integer
      corresponding to the day of the week, where 0 = Sunday, 1 = Monday, 2 = Tuesday,
      3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday.
    **/
    disabledDaysOfWeek: PropTypes.array,
    /**
      An array of Date objects that should be unselectable or a callback function
      that gets passed a date and should return a boolean indicating where it is
      unselectable.
    **/
    disabledDays: PropTypes.oneOfType([PropTypes.array, PropTypes.func])
  }

  static defaultProps = {
    disabledDateMessage: undefined,
    placement: 'bottom center',
    messages: [],
    format: 'LL',
    validationFeedback: true,
    onDateChange: (e, isoValue, rawValue, rawConversionFailed, dateIsDisabled) => {},
    datePickerRef: el => {},
    inputRef: el => {},
    invalidDateMessage: (textInputValue) => {},
    required: false,
    inline: false,
    size: 'medium',
    disabled: false,
    readOnly: false,
    layout: 'stacked',
    disabledDaysOfWeek: [],
    disabledDays: [],
    placeholder: undefined,
    width: undefined,
    todayValue: undefined,
    dateValue: undefined,
    defaultDateValue: undefined,
    timezone: undefined,
    locale: undefined
  }

  static contextTypes = {
    locale: PropTypes.string,
    timezone: PropTypes.string
  }

  constructor (props, context) {
    super(props, context)

    const initialDateValue = props.dateValue || props.defaultDateValue || undefined
    const locale = this._locale(props, context)
    const timezone = this._timezone(props, context)
    const parsedDate = this._parseDate(initialDateValue, locale, timezone)

    error(
      (!initialDateValue || parsedDate.isValid()),
      `[DateInput] Unexpected date format received: '${initialDateValue}'.`
    )

    this.state = {
      showCalendar: false,
      ...this.computeState(initialDateValue, parsedDate, props)
    }

    delete this._input
  }

  componentWillReceiveProps (nextProps) {
    const valueChanged = nextProps.dateValue !== this.props.dateValue
      || nextProps.defaultDateValue !== this.props.defaultDateValue
    const isUpdated = valueChanged
      || nextProps.locale !== this.props.locale
      || nextProps.timezone !== this.props.timezone

    if (isUpdated) {
      this.setState((prevState) => {
        const value = valueChanged
          ? (nextProps.dateValue != null ? nextProps.dateValue : (nextProps.defaultDateValue || undefined))
          : prevState.acceptedValue
        const locale = nextProps.locale || this.locale
        const timezone = nextProps.timezone || this.timezone
        const parsedDate = this._parseDate(value, locale, timezone)

        error(!value || parsedDate.isValid(), `[DateInput] Unexpected date format received: '${value}'.`)

        return this.computeState(
          value,
          parsedDate,
          nextProps,
          prevState,
        )
      })
    }
  }

  /**
  * focus the input element
  */
  focus () {
    this._input.focus()
  }

  get hasMessages () {
    return this.messages && (this.messages.length > 0)
  }

  get invalid () {
    return this.messages && this.messages.findIndex((message) => { return message.type === 'error' }) >= 0
  }

  get focused () {
    // either the input has focus, or the calendar is open, in which case
    // it has focus
    return isActiveElement(this._input) || this.state.showCalendar
  }

  get value () {
    return this._input.value
  }

  get calendarSelectedValue () {
    const { acceptedValue } = this.state

    let value = acceptedValue ? this.parseDate(acceptedValue) : undefined

    if (!value || !value.isValid()) {
      value = DateTime.now(this.locale, this.timezone)
    }

    return value.toISOString(true)
  }

  get locale () {
    return this._locale(this.props, this.context)
  }

  get timezone () {
    return this._timezone(this.props, this.context)
  }

  get messages () {
    if (!this.props.validationFeedback || !this.state.textInputValue) {
      return this.props.messages
    }

    const messages = []
    const parsedDate = this.parseDate(this.state.textInputValue)
    const isValid = parsedDate.isValid()

    if (isValid && isDayDisabled(parsedDate, this.props.disabledDaysOfWeek, this.props.disabledDays)) {
      let { disabledDateMessage } = this.props
      if (typeof disabledDateMessage === 'function') {
        disabledDateMessage = disabledDateMessage(this.state.textInputValue)
      }

      messages.push({
        text: disabledDateMessage || `${parsedDate.format(this.props.format)} is disabled`,
        type: 'error'
      })
    } else if (isValid) {
      messages.push({
        text: parsedDate.format(this.props.format),
        type: 'success'
      })
    } else {
      let { invalidDateMessage } = this.props
      if (typeof invalidDateMessage === 'function') {
        invalidDateMessage = invalidDateMessage(this.state.textInputValue)
      }

      messages.push({
        text: invalidDateMessage || parsedDate.format(this.props.format),
        type: 'error'
      })
    }

    return messages.concat(this.props.messages)
  }

  textInputRef = node => {
    this._input = node
    if (node) {
      this.props.inputRef(node)
    }
  }

  handleTextInputChange = event => {
    // because we're controlling the TextInput
    this.setState({ textInputValue: event.target.value, showCalendar: false })
  }

  handleTextInputKeyDown = event => {
    if (event.keyCode === keycode.codes.enter) {
      event.preventDefault() // prevent form submission
      this.acceptValue(event)
    }
  }

  handleTextInputClick = event => {
    // accept the current value first so the calendar shows the correct selected date
    this.acceptValue(event)
    this.showCalendar()
  }

  handleTextInputBlur = event => {
    // when focus leaves the textInput field, replace its text with the properly formatted
    // string for the date. This is handy because once the user types "Nov", we will parse that
    // into November 1st of the current year.
    this.acceptValue(event)
  }

  handleCalendarSelect = (event, newValue) => {
    const parsedDate = this.parseDate(newValue)

    error(parsedDate.isValid(), `[DateInput] Unexpected date format received from DatePicker: '${newValue}'.`)

    this.acceptValue(event, newValue)

    if (parsedDate.isValid()) {
      this.hideCalendar()
    }
  }

  handleCalendarDismiss = () => {
    this.hideCalendar()
  }

  toggleCalendar (showCalendar) {
    this.setState({ showCalendar })
  }

  showCalendar () {
    this.toggleCalendar(true)
  }

  hideCalendar () {
    this.toggleCalendar(false)
  }

  acceptValue (event, dateStr) {
    const rawAcceptedValue = dateStr || event.target.value

    this.setState((state, props) => {
      const parsedDate = this.parseDate(rawAcceptedValue)
        .hour(state.hour)
        .minute(state.minute)
        .second(state.second)
        .millisecond(state.millisecond)

      const newState = this.computeState(rawAcceptedValue, parsedDate, props, state)
      const acceptedValueChanged = newState.acceptedValue !== state.acceptedValue
      const validOrEmptyChanged = newState.isValidOrEmpty !== state.isValidOrEmpty
      const dateIsDisabled = parsedDate.isValid() ? isDayDisabled(parsedDate, this.props.disabledDaysOfWeek, this.props.disabledDays) : false

      if ((acceptedValueChanged || validOrEmptyChanged) && (typeof this.props.onDateChange === 'function')) {
        this.props.onDateChange(
          event,
          // since the API here is ISO dates in, we should pass an ISO date back in the handler
          newState.acceptedValue,
          newState.textInputValue,
          !newState.isValidOrEmpty,
          dateIsDisabled
        )
      }

      return newState
    })
  }

  _parseDate (dateStr, locale, timezone) {
    return DateTime.parse(dateStr, locale, timezone)
  }

  _timezone (props, context) {
    return props.timezone || context.timezone || DateTime.browserTimeZone()
  }

  _locale (props, context) {
    return props.locale || context.locale || Locale.browserLocale()
  }

  parseDate (dateStr) {
    return this._parseDate(dateStr, this.locale, this.timezone)
  }

  computeState (rawValue, parsedDate, props, state) {
    if (parsedDate.isValid()) {
      return {
        isValidOrEmpty: true,
        acceptedValue: parsedDate.toISOString(true),
        textInputValue: parsedDate.format(props.format),
        hour: parsedDate.hour(),
        minute: parsedDate.minute(),
        second: parsedDate.second(),
        millisecond: parsedDate.millisecond()
      }
    } else {
      let textInputValue = state ? state.textInputValue : ''

      if(rawValue === '') {
        textInputValue = ''
      }

      return {
        isValidOrEmpty: !rawValue,
        acceptedValue: undefined,
        textInputValue: textInputValue || '',
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      }
    }
  }

  render () {
    const ignoredProps = [
      'type',
      'messages',
      'defaultValue',
      'value'
    ]
    const textInputProps = pickProps(this.props, omitProps(TextInput.propTypes, {}, ignoredProps))
    const { onChange, onKeyDown, onClick, onBlur } = this.props // eslint-disable-line react/prop-types

    return (
      <span>
        <TextInput
          {...textInputProps}
          value={this.state.textInputValue}
          messages={this.messages}
          onChange={createChainedFunction(onChange, this.handleTextInputChange)}
          onKeyDown={createChainedFunction(onKeyDown, this.handleTextInputKeyDown)}
          onClick={createChainedFunction(onClick, this.handleTextInputClick)}
          onBlur={createChainedFunction(onBlur, this.handleTextInputBlur)}
          inputRef={this.textInputRef}
        />
        <Popover
          placement={this.props.placement}
          show={this.state.showCalendar}
          onDismiss={this.handleCalendarDismiss}
          positionTarget={this._input}
        >
          <Popover.Content>
            <DatePicker
              todayValue={this.props.todayValue}
              previousLabel={this.props.previousLabel}
              nextLabel={this.props.nextLabel}
              selectedValue={this.calendarSelectedValue}
              locale={this.locale}
              timezone={this.timezone}
              onSelectedChange={this.handleCalendarSelect}
              disabledDaysOfWeek={this.props.disabledDaysOfWeek}
              disabledDays={this.props.disabledDays}
              ref={this.props.datePickerRef}
            />
          </Popover.Content>
        </Popover>
      </span>
    )
  }
}

export default DateInput
export { DateInput, DatePicker }
