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
import { runAxeCheck } from '@instructure/ui-axe-check'
import { IconWarningLine } from '@instructure/ui-icons'
import '@testing-library/jest-dom'

import { FormFieldMessage } from '../index'

describe('<FormFieldMessage />', () => {
  it('should render message', () => {
    const { container } = render(
      <FormFieldMessage>hello world</FormFieldMessage>
    )

    const formFieldMessage = container.querySelector(
      "span[class$='-formFieldMessage']"
    )

    expect(formFieldMessage).toBeInTheDocument()
    expect(formFieldMessage).toHaveTextContent('hello world')
  })

  it('should render message if Node is passed', () => {
    const { container } = render(
      <FormFieldMessage>
        <span>
          <IconWarningLine /> Invalid name
        </span>
      </FormFieldMessage>
    )

    const formFieldMessage = container.querySelector(
      "span[class$='-formFieldMessage']"
    )
    const iconSvg = container.querySelector('svg[name="IconWarning"]')

    expect(iconSvg).toBeInTheDocument()
    expect(formFieldMessage).toBeInTheDocument()
    expect(formFieldMessage).toHaveTextContent('Invalid name')
  })

  it('should meet a11y standards', async () => {
    const { container } = render(<FormFieldMessage />)

    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })
})
