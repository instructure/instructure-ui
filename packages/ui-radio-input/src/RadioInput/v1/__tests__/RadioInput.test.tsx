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
import { RadioInput, type RadioInputHandle } from '../index'

describe('<RadioInput />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution
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

  it('renders an input with type "radio"', async () => {
    const { container } = render(
      <RadioInput label="fake label" value="someValue" name="someName" />
    )

    const input = container.querySelector('input')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'radio')
  })

  it('should provide an inputRef prop', async () => {
    const inputRef = vi.fn()
    const { container } = render(
      <RadioInput
        label="fake label"
        value="someValue"
        name="someName"
        inputRef={inputRef}
      />
    )
    const input = container.querySelector('input')

    expect(inputRef).toHaveBeenCalledWith(input)
  })

  describe('events', () => {
    it('responds to onClick event', async () => {
      const onClick = vi.fn()

      const { container } = render(
        <RadioInput
          label="fake label"
          value="someValue"
          name="someName"
          onClick={onClick}
        />
      )

      const input = container.querySelector('input')

      userEvent.click(input!)

      await waitFor(() => {
        expect(onClick).toHaveBeenCalled()
      })
    })

    it('does not respond to onClick event when disabled', async () => {
      const onClick = vi.fn()

      const { container } = render(
        <RadioInput
          disabled
          label="fake label"
          value="someValue"
          name="someName"
          onClick={onClick}
        />
      )

      const input = container.querySelector('input')

      fireEvent.click(input!)

      await waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
        expect(input).toBeDisabled()
      })
    })

    it('does not respond to onClick event when readOnly', async () => {
      const onClick = vi.fn()

      const { container } = render(
        <RadioInput
          readOnly
          label="fake label"
          value="someValue"
          name="someName"
          onClick={onClick}
        />
      )

      const input = container.querySelector('input')

      fireEvent.click(input!)

      await waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
        expect(input).not.toBeDisabled()
        expect(input).toHaveAttribute('readonly')
      })
    })

    it('responds to onChange event', async () => {
      const onChange = vi.fn()

      const { container } = render(
        <RadioInput
          label="fake label"
          value="someValue"
          name="someName"
          onChange={onChange}
        />
      )

      const input = container.querySelector('input')

      userEvent.click(input!)

      await waitFor(() => {
        expect(onChange).toHaveBeenCalled()
      })
    })

    it('does not respond to onChange event when disabled', async () => {
      const onChange = vi.fn()

      const { container } = render(
        <RadioInput
          disabled
          label="fake label"
          value="someValue"
          name="someName"
          onChange={onChange}
        />
      )

      const input = container.querySelector('input')

      fireEvent.click(input!)

      await waitFor(() => {
        expect(onChange).not.toHaveBeenCalled()
      })
    })

    it('does not respond to onChange event when readOnly', async () => {
      const onChange = vi.fn()

      const { container } = render(
        <RadioInput
          readOnly
          label="fake label"
          value="someValue"
          name="someName"
          onChange={onChange}
        />
      )

      const input = container.querySelector('input')

      fireEvent.click(input!)

      await waitFor(() => {
        expect(onChange).not.toHaveBeenCalled()
      })
    })

    it('responds to onBlur event', async () => {
      const onBlur = vi.fn()

      const { container } = render(
        <RadioInput
          label="fake label"
          value="someValue"
          name="someName"
          onBlur={onBlur}
        />
      )

      const input = container.querySelector('input')

      fireEvent.focusOut(input!)

      await waitFor(() => {
        expect(onBlur).toHaveBeenCalled()
      })
    })

    it('responds to onFocus event', async () => {
      const onFocus = vi.fn()

      const { container } = render(
        <RadioInput
          label="fake label"
          value="someValue"
          name="someName"
          onFocus={onFocus}
        />
      )
      const input = container.querySelector('input')

      fireEvent.focus(input!)

      await waitFor(() => {
        expect(onFocus).toHaveBeenCalled()
      })
    })

    it('sets input to checked when selected', async () => {
      const { container } = render(
        <RadioInput
          checked
          label="fake label"
          value="someValue"
          name="someName"
        />
      )
      const input = container.querySelector('input')

      expect(input).toHaveAttribute('checked')
    })

    it('focuses with the focus helper', async () => {
      let ref: RadioInputHandle

      const { container } = render(
        <RadioInput
          label="fake label"
          value="someValue"
          name="someName"
          ref={(el) => (ref = el!)}
        />
      )

      const input = container.querySelector('input')

      ref!.focus()

      await waitFor(() => {
        expect(document.activeElement).toBe(input)
      })
    })
  })

  describe('for a11y', () => {
    it('simple variant should meet a11y standards', async () => {
      const { container } = render(
        <RadioInput
          variant="simple"
          label="fake label"
          value="someValue"
          name="someName"
        />
      )
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })
  })
})
