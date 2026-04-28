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

import { useEffect, useRef, useState } from 'react'
import type { SyntheticEvent } from 'react'
import { getLocale, getTimezone } from '@instructure/ui-i18n'
import { FormFieldGroup } from '@instructure/ui-form-field/latest'
import type { FormMessage } from '@instructure/ui-form-field/latest'
import { DateInput } from '@instructure/ui-date-input/latest'
import { TimeSelect } from '@instructure/ui-time-select/latest'

import type { DateTimeInputProps } from './props'
import { allowedProps } from './props'
import {
  combineDateAndTime,
  defaultMessageFormat,
  parseIsoInTz,
  sameDayInTz,
  setWallTime
} from './utils'

type Snapshot = {
  iso: string | undefined
  dateInputText: string
  timeSelectValue: string | undefined
  message: FormMessage | undefined
}

const emptySnapshot: Snapshot = {
  iso: undefined,
  dateInputText: '',
  timeSelectValue: '',
  message: undefined
}

const DateTimeInput = (incomingProps: DateTimeInputProps) => {
  const props = {
    layout: 'inline' as const,
    colSpacing: 'medium' as const,
    rowSpacing: 'small' as const,
    timeStep: 30 as const,
    showMessages: true,
    messageFormat: defaultMessageFormat,
    isRequired: false,
    allowNonStepInput: false,
    ...incomingProps
  }

  const locale = props.locale ?? getLocale()
  const timezone = props.timezone ?? getTimezone()

  const formatMessage = (iso: string): string =>
    props.messageFormat(new Date(iso), locale, timezone)

  const formatDateInput = (iso: string): string => {
    const date = new Date(iso)
    if (typeof props.dateFormat !== 'string' && props.dateFormat?.formatter) {
      return props.dateFormat.formatter(date)
    }
    return date.toLocaleDateString(
      typeof props.dateFormat === 'string' ? props.dateFormat : locale,
      { timeZone: timezone, calendar: 'gregory', numberingSystem: 'latn' }
    )
  }

  const isDisabled = (iso: string): boolean => {
    const { disabledDates } = props
    if (!disabledDates) return false
    if (typeof disabledDates === 'function') return disabledDates(iso)
    const target = new Date(iso)
    return disabledDates.some((d) => sameDayInTz(target, new Date(d), timezone))
  }

  const buildErrorMessage = (rawValue: string): FormMessage | undefined => {
    const { disabledDateTimeMessage, invalidDateTimeMessage } = props
    let text =
      typeof disabledDateTimeMessage === 'function'
        ? disabledDateTimeMessage(rawValue)
        : disabledDateTimeMessage
    if (!text) {
      text =
        typeof invalidDateTimeMessage === 'function'
          ? invalidDateTimeMessage(rawValue)
          : invalidDateTimeMessage
    }
    return text ? { type: 'error', text } : undefined
  }

  // Returns `iso` unchanged if `initialTimeForNewDate` is malformed.
  const applyInitialTime = (iso: string): string => {
    const initial = props.initialTimeForNewDate
    if (!initial) return iso
    const hour = Number(initial.slice(0, 2))
    const minute = Number(initial.slice(3, 5))
    if (Number.isNaN(hour) || Number.isNaN(minute)) {
      console.error(
        'Warning: [DateTimeInput] initialTimeForNewDate prop is not in the correct format. Please use HH:MM format.'
      )
      return iso
    }
    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
      console.error(
        'Warning: [DateTimeInput] 0 <= hour < 24 and 0 <= minute < 60 for initialTimeForNewDate prop.'
      )
      return iso
    }
    return setWallTime(iso, hour, minute, timezone)
  }

  const snapshotForValidIso = (iso: string): Snapshot => {
    const errorMsg = isDisabled(iso) ? buildErrorMessage(iso) : undefined
    return {
      iso,
      dateInputText: formatDateInput(iso),
      timeSelectValue: iso,
      message: errorMsg ?? { type: 'success', text: formatMessage(iso) }
    }
  }

  const snapshotFromExternalValue = (raw: string | undefined): Snapshot => {
    if (!raw) return emptySnapshot
    const parsed = parseIsoInTz(raw, timezone)
    if (!parsed) {
      // Surface the raw text so an on-blur error can be raised; clear the
      // time so a stale TimeSelect value doesn't survive an external reset.
      return {
        ...emptySnapshot,
        dateInputText: raw,
        timeSelectValue: undefined
      }
    }
    return snapshotForValidIso(parsed.toISOString())
  }

  // `utcDateString` is empty when the typed text didn't parse — DateInput v2's
  // locale parser is the sole authority on what's accepted.
  const snapshotFromDateChange = (
    utcDateString: string,
    rawText: string,
    prev: Snapshot
  ): Snapshot => {
    if (!utcDateString) {
      return {
        iso: undefined,
        dateInputText: rawText,
        timeSelectValue: prev.timeSelectValue,
        message: undefined
      }
    }
    const merged = prev.timeSelectValue
      ? combineDateAndTime(utcDateString, prev.timeSelectValue, timezone)
      : applyInitialTime(utcDateString)
    return snapshotForValidIso(merged)
  }

  const snapshotFromTimeChange = (
    timeIso: string | undefined,
    prev: Snapshot
  ): Snapshot => {
    if (!timeIso) {
      // Clearing the time wipes the selection (matches v1 behavior).
      return emptySnapshot
    }
    if (prev.iso) {
      const merged = combineDateAndTime(prev.iso, timeIso, timezone)
      return { ...snapshotForValidIso(merged), timeSelectValue: timeIso }
    }
    return {
      iso: undefined,
      dateInputText: prev.dateInputText,
      timeSelectValue: timeIso,
      message: undefined
    }
  }

  const ensureRequiredOrInvalidError = (next: Snapshot): Snapshot => {
    const dateText = next.dateInputText
    const needsError =
      !next.iso && (props.isRequired || (dateText && dateText.length > 0))
    if (!needsError) return next
    const text =
      typeof props.invalidDateTimeMessage === 'function'
        ? props.invalidDateTimeMessage(dateText ?? '')
        : props.invalidDateTimeMessage
    return text ? { ...next, message: { type: 'error', text } } : next
  }

  const [snapshot, setSnapshot] = useState<Snapshot>(() =>
    snapshotFromExternalValue(props.value ?? props.defaultValue)
  )

  // Skip the first effect run so the initializer above isn't redone.
  const isFirstRun = useRef(true)
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    setSnapshot(snapshotFromExternalValue(props.value ?? props.defaultValue))
  }, [
    props.value,
    props.defaultValue,
    locale,
    timezone,
    props.dateFormat,
    props.messageFormat,
    props.invalidDateTimeMessage
  ])

  useEffect(() => {
    props.reset?.(() => setSnapshot(emptySnapshot))
  }, [])

  // Read prior state from a ref instead of via setState updaters so we can
  // call props.onChange after committing — keeping side effects out of state
  // updaters (which React may invoke twice under StrictMode).
  const snapshotRef = useRef(snapshot)
  snapshotRef.current = snapshot

  const handleDateTextChange = (
    _event: SyntheticEvent,
    inputValue: string,
    _utcDateString: string
  ) => {
    setSnapshot({ ...snapshotRef.current, dateInputText: inputValue })
  }

  const handleDateValidated = (
    event: SyntheticEvent,
    inputValue: string,
    utcDateString: string
  ) => {
    const prev = snapshotRef.current
    const next = ensureRequiredOrInvalidError(
      snapshotFromDateChange(utcDateString, inputValue, prev)
    )
    setSnapshot(next)
    if (prev.iso !== next.iso) props.onChange?.(event, next.iso)
  }

  const handleTimeChange = (
    event: SyntheticEvent,
    option: { value?: string; inputText: string }
  ) => {
    const prev = snapshotRef.current
    const next = ensureRequiredOrInvalidError(
      snapshotFromTimeChange(option.value, prev)
    )
    setSnapshot(next)
    if (prev.iso !== next.iso) props.onChange?.(event, next.iso)
  }

  const handleBlur = (event: SyntheticEvent) => {
    props.onBlur?.(event)
  }

  const allMessages: FormMessage[] = [
    ...(props.showMessages && snapshot.message ? [snapshot.message] : []),
    ...(props.messages ?? [])
  ]
  const hasError = allMessages.some(
    (m) => m.type === 'error' || m.type === 'newError'
  )
  // Sub-components only need a sentinel error to pick up the red outline /
  // required asterisk styling — the actual text lives on the FormFieldGroup.
  const subComponentMessages: FormMessage[] = hasError
    ? [{ type: 'error', text: '' }]
    : []

  return (
    <FormFieldGroup
      description={props.description}
      layout={props.layout}
      rowSpacing={props.rowSpacing}
      colSpacing={props.colSpacing}
      vAlign="top"
      isGroup={false}
      messages={allMessages}
      data-cid="DateTimeInput"
    >
      <DateInput
        renderLabel={props.dateRenderLabel}
        screenReaderLabels={props.screenReaderLabels}
        withYearPicker={props.withYearPicker}
        value={snapshot.dateInputText}
        onChange={handleDateTextChange}
        onRequestValidateDate={handleDateValidated}
        onBlur={handleBlur}
        inputRef={props.dateInputRef}
        placeholder={props.datePlaceholder}
        isRequired={props.isRequired}
        messages={subComponentMessages}
        interaction={props.interaction}
        locale={props.locale}
        timezone={props.timezone}
        disabledDates={props.disabledDates}
        dateFormat={props.dateFormat}
      />
      <TimeSelect
        value={snapshot.timeSelectValue}
        onChange={handleTimeChange}
        placeholder={props.timePlaceholder}
        onBlur={handleBlur}
        renderLabel={props.timeRenderLabel}
        locale={props.locale}
        format={props.timeFormat}
        step={props.timeStep}
        timezone={props.timezone}
        inputRef={props.timeInputRef}
        interaction={props.interaction}
        allowNonStepInput={props.allowNonStepInput}
        isRequired={props.isRequired}
        messages={subComponentMessages}
      />
    </FormFieldGroup>
  )
}

DateTimeInput.allowedProps = allowedProps

export default DateTimeInput
export { DateTimeInput }
