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

import { render, act } from '@testing-library/react'
import { vi, expect } from 'vitest'
import type { MockInstance } from 'vitest'

import '@testing-library/jest-dom'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { TruncateText } from '../index'

const defaultText = 'Hello world! This is a long string that should truncate'

describe('<TruncateText />', () => {
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

  it('should warn if children prop receives too deep of a node tree', () => {
    vi.useFakeTimers()

    render(
      <div style={{ width: '200px' }}>
        <TruncateText>
          Hello world!{' '}
          <strong>
            <span>This is a</span>
          </strong>{' '}
          long string that should truncate
        </TruncateText>
      </div>
    )

    const expectedErrorMessage =
      'Some children are too deep in the node tree and will not render.'

    act(() => {
      vi.runAllTimers()
    })

    expect(consoleErrorMock).toHaveBeenCalledWith(
      expect.stringContaining(expectedErrorMessage),
      expect.any(String)
    )

    vi.useRealTimers()
  })

  it('should handle the empty string as a child', async () => {
    let error = false

    try {
      const { rerender } = render(<TruncateText>{''}</TruncateText>)

      rerender(<TruncateText>{'hello world'}</TruncateText>)
      rerender(<TruncateText>{''}</TruncateText>)
    } catch (_e) {
      error = true
    }

    expect(error).toBe(false)
  })

  it('should meet a11y standards', async () => {
    const { container } = render(
      <div style={{ width: '200px' }}>
        <TruncateText>{defaultText}</TruncateText>
      </div>
    )
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })
})
