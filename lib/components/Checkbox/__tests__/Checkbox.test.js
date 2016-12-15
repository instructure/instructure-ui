import React from 'react'
import Checkbox from '../index'
import CheckboxFacade from '../CheckboxFacade'

describe('<Checkbox />', function () {
  const testbed = new Testbed(
    <Checkbox label="fake label" defaultChecked value="someValue" name="someName" />
  )

  it('renders an input with type "checkbox"', function () {
    const subject = testbed.render()

    expect(subject.find('input').getDOMNode().type)
      .to.equal('checkbox')
  })

  describe('events', function () {
    it('responds to onClick event', function () {
      const onClick = testbed.sandbox.stub()

      const subject = testbed.render({
        onClick
      })

      subject.find('input').simulate('click')

      expect(onClick).to.have.been.called
    })

    it('responds to onChange event', function () {
      const onChange = testbed.sandbox.stub()

      const subject = testbed.render({
        onChange
      })

      subject.find('input').simulate('change')

      expect(onChange).to.have.been.called
    })

    it('does not respond to onChange event when disabled', function () {
      const onChange = testbed.sandbox.stub()

      const subject = testbed.render({
        disabled: true,
        onChange
      })

      subject.find('input').simulate('change')

      expect(onChange).to.not.have.been.called
    })

    it('responds to onChange when enter key is pressed', function () {
      const onChange = testbed.sandbox.stub()

      const subject = testbed.render({
        onChange,
        variant: 'toggle'
      })

      subject.find('input').keyDown('enter')

      expect(onChange).to.have.been.called
    })

    it('responds to onBlur event', function () {
      const onBlur = testbed.sandbox.stub()

      const subject = testbed.render({
        onBlur
      })

      subject.find('input').simulate('blur')

      expect(onBlur).to.have.been.called
    })

    it('responds to onFocus event', function () {
      const onFocus = testbed.sandbox.stub()

      const subject = testbed.render({
        onFocus
      })

      subject.find('input').simulate('focus')

      expect(onFocus).to.have.been.called
    })

    it('focuses with the focus helper', function () {
      const subject = testbed.render()

      subject.instance().focus()

      expect(subject.instance().focused).to.be.true
      expect(subject.find('input').focused()).to.be.true
    })

    it('sets hover states', function () {
      const subject = testbed.render()

      subject.simulate('mouseOver')

      expect(subject.find(CheckboxFacade).prop('hovered')).to.be.true

      subject.simulate('mouseOut')

      expect(subject.find(CheckboxFacade).prop('hovered')).to.be.false
    })
  })

  describe('for a11y', function () {
    it('`simple` variant should meet standards', function (done) {
      const subject = testbed.render({
        variant: 'simple'
      })

      subject.should.be.accessible(done)
    })

    it('`toggle` variant should meet standards', function (done) {
      const subject = testbed.render({
        variant: 'toggle'
      })

      subject.should.be.accessible(done)
    })

    it('should require a label', function () {
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
