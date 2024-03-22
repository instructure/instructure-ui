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

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { Tabs } from '@instructure/ui-tabs'
import { DateTimeInput } from '../index'

describe('<DateTimeInput />', () => {
  let consoleErrorMock: jest.SpyInstance

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation()
  })

  afterEach(() => {
    consoleErrorMock.mockRestore()
  })

  it('should warn if multiple active tabs exist', () => {
    const { container } = render(
      <Tabs>
        <Tabs.Panel renderTitle="First Tab1" active>
          Tab 1 content
        </Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab2" active>
          Tab 2 content
        </Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )

    expect(container.firstChild).toBeInTheDocument()

    expect(consoleErrorMock.mock.calls[0][0]).toEqual(
      'Warning: [Tabs] Only one Panel can be marked as active.'
    )
  })

  it("should throw warning if initialTimeForNewDate prop's value is not HH:MM", async () => {
    render(
      <DateTimeInput
        description="date_time"
        dateRenderLabel="date-input"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        timeRenderLabel="time-input"
        invalidDateTimeMessage="whoops"
        locale={'en-US'}
        timezone={'US/Eastern'}
        initialTimeForNewDate={'WRONG_FORMAT'}
      />
    )
    // expect(consoleErrorMock.mock.calls[0][2]).toEqual(
    //   expect.stringContaining(
    //     `Invalid prop \`initialTimeForNewDate\` \`${'WRONG_FORMAT'}\` supplied to \`DateTimeInput\`, expected a HH:MM formatted string.`
    //   )
    // )

    const dateInput = screen.getByLabelText('date-input')

    await userEvent.type(dateInput, 'May 1, 2017')
    await userEvent.type(dateInput, '{enter}')

    await waitFor(() => {
      expect(consoleErrorMock.mock.calls[1][0]).toBe(
        `Warning: [DateTimeInput] initialTimeForNewDate prop is not in the correct format. Please use HH:MM format.`
      )
    })
  })
})
