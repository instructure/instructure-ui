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

import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { describe, it, expect, vi } from 'vitest'

import { scopeTab } from '../scopeTab.js'

const MOCK_EVENT = new KeyboardEvent('mockEvent', { shiftKey: false })
MOCK_EVENT.preventDefault = () => {}

describe('scopeTab', () => {
  it('should scope tab within container', async () => {
    await render(
      <div>
        <div data-testid="container">
          <input data-testid="first" />
          <input data-testid="second" />
        </div>
      </div>
    )

    const container = page.getByTestId('container').element()
    const first = page.getByTestId('first').element()
    const second = page.getByTestId('second').element()

    second.focus()

    await vi.waitFor(() => {
      expect(document.activeElement).toBe(second)
    })

    scopeTab(container, MOCK_EVENT as any)

    await vi.waitFor(() => {
      expect(document.activeElement).toBe(first)
    })
  })

  it('should not attempt scoping when no tabbable children', async () => {
    await render(
      <div>
        <div data-testid="container">Hello</div>
        <input />
      </div>
    )

    const input = page.getByRole('textbox').element()
    const container = page.getByTestId('container').element()

    input.focus()

    scopeTab(container, MOCK_EVENT as any)

    await vi.waitFor(() => {
      expect(document.activeElement).toBe(input)
    })
  })

  it('should execute callback when provided instead of default behavior', async () => {
    const cb = vi.fn()

    await render(
      <div>
        <div data-testid="container">
          <input />
        </div>
      </div>
    )

    const input = page.getByRole('textbox').element()
    const container = page.getByTestId('container').element()

    input.focus()

    scopeTab(container, MOCK_EVENT as any, cb)

    await vi.waitFor(() => {
      expect(cb).toHaveBeenCalled()
    })
  })
})
