import React from 'react'
import FormFieldLabel from '../index'

describe('<FormFieldLabel />', function () {
  const testbed = createTestbed(<FormFieldLabel />)

  it('should render', function () {
    const subject = testbed.render()

    expect(subject.dom()).to.exist
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })
})
