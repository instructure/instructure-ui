import React from 'react'
import RadioInput from '../index'

describe('<RadioInput />', function () {
  const testbed = createTestbed(
    <RadioInput label="fake label" value="someValue" name="someName" />
  )

  it('renders an input with type "radio"', function () {
    const subject = testbed.render()

    expect(subject.find('input').dom().type)
      .to.equal('radio')
  })

  describe('events', function () {
    it('responds to onClick event', function () {
      const onClick = testbed.sandbox.stub()

      const subject = testbed.render({
        onClick
      })

      subject.find('input').trigger('click')

      expect(onClick).to.have.been.called
    })

    it('does not respond to onClick event when disabled', function () {
      const onClick = testbed.sandbox.stub()

      const subject = testbed.render({
        disabled: true,
        onClick
      })

      subject.find('input').trigger('click')

      expect(onClick).to.not.have.been.called
    })

    it('responds to onBlur event', function () {
      const onBlur = testbed.sandbox.stub()

      const subject = testbed.render({
        onBlur
      })

      subject.find('input').trigger('blur')

      expect(onBlur).to.have.been.called
    })

    it('responds to onFocus event', function () {
      const onFocus = testbed.sandbox.stub()

      const subject = testbed.render({
        onFocus
      })

      subject.find('input').trigger('focus')

      expect(onFocus).to.have.been.called
    })
  })

  describe('for a11y', function () {
    it('simple variant should meet standards', function (done) {
      const subject = testbed.render({
        variant: 'simple'
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
