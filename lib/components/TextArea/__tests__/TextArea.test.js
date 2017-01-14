import React from 'react'
import TextArea from '../index'

describe('TextArea', function () {
  const testbed = new Testbed(
    <TextArea label="Name" />
  )

  it('should accept a default value', function () {
    const subject = testbed.render({
      defaultValue: 'Tom Servo'
    })

    expect(subject.find('textarea').unwrap().value)
      .to.equal('Tom Servo')
  })

  it('should include a label', function () {
    const subject = testbed.render()

    expect(subject.find('label').length).to.equal(1)
  })

  it('should focus the textarea when focus is called', function () {
    const subject = testbed.render()

    subject.instance().focus()

    expect(subject.find('textarea').focused()).to.be.true
  })

  it('provides a focused getter', function () {
    const subject = testbed.render()

    subject.instance().focus()

    expect(subject.instance().focused).to.be.true
  })

  it('should provide an textareaRef prop', function () {
    const textareaRef = testbed.sandbox.stub()
    const subject = testbed.render({
      textareaRef
    })

    expect(textareaRef).to.have.been.calledWith(subject.find('textarea').unwrap())
  })

  it('should provide a value getter', function () {
    const subject = testbed.render({
      defaultValue: 'bar'
    })

    expect(subject.instance().value).to.equal('bar')
  })

  describe('events', function () {
    it('responds to onChange event', function () {
      const onChange = testbed.sandbox.stub()

      const subject = testbed.render({
        onChange
      })

      subject.find('textarea').simulate('change')

      expect(onChange).to.have.been.called
    })

    it('does not respond to onChange event when disabled', function () {
      const onChange = testbed.sandbox.stub()

      const subject = testbed.render({
        disabled: true,
        onChange
      })

      subject.find('textarea').simulate('change')

      expect(onChange).to.not.have.been.called
    })

    it('responds to onBlur event', function () {
      const onBlur = testbed.sandbox.stub()

      const subject = testbed.render({
        onBlur
      })

      subject.find('textarea').simulate('blur')

      expect(onBlur).to.have.been.called
    })

    it('responds to onFocus event', function () {
      const onFocus = testbed.sandbox.stub()

      const subject = testbed.render({
        onFocus
      })

      subject.find('textarea').simulate('focus')

      expect(onFocus).to.have.been.called
    })
  })

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      const subject = testbed.render()

      subject.should.be.accessible(done)
    })

    it('should set aria-invalid when errors prop is set', function () {
      const subject = testbed.render({
        messages: [{ type: 'error', text: 'some error message' }]
      })

      expect(subject.find('textarea').getAttribute('aria-invalid'))
        .to.exist
    })
  })
})
