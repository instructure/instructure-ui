import React from 'react'
import RadioInputGroup, { RadioInput } from '../index'

describe('<RadioInputGroup />', function () {
  const testbed = createTestbed(RadioInputGroup, {
    name: 'fruit',
    description: 'Select a fruit'
  })

  describe('RadioInputGroup with children', function () {
    const testbed = createTestbed(RadioInputGroup, {
      name: 'fruit',
      description: 'Select a fruit',
      children: <RadioInput label="Apple" value="apple" />
    })

    it('adds the name props to all RadioInput types', function () {
      testbed.render()
      expect(testbed.dom.find('input').node.getAttribute('name')).to.equal('fruit')
    })
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

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      testbed.render()

      testbed.checkA11yStandards(done, {
        ignores: [  /* add a11y standards rules to ignore here (https://dequeuniversity.com/rules/axe) */ ]
      })
    })
  })
})
