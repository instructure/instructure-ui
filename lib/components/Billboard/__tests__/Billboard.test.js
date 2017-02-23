import React from 'react'
import Billboard from '../index'

describe('<Billboard />', function () {
  const testbed = new Testbed(<Billboard />)

  it('should render', function () {
    const subject = testbed.render()
    expect(subject).to.be.present
  })

  it('should render a heading with the correct tag', function () {
    const subject = testbed.render({
      heading: 'Test heading',
      headingAs: 'h2'
    })
    const headline = subject.find('h2')
    expect(headline.findText('Test heading').length).to.equal(1)
  })

  it('renders as a button and responds to onClick event', function () {
    const onClick = testbed.sandbox.stub()
    const subject = testbed.render({onClick})
    subject.find('button').simulate('click')
    expect(onClick).to.have.been.called
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: []
    })
  })
})
