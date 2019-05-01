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


/**
* ---
* parent: DateInput
* ---
*/
const isSameMonth = (a, b) => {
  return a.isSame(b, 'year') && a.isSame(b, 'month')
}

const isSameDay = (a, b) => {
  return isSameMonth(a, b) && a.isSame(b, 'day')
}

const isDayDisabled = (day, disabledDaysOfWeek, disabledDays) => {
  const disabledDayOfWeek = disabledDaysOfWeek.indexOf(day.weekday()) >= 0

  let disabledDay
  if (disabledDays && typeof disabledDays === "function") {
    disabledDay = disabledDays(day)
  } else {
    disabledDay = disabledDays.some(disabledDay => isSameDay(day, disabledDay))
  }

  return disabledDayOfWeek || disabledDay
}

export { isSameMonth, isSameDay, isDayDisabled }
