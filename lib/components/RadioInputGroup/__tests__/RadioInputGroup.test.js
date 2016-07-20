import React from 'react'
import RadioInput from '../../RadioInput'
import RadioInputGroup from '../index'

describe('<RadioInputGroup />', function () {
  const testbed = createTestbed(
    <RadioInputGroup
      name="fruit"
      description="Select a fruit">
      <RadioInput label="Apple" value="apple" />
      <RadioInput label="Banana" value="banana" />
      <RadioInput label="Orange" value="orange" />
    </RadioInputGroup>
  )

  it('adds the name props to all RadioInput types', function () {
    const subject = testbed.render()

    expect(subject.find('input[name="fruit"]').length)
      .to.equal(3)
  })

  it('requires an `onChange` prop with a `value` prop', function () {
    let error = false
    try {
      testbed.render({
        value: 'banana'
      })
    } catch (e) {
      error = true
    }

    expect(error).to.be.true
  })

  it('does not call the onChange prop when disabled', function () {
    const onChange = testbed.sandbox.stub()

    const subject = testbed.render({
      disabled: true,
      onChange
    })

    subject.find('input').trigger('click')

    expect(onChange).to.not.have.been.called
  })

  it('should not update the value when the value prop is set', function () {
    const subject = testbed.render({
      value: 0
    })

    expect(subject.props('value')).to.equal(0)
  })

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      const subject = testbed.render()

      subject.should.be.accessible(done, {
        ignores: [ 'radiogroup' ] /* https://github.com/dequelabs/axe-core/issues/176 */
      })
    })
  })
})
