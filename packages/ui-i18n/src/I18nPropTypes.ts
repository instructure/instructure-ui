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

import { makeRequirable } from '@instructure/ui-prop-types'

const I18nPropTypes = {
  /**
   *
   * Verify that the given prop is a correctly formatted ISO 8601 formatted string.
   *
   * @param {Object} props - object containing the component props
   * @param {string} propName - name of the given prop
   * @param {string} componentName - name of the component
   * @param {string} location
   * @param {string} propFullName
   * @returns {Error} if prop is an invalid ISO 8601 string
   */
  // @ts-expect-error ts-migrate(7030) FIXME: Not all code paths return a value.
  iso8601(props, propName, componentName, location) {
    const propValue = props[propName]
    if (typeof propValue === 'undefined' || propValue === '') return

    const propValueType = typeof propValue
    if (typeof propValueType !== 'string') {
      return new Error(
        `Invalid ${location} \`${propName}\` of type \`${propValueType}\` supplied to \`${componentName}\`, expected ` +
          `an ISO 8601 formatted string.`
      )
    }

    const iso8601regex = /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\17[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/

    if (typeof propValue === 'string' && !propValue.match(iso8601regex)) {
      return new Error(
        `Invalid ${location} \`${propName}\` \`${propValue}\` supplied to \`${componentName}\`, expected ` +
          `an ISO 8601 formatted string.`
      )
    }
  }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'isRequired' does not exist on type '(pro... Remove this comment to see the full error message
I18nPropTypes.iso8601.isRequired = makeRequirable(I18nPropTypes.iso8601)

export default I18nPropTypes
export {
  /**
   * ---
   * category: utilities/i18n
   * ---
   * @module I18nPropTypes
   * Custom I18n prop types for React components.
   */
  I18nPropTypes
}
