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
import type { SinonStub } from '@instructure/ui-test-utils'
import moment from 'moment-timezone'
import { TimeSelect } from '../index'
import { TimeSelectLocator } from '../TimeSelectLocator'
import TimeSelectExamples from '../__examples__/TimeSelect.examples'
import { DateTime, ApplyLocale } from '@instructure/ui-i18n'

describe('<TimeSelect />', async () => {
  const lastCall = (spy: SinonStub) => spy.lastCall.args

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
    const value = moment.tz(
      '1986-05-17T05:00:00.000Z',
      moment.ISO_8601,
      'en',
      'US/Eastern'
    )

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

  it('Pressing ESC should reset the value in controlled mode', async () => {
    const onChange = stub()
    const onKeyDown = stub()
    const handleInputChange = stub()
    const dateTime = DateTime.parse('2017-05-01T17:30Z', 'en-US', 'GMT')
    const subject = await mount(
      <TimeSelect
        renderLabel="Choose a time"
        allowNonStepInput={true}
        value={dateTime.toISOString()}
        locale="en_AU"
        timezone="US/Eastern"
        onChange={onChange}
        onInputChange={handleInputChange}
        onKeyDown={onKeyDown}
      />
    )
    const select = await TimeSelectLocator.find()
    const input = await select.findInput()
    await subject.setProps({ value: '' })
    await input.typeIn('7:45 PM')
    await input.keyUp('Esc') // should reset the value
    expect(onChange).to.have.been.not.called()
    expect(onKeyDown).to.have.been.called()
    expect(handleInputChange).to.have.been.called()
    expect(input.getAttribute('value')).to.equal('')
  })

  it('value should not be changeable via user input in controlled mode', async () => {
    const dateTime = DateTime.parse('2017-05-01T17:30Z', 'en-US', 'GMT')
    await mount(
      <TimeSelect
        renderLabel="Choose a time"
        allowNonStepInput={true}
        value={dateTime.toISOString()}
        locale="en_AU"
        timezone="US/Eastern"
      />
    )
    const select = await TimeSelectLocator.find()
    const input = await select.findInput()
    await input.change({ target: { value: '' } })
    await input.typeIn('1:45 PM')
    await input.keyDown('Enter')
    await input.focusOut()
    expect(input.getAttribute('value')).to.equal('1:30 PM')
  })

  it('should keep selection when value changes', async () => {
    const onChange = stub()
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const dateTime = DateTime.parse('2017-05-01T17:30Z', locale, timezone)

    const subject = await mount(
      <TimeSelect
        renderLabel="Choose an option"
        value={dateTime.toISOString()}
        timezone="US/Eastern"
        onChange={onChange}
      />
    )
    const select = await TimeSelectLocator.find()
    const input = await select.findInput()

    expect(input.getAttribute('value')).to.equal(dateTime.format('LT'))

    const newDateStr = '2022-03-29T19:00Z'
    const newDateTime = DateTime.parse(newDateStr, locale, timezone)
    await subject.setProps({ value: newDateTime })
    expect(input.getAttribute('value')).to.equal(newDateTime.format('LT'))
  })

  it('should accept values that are not divisible by step', async () => {
    const onChange = stub()
    const subject = await mount(
      <TimeSelect
        renderLabel="Choose an option"
        timezone="US/Eastern"
        onChange={onChange}
      />
    )
    const select = await TimeSelectLocator.find()
    const input = await select.findInput()
    // this expect() is needed so TimeSelect generates some default options
    expect(input.getAttribute('value')).to.equal('')

    const value = moment.tz(
      '1986-05-17T05:02:00.000Z',
      moment.ISO_8601,
      'en',
      'US/Eastern'
    )
    await subject.setProps({ value: value.toISOString() })
    expect(input.getAttribute('value')).to.equal(value.format('LT'))
  })

  it('should render a default value', async () => {
    const defaultValue = moment.tz(
      '1986-05-17T18:00:00.000Z',
      moment.ISO_8601,
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
    const value = moment.tz(
      '1986-05-17T18:00:00.000Z',
      moment.ISO_8601,
      'en',
      'US/Eastern'
    )
    const defaultValue = moment.tz(
      '1986-05-25T19:00:00.000Z',
      moment.ISO_8601,
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
    const value = moment.tz(
      '1986-05-17T18:00:00.000Z',
      moment.ISO_8601,
      'en',
      'US/Central'
    )
    const oneHourBackValue = moment.tz(
      '1986-05-17T18:00:00.000Z',
      moment.ISO_8601,
      'en',
      'US/Mountain'
    )
    const oneHourForwardBackValue = moment.tz(
      '1986-05-17T18:00:00.000Z',
      moment.ISO_8601,
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
    const value = moment.tz(
      '1986-05-17T18:00:00.000Z',
      moment.ISO_8601,
      'en',
      'US/Eastern'
    )
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
    const value = moment.tz(
      '1986-05-17T18:00:00.000Z',
      moment.ISO_8601,
      'en',
      'US/Eastern'
    )
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

  it('should read locale and timezone from context', async () => {
    const dateTime = DateTime.parse('2017-05-01T17:30Z', 'en-US', 'GMT')
    await mount(
      // Africa/Nairobi is GMT +3
      <ApplyLocale locale="fr" timezone="Africa/Nairobi">
        <TimeSelect
          renderLabel="Choose a time"
          step={15}
          value={dateTime.toISOString()}
        />
      </ApplyLocale>
    )
    const timeInput = await TimeSelectLocator.find()
    const input = await timeInput.findInput()
    expect(input.getAttribute('value')).to.equal('20:30')
  })

  it('should not allow non-step value when allowNonStepInput=false', async () => {
    const onChange = stub()
    await mount(
      <TimeSelect
        renderLabel="Choose a time"
        allowNonStepInput={false}
        locale="en_AU"
        timezone="US/Eastern"
        onChange={onChange}
      />
    )
    const select = await TimeSelectLocator.find()
    const input = await select.findInput()
    await input.typeIn('7:34 PM')
    await input.keyDown('Enter') // should not send onChange event
    await input.keyUp('esc') // should reset the value
    expect(onChange).to.have.not.been.called()
    expect(input.getAttribute('value')).to.equal('')
  })

  it('should allow non-step value when allowNonStepInput=true', async () => {
    const onChange = stub()
    await mount(
      <TimeSelect
        renderLabel="Choose a time"
        allowNonStepInput={true}
        locale="en_AU"
        timezone="US/Eastern"
        onChange={onChange}
      />
    )
    const select = await TimeSelectLocator.find()
    const input = await select.findInput()
    await input.typeIn('7:34 PM')
    await input.focusOut() // sends onChange event
    expect(onChange).to.have.been.called()
    expect(lastCall(onChange)[1].value).to.exist()
    expect(input.getAttribute('value')).to.equal('7:34 PM')
  })

  it('adding event listeners does not break functionality', async () => {
    const onChange = stub()
    const onKeyDown = stub()
    const handleInputChange = stub()
    await mount(
      <TimeSelect
        renderLabel="Choose a time"
        allowNonStepInput={true}
        locale="en_AU"
        timezone="US/Eastern"
        onChange={onChange}
        onInputChange={handleInputChange}
        onKeyDown={onKeyDown}
      />
    )
    const select = await TimeSelectLocator.find()
    const input = await select.findInput()
    await input.typeIn('7:45 PM')
    await input.focusOut() // sends onChange event
    expect(onChange).to.have.been.called()
    expect(onKeyDown).to.have.been.called()
    expect(handleInputChange).to.have.been.called()
    expect(input.getAttribute('value')).to.equal('7:45 PM')
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
    generateA11yTests(TimeSelect, TimeSelectExamples)
  })
})
