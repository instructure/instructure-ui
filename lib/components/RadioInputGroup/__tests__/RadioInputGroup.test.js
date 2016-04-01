import React from 'react'
import RadioInputGroup, { RadioInput } from '../index'

describe('<RadioInputGroup />', function () {
  const testbed = createTestbed(RadioInputGroup, {
    name: 'fruit',
    description: 'Select a fruit',
    children: [
      <RadioInput label="Apple" value="apple" />,
      <RadioInput label="Banana" value="banana" />,
      <RadioInput label="Orange" value="orange" />
    ]
  })

  it('adds the name props to all RadioInput types', function () {
    testbed.render()
    expect(testbed.dom.find('input').node.getAttribute('name')).to.equal('fruit')
  })

  it('displays error messages inside the legend', function () {
    const errorMessage = 'Error Message'
    testbed.render({
      errors: [ errorMessage ]
    })

    expect(testbed.dom.find('legend:contains("Error Message")'))
      .to.exist
  })

  it('displays description message inside the legend', function () {
    const description = 'You should pick something'
    testbed.render({
      description: description
    })

    expect(testbed.dom.find('legend').node.textContent).to.equal(description)
  })

  it('should not allow invalid children', function () {
    let error = false
    try {
      testbed.render({
        children: <div/>
      })
    } catch (e) {
      error = true
    }

    expect(error).to.be.true
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

    testbed.render({
      disabled: true,
      onChange
    })

    testbed.dom.find('input').click()

    expect(onChange).to.not.have.been.called
  })

  it('should not update the value when the value prop is set', function () {
    const component = testbed.render({
      value: 0
    })

    expect(component.value).to.equal(0)
  })

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      testbed.render()

      testbed.checkA11yStandards(done, {
        ignores: [ 'radiogroup' ] /* https://github.com/dequelabs/axe-core/issues/176 */
      })
    })
  })
})
