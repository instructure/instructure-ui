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
import '@testing-library/jest-dom'

// eslint-disable-next-line no-restricted-imports
import { generateA11yTests } from '@instructure/ui-scripts/lib/test/generateA11yTests'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { Calendar } from '@instructure/ui-calendar'

import Examples from '../__examples__/DateInput.examples'
import { DateInput } from '../index'

describe('<DateInput />', () => {
  const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const generateDays = (count = Calendar.DAY_COUNT) => {
    const days = []
    const date = new Date('2019-07-28')

    while (days.length < count) {
      days.push(
        <Calendar.Day
          key={date.toISOString()}
          date={date.toISOString()}
          label={date.toISOString()}
        >
          {date.getDate()}
        </Calendar.Day>
      )
      date.setDate(date.getDate() + 1)
    }

    return days
  }

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

  it('should render an input and a calendar', async () => {
    const { container, findByRole } = render(
      <DateInput
        renderLabel="date-input"
        renderWeekdayLabels={weekdayLabels}
        isShowingCalendar
      >
        {generateDays()}
      </DateInput>
    )
    const dateInput = container.querySelector('input')

    expect(dateInput).toBeInTheDocument()
    expect(dateInput).toHaveAttribute('type', 'text')

    await userEvent.click(dateInput!)
    const calendarTable = await findByRole('listbox')
    const calendarWrapper = await document.querySelector(
      '[id^="Selectable_"][id$="-list"]'
    )

    await waitFor(() => {
      expect(calendarWrapper).toBeInTheDocument()
      expect(calendarTable).toBeInTheDocument()
    })
  })

  describe('input', () => {
    it('should render a label', () => {
      const labelText = 'label text'

      render(
        <DateInput renderLabel={labelText} renderWeekdayLabels={weekdayLabels}>
          {generateDays()}
        </DateInput>
      )
      const dateInput = screen.getByLabelText('label text')

      expect(dateInput).toBeInTheDocument()
    })

    it('should set value', () => {
      const value = 'January 5'

      render(
        <DateInput
          renderLabel="Choose date"
          value={value}
          onChange={vi.fn()}
          renderWeekdayLabels={weekdayLabels}
        >
          {generateDays()}
        </DateInput>
      )
      const dateInput = screen.getByLabelText('Choose date')

      expect(dateInput).toHaveValue(value)
    })

    it('should call onChange with the updated value', async () => {
      const onChange = vi.fn()
      const value = 'May 18, 2022'

      render(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          onChange={onChange}
        >
          {generateDays()}
        </DateInput>
      )
      const dateInput = screen.getByLabelText('Choose date')

      fireEvent.change(dateInput, { target: { value: value } })
      fireEvent.keyDown(dateInput, { key: 'Enter', code: 'Enter' })
      fireEvent.blur(dateInput)

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange.mock.calls[0][1].value).toEqual(
          expect.stringContaining(value)
        )
      })
    })

    it('should call onBlur', () => {
      const onBlur = vi.fn()

      render(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          onBlur={onBlur}
        >
          {generateDays()}
        </DateInput>
      )
      const dateInput = screen.getByLabelText('Choose date')

      fireEvent.blur(dateInput)

      expect(onBlur).toHaveBeenCalledTimes(1)
    })

    it('should correctly set interaction type', async () => {
      const { rerender } = render(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          interaction="disabled"
        >
          {generateDays()}
        </DateInput>
      )
      const dateInput = screen.getByLabelText('Choose date')
      expect(dateInput).toHaveAttribute('disabled')

      rerender(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          interaction="readonly"
        >
          {generateDays()}
        </DateInput>
      )

      const dateInputAfterUpdate = screen.getByLabelText('Choose date')

      await waitFor(() => {
        expect(dateInputAfterUpdate).toHaveAttribute('readonly')
      })
    })

    it('should correctly set disabled', () => {
      render(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          disabled
        >
          {generateDays()}
        </DateInput>
      )

      const dateInput = screen.getByLabelText('Choose date')

      expect(dateInput).toHaveAttribute('disabled')
    })

    it('should correctly set readOnly', () => {
      render(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          readOnly
        >
          {generateDays()}
        </DateInput>
      )

      const dateInput = screen.getByLabelText('Choose date')

      expect(dateInput).toHaveAttribute('readOnly')
    })

    it('should set placeholder', () => {
      const placeholder = 'Start typing to choose a date'

      render(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          placeholder={placeholder}
        >
          {generateDays()}
        </DateInput>
      )
      const dateInput = screen.getByLabelText('Choose date')

      expect(dateInput).toHaveAttribute('placeholder', placeholder)
    })

    it('should be requireable', () => {
      render(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          isRequired
        >
          {generateDays()}
        </DateInput>
      )
      const dateInput = screen.getByLabelText('Choose date')

      expect(dateInput).toHaveAttribute('required')
    })

    it('should provide inputRef', () => {
      const inputRef = vi.fn()

      render(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          inputRef={inputRef}
        >
          {generateDays()}
        </DateInput>
      )
      const dateInput = screen.getByLabelText('Choose date')

      expect(inputRef).toHaveBeenCalledWith(dateInput)
    })

    it('should render messages', () => {
      const text = 'The selected date is invalid'

      const { container } = render(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          messages={[{ type: 'error', text }]}
        >
          {generateDays()}
        </DateInput>
      )

      expect(container).toHaveTextContent(text)
    })

    it('should allow custom props to pass through', () => {
      render(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          data-custom-attr="custom value"
          name="my name"
        >
          {generateDays()}
        </DateInput>
      )
      const dateInput = screen.getByLabelText('Choose date')

      expect(dateInput).toHaveAttribute('data-custom-attr', 'custom value')
      expect(dateInput).toHaveAttribute('name', 'my name')
    })
  })

  describe('Calendar', () => {
    it('should show calendar when `isShowingCalendar` is set', async () => {
      const { rerender, queryByRole } = render(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
        >
          {generateDays()}
        </DateInput>
      )
      const dateInput = screen.getByLabelText('Choose date')
      const calendarTable = await queryByRole('listbox')
      const calendarWrapper = await document.querySelector(
        '[id^="Selectable_"][id$="-list"]'
      )

      expect(dateInput).toBeInTheDocument()
      expect(calendarTable).not.toBeInTheDocument()
      expect(calendarWrapper).not.toBeInTheDocument()

      rerender(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          isShowingCalendar
        >
          {generateDays()}
        </DateInput>
      )
      const dateInputAfterUpdate = screen.getByLabelText('Choose date')
      const calendarTableAfterUpdate = await queryByRole('listbox')
      const calendarWrapperAfterUpdate = await document.querySelector(
        '[id^="Selectable_"][id$="-list"]'
      )

      await waitFor(() => {
        expect(dateInputAfterUpdate).toBeInTheDocument()
        expect(calendarTableAfterUpdate).toBeInTheDocument()
        expect(calendarWrapperAfterUpdate).toBeInTheDocument()
      })
    })

    describe('onRequestShowCalendar', () => {
      it('should call onRequestShowCalendar when label is clicked', async () => {
        const onRequestShowCalendar = vi.fn()

        const { container } = render(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestShowCalendar={onRequestShowCalendar}
          >
            {generateDays()}
          </DateInput>
        )
        const dateInput = container.querySelector("[class$='-formFieldLabel']")

        expect(dateInput).toHaveTextContent('Choose date')

        await userEvent.click(dateInput!)

        await waitFor(() => {
          expect(onRequestShowCalendar).toHaveBeenCalled()
        })
      })

      it('should call onRequestShowCalendar when input is clicked', async () => {
        const onRequestShowCalendar = vi.fn()

        const { container } = render(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestShowCalendar={onRequestShowCalendar}
          >
            {generateDays()}
          </DateInput>
        )
        const dateInput = container.querySelector('input')

        await userEvent.click(dateInput!)

        await waitFor(() => {
          expect(onRequestShowCalendar).toHaveBeenCalledTimes(1)
        })
      })

      it('should call onRequestShowCalendar when input receives space event', async () => {
        const onRequestShowCalendar = vi.fn()

        render(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestShowCalendar={onRequestShowCalendar}
          >
            {generateDays()}
          </DateInput>
        )
        const dateInput = screen.getByLabelText('Choose date')

        await userEvent.type(dateInput, '{space}')

        await waitFor(() => {
          expect(onRequestShowCalendar).toHaveBeenCalledTimes(1)
        })
      })

      it('should not call onRequestShowCalendar when input receives space event if calendar is already showing', async () => {
        const onRequestShowCalendar = vi.fn()

        render(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestShowCalendar={onRequestShowCalendar}
            isShowingCalendar
          >
            {generateDays()}
          </DateInput>
        )
        const dateInput = screen.getByLabelText('Choose date')

        await userEvent.type(dateInput, '{space}')

        await waitFor(() => {
          expect(onRequestShowCalendar).not.toHaveBeenCalled()
        })
      })

      it('should call onRequestShowCalendar when input receives down arrow event', async () => {
        const onRequestShowCalendar = vi.fn()

        render(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestShowCalendar={onRequestShowCalendar}
          >
            {generateDays()}
          </DateInput>
        )
        const dateInput = screen.getByLabelText('Choose date')

        await userEvent.type(dateInput, '{arrowdown}')

        await waitFor(() => {
          expect(onRequestShowCalendar).toHaveBeenCalledTimes(1)
        })
      })

      it('should not call onRequestShowCalendar when input receives down arrow event if calendar is already showing', async () => {
        const onRequestShowCalendar = vi.fn()

        render(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestShowCalendar={onRequestShowCalendar}
            isShowingCalendar
          >
            {generateDays()}
          </DateInput>
        )
        const dateInput = screen.getByLabelText('Choose date')

        await userEvent.type(dateInput, '{arrowdown}')

        await waitFor(() => {
          expect(onRequestShowCalendar).not.toHaveBeenCalled()
        })
      })

      it('should call onRequestShowCalendar when input receives up arrow event', async () => {
        const onRequestShowCalendar = vi.fn()

        render(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestShowCalendar={onRequestShowCalendar}
          >
            {generateDays()}
          </DateInput>
        )
        const dateInput = screen.getByLabelText('Choose date')

        await userEvent.type(dateInput, '{arrowup}')

        await waitFor(() => {
          expect(onRequestShowCalendar).toHaveBeenCalledTimes(1)
        })
      })

      it('should not call onRequestShowCalendar when input receives up arrow event if calendar is already showing', async () => {
        const onRequestShowCalendar = vi.fn()

        render(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestShowCalendar={onRequestShowCalendar}
            isShowingCalendar
          >
            {generateDays()}
          </DateInput>
        )
        const dateInput = screen.getByLabelText('Choose date')

        await userEvent.type(dateInput, '{arrowup}')

        await waitFor(() => {
          expect(onRequestShowCalendar).not.toHaveBeenCalled()
        })
      })

      it('should call onRequestShowCalendar when input receives onChange event', async () => {
        const onRequestShowCalendar = vi.fn()

        render(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestShowCalendar={onRequestShowCalendar}
          >
            {generateDays()}
          </DateInput>
        )
        const dateInput = screen.getByLabelText('Choose date')

        fireEvent.change(dateInput, { target: { value: 'January 5' } })

        await waitFor(() => {
          expect(onRequestShowCalendar).toHaveBeenCalledTimes(1)
        })
      })

      it('should not call onRequestShowCalendar when disabled', async () => {
        const onRequestShowCalendar = vi.fn()

        render(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestShowCalendar={onRequestShowCalendar}
            interaction="disabled"
          >
            {generateDays()}
          </DateInput>
        )
        const dateInput = screen.getByLabelText('Choose date')

        fireEvent.click(dateInput)

        await userEvent.type(
          dateInput,
          '{arrowup}{arrowdown}{space}January 5',
          { skipClick: true }
        )

        await waitFor(() => {
          expect(onRequestShowCalendar).not.toHaveBeenCalled()
        })
      })
    })

    describe('onRequestHideCalendar and onRequestValidateDate', () => {
      it('should call onRequestHideCalendar and onRequestValidateDate input receives onBlur event', async () => {
        const onRequestHideCalendar = vi.fn()
        const onRequestValidateDate = vi.fn()

        render(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestHideCalendar={onRequestHideCalendar}
            onRequestValidateDate={onRequestValidateDate}
            isShowingCalendar
          >
            {generateDays()}
          </DateInput>
        )
        const dateInput = screen.getByLabelText('Choose date')

        fireEvent.blur(dateInput)

        await waitFor(() => {
          expect(onRequestHideCalendar).toHaveBeenCalledTimes(1)
          expect(onRequestValidateDate).toHaveBeenCalledTimes(1)
        })
      })

      it('should call onRequestHideCalendar and onRequestValidateDate when input receives esc event', async () => {
        const onRequestHideCalendar = vi.fn()
        const onRequestValidateDate = vi.fn()

        render(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestHideCalendar={onRequestHideCalendar}
            onRequestValidateDate={onRequestValidateDate}
            isShowingCalendar
          >
            {generateDays()}
          </DateInput>
        )
        const dateInput = screen.getByLabelText('Choose date')

        await userEvent.type(dateInput, '{esc}')

        await waitFor(() => {
          expect(onRequestHideCalendar).toHaveBeenCalledTimes(1)
          expect(onRequestValidateDate).toHaveBeenCalledTimes(1)
        })
      })

      it('should call onRequestHideCalendar and onRequestValidateDate when input receives enter event', async () => {
        const onRequestHideCalendar = vi.fn()
        const onRequestValidateDate = vi.fn()

        const days = generateDays()
        days[4] = (
          <Calendar.Day key="4" label="4" date="2019-09-28" isSelected>
            {4}
          </Calendar.Day>
        )

        render(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestHideCalendar={onRequestHideCalendar}
            onRequestValidateDate={onRequestValidateDate}
            isShowingCalendar
          >
            {days}
          </DateInput>
        )
        const dateInput = screen.getByLabelText('Choose date')

        await userEvent.type(dateInput, '{enter}')

        await waitFor(() => {
          expect(onRequestHideCalendar).toHaveBeenCalledTimes(1)
          expect(onRequestValidateDate).toHaveBeenCalledTimes(1)
        })
      })
    })

    it('should render calendar navigation label', () => {
      const label = 'January 2019'

      render(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          renderNavigationLabel={<div data-testId="label-id">{label}</div>}
          isShowingCalendar
        >
          {generateDays()}
        </DateInput>
      )
      const navigationLabel = screen.getByTestId('label-id')

      expect(navigationLabel).toBeInTheDocument()
      expect(navigationLabel).toHaveTextContent(label)
    })

    it('should render calendar weekday labels', async () => {
      render(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          isShowingCalendar
        >
          {generateDays()}
        </DateInput>
      )
      const calendar = await screen.findByRole('listbox')
      const headers = calendar.querySelectorAll('th')

      expect(headers.length).toEqual(7)

      weekdayLabels.forEach((label) => {
        expect(calendar).toHaveTextContent(label)
      })
    })

    it('should render all focusable elements in calendar with tabIndex="-1"', async () => {
      render(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          renderNextMonthButton={
            <button data-testId="button-next">next</button>
          }
          renderPrevMonthButton={
            <button data-testId="button-prev">prev</button>
          }
          isShowingCalendar
        >
          {generateDays()}
        </DateInput>
      )
      const calendar = await screen.findByRole('listbox')
      const calendarDays = calendar.querySelectorAll('button')
      const nextMonthButton = screen.getByTestId('button-next')
      const prevMonthButton = screen.getByTestId('button-prev')

      expect(nextMonthButton).toHaveAttribute('tabIndex', '-1')
      expect(prevMonthButton).toHaveAttribute('tabIndex', '-1')
      expect(calendarDays).toHaveLength(42)

      calendarDays.forEach((day) => {
        expect(day).toHaveAttribute('tabIndex', '-1')
      })
    })

    it('should render days with the correct role', async () => {
      const days = generateDays()
      days[5] = (
        <Calendar.Day key="5" label="5" date="2019-09-28" id="5" isOutsideMonth>
          outside
        </Calendar.Day>
      )

      render(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          isShowingCalendar
        >
          {days}
        </DateInput>
      )
      const calendar = await screen.findByRole('listbox')
      const calendarDays = calendar.querySelectorAll('button')

      calendarDays.forEach((day) => {
        if (day.textContent!.includes('outside')) {
          expect(day).toHaveAttribute('role', 'presentation')
        } else {
          expect(day).toHaveAttribute('role', 'option')
        }
      })
    })

    it('should assign aria-selected to the selected date and link it to the input', async () => {
      const days = generateDays()
      days[7] = (
        <Calendar.Day
          key="7"
          label="7"
          date="2019-09-28"
          id="selected-day-id"
          isSelected
        >
          selected
        </Calendar.Day>
      )

      render(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          isShowingCalendar
        >
          {days}
        </DateInput>
      )
      const calendar = await screen.findByRole('listbox')
      const calendarDays = calendar.querySelectorAll('button')
      let selectedDayID = ''

      calendarDays.forEach((day) => {
        if (day.textContent!.includes('selected')) {
          selectedDayID = day.id
          expect(day).toHaveAttribute('aria-selected', 'true')
        } else {
          expect(day).toHaveAttribute('aria-selected', 'false')
        }
      })

      const dateInput = screen.getByLabelText('Choose date')
      expect(dateInput).toHaveAttribute('aria-activedescendant', selectedDayID)
    })
  })

  describe('with generated examples', () => {
    const generatedComponents = generateA11yTests(DateInput, Examples)

    it.each(generatedComponents)(
      'should be accessible with example: $description',
      async ({ content }) => {
        const { container } = render(content)
        const axeCheck = await runAxeCheck(container)
        expect(axeCheck).toBe(true)
      }
    )
  })

  describe('with minimal config', () => {
    it('should render 44 buttons (a calendar) when clicked', async () => {
      const onChange = vi.fn()
      render(
        <DateInput
          renderLabel="Choose date"
          assistiveText="Type a date or use arrow keys to navigate date picker."
          width="20rem"
          isInline
          value={'2023-11-23'}
          onChange={onChange}
          currentDate="2023-12-23"
          disabledDates={['2023-12-22', '2023-12-12', '2023-12-11']}
          disabledDateErrorMessage="disabled date"
          invalidDateErrorMessage="invalid date"
        ></DateInput>
      )
      const dateInput = screen.getByLabelText('Choose date')

      fireEvent.click(dateInput)

      const calendarTable = document.querySelector('table')
      const calendarDays = calendarTable!.querySelectorAll('button')
      const calendarWrapper = document.querySelector(
        '[id^="Selectable_"][id$="-list"]'
      )
      const calendarButtons = calendarWrapper!.querySelectorAll('button')

      await waitFor(() => {
        expect(calendarButtons).toHaveLength(44)
        expect(calendarDays).toHaveLength(42)
      })
    })
  })
})
