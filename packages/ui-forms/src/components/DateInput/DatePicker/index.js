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
import classnames from 'classnames'
import keycode from 'keycode'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import I18nPropTypes from '@instructure/ui-i18n/lib/utils/I18nPropTypes'
import themeable from '@instructure/ui-themeable'
import DateTime from '@instructure/ui-i18n/lib/DateTime'
import Locale from '@instructure/ui-i18n/lib/Locale'
import error from '@instructure/ui-utils/lib/error'

import PresentationContent from '@instructure/ui-a11y/lib/components/PresentationContent'
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'

import DatePickerPagination from './DatePickerPagination'
import styles from './styles.css'
import theme from './theme'
import { isSameMonth, isSameDay, isDayDisabled } from "../utils/dateHelpers"

/**
---
parent: DateInput
---
**/
@themeable(theme, styles)
export default class DatePicker extends Component {
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
      An ISO 8601 formatted string. The selected value on initial render.
    **/
    defaultSelectedValue: I18nPropTypes.iso8601,
    /**
      An ISO 8601 formatted string. Must be accompanied by an onSelectedChange property.
      Defaults to today's date.
    **/
    selectedValue: CustomPropTypes.controllable(I18nPropTypes.iso8601,
      'onSelectedChange', 'defaultSelectedValue'),

    /**
      An ISO 8601 formatted string. The rendered value on initial render.
    **/
    defaultRenderedValue: I18nPropTypes.iso8601,

    /**
      An ISO 8601 formatted string. Must be accompanied by an onRenderedChange property.
      Defaults to today's date.
    **/
    renderedValue: CustomPropTypes.controllable(I18nPropTypes.iso8601,
      'onRenderedChange', 'defaultRenderedValue'),

    /**
      An ISO 8601 formatted string. Defaults to the current date. DatePicker doesn't
      attempt to change this value. Defaults to today's date.
    **/
    todayValue: I18nPropTypes.iso8601,

    /**
      A standard language id
    **/
    locale: PropTypes.string,
    /**
      A timezone identifier in the format: Area/Location
    **/
    timezone: PropTypes.string,

    /**
      Called with the triggering event followed by an ISO 8601 formatted string.
    **/
    onSelectedChange: PropTypes.func,
    /**
      Called with the triggering event followed by an ISO 8601 formatted string.
    **/
    onRenderedChange: PropTypes.func,
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
    disabledDaysOfWeek: [],
    disabledDays: []
  }

  static contextTypes = {
    locale: PropTypes.string,
    timezone: PropTypes.string
  }

  constructor (props, context) {
    super(props, context)

    const locale = this._locale(props, context)
    const timezone = this._timezone(props, context)

    const defaultTodayValue = DateTime.now(locale, timezone)
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)
      .format()

    const todayValue = this._validateDateProp(
      props.todayValue,
      defaultTodayValue,
      'todayValue',
      locale,
      timezone
    )

    const selectedValue = this._validateDateProp(
      props.selectedValue || props.defaultSelectedValue,
      todayValue,
      'selectedValue',
      locale,
      timezone
    )

    const renderedValue = this._validateDateProp(
      props.renderedValue || props.defaultRenderedValue,
      selectedValue,
      'renderedValue',
      locale,
      timezone
    )

    const focusedValue = selectedValue

    this.state = { selectedValue, renderedValue, todayValue, focusedValue }
  }

  componentWillReceiveProps (nextProps) {
    if (
      nextProps.selectedValue !== this.props.selectedValue ||
      nextProps.renderedValue !== this.props.renderedValue ||
      nextProps.todayValue !== this.props.todayValue
    ) {
      this.setState((state) => {
        return {
          selectedValue: this.validateDateProp(nextProps.selectedValue, state.selectedValue, 'selectedValue'),
          renderedValue: this.validateDateProp(nextProps.renderedValue, state.renderedValue, 'renderedValue'),
          todayValue: this.validateDateProp(nextProps.todayValue, state.todayValue, 'todayValue')
        }
      })
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if ((this.state.focusedValue !== prevState.focusedValue) && this._focusedDay) {
      this._focusedDay.focus()
    }
  }

  _validateDateProp (dateStr, fallbackDateStr, propName, locale, timezone) {
    const parsedDate = this._parseDate(dateStr, locale, timezone)
    const isEmpty = !dateStr
    const isValid = parsedDate.isValid()

    error(isEmpty || isValid, 'DatePicker', `Unexpected date format received for '${propName}' prop: '${dateStr}'.`)

    return (isEmpty || !isValid) ? fallbackDateStr : dateStr
  }

  validateDateProp (dateStr, fallbackDateStr, propName) {
    return this._validateDateProp(dateStr, fallbackDateStr, propName, this.locale, this.timezone)
  }

  _locale (props, context) {
    return props.locale || context.locale || Locale.browserLocale()
  }

  _timezone (props, context) {
    return props.timezone || context.timezone || DateTime.browserTimeZone()
  }

  _parseDate (dateStr, locale, timezone) {
    return DateTime.parse(dateStr, locale, timezone)
  }

  parseDate (dateStr) {
    return this._parseDate(dateStr, this.locale, this.timezone)
  }

  get locale () {
    return this._locale(this.props, this.context)
  }

  get timezone () {
    return this._timezone(this.props, this.context)
  }

  get todayValue () {
    return this.state.todayValue
  }

  get selectedValue () {
    return this.state.selectedValue
  }

  get renderedValue () {
    return this.state.renderedValue
  }

  get focusedValue () {
    return this.state.focusedValue
  }

  findNextEnabledDay = (date, eventKeycode, currentIteration = 0, iterationMax = 60) => {
    switch (eventKeycode) {
      case (keycode.codes.left):
        date.subtract(1, 'days')
        break
      case (keycode.codes.right):
        date.add(1, 'days')
        break
      case (keycode.codes.up):
        date.subtract(7, 'days')
        break
      case (keycode.codes.down):
        date.add(7, 'days')
        break
      default:
        break
    }

    // Since we allow a datesDisabled callback function, the set of disabled dates is non
    // deterministic, which means without this check the function could recurse infinitely.
    if(currentIteration >= iterationMax) {
      return null
    } else if(isDayDisabled(date, this.props.disabledDaysOfWeek, this.props.disabledDays)) {
      return this.findNextEnabledDay(date, eventKeycode, currentIteration + 1)
    } else {
      return date
    }
  }

  handleCalendarKeyDown = (e) => {
    const {
      up,
      down,
      left,
      right
    } = keycode.codes

    if (!(e.keyCode === up ||
          e.keyCode === down ||
          e.keyCode === left ||
          e.keyCode === right)) {
      return
    }

    const focusedDate = this.parseDate(this.state.focusedValue)
    const newFocusedDate = this.findNextEnabledDay(focusedDate, e.keyCode)

    if(!newFocusedDate) {
      return
    }

    e.preventDefault()
    e.stopPropagation()


    const newFocusedString = newFocusedDate.format()
    this.updatePagination(newFocusedString)
    this.setState({ focusedValue: newFocusedString })
  }

  updatePagination (newValueString) {
    const newValueMoment = this.parseDate(newValueString)
    const newMonth = newValueMoment.month()
    const newYear = newValueMoment.year()

    const renderedMoment = this.parseDate(this.state.renderedValue)
    const renderedMonth = renderedMoment.month()
    const renderedYear = renderedMoment.year()

    if (newYear < renderedYear) {
      this.handlePaginationPrev()
      return
    }

    if (newYear > renderedYear) {
      this.handlePaginationNext()
      return
    }

    if (newMonth < renderedMonth) {
      this.handlePaginationPrev()
    }

    if (newMonth > renderedMonth) {
      this.handlePaginationNext()
    }
  }

  handlePaginationPrev = (e) => {
    const sliderMoment = this.parseDate(this.state.renderedValue)
    const sliderString = sliderMoment.subtract(1, 'months').format()
    this.setState({ renderedValue: sliderString })
    this.fireRenderedChange(e, sliderString)
  }

  handlePaginationNext = (e) => {
    const sliderMoment = this.parseDate(this.state.renderedValue)
    const sliderString = sliderMoment.add(1, 'months').format()
    this.setState({ renderedValue: sliderString })
    this.fireRenderedChange(e, sliderString)
  }

  handleDateClick = (e, clickedString) => {
    this.updatePagination(clickedString)
    this.setState({ selectedValue: clickedString })
    this.fireSelectedChange(e, clickedString)
  }

  handleDateFocus = (focusedString) => {
    this.setState({ focusedValue: focusedString })
  }

  fireRenderedChange (e, newRenderedString) {
    if (typeof this.props.onRenderedChange === 'function') {
      this.props.onRenderedChange(e, newRenderedString)
    }
  }

  fireSelectedChange (e, newSelectedString) {
    if (typeof this.props.onSelectedChange === 'function') {
      this.props.onSelectedChange(e, newSelectedString)
    }
  }

  renderHeaderCell (day) {
    return (
      <th className={styles.header} key={day.dayOfYear()}>
        <PresentationContent>{day.format('dd')}</PresentationContent>
        <ScreenReaderContent>{day.format('dddd')}</ScreenReaderContent>
      </th>
    )
  }

  renderHeader (rendered) {
    const firstDay = rendered.clone().startOf('week')
    const days = [0, 1, 2, 3, 4, 5, 6].map(n => firstDay.clone().add(n, 'd'))
    return (
      <tr>
        {days.map(d => this.renderHeaderCell(d))}
      </tr>
    )
  }

  renderDayCell (day, today, selected, rendered, focused) {
    const disabled = isDayDisabled(day, this.props.disabledDaysOfWeek, this.props.disabledDays)

    const classes = {
      [styles.cell]: true,
      [styles.today]: isSameDay(day, today),
      [styles.selected]: isSameDay(day, selected),
      [styles.outside]: !isSameMonth(day, rendered),
      [styles.disabled]: disabled
    }

    const handleDateClick = disabled ? (e) => null : (e) => this.handleDateClick(e, day.format())
    const handleDateFocus = () => this.handleDateFocus(day.format())
    return (
      <td key={day.dayOfYear()}>
        <button
          type="button"
          className={classnames(classes)}
          tabIndex={isSameMonth(day, rendered) ? '0' : '-1'}
          ref={(c) => { if (isSameDay(day, focused)) { this._focusedDay = c } }}
          onClick={handleDateClick}
          onFocus={handleDateFocus}
          disabled={disabled}
        >
          { day.format('D') }
        </button>
      </td>
    )
  }

  renderWeekRow (firstDay, today, selected, rendered, focused) {
    return (
      <tr key={firstDay.week()}>
        {
          [0, 1, 2, 3, 4, 5, 6].map(n => {
            return this.renderDayCell(firstDay.clone().add(n, 'd'), today, selected, rendered, focused)
          })
        }
      </tr>
    )
  }

  renderCalendar (today, selected, rendered, focused) {
    const firstDay = rendered.clone().startOf('month').startOf('week')
    if (selected) {  // Copy selected value's time so we don't change it on the user
      firstDay
        .hour(selected.hour())
        .minute(selected.minute())
        .second(selected.second())
        .millisecond(selected.millisecond())
    }
    return [0, 7, 14, 21, 28, 35].map((weekIncrement) => {
      const firstOfWeek = firstDay.clone().add(weekIncrement, 'd')
      return this.renderWeekRow(firstOfWeek, today, selected, rendered, focused)
    })
  }

  render () {
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    const today = this.parseDate(this.state.todayValue)
    const selected = this.parseDate(this.state.selectedValue)
    const rendered = this.parseDate(this.state.renderedValue)
    const focused = this.parseDate(this.state.focusedValue)

    return (
      <div className={styles.root}>
        <DatePickerPagination
          previousLabel={this.props.previousLabel}
          nextLabel={this.props.nextLabel}
          onPrev={this.handlePaginationPrev}
          onNext={this.handlePaginationNext}
        >
          <div className={styles.label}>
            <div>{rendered.format('MMMM')}</div>
            <div>{rendered.format('YYYY')}</div>
          </div>
        </DatePickerPagination>
        <div
          ref={(c) => { this._calendar = c }}
          className={styles.calendar}
          onKeyDown={this.handleCalendarKeyDown}
        >
          <table className={styles.table}>
            <thead>
              {this.renderHeader(rendered)}
            </thead>
            <tbody>
              {this.renderCalendar(today, selected, rendered, focused)}
            </tbody>
          </table>
        </div>
      </div>
    )
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

export { default as DatePickerPagination } from './DatePickerPagination'
