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
import '@testing-library/jest-dom'
import { expect } from 'vitest'
import { DateTime } from '../DateTime'

const {
  now,
  isValid,
  browserTimeZone,
  parse,
  toLocaleString,
  getFirstDayOfWeek,
  getLocalDayNamesOfTheWeek
} = DateTime

describe('DateTime', () => {
  const timezone = 'America/Halifax' // -3
  const locale = 'en'

  it('checks params', () => {
    let whoops = false
    try {
      // @ts-expect-error intentionally wrong
      now()
    } catch (ex) {
      whoops = true
    } finally {
      expect(whoops).toBe(true)
    }
    whoops = false
    try {
      // @ts-expect-error intentionally wrong
      now(locale)
    } catch (ex) {
      whoops = true
    } finally {
      expect(whoops).toBe(true)
    }
  })

  it('knows when now is', () => {
    // not much of a test, but I need it for coverage stats
    const result = now(locale, timezone)
    expect(result).toBeDefined()
  })

  it("can figure out the browser's timezone", () => {
    const result = browserTimeZone()
    expect(result).toBeDefined()
  })

  it('validates', () => {
    expect(isValid('2018-04-15T23:30:00Z')).toBe(true)
    expect(isValid('2018-04-15T23:30')).toBe(true)
    expect(isValid('2018-04-15')).toBe(true)
  })

  it('parses iso8601', () => {
    const result = parse(
      '2018-04-15T20:30:00-03:00',
      locale,
      timezone
    ).toISOString()
    expect(result).toEqual('2018-04-15T23:30:00.000Z')
  })

  it('parses llll', () => {
    const result = parse(
      'Sun, Apr 15, 2018 8:30 PM',
      locale,
      timezone
    ).toISOString()
    expect(result).toEqual('2018-04-15T23:30:00.000Z')
  })

  it('parses LLLL', () => {
    const result = parse(
      'Sunday, April 15, 2018 8:30 PM',
      locale,
      timezone
    ).toISOString()
    expect(result).toEqual('2018-04-15T23:30:00.000Z')
  })

  it('parses lll', () => {
    const result = parse('Apr 15, 2018 8:30 PM', locale, timezone).toISOString()
    expect(result).toEqual('2018-04-15T23:30:00.000Z')
  })

  it('parses LLL', () => {
    const result = parse(
      'April 15, 2018 8:30 PM',
      locale,
      timezone
    ).toISOString()
    expect(result).toEqual('2018-04-15T23:30:00.000Z')
  })

  it('parses ll', () => {
    const result = parse('Apr 15, 2018', locale, timezone).toISOString()
    expect(result).toEqual('2018-04-15T03:00:00.000Z')
  })

  it('parses LL', () => {
    const result = parse('April 15, 2018', locale, timezone).toISOString()
    expect(result).toEqual('2018-04-15T03:00:00.000Z')
  })

  it('parses l', () => {
    const result = parse('4/15/2018', locale, timezone).toISOString()
    expect(result).toEqual('2018-04-15T03:00:00.000Z')
  })

  it('parses L', () => {
    const result = parse('04/15/2018', locale, timezone).toISOString()
    expect(result).toEqual('2018-04-15T03:00:00.000Z')
  })

  it('parses French L', () => {
    const result = parse('15/04/2018', 'fr', timezone).toISOString()
    expect(result).toEqual('2018-04-15T03:00:00.000Z')
  })

  it('parses French LL', () => {
    const result = parse('15 Avril, 2018', 'fr', timezone).toISOString()
    expect(result).toEqual('2018-04-15T03:00:00.000Z')
  })

  it('returns localized string', () => {
    let result = toLocaleString('2018-04-15T13:00Z', 'en', 'UTC', 'LLL')
    expect(result).toEqual('April 15, 2018 1:00 PM')
    result = toLocaleString('2018-04-15T13:00Z', 'fr', 'UTC', 'LLL')
    expect(result).toEqual('15 avril 2018 13:00')
    // iso8601 in given timezone
    result = toLocaleString('2018-04-15T13:00Z', 'fr', 'America/Halifax') // -3
    expect(result).toEqual('2018-04-15T10:00:00.000-03:00')
  })

  it('calculates the first day of the week', () => {
    // normal case
    const d11 = DateTime.parse('2021-09-15T20:30:00Z', 'hu-hu', 'UTC')
    expect(getFirstDayOfWeek(d11).date()).toEqual(13)
    const d12 = DateTime.parse('2021-09-15T20:30:00Z', 'en-us', 'UTC')
    expect(getFirstDayOfWeek(d12).date()).toEqual(12)
    // date wraps month/year
    const d21 = DateTime.parse('2022-01-01T20:30:00Z', 'hu-hu', 'UTC')
    expect(getFirstDayOfWeek(d21).date()).toEqual(27)
    const d22 = DateTime.parse('2022-01-01T20:30:00Z', 'en-us', 'UTC')
    expect(getFirstDayOfWeek(d22).date()).toEqual(26)

    // Monday
    const d31 = DateTime.parse('2021-12-05T20:30:00Z', 'hu-hu', 'UTC')
    expect(getFirstDayOfWeek(d31).date()).toEqual(29)
    // Sunday
    const d32 = DateTime.parse('2021-12-05T20:30:00Z', 'en-us', 'UTC')
    expect(getFirstDayOfWeek(d32).date()).toEqual(5)
    // Sunday (but in other systems Friday)
    const d33 = DateTime.parse('2021-12-05T20:30:00Z', 'bn-bd', 'UTC')
    expect(getFirstDayOfWeek(d33).date()).toEqual(5)
  })

  it('calculates the local day names of the week', () => {
    // short names
    expect(getLocalDayNamesOfTheWeek('hu-hu', 'short')).toEqual([
      'h',
      'k',
      'sze',
      'cs',
      'p',
      'szo',
      'v'
    ])
    expect(getLocalDayNamesOfTheWeek('en-us', 'short')).toEqual([
      'Su',
      'Mo',
      'Tu',
      'We',
      'Th',
      'Fr',
      'Sa'
    ])
    // long
    expect(getLocalDayNamesOfTheWeek('en-us', 'long')).toEqual([
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ])
    expect(getLocalDayNamesOfTheWeek('es-mx', 'long')).toEqual([
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado'
    ])
  })
})
