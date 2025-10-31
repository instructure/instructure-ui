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
import React from 'react'
import { Calendar as cl } from '@instructure/ui'

const Calendar = cl as any

export default function CalendarPage() {
  return (
    <main className="flex gap-8 p-8 flex-col items-start axe-test">
      {/* Default config with additional props */}
      <Calendar
        visibleMonth="2025-05"
        currentDate="2023-12-15"
        disabledDates={['2023-12-22', '2025-05-22', '2025-05-11']}
      />

      {/* With year picker */}
      <Calendar
        visibleMonth="2024-02"
        currentDate="2024-02-29"
        disabledDates={['2024-02-10', '2024-02-12']}
        withYearPicker={{
          screenReaderLabel: 'Year picker',
          startYear: 1999,
          endYear: 2024,
          maxHeight: '200px'
        }}
      />
    </main>
  )
}
