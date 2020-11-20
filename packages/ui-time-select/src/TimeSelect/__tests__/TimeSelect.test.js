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
  generateA11yTests,
  stub,
  wait
} from '@instructure/ui-test-utils'

import { DateTime } from '@instructure/ui-i18n'
import { TimeSelect } from '../index'
import { TimeSelectLocator } from '../TimeSelectLocator'
import TimeSelectExamples from '../__examples__/TimeSelect.examples'

describe('<TimeSelect />', async () => {
  beforeEach(async () => {
    stub(console, 'warn') // suppress experimental warnings
  })

  const lastCall = (spy) => spy.lastCall.args

  it('should render an input and list', async () => {
    await mount(<TimeSelect renderLabel="Choose a time" />)
    const select = await TimeSelectLocator.find()
    const input = await select.findInput()
    let list = await select.findOptionsList({ expectEmpty: true })

    expect(input).to.exist()
    expect(list).to.not.exist()

    await input.click()

    list = await select.findOptionsList()
    expect(list).to.exist()
  })

  it('should fire onChange when selected option changes', async () => {
    const onChange = stub()
    await mount(
      <TimeSelect
        renderLabel="Choose a time"
        timezone="US/Eastern"
        onChange={onChange}
      />
    )
    const select = await TimeSelectLocator.find()
    const input = await select.findInput()

    await input.click()
    const list = await select.findOptionsList()
    const options = await list.findAll('[role="option"]')

    await options[1].click()
    expect(lastCall(onChange)[1].value).to.exist()
  })

  it('should fire onFocus when input gains focus', async () => {
    const onFocus = stub()
    await mount(<TimeSelect renderLabel="Choose a time" onFocus={onFocus} />)
    const select = await TimeSelectLocator.find()
    const input = await select.findInput()

    await input.focus()

    await wait(() => {
      expect(onFocus).to.have.been.called()
    })
  })

  it('should behave uncontrolled', async () => {
    const onChange = stub()
    await mount(<TimeSelect renderLabel="Choose a time" onChange={onChange} />)
    const select = await TimeSelectLocator.find()
    const input = await select.findInput()

    expect(input.getAttribute('value')).to.equal('')

    await input.click()
    const list = await select.findOptionsList()
    const options = await list.findAll('[role="option"]')

    await options[0].click()
    expect(input.getAttribute('value')).to.equal('12:00 AM')
  })

  it('should behave controlled', async () => {
    const onChange = stub()
    const value = DateTime.parse('1986-05-17T05:00:00.000Z', 'en', 'US/Eastern')
    const subject = await mount(
      <TimeSelect
        renderLabel="Choose an option"
        value={value.toISOString()}
        timezone="US/Eastern"
        onChange={onChange}
      />
    )
    const select = await TimeSelectLocator.find()
    const input = await select.findInput()

    expect(input.getAttribute('value')).to.equal(value.format('LT'))

    await input.click()
    const list = await select.findOptionsList()
    const options = await list.findAll('[role="option"]')

    await options[3].click()
    await subject.setProps({ value: lastCall(onChange)[1].value })
    expect(input.getAttribute('value')).to.equal(options[3].getTextContent())
  })

  it('should render a default value', async () => {
    const defaultValue = DateTime.parse(
      '1986-05-17T18:00:00.000Z',
      'en',
      'US/Eastern'
    )
    const onChange = stub()

    await mount(
      <TimeSelect
        renderLabel="Choose a time"
        onChange={onChange}
        timezone="US/Eastern"
        defaultValue={defaultValue.toISOString()}
      />
    )
    const select = await TimeSelectLocator.find()
    const input = await select.findInput()

    expect(input.getAttribute('value')).to.equal('2:00 PM')
  })

  it('should display value when both defaultValue and value are set', async () => {
    const value = DateTime.parse('1986-05-17T18:00:00.000Z', 'en', 'US/Eastern')
    const defaultValue = DateTime.parse(
      '1986-05-25T19:00:00.000Z',
      'en',
      'US/Eastern'
    )
    await mount(
      <TimeSelect
        renderLabel="Choose a time"
        timezone="US/Eastern"
        value={value.toISOString()}
        defaultValue={defaultValue.toISOString()}
      />
    )
    const timeInput = await TimeSelectLocator.find()
    const input = await timeInput.findInput()

    expect(input.getDOMNode().value).to.equal(value.format('LT'))
  })

  it('should default to the first option if defaultToFirstOption is true', async () => {
    await mount(<TimeSelect renderLabel="Choose a time" defaultToFirstOption />)
    const select = await TimeSelectLocator.find()
    const input = await select.findInput()

    expect(input.getAttribute('value')).to.equal('12:00 AM')
  })

  it('should use the specified timezone', async () => {
    const value = DateTime.parse('1986-05-17T18:00:00.000Z', 'en', 'US/Central')
    const oneHourBackValue = DateTime.parse(
      '1986-05-17T18:00:00.000Z',
      'en',
      'US/Mountain'
    )
    const oneHourForwardBackValue = DateTime.parse(
      '1986-05-17T18:00:00.000Z',
      'en',
      'US/Eastern'
    )
    await mount(
      <TimeSelect
        renderLabel="Choose a time"
        timezone="US/Central"
        value={value.toISOString()}
      />
    )
    const timeInput = await TimeSelectLocator.find()
    const input = await timeInput.findInput()

    expect(input.getAttribute('value')).to.not.equal(
      oneHourBackValue.format('LT')
    )
    expect(input.getAttribute('value')).to.not.equal(
      oneHourForwardBackValue.format('LT')
    )
  })

  it('should use the specified locale', async () => {
    const value = DateTime.parse('1986-05-17T18:00:00.000Z', 'en', 'US/Eastern')
    await mount(
      <TimeSelect
        renderLabel="Choose a time"
        timezone="US/Eastern"
        locale="fr"
        value={value.toISOString()}
      />
    )
    const timeInput = await TimeSelectLocator.find()
    const input = await timeInput.findInput()

    expect(input.getAttribute('value')).to.not.equal(value.format('LT'))
    expect(input.getAttribute('value')).to.equal(
      value.locale('fr').format('LT')
    )
  })

  it('should use the specified step value', async () => {
    const value = DateTime.parse('1986-05-17T18:00:00.000Z', 'en', 'US/Eastern')
    await mount(
      <TimeSelect
        renderLabel="Choose a time"
        timezone="US/Eastern"
        step={15}
        value={value.toISOString()}
      />
    )
    const timeInput = await TimeSelectLocator.find()
    const input = await timeInput.findInput()

    await input.click()

    await wait(async () => {
      const list = await timeInput.findOptionsList()
      const options = await list.findAll('[role="option"]')

      expect(input.getAttribute('value')).to.equal(value.format('LT'))

      expect(options[0].getTextContent()).to.equal(
        value.hour(0).minute(0).format('LT')
      )
      expect(options[1].getTextContent()).to.equal(
        value.hour(0).minute(15).format('LT')
      )
    })
  })

  describe('input', async () => {
    it('should render with a custom id if given', async () => {
      await mount(<TimeSelect renderLabel="Choose a time" id="timeSelect" />)
      const select = await TimeSelectLocator.find()
      const input = await select.findInput()

      expect(input.getAttribute('id')).to.equal('timeSelect')
    })

    it('should render readonly when interaction="readonly"', async () => {
      await mount(
        <TimeSelect renderLabel="Choose a time" interaction="readonly" />
      )
      const select = await TimeSelectLocator.find()
      const input = await select.findInput()

      expect(input.getAttribute('readonly')).to.exist()
      expect(input.getAttribute('disabled')).to.not.exist()
    })

    it('should render disabled when interaction="disabled"', async () => {
      await mount(
        <TimeSelect renderLabel="Choose a time" interaction="disabled" />
      )
      const select = await TimeSelectLocator.find()
      const input = await select.findInput()

      expect(input.getAttribute('disabled')).to.exist()
      expect(input.getAttribute('readonly')).to.not.exist()
    })

    it('should render required when isRequired is true', async () => {
      await mount(<TimeSelect renderLabel="Choose a time" isRequired />)
      const select = await TimeSelectLocator.find()
      const input = await select.findInput()

      expect(input.getAttribute('required')).to.exist()
    })

    it('should allow custom props to pass through', async () => {
      await mount(
        <TimeSelect renderLabel="Choose a time" data-custom-attr="true" />
      )
      const select = await TimeSelectLocator.find()
      const input = await select.findInput()

      expect(input.getAttribute('data-custom-attr')).to.equal('true')
    })

    it('should provide a ref to the input element', async () => {
      const inputRef = stub()
      await mount(
        <TimeSelect renderLabel="Choose a time" inputRef={inputRef} />
      )
      const select = await TimeSelectLocator.find()
      const input = await select.findInput()

      expect(inputRef).to.have.been.calledWith(input.getDOMNode())
    })
  })

  describe('list', async () => {
    it('should provide a ref to the list element', async () => {
      const listRef = stub()
      await mount(<TimeSelect renderLabel="Choose a time" listRef={listRef} />)
      const select = await TimeSelectLocator.find()
      const input = await select.findInput()

      await input.click()
      const list = await select.findOptionsList()
      const listbox = await list.find('ul[role="listbox"]')

      expect(listRef).to.have.been.calledWith(listbox.getDOMNode())
    })
  })

  describe('with generated examples', async () => {
    generateA11yTests(TimeSelectExamples)
  })
})
