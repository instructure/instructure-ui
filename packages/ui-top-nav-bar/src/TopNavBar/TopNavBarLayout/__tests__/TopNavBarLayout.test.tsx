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

import { expect, mount } from '@instructure/ui-test-utils'
import { getComputedStyle } from '@instructure/ui-dom-utils'

import {
  SmallViewportModeWrapper,
  getLayoutProps
} from '../../utils/exampleHelpers'

import { TopNavBarLayout } from '../index'
import { TopNavBarLayoutLocator } from '../TopNavBarLayoutLocator'

describe('<TopNavBarLayout />', async () => {
  describe('in "desktop" mode', async () => {
    it('should render DesktopLayout', async () => {
      await mount(
        <SmallViewportModeWrapper layout="desktop">
          <TopNavBarLayout
            {...getLayoutProps({
              currentLayout: 'desktop',
              inverseColor: false
            })}
          />
        </SmallViewportModeWrapper>
      )
      // @ts-expect-error TODO: type is too complex, try to fix later
      const component = await TopNavBarLayoutLocator.find()
      const desktopLayout = await component.findDesktopLayout()
      const smallViewportLayout = await component.findSmallViewportLayout({
        expectEmpty: true
      })

      expect(desktopLayout).to.be.visible()
      expect(smallViewportLayout).to.not.exist()
    })

    it('should pass the "desktopConfig" props to DesktopLayout', async () => {
      await mount(
        <SmallViewportModeWrapper layout="desktop">
          <TopNavBarLayout
            {...getLayoutProps({
              currentLayout: 'desktop',
              inverseColor: false
            })}
            desktopConfig={{ hideActionsUserSeparator: true }}
          />
        </SmallViewportModeWrapper>
      )
      // @ts-expect-error TODO: type is too complex, try to fix later
      const component = await TopNavBarLayoutLocator.find()
      const desktopLayout = await component.findDesktopLayout()
      const separatorBackground =
        await desktopLayout.getActionsUserSeparatorBackground()

      expect(separatorBackground).to.equal('rgba(0, 0, 0, 0)')
    })

    it('should pass the proper "themeOverride"-s to DesktopLayout', async () => {
      await mount(
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

      // @ts-expect-error TODO: type is too complex, try to fix later
      const component = await TopNavBarLayoutLocator.find()
      const desktopLayout = await component.findDesktopLayout()

      expect(getComputedStyle(desktopLayout.getDOMNode()).zIndex).to.equal('88')
    })
  })

  describe('in "smallViewport" mode', async () => {
    it('should render SmallViewportLayout', async () => {
      await mount(
        <SmallViewportModeWrapper layout="smallViewport">
          <TopNavBarLayout
            {...getLayoutProps({
              currentLayout: 'smallViewport',
              inverseColor: false
            })}
          />
        </SmallViewportModeWrapper>
      )
      // @ts-expect-error TODO: type is too complex, try to fix later
      const component = await TopNavBarLayoutLocator.find()
      const desktopLayout = await component.findDesktopLayout({
        expectEmpty: true
      })
      const smallViewportLayout = await component.findSmallViewportLayout()

      expect(desktopLayout).to.not.exist()
      expect(smallViewportLayout).to.be.visible()
    })

    it('should pass the "smallViewportConfig" prop to SmallViewportLayout', async () => {
      const config = getLayoutProps({
        currentLayout: 'smallViewport',
        inverseColor: false
      })
      await mount(
        <SmallViewportModeWrapper layout="smallViewport">
          <TopNavBarLayout
            {...{
              ...config,
              ...{
                smallViewportConfig: {
                  ...config.smallViewportConfig,
                  dropdownMenuToggleButtonLabel: 'Toggle Menu Test Label',
                  dropdownMenuLabel: 'Main Menu Test Label'
                }
              }
            }}
          />
        </SmallViewportModeWrapper>
      )
      // @ts-expect-error TODO: type is too complex, try to fix later
      const component = await TopNavBarLayoutLocator.find()
      const smallViewportLayout = await component.findSmallViewportLayout()
      const menuTriggerButton =
        await smallViewportLayout.findDropdownMenuTriggerButton()

      expect(menuTriggerButton.getDOMNode()).to.have.text(
        'Toggle Menu Test Label'
      )

      await menuTriggerButton.click()

      const dropdownMenu = await smallViewportLayout.findDropdownMenu()

      expect(dropdownMenu).to.have.attribute(
        'aria-label',
        'Main Menu Test Label'
      )
    })

    it('should pass the proper "themeOverride"-s to SmallViewportLayout', async () => {
      await mount(
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

      // @ts-expect-error TODO: type is too complex, try to fix later
      const component = await TopNavBarLayoutLocator.find()
      const smallViewportLayout = await component.findSmallViewportLayout()
      const navbar = await smallViewportLayout.findNavBar()

      expect(getComputedStyle(navbar.getDOMNode()).zIndex).to.equal('102')
    })
  })
})
