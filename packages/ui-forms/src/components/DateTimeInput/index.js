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
import DateTime from '@instructure/ui-i18n/lib/DateTime'
import FormPropTypes from '@instructure/ui-form-field/lib/utils/FormPropTypes'
import I18nPropTypes from '@instructure/ui-i18n/lib/utils/I18nPropTypes'
import Locale from '@instructure/ui-i18n/lib/Locale'
import FormFieldGroup from '@instructure/ui-form-field/lib/components/FormFieldGroup'
import testable from '@instructure/ui-testable'

import DateInput from '../DateInput/index'
import TimeInput from '../TimeInput/index'

/**
---
category: components
---
**/
@testable()
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
    /**
     * onBlur event handler for when focus leaves DateTimeInput.
     * Does not fire when focus moves between DateInput and TimeInput within the component
     */
    onBlur: PropTypes.func,
  }

  static defaultProps = {
    layout: 'inline',
    timeStep: 30,
    messageFormat: 'LLL',
    required: false,
    disabled: false,
    readOnly: false
  }

  static contextTypes = {
    locale: PropTypes.string,
    timezone: PropTypes.string
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      ...this.parseISO(props.value || props.defaultValue),
    }
    this._dateInput = null
    this._timeInput = null
  }

  componentWillReceiveProps (nextProps) {
    const valueChanged = nextProps.value !== this.props.value
      || nextProps.defaultValue !== this.props.defaultValue
    const isUpdated = valueChanged
      || nextProps.locale !== this.props.locale
      || nextProps.timezone !== this.props.timezone

    if (isUpdated) {
      this.setState((prevState) => {
        const iso = valueChanged ? (nextProps.value || nextProps.defaultValue) : prevState.iso

        return {
          ...this.parseISO(iso, nextProps.locale, nextProps.timezone),
        }
      })
    }
  }

  get locale () {
    return this.props.locale || this.context.locale || Locale.browserLocale()
  }

  get timezone () {
    return this.props.timezone || this.context.timezone || DateTime.browserTimeZone()
  }

  getErrorMessage (rawDateValue, rawTimeValue) {
    const { invalidDateTimeMessage } = this.props
    const text = typeof invalidDateTimeMessage === 'function'
      ? invalidDateTimeMessage(rawDateValue, rawTimeValue)
      : invalidDateTimeMessage

    return text ? {text, type: 'error'} : null
  }

  parseISO (iso = '', locale = this.locale, timezone = this.timezone) {
    const parsed = DateTime.parse(iso, locale, timezone)

    if (parsed.isValid()) {
      return {
        iso: parsed.toISOString(true),
        message: {
          type: 'success',
          text: parsed.format(this.props.messageFormat),
        },
      }
    }
    return {
      iso: undefined, // eslint-disable-line no-undefined
      message: iso ? this.getErrorMessage(...iso.split('T')) : null,
    }
  }

  combineDateAndTime (dateISO, timeISO) {
    if (!dateISO) {
      return ''
    }
    if (!timeISO) {
      return dateISO
    }
    const date = dateISO.replace(/T.*/, '')
    const time = timeISO.replace(/.*T/, '')

    return `${date}T${time}`
  }

  handleChange = (e, value) => {
    const {iso, message} = this.parseISO(value)

    if ((iso && iso !== this.state.iso) || !message) {
      if (this.props.onChange) {
        this.props.onChange(e, iso)
      }
      return this.setState({ iso, message })
    }
    return this.setState({ message })
  }

  handleDateChange = (e, isoValue, rawValue, rawConversionFailed, dateIsDisabled) => {
    const date = rawConversionFailed ? rawValue : isoValue
    const value = this.combineDateAndTime(date, this.state.iso)

    this.handleChange(e, value)
  }

  handleTimeChange = (e, option) => {
    const date = this.state.iso

    if (date) {
      const value = option && option.value || ''

      this.handleChange(e, value)
    } else {
      const label = option && option.label || ''

      this.setState({
        message: this.getErrorMessage('', label)
      })
    }
  }

  handleBlur = (e) => {
    if (this.props.required && !this.state.iso) {
      this.setState({
        message: this.getErrorMessage(),
      })
    }
    // when TABbing from the DateInput to TimeInput or visa-versa, the blur
    // happens on the target before the relatedTarget gets focus.
    // The timeout gives it a moment for that to happen
    if(typeof this.props.onBlur === 'function') {
      window.setTimeout(() => {
        if ( !this.focused ) {
          this.props.onBlur(e)
        }
      }, 0)
    }
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
    return (this._dateInput && this._dateInput.focused)
      || (this._timeInput && this._timeInput.focused)
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
      datePlaceholder,
      dateLabel,
      dateNextLabel,
      datePreviousLabel,
      dateFormat,
      dateInputRef,
      timeLabel,
      timeFormat,
      timeStep,
      timeInputRef,
      locale,
      timezone,
      messages,
      layout,
      required,
      disabled,
      readOnly,
    } = this.props
    const {iso, message} = this.state

    return (
      <FormFieldGroup
        description={description}
        colSpacing="medium"
        rowSpacing="small"
        layout={layout}
        vAlign="top"
        messages={[
          ...(message ? [message] : []),
          ...(messages || [])
        ]}
      >
        <DateInput
          dateValue={iso}
          onDateChange={this.handleDateChange}
          onBlur={this.handleBlur}
          ref={this.dateInputComponentRef}
          inputRef={dateInputRef}
          placeholder={datePlaceholder}
          label={dateLabel}
          locale={locale}
          format={dateFormat}
          nextLabel={dateNextLabel}
          previousLabel={datePreviousLabel}
          timezone={timezone}
          validationFeedback={false}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
        />
        <TimeInput
          value={iso}
          onChange={this.handleTimeChange}
          onBlur={this.handleBlur}
          ref={this.timeInputComponentRef}
          label={timeLabel}
          locale={locale}
          format={timeFormat}
          step={timeStep}
          timezone={timezone}
          inputRef={timeInputRef}
          disabled={disabled}
          readOnly={readOnly}
        />
      </FormFieldGroup>
    )
  }
}

export default DateTimeInput
