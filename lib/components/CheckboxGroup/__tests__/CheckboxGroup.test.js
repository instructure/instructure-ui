import React from 'react'
import CheckboxGroup from '../index'
import Checkbox from '../../Checkbox'

describe('<CheckboxGroup />', function () {
  const testbed = new Testbed(
    <CheckboxGroup
      name="sports"
      description="Select your favorite sports">
      <Checkbox label="Football" value="football" />
      <Checkbox label="Basketball" value="basketball" />
      <Checkbox label="Volleyball" value="volleyball" />
      <Checkbox label="Other" value="other" />
    </CheckboxGroup>
  )

  it('adds the name props to all Checkbox types', function () {
    const subject = testbed.render()
    expect(subject.find('input[name="sports"]').length).to.equal(4)
  })

  it('links the messages to the fieldset via aria-describedby', function () {
    const subject = testbed.render({
      messages: [
        { text: 'Invalid name', type: 'error' }
      ]
    })

    const messagesId = subject.find('fieldset').getAttribute('aria-describedby')

    expect(subject.find(`#${messagesId}`).text())
      .to.equal('Invalid name')
  })

  it('displays description message inside the legend', function () {
    const description = 'You should pick something'
    const subject = testbed.render({
      description: description
    })

    expect(subject.find('legend').text()).to.equal(description)
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

    const subject = testbed.render({
      disabled: true,
      onChange
    })

    subject.find('input[value="football"]').simulate('change', {
      target: {
        checked: true,
        value: 'football'
      }
    })

    expect(onChange).to.not.have.been.called
  })

  it('should not update the value when the value prop is set', function () {
    const subject = testbed.render({
      value: ['tester']
    })

    expect(subject.instance().value).to.deep.equal(['tester'])
  })

  it('should add the checkbox value to the value list when it is checked', function () {
    const subject = testbed.render()

    subject.find('input[value="football"]').simulate('change', {
      target: {
        checked: true,
        value: 'football'
      }
    })

    expect(subject.instance().value).to.deep.equal(['football'])
  })

  it('should check the checkboxes based on the defaultValue prop', function () {
    const subject = testbed.render({
      defaultValue: ['football', 'volleyball']
    })

    expect(subject.find('input[value="football"]').getDOMNode().checked)
      .to.be.true

    expect(subject.find('input[value="volleyball"]').getDOMNode().checked)
      .to.be.true
  })

  it('should remove the checkbox value from the value list when it is unchecked', function () {
    const subject = testbed.render({
      defaultValue: ['football', 'basketball', 'volleyball']
    })

    subject.find('input[value="football"]').simulate('change', {
      target: {
        checked: false,
        value: 'football'
      }
    })

    expect(subject.instance().value).to.deep.equal(['basketball', 'volleyball'])
  })

  it('passes the array of selected values to onChange handler', function () {
    const onChange = testbed.sandbox.stub()

    const subject = testbed.render({
      value: ['football', 'basketball', 'volleyball'],
      onChange
    })

    subject.find('input[value="football"]').simulate('change', {
      target: {
        checked: false,
        value: 'football'
      }
    }) // triggers handleChange and removes 'football'

    expect(onChange).to.have.been.calledWith(['basketball', 'volleyball'])
  })

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      const subject = testbed.render()

      subject.should.be.accessible(done, {
        ignores: [ 'checkboxgroup' ] /* https://github.com/dequelabs/axe-core/issues/176 */
      })
    })
  })
})
