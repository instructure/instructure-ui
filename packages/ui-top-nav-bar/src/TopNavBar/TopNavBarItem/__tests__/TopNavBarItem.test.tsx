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

import { getComputedStyle } from '@instructure/ui-dom-utils'
import {
  expect,
  mount,
  generateA11yTests,
  stub,
  match
} from '@instructure/ui-test-utils'
import type { QueriesHelpersEventsType } from '@instructure/ui-test-queries'

import { IconSearchLine } from '@instructure/ui-icons'
import { Drilldown } from '@instructure/ui-drilldown'

import {
  avatarExample,
  itemSubmenuExample,
  SmallViewportModeWrapper,
  getCustomPopoverConfig
} from '../../utils/exampleHelpers'

import { TopNavBarItem } from '../index'
import { TopNavBarItemLocator } from '../TopNavBarItemLocator'
import TopNavBarItemExamples from '../__examples__/TopNavBarItem.examples'
import type { TopNavBarItemProps } from '../props'

const variants: TopNavBarItemProps['variant'][] = [
  'default',
  'button',
  'icon',
  'avatar'
]

describe('<TopNavBarItem />', async () => {
  describe('variant prop', async () => {
    describe('should have "inverse" color focus ring', async () => {
      variants.forEach((variant) => {
        it(`with ${variant} variant`, async () => {
          await mount(
            <TopNavBarItem
              id="item"
              variant={variant}
              renderIcon={variant === 'icon' ? IconSearchLine : undefined}
              renderAvatar={variant === 'avatar' ? avatarExample : undefined}
            >
              Menu Item
            </TopNavBarItem>
          )
          const component = await TopNavBarItemLocator.find()
          const focusRingColor = await component.getFocusRingColor()

          expect(focusRingColor).to.equal('rgb(255, 255, 255)')
        })
      })
    })

    describe('should have "info" color focus ring in "inverseColor" mode', async () => {
      variants.forEach((variant) => {
        it(`with ${variant} variant`, async () => {
          await mount(
            <SmallViewportModeWrapper layout="desktop" inverseColor>
              <TopNavBarItem
                id="item"
                variant={variant}
                renderIcon={variant === 'icon' ? IconSearchLine : undefined}
                renderAvatar={variant === 'avatar' ? avatarExample : undefined}
              >
                Menu Item
              </TopNavBarItem>
            </SmallViewportModeWrapper>
          )
          const component = await TopNavBarItemLocator.find()
          const focusRingColor = await component.getFocusRingColor()

          expect(focusRingColor).to.equal('rgb(3, 116, 181)')
        })
      })
    })

    describe('with "default" variant', async () => {
      it('should render the text', async () => {
        await mount(
          <TopNavBarItem id="item" variant="default">
            Menu Item
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const content = await component.findContent()
        const screenReaderLabel = await component.findScreenReaderLabel({
          expectEmpty: true
        })

        expect(screenReaderLabel).to.not.exist()
        expect(content).to.be.visible()
        expect(content).to.have.text('Menu Item')
      })

      it('should have no background and border', async () => {
        await mount(
          <TopNavBarItem id="item" variant="default">
            Menu Item
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const background = await component.getButtonBackground()
        const borderWidth = await component.getButtonBorder()

        expect(background).to.equal('rgba(0, 0, 0, 0)')
        expect(borderWidth).to.equal('0px none rgb(255, 255, 255)')
      })
    })

    describe('with "button" variant', async () => {
      it('should render the text', async () => {
        await mount(
          <TopNavBarItem id="item" variant="button">
            Menu Item
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const content = await component.findContent()
        const screenReaderLabel = await component.findScreenReaderLabel({
          expectEmpty: true
        })

        expect(screenReaderLabel).to.not.exist()
        expect(content).to.be.visible()
        expect(content).to.have.text('Menu Item')
      })

      it('should have "secondary" color background and border', async () => {
        await mount(
          <TopNavBarItem id="item" variant="button">
            Menu Item
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const background = await component.getButtonBackground()
        const borderWidth = await component.getButtonBorder()

        expect(background).to.equal('rgb(255, 255, 255)')
        expect(borderWidth).to.equal('1px solid rgb(219, 219, 219)')
      })

      it('should have "primary" color background and border in inverse mode', async () => {
        await mount(
          <SmallViewportModeWrapper layout="desktop" inverseColor>
            <TopNavBarItem id="item" variant="button">
              Menu Item
            </TopNavBarItem>
          </SmallViewportModeWrapper>
        )
        const component = await TopNavBarItemLocator.find()
        const background = await component.getButtonBackground()
        const borderWidth = await component.getButtonBorder()

        expect(background).to.equal('rgb(3, 116, 181)')
        expect(borderWidth).to.equal('1px solid rgb(2, 84, 131)')
      })
    })

    describe('with "icon" variant', async () => {
      it('should throw error if no icon is provided', async () => {
        const consoleError = stub(console, 'error')
        await mount(
          <TopNavBarItem id="item" variant="icon">
            Menu Item
          </TopNavBarItem>
        )

        expect(consoleError).to.have.been.calledWith(
          'Warning: The "renderIcon" prop is required for the `variant="icon"` type <TopNavBar.Item> components, but the item with id "item" is missing it.'
        )
      })

      it('should render the icon', async () => {
        await mount(
          <TopNavBarItem id="item" variant="icon" renderIcon={IconSearchLine}>
            Menu Item
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const icon = await component.findIcon()

        expect(icon).to.be.visible()
        expect(icon).to.have.attribute('name', 'IconSearch')
      })

      it('should render the text in a screen reader label', async () => {
        await mount(
          <TopNavBarItem id="item" variant="icon" renderIcon={IconSearchLine}>
            Menu Item
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const content = await component.findContent({
          expectEmpty: true
        })
        const screenReaderLabel = await component.findScreenReaderLabel()

        expect(content).to.not.exist()
        expect(screenReaderLabel).to.have.text('Menu Item')
      })

      it('should have no background and border', async () => {
        await mount(
          <TopNavBarItem id="item" variant="icon" renderIcon={IconSearchLine}>
            Menu Item
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const background = await component.getButtonBackground()
        const borderWidth = await component.getButtonBorder()

        expect(background).to.equal('rgba(0, 0, 0, 0)')
        expect(borderWidth).to.equal('0px none rgb(255, 255, 255)')
      })

      it('should not allow the "renderAvatar" prop', async () => {
        const consoleWarning = stub(console, 'warn')
        await mount(
          <TopNavBarItem
            id="item"
            variant="icon"
            renderIcon={IconSearchLine}
            renderAvatar={avatarExample}
          >
            Menu Item
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const avatar = await component.findAvatar({ expectEmpty: true })
        const icon = await component.findIcon()

        expect(consoleWarning).to.have.been.calledWith(
          'Warning: <TopNavBar.Item> components with icons cannot display avatars, so the "renderAvatar" config prop will be ignored for item with id "item".'
        )
        expect(avatar).to.not.exist()
        expect(icon).to.be.visible()
      })

      it('should have at least 42px size button in small viewport mode', async () => {
        await mount(
          <SmallViewportModeWrapper>
            <TopNavBarItem id="item" variant="icon" renderIcon={IconSearchLine}>
              Menu Item
            </TopNavBarItem>
          </SmallViewportModeWrapper>
        )
        const component = await TopNavBarItemLocator.find()
        const button = await component.findButton()
        const buttonStyle = getComputedStyle(button.getDOMNode())

        expect(parseInt(buttonStyle.width, 10)).to.be.greaterThanOrEqual(42)
        expect(parseInt(buttonStyle.height, 10)).to.be.greaterThanOrEqual(42)
      })
    })

    describe('with "avatar" variant', async () => {
      it('should throw error if no avatar is provided', async () => {
        const consoleWarning = stub(console, 'warn')
        await mount(
          <TopNavBarItem id="item" variant="avatar">
            Menu Item
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const avatar = await component.findAvatar({ expectEmpty: true })

        expect(avatar).to.not.exist()
        expect(consoleWarning).to.have.been.calledWith(
          `Warning: The "renderAvatar" config is required for the 'variant="avatar"' type <TopNavBar.Item> components, but received none for the item with id "item".`
        )
      })

      it('should throw error if no "renderAvatar.avatarName" is provided', async () => {
        const consoleError = stub(console, 'error')
        await mount(
          // @ts-expect-error We are passing it incorrectly on purpose
          <TopNavBarItem id="item" variant="avatar" renderAvatar={{}}>
            Menu Item
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const avatar = await component.findAvatar({ expectEmpty: true })
        let hasCustomError = false

        // we have to test it like that since it throws the propType error
        // as well, and we don't know what index call is the custom one
        consoleError.getCalls().forEach((call) => {
          if (
            call.args[0] ===
            `Warning: The "avatarName" prop is required for for <TopNavBar.Item> components with avatar, but the item with id "item" is missing it.`
          ) {
            hasCustomError = true
          }
        })

        expect(avatar).to.not.exist()
        expect(hasCustomError).to.be.true()
      })

      it('should render the avatar', async () => {
        await mount(
          <TopNavBarItem
            id="item"
            variant="avatar"
            renderAvatar={avatarExample}
          >
            Menu Item
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const avatar = await component.findAvatar()

        expect(avatar).to.be.visible()
      })

      it('should have no background and border', async () => {
        await mount(
          <TopNavBarItem
            id="item"
            variant="avatar"
            renderAvatar={avatarExample}
          >
            Menu Item
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const background = await component.getButtonBackground()
        const borderWidth = await component.getButtonBorder()

        expect(background).to.equal('rgba(0, 0, 0, 0)')
        expect(borderWidth).to.equal('0px none rgb(255, 255, 255)')
      })

      it('should have either string type "children" or "avatarAlt"', async () => {
        const consoleWarning = stub(console, 'warn')
        await mount(
          <SmallViewportModeWrapper>
            <TopNavBarItem
              id="item"
              variant="avatar"
              renderAvatar={{ ...avatarExample, avatarAlt: undefined }}
            >
              <span>Text</span>
            </TopNavBarItem>
          </SmallViewportModeWrapper>
        )

        expect(consoleWarning).to.have.been.calledWith(
          'Warning: Please supply a label for the avatar with either the "renderAvatar.avatarAlt" or the "children" (as string) prop. It is needed for screen reader support, but missing on the item with the id: "item".'
        )
      })
    })
  })

  describe('status prop', async () => {
    describe('with "default" status', async () => {
      it('should have no underline', async () => {
        await mount(
          <TopNavBarItem id="item" status="default">
            Menu Item
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const activeIndicatorStyle = await component.getActiveIndicatorStyle()

        expect(activeIndicatorStyle?.backgroundColor).to.equal(
          'rgba(0, 0, 0, 0)'
        )
      })
    })

    describe('with "active" status', async () => {
      it('should be indicated with "inverse" color underline', async () => {
        await mount(
          <TopNavBarItem id="item" status="active">
            Menu Item
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const activeIndicatorStyle = await component.getActiveIndicatorStyle()

        expect(activeIndicatorStyle?.backgroundColor).to.equal(
          'rgb(255, 255, 255)'
        )
      })

      it('should be indicated with "text" color underline in "inverseColor" mode', async () => {
        await mount(
          <SmallViewportModeWrapper layout="desktop" inverseColor>
            <TopNavBarItem id="item" status="active">
              Menu Item
            </TopNavBarItem>
          </SmallViewportModeWrapper>
        )
        const component = await TopNavBarItemLocator.find()
        const activeIndicatorStyle = await component.getActiveIndicatorStyle()

        expect(activeIndicatorStyle?.backgroundColor).to.equal(
          'rgb(45, 59, 69)'
        )
      })

      variants.forEach((variant) => {
        const isDefaultVariant = variant === 'default'

        it(`should be${
          !isDefaultVariant ? ' not' : ''
        } allowed for "${variant}" variant items`, async () => {
          const consoleWarning = stub(console, 'warn')
          await mount(
            <TopNavBarItem
              id="item"
              variant={variant}
              status="active"
              renderIcon={variant === 'icon' ? IconSearchLine : undefined}
              renderAvatar={variant === 'avatar' ? avatarExample : undefined}
            >
              Menu Item
            </TopNavBarItem>
          )
          const component = await TopNavBarItemLocator.find()
          const activeIndicatorStyle = await component.getActiveIndicatorStyle()

          if (isDefaultVariant) {
            expect(consoleWarning).to.not.have.been.called()
            expect(activeIndicatorStyle?.backgroundColor).to.equal(
              'rgb(255, 255, 255)'
            )
          } else {
            expect(consoleWarning).to.have.been.calledWith(
              `Warning: Only \`variant="default"\` <TopNavBar.Item> components can be set to active, but item with id "item" has variant: "${variant}".`
            )
            expect(activeIndicatorStyle?.backgroundColor).to.equal(
              'rgba(0, 0, 0, 0)'
            )
          }
        })
      })

      it('should not be allowed with avatar + text items', async () => {
        const consoleWarning = stub(console, 'warn')
        await mount(
          <TopNavBarItem id="item" status="active" renderAvatar={avatarExample}>
            Menu Item
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const activeIndicatorStyle = await component.getActiveIndicatorStyle()

        expect(consoleWarning).to.have.been.calledWith(
          `Warning: <TopNavBar.Item> components with avatar cannot have "active" status, so the "active" status on the item with id "item" will be ignored.`
        )
        expect(activeIndicatorStyle?.backgroundColor).to.equal(
          'rgba(0, 0, 0, 0)'
        )
      })
    })

    describe('with "disabled" status', async () => {
      variants.forEach((variant) => {
        it(`should be set to disabled for "${variant}" variant items`, async () => {
          await mount(
            <TopNavBarItem
              id="item"
              variant={variant}
              status="disabled"
              renderIcon={variant === 'icon' ? IconSearchLine : undefined}
              renderAvatar={variant === 'avatar' ? avatarExample : undefined}
            >
              Menu Item
            </TopNavBarItem>
          )
          const component = await TopNavBarItemLocator.find()
          const button = await component.findButton()
          const opacity = await component.getButtonOpacity()

          expect(opacity).to.equal('0.5')
          expect(button).to.have.attribute('disabled')
          expect(button).to.have.attribute('aria-disabled', 'true')
        })
      })

      it('should disable submenus too', async () => {
        await mount(
          <TopNavBarItem
            id="item"
            status="disabled"
            renderSubmenu={itemSubmenuExample}
          >
            Menu Item
          </TopNavBarItem>
        )

        const component = await TopNavBarItemLocator.find()
        const button = await component.findButton()
        const submenu = await component.findSubmenu()
        const submenuTrigger = await submenu.findPopoverTrigger()

        expect(button).to.have.attribute('disabled')
        expect(button).to.have.attribute('aria-disabled', 'true')
        expect(submenuTrigger).to.have.attribute('disabled')
        expect(submenuTrigger).to.have.attribute('aria-disabled', 'true')

        await button.click()

        const submenuPopover = await submenu.findPopoverContent({
          expectEmpty: true
        })
        expect(submenuPopover).to.not.exist()
      })
    })
  })

  describe('renderSubmenu prop', async () => {
    it('should not accept non-Drilldown elements', async () => {
      const consoleError = stub(console, 'error')
      await mount(
        <TopNavBarItem id="item" renderSubmenu={<div>submenu</div>}>
          Menu Item
        </TopNavBarItem>
      )
      const component = await TopNavBarItemLocator.find()
      const submenu = await component.findSubmenu({ expectEmpty: true })

      expect(submenu).to.not.exist()
      // PropType error
      expect(consoleError).to.have.been.called()
    })

    it('should render submenu', async () => {
      await mount(
        <TopNavBarItem id="item" renderSubmenu={itemSubmenuExample}>
          Menu Item
        </TopNavBarItem>
      )
      const component = await TopNavBarItemLocator.find()
      const submenu = await component.findSubmenu()
      const button = await component.findButton()

      expect(button).to.have.attribute('aria-haspopup', 'menu')
      expect(button).to.have.attribute('aria-expanded', 'false')

      await button.click()

      const submenuPopover = await submenu.findPopoverContent()

      expect(submenuPopover).to.be.visible()
      expect(button).to.have.attribute('aria-haspopup', 'menu')
      expect(button).to.have.attribute('aria-expanded', 'true')

      const options = await submenuPopover.findAllOptions()

      expect(options.length).to.equal(3)
      options.forEach((option: QueriesHelpersEventsType) => {
        expect(option.getId()).to.include('linkExampleOption')
      })
    })

    it('should throw warning about controlled Drilldown', async () => {
      const consoleWarning = stub(console, 'warn')
      await mount(
        <TopNavBarItem
          id="item"
          renderSubmenu={
            <Drilldown rootPageId="root" show>
              <Drilldown.Page id="root">
                <Drilldown.Option id="linkExampleOption1" href="/#One">
                  Link One
                </Drilldown.Option>
              </Drilldown.Page>
            </Drilldown>
          }
        >
          Menu Item
        </TopNavBarItem>
      )

      expect(consoleWarning).to.have.been.calledWith(
        `Warning: TopNavBar.Item Drilldown submenus are controlled by the component. The "show" prop will be ignored on the submenu of the item with id: "item".`
      )
    })

    it('should throw warning when trigger is passed to Drilldown', async () => {
      const consoleWarning = stub(console, 'warn')
      await mount(
        <TopNavBarItem
          id="item"
          renderSubmenu={
            <Drilldown rootPageId="root" trigger={<div>trigger</div>}>
              <Drilldown.Page id="root">
                <Drilldown.Option id="linkExampleOption1" href="/#One">
                  Link One
                </Drilldown.Option>
              </Drilldown.Page>
            </Drilldown>
          }
        >
          Menu Item
        </TopNavBarItem>
      )

      expect(consoleWarning).to.have.been.calledWith(
        `Warning: TopNavBar.Item submenus have the item itself as their trigger. The "trigger" prop will be ignored on the Drilldown submenu of item with id: "item".`
      )
    })

    it('should open on ArrowDown', async () => {
      await mount(
        <TopNavBarItem id="item" renderSubmenu={itemSubmenuExample}>
          Menu Item
        </TopNavBarItem>
      )

      const component = await TopNavBarItemLocator.find()
      const button = await component.findButton()
      const submenu = await component.findSubmenu()

      let submenuPopover = await submenu.findPopoverContent({
        expectEmpty: true
      })
      expect(submenuPopover).to.not.exist()

      await button.keyDown('ArrowDown')

      submenuPopover = await submenu.findPopoverContent()
      expect(submenuPopover).to.be.visible()
    })
  })

  describe('customPopoverConfig prop', async () => {
    it('should render popover', async () => {
      await mount(
        <TopNavBarItem
          id="item"
          customPopoverConfig={getCustomPopoverConfig(false, {
            isShowingContent: undefined,
            on: 'click'
          })}
        >
          Menu Item
        </TopNavBarItem>
      )
      const component = await TopNavBarItemLocator.find()
      const customPopover = await component.findCustomPopover()
      const button = await component.findButton()

      expect(button).to.have.attribute('aria-haspopup', 'true')
      expect(button).to.have.attribute('aria-expanded', 'false')

      await button.click()

      expect(button).to.have.attribute('aria-haspopup', 'true')
      expect(button).to.have.attribute('aria-expanded', 'true')

      const popoverContent = await customPopover.findContent()
      expect(popoverContent).to.be.visible()
      expect(popoverContent.getTextContent()).to.equal('dialog content')
    })

    it('should throw error when passed to item with submenu', async () => {
      const consoleWarning = stub(console, 'warn')
      await mount(
        <TopNavBarItem
          id="item"
          renderSubmenu={itemSubmenuExample}
          customPopoverConfig={getCustomPopoverConfig()}
        >
          Menu Item
        </TopNavBarItem>
      )

      const component = await TopNavBarItemLocator.find()
      const submenu = await component.findSubmenu()
      const customPopover = await component.findCustomPopover()

      expect(submenu).to.exist()
      expect(customPopover).to.not.exist()
      expect(consoleWarning).to.have.been.calledWith(
        `Warning: TopNavBar.Items are not allowed to have both the "renderSubmenu" and "customPopoverConfig" props. For submenus, pass a Drilldown component via the "renderSubmenu" prop, and only use "customPopoverConfig" for custom features. Item with id: "item" will ignore the "customPopoverConfig" prop.`
      )
    })

    it('should throw warning when no content is passed', async () => {
      const consoleWarning = stub(console, 'warn')
      await mount(
        <TopNavBarItem
          id="item"
          customPopoverConfig={getCustomPopoverConfig(false, {
            children: null
          })}
        >
          Menu Item
        </TopNavBarItem>
      )

      const component = await TopNavBarItemLocator.find()
      const customPopover = await component.findCustomPopover({
        expectEmpty: true
      })

      expect(customPopover).to.not.exist()
      expect(consoleWarning).to.have.been.calledWith(
        `Warning: Pass the content of the custom Popover as "customPopoverConfig.children" for the item with id: "item".`
      )
    })

    it('should throw warning when renderTrigger is passed in the config', async () => {
      const consoleWarning = stub(console, 'warn')
      await mount(
        <TopNavBarItem
          id="item"
          customPopoverConfig={getCustomPopoverConfig(false, {
            // @ts-expect-error Intentionally wrong
            renderTrigger: <div>trigger</div>
          })}
        >
          Menu Item
        </TopNavBarItem>
      )

      expect(consoleWarning).to.have.been.calledWith(
        `Warning: TopNavBar.Item popovers have the item itself as their trigger. The "renderTrigger" prop will be ignored on the popover of item with id: "item".`
      )
    })

    describe('should not put aria-expanded on the popover trigger, just the button', async () => {
      it('when popover `shouldContainFocus="true"`', async () => {
        await mount(
          <TopNavBarItem
            id="item"
            customPopoverConfig={getCustomPopoverConfig(false, {
              shouldContainFocus: true,
              isShowingContent: undefined,
              on: 'click'
            })}
          >
            Menu Item
          </TopNavBarItem>
        )

        const component = await TopNavBarItemLocator.find()
        const button = await component.findButton()
        const customPopover = await component.findCustomPopover()
        const popoverTrigger = await customPopover.findTrigger()

        expect(button).to.have.attribute('aria-expanded', 'false')
        expect(popoverTrigger).to.not.have.attribute('aria-expanded')

        await button.click()

        const popoverContent = await customPopover.findContent()

        expect(popoverContent).to.be.visible()
        expect(button).to.have.attribute('aria-expanded', 'true')
        expect(popoverTrigger).to.not.have.attribute('aria-expanded')
      })

      it('when popover `shouldContainFocus="false"`', async () => {
        await mount(
          <TopNavBarItem
            id="item"
            customPopoverConfig={getCustomPopoverConfig(false, {
              shouldContainFocus: false,
              isShowingContent: undefined,
              on: 'click'
            })}
          >
            Menu Item
          </TopNavBarItem>
        )

        const component = await TopNavBarItemLocator.find()
        const button = await component.findButton()
        const customPopover = await component.findCustomPopover()
        const popoverTrigger = await customPopover.findTrigger()

        expect(button).to.have.attribute('aria-expanded', 'false')
        expect(popoverTrigger).to.not.have.attribute('aria-expanded')

        await button.click()

        const popoverContent = await customPopover.findContent()

        expect(popoverContent).to.be.visible()
        expect(button).to.have.attribute('aria-expanded', 'true')
        expect(popoverTrigger).to.not.have.attribute('aria-expanded')
      })
    })

    it('should open on ArrowDown', async () => {
      await mount(
        <TopNavBarItem
          id="item"
          customPopoverConfig={getCustomPopoverConfig(false, {
            isShowingContent: undefined,
            on: 'click'
          })}
        >
          Menu Item
        </TopNavBarItem>
      )

      const component = await TopNavBarItemLocator.find()
      const button = await component.findButton()
      const customPopover = await component.findCustomPopover()

      let popoverContent = await customPopover.findContent({
        expectEmpty: true
      })
      expect(popoverContent).to.not.exist()

      await button.keyDown('ArrowDown')

      popoverContent = await customPopover.findContent()
      expect(popoverContent).to.be.visible()
    })

    it('should should work controlled too', async () => {
      class ControlledExample extends React.Component {
        state = {
          isPopoverOpen: false
        }

        render() {
          return (
            <TopNavBarItem
              id="item"
              customPopoverConfig={getCustomPopoverConfig(false, {
                isShowingContent: this.state.isPopoverOpen,
                on: 'click',
                onShowContent: () => {
                  this.setState({ isPopoverOpen: true })
                },
                onHideContent: () => {
                  this.setState({ isPopoverOpen: false })
                }
              })}
            >
              Menu Item
            </TopNavBarItem>
          )
        }
      }

      await mount(<ControlledExample />)

      const component = await TopNavBarItemLocator.find()
      const button = await component.findButton()
      const customPopover = await component.findCustomPopover()

      let popoverContent = await customPopover.findContent({
        expectEmpty: true
      })
      expect(popoverContent).to.not.exist()

      await button.keyDown('ArrowDown')

      popoverContent = await customPopover.findContent()
      expect(popoverContent).to.be.visible()

      await button.click()

      popoverContent = await customPopover.findContent({
        expectEmpty: true
      })
      expect(popoverContent).to.not.exist()
    })
  })

  describe('showSubmenuChevron prop', async () => {
    it('should not show when no submenu or popover', async () => {
      await mount(<TopNavBarItem id="item">Menu Item</TopNavBarItem>)
      const component = await TopNavBarItemLocator.find()
      const chevron = await component.findSubmenuChevron({
        expectEmpty: true
      })

      expect(chevron).to.not.exist()
    })

    describe('when true (by default), should show chevron icon', async () => {
      it('next to items with submenu', async () => {
        await mount(
          <TopNavBarItem id="item" renderSubmenu={itemSubmenuExample}>
            Menu Item
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const button = await component.findButton()
        const chevronClosed = await component.findSubmenuChevron()

        expect(chevronClosed).to.be.visible()
        expect(chevronClosed.getAttribute('name')).to.equal('IconArrowOpenDown')

        await button.click()

        const chevronOpen = await component.findSubmenuChevron()

        expect(chevronOpen.getAttribute('name')).to.equal('IconArrowOpenUp')
      })

      it('next to items with custom popover', async () => {
        await mount(
          <TopNavBarItem
            id="item"
            customPopoverConfig={getCustomPopoverConfig(false, {
              isShowingContent: undefined,
              on: 'click'
            })}
          >
            Menu Item
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const button = await component.findButton()
        const chevronClosed = await component.findSubmenuChevron()

        expect(chevronClosed).to.be.visible()
        expect(chevronClosed.getAttribute('name')).to.equal('IconArrowOpenDown')

        await button.click()

        const chevronOpen = await component.findSubmenuChevron()

        expect(chevronOpen.getAttribute('name')).to.equal('IconArrowOpenUp')
      })

      describe('should show for all variants:', async () => {
        variants.forEach((variant) => {
          it(`with "${variant}" variant`, async () => {
            await mount(
              <TopNavBarItem
                id="item"
                variant={variant}
                renderSubmenu={itemSubmenuExample}
                renderIcon={variant === 'icon' ? IconSearchLine : undefined}
                renderAvatar={variant === 'avatar' ? avatarExample : undefined}
              >
                Menu Item
              </TopNavBarItem>
            )
            const component = await TopNavBarItemLocator.find()
            const button = await component.findButton()
            const chevronClosed = await component.findSubmenuChevron()

            expect(chevronClosed).to.be.visible()
            expect(chevronClosed.getAttribute('name')).to.equal(
              'IconArrowOpenDown'
            )

            await button.click()

            const chevronOpen = await component.findSubmenuChevron()

            expect(chevronOpen.getAttribute('name')).to.equal('IconArrowOpenUp')
          })
        })
      })
    })

    describe('when false, should not show chevron icon', async () => {
      it('next to items with submenu', async () => {
        await mount(
          <TopNavBarItem
            id="item"
            renderSubmenu={itemSubmenuExample}
            showSubmenuChevron={false}
          >
            Menu Item
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const button = await component.findButton()
        const chevronClosed = await component.findSubmenuChevron({
          expectEmpty: true
        })

        expect(chevronClosed).to.not.exist()

        await button.click()

        const chevronOpen = await component.findSubmenuChevron({
          expectEmpty: true
        })

        expect(chevronOpen).to.not.exist()
      })

      it('next to items with custom popover', async () => {
        await mount(
          <TopNavBarItem
            id="item"
            showSubmenuChevron={false}
            customPopoverConfig={getCustomPopoverConfig(false, {
              isShowingContent: undefined,
              on: 'click'
            })}
          >
            Menu Item
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const button = await component.findButton()
        const chevronClosed = await component.findSubmenuChevron({
          expectEmpty: true
        })

        expect(chevronClosed).to.not.exist()

        await button.click()

        const chevronOpen = await component.findSubmenuChevron({
          expectEmpty: true
        })

        expect(chevronOpen).to.not.exist()
      })

      describe('should show for all variants:', async () => {
        variants.forEach((variant) => {
          it(`with "${variant}" variant`, async () => {
            await mount(
              <TopNavBarItem
                id="item"
                variant={variant}
                showSubmenuChevron={false}
                renderSubmenu={itemSubmenuExample}
                renderIcon={variant === 'icon' ? IconSearchLine : undefined}
                renderAvatar={variant === 'avatar' ? avatarExample : undefined}
              >
                Menu Item
              </TopNavBarItem>
            )

            const component = await TopNavBarItemLocator.find()
            const button = await component.findButton()
            const chevronClosed = await component.findSubmenuChevron({
              expectEmpty: true
            })

            expect(chevronClosed).to.not.exist()

            await button.click()

            const chevronOpen = await component.findSubmenuChevron({
              expectEmpty: true
            })

            expect(chevronOpen).to.not.exist()
          })
        })
      })
    })
  })

  describe('tooltip prop', async () => {
    describe('should render tooltip', async () => {
      it('with string value', async () => {
        await mount(
          <TopNavBarItem id="item" tooltip="Tooltip content">
            Menu Item
          </TopNavBarItem>
        )

        const component = await TopNavBarItemLocator.find()
        const tooltip = await component.findTooltip()
        const tooltipContent = await tooltip.findContent()

        expect(tooltipContent).to.have.text('Tooltip content')
      })

      it('with config value', async () => {
        await mount(
          <TopNavBarItem
            id="item"
            tooltip={{
              renderTip: 'Tooltip config content'
            }}
          >
            Menu Item
          </TopNavBarItem>
        )

        const component = await TopNavBarItemLocator.find()
        const tooltip = await component.findTooltip()
        const tooltipContent = await tooltip.findContent()

        expect(tooltipContent).to.have.text('Tooltip config content')
      })
    })

    it('should be able to render with submenu too', async () => {
      await mount(
        <TopNavBarItem
          id="item"
          tooltip="Tooltip content"
          renderSubmenu={itemSubmenuExample}
        >
          Menu Item
        </TopNavBarItem>
      )

      const component = await TopNavBarItemLocator.find()
      const submenu = await component.findSubmenu()
      const tooltip = await component.findTooltip()
      const tooltipContent = await tooltip.findContent()
      const ariaExpandedElements = await component.findAll('[aria-expanded]')

      expect(submenu).to.exist()
      expect(tooltipContent).to.have.text('Tooltip content')

      // the only aria-expanded item should be the BaseButton element
      expect(ariaExpandedElements.length).to.equal(1)
      expect(ariaExpandedElements[0]).to.have.tagName('button')
    })

    it('should be able to render with custom popover too', async () => {
      await mount(
        <TopNavBarItem
          id="item"
          tooltip="Tooltip content"
          customPopoverConfig={getCustomPopoverConfig()}
        >
          Menu Item
        </TopNavBarItem>
      )

      const component = await TopNavBarItemLocator.find()
      const customPopover = await component.findCustomPopover()
      const tooltip = await component.findTooltip()
      const tooltipContent = await tooltip.findContent()
      const ariaExpandedElements = await component.findAll('[aria-expanded]')

      expect(customPopover).to.exist()
      expect(tooltipContent).to.have.text('Tooltip content')

      // the only aria-expanded item should be the BaseButton element
      expect(ariaExpandedElements.length).to.equal(1)
      expect(ariaExpandedElements[0]).to.have.tagName('button')
    })

    it('should have "primary-inverse" color by default', async () => {
      await mount(
        <TopNavBarItem id="item" tooltip="Tooltip content">
          Menu Item
        </TopNavBarItem>
      )

      const component = await TopNavBarItemLocator.find()
      const tooltip = await component.findTooltip()
      const tooltipContent = await tooltip.findContent()

      expect(
        getComputedStyle(tooltipContent.getDOMNode().childNodes[0])
          .backgroundColor
      ).to.equal('rgb(255, 255, 255)')
    })

    it('should have "primary" color in "inverseColor" mode', async () => {
      await mount(
        <SmallViewportModeWrapper layout="desktop" inverseColor>
          <TopNavBarItem id="item" tooltip="Tooltip content">
            Menu Item
          </TopNavBarItem>
        </SmallViewportModeWrapper>
      )

      const component = await TopNavBarItemLocator.find()
      const tooltip = await component.findTooltip()
      const tooltipContent = await tooltip.findContent()

      expect(
        getComputedStyle(tooltipContent.getDOMNode().childNodes[0])
          .backgroundColor
      ).to.equal('rgb(45, 59, 69)')
    })
  })

  describe('renderAvatar prop', async () => {
    it('displays avatar', async () => {
      await mount(
        <TopNavBarItem
          id="item"
          renderAvatar={{ ...avatarExample, avatarName: 'User Name' }}
        >
          Menu Item
        </TopNavBarItem>
      )
      const component = await TopNavBarItemLocator.find()
      const content = await component.findContent()
      const avatar = await component.findAvatar()

      expect(avatar).to.be.visible()
      expect(avatar).to.have.attribute('name', 'User Name')
      expect(avatar).to.have.attribute('alt', 'Menu Item')
      expect(avatar).to.have.attribute('aria-label', 'Menu Item')

      expect(content.getDOMNode().childNodes.length).to.equal(2)
      expect(content.getDOMNode().childNodes[0]).to.contain(avatar.getDOMNode())
      expect(content.getDOMNode().childNodes[1].textContent).to.equal(
        'Menu Item'
      )
    })

    it('display only the avatar in "avatar" variant', async () => {
      await mount(
        <TopNavBarItem
          id="item"
          variant="avatar"
          renderAvatar={{ ...avatarExample, avatarName: 'User Name' }}
        >
          Menu Item
        </TopNavBarItem>
      )
      const component = await TopNavBarItemLocator.find()
      const content = await component.findContent()
      const avatar = await component.findAvatar()

      expect(avatar).to.have.attribute('name', 'User Name')
      expect(avatar).to.have.attribute('alt', 'Menu Item')
      expect(avatar).to.have.attribute('aria-label', 'Menu Item')

      expect(content.getDOMNode().childNodes.length).to.equal(1)
      expect(content.getDOMNode().childNodes[0]).to.equal(avatar.getDOMNode())
    })

    describe('throws warning', async () => {
      it('when not passed to "avatar" variant', async () => {
        const consoleWarning = stub(console, 'warn')
        await mount(
          <TopNavBarItem id="item" variant="avatar">
            Menu Item
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const avatar = await component.findAvatar({ expectEmpty: true })

        expect(avatar).to.not.exist()
        expect(consoleWarning).to.have.been.calledWith(
          `Warning: The "renderAvatar" config is required for the 'variant="avatar"' type <TopNavBar.Item> components, but received none for the item with id "item".`
        )
      })

      it('when passed to item with "renderIcon"', async () => {
        const consoleWarning = stub(console, 'warn')
        await mount(
          <TopNavBarItem
            id="item"
            renderIcon={IconSearchLine}
            renderAvatar={avatarExample}
          >
            Menu Item
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const avatar = await component.findAvatar({ expectEmpty: true })

        expect(avatar).to.not.exist()
        expect(consoleWarning).to.have.been.calledWith(
          `Warning: <TopNavBar.Item> components with icons cannot display avatars, so the "renderAvatar" config prop will be ignored for item with id "item".`
        )
      })

      it('when passed to item with "active" status', async () => {
        const consoleWarning = stub(console, 'warn')
        await mount(
          <TopNavBarItem id="item" renderAvatar={avatarExample} status="active">
            Menu Item
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const avatar = await component.findAvatar()
        const activeIndicatorStyle = await component.getActiveIndicatorStyle()

        expect(avatar).to.exist()
        expect(activeIndicatorStyle?.backgroundColor).to.equal(
          'rgba(0, 0, 0, 0)'
        )
        expect(consoleWarning).to.have.been.calledWith(
          `Warning: <TopNavBar.Item> components with avatar cannot have "active" status, so the "active" status on the item with id "item" will be ignored.`
        )
      })

      it('when there is no string type "children" or "avatarAlt" passed', async () => {
        const consoleWarning = stub(console, 'warn')
        await mount(
          <TopNavBarItem
            id="item"
            renderAvatar={{ ...avatarExample, avatarAlt: undefined }}
          >
            <div>avatar</div>
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const avatar = await component.findAvatar()

        expect(avatar).to.exist()
        expect(consoleWarning).to.have.been.calledWith(
          'Warning: Please supply a label for the avatar with either the "renderAvatar.avatarAlt" or the "children" (as string) prop. It is needed for screen reader support, but missing on the item with the id: "item".'
        )
      })
    })
  })

  describe('renderIcon prop', async () => {
    describe('should render icon', async () => {
      it('for default variant', async () => {
        await mount(
          <TopNavBarItem id="item" renderIcon={IconSearchLine}>
            Menu Item
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const icon = await component.findIcon()
        const content = await component.findContent()

        expect(content).to.be.visible()
        expect(content).to.have.text('Menu Item')
        expect(getComputedStyle(content.getDOMNode()).color).to.equal(
          'rgb(255, 255, 255)'
        )

        expect(icon).to.be.visible()
        expect(icon).to.have.attribute('name', 'IconSearch')
        expect(getComputedStyle(icon.getDOMNode()).fill).to.equal(
          'rgb(255, 255, 255)'
        )
      })

      it('for button variant', async () => {
        await mount(
          <TopNavBarItem id="item" variant="button" renderIcon={IconSearchLine}>
            Menu Item
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const icon = await component.findIcon()
        const content = await component.findContent()

        expect(content).to.be.visible()
        expect(content).to.have.text('Menu Item')
        expect(getComputedStyle(content.getDOMNode()).color).to.equal(
          'rgb(45, 59, 69)'
        )

        expect(icon).to.be.visible()
        expect(icon).to.have.attribute('name', 'IconSearch')
        expect(getComputedStyle(icon.getDOMNode()).fill).to.equal(
          'rgb(45, 59, 69)'
        )
      })
    })

    describe('should render icon in inverse mode', async () => {
      it('for default variant', async () => {
        await mount(
          <SmallViewportModeWrapper layout="desktop" inverseColor>
            <TopNavBarItem id="item" renderIcon={IconSearchLine}>
              Menu Item
            </TopNavBarItem>
          </SmallViewportModeWrapper>
        )
        const component = await TopNavBarItemLocator.find()
        const icon = await component.findIcon()
        const content = await component.findContent()

        expect(content).to.be.visible()
        expect(content).to.have.text('Menu Item')
        expect(getComputedStyle(content.getDOMNode()).color).to.equal(
          'rgb(45, 59, 69)'
        )

        expect(icon).to.be.visible()
        expect(icon).to.have.attribute('name', 'IconSearch')
        expect(getComputedStyle(icon.getDOMNode()).fill).to.equal(
          'rgb(45, 59, 69)'
        )
      })

      it('for button variant', async () => {
        await mount(
          <SmallViewportModeWrapper layout="desktop" inverseColor>
            <TopNavBarItem
              id="item"
              variant="button"
              renderIcon={IconSearchLine}
            >
              Menu Item
            </TopNavBarItem>
          </SmallViewportModeWrapper>
        )
        const component = await TopNavBarItemLocator.find()
        const icon = await component.findIcon()
        const content = await component.findContent()

        expect(content).to.be.visible()
        expect(content).to.have.text('Menu Item')
        expect(getComputedStyle(content.getDOMNode()).color).to.equal(
          'rgb(255, 255, 255)'
        )

        expect(icon).to.be.visible()
        expect(icon).to.have.attribute('name', 'IconSearch')
        expect(getComputedStyle(icon.getDOMNode()).fill).to.equal(
          'rgb(255, 255, 255)'
        )
      })
    })
  })

  describe('as prop', async () => {
    it('should render item as a', async () => {
      await mount(
        <TopNavBarItem id="item" as='a'>
          Menu Item
        </TopNavBarItem>
      )
      const component = await TopNavBarItemLocator.find()
      const button = await component.findButton()

      expect(button).to.have.tagName('a')
      expect(button).to.not.have.attribute('href')
    })
  })


  describe('href prop', async () => {
    it('should render item as link', async () => {
      await mount(
        <TopNavBarItem id="item" href="/#TopNavBar">
          Menu Item
        </TopNavBarItem>
      )
      const component = await TopNavBarItemLocator.find()
      const button = await component.findButton()

      expect(button).to.have.tagName('a')
      expect(button).to.have.attribute('href', '/#TopNavBar')
    })

    it('should not be allowed for items with submenu', async () => {
      const consoleWarning = stub(console, 'warn')
      await mount(
        <TopNavBarItem
          id="item"
          href="/#TopNavBar"
          renderSubmenu={itemSubmenuExample}
        >
          Menu Item
        </TopNavBarItem>
      )
      const component = await TopNavBarItemLocator.find()
      const button = await component.findButton()

      expect(button).to.have.tagName('button')
      expect(button).to.not.have.attribute('href')

      expect(consoleWarning).to.have.been.calledWith(
        `Warning: TopNavBar.Items with submenus are not allowed to have 'href' property, but received href "/#TopNavBar" for item with the id: "item".`
      )
    })
  })

  describe('onClick prop', async () => {
    it('should render item as button', async () => {
      await mount(
        <TopNavBarItem id="item" onClick={stub()}>
          Menu Item
        </TopNavBarItem>
      )
      const component = await TopNavBarItemLocator.find()
      const button = await component.findButton()

      expect(button).to.have.tagName('button')
    })

    it('should fire onClick on click', async () => {
      const onClick = stub()
      await mount(
        <TopNavBarItem id="item" onClick={onClick}>
          Menu Item
        </TopNavBarItem>
      )
      const component = await TopNavBarItemLocator.find()
      const button = await component.findButton()

      await button.click()

      expect(onClick).to.have.been.called()
    })

    it('should work combined with "href" prop', async () => {
      const onClick = stub()
      await mount(
        <TopNavBarItem id="item" onClick={onClick} href="/#TopNavBar">
          Menu Item
        </TopNavBarItem>
      )
      const component = await TopNavBarItemLocator.find()
      const button = await component.findButton()

      expect(button).to.have.tagName('a')
    })

    it('should not be allowed for items with submenu', async () => {
      const onClick = stub()
      const consoleWarning = stub(console, 'warn')
      await mount(
        <TopNavBarItem
          id="item"
          onClick={onClick}
          renderSubmenu={itemSubmenuExample}
        >
          Menu Item
        </TopNavBarItem>
      )
      const component = await TopNavBarItemLocator.find()
      const button = await component.findButton()

      expect(consoleWarning).to.have.been.calledWith(
        `Warning: TopNavBar.Items with submenus are not allowed to have 'onClick' property, but received onClick for item with the id: "item".Use the \`onSubmenuToggle\` prop instead. OnClick: stub`
      )

      await button.click()

      expect(onClick).to.not.have.been.calledWithMatch(match.object)
    })
  })

  describe('onSubmenuToggle prop', async () => {
    it('should be called on submenu toggle', async () => {
      const onSubmenuToggle = stub()
      await mount(
        <TopNavBarItem
          id="item"
          onSubmenuToggle={onSubmenuToggle}
          renderSubmenu={itemSubmenuExample}
        >
          Menu Item
        </TopNavBarItem>
      )
      const component = await TopNavBarItemLocator.find()
      const button = await component.findButton()

      await button.click()

      expect(onSubmenuToggle).to.be.calledWithMatch(match.object, {
        shown: true,
        drilldown: match.object,
        pageHistory: ['root'],
        goToPage: match.func,
        goToPreviousPage: match.func
      })

      await button.click()

      expect(onSubmenuToggle).to.be.calledWithMatch(match.object, {
        shown: false,
        drilldown: match.object,
        pageHistory: ['root'],
        goToPage: match.func,
        goToPreviousPage: match.func
      })
    })
  })

  describe('other event handlers', async () => {
    it('onMouseOver and onMouseOut should be called', async () => {
      const onMouseOver = stub()
      const onMouseOut = stub()
      await mount(
        <TopNavBarItem
          id="item"
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
        >
          Menu Item
        </TopNavBarItem>
      )
      const component = await TopNavBarItemLocator.find()
      const button = await component.findButton()

      await button.mouseOver()

      expect(onMouseOver).to.be.calledWithMatch(match.object)

      await button.mouseOut()

      expect(onMouseOut).to.be.calledWithMatch(match.object)
    })

    it('onFocus and onBlur should be called', async () => {
      const onFocus = stub()
      const onBlur = stub()
      await mount(
        <TopNavBarItem id="item" onFocus={onFocus} onBlur={onBlur}>
          Menu Item
        </TopNavBarItem>
      )
      const component = await TopNavBarItemLocator.find()
      const button = await component.findButton()

      await button.focus()

      expect(onFocus).to.be.calledWithMatch(match.object)

      await button.blur({}, { simulate: true })

      expect(onBlur).to.be.calledWithMatch(match.object)
    })

    it('onKeyDown and onKeyUp should be called', async () => {
      const onKeyDown = stub()
      const onKeyUp = stub()
      await mount(
        <TopNavBarItem id="item" onKeyDown={onKeyDown} onKeyUp={onKeyUp}>
          Menu Item
        </TopNavBarItem>
      )
      const component = await TopNavBarItemLocator.find()
      const button = await component.findButton()

      await button.keyDown('ArrowLeft')

      expect(onKeyDown).to.be.calledWithMatch(match.object)

      await button.keyUp('ArrowLeft')

      expect(onKeyUp).to.be.calledWithMatch(match.object)
    })
  })

  describe('refs', async () => {
    it('elementRef should return root element', async () => {
      const elementRef = stub()
      await mount(
        <TopNavBarItem id="item" elementRef={elementRef}>
          Menu Item
        </TopNavBarItem>
      )
      const component = await TopNavBarItemLocator.find()

      expect(elementRef).to.be.calledWith(component.getDOMNode())
    })

    it('itemRef should return the button element', async () => {
      const itemRef = stub()
      await mount(
        <TopNavBarItem id="item" itemRef={itemRef}>
          Menu Item
        </TopNavBarItem>
      )
      const component = await TopNavBarItemLocator.find()
      const button = await component.findButton()

      expect(itemRef).to.be.calledWith(button.getDOMNode())
    })
  })

  describe('should be accessible', async () => {
    generateA11yTests(TopNavBarItem, TopNavBarItemExamples)

    it('a11y', async () => {
      await mount(<TopNavBarItem id="item">Menu Item</TopNavBarItem>)
      const topNavBarItem = await TopNavBarItemLocator.find()
      expect(await topNavBarItem.accessible()).to.be.true()
    })
  })
})
