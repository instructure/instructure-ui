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

import { ApplyLocale, DateTime } from '@instructure/ui-i18n'

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

  describe('Component tests', () => {
    const options = () => page.getByRole('option')

    it('should render an input and list', async () => {
      await render(<TimeSelect renderLabel="Choose a time" />)
      const input = page.getByRole('combobox').element()

      expect(page.getByRole('listbox').query()).not.toBeInTheDocument()

      await userEvent.click(input)

      await expect.element(page.getByRole('listbox')).toBeInTheDocument()
    })

    it('should fire onChange when selected option changes', async () => {
      const onChange = vi.fn()
      await render(
        <TimeSelect
          renderLabel="Choose a time"
          timezone="US/Eastern"
          onChange={onChange}
        />
      )
      const input = page.getByRole('combobox').element()

      expect(page.getByRole('listbox').query()).not.toBeInTheDocument()

      await userEvent.click(input)

      await expect.element(options().first()).toHaveTextContent('12:00 AM')

      await userEvent.click(options().first())

      await vi.waitFor(() => {
        expect(input).toHaveValue('12:00 AM')
        expect(onChange).toHaveBeenCalled()
        expect(onChange.mock.lastCall![1]).toHaveProperty('value')
        expect(onChange.mock.lastCall![1]).toHaveProperty(
          'inputText',
          '12:00 AM'
        )
      })
    })

    it('should fire onChange when input field is cleared and blurred and allowClearingSelection is true', async () => {
      const onChange = vi.fn()
      await render(
        <TimeSelect
          renderLabel="Choose a time"
          timezone="US/Eastern"
          onChange={onChange}
          allowClearingSelection={true}
        />
      )
      const input = page.getByRole('combobox').element()

      await userEvent.click(input)
      await userEvent.click(options().first())

      await userEvent.click(input)
      await userEvent.clear(input)
      input.blur()

      await vi.waitFor(() => {
        expect(onChange.mock.lastCall![1]).toHaveProperty('value', '')
        expect(onChange.mock.lastCall![1]).toHaveProperty('inputText', '')
      })
    })

    it('should behave uncontrolled', async () => {
      const onChange = vi.fn()
      await render(
        <TimeSelect renderLabel="Choose a time" onChange={onChange} />
      )
      const input = page.getByRole('combobox').element()

      expect(input).toHaveValue('')

      await userEvent.click(input)
      await userEvent.click(options().first())

      await vi.waitFor(() => {
        expect(input).toHaveValue('12:00 AM')
      })
    })

    it('should behave controlled', async () => {
      const onChange = vi.fn()
      const initialTestValue = moment
        .tz('1986-05-17T05:00:00.000Z', moment.ISO_8601, 'en', 'US/Eastern')
        .toISOString()

      const { rerender } = await render(
        <TimeSelect
          renderLabel="Choose an option"
          value={initialTestValue}
          timezone="US/Eastern"
          onChange={onChange}
        />
      )
      const input = page.getByRole('combobox').element()

      expect(input).toHaveValue('1:00 AM')

      await userEvent.click(input)

      const fifthOption = options().nth(4)
      const selectedValue = (await fifthOption.element()).textContent!

      await userEvent.click(fifthOption)

      await vi.waitFor(() => {
        expect(onChange).toHaveBeenCalled()
      })
      // not changed because it's hardcoded
      expect(input).toHaveValue('1:00 AM')

      const newValue = onChange.mock.lastCall![1].value
      expect(newValue).not.toBe(initialTestValue)

      // update component with the new value
      await rerender(
        <TimeSelect
          renderLabel="Choose an option"
          value={newValue}
          timezone="US/Eastern"
          onChange={onChange}
        />
      )

      await vi.waitFor(() => {
        expect(input).toHaveValue(selectedValue)
      })
    })

    it('Pressing ESC should reset the value in controlled mode', async () => {
      const onChange = vi.fn()
      const onKeyDown = vi.fn()
      const handleInputChange = vi.fn()
      await render(
        <TimeSelect
          renderLabel="Choose a time"
          allowNonStepInput={true}
          value=""
          locale="en_AU"
          timezone="US/Eastern"
          onChange={onChange}
          onInputChange={handleInputChange}
          onKeyDown={onKeyDown}
        />
      )
      const input = page.getByRole('combobox').element()

      await userEvent.click(input)
      await userEvent.type(input, '7:45 PM')
      await userEvent.keyboard('{Escape}')

      await vi.waitFor(() => {
        expect(input).toHaveValue('')
      })
      expect(onChange).not.toHaveBeenCalled()
      expect(onKeyDown).toHaveBeenCalled()
      expect(handleInputChange).toHaveBeenCalled()
    })

    it('value should not be changeable via user input in controlled mode', async () => {
      const dateTime = DateTime.parse('2017-05-01T17:30Z', 'en-US', 'GMT')
      await render(
        <TimeSelect
          renderLabel="Choose a time"
          allowNonStepInput={true}
          value={dateTime.toISOString()}
          locale="en_AU"
          timezone="US/Eastern"
        />
      )
      const input = page.getByRole('combobox').element()

      await userEvent.clear(input)
      await userEvent.type(input, '1:45 PM')
      await userEvent.keyboard('{Enter}')
      input.blur()

      await vi.waitFor(() => {
        expect(input).toHaveValue('1:30 PM')
      })
    })

    it('should keep selection when value changes', async () => {
      const onChange = vi.fn()
      const locale = 'en-US'
      const timezone = 'US/Eastern'
      const dateTime = DateTime.parse('2017-05-01T17:30Z', locale, timezone)

      const { rerender } = await render(
        <TimeSelect
          renderLabel="Choose an option"
          value={dateTime.toISOString()}
          timezone="US/Eastern"
          onChange={onChange}
        />
      )
      const input = page.getByRole('combobox').element()

      expect(input).toHaveValue('1:30 PM')

      const newDateTime = DateTime.parse('2022-03-29T19:00Z', locale, timezone)

      await rerender(
        <TimeSelect
          renderLabel="Choose an option"
          value={newDateTime.toISOString()}
          timezone="US/Eastern"
          onChange={onChange}
        />
      )

      await vi.waitFor(() => {
        expect(page.getByRole('combobox').element()).toHaveValue('3:00 PM')
      })
    })

    it('should accept values that are not divisible by step', async () => {
      const onChange = vi.fn()
      const { rerender } = await render(
        <TimeSelect
          renderLabel="Choose an option"
          timezone="US/Eastern"
          onChange={onChange}
        />
      )
      const input = page.getByRole('combobox').element()

      // this expectation is needed so TimeSelect generates some default options
      expect(input).toHaveAttribute('value', '')

      const value = moment.tz(
        '1986-05-17T05:02:00.000Z',
        moment.ISO_8601,
        'en',
        'US/Eastern'
      )

      await rerender(
        <TimeSelect
          renderLabel="Choose an option"
          timezone="US/Eastern"
          onChange={onChange}
          value={value.toISOString()}
        />
      )

      await vi.waitFor(() => {
        expect(input).toHaveAttribute('value', '1:02 AM')
      })
    })

    it('should use the specified step value', async () => {
      const value = moment.tz(
        '1986-05-17T18:00:00.000Z',
        moment.ISO_8601,
        'en',
        'US/Eastern'
      )
      await render(
        <TimeSelect
          renderLabel="Choose a time"
          timezone="US/Eastern"
          step={15}
          value={value.toISOString()}
        />
      )
      const input = page.getByRole('combobox').element()

      await userEvent.click(input)

      expect(input).toHaveValue('2:00 PM')

      await expect.element(options().nth(0)).toHaveTextContent('12:00 AM')
      await expect.element(options().nth(1)).toHaveTextContent('12:15 AM')
    })

    it('should not allow non-step value when allowNonStepInput=false', async () => {
      const onChange = vi.fn()
      await render(
        <TimeSelect
          renderLabel="Choose a time"
          allowNonStepInput={false}
          locale="en_AU"
          timezone="US/Eastern"
          onChange={onChange}
        />
      )
      const input = page.getByRole('combobox').element()

      await userEvent.click(input)
      await userEvent.type(input, '7:34 PM')
      // should not accept the value and send onChange event
      await userEvent.keyboard('{Enter}')
      // should reset the value
      await userEvent.keyboard('{Escape}')

      await vi.waitFor(() => {
        expect(input).toHaveValue('')
      })
      expect(onChange).not.toHaveBeenCalled()
    })

    it('should allow non-step value when allowNonStepInput=true', async () => {
      const onChange = vi.fn()
      await render(
        <TimeSelect
          renderLabel="Choose a time"
          allowNonStepInput={true}
          locale="en_AU"
          timezone="US/Eastern"
          onChange={onChange}
        />
      )
      const input = page.getByRole('combobox').element()

      await userEvent.click(input)
      await userEvent.type(input, '7:34 PM')
      input.blur() // sends onChange event

      await vi.waitFor(() => {
        expect(onChange).toHaveBeenCalled()
        expect(onChange.mock.lastCall![1]).toHaveProperty('value')
        expect(input).toHaveAttribute('value', '7:34 PM')
      })
    })

    it('should round down seconds when applicable', async () => {
      const onChange = vi.fn()
      await render(
        <TimeSelect
          renderLabel="Choose a time"
          allowNonStepInput={true}
          locale="en_AU"
          format="LTS" // `h:mm:ss A`
          timezone="US/Eastern"
          onChange={onChange}
        />
      )
      const input = page.getByRole('combobox').element()

      expect(input).toHaveValue('')

      await userEvent.click(input)
      await userEvent.type(input, '4:45:55 AM')
      input.blur() // sends onChange event

      await vi.waitFor(() => {
        expect(input).toHaveValue('4:45:00 AM')
      })
    })
  })
})
