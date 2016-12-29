import React from 'react'
import Typography from '../index'

describe('<Typography />', function () {
  const testbed = new Testbed(<Typography />)

  it('should render', function () {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })

  it('should render with the specified tag when `as` prop is set', function () {
    const subject = testbed.render({
      as: 'div'
    })

    expect(subject.tagName())
      .to.equal('DIV')
  })
})
