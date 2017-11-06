import moment from 'moment' // eslint-disable-line import/no-extraneous-dependencies
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
