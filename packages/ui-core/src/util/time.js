import moment from 'moment' // eslint-disable-line import/no-extraneous-dependencies
import 'moment-timezone/builds/moment-timezone-with-data'

function checkParams (locale, timezone) {
  if (locale == null) throw Error('locale must be specified')
  if (timezone == null) throw Error('timezone must be specified')
}

export function now (locale, timezone) {
  checkParams(locale, timezone)
  return moment().locale(locale).tz(timezone)
}

export function parseMoment (dateString, locale, timezone) {
  checkParams(locale, timezone)
  return moment.tz(dateString, [moment.ISO_8601, 'l', 'L', 'll', 'LL'], locale, timezone)
}

export function browserTimeZone () {
  return moment.tz.guess()
}
