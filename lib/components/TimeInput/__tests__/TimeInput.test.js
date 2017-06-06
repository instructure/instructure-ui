import React from 'react'
import TimeInput from '../index'
import moment from 'moment'
import 'moment-timezone/builds/moment-timezone-with-data'

describe('<TimeInput />', function () {
  const testbed = new Testbed(<TimeInput label="fake label" timezone="US/Eastern" />)

  it('should render', function () {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('renders the specified value when present', function () {
    const value = moment.tz('1986-05-17T18:00:00.000Z', 'US/Eastern')
    const subject = testbed.render({
      value: value.toISOString(),
      onChange: () => {}
    })

    expect(subject.find('input').getDOMNode().value).to.eq(value.format(subject.prop('format')))
  })

  it('renders the specified default value when present', function () {
    const defaultValue = moment.tz('1986-05-25T19:00:00.000Z', 'US/Eastern')
    const subject = testbed.render({
      defaultValue: defaultValue.toISOString()
    })

    expect(subject.find('input').getDOMNode().value).to.eq(defaultValue.format(subject.prop('format')))
  })

  it('renders the specified value when both default value and value are set', function () {
    const value = moment.tz('1986-05-17T18:00:00.000Z', 'US/Eastern')
    const defaultValue = moment.tz('1986-05-25T19:00:00.000Z', 'US/Eastern')
    const subject = testbed.render({
      value: value.toISOString(),
      defaultValue: defaultValue.toISOString(),
      onChange: () => {}
    })

    expect(subject.find('input').getDOMNode().value).to.eq(value.format(subject.prop('format')))
  })

  it('renders using the specified timezone', function () {
    const value = moment.tz('1986-05-17T18:00:00.000Z', 'US/Central')
    const oneHourBackValue = moment.tz('1986-05-17T18:00:00.000Z', 'US/Mountain')
    const oneHourForwardBackValue = moment.tz('1986-05-17T18:00:00.000Z', 'US/Eastern')
    const subject = testbed.render({
      value: value.toISOString(),
      timezone: 'US/Central',
      onChange: () => {}
    })

    expect(subject.find('input').getDOMNode().value).not.to.eq(oneHourBackValue.format(subject.prop('format')))
    expect(subject.find('input').getDOMNode().value).not.to.eq(oneHourForwardBackValue.format(subject.prop('format')))
  })

  it('renders using the specified locale', function () {
    const value = moment.tz('1986-05-17T18:00:00.000Z', 'US/Eastern')
    const subject = testbed.render({
      value: value.toISOString(),
      locale: 'fr',
      onChange: () => {}
    })

    expect(subject.find('input').getDOMNode().value).not.to.eq(value.format(subject.prop('format')))
    expect(subject.find('input').getDOMNode().value).to.eq(value.locale('fr').format(subject.prop('format')))
  })

  it('defaults to the first option when set to do so, no default value is set, and no value is set', function () {
    const subject = testbed.render({
      defaultToFirstOption: true
    })

    expect(subject.find('input').getDOMNode().value).to.eq(document.querySelector('li > span').innerHTML)
  })

  it('renders using the specified step value', function () {
    const value = moment.tz('1986-05-17T18:00:00.000Z', 'US/Eastern')

    const subject = testbed.render({
      step: 15,
      value: value.toISOString(),
      onChange: () => {}
    })

    const optionTexts = document.querySelectorAll('li > span')
    const expctedFirstOptionText = value.hour(0).minute(0).format(subject.prop('format'))
    const expctedSecondOptionText = value.hour(0).minute(15).format(subject.prop('format'))
    expect(optionTexts[0].innerHTML).to.be.eq(expctedFirstOptionText)
    expect(optionTexts[1].innerHTML).to.be.eq(expctedSecondOptionText)
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: ['aria-required-children']
    })
  })
})
