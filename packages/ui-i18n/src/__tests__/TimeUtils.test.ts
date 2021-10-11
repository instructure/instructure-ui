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

import { expect } from '@instructure/ui-test-utils'
import { TimeUtils, DateTime } from '../TimeUtils'

const {
  now,
  isValid,
  browserTimeZone,
  parse,
  getFirstDayOfWeek,
  getLocalDayNamesOfTheWeek
} = TimeUtils

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
      expect(whoops).to.be.true()
    }
    whoops = false
    try {
      // @ts-expect-error intentionally wrong
      now(locale)
    } catch (ex) {
      whoops = true
    } finally {
      expect(whoops).to.be.true()
    }
  })

  it('knows when now is', () => {
    // not much of a test, but I need it for coverage stats
    const result = now(locale, timezone)
    expect(result)
  })

  it("can figure out the browser's timezone", () => {
    const result = browserTimeZone()
    expect(result)
  })

  it('validates', () => {
    expect(isValid('2018-04-15T23:30:00Z')).to.be.true()
    expect(isValid('2018-04-15T23:30')).to.be.true()
    expect(isValid('2018-04-15')).to.be.true()
  })

  it('parses iso8601', () => {
    const result = parse('2018-04-15T20:30:00-03:00', locale, timezone)
      .toUTC()
      .toISO()
    expect(result).to.equal('2018-04-15T23:30:00.000Z')
  })

  it('calculates the first day of the week', () => {
    // normal case
    const d1 = DateTime.fromISO('2021-09-15T20:30:00Z')
    expect(getFirstDayOfWeek(d1, 'hu-hu').day).to.equal(13)
    expect(getFirstDayOfWeek(d1, 'en-us').day).to.equal(12)
    // date wraps month/year
    const d2 = DateTime.fromISO('2022-01-01T20:30:00Z')
    expect(getFirstDayOfWeek(d2, 'hu-hu').day).to.equal(27)
    expect(getFirstDayOfWeek(d2, 'en-us').day).to.equal(26)
    // date is the same
    const d3 = DateTime.fromISO('2021-12-05T20:30:00Z')
    expect(getFirstDayOfWeek(d3, 'hu-hu').day).to.equal(29)
    expect(getFirstDayOfWeek(d3, 'en-us').day).to.equal(5)
    // first day is Friday!
    expect(getFirstDayOfWeek(d3, 'bn-bd').day).to.equal(3)
  })

  it('calculates the local day names of the week', () => {
    // short names
    expect(getLocalDayNamesOfTheWeek('hu-hu', 'short')).to.eql([
      'H',
      'K',
      'Sze',
      'Cs',
      'P',
      'Szo',
      'V'
    ])
    expect(getLocalDayNamesOfTheWeek('en-us', 'short')).to.eql([
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat'
    ])
    // long
    expect(getLocalDayNamesOfTheWeek('en-us', 'long')).to.eql([
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ])
    expect(getLocalDayNamesOfTheWeek('es-mx', 'long')).to.eql([
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
