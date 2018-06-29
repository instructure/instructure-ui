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
/* eslint-disable instructure-ui/no-relative-package-imports */
import Button from '../../../../../ui-buttons/lib/components/Button'
import FormFieldGroup from '../../../../../ui-forms/lib/components/FormFieldGroup'
/* eslint-disable instructure-ui/no-relative-package-imports */
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
import DateInput from '../index'

export const placeholder = () => {
  return (
    <DateInput
      previousLabel="previous month"
      nextLabel="next month"
      placeholder="Select a date"
      label="Date"
      onDateChange={(event, isoValue, rawValue, rawConversionFailed) => { console.log(event, isoValue, rawValue, rawConversionFailed) }} // eslint-disable-line no-console
      invalidDateMessage={(value) => { return `'${value}' is not a valid date` }}
    />
  )
}

export const disabled = () => {
  return (
    <DateInput
      previousLabel="previous month"
      nextLabel="next month"
      placeholder="Select a date... disabled state"
      label="Date"
      onDateChange={(event, isoValue, rawValue, rawConversionFailed) => { console.log(event, isoValue, rawValue, rawConversionFailed) }} // eslint-disable-line no-console
      invalidDateMessage={(value) => { return `'${value}' is not a valid date` }}
      disabled
    />
  )
}

export const defaultDateValue = () => {
  return (
    <DateInput
      previousLabel="previous month"
      nextLabel="next month"
      placeholder="Select a date"
      label="Date"
      onDateChange={(event, isoValue, rawValue, rawConversionFailed) => { console.log(event, isoValue, rawValue, rawConversionFailed) }} // eslint-disable-line no-console
      invalidDateMessage={(value) => { return `'${value}' is not a valid date` }}
      defaultDateValue={new Date()}
    />
  )
}

export const disabledDaysOfWeek = () => {
  return (
    <DateInput
      previousLabel="previous month"
      nextLabel="next month"
      placeholder="Select a date... weekends are disabled"
      label="Date"
      onDateChange={() => { console.log(arguments) }} // eslint-disable-line no-console
      invalidDateMessage={(value) => { return `'${value}' is not a valid date` }}
      disabledDaysOfWeek={[0, 6]}
    />
  )
}

export const disabledDays = () => {
  return (
    <DateInput
      previousLabel="previous month"
      nextLabel="next month"
      placeholder="Select a date... some days in July are disabled"
      label="Date"
      onDateChange={() => { console.log(arguments) }} // eslint-disable-line no-console
      invalidDateMessage={(value) => { return `'${value}' is not a valid date` }}
      disabledDays={[new Date(2018, 6, 4), new Date(2018, 6, 21), new Date(2018, 6, 19)]}
    />
  )
}

class ControlledExample extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isoDate: undefined, // eslint-disable-line no-undefined
      messages: []
    }
  }

  onInputChange = (e) => {
    this.setState({ messages: [] })
  };

  onDateChange = (e, isoDate, rawValue, rawConversionFailed, dateIsDisabled) => {
    const messages = []

    if (!isoDate) {
      messages.push({
        type: 'error',
        text: 'Date field is required.'
      })
    }

    this.setState({ messages, isoDate })
  };

  onInputBlur = (e) => {
    const messages = []

    if (!e.target.value) {
      messages.push({
        type: 'error',
        text: 'Date field is required.'
      })
    }

    this.setState({ messages })
  };

  randomMonth = () => {
    let m = Math.floor(Math.random() * 12)
    const newDate = new Date(this.state.isoDate || Date.now())
    newDate.setMonth(m)
    this.setState({ isoDate: newDate.toISOString(), messages: [] })
  };

  render () {
    return (
      <FormFieldGroup description={<ScreenReaderContent>DateInput Example</ScreenReaderContent>}>
        <Button margin="small" onClick={this.randomMonth}>Random Month</Button>
        <DateInput
          label="Date"
          placeholder="Pick a date"
          previousLabel="previous month"
          messages={this.state.messages}
          nextLabel="next month"
          placement='bottom center'
          onDateChange={this.onDateChange}
          onChange={this.onInputChange}
          onBlur={this.onInputBlur}
          dateValue={this.state.isoDate}
          disabledDateMessage={(date) => `Date is disabled`}
          disabledDaysOfWeek={[0, 6]}
          required
        />
      </FormFieldGroup>
    )
  }
}

export const controlled = () => {
  return(
    <ControlledExample />
  )
}
