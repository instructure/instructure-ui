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
import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import type { MockInstance } from 'vitest'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import {
  avatarExample,
  getMenuItems,
  itemSubmenuExample,
  SmallViewportModeWrapper
} from '../../utils/exampleHelpers'

// eslint-disable-next-line no-restricted-imports
import { generateA11yTests } from '@instructure/ui-scripts/lib/test/generateA11yTests'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { IconSearchLine } from '@instructure/ui-icons'
import { TopNavBarMenuItems } from '../index'
import type { TopNavBarItemProps } from '../../TopNavBarItem/props'
import TopNavBarMenuItemsExamples from '../__examples__/TopNavBarMenuItems.examples'

describe('<TopNavBarMenuItems />', () => {
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

  it('should render', () => {
    const { container } = render(getMenuItems())
    const menu = container.querySelector("[class$='-topNavBarMenuItems']")

    expect(menu).toBeInTheDocument()
    expect(menu!.tagName).toBe('UL')
  })

  it('should not render in smallViewport mode', () => {
    const { container } = render(
      <SmallViewportModeWrapper>{getMenuItems()}</SmallViewportModeWrapper>
    )
    const menu = container.querySelector("[class$='-topNavBarMenuItems']")

    expect(menu).not.toBeInTheDocument()
  })

  it('should not render if no children are passed', async () => {
    const { container } = render(getMenuItems({ menuItemsCount: 0 }))
    const menu = container.querySelector("[class$='-topNavBarMenuItems']")

    expect(menu).not.toBeInTheDocument()
  })

  describe('truncated list', () => {
    it('should render as a TruncateList component', () => {
      const { container } = render(getMenuItems())
      const truncatedList = container.querySelector(
        "[class$='-truncateList-topNavBarMenuItems']"
      )

      expect(truncatedList).toBeInTheDocument()
    })

    it('should truncate the list correctly', () => {
      const { container } = render(
        <div style={{ width: '400px' }}>
          {getMenuItems({ menuItemsCount: 6 })}
        </div>
      )
      const truncatedList = container.querySelector(
        "[class$='-truncateList-topNavBarMenuItems']"
      )
      // const listItems = container.querySelectorAll(
      //   "[class*='truncateList__listItem']"
      // )
      const hiddenMenuTrigger = container.querySelector(
        '[class$="submenuTriggerContainer"]'
      )
      const triggerItem = hiddenMenuTrigger!.querySelector(
        '[id*="-hiddenMenuItemsMenuTrigger"]'
      )

      expect(truncatedList).toBeInTheDocument()
      expect(triggerItem).toBeInTheDocument()

      // TODO convert to e2e
      // expect(listItems.length).to.equal(4) // 3 + trigger
      // expect(hiddenMenuTrigger.getTextContent()).to.equal('3 More')
      // expect(listItems[3].getDOMNode()).to.equal(hiddenMenuTrigger.getDOMNode())
      // expect(hiddenMenuTrigger).to.contain(triggerItem?.getDOMNode())
    })

    it('should truncate the end of the list', () => {
      const { container } = render(
        <div style={{ width: '400px' }}>
          {getMenuItems({ menuItemsCount: 6 })}
        </div>
      )
      const truncatedList = container.querySelector(
        "[class$='-truncateList-topNavBarMenuItems']"
      )

      expect(truncatedList).toBeInTheDocument()

      // TODO convert to e2e
      // const items = await component.findAllMenuItems()
      // const firstButton = await items[0].findButton()

      // expect(firstButton).to.have.id('Overview')
    })

    // TODO: this test is super flaky, breaks even with the try catch fix below. Turned it off for now, try to fix later.
    it('should render submenu as subpages in hidden items', async () => {
      render(
        <div style={{ width: '400px' }}>
          {getMenuItems({
            menuItemsCustomIdList: [
              'TestItem1',
              'TestItem2',
              'TestItem3',
              'TestItem4'
            ],
            menuItemsItemProps: (id) =>
              id === 'TestItem4'
                ? {
                    renderSubmenu: itemSubmenuExample,
                    href: undefined
                  }
                : {}
          })}
        </div>
      )
      const menuTriggerButton = screen.getByRole('button')

      userEvent.click(menuTriggerButton)

      await waitFor(() => {
        expect(menuTriggerButton).toBeInTheDocument()
      })

      // TODO convert to e2e
      // const component = await TopNavBarMenuItemsLocator.find()
      // const triggerItem = await component.findTruncateListTriggerItem()
      // const triggerItemButton = await triggerItem.findButton()

      // await triggerItemButton.click()

      // let error = false

      // try {
      //   const hiddenItems = await triggerItem.findSubmenu()
      //   const hiddenItemsContent = await hiddenItems.findPopoverContent()
      //   const optionWithSubmenu = await hiddenItemsContent.find(
      //     '[id="TestItem4"]'
      //   )

      //   await optionWithSubmenu.click()

      //   const subpage = await hiddenItems.findPopoverContent()
      //   const subpageOptions =
      //     (await subpage.findAllOptions()) as QueriesHelpersEventsType[]

      //   expect(subpageOptions.length).to.equal(4) // 3 + "back"
      //   subpageOptions.shift() // removes "back"
      //   subpageOptions.forEach((option) => {
      //     expect(option.getId()).to.include('linkExampleOption')
      //   })
      // } catch (e: any) {
      //   // eslint-disable-next-line no-console
      //   console.log('Flaky test error: ', e)

      //   // TODO: This test is flaky, falsely breaks with this error sometimes. We skip this  unless there is another error. Try to fix later.
      //   if (
      //     !(e?.message || '').match(
      //       /Tried to find DOM element with selector: "\[data-cid~="(Popover|Position)"\]"/
      //     )?.length
      //   ) {
      //     error = true
      //   }
      // }

      // expect(error).to.be.false()
    })
  })

  describe('listLabel prop', () => {
    it('should set aria-label on the list', () => {
      const { container } = render(
        <div style={{ width: '400px' }}>
          {getMenuItems({
            menuItemsCount: 6,
            menuItemsProps: { listLabel: 'List label example' }
          })}
        </div>
      )
      const menu = container.querySelector("[class$='-topNavBarMenuItems']")

      expect(menu).toBeInTheDocument()
      expect(menu!.tagName).toBe('UL')
      expect(menu).toHaveAttribute('aria-label', 'List label example')
    })
  })

  describe('renderHiddenItemsMenuTriggerLabel prop', () => {
    it('should set the label for the trigger item of the hidden list items menu', () => {
      const { container } = render(
        <div style={{ width: '400px' }}>
          {getMenuItems({
            menuItemsCount: 6,
            menuItemsProps: {
              renderHiddenItemsMenuTriggerLabel: (hiddenChildrenCount) =>
                `There are ${hiddenChildrenCount} hidden items`
            }
          })}
        </div>
      )
      const triggerItem = container.querySelector(
        '[id*="-hiddenMenuItemsMenuTrigger"]'
      )

      expect(triggerItem).toHaveTextContent('There are 6 hidden items')
    })
  })

  describe('currentPageId prop', () => {
    it('should set the item with id as active', async () => {
      const { container } = render(
        getMenuItems({
          menuItemsCustomIdList: [
            'TestItem1',
            'TestItem2',
            'TestItem3',
            'TestItem4'
          ],
          menuItemsProps: { currentPageId: 'TestItem3' }
        })
      )
      const listItems = container.querySelectorAll(
        "[class*='truncateList__listItem']"
      )

      expect(listItems.length).toEqual(1)
      // TODO convert to e2e
      // const component = await TopNavBarMenuItemsLocator.find()
      // const items = await component.findAllMenuItems()

      // for (const item of items) {
      //   if (item.getId() === 'TestItem3') {
      //     const activeIndicatorStyle = await item.getActiveIndicatorStyle()
      //     expect(activeIndicatorStyle?.backgroundColor).to.equal(
      //       'rgb(255, 255, 255)'
      //     )
      //     expect(item).to.have.attribute('aria-current', 'page')
      //   } else {
      //     const activeIndicatorStyle = await item.getActiveIndicatorStyle()
      //     expect(activeIndicatorStyle?.backgroundColor).to.equal(
      //       'rgba(0, 0, 0, 0)'
      //     )
      //     expect(item).to.not.have.attribute('aria-current')
      //   }
      // }
    })

    // TODO convert to e2e
    // TODO: this test is super flaky, breaks even with the try catch fix below. Turned it off for now, try to fix later.
    // xit('should indicate correctly for truncated list as well', async () => {
    //   await mount(
    //     <div style={{ width: '400px' }}>
    //       {getMenuItems({
    //         menuItemsCustomIdList: [
    //           'TestItem1',
    //           'TestItem2',
    //           'TestItem3',
    //           'TestItem4',
    //           'TestItem5',
    //           'TestItem6'
    //         ],
    //         menuItemsProps: { currentPageId: 'TestItem5' }
    //       })}
    //     </div>
    //   )
    //   const component = await TopNavBarMenuItemsLocator.find()
    //   const listItems = await component.findAllMenuItems()
    //   const triggerItem = await component.findTruncateListTriggerItem()

    //   expect(triggerItem.getTextContent()).to.equal('4 More')

    //   for (const listItem of listItems) {
    //     expect(listItem).to.not.have.attribute('aria-current')
    //     const activeIndicatorStyle = await listItem.getActiveIndicatorStyle()

    //     if (
    //       listItem
    //         .getId()
    //         .includes('TopNavBarMenuItems-hiddenMenuItemsMenuTrigger_')
    //     ) {
    //       expect(activeIndicatorStyle?.backgroundColor).to.equal(
    //         'rgb(255, 255, 255)'
    //       )
    //     } else {
    //       expect(activeIndicatorStyle?.backgroundColor).to.equal(
    //         'rgba(0, 0, 0, 0)'
    //       )
    //     }
    //   }

    //   const button = await triggerItem.findButton()

    //   await button.click()

    //   let error = false

    //   try {
    //     const dropdown = await triggerItem.findSubmenu()
    //     const dropdownContent = await dropdown.findPopoverContent()
    //     const dropdownContentItems =
    //       (await dropdownContent.findAllOptions()) as QueriesHelpersEventsType[]
    //     const innerItems = (await dropdownContent.findAll(
    //       '[class*=-topNavBarMenuItems__submenuOption]'
    //     )) as QueriesHelpersEventsType[]

    //     expect(dropdownContentItems.length).to.equal(4)

    //     dropdownContentItems.forEach((dropdownContentItem, idx) => {
    //       if (dropdownContentItem.getId() === 'TestItem5') {
    //         expect(dropdownContentItem).to.have.attribute(
    //           'aria-current',
    //           'page'
    //         )
    //         expect(
    //           getComputedStyle(innerItems[idx].getDOMNode()).borderBottom
    //         ).to.equal('2px solid rgb(45, 59, 69)')
    //       } else {
    //         expect(dropdownContentItem).to.not.have.attribute('aria-current')
    //         expect(
    //           getComputedStyle(innerItems[idx].getDOMNode()).borderBottom
    //         ).to.equal('0px none rgb(45, 59, 69)')
    //       }
    //     })
    //   } catch (e: any) {
    //     // eslint-disable-next-line no-console
    //     console.log('Flaky test error: ', e)

    //     // TODO: This test is flaky, falsely breaks with this error sometimes. We skip this  unless there is another error. Try to fix later.
    //     if (
    //       !(e?.message || '').match(
    //         /Tried to find DOM element with selector: "\[data-cid~="(Popover|Position)"\]"/
    //       )?.length
    //     ) {
    //       error = true
    //     }
    //   }

    //   expect(error).to.be.false()
    // })

    it('should not set aria-current on item with submenu', () => {
      const { container } = render(
        getMenuItems({
          menuItemsCustomIdList: [
            'TestItem1',
            'TestItem2',
            'TestItem3',
            'TestItem4'
          ],
          menuItemsProps: { currentPageId: 'TestItem1' },
          menuItemsItemProps: (id) =>
            id === 'TestItem1'
              ? {
                  renderSubmenu: itemSubmenuExample,
                  href: undefined
                }
              : {}
        })
      )
      const activeItem = container.querySelector(
        "[class$='-topNavBarItem__container']"
      )!
      // TODO convert to e2e
      // const activeItemPseudoStyle = getComputedStyle(activeItem, '::after')
      // expect(activeItemPseudoStyle.backgroundColor).toBe('rgb(255, 255, 255)')

      expect(activeItem).toBeInTheDocument()
      expect(activeItem).not.toHaveAttribute('aria-current')
    })

    describe('should throw warning', () => {
      const nonDefaultVariants: TopNavBarItemProps['variant'][] = [
        'button',
        'icon'
      ]

      nonDefaultVariants.forEach((variant) => {
        it(`when the active item is "${variant}" variant`, async () => {
          render(
            getMenuItems({
              menuItemsCustomIdList: [
                'TestItem1',
                'TestItem2',
                'TestItem3',
                'TestItem4'
              ],
              menuItemsProps: { currentPageId: 'TestItem3' },
              menuItemsItemProps: {
                variant,
                renderIcon: variant === 'icon' ? IconSearchLine : undefined,
                renderAvatar: variant === 'avatar' ? avatarExample : undefined
              }
            })
          )

          const expectedErrorMessage = `Warning: Only \`variant="default"\` items can be set to current/active, but the item with id "TestItem3" is "${variant}" variant.`

          expect(consoleWarningMock).toHaveBeenCalledWith(
            expect.stringContaining(expectedErrorMessage),
            expect.any(String)
          )

          // TODO convert to e2e
          // const items = await component.findAllMenuItems()
          // const activeIndicatorStyle = await items[2].getActiveIndicatorStyle()

          // expect(consoleWarning).to.have.been.calledWith(
          //   `Warning: Only \`variant="default"\` items can be set to current/active, but the item with id "TestItem3" is "${variant}" variant.`
          // )
          // expect(activeIndicatorStyle?.backgroundColor).to.equal(
          //   'rgba(0, 0, 0, 0)'
          // )
          // expect(items[2]).to.not.have.attribute('aria-current')
        })

        // TODO: this test is super flaky, breaks even with the try catch fix below. Turned it off for now, try to fix later.
        it(`when the active item is "${variant}" variant and in the hidden item dropdown`, async () => {
          render(
            <div style={{ width: variant === 'icon' ? '80px' : '400px' }}>
              {getMenuItems({
                menuItemsCustomIdList: [
                  'TestItem1',
                  'TestItem2',
                  'TestItem3',
                  'TestItem4',
                  'TestItem5',
                  'TestItem6'
                ],
                menuItemsProps: { currentPageId: 'TestItem5' },
                menuItemsItemProps: {
                  variant,
                  renderIcon: variant === 'icon' ? IconSearchLine : undefined,
                  renderAvatar: variant === 'avatar' ? avatarExample : undefined
                }
              })}
            </div>
          )
          const expectedErrorMessage = `Warning: Only \`variant="default"\` items can be set to current/active, but the item with id "TestItem5" is "${variant}" variant.`

          expect(consoleWarningMock).toHaveBeenCalledWith(
            expect.stringContaining(expectedErrorMessage),
            expect.any(String)
          )

          // TODO convert to e2e
          // const component = await TopNavBarMenuItemsLocator.find()
          // const triggerItem = await component.findTruncateListTriggerItem()
          // const button = await triggerItem.findButton()

          // await button.click()

          // let error = false
          // try {
          //   const dropdown = await triggerItem.findSubmenu()
          //   const dropdownContent = await dropdown.findPopoverContent()
          //   const dropdownContentItems = await dropdownContent.findAllOptions()

          //   const item = await dropdownContentItems[2].find(
          //     '[class$=-topNavBarMenuItems__submenuOption]:not([class$=-topNavBarMenuItems__submenuOptionActive])'
          //   )

          //   expect(consoleWarning).to.have.been.calledWith(
          //     `Warning: Only \`variant="default"\` items can be set to current/active, but the item with id "TestItem5" is "${variant}" variant.`
          //   )
          //   expect(dropdownContentItems[2]).to.not.have.attribute(
          //     'aria-current'
          //   )
          //   expect(getComputedStyle(item.getDOMNode()).borderBottom).to.equal(
          //     '0px none rgb(45, 59, 69)'
          //   )
          // } catch (e: any) {
          //   // eslint-disable-next-line no-console
          //   console.log('Flaky test error: ', e)

          //   // TODO: This test is flaky, falsely breaks with this error sometimes. We skip this  unless there is another error. Try to fix later.
          //   if (
          //     !(e?.message || '').includes(
          //       `Tried to find DOM element with selector: "querySelectorAll [class$=-optionItem__container]:not([role="presentation"])"`
          //     )
          //   ) {
          //     error = true
          //   }
          // }

          // expect(error).to.be.false()
        })
      })

      it('when the active item is disabled', () => {
        render(
          getMenuItems({
            menuItemsCustomIdList: [
              'TestItem1',
              'TestItem2',
              'TestItem3',
              'TestItem4'
            ],
            menuItemsProps: { currentPageId: 'TestItem2' },
            menuItemsItemProps: (id) =>
              id === 'TestItem2'
                ? {
                    status: 'disabled'
                  }
                : {}
          })
        )
        const expectedErrorMessage = `Warning: Disabled items can not be set to current/active, but the item with id "TestItem2" is disabled.`

        expect(consoleWarningMock).toHaveBeenCalledWith(
          expect.stringContaining(expectedErrorMessage),
          expect.any(String)
        )

        // TODO convert to e2e
        // const component = await TopNavBarMenuItemsLocator.find()
        // const items = await component.findAllMenuItems()
        // const activeIndicatorStyle = await items[1].getActiveIndicatorStyle()

        // expect(consoleWarning).to.have.been.calledWith(
        //   `Warning: Disabled items can not be set to current/active, but the item with id "TestItem2" is disabled.`
        // )
        // expect(activeIndicatorStyle?.backgroundColor).to.equal(
        //   'rgba(0, 0, 0, 0)'
        // )
        // expect(items[1]).to.not.have.attribute('aria-current')
      })

      // TODO: this test is super flaky, breaks even with the try catch fix below. Turned it off for now, try to fix later.
      it('when the active item is disabled and in the hidden item dropdown', async () => {
        render(
          <div style={{ width: '400px' }}>
            {getMenuItems({
              menuItemsCustomIdList: [
                'TestItem1',
                'TestItem2',
                'TestItem3',
                'TestItem4',
                'TestItem5',
                'TestItem6'
              ],
              menuItemsProps: { currentPageId: 'TestItem5' },
              menuItemsItemProps: (id) =>
                id === 'TestItem5'
                  ? {
                      status: 'disabled'
                    }
                  : {}
            })}
          </div>
        )
        const expectedErrorMessage = `Warning: Disabled items can not be set to current/active, but the item with id "TestItem5" is disabled.`

        expect(consoleWarningMock).toHaveBeenCalledWith(
          expect.stringContaining(expectedErrorMessage),
          expect.any(String)
        )

        // TODO convert to e2e
        // const component = await TopNavBarMenuItemsLocator.find()
        // const triggerItem = await component.findTruncateListTriggerItem()
        // const button = await triggerItem.findButton()

        // await button.click()

        // const dropdown = await triggerItem.findSubmenu()
        // const dropdownContent = await dropdown.findPopoverContent()
        // const dropdownContentItems = await dropdownContent.findAllOptions()

        // const item = await dropdownContentItems[2].find(
        //   '[class$=-topNavBarMenuItems__submenuOption]:not([class$=-topNavBarMenuItems__submenuOptionActive])'
        // )

        // expect(consoleWarning).to.have.been.calledWith(
        //   `Warning: Disabled items can not be set to current/active, but the item with id "TestItem5" is disabled.`
        // )
        // expect(dropdownContentItems[2]).to.not.have.attribute('aria-current')
        // expect(getComputedStyle(item.getDOMNode()).borderBottom).to.equal(
        //   '0px none rgb(45, 59, 69)'
        // )
      })
    })
  })

  describe('elementRef prop', () => {
    it('should return with the root list element', async () => {
      const elementRef = vi.fn()
      const { container } = render(
        getMenuItems({
          menuItemsProps: { elementRef }
        })
      )
      const menu = container.querySelector("[class$='topNavBarMenuItems']")

      expect(elementRef).toHaveBeenCalledWith(menu)
    })
  })

  it('should not allow "renderAvatar" prop on items', async () => {
    render(
      getMenuItems({
        menuItemsCustomIdList: [
          'TestItem1',
          'TestItem2',
          'TestItem3',
          'TestItem4'
        ],
        menuItemsItemProps: (id) =>
          id === 'TestItem2'
            ? {
                renderAvatar: avatarExample
              }
            : {}
      })
    )
    const expectedErrorMessage = `Warning: Items in <TopNavBar.MenuItems> are not allowed to have avatars, but item with id: "TestItem2" has \`renderAvatar\` prop.`

    expect(consoleErrorMock).toHaveBeenCalledWith(
      expect.stringContaining(expectedErrorMessage),
      expect.any(String)
    )

    // TODO convert to e2e
    // const items = await component.findAllMenuItems()

    // expect(consoleError).to.have.been.calledWith(
    //   `Warning: Items in <TopNavBar.MenuItems> are not allowed to have avatars, but item with id: "TestItem2" has \`renderAvatar\` prop.`
    // )
    // expect(items.length).to.equal(3)
    // expect(
    //   await component.find('[id="TestItem2"]', { expectEmpty: true })
    // ).to.not.exist()
  })

  describe('should be accessible', () => {
    it('a11y', async () => {
      const { container } = render(getMenuItems())
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })

    describe('with generated examples', () => {
      const generatedComponents = generateA11yTests(
        TopNavBarMenuItems,
        TopNavBarMenuItemsExamples
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
  })
})
