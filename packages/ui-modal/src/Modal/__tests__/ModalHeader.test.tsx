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

import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { describe, it, expect } from 'vitest'

import canvas from '@instructure/ui-themes'
import { color2hex } from '@instructure/ui-color-utils'

import { ModalHeader } from '@instructure/ui-modal/latest'

const HEADER_TEXT = 'Modal-footer-text'

// the browser resolves the theme's `rem` values to `px` in computed styles
const remToPx = (value: string) =>
  value.replace(/([\d.]+)rem/g, (_match, rem) => `${parseFloat(rem) * 16}px`)

describe('<ModalHeader />', () => {
  it('should render', async () => {
    await render(<ModalHeader>{HEADER_TEXT}</ModalHeader>)
    const modalHeader = page.getByText(HEADER_TEXT).element()

    expect(modalHeader).toBeInTheDocument()
  })

  it('should set inverse styles', async () => {
    const themeVariables = canvas.newTheme.components.ModalHeader(
      canvas.newTheme.semantics(canvas.newTheme.primitives)
    )
    await render(<ModalHeader variant="inverse">{HEADER_TEXT}</ModalHeader>)
    const modalHeader = page.getByText(HEADER_TEXT).element()

    const modalHeaderStyle = window.getComputedStyle(modalHeader)
    const headerBackground = color2hex(
      modalHeaderStyle.getPropertyValue('background-color')
    )
    const headerBorderColor = color2hex(
      modalHeaderStyle.getPropertyValue('border-bottom-color')
    )

    expect(modalHeader).toBeInTheDocument()
    expect(headerBackground).toBe(themeVariables.inverseBackgroundColor)
    expect(headerBorderColor).toBe(themeVariables.inverseBorderColor)
  })

  describe('spacing prop', () => {
    it('should be correct by default', async () => {
      const themeVariables = canvas.newTheme.components.ModalHeader(
        canvas.newTheme.semantics(canvas.newTheme.primitives)
      )
      await render(<ModalHeader>{HEADER_TEXT}</ModalHeader>)
      const modalHeader = page.getByText(HEADER_TEXT).element()

      const modalHeaderStyle = window.getComputedStyle(modalHeader)
      const headerPadding = modalHeaderStyle.padding

      expect(modalHeader).toBeInTheDocument()
      expect(headerPadding).toBe(remToPx(themeVariables.padding))
    })

    it('should correctly set default spacing', async () => {
      const themeVariables = canvas.newTheme.components.ModalHeader(
        canvas.newTheme.semantics(canvas.newTheme.primitives)
      )
      await render(<ModalHeader spacing="default">{HEADER_TEXT}</ModalHeader>)
      const modalHeader = page.getByText(HEADER_TEXT).element()

      const modalHeaderStyle = window.getComputedStyle(modalHeader)
      const headerPadding = modalHeaderStyle.padding

      expect(modalHeader).toBeInTheDocument()
      expect(headerPadding).toBe(remToPx(themeVariables.padding))
    })

    it('should correctly set compact spacing', async () => {
      const themeVariables = canvas.newTheme.components.ModalHeader(
        canvas.newTheme.semantics(canvas.newTheme.primitives)
      )
      await render(<ModalHeader spacing="compact">{HEADER_TEXT}</ModalHeader>)
      const modalHeader = page.getByText(HEADER_TEXT).element()

      const modalHeaderStyle = window.getComputedStyle(modalHeader)
      const headerPadding = modalHeaderStyle.padding

      expect(modalHeader).toBeInTheDocument()
      expect(headerPadding).toBe(remToPx(themeVariables.paddingCompact))
    })
  })
})
