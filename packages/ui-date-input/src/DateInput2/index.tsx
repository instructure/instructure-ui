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
import { useState, useEffect, useContext } from 'react'
import type { SyntheticEvent } from 'react'
import { Calendar } from '@instructure/ui-calendar'
import { IconButton } from '@instructure/ui-buttons'
import {
  IconCalendarMonthLine,
  IconArrowOpenEndSolid,
  IconArrowOpenStartSolid
} from '@instructure/ui-icons'
import { Popover } from '@instructure/ui-popover'
import { TextInput } from '@instructure/ui-text-input'
import { passthroughProps } from '@instructure/ui-react-utils'

import { ApplyLocaleContext, Locale } from '@instructure/ui-i18n'
import { jsx } from '@instructure/emotion'

import { propTypes } from './props'
import type { DateInput2Props } from './props'
import type { FormMessage } from '@instructure/ui-form-field'
import type { Moment } from '@instructure/ui-i18n'

function parseDate(dateString: string): string {
  const date = new Date(dateString)
  // return empty string if not a valid date
  return isNaN(date.getTime()) ? '' : date.toISOString()
}

/**
---
category: components
---
**/
const DateInput2 = ({
  renderLabel,
  screenReaderLabels,
  isRequired = false,
  interaction = 'enabled',
  size = 'medium',
  isInline = false,
  value,
  messages,
  width,
  onChange,
  onBlur,
  withYearPicker,
  onRequestValidateDate,
  invalidDateErrorMessage,
  locale,
  timezone,
  placeholder,
  ...rest
}: DateInput2Props) => {
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [inputMessages, setInputMessages] = useState<FormMessage[]>(
    messages || []
  )
  const [showPopover, setShowPopover] = useState<boolean>(false)
  const localeContext = useContext(ApplyLocaleContext)

  useEffect(() => {
    // when `value` is changed, validation runs again and removes the error message if validation passes
    // but it's NOT adding error message if validation fails for better UX
    validateInput(true)
  }, [value])

  useEffect(() => {
    setInputMessages(messages || [])
  }, [messages])

  const handleInputChange = (e: SyntheticEvent, value: string) => {
    onChange?.(e, value)
    // blur event formats the input which should trigger parsing
    if (e.type !== 'blur') {
      setSelectedDate(parseDate(value))
    }
  }

  const handleDateSelected = (
    dateString: string,
    _momentDate: Moment,
    e: SyntheticEvent
  ) => {
    const formattedDate = new Date(dateString).toLocaleDateString(getLocale(), {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
      timeZone: getTimezone()
    })
    handleInputChange(e, formattedDate)
    setSelectedDate(dateString)
    setShowPopover(false)
    onRequestValidateDate?.(dateString, true)
  }

  // onlyRemoveError is used to remove the error msg immediately when the user inputs a valid date (and don't wait for blur event)
  const validateInput = (onlyRemoveError = false): boolean => {
    // don't validate empty input
    if (!value || parseDate(value) || selectedDate) {
      setInputMessages(messages || [])
      return true
    }
    // only show error if there is no user provided validation callback
    if (
      !onlyRemoveError &&
      typeof invalidDateErrorMessage === 'string' &&
      !onRequestValidateDate
    ) {
      setInputMessages([
        {
          type: 'error',
          text: invalidDateErrorMessage
        }
      ])
    }

    return false
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
    // default to the system's timezone
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  }

  const handleBlur = (e: SyntheticEvent) => {
    const isInputValid = validateInput(false)
    if (isInputValid && selectedDate) {
      const formattedDate = new Date(selectedDate).toLocaleDateString(
        getLocale(),
        {
          month: 'long',
          year: 'numeric',
          day: 'numeric',
          timeZone: getTimezone()
        }
      )
      handleInputChange(e, formattedDate)
    }
    onRequestValidateDate?.(value, isInputValid)
    onBlur?.(e)
  }

  return (
    <TextInput
      {...passthroughProps(rest)}
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
              screenReaderLabel={screenReaderLabels.calendarIcon}
              shape="circle"
              size={size}
              interaction={interaction}
            >
              <IconCalendarMonthLine />
            </IconButton>
          }
          isShowingContent={showPopover}
          onShowContent={() => setShowPopover(true)}
          onHideContent={() => setShowPopover(false)}
          on="click"
          shouldContainFocus
          shouldReturnFocus
          shouldCloseOnDocumentClick
        >
          <Calendar
            withYearPicker={withYearPicker}
            onDateSelected={handleDateSelected}
            selectedDate={selectedDate}
            visibleMonth={selectedDate}
            locale={locale}
            timezone={timezone}
            role="listbox"
            renderNextMonthButton={
              <IconButton
                size="small"
                withBackground={false}
                withBorder={false}
                renderIcon={<IconArrowOpenEndSolid color="primary" />}
                screenReaderLabel={screenReaderLabels.nextMonthButton}
              />
            }
            renderPrevMonthButton={
              <IconButton
                size="small"
                withBackground={false}
                withBorder={false}
                renderIcon={<IconArrowOpenStartSolid color="primary" />}
                screenReaderLabel={screenReaderLabels.prevMonthButton}
              />
            }
          />
        </Popover>
      }
    />
  )
}

DateInput2.propTypes = propTypes

export default DateInput2
export { DateInput2 }
