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

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { runAxeCheck } from '@instructure/ui-axe-check'
import '@testing-library/jest-dom'

import { TextArea } from '../index'

describe('TextArea', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as any
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as any
  })

  afterEach(() => {
    consoleWarningMock.mockRestore()
    consoleErrorMock.mockRestore()
  })

  it('should accept a default value', async () => {
    render(<TextArea label="Name" autoGrow={false} defaultValue="Tom Servo" />)
    const input = screen.getByRole('textbox')

    expect(input).toHaveTextContent('Tom Servo')
  })

  it('should include a label', async () => {
    const { container } = render(<TextArea label="Name" autoGrow={false} />)
    const textArea = container.querySelector(
      'span[class$="-formFieldLayout__label"]'
    )

    expect(textArea).toHaveTextContent('Name')
  })

  it('should set an initial height', async () => {
    render(<TextArea label="Name" autoGrow={false} height="100px" />)
    const input = screen.getByRole('textbox')

    expect(input).toHaveStyle('height: 100px')
  })

  it('should focus the textarea when focus is called', async () => {
    let ref: TextArea
    render(
      <TextArea
        label="Name"
        autoGrow={false}
        // @ts-expect-error this is managed by the testing framework
        textareaRef={(el: TextArea) => (ref = el)}
      />
    )
    const input = screen.getByRole('textbox')

    ref!.focus()

    expect(input).toHaveFocus()
  })

  it('provides a focused getter', async () => {
    let ref: TextArea
    render(
      <TextArea
        label="Name"
        autoGrow={false}
        ref={(el: TextArea) => (ref = el)}
      />
    )

    ref!.focus()

    expect(ref!.focused).toBe(true)
  })

  it('should provide an textareaRef prop', async () => {
    const textareaRef = vi.fn()
    render(<TextArea label="Name" autoGrow={false} textareaRef={textareaRef} />)
    const input = screen.getByRole('textbox')

    expect(textareaRef).toHaveBeenCalledWith(input)
  })

  it('should provide a value getter', async () => {
    let ref: TextArea
    render(
      <TextArea
        label="Name"
        autoGrow={false}
        defaultValue="bar"
        // @ts-expect-error this is managed by the testing framework
        textareaRef={(el: TextArea) => (ref = el)}
      />
    )

    expect(ref!.value).toBe('bar')
  })

  describe('events', () => {
    it('responds to onChange event', async () => {
      const onChange = vi.fn()
      render(<TextArea label="Name" autoGrow={false} onChange={onChange} />)
      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: 'foo' } })

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(1)
      })
    })

    it('does not respond to onChange event when disabled', async () => {
      const onChange = vi.fn()
      render(
        <TextArea disabled label="Name" autoGrow={false} onChange={onChange} />
      )
      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: 'foo' } })

      expect(onChange).not.toHaveBeenCalled()
    })

    it('does not respond to onChange event when readOnly', async () => {
      const onChange = vi.fn()
      render(
        <TextArea readOnly label="Name" autoGrow={false} onChange={onChange} />
      )
      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: 'foo' } })

      expect(onChange).not.toHaveBeenCalled()
    })

    it('responds to onBlur event', async () => {
      const onBlur = vi.fn()
      render(<TextArea label="Name" autoGrow={false} onBlur={onBlur} />)

      userEvent.tab()
      userEvent.tab()

      await waitFor(() => {
        expect(onBlur).toHaveBeenCalled()
      })
    })

    it('responds to onFocus event', async () => {
      const onFocus = vi.fn()
      render(<TextArea label="Name" autoGrow={false} onFocus={onFocus} />)
      const input = screen.getByRole('textbox')

      input.focus()

      await waitFor(() => {
        expect(onFocus).toHaveBeenCalled()
      })
    })
  })

  describe('for a11y', () => {
    it('should meet standards', async () => {
      const { container } = render(<TextArea label="Name" autoGrow={false} />)
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })

    it('should set aria-invalid when errors prop is set', async () => {
      render(
        <TextArea
          label="Name"
          autoGrow={false}
          messages={[{ type: 'error', text: 'some error message' }]}
        />
      )
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('aria-invalid')
    })
  })
})
