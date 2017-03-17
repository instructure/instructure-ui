import React from 'react'
import Button from '../index'

describe('<Button/>', function () {
  const testbed = new Testbed(<Button>Hello World</Button>)

  it('should render the children as button text', function () {
    const subject = testbed.render()

    expect(subject.text())
      .to.equal('Hello World')
  })

  it('should render a button', function () {
    const subject = testbed.render()

    expect(subject.tagName())
      .to.equal('BUTTON')
  })

  it('should render a link styled as a button if href is provided', function () {
    const subject = testbed.render({
      href: 'example.html'
    })

    expect(subject.tagName())
      .to.equal('A')
  })

  it('should render designated tag if `as` prop is specified', function () {
    const subject = testbed.render({
      as: 'span',
      onClick: testbed.sandbox.stub()
    })

    expect(subject.tagName())
      .to.equal('SPAN')

    expect(subject.getAttribute('role'))
      .to.equal('button')

    expect(subject.getAttribute('tabIndex'))
      .to.equal('0')
  })

  it('should pass down the type prop to the button element', function () {
    const subject = testbed.render({
      type: 'submit'
    })

    expect(subject.find('button[type="submit"]')).to.be.present
  })

  it('focuses with the focus helper', function () {
    const subject = testbed.render()

    subject.instance().focus()

    expect(subject.instance().focused).to.be.true
    expect(subject.focused()).to.be.true
  })

  it('should provide a buttonRef prop', function () {
    const buttonRef = testbed.sandbox.stub()
    const subject = testbed.render({
      buttonRef
    })

    expect(buttonRef).to.have.been.calledWith(subject.find('button').unwrap())
  })

  describe('onClick', function () {
    it('should call onClick when clicked', function () {
      const onClick = testbed.sandbox.stub()

      const subject = testbed.render({
        onClick
      })

      subject.simulate('click')

      expect(onClick).to.have.been.called
    })

    it('should not call onClick when button is disabled', function () {
      const onClick = testbed.sandbox.stub()

      const subject = testbed.render({
        disabled: true,
        onClick
      })

      subject.simulate('click')

      expect(onClick).to.not.have.been.called
    })

    it('should not call onClick when button is disabled and an href prop is provided', function () {
      const onClick = testbed.sandbox.stub()

      const subject = testbed.render({
        disabled: true,
        href: 'example.html',
        onClick
      })

      subject.simulate('click')

      expect(onClick).to.not.have.been.called
    })

    it('should call onClick when space key is pressed if href is provided', function () {
      const onClick = testbed.sandbox.stub()

      const subject = testbed.render({
        href: 'example.html',
        onClick
      })

      subject.keyDown('space')

      expect(onClick).to.have.been.called
    })

    it('should call onClick when enter key is pressed when not a button or link', function () {
      const onClick = testbed.sandbox.stub()

      const subject = testbed.render({
        as: 'span',
        onClick
      })

      subject.keyDown('enter')

      expect(onClick).to.have.been.called
    })

    it('should not call onClick when button is disabled and space key is pressed', function () {
      const onClick = testbed.sandbox.stub()

      const subject = testbed.render({
        disabled: true,
        onClick
      })

      subject.keyDown('space')

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

      expect(subject.getAttribute('aria-disabled')).to.exist
    })

    describe('when disabled', function () {
      it('sets the aria-disabled attribute', function () {
        const subject = testbed.render({
          disabled: true
        })

        expect(subject.getAttribute('aria-disabled')).to.exist
      })

      it('does not set the disabled attribute so that the button stays in tab order', function () {
        const subject = testbed.render({
          disabled: true
        })

        expect(subject.getAttribute('disabled')).to.not.exist
      })

      it('sets the aria-disabled attribute when an href is provided', function () {
        const subject = testbed.render({
          disabled: true,
          href: 'example.html'
        })

        expect(subject.getAttribute('aria-disabled')).to.exist
      })
    })
  })
})
