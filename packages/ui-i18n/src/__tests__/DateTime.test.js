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
import { now, isValid, browserTimeZone, parse, toLocaleString } from '../DateTime'
/* eslint-disable mocha/no-synchronous-tests */
describe('DateTime', () => {
  const timezone = "America/Halifax"  // -3
  const locale = "en"

  it('checks params', () => {
    let whoops = false
    try {
      now()
    } catch(ex) {
      whoops = true
    } finally {
      expect(whoops).to.be.true()
    }
    whoops = false
    try {
      now(locale)
    } catch(ex) {
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

  it('can figure out the browser\'s timezone', () => {
    const result = browserTimeZone()
    expect(result)
  })

  it('validates', () => {
    expect(isValid('2018-04-15T23:30:00Z')).to.be.true()
    expect(isValid('2018-04-15T23:30')).to.be.true()
    expect(isValid('2018-04-15')).to.be.true()
    expect(isValid('2018')).to.be.false()
  })

  it('parses iso8601', () => {
    let result = parse('2018-04-15T20:30:00-03:00', locale, timezone).toISOString()
    expect(result).to.equal('2018-04-15T23:30:00.000Z')
  })

  it('parses llll', () => {
    let result = parse('Sun, Apr 15, 2018 8:30 PM', locale, timezone).toISOString()
    expect(result).to.equal('2018-04-15T23:30:00.000Z')
  })

  it('parses LLLL', () => {
    let result = parse('Sunday, April 15, 2018 8:30 PM', locale, timezone).toISOString()
    expect(result).to.equal('2018-04-15T23:30:00.000Z')
  })

  it('parses lll', () => {
    let result = parse('Apr 15, 2018 8:30 PM', locale, timezone).toISOString()
    expect(result).to.equal('2018-04-15T23:30:00.000Z')
  })

  it('parses LLL', () => {
    let result = parse('April 15, 2018 8:30 PM', locale, timezone).toISOString()
    expect(result).to.equal('2018-04-15T23:30:00.000Z')
  })

  it('parses ll', () => {
    let result = parse('Apr 15, 2018', locale, timezone).toISOString()
    expect(result).to.equal('2018-04-15T03:00:00.000Z')
  })

  it('parses LL', () => {
    let result = parse('April 15, 2018', locale, timezone).toISOString()
    expect(result).to.equal('2018-04-15T03:00:00.000Z')
  })

  it('parses l', () => {
    let result = parse('4/15/2018', locale, timezone).toISOString()
    expect(result).to.equal('2018-04-15T03:00:00.000Z')
  })

  it('parses L', () => {
    let result = parse('04/15/2018', locale, timezone).toISOString()
    expect(result).to.equal('2018-04-15T03:00:00.000Z')
  })

  it('parses French L', () => {
    let result = parse('15/04/2018', 'fr', timezone).toISOString()
    expect(result).to.equal('2018-04-15T03:00:00.000Z')
  })

  it('parses French LL', () => {
    let result = parse('15 Avril, 2018', 'fr', timezone).toISOString()
    expect(result).to.equal('2018-04-15T03:00:00.000Z')
  })

  it('returns localized string', () => {
    let result = toLocaleString('2018-04-15T13:00Z', 'en', 'UTC', 'LLL')
    expect(result).to.equal('April 15, 2018 1:00 PM')
    result = toLocaleString('2018-04-15T13:00Z', 'fr', 'UTC', 'LLL')
    expect(result).to.equal('15 avril 2018 13:00')
    // iso8601 in given timezone
    result = toLocaleString('2018-04-15T13:00Z', 'fr', "America/Halifax") // -3
    expect(result).to.equal('2018-04-15T10:00:00.000-03:00')
  })
})
/* eslint-enable mocha/no-synchronous-tests */
