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

import { isSameMonth, isSameDay, isDayDisabled } from "../dateHelpers"
import DateTime from '@instructure/ui-utils/lib/i18n/DateTime'

const locale = 'en-US'
const timezone = "US/Eastern"

describe('isSameMonth', () => {
  it('returns true if the dates are in the same month', () => {
    expect(isSameMonth(DateTime.parse('2017-01-03', locale, timezone), DateTime.parse('2017-01-10', locale, timezone))).to.equal(true)
  })

  it('returns false if the dates are not in the same month', () => {
    expect(isSameMonth(DateTime.parse('2017-03-03', locale, timezone), DateTime.parse('2017-01-10', locale, timezone))).to.equal(false)
  })
})

describe('isSameDay', () => {
  it('returns true if the dates are on the same day', () => {
    expect(isSameDay(DateTime.parse('2017-01-03', locale, timezone), DateTime.parse('2017-01-03', locale, timezone))).to.equal(true)
  })

  it('returns false if the dates are not on the same day', () => {
    expect(isSameDay(DateTime.parse('2017-01-03', locale, timezone), DateTime.parse('2017-01-10', locale, timezone))).to.equal(false)
  })
})

describe('isDayDisabled', () => {
  it('returns true if the day is on a day of week in disabledDaysOfWeek', () => {
    const day = DateTime.parse('2017-01-01', locale, timezone)
    const disabledDaysOfWeek = [0]
    expect(isDayDisabled(day, disabledDaysOfWeek, [])).to.equal(true)
  })

  it('returns true if the day is in the disabledDays array', () => {
    const day = DateTime.parse('2017-01-01', locale, timezone)
    const disabledDaysOfWeek = []
    const disabledDays = [day]
    expect(isDayDisabled(day, disabledDaysOfWeek, disabledDays)).to.equal(true)
  })

  it('returns true if the disabledDays callback function returns true', () => {
    const day = DateTime.parse('2017-01-01', locale, timezone)
    const disabledDaysOfWeek = []
    const disabledDays = (date) => true
    expect(isDayDisabled(day, disabledDaysOfWeek, disabledDays)).to.equal(true)
  })

  it('returns false if it is not in disabledDaysOfWeek or disabledDays', () => {
    const day = DateTime.parse('2017-01-01', locale, timezone)
    const disabledDaysOfWeek = [2]
    const disabledDays = [DateTime.parse('2017-01-03', locale, timezone)]
    expect(isDayDisabled(day, disabledDaysOfWeek, disabledDays)).to.equal(false)
  })
})
