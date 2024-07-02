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

/** @jsx jsx */
import React, { useState, useEffect, useContext } from 'react'
import moment from 'moment-timezone'
import { Calendar } from '@instructure/ui-calendar'
import { IconButton } from '@instructure/ui-buttons'
import { IconCalendarMonthLine } from '@instructure/ui-icons'
import { Popover } from '@instructure/ui-popover'
import { TextInput } from '@instructure/ui-text-input'

import { DateTime, ApplyLocaleContext, Locale } from '@instructure/ui-i18n'
import { jsx } from '@instructure/emotion'

import type { DateInputProps } from './props'
import type { FormMessage } from '@instructure/ui-form-field'

const DateInput2 = ({
  renderLabel,
  isRequired,
  value,
  width,
  onChange,
  onBlur,
  withYearPicker,
  invalidDateErrorMessage,
  locale,
  timezone,
  size,
  placeholder,
  isInline,
  interaction
}: DateInputProps) => {
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [inputMessages, setInputMessages] = useState<FormMessage[]>([])
  const [showPopover, setShowPopover] = useState<boolean>(false)
  const localeContext = useContext(ApplyLocaleContext)

  useEffect(() => {
    validateInput(true)
  }, [value])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    onChange?.(e, { value })
  }

  const handleDateSelected = (dateString: string, momentDate: any, e: any) => {
    setSelectedDate(dateString)
    handleInputChange(
      e,
      `${momentDate.format('MMMM')} ${momentDate.format(
        'D'
      )}, ${momentDate.format('YYYY')}`
    )
    setShowPopover(false)
  }

  const validateInput = (onlyRemoveError = false) => {
    if (
      moment
        .tz(
          value ? value : '',
          [
            DateTime.momentISOFormat,
            'llll',
            'LLLL',
            'lll',
            'LLL',
            'll',
            'LL',
            'l',
            'L'
          ],
          getLocale(),
          true,
          getTimezone()
        )
        .isValid() ||
      value === ''
    ) {
      setSelectedDate(value || '')
      setInputMessages([])
      return
    }
    if (typeof invalidDateErrorMessage !== 'function' && !onlyRemoveError) {
      setInputMessages([
        {
          type: 'error',
          text: invalidDateErrorMessage
        }
      ])
    }
  }

  const getLocale = () => {
    if (locale) {
      return locale
    } else if (localeContext.locale) {
      return localeContext.locale
    }
    return Locale.browserLocale()
  }

  const getTimezone = () => {
    if (timezone) {
      return timezone
    } else if (localeContext.timezone) {
      return localeContext.timezone
    }
    return DateTime.browserTimeZone()
  }

  const handleBlur = (e: React.SyntheticEvent) => {
    onBlur?.(e)
    validateInput(false)
  }

  return (
    <TextInput
      renderLabel={renderLabel}
      onChange={handleInputChange}
      onBlur={handleBlur}
      isRequired={isRequired}
      value={value}
      placeholder={placeholder}
      width={width}
      size={size}
      display={isInline ? 'inline-block' : 'block'}
      messages={inputMessages}
      interaction={interaction}
      renderAfterInput={
        <Popover
          renderTrigger={
            <IconButton
              withBackground={false}
              withBorder={false}
              screenReaderLabel="Calendar"
              shape="circle"
              interaction={interaction}
            >
              <IconCalendarMonthLine inline={false} />
            </IconButton>
          }
          isShowingContent={showPopover}
          onShowContent={() => setShowPopover(true)}
          onHideContent={() => setShowPopover(false)}
          on="click"
          // screenReaderLabel={this.props.popoverScreenReaderLabel} TODO
          shouldContainFocus
          shouldReturnFocus
          shouldCloseOnDocumentClick
        >
          <Calendar
            withYearPicker={withYearPicker}
            onDateSelected={handleDateSelected}
            selectedDate={selectedDate}
          />
        </Popover>
      }
    />
  )
}

export default DateInput2
export { DateInput2 }
