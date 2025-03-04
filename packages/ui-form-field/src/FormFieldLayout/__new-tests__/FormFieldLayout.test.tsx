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
import { vi } from 'vitest'
import { runAxeCheck } from '@instructure/ui-axe-check'
import '@testing-library/jest-dom'

import { FormFieldLayout } from '../index'

describe('<FormFieldLayout />', () => {
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

  it('should render', () => {
    const { container } = render(<FormFieldLayout label="Username" />)

    const formFieldLayout = container.querySelector(
      "label[class$='-formFieldLayout']"
    )
    const formFieldLabel = container.querySelector(
      "span[class$='-formFieldLayout__label']"
    )

    expect(formFieldLayout).toBeInTheDocument()
    expect(formFieldLabel).toBeInTheDocument()
    expect(formFieldLabel).toHaveTextContent('Username')
  })

  it('should meet a11y standards', async () => {
    const { container } = render(<FormFieldLayout label="Username" />)

    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  it('should provide a ref to the input container', () => {
    const inputContainerRef = vi.fn()
    const ref = React.createRef<HTMLInputElement>()
    render(
      <FormFieldLayout label="Username" inputContainerRef={inputContainerRef}>
        <input type="text" ref={ref} />
      </FormFieldLayout>
    )
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(inputContainerRef).toHaveBeenCalledWith(ref.current!.parentElement)
  })
})
