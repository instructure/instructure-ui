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

import { DrawerTray } from '../index'
import { DrawerLayoutContext } from '../../index'

describe('<DrawerTray />', () => {
  it('should render tray content when open', async () => {
    render(
      <DrawerTray
        label="DrawerTray Example"
        open={true}
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )
    const drawerTray = screen.getByLabelText('DrawerTray Example')

    expect(drawerTray).toBeInTheDocument()
    expect(drawerTray).toHaveTextContent('Hello from layout tray')
  })

  it('should call the contentRef', async () => {
    const contentRef = vi.fn()
    render(
      <DrawerTray
        label="DrawerTray Example"
        open={true}
        contentRef={contentRef}
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )
    const drawerTray = screen.getByLabelText('DrawerTray Example')

    expect(contentRef).toHaveBeenCalledWith(drawerTray.parentElement)
  })

  it('should call onOpen', async () => {
    const onOpen = vi.fn()

    const { rerender } = render(
      <DrawerTray
        label="DrawerTray Example"
        open={false}
        onOpen={onOpen}
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )

    expect(onOpen).not.toHaveBeenCalled()

    // set prop open
    rerender(
      <DrawerTray
        label="DrawerTray Example"
        open={true}
        onOpen={onOpen}
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )

    await waitFor(() => {
      expect(onOpen).toHaveBeenCalled()
    })
  })

  it('should call onOpen when open initially', async () => {
    const onOpen = vi.fn()
    render(
      <DrawerTray
        label="DrawerTray Example"
        open={true}
        onOpen={onOpen}
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )

    await waitFor(() => {
      expect(onOpen).toHaveBeenCalled()
    })
  })

  it('should call onClose', async () => {
    const onClose = vi.fn()

    const { rerender } = render(
      <DrawerTray
        label="DrawerTray Example"
        open={true}
        onClose={onClose}
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )

    expect(onClose).not.toHaveBeenCalled()

    // set prop open
    rerender(
      <DrawerTray
        label="DrawerTray Example"
        open={false}
        onClose={onClose}
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled()
    })
  })

  describe('should apply the a11y attributes', () => {
    it("when it doesn't overlay the content", async () => {
      render(
        <DrawerLayoutContext.Provider value={false}>
          <DrawerTray
            label="a tray test"
            open={true}
            render={() => {
              return 'Hello from layout tray'
            }}
          />
        </DrawerLayoutContext.Provider>
      )
      const drawerTray = screen.getByLabelText('a tray test')

      expect(drawerTray).toBeInTheDocument()
      expect(drawerTray).toHaveAttribute('role', 'region')
    })

    it('when it overlays the content', async () => {
      render(
        <DrawerLayoutContext.Provider value={true}>
          <DrawerTray
            label="a tray test"
            open={true}
            render={() => {
              return 'Hello from layout tray'
            }}
          />
        </DrawerLayoutContext.Provider>
      )
      const drawerTray = screen.getByLabelText('a tray test')

      expect(drawerTray).toBeInTheDocument()
      expect(drawerTray).toHaveAttribute('role', 'dialog')
    })
  })
})
