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

function parseLocaleDate(
  dateString: string = '',
  locale: string,
  timeZone: string
): Date | null {
  // This function may seem complicated but it basically does one thing:
  //   Given a dateString, a locale and a timeZone. The dateString is assumed to be formatted according
  //   to the locale. So if the locale is `en-us` the dateString is expected to be in the format of M/D/YYYY.
  //   The dateString is also assumed to be in the given timeZone, so "1/1/2020" in "America/Los_Angeles" timezone is
  //   expected to be "2020-01-01T08:00:00.000Z" in UTC time.
  //   This function tries to parse the dateString taking these variables into account and return a javascript Date object
  //   that is adjusted to be in UTC.

  // Split string on '.', whitespace, '/', ',' or '-' using regex: /[.\s/.-]+/.
  // The '+' allows splitting on consecutive delimiters.
  // `.filter(Boolean)` is needed because some locales have a delimeter at the end (e.g.: hungarian dates are formatted as `2024. 09. 19.`)
  const splitDate = dateString.split(/[,.\s/.-]+/).filter(Boolean)

  // create a locale formatted new date to later extract the order and delimeter information
  const localeDate = new Intl.DateTimeFormat(locale).formatToParts(new Date())

  let index = 0
  let day: number | undefined,
    month: number | undefined,
    year: number | undefined
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

  // sensible limitations
  if (!year || !month || !day || year < 1000 || year > 9999) return null

  // create utc date from year, month (zero indexed) and day
  const date = new Date(Date.UTC(year, month - 1, day))

  if (date.getMonth() !== month - 1 || date.getDate() !== day) {
    // Check if the Date object adjusts the values. If it does, the input is invalid.
    return null
  }

  // Format date string in the provided timezone. The locale here is irrelevant, we only care about how to time is adjusted for the timezone.
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).formatToParts(date)

  // Extract the date and time parts from the formatted string
  const dateStringInTimezone: {
    [key: string]: number
  } = parts.reduce((acc, part) => {
    return part.type === 'literal'
      ? acc
      : {
          ...acc,
          [part.type]: part.value
        }
  }, {})

  // Create a date string in the format 'YYYY-MM-DDTHH:mm:ss'
  const dateInTimezone = `${dateStringInTimezone.year}-${dateStringInTimezone.month}-${dateStringInTimezone.day}T${dateStringInTimezone.hour}:${dateStringInTimezone.minute}:${dateStringInTimezone.second}`

  // Calculate time difference for timezone offset
  const timeDiff = new Date(dateInTimezone + 'Z').getTime() - date.getTime()
  const utcTime = new Date(date.getTime() - timeDiff)
  // Return the UTC Date corresponding to the time in the specified timezone
  return utcTime
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
    // don't set input messages if there is an internal error set already
    if (inputMessages.find((m) => m.text === invalidDateErrorMessage)) return

    setInputMessages(messages || [])
  }, [messages])

  useEffect(() => {
    const [, utcIsoDate] = parseDate(value)
    // clear error messages if date becomes valid
    if (utcIsoDate || !value) {
      setInputMessages(messages || [])
    }
  }, [value])

  const parseDate = (dateString: string = ''): [string, string] => {
    let date: Date | null = null
    if (dateFormat) {
      if (typeof dateFormat === 'string') {
        // use dateFormat instead of the user locale
        date = parseLocaleDate(dateString, dateFormat, getTimezone())
      } else if (dateFormat.parser) {
        date = dateFormat.parser(dateString)
      }
    } else {
      // no dateFormat prop passed, use locale for formatting
      date = parseLocaleDate(dateString, getLocale(), getTimezone())
    }
    return date ? [formatDate(date), date.toISOString()] : ['', '']
  }

  const formatDate = (date: Date): string => {
    // use formatter function if provided
    if (typeof dateFormat !== 'string' && dateFormat?.formatter) {
      return dateFormat.formatter(date)
    }
    // if dateFormat set to a locale, use that, otherwise default to the user's locale
    return date.toLocaleDateString(
      typeof dateFormat === 'string' ? dateFormat : getLocale(),
      { timeZone: getTimezone(), calendar: 'gregory', numberingSystem: 'latn' }
    )
  }

  const getDateFromatHint = () => {
    const exampleDate = new Date('2024-09-01')
    const formattedDate = formatDate(exampleDate)

    // Create a regular expression to find the exact match of the number
    const regex = (n: string) => {
      return new RegExp(`(?<!\\d)0*${n}(?!\\d)`, 'g')
    }

    // Replace the matched number with the same number of dashes
    const year = `${exampleDate.getFullYear()}`
    const month = `${exampleDate.getMonth() + 1}`
    const day = `${exampleDate.getDate()}`
    return formattedDate
      .replace(regex(year), (match) => 'Y'.repeat(match.length))
      .replace(regex(month), (match) => 'M'.repeat(match.length))
      .replace(regex(day), (match) => 'D'.repeat(match.length))
  }

  const handleInputChange = (e: SyntheticEvent, newValue: string) => {
    const [, utcIsoDate] = parseDate(newValue)
    onChange?.(e, newValue, utcIsoDate)
  }

  const handleDateSelected = (
    dateString: string,
    _momentDate: Moment,
    e: SyntheticEvent
  ) => {
    setShowPopover(false)
    const newValue = formatDate(new Date(dateString))
    onChange?.(e, newValue, dateString)
    onRequestValidateDate?.(e, newValue, dateString)
  }

  const handleBlur = (e: SyntheticEvent) => {
    const [localeDate, utcIsoDate] = parseDate(value)
    if (localeDate) {
      if (localeDate !== value) {
        onChange?.(e, localeDate, utcIsoDate)
      }
    } else if (value && invalidDateErrorMessage) {
      setInputMessages([{ type: 'error', text: invalidDateErrorMessage }])
    }
    onRequestValidateDate?.(e, value || '', utcIsoDate)
    onBlur?.(e, value || '', utcIsoDate)
  }

  const selectedDate = parseDate(value)[1]
  return (
    <TextInput
      {...passthroughProps(rest)}
      // margin={'large'} TODO add this prop to TextInput
      renderLabel={renderLabel}
      onChange={handleInputChange}
      onBlur={handleBlur}
      isRequired={isRequired}
      value={value}
      placeholder={placeholder ?? getDateFromatHint()}
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
