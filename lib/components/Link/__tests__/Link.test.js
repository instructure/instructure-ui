import React from 'react'
import Link from '../index'

describe('<Link />', function () {
  const testbed = createTestbed(<Link>Hello World</Link>)

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

    subject.should.be.accessible(done)
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
