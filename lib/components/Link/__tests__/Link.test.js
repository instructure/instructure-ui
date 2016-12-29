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

    expect(subject.find('button[type="button"]'))
      .to.have.length(1)
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [
        'color-contrast' // brand color doesn't meet 4.5:1 contrast req
      ]
    })
  })

  it('focuses with the focus helper', function () {
    const subject = testbed.render()

    subject.instance().focus()

    expect(subject.instance().focused).to.be.true
    expect(subject.find('button').focused()).to.be.true
  })

  it('should call the onClick prop when clicked', function () {
    const onClick = testbed.sandbox.stub()

    const subject = testbed.render({
      onClick
    })

    subject.find('button').simulate('click')

    expect(onClick).to.have.been.called
  })

  it('should provide a linkRef prop', function () {
    const linkRef = testbed.sandbox.stub()
    const subject = testbed.render({
      linkRef
    })

    expect(linkRef).to.have.been.calledWith(subject.find('button').unwrap())
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

  it('should render designated tag if `as` prop is specified', function () {
    const subject = testbed.render({
      as: 'span',
      onClick: testbed.sandbox.stub()
    })

    expect(subject.tagName())
      .to.equal('SPAN')

    expect(subject.find('[role="button"]'))
      .to.have.length(1)

    expect(subject.find('[tabIndex="0"]'))
      .to.have.length(1)
  })

  describe('when an href is provided', function () {
    it('should render an anchor element', function () {
      const subject = testbed.render({
        href: 'example.html'
      })

      expect(subject.find('a')).to.have.length(1)
    })

    it('should set the href attribute', function () {
      const subject = testbed.render({
        href: 'example.html'
      })

      expect(subject.find('[href="example.html"]'))
        .to.have.length(1)
    })
  })
})
