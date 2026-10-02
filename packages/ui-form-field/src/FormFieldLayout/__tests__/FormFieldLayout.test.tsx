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
import { page, userEvent } from 'vitest/browser'
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
    const { container } = await render(
      <FormFieldLayout id="ffl-control" label="Username" />
    )

    const formFieldLayout = container.querySelector(
      "div[class$='-formFieldLayout']"
    )
    const formFieldLabel = container.querySelector(
      "label[class$='-formFieldLayout__label']"
    )

    expect(formFieldLayout).toBeInTheDocument()
    expect(formFieldLabel).toBeInTheDocument()
    expect(formFieldLabel).toMatchTextContent('Username')
  })

  it('should meet a11y standards', async () => {
    const { container } = await render(
      <FormFieldLayout id="ffl-control" label="Username" />
    )

    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  it('should provide a ref to the input container', async () => {
    const inputContainerRef = vi.fn()
    const ref = createRef<HTMLInputElement>()
    await render(
      <FormFieldLayout
        id="ffl-control"
        label="Username"
        inputContainerRef={inputContainerRef}
      >
        <input type="text" id="ffl-control" ref={ref} />
      </FormFieldLayout>
    )
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(inputContainerRef).toHaveBeenCalledWith(ref.current!.parentElement)
  })

  describe('Component tests', () => {
    it('should align FormFieldLayout label to right by default', async () => {
      await page.viewport(800, 600)
      const { container } = await render(
        <FormFieldLayout id="ffl-control" label="Username" layout="inline">
          <input type="text" />
        </FormFieldLayout>
      )
      const label = container.querySelector(
        'label[class$="-formFieldLayout__label"]'
      )!

      expect(label).toMatchTextContent('Username')
      expect(window.getComputedStyle(label).textAlign).toBe('end')
    })

    it('should align FormFieldLayout label to left', async () => {
      await page.viewport(800, 600)
      const { container } = await render(
        <FormFieldLayout
          id="ffl-control"
          label="Username"
          layout="inline"
          labelAlign="start"
        >
          <input type="text" />
        </FormFieldLayout>
      )
      const label = container.querySelector(
        'label[class$="-formFieldLayout__label"]'
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
          id="ffl-control"
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
          id="ffl-control"
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
          id="ffl-control"
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
          id="ffl-control"
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

  describe('label association', () => {
    it('should link the label to the control via `for`', async () => {
      const { container } = await render(
        <FormFieldLayout id="ffl-control" label="Username">
          <input type="text" id="ffl-control" />
        </FormFieldLayout>
      )
      const label = container.querySelector('label')!

      expect(label).toHaveAttribute('for', 'ffl-control')
      expect(label).toMatchTextContent('Username')
      expect(label.querySelector('input')).toBeNull()
    })

    it('should keep messages and other content out of the accessible name', async () => {
      await render(
        <FormFieldLayout
          id="ffl-control"
          label="Username"
          messages={[{ type: 'error', text: 'Required' }]}
        >
          <button type="button">Clear</button>
          <input type="text" id="ffl-control" />
        </FormFieldLayout>
      )

      await expect
        .element(page.getByRole('textbox'))
        .toHaveAccessibleName('Username')
    })

    it('should link a visually hidden label to the control', async () => {
      await render(
        <FormFieldLayout
          id="ffl-control"
          label={
            <span style={{ position: 'absolute', clip: 'rect(0 0 0 0)' }}>
              Username
            </span>
          }
        >
          <input type="text" id="ffl-control" />
        </FormFieldLayout>
      )

      await expect
        .element(page.getByRole('textbox'))
        .toHaveAccessibleName('Username')
    })
  })

  describe('children as a function', () => {
    it('should pass the id of the rendered messages as describedBy', async () => {
      await render(
        <FormFieldLayout
          id="ffl-control"
          label="Username"
          messages={[{ type: 'hint', text: 'Some hint' }]}
        >
          {({ describedBy }) => (
            <input
              type="text"
              id="ffl-control"
              aria-describedby={describedBy}
            />
          )}
        </FormFieldLayout>
      )

      await expect
        .element(page.getByRole('textbox'))
        .toHaveAccessibleDescription('Some hint')
    })

    it('should pass undefined when there are no messages', async () => {
      const children = vi.fn(() => <input type="text" id="ffl-control" />)
      await render(
        <FormFieldLayout id="ffl-control" label="Username">
          {children}
        </FormFieldLayout>
      )

      expect(children).toHaveBeenCalledWith({ describedBy: undefined })
    })

    it('should pass undefined when all messages are hidden', async () => {
      const children = vi.fn(() => <input type="text" id="ffl-control" />)
      await render(
        <FormFieldLayout
          id="ffl-control"
          label="Username"
          readOnly
          messages={[{ type: 'error', text: 'Some error' }]}
        >
          {children}
        </FormFieldLayout>
      )

      expect(children).toHaveBeenCalledWith({ describedBy: undefined })
      expect(page.getByText('Some error').query()).toBeNull()
    })
  })

  describe('clicks in the control area', () => {
    it('should focus and click the control when clicking non-interactive content', async () => {
      const onClick = vi.fn()
      await render(
        <FormFieldLayout id="ffl-control" label="Username">
          <span data-testid="icon">icon</span>
          <input type="text" id="ffl-control" onClick={onClick} />
        </FormFieldLayout>
      )
      await userEvent.click(page.getByTestId('icon'))

      await expect.element(page.getByRole('textbox')).toHaveFocus()
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('should not forward clicks on interactive content', async () => {
      const onClick = vi.fn()
      await render(
        <FormFieldLayout id="ffl-control" label="Username">
          <button type="button">Clear</button>
          <input type="text" id="ffl-control" onClick={onClick} />
        </FormFieldLayout>
      )
      await userEvent.click(page.getByRole('button'))

      await expect.element(page.getByRole('button')).toHaveFocus()
      expect(onClick).not.toHaveBeenCalled()
    })

    it('should not forward clicks on messages', async () => {
      const onClick = vi.fn()
      await render(
        <FormFieldLayout
          id="ffl-control"
          label="Username"
          messages={[{ type: 'hint', text: 'Some hint' }]}
        >
          <input type="text" id="ffl-control" onClick={onClick} />
        </FormFieldLayout>
      )
      await userEvent.click(page.getByText('Some hint'))

      expect(onClick).not.toHaveBeenCalled()
    })

    it('should forward the click only once when nested', async () => {
      const onClick = vi.fn()
      await render(
        <FormFieldLayout id="ffl-control" label="Outer">
          <FormFieldLayout id="ffl-control" label="Inner">
            <span data-testid="icon">icon</span>
            <input type="text" id="ffl-control" onClick={onClick} />
          </FormFieldLayout>
        </FormFieldLayout>
      )
      await userEvent.click(page.getByTestId('icon'))

      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })
})
