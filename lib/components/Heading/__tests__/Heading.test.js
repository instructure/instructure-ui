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

  it('should render as a SPAN if level is `reset`', function () {
    const subject = testbed.render({
      level: 'reset'
    })

    expect(subject.tagName())
      .to.equal('SPAN')
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
