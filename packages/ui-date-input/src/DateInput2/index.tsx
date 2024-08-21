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

function parseLocaleDate(dateString: string = '', locale: string): Date | null {
  const localeDate = new Intl.DateTimeFormat(locale).formatToParts(new Date())

  // Split string on '.', whitespace, '/', ',' or '-' using regex: /[.\s/.-]+/.
  // The '+' allows splitting on consecutive delimiters.
  const splitDate = dateString.split(/[,.\s/.-]+/)

  if (splitDate.length !== 3) return null

  let index = 0
  let day: number | undefined, month: number | undefined, year: number | undefined
  localeDate.forEach((part) => {
    if (part.type === 'month') {
      month = parseInt(splitDate[index], 10)
      index++
    } else if (part.type === 'day') {
      day = parseInt(splitDate[index], 10)
      index++
    } else if (part.type === 'year') {
      year = parseInt(splitDate[index], 10)
      index++
    }
  })

  // sensible year limitations
  if (!year || !month || !day || year < 1000 || year > 9999) return null

  const date = new Date(`${year}-${month}-${day}`)

  if (isNaN(date.getTime())) return null

  return date
}

/**
---
category: components
---

@module experimental
**/
const DateInput2 = ({
  renderLabel,
  screenReaderLabels,
  isRequired = false,
  interaction = 'enabled',
  isInline = false,
  value,
  messages,
  width,
  onChange,
  onBlur,
  withYearPicker,
  invalidDateErrorMessage,
  locale,
  timezone,
  placeholder,
  dateFormat,
  onRequestValidateDate,
  // margin, TODO enable this prop
  ...rest
}: DateInput2Props) => {
  const localeContext = useContext(ApplyLocaleContext)

  const getLocale = () => {
    if (locale) {
      return locale
    } else if (localeContext.locale) {
      return localeContext.locale
    }
    // default to the system's locale
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

  const [inputMessages, setInputMessages] = useState<FormMessage[]>(
    messages || []
  )
  const [showPopover, setShowPopover] = useState<boolean>(false)

  useEffect(() => {
    setInputMessages(messages || [])
  }, [messages])

  const parseDate = (dateString: string): [string, string] => {
    let date: Date | null = null
    if (dateFormat) {
      if (typeof dateFormat === 'string') {
        // use dateFormat instead of the user locale
        date = parseLocaleDate(dateString, dateFormat)
      } else if (dateFormat.parser) {
        date = dateFormat.parser(dateString)
      }
    } else {
      // no dateFormat prop passed, use locale for formatting
      date = parseLocaleDate(dateString, getLocale())
    }
    return date ? [formatDate(date), date.toISOString()] : ['', '']
  }

  const formatDate = (date: Date): string => {
    if (typeof dateFormat === 'string') {
      // use dateFormat instead of the user locale
      return date.toLocaleDateString(dateFormat)
    } else if (dateFormat?.formatter) {
      return dateFormat.formatter(date)
    }
    // no dateFormat prop passed, use locale for formatting
    return date.toLocaleDateString(getLocale())
  }

  const handleInputChange = (e: SyntheticEvent, newValue: string) => {
    const [localeDate, utcIsoDate] = parseDate(newValue)
    if (localeDate) {
      setInputMessages(messages || [])
    }
    onChange?.(e, newValue, utcIsoDate)
  }

  const handleDateSelected = (
    dateString: string,
    _momentDate: Moment,
    e: SyntheticEvent
  ) => {
    setShowPopover(false)
    const newValue = formatDate(new Date(dateString))
    onChange?.(
      e,
      newValue,
      dateString
    )
    onRequestValidateDate?.(e, newValue, dateString)
  }

  const handleBlur = (e: SyntheticEvent) => {
    const [localeDate, utcIsoDate] = parseDate(value || '')
    if (localeDate) {
      if (localeDate !== value) {
        onChange?.(e, localeDate, utcIsoDate)
      }
    } else if (value && invalidDateErrorMessage) {
      setInputMessages([
        {type: 'error', text: invalidDateErrorMessage}
      ])
    }
    onRequestValidateDate?.(e, value || '', utcIsoDate)
    onBlur?.(e, value || '', utcIsoDate)
  }

  const selectedDate = parseDate(value || '')[1]
  return (
    <TextInput
      {...passthroughProps(rest)}
      // margin={'large'} TODO add this prop to TextInput
      renderLabel={renderLabel}
      onChange={handleInputChange}
      onBlur={handleBlur}
      isRequired={isRequired}
      value={value}
      placeholder={placeholder}
      width={width}
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
            locale={getLocale()}
            timezone={getTimezone()}
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
