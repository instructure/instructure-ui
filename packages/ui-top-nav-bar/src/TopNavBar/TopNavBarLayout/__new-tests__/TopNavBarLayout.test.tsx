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
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import '@testing-library/jest-dom'

import {
  SmallViewportModeWrapper,
  getLayoutProps
} from '../../utils/exampleHelpers'
import { TopNavBarLayout } from '../index'

let originalResizeObserver: typeof ResizeObserver
let originalMatchMedia: typeof window.matchMedia

beforeAll(() => {
  originalResizeObserver = global.ResizeObserver
  originalMatchMedia = window.matchMedia

  class MockResizeObserver {
    observe = jest.fn()
    unobserve = jest.fn()
    disconnect = jest.fn()
  }
  global.ResizeObserver = MockResizeObserver

  window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }
  })
})

afterAll(() => {
  global.ResizeObserver = originalResizeObserver
  window.matchMedia = originalMatchMedia
})

describe('<TopNavBarLayout />', () => {
  describe('in "desktop" mode', () => {
    it('should render DesktopLayout', () => {
      render(
        <SmallViewportModeWrapper layout="desktop">
          <TopNavBarLayout
            {...getLayoutProps({
              currentLayout: 'desktop',
              inverseColor: false
            })}
          />
        </SmallViewportModeWrapper>
      )

      const navElement = screen.getAllByRole('navigation')
      const desktopLayout = navElement.find((nav) =>
        nav.className.includes('topNavBarDesktopLayout')
      )
      const smallViewportLayout = navElement.find((nav) =>
        nav.className.includes('topNavBarSmallViewportLayout')
      )

      expect(desktopLayout).toBeVisible()
      expect(smallViewportLayout).toBeUndefined()
    })

    it('should pass the "desktopConfig" props to DesktopLayout', () => {
      render(
        <SmallViewportModeWrapper layout="desktop">
          <TopNavBarLayout
            {...getLayoutProps({
              currentLayout: 'desktop',
              inverseColor: false
            })}
            desktopConfig={{ hideActionsUserSeparator: false }}
          />
        </SmallViewportModeWrapper>
      )

      const navElement = screen.getByRole('navigation')
      const userContainer = Array.from(navElement.children).find((child) =>
        child.className.includes('topNavBarDesktopLayout__userContainer')
      )
      const userContainerStyle = userContainer
        ? window.getComputedStyle(userContainer)
        : null

      // userContainer get position relative and a pseudo ::before as a separator
      expect(userContainerStyle?.position).toBe('relative')
    })

    it('should pass the proper "themeOverride"-s to DesktopLayout', () => {
      render(
        <SmallViewportModeWrapper layout="desktop">
          <TopNavBarLayout
            {...getLayoutProps({
              currentLayout: 'desktop',
              inverseColor: false
            })}
            themeOverride={{ desktopZIndex: 88, smallViewportZIndex: 102 }}
          />
        </SmallViewportModeWrapper>
      )

      const navElement = screen.getByRole('navigation')
      const navElementStyle = window.getComputedStyle(navElement)

      expect(navElementStyle.zIndex).toBe('88')
    })

    describe('in "smallViewport" mode', () => {
      it('should render SmallViewportLayout', () => {
        render(
          <SmallViewportModeWrapper layout="smallViewport">
            <TopNavBarLayout
              {...getLayoutProps({
                currentLayout: 'smallViewport',
                inverseColor: false
              })}
            />
          </SmallViewportModeWrapper>
        )

        const navElement = screen.getAllByRole('navigation')
        const desktopLayout = navElement.find((nav) =>
          nav.firstElementChild!.className.includes('topNavBarDesktopLayout')
        )
        const smallViewportLayout = navElement.find((nav) =>
          nav.firstElementChild!.className.includes(
            'topNavBarSmallViewportLayout'
          )
        )

        expect(smallViewportLayout).toBeVisible()
        expect(desktopLayout).toBeUndefined()
      })

      it('should pass the "smallViewportConfig" prop to SmallViewportLayout', async () => {
        const config = getLayoutProps({
          currentLayout: 'smallViewport',
          inverseColor: false
        })

        render(
          <SmallViewportModeWrapper layout="smallViewport">
            <TopNavBarLayout
              {...config}
              smallViewportConfig={{
                ...config.smallViewportConfig,
                dropdownMenuToggleButtonLabel: 'Toggle Menu Test Label',
                dropdownMenuLabel: 'Main Menu Test Label'
              }}
            />
          </SmallViewportModeWrapper>
        )

        const menuTriggerButton = screen.getByRole('button', {
          name: 'Toggle Menu Test Label'
        })
        expect(menuTriggerButton).toBeInTheDocument()

        userEvent.click(menuTriggerButton)

        const dropdownMenu = await screen.findByRole('menu', {
          name: 'Main Menu Test Label'
        })
        expect(dropdownMenu).toBeInTheDocument()
        expect(dropdownMenu).toHaveAttribute(
          'aria-label',
          'Main Menu Test Label'
        )
      })

      it('should pass the proper "themeOverride"-s to SmallViewportLayout', () => {
        render(
          <SmallViewportModeWrapper layout="smallViewport">
            <TopNavBarLayout
              {...getLayoutProps({
                currentLayout: 'smallViewport',
                inverseColor: false
              })}
              themeOverride={{ desktopZIndex: 88, smallViewportZIndex: 102 }}
            />
          </SmallViewportModeWrapper>
        )

        const navBar = screen.getByRole('navigation').firstElementChild
        const navBarStyle = window.getComputedStyle(navBar!)

        expect(navBarStyle.zIndex).toBe('102')
      })
    })
  })
})
