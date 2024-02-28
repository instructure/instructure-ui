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

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import {
  avatarExample,
  getActionItems,
  SmallViewportModeWrapper
} from '../../utils/exampleHelpers'
// eslint-disable-next-line no-restricted-imports
import { generateA11yTests } from '@instructure/ui-scripts/lib/test/generateA11yTests'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { TopNavBarActionItems } from '../index'
import TopNavBarActionItemsExamples from '../__examples__/TopNavBarActionItems.examples'

const originalResizeObserver = global.ResizeObserver

describe('<TopNavBarActionItems />', () => {
  beforeAll(() => {
    // Mock for ResizeObserver browser API
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    }))
  })

  it('should render', () => {
    const { container } = render(getActionItems({ actionItemsCount: 6 }))

    const actionItems = container.querySelector(
      "[class$='-topNavBarActionItems']"
    )

    expect(actionItems).toBeInTheDocument()
  })

  it('should not render when 0 children', () => {
    const { container } = render(getActionItems({ actionItemsCount: 0 }))

    const actionItems = container.querySelector(
      "[class$='-topNavBarActionItems']"
    )
    expect(actionItems).not.toBeInTheDocument()
  })

  describe('elementRef prop should return a ref to the root element', () => {
    it('in desktop mode', () => {
      const elementRef = jest.fn()
      const { container } = render(
        getActionItems({
          actionItemsCount: 6,
          actionItemsProps: { elementRef }
        })
      )
      const actionItems = container.querySelector(
        "[class$='-topNavBarActionItems']"
      )

      expect(elementRef).toHaveBeenCalledWith(actionItems)
      expect(actionItems!.tagName).toBe('UL')
    })

    it('in smallViewport mode', () => {
      const elementRef = jest.fn()
      const { container } = render(
        <SmallViewportModeWrapper>
          {getActionItems({
            actionItemsCount: 6,
            actionItemsProps: { elementRef }
          })}
        </SmallViewportModeWrapper>
      )
      const actionItems = container.querySelector(
        "[class$='-topNavBarActionItems']"
      )

      expect(elementRef).toHaveBeenCalledWith(actionItems)
      expect(actionItems!.tagName).toBe('UL')
    })
  })

  describe('listLabel prop should add aria-label', () => {
    it('in desktop mode', () => {
      const { container } = render(
        getActionItems({
          actionItemsProps: {
            listLabel: 'Test label'
          }
        })
      )
      const actionItems = container.querySelector(
        "[class$='-topNavBarActionItems']"
      )

      expect(actionItems).toHaveAttribute('aria-label', 'Test label')
    })

    it('in smallViewport mode', () => {
      const { container } = render(
        <SmallViewportModeWrapper>
          {getActionItems({
            actionItemsProps: {
              listLabel: 'Test label'
            }
          })}
        </SmallViewportModeWrapper>
      )
      const actionItems = container.querySelector(
        "[class$='-topNavBarActionItems']"
      )

      expect(actionItems).toHaveAttribute('aria-label', 'Test label')
    })
  })

  describe('truncated list', () => {
    describe('in desktop mode', () => {
      it('should not truncate the list', () => {
        const { container } = render(getActionItems({ actionItemsCount: 6 }))
        const truncatedList = container.querySelector(
          '[class$="truncateList-topNavBarActionItems"]'
        )

        expect(truncatedList).not.toBeInTheDocument()
      })

      it('should display all items', async () => {
        render(getActionItems({ actionItemsCount: 6 }))
        const items = await screen.findAllByRole('link')

        expect(items.length).toEqual(6)
      })
    })

    describe('in smallViewport mode', () => {
      it('should render as TruncateList', () => {
        const { container } = render(
          <SmallViewportModeWrapper>
            {getActionItems({ actionItemsCount: 6 })}
          </SmallViewportModeWrapper>
        )
        const truncatedList = container.querySelector(
          '[class$="truncateList-topNavBarActionItems"]'
        )

        expect(truncatedList).toBeInTheDocument()
      })

      // TODO convert to e2e
      // it('should truncate the list correctly', async () => {
      //   const { container } = render(
      //     <SmallViewportModeWrapper inverseColor>
      //       <div style={{ width: '400px' }}>
      //         {getActionItems({
      //           actionItemsCount: 6,
      //           actionItemsProps: {
      //             renderHiddenItemsMenuTriggerLabel: (hiddenChildrenCount) =>
      //               `${hiddenChildrenCount} more actions`
      //           }
      //         })}
      //       </div>
      //     </SmallViewportModeWrapper>
      //   )

      //   const truncatedList = container.querySelector(
      //     "[class$='truncateList-topNavBarActionItems']"
      //   )
      //   const listItems = container.querySelectorAll(
      //     "[class$='truncateList__listItem']"
      //   )

      //   // const hiddenMenuTrigger = await truncatedList.findMenuTriggerItem()
      //   // const triggerItem = await component.findTruncateListTriggerItem()

      //   // expect(listItems.length).toEqual(3) // 2 + trigger
      //   // expect(listItems[2].getDOMNode()).to.equal(
      //   //   hiddenMenuTrigger.getDOMNode()
      //   // )
      //   // expect(hiddenMenuTrigger.getTextContent()).to.equal('4 more actions')
      //   // expect(hiddenMenuTrigger).to.contain(triggerItem?.getDOMNode())
      // })

      it('should truncate the end of the list', () => {
        const { container } = render(
          <SmallViewportModeWrapper>
            <div style={{ width: '400px' }}>
              {getActionItems({
                actionItemsCount: 6,
                actionItemsProps: {
                  renderHiddenItemsMenuTriggerLabel: (hiddenChildrenCount) =>
                    `${hiddenChildrenCount} more actions`
                }
              })}
            </div>
          </SmallViewportModeWrapper>
        )
        const truncatedList = container.querySelector(
          "[class$='truncateList-topNavBarActionItems']"
        )
        const listItems = container.querySelectorAll(
          "[class$='truncateList__listItem']"
        )
        const firstButton = listItems[0].querySelector('a')

        expect(truncatedList).toBeInTheDocument()
        expect(firstButton!.id).toBe('Search')
      })

      // TODO convert to e2e
      // it('should be able to display tooltip on the menu trigger', async () => {
      //   const { container } = render(
      //     <SmallViewportModeWrapper>
      //       <div style={{ width: '400px' }}>
      //         {getActionItems({
      //           actionItemsCount: 6,
      //           actionItemsProps: {
      //             renderHiddenItemsMenuTriggerLabel: (hiddenChildrenCount) =>
      //               `${hiddenChildrenCount} more actions`,
      //             renderHiddenItemsMenuTriggerTooltip: 'Action tooltip'
      //           }
      //         })}
      //       </div>
      //     </SmallViewportModeWrapper>
      //   )
      //   const truncatedList = container.querySelector(
      //     "[class$='truncateList-topNavBarActionItems']"
      //   )

      //   expect(truncatedList).toBeInTheDocument()

      //   // const triggerItem = await component.findTruncateListTriggerItem()
      //   // const tooltip = await triggerItem?.findTooltip()
      //   // const tooltipTrigger = await tooltip?.findTrigger()
      //   // const tooltipContent = await tooltip?.findContent()

      //   // expect(tooltipTrigger.getTextContent()).to.equal('4 more actions')
      //   // expect(tooltipContent.getTextContent()).to.equal('Action tooltip')
      // })
    })
  })

  describe('item types:', () => {
    it('should not allow avatars', () => {
      const consoleWarningSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {})
      render(
        getActionItems({
          actionItemsCount: 1,
          actionItemsItemProps: {
            renderAvatar: avatarExample
          }
        })
      )
      const expectedErrorMessage =
        'Warning: Items in <TopNavBar.ActionItems> are not allowed to have avatars, please remove it from item with the id "Search".'

      expect(consoleWarningSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedErrorMessage),
        expect.any(String)
      )

      consoleWarningSpy.mockRestore()
    })

    it('should render items without icons in smallViewport mode', () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})
      const { container } = render(
        <SmallViewportModeWrapper>
          {getActionItems({
            actionItemsCount: 6,
            actionItemsItemProps: (id) =>
              id === 'Search'
                ? { renderIcon: undefined, variant: 'default' }
                : {}
          })}
        </SmallViewportModeWrapper>
      )
      const listItems = container.querySelectorAll(
        "[class$='truncateList__listItem']"
      )
      const icons = container.querySelectorAll('svg')
      const expectedErrorMessage =
        'Warning: Items in <TopNavBar.ActionItems> are required to have the `renderIcon` prop, because only the icons are displayed due to the lack of space. Please add an icon to the item with the id "Search".'

      expect(listItems.length).toEqual(5)
      expect(icons.length).toEqual(5)
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedErrorMessage),
        expect.any(String)
      )

      consoleErrorSpy.mockRestore()
    })

    it('should be converted to icon variant in smallViewport mode', () => {
      const { container } = render(
        <SmallViewportModeWrapper>
          {getActionItems({
            actionItemsCount: 1,
            actionItemsItemProps: { variant: 'button' }
          })}
        </SmallViewportModeWrapper>
      )
      const listItems = container.querySelectorAll(
        "[class$='truncateList__listItem']"
      )
      const firstButton = listItems[0].querySelector('a')
      const icon = listItems[0].querySelector('svg')
      const screenReaderContent = container.querySelector(
        "[class$='-screenReaderContent']"
      )

      expect(listItems.length).toEqual(1)
      expect(icon).toBeInTheDocument()
      expect(firstButton!.id).toBe('Search')
      expect(screenReaderContent).toHaveTextContent('Search')
    })
  })

  describe('should be accessible', () => {
    it('a11y', async () => {
      const { container } = render(getActionItems({ actionItemsCount: 6 }))
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })
  })

  describe('with generated examples', () => {
    const generatedComponents = generateA11yTests(
      TopNavBarActionItems,
      TopNavBarActionItemsExamples
    )

    it.each(generatedComponents)(
      'should be accessible with example: $description',
      async ({ content }) => {
        const { container } = render(content)
        const axeCheck = await runAxeCheck(container)
        expect(axeCheck).toBe(true)
      }
    )
  })

  afterAll(() => {
    global.ResizeObserver = originalResizeObserver
  })
})
