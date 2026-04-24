/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 - present Instructure, Inc.
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
import '@testing-library/jest-dom'

import { DateTimeInput } from '../index'
import { ApplyLocale, DateTime } from '@instructure/ui-i18n'

describe('<DateTimeInput />', () => {
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

  it('should use the default value', () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const dateTime = DateTime.parse('2017-05-01T17:30Z', locale, timezone)

    render(
      <DateTimeInput
        description="date_time"
        screenReaderLabels={{
          calendarIcon: 'Open calendar',
          prevMonthButton: 'Previous month',
          nextMonthButton: 'Next month'
        }}
        dateRenderLabel="date-input"
        timeRenderLabel="time-input"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        defaultValue={dateTime.toISOString()}
      />
    )
    const dateInput = screen.getByLabelText('date-input')
    const timeInput = screen.getByLabelText('time-input')

    expect(dateInput).toHaveValue('5/1/2017')
    expect(timeInput).toHaveValue('1:30 PM')
  })

  it('should use the value', () => {
    const onChange = vi.fn()
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const dateTime = DateTime.parse('2017-05-01T23:30Z', locale, timezone)

    render(
      <DateTimeInput
        description="date_time"
        screenReaderLabels={{
          calendarIcon: 'Open calendar',
          prevMonthButton: 'Previous month',
          nextMonthButton: 'Next month'
        }}
        dateRenderLabel="date-input"
        timeRenderLabel="time-input"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        value={dateTime.toISOString()}
        onChange={onChange}
      />
    )
    const dateInput = screen.getByLabelText('date-input')
    const timeInput = screen.getByLabelText('time-input')

    expect(dateInput).toHaveValue('5/1/2017')
    expect(timeInput).toHaveValue('7:30 PM')
  })

  it('should prefer value to defaultValue', () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const value = DateTime.parse('2017-05-01T17:30Z', locale, timezone)
    const defaultValue = DateTime.parse('2016-04-01T17:00Z', locale, timezone)
    const onChange = vi.fn()

    render(
      <DateTimeInput
        description="date_time"
        screenReaderLabels={{
          calendarIcon: 'Open calendar',
          prevMonthButton: 'Previous month',
          nextMonthButton: 'Next month'
        }}
        dateRenderLabel="date-input"
        timeRenderLabel="time-input"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        value={value.toISOString()}
        defaultValue={defaultValue.toISOString()}
        onChange={onChange}
      />
    )
    const dateInput = screen.getByLabelText('date-input')
    const timeInput = screen.getByLabelText('time-input')

    expect(dateInput).toHaveValue('5/1/2017')
    expect(timeInput).toHaveValue('1:30 PM')
  })

  it('should set time to local midnight when only date is set', () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const dateObj = DateTime.parse('2017-04-01T18:30Z', locale, timezone)
    const date = dateObj.toISOString().split('T')[0]

    render(
      <DateTimeInput
        description="date_time"
        dateRenderLabel="date-input"
        screenReaderLabels={{
          calendarIcon: 'Open calendar',
          prevMonthButton: 'Previous month',
          nextMonthButton: 'Next month'
        }}
        timeRenderLabel="time-input"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        defaultValue={date}
      />
    )
    const dateInput = screen.getByLabelText('date-input')
    const timeInput = screen.getByLabelText('time-input')

    expect(dateInput).toHaveValue('4/1/2017')
    expect(timeInput).toHaveValue('12:00 AM')
  })

  it('should call invalidDateTimeMessage if time is set w/o a date and is required', async () => {
    const invalidDateTimeMessage = vi.fn((_rawd) => 'whoops')

    const { container } = render(
      <DateTimeInput
        description="date_time"
        dateRenderLabel="date-input"
        screenReaderLabels={{
          calendarIcon: 'Open calendar',
          prevMonthButton: 'Previous month',
          nextMonthButton: 'Next month'
        }}
        timeRenderLabel="time-input"
        locale="en-US"
        timezone="US/Eastern"
        isRequired
        invalidDateTimeMessage={invalidDateTimeMessage}
      />
    )
    const timeInput = screen.getByLabelText('time-input *')

    await userEvent.type(timeInput, '1:00 PM')
    fireEvent.blur(timeInput)

    await waitFor(() => {
      expect(container).toHaveTextContent('whoops')
      expect(invalidDateTimeMessage).toHaveBeenCalled()
    })
  })

  it('should not call invalidDateTimeMessage if time is set w/o a date', async () => {
    const invalidDateTimeMessage = vi.fn((_rawd) => 'whoops')

    render(
      <DateTimeInput
        description="date_time"
        dateRenderLabel="date-input"
        screenReaderLabels={{
          calendarIcon: 'Open calendar',
          prevMonthButton: 'Previous month',
          nextMonthButton: 'Next month'
        }}
        timeRenderLabel="time-input"
        locale="en-US"
        timezone="US/Eastern"
        invalidDateTimeMessage={invalidDateTimeMessage}
      />
    )
    const timeInput = screen.getByLabelText('time-input')

    await userEvent.type(timeInput, '1:00 PM{enter}')

    await waitFor(() => {
      const errorMessages = screen.queryByText('whoops')

      expect(errorMessages).not.toBeInTheDocument()
      expect(invalidDateTimeMessage).not.toHaveBeenCalled()
    })
  })

  it('should fire the onChange event when TimeInput value changes', async () => {
    const onChange = vi.fn()

    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const defaultValue = DateTime.parse('2017-05-01T17:00', locale, timezone)

    render(
      <DateTimeInput
        description="date_time"
        dateRenderLabel="date-input"
        screenReaderLabels={{
          calendarIcon: 'Open calendar',
          prevMonthButton: 'Previous month',
          nextMonthButton: 'Next month'
        }}
        timeRenderLabel="time-input"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        onChange={onChange}
        defaultValue={defaultValue.toISOString()}
      />
    )
    const timeInput = screen.getByLabelText('time-input')

    fireEvent.change(timeInput, { target: { value: '3:00 AM' } })
    fireEvent.keyDown(timeInput, { key: 'Enter', code: 'Enter' })
    fireEvent.blur(timeInput)

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled()
      expect(onChange.mock.calls[0][0].target.value).toMatch('3:00 AM')
    })
  })

  it('should show correct message when TimeInput value changes', () => {
    const { container } = render(
      <DateTimeInput
        description="date_time"
        dateRenderLabel="date-input"
        screenReaderLabels={{
          calendarIcon: 'Open calendar',
          prevMonthButton: 'Previous month',
          nextMonthButton: 'Next month'
        }}
        timeRenderLabel="time-input"
        invalidDateTimeMessage="whoops"
        locale="en-US"
        timezone="US/Eastern"
        defaultValue="2018-01-18T13:00"
      />
    )
    const timeInput = screen.getByLabelText('time-input')

    fireEvent.change(timeInput, { target: { value: '5:00 PM' } })
    fireEvent.keyDown(timeInput, { key: 'Enter', code: 'Enter' })
    fireEvent.blur(timeInput)

    expect(container).toHaveTextContent('Thursday, January 18, 2018 5:00 PM')
  })

  it('should show the formatted date-time message', () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const defaultValue = DateTime.parse('2017-05-01T17:30Z', locale, timezone)

    const { container } = render(
      <DateTimeInput
        description="date_time"
        dateRenderLabel="date-input"
        screenReaderLabels={{
          calendarIcon: 'Open calendar',
          prevMonthButton: 'Previous month',
          nextMonthButton: 'Next month'
        }}
        timeRenderLabel="time-input"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        defaultValue={defaultValue.toISOString()}
      />
    )

    expect(container).toHaveTextContent('Monday, May 1, 2017 1:30 PM')
  })

  it('should show the formatted date-time message in the proper locale', () => {
    const timezone = 'US/Eastern'
    const locale = 'fr'
    const defaultValue = DateTime.parse('2017-05-01T17:30Z', locale, timezone)

    const { container } = render(
      <DateTimeInput
        description="date_time"
        dateRenderLabel="date-input"
        screenReaderLabels={{
          calendarIcon: 'Open calendar',
          prevMonthButton: 'Previous month',
          nextMonthButton: 'Next month'
        }}
        timeRenderLabel="time-input"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        defaultValue={defaultValue.toISOString()}
      />
    )
    expect(container).toHaveTextContent('1 mai 2017 13:30')
  })

  it('should provide the html elements for date and time input', () => {
    let dref
    let tref

    render(
      <DateTimeInput
        description="date_time"
        dateRenderLabel="date-input"
        screenReaderLabels={{
          calendarIcon: 'Open calendar',
          prevMonthButton: 'Previous month',
          nextMonthButton: 'Next month'
        }}
        timeRenderLabel="time-input"
        invalidDateTimeMessage="whoops"
        locale="en-US"
        timezone="US/Eastern"
        dateInputRef={(el) => {
          dref = el
        }}
        timeInputRef={(el) => {
          tref = el
        }}
      />
    )
    const dateInput = screen.getByLabelText('date-input')
    const timeInput = screen.getByLabelText('time-input')

    expect(dateInput).toEqual(dref)
    expect(timeInput).toEqual(tref)
  })

  it('should update message when value prop changes', () => {
    const onChange = vi.fn()
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const dateTime = DateTime.parse('2017-05-01T17:30Z', locale, timezone)

    const props = {
      description: 'date_time',
      screenReaderLabels: {
        calendarIcon: 'Open calendar',
        prevMonthButton: 'Previous month',
        nextMonthButton: 'Next month'
      },
      dateRenderLabel: 'date',
      timeRenderLabel: 'time',
      invalidDateTimeMessage: 'whoops',
      locale,
      timezone,
      value: dateTime.toISOString(),
      onChange
    }

    const { container, rerender } = render(<DateTimeInput {...props} />)
    expect(container).toHaveTextContent('May 1, 2017 1:30 PM')

    rerender(<DateTimeInput {...props} value="2018-03-29T16:30Z" />)
    expect(container).toHaveTextContent('March 29, 2018 12:30 PM')
  })

  it('should update message when locale changed', () => {
    const onChange = vi.fn()
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const dateTime = DateTime.parse('2017-05-01T17:30Z', locale, timezone)

    const props = {
      description: 'date_time',
      dateRenderLabel: 'date-input',
      screenReaderLabels: {
        calendarIcon: 'Open calendar',
        prevMonthButton: 'Previous month',
        nextMonthButton: 'Next month'
      },
      timeRenderLabel: 'time-input',
      invalidDateTimeMessage: 'whoops',
      locale,
      timezone,
      onChange,
      value: dateTime.toISOString()
    }

    const { container, rerender } = render(<DateTimeInput {...props} />)
    expect(container).toHaveTextContent('May 1, 2017 1:30 PM')

    rerender(<DateTimeInput {...props} locale="fr" />)
    expect(container).toHaveTextContent('1 mai 2017 13:30')
  })

  it('should update message when timezone changed', () => {
    const onChange = vi.fn()
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const dateTime = DateTime.parse('2017-05-01T17:30Z', locale, timezone)
    const props = {
      description: 'date_time',
      dateRenderLabel: 'date-input',
      screenReaderLabels: {
        calendarIcon: 'Open calendar',
        prevMonthButton: 'Previous month',
        nextMonthButton: 'Next month'
      },
      timeRenderLabel: 'time-input',
      invalidDateTimeMessage: 'whoops',
      locale,
      timezone,
      onChange,
      value: dateTime.toISOString()
    }

    const { container, rerender } = render(<DateTimeInput {...props} />)
    expect(container).toHaveTextContent('May 1, 2017 1:30 PM')

    rerender(<DateTimeInput {...props} timezone="Europe/Paris" />)
    expect(container).toHaveTextContent('May 1, 2017 7:30 PM')
  })

  it('should show error message if initial value is invalid', async () => {
    const { container } = render(
      <DateTimeInput
        description="date_time"
        dateRenderLabel="date-input"
        screenReaderLabels={{
          calendarIcon: 'Open calendar',
          prevMonthButton: 'Previous month',
          nextMonthButton: 'Next month'
        }}
        timeRenderLabel="time-input"
        invalidDateTimeMessage="whoops"
        value="totally not a date"
      />
    )
    const dateInput = screen.getByLabelText('date-input')
    fireEvent.blur(dateInput)

    await waitFor(() => {
      expect(container).toHaveTextContent('whoops')
    })
  })

  it('should show error message if initial defaultValue is invalid', async () => {
    const { container } = render(
      <DateTimeInput
        description="date_time"
        dateRenderLabel="date-input"
        screenReaderLabels={{
          calendarIcon: 'Open calendar',
          prevMonthButton: 'Previous month',
          nextMonthButton: 'Next month'
        }}
        timeRenderLabel="time-input"
        invalidDateTimeMessage="whoops"
        defaultValue="totally not a date"
      />
    )
    const dateInput = screen.getByLabelText('date-input')
    fireEvent.blur(dateInput)

    await waitFor(() => {
      expect(container).toHaveTextContent('whoops')
    })
  })

  it('should update error message when value is invalid', async () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const dateTime = DateTime.parse('2017-05-01T17:30Z', locale, timezone)
    const props = {
      description: 'date_time',
      dateRenderLabel: 'date-input',
      screenReaderLabels: {
        calendarIcon: 'Open calendar',
        prevMonthButton: 'Previous month',
        nextMonthButton: 'Next month'
      },
      timeRenderLabel: 'time-input',
      invalidDateTimeMessage: 'whoops',
      locale,
      timezone,
      value: dateTime.toISOString()
    }
    const { container, rerender } = render(<DateTimeInput {...props} />)
    expect(container).toHaveTextContent('May 1, 2017 1:30 PM')

    rerender(<DateTimeInput {...props} value="A very invalid date" />)
    const dateInput = screen.getByLabelText('date-input')
    fireEvent.blur(dateInput)

    await waitFor(() => {
      expect(container).toHaveTextContent('whoops')
    })
  })

  it('should show supplied message', async () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const dateTime = DateTime.parse('2017-05-01T17:30Z', locale, timezone)
    const props = {
      description: 'date_time',
      dateRenderLabel: 'date-input',
      screenReaderLabels: {
        calendarIcon: 'Open calendar',
        prevMonthButton: 'Previous month',
        nextMonthButton: 'Next month'
      },
      timeRenderLabel: 'time-input',
      invalidDateTimeMessage: 'whoops',
      locale,
      timezone,
      value: dateTime.toISOString()
    }
    const { container, rerender } = render(<DateTimeInput {...props} />)
    expect(container).toHaveTextContent('May 1, 2017 1:30 PM')

    rerender(
      <DateTimeInput
        {...props}
        messages={[{ text: 'message_text', type: 'success' }]}
      />
    )
    const dateInput = screen.getByLabelText('date-input')
    fireEvent.blur(dateInput)

    await waitFor(() => {
      expect(container).toHaveTextContent('May 1, 2017 1:30 PM')
      expect(container).toHaveTextContent('message_text')
    })
  })

  it('should not show built in message when `showMessages` is false', async () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const dateTime = DateTime.parse('2017-05-01T17:30Z', locale, timezone)
    const props = {
      description: 'date_time',
      dateRenderLabel: 'date-input',
      screenReaderLabels: {
        calendarIcon: 'Open calendar',
        prevMonthButton: 'Previous month',
        nextMonthButton: 'Next month'
      },
      timeRenderLabel: 'time-input',
      invalidDateTimeMessage: 'whoops',
      locale,
      timezone,
      value: dateTime.toISOString()
    }
    const { container, rerender } = render(
      <DateTimeInput {...props} showMessages={false} />
    )
    expect(container).not.toHaveTextContent('2017')

    rerender(
      <DateTimeInput
        {...props}
        showMessages={false}
        messages={[{ text: 'message_text', type: 'success' }]}
      />
    )
    const dateInput = screen.getByLabelText('date-input')

    fireEvent.blur(dateInput)

    await waitFor(() => {
      expect(container).not.toHaveTextContent('2017')
      expect(container).toHaveTextContent('message_text')
    })

    rerender(
      <DateTimeInput
        {...props}
        messages={[{ text: 'message_text', type: 'success' }]}
        showMessages={true}
      />
    )

    fireEvent.blur(screen.getByLabelText('date-input'))

    await waitFor(() => {
      expect(container).toHaveTextContent('2017')
      expect(container).toHaveTextContent('message_text')
    })
  })

  it('should read locale and timezone from context', () => {
    const onChange = vi.fn()
    const dateTime = DateTime.parse('2017-05-01T17:30Z', 'en-US', 'GMT')
    const { container } = render(
      // Africa/Nairobi is GMT +3
      <ApplyLocale locale="fr" timezone="Africa/Nairobi">
        <DateTimeInput
          description="date_time"
          dateRenderLabel="date-input"
          screenReaderLabels={{
            calendarIcon: 'Open calendar',
            prevMonthButton: 'Previous month',
            nextMonthButton: 'Next month'
          }}
          timeRenderLabel="time-input"
          invalidDateTimeMessage="whoops"
          value={dateTime.toISOString()}
          onChange={onChange}
        />
      </ApplyLocale>
    )

    expect(container).toHaveTextContent('lundi 1 mai 2017 20:30')
  })

  it('should format date according to dateFormat', async () => {
    const onChange = vi.fn()
    const dateTime = DateTime.parse('2017-05-01T17:30Z', 'en-US', 'GMT')
    const props = {
      description: 'date_time',
      dateRenderLabel: 'date-input',
      screenReaderLabels: {
        calendarIcon: 'Open calendar',
        prevMonthButton: 'Previous month',
        nextMonthButton: 'Next month'
      },
      timeRenderLabel: 'time-input',
      invalidDateTimeMessage: 'whoops',
      value: dateTime.toISOString(),
      onChange
    }

    // locale string: French format gives DD/MM/YYYY
    const { rerender } = render(<DateTimeInput {...props} dateFormat="fr" />)
    const dateInput = screen.getByLabelText('date-input')
    expect(dateInput).toHaveValue('01/05/2017')

    // custom { parser, formatter } object
    rerender(
      <DateTimeInput
        {...props}
        dateFormat={{
          parser: (input) => {
            const [y, m, d] = input.split('/').map(Number)
            return isNaN(y) ? null : new Date(Date.UTC(y, m - 1, d))
          },
          formatter: (date) =>
            `${date.getUTCFullYear()}/${String(date.getUTCMonth() + 1).padStart(
              2,
              '0'
            )}/${String(date.getUTCDate()).padStart(2, '0')}`
        }}
      />
    )

    await waitFor(() => {
      expect(dateInput).toHaveValue('2017/05/01')
    })
  })

  it('should format bottom message according to messageFormat', async () => {
    const onChange = vi.fn()
    const dateTime = DateTime.parse('2017-05-01T17:30Z', 'en-US', 'GMT')
    const props = {
      description: 'date_time',
      dateRenderLabel: 'date-input',
      screenReaderLabels: {
        calendarIcon: 'Open calendar',
        prevMonthButton: 'Previous month',
        nextMonthButton: 'Next month'
      },
      timeRenderLabel: 'time-input',
      invalidDateTimeMessage: 'whoops',
      value: dateTime.toISOString(),
      onChange,
      locale: 'en-US',
      timezone: 'US/Eastern'
    }

    const { container, rerender } = render(<DateTimeInput {...props} />)
    expect(container).toHaveTextContent('Monday, May 1, 2017 1:30 PM')

    rerender(<DateTimeInput {...props} messageFormat="l, LT" />)
    fireEvent.blur(screen.getByLabelText('date-input'))

    await waitFor(() => {
      expect(container).toHaveTextContent('5/1/2017, 1:30 PM')
    })
  })

  it('should update Date and Time inputs when value prop changes', async () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const dateTime = DateTime.parse('2017-05-01T17:30Z', locale, timezone)
    const props = {
      description: 'date_time',
      dateRenderLabel: 'date-input',
      screenReaderLabels: {
        calendarIcon: 'Open calendar',
        prevMonthButton: 'Previous month',
        nextMonthButton: 'Next month'
      },
      timeRenderLabel: 'time-input',
      invalidDateTimeMessage: 'whoops',
      locale,
      timezone,
      value: dateTime.toISOString()
    }
    const { container, rerender } = render(<DateTimeInput {...props} />)
    expect(container).toHaveTextContent('May 1, 2017 1:30 PM')

    const newDateStr = '2022-03-29T19:00Z'

    rerender(<DateTimeInput {...props} value={newDateStr} />)
    const dateInput = screen.getByLabelText('date-input')
    const timeInput = screen.getByLabelText('time-input')

    fireEvent.blur(dateInput)

    await waitFor(() => {
      expect(dateInput).toHaveValue('3/29/2022')
      expect(timeInput).toHaveValue('3:00 PM')
    })
  })

  it("should throw warning if date select and initialTimeForNewDate prop's value is not HH:MM", async () => {
    const initialTimeForNewDate = 'WRONG_FORMAT'

    render(
      <DateTimeInput
        description="date_time"
        dateRenderLabel="date-input"
        screenReaderLabels={{
          calendarIcon: 'Open calendar',
          prevMonthButton: 'Previous month',
          nextMonthButton: 'Next month'
        }}
        timeRenderLabel="time-input"
        invalidDateTimeMessage="whoops"
        locale={'en-US'}
        timezone={'US/Eastern'}
        initialTimeForNewDate={initialTimeForNewDate}
      />
    )

    const dateInput = screen.getByLabelText('date-input')

    fireEvent.change(dateInput, { target: { value: 'May 1, 2017' } })
    fireEvent.keyDown(dateInput, { key: 'Enter', code: 'Enter' })
    fireEvent.blur(dateInput)

    await waitFor(() => {
      expect(consoleErrorMock.mock.calls[0][0]).toBe(
        `Warning: [DateTimeInput] initialTimeForNewDate prop is not in the correct format. Please use HH:MM format.`
      )
    })
  })

  it('should throw warning if initialTimeForNewDate prop hour and minute values are not in interval', async () => {
    const initialTimeForNewDate = '99:99'

    render(
      <DateTimeInput
        description="date_time"
        dateRenderLabel="date-input"
        screenReaderLabels={{
          calendarIcon: 'Open calendar',
          prevMonthButton: 'Previous month',
          nextMonthButton: 'Next month'
        }}
        timeRenderLabel="time-input"
        invalidDateTimeMessage="whoops"
        locale={'en-US'}
        timezone={'US/Eastern'}
        initialTimeForNewDate={initialTimeForNewDate}
      />
    )
    const dateInput = screen.getByLabelText('date-input')

    fireEvent.change(dateInput, { target: { value: 'May 1, 2017' } })
    fireEvent.keyDown(dateInput, { key: 'Enter', code: 'Enter' })
    fireEvent.blur(dateInput)

    await waitFor(() => {
      expect(consoleErrorMock.mock.calls[0][0]).toEqual(
        expect.stringContaining(
          `Warning: [DateTimeInput] 0 <= hour < 24 and 0 <= minute < 60 for initialTimeForNewDate prop.`
        )
      )
    })
  })

  it('should initial render prefer defaultValue time over initialTimeForNewDate', async () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const initialTimeForNewDate = '16:16'
    const defaultValue = '2018-01-18T13:30'

    const { container } = render(
      <DateTimeInput
        description="date_time"
        dateRenderLabel="date-input"
        screenReaderLabels={{
          calendarIcon: 'Open calendar',
          prevMonthButton: 'Previous month',
          nextMonthButton: 'Next month'
        }}
        timeRenderLabel="time-input"
        invalidDateTimeMessage="whoops"
        defaultValue={defaultValue}
        locale={locale}
        timezone={timezone}
        initialTimeForNewDate={initialTimeForNewDate}
      />
    )
    const timeInput = screen.getByLabelText('time-input')

    expect(timeInput).toHaveValue('1:30 PM')
    expect(container).toHaveTextContent('Thursday, January 18, 2018 1:30 PM')
  })

  it('should parse ISO format date typed into the date input', async () => {
    // In v1, DateTimeInput parsed typed text using moment with the full default format
    // list which included ISO_8601. In v2 the parser only uses [this.props.dateFormat]
    // ("LL" by default) as a hint. This test verifies that typing an ISO date string
    // still works correctly after the switch to DateInput v2.
    const onChange = vi.fn()
    render(
      <DateTimeInput
        description="date_time"
        dateRenderLabel="date-input"
        timeRenderLabel="time-input"
        screenReaderLabels={{
          calendarIcon: 'Open calendar',
          prevMonthButton: 'Previous month',
          nextMonthButton: 'Next month'
        }}
        invalidDateTimeMessage="whoops"
        locale="en-US"
        timezone="US/Eastern"
        onChange={onChange}
      />
    )
    const dateInput = screen.getByLabelText('date-input')

    await userEvent.type(dateInput, '2017-05-01')
    fireEvent.blur(dateInput)

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled()
      expect(onChange.mock.calls[0][1]).toContain('2017-05-01')
      expect(dateInput).toHaveValue('5/1/2017')
    })
  })

  it('should preserve the selected time when a new date is picked from the calendar', async () => {
    // In v1, calendar day clicks went through handleDayClick which called
    // recalculateState directly in a single setState. In v2, DateInput fires
    // onChange (→ handleDateTextChange) then onRequestValidateDate (→ handleDateValidated)
    // synchronously, resulting in two setState calls. This means handleDateValidated
    // reads this.state.timeSelectValue from the pre-update state. This test verifies
    // that React 18 batching keeps the state consistent and the existing time is
    // correctly preserved when the user picks a new date from the calendar.
    const onChange = vi.fn()
    const locale = 'en-US'
    const timezone = 'US/Eastern'

    render(
      <DateTimeInput
        description="date_time"
        dateRenderLabel="date-input"
        timeRenderLabel="time-input"
        screenReaderLabels={{
          calendarIcon: 'Open calendar',
          prevMonthButton: 'Previous month',
          nextMonthButton: 'Next month'
        }}
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        defaultValue="2017-05-01T17:30Z"
        onChange={onChange}
      />
    )

    const calendarButton = screen.getByRole('button', { name: 'Open calendar' })
    await userEvent.click(calendarButton)

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: '15 May 2017' })
      ).toBeInTheDocument()
    })
    await userEvent.click(screen.getByRole('button', { name: '15 May 2017' }))

    await waitFor(() => {
      expect(screen.getByLabelText('date-input')).toHaveValue('5/15/2017')
      expect(screen.getByLabelText('time-input')).toHaveValue('1:30 PM')
      expect(onChange).toHaveBeenCalled()
      expect(onChange.mock.calls[0][1]).toContain('2017-05-15')
    })
  })

  it('should normalize the typed date and emit the correct ISO on blur', async () => {
    // DateInput v2 introduced input normalization on blur, which did not exist in v1.
    // If the user types a valid but non-canonical string (e.g. "May 1 2017" without
    // comma), DateInput v2 fires an extra onChange with the normalized form ("May 1, 2017")
    // before onRequestValidateDate. DateTimeInput must handle this correctly: the
    // displayed value should be normalized and onChange should fire with the correct ISO.
    const onChange = vi.fn()
    render(
      <DateTimeInput
        description="date_time"
        dateRenderLabel="date-input"
        timeRenderLabel="time-input"
        screenReaderLabels={{
          calendarIcon: 'Open calendar',
          prevMonthButton: 'Previous month',
          nextMonthButton: 'Next month'
        }}
        invalidDateTimeMessage="whoops"
        locale="en-US"
        timezone="US/Eastern"
        onChange={onChange}
      />
    )
    const dateInput = screen.getByLabelText('date-input')

    await userEvent.type(dateInput, 'May 1 2017')
    fireEvent.blur(dateInput)

    await waitFor(() => {
      expect(dateInput).toHaveValue('5/1/2017')
      expect(onChange).toHaveBeenCalled()
      expect(onChange.mock.calls[0][1]).toContain('2017-05-01')
    })
  })

  describe('dateFormat parsing regression from v1: formats v1 accepted but v2 rejects', () => {
    // DateTimeInput v1 used DateInput v1 which tried many moment formats:
    // [ISO, 'llll', 'LLLL', 'lll', 'LLL', 'll', 'LL', 'l', 'L'].
    // DateTimeInput v2 uses a custom parser that only tries [momentISOFormat, dateFormat]
    // (default 'LL'). The tests below document the regression: these inputs were
    // accepted in v1 but are currently rejected in v2. They should pass once fixed.
    const renderComponent = (onChange = vi.fn()) =>
      render(
        <DateTimeInput
          description="date_time"
          dateRenderLabel="date-input"
          timeRenderLabel="time-input"
          screenReaderLabels={{
            calendarIcon: 'Open calendar',
            prevMonthButton: 'Previous month',
            nextMonthButton: 'Next month'
          }}
          invalidDateTimeMessage="whoops"
          locale="en-US"
          timezone="US/Eastern"
          onChange={onChange}
        />
      )

    it('should accept abbreviated month name (ll format: "Sep 4, 1986")', async () => {
      const onChange = vi.fn()
      renderComponent(onChange)
      const dateInput = screen.getByLabelText('date-input')

      await userEvent.type(dateInput, 'Sep 4, 1986')
      fireEvent.blur(dateInput)

      await waitFor(() => {
        expect(screen.queryByText('whoops')).not.toBeInTheDocument()
        expect(onChange).toHaveBeenCalled()
        expect(onChange.mock.calls[0][1]).toContain('1986-09-04')
      })
    })

    it('should accept numeric date with leading zeros (L format: "09/04/1986")', async () => {
      const onChange = vi.fn()
      renderComponent(onChange)
      const dateInput = screen.getByLabelText('date-input')

      await userEvent.type(dateInput, '09/04/1986')
      fireEvent.blur(dateInput)

      await waitFor(() => {
        expect(screen.queryByText('whoops')).not.toBeInTheDocument()
        expect(onChange).toHaveBeenCalled()
        expect(onChange.mock.calls[0][1]).toContain('1986-09-04')
      })
    })

    it('should accept numeric date without leading zeros (l format: "9/4/1986")', async () => {
      const onChange = vi.fn()
      renderComponent(onChange)
      const dateInput = screen.getByLabelText('date-input')

      await userEvent.type(dateInput, '9/4/1986')
      fireEvent.blur(dateInput)

      await waitFor(() => {
        expect(screen.queryByText('whoops')).not.toBeInTheDocument()
        expect(onChange).toHaveBeenCalled()
        expect(onChange.mock.calls[0][1]).toContain('1986-09-04')
      })
    })

    it('should accept date with time component (LLL format: "September 4, 1986 8:30 PM")', async () => {
      const onChange = vi.fn()
      renderComponent(onChange)
      const dateInput = screen.getByLabelText('date-input')

      await userEvent.type(dateInput, 'September 4, 1986 8:30 PM')
      fireEvent.blur(dateInput)

      await waitFor(() => {
        expect(screen.queryByText('whoops')).not.toBeInTheDocument()
        expect(onChange).toHaveBeenCalled()
        expect(onChange.mock.calls[0][1]).toContain('1986-09-05')
      })
    })
  })

  it('should render the year picker in the calendar when withYearPicker is set', async () => {
    render(
      <DateTimeInput
        description="date_time"
        dateRenderLabel="date-input"
        timeRenderLabel="time-input"
        screenReaderLabels={{
          calendarIcon: 'Open calendar',
          prevMonthButton: 'Previous month',
          nextMonthButton: 'Next month'
        }}
        invalidDateTimeMessage="whoops"
        locale="en-US"
        timezone="US/Eastern"
        defaultValue="2017-05-01T00:00Z"
        withYearPicker={{
          screenReaderLabel: 'Pick a year',
          startYear: 2000,
          endYear: 2030
        }}
      />
    )

    const calendarButton = screen.getByRole('button', { name: 'Open calendar' })
    await userEvent.click(calendarButton)

    await waitFor(() => {
      const yearPicker = screen.getByRole('combobox', {
        description: 'Pick a year'
      })
      expect(yearPicker).toBeInTheDocument()
      expect(yearPicker).toHaveValue('2017')
    })
  })

  it('should call consumer onChange exactly once when typing a short-format date and blurring', async () => {
    const onChange = vi.fn()
    render(
      <DateTimeInput
        description="date_time"
        screenReaderLabels={{
          calendarIcon: 'Open calendar',
          prevMonthButton: 'Previous month',
          nextMonthButton: 'Next month'
        }}
        dateRenderLabel="date-input"
        timeRenderLabel="time-input"
        invalidDateTimeMessage="whoops"
        locale="en-US"
        timezone="US/Eastern"
        onChange={onChange}
      />
    )
    const dateInput = screen.getByLabelText('date-input')

    await userEvent.type(dateInput, '9/1/2017')
    fireEvent.blur(dateInput)

    await waitFor(() => {
      expect(dateInput).toHaveValue('9/1/2017')
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange.mock.calls[0][1]).toContain('2017-09-01')
    })
  })

  describe('date input placeholder', () => {
    const defaultProps = {
      description: 'date_time',
      screenReaderLabels: {
        calendarIcon: 'Open calendar',
        prevMonthButton: 'Previous month',
        nextMonthButton: 'Next month'
      },
      dateRenderLabel: 'date-input',
      timeRenderLabel: 'time-input',
      invalidDateTimeMessage: 'whoops'
    } as const

    it('uses datePlaceholder when provided', () => {
      render(
        <DateTimeInput
          {...defaultProps}
          locale="en-US"
          timezone="US/Eastern"
          datePlaceholder="Pick a date"
        />
      )
      expect(screen.getByLabelText('date-input')).toHaveAttribute(
        'placeholder',
        'Pick a date'
      )
    })

    it('shows built-in format hint when datePlaceholder is omitted', () => {
      render(
        <DateTimeInput {...defaultProps} locale="en-US" timezone="US/Eastern" />
      )
      expect(
        screen.getByLabelText('date-input').getAttribute('placeholder')
      ).toBeTruthy()
    })
  })
})
