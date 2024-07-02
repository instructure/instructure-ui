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
import { vi } from 'vitest'
import type { MockInstance } from 'vitest'
import '@testing-library/jest-dom'

import {
  getActionItems,
  getBrand,
  getMenuItems,
  getUser,
  getBreadcrumb
} from '../../../utils/exampleHelpers'

import { TopNavBarDesktopLayout } from '../index'
import type { TopNavBarDesktopLayoutProps } from '../props'
import TopNavBarContext from '../../../TopNavBarContext'
import { runAxeCheck } from '@instructure/ui-axe-check'

const defaultBlocks: Pick<
  TopNavBarDesktopLayoutProps,
  'renderBrand' | 'renderMenuItems' | 'renderActionItems' | 'renderUser'
> = {
  renderBrand: getBrand(),
  renderMenuItems: getMenuItems(),
  renderActionItems: getActionItems(),
  renderUser: getUser()
}

describe('<TopNavBarDesktopLayout />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as MockInstance
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as MockInstance
  })

  afterEach(() => {
    consoleWarningMock.mockRestore()
    consoleErrorMock.mockRestore()
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

      expect(consoleErrorMock.mock.calls[0][0]).toEqual(
        'Warning: [TopNavBarBreadcrumb] If the inverseColor prop is not set to true, TopNavBarBreadcrumb fails to render.'
      )
    })

    it('should not render breadcrumb if brand exists', () => {
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

  describe('renderBrand', () => {
    it('should render brand container', () => {
      const { container } = render(
        <TopNavBarDesktopLayout {...defaultBlocks} renderBrand={getBrand()} />
      )
      const brandContainer = container.querySelector(
        "[class$='topNavBarDesktopLayout__brandContainer']"
      )
      const brandNameText = screen.getByText('Brand name')

      expect(brandContainer).toBeInTheDocument()
      expect(brandNameText).toBeVisible()
    })

    it('should not render brand container, when there is no "renderBrand" prop set', () => {
      const { container } = render(
        <TopNavBarDesktopLayout {...defaultBlocks} renderBrand={undefined} />
      )

      const brandContainer = container.querySelector(
        "[class$='topNavBarDesktopLayout__brandContainer']"
      )
      const desktopLayout = container.querySelector(
        "[class$='-topNavBarDesktopLayout']"
      )

      expect(brandContainer).not.toBeInTheDocument()
      expect(desktopLayout).not.toHaveTextContent('Brand name')
    })

    it('should not render brand container when "renderIcon" props is missing', () => {
      const { container } = render(
        <TopNavBarDesktopLayout
          {...defaultBlocks}
          renderBrand={getBrand({
            brandProps: { renderIcon: undefined }
          })}
        />
      )

      const brandContainer = container.querySelector(
        "[class$='topNavBarDesktopLayout__brandContainer']"
      )
      const desktopLayout = container.querySelector(
        "[class$='-topNavBarDesktopLayout']"
      )

      expect(brandContainer).not.toBeInTheDocument()
      expect(desktopLayout).not.toHaveTextContent('Brand name')
    })

    describe('start padding', () => {
      it('should be 0 when brand block is rendered', () => {
        const { container } = render(
          <TopNavBarDesktopLayout {...defaultBlocks} renderBrand={getBrand()} />
        )

        // TODO convert to e2e
        // const component = await TopNavBarDesktopLayoutLocator.find()
        // expect(getComputedStyle(component.getDOMNode()).paddingInlineStart).to.equal('0px')

        const brandContainer = container.querySelector(
          "[class$='topNavBarBrand__container']"
        )
        const brandContainerStyle = getComputedStyle(brandContainer!)

        expect(brandContainerStyle.paddingLeft).toBe('0px')
      })

      it('should be visible when brand block is not rendered', () => {
        const { container } = render(
          <TopNavBarDesktopLayout {...defaultBlocks} renderBrand={undefined} />
        )

        const brandContainer = container.querySelector(
          "[class$='topNavBarBrand__container']"
        )
        const desktopLayout = container.querySelector(
          "[class$='topNavBarDesktopLayout']"
        )

        // TODO convert to e2e
        // expect(getComputedStyle(component.getDOMNode()).paddingInlineStart).to.not.equal('0px')
        // const brandContainerStyle = getComputedStyle(brandContainer!)
        // expect(brandContainerStyle.paddingInlineStart).not.toBe('0px')

        expect(brandContainer).not.toBeInTheDocument()
        expect(desktopLayout).not.toHaveTextContent('Brand name')
      })
    })
  })

  describe('renderMenuItems', () => {
    it('should render menu item container', () => {
      const { container } = render(
        <TopNavBarDesktopLayout
          {...defaultBlocks}
          renderMenuItems={getMenuItems()}
        />
      )
      const menuItemsContainer = container.querySelector(
        "[class$='topNavBarDesktopLayout__menuItemsContainer']"
      )
      const menuItem = container.querySelector(
        "[class$='topNavBarItem__content']"
      )

      expect(menuItemsContainer).toBeInTheDocument()
      expect(container).toHaveTextContent('6 More')
      expect(menuItem).toBeVisible()
    })

    it('should still render menu item container, when there is no "renderMenuItems" prop set', () => {
      const { container } = render(
        <TopNavBarDesktopLayout
          {...defaultBlocks}
          renderMenuItems={undefined}
        />
      )
      const menuItemsContainer = container.querySelector(
        "[class$='topNavBarDesktopLayout__menuItemsContainer']"
      )
      const actionItemsContainer = container.querySelector(
        "[class$='topNavBarDesktopLayout__actionItemsContainer']"
      )

      expect(actionItemsContainer).toBeInTheDocument()
      expect(menuItemsContainer).not.toBeInTheDocument()
      expect(container).not.toHaveTextContent('6 More')
    })

    it('should still render menu item container, when there are 0 menu items', () => {
      const { container } = render(
        <TopNavBarDesktopLayout
          {...defaultBlocks}
          renderMenuItems={getMenuItems({ menuItemsCount: 0 })}
        />
      )
      const menuItemsContainer = container.querySelector(
        "[class$='topNavBarDesktopLayout__menuItemsContainer']"
      )
      const actionItemsContainer = container.querySelector(
        "[class$='topNavBarDesktopLayout__actionItemsContainer']"
      )

      expect(actionItemsContainer).toBeInTheDocument()
      expect(menuItemsContainer).not.toBeInTheDocument()
      expect(container).not.toHaveTextContent('6 More')
    })
  })

  describe('renderActionItems', () => {
    it('should render action item container', () => {
      const { container } = render(
        <TopNavBarDesktopLayout
          {...defaultBlocks}
          renderActionItems={getActionItems()}
        />
      )
      const actionItemsContainer = container.querySelector(
        "[class$='topNavBarDesktopLayout__actionItemsContainer']"
      )

      expect(actionItemsContainer).toBeInTheDocument()
      expect(container).toHaveTextContent('6 More')
    })

    it('should not render action item container, when there is no "renderActionItems" prop set', () => {
      const { container } = render(
        <TopNavBarDesktopLayout
          {...defaultBlocks}
          renderActionItems={undefined}
        />
      )
      const actionItemsContainer = container.querySelector(
        "[class$='topNavBarDesktopLayout__actionItemsContainer']"
      )

      expect(actionItemsContainer).not.toBeInTheDocument()
    })

    it('should not render action item container, when there are 0 action items', async () => {
      const { container } = render(
        <TopNavBarDesktopLayout
          {...defaultBlocks}
          renderActionItems={getActionItems({ actionItemsCount: 0 })}
        />
      )
      const actionItemsContainer = container.querySelector(
        "[class$='topNavBarDesktopLayout__actionItemsContainer']"
      )

      expect(actionItemsContainer).not.toBeInTheDocument()
    })
  })

  describe('renderUser', () => {
    it('should render user container', () => {
      const { container } = render(
        <TopNavBarDesktopLayout {...defaultBlocks} renderUser={getUser()} />
      )
      const userContainer = container.querySelector(
        "[class$='topNavBarDesktopLayout__userContainer']"
      )

      expect(userContainer).toBeInTheDocument()
      expect(container).toHaveTextContent('User Name')
    })

    it('should not render user container, when there is no "renderUser" prop set', async () => {
      const { container } = render(
        <TopNavBarDesktopLayout {...defaultBlocks} renderUser={undefined} />
      )
      const userContainer = container.querySelector(
        "[class$='topNavBarDesktopLayout__userContainer']"
      )

      expect(userContainer).not.toBeInTheDocument()
      expect(container).not.toHaveTextContent('User Name')
    })
  })

  describe('navLabel prop', () => {
    it('should set "aria-label" for the underlying `<nav>` element', () => {
      const { container } = render(
        <TopNavBarDesktopLayout
          {...defaultBlocks}
          navLabel="Navigation test label"
        />
      )
      const topNavBarDesktopLayout = container.querySelector(
        "[class$='-topNavBarDesktopLayout']"
      )

      expect(topNavBarDesktopLayout).toHaveAttribute(
        'aria-label',
        'Navigation test label'
      )
      expect(topNavBarDesktopLayout!.tagName).toBe('NAV')
    })
  })

  describe('elementRef prop', () => {
    it('should return the root nav element', () => {
      const elementRef = vi.fn()
      const { container } = render(
        <TopNavBarDesktopLayout {...defaultBlocks} elementRef={elementRef} />
      )

      expect(elementRef).toHaveBeenCalledWith(container.firstChild)
    })
  })

  describe('should be accessible', () => {
    it('a11y', async () => {
      const { container } = render(
        <TopNavBarDesktopLayout {...defaultBlocks} />
      )
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })
  })
})
