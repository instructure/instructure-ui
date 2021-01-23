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

import { RangeInput } from '../index'
import { RangeInputLocator } from '../RangeInputLocator'

describe('<RangeInput />', async () => {
  it('renders an input with type "range"', async () => {
    await mount(<RangeInput label="Opacity" name="opacity" max={100} min={0} />)
    const rangeInput = await RangeInputLocator.find()
    const input = await rangeInput.findInput()

    expect(input).to.exist()
  })

  it('displays the default value', async () => {
    await mount(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={0}
        defaultValue={42}
      />
    )
    const rangeInput = await RangeInputLocator.find()
    const output = await rangeInput.findOutput()

    expect(output).to.have.text('42')
  })

  it('sets input value to default value', async () => {
    await mount(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={0}
        defaultValue={25}
      />
    )
    const rangeInput = await RangeInputLocator.find()
    const input = await rangeInput.findInput()

    expect(input).to.have.value('25')
  })

  it('sets input value to controlled value', async () => {
    await mount(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={0}
        value={25}
        onChange={() => {}}
      />
    )
    const rangeInput = await RangeInputLocator.find()
    const input = await rangeInput.findInput()

    expect(input).to.have.value('25')
  })

  it('sets min value', async () => {
    await mount(
      <RangeInput label="Opacity" name="opacity" max={100} min={25} />
    )
    const rangeInput = await RangeInputLocator.find()
    const input = await rangeInput.findInput()

    expect(input).to.have.attribute('min', '25')
  })

  it('sets max value', async () => {
    await mount(<RangeInput label="Opacity" name="opacity" max={75} min={0} />)
    const rangeInput = await RangeInputLocator.find()
    const input = await rangeInput.findInput()

    expect(input).to.have.attribute('max', '75')
  })

  it('sets step value', async () => {
    await mount(
      <RangeInput label="Opacity" name="opacity" max={100} min={0} step={5} />
    )
    const rangeInput = await RangeInputLocator.find()
    const input = await rangeInput.findInput()

    expect(input).to.have.attribute('step', '5')
  })

  it('requires an `onChange` prop with a `value` prop', async () => {
    const consoleError = stub(console, 'error')
    await mount(
      <RangeInput label="Opacity" name="opacity" max={100} min={0} value={50} />
    )

    expect(consoleError).to.have.been.calledWithMatch(
      `provided a 'value' prop without an 'onChange' handler`
    )
  })

  it('formats the value displayed', async () => {
    await mount(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={0}
        defaultValue={45}
        formatValue={(value) => {
          return `${value}%`
        }}
      />
    )
    const rangeInput = await RangeInputLocator.find()
    const output = await rangeInput.findOutput()

    expect(output).to.have.text('45%')
  })

  it('hides the value when displayValue is false', async () => {
    await mount(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={0}
        displayValue={false}
      />
    )
    const rangeInput = await RangeInputLocator.find()
    const output = await rangeInput.findOutput('output', { expectEmpty: true })

    expect(output).to.not.exist()
  })

  it('sets invalid when error messages are present', async () => {
    let ref
    await mount(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={0}
        messages={[{ text: 'Invalid name', type: 'error' }]}
        componentRef={(el) => (ref = el)}
      />
    )

    expect(ref.invalid).to.be.true()
  })

  describe('for a11y', async () => {
    it('should meet standards', async () => {
      await mount(
        <RangeInput
          label="Opacity"
          name="opacity"
          max={100}
          min={0}
          defaultValue={50}
        />
      )
      const rangeInput = await RangeInputLocator.find()
      expect(await rangeInput.accessible()).to.be.true()
    })

    it('sets the input role to "slider"', async () => {
      await mount(
        <RangeInput
          label="Opacity"
          name="opacity"
          max={100}
          min={0}
          defaultValue={50}
        />
      )
      const rangeInput = await RangeInputLocator.find()
      const input = await rangeInput.findInput('input[type="range"]')

      expect(input).to.have.attribute('role', 'slider')
    })

    it('sets the aria-valuenow attribute', async () => {
      await mount(
        <RangeInput
          label="Opacity"
          name="opacity"
          max={100}
          min={0}
          defaultValue={40}
        />
      )
      const rangeInput = await RangeInputLocator.find()
      const input = await rangeInput.findInput()

      expect(input).to.have.attribute('aria-valuenow', '40')
    })

    it('sets the aria-valuemin attribute', async () => {
      await mount(
        <RangeInput label="Opacity" name="opacity" max={100} min={20} />
      )
      const rangeInput = await RangeInputLocator.find()
      const input = await rangeInput.findInput()

      expect(input).to.have.attribute('aria-valuemin', '20')
    })

    it('sets the aria-valuemax attribute', async () => {
      await mount(
        <RangeInput label="Opacity" name="opacity" max={80} min={0} />
      )
      const rangeInput = await RangeInputLocator.find()
      const input = await rangeInput.findInput()

      expect(input).to.have.attribute('aria-valuemax', '80')
    })

    it('formats the aria-valuetext attribute', async () => {
      await mount(
        <RangeInput
          label="Opacity"
          name="opacity"
          max={100}
          min={0}
          defaultValue={40}
          formatValue={(value) => {
            return `${value}%`
          }}
        />
      )
      const rangeInput = await RangeInputLocator.find()
      const input = await rangeInput.findInput()

      expect(input).to.have.attribute('aria-valuetext', '40%')
    })
  })

  describe('when the input value changes', async () => {
    it('should update the value displayed', async () => {
      await mount(
        <RangeInput
          label="Opacity"
          name="opacity"
          max={100}
          min={0}
          defaultValue={50}
        />
      )
      const rangeInput = await RangeInputLocator.find()
      const input = await rangeInput.findInput()
      const output = await rangeInput.findOutput()

      await input.change({ target: { value: '30' } })

      expect(output).to.have.text('30')
      expect(input).to.have.attribute('aria-valuenow', '30')
    })

    it('should call the onChange prop', async () => {
      const onChange = stub()
      await mount(
        <RangeInput
          label="Opacity"
          name="opacity"
          max={100}
          min={0}
          defaultValue={50}
          onChange={onChange}
        />
      )
      const rangeInput = await RangeInputLocator.find()
      const input = await rangeInput.findInput()

      await input.change({ target: { value: '30' } })

      expect(onChange).to.have.been.calledWith('30')
    })

    it('should not update the input value when the value prop is set', async () => {
      await mount(
        <RangeInput
          label="Opacity"
          name="opacity"
          max={100}
          min={0}
          value={0}
          onChange={() => {}}
        />
      )
      const rangeInput = await RangeInputLocator.find()
      const input = await rangeInput.findInput()

      await input.change({ target: { value: '30' } })

      expect(input).to.have.value('0')
    })
  })
})
