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

import { render, fireEvent, act } from '@testing-library/react'
import type { MockInstance } from 'vitest'
import { vi } from 'vitest'

import '@testing-library/jest-dom'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { RadioInput } from '../index'

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
    it('responds to onClick event', () => {
      vi.useFakeTimers()
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

      fireEvent.click(input!, { button: 0, detail: 1 })
      act(() => {
        vi.runAllTimers()
      })

      expect(onClick).toHaveBeenCalled()

      vi.useRealTimers()
    })

    it('does not respond to onClick event when disabled', () => {
      vi.useFakeTimers()
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
      act(() => {
        vi.runAllTimers()
      })

      expect(onClick).not.toHaveBeenCalled()
      expect(input).toBeDisabled()

      vi.useRealTimers()
    })

    it('does not respond to onClick event when readOnly', () => {
      vi.useFakeTimers()
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
      act(() => {
        vi.runAllTimers()
      })

      expect(onClick).not.toHaveBeenCalled()
      expect(input).toBeDisabled()

      vi.useRealTimers()
    })

    it('responds to onChange event', () => {
      vi.useFakeTimers()
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

      fireEvent.click(input!, { button: 0, detail: 1 })
      act(() => {
        vi.runAllTimers()
      })

      expect(onChange).toHaveBeenCalled()

      vi.useRealTimers()
    })

    it('does not respond to onChange event when disabled', () => {
      vi.useFakeTimers()
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
      act(() => {
        vi.runAllTimers()
      })

      expect(onChange).not.toHaveBeenCalled()

      vi.useRealTimers()
    })

    it('does not respond to onChange event when readOnly', () => {
      vi.useFakeTimers()
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
      act(() => {
        vi.runAllTimers()
      })

      expect(onChange).not.toHaveBeenCalled()

      vi.useRealTimers()
    })

    it('responds to onBlur event', () => {
      vi.useFakeTimers()
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
      act(() => {
        vi.runAllTimers()
      })

      expect(onBlur).toHaveBeenCalled()

      vi.useRealTimers()
    })

    it('responds to onFocus event', () => {
      vi.useFakeTimers()
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
      act(() => {
        vi.runAllTimers()
      })

      expect(onFocus).toHaveBeenCalled()

      vi.useRealTimers()
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

    it('focuses with the focus helper', () => {
      vi.useFakeTimers()
      let ref: RadioInput

      const { container } = render(
        <RadioInput
          label="fake label"
          value="someValue"
          name="someName"
          // @ts-expect-error this is managed by the testing framework
          ref={(el) => (ref = el)}
        />
      )

      const input = container.querySelector('input')

      ref!.focus()
      act(() => {
        vi.runAllTimers()
      })

      expect(document.activeElement).toBe(input)

      vi.useRealTimers()
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
