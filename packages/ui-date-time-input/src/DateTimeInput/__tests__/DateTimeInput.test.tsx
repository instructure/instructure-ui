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

import { DateTimeInput } from '../index'

import { DateTimeInputLocator } from '../DateTimeInputLocator'
import { ApplyLocale, DateTime } from '@instructure/ui-i18n'

describe('<DateTimeInput />', async () => {
  it('should use the default value', async () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const dateTime = DateTime.parse('2017-05-01T17:30Z', locale, timezone)

    await mount(
      <DateTimeInput
        description="date time"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        dateRenderLabel="date"
        timeRenderLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        defaultValue={dateTime.toISOString()}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    const dateLocator = await dateTimeInput.findDateInput()
    const timeLocator = await dateTimeInput.findTimeInput()

    const dateInput = await dateLocator.findInput()
    const timeInput = await timeLocator.findInput()

    expect(dateInput).to.have.value(dateTime.format('LL'))
    expect(timeInput).to.have.value(
      dateTime.format('LT') // e.g. 18:30
    )
  })

  it('should use the value', async () => {
    const onChange = stub()
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const dateTime = DateTime.parse('2017-05-01T23:30Z', locale, timezone)

    await mount(
      <DateTimeInput
        description="date time"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        dateRenderLabel="date"
        timeRenderLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        value={dateTime.toISOString()}
        onChange={onChange}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    const dateLocator = await dateTimeInput.findDateInput()
    const timeLocator = await dateTimeInput.findTimeInput()

    const dateInput = await dateLocator.findInput()
    const timeInput = await timeLocator.findInput()

    expect(dateInput).to.have.value(dateTime.format('LL'))
    expect(timeInput).to.have.value(dateTime.format('LT'))
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
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        dateRenderLabel="date"
        timeRenderLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        value={value.toISOString()}
        defaultValue={defaultValue.toISOString()}
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

  it('should set time to local midnight when only date is set', async () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const dateObj = DateTime.parse('2017-04-01T18:30Z', locale, timezone)
    const date = dateObj.toISOString().split('T')[0]
    await mount(
      <DateTimeInput
        description="date time"
        dateRenderLabel="date"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        timeRenderLabel="time"
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

    expect(dateInput).to.have.value(dateObj.format('LL'))
    expect(timeInput).to.have.value('12:00 AM')
  })

  it('should call invalidDateTimeMessage if time is set w/o a date and is required', async () => {
    const props = {
      invalidDateTimeMessage: (_rawd: unknown) => 'whoops'
    }
    const messageSpy = spy(props, 'invalidDateTimeMessage')

    await mount(
      <DateTimeInput
        description="date time"
        dateRenderLabel="date"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        timeRenderLabel="time"
        locale="en-US"
        timezone="US/Eastern"
        isRequired
        {...props}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    const timeLocator = await dateTimeInput.findTimeInput()

    const timeInput = await timeLocator.findInput()

    await timeInput.change({ target: { value: '1:00 PM' } })
    await timeInput.keyDown('enter')

    await wait(() => {
      expect(messageSpy).to.have.been.called()
    })

    expect(await dateTimeInput.find(':contains(whoops)')).to.exist()
  })

  it('should not call invalidDateTimeMessage if time is set w/o a date', async () => {
    const props = {
      invalidDateTimeMessage: (_rawd: unknown) => 'whoops'
    }
    const messageSpy = spy(props, 'invalidDateTimeMessage')

    await mount(
      <DateTimeInput
        description="date time"
        dateRenderLabel="date"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        timeRenderLabel="time"
        locale="en-US"
        timezone="US/Eastern"
        {...props}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    const timeLocator = await dateTimeInput.findTimeInput()

    const timeInput = await timeLocator.findInput()

    await timeInput.change({ target: { value: '1:00 PM' } })
    await timeInput.keyDown('enter')

    await wait(() => {
      expect(messageSpy).to.have.not.been.called()
    })

    expect(
      await dateTimeInput.find(':contains(whoops)', {
        expectEmpty: true
      })
    ).to.not.exist()
  })

  it('should fire the onChange event when DateInput value changes', async () => {
    const onChange = stub()

    await mount(
      <DateTimeInput
        description="date time"
        dateRenderLabel="date"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        timeRenderLabel="time"
        invalidDateTimeMessage="whoops"
        locale="en-US"
        timezone="US/Eastern"
        onChange={onChange}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    const dateLocator = await dateTimeInput.findDateInput()

    const dateInput = await dateLocator.findInput()
    await dateInput.change({ target: { value: 'May 1, 2017' } })
    await dateInput.keyDown('Enter')

    await wait(() => {
      expect(onChange).to.have.been.called()
      expect(onChange.getCall(0).args[1]).to.include('2017-05-01')
    })
  })

  it('should not fire the onDateChange event when DateInput value change is not a date change', async () => {
    const onChange = stub()

    await mount(
      <DateTimeInput
        description="date time"
        dateRenderLabel="date"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        timeRenderLabel="time"
        invalidDateTimeMessage="whoops"
        locale="en-US"
        timezone="US/Eastern"
        onChange={onChange}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    const dateLocator = await dateTimeInput.findDateInput()

    const dateInput = await dateLocator.findInput()

    await dateInput.change({ target: { value: 'Not a date' } })
    await dateInput.keyDown('enter')

    await wait(() => {
      expect(onChange).to.have.been.not.called()
    })

    await dateInput.change({ target: { value: 'this is also garbage' } })
    await dateInput.keyDown('enter')

    await wait(() => {
      expect(onChange).to.have.been.not.called()
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
        dateRenderLabel="date"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        timeRenderLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        onChange={onChange}
        defaultValue={defaultValue.toISOString()}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    const timeLocator = await dateTimeInput.findTimeInput()
    const timeInput = await timeLocator.findInput()

    await timeInput.change({ target: { value: '3:00 AM' } })
    await timeInput.keyDown('enter')

    await wait(() => {
      // get expected 3AM string in UTC, which is how it comes out of TimeInput
      const newValue = new Date(
        DateTime.parse('2017-05-01T03:00', locale, timezone).toISOString()
      ).valueOf()

      expect(onChange).to.have.been.called()
      const onChangeArg = new Date(onChange.firstCall.args[1]).valueOf()
      expect(onChangeArg).to.equal(newValue)
    })
  })

  it('should show correct message when TimeInput value changes', async () => {
    await mount(
      <DateTimeInput
        description="date time"
        dateRenderLabel="date"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        timeRenderLabel="time"
        invalidDateTimeMessage="whoops"
        locale="en-US"
        timezone="US/Eastern"
        defaultValue="2018-01-18T13:00"
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    const timeLocator = await dateTimeInput.findTimeInput()

    const timeInput = await timeLocator.findInput()

    await timeInput.change({ target: { value: '5:00 PM' } })
    await timeInput.keyDown('enter')

    expect(
      await dateTimeInput.find(':contains(January 18, 2018 5:00 PM)')
    ).to.exist()
  })

  it('should show the formatted date-time message', async () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const defaultValue = DateTime.parse('2017-05-01T17:30Z', locale, timezone)
    await mount(
      <DateTimeInput
        description="date time"
        dateRenderLabel="date"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        timeRenderLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        defaultValue={defaultValue.toISOString()}
      />
    )
    const dateTimeInput = await DateTimeInputLocator.find()
    expect(
      await dateTimeInput.find(':contains(May 1, 2017 1:30 PM)')
    ).to.exist()
  })

  it('should show the formatted date-time message in the proper locale', async () => {
    const timezone = 'US/Eastern'
    const locale = 'fr'
    const defaultValue = DateTime.parse('2017-05-01T17:30Z', locale, timezone)

    await mount(
      <DateTimeInput
        description="date time"
        dateRenderLabel="date"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        timeRenderLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        defaultValue={defaultValue.toISOString()}
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
        dateRenderLabel="date"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        timeRenderLabel="time"
        invalidDateTimeMessage="whoops"
        locale="en-US"
        timezone="US/Eastern"
        dateInputRef={(el) => {
          dref = el
        }}
        timeInputRef={(el) => {
          tref = el
        }}
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
    const dateTime = DateTime.parse('2017-05-01T17:30Z', locale, timezone)

    const subject = await mount(
      <DateTimeInput
        description="date time"
        dateRenderLabel="date"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        timeRenderLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        value={dateTime.toISOString()}
        onChange={onChange}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    expect(
      await dateTimeInput.find(':contains(May 1, 2017 1:30 PM)')
    ).to.exist()

    await subject.setProps({ value: '2018-03-29T16:30Z' })

    expect(
      await dateTimeInput.find(':contains(March 29, 2018 12:30 PM)')
    ).to.exist()
  })

  it('should update message when locale changed', async () => {
    const onChange = stub()
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const dateTime = DateTime.parse('2017-05-01T17:30Z', locale, timezone)

    const subject = await mount(
      <DateTimeInput
        description="date time"
        dateRenderLabel="date"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        timeRenderLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        onChange={onChange}
        value={dateTime.toISOString()}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    expect(
      await dateTimeInput.find(':contains(May 1, 2017 1:30 PM)')
    ).to.exist()

    await subject.setProps({
      locale: 'fr'
    })

    expect(await dateTimeInput.find(':contains(1 mai 2017 13:30)')).to.exist()
  })

  it('should update message when timezone changed', async () => {
    const onChange = stub()
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const dateTime = DateTime.parse('2017-05-01T17:30Z', locale, timezone)

    const subject = await mount(
      <DateTimeInput
        description="date time"
        dateRenderLabel="date"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        timeRenderLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        value={dateTime.toISOString()}
        onChange={onChange}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()

    expect(
      await dateTimeInput.find(':contains(May 1, 2017 1:30 PM)')
    ).to.exist()

    await subject.setProps({
      timezone: 'Europe/Paris'
    })

    expect(
      await dateTimeInput.find(':contains(May 1, 2017 7:30 PM)')
    ).to.exist()
  })

  it('should show error message if initial value is invalid', async () => {
    await mount(
      <DateTimeInput
        description="date time"
        dateRenderLabel="date"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        timeRenderLabel="time"
        invalidDateTimeMessage="whoops"
        value="totally not a date"
      />
    )
    const dateTimeInput = await DateTimeInputLocator.find()
    const dateLocator = await dateTimeInput.findDateInput()
    const dateInput = await dateLocator.findInput()
    await dateInput.focusOut()
    expect(await dateTimeInput.find(':contains(whoops)')).to.exist()
  })

  it('should show error message if initial defaultValue is invalid', async () => {
    await mount(
      <DateTimeInput
        description="date time"
        dateRenderLabel="date"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        timeRenderLabel="time"
        invalidDateTimeMessage="whoops"
        defaultValue="totally not a date"
      />
    )
    const dateTimeInput = await DateTimeInputLocator.find()
    const dateLocator = await dateTimeInput.findDateInput()
    const dateInput = await dateLocator.findInput()
    await dateInput.focusOut()
    expect(await dateTimeInput.find(':contains(whoops)')).to.exist()
  })

  it('should update error message when value is invalid', async () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const dateTime = DateTime.parse('2017-05-01T17:30Z', locale, timezone)

    const subject = await mount(
      <DateTimeInput
        description="date time"
        dateRenderLabel="date"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        timeRenderLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        value={dateTime.toISOString()}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()

    expect(
      await dateTimeInput.find(':contains(May 1, 2017 1:30 PM)')
    ).to.exist()
    await subject.setProps({ value: 'A very invalid date' })
    const dateLocator = await dateTimeInput.findDateInput()
    const dateInput = await dateLocator.findInput()
    await dateInput.focusOut()
    expect(await dateTimeInput.find(':contains(whoops)')).to.exist()
  })

  it('should show supplied message', async () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const dateTime = DateTime.parse('2017-05-01T17:30Z', locale, timezone)
    const subject = await mount(
      <DateTimeInput
        description="date time"
        dateRenderLabel="date"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        timeRenderLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        value={dateTime.toISOString()}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()

    expect(
      await dateTimeInput.find(':contains(May 1, 2017 1:30 PM)')
    ).to.exist()

    await subject.setProps({
      messages: [{ text: 'hello world', type: 'success' }]
    })

    expect(
      await dateTimeInput.find(':contains(May 1, 2017 1:30 PM)')
    ).to.exist()
    expect(await dateTimeInput.find(':contains(hello world)')).to.exist()
  })

  it('should read locale and timezone from context', async () => {
    const onChange = stub()
    const dateTime = DateTime.parse('2017-05-01T17:30Z', 'en-US', 'GMT')
    await mount(
      // Africa/Nairobi is GMT +3
      <ApplyLocale locale="fr" timezone="Africa/Nairobi">
        <DateTimeInput
          description="date time"
          dateRenderLabel="date"
          prevMonthLabel="Previous month"
          nextMonthLabel="Next month"
          timeRenderLabel="time"
          invalidDateTimeMessage="whoops"
          value={dateTime.toISOString()}
          onChange={onChange}
        />
      </ApplyLocale>
    )
    const dateTimeInput = await DateTimeInputLocator.find()
    expect(
      await dateTimeInput.find(':contains(lundi 1 mai 2017 20:30)')
    ).to.exist()
  })

  it('should format date according to dateFormat', async () => {
    const onChange = stub()
    const dateTime = DateTime.parse('2017-05-01T17:30Z', 'en-US', 'GMT')
    const subject = await mount(
      <DateTimeInput
        description="date time"
        dateRenderLabel="date"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        timeRenderLabel="time"
        invalidDateTimeMessage="whoops"
        dateFormat="l" // localized numeric date like 9/4/2017
        value={dateTime.toISOString()}
        onChange={onChange}
      />
    )
    const dateTimeInput = await DateTimeInputLocator.find()
    const dateLocator = await dateTimeInput.findDateInput()
    const dateInput = await dateLocator.findInput()

    expect(dateInput).to.have.value('5/1/2017')

    await subject.setProps({
      dateFormat: 'yyyy MMMM'
    })
    expect(dateInput).to.have.value('2017 May')
  })

  it('should format bottom message according to messageFormat', async () => {
    const onChange = stub()
    const dateTime = DateTime.parse('2017-05-01T17:30Z', 'en-US', 'GMT')
    const subject = await mount(
      <DateTimeInput
        description="date time"
        dateRenderLabel="date"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        timeRenderLabel="time"
        invalidDateTimeMessage="whoops"
        value={dateTime.toISOString()}
        onChange={onChange}
        locale="en-US"
        timezone="US/Eastern"
      />
    )
    const dateTimeInput = await DateTimeInputLocator.find()
    expect(
      await dateTimeInput.find(':contains(Monday, May 1, 2017 1:30 PM)')
    ).to.exist()

    await subject.setProps({
      messageFormat: 'l, LT'
    })
    expect(await dateTimeInput.find(':contains(5/1/2017, 1:30 PM)')).to.exist()
  })

  it('should show an error message when setting a disabled date array', async () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const dateTime = DateTime.parse('2017-05-01T17:30Z', locale, timezone)
    const errorMsg = 'Disabled date selected!'
    await mount(
      <DateTimeInput
        description="date time"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        dateRenderLabel="date"
        timeRenderLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        defaultValue={dateTime.toISOString()}
        disabledDates={[dateTime.toISOString()]}
        disabledDateTimeMessage={errorMsg}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    const dateLocator = await dateTimeInput.findDateInput()

    const dateInput = await dateLocator.findInput()

    expect(dateInput).to.have.value(dateTime.format('LL'))
    expect(await dateTimeInput.find(':contains(' + errorMsg + ')')).to.exist()

    await dateInput.change({ target: { value: 'May 18, 2017' } })
    await dateInput.keyDown('Enter')
    expect(
      await dateTimeInput.find(':contains(' + errorMsg + ')', {
        expectEmpty: true
      })
    ).to.not.exist()
  })

  it('should show an error message when setting a disabled date function', async () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const dateTime = DateTime.parse('2017-05-01T17:30Z', locale, timezone)
    const errorMsg = (_rawDate?: string) => 'Disabled date selected!'
    const checker = (toCheck: string) => {
      return toCheck.includes('2017')
    }
    await mount(
      <DateTimeInput
        description="date time"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        dateRenderLabel="date"
        timeRenderLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        defaultValue={dateTime.toISOString()}
        disabledDates={checker}
        disabledDateTimeMessage={errorMsg}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    const dateLocator = await dateTimeInput.findDateInput()

    const dateInput = await dateLocator.findInput()

    expect(dateInput).to.have.value(dateTime.format('LL'))
    expect(await dateTimeInput.find(':contains(' + errorMsg() + ')')).to.exist()

    await dateInput.change({ target: { value: 'May 18, 2022' } })
    await dateInput.keyDown('Enter')
    expect(
      await dateTimeInput.find(':contains(' + errorMsg() + ')', {
        expectEmpty: true
      })
    ).to.not.exist()
  })

  it('should update Date and Time inputs when value prop changes', async () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const dateTime = DateTime.parse('2017-05-01T17:30Z', locale, timezone)

    const subject = await mount(
      <DateTimeInput
        description="date time"
        dateRenderLabel="date"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        timeRenderLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        value={dateTime.toISOString()}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()
    expect(
      await dateTimeInput.find(':contains(May 1, 2017 1:30 PM)')
    ).to.exist()
    const newDateStr = '2022-03-29T19:00Z'
    const newDateTime = DateTime.parse(newDateStr, locale, timezone)
    await subject.setProps({ value: newDateStr })

    const dateLocator = await dateTimeInput.findDateInput()
    const timeLocator = await dateTimeInput.findTimeInput()

    const dateInput = await dateLocator.findInput()
    const timeInput = await timeLocator.findInput()

    expect(dateInput).to.have.value(newDateTime.format('LL'))
    expect(timeInput).to.have.value(newDateTime.format('LT'))
  })

  it('should allow the user to enter any time value if allowNonStepInput is true', async () => {
    const onChange = stub()

    await mount(
      <DateTimeInput
        description="date time"
        dateRenderLabel="date"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        timeRenderLabel="time"
        invalidDateTimeMessage="whoops"
        locale="en-US"
        timezone="US/Eastern"
        onChange={onChange}
        allowNonStepInput={true}
      />
    )

    const dateTimeInput = await DateTimeInputLocator.find()

    const timeLocator = await dateTimeInput.findTimeInput()
    const timeInput = await timeLocator.findInput()
    await timeInput.typeIn('7:34 PM')
    await timeInput.keyDown('Enter') // should send onChange event
    await timeInput.keyUp('esc') // should do nothing

    const dateLocator = await dateTimeInput.findDateInput()
    const dateInput = await dateLocator.findInput()
    await dateInput.change({ target: { value: 'May 1, 2017' } })
    await dateInput.keyDown('Enter')

    await wait(() => {
      expect(onChange).to.have.been.called()
      expect(onChange.getCall(0).args[1]).to.include('2017-05-01T23:34:00.000Z')
    })
  })
})
