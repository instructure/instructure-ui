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
import generateMessages from '../../../__tests__/generateMessages'

export default {
  sectionProp: 'layout',
  maxExamplesPerPage: 50,
  propValues: {
    datePlaceholder: [null, 'Choose a date'],
    value: [undefined, '20180806T133055Z'], // eslint-disable-line no-undefined
    messages: generateMessages()
  },
  getComponentProps: (props) => {
    return {
      description: 'Pick a date and time',
      dateLabel: 'Date',
      timeLabel: 'Time',
      datePreviousLabel: 'previous month',
      dateNextLabel: 'next month',
      invalidDateTimeMessage: (dvalue, tvalue) => { return `'${dvalue} ${tvalue}' is not valid.` },
      disabledDateMessage: (date) => `Date is disabled`,
      onChange: () => {},
      readOnly: false
    }
  }
}
