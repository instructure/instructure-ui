import React from 'react'
import DateInput from '../index'

function getInputValue (subject) {
  return subject.find('input').getDOMNode().value
}

describe('<DateInput />', function () {
  const testbed = new Testbed(<DateInput label="foo" previousLabel="bar" nextLabel="baz" />)

  it('should use the default date value', () => {
    const subject = testbed.render({defaultDateValue: '2017-05-01'})
    expect(getInputValue(subject)).to.equal('May 1, 2017')
  })

  it('should use the specified date format in TextInput', () => {
    const subject = testbed.render({defaultDateValue: '2017-05-01', format: 'DD/YYYY/MM'})
    expect(getInputValue(subject)).to.equal('01/2017/05')
  })

  it('should parse the input string in the specified locale and timezone', () => {
    const subject = testbed.render({locale: 'fr', timezone: 'Europe/Paris'})
    subject.instance().handleTextInputChange({target: {value: '1/5/2017'}})
    expect(subject.instance().getCurrentDate()).to.equal('2017-05-01T00:00:00+02:00')
  })

  it('should forward the current date, locale, and timezone to the DatePicker', () => {
    // Popovers are tricky because of the portal, so we need to do this
    let datePicker = null
    const datePickerRef = (dp) => {
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
    const subject = testbed.render({type: 'foo'})
    expect(subject.find('TextInput').props()).to.not.include({type: 'foo'})
  })

  it('should accept the input string when valid', () => {
    const preventDefault = testbed.stub()
    const subject = testbed.render()
    subject.instance().handleTextInputChange({target: {value: '5/1/2017'}})
    subject.find('input').simulate('keyDown', {key: 'Enter', preventDefault})
    expect(preventDefault).to.have.been.called
    expect(getInputValue(subject)).to.equal('May 1, 2017')
  })

  it('should not accept the input string when invalid', () => {
    const preventDefault = testbed.stub()
    const subject = testbed.render()
    subject.instance().handleTextInputChange({target: {value: 'not a date'}})
    subject.find('input').simulate('keyDown', {key: 'Enter', preventDefault})
    expect(preventDefault).to.have.been.called
    expect(getInputValue(subject)).to.equal('not a date')
  })

  it('should accept the date picker choice', () => {
    const subject = testbed.render()
    subject.instance().handleDatePickerChange('2017-05-01')
    expect(getInputValue(subject)).to.equal('May 1, 2017')
  })

  it('should render success message when input is valid', () => {
    const subject = testbed.render()
    subject.instance().handleTextInputChange({target: {value: '5/1/2017'}})
    expect(subject.find('TextInput').props().messages).to.deep.equal(
      [{text: 'May 1, 2017', type: 'success'}])
  })

  it('should render success message and passed in message from prop', () => {
    const errorText = 'error text'
    const dateText = 'May 1, 2017'
    const subject = testbed.render({messages: [{ text: errorText, type: 'error' }]})
    subject.instance().handleTextInputChange({target: {value: '5/1/2017'}})
    expect(subject.find('TextInput').props().messages).to.deep.equal(
      [{text: dateText, type: 'success'}, { text: errorText, type: 'error' }])
    expect(subject.text()).to.equal(subject.props().label + dateText + errorText)
  })

  it('should render fail message when input is invalid', () => {
    const subject = testbed.render()
    subject.instance().handleTextInputChange({target: {value: 'invalid'}})
    expect(subject.find('TextInput').props().messages).to.deep.equal(
      [{text: 'Invalid date', type: 'error'}]
    )
  })

  it('should not render messages when validationFeedback is false', () => {
    const subject = testbed.render({validationFeedback: false})
    subject.instance().handleTextInputChange({target: {value: '5/1/2017'}})
    expect(subject.find('TextInput').props().messages).to.deep.equal([])
  })

  it('should not render messages when input is blank', () => {
    const subject = testbed.render()
    subject.instance().handleTextInputChange({target: {value: 'not a date'}})
    subject.instance().handleTextInputChange({target: {value: ''}})
    expect(subject.find('TextInput').props().messages).to.deep.equal([])
  })

  it('should fire the onDateChange event when DatePicker value changes', () => {
    const onDateChange = testbed.stub()
    const subject = testbed.render({onDateChange})
    subject.instance().handleDatePickerChange('2017-05-01')
    expect(onDateChange).to.have.been.called
    expect(onDateChange.getCall(0).args[0]).to.include('2017-05-01')
  })

  it('should fire the onDateChange event when TextInput value changes', () => {
    const onDateChange = testbed.stub()
    const subject = testbed.render({onDateChange})
    subject.instance().handleTextInputChange({target: {value: '5/1/2017'}})
    expect(onDateChange).to.have.been.called
    expect(onDateChange.getCall(0).args[0]).to.include('2017-05-01')
  })

  it('should fire the onDateChange event with null when TextInput value is invalid', () => {
    const onDateChange = testbed.stub()
    const subject = testbed.render({onDateChange})
    subject.instance().handleTextInputChange({target: {value: 'invalid'}})
    expect(onDateChange).to.have.been.called
    expect(onDateChange.getCall(0).args[0]).to.equal(null)
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()
    subject.should.be.accessible(done, {})
  })
})
