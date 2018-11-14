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
import { expect, mount, stub } from '@instructure/ui-test-utils'
import DateInputLocator from '../locator'

import DateInput from '../index'

describe('<DateInput />', async () => {
  it('should use the default date value', async () => {
    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        defaultDateValue="2017-05-01"
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()

    expect(input.getAttribute('value')).to.equal('May 1, 2017')
  })

  it('should focus the input when focus is called', async () => {
    let inputRef = null

    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        componentRef={(el) => { inputRef = el }}
      />
    )

    const dateInput = await DateInputLocator.find()

    expect(inputRef.focused).to.be.false()

    inputRef.focus()

    expect(inputRef.focused).to.be.true()

    const input = await dateInput.findInput()
    expect(input.focused()).to.be.true()
  })

  it('should use the date value (when controlled)', async () => {
    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        onDateChange={stub()}
        dateValue="2017-05-01"
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()
    expect(input.getAttribute('value')).to.equal('May 1, 2017')
  })

  it('should clear the input value when an empty string is passed as the date value', async () => {
    const subject = await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        onDateChange={stub()}
        dateValue="2017-05-01"
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()

    expect(input.getAttribute('value')).to.equal('May 1, 2017')

    await subject.setProps({dateValue: ''})

    expect(input.getAttribute('value')).to.equal('')
  })

  it('should use the updated date value (when controlled)', async () => {
    const subject = await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        onDateChange={stub()}
        dateValue="2017-05-01"
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()

    expect(input.getAttribute('value')).to.equal('May 1, 2017')

    await subject.setProps({dateValue: '2017-06-01'})

    expect(input.getAttribute('value')).to.equal('June 1, 2017')
  })

  it('should update date when locale changed', async () => {
    const subject = await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        onDateChange={stub()}
        dateValue="2017-05-01"
        locale="en-US"
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()

    expect(input.getAttribute('value')).to.equal('May 1, 2017')

    await subject.setProps({locale: 'fr'})

    expect(input.getAttribute('value')).to.equal('1 mai 2017')
  })

  it('should update date when timezone changed', async () => {
    const subject = await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        onDateChange={stub()}
        dateValue="2017-05-01T02:00:00+08:00"
        timezone="Asia/Shanghai"
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()
    expect(input.getAttribute('value')).to.equal('May 1, 2017')

    await subject.setProps({timezone: 'America/Denver'})

    expect(input.getAttribute('value')).to.equal('April 30, 2017')
  })

  it('should use the specified date format in TextInput', async () => {
    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        defaultDateValue="2017-05-01"
        format="DD/YYYY/MM"
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()
    expect(input.getAttribute('value')).to.equal('01/2017/05')
  })

  it('should parse the input string in the specified locale and timezone', async () => {
    const onDateChange = stub()

    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        locale="fr"
        timezone="Europe/Paris"
        onDateChange={onDateChange}
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()

    await input.change({target: { value: '1/5/2017' }})
    await input.keyDown('enter')

    expect(onDateChange.getCall(0).args[1]).to.equal('2017-05-01T00:00:00.000+02:00')
  })

  it('should forward the current date, locale, timezone, disabledDays, and disabledDaysOfWeek to the DatePicker', async () => {
    const disabledDays = [new Date()]
    const disabledDaysOfWeek = [1, 5]

    let datePicker

    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        defaultDateValue="2017-05-01"
        timezone="Europe/Paris"
        locale="fr"
        disabledDaysOfWeek={disabledDaysOfWeek}
        disabledDays={disabledDays}
        datePickerRef={(el) => { datePicker = el }}
      />
    )

    const dateInput = await DateInputLocator.find()

    const input = await dateInput.findInput()
    await input.click()

    expect(datePicker.props).to.include({
      locale: 'fr',
      timezone: 'Europe/Paris',
      selectedValue: '2017-05-01T00:00:00.000+02:00',
      disabledDays
    })

    expect(datePicker.props.disabledDaysOfWeek).to.equal(disabledDaysOfWeek)
  })

  it('should not forward certain props to the TextInput', async () => {
    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        defaultDateValue="2017-05-01"
        type="checkbox"
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()
    expect(input.getAttribute('type')).to.not.equal('checkbox')
  })

  it('should accept the input string when valid', async () => {
    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()

    await input.change({target: { value: '5/1/2017' }})
    const keyDownEvent = await input.keyDown('enter')

    expect(keyDownEvent.preventDefault).to.have.been.called()
    expect(input.getAttribute('value')).to.equal('May 1, 2017')
  })

  it('should not accept the input string when invalid', async () => {
    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()

    await input.change({target: { value: 'not a date' }})
    const keyDownEvent = await input.keyDown('enter')

    expect(keyDownEvent.preventDefault).to.have.been.called()
    expect(input.getAttribute('value')).to.equal('not a date')
  })

  it('should accept the date picker choice', async () => {
    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        defaultDateValue="2017-05-01"
      />
    )

    const dateInput = await DateInputLocator.find()

    const input = await dateInput.findInput()
    await input.click()

    const datePicker = await dateInput.findDatePicker()

    const button = await datePicker.findDate(':textContent(17)')
    await button.click()

    expect(input.getDOMNode().value).to.equal('May 17, 2017')
  })

  it('should render success message when input is valid', async () => {
    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        defaultDateValue="2017-05-01"
      />
    )
    const dateInput = await DateInputLocator.find()

    expect(await dateInput.find(':contains(May 1, 2017)')).to.exist()
  })

  it('should render success message and passed in message from prop', async () => {
    const label = 'foo'
    const errorText = 'error text'
    const dateText = 'May 1, 2017'

    await mount(
      <DateInput
        label={label}
        previousLabel="bar"
        nextLabel="baz"
        defaultDateValue="2017-05-01"
        messages={[{ text: errorText, type: 'error' }]}
      />
    )
    const dateInput = await DateInputLocator.find()

    expect(await dateInput.find(`:contains(${dateText})`)).to.exist()
    expect(await dateInput.find(`:contains(${errorText})`)).to.exist()

    expect(dateInput.getTextContent()).to.equal(label + dateText + errorText)
  })

  it('should render the disabledDateMessage if the date is disabled', async () => {
    const disabledDateMessage = "Date is disabled!!"
    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        defaultDateValue="2017-05-01"
        disabledDays={[new Date(2017, 4, 1)]}
        disabledDateMessage={disabledDateMessage}
      />
    )

    const dateInput = await DateInputLocator.find()

    expect(await dateInput.find(`:contains(${disabledDateMessage})`)).to.exist()
  })

  it('should render a default disabledDateMessage if no message was provided', async () => {
    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        defaultDateValue="2017-05-01"
        disabledDays={[new Date(2017, 4, 1)]}
      />
    )

    const dateInput = await DateInputLocator.find()

    expect(await dateInput.find(':contains(May 1, 2017 is disabled)')).to.exist()
  })

  it('should render fail message when input is invalid', async () => {
    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        defaultDateValue="2017-05-01"
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()

    await input.change({target: { value: 'a' }})

    expect(await dateInput.find(':contains(Invalid date)')).to.exist()
  })

  it('should not render messages when validationFeedback is false', async () => {
    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        defaultDateValue="2017-05-01"
        validationFeedback={false}
      />
    )

    const dateInput = await DateInputLocator.find()
    expect(dateInput.getTextContent()).to.equal('foo')
  })

  it('should not render messages when input is blank', async () => {
    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        defaultDateValue="2017-05-01"
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()

    await input.change({target: { value: 'not a date' }})
    await input.change({target: { value: '' }})

    expect(dateInput.getTextContent()).to.equal('foo')
  })

  it('should fire the onDateChange event when DatePicker value changes', async () => {
    const onDateChange = stub()

    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        defaultDateValue="2017-05-01"
        onDateChange={onDateChange}
        dateValue={new Date('2017-05-02T13:40:00').toISOString()}
      />
    )

    const dateInput = await DateInputLocator.find()

    const input = await dateInput.findInput()
    await input.click()

    const datePicker = await dateInput.findDatePicker()
    const button = await datePicker.findDate(':textContent(17)')

    await button.click()

    expect(onDateChange).to.have.been.called()
    expect(onDateChange.getCall(0).args[1]).to.include('2017-05-17')
  })

  it('should fire the onDateChange event with rawConversionFailed=false when DatePicker value is valid', async () => {
    const onDateChange = stub()

    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        defaultDateValue="2017-05-01"
        onDateChange={onDateChange}
        dateValue={new Date('2017-05-02T13:40:00').toISOString()}
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()
    await input.click()

    const datePicker = await dateInput.findDatePicker()
    const button = await datePicker.findDate(':textContent(17)')

    await button.click()

    expect(onDateChange).to.have.been.called()
    expect(onDateChange.getCall(0).args[3]).to.equal(false)
  })

  it('should fire the onDateChange event with rawConversionFailed=true event when DatePicker value is invalid', async () => {
    const onDateChange = stub()
    stub(console, 'error')

    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        defaultDateValue="2017-05-01"
        onDateChange={onDateChange}
        dateValue={new Date('2017-05-02T13:40:00').toISOString()}
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()

    await input.change({target: { value: 'a' }})
    await input.keyDown('enter')

    expect(onDateChange).to.have.been.called()
    expect(onDateChange.getCall(0).args[3]).to.equal(true)
  })

  it('fires the onDateChange event when DatePicker value is changed from empty to an invalid value', async () => {
    const onDateChange = stub()
    stub(console, 'error')

    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        defaultDateValue="2017-05-01"
        onDateChange={onDateChange}
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()

    await input.change({target: { value: 'not a date' }})
    await input.blur()

    expect(onDateChange).to.have.been.calledOnce()
  })

  it('fires the onDateChange event when DatePicker value is changed from an invalid value to empty', async () => {
    const onDateChange = stub()
    stub(console, 'error')

    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        defaultDateValue="2017-05-01"
        onDateChange={onDateChange}
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()

    await input.change({target: { value: 'not a date' }})
    await input.blur()

    await input.change({target: { value: '' }})
    await input.blur()

    expect(onDateChange).to.have.been.calledTwice()
  })

  it('should fire the onDateChange event with dateIsDisabled=true event when the date is disabled', async () => {
    const onDateChange = stub()
    stub(console, 'error')

    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        defaultDateValue="2017-05-01"
        onDateChange={onDateChange}
        dateValue={new Date('2017-05-02T13:40:00').toISOString()}
        disabledDays={[new Date(2017, 4, 3)]}
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()

    await input.change({target: { value: '5/3/2017' }})
    await input.blur()

    expect(onDateChange).to.have.been.called()
    expect(onDateChange.getCall(0).args[4]).to.equal(true)
  })

  it('should fire the onDateChange event with dateIsDisabled=false event when the date is enabled', async () => {
    const onDateChange = stub()
    stub(console, 'error')

    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        defaultDateValue="2017-05-01"
        onDateChange={onDateChange}
        dateValue={new Date('2017-05-02T13:40:00').toISOString()}
        disabledDays={[new Date(2017, 4, 3)]}
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()

    await input.change({target: { value: '5/4/2017' }})
    await input.blur()

    expect(onDateChange).to.have.been.called()
    expect(onDateChange.getCall(0).args[4]).to.equal(false)
  })

  it('should not touch the time portion of the initial value when DatePicker value changes', async () => {
    const onDateChange = stub()

    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        locale="fr"
        timezone="Europe/Paris"
        defaultDateValue="2017-05-01T13:40:00+02:00"
        onDateChange={onDateChange}
      />
    )

    const dateInput = await DateInputLocator.find()

    const input = await dateInput.findInput()
    await input.click()

    const datePicker = await dateInput.findDatePicker()
    const button = await datePicker.findDate(':textContent(17)')

    await button.click()

    expect(onDateChange).to.have.been.called()
    expect(onDateChange.getCall(0).args[1]).to.eq('2017-05-17T13:40:00.000+02:00')
  })

  it('should fire the onDateChange event when TextInput value changes', async () => {
    const onDateChange = stub()

    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        onDateChange={onDateChange}
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()

    await input.change({target: { value: '5/1/2017' }})
    await input.keyDown('enter')

    expect(onDateChange).to.have.been.called()
    expect(onDateChange.getCall(0).args[1]).to.include('2017-05-01')
  })

  it('should not fire the onDateChange event when TextInput value change is not a date change', async () => {
    const onDateChange = stub()

    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        onDateChange={onDateChange}
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()

    await input.change({target: { value: 'Nov' }})
    await input.keyDown('enter')

    expect(onDateChange).to.have.been.calledOnce()

    await input.change({target: { value: 'Nove' }})
    await input.keyDown('enter')

    expect(onDateChange).to.have.been.calledOnce()
  })

  it('should fire the onDateChange event with rawConversionFailed=false when value is valid', async () => {
    const onDateChange = stub()

    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        onDateChange={onDateChange}
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()

    await input.change({target: { value: '5/1/2017' }})
    await input.keyDown('enter')

    expect(onDateChange).to.have.been.called()
    expect(onDateChange.getCall(0).args[3]).to.equal(false)
  })

  it('should fire the onDateChange event with rawConversionFailed=false when value is blank', async () => {
    const onDateChange = stub()

    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        onDateChange={onDateChange}
        defaultDateValue="2017-05-01"
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()

    await input.change({target: { value: '' }})
    await input.keyDown('enter')

    expect(onDateChange).to.have.been.called()
    expect(onDateChange.getCall(0).args[3]).to.equal(false)
  })

  it('should fire the onDateChange event with `undefined` when TextInput value is invalid', async () => {
    const onDateChange = stub()

    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        onDateChange={onDateChange}
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()

    await input.change({target: { value: '5/1/2017' }})
    await input.keyDown('enter')

    await input.change({target: { value: 'invalid' }})
    await input.keyDown('enter')

    expect(onDateChange).to.have.been.called()
    expect(onDateChange.getCall(1).args[1]).to.equal(undefined) // eslint-disable-line no-undefined
  })

  it('should fire the onDateChange event with rawConversionFailed=true when TextInput value is invalid', async () => {
    const onDateChange = stub()

    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        onDateChange={onDateChange}
        defaultDateValue="2017-05-01"
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()

    await input.change({target: { value: 'invalid' }})
    await input.keyDown('enter')

    expect(onDateChange).to.have.been.called()
    expect(onDateChange.getCall(0).args[3]).to.equal(true)
  })

  it('should fire the onDateChange event with the raw input as third arg', async () => {
    const onDateChange = stub()

    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        onDateChange={onDateChange}
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()

    await input.change({target: { value: 'May 1 2017 panda' }})
    await input.keyDown('enter')

    expect(onDateChange).to.have.been.called()
    expect(onDateChange.getCall(0).args[2]).to.equal('May 1, 2017')
  })

  it('should meet a11y standards', async () => {
    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        defaultDateValue="2017-05-01"
      />
    )

    const dateInput = await DateInputLocator.find()
    expect(await dateInput.accessible()).to.be.true()
  })

  it('should display "Invalid date" on an invalid date', async () => {
    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        defaultDateValue="2017-05-01"
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()
    await input.change({target: { value: 'foo' }})

    expect(await dateInput.find(':contains(Invalid date)')).to.exist()
  })

  it('should display invalidDateMessage on an invalid date when present', async () => {
    const invalidDateMessage = "Invalid date message"
    await mount(
      <DateInput
        label="foo"
        previousLabel="bar"
        nextLabel="baz"
        defaultDateValue="2017-05-01"
        invalidDateMessage={invalidDateMessage}
      />
    )

    const dateInput = await DateInputLocator.find()
    const input = await dateInput.findInput()
    await input.change({target: { value: 'foo' }})

    expect(await dateInput.find(`:contains(${invalidDateMessage})`)).to.exist()
  })
})
/* eslint-disable mocha/no-synchronous-tests */
