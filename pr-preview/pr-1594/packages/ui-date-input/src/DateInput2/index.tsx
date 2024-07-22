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
import moment from 'moment-timezone'
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

function isValidDate(dateString: string): boolean {
  return !isNaN(new Date(dateString).getTime())
}

function isValidMomentDate(
  dateString: string,
  locale: string,
  timezone: string
): boolean {
  return moment
    .tz(
      dateString,
      [
        moment.ISO_8601,
        'llll',
        'LLLL',
        'lll',
        'LLL',
        'll',
        'LL',
        'l',
        'L'
      ],
      locale,
      true,
      timezone
    )
    .isValid()
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
    validateInput(true)
  }, [value])

  useEffect(() => {
    setInputMessages(messages || [])
  }, [messages])

  const handleInputChange = (e: SyntheticEvent, value: string) => {
    onChange?.(e, value)
  }

  const handleDateSelected = (
    dateString: string,
    _momentDate: any, // real type is Moment but used `any` to avoid importing the moment lib
    e: SyntheticEvent
  ) => {
    const formattedDate = new Date(dateString).toLocaleDateString(getLocale(), {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
      timeZone: getTimezone()
    })
    handleInputChange(e, formattedDate)
    setShowPopover(false)
  }

  const validateInput = (onlyRemoveError = false): boolean => {
    // TODO `isValidDate` and `isValidMomentDate` basically have the same functionality but the latter is a bit more strict (e.g.: `33` is only valid in `isValidMomentDate`)
    // in the future we should get rid of moment but currently Calendar is using it for validation too so we can only remove it simultaneously
    // otherwise DateInput could pass invalid dates to Calendar and break it
    if (
      (isValidDate(value || '') &&
        isValidMomentDate(value || '', getLocale(), getTimezone())) ||
      value === ''
    ) {
      setSelectedDate(value || '')
      setInputMessages(messages || [])
      return true
    }
    if (!onlyRemoveError) {
      setInputMessages([
        {
          type: 'error',
          text: invalidDateErrorMessage || '',
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
    onBlur?.(e)
    const isInputValid = validateInput(false)
    if (isInputValid && value) {
    const formattedDate = new Date(value).toLocaleDateString(getLocale(), {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
      timeZone: getTimezone()
    })
    handleInputChange(e, formattedDate)
    }
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
