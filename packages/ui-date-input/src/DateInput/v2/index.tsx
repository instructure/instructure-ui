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

import { useState, useEffect, useMemo, forwardRef, ForwardedRef } from 'react'
import type { SyntheticEvent } from 'react'
import { Calendar } from '@instructure/ui-calendar/latest'
import { IconButton } from '@instructure/ui-buttons/latest'
import {
  CalendarInstUIIcon,
  ChevronLeftInstUIIcon,
  ChevronRightInstUIIcon
} from '@instructure/ui-icons'
import { Popover } from '@instructure/ui-popover/latest'
import { TextInput } from '@instructure/ui-text-input/latest'
import { callRenderProp, passthroughProps } from '@instructure/ui-react-utils'
import { getLocale, getTimezone } from '@instructure/ui-i18n'

import type { DateInputProps } from './props'
import type { FormMessage } from '@instructure/ui-form-field/latest'
import type { Moment } from '@instructure/ui-i18n'

// Single source of truth for parsing/formatting/hint generation. Forcing
// `gregory` + `latn` keeps the typed-input contract predictable: the parser
// only handles proleptic Gregorian with Latin digits, so the formatter must
// produce the same. `2-digit` month/day matches the MM/DD/YYYY mental model
// users have for date-input UIs.
const FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  calendar: 'gregory',
  numberingSystem: 'latn'
}

// Some RTL locales inject U+200E / U+200F / U+061C between formatted parts;
// strip them so the split regex doesn't have to care.
const stripBidiMarks = (s: string): string =>
  s.replace(/[\u200e\u200f\u061c]/g, '')

const isValidDateParts = (
  year: number,
  month: number,
  day: number
): boolean => {
  if (year < 1000 || year > 9999) return false
  if (month < 1 || month > 12) return false
  if (day < 1 || day > 31) return false
  // Reject Feb 30 and similar by checking the Date didn't roll over.
  const d = new Date(Date.UTC(year, month - 1, day))
  return (
    d.getUTCFullYear() === year &&
    d.getUTCMonth() === month - 1 &&
    d.getUTCDate() === day
  )
}

function parseLocaleDate(
  dateString: string,
  locale: string,
  timeZone: string
): Date | null {
  const cleaned = stripBidiMarks(dateString).trim()
  if (!cleaned) return null

  // Split on whitespace, comma, period, slash, or dash. `+` collapses
  // consecutive delimiters; `.filter(Boolean)` drops empty leading/trailing
  // segments (e.g. Hungarian "2024. 09. 19.").
  const segments = cleaned.split(/[\s,./-]+/).filter(Boolean)
  if (segments.length !== 3) return null
  if (!segments.every((s) => /^\d+$/.test(s))) return null

  // Walk the locale's part order to assign year / month / day positions.
  const localeParts = new Intl.DateTimeFormat(
    locale,
    FORMAT_OPTIONS
  ).formatToParts(new Date())

  let i = 0
  let year: number | undefined
  let month: number | undefined
  let day: number | undefined
  for (const part of localeParts) {
    if (part.type === 'year') year = parseInt(segments[i++], 10)
    else if (part.type === 'month') month = parseInt(segments[i++], 10)
    else if (part.type === 'day') day = parseInt(segments[i++], 10)
  }
  if (year === undefined || month === undefined || day === undefined) {
    return null
  }
  if (!isValidDateParts(year, month, day)) return null

  // Find the UTC instant that represents local midnight in `timeZone`.
  // We construct UTC midnight, ask Intl what that instant looks like in the
  // target zone, and shift by the resulting offset.
  const utcMidnight = new Date(Date.UTC(year, month - 1, day))
  const zonedParts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).formatToParts(utcMidnight)

  const z: Record<string, string> = {}
  for (const p of zonedParts) {
    if (p.type !== 'literal') z[p.type] = p.value
  }
  const zonedAsUTC = new Date(
    `${z.year}-${z.month}-${z.day}T${z.hour}:${z.minute}:${z.second}Z`
  )
  const offset = zonedAsUTC.getTime() - utcMidnight.getTime()
  return new Date(utcMidnight.getTime() - offset)
}

function formatLocaleDate(
  date: Date,
  locale: string,
  timeZone: string
): string {
  return date.toLocaleDateString(locale, { ...FORMAT_OPTIONS, timeZone })
}

function buildLocaleHint(locale: string): string {
  const example = new Date(Date.UTC(2024, 0, 1))
  const parts = new Intl.DateTimeFormat(locale, FORMAT_OPTIONS).formatToParts(
    example
  )
  return parts
    .map((p) => {
      if (p.type === 'year') return 'YYYY'
      if (p.type === 'month') return p.value.length === 2 ? 'MM' : 'M'
      if (p.type === 'day') return p.value.length === 2 ? 'DD' : 'D'
      return p.value
    })
    .join('')
}

function buildCustomFormatterHint(
  formatter: (date: Date) => string
): string {
  // Best-effort hint for consumer-supplied formatters: format an example date
  // chosen so its digits don't overlap (year=2024 has no '9' or '1'), then
  // replace numeric runs with Y/M/D.
  const formatted = formatter(new Date(Date.UTC(2024, 8, 1)))
  const re = (n: string) => new RegExp(`(?<!\\d)0*${n}(?!\\d)`, 'g')
  return formatted
    .replace(re('2024'), (m) => 'Y'.repeat(m.length))
    .replace(re('9'), (m) => 'M'.repeat(m.length))
    .replace(re('1'), (m) => 'D'.repeat(m.length))
}

/**
---
category: components
---
**/
const DateInput = forwardRef(
  (
    {
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
      disabledDates,
      renderCalendarIcon,
      margin,
      inputRef,
      ...rest
    }: DateInputProps,
    ref: ForwardedRef<TextInput>
  ) => {
    const userLocale = locale || getLocale()
    const userTimezone = timezone || getTimezone()

    const formatDate = (date: Date): string => {
      if (typeof dateFormat !== 'string' && dateFormat?.formatter) {
        return dateFormat.formatter(date)
      }
      return formatLocaleDate(
        date,
        typeof dateFormat === 'string' ? dateFormat : userLocale,
        userTimezone
      )
    }

    const parseDate = (dateString: string = ''): [string, string] => {
      let date: Date | null = null
      if (typeof dateFormat === 'string') {
        date = parseLocaleDate(dateString, dateFormat, userTimezone)
      } else if (dateFormat?.parser) {
        date = dateFormat.parser(dateString)
      } else {
        date = parseLocaleDate(dateString, userLocale, userTimezone)
      }
      return date ? [formatDate(date), date.toISOString()] : ['', '']
    }

    const [hasInternalError, setHasInternalError] = useState(false)
    const [showPopover, setShowPopover] = useState(false)

    // Clear internal error as soon as the value becomes empty or parses
    // cleanly. We don't need to mirror `messages` into local state — the
    // parent prop is rendered directly below.
    useEffect(() => {
      if (!value) {
        setHasInternalError(false)
        return
      }
      const [, utcIsoDate] = parseDate(value)
      if (utcIsoDate) setHasInternalError(false)
    }, [value])

    const placeholderHint = useMemo(() => {
      if (typeof dateFormat !== 'string' && dateFormat?.formatter) {
        return buildCustomFormatterHint(dateFormat.formatter)
      }
      return buildLocaleHint(
        typeof dateFormat === 'string' ? dateFormat : userLocale
      )
    }, [dateFormat, userLocale])

    const displayedMessages: FormMessage[] =
      hasInternalError && invalidDateErrorMessage !== undefined
        ? [
            ...(messages || []),
            { type: 'error', text: invalidDateErrorMessage }
          ]
        : messages || []

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
        if (localeDate !== value) onChange?.(e, localeDate, utcIsoDate)
      } else if (value && invalidDateErrorMessage !== undefined) {
        setHasInternalError(true)
      }
      onRequestValidateDate?.(e, value || '', utcIsoDate)
      onBlur?.(e, value || '', utcIsoDate)
    }

    const selectedDate = useMemo(
      () => parseDate(value)[1],
      [value, dateFormat, userLocale, userTimezone]
    )

    return (
      <TextInput
        {...passthroughProps(rest)}
        ref={ref}
        inputRef={inputRef}
        renderLabel={renderLabel}
        aria-label={callRenderProp(renderLabel)}
        onChange={handleInputChange}
        onBlur={handleBlur}
        isRequired={isRequired}
        value={value}
        placeholder={placeholder ?? placeholderHint}
        width={width}
        display={isInline ? 'inline-block' : 'block'}
        messages={displayedMessages}
        interaction={interaction}
        margin={margin}
        renderAfterInput={
          <Popover
            renderTrigger={
              <IconButton
                size="condensedMedium"
                withBackground={false}
                withBorder={false}
                screenReaderLabel={screenReaderLabels.calendarIcon}
                interaction={interaction}
              >
                {renderCalendarIcon ? (
                  callRenderProp(renderCalendarIcon)
                ) : (
                  <CalendarInstUIIcon color="baseColor" />
                )}
              </IconButton>
            }
            isShowingContent={showPopover}
            onShowContent={() => setShowPopover(true)}
            onHideContent={() => setShowPopover(false)}
            on="click"
            shouldContainFocus
            shouldReturnFocus
            shouldCloseOnDocumentClick
            screenReaderLabel={screenReaderLabels.datePickerDialog}
          >
            <Calendar
              withYearPicker={withYearPicker}
              onDateSelected={handleDateSelected}
              selectedDate={selectedDate}
              disabledDates={disabledDates}
              visibleMonth={selectedDate}
              locale={userLocale}
              timezone={userTimezone}
              renderNextMonthButton={
                <IconButton
                  size="small"
                  withBackground={false}
                  withBorder={false}
                  renderIcon={<ChevronRightInstUIIcon color="baseColor" />}
                  screenReaderLabel={screenReaderLabels.nextMonthButton}
                />
              }
              renderPrevMonthButton={
                <IconButton
                  size="small"
                  withBackground={false}
                  withBorder={false}
                  renderIcon={<ChevronLeftInstUIIcon color="baseColor" />}
                  screenReaderLabel={screenReaderLabels.prevMonthButton}
                />
              }
            />
          </Popover>
        }
      />
    )
  }
)

DateInput.displayName = 'DateInput'

export default DateInput
export { DateInput }
