import React from 'react'
import Link from '../index'

describe('<Link />', function () {
  const testbed = new Testbed(<Link>Hello World</Link>)

  it('should render the children as text content', function () {
    const subject = testbed.render()

    expect(subject.text())
      .to.equal('Hello World')
  })

  it('should render a button', function () {
    const subject = testbed.render()
    expect(subject.dom().tagName.toUpperCase())
      .to.equal('BUTTON')
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [
        'color-contrast' // brand color doesn't meet 4.5:1 contrast req
      ]
    })
  })

  describe('when an href is disabled', function () {
    it('should apply aria-disabled', function () {
      const subject = testbed.render({
        href: 'example.html',
        disabled: true
      })

      expect(subject.getAttribute('aria-disabled')).to.exist
    })

    it('should not be clickable', function () {
      const onClick = testbed.sandbox.stub()

      const subject = testbed.render({
        href: 'example.html',
        disabled: true,
        onClick
      })

      subject.trigger('click')

      expect(onClick).to.not.have.been.called
    })
  })

  describe('when an href is provided', function () {
    it('should render an anchor element', function () {
      const subject = testbed.render({
        href: 'example.html'
      })

      expect(subject.dom().tagName.toUpperCase())
        .to.equal('A')
    })

    it('should set the href attribute', function () {
      const subject = testbed.render({
        href: 'example.html'
      })

      expect(subject.getAttribute('href'))
        .to.equal('example.html')
    })
  })
})
