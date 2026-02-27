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
import '@testing-library/jest-dom'

import canvas from '@instructure/ui-themes'
import { color2hex } from '@instructure/ui-color-utils'

import { ModalFooter } from '../index'

const FOOTER_TEXT = 'Modal-footer-text'

describe('<ModalFooter />', () => {
  it('should render', async () => {
    const { findByText } = render(<ModalFooter>{FOOTER_TEXT}</ModalFooter>)
    const modalFooter = await findByText(FOOTER_TEXT)

    expect(modalFooter).toBeInTheDocument()
  })

  it('should set inverse styles', async () => {
    const themeVariables = canvas.newTheme.components.ModalFooter
    const { findByText } = render(
      <ModalFooter variant="inverse">{FOOTER_TEXT}</ModalFooter>
    )
    const modalFooter = await findByText(FOOTER_TEXT)

    const modalFooterStyle = window.getComputedStyle(modalFooter)
    const footerBackground = color2hex(
      modalFooterStyle.getPropertyValue('background-color')
    )
    const footerBorderColor = color2hex(
      modalFooterStyle.getPropertyValue('border-top-color')
    )

    expect(modalFooter).toBeInTheDocument()
    expect(footerBackground).toBe(themeVariables.inverseBackgroundColor)
    expect(footerBorderColor).toBe(themeVariables.inverseBorderColor)
  })
})
