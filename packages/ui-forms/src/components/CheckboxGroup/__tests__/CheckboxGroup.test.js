/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from 'react'
import CheckboxGroup from '../index'
import Checkbox from '../../Checkbox'

describe('<CheckboxGroup />', () => {
  const testbed = new Testbed(
    <CheckboxGroup
      name="sports"
      description="Select your favorite sports"
    >
      <Checkbox label="Football" value="football" />
      <Checkbox label="Basketball" value="basketball" />
      <Checkbox label="Volleyball" value="volleyball" />
      <Checkbox label="Other" value="other" />
    </CheckboxGroup>
  )

  it('adds the name props to all Checkbox types', () => {
    const subject = testbed.render()
    expect(subject.find('input[name="sports"]').length).to.equal(4)
  })

  it('links the messages to the fieldset via aria-describedby', () => {
    const subject = testbed.render({
      messages: [
        { text: 'Invalid name', type: 'error' }
      ]
    })

    const messagesId = subject.find('fieldset').getAttribute('aria-describedby')

    expect(subject.find(`#${messagesId}`).text())
      .to.equal('Invalid name')
  })

  it('displays description message inside the legend', () => {
    const description = 'You should pick something'
    const subject = testbed.render({
      description: description
    })

    expect(subject.find('legend').text()).to.equal(description)
  })

  it('requires an `onChange` prop with a `value` prop', () => {
    let error = false
    try {
      testbed.render({
        value: ['basketball']
      })
    } catch (e) {
      error = true
    }

    expect(error).to.be.true()
  })

  it('does not call the onChange prop when disabled', () => {
    const onChange = testbed.stub()

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

    expect(onChange).to.not.have.been.called()
  })

  it('does not call the onChange prop when readOnly', () => {
    const onChange = testbed.stub()

    const subject = testbed.render({
      readOnly: true,
      onChange
    })

    subject.find('input[value="football"]').simulate('change', {
      target: {
        checked: true,
        value: 'football'
      }
    })

    expect(onChange).to.not.have.been.called()
  })

  it('should not update the value when the value prop is set', () => {
    const subject = testbed.render({
      value: ['tester'],
      onChange: testbed.stub()
    })

    expect(subject.instance().value).to.deep.equal(['tester'])
  })

  it('should add the checkbox value to the value list when it is checked', () => {
    const subject = testbed.render()

    subject.find('input[value="football"]').simulate('change', {
      target: {
        checked: true,
        value: 'football'
      }
    })

    expect(subject.instance().value).to.deep.equal(['football'])
  })

  it('should check the checkboxes based on the defaultValue prop', () => {
    const subject = testbed.render({
      defaultValue: ['football', 'volleyball']
    })

    expect(subject.find('input[value="football"]').getDOMNode().checked)
      .to.be.true()

    expect(subject.find('input[value="volleyball"]').getDOMNode().checked)
      .to.be.true()
  })

  it('should remove the checkbox value from the value list when it is unchecked', () => {
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

  it('passes the array of selected values to onChange handler', () => {
    const onChange = testbed.stub()

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

  describe('for a11y', () => {
    it('should meet standards', (done) => {
      const subject = testbed.render()

      subject.should.be.accessible(done, {
        ignores: [ 'checkboxgroup' ] /* https://github.com/dequelabs/axe-core/issues/176 */
      })
    })
  })
})
