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

import DateTime from '../../../ui-i18n/lib/DateTime'

import { changedPackageWarning } from '../react/deprecated'
import warning from '../warning'

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
  warning(
    false,
    '[%s] was deprecated in version %s. %s',
    'DateTime.now',
    '5.0.0',
    changedPackageWarning('ui-utils', 'ui-i18n')
  )
  return DateTime.now(locale, timezone)
}

/**
* Parses a string into a localized ISO 8601 string with timezone
* @param {String} dateString
* @param {String} locale
* @param {String} timezone
* @returns {String} ISO 8601 string
*/
export function parse (dateString, locale, timezone) {
  warning(
    false,
    '[%s] was deprecated in version %s. %s',
    'DateTime.parse',
    '5.0.0',
    changedPackageWarning('ui-utils', 'ui-i18n')
  )
  return DateTime.parse(dateString, locale, timezone)
}

/**
* Determines if a string is a valid ISO 8601 string
* @param {String} dateString
* @returns {Boolean} true if dateString is a valid ISO 8601 string
*/
export function isValid (dateString) {
  warning(
    false,
    '[%s] was deprecated in version %s. %s',
    'DateTime.isValid',
    '5.0.0',
    changedPackageWarning('ui-utils', 'ui-i18n')
  )
  return DateTime.isValid(dateString)
}

/**
* Get the users's time zone (or guess)
* see https://momentjs.com/timezone/docs/#/using-timezones/guessing-user-timezone/
* @returns {String} a time zone identifier (see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
*/
export function browserTimeZone () {
  warning(
    false,
    '[%s] was deprecated in version %s. %s',
    'DateTime.browserTimeZone',
    '5.0.0',
    changedPackageWarning('ui-utils', 'ui-i18n')
  )
  return DateTime.browserTimeZone()
}

export default {
  now,
  parse,
  browserTimeZone,
  isValid
}
