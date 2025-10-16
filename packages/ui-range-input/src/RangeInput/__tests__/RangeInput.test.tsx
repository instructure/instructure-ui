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

import { render, screen } from '@testing-library/react'
import { vi, expect } from 'vitest'
import { runAxeCheck } from '@instructure/ui-axe-check'

import '@testing-library/jest-dom'
import { RangeInput } from '../index'

describe('<RangeInput />', () => {
  it('renders an input with type "range"', async () => {
    const { container } = render(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={0}
        displayValue={false}
      />
    )

    const label = container.querySelector('[class$="-formFieldLayout__label"]')
    const input = container.querySelector('[class$="-rangeInput__input"]')

    expect(label).toBeInTheDocument()
    expect(label).toHaveTextContent('Opacity')

    expect(input).toBeInTheDocument()
    expect(input!.tagName).toBe('INPUT')
    expect(input).toHaveAttribute('name', 'opacity')
    expect(input).toHaveAttribute('type', 'range')
  })

  it('displays the default value', async () => {
    const { container } = render(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={0}
        defaultValue={42}
      />
    )
    const output = container.querySelector('[class$="-rangeInput__value"]')

    expect(output).toHaveTextContent('42')
  })

  it('sets input value to default value', async () => {
    const { container } = render(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={0}
        defaultValue={25}
      />
    )
    const input = container.querySelector('input')

    expect(input).toHaveValue('25')
  })

  it('sets input value to controlled value', async () => {
    const { container } = render(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={0}
        value={25}
        onChange={() => {}}
      />
    )
    const input = container.querySelector('input')

    expect(input).toHaveValue('25')
  })

  it('should provide an inputRef prop', async () => {
    const inputRef = vi.fn()
    const { container } = render(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={0}
        defaultValue={42}
        inputRef={inputRef}
      />
    )
    const input = container.querySelector('input')

    expect(inputRef).toHaveBeenCalledWith(input)
  })

  it('sets min value', async () => {
    render(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={25}
        displayValue={false}
      />
    )
    const input = screen.getByLabelText('Opacity')

    expect(input).toHaveAttribute('min', '25')
  })

  it('sets max value', async () => {
    render(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={75}
        min={0}
        displayValue={false}
      />
    )

    const input = screen.getByLabelText('Opacity')

    expect(input).toHaveAttribute('max', '75')
  })

  it('sets step value', async () => {
    render(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={0}
        step={5}
        displayValue={false}
      />
    )
    const input = screen.getByLabelText('Opacity')

    expect(input).toHaveAttribute('step', '5')
  })

  it('formats the value displayed', async () => {
    const { container } = render(
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
    const output = container.querySelector('[class$="-rangeInput__value"]')

    expect(output).toHaveTextContent('45%')
  })

  it('hides the value when displayValue is false', async () => {
    const { container } = render(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={0}
        displayValue={false}
      />
    )
    const output = container.querySelector('[class$="-rangeInput__value"]')

    expect(output).not.toBeInTheDocument()
  })

  describe('for a11y', () => {
    it('should meet standards', async () => {
      const { container } = render(
        <RangeInput
          label="Opacity"
          name="opacity"
          max={100}
          min={0}
          defaultValue={50}
        />
      )
      const axeCheck = await runAxeCheck(container)
      expect(axeCheck).toBe(true)
    })

    it('formats the aria-valuetext attribute', async () => {
      const { container } = render(
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
      const input = container.querySelector('input')
      const output = container.querySelector('[class$="-rangeInput__value"]')

      expect(input).toHaveAttribute('aria-valuetext', '40%')
      expect(output).toHaveTextContent('40%')
    })
  })
})
