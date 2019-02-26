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
import { expect, mount, stub } from '@instructure/ui-test-utils'
import TextInput from '../index'
import TextInputLocator from '../locator'

describe('<TextInput/>', async () => {
  it('should accept a default value', async () => {
    await mount(
      <TextInput
        label="Name"
        defaultValue="Tom Servo"
      />
    )
    const textInput = await TextInputLocator.find()
    const input = await textInput.findInput()

    expect(input).to.have.value('Tom Servo')
  })

  it('should include a label', async () => {
    await mount(
      <TextInput
        label="Name"
      />
    )
    const textInput = await TextInputLocator.find(':label(Name)')
    expect(textInput).to.exist()
  })

  it('should focus the input when focus is called', async () => {
    let ref
    await mount(
      <TextInput
        label="Name"
        componentRef={el => ref = el}
      />
    )
    const textInput = await TextInputLocator.find()
    const input = await textInput.findInput()

    ref.focus()

    expect(input).to.be.focused()
  })

  it('should provide an inputRef prop', async () => {
    const inputRef = stub()
    await mount(
      <TextInput
        label="Name"
        inputRef={inputRef}
      />
    )
    const textInput = await TextInputLocator.find()
    const input = await textInput.findInput()

    expect(inputRef).to.have.been.calledWith(input.getDOMNode())
  })

  it('should provide a value getter', async () => {
    let ref
    await mount(
      <TextInput
        label="Name"
        defaultValue="bar"
        componentRef={el => ref = el}
      />
    )

    expect(ref.value).to.equal('bar')
  })

  it('should provide messageId to FormField', async () => {
    await mount(
      <TextInput
        label="Name"
        messages={
          [{
            text: 'yup',
            type: 'error'
          }]
        }
      />
    )
    const textInput = await TextInputLocator.find()
    const input = await textInput.findInput()

    expect(input.getAttribute('aria-describedby')).to.exist()
  })

  it('should have equal messagesId and aria-describedby values', async () => {
    await mount(
      <TextInput
        label="Name"
        messages={
          [{
            text: 'yup',
            type: 'error'
          }]
        }
      />
    )
    const textInput = await TextInputLocator.find()
    const input = await textInput.findInput()

    const id = input.getAttribute('aria-describedby')
    const messages = await textInput.find(`[id="${id}"]`)

    expect(messages).to.exist()
  })

  describe('events', async () => {
    it('responds to onChange event', async () => {
      const onChange = stub()
      await mount(
        <TextInput
          label="Name"
          onChange={onChange}
        />
      )
      const textInput = await TextInputLocator.find()
      const input = await textInput.findInput()

      await input.change({ target: { value: 'foo' } })
      expect(onChange).to.have.been.called()
    })

    it('responds to onBlur event', async () => {
      const onBlur = stub()
      await mount(
        <TextInput
          label="Name"
          onBlur={onBlur}
        />
      )
      const textInput = await TextInputLocator.find()
      const input = await textInput.findInput()

      await input.blur()
      expect(onBlur).to.have.been.called()
    })

    it('responds to onFocus event', async () => {
      const onFocus = stub()
      await mount(
        <TextInput
          label="Name"
          onFocus={onFocus}
        />
      )
      const textInput = await TextInputLocator.find()
      const input = await textInput.findInput()

      await input.focus()
      expect(onFocus).to.have.been.called()
    })
  })

  describe('for a11y', async () => {
    it('should meet standards', async () => {
      await mount(
        <TextInput
          label="Name"
        />
      )
      const textInput = await TextInputLocator.find()

      expect(await textInput.accessible()).to.be.true()
    })

    it('should set aria-invalid when errors prop is set', async () => {
      await mount(
        <TextInput
          label="Name"
          messages={[{ type: 'error', text: 'some error message' }]}
        />
      )
      const textInput = await TextInputLocator.find()
      const input = await textInput.findInput()

      expect(input).to.have.attribute('aria-invalid', 'true')
    })
  })
})
