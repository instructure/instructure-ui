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

import { render, screen, fireEvent, act } from '@testing-library/react'
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

  it('should let aria-describedby through', async () => {
    render(<TextInput renderLabel="Name" aria-describedby="abcd" />)
    const input = screen.getByRole('textbox')

    expect(input).toHaveAttribute('aria-describedby', 'abcd')
  })

  describe('events', () => {
    it('responds to onChange event', () => {
      vi.useFakeTimers()
      const onChange = vi.fn()
      render(<TextInput renderLabel="Name" onChange={onChange} />)
      const input = screen.getByRole('textbox')
      fireEvent.change(input, { target: { value: 'foo' } })
      act(() => {
        vi.runAllTimers()
      })

      expect(onChange).toHaveBeenCalledTimes(1)

      vi.useRealTimers()
    })

    it('responds to onBlur event', () => {
      vi.useFakeTimers()
      const onBlur = vi.fn()
      render(<TextInput renderLabel="Name" onBlur={onBlur} />)
      const input = screen.getByRole('textbox')

      input.focus()
      input.blur()
      act(() => {
        vi.runAllTimers()
      })

      expect(onBlur).toHaveBeenCalled()

      vi.useRealTimers()
    })

    it('responds to onFocus event', () => {
      vi.useFakeTimers()
      const onFocus = vi.fn()
      render(<TextInput renderLabel="Name" onFocus={onFocus} />)
      const input = screen.getByRole('textbox')

      input.focus()
      act(() => {
        vi.runAllTimers()
      })

      expect(onFocus).toHaveBeenCalled()

      vi.useRealTimers()
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
