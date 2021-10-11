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

import { DateTime } from 'luxon'
import { getWeekStartByLocale } from 'weekstart'

/**
 * Get the user's time zone (or guess)
 * @returns A time zone identifier (see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
 */
function browserTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

/**
 * Return an instance of a Luxon DateTime object initialized with the current date + time
 * @param locale
 * @param timezone the timezone the object will be in, the given time will
 * be the local time there.
 * @returns An instance of a DateTime.
 */
function now(locale: string, timezone: string) {
  _checkParams(locale, timezone)
  return DateTime.now()
    .setZone(timezone, { keepLocalTime: true })
    .setLocale(locale)
}

/**
 * Parses a ISO string into a localized ISO 8601 string with timezone using
 * Luxon.
 * @param dateString a string accepted by dateJS's parser. If it has a timezone,
 * it will be converted to the timezone specified by the `timezone` parameter.
 * @param locale
 * @param timezone A time zone identifier (see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
 * @returns ISO8601 string
 */
function parse(dateString: string, locale: string, timezone: string) {
  _checkParams(locale, timezone)
  return DateTime.fromISO(dateString, { zone: timezone, locale: locale })
}

/**
 * Returns the days of the week in the given locale,
 * for example ["Monday", "Tuesday",..]. It always begins with Monday.
 * @param locale A locale accepted by the browser, e.g. America/New_York
 * @param format If set to 'short' it will be maximum 3 letters long,
 *               if set to 'long' it will be the full word.
 */
function getLocalDayNamesOfTheWeek(locale: string, format: 'short' | 'long') {
  const ret: string[] = []
  const luxonFormat = format === 'short' ? 'EEE' : 'EEEE'
  let currentDay = getFirstDayOfWeek(DateTime.now(), locale)
  for (let i = 0; i < 7; i++) {
    ret.push(currentDay.toFormat(luxonFormat, { locale: locale }))
    currentDay = currentDay.plus({ days: 1 })
  }
  return ret
}

/**
 * Returns the first day of the week in the given locale.
 * The locale decides what is the first day, e.g. Sunday in the US, Monday in
 * the EU.
 * @param date A Luxon Datetime object
 * @param locale A locale string, like 'en-us'
 */
function getFirstDayOfWeek(date: DateTime, locale: string) {
  let result: DateTime
  let firstDay: number = getWeekStartByLocale(locale) // 0 = Sunday, 1 = Monday,..
  if (firstDay == 0) {
    firstDay = 7 // 7 = Sunday
  }
  if (firstDay <= date.weekday) {
    result = date.minus({ days: date.weekday - firstDay })
  } else {
    result = date.minus({ days: date.weekday - (7 - firstDay) })
  }
  return result
}

/**
 * Determines if a string is a valid ISO 8601 string
 * @param dateString
 * @returns true if dateString is a valid ISO 8601 string
 */
function isValid(dateString: string) {
  return DateTime.fromISO(dateString).isValid
}

function _checkParams(locale: string, timezone: string) {
  if (locale == null) throw Error('locale must be specified')
  if (timezone == null) throw Error('timezone must be specified')
}

const TimeUtils = {
  now,
  parse,
  browserTimeZone,
  isValid,
  getWeekStartByLocale,
  getLocalDayNamesOfTheWeek,
  getFirstDayOfWeek
}

export default TimeUtils
export { TimeUtils, DateTime }
