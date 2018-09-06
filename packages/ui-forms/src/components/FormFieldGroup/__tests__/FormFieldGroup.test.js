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
import FormFieldGroup from '../index'
import TextInput from '../../TextInput'

describe('<FormFieldGroup />', () => {
  const testbed = new Testbed(
    (
      <FormFieldGroup description="Please enter your full name">
        <TextInput label="First" />
        <TextInput label="Middle" />
        <TextInput label="Last" />
      </FormFieldGroup>
    )
  )

  it('should render', () => {
    const subject = testbed.render()

    expect(subject).to.be.present()
  })

  it('can handle null children', () => {
    const subject = testbed.render({
      children: [<TextInput label="First" key="foo" />, null]
    })

    expect(subject).to.be.present()
  })

  it('links the messages to the fieldset via aria-describedby', () => {
    const subject = testbed.render({
      messages: [{ text: 'Invalid name', type: 'error' }]
    })

    const messagesId = subject.find('fieldset').getAttribute('aria-describedby')

    expect(subject.find(`#${messagesId}`).text()).to.equal('Invalid name')
  })

  it('displays description message inside the legend', () => {
    const description = 'Please enter your full name'
    const subject = testbed.render({
      description: description
    })

    expect(subject.find('legend').text()).to.contain(description)
  })

  it('should meet a11y standards', done => {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })
})
