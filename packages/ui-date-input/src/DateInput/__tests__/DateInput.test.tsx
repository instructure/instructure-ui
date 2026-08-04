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
import { fireEvent } from '@testing-library/dom'
import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import { describe, it, expect, vi } from 'vitest'
import { HeartInstUIIcon } from '@instructure/ui-icons'
import { ApplyLocale } from '@instructure/ui-i18n'

import { DateInput } from '@instructure/ui-date-input/latest'
import { TextInput } from '@instructure/ui-text-input/latest'

import {
  clickElement,
  dateInputElement,
  dayButton,
  mockConsole,
  openCalendar,
  waitFor2ms
} from './dateInputTestHelpers'

const LABEL_TEXT = 'Choose a date'

const DateInputExample = () => {
  const [inputValue, setInputValue] = useState('')

  return (
    <DateInput
      renderLabel={LABEL_TEXT}
      screenReaderLabels={{
        calendarIcon: 'Calendar',
        nextMonthButton: 'Next month',
        prevMonthButton: 'Previous month',
        datePickerDialog: 'Date picker',
        selectedLabel: 'Selected'
      }}
      value={inputValue}
      onChange={(_e, inputValue, _dateString) => {
        setInputValue(inputValue)
      }}
    />
  )
}

const TIMEZONES_DST = [
  { timezone: 'UTC', expectedDateIsoString: '2020-04-17T00:00:00.000Z' }, // Coordinated Universal Time UTC
  {
    timezone: 'America/New_York',
    expectedDateIsoString: '2020-04-17T04:00:00.000Z'
  }, // Eastern Time (US & Canada) UTC -4 (Daylight Saving Time)
  {
    timezone: 'America/Los_Angeles',
    expectedDateIsoString: '2020-04-17T07:00:00.000Z'
  }, // Pacific Time (US & Canada) UTC -7 (Daylight Saving Time)
  {
    timezone: 'Europe/London',
    expectedDateIsoString: '2020-04-16T23:00:00.000Z'
  }, // United Kingdom Time UTC +1 (Daylight Saving Time)
  {
    timezone: 'Europe/Paris',
    expectedDateIsoString: '2020-04-16T22:00:00.000Z'
  }, // Central European Time UTC +2 (Daylight Saving Time)
  { timezone: 'Asia/Tokyo', expectedDateIsoString: '2020-04-16T15:00:00.000Z' }, // Japan Standard Time UTC +9 (No DST)
  {
    timezone: 'Australia/Sydney',
    expectedDateIsoString: '2020-04-16T14:00:00.000Z'
  }, // Australia Eastern Time UTC +10 (Daylight Saving Time ended in April)
  {
    timezone: 'Asia/Kolkata',
    expectedDateIsoString: '2020-04-16T18:30:00.000Z'
  }, // India Standard Time UTC +5:30 (No DST)
  {
    timezone: 'Africa/Johannesburg',
    expectedDateIsoString: '2020-04-16T22:00:00.000Z'
  }, // South Africa Standard Time UTC +2 (No DST)
  {
    timezone: 'Asia/Kathmandu',
    expectedDateIsoString: '2020-04-16T18:15:00.000Z'
  } // Nepal Standard Time UTC +5:45 (No DST)
]

const TIMEZONES_NON_DST = [
  { timezone: 'UTC', expectedDateIsoString: '2020-02-17T00:00:00.000Z' }, // Coordinated Universal Time UTC
  {
    timezone: 'America/New_York',
    expectedDateIsoString: '2020-02-17T05:00:00.000Z'
  }, // Eastern Time (US & Canada) UTC -5 (Standard Time)
  {
    timezone: 'America/Los_Angeles',
    expectedDateIsoString: '2020-02-17T08:00:00.000Z'
  }, // Pacific Time (US & Canada) UTC -8 (Standard Time)
  {
    timezone: 'Europe/London',
    expectedDateIsoString: '2020-02-17T00:00:00.000Z'
  }, // United Kingdom Time UTC +0 (Standard Time)
  {
    timezone: 'Europe/Paris',
    expectedDateIsoString: '2020-02-16T23:00:00.000Z'
  }, // Central European Time UTC +1 (Standard Time)
  { timezone: 'Asia/Tokyo', expectedDateIsoString: '2020-02-16T15:00:00.000Z' }, // Japan Standard Time UTC +9 (No DST)
  {
    timezone: 'Australia/Sydney',
    expectedDateIsoString: '2020-02-16T13:00:00.000Z'
  }, // Australia Eastern Time UTC +11 (Standard Time)
  {
    timezone: 'Asia/Kolkata',
    expectedDateIsoString: '2020-02-16T18:30:00.000Z'
  }, // India Standard Time UTC +5:30 (No DST)
  {
    timezone: 'Africa/Johannesburg',
    expectedDateIsoString: '2020-02-16T22:00:00.000Z'
  }, // South Africa Standard Time UTC +2 (No DST)
  {
    timezone: 'Asia/Kathmandu',
    expectedDateIsoString: '2020-02-16T18:15:00.000Z'
  } // Nepal Standard Time UTC +5:45 (No DST)
]

type ConfigurableDateInputExampleProps = {
  initialValue?: string
  timezone?: string
  locale?: string
  onChange?: (...args: any[]) => void
  onRequestValidateDate?: (...args: any[]) => void
}

const ConfigurableDateInputExample = ({
  initialValue = '',
  timezone = 'UTC',
  locale = 'en-GB',
  onChange = vi.fn(),
  onRequestValidateDate
}: ConfigurableDateInputExampleProps) => {
  const [inputValue, setInputValue] = useState(initialValue)

  return (
    <DateInput
      renderLabel="Choose a date"
      screenReaderLabels={{
        calendarIcon: 'Calendar',
        nextMonthButton: 'Next month',
        prevMonthButton: 'Previous month',
        datePickerDialog: 'Date picker',
        selectedLabel: 'Selected'
      }}
      value={inputValue}
      timezone={timezone}
      locale={locale}
      onChange={(_e, newInputValue, newDateString) => {
        setInputValue(newInputValue)
        onChange(_e, newInputValue, newDateString)
      }}
      {...(onRequestValidateDate && { onRequestValidateDate })}
    />
  )
}

describe('<DateInput />', () => {
  mockConsole()

  it('should render an input', async () => {
    const { container } = await render(<DateInputExample />)
    const dateInput = container.querySelector('input')

    expect(dateInput).toBeInTheDocument()
    expect(dateInput).toHaveAttribute('type', 'text')
  })

  it('should render an input label', async () => {
    const { container } = await render(<DateInputExample />)

    const label = container.querySelector('label')

    expect(label).toBeInTheDocument()
    expect(label).toHaveTextContent(LABEL_TEXT)
  })

  it('should render an input placeholder', async () => {
    const placeholder = 'Placeholder'
    await render(
      <DateInput
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month',
          datePickerDialog: 'Date picker',
          selectedLabel: 'Selected'
        }}
        placeholder={placeholder}
        value=""
      />
    )
    const dateInput = page.getByLabelText('Choose a date').element()

    expect(dateInput).toHaveAttribute('placeholder', placeholder)
  })

  it('should render a calendar icon with screen reader label', async () => {
    const iconLabel = 'Calendar icon Label'
    const { container } = await render(
      <DateInput
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: iconLabel,
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month',
          datePickerDialog: 'Date picker',
          selectedLabel: 'Selected'
        }}
        value=""
      />
    )
    const calendarIcon = container.querySelector('svg[name="Calendar"]')
    const calendarLabel = page.getByText(iconLabel).element()

    expect(calendarIcon).toBeInTheDocument()
    expect(calendarLabel).toBeInTheDocument()
  })

  it('refs should return the underlying component', async () => {
    const inputRef = vi.fn()
    const ref: React.Ref<TextInput> = { current: null }
    const { container } = await render(
      <DateInput
        id="dateInput"
        inputRef={inputRef}
        ref={ref}
        renderLabel={LABEL_TEXT}
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month',
          datePickerDialog: 'Date picker',
          selectedLabel: 'Selected'
        }}
      />
    )
    const dateInput = container.querySelector('input')
    expect(inputRef).toHaveBeenCalledWith(dateInput)
    expect(ref.current!.props.id).toBe('dateInput')
    expect(dateInput).toBeInTheDocument()
  })

  it('should render a custom calendar icon with screen reader label', async () => {
    const iconLabel = 'Calendar icon Label'
    const { container } = await render(
      <DateInput
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: iconLabel,
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month',
          datePickerDialog: 'Date picker',
          selectedLabel: 'Selected'
        }}
        value=""
        renderCalendarIcon={<HeartInstUIIcon />}
      />
    )
    const calendarIcon = container.querySelector('svg[name="Heart"]')
    const calendarLabel = page.getByText(iconLabel).element()

    expect(calendarIcon).toBeInTheDocument()
    expect(calendarLabel).toBeInTheDocument()
  })

  it('should not show calendar table by default', async () => {
    await render(<DateInputExample />)
    const calendarTable = page.getByRole('table').query()

    expect(calendarTable).not.toBeInTheDocument()
  })

  it('should show calendar table when calendar button is clicked', async () => {
    await render(<DateInputExample />)
    const calendarButton = page.getByRole('button').element()

    expect(calendarButton).toBeInTheDocument()

    clickElement(calendarButton)

    await waitFor2ms(() => {
      const calendarTable = page.getByRole('table').query()
      expect(calendarTable).toBeInTheDocument()
    })
  })

  it('should render navigation arrow buttons with screen reader labels', async () => {
    const nextMonthLabel = 'Next month'
    const prevMonthLabel = 'Previous month'

    await render(
      <DateInput
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: nextMonthLabel,
          prevMonthButton: prevMonthLabel,
          datePickerDialog: 'Date picker',
          selectedLabel: 'Selected'
        }}
        value=""
      />
    )
    const calendarButton = page.getByRole('button').element()

    clickElement(calendarButton)

    await waitFor2ms(() => {
      const prevMonthButton = page
        .getByRole('button', {
          name: new RegExp(`^${prevMonthLabel}`)
        })
        .element()
      const nextMonthButton = page
        .getByRole('button', {
          name: new RegExp(`^${nextMonthLabel}`)
        })
        .element()

      expect(prevMonthButton).toBeInTheDocument()
      expect(nextMonthButton).toBeInTheDocument()

      const prevMonthIcon = prevMonthButton.querySelector(
        'svg[name="ChevronLeft"]'
      )
      const nextMonthIcon = nextMonthButton.querySelector(
        'svg[name="ChevronRight"]'
      )

      expect(prevMonthIcon).toBeInTheDocument()
      expect(nextMonthIcon).toBeInTheDocument()
    })
  })

  it('should programmatically set and render the initial value', async () => {
    const value = '26/03/2024'
    await render(
      <DateInput
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month',
          datePickerDialog: 'Date picker',
          selectedLabel: 'Selected'
        }}
        locale="en-GB"
        timezone="UTC"
        value={value}
      />
    )
    const dateInput = page.getByLabelText('Choose a date').element()

    expect(dateInput).toHaveValue(value)
    expect(dateInput).toBeInTheDocument()
  })

  it('should set interaction type to disabled', async () => {
    const interactionDisabled = 'disabled'
    const { container } = await render(
      <DateInput
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month',
          datePickerDialog: 'Date picker',
          selectedLabel: 'Selected'
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
    const { container } = await render(
      <DateInput
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month',
          datePickerDialog: 'Date picker',
          selectedLabel: 'Selected'
        }}
        value=""
        interaction={interactionReadOnly}
      />
    )
    const dateInput = container.querySelector('input')
    const calendarButton = page.getByRole('button').element()

    expect(dateInput).toHaveAttribute(interactionReadOnly)
    expect(calendarButton).toBeInTheDocument()

    // `force` because Playwright refuses to click the disabled trigger
    clickElement(calendarButton)

    await waitFor2ms(() => {
      const calendarTable = page.getByRole('table').query()

      expect(calendarTable).not.toBeInTheDocument()
    })
  })

  it('should set required', async () => {
    const { container } = await render(
      <DateInput
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month',
          datePickerDialog: 'Date picker',
          selectedLabel: 'Selected'
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
    await render(
      <DateInput
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month',
          datePickerDialog: 'Date picker',
          selectedLabel: 'Selected'
        }}
        value=""
        onBlur={onBlur}
      />
    )
    const dateInput = page.getByLabelText('Choose a date').element()

    fireEvent.focusOut(dateInput)

    await waitFor2ms(() => {
      expect(onBlur).toHaveBeenCalled()
    })
  })

  it('should validate if the invalidDateErrorMessage prop is provided', async () => {
    const errorMsg = 'errorMsg'
    const Example = () => {
      const [inputValue, setInputValue] = useState('')

      return (
        <DateInput
          renderLabel={LABEL_TEXT}
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month',
            datePickerDialog: 'Date picker',
            selectedLabel: 'Selected'
          }}
          value={inputValue}
          onChange={(_e, inputValue, _dateString) => {
            setInputValue(inputValue)
          }}
          invalidDateErrorMessage={errorMsg}
        />
      )
    }

    await render(<Example />)

    expect(page.getByText(errorMsg).query()).not.toBeInTheDocument()

    const dateInput = page.getByLabelText(LABEL_TEXT).element()

    clickElement(dateInput)
    await userEvent.type(dateInput, 'Not a date')

    dateInput.blur()

    await waitFor2ms(() => {
      expect(page.getByText(errorMsg).element()).toBeInTheDocument()
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

    await render(
      <DateInput
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month',
          datePickerDialog: 'Date picker',
          selectedLabel: 'Selected'
        }}
        value=""
        messages={messages}
      />
    )

    expect(page.getByText('TypeLess').element()).toBeVisible()
    expect(page.getByText('Error').element()).toBeVisible()
    expect(page.getByText('Success').element()).toBeVisible()
    expect(page.getByText('Hint').element()).toBeVisible()

    const screenreaderMessage = page.getByText('Screenreader').element()
    expect(screenreaderMessage).toBeInTheDocument()
    expect(screenreaderMessage).toHaveClass(/screenReaderContent/)
  })

  it('should render date picker dialog with proper role and ARIA label', async () => {
    const datePickerLabel = 'Date picker'

    await render(
      <DateInput
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month',
          datePickerDialog: datePickerLabel,
          selectedLabel: 'Selected'
        }}
        value=""
      />
    )

    const calendarButton = page
      .getByRole('button', { name: 'Calendar' })
      .element()
    clickElement(calendarButton)

    await waitFor2ms(() => {
      const dialog = page
        .getByRole('dialog', { name: datePickerLabel })
        .element()
      expect(dialog).toBeInTheDocument()
      expect(dialog).toHaveAttribute('aria-label', datePickerLabel)
    })
  })

  // The tests below were ported from the DateInput Cypress spec

  it('should have screen reader labels for weekday headers', async () => {
    const expectedWeekdays = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ]
    await render(<ConfigurableDateInputExample />)

    await openCalendar()

    const headers = document.querySelectorAll(
      'th[class*="-calendar__weekdayHeader"]'
    )

    expect(headers).toHaveLength(expectedWeekdays.length)
    headers.forEach((header, index) => {
      expect(
        header.querySelector('span[class*="-screenReaderContent"]')!.textContent
      ).toBe(expectedWeekdays[index])
    })
  })

  it('should have screen reader labels for calendar days', async () => {
    // set system date to 2022 march
    vi.useFakeTimers({ shouldAdvanceTime: true })
    vi.setSystemTime(new Date(2022, 2, 26))

    await render(<ConfigurableDateInputExample />)

    await openCalendar()

    const days = document.querySelectorAll('button[class*="-calendarDay"]')

    expect(days.length).toBeGreaterThan(0)
    days.forEach((day) => {
      const label = day.querySelector('span[class*="-screenReaderContent"]')

      expect(label).toBeInTheDocument()
      expect(label).not.toBeEmptyDOMElement()
    })

    expect(
      dayButton('10').querySelector('span[class*="-screenReaderContent"]')!
        .textContent
    ).toBe('10 March 2022')
    expect(
      dayButton('17').querySelector('span[class*="-screenReaderContent"]')!
        .textContent
    ).toBe('17 March 2022')
  })

  it('should open and close calendar properly and set value when select date from calendar', async () => {
    // Calendar opens on the current month, so freeze the clock to keep the
    // selected-day value deterministic (otherwise it tracks the run date).
    vi.useFakeTimers({ shouldAdvanceTime: true })
    vi.setSystemTime(new Date(2024, 9, 15))

    await render(<ConfigurableDateInputExample />)

    expect(dateInputElement()).toHaveValue('')
    expect(document.querySelector('table')).not.toBeInTheDocument()

    await openCalendar()

    clickElement(dayButton('17'))

    await waitFor2ms(() => {
      expect(dateInputElement()).toHaveValue('17/10/2024')
      expect(document.querySelector('table')).not.toBeInTheDocument()
    })
  })

  it('should select and highlight the correct day on Calendar when value is set', async () => {
    await render(
      <ConfigurableDateInputExample
        initialValue="17/03/2022"
        timezone="UTC"
        locale="en-GB"
      />
    )

    expect(dateInputElement()).toHaveValue('17/03/2022')

    await openCalendar()

    const navigation = document.querySelector(
      'div[class*="navigation-calendar"]'
    )

    expect(navigation).toHaveTextContent('March')
    expect(navigation).toHaveTextContent('2022')

    // Get day 16 background color for comparison
    const controlDayBgColor = getComputedStyle(
      dayButton('16').querySelector('span[class$="-calendarDay__day"]')!
    ).backgroundColor

    // Compare it to the highlighted day 17
    const highlightedDayBgColor = getComputedStyle(
      dayButton('17').querySelector('span[class$="-calendarDay__day"]')!
    ).backgroundColor

    expect(controlDayBgColor).not.toEqual(highlightedDayBgColor)
  })

  it('should call onChange with the new typed value', async () => {
    const newValue = '26/03/2021'
    const expectedDateIsoString = new Date(Date.UTC(2021, 2, 26)).toISOString()
    const onChange = vi.fn()
    await render(
      <ConfigurableDateInputExample
        onChange={onChange}
        locale={'en-GB'}
        timezone={'UTC'}
      />
    )

    const dateInput = dateInputElement()

    await userEvent.fill(dateInput, newValue)
    dateInput.blur()

    await waitFor2ms(() => {
      expect(onChange).toHaveBeenCalledWith(
        expect.anything(),
        newValue,
        expectedDateIsoString
      )
    })
  })

  it('should respect given local and timezone', async () => {
    const expectedFormattedValue = '17/10/2022'
    const expectedDateIsoString = '2022-10-16T21:00:00.000Z' // Africa/Nairobi is GMT +3
    const onChange = vi.fn()
    await render(
      <ApplyLocale locale="hu" timezone="UTC">
        <DateInput
          renderLabel="Choose a date"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month',
            datePickerDialog: 'Date picker',
            selectedLabel: 'Selected'
          }}
          locale="fr"
          timezone="Africa/Nairobi"
          value="26/10/2022"
          onChange={onChange}
        />
      </ApplyLocale>
    )

    await openCalendar()

    const weekdayHeader = document.querySelectorAll('thead th')[2]

    expect(
      weekdayHeader.querySelector('[class*="screenReaderContent"]')!.textContent
    ).toBe('mercredi')
    expect(
      weekdayHeader.querySelector('[aria-hidden="true"]')!.textContent
    ).toBe('me')

    clickElement(dayButton('17'))

    await waitFor2ms(() => {
      expect(onChange).toHaveBeenCalledWith(
        expect.anything(),
        expectedFormattedValue,
        expectedDateIsoString
      )
    })
  })

  it('should read local and timezone information from environment context', async () => {
    const expectedFormattedValue = '2022. 10. 17.'
    const expectedDateIsoString = '2022-10-17T00:00:00.000Z'
    const onChange = vi.fn()

    await render(
      <ApplyLocale locale="hu" timezone="UTC">
        <DateInput
          renderLabel="Choose a date"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month',
            datePickerDialog: 'Date picker',
            selectedLabel: 'Selected'
          }}
          value="2022. 10. 26."
          onChange={onChange}
        />
      </ApplyLocale>
    )

    await openCalendar()

    const weekdayHeader = document.querySelectorAll('thead th')[2]

    expect(
      weekdayHeader.querySelector('[class*="screenReaderContent"]')!.textContent
    ).toBe('szerda')
    expect(
      weekdayHeader.querySelector('[aria-hidden="true"]')!.textContent
    ).toBe('sze')

    clickElement(dayButton('17'))

    await waitFor2ms(() => {
      expect(onChange).toHaveBeenCalledWith(
        expect.anything(),
        expectedFormattedValue,
        expectedDateIsoString
      )
    })
  })

  it('should change separators according to locale', async () => {
    await render(<ConfigurableDateInputExample locale={'hu'} />)

    const dateInput = dateInputElement()

    await userEvent.fill(dateInput, '2022-03 26')
    dateInput.blur()

    await waitFor2ms(() => {
      expect(dateInput).toHaveValue('2022. 03. 26.')
    })

    await userEvent.fill(dateInput, '2022,03/26')
    dateInput.blur()

    await waitFor2ms(() => {
      expect(dateInput).toHaveValue('2022. 03. 26.')
    })
  })

  it('should change leading zero according to locale', async () => {
    // every locale gets its own render, so the inputs are looked up in the
    // container of the render they belong to
    const spanish = await render(
      <ConfigurableDateInputExample locale={'es-ES'} />
    )
    const spanishInput = spanish.container.querySelector('input')!

    await userEvent.fill(spanishInput, '06.03.2022')
    spanishInput.blur()

    await waitFor2ms(() => {
      expect(spanishInput).toHaveValue('6/3/2022')
    })

    const polish = await render(<ConfigurableDateInputExample locale={'pl'} />)
    const polishInput = polish.container.querySelector('input')!

    await userEvent.fill(polishInput, '06/3/2022')
    polishInput.blur()

    await waitFor2ms(() => {
      expect(polishInput).toHaveValue('6.03.2022')
    })

    const afrikaans = await render(
      <ConfigurableDateInputExample locale={'af'} />
    )
    const afrikaansInput = afrikaans.container.querySelector('input')!

    await userEvent.fill(afrikaansInput, '2022,3,6')
    afrikaansInput.blur()

    await waitFor2ms(() => {
      expect(afrikaansInput).toHaveValue('2022-03-06')
    })
  })

  it('should dateFormat prop respect the provided local', async () => {
    const Example = () => {
      const [value, setValue] = useState('')

      return (
        <DateInput
          renderLabel="Choose a date"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month',
            datePickerDialog: 'Date picker',
            selectedLabel: 'Selected'
          }}
          value={value}
          locale="en-GB"
          timezone="UTC"
          dateFormat="hu"
          onChange={(_e, value) => setValue(value)}
        />
      )
    }

    // set system date to 2022 march
    vi.useFakeTimers({ shouldAdvanceTime: true })
    vi.setSystemTime(new Date(2022, 2, 26))

    await render(<Example />)

    expect(dateInputElement()).toHaveValue('')

    await openCalendar()

    clickElement(dayButton('17'))

    await waitFor2ms(() => {
      expect(dateInputElement()).toHaveValue('2022. 03. 17.')
    })
  })

  TIMEZONES_DST.forEach(({ timezone, expectedDateIsoString }) => {
    it(`should apply correct timezone and daylight saving adjustments in DST period for: ${timezone}`, async () => {
      const onChange = vi.fn()
      const initialDate = new Date(Date.UTC(2020, 3, 26)).toLocaleDateString(
        'en-GB'
      )
      const expectedFormattedValue = '17/04/2020'

      await render(
        <ConfigurableDateInputExample
          initialValue={initialDate}
          onChange={onChange}
          locale={'en-GB'}
          timezone={timezone}
        />
      )

      await openCalendar()

      clickElement(dayButton('17'))

      await waitFor2ms(() => {
        expect(dateInputElement()).toHaveValue(expectedFormattedValue)
        expect(onChange).toHaveBeenCalledWith(
          expect.anything(),
          expectedFormattedValue,
          expectedDateIsoString
        )
      })
    })
  })

  TIMEZONES_NON_DST.forEach(({ timezone, expectedDateIsoString }) => {
    it(`should apply correct timezone and daylight saving adjustments in non-DST period for: ${timezone}`, async () => {
      const onChange = vi.fn()
      const initialDate = new Date(Date.UTC(2020, 1, 26)).toLocaleDateString(
        'en-GB'
      )
      const expectedFormattedValue = '17/02/2020'

      await render(
        <ConfigurableDateInputExample
          initialValue={initialDate}
          onChange={onChange}
          locale={'en-GB'}
          timezone={timezone}
        />
      )

      await openCalendar()

      clickElement(dayButton('17'))

      await waitFor2ms(() => {
        expect(dateInputElement()).toHaveValue(expectedFormattedValue)
        expect(onChange).toHaveBeenCalledWith(
          expect.anything(),
          expectedFormattedValue,
          expectedDateIsoString
        )
      })
    })
  })

  it('should set custom value through formatter callback', async () => {
    const customValue = 'customValue'
    const date = new Date(2020, 10, 10)

    const Example = () => {
      const [value, setValue] = useState('')

      return (
        <DateInput
          renderLabel="Choose a date"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month',
            datePickerDialog: 'Date picker',
            selectedLabel: 'Selected'
          }}
          value={value}
          locale="en-GB"
          timezone="UTC"
          dateFormat={{
            parser: () => date,
            formatter: () => customValue
          }}
          onChange={(_e, value) => setValue(value)}
        />
      )
    }
    await render(<Example />)

    expect(dateInputElement()).toHaveValue('')

    await openCalendar()

    clickElement(dayButton('17'))

    await waitFor2ms(() => {
      expect(dateInputElement()).toHaveValue(customValue)
    })
  })

  it('should render year picker based on the withYearPicker prop', async () => {
    // set system date to 2023 march
    vi.useFakeTimers({ shouldAdvanceTime: true })
    vi.setSystemTime(new Date(2023, 2, 26))

    await render(
      <DateInput
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month',
          datePickerDialog: 'Date picker',
          selectedLabel: 'Selected'
        }}
        value=""
        locale="en-GB"
        timezone="UTC"
        withYearPicker={{
          screenReaderLabel: 'Year picker',
          startYear: 2022,
          endYear: 2024
        }}
      />
    )

    await openCalendar()

    const yearPicker = document.querySelector<HTMLInputElement>(
      'input[id^="Select_"]'
    )!

    expect(yearPicker).toHaveValue('2023')
    expect(
      document.querySelector('[id^="Selectable_"][id$="-description"]')!
        .textContent
    ).toBe('Year picker')

    clickElement(yearPicker)

    await waitFor2ms(() => {
      expect(document.querySelector('ul[id^="Selectable_"]')).toBeVisible()
    })

    const options = document.querySelectorAll('[class$="-optionItem"]')

    expect(options).toHaveLength(3)
    expect(options[0]).toHaveTextContent('2024')
    expect(options[1]).toHaveTextContent('2023')
    expect(options[2]).toHaveTextContent('2022')
  })

  it('should set correct value using calendar year picker', async () => {
    const Example = () => {
      const [value, setValue] = useState('')

      return (
        <DateInput
          renderLabel="Choose a date"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month',
            datePickerDialog: 'Date picker',
            selectedLabel: 'Selected'
          }}
          value={value}
          locale="en-GB"
          timezone="UTC"
          onChange={(_e, value) => setValue(value)}
          withYearPicker={{
            screenReaderLabel: 'Year picker',
            startYear: 2022,
            endYear: 2024
          }}
        />
      )
    }

    // set system date to 2023 march
    vi.useFakeTimers({ shouldAdvanceTime: true })
    vi.setSystemTime(new Date(2023, 2, 26))

    await render(<Example />)

    expect(dateInputElement()).toHaveValue('')

    await openCalendar()

    const yearPicker = document.querySelector<HTMLInputElement>(
      'input[id^="Select_"]'
    )!

    expect(yearPicker).toHaveValue('2023')

    clickElement(yearPicker)

    await waitFor2ms(() => {
      expect(document.querySelectorAll('[class$="-optionItem"]')).toHaveLength(
        3
      )
    })

    // `role="option"` carries the click handler; `-optionItem` is its parent
    // <li>, so a synthetic click there would never reach the handler
    clickElement(document.querySelectorAll<HTMLElement>('[role="option"]')[2])

    await waitFor2ms(() => {
      expect(yearPicker).toHaveValue('2022')
    })

    clickElement(dayButton('17'))

    await waitFor2ms(() => {
      expect(dateInputElement()).toHaveValue('17/03/2022')
    })
  })

  it('should display correct year in year picker after date is typed into input', async () => {
    const Example = () => {
      const [value, setValue] = useState('')

      return (
        <DateInput
          renderLabel="Choose a date"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month',
            datePickerDialog: 'Date picker',
            selectedLabel: 'Selected'
          }}
          value={value}
          locale="en-GB"
          timezone="UTC"
          onChange={(_e, value) => setValue(value)}
          withYearPicker={{
            screenReaderLabel: 'Year picker',
            startYear: 2020,
            endYear: 2024
          }}
        />
      )
    }

    await render(<Example />)

    const dateInput = dateInputElement()

    expect(dateInput).toHaveValue('')

    await userEvent.fill(dateInput, '26/03/2021')
    dateInput.blur()

    await waitFor2ms(() => {
      expect(dateInput).toHaveValue('26/03/2021')
    })

    await openCalendar()

    expect(
      document.querySelector<HTMLInputElement>('input[id^="Select_"]')
    ).toHaveValue('2021')
  })

  it('should trigger onRequestValidateDate callback on date selection or blur event', async () => {
    const dateValidationSpy = vi.fn()

    await render(
      <ConfigurableDateInputExample onRequestValidateDate={dateValidationSpy} />
    )

    await openCalendar()

    clickElement(dayButton('17'))

    await waitFor2ms(() => {
      expect(dateValidationSpy).toHaveBeenCalledTimes(1)
    })

    const dateInput = dateInputElement()

    await userEvent.fill(dateInput, '26/03/2020')
    dateInput.blur()

    await waitFor2ms(() => {
      expect(dateValidationSpy).toHaveBeenCalledTimes(2)
    })
  })

  it('should pass necessary props to parser and formatter via dateFormat prop', async () => {
    const userDate = '26/03/2021'
    const parserReturnedDate = new Date(1111, 11, 11)

    const parserSpy = vi.fn(() => parserReturnedDate)
    const formatterSpy = vi.fn(() => '11/11/1111')

    const Example = () => {
      const [value, setValue] = useState('')

      return (
        <DateInput
          renderLabel="Choose a date"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month',
            datePickerDialog: 'Date picker',
            selectedLabel: 'Selected'
          }}
          value={value}
          locale="en-GB"
          timezone="UTC"
          dateFormat={{
            parser: parserSpy,
            formatter: formatterSpy
          }}
          onChange={(_e, value) => setValue(value)}
        />
      )
    }

    await render(<Example />)

    const dateInput = dateInputElement()

    await userEvent.fill(dateInput, userDate)
    dateInput.blur()

    await waitFor2ms(() => {
      expect(parserSpy).toHaveBeenCalledWith(userDate)
      expect(formatterSpy).toHaveBeenCalledWith(parserReturnedDate)
    })
  })

  it('should onRequestValidateDate prop pass necessary props to the callback when input value is not a valid date', async () => {
    const dateValidationSpy = vi.fn()
    const newValue = 'not a date'
    const expectedDateIsoString = ''

    await render(
      <ConfigurableDateInputExample onRequestValidateDate={dateValidationSpy} />
    )

    const dateInput = dateInputElement()

    await userEvent.fill(dateInput, newValue)
    dateInput.blur()

    await waitFor2ms(() => {
      expect(dateValidationSpy).toHaveBeenCalledWith(
        expect.anything(),
        newValue,
        expectedDateIsoString
      )
    })
  })

  it('should onRequestValidateDate prop pass necessary props to the callback when input value is a valid date', async () => {
    const dateValidationSpy = vi.fn()
    const newValue = '26/03/2021'
    const expectedDateIsoString = new Date(Date.UTC(2021, 2, 26)).toISOString()

    await render(
      <ConfigurableDateInputExample onRequestValidateDate={dateValidationSpy} />
    )

    const dateInput = dateInputElement()

    await userEvent.fill(dateInput, newValue)
    dateInput.blur()

    await waitFor2ms(() => {
      expect(dateValidationSpy).toHaveBeenCalledWith(
        expect.anything(),
        newValue,
        expectedDateIsoString
      )
    })
  })

  const expectedPlaceholders = [
    { locale: 'hu', expectedPlaceHolder: 'YYYY. MM. DD.' },
    { locale: 'fr', expectedPlaceHolder: 'DD/MM/YYYY' },
    { locale: 'en-US', expectedPlaceHolder: 'M/D/YYYY' },
    { locale: 'ar-SA', expectedPlaceHolder: 'D‏/M‏/YYYY' }
  ]

  expectedPlaceholders.forEach(({ locale, expectedPlaceHolder }) => {
    it(`should set proper placeholder with locale: ${locale}`, async () => {
      await render(<ConfigurableDateInputExample locale={locale} />)

      expect(dateInputElement()).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      )
    })
  })

  it(`should set proper placeholder with dateFormat prop formatter callback`, async () => {
    const expectedPlaceHolder = 'YYYY*M*D'

    const Example = () => {
      const [value, setValue] = useState('')

      return (
        <DateInput
          renderLabel="Choose a date"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month',
            datePickerDialog: 'Date picker',
            selectedLabel: 'Selected'
          }}
          value={value}
          locale="en-GB"
          timezone="UTC"
          dateFormat={{
            parser: (_input) => {
              return new Date(Date.UTC(1111, 11, 11))
            },
            formatter: (date) => {
              const year = date.getFullYear()
              const month = date.getMonth() + 1
              const day = date.getDate()

              // set placeholder according to created date structure 'YYYY*M*D'
              return `${year}*${month}*${day}`
            }
          }}
          onChange={(_e, value) => setValue(value)}
        />
      )
    }
    await render(<Example />)

    expect(dateInputElement()).toHaveAttribute(
      'placeholder',
      expectedPlaceHolder
    )
  })
})
