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
import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import Calendar from '../index'

describe('<Calendar />', () => {
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
          'rgb(11, 135, 75)'
        )
      }
    })
  })
})
