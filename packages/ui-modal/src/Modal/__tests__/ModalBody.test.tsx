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

import { render, waitFor } from '@testing-library/react'
import { vi, beforeEach, afterEach } from 'vitest'
import '@testing-library/jest-dom'

import { color2hex } from '@instructure/ui-color-utils'
import canvas from '@instructure/ui-themes'
import { View } from '@instructure/ui-view/latest'
import type { ViewOwnProps } from '@instructure/ui-view/latest'

import { Modal, ModalBody, ModalHeader } from '@instructure/ui-modal/latest'

const BODY_TEXT = 'Modal-body-text'

describe('<ModalBody />', () => {
  it('should render', async () => {
    const { findByText } = render(<ModalBody>{BODY_TEXT}</ModalBody>)
    const modalBody = await findByText(BODY_TEXT)

    expect(modalBody).toBeInTheDocument()
  })

  it('should set inverse styles', async () => {
    const themeVariables = canvas.newTheme.components.ModalBody(
      canvas.newTheme.semantics(canvas.newTheme.primitives)
    )
    const { findByText } = render(
      <ModalBody variant="inverse">{BODY_TEXT}</ModalBody>
    )
    const modalBody = await findByText(BODY_TEXT)
    const modalBodyStyle = window.getComputedStyle(modalBody)
    const bodyBackground = color2hex(
      modalBodyStyle.getPropertyValue('background-color')
    )

    expect(modalBody).toBeInTheDocument()
    expect(bodyBackground).toBe(themeVariables.inverseBackgroundColor)
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

  describe('tab stop on a scrollable body', () => {
    let scrollHeightSpy: ReturnType<typeof vi.spyOn>
    let rectSpy: ReturnType<typeof vi.spyOn>
    let originalResizeObserver: typeof globalThis.ResizeObserver

    const mockScrollable = (scrollable: boolean) => {
      scrollHeightSpy = vi
        .spyOn(HTMLElement.prototype, 'scrollHeight', 'get')
        .mockReturnValue(scrollable ? 500 : 50)
      rectSpy = vi
        .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
        .mockReturnValue({
          height: 50,
          width: 100,
          top: 0,
          left: 0,
          right: 100,
          bottom: 50,
          x: 0,
          y: 0,
          toJSON: () => {}
        } as DOMRect)
    }

    beforeEach(() => {
      originalResizeObserver = globalThis.ResizeObserver
      globalThis.ResizeObserver = class {
        cb: ResizeObserverCallback
        constructor(cb: ResizeObserverCallback) {
          this.cb = cb
        }
        observe() {
          Promise.resolve().then(() =>
            this.cb([], this as unknown as ResizeObserver)
          )
        }
        unobserve() {}
        disconnect() {}
      } as unknown as typeof globalThis.ResizeObserver
    })

    afterEach(() => {
      scrollHeightSpy?.mockRestore()
      rectSpy?.mockRestore()
      globalThis.ResizeObserver = originalResizeObserver
    })

    it('is a tab stop when scrollable and it has no focusable children', async () => {
      mockScrollable(true)
      const { findByText } = render(<ModalBody>{BODY_TEXT}</ModalBody>)
      const body = await findByText(BODY_TEXT)

      await waitFor(() => expect(body).toHaveAttribute('tabindex', '0'))
    })

    it('is not a tab stop when scrollable but it has a focusable child', async () => {
      mockScrollable(true)
      const { findByText } = render(
        <ModalBody>
          <button>focusable</button>
          {BODY_TEXT}
        </ModalBody>
      )
      const body = await findByText(BODY_TEXT)

      await waitFor(() => expect(body).not.toHaveAttribute('tabindex'))
    })

    it('is not a tab stop when it is not scrollable', async () => {
      mockScrollable(false)
      const { findByText } = render(<ModalBody>{BODY_TEXT}</ModalBody>)
      const body = await findByText(BODY_TEXT)

      await waitFor(() => expect(body).toBeInTheDocument())
      expect(body).not.toHaveAttribute('tabindex')
    })

    it('drops the tab stop when a focusable child is added later', async () => {
      mockScrollable(true)
      const { findByText, rerender } = render(
        <ModalBody>{BODY_TEXT}</ModalBody>
      )
      const body = await findByText(BODY_TEXT)
      await waitFor(() => expect(body).toHaveAttribute('tabindex', '0'))

      rerender(
        <ModalBody>
          <button>focusable</button>
          {BODY_TEXT}
        </ModalBody>
      )

      await waitFor(() => expect(body).not.toHaveAttribute('tabindex'))
    })

    it('labels the scrollable body from the header with a space between adjacent text nodes', async () => {
      mockScrollable(true)
      // The header reproduces what a `Heading` with `aiVariant="stacked"`
      // renders: a decorative "IgniteAI" text node immediately followed by the
      // title, with no whitespace between them. The body's aria-label must not
      // collapse these into "IgniteAI Nutrition Facts".
      const { findByText } = render(
        <Modal
          open
          label="AI information"
          size="small"
          shouldReturnFocus={false}
          onDismiss={() => {}}
        >
          <ModalHeader>
            <span aria-hidden="true">IgniteAI</span>
            {'AI Nutrition Facts'}
          </ModalHeader>
          <ModalBody>{BODY_TEXT}</ModalBody>
        </Modal>
      )
      const body = await findByText(BODY_TEXT)

      await waitFor(() =>
        expect(body).toHaveAttribute(
          'aria-label',
          'IgniteAI AI Nutrition Facts'
        )
      )
    })
  })
})
