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
import '@testing-library/jest-dom'

import { IconSearchLine } from '@instructure/ui-icons'
import { Drilldown } from '@instructure/ui-drilldown'
import { TopNavBarItem } from '../index'
import { avatarExample, SmallViewportModeWrapper, itemSubmenuExample,
  getCustomPopoverConfig } from '../../utils/exampleHelpers'
import userEvent from '@testing-library/user-event'

const ITEM_TEXT = 'Menu Item'

const variants: ('default' | 'button' | 'icon' | 'avatar')[] = [
  'default',
  'button',
  'icon',
  'avatar'
]

describe('<TopNavBarItem />', () => {
  describe('variant prop', () => {
    describe('should have "inverse" color focus ring', () => {
      it.each(variants)(`with %s variant`, (variant) => {
        render(
          <TopNavBarItem
            id="item"
            variant={variant}
            {...(variant === 'icon' ? { renderIcon: IconSearchLine } : {})}
            {...(variant === 'avatar' ? { renderAvatar: avatarExample } : {})}
          >
            {ITEM_TEXT}
          </TopNavBarItem>
        )

        const item = screen.getByRole('button', { name: ITEM_TEXT }) 
        const itemPseudoStyle = getComputedStyle(item, '::before')
        //console.log('itemPseudoStyle', itemPseudoStyle);
        const focusRingColor = itemPseudoStyle.getPropertyValue('border-color')

        //expect(focusRingColor).to.equal('rgb(255, 255, 255)')
        expect(focusRingColor).toBe('buttonface')
      })
    })
    /* 
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
    */

    describe('with "default" variant', () => {
      it('should render the text', () => {
        const {container} = render(
          <TopNavBarItem id="item" variant="default">
            {ITEM_TEXT}
          </TopNavBarItem>
        )

        const item = screen.getByRole('button')
        const screenReaderContent = container.querySelector("[class$='screenReaderContent']")
        
        expect(screenReaderContent).not.toBeInTheDocument()
        expect(item).toHaveTextContent(ITEM_TEXT)
      })
      /*
      it('should have no background and border', () => {
        render(
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
      */
    })

    describe('with "button" variant', () => {
      it('should render the text', () => {
        const {container} = render(
          <TopNavBarItem id="item" variant="button">
            Menu Item
          </TopNavBarItem>
        )

        const item = screen.getByRole('button')
        const screenReaderContent = container.querySelector("[class$='screenReaderContent']")

        expect(screenReaderContent).not.toBeInTheDocument()
        expect(item).toHaveTextContent(ITEM_TEXT)
      })

      /*
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
    */
    })

    describe('with "icon" variant', () => {
      it('should throw error if no icon is provided', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        render(
          <TopNavBarItem id="item" variant="icon">
            Menu Item
          </TopNavBarItem>
        )

        const expectedErrorMessage = 'The "renderIcon" prop is required for the `variant="icon"` type <TopNavBar.Item> components, but the item with id "item" is missing it.';

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          expect.stringContaining(expectedErrorMessage),
          expect.any(String)
        );

        consoleErrorSpy.mockRestore();
      })
      
      it('should render the icon', () => {
        const {container} = render(
          <TopNavBarItem id="item" variant="icon" renderIcon={IconSearchLine}>
            Menu Item
          </TopNavBarItem>
        )

        const icon = container.querySelector('svg');

        expect(icon).toBeVisible();
        expect(icon).toHaveAttribute('name', 'IconSearch');
      })

      it('should render the text in a screen reader label', () => {
        const {container} = render(
          <TopNavBarItem id="item" variant="icon" renderIcon={IconSearchLine}>
            {ITEM_TEXT}
          </TopNavBarItem>
        )
        
        const content = container.querySelector("[class*='topNavBarItem__content']")
        const screenReaderContent = container.querySelector("[class$='screenReaderContent']")

        expect(content).not.toBeInTheDocument()
        expect(screenReaderContent).toHaveTextContent(ITEM_TEXT)
      })
      /*
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
      */
      it('should not allow the "renderAvatar" prop', () => {
        const consoleWarningSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
        const {container} = render(
          <TopNavBarItem
            id="item"
            variant="icon"
            renderIcon={IconSearchLine}
            renderAvatar={avatarExample}
          >
            Menu Item
          </TopNavBarItem>
        )

        const avatar = container.querySelector("[class$='inlineBlock-avatar']")
        const icon = container.querySelector('svg');

        const expectedErrorMessage = 'Warning: <TopNavBar.Item> components with icons cannot display avatars, so the "renderAvatar" config prop will be ignored for item with id "item".' 

        expect(consoleWarningSpy).toHaveBeenCalledWith(
          expect.stringContaining(expectedErrorMessage),
          expect.any(String)
        );

        expect(avatar).not.toBeInTheDocument()
        expect(icon).toBeVisible()

        consoleWarningSpy.mockRestore();
      })
      /*
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
      */
    })

    describe('with "avatar" variant', () => {
      it('should throw error if no avatar is provided', () => {
        const consoleWarningSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
        const {container} = render(
          <TopNavBarItem id="item" variant="avatar">
            Menu Item
          </TopNavBarItem>
        )

        const avatar = container.querySelector("[class$='inlineBlock-avatar']")
        const expectedErrorMessage = `Warning: The "renderAvatar" config is required for the 'variant="avatar"' type <TopNavBar.Item> components, but received none for the item with id "item".`

        expect(consoleWarningSpy).toHaveBeenCalledWith(
          expect.stringContaining(expectedErrorMessage),
          expect.any(String)
        );
        expect(avatar).not.toBeInTheDocument()

        consoleWarningSpy.mockRestore();
      })
      
      it('should throw error if no "renderAvatar.avatarName" is provided', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
        const {container} = render(
          // @ts-expect-error We are passing it incorrectly on purpose
          <TopNavBarItem id="item" variant="avatar" renderAvatar={{}}>
            Menu Item
          </TopNavBarItem>
        )

        const avatar = container.querySelector("[class$='inlineBlock-avatar']")
        const expectedErrorMessage = `Warning: The "avatarName" prop is required for for <TopNavBar.Item> components with avatar, but the item with id "item" is missing it.`

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          expect.stringContaining(expectedErrorMessage),
          expect.any(String)
        );
        expect(avatar).not.toBeInTheDocument()

        consoleErrorSpy.mockRestore();
      })

      it('should render the avatar', () => {
        const {container} = render(
          <TopNavBarItem
            id="item"
            variant="avatar"
            renderAvatar={avatarExample}
          >
            Menu Item
          </TopNavBarItem>
        )
        const avatar = container.querySelector("[class$='inlineBlock-avatar']")

        expect(avatar).toBeVisible()
      })
      /*
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
      */
      it('should have either string type "children" or "avatarAlt"', () => {
        const consoleWarningSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
        render(
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

        const expectedErrorMessage = 'Warning: Please supply a label for the avatar with either the "renderAvatar.avatarAlt" or the "children" (as string) prop. It is needed for screen reader support, but missing on the item with the id: "item".'

        expect(consoleWarningSpy).toHaveBeenCalledWith(
          expect.stringContaining(expectedErrorMessage),
          expect.any(String)
        )

        consoleWarningSpy.mockRestore();
      })
      
    })
  })

  describe('status prop', () => {
    describe('with "default" status', () => {
      /*
      it('should have no underline', () => {
        render(
          <TopNavBarItem id="item" status="default">
            Menu Item
          </TopNavBarItem>
        )
        const component = await TopNavBarItemLocator.find()
        const activeIndicatorStyle = await component.getActiveIndicatorStyle()

        // class$="-topNavBarItem__container" ::after
        expect(activeIndicatorStyle?.backgroundColor).to.equal(
          'rgba(0, 0, 0, 0)'
        )
      })
      */
    })

    describe('with "active" status', () => {
      /*
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
      */
      variants.forEach((variant) => {
        const isDefaultVariant = variant === 'default'

        it(`should be${
          !isDefaultVariant ? ' not' : ''
        } allowed for "${variant}" variant items`, () => {
          const consoleWarningSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
          render(
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

          // class$="-topNavBarItem__container" ::after
          //const component = await TopNavBarItemLocator.find()
          //const activeIndicatorStyle = await component.getActiveIndicatorStyle()

          

          if (isDefaultVariant) {
            expect(consoleWarningSpy).not.toHaveBeenCalled()
            /*expect(activeIndicatorStyle?.backgroundColor).to.equal(
              'rgb(255, 255, 255)'
            )*/
            consoleWarningSpy.mockRestore();
          } else {
            const expectedErrorMessage = `Warning: Only \`variant="default"\` <TopNavBar.Item> components can be set to active, but item with id "item" has variant: "${variant}".`
            expect(consoleWarningSpy).toHaveBeenCalledWith(
              expect.stringContaining(expectedErrorMessage),
              expect.any(String)
            )
            /*
            expect(activeIndicatorStyle?.backgroundColor).to.equal(
              'rgba(0, 0, 0, 0)'
            )
            */
            consoleWarningSpy.mockRestore();
          }
        })
      })

      
      it('should not be allowed with avatar + text items', () => {
        const consoleWarningSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
        render(
          <TopNavBarItem id="item" status="active" renderAvatar={avatarExample}>
            Menu Item
          </TopNavBarItem>
        )
        // const component = await TopNavBarItemLocator.find()
        // const activeIndicatorStyle = await component.getActiveIndicatorStyle()

        const expectedErrorMessage = `Warning: <TopNavBar.Item> components with avatar cannot have "active" status, so the "active" status on the item with id "item" will be ignored.`
        expect(consoleWarningSpy).toHaveBeenCalledWith(
          expect.stringContaining(expectedErrorMessage),
          expect.any(String)
        )
        // expect(activeIndicatorStyle?.backgroundColor).to.equal(
        //   'rgba(0, 0, 0, 0)'
        // )
        consoleWarningSpy.mockRestore();
      })
    })

    describe('with "disabled" status', () => {
      variants.forEach((variant) => {
        it(`should be set to disabled for "${variant}" variant items`, () => {
          const {container} = render(
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

          const item = screen.getByRole('button')
          const baseButtonContent = container.querySelector("[class$='baseButton__content']")
          const baseButtonContentStyle = getComputedStyle(baseButtonContent!)

          expect(item).toBeDisabled();
          expect(item).toHaveAttribute('aria-disabled', 'true')
          expect(baseButtonContentStyle.opacity).toBe('0.5')
        })
      })

      it('should disable submenus too', async () => {
        const {container} = render(
          <TopNavBarItem
            id="item"
            status="disabled"
            renderSubmenu={itemSubmenuExample}
          >
            Menu Item
          </TopNavBarItem>
        )

        const item = screen.getByRole('button')
        const submenuTrigger = container.querySelector("[class$='submenuTriggerContainer']")

        expect(item).toBeDisabled();
        expect(item).toHaveAttribute('aria-disabled', 'true')
        expect(submenuTrigger).toHaveAttribute('disabled')
        expect(submenuTrigger).toHaveAttribute('aria-disabled', 'true')
        
        userEvent.click(item)

        await waitFor(() => {
          expect(item).toBeVisible()
        })
      })
    })
  })
  
  describe('renderSubmenu prop', () => {
    it('should not accept non-Drilldown elements', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      const {container} =render(
        <TopNavBarItem id="item" renderSubmenu={<div>submenu</div>}>
          Menu Item
        </TopNavBarItem>
      )

      const submenuTrigger = container.querySelector("[class$='submenuTriggerContainer']")

      expect(submenuTrigger).not.toBeInTheDocument()
      expect(consoleErrorSpy).toHaveBeenCalled()

      consoleErrorSpy.mockRestore()
    })

    it('should render submenu', async () => {
      const {container, findAllByRole} = render(
        <TopNavBarItem id="item" renderSubmenu={itemSubmenuExample}>
          Menu Item
        </TopNavBarItem>
      )
      const customElementInitial = container.querySelector("span[class$='-position']");

      expect(customElementInitial).toBeInTheDocument();
      expect(customElementInitial).not.toHaveAttribute('data-cid', expect.stringContaining('Drilldown'));

      const button = container.querySelector("[class$='inlineBlock-baseButton']")

      expect(button).toHaveAttribute('aria-haspopup', 'menu')
      expect(button).toHaveAttribute('aria-expanded', 'false')

      userEvent.click(button!)

      await waitFor(() => {
        expect(button).toHaveAttribute('aria-haspopup', 'menu');
        expect(button).toHaveAttribute('aria-expanded', 'true');

        const customElementDrilldown = container.querySelector("span[class$='-position']")
        expect(customElementDrilldown).toBeInTheDocument();
        expect(customElementDrilldown).toHaveAttribute('data-cid', expect.stringContaining('Drilldown'));
      })
      
      const options = await findAllByRole('link');
      expect(options).toHaveLength(3)

      options.forEach(option => {
        expect(option).toHaveAttribute('id', expect.stringContaining('linkExampleOption'));
        expect(option).toBeVisible()
      });
    })

    it('should throw warning about controlled Drilldown', async () => {
      const consoleWarningSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
      render(
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

      const expectedErrorMessage = `Warning: TopNavBar.Item Drilldown submenus are controlled by the component. The "show" prop will be ignored on the submenu of the item with id: "item".`

      expect(consoleWarningSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedErrorMessage),
        expect.any(String)
      )

      consoleWarningSpy.mockRestore();
    })

    it('should throw warning when trigger is passed to Drilldown', async () => {
      const consoleWarningSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
      render(
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

      const expectedErrorMessage = `Warning: TopNavBar.Item submenus have the item itself as their trigger. The "trigger" prop will be ignored on the Drilldown submenu of item with id: "item".`

      expect(consoleWarningSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedErrorMessage),
        expect.any(String)
      )

      consoleWarningSpy.mockRestore();
    })

    it('should open on ArrowDown', async () => {
      const {container, findAllByRole} = render(
        <TopNavBarItem id="item" renderSubmenu={itemSubmenuExample}>
          Menu Item
        </TopNavBarItem>
      )

      const customElementInitial= container.querySelector("span[class$='-position']");
      expect(customElementInitial).toBeInTheDocument();
      expect(customElementInitial).not.toHaveAttribute('data-cid', expect.stringContaining('Drilldown'));

      const button = container.querySelector("[class$='inlineBlock-baseButton']")

      expect(button).toHaveAttribute('aria-haspopup', 'menu')
      expect(button).toHaveAttribute('aria-expanded', 'false')

      userEvent.type(button!, '{arrowdown}');

      await waitFor(() => {
        expect(button).toHaveAttribute('aria-haspopup', 'menu')
        expect(button).toHaveAttribute('aria-expanded', 'true')

        const customElementDrilldown = container.querySelector("span[class$='-position']")
        expect(customElementDrilldown).toBeInTheDocument()
        expect(customElementDrilldown).toHaveAttribute('data-cid', expect.stringContaining('Drilldown'))
      })
      
      const options = await findAllByRole('link')
      expect(options).toHaveLength(3)

      options.forEach(option => {
        expect(option).toHaveAttribute('id', expect.stringContaining('linkExampleOption'))
        expect(option).toBeVisible()
      })
    })
  })

  describe('customPopoverConfig prop', () => {
    it('should render popover', async () => {
      render(
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


      const button = screen.getByRole('button')

      expect(button).toHaveAttribute('aria-haspopup', 'true')
      expect(button).toHaveAttribute('aria-expanded', 'false')

      userEvent.click(button!)

      await waitFor(() => {
        expect(button).toHaveAttribute('aria-haspopup', 'true')
        expect(button).toHaveAttribute('aria-expanded', 'true')
      })

      const popoverContent = screen.getByText('dialog content');
      expect(popoverContent).toBeInTheDocument();
    })

    it('should throw error when passed to item with submenu', async () => {
      const consoleWarningSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
      render(
        <TopNavBarItem
          id="item"
          renderSubmenu={itemSubmenuExample}
          customPopoverConfig={getCustomPopoverConfig()}
        >
          Menu Item
        </TopNavBarItem>
      )

      const button = screen.getByRole('button')

      expect(button).toHaveAttribute('aria-haspopup', 'menu')
      expect(button).toHaveAttribute('aria-expanded', 'false')

      const expectedErrorMessage = `Warning: TopNavBar.Items are not allowed to have both the "renderSubmenu" and "customPopoverConfig" props. For submenus, pass a Drilldown component via the "renderSubmenu" prop, and only use "customPopoverConfig" for custom features. Item with id: "item" will ignore the "customPopoverConfig" prop.`

      expect(consoleWarningSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedErrorMessage),
        expect.any(String)
      )

      consoleWarningSpy.mockRestore();
    })

    it('should throw warning when no content is passed', () => {
      const consoleWarningSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
      const {container} = render(
        <TopNavBarItem
          id="item"
          customPopoverConfig={getCustomPopoverConfig(false, {
            children: null
          })}
        >
          Menu Item
        </TopNavBarItem>
      )

      const customElementInitialPopover = container.querySelector("span[class$='-position']")

      expect(customElementInitialPopover).not.toBeInTheDocument()

      const expectedErrorMessage = `Warning: Pass the content of the custom Popover as "customPopoverConfig.children" for the item with id: "item".`

      expect(consoleWarningSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedErrorMessage),
        expect.any(String)
      )

      consoleWarningSpy.mockRestore();
    })

    it('should throw warning when renderTrigger is passed in the config', () => {
      const consoleWarningSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
      render(
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

      const expectedErrorMessage = `Warning: TopNavBar.Item popovers have the item itself as their trigger. The "renderTrigger" prop will be ignored on the popover of item with id: "item".`

      expect(consoleWarningSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedErrorMessage),
        expect.any(String)
      )

      consoleWarningSpy.mockRestore();
    })

    describe('should not put aria-expanded on the popover trigger, just the button', () => {
      it('when popover `shouldContainFocus="true"`', async () => {
        const {container} = render(
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
        
        const customElementInitial = container.querySelector("span[class$='-position']")
        expect(customElementInitial).toBeInTheDocument();
        expect(customElementInitial).not.toHaveAttribute('data-cid', expect.stringContaining('Popover'))

        const button = screen.getByRole('button')
        expect(button).toHaveAttribute('aria-haspopup', 'true')
        expect(button).toHaveAttribute('aria-expanded', 'false')

        const popoverTrigger = container.querySelector("div[class$='submenuTriggerContainer']")
        expect(popoverTrigger).toHaveAttribute('data-popover-trigger', 'true')
        expect(popoverTrigger).not.toHaveAttribute('aria-expanded')

        userEvent.click(button!)
  
        await waitFor(() => {
          expect(button).toHaveAttribute('aria-haspopup', 'true')
          expect(button).toHaveAttribute('aria-expanded', 'true')

          const customElementPopover = container.querySelector("span[class$='-position']");
          expect(customElementPopover).toBeInTheDocument();
          expect(customElementPopover).toHaveAttribute('data-cid', expect.stringContaining('Popover'));
  
          const popoverTriggerActive = container.querySelector("div[class$='submenuTriggerContainer']")
          expect(popoverTriggerActive).not.toHaveAttribute('aria-expanded')

          const popoverContent = screen.getByText('dialog content')
          expect(popoverContent).toBeInTheDocument()
        })
      })

      it('when popover `shouldContainFocus="false"`', async () => {
        const {container} = render(
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

        const customElementInitial = container.querySelector("span[class$='-position']")
        expect(customElementInitial).toBeInTheDocument();
        expect(customElementInitial).not.toHaveAttribute('data-cid', expect.stringContaining('Popover'))

        const button = screen.getByRole('button')
        expect(button).toHaveAttribute('aria-haspopup', 'true')
        expect(button).toHaveAttribute('aria-expanded', 'false')

        const popoverTrigger = container.querySelector("div[class$='submenuTriggerContainer']")
        expect(popoverTrigger).toHaveAttribute('data-popover-trigger', 'true')
        expect(popoverTrigger).not.toHaveAttribute('aria-expanded')

        userEvent.click(button!)
  
        await waitFor(() => {
          expect(button).toHaveAttribute('aria-haspopup', 'true')
          expect(button).toHaveAttribute('aria-expanded', 'true')

          const customElementPopover = container.querySelector("span[class$='-position']");
          expect(customElementPopover).toBeInTheDocument();
          expect(customElementPopover).toHaveAttribute('data-cid', expect.stringContaining('Popover'));
  
          const popoverTriggerActive = container.querySelector("div[class$='submenuTriggerContainer']")
          expect(popoverTriggerActive).not.toHaveAttribute('aria-expanded')

          const popoverContent = screen.getByText('dialog content');
          expect(popoverContent).toBeInTheDocument();
        })
      })
    })

    it('should open on ArrowDown', async () => {
      render(
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

      const popoverContentInitial= screen.queryByText('dialog content')
      expect(popoverContentInitial).not.toBeInTheDocument()

      const button = screen.getByRole('button')
      userEvent.type(button!, '{arrowdown}')

      await waitFor(() => {
        const popoverContentActive = screen.getByText('dialog content')
        expect(popoverContentActive).toBeInTheDocument()
      })
    })

    it('should work controlled too', async () => {
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

      render(<ControlledExample />)
      const popoverContentInitial= screen.queryByText('dialog content')
      const button = screen.getByRole('button')
      
      expect(popoverContentInitial).not.toBeInTheDocument()

      userEvent.type(button!, '{arrowdown}')
      
      await waitFor(() => {
        const popoverContentActive = screen.getByText('dialog content')
        expect(popoverContentActive).toBeInTheDocument()
      })

      // TODO close it back
      userEvent.click(button!)
      // fireEvent.click(button!)
      //userEvent.type(button!, '{mouseup}')

      await waitFor(() => {
        const popoverContentInactive = screen.queryByText('dialog content')
        expect(popoverContentInactive).toBeVisible()
      })
    })
  })

  describe('showSubmenuChevron prop', () => {
    it('should not show when no submenu or popover', () => {
      const {container} = render(<TopNavBarItem id="item">Menu Item</TopNavBarItem>)

      const chevron = container.querySelector("svg[class$='inlineSVG-svgIcon']")
      expect(chevron).not.toBeInTheDocument()
    })
   
    describe('when true (by default), should show chevron icon', () => {
      it('next to items with submenu', async () => {
        const {container} = render(
          <TopNavBarItem id="item" renderSubmenu={itemSubmenuExample}>
            Menu Item
          </TopNavBarItem>
        )
        const button = screen.getByRole('button')

        const chevronClosed = container.querySelector('svg[name="IconArrowOpenDown"]')
        expect(chevronClosed).toBeVisible()

        userEvent.click(button!)

        await waitFor(() => {
          const chevronOpen = container.querySelector('svg[name="IconArrowOpenUp"]')
          expect(chevronOpen).toBeVisible()
        })
      })

      it('next to items with custom popover', async () => {
        const {container} = render(
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
        const button = screen.getByRole('button')

        const chevronClosed = container.querySelector('svg[name="IconArrowOpenDown"]')
        expect(chevronClosed).toBeVisible()

        userEvent.click(button!)

        await waitFor(() => {
          const chevronOpen = container.querySelector('svg[name="IconArrowOpenUp"]')
          expect(chevronOpen).toBeVisible()
        })
      })

      describe('should show for all variants:', () => {
        variants.forEach((variant) => {
          it(`with "${variant}" variant`, async () => {
            const {container} = render(
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
            const button = screen.getByRole('button')

            const chevronClosed = container.querySelector('svg[name="IconArrowOpenDown"]')
            expect(chevronClosed).toBeVisible()
    
            userEvent.click(button!)
    
            await waitFor(() => {
              const chevronOpen = container.querySelector('svg[name="IconArrowOpenUp"]')
              expect(chevronOpen).toBeVisible()
            })
          })
        })
      })
    })

    describe('when false, should not show chevron icon', () => {
      it('next to items with submenu', async () => {
        const {container} = render(
          <TopNavBarItem
            id="item"
            renderSubmenu={itemSubmenuExample}
            showSubmenuChevron={false}
          >
            Menu Item
          </TopNavBarItem>
        )
        const button = screen.getByRole('button')

        const chevron = container.querySelector("svg[class$='inlineSVG-svgIcon']")
        expect(chevron).not.toBeInTheDocument()

        userEvent.click(button!)

        await waitFor(() => {
          const chevronAfterClick = container.querySelector("svg[class$='inlineSVG-svgIcon']")
          expect(chevronAfterClick).not.toBeInTheDocument()
        })
      })
/*
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
      */
    })
  })
})
  