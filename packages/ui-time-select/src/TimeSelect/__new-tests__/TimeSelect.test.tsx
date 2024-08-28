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
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import moment from 'moment-timezone'
import '@testing-library/jest-dom'

// eslint-disable-next-line no-restricted-imports
import { generateA11yTests } from '@instructure/ui-scripts/lib/test/generateA11yTests'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { ApplyLocale } from '@instructure/ui-i18n'

import { TimeSelect } from '../index'
import TimeSelectExamples from '../__examples__/TimeSelect.examples'

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
    render(<TimeSelect renderLabel="Choose a time" onFocus={onFocus} />)

    const input = screen.getByRole('combobox')

    input.focus()

    await waitFor(() => {
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

    render(
      <TimeSelect
        renderLabel="Choose a time"
        onChange={onChange}
        timezone="US/Eastern"
        defaultValue={defaultValue.toISOString()}
      />
    )
    const input = screen.getByRole('combobox')

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
    render(
      <TimeSelect
        renderLabel="Choose a time"
        timezone="US/Eastern"
        value={value.toISOString()}
        defaultValue={defaultValue.toISOString()}
      />
    )
    const input = screen.getByRole('combobox')

    expect(input).toHaveValue(value.format('LT'))
  })

  it('should default to the first option if defaultToFirstOption is true', async () => {
    render(<TimeSelect renderLabel="Choose a time" defaultToFirstOption />)
    const input = screen.getByRole('combobox')

    expect(input).toHaveValue('12:00 AM')
  })

  it('should use the specified timezone', async () => {
    const value = moment.tz(
      '2024-01-11T13:00:00.000Z',
      moment.ISO_8601,
      'fr',
      'UTC'
    )

    render(
      <TimeSelect
        renderLabel="Choose a time"
        locale="fr"
        timezone="Africa/Nairobi" // UTC + 3
        value={value.toISOString()}
      />
    )
    const input = screen.getByRole('combobox')

    expect(input).toHaveValue('16:00')
  })

  it('should use the specified locale', async () => {
    const value = moment.tz(
      '2024-01-11T13:00:00.000Z',
      moment.ISO_8601,
      'fr', // 24-hour clock
      'UTC'
    )
    render(
      <TimeSelect
        renderLabel="Choose a time"
        locale="en" // 12-hour clock
        timezone="UTC"
        value={value.toISOString()}
      />
    )
    const input = screen.getByRole('combobox')

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

    const { rerender } = render(
      <TimeSelect
        renderLabel="Choose a time"
        locale="en"
        timezone="Europe/London" // summer time offset
        value={valueSummer.toISOString()}
      />
    )
    const input = screen.getByRole('combobox')

    expect(input).toHaveValue('2:00 PM')

    rerender(
      <TimeSelect
        renderLabel="Choose a time"
        locale="en"
        timezone="Europe/London" // summer time offset
        value={valueWinter.toISOString()}
      />
    )
    const inputUpdated = screen.getByRole('combobox')

    expect(inputUpdated).toHaveValue('1:00 PM')
  })

  it('should read locale and timezone from context', async () => {
    const value = moment.tz(
      '2017-05-01T17:30Z',
      moment.ISO_8601,
      'en', // 12-hour clock format
      'UTC' // no time offset
    )
    render(
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
    const input = screen.getByRole('combobox')

    expect(input).toHaveValue('20:30')
  })

  it('adding event listeners does not break functionality', async () => {
    const onChange = vi.fn()
    const onKeyDown = vi.fn()
    const handleInputChange = vi.fn()
    render(
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
    const input = screen.getByRole('combobox')

    await userEvent.type(input, '7:45 PM')
    fireEvent.blur(input) // sends onChange event

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled()
      expect(onKeyDown).toHaveBeenCalled()
      expect(handleInputChange).toHaveBeenCalled()
      expect(input).toHaveValue('7:45 PM')
    })
  })

  describe('input', () => {
    it('should render with a custom id if given', async () => {
      render(<TimeSelect renderLabel="Choose a time" id="timeSelect" />)

      const input = screen.getByRole('combobox')

      expect(input).toHaveAttribute('id', 'timeSelect')
    })

    it('should render readonly when interaction="readonly"', async () => {
      render(<TimeSelect renderLabel="Choose a time" interaction="readonly" />)
      const input = screen.getByRole('combobox')

      expect(input).toHaveAttribute('readonly')
      expect(input).not.toHaveAttribute('disabled')
    })

    it('should render disabled when interaction="disabled"', async () => {
      render(<TimeSelect renderLabel="Choose a time" interaction="disabled" />)
      const input = screen.getByRole('combobox')

      expect(input).toHaveAttribute('disabled')
      expect(input).not.toHaveAttribute('readonly')
    })

    it('should render required when isRequired is true', async () => {
      render(<TimeSelect renderLabel="Choose a time" isRequired />)
      const input = screen.getByRole('combobox')

      expect(input).toHaveAttribute('required')
    })

    it('should allow custom props to pass through', async () => {
      render(<TimeSelect renderLabel="Choose a time" data-custom-attr="true" />)
      const input = screen.getByRole('combobox')

      expect(input).toHaveAttribute('data-custom-attr', 'true')
    })

    it('should provide a ref to the input element', async () => {
      const inputRef = vi.fn()

      render(<TimeSelect renderLabel="Choose a time" inputRef={inputRef} />)
      const input = screen.getByRole('combobox')

      expect(inputRef).toHaveBeenCalledWith(input)
    })
  })

  describe('list', () => {
    it('should provide a ref to the list element', async () => {
      const listRef = vi.fn()
      render(<TimeSelect renderLabel="Choose a time" listRef={listRef} />)

      const input = screen.getByRole('combobox')

      await userEvent.click(input)

      await waitFor(() => {
        const listbox = screen.getByRole('listbox')

        expect(listRef).toHaveBeenCalledWith(listbox)
      })
    })
  })

  describe('with generated examples', () => {
    const generatedComponents = generateA11yTests(
      TimeSelect,
      TimeSelectExamples
    )

    it.each(generatedComponents)(
      'should be accessible with example: $description',
      async ({ content }) => {
        const { container } = render(content)
        const axeCheck = await runAxeCheck(container)
        expect(axeCheck).toBe(true)
      }
    )
  })
})
