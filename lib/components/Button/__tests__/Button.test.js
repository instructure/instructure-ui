import React from 'react'
import Button from '../index'

describe('<Button/>', function () {
  const testbed = createTestbed(<Button>Hello World</Button>)

  it('should render the children as button text', function () {
    const subject = testbed.render()

    expect(subject.text())
      .to.equal('Hello World')
  })

  it('should render a button', function () {
    const subject = testbed.render()

    expect(subject.dom().tagName.toUpperCase())
      .to.equal('BUTTON')
  })

  it('should render a link styled as a button if href is provided', function () {
    const subject = testbed.render({
      href: 'example.html'
    })

    expect(subject.dom().tagName.toUpperCase())
      .to.equal('A')
  })

  describe('onClick', function () {
    it('should call onClick when clicked', function () {
      const onClick = testbed.sandbox.stub()

      const subject = testbed.render({
        onClick
      })

      subject.trigger('click')

      expect(onClick).to.have.been.called
    })

    it('should not call onClick when button is disabled', function () {
      const onClick = testbed.sandbox.stub()

      const subject = testbed.render({
        disabled: true,
        onClick
      })

      subject.trigger('click')

      expect(onClick).to.not.have.been.called
    })

    it('should not call onClick when button is disabled and an href prop is provided', function () {
      const onClick = testbed.sandbox.stub()

      const subject = testbed.render({
        disabled: true,
        href: 'example.html',
        onClick
      })

      subject.trigger('click')

      expect(onClick).to.not.have.been.called
    })
  })

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      const subject = testbed.render()

      subject.should.be.accessible(done)
    })

    it('sets the aria-disabled attribute', function () {
      const subject = testbed.render({
        disabled: true,
        href: 'example.html'
      })

      expect(subject.getAttribute('aria-disabled'))
        .to.exist
    })

    describe('when disabled', function () {
      it('sets the aria-disabled attribute', function () {
        const subject = testbed.render({
          disabled: true
        })

        expect(subject.getAttribute('aria-disabled'))
          .to.exist
      })

      it('does not set the disabled attribute so that the button stays in tab order', function () {
        const subject = testbed.render({
          disabled: true
        })

        expect(subject.getAttribute('disabled'))
          .to.not.exist
      })

      it('sets the aria-disabled attribute when an href is provided', function () {
        const subject = testbed.render({
          disabled: true,
          href: 'example.html'
        })

        expect(subject.getAttribute('aria-disabled'))
          .to.exist
      })
    })
  })
})
