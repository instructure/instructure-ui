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

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<RangeInput />', async () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('renders an input with type "range"', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<RangeInput label="Opacity" name="opacity" max={100} min={0} />)
    const rangeInput = await RangeInputLocator.find()
    const input = await rangeInput.findInput()

    expect(input).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('displays the default value', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <RangeInput
        label="Opacity"
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; name: string; max: number; ... Remove this comment to see the full error message
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

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('sets input value to default value', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <RangeInput
        label="Opacity"
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; name: string; max: number; ... Remove this comment to see the full error message
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

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('sets input value to controlled value', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <RangeInput
        label="Opacity"
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; name: string; max: number; ... Remove this comment to see the full error message
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

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('sets min value', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; name: string; max: number; ... Remove this comment to see the full error message
      <RangeInput label="Opacity" name="opacity" max={100} min={25} />
    )
    const rangeInput = await RangeInputLocator.find()
    const input = await rangeInput.findInput()

    expect(input).to.have.attribute('min', '25')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('sets max value', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<RangeInput label="Opacity" name="opacity" max={75} min={0} />)
    const rangeInput = await RangeInputLocator.find()
    const input = await rangeInput.findInput()

    expect(input).to.have.attribute('max', '75')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('sets step value', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; name: string; max: number; ... Remove this comment to see the full error message
      <RangeInput label="Opacity" name="opacity" max={100} min={0} step={5} />
    )
    const rangeInput = await RangeInputLocator.find()
    const input = await rangeInput.findInput()

    expect(input).to.have.attribute('step', '5')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('requires an `onChange` prop with a `value` prop', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    const consoleError = stub(console, 'error')
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; name: string; max: number; ... Remove this comment to see the full error message
      <RangeInput label="Opacity" name="opacity" max={100} min={0} value={50} />
    )

    expect(consoleError).to.have.been.calledWithMatch(
      `provided a 'value' prop without an 'onChange' handler`
    )
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('formats the value displayed', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <RangeInput
        label="Opacity"
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; name: string; max: number; ... Remove this comment to see the full error message
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

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('hides the value when displayValue is false', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <RangeInput
        label="Opacity"
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; name: string; max: number; ... Remove this comment to see the full error message
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

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('sets invalid when error messages are present', async () => {
    let ref
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <RangeInput
        label="Opacity"
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; name: string; max: number; ... Remove this comment to see the full error message
        name="opacity"
        max={100}
        min={0}
        messages={[{ text: 'Invalid name', type: 'error' }]}
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
        componentRef={(el) => (ref = el)}
      />
    )

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    expect(ref.invalid).to.be.true()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('for a11y', async () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet standards', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <RangeInput
          label="Opacity"
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; name: string; max: number; ... Remove this comment to see the full error message
          name="opacity"
          max={100}
          min={0}
          defaultValue={50}
        />
      )
      const rangeInput = await RangeInputLocator.find()
      expect(await rangeInput.accessible()).to.be.true()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('sets the input role to "slider"', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <RangeInput
          label="Opacity"
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; name: string; max: number; ... Remove this comment to see the full error message
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

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('sets the aria-valuenow attribute', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <RangeInput
          label="Opacity"
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; name: string; max: number; ... Remove this comment to see the full error message
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

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('sets the aria-valuemin attribute', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; name: string; max: number; ... Remove this comment to see the full error message
        <RangeInput label="Opacity" name="opacity" max={100} min={20} />
      )
      const rangeInput = await RangeInputLocator.find()
      const input = await rangeInput.findInput()

      expect(input).to.have.attribute('aria-valuemin', '20')
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('sets the aria-valuemax attribute', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; name: string; max: number; ... Remove this comment to see the full error message
        <RangeInput label="Opacity" name="opacity" max={80} min={0} />
      )
      const rangeInput = await RangeInputLocator.find()
      const input = await rangeInput.findInput()

      expect(input).to.have.attribute('aria-valuemax', '80')
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('formats the aria-valuetext attribute', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <RangeInput
          label="Opacity"
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; name: string; max: number; ... Remove this comment to see the full error message
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

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when the input value changes', async () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should update the value displayed', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <RangeInput
          label="Opacity"
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; name: string; max: number; ... Remove this comment to see the full error message
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

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should call the onChange prop', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onChange = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <RangeInput
          label="Opacity"
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; name: string; max: number; ... Remove this comment to see the full error message
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

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should not update the input value when the value prop is set', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <RangeInput
          label="Opacity"
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; name: string; max: number; ... Remove this comment to see the full error message
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
