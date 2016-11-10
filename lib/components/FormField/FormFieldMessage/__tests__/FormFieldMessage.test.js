import React from 'react'
import FormFieldMessage from '../index'

describe('<FormFieldMessage />', function () {
  const testbed = createTestbed(<FormFieldMessage />)

  it('should render', function () {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })
})
