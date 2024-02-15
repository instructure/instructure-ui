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
import { act, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { Modal, ModalHeader, ModalBody, ModalFooter } from '../index'
import type { ModalProps } from '../props'

describe('<Modal />', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('should dismiss when overlay clicked by default V1 copy', async () => {
    const onDismiss = jest.fn()
    const { findByText } = render(
      <Modal
        open
        onDismiss={onDismiss}
        label="Modal Dialog"
        shouldReturnFocus={false}
      >
        <Modal.Body>Modal Text</Modal.Body>
      </Modal>
    )
    const modalBody = await findByText('Modal Text')

    expect(modalBody).toBeInTheDocument()

    await userEvent.click(document.body)

    await waitFor(() => {
      // V1 copy
      expect(onDismiss).toHaveBeenCalled()
    })
  })

  it('should render nothing and have a node with no parent when closed', () => {
    const { container } = render(
      <Modal label="Modal Dialog" shouldReturnFocus={false}>
        <Modal.Body>Foo Bar Baz</Modal.Body>
      </Modal>
    )
    expect(container.firstChild).not.toBeInTheDocument()
  })

  it('should apply theme overrides when open', async () => {
    const testFont = 'test-font'
    const bodyText = 'Modal-body-text'
    const { findByText, findByRole } = render(
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
    const modalBody = await findByText(bodyText)
    const dialog = await findByRole('dialog')
    const dialogStyle = window.getComputedStyle(dialog)

    expect(modalBody).toBeInTheDocument()
    expect(dialogStyle.fontFamily).toBe(testFont)
  })

  it('should render its own positioning context if constrained to parent', async () => {
    const { findByRole } = render(
      <Modal
        open
        label="Modal Dialog"
        shouldReturnFocus={false}
        constrain="parent"
      >
        <Modal.Body>Foo Bar Baz</Modal.Body>
      </Modal>
    )
    const dialog = await findByRole('dialog')
    const constrain = document.querySelector("[class*='constrainContext']")

    expect(dialog).toBeInTheDocument()
    expect(constrain).toBeInTheDocument()
  })

  it("should not inherit its parent's font color", async () => {
    const { findByRole } = render(
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
    const dialog = await findByRole('dialog')
    const dialogStyle = window.getComputedStyle(dialog)

    expect(dialog).toBeInTheDocument()
    expect(dialogStyle.color).toBe('rgb(0, 0, 0)')
  })

  it('should pass `as` prop to the dialog', async () => {
    const { findByRole, rerender } = render(
      <Modal open label="Modal Dialog" shouldReturnFocus={false}>
        <Modal.Body>Foo Bar Baz</Modal.Body>
      </Modal>
    )
    const dialog = await findByRole('dialog')

    expect(dialog).toBeInTheDocument()
    expect(dialog.tagName).toBe('SPAN')

    rerender(
      <Modal as="form" open label="Modal Dialog" shouldReturnFocus={false}>
        <Modal.Body>Foo Bar Baz</Modal.Body>
      </Modal>
    )
    const dialogForm = await findByRole('dialog')

    expect(dialogForm.tagName).toBe('FORM')
  })

  it('should handle null children', async () => {
    const bodyText = 'Modal-body-text'
    const { findByText } = render(
      <Modal open label="Modal Dialog" shouldReturnFocus={false}>
        {null}
        <Modal.Body>{bodyText}</Modal.Body>
        {null}
      </Modal>
    )
    const modalBody = await findByText(bodyText)

    expect(modalBody).toBeInTheDocument()
  })

  it('should apply the aria attributes', async () => {
    const { findByRole } = render(
      <Modal open label="Modal Dialog" shouldReturnFocus={false}>
        <Modal.Body>Foo Bar Baz</Modal.Body>
      </Modal>
    )
    const dialog = await findByRole('dialog')

    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveAttribute('aria-label', 'Modal Dialog')
  })

  it('should use transition', async () => {
    const onEnter = jest.fn()
    const onEntering = jest.fn()
    const onEntered = jest.fn()

    const { findByRole } = render(
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
    const dialog = await findByRole('dialog')

    expect(dialog).toBeInTheDocument()

    await waitFor(() => {
      expect(onEnter).toHaveBeenCalled()
      expect(onEntering).toHaveBeenCalled()
      expect(onEntered).toHaveBeenCalled()
    })
  })

  it('should support onOpen prop', async () => {
    const onOpen = jest.fn()
    const { findByRole } = render(
      <Modal
        open
        onOpen={onOpen}
        label="Modal Dialog"
        shouldReturnFocus={false}
      >
        <Modal.Body>Foo Bar Baz</Modal.Body>
      </Modal>
    )
    const dialog = await findByRole('dialog')

    expect(dialog).toBeInTheDocument()

    await waitFor(() => {
      expect(onOpen).toHaveBeenCalled()
    })
  })

  it('should support onClose prop', async () => {
    const onClose = jest.fn()

    const { findByRole, rerender } = render(
      <Modal
        open
        onClose={onClose}
        label="Modal Dialog"
        shouldReturnFocus={false}
      >
        <Modal.Body>Foo Bar Baz</Modal.Body>
      </Modal>
    )
    const dialog = await findByRole('dialog')

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

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled()
    })
  })

  it('should dismiss when overlay clicked by default V1', async () => {
    const onDismiss = jest.fn()
    const { findByText } = render(
      <Modal
        open
        onDismiss={onDismiss}
        label="Modal Dialog"
        shouldReturnFocus={false}
      >
        <Modal.Body>Modal Text</Modal.Body>
      </Modal>
    )
    const modalBody = await findByText('Modal Text')

    expect(modalBody).toBeInTheDocument()

    await userEvent.click(document.body)

    await waitFor(() => {
      // V1 (with await userEvent.click)
      expect(onDismiss).toHaveBeenCalled()
    })
  })

  it('should dismiss when overlay clicked by default V2', async () => {
    const onDismiss = jest.fn()
    const { findByText } = render(
      <Modal
        open
        onDismiss={onDismiss}
        label="Modal Dialog"
        shouldReturnFocus={false}
      >
        <Modal.Body>Modal Text</Modal.Body>
      </Modal>
    )
    const modalBody = await findByText('Modal Text')

    expect(modalBody).toBeInTheDocument()

    await act(async () => {
      await userEvent.click(document.body)
    })

    await waitFor(() => {
      // V2 (with act)
      expect(onDismiss).toHaveBeenCalled()
    })
  })

  it('should dismiss when overlay clicked by default', async () => {
    const onDismiss = jest.fn()
    const { findByText } = render(
      <Modal
        open
        onDismiss={onDismiss}
        label="Modal Dialog"
        shouldReturnFocus={false}
      >
        <Modal.Body>Modal Text</Modal.Body>
      </Modal>
    )
    const modalBody = await findByText('Modal Text')

    expect(modalBody).toBeInTheDocument()

    await waitFor(() => {
      userEvent.click(document.body)
      expect(onDismiss).toHaveBeenCalled()
    })
  })

  it('should NOT dismiss when overlay clicked with shouldCloseOnDocumentClick=false', async () => {
    const onDismiss = jest.fn()
    const onClickOuter = jest.fn()

    const { findByRole, getByTestId } = render(
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
    const dialog = await findByRole('dialog')

    expect(dialog).toBeInTheDocument()

    userEvent.click(getByTestId('outer-element'))

    await waitFor(() => {
      expect(onClickOuter).toHaveBeenCalled()
      expect(onDismiss).not.toHaveBeenCalled()
      expect(dialog).toBeInTheDocument()
    })
  })

  it('should render children', async () => {
    const { findByText } = render(
      <Modal open label="Modal Dialog" shouldReturnFocus={false}>
        <Modal.Body>
          <button>Cancel</button>
        </Modal.Body>
      </Modal>
    )
    const cancelButton = await findByText('Cancel')

    expect(cancelButton).toBeInTheDocument()
  })

  describe('children validation', () => {
    it('should pass validation when children are valid', async () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})

      const { findByRole } = render(
        <Modal open label="Modal Dialog" shouldReturnFocus={false}>
          <Modal.Header>Hello World</Modal.Header>
          <Modal.Body>Foo Bar Baz</Modal.Body>
          <Modal.Footer>
            <button>Cancel</button>
          </Modal.Footer>
        </Modal>
      )
      const dialog = await findByRole('dialog')

      expect(dialog).toBeInTheDocument()
      expect(consoleErrorSpy).not.toHaveBeenCalled()

      consoleErrorSpy.mockRestore()
    })

    it('should not pass validation when children are invalid', async () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})

      const { findByRole } = render(
        <Modal open label="Modal Dialog" shouldReturnFocus={false}>
          <Modal.Body>Foo Bar Baz</Modal.Body>
          <Modal.Footer>
            <button>Cancel</button>
          </Modal.Footer>
          <Modal.Header>Hello World</Modal.Header>
        </Modal>
      )
      const dialog = await findByRole('dialog')
      const expectedErrorMessage =
        'Expected children of Modal in one of the following formats:'

      expect(dialog).toBeInTheDocument()
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String),
        expect.stringContaining(expectedErrorMessage),
        expect.any(String)
      )

      consoleErrorSpy.mockRestore()
    })

    it('should pass inverse variant to children when set', async () => {
      let headerRef: ModalHeader | null = null
      let bodyRef: ModalBody | null = null
      let footerRef: ModalFooter | null = null

      const { findByRole } = render(
        <Modal
          open
          label="Dark Modal"
          shouldReturnFocus={false}
          variant="inverse"
        >
          <Modal.Header ref={(el) => (headerRef = el)}>header</Modal.Header>
          <Modal.Body ref={(el) => (bodyRef = el)}>body</Modal.Body>
          <Modal.Footer ref={(el) => (footerRef = el)}>footer</Modal.Footer>
        </Modal>
      )
      const dialog = await findByRole('dialog')

      expect(dialog).toBeInTheDocument()
      expect(headerRef!.props.variant).toBe('inverse')
      expect(bodyRef!.props.variant).toBe('inverse')
      expect(footerRef!.props.variant).toBe('inverse')
    })

    it('should pass overflow to Modal.Body', async () => {
      let bodyRef: ModalBody | null = null

      const { findByRole } = render(
        <Modal open label="Modal" shouldReturnFocus={false} overflow="fit">
          <Modal.Body ref={(el) => (bodyRef = el)}>body</Modal.Body>
        </Modal>
      )
      const dialog = await findByRole('dialog')

      expect(dialog).toBeInTheDocument()
      expect(bodyRef!.props.overflow).toBe('fit')
    })
  })

  describe('managed focus', () => {
    class ModalExample extends React.Component<Partial<ModalProps>> {
      static propTypes = {
        // eslint-disable-next-line react/forbid-foreign-prop-types
        ...Modal.propTypes
      }

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
      const { findByText } = render(<ModalExample open label="A Modal" />)
      const closeButton = await findByText('Close')

      expect(closeButton).toBeInTheDocument()

      await waitFor(() => {
        expect(document.activeElement).toBe(closeButton)
      })
    })

    it('should take a prop for finding default focus', async () => {
      const { findByTestId } = render(
        <ModalExample
          open
          label="A Modal"
          defaultFocusElement={() => document.getElementById('input-one')}
        />
      )
      const input = await findByTestId('input-first')

      await waitFor(() => {
        expect(input).toHaveFocus()
      })
    })
  })
})
