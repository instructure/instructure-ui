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
import { useState } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { vi, MockInstance } from 'vitest'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { IconHeartLine } from '@instructure/ui-icons'

import { DateInput2 } from '../index'
import { TextInput } from '@instructure/ui-text-input'

const LABEL_TEXT = 'Choose a date'

const DateInputExample = () => {
  const [inputValue, setInputValue] = useState('')

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
      }}
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
  })

  afterEach(() => {
    consoleWarningMock.mockRestore()
    consoleErrorMock.mockRestore()
  })

  it('should render an input', async () => {
    const { container } = render(<DateInputExample />)
    const dateInput = container.querySelector('input')

    expect(dateInput).toBeInTheDocument()
    expect(dateInput).toHaveAttribute('type', 'text')
  })

  it('should render an input label', async () => {
    const { container } = render(<DateInputExample />)

    const label = container.querySelector('label')

    expect(label).toBeInTheDocument()
    expect(label).toHaveTextContent(LABEL_TEXT)
  })

  it('should render an input placeholder', async () => {
    const placeholder = 'Placeholder'
    render(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        placeholder={placeholder}
        value=""
      />
    )
    const dateInput = screen.getByLabelText('Choose a date')

    expect(dateInput).toHaveAttribute('placeholder', placeholder)
  })

  it('should render a calendar icon with screen reader label', async () => {
    const iconLabel = 'Calendar icon Label'
    const { container } = render(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: iconLabel,
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        value=""
      />
    )
    const calendarIcon = container.querySelector(
      'svg[name="IconCalendarMonth"]'
    )
    const calendarLabel = screen.getByText(iconLabel)

    expect(calendarIcon).toBeInTheDocument()
    expect(calendarLabel).toBeInTheDocument()
  })

  it('refs should return the underlying component', async () => {
    const inputRef = vi.fn()
    const ref: React.Ref<TextInput> = { current: null }
    const { container } = render(
      <DateInput2
        id="dateInput2"
        inputRef={inputRef}
        ref={ref}
        renderLabel={LABEL_TEXT}
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
      />
    )
    const dateInput = container.querySelector('input')
    expect(inputRef).toHaveBeenCalledWith(dateInput)
    expect(ref.current!.props.id).toBe('dateInput2')
    expect(dateInput).toBeInTheDocument()
  })

  it('should render a custom calendar icon with screen reader label', async () => {
    const iconLabel = 'Calendar icon Label'
    const { container } = render(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: iconLabel,
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        value=""
        renderCalendarIcon={<IconHeartLine />}
      />
    )
    const calendarIcon = container.querySelector('svg[name="IconHeart"]')
    const calendarLabel = screen.getByText(iconLabel)

    expect(calendarIcon).toBeInTheDocument()
    expect(calendarLabel).toBeInTheDocument()
  })

  it('should not show calendar table by default', async () => {
    render(<DateInputExample />)
    const calendarTable = screen.queryByRole('table')

    expect(calendarTable).not.toBeInTheDocument()
  })

  it('should show calendar table when calendar button is clicked', async () => {
    render(<DateInputExample />)
    const calendarButton = screen.getByRole('button')

    expect(calendarButton).toBeInTheDocument()

    await userEvent.click(calendarButton)

    await waitFor(() => {
      const calendarTable = screen.queryByRole('table')
      expect(calendarTable).toBeInTheDocument()
    })
  })

  it('should render navigation arrow buttons with screen reader labels', async () => {
    const nextMonthLabel = 'Next month'
    const prevMonthLabel = 'Previous month'

    render(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: nextMonthLabel,
          prevMonthButton: prevMonthLabel
        }}
        value=""
      />
    )
    const calendarButton = screen.getByRole('button')

    await userEvent.click(calendarButton)

    await waitFor(() => {
      const prevMonthButton = screen.getByRole('button', {
        name: prevMonthLabel
      })
      const nextMonthButton = screen.getByRole('button', {
        name: nextMonthLabel
      })

      expect(prevMonthButton).toBeInTheDocument()
      expect(nextMonthButton).toBeInTheDocument()

      const prevButtonLabel = screen.getByText(prevMonthLabel)
      const nextButtonLabel = screen.getByText(nextMonthLabel)

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

  it('should programmatically set and render the initial value', async () => {
    const value = '26/03/2024'
    render(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        locale="en-GB"
        timezone="UTC"
        value={value}
      />
    )
    const dateInput = screen.getByLabelText('Choose a date')

    expect(dateInput).toHaveValue(value)
    expect(dateInput).toBeInTheDocument()
  })

  it('should set interaction type to disabled', async () => {
    const interactionDisabled = 'disabled'
    const { container } = render(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        value=""
        interaction={interactionDisabled}
      />
    )
    const dateInput = container.querySelector('input')

    expect(dateInput).toHaveAttribute(interactionDisabled)
  })

  it('should set interaction type to readonly', async () => {
    const interactionReadOnly = 'readonly'
    const { container } = render(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        value=""
        interaction={interactionReadOnly}
      />
    )
    const dateInput = container.querySelector('input')
    const calendarButton = screen.getByRole('button')

    expect(dateInput).toHaveAttribute(interactionReadOnly)
    expect(calendarButton).toBeInTheDocument()

    await userEvent.click(calendarButton)

    await waitFor(() => {
      const calendarTable = screen.queryByRole('table')

      expect(calendarTable).not.toBeInTheDocument()
    })
  })

  it('should set required', async () => {
    const { container } = render(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        value=""
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

  it('should validate if the invalidDateErrorMessage prop is provided', async () => {
    const errorMsg = 'errorMsg'
    const Example = () => {
      const [inputValue, setInputValue] = useState('')

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
          }}
          invalidDateErrorMessage={errorMsg}
        />
      )
    }

    render(<Example />)

    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument()

    const dateInput = screen.getByLabelText(LABEL_TEXT)

    await userEvent.click(dateInput)
    await userEvent.type(dateInput, 'Not a date')

    dateInput.blur()

    await waitFor(() => {
      expect(screen.getByText(errorMsg)).toBeInTheDocument()
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

  it('should render date picker dialog with proper role and ARIA label', async () => {
    const datePickerLabel = 'Date picker'
    render(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month',
          datePickerDialog: datePickerLabel
        }}
        value=""
      />
    )
    const calendarButton = screen.getByRole('button', { name: 'Calendar' })
    await userEvent.click(calendarButton)
    await waitFor(() => {
      const dialog = screen.getByRole('dialog', { name: datePickerLabel })
      expect(dialog).toBeInTheDocument()
      expect(dialog).toHaveAttribute('aria-label', datePickerLabel)
    })
  })
})
