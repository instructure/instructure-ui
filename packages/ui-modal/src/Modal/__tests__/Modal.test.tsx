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

import { Component } from 'react'
import { fireEvent } from '@testing-library/dom'
import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
  vi
} from 'vitest'
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from '@instructure/ui-modal/latest'
import type { ModalProps } from '@instructure/ui-modal/latest'
import { View } from '@instructure/ui-view/latest'

describe('<Modal />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>
  const originalScroll = window.scroll

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

  beforeAll(() => {
    // Mocking window.scroll to prevent test output pollution
    Object.defineProperty(window, 'scroll', {
      value: vi.fn(),
      writable: true
    })
  })

  afterAll(() => {
    window.scroll = originalScroll
  })

  it('should render nothing and have a node with no parent when closed', async () => {
    const { container } = await render(
      <Modal label="Modal Dialog" shouldReturnFocus={false}>
        <Modal.Body>Foo Bar Baz</Modal.Body>
      </Modal>
    )
    expect(container.firstChild).not.toBeInTheDocument()
  })

  it('should apply theme overrides when open', async () => {
    const testFont = 'test-font'
    const bodyText = 'Modal-body-text'
    await render(
      <Modal
        open
        size="small"
        label="Modal Dialog"
        shouldReturnFocus={false}
        themeOverride={{ fontFamily: testFont }}
      >
        <Modal.Body>{bodyText}</Modal.Body>
      </Modal>
    )
    const modalBody = page.getByText(bodyText).element()
    const dialog = page.getByRole('dialog').element()
    const dialogStyle = window.getComputedStyle(dialog)

    expect(modalBody).toBeInTheDocument()
    expect(dialogStyle.fontFamily).toBe(testFont)
  })

  it('should render its own positioning context if constrained to parent', async () => {
    await render(
      <Modal
        open
        label="Modal Dialog"
        shouldReturnFocus={false}
        constrain="parent"
      >
        <Modal.Body>Foo Bar Baz</Modal.Body>
      </Modal>
    )
    const dialog = page.getByRole('dialog').element()
    const constrain = document.querySelector("[class*='constrainContext']")

    expect(dialog).toBeInTheDocument()
    expect(constrain).toBeInTheDocument()
  })

  it("should not inherit its parent's font color", async () => {
    await render(
      <div style={{ color: 'rgb(255, 255, 255)' }}>
        <Modal
          open
          label="Modal Dialog"
          shouldReturnFocus={false}
          constrain="parent"
          themeOverride={{ textColor: 'rgb(0, 0, 0)' }}
        >
          <Modal.Body>Foo Bar Baz</Modal.Body>
        </Modal>
      </div>
    )
    const dialog = page.getByRole('dialog').element()
    const dialogStyle = window.getComputedStyle(dialog)

    expect(dialog).toBeInTheDocument()
    expect(dialogStyle.color).toBe('rgb(0, 0, 0)')
  })

  it('should pass `as` prop to the dialog', async () => {
    const { rerender } = await render(
      <Modal open label="Modal Dialog" shouldReturnFocus={false}>
        <Modal.Body>Foo Bar Baz</Modal.Body>
      </Modal>
    )
    const dialog = page.getByRole('dialog').element()

    expect(dialog).toBeInTheDocument()
    expect(dialog.tagName).toBe('SPAN')

    await rerender(
      <Modal as="form" open label="Modal Dialog" shouldReturnFocus={false}>
        <Modal.Body>Foo Bar Baz</Modal.Body>
      </Modal>
    )

    await vi.waitFor(() =>
      expect(page.getByRole('dialog').element().tagName).toBe('FORM')
    )
  })

  it('should handle null children', async () => {
    const bodyText = 'Modal-body-text'
    await render(
      <Modal open label="Modal Dialog" shouldReturnFocus={false}>
        {null}
        <Modal.Body>{bodyText}</Modal.Body>
        {null}
      </Modal>
    )
    const modalBody = page.getByText(bodyText).element()

    expect(modalBody).toBeInTheDocument()
  })

  it('should handle custom children', async () => {
    const bodyText = 'Modal-body-text'
    await render(
      <Modal open label="Modal Dialog" shouldReturnFocus={false}>
        <View>This is a custom child</View>
        <Modal.Body>{bodyText}</Modal.Body>
      </Modal>
    )
    const modalBody = page.getByText(bodyText).element()
    const customChild = page.getByText('This is a custom child').element()

    expect(modalBody).toBeInTheDocument()
    expect(customChild).toBeInTheDocument()
  })

  it('should apply the aria attributes', async () => {
    await render(
      <Modal open label="Modal Dialog" shouldReturnFocus={false}>
        <Modal.Body>Foo Bar Baz</Modal.Body>
      </Modal>
    )
    const dialog = page.getByRole('dialog').element()

    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveAttribute('aria-label', 'Modal Dialog')
  })

  it('should use transition', async () => {
    const onEnter = vi.fn()
    const onEntering = vi.fn()
    const onEntered = vi.fn()

    await render(
      <Modal
        open
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        transition="fade"
        label="Modal Dialog"
        shouldReturnFocus={false}
      >
        <Modal.Body>Foo Bar Baz</Modal.Body>
      </Modal>
    )
    const dialog = page.getByRole('dialog').element()

    expect(dialog).toBeInTheDocument()

    await vi.waitFor(() => {
      expect(onEnter).toHaveBeenCalled()
      expect(onEntering).toHaveBeenCalled()
      expect(onEntered).toHaveBeenCalled()
    })
  })

  it('should support onOpen prop', async () => {
    const onOpen = vi.fn()
    await render(
      <Modal
        open
        onOpen={onOpen}
        label="Modal Dialog"
        shouldReturnFocus={false}
      >
        <Modal.Body>Foo Bar Baz</Modal.Body>
      </Modal>
    )
    const dialog = page.getByRole('dialog').element()

    expect(dialog).toBeInTheDocument()

    await vi.waitFor(() => {
      expect(onOpen).toHaveBeenCalled()
    })
  })

  it('should support onClose prop', async () => {
    const onClose = vi.fn()

    const { rerender } = await render(
      <Modal
        open
        onClose={onClose}
        label="Modal Dialog"
        shouldReturnFocus={false}
      >
        <Modal.Body>Foo Bar Baz</Modal.Body>
      </Modal>
    )
    const dialog = page.getByRole('dialog').element()

    expect(dialog).toBeInTheDocument()

    rerender(
      <Modal
        open={false}
        onClose={onClose}
        label="Modal Dialog"
        shouldReturnFocus={false}
      >
        <Modal.Body>Foo Bar Baz</Modal.Body>
      </Modal>
    )

    await vi.waitFor(() => {
      expect(onClose).toHaveBeenCalled()
    })
  })

  it('should dismiss when overlay clicked by default', async () => {
    const onDismiss = vi.fn()
    await render(
      <Modal
        open
        onDismiss={onDismiss}
        label="Modal Dialog"
        shouldReturnFocus={false}
      >
        <Modal.Body>Modal Text</Modal.Body>
      </Modal>
    )
    const modalBody = page.getByText('Modal Text').element()

    expect(modalBody).toBeInTheDocument()

    // click outside of the modal content
    await userEvent.click(document.body, { position: { x: 0, y: 0 } })

    await vi.waitFor(() => {
      expect(onDismiss).toHaveBeenCalled()
    })
  })

  it('should NOT dismiss when overlay clicked with shouldCloseOnDocumentClick=false', async () => {
    const onDismiss = vi.fn()
    const onClickOuter = vi.fn()

    await render(
      <div>
        <button data-testid="outer-element" onClick={onClickOuter}>
          for dismiss
        </button>
        <Modal
          open
          onDismiss={onDismiss}
          label="Modal Dialog"
          shouldReturnFocus={false}
          shouldCloseOnDocumentClick={false}
        >
          <Modal.Body>
            Foo Bar Baz <button>click me</button>
          </Modal.Body>
        </Modal>
      </div>
    )
    const dialog = page.getByRole('dialog').element()

    expect(dialog).toBeInTheDocument()

    // the modal's overlay covers the button, so a real click can't reach it
    fireEvent.click(page.getByTestId('outer-element').element(), {
      button: 0,
      detail: 1
    })

    await vi.waitFor(() => {
      expect(onClickOuter).toHaveBeenCalled()
      expect(onDismiss).not.toHaveBeenCalled()
      expect(dialog).toBeInTheDocument()
    })
  })

  it('should render children', async () => {
    await render(
      <Modal open label="Modal Dialog" shouldReturnFocus={false}>
        <Modal.Body>
          <button>Cancel</button>
        </Modal.Body>
      </Modal>
    )
    const cancelButton = page.getByText('Cancel').element()

    expect(cancelButton).toBeInTheDocument()
  })

  describe('children validation', () => {
    it('should pass validation when children are valid', async () => {
      await render(
        <Modal open label="Modal Dialog" shouldReturnFocus={false}>
          <Modal.Header>Hello World</Modal.Header>
          <Modal.Body>Foo Bar Baz</Modal.Body>
          <Modal.Footer>
            <button>Cancel</button>
          </Modal.Footer>
        </Modal>
      )
      const dialog = page.getByRole('dialog').element()

      expect(dialog).toBeInTheDocument()
      expect(consoleErrorMock).not.toHaveBeenCalled()
    })

    it('should pass inverse variant to children when set', async () => {
      let headerRef: ModalHeader | null = null
      let bodyRef: ModalBody | null = null
      let footerRef: ModalFooter | null = null

      await render(
        <Modal
          open
          label="Dark Modal"
          shouldReturnFocus={false}
          variant="inverse"
        >
          <Modal.Header
            ref={(el) => {
              headerRef = el
            }}
          >
            header
          </Modal.Header>
          <Modal.Body
            ref={(el) => {
              bodyRef = el
            }}
          >
            body
          </Modal.Body>
          <Modal.Footer
            ref={(el) => {
              footerRef = el
            }}
          >
            footer
          </Modal.Footer>
        </Modal>
      )
      const dialog = page.getByRole('dialog').element()

      expect(dialog).toBeInTheDocument()
      expect(headerRef!.props.variant).toBe('inverse')
      expect(bodyRef!.props.variant).toBe('inverse')
      expect(footerRef!.props.variant).toBe('inverse')
    })

    it('should pass overflow to Modal.Body', async () => {
      let bodyRef: ModalBody | null = null

      await render(
        <Modal open label="Modal" shouldReturnFocus={false} overflow="fit">
          <Modal.Body
            ref={(el) => {
              bodyRef = el
            }}
          >
            body
          </Modal.Body>
        </Modal>
      )
      const dialog = page.getByRole('dialog').element()

      expect(dialog).toBeInTheDocument()
      expect(bodyRef!.props.overflow).toBe('fit')
    })
  })

  describe('managed focus', () => {
    class ModalExample extends Component<Partial<ModalProps>> {
      render() {
        const { label, ...props } = this.props

        return (
          <div>
            <input type="text" />
            <Modal label={label!} {...props}>
              <Modal.Header>
                <button>Close</button>
              </Modal.Header>
              <Modal.Body>
                <input type="text" id="input-one" data-testid="input-first" />
                <input type="text" id="input-two" data-testid="input-second" />
              </Modal.Body>
              <Modal.Footer>
                <button>Cancel</button>
              </Modal.Footer>
            </Modal>
          </div>
        )
      }
    }

    it('should focus closeButton by default', async () => {
      await render(<ModalExample open label="A Modal" />)
      const closeButton = page.getByText('Close').element()

      expect(closeButton).toBeInTheDocument()

      await vi.waitFor(() => {
        expect(document.activeElement).toBe(closeButton)
      })
    })

    it('should take a prop for finding default focus', async () => {
      await render(
        <ModalExample
          open
          label="A Modal"
          defaultFocusElement={() => document.getElementById('input-one')}
        />
      )
      const input = page.getByTestId('input-first').element()

      await vi.waitFor(() => {
        expect(input).toHaveFocus()
      })
    })
  })
})
