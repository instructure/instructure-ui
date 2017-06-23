import React from 'react'
import ApplyLocale from '../index'
import DatePicker from '../../DatePicker'

describe('<ApplyLocale />', function () {
  const testbed = new Testbed(
    <ApplyLocale locale="fr" timezone="Europe/Paris">
      <DatePicker previousLabel="foo" nextLabel="bar" />
    </ApplyLocale>
  )

  it('applies locale context', function () {
    const subject = testbed.render()
    expect(subject.find(DatePicker).unwrap().context).to.include({locale: 'fr'})
  })

  it('applies timezone context', function () {
    const subject = testbed.render()
    expect(subject.find(DatePicker).unwrap().context).to.include({timezone: 'Europe/Paris'})
  })
})
