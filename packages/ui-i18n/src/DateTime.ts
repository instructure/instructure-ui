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

import moment, { Moment } from 'moment-timezone'

/**
 * ---
 * category: utilities/i18n
 * ---
 * @deprecated
 * #### DEPRECATION WARNING: Will be removed in a future version, which will include a
 * time library agnostic API.
 * A wrapper for [moment](https://momentjs.com/) utils.
 * @module DateTime
 */

/**
 * Return an instance of a [moment](https://momentjs.com) initialized with the current date + time
 * @param {String} locale
 * @param {String} timezone
 * @returns {Object} an instance of a moment.
 */
function now(locale: string, timezone: string) {
  _checkParams(locale, timezone)
  return moment().locale(locale).tz(timezone)
}

/**
 * Parses a string into a localized ISO 8601 string with timezone
 * @param {String} dateString
 * @param {String} locale
 * @param {String} timezone
 * @param {String} format
 * @param {Boolean} strict
 * @returns {String} ISO 8601 string
 */
function parse(
  dateString: string,
  locale: string,
  timezone: string, // list all available localized formats, from most specific to least
  format = [
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
  strict = false
) {
  _checkParams(locale, timezone)
  return moment.tz(dateString, format, locale, strict, timezone)
}

/**
 * Determines if a string is a valid date/time string
 * @param {String} dateString
 * @param {Array} formats see https://momentjs.com/docs/#/displaying/format/ default is ISO_8601
 * @returns {Boolean} true if dateString is a valid ISO 8601 string
 */
function isValid(dateString: string, formats = [moment.ISO_8601]) {
  return moment(dateString, formats).isValid()
}

/**
 * Get the user's time zone (or guess)
 * see https://momentjs.com/timezone/docs/#/using-timezones/guessing-user-timezone/
 * @returns {String} a time zone identifier (see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
 */
function browserTimeZone() {
  return moment.tz.guess()
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
  const toFormat = format === 'short' ? 'dd' : 'dddd'
  let currentDay = getFirstDayOfWeek(now(locale, browserTimeZone()))
  for (let i = 0; i < 7; i++) {
    ret.push(currentDay.format(toFormat))
    currentDay = currentDay.add(1, 'day') // TODO this is mutable
  }
  return ret
}

/**
 * Returns the first day of the week in the given locale.
 * The locale decides what is the first day, e.g. Sunday in the US, Monday in
 * the EU.
 * @param date A Moment Datetime object
 */
function getFirstDayOfWeek(date: Moment) {
  return date.clone().weekday(0)
}

/**
 * Return a localized date + time with timezone as a ISO 8601 string
 * @param {String} dateString
 * @param {String} locale
 * @param {String} timezone
 * @param {String} format the format to use. Defaults to YYYY-MM-DDTHH:mm:ss.SSSZ
 * @returns {String} Localized ISO 8601 string
 */
function toLocaleString(
  dateString: string,
  locale: string,
  timezone: string,
  format?: string
) {
  const d = parse(dateString, locale, timezone)
  const iso8601format = 'YYYY-MM-DDTHH:mm:ss.SSSZ'
  return format ? d.format(format) : d.format(iso8601format)
}

function _checkParams(locale: string, timezone: string) {
  if (locale == null) throw Error('locale must be specified')
  if (timezone == null) throw Error('timezone must be specified')
}

const DateTime = {
  now,
  parse,
  browserTimeZone,
  isValid,
  toLocaleString,
  getFirstDayOfWeek,
  getLocalDayNamesOfTheWeek,
  momentISOFormat: moment.ISO_8601
}

export default DateTime
export { DateTime }
export type { Moment }
