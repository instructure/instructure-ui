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
import moment from 'moment-timezone'

import { ApplyLocale } from '@instructure/ui-i18n'

import { TimeSelect } from '@instructure/ui-time-select/latest'

describe('<TimeSelect />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution
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

  it('should fire onFocus when input gains focus', async () => {
    const onFocus = vi.fn()
    await render(<TimeSelect renderLabel="Choose a time" onFocus={onFocus} />)

    const input = page.getByRole('combobox').element()

    input.focus()

    await vi.waitFor(() => {
      expect(onFocus).toHaveBeenCalled()
    })
  })

  it('should render a default value', async () => {
    const defaultValue = moment.tz(
      '1986-05-17T18:00:00.000Z',
      moment.ISO_8601,
      'en',
      'US/Eastern'
    )

    const onChange = vi.fn()

    await render(
      <TimeSelect
        renderLabel="Choose a time"
        onChange={onChange}
        timezone="US/Eastern"
        defaultValue={defaultValue.toISOString()}
      />
    )
    const input = page.getByRole('combobox').element()

    expect(input).toHaveValue('2:00 PM')
  })

  it('should display value when both defaultValue and value are set', async () => {
    const value = moment.tz(
      '1986-05-17T18:00:00.000Z',
      moment.ISO_8601,
      'en',
      'US/Eastern'
    )
    const defaultValue = moment.tz(
      '1986-05-25T19:00:00.000Z',
      moment.ISO_8601,
      'en',
      'US/Eastern'
    )
    await render(
      <TimeSelect
        renderLabel="Choose a time"
        timezone="US/Eastern"
        value={value.toISOString()}
        defaultValue={defaultValue.toISOString()}
      />
    )
    const input = page.getByRole('combobox').element()

    expect(input).toHaveValue(value.format('LT'))
  })

  it('should default to the first option if defaultToFirstOption is true', async () => {
    await render(
      <TimeSelect renderLabel="Choose a time" defaultToFirstOption />
    )
    const input = page.getByRole('combobox').element()

    expect(input).toHaveValue('12:00 AM')
  })

  it('should use the specified timezone', async () => {
    const value = moment.tz(
      '2024-01-11T13:00:00.000Z',
      moment.ISO_8601,
      'fr',
      'UTC'
    )

    await render(
      <TimeSelect
        renderLabel="Choose a time"
        locale="fr"
        timezone="Africa/Nairobi" // UTC + 3
        value={value.toISOString()}
      />
    )
    const input = page.getByRole('combobox').element()

    expect(input).toHaveValue('16:00')
  })

  it('should use the specified locale', async () => {
    const value = moment.tz(
      '2024-01-11T13:00:00.000Z',
      moment.ISO_8601,
      'fr', // 24-hour clock
      'UTC'
    )
    await render(
      <TimeSelect
        renderLabel="Choose a time"
        locale="en" // 12-hour clock
        timezone="UTC"
        value={value.toISOString()}
      />
    )
    const input = page.getByRole('combobox').element()

    expect(input).toHaveValue('1:00 PM')
  })

  it('should handle winter and summer time based on timezone', async () => {
    const valueSummer = moment.tz(
      '2024-07-11T13:00:00.000Z',
      moment.ISO_8601,
      'en',
      'UTC' // no time offset
    )

    const valueWinter = moment.tz(
      '2024-01-11T13:00:00.000Z',
      moment.ISO_8601,
      'en',
      'UTC' // no time offset
    )

    const { rerender } = await render(
      <TimeSelect
        renderLabel="Choose a time"
        locale="en"
        timezone="Europe/London" // summer time offset
        value={valueSummer.toISOString()}
      />
    )
    const input = page.getByRole('combobox').element()

    expect(input).toHaveValue('2:00 PM')

    await rerender(
      <TimeSelect
        renderLabel="Choose a time"
        locale="en"
        timezone="Europe/London" // summer time offset
        value={valueWinter.toISOString()}
      />
    )
    const inputUpdated = page.getByRole('combobox').element()

    expect(inputUpdated).toHaveValue('1:00 PM')
  })

  it('should read locale and timezone from context', async () => {
    const value = moment.tz(
      '2017-05-01T17:30Z',
      moment.ISO_8601,
      'en', // 12-hour clock format
      'UTC' // no time offset
    )
    await render(
      <ApplyLocale
        locale="fr" // 24-hour clock format
        timezone="Africa/Nairobi" // UTC + 3
      >
        <TimeSelect
          renderLabel="Choose a time"
          step={15}
          value={value.toISOString()}
        />
      </ApplyLocale>
    )
    const input = page.getByRole('combobox').element()

    expect(input).toHaveValue('20:30')
  })

  it('adding event listeners does not break functionality', async () => {
    const onChange = vi.fn()
    const onKeyDown = vi.fn()
    const handleInputChange = vi.fn()
    await render(
      <TimeSelect
        renderLabel="Choose a time"
        allowNonStepInput={true}
        locale="en_AU"
        timezone="US/Eastern"
        onChange={onChange}
        onInputChange={handleInputChange}
        onKeyDown={onKeyDown}
      />
    )
    const input = page.getByRole('combobox').element()

    await userEvent.type(input, '7:45 PM')
    input.blur() // sends onChange event

    expect(onChange).toHaveBeenCalledWith(expect.anything(), {
      inputText: '7:45 PM',
      value: expect.anything()
    })
    expect(onKeyDown).toHaveBeenCalled()
    expect(handleInputChange).toHaveBeenCalled()
    expect(input).toHaveValue('7:45 PM')
  })

  it('allowClearingSelection allows to clear the value', async () => {
    const defaultValue = moment.tz(
      '1986-05-17T18:00:00.000Z', // 2:00 PM in US/Eastern
      moment.ISO_8601,
      'en',
      'US/Eastern'
    )
    const onChange = vi.fn()
    await render(
      <TimeSelect
        allowClearingSelection
        renderLabel="Choose a time"
        allowNonStepInput={true}
        locale="en_AU"
        timezone="US/Eastern"
        defaultValue={defaultValue.toISOString()}
        onChange={onChange}
      />
    )
    const input = page.getByRole('combobox').element()

    await userEvent.type(
      input,
      '{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}'
    )
    input.blur() // sends onChange event

    expect(onChange).toHaveBeenCalledWith(expect.anything(), {
      inputText: '',
      value: ''
    })
    expect(input).toHaveValue('')
  })

  it('Can change from defaultValue', async () => {
    const defaultValue = moment.tz(
      '1986-05-17T18:00:00.000Z', // 2:00 PM in US/Eastern
      moment.ISO_8601,
      'en',
      'US/Eastern'
    )
    const onChange = vi.fn()
    const onKeyDown = vi.fn()
    const handleInputChange = vi.fn()
    await render(
      <TimeSelect
        renderLabel="Choose a time"
        allowNonStepInput={true}
        locale="en_AU"
        timezone="US/Eastern"
        defaultValue={defaultValue.toISOString()}
        onChange={onChange}
        onInputChange={handleInputChange}
        onKeyDown={onKeyDown}
      />
    )
    const input = page.getByRole('combobox').element()

    await userEvent.type(
      input,
      '{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}7:45 PM'
    )
    input.blur() // sends onChange event
    expect(onChange).toHaveBeenCalledWith(expect.anything(), {
      inputText: '7:45 PM',
      value: '1986-05-17T23:45:00.000Z'
    })
    expect(onKeyDown).toHaveBeenCalled()
    expect(handleInputChange).toHaveBeenCalled()
    expect(input).toHaveValue('7:45 PM')
  })

  it('Reverts to a set value if the current one is invalid', async () => {
    const defaultValue = moment.tz(
      '1986-05-17T18:00:00.000Z', // 2:00 PM in US/Eastern
      moment.ISO_8601,
      'en',
      'US/Eastern'
    )
    const onChange = vi.fn()
    const onKeyDown = vi.fn()
    const handleInputChange = vi.fn()
    await render(
      <TimeSelect
        renderLabel="Choose a time"
        allowNonStepInput={true}
        locale="en_AU"
        timezone="US/Eastern"
        defaultValue={defaultValue.toISOString()}
        onChange={onChange}
        onInputChange={handleInputChange}
        onKeyDown={onKeyDown}
      />
    )
    const input = page.getByRole('combobox').element()

    await userEvent.type(
      input,
      '{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}7:45 PM'
    )
    input.blur() // sends onChange event
    await userEvent.type(input, 'asdf')
    input.blur()
    expect(onChange).toHaveBeenCalledWith(expect.anything(), {
      inputText: '7:45 PM',
      value: '1986-05-17T23:45:00.000Z'
    })
    expect(onKeyDown).toHaveBeenCalled()
    expect(handleInputChange).toHaveBeenCalled()
    await vi.waitFor(() => {
      expect(input).toHaveValue('7:45 PM')
    })
  })

  describe('input', () => {
    it('should render with a custom id if given', async () => {
      await render(<TimeSelect renderLabel="Choose a time" id="timeSelect" />)

      const input = page.getByRole('combobox').element()

      expect(input).toHaveAttribute('id', 'timeSelect')
    })

    it('should render readonly when interaction="readonly"', async () => {
      await render(
        <TimeSelect renderLabel="Choose a time" interaction="readonly" />
      )
      const input = page.getByRole('combobox').element()

      expect(input).toHaveAttribute('readonly')
      expect(input).not.toHaveAttribute('disabled')
    })

    it('should render disabled when interaction="disabled"', async () => {
      const { container } = await render(
        <TimeSelect renderLabel="Choose a time" interaction="disabled" />
      )
      // a disabled input is not exposed as a `combobox` in the a11y tree
      const input = container.querySelector('input')

      expect(input).toHaveAttribute('disabled')
      expect(input).not.toHaveAttribute('readonly')
    })

    it('should render required when isRequired is true', async () => {
      await render(<TimeSelect renderLabel="Choose a time" isRequired />)
      const input = page.getByRole('combobox').element()

      expect(input).toHaveAttribute('required')
    })

    it('should allow custom props to pass through', async () => {
      await render(
        <TimeSelect renderLabel="Choose a time" data-custom-attr="true" />
      )
      const input = page.getByRole('combobox').element()

      expect(input).toHaveAttribute('data-custom-attr', 'true')
    })

    it('should provide a ref to the input element', async () => {
      const inputRef = vi.fn()

      await render(
        <TimeSelect renderLabel="Choose a time" inputRef={inputRef} />
      )
      const input = page.getByRole('combobox').element()

      expect(inputRef).toHaveBeenCalledWith(input)
    })
  })

  describe('list', () => {
    it('should provide a ref to the list element', async () => {
      const listRef = vi.fn()
      await render(<TimeSelect renderLabel="Choose a time" listRef={listRef} />)

      const input = page.getByRole('combobox').element()

      await userEvent.click(input)

      await vi.waitFor(() => {
        const listbox = page.getByRole('listbox').element()

        expect(listRef).toHaveBeenCalledWith(listbox)
      })
    })
  })
})
