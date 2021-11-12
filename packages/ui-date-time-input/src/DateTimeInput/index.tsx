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

import React, { Component, SyntheticEvent } from 'react'
import { Locale, DateTime, ApplyLocaleContext } from '@instructure/ui-i18n'
import type { Moment } from '@instructure/ui-i18n'
import { FormFieldGroup } from '@instructure/ui-form-field'
import type { FormMessage } from '@instructure/ui-form-field'

import { DateInput } from '@instructure/ui-date-input'
import { TimeSelect } from '@instructure/ui-time-select'
import { Calendar } from '@instructure/ui-calendar'
import { testable } from '@instructure/ui-testable'
import { AccessibleContent } from '@instructure/ui-a11y-content'
import { IconButton } from '@instructure/ui-buttons'
import {
  IconArrowOpenEndSolid,
  IconArrowOpenStartSolid
} from '@instructure/ui-icons'
import { debounce } from '@instructure/debounce'
import type { DateTimeInputProps, DateTimeInputState } from './props'
import { propTypes, allowedProps } from './props'

/**
---
category: components
---
@tsProps
**/
@testable()
class DateTimeInput extends Component<DateTimeInputProps, DateTimeInputState> {
  // extra verbose localized date and time
  private static readonly DEFAULT_MESSAGE_FORMAT = 'LLLL'
  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    layout: 'inline',
    timeStep: 30,
    messageFormat: DateTimeInput.DEFAULT_MESSAGE_FORMAT,
    isRequired: false,
    dateFormat: 'LL' // Localized date with full month, e.g. "August 6, 2014"
  } as const

  static contextType = ApplyLocaleContext

  private _timeInput?: TimeSelect
  ref: Element | null = null // This is used by Tooltip for positioning

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  constructor(props: DateTimeInputProps) {
    super(props)
    // State needs to be calculated because render could be called before
    // componentDidMount()
    this.state = this.recalculateState(props.value || props.defaultValue)
  }

  componentDidMount() {
    // we'll need to recalculate the state because the context value is
    // set at this point (and it might change locale & timezone)
    const initState = this.recalculateState(
      this.props.value || this.props.defaultValue
    )
    this.setState(initState)
  }

  componentDidUpdate(prevProps: Readonly<DateTimeInputProps>): void {
    const valueChanged =
      prevProps.value !== this.props.value ||
      prevProps.defaultValue !== this.props.defaultValue
    const isUpdated =
      valueChanged ||
      prevProps.locale !== this.props.locale ||
      prevProps.timezone !== this.props.timezone ||
      prevProps.dateFormat !== this.props.dateFormat ||
      prevProps.messageFormat !== this.props.messageFormat ||
      prevProps.invalidDateTimeMessage !== this.props.invalidDateTimeMessage

    if (isUpdated) {
      this.setState((_prevState: DateTimeInputState) => {
        return {
          ...this.recalculateState(this.props.value || this.props.defaultValue)
        }
      })
    }
  }

  recalculateState(
    dateStr?: string,
    doNotChangeDate = false,
    doNotChangeTime = false
  ): DateTimeInputState {
    let errorMsg: FormMessage | undefined
    if (dateStr) {
      const parsed = DateTime.parse(dateStr, this.locale(), this.timezone())
      if (parsed.isValid()) {
        if (doNotChangeTime && this.state.timeSelectValue) {
          // There is a selected time, adjust the parsed date to its value
          const timeParsed = DateTime.parse(
            this.state.timeSelectValue,
            this.locale(),
            this.timezone()
          )
          parsed.hour(timeParsed.hour()).minute(timeParsed.minute())
        }
        if (doNotChangeDate && this.state.iso) {
          parsed
            .date(this.state.iso.date())
            .month(this.state.iso.month())
            .year(this.state.iso.year())
        }
        const newTimeSelectValue = this.state?.timeSelectValue
          ? this.state.timeSelectValue
          : this._timeInput
              ?.getBaseDate()
              .minute(parsed.minute())
              .hour(parsed.hour())
              .toISOString()
        return {
          iso: parsed.clone(),
          calendarSelectedDate: parsed.clone(),
          dateInputTextChanged: false,
          dateInputText: parsed.format(this.dateFormat),
          message: {
            type: 'success',
            text: this.props.messageFormat
              ? parsed.format(this.props.messageFormat)
              : parsed.format(DateTimeInput.DEFAULT_MESSAGE_FORMAT)
          },
          timeSelectValue: newTimeSelectValue,
          renderedDate: parsed.clone()
        }
      }
      if (dateStr.length > 0 || this.props.isRequired) {
        const text =
          typeof this.props.invalidDateTimeMessage === 'function'
            ? this.props.invalidDateTimeMessage(dateStr)
            : this.props.invalidDateTimeMessage
        errorMsg = text ? { text, type: 'error' } : undefined
      }
    }
    return {
      iso: undefined,
      calendarSelectedDate: undefined,
      dateInputText: dateStr ? dateStr : '',
      message: errorMsg,
      renderedDate: DateTime.now(this.locale(), this.timezone()),
      dateInputTextChanged: false
    }
  }

  locale(): string {
    if (this.props.locale) {
      return this.props.locale
    } else if (this.context && this.context.locale) {
      return this.context.locale
    }
    return Locale.browserLocale()
  }

  timezone(): string {
    if (this.props.timezone) {
      return this.props.timezone
    } else if (this.context && this.context.timezone) {
      return this.context.timezone
    }
    return DateTime.browserTimeZone()
  }

  get dateFormat() {
    return this.props.dateFormat ? this.props.dateFormat : 'LL'
  }

  // Called when the user enters text into dateInput
  handleDateTextChange = (_event: SyntheticEvent, date: { value: string }) => {
    const dateParsed = this.tryParseDate(date.value)
    this.setState({
      dateInputText: date.value,
      dateInputTextChanged: true,
      calendarSelectedDate: dateParsed ? dateParsed : undefined,
      renderedDate: dateParsed
        ? dateParsed.clone()
        : DateTime.now(this.locale(), this.timezone())
    })
  }

  tryParseDate(val: string) {
    const parsed = DateTime.parse(val, this.locale(), this.timezone())
    return parsed.isValid() ? parsed : null
  }

  // date is returned es a ISO string, like 2021-09-14T22:00:00.000Z
  handleDayClick = (event: SyntheticEvent, { date }: { date: string }) => {
    const dateParsed = DateTime.parse(date, this.locale(), this.timezone())
    this.updateStateBasedOnDateInput(dateParsed, event)
  }

  handleHideCalendar = (event: SyntheticEvent) => {
    // update state based on the DateInput's text value
    if (
      this.state.dateInputTextChanged ||
      ((event as unknown) as KeyboardEvent).key === 'Enter'
    ) {
      const dateParsed = this.tryParseDate(this.state.dateInputText)
      this.updateStateBasedOnDateInput(dateParsed, event)
    } else {
      // user clicked outside or tabbed away or pressed esc, reset text
      this.setState({
        dateInputText: this.state.iso
          ? this.state.iso.format(this.dateFormat)
          : ''
      })
    }
    this.setState({ isShowingCalendar: false, dateInputTextChanged: false })
  }

  updateStateBasedOnDateInput(
    dateParsed: Moment | null,
    event: SyntheticEvent
  ) {
    let newState
    if (
      dateParsed &&
      this.state.timeSelectValue &&
      (!this.state.dateInputText || this.state.dateInputText == '')
    ) {
      // There is already a selected time, but no date. Adjust the time too
      const timeParsed = DateTime.parse(
        this.state.timeSelectValue,
        this.locale(),
        this.timezone()
      )
      const dateParsedAdjusted = dateParsed.set({
        hour: timeParsed.hour(),
        minute: timeParsed.minute()
      })
      newState = this.recalculateState(
        dateParsedAdjusted.toISOString(),
        false,
        false
      )
    } else if (!dateParsed) {
      // if the text in the dateInput is not readable display error
      newState = this.recalculateState(this.state.dateInputText, false, true)
    } else {
      newState = this.recalculateState(dateParsed?.toISOString(), false, true)
    }
    this.changeStateIfNeeded(newState, event)
  }

  handleTimeChange = (
    event: SyntheticEvent,
    option: { value: string; inputText: string }
  ) => {
    let newValue: string
    if (this.state.iso) {
      newValue = option.value
    } else {
      // if no date is set just return the input text, it will error
      newValue = option.inputText
    }
    const newState = this.recalculateState(newValue, true, false)

    this.changeStateIfNeeded(newState, event)
    this.setState({ timeSelectValue: option.value })
  }

  changeStateIfNeeded = (newState: DateTimeInputState, e: SyntheticEvent) => {
    this.setState({ message: newState.message })
    if (!newState.iso && !this.state.iso) {
      return
    }
    if (
      !this.state.iso ||
      !newState.iso ||
      !this.state.iso.isSame(newState.iso)
    ) {
      this.setState(newState)
      if (this.props.onChange) {
        this.props.onChange(e, newState.iso?.toISOString())
      }
    }
  }

  handleBlur = (e: SyntheticEvent) => {
    // when TABbing from the DateInput to TimeInput or visa-versa, the blur
    // happens on the target before the relatedTarget gets focus.
    // The timeout gives it a moment for that to happen
    if (typeof this.props.onBlur === 'function') {
      window.setTimeout(() => {
        this.props.onBlur?.(e)
      }, 0)
    }
  }

  timeInputComponentRef = (node: TimeSelect) => {
    this._timeInput = node
  }

  handleShowCalendar = (_event: SyntheticEvent) => {
    this.setState({ isShowingCalendar: true })
  }

  handleSelectNextDay = (_event: SyntheticEvent) => {
    let toAlter
    if (this.state.calendarSelectedDate) {
      toAlter = this.state.calendarSelectedDate.clone()
    } else if (this.state.iso) {
      toAlter = this.state.iso.clone()
    } else {
      toAlter = DateTime.now(this.locale(), this.timezone())
    }
    toAlter.add({ days: 1 })
    this.setState({
      calendarSelectedDate: toAlter,
      renderedDate: toAlter.clone(),
      dateInputText: toAlter.format(this.dateFormat)
    })
  }

  handleSelectPrevDay = (_event: SyntheticEvent) => {
    let toAlter
    if (this.state.calendarSelectedDate) {
      toAlter = this.state.calendarSelectedDate.clone()
    } else if (this.state.iso) {
      toAlter = this.state.iso.clone()
    } else {
      toAlter = DateTime.now(this.locale(), this.timezone())
    }
    toAlter.subtract({ days: 1 })
    this.setState({
      calendarSelectedDate: toAlter,
      renderedDate: toAlter.clone(),
      dateInputText: toAlter.format(this.dateFormat)
    })
  }

  handleRenderNextMonth = (_event: SyntheticEvent) => {
    this.setState({
      renderedDate: this.state.renderedDate.clone().add({ months: 1 })
    })
  }

  handleRenderPrevMonth = (_event: SyntheticEvent) => {
    this.setState({
      renderedDate: this.state.renderedDate.clone().subtract({ months: 1 })
    })
  }

  renderDays() {
    if (!this.state.isShowingCalendar) {
      // this is an expensive function, only execute if the calendar is open
      return
    }
    const renderedDate = this.state.renderedDate
    // Sets it to the first local day of the week counting back from the start of the month.
    // Note that first day depends on the locale, e.g. it's Sunday in the US and
    // Monday in most of the EU.
    const currDate = DateTime.getFirstDayOfWeek(renderedDate.startOf('month'))
    const arr: Moment[] = []
    for (let i = 0; i < Calendar.DAY_COUNT; i++) {
      arr.push(currDate.clone())
      currDate.add({ days: 1 })
    }
    return arr.map((date) => {
      const dateStr = date.toISOString()
      return (
        <DateInput.Day
          key={dateStr}
          date={dateStr}
          isSelected={
            this.state.calendarSelectedDate
              ? date.isSame(this.state.calendarSelectedDate, 'day')
              : false
          }
          isToday={date.isSame(
            DateTime.now(this.locale(), this.timezone()),
            'day'
          )}
          isOutsideMonth={!date.isSame(renderedDate, 'month')}
          label={date.format('DD')} // day of the month, padded to 2
          onClick={this.handleDayClick}
        >
          {date.format('DD')}
        </DateInput.Day>
      )
    })
  }

  // The default weekdays rendered in the calendar
  get defaultWeekdays() {
    if (!this.state.isShowingCalendar) {
      // this is an expensive function, only execute if the calendar is open
      return []
    }
    const shortDayNames = DateTime.getLocalDayNamesOfTheWeek(
      this.locale(),
      'short'
    )
    const longDayNames = DateTime.getLocalDayNamesOfTheWeek(
      this.locale(),
      'long'
    )
    return [
      <AccessibleContent key={1} alt={longDayNames[0]}>
        {shortDayNames[0]}
      </AccessibleContent>,
      <AccessibleContent key={2} alt={longDayNames[1]}>
        {shortDayNames[1]}
      </AccessibleContent>,
      <AccessibleContent key={3} alt={longDayNames[2]}>
        {shortDayNames[2]}
      </AccessibleContent>,
      <AccessibleContent key={4} alt={longDayNames[3]}>
        {shortDayNames[3]}
      </AccessibleContent>,
      <AccessibleContent key={5} alt={longDayNames[4]}>
        {shortDayNames[4]}
      </AccessibleContent>,
      <AccessibleContent key={6} alt={longDayNames[5]}>
        {shortDayNames[5]}
      </AccessibleContent>,
      <AccessibleContent key={7} alt={longDayNames[6]}>
        {shortDayNames[6]}
      </AccessibleContent>
    ]
  }

  renderNextPrevMonthButton(type: 'prev' | 'next') {
    if (!this.state.isShowingCalendar) {
      return
    }
    return (
      <IconButton
        size="small"
        withBackground={false}
        withBorder={false}
        renderIcon={
          type === 'prev' ? (
            <IconArrowOpenStartSolid color="primary" />
          ) : (
            <IconArrowOpenEndSolid color="primary" />
          )
        }
        screenReaderLabel={
          type === 'prev'
            ? this.props.prevMonthLabel
            : this.props.nextMonthLabel
        }
      />
    )
  }

  render() {
    const {
      description,
      datePlaceholder,
      dateLabel,
      dateInputRef,
      timeLabel,
      timeFormat,
      timeStep,
      timeInputRef,
      locale,
      timezone,
      messages,
      layout,
      isRequired,
      interaction,
      renderWeekdayLabels
    } = this.props
    return (
      <FormFieldGroup
        description={description}
        colSpacing="medium"
        rowSpacing="small"
        layout={layout}
        vAlign="top"
        elementRef={this.handleRef}
        messages={[
          ...(this.state.message ? [this.state.message] : []),
          ...(messages || [])
        ]}
      >
        <DateInput
          value={this.state.dateInputText}
          onChange={this.handleDateTextChange}
          onBlur={this.handleBlur}
          inputRef={dateInputRef}
          placeholder={datePlaceholder}
          renderLabel={dateLabel}
          renderWeekdayLabels={
            renderWeekdayLabels ? renderWeekdayLabels : this.defaultWeekdays
          }
          onRequestShowCalendar={this.handleShowCalendar}
          // debounce is needed here because handleDayClick updates calendarSelectedDate
          // and this is read in handleHideCalendar
          onRequestHideCalendar={debounce(this.handleHideCalendar)}
          isShowingCalendar={this.state.isShowingCalendar}
          renderNextMonthButton={this.renderNextPrevMonthButton('next')}
          renderPrevMonthButton={this.renderNextPrevMonthButton('prev')}
          onRequestSelectNextDay={this.handleSelectNextDay}
          onRequestSelectPrevDay={this.handleSelectPrevDay}
          onRequestRenderNextMonth={this.handleRenderNextMonth}
          onRequestRenderPrevMonth={this.handleRenderPrevMonth}
          isRequired={isRequired}
          interaction={interaction}
          renderNavigationLabel={
            <span>
              <div>{this.state.renderedDate.format('MMMM')}</div>
              <div>{this.state.renderedDate.format('y')}</div>
            </span>
          }
        >
          {this.renderDays()}
        </DateInput>
        <TimeSelect
          value={this.state.timeSelectValue}
          onChange={this.handleTimeChange}
          onBlur={this.handleBlur}
          ref={this.timeInputComponentRef}
          renderLabel={timeLabel}
          locale={locale}
          format={timeFormat}
          step={timeStep}
          timezone={timezone}
          inputRef={timeInputRef}
          interaction={interaction}
        />
      </FormFieldGroup>
    )
  }
}

export default DateTimeInput
export { DateTimeInput }
