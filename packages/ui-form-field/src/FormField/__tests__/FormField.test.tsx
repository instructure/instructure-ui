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

import { runAxeCheck } from '@instructure/ui-axe-check'
import { FormField } from '@instructure/ui-form-field/latest'
import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

describe('<FormField />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as any
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as any
  })

  afterEach(() => {
    consoleWarningMock.mockRestore()
    consoleErrorMock.mockRestore()
  })

  it('should render', async () => {
    await render(<FormField label="foo" id="bar" />)
    const formField = page.getByText('foo').element().closest('label')

    expect(formField).toBeInTheDocument()
  })

  it('passes props through to FormField', async () => {
    await render(<FormField label="foo" id="bar" data-automation="baz" />)
    const formField = page.getByText('foo').element().closest('label')

    expect(formField).toHaveAttribute('data-automation', 'baz')
  })

  it('should meet a11y standards', async () => {
    const { container } = await render(<FormField label="foo" id="bar" />)
    const axeCheck = await runAxeCheck(container)
    expect(axeCheck).toBe(true)
  })

  it('should focus the control with the supplied id', async () => {
    const user = userEvent.setup()
    await render(
      <FormField label="labelText" id="foo">
        <input />
        <input id="foo" />
        <input />
      </FormField>
    )
    const label = page.getByText('labelText').element().closest('label')!
    await user.click(label)
    const input = document.getElementById('foo')!
    expect(input).toHaveFocus()
  })
})
