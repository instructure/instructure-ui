/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 - present Instructure, Inc.
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
import DateTimeInput from '../index'
import DateTime from '@instructure/ui-i18n/lib/DateTime'

const locale = 'en-US'
const timezone = "US/Eastern"

function getDateInputValue (subject) {
  return subject.find('DateInput').find('TextInput').props().value
}

function getTimeInputValue (subject) {
  return subject.find('TimeInput').find('input').node.value
}

function getMessageText (subject) {
  // the DateInput object has a FormFieldMessage in it too,
  // the 2nd one found is ours
  return subject.find('FormFieldMessage').nodes[1].props.children
}

function getMessages (subject) {
  return subject.find('FormFieldGroup').props().messages
}

describe('<DateTimeInput />', () => {
  function setDateInputValue (subject, value) {
    subject.find('DateInput').find('input').setValue(value)
    subject.find('DateInput').find('input').keyDown('enter')
  }
  function setTimeInputValue (subject, value) {
    subject.find('TimeInput').find('input').setValue(value)
    testbed.tick()
    subject.find('TimeInput').find('input').simulate('blur')
    testbed.tick()
  }

  const testbed = new Testbed(<DateTimeInput
    description="date time"
    dateLabel="date"
    datePreviousLabel="prev"
    dateNextLabel="next"
    timeLabel="time"
    invalidDateTimeMessage="whoops"
    locale={locale}
    timezone={timezone}
  />)

  it('should use the default value', () => {
    const moment_dt = DateTime.parse('2017-05-01T17:30Z', locale, timezone)
    const subject = testbed.render({ defaultValue: moment_dt.format() })
    expect(getDateInputValue(subject)).to.equal(moment_dt.format('LL'))
    expect(getTimeInputValue(subject)).to.equal(moment_dt.format('LT'))
  })

  it('should use the value', () => {
    const onChange = testbed.stub()
    const moment_dt = DateTime.parse('2017-05-01T17:30Z', locale, timezone)
    const subject = testbed.render({ value: moment_dt.format(), onChange })
    expect(getDateInputValue(subject)).to.equal(moment_dt.format('LL'))
    expect(getTimeInputValue(subject)).to.equal(moment_dt.format('LT'))
  })

  it('should prefer value to defaultValue', () => {
    const onChange = testbed.stub()
    const value = DateTime.parse('2017-05-01T17:30Z', locale, timezone)
    const defaultValue = DateTime.parse('2017-05-01T17:00Z', locale, timezone)
    const subject = testbed.render({
      value: value.format(),
      defaultValue: defaultValue.format(),
      onChange })
    expect(getDateInputValue(subject)).to.equal(value.format('LL'))
    expect(getTimeInputValue(subject)).to.equal(value.format('LT'))
  })

  it('should focus the DateInput when focus is called', () => {
    const subject = testbed.render()
    subject.instance().focus()
    expect(subject.instance().focused).to.be.true()
  })

  it('should set time to local midnight when only date is set', () => {
    const moment_dt = DateTime.parse('2017-05-01T17:30Z', locale, timezone)
    const date = moment_dt.format().split('T')[0]
    const subject = testbed.render({
      defaultValue: date
    })
    expect(getDateInputValue(subject)).to.equal(moment_dt.format('LL'))
    expect(getTimeInputValue(subject)).to.equal('12:00 AM')
  })

  it('should call invalidDateTimeMessage if time is set w/o a date', () => {
    const stub = testbed.stub()
    const invalidCallback = (rawd, rawt) => {
      stub()
      return 'whoops'
    }
    const subject = testbed.render({
      invalidDateTimeMessage: invalidCallback
    })
    setTimeInputValue(subject, '1:00 PM')

    expect(stub).to.have.been.called()
    const errText = getMessageText(subject)
    expect(errText).to.equal('whoops')
  })

  it('should fire the onChange event when DateInput value changes', () => {
    const onChange = testbed.stub()
    const subject = testbed.render({ onChange })

    setDateInputValue(subject, '5/1/2017')

    expect(onChange).to.have.been.called()
    expect(onChange.getCall(0).args[1]).to.include('2017-05-01')
  })

  it('should not fire the onDateChange event when DateInput value change is not a date change', () => {
    const onChange = testbed.stub()
    const subject = testbed.render({ onChange })

    setDateInputValue(subject, 'Nov')

    expect(onChange).to.have.been.calledOnce()

    setDateInputValue(subject, 'Nove')

    expect(onChange).to.have.been.calledOnce()
  })

  it('should fire the onChange event when TimeInput value changes', () => {
    const onChange = testbed.stub()
    const defaultValue = DateTime.parse('2017-05-01T17:00', locale, timezone)
    const subject = testbed.render({ onChange, defaultValue: defaultValue.format() })

    setTimeInputValue(subject, '3:00 AM')

    // get expected 3AM string in UTC, which is how it comes out of TimeInput
    const newValue = new Date(DateTime.parse('2017-05-01T03:00', locale, timezone)).valueOf()

    expect(onChange).to.have.been.called()
    const onChangeArg = new Date(onChange.firstCall.args[1]).valueOf()
    expect(onChangeArg).to.equal(newValue)
  })

  it('should show the formatted date-time message', () => {
    const defaultValue = DateTime.parse('2017-05-01T17:30Z', locale, timezone)
    const subject = testbed.render({ defaultValue: defaultValue.format() })

    const text = getMessageText(subject)
    expect(text).to.equal('May 1, 2017 1:30 PM')
  })

  it('should show the formatted date-time message in the proper locale', () => {
    const defaultValue = DateTime.parse('2017-05-01T17:30Z', 'fr', timezone)
    const subject = testbed.render({
      defaultValue: defaultValue.format(),
      locale: 'fr'
    })

    const text = getMessageText(subject)
    expect(text).to.equal('1 mai 2017 13:30')
  })

  it('should provide the html elements for date and time input', () => {
    let dref
    let tref
    const subject = testbed.render({
      dateInputRef: (el) => {dref = el},
      timeInputRef: (el) => {tref = el}
    })

    const dateInput = subject.find('DateInput').find('input').nodes[0]
    expect(dateInput === dref).to.be.true()

    const timeInput = subject.find('TimeInput').find('input').nodes[0]
    expect(timeInput === tref).to.be.true()
  })

  it('should update state when value prop changes', () => {
    const onChange = testbed.stub()
    const moment_dt = DateTime.parse('2017-05-01T17:30Z', locale, timezone)
    const subject = testbed.render({ value: moment_dt.toISOString(), onChange })
    expect(subject.instance().state).to.eql({
      iso: '2017-05-01T13:30:00.000-04:00',
      message: {text: "May 1, 2017 1:30 PM", type: "success"}
    })

    subject.setProps({value: '2018-03-29T16:30Z'})
    expect(subject.instance().state).to.eql({
      iso: '2018-03-29T12:30:00.000-04:00',
      message: {text: "March 29, 2018 12:30 PM", type: "success"}
    })
  })

  it('should update state when locale changed', () => {
    const onChange = testbed.stub()
    const moment_dt = DateTime.parse('2017-05-01T17:30Z', locale, timezone)
    const subject = testbed.render({ value: moment_dt.toISOString(), onChange })
    expect(subject.instance().state).to.eql({
      iso: '2017-05-01T13:30:00.000-04:00',
      message: {text: "May 1, 2017 1:30 PM", type: "success"}
    })

    subject.setProps({
      locale: 'fr',
    })
    expect(subject.instance().state).to.eql({
      iso: '2017-05-01T13:30:00.000-04:00',
      message: {text: "1 mai 2017 13:30", type: "success"}
    })
  })

  it('should update state when timezone changed', () => {
    const onChange = testbed.stub()
    const moment_dt = DateTime.parse('2017-05-01T17:30Z', locale, timezone)
    const subject = testbed.render({ value: moment_dt.toISOString(), onChange })
    expect(subject.instance().state).to.eql({
      iso: '2017-05-01T13:30:00.000-04:00',
      message: {text: "May 1, 2017 1:30 PM", type: "success"}
    })

    subject.setProps({
      timezone: 'Europe/Paris',
    })
    expect(subject.instance().state).to.eql({
      iso: '2017-05-01T19:30:00.000+02:00',
      message: {text: "May 1, 2017 7:30 PM", type: "success"}
    })
  })

  it('should update state with error message when value is invalid', () => {
    const onChange = testbed.stub()
    const moment_dt = DateTime.parse('2017-05-01T17:30Z', locale, timezone)
    const subject = testbed.render({ value: moment_dt.toISOString(), onChange })
    expect(subject.instance().state).to.eql({
      iso: '2017-05-01T13:30:00.000-04:00',
      message: {text: "May 1, 2017 1:30 PM", type: "success"}
    })
    setDateInputValue(subject, 'foobar')
    expect(subject.instance().state).to.eql({
      iso: '2017-05-01T13:30:00.000-04:00',
      message: {text: "whoops", type: "error"}
    })
  })

  it('should show supplied message', () => {
    const onChange = testbed.stub()
    const moment_dt = DateTime.parse('2017-05-01T17:30Z', locale, timezone)
    const subject = testbed.render({ defaultValue: moment_dt.toISOString(), onChange })
    expect(subject.instance().state).to.eql({
      iso: '2017-05-01T13:30:00.000-04:00',
      message: {text: "May 1, 2017 1:30 PM", type: "success"}
    })

    subject.setProps({messages: [{text: 'hello world', type: 'success'}]})

    expect(getMessages(subject)).to.eql([
      {text: "May 1, 2017 1:30 PM", type: "success"},
      {text: 'hello world', type: 'success'},
    ])
  })
})
