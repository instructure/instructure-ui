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
import { describe, it, expect, vi } from 'vitest'

import { DrawerTray } from '@instructure/ui-drawer-layout/latest'

describe('<DrawerTray />', () => {
  it('should render tray content when open', async () => {
    await render(
      <DrawerTray
        label="DrawerTray Example"
        open={true}
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )
    const drawerTray = page.getByLabelText('DrawerTray Example').element()

    expect(drawerTray).toBeInTheDocument()
    expect(drawerTray).toHaveTextContent('Hello from layout tray')
  })

  it('should call the contentRef', async () => {
    const contentRef = vi.fn()
    await render(
      <DrawerTray
        label="DrawerTray Example"
        open={true}
        contentRef={contentRef}
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )
    const drawerTray = page.getByLabelText('DrawerTray Example').element()

    expect(contentRef).toHaveBeenCalledWith(drawerTray.parentElement)
  })

  it('should call onOpen', async () => {
    const onOpen = vi.fn()

    const { rerender } = await render(
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
    await rerender(
      <DrawerTray
        label="DrawerTray Example"
        open={true}
        onOpen={onOpen}
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )

    await vi.waitFor(() => {
      expect(onOpen).toHaveBeenCalled()
    })
  })

  it('should call onOpen when open initially', async () => {
    const onOpen = vi.fn()
    await render(
      <DrawerTray
        label="DrawerTray Example"
        open={true}
        onOpen={onOpen}
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )

    await vi.waitFor(() => {
      expect(onOpen).toHaveBeenCalled()
    })
  })

  it('should call onClose', async () => {
    const onClose = vi.fn()

    const { rerender } = await render(
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
    await rerender(
      <DrawerTray
        label="DrawerTray Example"
        open={false}
        onClose={onClose}
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )

    await vi.waitFor(() => {
      expect(onClose).toHaveBeenCalled()
    })
  })
})
