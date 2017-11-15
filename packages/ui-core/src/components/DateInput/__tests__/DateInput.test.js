import React from 'react'
import keycode from 'keycode'

import DateInput from '../index'

function getInputValue (subject) {
  return subject.find('TextInput').props().value
}

describe('<DateInput />', () => {
  const testbed = new Testbed(<DateInput label="foo" previousLabel="bar" nextLabel="baz" />)

  it('should use the default date value', () => {
    const subject = testbed.render({ defaultDateValue: '2017-05-01' })
    expect(getInputValue(subject)).to.equal('May 1, 2017')
  })

  it('should focus the input when focus is called', () => {
    const subject = testbed.render()

    subject.instance().focus()

    expect(subject.find('input').focused()).to.be.true
  })

  it('should use the date value (when controlled)', () => {
    const subject = testbed.render({
      onDateChange: testbed.stub(),
      dateValue: '2017-05-01'
    })
    expect(getInputValue(subject)).to.equal('May 1, 2017')
  })

  it('should use the updated date value (when controlled)', () => {
    const subject = testbed.render({
      onDateChange: testbed.stub(),
      dateValue: '2017-05-01'
    })

    expect(getInputValue(subject)).to.equal('May 1, 2017')

    subject.setProps({dateValue: '2017-06-01'})

    expect(getInputValue(subject)).to.equal('June 1, 2017')
  })

  it('should use the specified date format in TextInput', () => {
    const subject = testbed.render({ defaultDateValue: '2017-05-01', format: 'DD/YYYY/MM' })
    expect(getInputValue(subject)).to.equal('01/2017/05')
  })

  it('should parse the input string in the specified locale and timezone', () => {
    const onDateChange = testbed.stub()
    const subject = testbed.render({
      locale: 'fr',
      timezone: 'Europe/Paris',
      onDateChange
    })

    subject.find('input').setValue('1/5/2017')
    subject.find('input').keyDown('enter')

    expect(onDateChange.getCall(0).args[1]).to.equal('2017-05-01T00:00:00+02:00')
  })

  it('should forward the current date, locale, and timezone to the DatePicker', () => {
    // Popovers are tricky because of the portal, so we need to do this
    let datePicker = null
    const datePickerRef = dp => {
      datePicker = dp
    }

    const subject = testbed.render({
      locale: 'fr',
      timezone: 'Europe/Paris',
      defaultDateValue: '2017-05-01',
      datePickerRef
    })
    subject.find('input').simulate('click')
    expect(datePicker.props).to.include({
      locale: 'fr',
      timezone: 'Europe/Paris',
      selectedValue: '2017-05-01T00:00:00+02:00'
    })
  })

  it('should not forward certain props to the TextInput', () => {
    const subject = testbed.render({ type: 'foo' })

    expect(subject.find('TextInput').props()).to.not.include({ type: 'foo' })
  })

  it('should accept the input string when valid', () => {
    const preventDefault = testbed.stub()
    const subject = testbed.render()

    subject.find('input').setValue('5/1/2017')
    subject.find('input').simulate('keyDown', { keyCode: keycode.codes.enter, preventDefault })

    expect(preventDefault).to.have.been.called
    expect(getInputValue(subject)).to.equal('May 1, 2017')
  })

  it('should not accept the input string when invalid', () => {
    const preventDefault = testbed.stub()
    const subject = testbed.render()

    subject.find('input').setValue('not a date')
    subject.find('input').simulate('keyDown', { keyCode: keycode.codes.enter, preventDefault })

    expect(preventDefault).to.have.been.called
    expect(getInputValue(subject)).to.equal('not a date')
  })

  it('should accept the date picker choice', () => {
    const subject = testbed.render()
    subject.instance().handleCalendarSelect(null, '2017-05-01')
    expect(getInputValue(subject)).to.equal('May 1, 2017')
  })

  it('should render success message when input is valid', () => {
    const subject = testbed.render()
    subject.find('input').setValue('5/1/2017')

    expect(subject.find('TextInput').props().messages).to.deep.equal([{ text: 'May 1, 2017', type: 'success' }])
  })

  it('should render success message and passed in message from prop', () => {
    const errorText = 'error text'
    const dateText = 'May 1, 2017'
    const subject = testbed.render({ messages: [{ text: errorText, type: 'error' }] })

    subject.find('input').setValue('5/1/2017')

    expect(subject.find('TextInput').props().messages).to.deep.equal([
      { text: dateText, type: 'success' },
      { text: errorText, type: 'error' }
    ])
    expect(subject.text()).to.equal(subject.props().label + dateText + errorText)
  })

  it('should render fail message when input is invalid', () => {
    const subject = testbed.render()

    subject.find('input').setValue('invalid')

    expect(subject.find('TextInput').props().messages[0]).to.deep.equal({ text: 'Invalid date', type: 'error' })
  })

  it('should not render messages when validationFeedback is false', () => {
    const subject = testbed.render({ validationFeedback: false })
    subject.find('input').setValue('5/1/2017')
    expect(subject.find('TextInput').props().messages).to.deep.equal([])
  })

  it('should not render messages when input is blank', () => {
    const subject = testbed.render()
    subject.find('input').setValue('not a date')
    subject.find('input').setValue('')
    expect(subject.find('TextInput').props().messages).to.deep.equal([])
  })

  it('should fire the onDateChange event when DatePicker value changes', () => {
    const onDateChange = testbed.stub()
    const subject = testbed.render({
      onDateChange,
      dateValue: new Date('2017-05-02T13:40:00').toISOString()
    })
    subject.instance().handleCalendarSelect(null, '2017-05-01')
    expect(onDateChange).to.have.been.called
    expect(onDateChange.getCall(0).args[1]).to.include('2017-05-01')
  })

  it('should fire the onDateChange event with rawConversionFailed=false when DatePicker value is valid', () => {
    const onDateChange = testbed.stub()
    const subject = testbed.render({
      onDateChange,
      dateValue: new Date('2017-05-02T13:40:00').toISOString()
    })
    subject.instance().handleCalendarSelect(null, '2017-05-01')
    expect(onDateChange).to.have.been.called
    expect(onDateChange.getCall(0).args[3]).to.equal(false)
  })

  it('should fire the onDateChange event with rawConversionFailed=true event when DatePicker value is invalid', () => {
    const onDateChange = testbed.stub()
    const OrigConsoleError = console.error
    console.error = testbed.stub()

    const subject = testbed.render({
      onDateChange,
      dateValue: new Date('2017-05-01T13:40:00').toISOString()
    })

    subject.instance().handleCalendarSelect(null, 'not a date')

    expect(onDateChange).to.have.been.called
    expect(onDateChange.getCall(0).args[3]).to.equal(true)

    console.error = OrigConsoleError
  })

  it('should not touch the time portion of the initial value when DatePicker value changes', () => {
    const onDateChange = testbed.stub()
    const subject = testbed.render({
      locale: 'fr',
      timezone: 'Europe/Paris',
      onDateChange,
      defaultDateValue: '2017-05-01T13:40:00+02:00'
    })

    subject.instance().handleCalendarSelect(null, '2017-05-02T00:00:00+02:00')

    expect(onDateChange).to.have.been.called
    expect(onDateChange.getCall(0).args[1]).to.eq('2017-05-02T13:40:00+02:00')
  })

  it('should fire the onDateChange event when TextInput value changes', () => {
    const onDateChange = testbed.stub()
    const subject = testbed.render({ onDateChange })

    subject.find('input').setValue('5/1/2017')
    subject.find('input').keyDown('enter')

    expect(onDateChange).to.have.been.called
    expect(onDateChange.getCall(0).args[1]).to.include('2017-05-01')
  })

  it('should not fire the onDateChange event when TextInput value change is not a date change', () => {
    const onDateChange = testbed.stub()
    const subject = testbed.render({ onDateChange })

    subject.find('input').setValue('Nov')
    subject.find('input').keyDown('enter')

    expect(onDateChange).to.have.been.calledOnce

    subject.find('input').setValue('Nove')
    subject.find('input').keyDown('enter')

    expect(onDateChange).to.have.been.calledOnce
  })

  it('should fire the onDateChange event with rawConversionFailed=false when value is valid', () => {
    const onDateChange = testbed.stub()
    const subject = testbed.render({ onDateChange })

    subject.find('input').setValue('5/1/2017')
    subject.find('input').keyDown('enter')

    expect(onDateChange).to.have.been.called
    expect(onDateChange.getCall(0).args[3]).to.equal(false)
  })

  it('should fire the onDateChange event with rawConversionFailed=false when value is blank', () => {
    const onDateChange = testbed.stub()
    const subject = testbed.render({ onDateChange, defaultDateValue: '2017-05-01' })

    subject.find('input').setValue('')
    subject.find('input').keyDown('enter')

    expect(onDateChange).to.have.been.called
    expect(onDateChange.getCall(0).args[3]).to.equal(false)
  })

  it('should fire the onDateChange event with `undefined` when TextInput value is invalid', () => {
    const onDateChange = testbed.stub()
    const subject = testbed.render({ onDateChange })

    subject.find('input').setValue('5/1/2017')
    subject.find('input').keyDown('enter')

    subject.find('input').setValue('invalid')
    subject.find('input').keyDown('enter')

    expect(onDateChange).to.have.been.called
    expect(onDateChange.getCall(1).args[1]).to.equal(undefined)
  })

  it('should fire the onDateChange event with rawConversionFailed=true when TextInput value is invalid', () => {
    const onDateChange = testbed.stub()
    const subject = testbed.render({ onDateChange, defaultDateValue: '2017-05-01' })

    subject.find('input').setValue('invalid')
    subject.find('input').keyDown('enter')

    expect(onDateChange).to.have.been.called
    expect(onDateChange.getCall(0).args[3]).to.equal(true)
  })

  it('should fire the onDateChange event with the raw input as third arg', () => {
    const onDateChange = testbed.stub()
    const subject = testbed.render({ onDateChange })

    subject.find('input').setValue('May 1 2017 panda')
    subject.find('input').keyDown('enter')

    expect(onDateChange).to.have.been.called
    expect(onDateChange.getCall(0).args[2]).to.equal('May 1 2017 panda')
  })

  it('should meet a11y standards', done => {
    const subject = testbed.render()
    subject.should.be.accessible(done, {})
  })

  it('should display "Invalid date" on an invalid date', () => {
    const subject = testbed.render()

    subject.find('input').setValue('foo')

    expect(subject.find('TextInput').prop('messages')).to.deep.equal([
      {
        text: 'Invalid date',
        type: 'error'
      }
    ])
  })

  it('should display invalidDateMessage on an invalid date when present', () => {
    const subject = testbed.render({ invalidDateMessage: "Invalid date message" })

    subject.find('input').setValue('foo')

    expect(subject.find('TextInput').prop('messages')).to.deep.equal([
      {
        text: 'Invalid date message',
        type: 'error'
      }
    ])
  })
})
