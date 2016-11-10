import React from 'react'
import Typography from '../index'

describe('<Typography />', function () {
  const testbed = createTestbed(<Typography />)

  it('should render', function () {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })
})
