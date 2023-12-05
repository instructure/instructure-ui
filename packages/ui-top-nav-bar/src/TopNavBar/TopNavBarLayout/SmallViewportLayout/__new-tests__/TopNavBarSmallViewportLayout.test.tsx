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
  render,
  screen,
  fireEvent,
  within,
  waitFor
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import {
  getActionItems,
  getBrand,
  getUser,
  getBreadcrumb,
  getMenuItems,
  getCustomPopoverConfig,
  getInPlaceDialogConfig,
  SmallViewportModeWrapper
} from '../../../utils/exampleHelpers'
import { TopNavBarItem } from '../../../TopNavBarItem'
import { TopNavBarUser } from '../../../TopNavBarUser'

import { TopNavBarSmallViewportLayout } from '../index'
import type { TopNavBarSmallViewportLayoutProps } from '../props'
import TopNavBarContext from '../../../TopNavBarContext'
import { IconSearchLine } from '@instructure/ui-icons'
import { runAxeCheck } from '@instructure/ui-axe-check'

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

  describe('renderBrand', () => {
    it('should render brand container', () => {
      const { container } = render(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderBrand={getBrand()}
          />
        </SmallViewportModeWrapper>
      )
      const brandContainer = container.querySelector(
        "[class$='-topNavBarSmallViewportLayout__brandContainer']"
      )
      const brandNameText = screen.getByText('Brand name')

      expect(brandContainer).toBeInTheDocument()
      expect(brandNameText).toBeVisible()
    })

    it('should not render brand container, when there is no "renderBrand" prop set', () => {
      const { container } = render(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderBrand={undefined}
          />
        </SmallViewportModeWrapper>
      )
      const brandContainer = container.querySelector(
        "[class$='-topNavBarSmallViewportLayout__brandContainer']"
      )
      const brandNameText = screen.queryByText('Brand name')

      expect(brandContainer).not.toBeInTheDocument()
      expect(brandNameText).not.toBeInTheDocument()
    })

    it('should not render brand container when "renderName" and "renderIcon" props are both missing', () => {
      const { container } = render(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderBrand={getBrand({
              brandProps: { renderName: undefined, renderIcon: undefined }
            })}
          />
        </SmallViewportModeWrapper>
      )
      const brandContainer = container.querySelector(
        "[class$='-topNavBarSmallViewportLayout__brandContainer']"
      )
      const brandNameText = screen.queryByText('Brand name')

      expect(brandContainer).not.toBeInTheDocument()
      expect(brandNameText).not.toBeInTheDocument()
    })

    it('should not render when "alternativeTitle" is set', () => {
      const { container } = render(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderBrand={getBrand()}
            alternativeTitle="Alternative title test"
          />
        </SmallViewportModeWrapper>
      )
      const brandContainer = container.querySelector(
        "[class$='-topNavBarSmallViewportLayout__brandContainer']"
      )
      const menuTrigger = container.querySelector(
        "[class*='-topNavBarSmallViewportLayout__menuTrigger']"
      )
      const brandNameText = screen.queryByText('Brand name')

      expect(brandContainer).not.toBeInTheDocument()
      expect(brandNameText).not.toBeInTheDocument()
      expect(menuTrigger).toBeInTheDocument()
      expect(menuTrigger).toHaveTextContent('Alternative title test')
    })
  })

  describe('renderActionItems', () => {
    it('should render action item container', () => {
      const { container } = render(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderActionItems={getActionItems()}
          />
        </SmallViewportModeWrapper>
      )
      const actionItems = container.querySelector(
        "[class$='-topNavBarActionItems']"
      )

      expect(actionItems).toBeInTheDocument()
      expect(container).toHaveTextContent('Info')
    })

    it('should not render action item container, when there is no "renderActionItems" prop set', () => {
      const { container } = render(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderActionItems={undefined}
          />
        </SmallViewportModeWrapper>
      )
      const actionItems = container.querySelector(
        "[class$='-topNavBarActionItems']"
      )

      expect(actionItems).not.toBeInTheDocument()
    })

    it('should not render action item container, when there are 0 action items', () => {
      const { container } = render(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderActionItems={getActionItems({ actionItemsCount: 0 })}
          />
        </SmallViewportModeWrapper>
      )
      const actionItems = container.querySelector(
        "[class$='-topNavBarActionItems']"
      )

      expect(actionItems).not.toBeInTheDocument()
    })
  })

  describe('renderMenuItems', () => {
    it('should render menu items in the dropdown menu', async () => {
      render(
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
      const menuTriggerButton = screen.getByRole('button')
      expect(menuTriggerButton).toBeInTheDocument()

      fireEvent.click(menuTriggerButton)

      const dropdownMenu = await screen.findByRole('menu')
      const options = await within(dropdownMenu).findAllByRole('link')

      expect(options.length).toEqual(4)

      options.forEach((option, idx) => {
        expect(option).toHaveAttribute('id', `TestItem${idx + 1}`)
        expect(dropdownMenu).toHaveTextContent(`TestItem${idx + 1}`)
      })
    })

    it('should not render menu items when there are none', async () => {
      render(
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
      const menuTriggerButton = screen.getByRole('button')
      expect(menuTriggerButton).toBeInTheDocument()

      fireEvent.click(menuTriggerButton)

      const dropdownMenu = await screen.findByRole('menu')
      const options = await within(dropdownMenu).findAllByRole('link')

      expect(options.length).toEqual(1)
      expect(options[0]).toHaveAttribute('id', `TestUser`)
    })

    it('should not render menu items when no "renderMenuItems" prop is set', async () => {
      render(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderUser={getUser({ userId: 'TestUser' })}
            renderMenuItems={undefined}
          />
        </SmallViewportModeWrapper>
      )
      const menuTriggerButton = screen.getByRole('button')
      expect(menuTriggerButton).toBeInTheDocument()

      fireEvent.click(menuTriggerButton)

      const dropdownMenu = await screen.findByRole('menu')
      const options = await within(dropdownMenu).findAllByRole('link')

      expect(options.length).toEqual(1)
      expect(options[0]).toHaveAttribute('id', `TestUser`)
    })

    it('should not render whole dropdown menu when neither "renderMenuItems" nor "renderUser" props are set', () => {
      const { container } = render(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderUser={undefined}
            renderMenuItems={undefined}
          />
        </SmallViewportModeWrapper>
      )
      const brandContainer = container.querySelector(
        "[class$='-topNavBarSmallViewportLayout__brandContainer']"
      )
      const menuTriggerButton = screen.queryByRole('button')

      expect(brandContainer).toBeInTheDocument()
      expect(menuTriggerButton).not.toBeInTheDocument()
    })

    it('should render submenus as subpages', async () => {
      const { container } = render(
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
      const menuTriggerButton = screen.getByRole('button')
      expect(menuTriggerButton).toBeInTheDocument()

      fireEvent.click(menuTriggerButton)

      const dropdownMenu = await screen.findByRole('menu')
      expect(dropdownMenu).toBeInTheDocument()

      const option = await within(dropdownMenu).findByRole('button')
      expect(option).toHaveAttribute('id', `TestItem1`)

      fireEvent.click(option)

      const subMenuOptions = container.querySelectorAll(
        '[class$="optionItem__container"]'
      )
      expect(subMenuOptions.length).toEqual(4)

      expect(subMenuOptions[0].id).toContain('Back')
      expect(subMenuOptions[1].id).toContain('linkExampleOption1')
      expect(subMenuOptions[2].id).toContain('linkExampleOption2')
      expect(subMenuOptions[3].id).toContain('linkExampleOption3')
    })

    describe('items with "customPopoverConfig" prop', () => {
      it('should render content of "customPopoverConfig" prop in the dropdown menu', async () => {
        render(
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
        const menuTriggerButton = screen.getByRole('button')
        expect(menuTriggerButton).toBeInTheDocument()

        fireEvent.click(menuTriggerButton)

        const dropdownMenu = await screen.findByRole('menu')
        expect(dropdownMenu).toBeInTheDocument()

        const option = await within(dropdownMenu).findByRole('button')
        expect(option).toHaveAttribute('id', `TestItem1`)

        fireEvent.click(option)

        const Menuitems = await within(dropdownMenu).findAllByRole('menuitem')
        expect(Menuitems.length).toEqual(2)

        expect(Menuitems[0].id).toContain('Back')
        expect(Menuitems[1].id).toContain('customPopoverOption')
        expect(Menuitems[1]).toHaveTextContent('dialog content')
      })

      it('should throw warning when there is no content', () => {
        const consoleWarningSpy = jest
          .spyOn(console, 'warn')
          .mockImplementation(() => {})
        render(
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
        const expectedErrorMessage = `Warning: Pass the content of the custom Popover as "customPopoverConfig.children" for the item with id: "TestItem1".`

        expect(consoleWarningSpy).toHaveBeenCalledWith(
          expect.stringContaining(expectedErrorMessage),
          expect.any(String)
        )

        consoleWarningSpy.mockRestore()
      })

      it('should throw warning when there submenu passed too', () => {
        const consoleWarningSpy = jest
          .spyOn(console, 'warn')
          .mockImplementation(() => {})
        render(
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
        const expectedErrorMessage = `Warning: TopNavBar.Items are not allowed to have both the "renderSubmenu" and "customPopoverConfig" props. For submenus, pass a Drilldown component via the "renderSubmenu" prop, and only use "customPopoverConfig" for custom features. Item with id: "TestItem1" will ignore the "customPopoverConfig" prop.`

        expect(consoleWarningSpy).toHaveBeenCalledWith(
          expect.stringContaining(expectedErrorMessage),
          expect.any(String)
        )

        consoleWarningSpy.mockRestore()
      })
    })

    it('should not render icons', async () => {
      render(
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
      const menuTriggerButton = screen.getByRole('button')
      expect(menuTriggerButton).toBeInTheDocument()

      fireEvent.click(menuTriggerButton)

      const dropdownMenu = await screen.findByRole('menu')
      const options = await within(dropdownMenu).findAllByRole('link')
      const icons = dropdownMenu.querySelectorAll('svg')

      expect(options.length).toEqual(4)
      expect(icons.length).toEqual(0)
    })

    it('should pass onClick`', async () => {
      const onClick = jest.fn()
      render(
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
      const menuTriggerButton = screen.getByRole('button')
      expect(menuTriggerButton).toBeInTheDocument()

      fireEvent.click(menuTriggerButton)

      const dropdownMenu = await screen.findByRole('menu')
      const options = await within(dropdownMenu).findAllByRole('menuitem')
      const firstOption = options[0]

      expect(options.length).toEqual(4)

      fireEvent.click(firstOption)

      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining({
          target: firstOption
        })
      )
    })

    it('should disable options when they have `status="disabled"`', async () => {
      const onClick = jest.fn()
      render(
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
      const menuTriggerButton = screen.getByRole('button')
      expect(menuTriggerButton).toBeInTheDocument()

      fireEvent.click(menuTriggerButton)

      const dropdownMenu = await screen.findByRole('menu')
      const options = await within(dropdownMenu).findAllByRole('menuitem')
      const firstOption = options[0]

      expect(options.length).toEqual(4)

      fireEvent.click(firstOption)

      expect(onClick).not.toHaveBeenCalled()
    })

    describe('should indicate active item', () => {
      it('should indicate active item', async () => {
        render(
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
        const menuTriggerButton = screen.getByRole('button')
        expect(menuTriggerButton).toBeInTheDocument()

        fireEvent.click(menuTriggerButton)

        const dropdownMenu = await screen.findByRole('menu')

        const options = await within(dropdownMenu).findAllByRole('link')
        expect(options.length).toEqual(4)

        for (const option of options) {
          if (option.id === 'TestItem2') {
            const activeOptionStyle = getComputedStyle(
              option.querySelector(
                '[class$="topNavBarSmallViewportLayout__dropdownMenuOptionActive"]'
              )!
            )

            // TODO convert to e2e
            // expect(activeOptionStyle.borderBottom).toBe('2px solid rgb(45, 59, 69)')
            expect(activeOptionStyle.borderBottom).toBe(
              '0.125rem solid currentColor'
            )
            expect(option).toHaveAttribute('aria-current', 'page')
          } else {
            const inactiveOptionStyle = getComputedStyle(
              option.querySelector(
                '[class$="topNavBarSmallViewportLayout__dropdownMenuOption"]'
              )!
            )

            // TODO convert to e2e
            // expect for toBe('0px none rgb(45, 59, 69)')
            expect(inactiveOptionStyle.borderBottom).toBe('')
            expect(option).not.toHaveAttribute('aria-current', 'page')
          }
        }
      })

      it('should throw warning if item is not "default" variant', () => {
        const consoleWarningSpy = jest
          .spyOn(console, 'warn')
          .mockImplementation(() => {})
        render(
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
        const expectedErrorMessage = `Warning: Only \`variant="default"\` items can be set to current/active, but the item with id "TestItem2" is "button" variant.`

        expect(consoleWarningSpy).toHaveBeenCalledWith(
          expect.stringContaining(expectedErrorMessage),
          expect.any(String)
        )

        consoleWarningSpy.mockRestore()
      })

      it('should throw warning if item is "disabled" status', () => {
        const consoleWarningSpy = jest
          .spyOn(console, 'warn')
          .mockImplementation(() => {})
        render(
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
        const expectedErrorMessage = `Warning: Disabled items can not be set to current/active, but the item with id "TestItem2" is disabled.`

        expect(consoleWarningSpy).toHaveBeenCalledWith(
          expect.stringContaining(expectedErrorMessage),
          expect.any(String)
        )

        consoleWarningSpy.mockRestore()
      })
    })
  })

  describe('renderUser', () => {
    it('should render user items in the dropdown menu', async () => {
      render(
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
      const menuTriggerButton = screen.getByRole('button')
      expect(menuTriggerButton).toBeInTheDocument()

      fireEvent.click(menuTriggerButton)

      const dropdownMenu = await screen.findByRole('menu')
      const options = await within(dropdownMenu).findAllByRole('link')

      expect(options.length).toEqual(5)
      expect(options[0].id).toBe('TestUser')
    })

    it('should not render user items when it is not set', async () => {
      render(
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
      const menuTriggerButton = screen.getByRole('button')
      expect(menuTriggerButton).toBeInTheDocument()

      fireEvent.click(menuTriggerButton)

      const dropdownMenu = await screen.findByRole('menu')
      const options = await within(dropdownMenu).findAllByRole('link')

      expect(options.length).toEqual(4)
      expect(options[0].id).not.toBe('TestUser')
    })

    it('should display separator when both menu items and user is visible', async () => {
      render(
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
      const menuTriggerButton = screen.getByRole('button')
      expect(menuTriggerButton).toBeInTheDocument()

      fireEvent.click(menuTriggerButton)

      const dropdownMenu = await screen.findByRole('menu')
      const options = await within(dropdownMenu).findAllByRole('link')
      const separator = dropdownMenu.querySelector("[class$='-separator']")

      expect(separator).toBeInTheDocument()

      expect(options.length).toEqual(5)
      expect(options[0].id).toContain('TestUser')
      expect(options[1].id).toContain('TestItem1')
      expect(options[2].id).toContain('TestItem2')
      expect(options[3].id).toContain('TestItem3')
      expect(options[4].id).toContain('TestItem4')
    })

    it('should not render icons', async () => {
      render(
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
      const menuTriggerButton = screen.getByRole('button')
      expect(menuTriggerButton).toBeInTheDocument()

      fireEvent.click(menuTriggerButton)

      const dropdownMenu = await screen.findByRole('menu')
      const options = dropdownMenu.querySelectorAll('li')
      const icons = dropdownMenu.querySelectorAll('svg')

      expect(options.length).toEqual(1)
      expect(icons.length).toEqual(0)
    })

    it('should render avatar', async () => {
      render(
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
      const menuTriggerButton = screen.getByRole('button')
      expect(menuTriggerButton).toBeInTheDocument()

      fireEvent.click(menuTriggerButton)

      const dropdownMenu = await screen.findByRole('menu')
      const options = await within(dropdownMenu).findAllByRole('link')
      const avatar = dropdownMenu.querySelector("[class$='inlineBlock-avatar']")

      expect(options.length).toEqual(1)
      expect(avatar).toHaveAttribute('name', 'User Name')
    })

    it('should render avatar + text for `variant="avatar"`', async () => {
      render(
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
      const menuTriggerButton = screen.getByRole('button')
      expect(menuTriggerButton).toBeInTheDocument()

      fireEvent.click(menuTriggerButton)

      const dropdownMenu = await screen.findByRole('menu')
      const options = await within(dropdownMenu).findAllByRole('link')
      const avatar = dropdownMenu.querySelector("[class$='inlineBlock-avatar']")

      expect(options.length).toEqual(1)
      expect(avatar).toHaveAttribute('name', 'User Name')
      expect(avatar).toHaveTextContent('UN')
    })
  })

  describe('navLabel prop', () => {
    it('should set "aria-label" for the underlying `<nav>` element', () => {
      render(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            navLabel="Navigation test label"
          />
        </SmallViewportModeWrapper>
      )
      const navElement = screen.getByRole('navigation')

      expect(navElement).toHaveAttribute('aria-label', 'Navigation test label')
      expect(navElement!.tagName).toBe('NAV')
    })
  })

  describe('elementRef prop', () => {
    it('should return the root nav element', () => {
      const elementRef = jest.fn()
      const { container } = render(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            elementRef={elementRef}
          />
        </SmallViewportModeWrapper>
      )

      expect(elementRef).toHaveBeenCalledWith(container.firstChild)
    })
  })

  describe('dropdownMenuToggleButtonLabel prop', () => {
    it('should set screen reader label for the trigger button', () => {
      const { container } = render(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            dropdownMenuToggleButtonLabel="Toggle me!"
          />
        </SmallViewportModeWrapper>
      )
      const menuTriggerButton = screen.getByRole('button')
      const screenReaderContent = container.querySelector(
        "[class$='-screenReaderContent']"
      )

      expect(menuTriggerButton).toBeInTheDocument()
      expect(screenReaderContent).toHaveTextContent('Toggle me!')
    })

    it('should set as "aria-label" with alternative title', () => {
      render(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            dropdownMenuToggleButtonLabel="Toggle me!"
            alternativeTitle="Page title"
          />
        </SmallViewportModeWrapper>
      )
      const menuTriggerButton = screen.getByRole('button')

      expect(menuTriggerButton).toBeInTheDocument()
      expect(menuTriggerButton).toHaveAttribute('aria-label', 'Toggle me!')
      expect(menuTriggerButton).toHaveTextContent('Page title')
    })
  })

  describe('dropdownMenuToggleButtonTooltip prop', () => {
    it('should set screen reader label for the trigger button', () => {
      render(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            dropdownMenuToggleButtonTooltip="Trigger Tooltip"
          />
        </SmallViewportModeWrapper>
      )
      const menuTriggerButton = screen.getByRole('button')
      const screenReaderContent = menuTriggerButton.querySelector(
        "[class$='-screenReaderContent']"
      )

      // TODO convert to e2e
      // const tooltip = await menuTriggerItem.findTooltip()
      // const tooltipContent = await tooltip?.findContent()
      // expect(tooltipContent).to.have.text('Trigger Tooltip')

      expect(menuTriggerButton).toBeInTheDocument()
      expect(screenReaderContent).toHaveTextContent('Toggle Menu')
    })
  })

  describe('dropdownMenuLabel prop', () => {
    it('should set "aria-label" for the dropdown menu', async () => {
      render(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            dropdownMenuLabel="This is the menu"
          />
        </SmallViewportModeWrapper>
      )
      const menuTriggerButton = screen.getByRole('button')
      expect(menuTriggerButton).toBeInTheDocument()

      fireEvent.click(menuTriggerButton)

      const dropdownMenu = await screen.findByRole('menu')
      expect(dropdownMenu).toHaveAttribute('aria-label', 'This is the menu')
    })
  })

  describe('alternativeTitle prop', () => {
    it('should render title instead of brand block', () => {
      const { container } = render(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            alternativeTitle="Alternative title test"
          />
        </SmallViewportModeWrapper>
      )
      const brandContainer = container.querySelector(
        "[class$='-topNavBarSmallViewportLayout__brandContainer']"
      )
      const alternativeTitleContainer = container.querySelector(
        "[class$='alternativeTitleContainer']"
      )
      const titleContainerIcon = alternativeTitleContainer!.querySelector('svg')

      expect(alternativeTitleContainer).toBeInTheDocument()
      expect(alternativeTitleContainer).toHaveTextContent(
        'Alternative title test'
      )
      expect(titleContainerIcon).toHaveAttribute('name', 'IconArrowOpenDown')
      expect(brandContainer).not.toBeInTheDocument()
    })

    it('should not display when there is no dropdown menu', () => {
      const consoleWarningSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {})
      const { container } = render(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            renderMenuItems={undefined}
            renderUser={undefined}
            alternativeTitle="Alternative title test"
          />
        </SmallViewportModeWrapper>
      )
      const brandContainer = container.querySelector(
        "[class$='-topNavBarSmallViewportLayout__brandContainer']"
      )
      const alternativeTitleContainer = container.querySelector(
        "[class$='alternativeTitleContainer']"
      )
      const expectedErrorMessage =
        'Warning: There are no menu items or user menu to display in the <TopNavBar> dropdown menu! The menu trigger and the alternative title will not display.'

      expect(alternativeTitleContainer).not.toBeInTheDocument()
      expect(brandContainer).not.toBeInTheDocument()
      expect(consoleWarningSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedErrorMessage),
        expect.any(String)
      )

      consoleWarningSpy.mockRestore()
    })

    it('should render chevron icon', () => {
      const { container } = render(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            alternativeTitle="Alternative title test"
          />
        </SmallViewportModeWrapper>
      )
      const menuTriggerButton = screen.getByRole('button')
      const alternativeTitleContainer = container.querySelector(
        "[class$='alternativeTitleContainer']"
      )
      const titleContainerIconDown =
        alternativeTitleContainer!.querySelector('svg')

      expect(titleContainerIconDown).toHaveAttribute(
        'name',
        'IconArrowOpenDown'
      )
      expect(alternativeTitleContainer).toHaveTextContent(
        'Alternative title test'
      )

      fireEvent.click(menuTriggerButton)

      const titleContainerIconUp =
        alternativeTitleContainer!.querySelector('svg')

      expect(titleContainerIconUp).toHaveAttribute('name', 'IconArrowOpenUp')
      expect(alternativeTitleContainer).toHaveTextContent(
        'Alternative title test'
      )
    })

    it('should render hamburger icon, when no alternative title is set', () => {
      const { container } = render(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            alternativeTitle={undefined}
          />
        </SmallViewportModeWrapper>
      )
      const menuTriggerButton = screen.getByRole('button')
      const menuIconDown = menuTriggerButton.querySelector('svg')
      const alternativeTitleContainer = container.querySelector(
        "[class$='alternativeTitleContainer']"
      )

      expect(alternativeTitleContainer).not.toBeInTheDocument()
      expect(menuIconDown).toHaveAttribute('name', 'IconHamburger')

      fireEvent.click(menuTriggerButton)

      const titleContainerIconX = menuTriggerButton.querySelector('svg')
      expect(titleContainerIconX).toHaveAttribute('name', 'IconX')
    })
  })

  describe('renderInPlaceDialogConfig prop', () => {
    it('should render custom content instead of menu', () => {
      const { container } = render(
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
      const inPlaceDialogContainer = container.querySelector(
        "[class$='inPlaceDialogContainer']"
      )
      expect(inPlaceDialogContainer).toBeInTheDocument()
      expect(inPlaceDialogContainer).toHaveTextContent('InPlace Dialog content')

      const inPlaceDialogCloseButton = container.querySelector(
        '[id*="-inPlaceDialogCloseButton"]'
      )
      expect(inPlaceDialogCloseButton).toBeInTheDocument()

      const brandContainer = container.querySelector(
        "[class$='-topNavBarSmallViewportLayout__brandContainer']"
      )
      expect(brandContainer).not.toBeInTheDocument()

      const actionItems = container.querySelector(
        "[class$='-topNavBarActionItems']"
      )
      expect(actionItems).not.toBeInTheDocument()
    })

    describe('config props', () => {
      it('content props should accept function with onClose', () => {
        const onClose = jest.fn()
        const { container } = render(
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
        const inPlaceDialogContainer = container.querySelector(
          "[class$='inPlaceDialogContainer']"
        )
        const inPlaceDialogButton =
          inPlaceDialogContainer!.querySelector('button')!

        fireEvent.click(inPlaceDialogButton)

        expect(onClose).toHaveBeenCalled()
      })

      it('onClose prop should be called on close button click', () => {
        const onClose = jest.fn()
        const { container } = render(
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
        const inPlaceDialogCloseButton = container.querySelector(
          '[id*="-inPlaceDialogCloseButton"]'
        )

        fireEvent.click(inPlaceDialogCloseButton!)

        expect(onClose).toHaveBeenCalled()
      })

      it('closeButtonLabel prop should put label on close button', () => {
        const { container } = render(
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
        const inPlaceDialogCloseButton = container.querySelector(
          '[id*="-inPlaceDialogCloseButton"]'
        )

        expect(inPlaceDialogCloseButton).toHaveTextContent(
          'This button closes the dialog'
        )
      })

      it('open prop should display dialog', () => {
        const { container } = render(
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
        const inPlaceDialogContainer = container.querySelector(
          "[class$='inPlaceDialogContainer']"
        )

        expect(inPlaceDialogContainer).toBeInTheDocument()
      })

      it('open="false" prop should not display dialog', () => {
        const { container } = render(
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
        const inPlaceDialogContainer = container.querySelector(
          "[class$='inPlaceDialogContainer']"
        )

        expect(inPlaceDialogContainer).not.toBeInTheDocument()
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

        const { container } = render(<ReturnFocusExample />)
        const inPlaceDialogContainer = container.querySelector(
          "[class$='inPlaceDialogContainer']"
        )
        const inPlaceDialogCloseButton = container.querySelector(
          '[id*="-inPlaceDialogCloseButton"]'
        )

        expect(inPlaceDialogContainer).toBeInTheDocument()

        userEvent.click(inPlaceDialogCloseButton!)

        await waitFor(() => {
          const inPlaceDialogContainerAfterClick = container.querySelector(
            "[class$='inPlaceDialogContainer']"
          )

          expect(inPlaceDialogContainerAfterClick).not.toBeInTheDocument()
          expect(document.activeElement).toHaveAttribute('id', 'Search')
        })
      })
    })
  })

  describe('trayMountNode prop', () => {
    it('if not set, render tray in the default container div', () => {
      const { container } = render(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout {...defaultProps} />
        </SmallViewportModeWrapper>
      )
      const menuTriggerButton = screen.getByRole('button')

      fireEvent.click(menuTriggerButton)

      const trayContainer = container.querySelector('[id*="-trayContainer"]')
      const tray = trayContainer!.querySelector(
        '[id*="TopNavBarSmallViewportLayout-tray"]'
      )
      const navbar = trayContainer!.querySelector(
        "[class*='topNavBarSmallViewportLayout__navbar']"
      )

      expect(trayContainer).toBeInTheDocument()
      expect(tray).toBeInTheDocument()
      expect(navbar).not.toBeInTheDocument()
    })

    it('if set, render tray in that element', () => {
      const { container } = render(
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
      const menuTriggerButton = screen.getByRole('button')

      fireEvent.click(menuTriggerButton)

      const defaultTrayContainer = container.querySelector(
        '[id*="-trayContainer"]'
      )
      const trayContainer = container.querySelector(
        '[id="trayMountNodeExample"]'
      )
      const tray = trayContainer!.querySelector(
        '[id*="TopNavBarSmallViewportLayout-tray"]'
      )
      const navbar = trayContainer!.querySelector(
        "[class*='topNavBarSmallViewportLayout__navbar']"
      )

      expect(defaultTrayContainer).not.toBeInTheDocument()
      expect(trayContainer).toBeInTheDocument()
      expect(tray).toBeInTheDocument()
      expect(navbar).not.toBeInTheDocument()
    })
  })

  describe('onDropdownMenuToggle prop', () => {
    it('should be called on dropdown menu open and close', () => {
      const onDropdownMenuToggle = jest.fn()
      render(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout
            {...defaultProps}
            onDropdownMenuToggle={onDropdownMenuToggle}
          />
        </SmallViewportModeWrapper>
      )
      const menuTriggerButton = screen.getByRole('button')

      fireEvent.click(menuTriggerButton)

      expect(onDropdownMenuToggle).toHaveBeenCalledWith(true)

      fireEvent.click(menuTriggerButton)

      expect(onDropdownMenuToggle).toHaveBeenCalledWith(false)
    })
  })

  describe('onDropdownMenuSelect prop', () => {
    it('should be called when an item is selected in the dropdown menu', async () => {
      const onDropdownMenuSelect = jest.fn()
      render(
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
      const menuTriggerButton = screen.getByRole('button')

      fireEvent.click(menuTriggerButton)

      const dropdownMenu = await screen.findByRole('menu')
      const option = dropdownMenu.querySelector('[id="TestItem1"]')

      expect(option).toBeInTheDocument()

      fireEvent.click(option!)

      expect(onDropdownMenuSelect).toHaveBeenCalledWith(
        expect.anything(), // event object
        expect.objectContaining({
          value: undefined,
          isSelected: true,
          selectedOption: expect.any(Object),
          drilldown: expect.any(Object)
        })
      )
    })
  })

  describe('should be accessible', () => {
    it('a11y', async () => {
      const { container } = render(
        <SmallViewportModeWrapper>
          <TopNavBarSmallViewportLayout {...defaultProps} />
        </SmallViewportModeWrapper>
      )
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })
  })

  afterAll(() => {
    global.ResizeObserver = originalResizeObserver
  })
})
