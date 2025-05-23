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

import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

import { Tray } from '../index'
import type { TrayProps } from '../props'

describe('<Tray />', async () => {
  it('should render nothing and have a node with no parent when closed', async () => {
    render(<Tray label="Tray Example">Hello Tray</Tray>)

    const trayContent = screen.queryByText('Hello Tray')
    expect(trayContent).not.toBeInTheDocument()
  })

  it('should render children and have a node with a parent when open', async () => {
    render(
      <Tray label="Tray Example" open>
        Hello Tray
      </Tray>
    )
    const trayContent = screen.getByText('Hello Tray')

    expect(trayContent).toBeInTheDocument()
  })

  it('should apply the a11y attributes', async () => {
    render(
      <Tray label="Tray Example" open>
        Hello Tray
      </Tray>
    )
    const tray = screen.getByRole('dialog')

    expect(tray).toHaveAttribute('aria-label', 'Tray Example')
  })

  it('should support onOpen prop', async () => {
    const onOpen = vi.fn()
    render(
      <Tray label="Tray Example" open onOpen={onOpen}>
        Hello Tray
      </Tray>
    )

    await waitFor(() => {
      expect(onOpen).toHaveBeenCalled()
    })
  })

  it('should support onClose prop', async () => {
    const onClose = vi.fn()

    const { rerender } = render(
      <Tray label="Tray Example" open onClose={onClose}>
        Hello Tray
      </Tray>
    )

    // Set prop: open
    rerender(
      <Tray label="Tray Example" open={false} onClose={onClose}>
        Hello Tray
      </Tray>
    )

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled()
    })
  })

  it('should take a prop for finding default focus', async () => {
    render(
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
    const input = screen.getByLabelText('my-input-label')

    await waitFor(() => {
      expect(document.activeElement).toBe(input)
    })
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

            render(
              <Tray
                open
                label="Tray Example"
                placement={placement as TrayProps['placement']}
                onEntered={onEntered}
              >
                Hello
              </Tray>
            )
            await waitFor(() => {
              expect(onEntered).toHaveBeenCalled()
            })
          })
        }

        for (const placement in placements[dir].exitingPlacements) {
          const val = placements[dir].exitingPlacements[placement]
          it(`returns ${val} for ${placement} when exiting`, async () => {
            const onExited = vi.fn()
            document.documentElement.setAttribute('dir', dir)

            const { rerender } = render(
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
            rerender(
              <Tray
                open={false}
                label="Tray Example"
                placement={placement as TrayProps['placement']}
                onExited={onExited}
              >
                Hello
              </Tray>
            )
            await waitFor(() => {
              expect(onExited).toHaveBeenCalled()
            })
          })
        }
      })
    }
  })
})
