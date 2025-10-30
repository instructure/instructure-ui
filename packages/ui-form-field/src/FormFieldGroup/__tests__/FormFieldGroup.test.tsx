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
import { runAxeCheck } from '@instructure/ui-axe-check'
import '@testing-library/jest-dom'

import { FormFieldGroup } from '../index'
import { FormMessage } from '../../FormPropTypes'

describe('<FormFieldGroup />', () => {
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
    const { container } = render(
      <FormFieldGroup description="Please enter your full name">
        <label>
          First: <input />
        </label>
        <label>
          Middle: <input />
        </label>
        <label>
          Last: <input />
        </label>
      </FormFieldGroup>
    )

    const formFieldGroup = container.querySelector(
      "span[class$='-formFieldLayout__label']"
    )
    const firstNameInput = screen.getByLabelText('First:')
    const middleNameInput = screen.getByLabelText('Middle:')
    const lastNameInput = screen.getByLabelText('Last:')

    expect(formFieldGroup).toBeInTheDocument()
    expect(formFieldGroup).toHaveTextContent('Please enter your full name')

    expect(firstNameInput).toBeInTheDocument()
    expect(middleNameInput).toBeInTheDocument()
    expect(lastNameInput).toBeInTheDocument()
  })

  it('can handle null children', () => {
    const children = [
      <label key="first">
        First: <input />
      </label>,
      null
    ]

    const { container } = render(
      <FormFieldGroup description="Please enter your full name">
        {children}
      </FormFieldGroup>
    )

    const formFieldGroup = container.querySelector('label')

    expect(formFieldGroup).toBeInTheDocument()
  })

  it('links the messages to the fieldset via aria-describedby', () => {
    const messages: FormMessage[] = [{ text: 'Invalid name', type: 'error' }]

    const { container } = render(
      <FormFieldGroup
        description="Please enter your full name"
        messages={messages}
      >
        <label>
          First: <input />
        </label>
        <label>
          Middle: <input />
        </label>
        <label>
          Last: <input />
        </label>
      </FormFieldGroup>
    )

    const formFieldGroup = container.querySelector(
      "fieldset[class$='-formFieldLayout']"
    )
    const message = container.querySelector("div[id^='FormFieldLayout_']")

    expect(message).toBeInTheDocument()
    expect(formFieldGroup).toBeInTheDocument()
    expect(formFieldGroup).toHaveAttribute('aria-describedby')

    const messagesId = formFieldGroup!.getAttribute('aria-describedby')

    expect(message).toHaveTextContent('Invalid name')
    expect(message).toHaveAttribute('id', messagesId)
  })

  it('displays description message inside the label', () => {
    const description = 'Please enter your full name'

    const { container } = render(
      <FormFieldGroup description={description}>
        <label>
          First: <input />
        </label>
        <label>
          Middle: <input />
        </label>
        <label>
          Last: <input />
        </label>
      </FormFieldGroup>
    )

    const legend = container.querySelector(
      "span[class$='-formFieldLayout__label']"
    )

    expect(legend).toBeInTheDocument()
    expect(legend).toHaveTextContent(description)
  })

  it('should meet a11y standards', async () => {
    const { container } = render(
      <FormFieldGroup description="Please enter your full name">
        <label>
          First: <input />
        </label>
        <label>
          Middle: <input />
        </label>
        <label>
          Last: <input />
        </label>
      </FormFieldGroup>
    )

    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  describe('margin prop', () => {
    it('should apply margin with custom CSS value and with tokens', () => {
      const { container } = render(
        <div>
          <FormFieldGroup description="Group 1" margin="30px">
            <input />
          </FormFieldGroup>
          <FormFieldGroup description="Group 2" margin="large">
            <input />
          </FormFieldGroup>
          <FormFieldGroup description="Group 3" margin="space4">
            <input />
          </FormFieldGroup>
          <FormFieldGroup description="Group 4" margin="small 20px">
            <input />
          </FormFieldGroup>
        </div>
      )

      const allFieldsets = container.querySelectorAll('fieldset')

      const fieldsetCustom = allFieldsets[0] as HTMLElement
      const fieldsetCustomStyle = window.getComputedStyle(fieldsetCustom)
      const fieldsetLarge = allFieldsets[1] as HTMLElement
      const fieldsetLargeStyle = window.getComputedStyle(fieldsetLarge)
      const fieldsetSpace = allFieldsets[2] as HTMLElement
      const fieldsetSpaceStyle = window.getComputedStyle(fieldsetSpace)
      const fieldsetMixed = allFieldsets[3] as HTMLElement
      const fieldsetMixedStyle = window.getComputedStyle(fieldsetMixed)

      expect(fieldsetCustomStyle.margin).toBe('30px')
      expect(fieldsetLargeStyle.margin).toBe('2.25rem')
      expect(fieldsetSpaceStyle.margin).toBe('0.25rem')
      expect(fieldsetMixedStyle.margin).toBe('0.75rem 20px')
    })
  })
})
