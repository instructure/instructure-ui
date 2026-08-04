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

import { Component, useState } from 'react'
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
import { Button, CloseButton } from '@instructure/ui-buttons/latest'
import { Tooltip } from '@instructure/ui-tooltip/latest'

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
  describe('Component tests', () => {
    // renders a Modal with a Tooltip inside, the tooltip is the thing under
    // test in the `shouldCloseOnDocumentClick` cases below
    const TooltipModal = ({ renderTip }: { renderTip: React.ReactNode }) => {
      const [open, setOpen] = useState(false)

      return (
        <div>
          <Button onClick={() => setOpen(true)}>Open the Modal</Button>
          <Modal
            label="modal"
            open={open}
            onDismiss={() => setOpen(false)}
            shouldCloseOnDocumentClick
          >
            <CloseButton
              screenReaderLabel="Close"
              onClick={() => setOpen(false)}
            />
            <Tooltip renderTip={renderTip}>
              <Button data-testid="trigger">Hello</Button>
            </Tooltip>
          </Modal>
        </div>
      )
    }

    const tooltipOf = (trigger: Element) =>
      document.querySelector<HTMLElement>(
        `span[data-position-content="${trigger.getAttribute(
          'data-position-target'
        )}"]`
      )!

    it('should not close when button is clicked to rerender content', async () => {
      const TestModal = () => {
        const [isOpen, setIsOpen] = useState(false)
        const [state, setState] = useState({
          content:
            'This content should change by clicking on the Change content button',
          isButtonVisible: true
        })

        return (
          <div>
            <Button onClick={() => setIsOpen(true)}>Open the Modal</Button>

            {isOpen && (
              <Modal
                label="label"
                open
                onDismiss={() => setIsOpen(false)}
                shouldCloseOnDocumentClick
              >
                <Modal.Body>
                  <div data-testid="modal-content">{state.content}</div>
                  {state.isButtonVisible && (
                    <Button
                      onClick={() =>
                        setState({
                          content: 'The content has changed!',
                          isButtonVisible: false
                        })
                      }
                      data-testid="change-content-button"
                    >
                      Change content
                    </Button>
                  )}
                  <Button
                    data-testid="close-button"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </Button>
                </Modal.Body>
              </Modal>
            )}
          </div>
        )
      }

      await render(<TestModal />)

      await userEvent.click(page.getByText('Open the Modal'))
      await expect.element(page.getByTestId('modal-content')).toBeVisible()

      await userEvent.click(page.getByTestId('change-content-button'))
      await expect.element(page.getByTestId('modal-content')).toBeVisible()

      await expect.element(page.getByTestId('close-button')).toBeVisible()
      await userEvent.click(page.getByTestId('close-button'))

      await vi.waitFor(() =>
        expect(
          page.getByTestId('modal-content').query()
        ).not.toBeInTheDocument()
      )
    })

    it('should not close with shouldCloseOnDocumentClick when Tooltip inside is clicked on', async () => {
      await render(<TooltipModal renderTip="Tooltip!" />)

      await userEvent.click(page.getByText('Open the Modal'))
      const trigger = page.getByTestId('trigger').element()
      const tooltip = tooltipOf(trigger)

      expect(tooltip).not.toBeVisible()

      await userEvent.hover(page.getByTestId('trigger'))
      await vi.waitFor(() => expect(tooltip).toBeVisible())

      await userEvent.click(tooltip)

      expect(tooltip).toBeVisible()
      expect(page.getByRole('dialog').element()).toBeVisible()
    })

    it('should not close with shouldCloseOnDocumentClick when inside Tooltip has renderTip with HTML content', async () => {
      await render(
        <TooltipModal
          renderTip={
            <div>
              <div>HTML content</div>
            </div>
          }
        />
      )

      await userEvent.click(page.getByText('Open the Modal'))
      const trigger = page.getByTestId('trigger').element()
      const tooltip = tooltipOf(trigger)

      expect(tooltip).not.toBeVisible()

      await userEvent.hover(page.getByTestId('trigger'))
      await vi.waitFor(() => expect(tooltip).toBeVisible())

      await userEvent.click(tooltip)

      expect(tooltip).toBeVisible()
      expect(page.getByRole('dialog').element()).toBeVisible()
    })

    it('should not close with shouldCloseOnDocumentClick when ToolTip button is focused and Tooltip is clicked', async () => {
      await render(<TooltipModal renderTip={<div>HTML content</div>} />)

      await userEvent.click(page.getByText('Open the Modal'))
      const trigger = page.getByTestId('trigger').element()
      const tooltip = tooltipOf(trigger)

      expect(tooltip).not.toBeVisible()

      await userEvent.click(page.getByTestId('trigger'))
      await vi.waitFor(() => expect(tooltip).toBeVisible())
      expect(trigger).toHaveFocus()

      await userEvent.click(tooltip)

      expect(page.getByRole('dialog').element()).toBeVisible()
    })

    it('should call onDismiss prop when Esc key pressed by default', async () => {
      const onDismiss = vi.fn()
      const onOpen = vi.fn()
      await render(
        <Modal
          open
          onDismiss={onDismiss}
          onOpen={onOpen}
          label="Modal Dialog"
          shouldReturnFocus={false}
        >
          <p>Modal body text</p>
        </Modal>
      )
      await expect.element(page.getByText('Modal body text')).toBeVisible()
      await vi.waitFor(() => expect(onOpen).toHaveBeenCalled())

      await userEvent.keyboard('{Escape}')

      await vi.waitFor(() => expect(onDismiss).toHaveBeenCalledOnce())
    })

    it('should not call stale callbacks', async () => {
      const handleDismiss = vi.fn()

      function Example() {
        const [value, setValue] = useState(0)

        return (
          <View>
            <Modal
              label="Modal"
              open
              onDismiss={() => {
                handleDismiss(value)
              }}
            >
              <Modal.Body>
                <p>Modal body text</p>
                <div id="value-indicator">{value}</div>
                <button id="increment-btn" onClick={() => setValue(value + 1)}>
                  Increment Button
                </button>
              </Modal.Body>
            </Modal>
          </View>
        )
      }

      await render(<Example />)
      await expect.element(page.getByText('Modal body text')).toBeVisible()

      await userEvent.click(page.getByText('Increment Button'))

      await expect.element(page.getByText('Modal body text')).toBeVisible()
      expect(document.querySelector('#value-indicator')).toHaveTextContent('1')
      expect(handleDismiss).not.toHaveBeenCalled()

      // click outside of the modal content
      await userEvent.click(document.body, { position: { x: 0, y: 0 } })

      await vi.waitFor(() => expect(handleDismiss).toHaveBeenCalledOnce())
      expect(handleDismiss).toHaveBeenCalledWith(1)
    })

    it('should close the inside Tooltip when Esc key is pressed, but should not close the parent modal', async () => {
      const TestModal = () => {
        const [open, setOpen] = useState(false)

        return (
          <div>
            <Button onClick={() => setOpen((state) => !state)}>
              Open the Modal
            </Button>
            <Modal
              data-testid="modal"
              open={open}
              onDismiss={() => setOpen(false)}
              label="modal"
            >
              Hello, Word!
              <Tooltip renderTip="Hello. I'm a tool tip">
                <span data-testid="trigger">info</span>
              </Tooltip>
              <div data-testid="pointerParkingSpot" style={{ height: 200 }} />
            </Modal>
          </div>
        )
      }
      await render(<TestModal />)

      await userEvent.click(page.getByText('Open the Modal'))

      const trigger = page.getByTestId('trigger').element()
      const tooltip = tooltipOf(trigger)

      // the real pointer stays where an earlier test left it, so it could
      // already sit on the trigger and open the tooltip on its own
      await userEvent.hover(page.getByTestId('pointerParkingSpot'))

      await vi.waitFor(() => expect(tooltip).not.toBeVisible())

      await userEvent.hover(page.getByTestId('trigger'))

      await vi.waitFor(() => expect(tooltip).toBeVisible())

      await userEvent.keyboard('{Escape}')

      await vi.waitFor(() => expect(tooltip).not.toBeVisible())
      expect(page.getByRole('dialog').element()).toBeVisible()

      await userEvent.keyboard('{Escape}')

      await vi.waitFor(() =>
        expect(page.getByRole('dialog').query()).not.toBeInTheDocument()
      )
    })

    it('should allow closing modal with Esc when the modal trigger button has a Tooltip', async () => {
      const TestModal = () => {
        const [open, setOpen] = useState(false)

        return (
          <div>
            <Tooltip renderTip="Hello. I'm a tool tip">
              <Button onClick={() => setOpen((state) => !state)}>
                Open the Modal
              </Button>
            </Tooltip>
            <Modal open={open} onDismiss={() => setOpen(false)} label="modal">
              Hello, World!
            </Modal>
          </div>
        )
      }
      await render(<TestModal />)

      await userEvent.click(page.getByText('Open the Modal'))

      await expect.element(page.getByRole('dialog')).toBeVisible()

      await userEvent.keyboard('{Escape}')

      await vi.waitFor(() =>
        expect(page.getByRole('dialog').query()).not.toBeInTheDocument()
      )
    })

    it('should not trap focus when Modal closing button has a Tooltip', async () => {
      const TestModal = () => {
        const [open, setOpen] = useState(false)

        return (
          <div>
            <Button onClick={() => setOpen((state) => !state)}>
              Open the Modal
            </Button>
            <Button>Hello</Button>
            <Modal
              label="modal"
              open={open}
              onDismiss={() => setOpen((state) => !state)}
            >
              <Tooltip renderTip="Hello. I'm a tool tip">
                <Button onClick={() => setOpen((state) => !state)}>
                  Close the Modal
                </Button>
              </Tooltip>
            </Modal>
          </div>
        )
      }
      await render(<TestModal />)

      const openButton = page.getByRole('button', { name: 'Open the Modal' })

      await userEvent.click(openButton)

      await expect.element(page.getByRole('dialog')).toBeVisible()

      page.getByRole('button', { name: 'Close the Modal' }).element().focus()
      await userEvent.keyboard(' ')

      await vi.waitFor(() =>
        expect(page.getByRole('dialog').query()).not.toBeInTheDocument()
      )

      await expect.element(openButton).toHaveFocus()

      await userEvent.tab()

      await expect
        .element(page.getByRole('button', { name: 'Hello' }))
        .toHaveFocus()
    })
  })
})
