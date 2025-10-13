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

'use client'
import React, { useState } from 'react'
import {
  DateInput as di,
  DateInput2 as di2,
  IconAddLine
} from '@instructure/ui'

const DateInput = di as any
const DateInput2 = di2 as any

export default function DateInputExamplesPage() {
  // DateInput2 states
  const [di2Value, setDi2Value] = useState('')
  const [di2DateString, setDi2DateString] = useState('')
  const [di2Value2, setDi2Value2] = useState('')
  const [di2Value3, setDi2Value3] = useState('2/5/2025')

  const [diValue, setDiValue] = useState('')
  const [diMessages, setDiMessages] = useState<any[]>([])

  return (
    <main className="flex gap-10 p-12 flex-col items-start axe-test">
      <div>DateInput2:</div>
      <section>
        <DateInput2
          locale="en-us"
          dateFormat="en-us"
          renderCalendarIcon={<IconAddLine />}
          renderLabel="Choose a date"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month'
          }}
          value={di2Value}
          width="40rem"
          onChange={(e: any, inputValue: string, dateString: string) => {
            setDi2Value(inputValue)
            setDi2DateString(dateString)
          }}
          invalidDateErrorMessage="Invalid date"
        />
        <p>
          Input Value: <code>{di2Value}</code>
          <br />
          UTC Date String: <code>{di2DateString}</code>
        </p>
      </section>

      {/* DateInput2 - with year picker */}
      <section>
        <DateInput2
          locale="en-us"
          dateFormat="de-de"
          renderLabel="Choose a date (with year picker)"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month'
          }}
          value={di2Value2}
          width="40rem"
          onChange={(e: any, inputValue: string) => setDi2Value2(inputValue)}
          invalidDateErrorMessage="Invalid date"
          withYearPicker={{
            screenReaderLabel: 'Year picker',
            startYear: 1900,
            endYear: 2025
          }}
        />
      </section>

      {/* DateInput2 - disabled dates */}
      <section>
        <DateInput2
          locale="en-us"
          dateFormat="en-us"
          renderLabel="Choose a date (with disabled dates)"
          disabledDates={['2025-02-11', '2025-02-12', '2025-02-13']}
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month'
          }}
          value={di2Value3}
          width="40rem"
          onChange={(e: any, inputValue: string) => setDi2Value3(inputValue)}
          invalidDateErrorMessage="Invalid date"
        />
      </section>

      <section>
        <div>DateInput:</div>
        <DateInput
          locale="en-us"
          renderLabel="Choose a date (legacy DateInput)"
          assistiveText="Type a date or use arrow keys to navigate date picker."
          value={diValue}
          onChange={(e: any, { value }: { value: string }) => {
            setDiValue(value)
            // rudimentary validation example: flag very short values
            if (value && value.length < 4) {
              setDiMessages([{ type: 'error', text: 'This date is invalid' }])
            } else {
              setDiMessages([])
            }
          }}
          messages={diMessages}
          width="40rem"
          isInline
        />
      </section>
    </main>
  )
}
