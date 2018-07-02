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
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
import DateTimeInput from '../index'

export const placeholder = () => {
  return (
    <DateTimeInput
      description="Pick a date and time"
      datePlaceholder="Choose a date"
      dateLabel="Date"
      timeLabel="Time"
      datePreviousLabel="previous month"
      dateNextLabel="next month"
      invalidDateTimeMessage={(dvalue, tvalue) => { return `'${dvalue} ${tvalue}' is not valid.` }}
    />
  )
}

export const disabled = () => {
  return (
    <DateTimeInput
      description="Pick a date and time"
      datePlaceholder="Choose a date"
      dateLabel="Date"
      timeLabel="Time"
      datePreviousLabel="previous month"
      dateNextLabel="next month"
      invalidDateTimeMessage={(dvalue, tvalue) => { return `'${dvalue} ${tvalue}' is not valid.` }}
      disabled
    />
  )
}

export const defaultValue = () => {
  return (
    <DateTimeInput
      description="Pick a date and time"
      datePlaceholder="Choose a date"
      dateLabel="Date"
      timeLabel="Time"
      datePreviousLabel="previous month"
      dateNextLabel="next month"
      invalidDateTimeMessage={(dvalue, tvalue) => { return `'${dvalue} ${tvalue}' is not valid.` }}
      defaultValue="2018-01-18T13:10"
    />
  )
}

export const stacked = () => {
  return (
    <DateTimeInput
      description="Pick a date and time"
      datePlaceholder="Choose a date"
      dateLabel="Date"
      timeLabel="Time"
      datePreviousLabel="previous month"
      dateNextLabel="next month"
      invalidDateTimeMessage={(dvalue, tvalue) => { return `'${dvalue} ${tvalue}' is not valid.` }}
      layout="stacked"
    />
  )
}

export const columns = () => {
  return (
    <DateTimeInput
      description="Pick a date and time"
      datePlaceholder="Choose a date"
      dateLabel="Date"
      timeLabel="Time"
      datePreviousLabel="previous month"
      dateNextLabel="next month"
      invalidDateTimeMessage={(dvalue, tvalue) => { return `'${dvalue} ${tvalue}' is not valid.` }}
      layout="columns"
    />
  )
}

export const locale = () => {
  return (
    <DateTimeInput
      description="Pick a date and time"
      datePlaceholder="Choose a date"
      dateLabel="Date"
      timeLabel="Time"
      datePreviousLabel="previous month"
      dateNextLabel="next month"
      invalidDateTimeMessage={(dvalue, tvalue) => { return `'${dvalue} ${tvalue}' is not valid.` }}
      defaultValue="2018-01-18T13:10"
      locale="fr"
    />
  )
}

class RequiredExample extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: null,
      messages: []
    }
  }

  onChange = (e, isoDate) => {
    const now = new Date()
    const newValue = new Date(isoDate)
    let messages = []
    if ( newValue.valueOf() <= now.valueOf()) {
      messages = [{text: 'That date-time is in the past', type: 'hint'}]
    }
    this.setState({ value: isoDate, messages })
  }

  invalidDateTimeMessage (rawDateValue, rawTimeValue) {
    if (rawDateValue) {
      return `'${rawDateValue}' is not a valid date.`
    } else {
      if (rawTimeValue) {
        return 'You must provide a date with a time.'
      } else {
        return 'Date and time values are required.'
      }
    }
  }

  render () {
    const text = this.state.value ? new Date(this.state.value).toString() : 'N/A'
    return (
      <div style={{width: '30em'}}>
        <div style={{marginBottom: '1em', fontStyle: 'italic'}}>You entered:<br/>{text}</div>
        <div style={{height: 350}}>
          <DateTimeInput
            description={<ScreenReaderContent>Pick a date and time</ScreenReaderContent>}
            datePlaceholder="Choose"
            dateLabel="Date"
            timeLabel="Time"
            datePreviousLabel="previous month"
            dateNextLabel="next month"
            onChange={this.onChange}
            layout="stacked"
            value={this.state.value}
            invalidDateTimeMessage={this.invalidDateTimeMessage}
            messages={this.state.messages}
            required
          />
        </div>
      </div>
    )
  }
}
export const required = () => {
  return (
    <RequiredExample />
  )
}
