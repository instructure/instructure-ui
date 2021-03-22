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

import { Locale } from './Locale'
import BaseDecimal from 'decimal.js/decimal.mjs'

/**
 * ---
 * category: utilities/i18n
 * ---
 * A wrapper for [decimal.js](http://mikemcl.github.io/decimal.js/#decimal)
 * with additional internationalization utilities.
 * Deprecated. This package will be removed in 8.0.0 because decimal.js is can cause
 * compatibility issues with Jest.
 *
 * @module Decimal
 */
const Decimal = BaseDecimal.clone()

Decimal.set({
  precision: 100,
  toExpPos: 100
})

Decimal.getDelimiters = function (locale) {
  const numberIntl = new Intl.NumberFormat(locale || Locale.browserLocale())

  return {
    decimal: numberIntl.format(0.5).replace(/[0-9]/g, '')[0],
    thousands: numberIntl.format(1000000).replace(/[0-9]/g, '')[0]
  }
}

/**
 * Return a Decimal instance parsed from a string input + locale
 * @param {String|Number|Decimal} input
 * @param {String} locale
 * @returns {Decimal} The number as a Decimal instance
 */
Decimal.parse = function (input, locale) {
  locale = locale || Locale.browserLocale() // eslint-disable-line no-param-reassign
  const d = new Decimal(_parse(input, locale))
  d.l = locale
  return d
}

/**
 * Return a number as a localized, formatted string
 * @param {String} locale
 * @returns {String} The number as a localized/formatted string
 */
Decimal.prototype.toLocaleString = function (locale) {
  locale = locale || this.l // eslint-disable-line no-param-reassign
  return _format(_localize(this.toString(), locale), locale)
}

/**
 * Return a number as a localized, formatted string
 * @param {String|Number|Decimal} input
 * @param {String} locale
 * @returns {String} The number as a localized/formatted string
 */
Decimal.toLocaleString = function (input, locale) {
  return Decimal.parse(input, locale).toLocaleString(locale)
}

Decimal.prototype._toFixed = Decimal.prototype.toFixed
Decimal.prototype.toFixed = _localizePrecision(Decimal.prototype._toFixed)

Decimal.prototype._toPrecision = Decimal.prototype.toPrecision
Decimal.prototype.toPrecision = _localizePrecision(
  Decimal.prototype._toPrecision
)

// TODO: simplify this, it supports many formats we don't need. It should be
// enough to strip thousands separators and change the decimal separator to `.`.
const patterns = {}
function _parse(input, locale) {
  if (input === null) {
    return '0'
  } else if (
    Decimal.isDecimal(input) ||
    typeof input === 'number' ||
    input instanceof Number
  ) {
    return input
  } else if (typeof input !== 'string' && !(input instanceof String)) {
    return NaN
  }

  locale = locale || Locale.browserLocale() // eslint-disable-line no-param-reassign
  const { thousands, decimal } = Decimal.getDelimiters(locale)

  let result = _format(input, locale)

  const patternIndex = `${thousands}${decimal}`

  let pattern = patterns[patternIndex]
  if (pattern == null) {
    // eslint-disable-next-line no-useless-escape
    const regExp = `^\\s*([+\-]?(?:(?:\\d{1,3}(?:\\${thousands}\\d{3,3})+)|\\d*))(?:\\${decimal}(\\d*))?\\s*$`
    pattern = patterns[patternIndex] = new RegExp(regExp)
  }

  const matches = result.match(pattern)
  if (matches == null || matches.length !== 3) {
    return Decimal.NaN
  }

  const parts = []
  if (matches[1]) {
    parts.push(matches[1].replace(new RegExp(`\\${thousands}`, 'g'), ''))
  }
  if (matches[2]) {
    parts.push(matches[2])
  }

  return parts.length > 0 ? parts.join('.') : NaN
}

// Cleans up the string given and applies the thousands delimiter
// Doesn't take into account chinese and indian locales with non-standard grouping
// This will be addressed in INSTUI-996
function _format(input, locale) {
  locale = locale || Locale.browserLocale() // eslint-disable-line no-param-reassign

  let result = input

  const { thousands, decimal } = Decimal.getDelimiters(locale)
  const isNegative = result[0] === '-'

  // remove all characters except for digits and decimal delimiters
  result = result.replace(new RegExp(`[^\\d\\${decimal}]`, 'g'), '')

  // remove all decimal delimiters except for the last one if present
  result = result.replace(new RegExp(`[${decimal}](?=.*[${decimal}])`, 'g'), '')

  // remove the leading zeros using positive lookahead
  result = result.replace(
    new RegExp(`^[0${thousands}]+(?=\\d|0${decimal})`, ''),
    ''
  )

  // add leading zero to decimal, if not present
  result = result.charAt(0) === decimal ? result.replace(/^/, '0') : result

  const parts = result.split(decimal)
  const thousandSections = []

  let curr = parts[0]
  while (curr.length > 0) {
    thousandSections.unshift(curr.substr(Math.max(0, curr.length - 3), 3))
    curr = curr.substr(0, curr.length - 3)
  }

  result = thousandSections.join(thousands)

  if (parts[1]) {
    result = `${result}${decimal}${parts[1]}`
  }

  if (isNegative && result) {
    result = `-${result}`
  }

  return result
}

function _localize(input, locale) {
  let result = input

  const sourceDelimiters = Decimal.getDelimiters(Locale.defaultLocale)
  const destinationDelimiters = Decimal.getDelimiters(locale)

  const check = [sourceDelimiters.thousands, destinationDelimiters.thousands]
  const placeholder = ['*', '^', '?'].reduce(
    (result, value) =>
      !result && check.indexOf(value) === -1 ? value : result,
    null
  )
  const thousands = destinationDelimiters.thousands

  return result
    .replace(new RegExp(`\\${sourceDelimiters.decimal}`, 'g'), placeholder)
    .replace(new RegExp(`\\${sourceDelimiters.thousands}`, 'g'), thousands)
    .replace(new RegExp(`\\${placeholder}`, 'g'), destinationDelimiters.decimal)
}

function _localizePrecision(fn) {
  return function (precision, rounding, locale) {
    /* eslint-disable no-param-reassign */
    if (
      (locale == null && typeof rounding === 'string') ||
      rounding instanceof String
    ) {
      locale = rounding
      rounding = void 0
    }
    /* eslint-enable no-param-reassign */
    let value = fn.call(this, precision, rounding)

    // Convert exponential notation to decimal
    if (value.indexOf('e') !== -1) value = Number(value).toString()

    if (locale == null) return value
    return _format(_localize(value, locale), locale)
  }
}

export default Decimal
export { Decimal }
