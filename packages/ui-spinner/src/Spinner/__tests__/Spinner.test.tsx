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

import { render, waitFor, screen } from '@testing-library/react'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { vi, expect } from 'vitest'
import type { MockInstance } from 'vitest'

import '@testing-library/jest-dom'
import { View } from '@instructure/ui-view'
import Spinner from '../index'
import type { SpinnerProps } from '../props'

describe('<Spinner />', () => {
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as MockInstance
  })

  afterEach(() => {
    consoleErrorMock.mockRestore()
  })

  it('should render', async () => {
    const { container } = render(<Spinner renderTitle="Loading" size="small" />)
    const spinner = container.querySelector('div[class*="-spinner"]')

    expect(spinner).toBeInTheDocument()
  })

  it('should render the title prop text in the SVG element title', async () => {
    const { container } = render(<Spinner renderTitle="Loading" size="large" />)
    const spinner = container.querySelector('div[class*="-spinner"]')

    expect(spinner).toHaveTextContent('Loading')
  })

  it('should meet a11y standards', async () => {
    const { container } = render(<Spinner renderTitle="Loading" size="small" />)
    const axeCheck = await runAxeCheck(container)
    expect(axeCheck).toBe(true)
  })

  it('should render the contents of a component used in renderTitle', async () => {
    const Translation = ({ children }: SpinnerProps) => (
      <span>I have translated {children}.</span>
    )

    const { container } = render(
      <Spinner renderTitle={<Translation>Loading</Translation>} size="small" />
    )

    const spinner = container.querySelector('div[class*="-spinner"]')
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
    expect(spinner).toHaveTextContent('I have translated Loading')
  })

  describe('when passing down props to View', () => {
    const allowedProps: { [key: string]: any } = {
      margin: 'small',
      elementRef: () => {},
      as: 'div'
    }

    View.allowedProps
      .filter((prop) => prop !== 'children')
      .forEach((prop) => {
        if (Object.keys(allowedProps).indexOf(prop) < 0) {
          it(`should NOT allow the '${prop}' prop`, async () => {
            const props = {
              [prop]: 'foo'
            }
            const expectedErrorMessage = `prop '${prop}' is not allowed.`

            render(<Spinner renderTitle="Loading" {...props} />)

            expect(consoleErrorMock).toHaveBeenCalledWith(
              expect.stringContaining(expectedErrorMessage),
              expect.any(String)
            )
          })
        } else {
          it(`should allow the '${prop}' prop`, async () => {
            const props = { [prop]: allowedProps[prop] }
            render(<Spinner renderTitle="Loading" {...props} />)

            expect(consoleErrorMock).not.toHaveBeenCalled()
          })
        }
      })
  })

  describe('with the delay prop', () => {
    it('should delay rendering', async () => {
      render(<Spinner renderTitle="Loading" delay={300} />)

      expect(screen.queryByText('Loading')).not.toBeInTheDocument()

      await waitFor(
        async () => {
          const title = await screen.findByText('Loading')
          const icon = await screen.findByRole('img')

          expect(title).toBeInTheDocument()
          expect(icon).toBeInTheDocument()
        },
        { timeout: 400 }
      )
    })
  })
})
