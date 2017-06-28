import React from 'react'
import Heading from '../index'

describe('<Heading />', () => {
  const testbed = new Testbed(<Heading>Hello World</Heading>)

  it('should render as an H2 element', () => {
    const subject = testbed.render()

    expect(subject.tagName())
      .to.equal('H2')
  })

  it('should render the children as text content', () => {
    const subject = testbed.render()

    expect(subject.text())
      .to.equal('Hello World')
  })

  it('should render as a SPAN if level is `reset`', () => {
    const subject = testbed.render({
      level: 'reset'
    })

    expect(subject.tagName())
      .to.equal('SPAN')
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })

  it('should render with the specified tag when `as` prop is set', () => {
    const subject = testbed.render({
      as: 'div'
    })

    expect(subject.tagName())
      .to.equal('DIV')
  })
})
