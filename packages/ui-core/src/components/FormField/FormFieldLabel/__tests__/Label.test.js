import React from 'react'
import FormFieldLabel from '../index'

describe('<FormFieldLabel />', () => {
  const testbed = new Testbed(<FormFieldLabel>Foo</FormFieldLabel>)

  it('should render', () => {
    const subject = testbed.render()
    expect(subject).to.be.present
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })
})
