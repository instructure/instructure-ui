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

import { render } from '@testing-library/react'
import { vi } from 'vitest'
import type { MockInstance } from 'vitest'
import '@testing-library/jest-dom'

import { InstUISettingsProvider } from '@instructure/emotion'
import { runAxeCheck } from '@instructure/ui-axe-check'

import { RatingIcon } from '../index'

describe('<RatingIcon />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeAll(() => {
    vi.useFakeTimers()
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as MockInstance
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as MockInstance
  })

  afterEach(() => {
    consoleWarningMock.mockRestore()
    consoleErrorMock.mockRestore()
  })

  it('transitions when filled on render and animateFill is true', async () => {
    // Use real timers for this test as it relies on CSS transition timing
    vi.useRealTimers()

    const { container } = render(
      <InstUISettingsProvider
        theme={{
          componentOverrides: {
            Transition: {
              duration: '100ms'
            }
          }
        }}
      >
        <RatingIcon filled animateFill />
      </InstUISettingsProvider>
    )

    // Wait for animation delay + transition to complete
    await new Promise((resolve) => setTimeout(resolve, 400))

    const icon = container.querySelector('svg')

    expect(icon).toBeInTheDocument()
    expect(icon!.getAttribute('name')).toBe('IconStar')
    expect(icon).toHaveClass('transition--scale-entered')

    vi.useFakeTimers()
  })

  it('transitions when filled after render and animateFill is true', async () => {
    // Use real timers for this test as it relies on CSS transition timing
    vi.useRealTimers()

    const { container, rerender } = render(
      <InstUISettingsProvider
        theme={{
          componentOverrides: {
            Transition: {
              duration: '100ms'
            }
          }
        }}
      >
        <RatingIcon filled={false} animateFill={true} />
      </InstUISettingsProvider>
    )

    let icon = container.querySelector('svg')

    expect(icon).toBeInTheDocument()
    expect(icon!.getAttribute('name')).toBe('IconStarLight')
    expect(icon).not.toHaveClass('transition--scale-entered')

    rerender(
      <InstUISettingsProvider
        theme={{
          componentOverrides: {
            Transition: {
              duration: '100ms'
            }
          }
        }}
      >
        <RatingIcon filled={true} animateFill={true} />
      </InstUISettingsProvider>
    )

    // Wait for RAF + transition to complete
    await new Promise((resolve) => setTimeout(resolve, 200))

    icon = container.querySelector('svg')

    expect(icon).toBeInTheDocument()
    expect(icon!.getAttribute('name')).toBe('IconStar')
    expect(icon).toHaveClass('transition--scale-entered')

    vi.useFakeTimers()
  })

  it('should meet a11y standards', async () => {
    vi.useRealTimers()
    const { container } = render(<RatingIcon filled animateFill />)

    const axeCheck = await runAxeCheck(container)
    expect(axeCheck).toBe(true)
    vi.useFakeTimers()
  })
})
