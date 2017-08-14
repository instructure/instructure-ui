import React from 'react'
import RadioInput from '../../RadioInput'
import RadioInputGroup from '../index'

describe('<RadioInputGroup />', () => {
  const testbed = new Testbed(
    <RadioInputGroup
      name="fruit"
      description="Select a fruit"
    >
      <RadioInput label="Apple" value="apple" />
      <RadioInput label="Banana" value="banana" />
      <RadioInput label="Orange" value="orange" />
    </RadioInputGroup>
  )

  it('adds the name props to all RadioInput types', () => {
    const subject = testbed.render()

    expect(subject.find('input[name="fruit"]').length)
      .to.equal(3)
  })

  it('requires an `onChange` prop with a `value` prop', () => {
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

  it('calls the onChange prop', () => {
    const onChange = testbed.stub()

    const subject = testbed.render({
      onChange
    })

    subject.find('input').first().simulate('change')

    expect(onChange).to.have.been.called
  })

  it('does not call the onChange prop when disabled', () => {
    const onChange = testbed.stub()

    const subject = testbed.render({
      disabled: true,
      onChange
    })

    subject.find('input').first().simulate('change')

    expect(onChange).to.not.have.been.called
  })

  it('does not call the onChange prop when readOnly', () => {
    const onChange = testbed.stub()

    const subject = testbed.render({
      readOnly: true,
      onChange
    })

    subject.find('input').first().simulate('change')

    expect(onChange).to.not.have.been.called
  })

  it('should not update the value when the value prop is set', () => {
    const subject = testbed.render({
      value: 0
    })

    expect(subject.prop('value')).to.equal(0)
  })

  describe('for a11y', () => {
    it('should meet standards', (done) => {
      const subject = testbed.render()

      subject.should.be.accessible(done, {
        ignores: [ 'radiogroup' ] /* https://github.com/dequelabs/axe-core/issues/176 */
      })
    })
  })
})
