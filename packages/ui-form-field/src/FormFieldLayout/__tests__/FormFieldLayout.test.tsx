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

import { createRef } from 'react'
import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { FormFieldLayout } from '@instructure/ui-form-field/latest'

// Checks both the DOM (reading) order and the rendered position
const expectMessageAboveControl = (message: Element, control: Element) => {
  expect(
    message.compareDocumentPosition(control) & Node.DOCUMENT_POSITION_FOLLOWING
  ).toBeTruthy()
  expect(message.getBoundingClientRect().bottom).toBeLessThanOrEqual(
    control.getBoundingClientRect().top
  )
}

const expectMessageBelowControl = (message: Element, control: Element) => {
  expect(
    message.compareDocumentPosition(control) & Node.DOCUMENT_POSITION_PRECEDING
  ).toBeTruthy()
  expect(message.getBoundingClientRect().top).toBeGreaterThanOrEqual(
    control.getBoundingClientRect().bottom
  )
}

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

  it('should render', async () => {
    const { container } = await render(<FormFieldLayout label="Username" />)

    const formFieldLayout = container.querySelector(
      "label[class$='-formFieldLayout']"
    )
    const formFieldLabel = container.querySelector(
      "span[class$='-formFieldLayout__label']"
    )

    expect(formFieldLayout).toBeInTheDocument()
    expect(formFieldLabel).toBeInTheDocument()
    expect(formFieldLabel).toMatchTextContent('Username')
  })

  it('should meet a11y standards', async () => {
    const { container } = await render(<FormFieldLayout label="Username" />)

    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  it('should provide a ref to the input container', async () => {
    const inputContainerRef = vi.fn()
    const ref = createRef<HTMLInputElement>()
    await render(
      <FormFieldLayout label="Username" inputContainerRef={inputContainerRef}>
        <input type="text" ref={ref} />
      </FormFieldLayout>
    )
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(inputContainerRef).toHaveBeenCalledWith(ref.current!.parentElement)
  })

  describe('Component tests', () => {
    it('should align FormFieldLayout label to right by default', async () => {
      await page.viewport(800, 600)
      const { container } = await render(
        <FormFieldLayout label="Username" layout="inline">
          <input type="text" />
        </FormFieldLayout>
      )
      const label = container.querySelector(
        'span[class$="-formFieldLayout__label"]'
      )!

      expect(label).toMatchTextContent('Username')
      expect(window.getComputedStyle(label).textAlign).toBe('end')
    })

    it('should align FormFieldLayout label to left', async () => {
      await page.viewport(800, 600)
      const { container } = await render(
        <FormFieldLayout label="Username" layout="inline" labelAlign="start">
          <input type="text" />
        </FormFieldLayout>
      )
      const label = container.querySelector(
        'span[class$="-formFieldLayout__label"]'
      )!

      expect(label).toMatchTextContent('Username')
      expect(window.getComputedStyle(label).textAlign).toBe('start')
    })
  })

  describe('message placement', () => {
    // oxlint-disable-next-line vitest/expect-expect
    it('should render messages above the controls in stacked groups', async () => {
      await render(
        <FormFieldLayout
          label="Options"
          as="fieldset"
          isGroup
          messages={[{ type: 'hint', text: 'Group message' }]}
        >
          <input type="checkbox" aria-label="Option 1" />
        </FormFieldLayout>
      )
      expectMessageAboveControl(
        page.getByText('Group message').element(),
        page.getByLabelText('Option 1').element()
      )
    })
    // oxlint-disable-next-line vitest/expect-expect
    it('should render messages below the controls in stacked layout when not a group', async () => {
      await render(
        <FormFieldLayout
          label="Username"
          messages={[{ type: 'hint', text: 'Field message' }]}
        >
          <input type="text" />
        </FormFieldLayout>
      )
      expectMessageBelowControl(
        page.getByText('Field message').element(),
        page.getByRole('textbox').element()
      )
    })
    // oxlint-disable-next-line vitest/expect-expect
    it('should render messages above the controls in inline groups', async () => {
      await page.viewport(800, 600)
      await render(
        <FormFieldLayout
          label="Options"
          as="fieldset"
          layout="inline"
          isGroup
          messages={[{ type: 'hint', text: 'Group message' }]}
        >
          <input type="checkbox" aria-label="Option 1" />
        </FormFieldLayout>
      )
      expectMessageAboveControl(
        page.getByText('Group message').element(),
        page.getByLabelText('Option 1').element()
      )
    })
    // oxlint-disable-next-line vitest/expect-expect
    it('should render messages below the controls in inline layout when not a group', async () => {
      await page.viewport(800, 600)
      await render(
        <FormFieldLayout
          label="Username"
          layout="inline"
          messages={[{ type: 'hint', text: 'Field message' }]}
        >
          <input type="text" />
        </FormFieldLayout>
      )
      expectMessageBelowControl(
        page.getByText('Field message').element(),
        page.getByRole('textbox').element()
      )
    })
  })
})
