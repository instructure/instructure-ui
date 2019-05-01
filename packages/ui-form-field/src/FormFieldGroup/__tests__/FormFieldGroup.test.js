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
import { expect, mount, within, find } from '@instructure/ui-test-utils'

import { FormFieldGroup } from '../index'

describe('<FormFieldGroup />', async () => {
  it('should render', async () => {
    await mount(
      <FormFieldGroup description="Please enter your full name">
        <label>First: <input /></label>
        <label>Middle: <input /></label>
        <label>Last: <input /></label>
      </FormFieldGroup>
    )

    const formFieldGroup = find('fieldset:label("Please enter your full name")')
    expect(formFieldGroup).to.exist()
  })

  it('can handle null children', async () => {
    const children = [
      <label key="first">First: <input /></label>,
      null
    ]

    const subject = await mount(
      <FormFieldGroup description="Please enter your full name">
        {children}
      </FormFieldGroup>
    )

    const formFieldGroup = within(subject.getDOMNode())
    expect(formFieldGroup).to.exist()
  })

  it('links the messages to the fieldset via aria-describedby', async () => {
    const messages = [{ text: 'Invalid name', type: 'error' }]

    const subject = await mount(
      <FormFieldGroup description="Please enter your full name" messages={messages}>
        <label>First: <input /></label>
        <label>Middle: <input /></label>
        <label>Last: <input /></label>
      </FormFieldGroup>
    )

    const formFieldGroup = within(subject.getDOMNode())
    const fieldset = await formFieldGroup.find('fieldset')

    const messagesId = fieldset.getAttribute('aria-describedby')
    const message = await formFieldGroup.find(`#${messagesId}`)

    expect(message.getTextContent()).to.equal('Invalid name')
  })

  it('displays description message inside the legend', async () => {
    const description = 'Please enter your full name'

    const subject = await mount(
      <FormFieldGroup description={description}>
        <label>First: <input /></label>
        <label>Middle: <input /></label>
        <label>Last: <input /></label>
      </FormFieldGroup>
    )

    const formFieldGroup = within(subject.getDOMNode())
    const legend = await formFieldGroup.find(`legend:contains(${description})`)
    expect(legend).to.exist()
  })

  it('should meet a11y standards', async () => {
    const subject = await mount(
      <FormFieldGroup description="Please enter your full name">
        <label>First: <input /></label>
        <label>Middle: <input /></label>
        <label>Last: <input /></label>
      </FormFieldGroup>
    )

    const formFieldGroup = within(subject.getDOMNode())
    expect(await formFieldGroup.accessible()).to.exist()
  })
})
