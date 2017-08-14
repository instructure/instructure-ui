import React from 'react'
import RadioInput from '../index'

describe('<RadioInput />', () => {
  const testbed = new Testbed(
    <RadioInput label="fake label" value="someValue" name="someName" />
  )

  it('renders an input with type "radio"', () => {
    const subject = testbed.render()

    expect(subject.find('input').getDOMNode().type)
      .to.equal('radio')
  })

  describe('events', () => {
    it('responds to onClick event', () => {
      const onClick = testbed.stub()

      const subject = testbed.render({
        onClick
      })

      subject.find('input').simulate('click')

      expect(onClick).to.have.been.called
    })

    it('does not respond to onClick event when disabled', () => {
      const onClick = testbed.stub()

      const subject = testbed.render({
        disabled: true,
        onClick
      })

      subject.find('input').simulate('click')

      expect(onClick).to.not.have.been.called
    })

    it('does not respond to onClick event when readOnly', () => {
      const onClick = testbed.stub()

      const subject = testbed.render({
        readOnly: true,
        onClick
      })

      subject.find('input').simulate('click')

      expect(onClick).to.not.have.been.called
    })

    it('responds to onChange event', () => {
      const onChange = testbed.stub()

      const subject = testbed.render({
        onChange
      })

      subject.find('input').simulate('change')

      expect(onChange).to.have.been.called
    })

    it('does not respond to onChange event when disabled', () => {
      const onChange = testbed.stub()

      const subject = testbed.render({
        disabled: true,
        onChange
      })

      subject.find('input').simulate('change')

      expect(onChange).to.not.have.been.called
    })

    it('does not respond to onChange event when readOnly', () => {
      const onChange = testbed.stub()

      const subject = testbed.render({
        readOnly: true,
        onChange
      })

      subject.find('input').simulate('change')

      expect(onChange).to.not.have.been.called
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

    it('sets input to checked when selected', () => {
      const subject = testbed.render({
        checked: true
      })

      expect(subject.instance().checked).to.be.true
      expect(subject.find('input').unwrap().checked).to.be.true
    })

    it('focuses with the focus helper', () => {
      const subject = testbed.render()

      subject.instance().focus()

      expect(subject.instance().focused).to.be.true
      expect(subject.find('input').focused()).to.be.true
    })
  })

  describe('for a11y', () => {
    it('simple variant should meet standards', (done) => {
      const subject = testbed.render({
        variant: 'simple'
      })

      subject.should.be.accessible(done)
    })

    it('should require a label', () => {
      let error = false
      try {
        testbed.render({
          label: null
        })
      } catch (e) {
        error = true
      }

      expect(error).to.be.true
    })
  })
})
