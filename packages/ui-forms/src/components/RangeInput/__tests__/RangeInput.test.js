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
import { expect, mount, stub, within } from '@instructure/ui-test-utils'
import RangeInput from '../index'

describe('<RangeInput />', async () => {
  it('renders an input with type "range"', async () => {
    const subject = await mount(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={0}
      />
    )
    const label = within(subject.getDOMNode())
    const input = await label.find('input[type="range"]')

    expect(input).to.exist()
  })

  it('displays the default value', async () => {
    const subject = await mount(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={0}
        defaultValue={42}
      />
    )
    const label = within(subject.getDOMNode())
    const output = await label.find('output')

    expect(output.getTextContent()).to.equal('42')
  })

  it('sets input value to default value', async () => {
    const subject = await mount(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={0}
        defaultValue={25}
      />
    )
    const label = within(subject.getDOMNode())
    const input = await label.find('input[type="range"]')

    expect(input.getAttribute('value')).to.equal('25')
  })

  it('sets input value to controlled value', async () => {
    const subject = await mount(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={0}
        value={25}
        onChange={() => {}}
      />
    )
    const label = within(subject.getDOMNode())
    const input = await label.find('input[type="range"]')

    expect(input.getAttribute('value')).to.equal('25')
  })

  it('sets min value', async () => {
    const subject = await mount(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={25}
      />
    )
    const label = within(subject.getDOMNode())
    const input = await label.find('input[type="range"]')

    expect(input.getAttribute('min')).to.equal('25')
  })

  it('sets max value', async () => {
    const subject = await mount(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={75}
        min={0}
      />
    )
    const label = within(subject.getDOMNode())
    const input = await label.find('input[type="range"]')

    expect(input.getAttribute('max')).to.equal('75')
  })

  it('sets step value', async () => {
    const subject = await mount(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={0}
        step={5}
      />
    )
    const label = within(subject.getDOMNode())
    const input = await label.find('input[type="range"]')

    expect(input.getAttribute('step')).to.equal('5')
  })

  it('requires an `onChange` prop with a `value` prop', async () => {
    const consoleError = stub(console, 'error')
    await mount(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={0}
        value={50}
      />
    )

    expect(consoleError).to.have.been.calledWithMatch(`provided a 'value' prop without an 'onChange' handler`)
  })

  it('formats the value displayed', async () => {
    const subject = await mount(
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
    const label = within(subject.getDOMNode())
    const output = await label.find('output')

    expect(output.getTextContent()).to.equal('45%')
  })

  it('hides the value when displayValue is false', async () => {
    const subject = await mount(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={0}
        displayValue={false}
      />
    )
    const label = within(subject.getDOMNode())
    const output = await label.find('output', { expectEmpty: true })

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
        messages={[
          { text: 'Invalid name', type: 'error' }
        ]}
        componentRef={(el) => ref = el}
      />
    )

    expect(ref.invalid).to.be.true()
  })

  describe('for a11y', async () => {
    it('should meet standards', async () => {
      const subject = await mount(
        <RangeInput
          label="Opacity"
          name="opacity"
          max={100}
          min={0}
          defaultValue={50}
        />
      )
      const label = within(subject.getDOMNode())
      expect(await label.accessible()).to.be.true()
    })

    it('sets the input role to "slider"', async () => {
      const subject = await mount(
        <RangeInput
          label="Opacity"
          name="opacity"
          max={100}
          min={0}
          defaultValue={50}
        />
      )
      const label = within(subject.getDOMNode())
      const input = await label.find('input[type="range"]')

      expect(input.getAttribute('role')).to.equal('slider')
    })

    it('sets the aria-valuenow attribute', async () => {
      const subject = await mount(
        <RangeInput
          label="Opacity"
          name="opacity"
          max={100}
          min={0}
          defaultValue={40}
        />
      )
      const label = within(subject.getDOMNode())
      const input = await label.find('input[type="range"]')

      expect(input.getAttribute('aria-valuenow')).to.equal('40')
    })

    it('sets the aria-valuemin attribute', async () => {
      const subject = await mount(
        <RangeInput
          label="Opacity"
          name="opacity"
          max={100}
          min={20}
        />
      )
      const label = within(subject.getDOMNode())
      const input = await label.find('input[type="range"]')

      expect(input.getAttribute('aria-valuemin')).to.equal('20')
    })

    it('sets the aria-valuemax attribute', async () => {
      const subject = await mount(
        <RangeInput
          label="Opacity"
          name="opacity"
          max={80}
          min={0}
        />
      )
      const label = within(subject.getDOMNode())
      const input = await label.find('input[type="range"]')

      expect(input.getAttribute('aria-valuemax')).to.equal('80')
    })

    it('formats the aria-valuetext attribute', async () => {
      const subject = await mount(
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
      const label = within(subject.getDOMNode())
      const input = await label.find('input[type="range"]')

      expect(input.getAttribute('aria-valuetext')).to.equal('40%')
    })
  })

  describe('when the input value changes', async () => {
    it('should update the value displayed', async () => {
      const subject = await mount(
        <RangeInput
          label="Opacity"
          name="opacity"
          max={100}
          min={0}
          defaultValue={50}
        />
      )
      const label = within(subject.getDOMNode())
      const input = await label.find('input[type="range"]')
      const output = await label.find('output')

      await input.change({ target: { value: '30' } })

      expect(output.getTextContent()).to.equal('30')
      expect(input.getAttribute('aria-valuenow')).to.equal('30')
    })

    it('should call the onChange prop', async () => {
      const onChange = stub()
      const subject = await mount(
        <RangeInput
          label="Opacity"
          name="opacity"
          max={100}
          min={0}
          defaultValue={50}
          onChange={onChange}
        />
      )
      const label = within(subject.getDOMNode())
      const input = await label.find('input[type="range"]')

      await input.change({ target: { value: '30' } })

      expect(onChange).to.have.been.calledWith('30')
    })

    it('should not update the input value when the value prop is set', async () => {
      const subject = await mount(
        <RangeInput
          label="Opacity"
          name="opacity"
          max={100}
          min={0}
          value={0}
          onChange={() => {}}
        />
      )
      const label = within(subject.getDOMNode())
      const input = await label.find('input[type="range"]')

      await input.change({ target: { value: '30' } })

      expect(input.getDOMNode().value).to.equal('0')
    })
  })
})
