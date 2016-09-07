import React from 'react'
import FormFieldMessage from '../index'

describe('<FormFieldMessage />', function () {
  const testbed = createTestbed(<FormFieldMessage />)

  /* example test (replace me) */
  it('should render', function () {
    const subject = testbed.render(/* override default props here */)

    expect(subject.dom()).to.exist
  })

  it('should have tests')

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })
})
