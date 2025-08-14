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
import React, { useRef, useState } from 'react'
import { DateTimeInput as dti } from 'instructure-ui/ui-date-time-input/es/index'
import { ScreenReaderContent as src } from 'instructure-ui/ui-a11y-content/es/index'

const DateTimeInput = dti as any
const ScreenReaderContent = src as any

export default function DateTimeInputPage() {
  // Example 2: required + hint if in past
  const [reqValue, setReqValue] = useState<string | undefined>(undefined)
  const [reqMessages, setReqMessages] = useState<any[]>([])

  return (
    <main className="flex gap-10 p-8 flex-col items-start axe-test">
      1) Columns layout with default value
      <DateTimeInput
        description="Pick a date and time"
        datePlaceholder="Choose a date"
        dateRenderLabel="Date"
        timeRenderLabel="Time"
        invalidDateTimeMessage="Invalid date!"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        defaultValue="2018-01-18T13:30"
        layout="columns"
      />
      2) Required + hint when value is in the past, stacked layout
      <DateTimeInput
        description={
          <ScreenReaderContent>Pick a date and time</ScreenReaderContent>
        }
        datePlaceholder="Choose"
        dateRenderLabel="Date"
        timeRenderLabel="Time"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        onChange={(_e: any, isoDate?: string) => {
          let messages: any[] = []
          if (!isoDate) {
            setReqValue(undefined)
            setReqMessages(messages)
            return
          }
          const now = new Date()
          const newValue = new Date(isoDate)
          if (newValue.valueOf() <= now.valueOf()) {
            messages = [{ text: 'That date-time is in the past', type: 'hint' }]
          }
          setReqValue(isoDate)
          setReqMessages(messages)
        }}
        layout="stacked"
        value={reqValue}
        invalidDateTimeMessage="Invalid date!"
        messages={reqMessages}
        allowNonStepInput
        isRequired
      />
      3) Disabled DateTimeInput
      <DateTimeInput
        description="Pick a date and time"
        datePlaceholder="Choose a date"
        dateRenderLabel="Date"
        timeRenderLabel="Time"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        invalidDateTimeMessage={(dvalue: string) => `'${dvalue} is not valid.`}
        layout="columns"
        defaultValue="2018-01-18T13:30"
        interaction="disabled"
      />
      {/*
      4) Disabled dates via string array
      <DateTimeInput
        description="Pick a date and time"
        datePlaceholder="Choose a date"
        dateRenderLabel="Date"
        timeRenderLabel="Time"
        invalidDateTimeMessage="Invalid date"
        disabledDateTimeMessage="Disabled date"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        defaultValue="2022-04-08T13:30"
        layout="columns"
        disabledDates={['2022-04-01T13:30', '2022-04-03T13:30', '2022-04-04T13:30']}
        locale="en-us"
        timezone="America/Denver"
      />
      */}
    </main>
  )
}
