/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 - present Instructure, Inc.
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
import { I18nPropTypes } from '../I18nPropTypes'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('I18nPropTypes', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('iso8601', () => {
    const { iso8601 } = I18nPropTypes

    // Test cases taken from https://www.myintervals.com/blog/2009/05/20/iso-8601-date-validation-that-doesnt-suck/

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should not return error when provided with a valid ISO8601 string', () => {
      const props = { date: null }
      const args = [props, 'date', 'TestComponent']

      const validISO8601Strings = [
        '2009-12T12:34',
        '2009',
        '2009-05-19',
        '20090519',
        '2009123',
        '2009-05',
        '2009-123',
        '2009-222',
        '2009-001',
        '2009-W01-1',
        '2009-W51-1',
        '2009-W511',
        '2009-W33',
        '2009W511',
        '2009-05-19',
        '2009-05-19 00:00',
        '2009-05-19 14',
        '2009-05-19 14:31',
        '2009-05-19 14:39:22',
        '2009-05-19T14:39Z',
        '2009-W21-2',
        '2009-W21-2T01:22',
        '2009-139',
        '2009-05-19 14:39:22-06:00',
        '2009-05-19 14:39:22+0600',
        '2009-05-19 14:39:22-01',
        '20090621T0545Z',
        '2007-04-06T00:00',
        '2007-04-05T24:00',
        '2010-02-18T16:23:48.5',
        '2010-02-18T16:23:48,444',
        '2010-02-18T16:23:48,3-06:00',
        '2010-02-18T16:23.4',
        '2010-02-18T16:23,25',
        '2010-02-18T16:23.33+0600',
        '2010-02-18T16.23334444',
        '2010-02-18T16,2283',
        '2009-05-19 143922.500',
        '2009-05-19 1439,55'
      ]

      validISO8601Strings.forEach((iso8601string) => {
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'null'.
        props.date = iso8601string
        // @ts-expect-error ts-migrate(2556) FIXME: Expected 4 arguments, but got 0 or more.
        expect(iso8601(...args)).to.not.exist()
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should return error when provided with an invalid ISO8601 string', () => {
      const props = { date: null }
      const args = [props, 'date', 'TestComponent']

      const invalidISO8601Strings = [
        'some text',
        'June 27, 1990',
        '200905',
        '2009367',
        '2009-',
        '2007-04-05T24:50',
        '2009-000',
        '2009-M511',
        '2009M511',
        '2009-05-19T14a39r',
        '2009-05-19T14:3924',
        '2009-0519',
        '2009-05-1914:39',
        '2009-05-19 14:',
        '2009-05-19r14:39',
        '2009-05-19 14a39a22',
        '200912-01',
        '2009-05-19 14:39:22+06a00',
        '2009-05-19 146922.500',
        '2010-02-18T16.5:23.35:48',
        '2010-02-18T16:23.35:48',
        '2010-02-18T16:23.35:48.45',
        '2009-05-19 14.5.44',
        '2010-02-18T16:23.33.600',
        '2010-02-18T16,25:23:48,444'
      ]

      invalidISO8601Strings.forEach((iso8601string) => {
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'null'.
        props.date = iso8601string
        // @ts-expect-error ts-migrate(2556) FIXME: Expected 4 arguments, but got 0 or more.
        expect(iso8601(...args)).to.be.an.instanceOf(Error)
      })
    })
  })
})
