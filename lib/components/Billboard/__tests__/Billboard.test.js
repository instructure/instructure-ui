import React from 'react'
import Billboard from '../index'
import Container from '../../Container'

describe('<Billboard />', () => {
  const testbed = new Testbed(<Billboard />)

  it('should render', () => {
    const subject = testbed.render()
    expect(subject).to.be.present
  })

  it('should render a heading with the correct tag', () => {
    const subject = testbed.render({
      heading: 'Test heading',
      headingAs: 'h2'
    })
    const headline = subject.find('h2')
    expect(headline.findText('Test heading').length).to.equal(1)
  })

  it('renders as a link if it has an href prop', () => {
    const subject = testbed.render({
      href: 'example.html',
      disabled: true
    })
    expect(subject.find('a')).to.have.length(1)
  })

  it('renders as a button and responds to onClick event', () => {
    const onClick = testbed.stub()
    const subject = testbed.render({onClick})
    subject.find('button').simulate('click')
    expect(onClick).to.have.been.called
  })

  it('should not allow padding to be added as a property', () => {
    const subject = testbed.render({
      padding: 'large medium small large'
    })
    expect(subject.find(Container).props().padding).to.not.exist
  })

  describe('when disabled', () => {
    it('should apply aria-disabled', () => {
      const subject = testbed.render({
        href: 'example.html',
        disabled: true
      })
      expect(subject.find('a[aria-disabled]')).to.have.length(1)
    })

    it('should not be clickable', () => {
      const onClick = testbed.stub()

      const subject = testbed.render({
        disabled: true,
        onClick
      })

      subject.find('button').simulate('click')

      expect(onClick).to.not.have.been.called
    })
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: []
    })
  })
})
