import React from 'react'
import FormField from '../index'

describe('<FormField />', function () {
  const testbed = createTestbed(<FormField label="foo" id="bar" />)

  /* example test (replace me) */
  it('should render', function () {
    const subject = testbed.render(/* override default props here */)

    expect(subject).to.be.present
  })

  it('should have tests')

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })
})
