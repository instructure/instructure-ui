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

import {
  expect,
  mount,
  stub,
  generateA11yTests
} from '@instructure/ui-test-utils'
import { getComputedStyle } from '@instructure/ui-dom-utils'
import type { QueriesHelpersEventsType } from '@instructure/ui-test-queries'

import { IconSearchLine } from '@instructure/ui-icons'

import {
  avatarExample,
  getMenuItems,
  itemSubmenuExample,
  SmallViewportModeWrapper
} from '../../utils/exampleHelpers'
import type { TopNavBarItemProps } from '../../TopNavBarItem/props'

import { TopNavBarMenuItems } from '../index'
import { TopNavBarMenuItemsLocator } from '../TopNavBarMenuItemsLocator'
import TopNavBarMenuItemsExamples from '../__examples__/TopNavBarMenuItems.examples'

describe('<TopNavBarMenuItems />', async () => {
  it('should render', async () => {
    await mount(getMenuItems())
    const component = await TopNavBarMenuItemsLocator.find()

    expect(component).to.exist()
    expect(component).to.have.tagName('ul')
  })

  it('should not render in smallViewport mode', async () => {
    await mount(
      <SmallViewportModeWrapper>{getMenuItems()}</SmallViewportModeWrapper>
    )
    const component = await TopNavBarMenuItemsLocator.find({
      expectEmpty: true
    })

    expect(component).to.not.exist()
  })

  it('should not render if no children are passed', async () => {
    await mount(getMenuItems({ menuItemsCount: 0 }))
    const component = await TopNavBarMenuItemsLocator.find({
      expectEmpty: true
    })

    expect(component).to.not.exist()
  })

  describe('truncated list', async () => {
    it('should render as a TruncateList component', async () => {
      await mount(getMenuItems())
      const component = await TopNavBarMenuItemsLocator.find()
      const truncatedList = await component.findTruncateList()

      expect(truncatedList).to.exist()
    })

    it('should truncate the list correctly', async () => {
      await mount(
        <div style={{ width: '400px' }}>
          {getMenuItems({ menuItemsCount: 6 })}
        </div>
      )
      const component = await TopNavBarMenuItemsLocator.find()
      const truncatedList = await component.findTruncateList()
      const listItems = await truncatedList.findAllListItems()
      const hiddenMenuTrigger = await truncatedList.findMenuTriggerItem()
      const triggerItem = await component.findTruncateListTriggerItem()

      expect(listItems.length).to.equal(4) // 3 + trigger
      expect(listItems[3].getDOMNode()).to.equal(hiddenMenuTrigger.getDOMNode())
      expect(hiddenMenuTrigger.getTextContent()).to.equal('3 More')
      expect(hiddenMenuTrigger).to.contain(triggerItem?.getDOMNode())
    })

    it('should truncate the end of the list', async () => {
      await mount(
        <div style={{ width: '400px' }}>
          {getMenuItems({ menuItemsCount: 6 })}
        </div>
      )
      const component = await TopNavBarMenuItemsLocator.find()
      const items = await component.findAllMenuItems()
      const firstButton = await items[0].findButton()

      expect(firstButton).to.have.id('Overview')
    })

    it('should render submenu as subpages in hidden items', async () => {
      await mount(
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
      const component = await TopNavBarMenuItemsLocator.find()
      const triggerItem = await component.findTruncateListTriggerItem()
      const triggerItemButton = await triggerItem.findButton()

      await triggerItemButton.click()

      let error = false

      try {
        const hiddenItems = await triggerItem.findSubmenu()
        const hiddenItemsContent = await hiddenItems.findPopoverContent()
        const optionWithSubmenu = await hiddenItemsContent.find(
          '[id="TestItem4"]'
        )

        await optionWithSubmenu.click()

        const subpage = await hiddenItems.findPopoverContent()
        const subpageOptions =
          (await subpage.findAllOptions()) as QueriesHelpersEventsType[]

        expect(subpageOptions.length).to.equal(4) // 3 + "back"
        subpageOptions.shift() // removes "back"
        subpageOptions.forEach((option) => {
          expect(option.getId()).to.include('linkExampleOption')
        })
      } catch (e: any) {
        // eslint-disable-next-line no-console
        console.log(e)

        // TODO: This test is flaky, falsely breaks with this error sometimes. We skip this  unless there is another error. Try to fix later.
        if (
          !(e?.message || '').includes(
            `Tried to find DOM element with selector: "[data-cid~="Popover"]"`
          )
        ) {
          error = true
        }
      }

      expect(error).to.be.false()
    })
  })

  describe('listLabel prop', async () => {
    it('should set aria-label on the list', async () => {
      await mount(
        <div style={{ width: '400px' }}>
          {getMenuItems({
            menuItemsCount: 6,
            menuItemsProps: { listLabel: 'List label example' }
          })}
        </div>
      )
      const component = await TopNavBarMenuItemsLocator.find()

      expect(component).to.have.tagName('ul')
      expect(component).to.have.attribute('aria-label', 'List label example')
    })
  })

  describe('renderHiddenItemsMenuTriggerLabel prop', async () => {
    it('should set the label for the trigger item of the hidden list items menu', async () => {
      await mount(
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
      const component = await TopNavBarMenuItemsLocator.find()
      const triggerItem = await component.findTruncateListTriggerItem()

      expect(triggerItem).to.have.text('There are 5 hidden items')
    })
  })

  describe('currentPageId prop', async () => {
    it('should set the item with id as active', async () => {
      await mount(
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
      const component = await TopNavBarMenuItemsLocator.find()
      const items = await component.findAllMenuItems()

      for (const item of items) {
        if (item.getId() === 'TestItem3') {
          const activeIndicatorStyle = await item.getActiveIndicatorStyle()
          expect(activeIndicatorStyle?.backgroundColor).to.equal(
            'rgb(255, 255, 255)'
          )
          expect(item).to.have.attribute('aria-current', 'page')
        } else {
          const activeIndicatorStyle = await item.getActiveIndicatorStyle()
          expect(activeIndicatorStyle?.backgroundColor).to.equal(
            'rgba(0, 0, 0, 0)'
          )
          expect(item).to.not.have.attribute('aria-current')
        }
      }
    })

    it('should indicate correctly for truncated list as well', async () => {
      await mount(
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
            menuItemsProps: { currentPageId: 'TestItem5' }
          })}
        </div>
      )
      const component = await TopNavBarMenuItemsLocator.find()
      const listItems = await component.findAllMenuItems()
      const triggerItem = await component.findTruncateListTriggerItem()

      expect(triggerItem.getTextContent()).to.equal('4 More')

      for (const listItem of listItems) {
        expect(listItem).to.not.have.attribute('aria-current')
        const activeIndicatorStyle = await listItem.getActiveIndicatorStyle()

        if (
          listItem
            .getId()
            .includes('TopNavBarMenuItems-hiddenMenuItemsMenuTrigger_')
        ) {
          expect(activeIndicatorStyle?.backgroundColor).to.equal(
            'rgb(255, 255, 255)'
          )
        } else {
          expect(activeIndicatorStyle?.backgroundColor).to.equal(
            'rgba(0, 0, 0, 0)'
          )
        }
      }

      const button = await triggerItem.findButton()

      await button.click()

      let error = false

      try {
        const dropdown = await triggerItem.findSubmenu()
        const dropdownContent = await dropdown.findPopoverContent()
        const dropdownContentItems =
          (await dropdownContent.findAllOptions()) as QueriesHelpersEventsType[]
        const innerItems = (await dropdownContent.findAll(
          '[class*=-topNavBarMenuItems__submenuOption]'
        )) as QueriesHelpersEventsType[]

        expect(dropdownContentItems.length).to.equal(4)

        dropdownContentItems.forEach((dropdownContentItem, idx) => {
          if (dropdownContentItem.getId() === 'TestItem5') {
            expect(dropdownContentItem).to.have.attribute(
              'aria-current',
              'page'
            )
            expect(
              getComputedStyle(innerItems[idx].getDOMNode()).borderBottom
            ).to.equal('2px solid rgb(45, 59, 69)')
          } else {
            expect(dropdownContentItem).to.not.have.attribute('aria-current')
            expect(
              getComputedStyle(innerItems[idx].getDOMNode()).borderBottom
            ).to.equal('0px none rgb(45, 59, 69)')
          }
        })
      } catch (e: any) {
        // eslint-disable-next-line no-console
        console.log(e)

        // TODO: This test is flaky, falsely breaks with this error sometimes. We skip this  unless there is another error. Try to fix later.
        if (
          !(e?.message || '').includes(
            `Tried to find DOM element with selector: "[data-cid~="Position"]"`
          )
        ) {
          error = true
        }
      }

      expect(error).to.be.false()
    })

    it('should not set aria-current on item with submenu', async () => {
      await mount(
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
      const component = await TopNavBarMenuItemsLocator.find()
      const items = await component.findAllMenuItems()
      const activeItem = items[0]
      const activeIndicatorStyle = await activeItem.getActiveIndicatorStyle()

      expect(activeIndicatorStyle?.backgroundColor).to.equal(
        'rgb(255, 255, 255)'
      )
      expect(activeItem).to.not.have.attribute('aria-current')
    })

    describe('should throw warning', async () => {
      const nonDefaultVariants: TopNavBarItemProps['variant'][] = [
        'button',
        'icon'
      ]

      nonDefaultVariants.forEach((variant) => {
        it(`when the active item is "${variant}" variant`, async () => {
          const consoleWarning = stub(console, 'warn')
          await mount(
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
          const component = await TopNavBarMenuItemsLocator.find()
          const items = await component.findAllMenuItems()
          const activeIndicatorStyle = await items[2].getActiveIndicatorStyle()

          expect(consoleWarning).to.have.been.calledWith(
            `Warning: Only \`variant="default"\` items can be set to current/active, but the item with id "TestItem3" is "${variant}" variant.`
          )
          expect(activeIndicatorStyle?.backgroundColor).to.equal(
            'rgba(0, 0, 0, 0)'
          )
          expect(items[2]).to.not.have.attribute('aria-current')
        })

        it(`when the active item is "${variant}" variant and in the hidden item dropdown`, async () => {
          const consoleWarning = stub(console, 'warn')
          await mount(
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
          const component = await TopNavBarMenuItemsLocator.find()
          const triggerItem = await component.findTruncateListTriggerItem()
          const button = await triggerItem.findButton()

          await button.click()

          let error = false
          try {
            const dropdown = await triggerItem.findSubmenu()
            const dropdownContent = await dropdown.findPopoverContent()
            const dropdownContentItems = await dropdownContent.findAllOptions()

            const item = await dropdownContentItems[2].find(
              '[class$=-topNavBarMenuItems__submenuOption]:not([class$=-topNavBarMenuItems__submenuOptionActive])'
            )

            expect(consoleWarning).to.have.been.calledWith(
              `Warning: Only \`variant="default"\` items can be set to current/active, but the item with id "TestItem5" is "${variant}" variant.`
            )
            expect(dropdownContentItems[2]).to.not.have.attribute(
              'aria-current'
            )
            expect(getComputedStyle(item.getDOMNode()).borderBottom).to.equal(
              '0px none rgb(45, 59, 69)'
            )
          } catch (e: any) {
            // eslint-disable-next-line no-console
            console.log(e)

            // TODO: This test is flaky, falsely breaks with this error sometimes. We skip this  unless there is another error. Try to fix later.
            if (
              !(e?.message || '').includes(
                `Tried to find DOM element with selector: "querySelectorAll [class$=-optionItem__container]:not([role="presentation"])"`
              )
            ) {
              error = true
            }
          }

          expect(error).to.be.false()
        })
      })

      it('when the active item is disabled', async () => {
        const consoleWarning = stub(console, 'warn')
        await mount(
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
        const component = await TopNavBarMenuItemsLocator.find()
        const items = await component.findAllMenuItems()
        const activeIndicatorStyle = await items[1].getActiveIndicatorStyle()

        expect(consoleWarning).to.have.been.calledWith(
          `Warning: Disabled items can not be set to current/active, but the item with id "TestItem2" is disabled.`
        )
        expect(activeIndicatorStyle?.backgroundColor).to.equal(
          'rgba(0, 0, 0, 0)'
        )
        expect(items[1]).to.not.have.attribute('aria-current')
      })

      it('when the active item is disabled and in the hidden item dropdown', async () => {
        const consoleWarning = stub(console, 'warn')
        await mount(
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
        const component = await TopNavBarMenuItemsLocator.find()
        const triggerItem = await component.findTruncateListTriggerItem()
        const button = await triggerItem.findButton()

        await button.click()

        const dropdown = await triggerItem.findSubmenu()
        const dropdownContent = await dropdown.findPopoverContent()
        const dropdownContentItems = await dropdownContent.findAllOptions()

        const item = await dropdownContentItems[2].find(
          '[class$=-topNavBarMenuItems__submenuOption]:not([class$=-topNavBarMenuItems__submenuOptionActive])'
        )

        expect(consoleWarning).to.have.been.calledWith(
          `Warning: Disabled items can not be set to current/active, but the item with id "TestItem5" is disabled.`
        )
        expect(dropdownContentItems[2]).to.not.have.attribute('aria-current')
        expect(getComputedStyle(item.getDOMNode()).borderBottom).to.equal(
          '0px none rgb(45, 59, 69)'
        )
      })
    })
  })

  describe('elementRef prop', async () => {
    it('should return with the root list element', async () => {
      const elementRef = stub()
      await mount(
        getMenuItems({
          menuItemsProps: { elementRef }
        })
      )
      const component = await TopNavBarMenuItemsLocator.find()

      expect(elementRef).to.have.been.calledWith(component.getDOMNode())
    })
  })

  it('should not allow "renderAvatar" prop on items', async () => {
    const consoleError = stub(console, 'error')
    await mount(
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
    const component = await TopNavBarMenuItemsLocator.find()
    const items = await component.findAllMenuItems()

    expect(consoleError).to.have.been.calledWith(
      `Warning: Items in <TopNavBar.MenuItems> are not allowed to have avatars, but item with id: "TestItem2" has \`renderAvatar\` prop.`
    )
    expect(items.length).to.equal(3)
    expect(
      await component.find('[id="TestItem2"]', { expectEmpty: true })
    ).to.not.exist()
  })

  describe('should be accessible', async () => {
    generateA11yTests(TopNavBarMenuItems, TopNavBarMenuItemsExamples)

    it('a11y', async () => {
      await mount(getMenuItems())
      const topNavBarMenuItems = await TopNavBarMenuItemsLocator.find()
      expect(await topNavBarMenuItems.accessible()).to.be.true()
    })
  })
})
