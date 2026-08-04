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

import canvas from '@instructure/ui-themes'
import { InstUISettingsProvider } from '@instructure/emotion'

import { DrawerTray, DrawerLayoutContext } from '../v2/index.js'

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

  describe('Component tests', () => {
    const trayContent = () =>
      document.querySelector<HTMLElement>('div[class$="-drawerTray__content"]')

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

      expect(trayContent()).toHaveTextContent('Hello from layout tray')
    })

    it('should not render tray content when closed', async () => {
      await render(
        <DrawerTray
          label="DrawerTray Example"
          render={() => {
            return 'Hello from layout tray'
          }}
        />
      )

      expect(trayContent()).not.toBeInTheDocument()
    })

    it('should place the tray correctly with placement=start', async () => {
      await render(
        <DrawerTray
          label="DrawerTray Example"
          open={true}
          placement="start"
          render={() => {
            return 'Hello from layout tray'
          }}
        />
      )

      const tray = trayContent()!.parentElement!

      expect(getComputedStyle(tray).left).toBe('0px')
    })

    it('should place the tray correctly with placement=end', async () => {
      await render(
        <DrawerTray
          label="DrawerTray Example"
          open={true}
          placement="end"
          render={() => {
            return 'Hello from layout tray'
          }}
        />
      )

      const tray = trayContent()!.parentElement!

      expect(getComputedStyle(tray).right).toBe('0px')
    })

    it('should apply theme overrides when open', async () => {
      await render(
        <DrawerTray
          label="DrawerTray Example"
          open={true}
          themeOverride={{ zIndex: 333 }}
          render={() => {
            return 'Hello from layout tray'
          }}
        />
      )

      const tray = trayContent()!.parentElement!

      expect(getComputedStyle(tray).zIndex).toBe('333')
    })

    it('drops a shadow if the prop is set, and it is overlaying content', async () => {
      const onEntered = vi.fn()
      await render(
        <DrawerLayoutContext.Provider value={true}>
          <InstUISettingsProvider theme={canvas}>
            <DrawerTray
              label="DrawerTray Example"
              open={true}
              shadow={true}
              onEntered={onEntered}
              render={() => {
                return 'Hello from layout tray'
              }}
            />
          </InstUISettingsProvider>
        </DrawerLayoutContext.Provider>
      )

      const trayWithShadow = document.querySelector<HTMLElement>(
        'div[class*="-drawerTray--with-shadow"]'
      )!

      expect(getComputedStyle(trayWithShadow).boxShadow).not.toBe('none')
    })
  })
})
