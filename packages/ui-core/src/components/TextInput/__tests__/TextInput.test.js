import React from 'react'
import TextInput from '../index'

describe('<TextInput/>', () => {
  const testbed = new Testbed(
    <TextInput label="Name" />
  )

  it('should accept a default value', () => {
    const subject = testbed.render({
      defaultValue: 'Tom Servo'
    })

    expect(subject.find('input').getDOMNode().value)
      .to.equal('Tom Servo')
  })

  it('should include a label', () => {
    const subject = testbed.render()

    expect(subject.find('label').length).to.equal(1)
  })

  it('should focus the input when focus is called', () => {
    const subject = testbed.render()

    subject.instance().focus()

    expect(subject.find('input').focused()).to.be.true
  })

  it('should provide an inputRef prop', () => {
    const inputRef = testbed.stub()
    const subject = testbed.render({
      inputRef
    })

    expect(inputRef).to.have.been.calledWith(subject.find('input').unwrap())
  })

  it('should provide a value getter', () => {
    const subject = testbed.render({
      defaultValue: 'bar'
    })

    expect(subject.instance().value).to.equal('bar')
  })

  it('should provide messageId to FormField', () => {
    const subject = testbed.render()
    expect(subject.find('FormField').prop('messagesId')).to.not.be.empty
  })

  it('should provide messageId to FormField', () => {
    const subject = testbed.render({
      messages: [{
        text: 'yup',
        type: 'error'
      }]
    })
    expect(subject.find('input').prop('aria-describedby')).to.not.be.empty
  })

  it('should have equal messagesId and aria-describedby values', () => {
    const subject = testbed.render({
      messages: [{
        text: 'yup',
        type: 'error'
      }]
    })
    expect(subject.find('input').prop('aria-describedby')).to.equal(
      subject.find('FormField').prop('messagesId')
    )
  })

  describe('events', () => {
    it('responds to onChange event', () => {
      const onChange = testbed.stub()

      const subject = testbed.render({
        onChange
      })

      subject.find('input').simulate('change')

      expect(onChange).to.have.been.called
    })

    it('responds to onBlur event', () => {
      const onBlur = testbed.stub()

      const subject = testbed.render({
        onBlur
      })

      subject.find('input').simulate('blur')

      expect(onBlur).to.have.been.called
    })

    it('responds to onFocus event', () => {
      const onFocus = testbed.stub()

      const subject = testbed.render({
        onFocus
      })

      subject.find('input').simulate('focus')

      expect(onFocus).to.have.been.called
    })
  })

  describe('for a11y', () => {
    it('should meet standards', (done) => {
      const subject = testbed.render()

      subject.should.be.accessible(done)
    })

    it('should set aria-invalid when errors prop is set', () => {
      const subject = testbed.render({
        messages: [{ type: 'error', text: 'some error message' }]
      })

      expect(subject.find('input').getAttribute('aria-invalid'))
        .to.exist
    })
  })
})
