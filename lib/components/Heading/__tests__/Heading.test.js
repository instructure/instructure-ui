import React from 'react'
import Heading from '../index'

describe('<Heading />', function () {
  const testbed = new Testbed(<Heading>Hello World</Heading>)

  it('should render as an H2 element', function () {
    const subject = testbed.render()

    expect(subject.tagName())
      .to.equal('H2')
  })

  it('should render the children as text content', function () {
    const subject = testbed.render()

    expect(subject.text())
      .to.equal('Hello World')
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })
})
