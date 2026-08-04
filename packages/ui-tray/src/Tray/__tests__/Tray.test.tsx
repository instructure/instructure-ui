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

import { fireEvent } from '@testing-library/dom'
import { cleanup, render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import { describe, it, expect, afterEach, vi } from 'vitest'
import { useEffect, useState } from 'react'

import { Tray } from '@instructure/ui-tray/latest'
import type { TrayProps } from '@instructure/ui-tray/latest'
import { Overlay } from '@instructure/ui-overlays/latest'

describe('<Tray />', () => {
  afterEach(async () => {
    // the Tray's FocusRegion tears down asynchronously on unmount, let it drain
    // so a leftover `keydown` listener cannot scope away the Tab presses of a
    // later test
    cleanup()
    await new Promise((resolve) => setTimeout(resolve, 100))
  })

  it('should render nothing and have a node with no parent when closed', async () => {
    await render(<Tray label="Tray Example">Hello Tray</Tray>)

    const trayContent = page.getByText('Hello Tray').query()
    expect(trayContent).not.toBeInTheDocument()
  })

  it('should render children and have a node with a parent when open', async () => {
    await render(
      <Tray label="Tray Example" open>
        Hello Tray
      </Tray>
    )
    const trayContent = page.getByText('Hello Tray').element()

    expect(trayContent).toBeInTheDocument()
  })

  it('should apply the a11y attributes', async () => {
    await render(
      <Tray label="Tray Example" open>
        Hello Tray
      </Tray>
    )
    const tray = page.getByRole('dialog').element()
    expect(tray).toHaveAttribute('aria-label', 'Tray Example')
  })

  it('should support onOpen prop', async () => {
    const onOpen = vi.fn()
    await render(
      <Tray label="Tray Example" open onOpen={onOpen}>
        Hello Tray
      </Tray>
    )
    await vi.waitFor(() => {
      expect(onOpen).toHaveBeenCalled()
    })
  })

  it('should support onClose prop', async () => {
    const onClose = vi.fn()

    const { rerender } = await render(
      <Tray label="Tray Example" open onClose={onClose}>
        Hello Tray
      </Tray>
    )

    // Set prop: open
    await rerender(
      <Tray label="Tray Example" open={false} onClose={onClose}>
        Hello Tray
      </Tray>
    )
    await vi.waitFor(() => {
      expect(onClose).toHaveBeenCalled()
    })
  })

  it('should take a prop for finding default focus', async () => {
    await render(
      <Tray
        label="Tray Example"
        open
        defaultFocusElement={() => document.getElementById('my-input')}
      >
        Hello Tray
        <input type="text" />
        <input type="text" id="my-input" aria-label="my-input-label" />
      </Tray>
    )
    const input = page.getByLabelText('my-input-label')

    await expect.element(input).toHaveFocus()
  })

  describe('transition()', () => {
    const placements: Record<string, any> = {
      ltr: {
        enteringPlacements: {
          start: 'slide-left',
          end: 'slide-right',
          top: 'slide-up',
          bottom: 'slide-down'
        },
        exitingPlacements: {
          start: 'slide-left',
          end: 'slide-right',
          top: 'slide-up',
          bottom: 'slide-down'
        }
      },
      rtl: {
        enteringPlacements: {
          start: 'slide-right',
          end: 'slide-left'
        },
        exitingPlacements: {
          start: 'slide-right',
          end: 'slide-left'
        }
      }
    }
    for (const dir in placements) {
      describe(`when text direction is '${dir}'`, () => {
        for (const placement in placements[dir].enteringPlacements) {
          const val = placements[dir].enteringPlacements[placement]
          it(`returns ${val} for ${placement} when entering`, async () => {
            const onEntered = vi.fn()
            document.documentElement.setAttribute('dir', dir)

            await render(
              <Tray
                open
                label="Tray Example"
                placement={placement as TrayProps['placement']}
                onEntered={onEntered}
              >
                Hello
              </Tray>
            )
            await vi.waitFor(() => {
              expect(onEntered).toHaveBeenCalled()
            })
          })
        }

        for (const placement in placements[dir].exitingPlacements) {
          const val = placements[dir].exitingPlacements[placement]
          it(`returns ${val} for ${placement} when exiting`, async () => {
            const onExited = vi.fn()
            document.documentElement.setAttribute('dir', dir)

            const { rerender } = await render(
              <Tray
                open
                label="Tray Example"
                placement={placement as TrayProps['placement']}
                onExited={onExited}
              >
                Hello
              </Tray>
            )

            // Set prop: open
            await rerender(
              <Tray
                open={false}
                label="Tray Example"
                placement={placement as TrayProps['placement']}
                onExited={onExited}
              >
                Hello
              </Tray>
            )
            await vi.waitFor(() => {
              expect(onExited).toHaveBeenCalled()
            })
          })
        }
      })
    }
  })

  it('should open, close via dismiss, and reopen with shouldCloseOnDocumentClick enabled', async () => {
    const onDismiss = vi.fn()
    const onEntered = vi.fn()
    const onExited = vi.fn()

    const TrayWithButton = () => {
      const [isOpen, setIsOpen] = useState(false)

      const handleDismiss = () => {
        setIsOpen(false)
        onDismiss()
      }

      return (
        <div>
          <div>Outside of Tray</div>
          <button onClick={() => setIsOpen(!isOpen)}>Toggle Tray</button>
          <Tray
            label="Tray Example"
            shouldCloseOnDocumentClick
            open={isOpen}
            onDismiss={handleDismiss}
            onEntered={onEntered}
            onExited={onExited}
          >
            <div>Tray Content</div>
          </Tray>
        </div>
      )
    }
    await render(<TrayWithButton />)
    // 1. Open Tray
    expect(page.getByText('Tray Content').query()).not.toBeInTheDocument()
    const button = page.getByText('Toggle Tray')
    await userEvent.click(button)
    await vi.waitFor(() => {
      expect(onEntered).toHaveBeenCalled()
    })
    expect(onDismiss).not.toHaveBeenCalled()
    expect(page.getByText('Tray Content').element()).toBeInTheDocument()
    // 2. Close Tray be clicking outside it. The Tray covers the rest of the
    // page, so dispatch the click on the document instead of pointing at a
    // spot outside it. event.detail and button are needed because
    // FocusRegion.ts/handleDocumentClick
    fireEvent.click(document, { button: 0, detail: 1 })
    await vi.waitFor(() => {
      expect(onDismiss).toHaveBeenCalled()
      expect(onExited).toHaveBeenCalled()
      expect(page.getByText('Tray Content').query()).not.toBeInTheDocument()
    })

    onEntered.mockClear()
    onDismiss.mockClear()
    onExited.mockClear()

    // 3. click Button again, Tray should reopen.
    await userEvent.click(button)
    await vi.waitFor(() => {
      expect(onEntered).toHaveBeenCalled()
    })
    expect(onDismiss).not.toHaveBeenCalled()
    expect(onExited).not.toHaveBeenCalled()
    expect(page.getByText('Tray Content').element()).toBeInTheDocument()
  })

  describe('Component tests', () => {
    it('should apply theme overrides when open', async () => {
      await render(
        <Tray
          label="Tray Example"
          open
          size="small"
          placement="start"
          themeOverride={{ widthSm: '165px' }}
        >
          <div>Hello</div>
        </Tray>
      )
      const tray = page.getByRole('dialog').element()

      expect(tray).toHaveAttribute('aria-label', 'Tray Example')
      await vi.waitFor(() => {
        expect(getComputedStyle(tray.parentElement!).width).toBe('165px')
      })
    })

    it('should call onDismiss prop when Esc key pressed', async () => {
      const onDismiss = vi.fn()
      const onEntered = vi.fn()
      await render(
        <Tray
          open
          label="Tray Example"
          shouldCloseOnDocumentClick
          onDismiss={onDismiss}
          onEntered={onEntered}
        >
          Hello Tray
          <input type="text" />
          <input type="text" id="my-input" />
        </Tray>
      )
      // Dialog attaches its Escape listener in a requestAnimationFrame callback,
      // so wait until the Tray finished entering before pressing the key
      await vi.waitFor(() => {
        expect(onEntered).toHaveBeenCalled()
      })

      await userEvent.keyboard('{Escape}')

      await vi.waitFor(() => {
        expect(onDismiss).toHaveBeenCalled()
      })
    })

    it('should handle focus properly in complex cases', async () => {
      const onEntered = vi.fn()

      const Example = () => {
        const [showTray, setShowTray] = useState(false)
        const [showOverlay, setShowOverlay] = useState(false)

        const handleTrayButtonClick = () => {
          setShowOverlay(true)
        }

        // Hide the Tray once the Overlay has mounted, so the Tray is no longer
        // on top of the FocusRegion stack. This runs after the Overlay's own
        // mount effects have registered its region, which a fixed setTimeout
        // could not guarantee under load.
        useEffect(() => {
          if (showOverlay) {
            setShowTray(false)
          }
        }, [showOverlay])

        return (
          <div>
            <p>
              Click the button below to open a tray. Then click the button
              inside the tray to trigger an overlay that will automatically
              close after a short time.
            </p>
            <button id="open_tray_button" onClick={() => setShowTray(true)}>
              Open Tray
            </button>
            <button id="test1_button">test 1</button>
            <button id="test2_button">test 2</button>

            <Tray
              label="Sample Tray"
              open={showTray}
              placement="end"
              onEntered={onEntered}
            >
              <p>
                This is the Tray. Click the button below to show an overlay and
                automatically close this tray after a short time.
              </p>
              <button id="close_tray_button" onClick={handleTrayButtonClick}>
                Close after a short time
              </button>
              <button onClick={() => setShowTray(false)}>Cancel</button>
              <button>test</button>
            </Tray>

            <Overlay
              open={showOverlay}
              transition="fade"
              label="Loading overlay"
            >
              <span>This is the overlay.</span>
            </Overlay>
          </div>
        )
      }

      await render(<Example />)

      const openButton = page.getByRole('button', { name: 'Open Tray' })
      const closeButton = page.getByRole('button', {
        name: 'Close after a short time'
      })

      await userEvent.click(openButton)
      // wait for the enter transition, so the Tray's focus region is fully set
      // up before it gets closed from behind the Overlay
      await vi.waitFor(() => {
        expect(onEntered).toHaveBeenCalled()
      })

      // Click the close_tray_button. This should run the state changes in its handler
      await userEvent.click(closeButton)

      await vi.waitFor(() => {
        expect(closeButton.query()).not.toBeInTheDocument()
      })
      await expect.element(openButton).toHaveFocus()

      await userEvent.tab()
      await expect
        .element(page.getByRole('button', { name: 'test 1' }))
        .toHaveFocus()

      await userEvent.tab()
      await expect
        .element(page.getByRole('button', { name: 'test 2' }))
        .toHaveFocus()
    })
  })
})
