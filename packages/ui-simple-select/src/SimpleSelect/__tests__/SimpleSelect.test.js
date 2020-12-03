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
import {
  expect,
  mount,
  stub,
  wait,
  generateA11yTests
} from '@instructure/ui-test-utils'

import { SimpleSelect } from '../index'
import { SimpleSelectLocator } from '../SimpleSelectLocator'
import SimpleSelectExamples from '../__examples__/SimpleSelect.examples'

describe('<SimpleSelect />', async () => {
  beforeEach(async () => {
    stub(console, 'warn') // suppress experimental warnings
  })

  const lastCall = (spy) => spy.lastCall.args
  const defaultOptions = ['foo', 'bar', 'baz']
  const getOptions = (highlighted, selected, disabled) =>
    defaultOptions.map((opt) => (
      <SimpleSelect.Option
        id={opt}
        key={opt}
        value={opt}
        isDisabled={opt === disabled}
      >
        {opt}
      </SimpleSelect.Option>
    ))

  it('should render an input and a list', async () => {
    await mount(
      <SimpleSelect renderLabel="Choose an option">{getOptions()}</SimpleSelect>
    )
    const select = await SimpleSelectLocator.find()
    const input = await select.findInput()
    let list = await select.findOptionsList({ expectEmpty: true })

    expect(input).to.exist()
    expect(list).to.not.exist()

    await input.click()

    list = await select.findOptionsList()
    expect(list).to.exist()
  })

  it('should render groups', async () => {
    await mount(
      <SimpleSelect renderLabel="Choose an option">
        <SimpleSelect.Option id="0" value="0">
          ungrouped option one
        </SimpleSelect.Option>
        <SimpleSelect.Group renderLabel="Group one">
          <SimpleSelect.Option id="1" value="1">
            grouped option one
          </SimpleSelect.Option>
        </SimpleSelect.Group>
        <SimpleSelect.Group renderLabel="Group two">
          <SimpleSelect.Option id="2" value="2">
            grouped option two
          </SimpleSelect.Option>
        </SimpleSelect.Group>
        <SimpleSelect.Option id="3" value="3">
          ungrouped option two
        </SimpleSelect.Option>
      </SimpleSelect>
    )
    const select = await SimpleSelectLocator.find()
    const input = await select.findInput()

    await input.click()

    const list = await select.findOptionsList()
    const listbox = await list.find('ul[role="listbox"]')
    const groups = await listbox.findAll('ul[role="group"]')
    const label = await listbox.find(':textContent("Group one")')

    expect(label.getAttribute('role')).to.equal('presentation')
    expect(groups[0].getAttribute('aria-labelledby')).to.equal(
      label.getAttribute('id')
    )
    expect(groups).to.have.length(2)
  })

  it('should ignore invalid children', async () => {
    const consoleError = stub(console, 'error')
    await mount(
      <SimpleSelect renderLabel="Choose an option">
        <SimpleSelect.Option id="0">valid</SimpleSelect.Option>
        <div>invalid</div>
      </SimpleSelect>
    )
    const select = await SimpleSelectLocator.find()
    const input = await select.findInput()

    await input.click()
    const list = await select.findOptionsList()
    const div = await list.find(':textContent("invalid")', {
      expectEmpty: true
    })

    expect(div).to.not.exist()
    await wait(() => {
      expect(consoleError).to.have.been.calledWithMatch(
        'Expected one of Group, Option'
      )
    })
  })

  it('should fire onChange when selected option changes', async () => {
    const onChange = stub()
    await mount(
      <SimpleSelect renderLabel="Choose an option" onChange={onChange}>
        {getOptions()}
      </SimpleSelect>
    )
    const select = await SimpleSelectLocator.find()
    const input = await select.findInput()

    await input.click()
    const list = await select.findOptionsList()
    const options = await list.findAll('[role="option"]')

    await options[1].click()
    expect(lastCall(onChange)[1].id).to.equal(defaultOptions[1])
  })

  it('should behave uncontrolled', async () => {
    const onChange = stub()
    await mount(
      <SimpleSelect renderLabel="Choose an option" onChange={onChange}>
        {getOptions()}
      </SimpleSelect>
    )
    const select = await SimpleSelectLocator.find()
    const input = await select.findInput()

    expect(input.getAttribute('value')).to.equal(defaultOptions[0])

    await input.click()
    const list = await select.findOptionsList()
    const options = await list.findAll('[role="option"]')

    await options[1].click()
    expect(input.getAttribute('value')).to.equal(defaultOptions[1])
    expect(lastCall(onChange)[1].id).to.equal(defaultOptions[1])
  })

  it('should behave controlled', async () => {
    const onChange = stub()
    const subject = await mount(
      <SimpleSelect
        renderLabel="Choose an option"
        value={defaultOptions[1]}
        onChange={onChange}
      >
        {getOptions()}
      </SimpleSelect>
    )
    const select = await SimpleSelectLocator.find()
    const input = await select.findInput()

    expect(input.getAttribute('value')).to.equal(defaultOptions[1])

    await input.click()
    const list = await select.findOptionsList()
    const options = await list.findAll('[role="option"]')

    await options[2].click()
    expect(input.getAttribute('value')).to.equal(defaultOptions[1])
    expect(lastCall(onChange)[1].id).to.equal(defaultOptions[2])

    await subject.setProps({ value: defaultOptions[2] })

    expect(input.getAttribute('value')).to.equal(defaultOptions[2])
  })

  it('should fire onFocus when input gains focus', async () => {
    const onFocus = stub()
    await mount(
      <SimpleSelect renderLabel="Choose an option" onFocus={onFocus}>
        {getOptions()}
      </SimpleSelect>
    )
    const select = await SimpleSelectLocator.find()
    const input = await select.findInput()

    await input.focus()

    await wait(() => {
      expect(onFocus).to.have.been.called()
    })
  })

  describe('input', async () => {
    it('should render with a custom id if given', async () => {
      await mount(
        <SimpleSelect renderLabel="Choose an option" id="customSelect" />
      )
      const select = await SimpleSelectLocator.find()
      const input = await select.findInput()

      expect(input.getAttribute('id')).to.equal('customSelect')
    })

    it('should always render readonly', async () => {
      await mount(
        <SimpleSelect renderLabel="Choose an option" interaction="enabled" />
      )
      const select = await SimpleSelectLocator.find()
      const input = await select.findInput()

      expect(input.getAttribute('readonly')).to.exist()
      expect(input.getAttribute('disabled')).to.not.exist()
    })

    it('should render disabled when interaction="disabled"', async () => {
      await mount(
        <SimpleSelect
          renderLabel="Choose an option"
          interaction="disabled"
          onInputChange={() => {}}
        />
      )
      const select = await SimpleSelectLocator.find()
      const input = await select.findInput()

      expect(input.getAttribute('disabled')).to.exist()
      expect(input.getAttribute('readonly')).to.not.exist()
    })

    it('should render required when isRequired={true}', async () => {
      await mount(<SimpleSelect renderLabel="Choose an option" isRequired />)
      const select = await SimpleSelectLocator.find()
      const input = await select.findInput()

      expect(input.getAttribute('required')).to.exist()
    })

    it('should set input role to "button"', async () => {
      await mount(
        <SimpleSelect renderLabel="Choose an option">
          {getOptions()}
        </SimpleSelect>
      )
      const select = await SimpleSelectLocator.find()
      const input = await select.findInput()

      expect(input.getAttribute('role')).to.equal('button')
    })

    it('should allow assistive text', async () => {
      await mount(
        <SimpleSelect
          renderLabel="Choose an option"
          assistiveText="hello world"
        >
          {getOptions()}
        </SimpleSelect>
      )
      const select = await SimpleSelectLocator.find()
      const input = await select.findInput()
      const text = await select.find(':textContent("hello world")')

      expect(input.getAttribute('aria-describedby')).to.equal(
        text.getAttribute('id')
      )
    })

    it('should allow custom props to pass through', async () => {
      await mount(
        <SimpleSelect renderLabel="Choose an option" data-custom-attr="true">
          {getOptions()}
        </SimpleSelect>
      )
      const select = await SimpleSelectLocator.find()
      const input = await select.findInput()

      expect(input.getAttribute('data-custom-attr')).to.equal('true')
    })

    it('should provide a ref to the input element', async () => {
      const inputRef = stub()
      await mount(
        <SimpleSelect renderLabel="Choose an option" inputRef={inputRef}>
          {getOptions()}
        </SimpleSelect>
      )
      const select = await SimpleSelectLocator.find()
      const input = await select.findInput()

      expect(inputRef).to.have.been.calledWith(input.getDOMNode())
    })
  })

  describe('list', async () => {
    it('should set aria-disabled on options when isDisabled={true}', async () => {
      await mount(
        <SimpleSelect renderLabel="Choose an option">
          {getOptions(null, null, defaultOptions[2])}
        </SimpleSelect>
      )
      const select = await SimpleSelectLocator.find()
      const input = await select.findInput()

      await input.click()
      const list = await select.findOptionsList()
      const options = await list.findAll('[role="option"]')

      expect(options[0].getAttribute('aria-disabled')).to.not.exist()
      expect(options[2].getAttribute('aria-disabled')).to.equal('true')
    })

    it('should provide a ref to the list element', async () => {
      const listRef = stub()
      await mount(
        <SimpleSelect
          renderLabel="Choose an option"
          isShowingOptions
          listRef={listRef}
        >
          {getOptions()}
        </SimpleSelect>
      )
      const select = await SimpleSelectLocator.find()
      const input = await select.findInput()

      await input.click()
      const list = await select.findOptionsList()
      const listbox = await list.find('ul[role="listbox"]')

      expect(listRef).to.have.been.calledWith(listbox.getDOMNode())
    })
  })

  describe('with generated examples', async () => {
    generateA11yTests(SimpleSelectExamples)
  })
})
