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

import moment from 'moment'
import 'moment-timezone/builds/moment-timezone-with-data'

/**
* ---
* category: utilities/i18n
* ---
* A wrapper for [moment](https://momentjs.com/) utils.
* @module DateTime
*/

/**
* Return the current localized date + time with timezone
* @param {String} locale
* @param {String} timezone
* @returns {String} ISO 8601 string
*/
export function now (locale, timezone) {
  checkParams(locale, timezone)
  return moment().locale(locale).tz(timezone)
}

/**
* Parses a string into a localized ISO 8601 string with timezone
* @param {String} dateString
* @param {String} locale
* @param {String} timezone
* @returns {String} ISO 8601 string
*/
export function parse (dateString, locale, timezone) {
  checkParams(locale, timezone)
  return moment.tz(dateString, [moment.ISO_8601, 'l', 'L', 'll', 'LL'], locale, timezone)
}

/**
* Determines if a string is a valid ISO 8601 string
* @param {String} dateString
* @returns {Boolean} true if dateString is a valid ISO 8601 string
*/
export function isValid (dateString) {
  return moment(dateString, [moment.ISO_8601]).isValid()
}

/**
* Get the users's time zone (or guess)
* see https://momentjs.com/timezone/docs/#/using-timezones/guessing-user-timezone/
* @returns {String} a time zone identifier (see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
*/
export function browserTimeZone () {
  return moment.tz.guess()
}

export default {
  now,
  parse,
  browserTimeZone,
  isValid
}

function checkParams (locale, timezone) {
  if (locale == null) throw Error('locale must be specified')
  if (timezone == null) throw Error('timezone must be specified')
}

