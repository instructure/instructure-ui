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

import { fireEvent } from '@testing-library/dom'
import { expect, vi, beforeEach, afterEach, type MockInstance } from 'vitest'

export const dateInputElement = () =>
  document.querySelector<HTMLInputElement>('input[id^="TextInput_"]')!

// use `fireEvent` rather than `userEvent` because it's much faster
export const clickElement = (element: Element) => {
  fireEvent.mouseDown(element, { button: 0, detail: 1 })
  fireEvent.mouseUp(element, { button: 0, detail: 1 })
  fireEvent.click(element, { button: 0, detail: 1 })
}

// `vi.waitFor` polls every 50ms by default; these waits are all on same-tick
// DOM updates — poll tightly.
export const waitFor2ms = (assertion: () => void) =>
  vi.waitFor(assertion, { interval: 2 })

export const openCalendar = async () => {
  clickElement(
    document.querySelector<HTMLElement>('button[data-popover-trigger="true"]')!
  )
  await waitFor2ms(() => {
    const calendar = document.querySelector('table')
    expect(calendar).toBeInTheDocument()
    // The popover pulls focus into itself in a `requestAnimationFrame`
    // (`KeyboardFocusRegion`), so a frame *after* the calendar renders.
    // Interacting with it before that lands gets undone by the focus change:
    // e.g. clicking the year picker opens its option list, then the deferred
    // focus blurs the input and the list closes again.
    expect(
      calendar!
        .closest('[data-position-content]')
        ?.contains(document.activeElement)
    ).toBe(true)
  })
}

// the day number is rendered twice (visible + screen reader label), so match
// on the button's text.
export const dayButton = (day: string) =>
  Array.from(
    document.querySelectorAll<HTMLButtonElement>(
      'button[class*="-calendarDay"]'
    )
  ).find((button) => button.textContent?.includes(day))!

// Mocking console to prevent test output pollution
export const mockConsole = () => {
  let consoleWarningMock: MockInstance<typeof console.error>
  let consoleErrorMock: MockInstance<typeof console.error>

  beforeEach(() => {
    consoleWarningMock = vi.spyOn(console, 'warn').mockImplementation(() => {})
    consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleWarningMock.mockRestore()
    consoleErrorMock.mockRestore()
    vi.useRealTimers()
  })
}
