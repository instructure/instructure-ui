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
import React, { useState } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { vi, MockInstance } from 'vitest'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { DateInput2 } from '../index'

const ERROR_MSG = 'Invalid date'
const LABEL_TEXT = 'Choose a date'

const DateInputExample = () => {
  const [inputValue, setInputValue] = useState('')
  const [dateString, setDateString] = useState('')

  return (
    <DateInput2
      renderLabel={LABEL_TEXT}
      screenReaderLabels={{
        calendarIcon: 'Calendar',
        nextMonthButton: 'Next month',
        prevMonthButton: 'Previous month'
      }}
      value={inputValue}
      onChange={(_e, inputValue, _dateString) => {
        setInputValue(inputValue)
        setDateString(dateString)
      }}
      invalidDateErrorMessage={ERROR_MSG}
    />
  )
}

describe('<DateInput2 />', () => {
  let consoleWarningMock: MockInstance<typeof console.error>
  let consoleErrorMock: MockInstance<typeof console.error>

  beforeEach(() => {
    // Mocking console to prevent test output pollution
    consoleWarningMock = vi.spyOn(console, 'warn').mockImplementation(() => {})
    consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {})

    // Mock the time zone to always be UTC
    // vi.useFakeTimers() // freeze animations too, continue with vi.advanceTimersByTime(500)
    const mockDate = new Date(Date.UTC(2022, 2, 26))
    vi.setSystemTime(mockDate)
  })

  afterEach(() => {
    consoleWarningMock.mockRestore()
    consoleErrorMock.mockRestore()
    vi.useRealTimers()
  })

  it('should render an input', async () => {
    const { container } = render(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        value=""
      />
    )
    const dateInput = container.querySelector('input')

    expect(dateInput).toBeInTheDocument()
    expect(dateInput).toHaveAttribute('type', 'text')
  })

  it('should render an input label', async () => {
    const { container } = render(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        value=""
      />
    )
    const dateInput = container.querySelector('input')
    const label = container.querySelector('label')

    expect(label).toBeInTheDocument()
    expect(label).toHaveTextContent('Choose a date')
    expect(dateInput!.id).toBe(label!.htmlFor)
  })

  it('should render an input placeholder', async () => {
    render(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        placeholder="Placeholder"
        value="2024-03-26"
      />
    )
    const dateInput = screen.getByLabelText('Choose a date')

    expect(dateInput).toHaveAttribute('placeholder', 'Placeholder')
  })

  it('should render a calendar icon with screen reader label', async () => {
    const { container } = render(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar icon Label',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        value=""
      />
    )
    const calendarIcon = container.querySelector(
      'svg[name="IconCalendarMonth"]'
    )
    const calendarLabel = screen.getByText('Calendar icon Label')

    expect(calendarIcon).toBeInTheDocument()
    expect(calendarLabel).toBeInTheDocument()
  })

  it('should not show calendar table by default', async () => {
    render(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        value=""
      />
    )
    const calendarTable = screen.queryByRole('listbox')

    expect(calendarTable).not.toBeInTheDocument()
  })

  it('should show calendar table when calendar button is clicked', async () => {
    render(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        value=""
      />
    )
    const calendarButton = screen.getByRole('button')

    expect(calendarButton).toBeInTheDocument()

    await userEvent.click(calendarButton)

    await waitFor(() => {
      const calendarTable = screen.queryByRole('listbox')

      expect(calendarTable).toBeInTheDocument()
    })
  })

  it('should render navigation arrow buttons with screen reader labels', async () => {
    render(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        value=""
      />
    )
    const calendarButton = screen.getByRole('button')

    await userEvent.click(calendarButton)

    await waitFor(() => {
      const prevMonthButton = screen.getByRole('button', {
        name: 'Previous month'
      })
      const nextMonthButton = screen.getByRole('button', { name: 'Next month' })

      expect(prevMonthButton).toBeInTheDocument()
      expect(nextMonthButton).toBeInTheDocument()

      const prevButtonLabel = screen.getByText('Previous month')
      const nextButtonLabel = screen.getByText('Next month')

      expect(prevButtonLabel).toBeInTheDocument()
      expect(nextButtonLabel).toBeInTheDocument()

      const prevMonthIcon = prevMonthButton.querySelector(
        'svg[name="IconArrowOpenStart"]'
      )
      const nextMonthIcon = nextMonthButton.querySelector(
        'svg[name="IconArrowOpenEnd"]'
      )

      expect(prevMonthIcon).toBeInTheDocument()
      expect(nextMonthIcon).toBeInTheDocument()
    })
  })

  it('should set value', async () => {
    render(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        value="2024-03-26"
      />
    )
    const dateInput = screen.getByLabelText('Choose a date')

    expect(dateInput).toHaveValue('2024-03-26')
    expect(dateInput).toBeInTheDocument()
  })

  it('should set interaction type to disabled', async () => {
    const { container } = render(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        value={'2024-03-26'}
        interaction="disabled"
      />
    )
    const dateInput = container.querySelector('input')

    expect(dateInput).toHaveAttribute('disabled')
  })

  it('should set interaction type to readonly', async () => {
    const { container } = render(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        value={'2024-03-26'}
        interaction="readonly"
      />
    )
    const dateInput = container.querySelector('input')
    const calendarButton = screen.getByRole('button')

    expect(dateInput).toHaveAttribute('readonly')
    expect(calendarButton).toBeInTheDocument()

    await userEvent.click(calendarButton)

    await waitFor(() => {
      const calendarTable = screen.queryByRole('listbox')

      expect(calendarTable).not.toBeInTheDocument()
    })
  })

  it('should set required', async () => {
    const value = '2024-03-26'
    const { container } = render(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        value={value}
        isRequired
      />
    )
    const dateInput = container.querySelector('input')

    expect(dateInput).toHaveAttribute('required')
  })

  it('should call onBlur', async () => {
    const onBlur = vi.fn()
    render(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        value=""
        onBlur={onBlur}
      />
    )
    const dateInput = screen.getByLabelText('Choose a date')

    fireEvent.blur(dateInput)

    await waitFor(() => {
      expect(onBlur).toHaveBeenCalled()
    })
  })

  it('should call onChange with the new value', async () => {
    const newValue = '26/03/2024'
    const onChange = vi.fn()
    render(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        value=""
        locale="en-GB"
        timezone="UTC"
        onChange={onChange}
      />
    )
    const dateInput = screen.getByLabelText('Choose a date')

    fireEvent.change(dateInput, { target: { value: newValue } })

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange.mock.calls[0][1]).toEqual(newValue)
      expect(onChange.mock.calls[0][2]).toEqual('2024-03-25T00:00:00.000Z') // TODO why 25? system diff?
    })
  })

  it('should dateFormat prop pass necessary props to the callback', async () => {
    const userDate = '03/26/2024'
    const date = new Date(1111, 10, 10)
    const parserSpy = vi.fn()
    const formatterSpy = vi.fn()

    parserSpy.mockReturnValue(date)
    formatterSpy.mockReturnValue('2222-11-11')

    const Example = () => {
      const [value1, setValue1] = useState('')

      return (
        <DateInput2
          renderLabel="Choose a date"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month'
          }}
          value={value1}
          locale="en-GB"
          timezone="UTC"
          dateFormat={{
            parser: parserSpy,
            formatter: formatterSpy
          }}
          onChange={(_e, value) => setValue1(value)}
        />
      )
    }

    render(<Example />)

    const dateInput = screen.getByLabelText('Choose a date')

    await userEvent.type(dateInput, userDate)

    await waitFor(() => {
      const lastCallIndex = parserSpy.mock.calls.length - 1
      expect(parserSpy).toHaveBeenCalled()
      expect(parserSpy.mock.calls[lastCallIndex][0]).toEqual(userDate)

      expect(formatterSpy).toHaveBeenCalled()
      expect(formatterSpy.mock.calls[0][0]).toEqual(date)
    })
  })

  it('should validate if the invalidDateErrorMessage prop is provided', async () => {
    render(<DateInputExample />)

    expect(screen.queryByText(ERROR_MSG)).not.toBeInTheDocument()

    const dateInput = screen.getByLabelText(LABEL_TEXT)

    await userEvent.click(dateInput)
    await userEvent.type(dateInput, 'Not a date')

    dateInput.blur()

    await waitFor(() => {
      expect(screen.getByText(ERROR_MSG)).toBeInTheDocument()
    })
  })

  it('should onRequestValidateDate prop pass necessary props to the callback when input value is not a valid date', async () => {
    const dateValidationSpy = vi.fn()

    const Example = () => {
      const [value1, setValue1] = useState('')

      return (
        <DateInput2
          renderLabel="Choose a date"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month'
          }}
          value={value1}
          locale="en-GB"
          timezone="Europe/London"
          onChange={(_e, value) => setValue1(value)}
          onRequestValidateDate={dateValidationSpy}
        />
      )
    }

    render(<Example />)

    const dateInput = screen.getByLabelText('Choose a date')

    await userEvent.type(dateInput, 'not a date')
    fireEvent.blur(dateInput)

    await waitFor(() => {
      const lastCallIndex = dateValidationSpy.mock.calls.length - 1

      expect(dateValidationSpy).toHaveBeenCalled()

      expect(dateValidationSpy.mock.calls[lastCallIndex][1]).toEqual(
        'not a date'
      ) // value
      expect(dateValidationSpy.mock.calls[lastCallIndex][2]).toEqual('') // dateString
    })
  })

  it('should onRequestValidateDate prop pass necessary props to the callback when input value is a valid date', async () => {
    const dateValidationSpy = vi.fn()

    const Example = () => {
      const [value1, setValue1] = useState('')

      return (
        <DateInput2
          renderLabel="Choose a date"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month'
          }}
          value={value1}
          locale="en-GB"
          timezone="UTC"
          onChange={(_e, value) => setValue1(value)}
          onRequestValidateDate={dateValidationSpy}
        />
      )
    }

    render(<Example />)

    const dateInput = screen.getByLabelText('Choose a date')

    await userEvent.type(dateInput, '26/03/2024')
    fireEvent.blur(dateInput)

    await waitFor(() => {
      const lastCallIndex = dateValidationSpy.mock.calls.length - 1

      expect(dateValidationSpy).toHaveBeenCalled()
      expect(dateValidationSpy.mock.calls[lastCallIndex][1]).toEqual(
        '26/03/2024'
      ) // value
      expect(dateValidationSpy.mock.calls[lastCallIndex][2]).toEqual(
        '2024-03-25T00:00:00.000Z'
      ) // dateString
    })
  })

  it('should show form field messages', async () => {
    const messages: any = [
      { text: 'TypeLess' },
      { type: 'error', text: 'Error' },
      { type: 'success', text: 'Success' },
      { type: 'hint', text: 'Hint' },
      { type: 'screenreader-only', text: 'Screenreader' }
    ]

    render(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        value=""
        messages={messages}
      />
    )

    expect(screen.getByText('TypeLess')).toBeVisible()
    expect(screen.getByText('Error')).toBeVisible()
    expect(screen.getByText('Success')).toBeVisible()
    expect(screen.getByText('Hint')).toBeVisible()

    const screenreaderMessage = screen.getByText('Screenreader')
    expect(screenreaderMessage).toBeInTheDocument()
    expect(screenreaderMessage).toHaveClass(/screenReaderContent/)
  })
})
