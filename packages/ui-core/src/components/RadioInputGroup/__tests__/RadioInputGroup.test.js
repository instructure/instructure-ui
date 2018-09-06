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

  it('calls the onChange prop', () => {
    const onChange = testbed.stub()

    const subject = testbed.render({
      onChange
    })

    subject.find('input').first().simulate('change')

    expect(onChange).to.have.been.called()
  })

  it('does not call the onChange prop when disabled', () => {
    const onChange = testbed.stub()

    const subject = testbed.render({
      disabled: true,
      onChange
    })

    subject.find('input').first().simulate('change')

    expect(onChange).to.not.have.been.called()
  })

  it('does not call the onChange prop when readOnly', () => {
    const onChange = testbed.stub()

    const subject = testbed.render({
      readOnly: true,
      onChange
    })

    subject.find('input').first().simulate('change')

    expect(onChange).to.not.have.been.called()
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
