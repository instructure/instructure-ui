import React from 'react'
import CheckboxGroup from '../index'
import Checkbox from '../../Checkbox'

describe('<CheckboxGroup />', function () {
  const testbed = createTestbed(CheckboxGroup, {
    name: 'sports',
    description: 'Select your favorite sports',
    children: [
      <Checkbox label="Football" value="football" />,
      <Checkbox label="Basketball" value="basketball" />,
      <Checkbox label="Volleyball" value="volleyball" />,
      <Checkbox label="Other" value="other" />
    ]
  })

  it('adds the name props to all Checkbox types', function () {
    testbed.render()
    expect(testbed.dom.find('input').node.getAttribute('name')).to.equal('sports')
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
        children: <div />
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
        value: ['basketball']
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

    testbed.dom.find('input[value="football"]').node.click()

    expect(onChange).to.not.have.been.called
  })

  it('should not update the value when the value prop is set', function () {
    const component = testbed.render({
      value: ['tester']
    })

    expect(component.value).to.deep.equal(['tester'])
  })

  it('should add the checkbox value to the value list when it is checked', function () {
    const component = testbed.render()

    testbed.dom.find('input[value="football"]').node.click()

    expect(component.value).to.deep.equal(['football'])
  })

  it('should check the checkboxes based on the defaultValue prop', function () {
    testbed.render({
      defaultValue: ['football', 'volleyball']
    })

    expect(testbed.dom.find('input[value="football"]').node.checked)
      .to.be.true

    expect(testbed.dom.find('input[value="volleyball"]').node.checked)
      .to.be.true
  })

  it('should remove the checkbox value from the value list when it is unchecked', function () {
    const component = testbed.render({
      defaultValue: ['football', 'basketball', 'volleyball']
    })

    testbed.dom.find('input[value="football"]').node.click()

    expect(component.value).to.deep.equal(['basketball', 'volleyball'])
  })

  it('passes the array of selected values to onChange handler', function () {
    const onChange = testbed.sandbox.stub()

    testbed.render({
      value: ['football', 'basketball', 'volleyball'],
      onChange
    })

    testbed.dom.find('input[value="football"]').node.click() // triggers handleChange and removes 'football'

    expect(onChange).to.have.been.calledWith(['basketball', 'volleyball'])
  })

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      testbed.render()

      testbed.checkA11yStandards(done, {
        ignores: [ 'checkboxgroup' ]
      })
    })
    /* additional a11y related tests go here */
  })
})
