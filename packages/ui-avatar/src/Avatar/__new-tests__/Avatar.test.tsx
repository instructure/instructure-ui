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
import { render } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'
import Avatar from '../index'

describe('<Avatar />', () => {
  describe('with the default props', () => {
    it('should have border and no box-shadow', async () => {
      const user = userEvent.setup({ delay: null })
      const { getByTestId } = render(<Avatar />)
      const startInput = getByTestId('event-form-start-time')
      const endInput = getByTestId('event-form-end-time')

      await user.type(startInput, '8:14 AM')
      await user.tripleClick(endInput)
      await user.type(endInput, '9:38 AM')
      expect(startInput.value).toBe('8:14 AM')
      expect(endInput.value).toBe('9:38 AM')
    })
  })
})
