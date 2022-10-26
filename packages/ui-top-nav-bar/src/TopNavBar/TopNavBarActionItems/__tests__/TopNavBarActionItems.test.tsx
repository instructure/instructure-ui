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
  generateA11yTests,
  stub
} from '@instructure/ui-test-utils'

import {
  avatarExample,
  getActionItems,
  SmallViewportModeWrapper
} from '../../utils/exampleHelpers'

import { TopNavBarActionItems } from '../index'
import { TopNavBarActionItemsLocator } from '../TopNavBarActionItemsLocator'
import TopNavBarActionItemsExamples from '../__examples__/TopNavBarActionItems.examples'

describe('<TopNavBarActionItems />', async () => {
  it('should render', async () => {
    await mount(getActionItems({ actionItemsCount: 6 }))
    const component = await TopNavBarActionItemsLocator.find()

    expect(component).to.exist()
  })

  it('should not render when 0 children', async () => {
    await mount(getActionItems({ actionItemsCount: 0 }))
    const component = await TopNavBarActionItemsLocator.find({
      expectEmpty: true
    })

    expect(component).to.not.exist()
  })

  describe('elementRef prop should return a ref to the root element', async () => {
    it('in desktop mode', async () => {
      const elementRef = stub()
      await mount(
        getActionItems({
          actionItemsCount: 6,
          actionItemsProps: { elementRef }
        })
      )
      const component = await TopNavBarActionItemsLocator.find()

      expect(elementRef).to.have.been.calledWith(component.getDOMNode())
      expect(elementRef.args[0][0]).to.have.tagName('ul')
    })

    it('in smallViewport mode', async () => {
      const elementRef = stub()
      await mount(
        <SmallViewportModeWrapper>
          {getActionItems({
            actionItemsCount: 6,
            actionItemsProps: { elementRef }
          })}
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarActionItemsLocator.find()

      expect(elementRef).to.have.been.calledWith(component.getDOMNode())
      expect(elementRef.args[0][0]).to.have.tagName('ul')
    })
  })

  describe('listLabel prop should add aria-label', async () => {
    it('in desktop mode', async () => {
      await mount(
        getActionItems({
          actionItemsProps: {
            listLabel: 'Test label'
          }
        })
      )
      const component = await TopNavBarActionItemsLocator.find()

      expect(component.getAttribute('aria-label')).to.equal('Test label')
    })

    it('in smallViewport mode', async () => {
      await mount(
        <SmallViewportModeWrapper>
          {getActionItems({
            actionItemsProps: {
              listLabel: 'Test label'
            }
          })}
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarActionItemsLocator.find()

      expect(component.getAttribute('aria-label')).to.equal('Test label')
    })
  })

  describe('truncated list', async () => {
    describe('in desktop mode', async () => {
      it('should not truncate the list', async () => {
        await mount(getActionItems({ actionItemsCount: 6 }))
        const component = await TopNavBarActionItemsLocator.find()
        const truncatedList = await component.findTruncateList({
          expectEmpty: true
        })

        expect(truncatedList).to.not.exist()
      })

      it('should display all items', async () => {
        await mount(getActionItems({ actionItemsCount: 6 }))
        const component = await TopNavBarActionItemsLocator.find()
        const items = await component.findAllActionItems()

        expect(items.length).to.equal(6)
      })
    })

    describe('in smallViewport mode', async () => {
      it('should render as TruncateList', async () => {
        await mount(
          <SmallViewportModeWrapper>
            {getActionItems({ actionItemsCount: 6 })}
          </SmallViewportModeWrapper>
        )
        const component = await TopNavBarActionItemsLocator.find()
        const truncatedList = await component.findTruncateList()

        expect(truncatedList).to.exist()
      })

      it('should truncate the list correctly', async () => {
        await mount(
          <SmallViewportModeWrapper inverseColor>
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
        const component = await TopNavBarActionItemsLocator.find()
        const truncatedList = await component.findTruncateList()
        const listItems = await truncatedList.findAllListItems()
        const hiddenMenuTrigger = await truncatedList.findMenuTriggerItem()
        const triggerItem = await component.findTruncateListTriggerItem()

        expect(listItems.length).to.equal(3) // 2 + trigger
        expect(listItems[2].getDOMNode()).to.equal(
          hiddenMenuTrigger.getDOMNode()
        )
        expect(hiddenMenuTrigger.getTextContent()).to.equal('4 more actions')
        expect(hiddenMenuTrigger).to.contain(triggerItem?.getDOMNode())
      })

      it('should truncate the end of the list', async () => {
        await mount(
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
        const component = await TopNavBarActionItemsLocator.find()
        const items = await component.findAllActionItems()
        const firstButton = await items[0].findButton()

        expect(firstButton).to.have.id('Search')
      })

      it('should be able to display tooltip on the menu trigger', async () => {
        await mount(
          <SmallViewportModeWrapper>
            <div style={{ width: '400px' }}>
              {getActionItems({
                actionItemsCount: 6,
                actionItemsProps: {
                  renderHiddenItemsMenuTriggerLabel: (hiddenChildrenCount) =>
                    `${hiddenChildrenCount} more actions`,
                  renderHiddenItemsMenuTriggerTooltip: 'Action tooltip'
                }
              })}
            </div>
          </SmallViewportModeWrapper>
        )
        const component = await TopNavBarActionItemsLocator.find()
        const triggerItem = await component.findTruncateListTriggerItem()
        const tooltip = await triggerItem?.findTooltip()
        const tooltipTrigger = await tooltip?.findTrigger()
        const tooltipContent = await tooltip?.findContent()

        expect(tooltipTrigger.getTextContent()).to.equal('4 more actions')
        expect(tooltipContent.getTextContent()).to.equal('Action tooltip')
      })
    })
  })

  describe('item types:', async () => {
    it('should not allow avatars', async () => {
      const consoleWarning = stub(console, 'warn')
      await mount(
        getActionItems({
          actionItemsCount: 1,
          actionItemsItemProps: {
            renderAvatar: avatarExample
          }
        })
      )

      expect(consoleWarning).to.have.been.calledWith(
        'Warning: Items in <TopNavBar.ActionItems> are not allowed to have avatars, please remove it from item with the id "Search".'
      )
    })

    it('should render items without icons in smallViewport mode', async () => {
      const consoleError = stub(console, 'error')
      await mount(
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
      const component = await TopNavBarActionItemsLocator.find()
      const items = await component.findAllActionItems()

      expect(items.length).to.equal(5)
      expect(consoleError).to.have.been.calledWith(
        'Warning: Items in <TopNavBar.ActionItems> are required to have the `renderIcon` prop, because only the icons are displayed due to the lack of space. Please add an icon to the item with the id "Search".'
      )
    })

    it('should be converted to icon variant in smallViewport mode', async () => {
      await mount(
        <SmallViewportModeWrapper>
          {getActionItems({
            actionItemsCount: 1,
            actionItemsItemProps: { variant: 'button' }
          })}
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarActionItemsLocator.find()
      const items = await component.findAllActionItems()

      for (const item of items) {
        const screenReaderLabel = await item.findScreenReaderLabel()
        const icon = await item.findIcon()
        expect(screenReaderLabel).to.have.text('Search')
        expect(icon).to.be.visible()
      }
    })
  })

  describe('should be accessible', async () => {
    generateA11yTests(TopNavBarActionItems, TopNavBarActionItemsExamples)

    it('a11y', async () => {
      await mount(getActionItems({ actionItemsCount: 6 }))
      const topNavBarActionItems = await TopNavBarActionItemsLocator.find()
      expect(await topNavBarActionItems.accessible()).to.be.true()
    })
  })
})
