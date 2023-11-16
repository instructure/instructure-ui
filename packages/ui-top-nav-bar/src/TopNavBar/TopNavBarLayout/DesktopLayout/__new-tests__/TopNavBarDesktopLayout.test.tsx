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
  getMenuItems,
  getUser,
  getBreadcrumb
} from '../../../utils/exampleHelpers'

import { TopNavBarDesktopLayout } from '../index'
import TopNavBarContext from '../../../TopNavBarContext'

const originalResizeObserver = global.ResizeObserver

describe('<TopNavBarDesktopLayout />', () => {
  beforeAll(() => {
    // Mock for ResizeObserver browser API
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    }))
  })

  describe('renderBreadcrumb', () => {
    it('should render breadcrumb container', () => {
      const { getByLabelText, getByText } = render(
        <TopNavBarContext.Provider
          value={{
            layout: 'desktop',
            inverseColor: true
          }}
        >
          <TopNavBarDesktopLayout
            renderBreadcrumb={getBreadcrumb()}
            renderUser={getUser()}
            renderActionItems={getActionItems()}
          />
        </TopNavBarContext.Provider>
      )
      const breadCrumbContainer = getByLabelText('You are here')
      const crumb1 = getByText('Course page 1')
      const crumb2 = getByText('Course page 2')
      const crumb3 = getByText('Course page 3')

      expect(breadCrumbContainer).toBeInTheDocument()
      expect(crumb1).toBeVisible()
      expect(crumb2).toBeVisible()
      expect(crumb3).toBeVisible()
    })

    it('should not render breadcrumb if inverseColor is false', () => {
      const consoleMock = jest.spyOn(console, 'error').mockImplementation()

      const { queryByText, queryByLabelText } = render(
        <TopNavBarContext.Provider
          value={{
            layout: 'desktop',
            inverseColor: false
          }}
        >
          <TopNavBarDesktopLayout
            renderBreadcrumb={getBreadcrumb()}
            renderUser={getUser()}
            renderActionItems={getActionItems()}
          />
        </TopNavBarContext.Provider>
      )
      const breadCrumbContainer = queryByLabelText('You are here')
      const crumb1 = queryByText('Course page 1')
      const crumb2 = queryByText('Course page 2')
      const crumb3 = queryByText('Course page 3')

      expect(breadCrumbContainer).not.toBeInTheDocument()
      expect(crumb1).not.toBeInTheDocument()
      expect(crumb2).not.toBeInTheDocument()
      expect(crumb3).not.toBeInTheDocument()

      expect(consoleMock.mock.calls[0][0]).toEqual(
        'Warning: [TopNavBarBreadcrumb] If the inverseColor prop is not set to true, TopNavBarBreadcrumb fails to render.'
      )
    })

    it('should not render breadcrumb if brand exists', () => {
      const consoleMock = jest.spyOn(console, 'warn').mockImplementation()

      const { queryByLabelText, queryByText } = render(
        <TopNavBarContext.Provider
          value={{
            layout: 'desktop',
            inverseColor: true
          }}
        >
          <TopNavBarDesktopLayout
            renderBrand={getBrand()}
            renderBreadcrumb={getBreadcrumb()}
          />
        </TopNavBarContext.Provider>
      )
      const breadCrumbContainer = queryByLabelText('You are here')
      const crumb1 = queryByText('Course page 1')
      const crumb2 = queryByText('Course page 2')
      const crumb3 = queryByText('Course page 3')

      expect(breadCrumbContainer).not.toBeInTheDocument()
      expect(crumb1).not.toBeInTheDocument()
      expect(crumb2).not.toBeInTheDocument()
      expect(crumb3).not.toBeInTheDocument()
      expect(consoleMock.mock.calls[0][0]).toEqual(
        'Warning: [TopNavBarBrand] is deprecated and will be removed in version 9. Please use the updated TopNavBar design.'
      )
    })

    it('should not render breadcrumb if menuitems exist', () => {
      const { queryByText, queryByLabelText } = render(
        <TopNavBarContext.Provider
          value={{
            layout: 'desktop',
            inverseColor: true
          }}
        >
          <TopNavBarDesktopLayout
            renderMenuItems={getMenuItems()}
            renderBreadcrumb={getBreadcrumb()}
          />
        </TopNavBarContext.Provider>
      )
      const breadCrumbContainer = queryByLabelText('You are here')
      const crumb1 = queryByText('Course page 1')
      const crumb2 = queryByText('Course page 2')
      const crumb3 = queryByText('Course page 3')

      expect(breadCrumbContainer).not.toBeInTheDocument()
      expect(crumb1).not.toBeInTheDocument()
      expect(crumb2).not.toBeInTheDocument()
      expect(crumb3).not.toBeInTheDocument()
    })
  })

  afterAll(() => {
    global.ResizeObserver = originalResizeObserver
  })
})
