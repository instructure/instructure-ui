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

import { Calendar } from '../index'

const generateDays = (getDateProps = () => ({})) => {
  const days = []
  const date = new Date('2019-07-28')

  while (days.length < Calendar.DAY_COUNT) {
    days.push(
      <Calendar.Day
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
        {...getDateProps(date)}
        date={date.toISOString()}
        label={date.toISOString()}
        isOutsideMonth={date.getMonth() !== 7}
      >
        {date.getDate()}
      </Calendar.Day>
    )
    date.setDate(date.getDate() + 1)
  }

  return days
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dateStr' implicitly has an 'any' type.
const isSameDay = (dateStr, date) => {
  return new Date(dateStr).toISOString() === date.toISOString()
}

const defaultDays = generateDays()

// @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(date: any) => { interaction: st... Remove this comment to see the full error message
const outsideMonthStates = generateDays((date) => {
  if (isSameDay('2019-07-28', date)) {
    return {
      interaction: 'disabled'
    }
  }

  if (isSameDay('2019-07-29', date)) {
    return {
      isSelected: true
    }
  }

  if (isSameDay('2019-07-30', date)) {
    return {
      isToday: true
    }
  }

  return {}
})

// @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(date: any) => { interaction: st... Remove this comment to see the full error message
const insideMonthStates = generateDays((date) => {
  if (isSameDay('2019-08-05', date)) {
    return {
      interaction: 'disabled'
    }
  }

  if (isSameDay('2019-08-06', date)) {
    return {
      isSelected: true
    }
  }

  if (isSameDay('2019-08-07', date)) {
    return {
      isToday: true
    }
  }

  return {}
})

export default {
  propValues: {
    children: [defaultDays, outsideMonthStates, insideMonthStates],
    renderPrevMonthButton: [null, <button key="prev">{'<'}</button>],
    renderNextMonthButton: [null, <button key="next">{'>'}</button>]
  },
  // @ts-expect-error ts-migrate(6133) FIXME: 'props' is declared but its value is never read.
  getComponentProps: (props) => {
    return {
      renderNavigationLabel: (
        <div>
          <div>August</div>
          <div>2019</div>
        </div>
      ),
      renderWeekdayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
  },
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  filter: (props) => {
    const { renderPrevMonthButton, renderNextMonthButton } = props

    return (
      (!renderPrevMonthButton && renderNextMonthButton) ||
      (!renderNextMonthButton && renderPrevMonthButton)
    )
  }
}
