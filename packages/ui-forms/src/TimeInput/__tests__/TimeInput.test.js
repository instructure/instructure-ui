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
import { expect, mount, wait, stub } from '@instructure/ui-test-utils'
import { DateTime } from '@instructure/ui-i18n'

import { TimeInput } from '../index'
import TimeInputLocator from '../locator'

describe('<TimeInput />', async () => {
  beforeEach(async () => {
    stub(console, 'warn') // suppress deprecation warnings
  })

  it('should render', async () => {
    await mount(
      <TimeInput
        label="fake label"
        timezone="US/Eastern"
      />
    )
    expect(await TimeInputLocator.find()).to.exist()
  })

  it('renders the specified value when present', async () => {
    const value = DateTime.parse('1986-05-17T18:00:00.000Z', 'en', 'US/Eastern')
    await mount(
      <TimeInput
        label="fake label"
        timezone="US/Eastern"
        format="LT"
        value={value.toISOString()}
        onChange={() => {}}
      />
    )
    const timeInput = await TimeInputLocator.find()
    const input = await timeInput.findInput()

    expect(input.getDOMNode().value).to.equal(value.format('LT'))
  })

  it('renders the specified default value when present', async () => {
    const defaultValue = DateTime.parse('1986-05-25T19:00:00.000Z', 'en', 'US/Eastern')
    await mount(
      <TimeInput
        label="fake label"
        timezone="US/Eastern"
        format="LT"
        defaultValue={defaultValue.toISOString()}
      />
    )
    const timeInput = await TimeInputLocator.find()
    const input = await timeInput.findInput()

    expect(input.getDOMNode().value).to.equal(defaultValue.format('LT'))
  })

  it('renders the specified value when both default value and value are set', async () => {
    const value = DateTime.parse('1986-05-17T18:00:00.000Z', 'en', 'US/Eastern')
    const defaultValue = DateTime.parse('1986-05-25T19:00:00.000Z', 'en', 'US/Eastern')
    await mount(
      <TimeInput
        label="fake label"
        timezone="US/Eastern"
        format="LT"
        value={value.toISOString()}
        defaultValue={defaultValue.toISOString()}
        onChange={() => {}}
      />
    )
    const timeInput = await TimeInputLocator.find()
    const input = await timeInput.findInput()

    expect(input.getDOMNode().value).to.equal(value.format('LT'))
  })

  it('renders using the specified timezone', async () => {
    const value = DateTime.parse('1986-05-17T18:00:00.000Z', 'en', 'US/Central')
    const oneHourBackValue = DateTime.parse('1986-05-17T18:00:00.000Z', 'en', 'US/Mountain')
    const oneHourForwardBackValue = DateTime.parse('1986-05-17T18:00:00.000Z', 'en', 'US/Eastern')
    await mount(
      <TimeInput
        label="fake label"
        timezone="US/Central"
        format="LT"
        value={value.toISOString()}
        onChange={() => {}}
      />
    )
    const timeInput = await TimeInputLocator.find()
    const input = await timeInput.findInput()

    expect(input.getDOMNode().value).to.not.equal(oneHourBackValue.format('LT'))
    expect(input.getDOMNode().value).to.not.equal(oneHourForwardBackValue.format('LT'))
  })

  it('renders using the specified locale', async () => {
    const value = DateTime.parse('1986-05-17T18:00:00.000Z', 'en', 'US/Eastern')
    await mount(
      <TimeInput
        label="fake label"
        timezone="US/Eastern"
        locale="fr"
        format="LT"
        value={value.toISOString()}
        onChange={() => {}}
      />
    )
    const timeInput = await TimeInputLocator.find()
    const input = await timeInput.findInput()

    expect(input.getDOMNode().value).to.not.equal(value.format('LT'))
    expect(input.getDOMNode().value).to.equal(value.locale('fr').format('LT'))
  })

  it('defaults to the first option when set to do so, no default value is set, and no value is set', async () => {
    await mount(
      <TimeInput
        defaultToFirstOption
        label="fake label"
        timezone="US/Eastern"
        constrain="window"
      />
    )
    const timeInput = await TimeInputLocator.find()
    const input = await timeInput.findInput()

    await input.click()

    const item = await timeInput.findOption()

    expect(input.getDOMNode().value).to.equal(item.getTextContent())
  })

  it('renders using the specified step value', async () => {
    const value = DateTime.parse('1986-05-17T18:00:00.000Z', 'en', 'US/Eastern')
    await mount(
      <TimeInput
        label="fake label"
        timezone="US/Eastern"
        format="LT"
        step={15}
        value={value.toISOString()}
        constrain="window"
        onChange={() => {}}
      />
    )
    const timeInput = await TimeInputLocator.find()
    const input = await timeInput.findInput()

    await input.click()

    await wait(async () => {
      const items = await timeInput.findAllOptions()

      expect(input.getDOMNode().value).to.equal(value.format('LT'))

      expect(items[0].getTextContent()).to.equal(value.hour(0).minute(0).format('LT'))
      expect(items[1].getTextContent()).to.equal(value.hour(0).minute(15).format('LT'))
    })
  })

  it('should meet a11y standards', async () => {
    await mount(
      <TimeInput
        label="fake label"
        timezone="US/Eastern"
        constrain="window"
      />
    )
    const timeInput = await TimeInputLocator.find()
    await timeInput.click()

    expect(await timeInput.accessible()).to.be.true()
  })
})
