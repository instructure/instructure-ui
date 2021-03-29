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

import React from 'react'
import { Calendar } from '@instructure/ui-calendar'

const generateDays = () => {
  const days = []
  const date = new Date('2019-07-28')

  while (days.length < Calendar.DAY_COUNT) {
    days.push(
      <Calendar.Day
        date={date.toISOString()}
        label={date.toISOString()}
        renderLabel={date.toISOString()}
        isOutsideMonth={date.getMonth() !== 7}
        id={date.toISOString()}
      >
        {date.getDate()}
      </Calendar.Day>
    )
    date.setDate(date.getDate() + 1)
  }

  return days
}

export default {
  propValues: {
    placement: [
      undefined, // eslint-disable-line no-undefined
      'bottom center',
      'start center',
      'end center',
      'top center'
    ]
  },
  getComponentProps: (props) => {
    return {
      children: generateDays(),
      renderLabel: 'Choose a date',
      renderNavigationLabel: (
        <div>
          <div>August</div>
          <div>2019</div>
        </div>
      ),
      renderWeekdayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
  },
  getExampleProps: (props) => {
    return props.isShowingCalendar
      ? {
          as: 'div',
          width: '100%',
          height: '40rem',
          margin: 'large',
          padding: 'large',
          textAlign: 'center'
        }
      : {}
  },
  filter: (props) => {
    if (props.interaction === 'readonly') return true
    if (props.isRequired) return true
    if (props.isInline && props.layout === 'inline') return true
    if (props.isShowingCalendar && props.interaction === 'disabled') return true
    if (props.isShowingCalendar && props.size !== 'medium') return true
    if (!props.isShowingCalendar && props.placement) return true

    return false
  }
}
