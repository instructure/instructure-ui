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

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import '@testing-library/jest-dom'
import type { CalendarDayProps } from '../Day/props'
import Calendar from '../index'

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const generateDays = (count = Calendar.DAY_COUNT) => {
  const days: React.ReactElement<CalendarDayProps>[] = []
  const date = new Date('2019-07-28')
  while (days.length < count) {
    days.push(
      <Calendar.Day
        key={date.toISOString()}
        date={date.toISOString()}
        label={date.toISOString()}
        isOutsideMonth={date.getMonth() !== 7}
      >
        {date.getDate()}
      </Calendar.Day>
    )
    date.setDate(date.getDate() + 1)
  }
  return days
}

describe('<Calendar />', () => {
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

  describe('with minimal config', () => {
    it('should render 44 buttons without config', async () => {
      render(<Calendar />)
      const buttons = document.getElementsByTagName('button')

      expect(buttons.length).toEqual(44)
    })

    it('should render proper week names by default', async () => {
      const { container } = render(<Calendar />)
      const thead = container.querySelector('thead')

      expect(thead).toHaveTextContent(
        'SundaySuMondayMoTuesdayTuWednesdayWeThursdayThFridayFrSaturdaySa'
      )
    })

    it('should render proper week names if locale is set', async () => {
      const { container } = render(<Calendar locale="hu" />)
      const thead = container.querySelector('thead')

      expect(thead).toHaveTextContent(
        'hétfőhkeddkszerdaszecsütörtökcspéntekpszombatszovasárnapv'
      )
    })

    it('should disable days properly', async () => {
      const { container } = render(
        <Calendar
          currentDate="2023-12-15"
          disabledDates={['2023-12-22', '2023-12-12', '2023-12-11']}
        />
      )
      const buttons = container.querySelectorAll('button[disabled]')

      const disabledTexts = [
        '11 December 202311',
        '12 December 202312',
        '22 December 202322'
      ]
      buttons.forEach((button, index) => {
        expect(button).toHaveTextContent(disabledTexts[index])
      })
    })

    it('should indicate selected day', async () => {
      render(<Calendar currentDate="2023-12-15" selectedDate="2023-12-22" />)

      const selectedDay =
        screen.queryByText('22 December 2023')?.parentElement?.parentElement

      expect(selectedDay).toBeDefined()
      if (selectedDay) {
        expect(window.getComputedStyle(selectedDay)?.background).toBe(
          'rgb(3, 137, 61)'
        )
      }
    })
  })

  it('should render children', async () => {
    const { container } = render(
      <Calendar renderWeekdayLabels={weekdayLabels}>{generateDays()}</Calendar>
    )

    const calendarDays = container.querySelectorAll(
      'span[class*="-calendarDay__day"]'
    )

    expect(calendarDays.length).toEqual(Calendar.DAY_COUNT)
  })

  it(`should warn if the correct number of children are not provided`, async () => {
    const count = Calendar.DAY_COUNT - 1

    render(
      <Calendar renderWeekdayLabels={weekdayLabels}>
        {generateDays(count)}
      </Calendar>
    )

    const expectedErrorMessage = `should have exactly ${Calendar.DAY_COUNT} children. ${count} provided.`

    expect(consoleErrorMock).toHaveBeenCalledWith(
      expect.stringContaining(expectedErrorMessage),
      expect.any(String)
    )
  })

  it('should render weekday labels', async () => {
    const { container, rerender } = render(
      <Calendar renderWeekdayLabels={weekdayLabels}>{generateDays()}</Calendar>
    )

    const originalHeaders = container.querySelectorAll('th')
    expect(originalHeaders.length).toEqual(7)

    weekdayLabels.forEach((label, i) => {
      expect(originalHeaders[i]).toHaveTextContent(label)
    })

    const functionalWeekdayLabels = [
      () => 'Sx',
      () => 'Mx',
      () => 'Tx',
      () => 'Wx',
      () => 'Tx',
      () => 'Fx',
      () => 'Sx'
    ]

    // Set prop: renderWeekdayLabels
    rerender(
      <Calendar renderWeekdayLabels={functionalWeekdayLabels}>
        {generateDays()}
      </Calendar>
    )

    const updatedHeaders = container.querySelectorAll('th')
    expect(updatedHeaders.length).toEqual(7)

    functionalWeekdayLabels.forEach((functionalLabel, i) => {
      expect(updatedHeaders[i]).toHaveTextContent(functionalLabel())
    })
  })

  it('should warn if 7 weekday labels are not provided', async () => {
    render(<Calendar renderWeekdayLabels={[]}>{generateDays()}</Calendar>)

    const expectedErrorMessage =
      '`renderWeekdayLabels` should be an array with 7 labels (one for each weekday). 0 provided.'

    expect(consoleErrorMock).toHaveBeenCalledWith(
      expect.stringContaining(expectedErrorMessage),
      expect.any(String)
    )
  })

  it('should format the weekday labels and days correctly', async () => {
    const { container } = render(
      <Calendar renderWeekdayLabels={weekdayLabels}>{generateDays()}</Calendar>
    )

    const headerRow = container.querySelectorAll('thead > tr')
    expect(headerRow.length).toEqual(1)

    const headers = container.querySelectorAll('thead > tr > th')
    expect(headers.length).toEqual(7)

    const bodyRows = container.querySelectorAll('tbody > tr')
    expect(bodyRows.length).toEqual(Calendar.DAY_COUNT / 7)

    for (const row of bodyRows) {
      const days = row.querySelectorAll('td')
      expect(days.length).toEqual(7)
    }
  })

  it('should render navigation label', async () => {
    const navLabel = (
      <span>
        <div>March</div>
        <div>2019</div>
      </span>
    )

    const { rerender } = render(
      <Calendar
        renderWeekdayLabels={weekdayLabels}
        renderNavigationLabel={navLabel}
      >
        {generateDays()}
      </Calendar>
    )
    const month = screen.getByText('March')
    const year = screen.getByText('2019')

    expect(month).toBeInTheDocument()
    expect(year).toBeInTheDocument()

    // Set prop: renderNavigationLabel
    rerender(
      <Calendar
        renderWeekdayLabels={weekdayLabels}
        renderNavigationLabel={() => navLabel}
      >
        {generateDays()}
      </Calendar>
    )
    const updatedMonth = screen.getByText('March')
    const updatedYear = screen.getByText('2019')

    expect(updatedMonth).toBeInTheDocument()
    expect(updatedYear).toBeInTheDocument()
  })

  it('should render next and prev buttons', async () => {
    const { rerender } = render(
      <Calendar renderWeekdayLabels={weekdayLabels}>{generateDays()}</Calendar>
    )
    const defaultPrevButton = screen.getByText('Previous month')
    const defaultNextButton = screen.getByText('Next month')

    expect(defaultPrevButton).toBeInTheDocument()
    expect(defaultNextButton).toBeInTheDocument()

    rerender(
      <Calendar
        renderWeekdayLabels={weekdayLabels}
        renderPrevMonthButton={<button>test-prev</button>}
        renderNextMonthButton={<button>test-next</button>}
      >
        {generateDays()}
      </Calendar>
    )
    const customPrevButton = screen.getByText('test-prev')
    const customNextButton = screen.getByText('test-next')

    expect(customPrevButton).toBeInTheDocument()
    expect(customNextButton).toBeInTheDocument()

    rerender(
      <Calendar
        renderWeekdayLabels={weekdayLabels}
        renderPrevMonthButton={() => <button>func-test-prev</button>}
        renderNextMonthButton={() => <button>func-test-next</button>}
      >
        {generateDays()}
      </Calendar>
    )
    const funcPrevButton = screen.getByText('func-test-prev')
    const funcNextButton = screen.getByText('func-test-next')

    expect(funcPrevButton).toBeInTheDocument()
    expect(funcNextButton).toBeInTheDocument()
  })

  it('should call onRequestRenderNextMonth and onRequestRenderPrevMonth', async () => {
    const onRequestRenderPrevMonth = vi.fn()
    const onRequestRenderNextMonth = vi.fn()

    render(
      <Calendar
        renderWeekdayLabels={weekdayLabels}
        renderPrevMonthButton={<button>prev month</button>}
        renderNextMonthButton={<button>next month</button>}
        onRequestRenderPrevMonth={onRequestRenderPrevMonth}
        onRequestRenderNextMonth={onRequestRenderNextMonth}
      >
        {generateDays()}
      </Calendar>
    )

    const prevButton = screen.getByText('prev month')
    const nextButton = screen.getByText('next month')

    expect(onRequestRenderPrevMonth).not.toHaveBeenCalled()
    expect(onRequestRenderNextMonth).not.toHaveBeenCalled()

    await userEvent.click(prevButton)
    await userEvent.click(nextButton)

    expect(onRequestRenderPrevMonth).toHaveBeenCalledTimes(1)
    expect(onRequestRenderNextMonth).toHaveBeenCalledTimes(1)
  })

  describe('when role="listbox"', () => {
    it('should set role="listbox" on table root and role="presentation" on the correct elements', async () => {
      const { container } = render(
        <Calendar renderWeekdayLabels={weekdayLabels} role="listbox">
          {generateDays()}
        </Calendar>
      )

      const table = container.querySelector('table')
      expect(table).toHaveAttribute('role', 'listbox')

      const rows = container.querySelectorAll('tbody > tr')
      for (const row of rows) {
        expect(row).toHaveAttribute('role', 'presentation')

        const tds = row.querySelectorAll('td')
        tds.forEach((td) => {
          expect(td).toHaveAttribute('role', 'presentation')
        })
      }
    })

    it("should link each day with it's weekday header via `aria-describedby`", async () => {
      const { container } = render(
        <Calendar renderWeekdayLabels={weekdayLabels} role="listbox">
          {generateDays()}
        </Calendar>
      )

      const days = container.querySelectorAll('tbody > tr > td')
      const headers = container.querySelectorAll('th')

      days.forEach((dayTd, i) => {
        const index = i % 7
        const day = dayTd.querySelector('span[class*="-calendarDay"]')

        expect(day).toHaveAttribute(
          'aria-describedby',
          headers[index].getAttribute('id')
        )
      })
    })
  })

  it('should render root as designated by the `as` prop', async () => {
    render(
      <Calendar renderWeekdayLabels={weekdayLabels} as="ul">
        {generateDays()}
      </Calendar>
    )
    const calendar = screen.getByRole('list')

    expect(calendar.tagName).toBe('UL')
    expect(calendar).toHaveTextContent(weekdayLabels.join(''))
  })
})
