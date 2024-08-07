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
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { TextInput } from '../index'

describe('<TextInput/>', () => {
  let consoleErrorMock: any

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorMock.mockRestore()
  })

  it('should include a label', async () => {
    const { container } = render(<TextInput renderLabel="Name" />)
    const label = container.querySelector('label')
    expect(label).toHaveTextContent('Name')
  })

  it('should focus the input when focus is called', async () => {
    let ref: TextInput | undefined
    render(
      <TextInput
        renderLabel="Name"
        //@ts-expect-error TODO this is coming from ReactComponentWrapper
        inputRef={(el: TextInput) => {
          ref = el
        }}
      />
    )
    const input = screen.getByRole('textbox')

    ref?.focus()

    expect(input).toHaveFocus()
  })

  it('should provide an inputRef prop', async () => {
    const inputRef = vi.fn()
    render(<TextInput renderLabel="Name" inputRef={inputRef} />)
    const input = screen.getByRole('textbox')

    expect(inputRef).toHaveBeenCalledWith(input)
  })

  it('should provide a value getter', async () => {
    let ref: TextInput | undefined
    render(
      <TextInput
        renderLabel="Name"
        defaultValue="bar"
        //@ts-expect-error TODO this is coming from ReactComponentWrapper
        inputRef={(el: TextInput) => {
          ref = el
        }}
      />
    )
    expect(ref?.value).toBe('bar')
  })

  it('should provide messageId to FormField', async () => {
    render(
      <TextInput
        renderLabel="Name"
        messages={[
          {
            text: 'yup',
            type: 'error'
          }
        ]}
      />
    )
    const input = screen.getByRole('textbox')

    expect(input).toHaveAttribute('aria-describedby')
  })

  it('should have equal messagesId and aria-describedby values', async () => {
    const { container } = render(
      <TextInput
        renderLabel="Name"
        messages={[
          {
            text: 'yup',
            type: 'error'
          }
        ]}
      />
    )
    const id = screen.getByRole('textbox').getAttribute('aria-describedby')
    const messages = container.querySelector(
      'span[class$="-formFieldMessages"]'
    )

    expect(messages).toHaveAttribute('id', id)
  })

  it('should handle multiple aria-describedby ids', async () => {
    render(
      <TextInput
        renderLabel="Name"
        aria-describedby="assistive-id"
        messages={[
          {
            text: 'yup',
            type: 'error'
          }
        ]}
      />
    )
    const ids = screen.getByRole('textbox').getAttribute('aria-describedby')

    expect(ids).toMatch('assistive-id TextInput-messages')
  })

  describe('events', () => {
    it('responds to onChange event', async () => {
      const onChange = vi.fn()
      render(<TextInput renderLabel="Name" onChange={onChange} />)
      const input = screen.getByRole('textbox')
      fireEvent.change(input, { target: { value: 'foo' } })

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(1)
      })
    })

    it('responds to onBlur event', async () => {
      const onBlur = vi.fn()
      render(<TextInput renderLabel="Name" onBlur={onBlur} />)

      userEvent.tab()
      userEvent.tab()

      await waitFor(() => {
        expect(onBlur).toHaveBeenCalled()
      })
    })

    it('responds to onFocus event', async () => {
      const onFocus = vi.fn()
      render(<TextInput renderLabel="Name" onFocus={onFocus} />)
      const input = screen.getByRole('textbox')

      input.focus()

      await waitFor(() => {
        expect(onFocus).toHaveBeenCalled()
      })
    })
  })

  describe('interaction', () => {
    it('should set the disabled attribute when `interaction` is disabled', async () => {
      render(<TextInput renderLabel="Name" interaction="disabled" />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('disabled')
    })

    it('should set the disabled attribute when `disabled` is set', async () => {
      render(<TextInput renderLabel="Name" disabled />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('disabled')
    })

    it('should set the readonly attribute when `interaction` is readonly', async () => {
      render(<TextInput renderLabel="Name" interaction="readonly" />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('readonly')
    })

    it('should set the readonly attribute when `readOnly` is set', async () => {
      render(<TextInput renderLabel="Name" readOnly />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('readonly')
    })
  })

  describe('for a11y', () => {
    it('should meet standards', async () => {
      const { container } = render(<TextInput renderLabel="Name" />)
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })

    it('should set aria-invalid when errors prop is set', async () => {
      render(
        <TextInput
          renderLabel="Name"
          messages={[{ type: 'error', text: 'some error message' }]}
        />
      )
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('aria-invalid')
    })
  })
})
