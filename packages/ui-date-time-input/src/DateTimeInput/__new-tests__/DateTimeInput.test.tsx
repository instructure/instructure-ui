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

import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
// import { userEvent } from '@testing-library/user-event'
import DateTimeInput from '../index'

describe('<DateTimeInput />', () => {
  it('should render', async () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'

    const { container } = render(
      <DateTimeInput
        description="date time"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        dateRenderLabel="date"
        timeRenderLabel="time"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        initialTimeForNewDate="05:05"
      />
    )

    expect(container.firstChild).toBeInTheDocument()
  })

  // it("should change value of TimeSelect to initialTimeForNewDate prop's value", async () => {
  //   const locale = 'en-US'
  //   const timezone = 'US/Eastern'

  //   render(
  //     <DateTimeInput
  //       description="date time"
  //       prevMonthLabel="Previous month"
  //       nextMonthLabel="Next month"
  //       dateRenderLabel="date"
  //       timeRenderLabel="time"
  //       invalidDateTimeMessage="whoops"
  //       locale={locale}
  //       timezone={timezone}
  //       initialTimeForNewDate="05:05"
  //     />
  //   )

  //   const input = screen.getAllByRole('combobox')[0]

  //   fireEvent.click(input)

  //   const firstDay = screen.getByText('15')

  //   await userEvent.click(firstDay)

  //   const allInputs = screen.getAllByRole('combobox')
  //   const targetInput = allInputs.find(
  //     (input) => (input as HTMLInputElement).value === '5:05 AM'
  //   )
  //   expect(targetInput).toBeInTheDocument()
  // })

  //   it("should throw warning if initialTimeForNewDate prop's value is not HH:MM", async () => {
  //     const locale = 'en-US'
  //     const timezone = 'US/Eastern'

  //     const consoleError = jest
  //       .spyOn(console, 'error')
  //       .mockImplementation(() => {})

  //     const initialTimeForNewDate = 'WRONG_FORMAT'

  //     render(
  //       <DateTimeInput
  //         description="date time"
  //         prevMonthLabel="Previous month"
  //         nextMonthLabel="Next month"
  //         dateRenderLabel="date"
  //         timeRenderLabel="time"
  //         invalidDateTimeMessage="whoops"
  //         locale={locale}
  //         timezone={timezone}
  //         initialTimeForNewDate={initialTimeForNewDate}
  //       />
  //     )

  //     expect(consoleError.mock.calls[0][2]).toContain(
  //       `Invalid prop \`initialTimeForNewDate\` \`${initialTimeForNewDate}\` supplied to \`DateTimeInput\`, expected a HH:MM formatted string.`
  //     )

  //     const input = screen.getAllByRole('combobox')[0]

  //     fireEvent.click(input)

  //     const firstDay = screen.getByText('15')

  //     await userEvent.click(firstDay)

  //     expect(consoleError.mock.calls[1][0]).toBe(
  //       `Warning: [DateTimeInput] initialTimeForNewDate prop is not in the correct format. Please use HH:MM format.`
  //     )
  //   })

  //   it('should throw warning if initialTimeForNewDate prop hour and minute values are not in interval', async () => {
  //     const locale = 'en-US'
  //     const timezone = 'US/Eastern'

  //     const consoleError = jest
  //       .spyOn(console, 'error')
  //       .mockImplementation(() => {})

  //     const initialTimeForNewDate = '99:99'

  //     render(
  //       <DateTimeInput
  //         description="date time"
  //         prevMonthLabel="Previous month"
  //         nextMonthLabel="Next month"
  //         dateRenderLabel="date"
  //         timeRenderLabel="time"
  //         invalidDateTimeMessage="whoops"
  //         locale={locale}
  //         timezone={timezone}
  //         initialTimeForNewDate={initialTimeForNewDate}
  //       />
  //     )

  //     const input = screen.getAllByRole('combobox')[0]

  //     fireEvent.click(input)

  //     const firstDay = screen.getByText('15')

  //     await userEvent.click(firstDay)

  //     expect(consoleError.mock.calls[0][0]).toContain(
  //       `Warning: [DateTimeInput] 0 <= hour < 24 and 0 <= minute < 60 for initialTimeForNewDate prop.`
  //     )
  //   })

  /*
   * TODO write this test with Cypress
   * Steps:
   * 0. Set initialTimeForNewDate and defaultValue props -> check if defaultValue is rendered in the date input and time input fields
   * 1. Clear date input field
   * 2. Click on an area outside of the component
   * 3. Check if time input field got cleared as well
   * 4. Click on the date input and select a date
   * 5. Observe if the time input has the value of initialTimeForNewDate
   */

  // it('should merge defaultValue and initialTimeForNewDate when the user clears date input', async () => {
  //   const locale = 'en-US'
  //   const timezone = 'US/Eastern'
  //
  //   // const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {})
  //
  //   const initialTimeForNewDate = '16:16'
  //   const defaultValue = '2018-01-18T13:30'
  //
  //   const {container} = render(
  //     <DateTimeInput
  //       description="date time"
  //       prevMonthLabel="Previous month"
  //       nextMonthLabel="Next month"
  //       dateRenderLabel="date"
  //       timeRenderLabel="time"
  //       invalidDateTimeMessage="whoops"
  //       defaultValue={defaultValue}
  //       locale={locale}
  //       timezone={timezone}
  //       initialTimeForNewDate={initialTimeForNewDate}
  //     />
  //   )
  //
  //   const dateInput = container.querySelector('input')
  //
  //   const timeInput = container.querySelectorAll('input')[1]
  //
  //   fireEvent.change(dateInput as Element, { target: { value: '' } })
  //
  //
  //   await waitFor(() => {
  //   fireEvent.keyDown(dateInput as Element, { key: 'Escape' })
  //
  //   expect(timeInput).toHaveValue('')
  //   })
  //
  //   // fireEvent.
  //   // fireEvent.change(timeInput as Element, { target: { value: '' } })
  //
  //
  //   const firstDay = screen.getByText('15')
  //
  //   await userEvent.click(firstDay)
  //
  //   const time = screen.getByText('4:16 PM')
  //
  //   expect(time).toBeInTheDocument()
  //
  //   // expect(consoleWarn.mock.calls[0][0]).toContain(
  //   //   `Warning: [DateTimeInput] if defaultValue is set, initialTimeForNewDate will be ignored.`
  //   // )
  // })

  //   afterEach(() => {
  //     jest.resetAllMocks()
  //   })
})
