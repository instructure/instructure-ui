import React from 'react'
import DateTime from '@instructure/ui-utils/lib/i18n/DateTime'

import TimeInput from '../index'

describe('<TimeInput />', () => {
  const testbed = new Testbed(<TimeInput label="fake label" timezone="US/Eastern" />)

  it('should render', () => {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('renders the specified value when present', () => {
    const value = DateTime.parse('1986-05-17T18:00:00.000Z', 'en', 'US/Eastern')
    const subject = testbed.render({
      value: value.toISOString(),
      onChange: () => {}
    })

    expect(subject.find('input').getDOMNode().value).to.eq(value.format(subject.prop('format')))
  })

  it('renders the specified default value when present', () => {
    const defaultValue = DateTime.parse('1986-05-25T19:00:00.000Z', 'en', 'US/Eastern')
    const subject = testbed.render({
      defaultValue: defaultValue.toISOString()
    })

    expect(subject.find('input').getDOMNode().value).to.eq(defaultValue.format(subject.prop('format')))
  })

  it('renders the specified value when both default value and value are set', () => {
    const value = DateTime.parse('1986-05-17T18:00:00.000Z', 'en', 'US/Eastern')
    const defaultValue = DateTime.parse('1986-05-25T19:00:00.000Z', 'en', 'US/Eastern')
    const subject = testbed.render({
      value: value.toISOString(),
      defaultValue: defaultValue.toISOString(),
      onChange: () => {}
    })

    expect(subject.find('input').getDOMNode().value).to.eq(value.format(subject.prop('format')))
  })

  it('renders using the specified timezone', () => {
    const value = DateTime.parse('1986-05-17T18:00:00.000Z', 'en', 'US/Central')
    const oneHourBackValue = DateTime.parse('1986-05-17T18:00:00.000Z', 'en', 'US/Mountain')
    const oneHourForwardBackValue = DateTime.parse('1986-05-17T18:00:00.000Z', 'en', 'US/Eastern')
    const subject = testbed.render({
      value: value.toISOString(),
      timezone: 'US/Central',
      onChange: () => {}
    })

    expect(subject.find('input').getDOMNode().value).not.to.eq(oneHourBackValue.format(subject.prop('format')))
    expect(subject.find('input').getDOMNode().value).not.to.eq(oneHourForwardBackValue.format(subject.prop('format')))
  })

  it('renders using the specified locale', () => {
    const value = DateTime.parse('1986-05-17T18:00:00.000Z', 'en', 'US/Eastern')
    const subject = testbed.render({
      value: value.toISOString(),
      locale: 'fr',
      onChange: () => {}
    })

    expect(subject.find('input').getDOMNode().value).not.to.eq(value.format(subject.prop('format')))
    expect(subject.find('input').getDOMNode().value).to.eq(value.locale('fr').format(subject.prop('format')))
  })

  it('defaults to the first option when set to do so, no default value is set, and no value is set', () => {
    const subject = testbed.render({
      defaultToFirstOption: true
    })

    expect(subject.find('input').getDOMNode().value).to.eq(document.querySelector('li > span').textContent)
  })

  it('renders using the specified step value', () => {
    const value = DateTime.parse('1986-05-17T18:00:00.000Z', 'en', 'US/Eastern')

    const subject = testbed.render({
      step: 15,
      value: value.toISOString(),
      onChange: () => {}
    })

    const optionTexts = document.querySelectorAll('li > span')
    const expctedFirstOptionText = value.hour(0).minute(0).format(subject.prop('format'))
    const expctedSecondOptionText = value.hour(0).minute(15).format(subject.prop('format'))
    expect(optionTexts[0].textContent).to.be.eq(expctedFirstOptionText)
    expect(optionTexts[1].textContent).to.be.eq(expctedSecondOptionText)
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: ['aria-required-children']
    })
  })
})
