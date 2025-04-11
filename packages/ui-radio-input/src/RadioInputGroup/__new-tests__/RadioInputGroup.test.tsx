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

import { render, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { MockInstance } from 'vitest'
import { vi } from 'vitest'

import '@testing-library/jest-dom'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { RadioInput } from '../../RadioInput'
import { RadioInputGroup } from '../index'

describe('<RadioInputGroup />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as MockInstance
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as MockInstance
  })

  afterEach(() => {
    consoleWarningMock.mockRestore()
    consoleErrorMock.mockRestore()
  })

  it('adds the name props to all RadioInput types', async () => {
    const { container } = render(
      <RadioInputGroup name="fruit" description="Select a fruit">
        <RadioInput label="Apple" value="apple" />
        <RadioInput label="Banana" value="banana" />
        <RadioInput label="Orange" value="orange" />
      </RadioInputGroup>
    )

    const inputs = await container.querySelectorAll('input[name="fruit"]')

    expect(inputs.length).toBe(3)
  })

  it('requires an `onChange` prop with a `value` prop', async () => {
    render(
      <RadioInputGroup name="fruit" description="Select a fruit" value="banana">
        <RadioInput label="Apple" value="apple" />
        <RadioInput label="Banana" value="banana" />
        <RadioInput label="Orange" value="orange" />
      </RadioInputGroup>
    )

    const expectedErrorMessage = `provided a 'value' prop without an 'onChange' handler`

    expect(consoleErrorMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.stringContaining(expectedErrorMessage),
      expect.any(String)
    )
  })

  it('calls the onChange prop', async () => {
    const onChange = vi.fn()
    const { container } = render(
      <RadioInputGroup
        name="fruit"
        description="Select a fruit"
        onChange={onChange}
      >
        <RadioInput label="Apple" value="apple" />
        <RadioInput label="Banana" value="banana" />
        <RadioInput label="Orange" value="orange" />
      </RadioInputGroup>
    )
    const input = container.querySelector('input')

    userEvent.click(input!)

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled()
    })
  })

  it('does not call the onChange prop when disabled', async () => {
    const onChange = vi.fn()
    const { container } = render(
      <RadioInputGroup
        disabled
        name="fruit"
        description="Select a fruit"
        onChange={onChange}
      >
        <RadioInput label="Apple" value="apple" />
        <RadioInput label="Banana" value="banana" />
        <RadioInput label="Orange" value="orange" />
      </RadioInputGroup>
    )
    const input = container.querySelector('input')

    fireEvent.click(input!)

    await waitFor(() => {
      expect(onChange).not.toHaveBeenCalled()
      expect(input).toBeDisabled()
    })
  })

  it('does not call the onChange prop when readOnly', async () => {
    const onChange = vi.fn()
    const { container } = render(
      <RadioInputGroup
        readOnly
        name="fruit"
        description="Select a fruit"
        onChange={onChange}
      >
        <RadioInput label="Apple" value="apple" />
        <RadioInput label="Banana" value="banana" />
        <RadioInput label="Orange" value="orange" />
      </RadioInputGroup>
    )
    const input = container.querySelector('input')

    fireEvent.click(input!)

    await waitFor(() => {
      expect(onChange).not.toHaveBeenCalled()
      expect(input).toBeDisabled()
    })
  })

  it('should not update the value when the value prop is set', async () => {
    const { container } = render(
      <RadioInputGroup
        name="fruit"
        description="Select a fruit"
        value="orange"
        onChange={() => {}}
      >
        <RadioInput label="Apple" value="apple" />
        <RadioInput label="Banana" value="banana" />
        <RadioInput label="Orange" value="orange" />
      </RadioInputGroup>
    )
    const banana = container.querySelector('input[value="banana"]')
    const orange = container.querySelector('input[value="orange"]')

    expect(orange).toHaveAttribute('checked')

    userEvent.click(banana!)

    await waitFor(() => {
      expect(orange).toHaveAttribute('checked')
    })
  })

  it('adds the correct tabindex to RadioInputs when none are checked', async () => {
    const { container } = render(
      <RadioInputGroup name="fruit" description="Select a fruit">
        <RadioInput label="Apple" value="apple" />
        <RadioInput label="Banana" value="banana" />
        <RadioInput label="Orange" value="orange" />
      </RadioInputGroup>
    )
    const inputs = container.querySelectorAll('input[name="fruit"]')

    expect(inputs[0]).toHaveAttribute('tabindex', '0')
    expect(inputs[1]).toHaveAttribute('tabindex', '-1')
    expect(inputs[2]).toHaveAttribute('tabindex', '-1')
  })

  it('adds the correct tabindex to RadioInputs when checked', async () => {
    const { container } = render(
      <RadioInputGroup
        name="fruit"
        description="Select a fruit"
        defaultValue="banana"
      >
        <RadioInput label="Apple" value="apple" />
        <RadioInput label="Banana" value="banana" />
        <RadioInput label="Orange" value="orange" />
      </RadioInputGroup>
    )
    const inputs = container.querySelectorAll('input[name="fruit"]')

    expect(inputs[0]).toHaveAttribute('tabindex', '-1')
    expect(inputs[1]).toHaveAttribute('tabindex', '0')
    expect(inputs[2]).toHaveAttribute('tabindex', '-1')
  })

  describe('for a11y', () => {
    it('should meet a11y standards', async () => {
      const { container } = render(
        <RadioInputGroup name="fruit" description="Select a fruit">
          <RadioInput label="Apple" value="apple" />
          <RadioInput label="Banana" value="banana" />
          <RadioInput label="Orange" value="orange" />
        </RadioInputGroup>
      )
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })
  })

  it('adds the correct ARIA attributes', () => {
    const { container } = render(
      <RadioInputGroup
        name="fruit"
        description="Select a fruit"
        disabled={true}
        data-id="group"
        messages={[{ type: 'newError', text: 'abc' }]}
      >
        <RadioInput label="Apple" value="apple" />
        <RadioInput label="Banana" value="banana" />
        <RadioInput label="Orange" value="orange" />
      </RadioInputGroup>
    )
    const group = container.querySelector(`[data-id="group"]`)
    expect(group).toBeInTheDocument()
    expect(group).toHaveAttribute('role', 'radiogroup')
    expect(group).toHaveAttribute('aria-disabled', 'true')
    expect(group).toHaveAttribute('aria-invalid', 'true')
    expect(group).toHaveAttribute('aria-errormessage', expect.anything())
  })
})
