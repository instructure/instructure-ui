import React from 'react'
import DateInput from '../index'

function getInputValue (subject) {
  return subject.find('input').getDOMNode().value
}

describe('<DateInput />', () => {
  const testbed = new Testbed(<DateInput label="foo" previousLabel="bar" nextLabel="baz" />)

  it('should use the default date value', () => {
    const subject = testbed.render({ defaultDateValue: '2017-05-01' })
    expect(getInputValue(subject)).to.equal('May 1, 2017')
  })

  it('should use the date value (when controlled)', () => {
    const subject = testbed.render({
      onDateChange: testbed.stub(),
      dateValue: '2017-05-01'
    })
    expect(getInputValue(subject)).to.equal('May 1, 2017')
  })

  it('should use the specified date format in TextInput', () => {
    const subject = testbed.render({ defaultDateValue: '2017-05-01', format: 'DD/YYYY/MM' })
    expect(getInputValue(subject)).to.equal('01/2017/05')
  })

  it('should parse the input string in the specified locale and timezone', () => {
    const subject = testbed.render({ locale: 'fr', timezone: 'Europe/Paris' })
    subject.instance().handleTextInputChange({ target: { value: '1/5/2017' } })
    expect(subject.instance().getCurrentDate()).to.equal('2017-05-01T00:00:00+02:00')
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
    subject.instance().handleTextInputChange({ target: { value: '5/1/2017' } })
    subject.find('input').simulate('keyDown', { key: 'Enter', preventDefault })
    expect(preventDefault).to.have.been.called
    expect(getInputValue(subject)).to.equal('May 1, 2017')
  })

  it('should not accept the input string when invalid', () => {
    const preventDefault = testbed.stub()
    const subject = testbed.render()
    subject.instance().handleTextInputChange({ target: { value: 'not a date' } })
    subject.find('input').simulate('keyDown', { key: 'Enter', preventDefault })
    expect(preventDefault).to.have.been.called
    expect(getInputValue(subject)).to.equal('not a date')
  })

  it('should accept the date picker choice', () => {
    const subject = testbed.render()
    subject.instance().handleDatePickerChange(null, '2017-05-01')
    expect(getInputValue(subject)).to.equal('May 1, 2017')
  })

  it('should render success message when input is valid', () => {
    const subject = testbed.render()
    subject.instance().handleTextInputChange({ target: { value: '5/1/2017' } })
    expect(subject.find('TextInput').props().messages).to.deep.equal([{ text: 'May 1, 2017', type: 'success' }])
  })

  it('should render success message and passed in message from prop', () => {
    const errorText = 'error text'
    const dateText = 'May 1, 2017'
    const subject = testbed.render({ messages: [{ text: errorText, type: 'error' }] })
    subject.instance().handleTextInputChange({ target: { value: '5/1/2017' } })
    expect(subject.find('TextInput').props().messages).to.deep.equal([
      { text: dateText, type: 'success' },
      { text: errorText, type: 'error' }
    ])
    expect(subject.text()).to.equal(subject.props().label + dateText + errorText)
  })

  it('should render fail message when input is invalid', () => {
    const subject = testbed.render()
    subject.instance().handleTextInputChange({ target: { value: 'invalid' } })
    expect(subject.find('TextInput').props().messages).to.deep.equal([{ text: 'Invalid date', type: 'error' }])
  })

  it('should not render messages when validationFeedback is false', () => {
    const subject = testbed.render({ validationFeedback: false })
    subject.instance().handleTextInputChange({ target: { value: '5/1/2017' } })
    expect(subject.find('TextInput').props().messages).to.deep.equal([])
  })

  it('should not render messages when input is blank', () => {
    const subject = testbed.render()
    subject.instance().handleTextInputChange({ target: { value: 'not a date' } })
    subject.instance().handleTextInputChange({ target: { value: '' } })
    expect(subject.find('TextInput').props().messages).to.deep.equal([])
  })

  it('should fire the onDateChange event when DatePicker value changes', () => {
    const onDateChange = testbed.stub()
    const subject = testbed.render({
      onDateChange,
      dateValue: new Date('2017-05-01T13:40:00').toISOString()
    })
    subject.instance().handleDatePickerChange(null, '2017-05-01')
    expect(onDateChange).to.have.been.called
    expect(onDateChange.getCall(0).args[1]).to.include('2017-05-01')
  })

  it('should fire the onDateChange event with rawConversionFailed false when DatePicker value is valid', () => {
    const onDateChange = testbed.stub()
    const subject = testbed.render({
      onDateChange,
      dateValue: new Date('2017-05-01T13:40:00').toISOString()
    })
    subject.instance().handleDatePickerChange(null, '2017-05-01')
    expect(onDateChange).to.have.been.called
    expect(onDateChange.getCall(0).args[3]).to.equal(false)
  })

  it('should fire the onDateChange event with rawConversionFailed true when DatePicker value is invalid', () => {
    const onDateChange = testbed.stub()
    const OrigConsoleError = console.error
    console.error = testbed.stub()
    const subject = testbed.render({
      onDateChange,
      dateValue: new Date('2017-05-01T13:40:00').toISOString()
    })
    subject.instance().handleDatePickerChange(null, 'not a date')
    expect(onDateChange).to.have.been.called
    expect(onDateChange.getCall(0).args[3]).to.equal(true)
    console.error = OrigConsoleError
  })

  it('should not touch the time portion of the initial value when DatePicker value changes', () => {
    const dateString = new Date('2017-05-01T13:40:00').toISOString()
    const onDateChange = testbed.stub({
      defaultDateValue: dateString
    })
    const subject = testbed.render({ onDateChange })
    subject.instance().handleDatePickerChange(null, dateString)
    expect(onDateChange).to.have.been.called
    const newDate = new Date(onDateChange.getCall(0).args[1])
    expect(newDate.toISOString()).to.eq(dateString)
  })

  it('should fire the onDateChange event when TextInput value changes', () => {
    const onDateChange = testbed.stub()
    const subject = testbed.render({ onDateChange })
    subject.instance().handleTextInputChange({ target: { value: '5/1/2017' } })
    expect(onDateChange).to.have.been.called
    expect(onDateChange.getCall(0).args[1]).to.include('2017-05-01')
  })

  it('should fire the onDateChange event with rawConversionFailed false when value is valid', () => {
    const onDateChange = testbed.stub()
    const subject = testbed.render({ onDateChange })
    subject.instance().handleTextInputChange({ target: { value: '5/1/2017' } })
    expect(onDateChange).to.have.been.called
    expect(onDateChange.getCall(0).args[3]).to.equal(false)
  })

  it('should fire the onDateChange event with rawConversionFailed false when value is blank', () => {
    const onDateChange = testbed.stub()
    const subject = testbed.render({ onDateChange })
    subject.instance().handleTextInputChange({ target: { value: '' } })
    expect(onDateChange).to.have.been.called
    expect(onDateChange.getCall(0).args[3]).to.equal(false)
  })

  it('should fire the onDateChange event with null when TextInput value is invalid', () => {
    const onDateChange = testbed.stub()
    const subject = testbed.render({ onDateChange })
    subject.instance().handleTextInputChange({ target: { value: 'invalid' } })
    expect(onDateChange).to.have.been.called
    expect(onDateChange.getCall(0).args[1]).to.equal(null)
  })

  it('should fire the onDateChange event with rawConversionFailed true when TextInput value is invalid', () => {
    const onDateChange = testbed.stub()
    const subject = testbed.render({ onDateChange })
    subject.instance().handleTextInputChange({ target: { value: 'invalid' } })
    expect(onDateChange).to.have.been.called
    expect(onDateChange.getCall(0).args[3]).to.equal(true)
  })

  it('should fire the onDateChange event with the raw input as third arg', () => {
    const onDateChange = testbed.stub()
    const subject = testbed.render({ onDateChange })
    subject.instance().handleTextInputChange({ target: { value: 'May 1 2017 panda' } })
    expect(onDateChange).to.have.been.called
    expect(onDateChange.getCall(0).args[2]).to.equal('May 1 2017 panda')
  })

  it('should meet a11y standards', done => {
    const subject = testbed.render()
    subject.should.be.accessible(done, {})
  })
})
