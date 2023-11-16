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
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import {
  getActionItems,
  getBrand,
  getUser,
  getBreadcrumb,
  getMenuItems
} from '../../../utils/exampleHelpers'

import { TopNavBarSmallViewportLayout } from '../index'
import TopNavBarContext from '../../../TopNavBarContext'

const originalResizeObserver = global.ResizeObserver

describe('<TopNavBarSmallViewportLayout />', () => {
  beforeAll(() => {
    // Mock for ResizeObserver browser API
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    }))
  })

  describe('renderBreadcrumb', () => {
    it('should render breadcrumb link', () => {
      const { getByText } = render(
        <TopNavBarContext.Provider
          value={{
            layout: 'smallViewport',
            inverseColor: true
          }}
        >
          <TopNavBarSmallViewportLayout
            dropdownMenuToggleButtonLabel="Toggle Menu"
            renderBreadcrumb={getBreadcrumb()}
            renderUser={getUser()}
            renderActionItems={getActionItems()}
          />
        </TopNavBarContext.Provider>
      )
      const crumb = getByText('Course page 2')

      expect(crumb).toBeVisible()
    })

    it('should not render breadcrumb link if inverseColor is false', () => {
      const consoleMock = jest.spyOn(console, 'error').mockImplementation()

      const { queryByText, queryByLabelText } = render(
        <TopNavBarContext.Provider
          value={{
            layout: 'smallViewport',
            inverseColor: false
          }}
        >
          <TopNavBarSmallViewportLayout
            dropdownMenuToggleButtonLabel="Toggle Menu"
            renderBreadcrumb={getBreadcrumb()}
            renderUser={getUser()}
            renderActionItems={getActionItems()}
          />
        </TopNavBarContext.Provider>
      )
      const breadCrumbContainer = queryByLabelText('You are here')
      const crumb = queryByText('Course page 2')

      expect(breadCrumbContainer).not.toBeInTheDocument()
      expect(crumb).not.toBeInTheDocument()

      expect(consoleMock.mock.calls[0][0]).toEqual(
        'Warning: [TopNavBarBreadcrumb] If the inverseColor prop is not set to true, TopNavBarBreadcrumb fails to render.'
      )
    })

    it('should render breadcrumb link but not others', () => {
      const { container, queryByText } = render(
        <TopNavBarContext.Provider
          value={{
            layout: 'smallViewport',
            inverseColor: true
          }}
        >
          <TopNavBarSmallViewportLayout
            dropdownMenuToggleButtonLabel="Toggle Menu"
            renderBrand={getBrand()}
            renderBreadcrumb={getBreadcrumb()}
            renderActionItems={getActionItems()}
            renderUser={getUser()}
            renderMenuItems={getMenuItems()}
          />
        </TopNavBarContext.Provider>
      )

      const crumb = queryByText('Course page 2')
      const menuTriggerContainer = container.querySelector(
        "[class$='topNavBarSmallViewportLayout__menuTriggerContainer']"
      )
      const brandContainer = container.querySelector(
        "[class$='topNavBarSmallViewportLayout__brandContainer']"
      )

      expect(crumb).toBeInTheDocument()
      expect(menuTriggerContainer).not.toBeInTheDocument()
      expect(brandContainer).not.toBeInTheDocument()
    })
  })

  afterAll(() => {
    global.ResizeObserver = originalResizeObserver
  })
})
