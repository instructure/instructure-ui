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

  it('renders as a link if it has an href prop', function () {
    const subject = testbed.render({
      href: 'example.html',
      disabled: true
    })
    expect(subject.find('a')).to.have.length(1)
  })

  it('renders as a button and responds to onClick event', function () {
    const onClick = testbed.sandbox.stub()
    const subject = testbed.render({onClick})
    subject.find('button').simulate('click')
    expect(onClick).to.have.been.called
  })

  describe('when disabled', function () {
    it('should apply aria-disabled', function () {
      const subject = testbed.render({
        href: 'example.html',
        disabled: true
      })
      expect(subject.find('a[aria-disabled]')).to.have.length(1)
    })

    it('should not be clickable', function () {
      const onClick = testbed.sandbox.stub()

      const subject = testbed.render({
        disabled: true,
        onClick
      })

      subject.find('button').simulate('click')

      expect(onClick).to.not.have.been.called
    })
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: []
    })
  })
})
