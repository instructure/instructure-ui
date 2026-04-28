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

// Pure timezone-aware date math used by DateTimeInput v2. No React, no Moment.
// Candidate to promote to @instructure/ui-i18n once a second consumer needs it.

export type WallClock = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
}

export const partsInTz = (date: Date, timeZone: string): WallClock => {
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
  const get = (t: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === t)?.value ?? 0)
  // Some runtimes report midnight as "24" rather than "00".
  const hour = get('hour') === 24 ? 0 : get('hour')
  return {
    year: get('year'),
    month: get('month'),
    day: get('day'),
    hour,
    minute: get('minute'),
    second: get('second')
  }
}

export const wallClockInTzToUtc = (wall: WallClock, timeZone: string): Date => {
  const naiveUtc = Date.UTC(
    wall.year,
    wall.month - 1,
    wall.day,
    wall.hour,
    wall.minute,
    wall.second
  )
  const rendered = partsInTz(new Date(naiveUtc), timeZone)
  const renderedUtc = Date.UTC(
    rendered.year,
    rendered.month - 1,
    rendered.day,
    rendered.hour,
    rendered.minute,
    rendered.second
  )
  return new Date(naiveUtc - (renderedUtc - naiveUtc))
}

export const sameDayInTz = (a: Date, b: Date, timeZone: string): boolean => {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
  return fmt.format(a) === fmt.format(b)
}

// Returns a UTC ISO string with the date components from `dateIso` and the
// time-of-day from `timeIso`, both interpreted in `timeZone`.
export const combineDateAndTime = (
  dateIso: string,
  timeIso: string,
  timeZone: string
): string => {
  const dateWall = partsInTz(new Date(dateIso), timeZone)
  const timeWall = partsInTz(new Date(timeIso), timeZone)
  return wallClockInTzToUtc(
    {
      year: dateWall.year,
      month: dateWall.month,
      day: dateWall.day,
      hour: timeWall.hour,
      minute: timeWall.minute,
      second: 0
    },
    timeZone
  ).toISOString()
}

export const setWallTime = (
  iso: string,
  hour: number,
  minute: number,
  timeZone: string
): string => {
  const wall = partsInTz(new Date(iso), timeZone)
  return wallClockInTzToUtc(
    { ...wall, hour, minute, second: 0 },
    timeZone
  ).toISOString()
}

// Parse a consumer-supplied ISO 8601 string. Strings carrying an explicit
// timezone (`Z` or `±HH:MM`) are parsed by `Date`; strings without an offset
// have their components interpreted as wall-clock in `timeZone` (matches v1).
// Anything that isn't ISO-shaped is rejected.
const isoWithOffset = /(?:Z|[+-]\d{2}:?\d{2})$/
const isoNoOffset =
  /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2})(?::(\d{2}))?(?:\.\d{1,9})?)?$/

export const parseIsoInTz = (raw: string, timeZone: string): Date | null => {
  if (isoWithOffset.test(raw)) {
    const d = new Date(raw)
    return Number.isNaN(d.getTime()) ? null : d
  }
  const m = raw.match(isoNoOffset)
  if (!m) return null
  const [, y, mo, d, h, min, s] = m
  return wallClockInTzToUtc(
    {
      year: Number(y),
      month: Number(mo),
      day: Number(d),
      hour: Number(h ?? 0),
      minute: Number(min ?? 0),
      second: Number(s ?? 0)
    },
    timeZone
  )
}

// Default `messageFormat` for DateTimeInput v2 — long localized weekday +
// date + short time, e.g. "Monday, May 1, 2017 1:30 PM" in en-US,
// "lundi 1 mai 2017 13:30" in fr-FR.
export const defaultMessageFormat = (
  date: Date,
  locale: string,
  timezone: string
): string => {
  const dateStr = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: timezone,
    calendar: 'gregory',
    numberingSystem: 'latn'
  }).format(date)
  const timeStr = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: timezone,
    calendar: 'gregory',
    numberingSystem: 'latn'
  }).format(date)
  return `${dateStr} ${timeStr}`
}
