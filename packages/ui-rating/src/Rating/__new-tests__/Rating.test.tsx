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

import '@testing-library/jest-dom'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { View } from '@instructure/ui-view'

import { Rating } from '../index'

describe('<Rating />', () => {
  it('should render the correct number of icons', () => {
    const { container } = render(<Rating label="Course rating" iconCount={5} />)
    const icons = container.querySelectorAll('svg')

    expect(icons).toHaveLength(5)
  })

  it('should handle a valueMax of zero', () => {
    const { container } = render(<Rating label="Course rating" valueMax={0} />)
    const icons = container.querySelectorAll('svg')

    expect(icons).toHaveLength(3)
  })

  it('should fill the correct number of icons', () => {
    const { container } = render(
      <Rating
        label="Course rating"
        iconCount={5}
        valueNow={89}
        valueMax={100}
      />
    )
    const filledIcons = container.querySelectorAll('svg[name="IconStar"]')

    expect(filledIcons).toHaveLength(4)
  })

  it('never renders more than `iconCount` icons', () => {
    const { container } = render(
      <Rating
        label="Course rating"
        iconCount={5}
        valueNow={110}
        valueMax={100}
      />
    )

    const icons = container.querySelectorAll('svg')

    expect(icons).toHaveLength(5)
  })

  it('should render screen reader text to give context', () => {
    const { container } = render(
      <Rating
        label="Course rating"
        iconCount={5}
        valueNow={89}
        valueMax={100}
        formatValueText={(current, max) => `${current} out of ${max}`}
      />
    )

    expect(container).toHaveTextContent('Course rating 4 out of 5')
  })

  it('should meet a11y standards', async () => {
    const { container } = render(<Rating label="Course rating" iconCount={5} />)

    const axeCheck = await runAxeCheck(container)
    expect(axeCheck).toBe(true)
  })

  describe('when passing down props to View', () => {
    const allowedProps: { [key: string]: any } = {
      margin: 'small'
    }

    View.allowedProps
      .filter((prop) => prop !== 'children')
      .forEach((prop) => {
        if (Object.keys(allowedProps).indexOf(prop) < 0) {
          it(`should NOT allow the '${prop}' prop`, () => {
            const consoleErrorSpy = jest
              .spyOn(console, 'error')
              .mockImplementation(() => {})
            const expectedErrorMessage = `Warning: [undefined] prop '${prop}' is not allowed.`
            const props = {
              [prop]: 'foo'
            }

            render(<Rating label="Course rating" iconCount={5} {...props} />)
            expect(consoleErrorSpy).toHaveBeenCalledWith(
              expect.stringContaining(expectedErrorMessage),
              expect.any(String)
            )

            consoleErrorSpy.mockRestore()
          })
        } else {
          it(`should allow the '${prop}' prop`, () => {
            const props = { [prop]: allowedProps[prop] }
            const consoleErrorSpy = jest
              .spyOn(console, 'error')
              .mockImplementation(() => {})

            render(<Rating label="Course rating" iconCount={5} {...props} />)
            expect(consoleErrorSpy).not.toHaveBeenCalled()

            consoleErrorSpy.mockRestore()
          })
        }
      })
  })
})
