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
// import React from 'react'
// import { render, screen, act } from '@testing-library/react'

import '@testing-library/jest-dom'
// import DateInput from '../index'

describe('<DateInput />', () => {
  describe('with minimal config', () => {
    it('should be a placeholer', () => {
      expect(1 + 1).toEqual(2)
    })
    // TODO find out why timeouts
    // it('should render 44 buttons (a calendar) when clicked', async () => {
    //   const onChange = jest.fn()
    //   render(
    //     <DateInput
    //       renderLabel="Choose a date"
    //       assistiveText="Type a date or use arrow keys to navigate date picker."
    //       width="20rem"
    //       isInline
    //       value={'2023-11-23'}
    //       onChange={onChange}
    //       currentDate="2023-12-23"
    //       disabledDates={['2023-12-22', '2023-12-12', '2023-12-11']}
    //       disabledDateErrorMessage="disabled date"
    //       invalidDateErrorMessage="invalid date"
    //     ></DateInput>
    //   )
    //   const inputField = screen.queryByRole('combobox')
    //   await act(async () => {
    //     await inputField?.click()
    //   })
    //   const buttons = document.getElementsByTagName('button')
    //   expect(buttons.length).toEqual(44)
    // })
    // it('should select the correct day on Calendar when value is set', async () => {
    //   const onChange = jest.fn()
    //   render(
    //     <DateInput
    //       renderLabel="Choose a date"
    //       assistiveText="Type a date or use arrow keys to navigate date picker."
    //       width="20rem"
    //       isInline
    //       value={'2023-11-23'}
    //       onChange={onChange}
    //       currentDate="2023-11-25"
    //       disabledDates={['2023-12-22', '2023-12-12', '2023-12-11']}
    //       disabledDateErrorMessage="disabled date"
    //       invalidDateErrorMessage="invalid date"
    //     ></DateInput>
    //   )
    //   const inputField = screen.queryByRole('combobox')
    //   await act(async () => {
    //     await inputField?.click()
    //   })
    //   const selectedDay =
    //     screen.queryByText('23 November 2023')?.parentElement?.parentElement
    //   expect(selectedDay).toBeDefined()
    //   if (selectedDay) {
    //     expect(window.getComputedStyle(selectedDay)?.background).toBe(
    //       'rgb(11, 135, 75)'
    //     )
    //   }
    // })
  })
})
