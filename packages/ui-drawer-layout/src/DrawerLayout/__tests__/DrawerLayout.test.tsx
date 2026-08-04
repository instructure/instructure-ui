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
import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { describe, it, expect, vi } from 'vitest'
import DrawerLayoutFixture from '../v2/__fixtures__/DrawerLayout.fixture.js'
import { Button } from '@instructure/ui-buttons/latest'
import { DrawerLayout } from '@instructure/ui-drawer-layout/latest'
import { View } from '@instructure/ui-view/latest'

describe('<DrawerLayout />', () => {
  it('should render', async () => {
    const { container } = await render(<DrawerLayoutFixture />)

    const layout = container.querySelector('div[class$="-drawerLayout"]')

    expect(layout).toBeInTheDocument()
  })

  it('should render a DrawerTray and DrawerContent', async () => {
    const { container } = await render(
      <DrawerLayoutFixture open={true} layoutWidth="800px" trayWidth="250px" />
    )

    const tray = page.getByText('Hello from tray').element()
    const contentWrapper = container.querySelector(
      'div[class$="drawerLayout__content"]'
    )

    expect(tray).toBeInTheDocument()
    expect(contentWrapper).toHaveTextContent('Hello from content')
    expect(contentWrapper).toHaveAttribute('aria-label', 'Test DrawerContent')
  })

  describe('DrawerTray a11y role', () => {
    it('should have role="dialog" in overlay mode', async () => {
      await render(
        <View height="25rem" as="div" position="relative">
          <DrawerLayout minWidth="4444px">
            <DrawerLayout.Tray open={true} label="a tray test">
              Hello from tray
            </DrawerLayout.Tray>
            <DrawerLayout.Content label="content">
              Hello from content
            </DrawerLayout.Content>
          </DrawerLayout>
        </View>
      )

      await vi.waitFor(() => {
        const drawerTray = page.getByLabelText('a tray test').element()
        expect(drawerTray).toHaveAttribute('role', 'dialog')
      })
    })

    it('should have role="region" when not in overlay mode', async () => {
      await render(
        <View height="25rem" as="div" position="relative">
          <DrawerLayout minWidth="0px">
            <DrawerLayout.Tray open={true} label="a tray test">
              Hello from tray
            </DrawerLayout.Tray>
            <DrawerLayout.Content label="content">
              Hello from content
            </DrawerLayout.Content>
          </DrawerLayout>
        </View>
      )

      await vi.waitFor(() => {
        const drawerTray = page.getByLabelText('a tray test').element()
        expect(drawerTray).toHaveAttribute('role', 'region')
      })
    })
  })

  it('should close the tray when ESC is pressed in overlay mode', async () => {
    let open = true
    const msg = 'This is in the Tray'
    const onDismiss = vi.fn(() => {
      open = false
    })
    // Small layout width to trigger overlay mode
    const TestComponent = () => (
      <View height="25rem" as="div" position="relative">
        <DrawerLayout minWidth="4444px">
          <DrawerLayout.Tray
            id="DrawerLayoutTrayExample1"
            open={open}
            label="Drawer Tray Start Example"
            onDismiss={onDismiss}
          >
            <Button onClick={() => (open = false)}>Close Tray</Button>
            {msg}
          </DrawerLayout.Tray>
          <DrawerLayout.Content label="Drawer content example">
            <Button
              onClick={() => {
                open = true
              }}
            >
              Expand tray
            </Button>
          </DrawerLayout.Content>
        </DrawerLayout>
      </View>
    )
    const { rerender } = await render(<TestComponent />)
    expect(page.getByText(msg).element()).toBeInTheDocument()
    await act(() => new Promise((resolve) => requestAnimationFrame(resolve)))
    fireEvent.keyUp(document, { keyCode: 27 }) // ESC key
    await vi.waitFor(() => {
      expect(onDismiss).toHaveBeenCalled()
    })
    await rerender(<TestComponent />)
    await vi.waitFor(() => {
      expect(page.getByText(msg).query()).not.toBeInTheDocument()
    })
  })
})
