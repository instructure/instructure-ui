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
})
