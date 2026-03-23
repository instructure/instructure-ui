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
import { vi } from 'vitest'
import '@testing-library/jest-dom'

import { color2hex } from '@instructure/ui-color-utils'
import canvas from '@instructure/ui-themes'
import { View } from '@instructure/ui-view'
import type { ViewOwnProps } from '@instructure/ui-view'

import { ModalBody } from '../index'
import generateComponentTheme from '../theme'

const BODY_TEXT = 'Modal-body-text'

describe('<ModalBody />', () => {
  it('should render', async () => {
    const { findByText } = render(<ModalBody>{BODY_TEXT}</ModalBody>)
    const modalBody = await findByText(BODY_TEXT)

    expect(modalBody).toBeInTheDocument()
  })

  it('should set inverse styles', async () => {
    const themeVariables = generateComponentTheme(canvas)
    const { findByText } = render(
      <ModalBody variant="inverse">{BODY_TEXT}</ModalBody>
    )
    const modalBody = await findByText(BODY_TEXT)
    const modalBodyStyle = window.getComputedStyle(modalBody)
    const bodyBackground = color2hex(
      modalBodyStyle.getPropertyValue('background-color')
    )

    expect(modalBody).toBeInTheDocument()
    expect(bodyBackground).toBe(themeVariables.inverseBackground)
  })

  it('should set the same width and height as the parent when overflow is set to fit', async () => {
    const { findByText } = render(
      <div style={{ width: '500px', height: '600px' }}>
        <ModalBody overflow="fit">{BODY_TEXT}</ModalBody>
      </div>
    )
    const modalBody = await findByText(BODY_TEXT)
    const modalBodyStyle = window.getComputedStyle(modalBody)

    expect(modalBodyStyle.width).toBe('100%')
    expect(modalBodyStyle.height).toBe('100%')
  })

  describe('when passing down props to View', () => {
    const allowedProps: Partial<ViewOwnProps> = {
      padding: 'small',
      elementRef: () => {},
      as: 'section'
    }

    const allProps = View.allowedProps.filter((prop) => prop !== 'children')

    allProps.forEach((prop) => {
      if (prop in allowedProps) {
        it(`should allow the '${prop}' prop`, () => {
          const consoleErrorSpy = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})
          const props = { [prop]: allowedProps[prop] }
          render(<ModalBody {...props} />)

          expect(consoleErrorSpy).not.toHaveBeenCalled()

          consoleErrorSpy.mockRestore()
        })
      } else {
        it(`should NOT allow the '${prop}' prop`, () => {
          const expectedErrorMessage = `prop '${prop}' is not allowed.`
          const consoleErrorSpy = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

          const props = { [prop]: 'NOT_ALLOWED_VALUE' }
          render(<ModalBody {...props} />)

          expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining(expectedErrorMessage),
            expect.any(String)
          )
          consoleErrorSpy.mockRestore()
        })
      }
    })
  })
})
