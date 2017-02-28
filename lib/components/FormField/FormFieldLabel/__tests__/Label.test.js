import React from 'react'
import FormFieldLabel from '../index'

describe('<FormFieldLabel />', function () {
  const testbed = new Testbed(<FormFieldLabel>Foo</FormFieldLabel>)

  it('should render', function () {
    const subject = testbed.render()
    expect(subject).to.be.present
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })
})
