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
import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest'
import type { MockInstance } from 'vitest'

import { Pages, PagesPage as Page } from '@instructure/ui-pages/latest'

describe('<Page />', () => {
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as MockInstance
  })

  afterEach(() => {
    consoleErrorMock.mockRestore()
  })

  it('should render with a function as child', async () => {
    const { container } = await render(
      <Page>
        {() => {
          return (
            <div>
              <input type="text" />
              <span>Hello World</span>
            </div>
          )
        }}
      </Page>
    )

    expect(container).toMatchTextContent('Hello World')
  })

  describe('Component tests', () => {
    it('should focus default element', async () => {
      const Example = () => {
        const [activePageIndex, setActivePageIndex] = useState(0)
        let inputRef: HTMLInputElement | null

        const handleNextPageClick = () => {
          setActivePageIndex(1)
        }

        const handleBackButtonClick = () => {
          setActivePageIndex(0)
        }

        return (
          <Pages activePageIndex={activePageIndex} onPageIndexChange={vi.fn()}>
            <Page defaultFocusElement={() => inputRef}>
              <button onClick={handleNextPageClick}> Next Page </button>
            </Page>

            <Page defaultFocusElement={() => inputRef}>
              <input type="text" />
              <input
                id="default-input"
                type="text"
                ref={(el) => {
                  inputRef = el
                }}
              />
              <input type="text" />
              <button onClick={handleBackButtonClick}> Back </button>
            </Page>
          </Pages>
        )
      }

      const { container } = await render(<Example />)

      await page.getByRole('button', { name: 'Next Page' }).click()

      await vi.waitFor(() => {
        expect(container.querySelector('#default-input')).toHaveFocus()
      })
    })
  })
})
