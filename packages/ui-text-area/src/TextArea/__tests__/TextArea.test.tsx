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

import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { fireEvent } from '@testing-library/dom'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { TextArea } from '@instructure/ui-text-area/latest'
import type { TextAreaElement } from '../v2/index'

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
    await render(
      <TextArea label="Name" autoGrow={false} defaultValue="Tom Servo" />
    )
    const input = page.getByRole('textbox').element()

    expect(input).toHaveTextContent('Tom Servo')
  })

  it('should include a label', async () => {
    const { container } = await render(
      <TextArea label="Name" autoGrow={false} />
    )
    const textArea = container.querySelector(
      'span[class$="-formFieldLayout__label"]'
    )

    expect(textArea).toHaveTextContent('Name')
  })

  it('should set an initial height', async () => {
    await render(<TextArea label="Name" autoGrow={false} height="100px" />)
    const input = page.getByRole('textbox').element()

    expect(input).toHaveStyle('height: 100px')
  })

  it('should focus the textarea when focus is called', async () => {
    let ref: TextAreaElement
    await render(
      <TextArea
        label="Name"
        autoGrow={false}
        // @ts-expect-error this is managed by the testing framework
        textareaRef={(el: TextAreaElement) => (ref = el)}
      />
    )
    const input = page.getByRole('textbox').element()

    ref!.focus()

    expect(input).toHaveFocus()
  })

  it('provides a focused getter', async () => {
    let ref: TextAreaElement
    await render(
      <TextArea
        label="Name"
        autoGrow={false}
        ref={(el: TextAreaElement) => {
          ref = el
        }}
      />
    )

    ref!.focus()

    expect(ref!.focused).toBe(true)
  })

  it('should provide an textareaRef prop', async () => {
    const textareaRef = vi.fn()
    await render(
      <TextArea label="Name" autoGrow={false} textareaRef={textareaRef} />
    )
    const input = page.getByRole('textbox').element()

    expect(textareaRef).toHaveBeenCalledWith(input)
  })

  it('should provide a value getter', async () => {
    let ref: TextAreaElement
    await render(
      <TextArea
        label="Name"
        autoGrow={false}
        defaultValue="bar"
        // @ts-expect-error this is managed by the testing framework
        textareaRef={(el: TextAreaElement) => (ref = el)}
      />
    )

    expect(ref!.value).toBe('bar')
  })

  describe('events', () => {
    it('responds to onChange event', async () => {
      const onChange = vi.fn()
      await render(
        <TextArea label="Name" autoGrow={false} onChange={onChange} />
      )
      const input = page.getByRole('textbox').element()

      fireEvent.change(input, { target: { value: 'foo' } })

      await vi.waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(1)
      })
    })

    it('does not respond to onChange event when disabled', async () => {
      const onChange = vi.fn()
      await render(
        <TextArea disabled label="Name" autoGrow={false} onChange={onChange} />
      )
      const input = page.getByRole('textbox').element()

      fireEvent.change(input, { target: { value: 'foo' } })

      expect(onChange).not.toHaveBeenCalled()
    })

    it('does not respond to onChange event when readOnly', async () => {
      const onChange = vi.fn()
      await render(
        <TextArea readOnly label="Name" autoGrow={false} onChange={onChange} />
      )
      const input = page.getByRole('textbox').element()

      fireEvent.change(input, { target: { value: 'foo' } })

      expect(onChange).not.toHaveBeenCalled()
    })

    it('responds to onBlur event', async () => {
      const onBlur = vi.fn()
      await render(<TextArea label="Name" autoGrow={false} onBlur={onBlur} />)

      await userEvent.tab()
      await userEvent.tab()

      await vi.waitFor(() => {
        expect(onBlur).toHaveBeenCalled()
      })
    })

    it('responds to onFocus event', async () => {
      const onFocus = vi.fn()
      await render(<TextArea label="Name" autoGrow={false} onFocus={onFocus} />)
      const input = page.getByRole('textbox').element()

      input.focus()

      await vi.waitFor(() => {
        expect(onFocus).toHaveBeenCalled()
      })
    })
  })

  describe('for a11y', () => {
    it('should meet standards', async () => {
      const { container } = await render(
        <TextArea label="Name" autoGrow={false} />
      )
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })

    it('should set aria-invalid when errors prop is set', async () => {
      await render(
        <TextArea
          label="Name"
          autoGrow={false}
          messages={[{ type: 'error', text: 'some error message' }]}
        />
      )
      const input = page.getByRole('textbox').element()

      expect(input).toHaveAttribute('aria-invalid')
    })

    it('associates messages with the textarea as its description, not its accessible name', async () => {
      await render(
        <TextArea
          label="Name"
          autoGrow={false}
          messages={[{ type: 'error', text: 'some error message' }]}
        />
      )
      const input = page.getByRole('textbox').element()

      const describedById = input.getAttribute('aria-describedby')
      expect(describedById).toBeTruthy()
      expect(document.getElementById(describedById!)).toHaveTextContent(
        'some error message'
      )

      const labelledById = input.getAttribute('aria-labelledby')
      expect(labelledById).toBeTruthy()
      const labelEl = document.getElementById(labelledById!)
      expect(labelEl).toHaveTextContent('Name')
      expect(labelEl).not.toHaveTextContent('some error message')
    })

    it('does not override the accessible name with aria-labelledby when there are no messages', async () => {
      await render(<TextArea label="Name" autoGrow={false} />)
      const input = page.getByRole('textbox').element()

      expect(input).not.toHaveAttribute('aria-labelledby')
    })
  })
})
