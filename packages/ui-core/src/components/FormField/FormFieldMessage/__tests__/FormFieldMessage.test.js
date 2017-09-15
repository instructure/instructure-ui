import React from 'react'
import FormFieldMessage from '../index'

describe('<FormFieldMessage />', () => {
  const testbed = new Testbed(<FormFieldMessage />)

  it('should render', () => {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })
})
