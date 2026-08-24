'use client'

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

import { Calendar as cl, View as vw } from '@instructure/ui/latest'

const Calendar = cl as any
const View = vw as any

export default function Scenario() {
  return (
    <View as="div" maxWidth="44rem">
      {/* A month is roughly 35 Day components, so whatever Calendar.Day does
          differently between its first and its mounted render happens 35 times
          on one screen. */}
      <Calendar
        visibleMonth="2026-05"
        currentDate="2026-05-14"
        disabledDates={['2026-05-11', '2026-05-22']}
      />

      <View as="div" margin="large 0 0">
        <Calendar
          visibleMonth="2026-02"
          currentDate="2026-02-10"
          withYearPicker={{
            screenReaderLabel: 'Év választó',
            startYear: 2000,
            endYear: 2030,
            maxHeight: '200px'
          }}
        />
      </View>
    </View>
  )
}
