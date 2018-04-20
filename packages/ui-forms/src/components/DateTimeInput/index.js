/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 - present Instructure, Inc.
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

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import I18nPropTypes from '@instructure/ui-i18n/lib/utils/I18nPropTypes'
import FormPropTypes from '../../utils/FormPropTypes'
import warning from '@instructure/ui-utils/lib/warning'
import DateTime from '@instructure/ui-i18n/lib/DateTime'
import Locale from '@instructure/ui-i18n/lib/Locale'

import DateInput from '../DateInput/index'
import TimeInput from '../TimeInput/index'
import FormFieldGroup from '../FormFieldGroup/index'

/**
---
category: components/forms
---
**/
class DateTimeInput extends Component {
  static propTypes = {
    /**
    * The label over the composite `DateTimeInput` component
    **/
    description: PropTypes.node.isRequired,
    /**
    * The label over the Date Input
    **/
    dateLabel: PropTypes.string.isRequired,
    /**
    * The label to put on the previous month button of the calendar.
    **/
    datePreviousLabel: PropTypes.string.isRequired,
    /**
    * The label to put on the next month button of the calendar.
    **/
    dateNextLabel: PropTypes.string.isRequired,
    /**
    * HTML placeholder text to display when the date input has no value.
    * This should be hint text, not a label replacement.
    **/
    datePlaceholder: PropTypes.string,
    /**
    * The format of the date shown in the `DateInput` when a date is selected.
    * Valid formats are compatible with
    * [moment.js formats](https://momentjs.com/docs/#/displaying/format/),
    * including localized formats.
    *
    * If omitted, deferrs to the underlying `DateInput`'s default.
    **/
    dateFormat: PropTypes.string,
    /**
    * The label over the time input
    **/
    timeLabel: PropTypes.string.isRequired,
    /**
     * The number of minutes to increment by when generating the allowable time options.
     */
    timeStep: PropTypes.oneOf([5, 10, 15, 20, 30, 60]),
    /**
    * The format of the time shown in the `TimeInput` when a time is selected.
    * Valid formats are compatible with
    * [moment.js formats](https://momentjs.com/docs/#/displaying/format/),
    * including localized formats.
    *
    * If omitted, deferrs to the underlying `TimeInput`'s default.
    **/
    timeFormat: PropTypes.string,
    /**
    * A standard language identifier.
    *
    * See [moment.js i18n](https://momentjs.com/docs/#/i18n/) for more details.
    *
    * This property can also be set via a context property and if both are set then the component property takes
    * precedence over the context property.
    *
    * The web browser's locale will be used if no value is set via a component property or a context
    * property.
    **/
    locale: PropTypes.string,
    /**
    * A timezone identifier in the format: Area/Location
    *
    * See [List of tz database time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) for the list
    * of possible options.
    *
    * This property can also be set via a context property and if both are set then the component property takes
    * precedence over the context property.
    *
    * The web browser's timezone will be used if no value is set via a component property or a context
    * property.
    **/
    timezone: PropTypes.string,
    /**
    * The message shown to the user when the data is invalid.
    * If a string, shown to the user anytime the input is invalid.
    *
    * If a function, receives 2 parameters:
    *  *rawDateValue*: the string entered as a date by the user,
    *  *rawTimeValue*: the string entered as a time by the user.
    *
    * Currently, times must be selected from a list, it can never be incorrect,
    * Though `invalidDateTimeMessage` will be called if the user selects a time without
    * setting the date.
    *
    * Either parameter is undefined if the user has not entered anything,
    * which you can use to test for no input if the `DateTimeInput` is required.
    **/
    invalidDateTimeMessage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]).isRequired,
    /**
    * Messages my parent would like displayed
    * object with shape: `{
    *   text: PropTypes.string,
    *   type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *  }
    */
    messages: PropTypes.arrayOf(FormPropTypes.message),
    /**
    * This format of the composite date-time when displayed in messages.
    * Valid formats are compatible with
    * [moment.js formats](https://momentjs.com/docs/#/displaying/format/),
    * including localized formats.
    **/
    messageFormat: PropTypes.string,
    /**
    * Vertically stacked, horizontally arranged in 2 columns, or inline.
    * See [FormFieldGroup](#FormFieldGroup) for details.
    **/
    layout: PropTypes.oneOf(['stacked', 'columns', 'inline']),
    /**
    * An ISO 8601 formatted date string representing the current date-time
    * (must be accompanied by an onChange prop).
    **/
    value: CustomPropTypes.controllable(I18nPropTypes.iso8601, 'onChange'),
    /**
    * An ISO 8601 formatted date string to use if `value` isn't provided.
    **/
    defaultValue: I18nPropTypes.iso8601,
    required: PropTypes.bool,
    /**
     * Whether or not to disable the inputs
     */
    disabled: PropTypes.bool,
    /**
     * Works just like disabled but keeps the same styles as if it were active
     */
    readOnly: PropTypes.bool,
    /**
    * Called when the date-time value has changed.
    * The passed in parameters are
    * *event*: the triggering event (which may be from the underlying
    * `DateInput` or `TimeInput`), *isoValue*: the new date value in ISO 8601 format.
    **/
    onChange: PropTypes.func,
    /**
    * The <input> element where the date is entered.
    **/
    dateInputRef: PropTypes.func,
    /**
    * The <input> element where the time is entered.
    **/
    timeInputRef: PropTypes.func,
  }

  static defaultProps = {
    layout: 'inline',
    datePlaceholder: undefined,
    timeStep: 30,
    locale: undefined,
    timezone: '',
    dateFormat: undefined,  // defaults to DateInput's default
    timeFormat: undefined,  // defaults to TimeInput's default
    messageFormat: 'LLL',
    onChange: undefined,
    value: undefined,
    defaultValue: undefined,
    required: false,
    disabled: false,
    readOnly: false,
    dateInputRef: undefined,
    timeInputRef: undefined,
  }

  static contextTypes = {
    locale: PropTypes.string,
    timezone: PropTypes.string
  }

  constructor (props, context) {
    super(props, context)

    let date, time, result
    let messages = []
    let initialValue = props.value || props.defaultValue || undefined
    const locale = props.locale || context.locale || Locale.browserLocale()
    const timezone = props.timezone || context.timezone || DateTime.browserTimeZone()
    if (initialValue) {
      // guarantee the initialValue is in the given timezone
      initialValue = DateTime.toLocaleString(initialValue, locale, timezone); // eslint-disable-line semi
      ({date, time} = this.splitDateAndTime(initialValue));  // eslint-disable-line semi
      ({result, messages} = this.combineDateAndTime(date, time))
    }
    messages = this.mergeMessages(messages, this.props)

    this.state = {
      date, time, result, messages
    }

    this._dateInput = null
    this._timeInput = null
  }

  componentWillReceiveProps (nextProps) {
    warning(
      (nextProps.locale === this.locale || nextProps.timezone === this.timezone),
      'You cannot change the locale or timezone of a DateTimeInput. The new value(s) will be ignored.'
    )

    if (nextProps.value) {
      // guarantee the new datetime remains in the given timezone
      let newValue = DateTime.toLocaleString(nextProps.value, this.locale, this.timezone)
      const {date, time} = this.splitDateAndTime(newValue)
      let {result, messages} = this.combineDateAndTime(date, time)
      messages = this.mergeMessages(messages, nextProps)
      this.setState({date, time, result, messages})
    } else {
      this.setState({messages: this.mergeMessages(this.state.messages, nextProps)})
    }
  }

  mergeMessages (messages, props) {
    return props.messages ? messages.concat(props.messages) : messages
  }
  /**
  * Focus me.
  *
  * When this `DateTimeInput` gets focus, we hand it off to the
  * underlying `DateInput`.
  */
  focus () {
    if (this._dateInput) {
      this._dateInput.focus()
    }
  }

  get focused () {
    return this._dateInput && this._dateInput.focused ||
           this._timeInput && this._timeInput.focused
  }

  get locale () {
    return this.props.locale || this.context.locale || Locale.browserLocale()
  }

  get timezone () {
    return this.props.timezone || this.context.timezone || DateTime.browserTimeZone()
  }

  parseDate (datetime) {
    return DateTime.parse(datetime, this.locale, this.timezone)
  }

  errorMessage (rawDateValue, rawTimeValue) {
    let { invalidDateTimeMessage } = this.props
    if (typeof invalidDateTimeMessage === 'function') {
      invalidDateTimeMessage = invalidDateTimeMessage(rawDateValue, rawTimeValue)
    }
    return invalidDateTimeMessage ? {text: invalidDateTimeMessage, type: 'error'} : undefined
  }

  validMessage(datetime) {
    const parsedDate = this.parseDate(datetime)

    let message = ''
    if (!parsedDate.isValid()) {
      const [d, t] = datetime.split('T')
      message = this.errorMessage(d, t)
    }
    else {
      message = {
        text: parsedDate.format(this.props.messageFormat),
        type: 'success'
      }
    }
    return message
  }

  splitDateAndTime (datetime) {
    if (datetime) {
      const dtarr = datetime.split('T')
      return {
        date: dtarr[0] || undefined,
        time: dtarr[1] || undefined
      }
    }
    return {date: undefined, time: undefined}
  }

  combineDateAndTime (date, time) {
    let retval = {
      result: undefined,
      messages: []
    }
    if (date && time) {
      const datetime = `${date}T${time}`
      retval = {
        result: datetime,
        messages: [this.validMessage(datetime)]
      }
    } else if (date) {  // time will come from the date
      retval = {
        result: date,
        messages: [this.validMessage(date)]
      }
    } else if (this.props.required) {
      retval = {
        result: undefined,
        messages: [this.errorMessage(date, time)]
      }
    }
    // note: no date + a valid time is handled in onTimeChange
    return retval
  }

  fireChange (event) {
    if (this.props.onChange) {
      this.props.onChange(event, this.state.result)
    }
  }

  onDateChange = (event, newISODate, rawValue, isInvalid) => {
    let newD = undefined
    let newT = this.state.time
    let result = undefined
    let messages = []
    if (newISODate) {
      newD = newISODate.replace(/T.*/, '')
      if (!newT) {
        newT = '23:59'  // until a time is given, this is consistent with existing components in canvas.
      }
    }
    if (isInvalid) {
      messages.push(this.errorMessage(rawValue, undefined))
    } else {
      ({result, messages} = this.combineDateAndTime(newD, newT))
    }
    messages = this.mergeMessages(messages, this.props)
    // only fire onChange if the value has actually changed
    const fireChange = result !== this.state.result ? this.fireChange.bind(this, event) : null
    this.setState({date: newD, time: newT, result, messages}, fireChange)
  }

  onTimeChange = (event, timeVal) => {
    let newT = undefined
    let messages = []
    let result = undefined
    if (timeVal && timeVal.value) {
      // put in local time, or it may get the date wrong
      newT = DateTime.parse(timeVal.value, this.locale, this.timezone)
      newT = newT.format().replace(/.*T/, '')
    }
    if (!this.state.date) {
      messages.push(this.errorMessage(undefined, timeVal.label))
    } else {
      ({result, messages} = this.combineDateAndTime(this.state.date, newT))
    }
    messages = this.mergeMessages(messages, this.props)
    // only fire onChange if the value has actually changed
    const fireChange = result !== this.state.result ? this.fireChange.bind(this, event) : null
    this.setState({time: newT, result, messages}, fireChange)
  }

  onInputBlur = (event) => {
    if (this.props.required && !this.state.result) {
      const messages = [this.errorMessage(undefined, this.state.time)]
      this.setState({messages})
    }
  }

  dateInputComponentRef = (node) => {
    this._dateInput = node
  }
  timeInputComponentRef = (node) => {
    this._timeInput = node
  }

  render () {
    const {
      description,
      datePlaceholder, dateLabel, dateNextLabel, datePreviousLabel, dateFormat, dateInputRef,
      timeLabel, timeFormat, timeStep, timeInputRef,
      layout, required, disabled, readOnly
    } = this.props
    const locale = this.locale
    const timezone = this.timezone

    return (
      <FormFieldGroup
        description={description}
        colSpacing="medium"
        rowSpacing="small"
        layout={layout}
        vAlign="top"
        messages={this.state.messages}
      >
        <DateInput
          dateValue={this.state.result}
          inputRef={dateInputRef}
          ref={this.dateInputComponentRef}
          placeholder={datePlaceholder}
          label={dateLabel}
          locale={locale}
          format={dateFormat}
          nextLabel={dateNextLabel}
          onDateChange={this.onDateChange}
          onBlur={this.onInputBlur}
          previousLabel={datePreviousLabel}
          timezone={timezone}
          validationFeedback={false}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
        />
        <TimeInput
          ref={this.timeInputComponentRef}
          label={timeLabel}
          locale={locale}
          format={timeFormat}
          onChange={this.onTimeChange}
          onBlur={this.onInputBlur}
          step={timeStep}
          timezone={timezone}
          value={this.state.result}
          inputRef={timeInputRef}
          disabled={disabled}
          readOnly={readOnly}
        />
      </FormFieldGroup>
    )
  }
}

export default DateTimeInput
