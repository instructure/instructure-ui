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

import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import type { MockInstance } from 'vitest'

import '@testing-library/jest-dom'
import { canvasHighContrast } from '@instructure/ui-themes/src/index'
import { InstUISettingsProvider } from '../index'

describe('<InstUISettingsProvider />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

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

  it('passes the current theme if a function is passed to theme prop', async () => {
    const themeFn = vi.fn()
    render(
      <InstUISettingsProvider theme={canvasHighContrast}>
        <InstUISettingsProvider theme={themeFn}></InstUISettingsProvider>
      </InstUISettingsProvider>
    )

    expect(themeFn).toHaveBeenCalledWith(canvasHighContrast)
  })

  it('can handle text direction on native HTML elements', async () => {
    const { rerender } = render(
      <InstUISettingsProvider dir="rtl">
        <div data-testid="child">Should be RTL</div>
      </InstUISettingsProvider>
    )

    let element = screen.getByTestId('child').parentElement!

    expect(element).toHaveAttribute('dir', 'rtl')

    // Set prop: dir
    rerender(
      <InstUISettingsProvider dir="ltr">
        <div data-testid="child">Should be RTL</div>
      </InstUISettingsProvider>
    )
    element = screen.getByTestId('child').parentElement!

    expect(element).toHaveAttribute('dir', 'ltr')
  })

  it('warns when "as" property is used without using the "dir" property', async () => {
    const warningMessage =
      "The 'as' property should be used in conjunction with the 'dir' property!"

    render(
      //@ts-expect-error div is required
      <InstUISettingsProvider as="div">
        <div>text</div>
      </InstUISettingsProvider>
    )
    expect(consoleWarningMock).toHaveBeenCalledWith(warningMessage)
  })
})
