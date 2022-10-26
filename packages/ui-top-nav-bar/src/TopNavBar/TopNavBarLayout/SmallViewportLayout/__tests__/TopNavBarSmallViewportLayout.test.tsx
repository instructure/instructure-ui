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

import { expect, mount, stub, find, match } from '@instructure/ui-test-utils'
import { getComputedStyle } from '@instructure/ui-dom-utils'
import type { QueriesHelpersEventsType } from '@instructure/ui-test-queries'

import { TopNavBarItem } from '../../../TopNavBarItem'
import { TopNavBarUser } from '../../../TopNavBarUser'
import {
  getActionItems,
  getBrand,
  getCustomPopoverConfig,
  getInPlaceDialogConfig,
  getMenuItems,
  getUser,
  SmallViewportModeWrapper
} from '../../../utils/exampleHelpers'

import { TopNavBarSmallViewportLayout } from '../index'
import type { TopNavBarSmallViewportLayoutProps } from '../props'
import { TopNavBarSmallViewportLayoutLocator } from '../TopNavBarSmallViewportLayoutLocator'
import { IconSearchLine } from '@instructure/ui-icons'

const defaultProps: Pick<
  TopNavBarSmallViewportLayoutProps,
  | 'dropdownMenuToggleButtonLabel'
  | 'dropdownMenuLabel'
  | 'renderBrand'
  | 'renderMenuItems'
  | 'renderActionItems'
  | 'renderUser'
> = {
  dropdownMenuToggleButtonLabel: 'Toggle Menu',
  dropdownMenuLabel: 'Main Menu',
  renderBrand: getBrand(),
  renderMenuItems: getMenuItems(),
  renderActionItems: getActionItems(),
  renderUser: getUser()
}

describe('<TopNavBarSmallViewportLayout />', async () => {
  describe('renderBrand', async () => {
    it('should render brand container', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderBrand={getBrand()}
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const brandContainer = await component.findBrandContainer()
      const brand = await component.findBrand()

      expect(brandContainer).to.be.visible()
      expect(brand).to.be.visible()
    })

    it('should not render brand container, when there is no "renderBrand" prop set', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderBrand={undefined}
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const brandContainer = await component.findBrandContainer({
        expectEmpty: true
      })
      const brand = await component.findBrand({ expectEmpty: true })

      expect(brandContainer).to.not.exist()
      expect(brand).to.not.exist()
    })

    it('should not render brand container when "renderName" and "renderIcon" props are both missing', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderBrand={getBrand({
              brandProps: { renderName: undefined, renderIcon: undefined }
            })}
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const brandContainer = await component.findBrandContainer({
        expectEmpty: true
      })
      const brand = await component.findBrand({ expectEmpty: true })

      expect(brandContainer).to.not.exist()
      expect(brand).to.not.exist()
    })

    it('should not render when "alternativeTitle" is set', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderBrand={getBrand()}
            alternativeTitle="Alternative title test"
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const menuTrigger = await component.findDropdownMenuTriggerWrapper()
      const brandContainer = await component.findBrandContainer({
        expectEmpty: true
      })
      const brand = await component.findBrand({ expectEmpty: true })

      expect(menuTrigger).to.be.visible()
      expect(menuTrigger).to.have.text('Alternative title test')

      expect(brandContainer).to.not.exist()
      expect(brand).to.not.exist()
    })
  })

  describe('renderActionItems', async () => {
    it('should render action item container', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderActionItems={getActionItems()}
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const actionItems = await component.findActionItems()

      expect(actionItems).to.be.visible()
    })

    it('should not render action item container, when there is no "renderActionItems" prop set', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderActionItems={undefined}
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const actionItems = await component.findActionItems({ expectEmpty: true })

      expect(actionItems).to.not.exist()
    })

    it('should not render action item container, when there are 0 action items', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderActionItems={getActionItems({ actionItemsCount: 0 })}
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const actionItems = await component.findActionItems({ expectEmpty: true })

      expect(actionItems).to.not.exist()
    })
  })

  describe('renderMenuItems', async () => {
    it('should render menu items in the dropdown menu', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderUser={undefined}
            renderMenuItems={getMenuItems({
              menuItemsCustomIdList: [
                'TestItem1',
                'TestItem2',
                'TestItem3',
                'TestItem4'
              ]
            })}
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const menuTriggerButton = await component.findDropdownMenuTriggerButton()

      await menuTriggerButton.click()

      const dropdownMenu = await component.findDropdownMenu()
      const options =
        (await dropdownMenu.findAllOptions()) as QueriesHelpersEventsType[]

      expect(options.length).to.equal(4)
      options.forEach((option, idx) => {
        expect(option).to.have.id(`TestItem${idx + 1}`)
      })
    })

    it('should not render menu items when there are none', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderUser={getUser({ userId: 'TestUser' })}
            renderMenuItems={getMenuItems({
              menuItemsCount: 0
            })}
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const menuTriggerButton = await component.findDropdownMenuTriggerButton()

      await menuTriggerButton.click()

      const dropdownMenu = await component.findDropdownMenu()
      const options =
        (await dropdownMenu.findAllOptions()) as QueriesHelpersEventsType[]

      expect(options.length).to.equal(1)
      expect(options[0]).to.have.id('TestUser')
    })

    it('should not render menu items when no "renderMenuItems" prop is set', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderUser={getUser({ userId: 'TestUser' })}
            renderMenuItems={undefined}
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const menuTriggerButton = await component.findDropdownMenuTriggerButton()

      await menuTriggerButton.click()

      const dropdownMenu = await component.findDropdownMenu()
      const options =
        (await dropdownMenu.findAllOptions()) as QueriesHelpersEventsType[]

      expect(options.length).to.equal(1)
      expect(options[0]).to.have.id('TestUser')
    })

    it('should not render whole dropdown menu when neither "renderMenuItems" nor "renderUser" props are set', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderUser={undefined}
            renderMenuItems={undefined}
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const brandContainer = await component.findBrandContainer()
      const menuTriggerButton = await component.findDropdownMenuTriggerButton({
        expectEmpty: true
      })

      expect(brandContainer).to.exist()
      expect(menuTriggerButton).to.not.exist()
    })

    it('should render submenus as subpages', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderUser={undefined}
            renderMenuItems={getMenuItems({
              menuItemsWithSubmenu: true,
              menuItemsCustomIdList: ['TestItem1']
            })}
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const menuTriggerButton = await component.findDropdownMenuTriggerButton()

      await menuTriggerButton.click()

      const dropdownMenu = await component.findDropdownMenu()
      const option = await dropdownMenu.find('#TestItem1')

      await option.click(undefined, { clickable: false })

      const subMenuOptions =
        (await dropdownMenu.findAllOptions()) as QueriesHelpersEventsType[]

      expect(subMenuOptions.length).to.equal(4)
      subMenuOptions.forEach((subMenuOption, idx) => {
        if (idx === 0) {
          expect(subMenuOption.getId()).to.include('Back')
        } else {
          expect(subMenuOption).to.have.id(`linkExampleOption${idx}`)
        }
      })
    })

    describe('items with "customPopoverConfig" prop', async () => {
      it('should render content of "customPopoverConfig" prop in the dropdown menu', async () => {
        await mount(
          <SmallViewportModeWrapper>
            <TopNavBarSmallViewportLayout
              {...defaultProps}
              renderUser={undefined}
              renderMenuItems={getMenuItems({
                menuItemsWithSubmenu: false,
                menuItemsCustomIdList: ['TestItem1'],
                menuItemsItemProps: {
                  href: undefined,
                  customPopoverConfig: getCustomPopoverConfig()
                }
              })}
            />
          </SmallViewportModeWrapper>
        )
        const component = await TopNavBarSmallViewportLayoutLocator.find()
        const menuTriggerButton =
          await component.findDropdownMenuTriggerButton()

        await menuTriggerButton.click()

        const dropdownMenu = await component.findDropdownMenu()
        const option = await dropdownMenu.find('#TestItem1')

        await option.click(undefined, { clickable: false })

        const customPopoverOption = await dropdownMenu.find(
          '[id^="TopNavBarItem__customPopoverOption_"]'
        )

        expect(customPopoverOption).to.have.text('dialog content')
      })

      it('should throw warning when there is no content', async () => {
        const consoleWarning = stub(console, 'warn')
        await mount(
          <SmallViewportModeWrapper>
            <TopNavBarSmallViewportLayout
              {...defaultProps}
              renderUser={undefined}
              renderMenuItems={getMenuItems({
                menuItemsWithSubmenu: false,
                menuItemsCustomIdList: ['TestItem1'],
                menuItemsItemProps: {
                  href: undefined,
                  customPopoverConfig: {
                    ...getCustomPopoverConfig(),
                    children: null
                  }
                }
              })}
            />
          </SmallViewportModeWrapper>
        )

        expect(consoleWarning).to.have.been.calledWith(
          `Warning: Pass the content of the custom Popover as "customPopoverConfig.children" for the item with id: "TestItem1".`
        )
      })

      it('should throw warning when there submenu passed too', async () => {
        const consoleWarning = stub(console, 'warn')
        await mount(
          <SmallViewportModeWrapper>
            <TopNavBarSmallViewportLayout
              {...defaultProps}
              renderUser={undefined}
              renderMenuItems={getMenuItems({
                menuItemsWithSubmenu: true,
                menuItemsCustomIdList: ['TestItem1'],
                menuItemsItemProps: {
                  href: undefined,
                  customPopoverConfig: getCustomPopoverConfig()
                }
              })}
            />
          </SmallViewportModeWrapper>
        )

        expect(consoleWarning).to.have.been.calledWith(
          `Warning: TopNavBar.Items are not allowed to have both the "renderSubmenu" and "customPopoverConfig" props. For submenus, pass a Drilldown component via the "renderSubmenu" prop, and only use "customPopoverConfig" for custom features. Item with id: "TestItem1" will ignore the "customPopoverConfig" prop.`
        )
      })
    })

    it('should not render icons', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderUser={undefined}
            renderMenuItems={getMenuItems({
              menuItemsCustomIdList: [
                'TestItem1',
                'TestItem2',
                'TestItem3',
                'TestItem4'
              ],
              menuItemsItemProps: {
                renderIcon: <IconSearchLine />
              }
            })}
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const menuTriggerButton = await component.findDropdownMenuTriggerButton()

      await menuTriggerButton.click()

      const dropdownMenu = await component.findDropdownMenu()
      const options =
        (await dropdownMenu.findAllOptions()) as QueriesHelpersEventsType[]

      expect(options.length).to.equal(4)
      for (const option of options) {
        expect(
          await option.find('svg[name="IconSearch"]', { expectEmpty: true })
        ).to.not.exist()
      }
    })

    it('should pass onClick`', async () => {
      const onClick = stub()
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderUser={undefined}
            renderMenuItems={getMenuItems({
              menuItemsCustomIdList: [
                'TestItem1',
                'TestItem2',
                'TestItem3',
                'TestItem4'
              ],
              menuItemsItemProps: {
                href: undefined,
                onClick: onClick
              }
            })}
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const menuTriggerButton = await component.findDropdownMenuTriggerButton()

      await menuTriggerButton.click()

      const dropdownMenu = await component.findDropdownMenu()
      const options =
        (await dropdownMenu.findAllOptions()) as QueriesHelpersEventsType[]

      await options[0].click(undefined, { clickable: false })

      expect(onClick).to.have.been.calledWithMatch(match.object)
    })

    it('should disable options when they have `status="disabled"`', async () => {
      const onClick = stub()
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderUser={undefined}
            renderMenuItems={getMenuItems({
              menuItemsCustomIdList: [
                'TestItem1',
                'TestItem2',
                'TestItem3',
                'TestItem4'
              ],
              menuItemsItemProps: {
                href: undefined,
                status: 'disabled',
                onClick: onClick
              }
            })}
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const menuTriggerButton = await component.findDropdownMenuTriggerButton()

      await menuTriggerButton.click()

      const dropdownMenu = await component.findDropdownMenu()
      const options =
        (await dropdownMenu.findAllOptions()) as QueriesHelpersEventsType[]

      expect(options.length).to.equal(4)
      for (const option of options) {
        expect(option).to.have.attribute('aria-disabled', 'true')
      }

      await options[0].click(undefined, { clickable: false })

      expect(onClick).to.not.have.been.called()
    })

    describe('should indicate active item', async () => {
      it('should indicate active item', async () => {
        await mount(
          <SmallViewportModeWrapper>
            <TopNavBarSmallViewportLayout
              {...defaultProps}
              renderUser={undefined}
              renderMenuItems={getMenuItems({
                currentPageId: 'TestItem2',
                menuItemsCustomIdList: [
                  'TestItem1',
                  'TestItem2',
                  'TestItem3',
                  'TestItem4'
                ]
              })}
            />
          </SmallViewportModeWrapper>
        )
        const component = await TopNavBarSmallViewportLayoutLocator.find()
        const menuTriggerButton =
          await component.findDropdownMenuTriggerButton()

        await menuTriggerButton.click()

        const dropdownMenu = await component.findDropdownMenu()
        const options =
          (await dropdownMenu.findAllOptions()) as QueriesHelpersEventsType[]

        expect(options.length).to.equal(4)
        for (const option of options) {
          if (option.getId() === 'TestItem2') {
            const item = await option.find(
              '[class$=-topNavBarSmallViewportLayout__dropdownMenuOptionActive]'
            )
            expect(option).to.have.attribute('aria-current', 'page')
            expect(getComputedStyle(item.getDOMNode()).borderBottom).to.equal(
              '2px solid rgb(45, 59, 69)'
            )
          } else {
            const item = await option.find(
              '[class$=-topNavBarSmallViewportLayout__dropdownMenuOption]:not([class$=-topNavBarSmallViewportLayout__dropdownMenuOptionActive])'
            )
            expect(option).to.not.have.attribute('aria-current')
            expect(getComputedStyle(item.getDOMNode()).borderBottom).to.equal(
              '0px none rgb(45, 59, 69)'
            )
          }
        }
      })

      it('should throw warning if item is not "default" variant', async () => {
        const consoleWarning = stub(console, 'warn')
        await mount(
          <SmallViewportModeWrapper>
            <TopNavBarSmallViewportLayout
              {...defaultProps}
              renderUser={undefined}
              renderMenuItems={getMenuItems({
                currentPageId: 'TestItem2',
                menuItemsCustomIdList: [
                  'TestItem1',
                  'TestItem2',
                  'TestItem3',
                  'TestItem4'
                ],
                menuItemsItemProps: { variant: 'button' }
              })}
            />
          </SmallViewportModeWrapper>
        )

        expect(consoleWarning).to.have.been.calledWith(
          `Warning: Only \`variant="default"\` items can be set to current/active, but the item with id "TestItem2" is "button" variant.`
        )
      })

      it('should throw warning if item is "disabled" status', async () => {
        const consoleWarning = stub(console, 'warn')
        await mount(
          <SmallViewportModeWrapper>
            <TopNavBarSmallViewportLayout
              {...defaultProps}
              renderUser={undefined}
              renderMenuItems={getMenuItems({
                currentPageId: 'TestItem2',
                menuItemsCustomIdList: [
                  'TestItem1',
                  'TestItem2',
                  'TestItem3',
                  'TestItem4'
                ],
                menuItemsItemProps: { status: 'disabled' }
              })}
            />
          </SmallViewportModeWrapper>
        )

        expect(consoleWarning).to.have.been.calledWith(
          `Warning: Disabled items can not be set to current/active, but the item with id "TestItem2" is disabled.`
        )
      })
    })
  })

  describe('renderUser', async () => {
    it('should render user items in the dropdown menu', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderUser={getUser({ userId: 'TestUser' })}
            renderMenuItems={getMenuItems({
              menuItemsCustomIdList: [
                'TestItem1',
                'TestItem2',
                'TestItem3',
                'TestItem4'
              ]
            })}
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const menuTriggerButton = await component.findDropdownMenuTriggerButton()

      await menuTriggerButton.click()

      const dropdownMenu = await component.findDropdownMenu()
      const options =
        (await dropdownMenu.findAllOptions()) as QueriesHelpersEventsType[]

      expect(options.length).to.equal(5)
      expect(options[0]).to.have.id('TestUser')
    })

    it('should not render user items when it is not set', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderUser={undefined}
            renderMenuItems={getMenuItems({
              menuItemsCustomIdList: [
                'TestItem1',
                'TestItem2',
                'TestItem3',
                'TestItem4'
              ]
            })}
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const menuTriggerButton = await component.findDropdownMenuTriggerButton()

      await menuTriggerButton.click()

      const dropdownMenu = await component.findDropdownMenu()
      const options =
        (await dropdownMenu.findAllOptions()) as QueriesHelpersEventsType[]

      expect(options.length).to.equal(4)
      expect(options[0]).to.not.have.id('TestUser')
    })

    it('should display separator when both menu items and user is visible', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderUser={getUser({ userId: 'TestUser' })}
            renderMenuItems={getMenuItems({
              menuItemsCustomIdList: [
                'TestItem1',
                'TestItem2',
                'TestItem3',
                'TestItem4'
              ]
            })}
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const menuTriggerButton = await component.findDropdownMenuTriggerButton()

      await menuTriggerButton.click()

      const dropdownMenu = await component.findDropdownMenu()
      const listItems = (await dropdownMenu.findAll(
        'li'
      )) as QueriesHelpersEventsType[]

      expect(listItems.length).to.equal(6) // user + sep + 4 item
      listItems.forEach((listItem, idx) => {
        const innerItemId = (listItem.getDOMNode().childNodes[0] as HTMLElement)
          .id

        if (idx === 0) {
          expect(innerItemId).to.equal('TestUser')
        } else if (idx === 1) {
          expect(innerItemId).to.startWith(
            'TopNavBarSmallViewportLayout-separator_'
          )
        } else {
          expect(innerItemId).to.equal(`TestItem${idx - 1}`)
        }
      })
    })

    it('should not render icons', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderUser={
              <TopNavBarUser>
                <TopNavBarItem id="Test User" renderIcon={<IconSearchLine />}>
                  User Name
                </TopNavBarItem>
              </TopNavBarUser>
            }
            renderMenuItems={undefined}
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const menuTriggerButton = await component.findDropdownMenuTriggerButton()

      await menuTriggerButton.click()

      const dropdownMenu = await component.findDropdownMenu()
      const options =
        (await dropdownMenu.findAllOptions()) as QueriesHelpersEventsType[]

      expect(options.length).to.equal(1)
      expect(
        await options[0].find('svg[name="IconSearch"]', { expectEmpty: true })
      ).to.not.exist()
    })

    it('should render avatar', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderUser={getUser({
              userWithAvatar: true
            })}
            renderMenuItems={undefined}
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const menuTriggerButton = await component.findDropdownMenuTriggerButton()

      await menuTriggerButton.click()

      const dropdownMenu = await component.findDropdownMenu()
      const options =
        (await dropdownMenu.findAllOptions()) as QueriesHelpersEventsType[]

      expect(options.length).to.equal(1)
      expect(
        await options[0].find('[class$=-avatar][name="User Name"]')
      ).to.exist()
    })

    it('should render avatar + text for `variant="avatar"`', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderUser={getUser({
              userWithAvatar: true,
              userVariant: 'avatar'
            })}
            renderMenuItems={undefined}
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const menuTriggerButton = await component.findDropdownMenuTriggerButton()

      await menuTriggerButton.click()

      const dropdownMenu = await component.findDropdownMenu()
      const options =
        (await dropdownMenu.findAllOptions()) as QueriesHelpersEventsType[]

      expect(options.length).to.equal(1)
      expect(options[0].getTextContent()).to.include('User Name')
      expect(
        await options[0].find('[class$=-avatar][name="User Name"]')
      ).to.exist()
    })
  })

  describe('navLabel prop', async () => {
    it('should set "aria-label" for the underlying `<nav>` element', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            navLabel="Navigation test label"
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()

      expect(component).to.have.tagName('nav')
      expect(component).to.have.attribute('aria-label', 'Navigation test label')
    })
  })

  describe('elementRef prop', async () => {
    it('should return the root nav element', async () => {
      const elementRef = stub()
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            elementRef={elementRef}
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()

      expect(elementRef).to.have.been.calledWith(component.getDOMNode())
    })
  })

  describe('dropdownMenuToggleButtonLabel prop', async () => {
    it('should set screen reader label for the trigger button', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            dropdownMenuToggleButtonLabel="Toggle me!"
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const menuTriggerItem = await component.findDropdownMenuTriggerItem()
      const screenReaderLabel = await menuTriggerItem.findScreenReaderLabel()

      expect(screenReaderLabel).to.have.text('Toggle me!')
    })

    it('should set as "aria-label" with alternative title', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            dropdownMenuToggleButtonLabel="Toggle me!"
            alternativeTitle="Page title"
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const menuTriggerButton = await component.findDropdownMenuTriggerButton()

      expect(menuTriggerButton).to.have.attribute('aria-label', 'Toggle me!')
      expect(menuTriggerButton.getTextContent()).to.equal('Page title')
    })
  })

  describe('dropdownMenuToggleButtonTooltip prop', async () => {
    it('should set screen reader label for the trigger button', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            dropdownMenuToggleButtonTooltip="Trigger Tooltip"
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const menuTriggerItem = await component.findDropdownMenuTriggerItem()
      const tooltip = await menuTriggerItem.findTooltip()
      const tooltipContent = await tooltip?.findContent()

      expect(tooltipContent).to.have.text('Trigger Tooltip')
    })
  })

  describe('dropdownMenuLabel prop', async () => {
    it('should set "aria-label" for the dropdown menu', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            dropdownMenuLabel="This is the menu"
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const menuTriggerButton = await component.findDropdownMenuTriggerButton()

      await menuTriggerButton.click()

      const dropdownMenu = await component.findDropdownMenu()

      expect(dropdownMenu).to.have.attribute('aria-label', 'This is the menu')
    })
  })

  describe('alternativeTitle prop', async () => {
    it('should render title instead of brand block', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            alternativeTitle="Alternative title test"
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const alternativeTitleContainer =
        await component.findAlternativeTitleContainer()
      const brandContainer = await component.findBrandContainer({
        expectEmpty: true
      })
      const brand = await component.findBrand({ expectEmpty: true })

      expect(alternativeTitleContainer).to.be.visible()
      expect(alternativeTitleContainer).to.have.text('Alternative title test')

      expect(await alternativeTitleContainer.find('svg')).to.have.attribute(
        'name',
        'IconArrowOpenDown'
      )

      expect(brandContainer).to.not.exist()
      expect(brand).to.not.exist()
    })

    it('should not display when there is no dropdown menu', async () => {
      const consoleWarning = stub(console, 'warn')
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderMenuItems={undefined}
            renderUser={undefined}
            alternativeTitle="Alternative title test"
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const alternativeTitleContainer =
        await component.findAlternativeTitleContainer({ expectEmpty: true })
      const brandContainer = await component.findBrandContainer({
        expectEmpty: true
      })
      const brand = await component.findBrand({ expectEmpty: true })

      expect(consoleWarning).to.have.been.calledWith(
        'Warning: There are no menu items or user menu to display in the <TopNavBar> dropdown menu! The menu trigger and the alternative title will not display.'
      )

      expect(alternativeTitleContainer).to.not.exist()
      expect(brandContainer).to.not.exist()
      expect(brand).to.not.exist()
    })

    it('should render chevron icon', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            alternativeTitle="Alternative title test"
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const menuTriggerButton = await component.findDropdownMenuTriggerButton()
      const alternativeTitleContainer =
        await component.findAlternativeTitleContainer()

      expect(await alternativeTitleContainer.find('svg')).to.have.attribute(
        'name',
        'IconArrowOpenDown'
      )
      expect(alternativeTitleContainer).to.have.text('Alternative title test')

      await menuTriggerButton.click()

      expect(await alternativeTitleContainer.find('svg')).to.have.attribute(
        'name',
        'IconArrowOpenUp'
      )
      expect(alternativeTitleContainer).to.have.text('Alternative title test')
    })

    it('should render hamburger icon, when no alternative title is set', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            alternativeTitle={undefined}
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const menuTriggerButton = await component.findDropdownMenuTriggerButton()
      const menuTriggerItem = await component.findDropdownMenuTriggerItem()
      const alternativeTitleContainer =
        await component.findAlternativeTitleContainer({ expectEmpty: true })

      expect(alternativeTitleContainer).to.not.exist()

      expect(await menuTriggerItem.findIcon()).to.have.attribute(
        'name',
        'IconHamburger'
      )

      await menuTriggerButton.click()

      expect(await menuTriggerItem.findIcon()).to.have.attribute(
        'name',
        'IconX'
      )
    })
  })

  describe('renderInPlaceDialogConfig prop', async () => {
    it('should render custom content instead of menu', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderInPlaceDialogConfig={{
              ...getInPlaceDialogConfig(),
              content: <div>InPlace Dialog content</div>
            }}
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const inPlaceDialog = await component.findInPlaceDialog()
      const inPlaceDialogCloseButton =
        await component.findInPlaceDialogCloseButton()
      const brandContainer = await component.findBrandContainer({
        expectEmpty: true
      })
      const actionItems = await component.findActionItems({
        expectEmpty: true
      })

      expect(inPlaceDialog).to.be.visible()
      expect(inPlaceDialogCloseButton).to.be.visible()
      expect(
        await inPlaceDialog.findWithText('InPlace Dialog content')
      ).to.be.visible()

      expect(brandContainer).to.not.exist()
      expect(actionItems).to.not.exist()
    })

    describe('config props', async () => {
      it('content props should accept function with onClose', async () => {
        const onClose = stub()
        await mount(
          <SmallViewportModeWrapper>
            <TopNavBarSmallViewportLayout
              {...defaultProps}
              renderInPlaceDialogConfig={{
                ...getInPlaceDialogConfig(),
                content: ({ closeInPlaceDialog }) => (
                  <button onClick={closeInPlaceDialog}>close dialog</button>
                ),
                onClose
              }}
            />
          </SmallViewportModeWrapper>
        )
        const component = await TopNavBarSmallViewportLayoutLocator.find()
        const inPlaceDialog = await component.findInPlaceDialog()
        const inPlaceDialogButton = await inPlaceDialog.find('button')

        await inPlaceDialogButton.click()

        expect(onClose).to.have.been.called()
      })

      it('onClose prop should be called on close button click', async () => {
        const onClose = stub()
        await mount(
          <SmallViewportModeWrapper>
            <TopNavBarSmallViewportLayout
              {...defaultProps}
              renderInPlaceDialogConfig={{
                ...getInPlaceDialogConfig(),
                onClose
              }}
            />
          </SmallViewportModeWrapper>
        )
        const component = await TopNavBarSmallViewportLayoutLocator.find()
        const inPlaceDialogCloseButton =
          await component.findInPlaceDialogCloseButton()

        await inPlaceDialogCloseButton.click()

        expect(onClose).to.have.been.called()
      })

      it('closeButtonLabel prop should put label on close button', async () => {
        await mount(
          <SmallViewportModeWrapper>
            <TopNavBarSmallViewportLayout
              {...defaultProps}
              renderInPlaceDialogConfig={{
                ...getInPlaceDialogConfig(),
                closeButtonLabel: 'This button closes the dialog'
              }}
            />
          </SmallViewportModeWrapper>
        )
        const component = await TopNavBarSmallViewportLayoutLocator.find()
        const inPlaceDialogCloseButton =
          await component.findInPlaceDialogCloseButton()

        expect(inPlaceDialogCloseButton).to.have.text(
          'This button closes the dialog'
        )
      })

      it('open prop should display dialog', async () => {
        await mount(
          <SmallViewportModeWrapper>
            <TopNavBarSmallViewportLayout
              {...defaultProps}
              renderInPlaceDialogConfig={{
                ...getInPlaceDialogConfig(),
                open: true
              }}
            />
          </SmallViewportModeWrapper>
        )
        const component = await TopNavBarSmallViewportLayoutLocator.find()
        const inPlaceDialog = await component.findInPlaceDialog()

        expect(inPlaceDialog).to.be.visible()
      })

      it('open="false" prop should not display dialog', async () => {
        await mount(
          <SmallViewportModeWrapper>
            <TopNavBarSmallViewportLayout
              {...defaultProps}
              renderInPlaceDialogConfig={{
                ...getInPlaceDialogConfig(),
                open: false
              }}
            />
          </SmallViewportModeWrapper>
        )
        const component = await TopNavBarSmallViewportLayoutLocator.find()
        const inPlaceDialog = await component.findInPlaceDialog({
          expectEmpty: true
        })

        expect(inPlaceDialog).to.not.exist()
      })

      it('returnFocusElement prop should help returning the focus', async () => {
        class ReturnFocusExample extends React.Component {
          state = {
            isDialogOpen: true
          }

          render() {
            return (
              <SmallViewportModeWrapper>
                <TopNavBarSmallViewportLayout
                  {...defaultProps}
                  renderInPlaceDialogConfig={{
                    closeButtonLabel: 'Close dialog',
                    content: 'example dialog',
                    open: this.state.isDialogOpen,
                    onClose: () => {
                      this.setState({ isDialogOpen: false })
                    },
                    returnFocusElement: () => document.getElementById('Search')
                  }}
                />
              </SmallViewportModeWrapper>
            )
          }
        }

        await mount(<ReturnFocusExample />)
        const component = await TopNavBarSmallViewportLayoutLocator.find()
        let inPlaceDialog = await component.findInPlaceDialog()
        const inPlaceDialogCloseButton =
          await component.findInPlaceDialogCloseButton()

        await inPlaceDialogCloseButton.click()

        inPlaceDialog = await component.findInPlaceDialog({ expectEmpty: true })

        expect(inPlaceDialog).to.not.exist()
        expect(document.activeElement).to.have.id('Search')
      })
    })
  })

  describe('trayMountNode prop', async () => {
    it('if not set, render tray in the default container div', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout {...defaultProps} />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const menuTriggerButton = await component.findDropdownMenuTriggerButton()

      await menuTriggerButton.click()

      const trayContainer = await component.find(
        '[id^=TopNavBarSmallViewportLayout-trayContainer]'
      )
      const tray = await component.findDropdownMenuTray()
      const navbar = await component.findNavBar()

      expect(trayContainer).to.exist()
      expect(trayContainer).to.contain(tray.getDOMNode())
      expect(trayContainer).to.not.contain(navbar.getDOMNode())
    })

    it('if set, render tray in that element', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            trayMountNode={() =>
              document.getElementById('trayMountNodeExample')
            }
          />
          <div id="trayMountNodeExample" />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const menuTriggerButton = await component.findDropdownMenuTriggerButton()

      await menuTriggerButton.click()

      const defaultTrayContainer = await component.find(
        '[id^=TopNavBarSmallViewportLayout-trayContainer]',
        { expectEmpty: true }
      )
      const trayContainer = await find('[id="trayMountNodeExample"]')
      const tray = await trayContainer.find(
        '[id^=TopNavBarSmallViewportLayout-tray]'
      )
      const navbar = await component.findNavBar()

      expect(defaultTrayContainer).to.not.exist()
      expect(trayContainer).to.exist()
      expect(trayContainer).to.contain(tray.getDOMNode())
      expect(trayContainer).to.not.contain(navbar.getDOMNode())
      expect(
        await trayContainer.find(
          '[class$=-topNavBarSmallViewportLayout__navbar]',
          { expectEmpty: true }
        )
      ).to.not.exist()
    })
  })

  describe('onDropdownMenuToggle prop', async () => {
    it('should be called on dropdown menu open and close', async () => {
      const onDropdownMenuToggle = stub()
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            onDropdownMenuToggle={onDropdownMenuToggle}
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const menuTriggerButton = await component.findDropdownMenuTriggerButton()

      await menuTriggerButton.click(undefined, { clickable: false })

      expect(onDropdownMenuToggle).to.have.been.calledWith(true)

      await menuTriggerButton.click(undefined, { clickable: false })

      expect(onDropdownMenuToggle).to.have.been.calledWith(false)
    })
  })

  describe('onDropdownMenuSelect prop', async () => {
    it('should be called when an item is selected in the dropdown menu', async () => {
      const onDropdownMenuSelect = stub()
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            onDropdownMenuSelect={onDropdownMenuSelect}
            renderMenuItems={getMenuItems({
              menuItemsCustomIdList: ['TestItem1'],
              menuItemsItemProps: { href: undefined }
            })}
          />
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarSmallViewportLayoutLocator.find()
      const menuTriggerButton = await component.findDropdownMenuTriggerButton()

      await menuTriggerButton.click()

      const dropdownMenu = await component.findDropdownMenu()
      const option = await dropdownMenu.find('#TestItem1')

      await option.click(undefined, { clickable: false })

      expect(onDropdownMenuSelect).to.have.been.called()
      expect(onDropdownMenuSelect).to.have.been.calledWithMatch(match.object, {
        value: undefined,
        isSelected: true,
        selectedOption: match.object,
        drilldown: match.object
      })
    })
  })

  describe('should be accessible', async () => {
    it('a11y', async () => {
      await mount(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout {...defaultProps} />
        </SmallViewportModeWrapper>
      )
      const topNavBarSmallViewportLayout =
        await TopNavBarSmallViewportLayoutLocator.find()
      expect(await topNavBarSmallViewportLayout.accessible()).to.be.true()
    })
  })
})
