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
import { expect, mount, stub, spy, wait } from '@instructure/ui-test-utils'

import { DateTime } from '@instructure/ui-i18n'

import { DateTimeInput } from '../index'

import { DateTimeInputLocator } from '../DateTimeInputLocator'

describe('<DateTimeInput />', async () => {
  beforeEach(async () => {
    stub(console, 'warn') // suppress deprecation warnings
  })

  it('should use the default value', async () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const moment_dt = DateTime.parse('2017-05-01T17:30Z', locale, timezone)

    await mount(
      <DateTimeInput
        description="date time"
        dateLabel="date"
        datePreviousLabel="prev"
        dateNextLabel="next"
        timeLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        defaultValue={moment_dt}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    const dateLocator = await dateTimeInput.findDateInput()
    const timeLocator = await dateTimeInput.findTimeInput()

    const dateInput = await dateLocator.findInput()
    const timeInput = await timeLocator.findInput()

    expect(dateInput).to.have.value(moment_dt.format('LL'))
    expect(timeInput).to.have.value(moment_dt.format('LT'))
  })

  it('should use the value', async () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const onChange = stub()
    const moment_dt = DateTime.parse('2017-05-01T17:30Z', locale, timezone)

    await mount(
      <DateTimeInput
        description="date time"
        dateLabel="date"
        datePreviousLabel="prev"
        dateNextLabel="next"
        timeLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        value={moment_dt.format()}
        onChange={onChange}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    const dateLocator = await dateTimeInput.findDateInput()
    const timeLocator = await dateTimeInput.findTimeInput()

    const dateInput = await dateLocator.findInput()
    const timeInput = await timeLocator.findInput()

    expect(dateInput).to.have.value(moment_dt.format('LL'))
    expect(timeInput).to.have.value(moment_dt.format('LT'))
  })

  it('should prefer value to defaultValue', async () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const value = DateTime.parse('2017-05-01T17:30Z', locale, timezone)
    const defaultValue = DateTime.parse('2016-04-01T17:00Z', locale, timezone)
    const onChange = stub()

    await mount(
      <DateTimeInput
        description="date time"
        dateLabel="date"
        datePreviousLabel="prev"
        dateNextLabel="next"
        timeLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    const dateLocator = await dateTimeInput.findDateInput()
    const timeLocator = await dateTimeInput.findTimeInput()

    const dateInput = await dateLocator.findInput()
    const timeInput = await timeLocator.findInput()

    expect(dateInput).to.have.value(value.format('LL'))
    expect(timeInput).to.have.value(value.format('LT'))
  })

  it('should focus the DateInput when focus is called', async () => {
    let dateTimeInputRef = null

    await mount(
      <DateTimeInput
        description="date time"
        dateLabel="date"
        datePreviousLabel="prev"
        dateNextLabel="next"
        timeLabel="time"
        invalidDateTimeMessage="whoops"
        componentRef={(el) => { dateTimeInputRef = el }}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    const dateLocator = await dateTimeInput.findDateInput()

    const dateInput = await dateLocator.findInput()

    dateTimeInputRef.focus()

    await wait(() => {
      expect(dateTimeInputRef.focused).to.be.true()
      expect(dateInput.focused()).to.be.true()
    })
  })

  it('should set time to local midnight when only date is set', async () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const moment_dt = DateTime.parse('2017-05-01T17:30Z', locale, timezone)
    const date = moment_dt.format().split('T')[0]

    await mount(
      <DateTimeInput
        description="date time"
        dateLabel="date"
        datePreviousLabel="prev"
        dateNextLabel="next"
        timeLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        defaultValue={date}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    const dateLocator = await dateTimeInput.findDateInput()
    const timeLocator = await dateTimeInput.findTimeInput()

    const dateInput = await dateLocator.findInput()
    const timeInput = await timeLocator.findInput()

    expect(dateInput).to.have.value(moment_dt.format('LL'))
    expect(timeInput).to.have.value('12:00 AM')
  })

  it('should call invalidDateTimeMessage if time is set w/o a date', async () => {
    const props = {
      invalidDateTimeMessage: (rawd, rawt) => 'whoops'
    }

    const messageSpy = spy(props, 'invalidDateTimeMessage')

    await mount(
      <DateTimeInput
        description="date time"
        dateLabel="date"
        datePreviousLabel="prev"
        dateNextLabel="next"
        timeLabel="time"
        invalidDateTimeMessage="whoops"
        locale="en-US"
        timezone="US/Eastern"
        {...props}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    const timeLocator = await dateTimeInput.findTimeInput()

    const timeInput = await timeLocator.findInput()

    await timeInput.change({target: { value: '1:00 PM' }})
    await timeInput.keyDown('enter')

    await wait(() => {
      expect(messageSpy).to.have.been.called()
    })

    expect(await dateTimeInput.find(':contains(whoops)')).to.exist()
  })

  it('should fire the onChange event when DateInput value changes', async () => {
    const onChange = stub()

    await mount(
      <DateTimeInput
        description="date time"
        dateLabel="date"
        datePreviousLabel="prev"
        dateNextLabel="next"
        timeLabel="time"
        invalidDateTimeMessage="whoops"
        locale="en-US"
        timezone="US/Eastern"
        onChange={onChange}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    const dateLocator = await dateTimeInput.findDateInput()

    const dateInput = await dateLocator.findInput()

    await dateInput.change({target: { value: '5/1/2017' }})
    await dateInput.keyDown('enter')

    await wait(() => {
      expect(onChange).to.have.been.called()
      expect(onChange.getCall(0).args[1]).to.include('2017-05-01')
    })
  })

  it('should not fire the onDateChange event when DateInput value change is not a date change', async () => {
    const onChange = stub()

    await mount (
      <DateTimeInput
        description="date time"
        dateLabel="date"
        datePreviousLabel="prev"
        dateNextLabel="next"
        timeLabel="time"
        invalidDateTimeMessage="whoops"
        locale="en-US"
        timezone="US/Eastern"
        onChange={onChange}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    const dateLocator = await dateTimeInput.findDateInput()

    const dateInput = await dateLocator.findInput()

    await dateInput.change({target: { value: 'Nov' }})
    await dateInput.keyDown('enter')

    await wait(() => {
      expect(onChange).to.have.been.calledOnce()
    })

    await dateInput.change({target: { value: 'Nove' }})
    await dateInput.keyDown('enter')

    await wait(() => {
      expect(onChange).to.have.been.calledOnce()
    })
  })

  it('should fire the onChange event when TimeInput value changes', async () => {
    const onChange = stub()

    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const defaultValue = DateTime.parse('2017-05-01T17:00', locale, timezone)

    await mount(
      <DateTimeInput
        description="date time"
        dateLabel="date"
        datePreviousLabel="prev"
        dateNextLabel="next"
        timeLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        onChange={onChange}
        defaultValue={defaultValue.format()}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    const timeLocator = await dateTimeInput.findTimeInput()

    const timeInput = await timeLocator.findInput()

    await timeInput.change({target: { value: '3:00 AM' }})
    await timeInput.keyDown('enter')

    await wait(() => {
      // get expected 3AM string in UTC, which is how it comes out of TimeInput
      const newValue = new Date(DateTime.parse('2017-05-01T03:00', locale, timezone)).valueOf()


      expect(onChange).to.have.been.called()
      const onChangeArg = new Date(onChange.firstCall.args[1]).valueOf()
      expect(onChangeArg).to.equal(newValue)
    })
  })

  it('should show correct message when TimeInput value changes', async () => {
    await mount(
      <DateTimeInput
        description="date time"
        dateLabel="date"
        datePreviousLabel="prev"
        dateNextLabel="next"
        timeLabel="time"
        invalidDateTimeMessage="whoops"
        locale="en-US"
        timezone="US/Eastern"
        defaultValue="2018-01-18T13:00"
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    const timeLocator = await dateTimeInput.findTimeInput()

    const timeInput = await timeLocator.findInput()

    await timeInput.change({target: { value: '5:00 PM' }})
    await timeInput.keyDown('enter')

    expect(await dateTimeInput.find(':contains(January 18, 2018 5:00 PM)')).to.exist()
  })

  it('should show the formatted date-time message', async () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const defaultValue = DateTime.parse('2017-05-01T17:30Z', locale, timezone)

    await mount(
      <DateTimeInput
        description="date time"
        dateLabel="date"
        datePreviousLabel="prev"
        dateNextLabel="next"
        timeLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        defaultValue={defaultValue.format()}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()

    expect(await dateTimeInput.find(':contains(May 1, 2017 1:30 PM)')).to.exist()
  })

  it('should show the formatted date-time message in the proper locale', async () => {
    const timezone = 'US/Eastern'
    const locale = 'fr'
    const defaultValue = DateTime.parse('2017-05-01T17:30Z', locale, timezone)

    await mount(
      <DateTimeInput
        description="date time"
        dateLabel="date"
        datePreviousLabel="prev"
        dateNextLabel="next"
        timeLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        defaultValue={defaultValue.format()}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()

    expect(await dateTimeInput.find(':contains(1 mai 2017 13:30)')).to.exist()
  })

  it('should provide the html elements for date and time input', async () => {
    let dref
    let tref

    await mount(
      <DateTimeInput
        description="date time"
        dateLabel="date"
        datePreviousLabel="prev"
        dateNextLabel="next"
        timeLabel="time"
        invalidDateTimeMessage="whoops"
        locale="en-US"
        timezone="US/Eastern"
        dateInputRef={(el) => { dref = el }}
        timeInputRef={(el) => { tref = el }}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    const dateLocator = await dateTimeInput.findDateInput()
    const timeLocator = await dateTimeInput.findTimeInput()

    const dateInput = await dateLocator.findInput()
    const timeInput = await timeLocator.findInput()

    expect(dateInput.getDOMNode()).to.equal(dref)
    expect(timeInput.getDOMNode()).to.equal(tref)
  })

  it('should update message when value prop changes', async () => {
    const onChange = stub()

    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const moment_dt = DateTime.parse('2017-05-01T17:30Z', locale, timezone)

    const subject = await mount(
      <DateTimeInput
        description="date time"
        dateLabel="date"
        datePreviousLabel="prev"
        dateNextLabel="next"
        timeLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        value={moment_dt.toISOString()}
        onChange={onChange}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    expect(await dateTimeInput.find(':contains(May 1, 2017 1:30 PM)')).to.exist()

    await subject.setProps({value: '2018-03-29T16:30Z'})

    expect(await dateTimeInput.find(':contains(March 29, 2018 12:30 PM)')).to.exist()
  })

  it('should update message when locale changed', async () => {
    const onChange = stub()

    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const moment_dt = DateTime.parse('2017-05-01T17:30Z', locale, timezone)

    const subject = await mount(
      <DateTimeInput
        description="date time"
        dateLabel="date"
        datePreviousLabel="prev"
        dateNextLabel="next"
        timeLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        value={moment_dt.toISOString()}
        onChange={onChange}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    expect(await dateTimeInput.find(':contains(May 1, 2017 1:30 PM)')).to.exist()

    await subject.setProps({
      locale: 'fr',
    })

    expect(await dateTimeInput.find(':contains(1 mai 2017 13:30)')).to.exist()
  })

  it('should update message when timezone changed', async () => {
    const onChange = stub()

    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const moment_dt = DateTime.parse('2017-05-01T17:30Z', locale, timezone)

    const subject = await mount(
      <DateTimeInput
        description="date time"
        dateLabel="date"
        datePreviousLabel="prev"
        dateNextLabel="next"
        timeLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        value={moment_dt.toISOString()}
        onChange={onChange}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()

    expect(await dateTimeInput.find(':contains(May 1, 2017 1:30 PM)')).to.exist()

    await subject.setProps({
      timezone: 'Europe/Paris',
    })

    expect(await dateTimeInput.find(':contains(May 1, 2017 7:30 PM)')).to.exist()
  })

  it('should update error message when value is invalid', async () => {
    const onChange = stub()

    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const moment_dt = DateTime.parse('2017-05-01T17:30Z', locale, timezone)

    await mount(
      <DateTimeInput
        description="date time"
        dateLabel="date"
        datePreviousLabel="prev"
        dateNextLabel="next"
        timeLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        value={moment_dt.toISOString()}
        onChange={onChange}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()

    expect(await dateTimeInput.find(':contains(May 1, 2017 1:30 PM)')).to.exist()

    const dateLocator = await dateTimeInput.findDateInput()
    const dateInput = await dateLocator.findInput()

    await dateInput.change({target: { value: 'foobar' }})
    await dateInput.keyDown('enter')

    expect(await dateTimeInput.find(':contains(whoops)')).to.exist()
  })

  it('should show supplied message', async () => {
    const onChange = stub()

    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const moment_dt = DateTime.parse('2017-05-01T17:30Z', locale, timezone)

    const subject = await mount(
      <DateTimeInput
        description="date time"
        dateLabel="date"
        datePreviousLabel="prev"
        dateNextLabel="next"
        timeLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        value={moment_dt.toISOString()}
        onChange={onChange}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()

    expect(await dateTimeInput.find(':contains(May 1, 2017 1:30 PM)')).to.exist()

    await subject.setProps({messages: [{text: 'hello world', type: 'success'}]})

    expect(await dateTimeInput.find(':contains(May 1, 2017 1:30 PM)')).to.exist()
    expect(await dateTimeInput.find(':contains(hello world)')).to.exist()
  })
})
