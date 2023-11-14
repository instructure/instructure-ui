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
import '@testing-library/jest-dom'

import {
  getActionItems,
  getBrand,
  getMenuItems,
  getUser
  // SmallViewportModeWrapper
} from '../../../utils/exampleHelpers'

import { TopNavBarDesktopLayout } from '../index'
import type { TopNavBarDesktopLayoutProps } from '../props'

const defaultBlocks: Pick<
  TopNavBarDesktopLayoutProps,
  'renderBrand' | 'renderMenuItems' | 'renderActionItems' | 'renderUser'
> = {
  renderBrand: getBrand(),
  renderMenuItems: getMenuItems(),
  renderActionItems: getActionItems(),
  renderUser: getUser()
}

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

  describe('renderBrand', () => {
    it('should render brand container', () => {
      const { container } = render(
        <TopNavBarDesktopLayout {...defaultBlocks} renderBrand={getBrand()} />
      )
      const brandContainer = container.querySelector("[class$='topNavBarDesktopLayout__brandContainer']")
      const brandNameText = screen.getByText('Brand name')

      expect(brandContainer).toBeInTheDocument()
      expect(brandNameText).toBeVisible()
    })

    it('should not render brand container, when there is no "renderBrand" prop set', () => {
      const { container } = render(
        <TopNavBarDesktopLayout {...defaultBlocks} renderBrand={undefined} />
      )

      const brandContainer = container.querySelector("[class$='topNavBarDesktopLayout__brandContainer']")
      const desktopLayout = container.querySelector("[class$='-topNavBarDesktopLayout']")

      expect(brandContainer).not.toBeInTheDocument()
      expect(desktopLayout).not.toHaveTextContent('Brand name')
    })

    it('should not render brand container when "renderName" and "renderIcon" props are both missing', () => {
      const { container } = render(
        <TopNavBarDesktopLayout
          {...defaultBlocks}
          renderBrand={getBrand({
            brandProps: { renderName: undefined, renderIcon: undefined }
          })}
        />
      )

      const brandContainer = container.querySelector("[class$='topNavBarDesktopLayout__brandContainer']")
      const desktopLayout = container.querySelector("[class$='-topNavBarDesktopLayout']")

      expect(brandContainer).not.toBeInTheDocument()
      expect(desktopLayout).not.toHaveTextContent('Brand name')
    })

    describe('start padding', () => {
      it('should be 0 when brand block is rendered', () => {
        const { container } = render(
          <TopNavBarDesktopLayout {...defaultBlocks} renderBrand={getBrand()} />
        )

        // TODO
        // const component = await TopNavBarDesktopLayoutLocator.find()
        // expect(getComputedStyle(component.getDOMNode()).paddingInlineStart).to.equal('0px')

        const brandContainer = container.querySelector("[class$='topNavBarBrand__container']")
        const brandContainerStyle = getComputedStyle(brandContainer!)

        expect(brandContainerStyle.paddingLeft).toBe('0px')
      })

      it('should be visible when brand block is not rendered', () => {
        const { container } = render(
          <TopNavBarDesktopLayout {...defaultBlocks} renderBrand={undefined} />
        )

        const brandContainer = container.querySelector("[class$='topNavBarBrand__container']")
        const desktopLayout = container.querySelector("[class$='topNavBarDesktopLayout']")
        
        // TODO
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
      const all = container.querySelector("[class$='-topNavBarDesktopLayout']")
      
      expect(all).toMatchSnapshot()
      const menuItemsContainer = container.querySelector("[class$='topNavBarDesktopLayout__menuItemsContainer']")
      const menuItem = container.querySelector("[class$='topNavBarItem__content']")

      expect(menuItemsContainer).toBeInTheDocument()
      expect(menuItem).toBeVisible()
    })

    it('should still render menu item container, when there is no "renderMenuItems" prop set', () => {
      const { container } = render(
        <TopNavBarDesktopLayout
          {...defaultBlocks}
          renderMenuItems={undefined}
        />
      )
      screen.debug()
      const menuItemsContainer = container.querySelector("[class$='topNavBarDesktopLayout__menuItemsContainer']")
      const menuItem = container.querySelector("[class$='topNavBarItem__content']")

      const all = container.querySelector("[class$='-topNavBarDesktopLayout']")
      
      expect(all).toMatchSnapshot()
      expect(menuItemsContainer).toBeInTheDocument()
      expect(menuItem).not.toBeInTheDocument()
    })

    // it('should still render menu item container, when there are 0 menu items', async () => {
    //   await mount(
    //     <TopNavBarDesktopLayout
    //       {...defaultBlocks}
    //       renderMenuItems={getMenuItems({ menuItemsCount: 0 })}
    //     />
    //   )
    //   const component = await TopNavBarDesktopLayoutLocator.find()
    //   const menuItemsContainer = await component.findMenuItemsContainer()
    //   const menuItems = await component.findMenuItems({ expectEmpty: true })

    //   expect(menuItemsContainer).to.be.visible()
    //   expect(menuItems).to.not.exist()
    // })
  })

  // describe('renderActionItems', async () => {
  //   it('should render action item container', async () => {
  //     await mount(
  //       <TopNavBarDesktopLayout
  //         {...defaultBlocks}
  //         renderActionItems={getActionItems()}
  //       />
  //     )
  //     const component = await TopNavBarDesktopLayoutLocator.find()
  //     const actionItemsContainer = await component.findActionItemsContainer()
  //     const actionItems = await component.findActionItems()

  //     expect(actionItemsContainer).to.be.visible()
  //     expect(actionItems).to.be.visible()
  //   })

  //   it('should not render action item container, when there is no "renderActionItems" prop set', async () => {
  //     await mount(
  //       <TopNavBarDesktopLayout
  //         {...defaultBlocks}
  //         renderActionItems={undefined}
  //       />
  //     )
  //     const component = await TopNavBarDesktopLayoutLocator.find()
  //     const actionItemsContainer = await component.findActionItemsContainer({
  //       expectEmpty: true
  //     })
  //     const actionItems = await component.findActionItems({ expectEmpty: true })

  //     expect(actionItemsContainer).to.not.exist()
  //     expect(actionItems).to.not.exist()
  //   })

  //   it('should not render action item container, when there are 0 action items', async () => {
  //     await mount(
  //       <TopNavBarDesktopLayout
  //         {...defaultBlocks}
  //         renderActionItems={getActionItems({ actionItemsCount: 0 })}
  //       />
  //     )
  //     const component = await TopNavBarDesktopLayoutLocator.find()
  //     const actionItemsContainer = await component.findActionItemsContainer({
  //       expectEmpty: true
  //     })
  //     const actionItems = await component.findActionItems({ expectEmpty: true })

  //     expect(actionItemsContainer).to.not.exist()
  //     expect(actionItems).to.not.exist()
  //   })
  // })

  // describe('renderUser', async () => {
  //   it('should render user container', async () => {
  //     await mount(
  //       <TopNavBarDesktopLayout {...defaultBlocks} renderUser={getUser()} />
  //     )
  //     const component = await TopNavBarDesktopLayoutLocator.find()
  //     const userContainer = await component.findUserContainer()
  //     const user = await component.findUser()

  //     expect(userContainer).to.be.visible()
  //     expect(user).to.be.visible()
  //   })

  //   it('should not render user container, when there is no "renderUser" prop set', async () => {
  //     await mount(
  //       <TopNavBarDesktopLayout {...defaultBlocks} renderUser={undefined} />
  //     )
  //     const component = await TopNavBarDesktopLayoutLocator.find()
  //     const userContainer = await component.findUserContainer({
  //       expectEmpty: true
  //     })
  //     const user = await component.findUser({ expectEmpty: true })

  //     expect(userContainer).to.not.exist()
  //     expect(user).to.not.exist()
  //   })
  // })

  // describe('navLabel prop', async () => {
  //   it('should set "aria-label" for the underlying `<nav>` element', async () => {
  //     await mount(
  //       <TopNavBarDesktopLayout
  //         {...defaultBlocks}
  //         navLabel="Navigation test label"
  //       />
  //     )
  //     const component = await TopNavBarDesktopLayoutLocator.find()

  //     expect(component).to.have.tagName('nav')
  //     expect(component).to.have.attribute('aria-label', 'Navigation test label')
  //   })
  // })

  // describe('elementRef prop', async () => {
  //   it('should return the root nav element', async () => {
  //     const elementRef = stub()
  //     await mount(
  //       <TopNavBarDesktopLayout {...defaultBlocks} elementRef={elementRef} />
  //     )
  //     const component = await TopNavBarDesktopLayoutLocator.find()

  //     expect(elementRef).to.have.been.calledWith(component.getDOMNode())
  //   })
  // })

  // describe('hideActionsUserSeparator prop', async () => {
  //   describe('in default mode', async () => {
  //     it('should hide separator between actions and user', async () => {
  //       await mount(
  //         <TopNavBarDesktopLayout
  //           {...defaultBlocks}
  //           hideActionsUserSeparator={true}
  //         />
  //       )
  //       const component = await TopNavBarDesktopLayoutLocator.find()
  //       const actionsUserSeparator =
  //         await component.getActionsUserSeparatorBackground()

  //       expect(actionsUserSeparator).to.equal('rgba(0, 0, 0, 0)')
  //     })

  //     it('should show separator between actions and user, when false', async () => {
  //       await mount(
  //         <TopNavBarDesktopLayout
  //           {...defaultBlocks}
  //           hideActionsUserSeparator={false}
  //         />
  //       )
  //       const component = await TopNavBarDesktopLayoutLocator.find()
  //       const actionsUserSeparator =
  //         await component.getActionsUserSeparatorBackground()

  //       expect(actionsUserSeparator).to.equal('rgb(199, 205, 209)')
  //     })
  //   })

  //   describe('in inverse mode', async () => {
  //     it('should hide separator between actions and user', async () => {
  //       await mount(
  //         <SmallViewportModeWrapper layout="desktop" inverseColor>
  //           <TopNavBarDesktopLayout
  //             {...defaultBlocks}
  //             hideActionsUserSeparator={true}
  //           />
  //         </SmallViewportModeWrapper>
  //       )
  //       const component = await TopNavBarDesktopLayoutLocator.find()
  //       const actionsUserSeparator =
  //         await component.getActionsUserSeparatorBackground()

  //       expect(actionsUserSeparator).to.equal('rgba(0, 0, 0, 0)')
  //     })

  //     it('should show separator between actions and user, when false', async () => {
  //       await mount(
  //         <SmallViewportModeWrapper layout="desktop" inverseColor>
  //           <TopNavBarDesktopLayout
  //             {...defaultBlocks}
  //             hideActionsUserSeparator={false}
  //           />
  //         </SmallViewportModeWrapper>
  //       )
  //       const component = await TopNavBarDesktopLayoutLocator.find()
  //       const actionsUserSeparator =
  //         await component.getActionsUserSeparatorBackground()

  //       expect(actionsUserSeparator).to.equal('rgb(199, 205, 209)')
  //     })
  //   })

  //   describe('should not display when:', async () => {
  //     it('renderActionItems is missing', async () => {
  //       await mount(
  //         <TopNavBarDesktopLayout
  //           {...defaultBlocks}
  //           hideActionsUserSeparator={undefined}
  //           renderActionItems={undefined}
  //         />
  //       )
  //       const component = await TopNavBarDesktopLayoutLocator.find()
  //       const actionsUserSeparator =
  //         await component.getActionsUserSeparatorBackground()
  //       const actionItemsContainer = await component.findActionItemsContainer({
  //         expectEmpty: true
  //       })
  //       const userContainer = await component.findUserContainer()

  //       expect(actionsUserSeparator).to.equal('rgba(0, 0, 0, 0)')
  //       expect(actionItemsContainer).to.not.exist()
  //       expect(userContainer).to.be.visible()
  //     })

  //     it('renderUser is missing', async () => {
  //       await mount(
  //         <TopNavBarDesktopLayout
  //           {...defaultBlocks}
  //           hideActionsUserSeparator={undefined}
  //           renderUser={undefined}
  //         />
  //       )
  //       const component = await TopNavBarDesktopLayoutLocator.find()
  //       const actionsUserSeparator =
  //         await component.getActionsUserSeparatorBackground()
  //       const actionItemsContainer = await component.findActionItemsContainer()
  //       const userContainer = await component.findUserContainer({
  //         expectEmpty: true
  //       })

  //       expect(actionsUserSeparator).to.equal('rgba(0, 0, 0, 0)')
  //       expect(actionItemsContainer).to.be.visible()
  //       expect(userContainer).to.not.exist()
  //     })

  //     it('renderActionItems and renderUser is missing', async () => {
  //       await mount(
  //         <TopNavBarDesktopLayout
  //           {...defaultBlocks}
  //           hideActionsUserSeparator={undefined}
  //           renderActionItems={undefined}
  //           renderUser={undefined}
  //         />
  //       )
  //       const component = await TopNavBarDesktopLayoutLocator.find()
  //       const actionsUserSeparator =
  //         await component.getActionsUserSeparatorBackground()
  //       const actionItemsContainer = await component.findActionItemsContainer({
  //         expectEmpty: true
  //       })
  //       const userContainer = await component.findUserContainer({
  //         expectEmpty: true
  //       })

  //       expect(actionsUserSeparator).to.equal('rgba(0, 0, 0, 0)')
  //       expect(actionItemsContainer).to.not.exist()
  //       expect(userContainer).to.not.exist()
  //     })
  //   })
  // })

  // describe('should be accessible', async () => {
  //   it('a11y', async () => {
  //     await mount(<TopNavBarDesktopLayout {...defaultBlocks} />)
  //     const topNavBarDesktopLayout = await TopNavBarDesktopLayoutLocator.find()
  //     expect(await topNavBarDesktopLayout.accessible()).to.be.true()
  //   })
  // })

  afterAll(() => {
    global.ResizeObserver = originalResizeObserver
  })
})
