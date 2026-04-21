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

import { Component, SyntheticEvent } from 'react'
import { Locale, DateTime, ApplyLocaleContext } from '@instructure/ui-i18n'
import type { Moment } from '@instructure/ui-i18n'
import { FormFieldGroup } from '@instructure/ui-form-field/latest'
import type { FormMessage } from '@instructure/ui-form-field/latest'

import { DateInput } from '@instructure/ui-date-input/latest'
import { TimeSelect } from '@instructure/ui-time-select/latest'
import type { DateTimeInputProps, DateTimeInputState } from './props'
import { allowedProps } from './props'
import { error } from '@instructure/console'

/**
---
category: components
---
**/
class DateTimeInput extends Component<DateTimeInputProps, DateTimeInputState> {
  // extra verbose localized date and time
  private static readonly DEFAULT_MESSAGE_FORMAT = 'LLLL'
  static allowedProps = allowedProps
  static defaultProps = {
    layout: 'inline',
    colSpacing: 'medium',
    rowSpacing: 'small',
    timeStep: 30,
    showMessages: true,
    messageFormat: DateTimeInput.DEFAULT_MESSAGE_FORMAT,
    isRequired: false,
    dateFormat: 'LL', // Localized date with full month, e.g. "August 6, 2014"
    allowNonStepInput: false
  } as const

  declare context: React.ContextType<typeof ApplyLocaleContext>
  static contextType = ApplyLocaleContext

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
    this.props.reset?.(this.reset)
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
        if (this.props.initialTimeForNewDate && !this.state?.timeSelectValue) {
          const hour = Number(this.props.initialTimeForNewDate.slice(0, 2))
          const minute = Number(this.props.initialTimeForNewDate.slice(3, 5))
          if (isNaN(hour) || isNaN(minute)) {
            error(
              false,
              `[DateTimeInput] initialTimeForNewDate prop is not in the correct format. Please use HH:MM format.`
            )
          } else if (hour < 0 || hour > 23 || minute > 59 || minute < 0) {
            error(
              false,
              `[DateTimeInput] 0 <= hour < 24 and 0 <= minute < 60 for initialTimeForNewDate prop.`
            )
          } else {
            parsed.hour(hour).minute(minute)
          }
        }
        const newTimeSelectValue = parsed.toISOString()
        if (this.isDisabledDate(parsed)) {
          let text =
            typeof this.props.disabledDateTimeMessage === 'function'
              ? this.props.disabledDateTimeMessage(parsed.toISOString(true))
              : this.props.disabledDateTimeMessage
          if (!text) {
            text =
              typeof this.props.invalidDateTimeMessage === 'function'
                ? this.props.invalidDateTimeMessage(parsed.toISOString(true))
                : this.props.invalidDateTimeMessage
          }
          errorMsg = text ? { text, type: 'error' } : undefined
          return {
            iso: parsed.clone(),
            dateInputText: parsed.format(this.dateFormat),
            message: errorMsg,
            timeSelectValue: newTimeSelectValue
          }
        }
        return {
          iso: parsed.clone(),
          dateInputText: parsed.format(this.dateFormat),
          message: {
            type: 'success',
            text: parsed.format(this.props.messageFormat)
          },
          timeSelectValue: newTimeSelectValue
        }
      }
    }
    // if there is no date string clear TimeSelect value
    const clearTimeSelect: Partial<DateTimeInputState> = dateStr
      ? {}
      : {
          timeSelectValue: '',
          message: undefined
        }
    return {
      iso: undefined,
      dateInputText: dateStr ? dateStr : '',
      ...clearTimeSelect
    }
  }

  reset = () => this.setState(this.recalculateState())

  locale(): string {
    if (this.props.locale) {
      return this.props.locale
    } else if (this.context && this.context.locale) {
      return this.context.locale
    }
    return Locale.browserLocale()
  }

  timezone() {
    if (this.props.timezone) {
      return this.props.timezone
    } else if (this.context && this.context.timezone) {
      return this.context.timezone
    }
    return DateTime.browserTimeZone()
  }

  get dateFormat() {
    return this.props.dateFormat
  }

  isDisabledDate(date: Moment) {
    const disabledDates = this.props.disabledDates
    if (!disabledDates) {
      return false
    }
    if (Array.isArray(disabledDates)) {
      for (const aDisabledDate of disabledDates) {
        if (date.isSame(aDisabledDate, 'day')) {
          return true
        }
      }
      return false
    }
    return disabledDates(date.toISOString())
  }

  handleDateTextChange = (
    _event: SyntheticEvent,
    inputValue: string,
    _utcDateString: string
  ) => {
    this.setState({ dateInputText: inputValue })
  }

  handleDateValidated = (
    event: SyntheticEvent,
    _inputValue: string,
    utcDateString: string
  ) => {
    let newState: DateTimeInputState
    if (
      utcDateString &&
      this.state.timeSelectValue &&
      (!this.state.dateInputText || this.state.dateInputText === '')
    ) {
      const timeParsed = DateTime.parse(
        this.state.timeSelectValue,
        this.locale(),
        this.timezone()
      )
      const dateParsed = DateTime.parse(
        utcDateString,
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
    } else if (!utcDateString) {
      // invalid date — pass raw text so error message is shown
      newState = this.recalculateState(this.state.dateInputText, false, true)
    } else {
      newState = this.recalculateState(utcDateString, false, true)
    }
    this.changeStateIfNeeded(newState, event)
  }

  updateStateBasedOnTimeSelect = (
    event: SyntheticEvent,
    option: { value?: string; inputText: string }
  ) => {
    // this.state.iso is undefined if date is invalid or not set.
    // in this case recalculate with the dateInput's text which will result in
    // an empty valid date (if isRequired is false) or an invalid date.
    const newValue = this.state.iso ? option.value : this.state.dateInputText
    const newState = this.recalculateState(newValue, true, false)
    this.changeStateIfNeeded(newState, event)
    this.setState({ timeSelectValue: option.value })
  }

  changeStateIfNeeded = (newState: DateTimeInputState, e: SyntheticEvent) => {
    const dateStr = newState.dateInputText
    if (
      (this.props.isRequired && !newState.iso) ||
      (dateStr && dateStr.length > 0 && !newState.iso)
    ) {
      const text =
        typeof this.props.invalidDateTimeMessage === 'function'
          ? this.props.invalidDateTimeMessage(dateStr ? dateStr : '')
          : this.props.invalidDateTimeMessage
      // eslint-disable-next-line no-param-reassign
      newState.message = { text: text, type: 'error' }
    }
    if (this.areDifferentDates(this.state.iso, newState.iso)) {
      if (typeof this.props.onChange === 'function') {
        const newDate = newState.iso?.toISOString()
        // Timeout is needed here because users might change value in the
        // onChange event lister, which might not execute properly
        setTimeout(() => {
          this.props.onChange?.(e, newDate)
        }, 0)
      }
    }
    this.setState(newState)
  }

  areDifferentDates = (d1?: Moment, d2?: Moment) => {
    if (!d1 && !d2) {
      return false
    }
    return !d1 || !d2 || !d1.isSame(d2)
  }

  handleBlur = (e: SyntheticEvent) => {
    // when TABbing from the DateInput to TimeInput or visa-versa, the blur
    // happens on the target before the relatedTarget gets focus.
    // The timeout gives it a moment for that to happen
    if (typeof this.props.onBlur === 'function') {
      setTimeout(() => {
        this.props.onBlur?.(e)
      }, 0)
    }
  }

  render() {
    const {
      description,
      datePlaceholder,
      timePlaceholder,
      dateRenderLabel,
      dateInputRef,
      timeRenderLabel,
      timeFormat,
      timeStep,
      timeInputRef,
      locale,
      timezone,
      showMessages,
      messages,
      layout,
      rowSpacing,
      colSpacing,
      isRequired,
      interaction,
      allowNonStepInput,
      calendarIcon,
      prevMonthLabel,
      nextMonthLabel,
      datePickerDialog,
      selectedLabel,
      disabledDates,
      withYearPicker
    } = this.props

    const allMessages = [
      ...(showMessages && this.state.message ? [this.state.message] : []),
      ...(messages || [])
    ]

    const hasError = allMessages.find(
      (m) => m.type === 'newError' || m.type === 'error'
    )
    // if the component is in error state, create an empty error message to pass down to the subcomponents (DateInput and TimeInput) so they get a red outline and red required asterisk
    const subComponentMessages: FormMessage[] = hasError
      ? [{ type: 'error', text: '' }]
      : []

    return (
      <FormFieldGroup
        description={description}
        layout={layout}
        rowSpacing={rowSpacing}
        colSpacing={colSpacing}
        vAlign="top"
        elementRef={this.handleRef}
        isGroup={false}
        messages={[
          ...(showMessages && this.state.message ? [this.state.message] : []),
          ...(messages || [])
        ]}
        data-cid="DateTimeInput"
      >
        <DateInput
          renderLabel={dateRenderLabel}
          screenReaderLabels={{
            calendarIcon,
            prevMonthButton: prevMonthLabel,
            nextMonthButton: nextMonthLabel,
            datePickerDialog,
            selectedLabel
          }}
          withYearPicker={withYearPicker}
          value={this.state.dateInputText}
          onChange={this.handleDateTextChange}
          onRequestValidateDate={this.handleDateValidated}
          onBlur={(e) => this.handleBlur(e)}
          inputRef={dateInputRef}
          placeholder={datePlaceholder ?? ''}
          isRequired={isRequired}
          messages={subComponentMessages}
          interaction={interaction}
          locale={locale}
          timezone={timezone}
          disabledDates={disabledDates}
          dateFormat={{
            parser: (inputString) => {
              const formats = this.props.dateFormat
                ? [
                    DateTime.momentISOFormat,
                    this.props.dateFormat,
                    'L',
                    'l',
                    'll',
                    'LL'
                  ]
                : [DateTime.momentISOFormat, 'L', 'l', 'll', 'LL']
              const parsed = DateTime.parse(
                inputString,
                this.locale(),
                this.timezone(),
                formats
              )
              return parsed.isValid() ? parsed.toDate() : null
            },
            formatter: (date) => {
              return DateTime.parse(
                date.toISOString(),
                this.locale(),
                this.timezone()
              ).format(this.props.dateFormat)
            }
          }}
        />
        <TimeSelect
          value={this.state.timeSelectValue}
          onChange={this.updateStateBasedOnTimeSelect}
          placeholder={timePlaceholder}
          onBlur={this.handleBlur}
          renderLabel={timeRenderLabel}
          locale={locale}
          format={timeFormat}
          step={timeStep}
          timezone={timezone}
          inputRef={timeInputRef}
          interaction={interaction}
          allowNonStepInput={allowNonStepInput}
          isRequired={isRequired}
          messages={subComponentMessages}
        />
      </FormFieldGroup>
    )
  }
}

export default DateTimeInput
export { DateTimeInput }
