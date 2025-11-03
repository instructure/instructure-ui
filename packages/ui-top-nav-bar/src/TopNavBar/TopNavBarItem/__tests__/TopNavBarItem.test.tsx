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

import { Component } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import type { MockInstance } from 'vitest'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { IconSearchLine } from '@instructure/ui-icons'
import { Drilldown } from '@instructure/ui-drilldown'
import { TopNavBarItem } from '../index'

import {
  avatarExample,
  SmallViewportModeWrapper,
  itemSubmenuExample,
  getCustomPopoverConfig
} from '../../utils/exampleHelpers'

const ITEM_TEXT = 'Menu Item'

const variants: ('default' | 'button' | 'icon' | 'avatar')[] = [
  'default',
  'button',
  'icon',
  'avatar'
]

describe('<TopNavBarItem />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeAll(() => {
    vi.useFakeTimers()
  })

  afterAll(() => {
    vi.useRealTimers()
  })

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

  describe('variant prop', () => {
    // TODO convert to e2e
    // describe('should have "inverse" color focus ring', () => {
    //   it.each(variants)(`with %s variant`, (variant) => {
    //     render(
    //       <TopNavBarItem
    //         id="item"
    //         variant={variant}
    //         {...(variant === 'icon' ? { renderIcon: IconSearchLine } : {})}
    //         {...(variant === 'avatar' ? { renderAvatar: avatarExample } : {})}
    //       >
    //         {ITEM_TEXT}
    //       </TopNavBarItem>
    //     )

    //     const item = screen.getByRole('button', { name: ITEM_TEXT })
    //     const itemPseudoStyle = getComputedStyle(item, '::before')
    //     const focusRingColor = itemPseudoStyle.getPropertyValue('border-color')

    //     expect(focusRingColor).to.equal('rgb(255, 255, 255)')
    //   })
    // })

    // TODO convert to e2e
    // describe('should have "info" color focus ring in "inverseColor" mode', () => {
    //   variants.forEach((variant) => {
    //     it(`with ${variant} variant`, () => {
    //       render(
    //         <SmallViewportModeWrapper layout="desktop" inverseColor>
    //           <TopNavBarItem
    //             id="item"
    //             variant={variant}
    //             renderIcon={variant === 'icon' ? IconSearchLine : undefined}
    //             renderAvatar={variant === 'avatar' ? avatarExample : undefined}
    //           >
    //             Menu Item
    //           </TopNavBarItem>
    //         </SmallViewportModeWrapper>
    //       )
    //       const item = screen.getByRole('button', { name: ITEM_TEXT })
    //       const itemPseudoStyle = getComputedStyle(item, '::before')
    //       const focusRingColor = itemPseudoStyle.getPropertyValue('border-color')

    //       // expect(focusRingColor).toBe('rgb(3, 116, 181)')
    //       expect(focusRingColor).toBe('buttonface')

    //     })
    //   })
    // })

    describe('with "default" variant', () => {
      it('should render the text', () => {
        const { container } = render(
          <TopNavBarItem id="item" variant="default">
            {ITEM_TEXT}
          </TopNavBarItem>
        )

        const item = screen.getByRole('button')
        const screenReaderContent = container.querySelector(
          "[class$='screenReaderContent']"
        )

        expect(screenReaderContent).not.toBeInTheDocument()
        expect(item).toHaveTextContent(ITEM_TEXT)
      })

      // TODO convert to e2e
      // it('should have no background and border', () => {
      //   render(
      //     <TopNavBarItem id="item" variant="default">
      //       Menu Item
      //     </TopNavBarItem>
      //   )
      //   const component = await TopNavBarItemLocator.find()
      //   const background = await component.getButtonBackground()
      //   const borderWidth = await component.getButtonBorder()

      //   expect(background).to.equal('rgba(0, 0, 0, 0)')
      //   expect(borderWidth).to.equal('0px none rgb(255, 255, 255)')
      // })
    })

    describe('with "button" variant', () => {
      it('should render the text', () => {
        const { container } = render(
          <TopNavBarItem id="item" variant="button">
            Menu Item
          </TopNavBarItem>
        )

        const item = screen.getByRole('button')
        const screenReaderContent = container.querySelector(
          "[class$='screenReaderContent']"
        )

        expect(screenReaderContent).not.toBeInTheDocument()
        expect(item).toHaveTextContent(ITEM_TEXT)
      })

      // TODO convert to e2e
      // it('should have "secondary" color background and border', async () => {
      //   await mount(
      //     <TopNavBarItem id="item" variant="button">
      //       Menu Item
      //     </TopNavBarItem>
      //   )
      //   const component = await TopNavBarItemLocator.find()
      //   const background = await component.getButtonBackground()
      //   const borderWidth = await component.getButtonBorder()

      //   expect(background).to.equal('rgb(255, 255, 255)')
      //   expect(borderWidth).to.equal('1px solid rgb(219, 219, 219)')
      // })

      // it('should have "primary" color background and border in inverse mode', async () => {
      //   await mount(
      //     <SmallViewportModeWrapper layout="desktop" inverseColor>
      //       <TopNavBarItem id="item" variant="button">
      //         Menu Item
      //       </TopNavBarItem>
      //     </SmallViewportModeWrapper>
      //   )
      //   const component = await TopNavBarItemLocator.find()
      //   const background = await component.getButtonBackground()
      //   const borderWidth = await component.getButtonBorder()

      //   expect(background).to.equal('rgb(3, 116, 181)')
      //   expect(borderWidth).to.equal('1px solid rgb(2, 84, 131)')
      // })
    })

    describe('with "icon" variant', () => {
      it('should throw error if no icon is provided', () => {
        render(
          <TopNavBarItem id="item" variant="icon">
            Menu Item
          </TopNavBarItem>
        )

        const expectedErrorMessage =
          'The "renderIcon" prop is required for the `variant="icon"` type <TopNavBar.Item> components, but the item with id "item" is missing it.'

        expect(consoleErrorMock).toHaveBeenCalledWith(
          expect.stringContaining(expectedErrorMessage),
          expect.any(String)
        )
      })

      it('should render the icon', () => {
        const { container } = render(
          <TopNavBarItem id="item" variant="icon" renderIcon={IconSearchLine}>
            Menu Item
          </TopNavBarItem>
        )

        const icon = container.querySelector('svg')

        expect(icon).toBeVisible()
        expect(icon).toHaveAttribute('name', 'IconSearch')
      })

      it('should render the text in a screen reader label', () => {
        const { container } = render(
          <TopNavBarItem id="item" variant="icon" renderIcon={IconSearchLine}>
            {ITEM_TEXT}
          </TopNavBarItem>
        )

        const content = container.querySelector(
          "[class*='topNavBarItem__content']"
        )
        const screenReaderContent = container.querySelector(
          "[class$='screenReaderContent']"
        )

        expect(content).not.toBeInTheDocument()
        expect(screenReaderContent).toHaveTextContent(ITEM_TEXT)
      })

      // TODO convert to e2e
      // it('should have no background and border', async () => {
      //   await mount(
      //     <TopNavBarItem id="item" variant="icon" renderIcon={IconSearchLine}>
      //       Menu Item
      //     </TopNavBarItem>
      //   )
      //   const component = await TopNavBarItemLocator.find()
      //   const background = await component.getButtonBackground()
      //   const borderWidth = await component.getButtonBorder()

      //   expect(background).to.equal('rgba(0, 0, 0, 0)')
      //   expect(borderWidth).to.equal('0px none rgb(255, 255, 255)')
      // })

      it('should not allow the "renderAvatar" prop', () => {
        const { container } = render(
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
        const icon = container.querySelector('svg')

        const expectedErrorMessage =
          'Warning: <TopNavBar.Item> components with icons cannot display avatars, so the "renderAvatar" config prop will be ignored for item with id "item".'

        expect(consoleWarningMock).toHaveBeenCalledWith(
          expect.stringContaining(expectedErrorMessage),
          expect.any(String)
        )

        expect(avatar).not.toBeInTheDocument()
        expect(icon).toBeVisible()
      })

      // TODO convert to e2e
      // it('should have at least 42px size button in small viewport mode', async () => {
      //   await mount(
      //     <SmallViewportModeWrapper>
      //       <TopNavBarItem id="item" variant="icon" renderIcon={IconSearchLine}>
      //         Menu Item
      //       </TopNavBarItem>
      //     </SmallViewportModeWrapper>
      //   )
      //   const component = await TopNavBarItemLocator.find()
      //   const button = await component.findButton()
      //   const buttonStyle = getComputedStyle(button.getDOMNode())

      //   expect(parseInt(buttonStyle.width, 10)).to.be.greaterThanOrEqual(42)
      //   expect(parseInt(buttonStyle.height, 10)).to.be.greaterThanOrEqual(42)
      // })
    })

    describe('with "avatar" variant', () => {
      it('should throw error if no avatar is provided', () => {
        const { container } = render(
          <TopNavBarItem id="item" variant="avatar">
            Menu Item
          </TopNavBarItem>
        )

        const avatar = container.querySelector("[class$='inlineBlock-avatar']")
        const expectedErrorMessage = `Warning: The "renderAvatar" config is required for the 'variant="avatar"' type <TopNavBar.Item> components, but received none for the item with id "item".`

        expect(consoleWarningMock).toHaveBeenCalledWith(
          expect.stringContaining(expectedErrorMessage),
          expect.any(String)
        )
        expect(avatar).not.toBeInTheDocument()
      })

      it('should throw error if no "renderAvatar.avatarName" is provided', () => {
        const { container } = render(
          // @ts-expect-error We are passing it incorrectly on purpose
          <TopNavBarItem id="item" variant="avatar" renderAvatar={{}}>
            Menu Item
          </TopNavBarItem>
        )

        const avatar = container.querySelector("[class$='inlineBlock-avatar']")
        const expectedErrorMessage = `Warning: The "avatarName" prop is required for for <TopNavBar.Item> components with avatar, but the item with id "item" is missing it.`

        expect(consoleErrorMock).toHaveBeenCalledWith(
          expect.stringContaining(expectedErrorMessage),
          expect.any(String)
        )
        expect(avatar).not.toBeInTheDocument()
      })

      it('should render the avatar', () => {
        const { container } = render(
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

      // TODO convert to e2e
      // it('should have no background and border', async () => {
      //   await mount(
      //     <TopNavBarItem
      //       id="item"
      //       variant="avatar"
      //       renderAvatar={avatarExample}
      //     >
      //       Menu Item
      //     </TopNavBarItem>
      //   )
      //   const component = await TopNavBarItemLocator.find()
      //   const background = await component.getButtonBackground()
      //   const borderWidth = await component.getButtonBorder()

      //   expect(background).to.equal('rgba(0, 0, 0, 0)')
      //   expect(borderWidth).to.equal('0px none rgb(255, 255, 255)')
      // })

      it('should have either string type "children" or "avatarAlt"', () => {
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

        const expectedErrorMessage =
          'Warning: Please supply a label for the avatar with either the "renderAvatar.avatarAlt" or the "children" (as string) prop. It is needed for screen reader support, but missing on the item with the id: "item".'

        expect(consoleWarningMock).toHaveBeenCalledWith(
          expect.stringContaining(expectedErrorMessage),
          expect.any(String)
        )
      })
    })
  })

  describe('status prop', () => {
    // TODO convert to e2e
    // describe('with "default" status', () => {
    //   it('should have no underline', () => {
    //     render(
    //       <TopNavBarItem id="item" status="default">
    //         Menu Item
    //       </TopNavBarItem>
    //     )
    //     const component = await TopNavBarItemLocator.find()
    //     const activeIndicatorStyle = await component.getActiveIndicatorStyle()
    //     // class$="-topNavBarItem__container" ::after
    //     expect(activeIndicatorStyle?.backgroundColor).to.equal(
    //       'rgba(0, 0, 0, 0)'
    //     )
    //   })
    // })

    describe('with "active" status', () => {
      // TODO convert to e2e
      // it('should be indicated with "inverse" color underline', async () => {
      //   await mount(
      //     <TopNavBarItem id="item" status="active">
      //       Menu Item
      //     </TopNavBarItem>
      //   )
      //   const component = await TopNavBarItemLocator.find()
      //   const activeIndicatorStyle = await component.getActiveIndicatorStyle()

      //   expect(activeIndicatorStyle?.backgroundColor).to.equal(
      //     'rgb(255, 255, 255)'
      //   )
      // })

      // TODO convert to e2e
      // it('should be indicated with "text" color underline in "inverseColor" mode', async () => {
      //   await mount(
      //     <SmallViewportModeWrapper layout="desktop" inverseColor>
      //       <TopNavBarItem id="item" status="active">
      //         Menu Item
      //       </TopNavBarItem>
      //     </SmallViewportModeWrapper>
      //   )
      //   const component = await TopNavBarItemLocator.find()
      //   const activeIndicatorStyle = await component.getActiveIndicatorStyle()

      //   expect(activeIndicatorStyle?.backgroundColor).to.equal(
      //     'rgb(39, 53, 64)'
      //   )
      // })

      variants.forEach((variant) => {
        const isDefaultVariant = variant === 'default'

        it(`should be${
          !isDefaultVariant ? ' not' : ''
        } allowed for "${variant}" variant items`, () => {
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

          // TODO convert to e2e
          // class$="-topNavBarItem__container" ::after
          // const activeIndicatorStyle = await component.getActiveIndicatorStyle()

          if (isDefaultVariant) {
            expect(consoleWarningMock).not.toHaveBeenCalled()
            // expect(activeIndicatorStyle?.backgroundColor).to.equal('rgb(255, 255, 255)')
          } else {
            const expectedErrorMessage = `Warning: Only \`variant="default"\` <TopNavBar.Item> components can be set to active, but item with id "item" has variant: "${variant}".`
            expect(consoleWarningMock).toHaveBeenCalledWith(
              expect.stringContaining(expectedErrorMessage),
              expect.any(String)
            )
            // expect(activeIndicatorStyle?.backgroundColor).to.equal('rgba(0, 0, 0, 0)')
          }
        })
      })

      it('should not be allowed with avatar + text items', () => {
        render(
          <TopNavBarItem id="item" status="active" renderAvatar={avatarExample}>
            Menu Item
          </TopNavBarItem>
        )
        const expectedErrorMessage = `Warning: <TopNavBar.Item> components with avatar cannot have "active" status, so the "active" status on the item with id "item" will be ignored.`
        expect(consoleWarningMock).toHaveBeenCalledWith(
          expect.stringContaining(expectedErrorMessage),
          expect.any(String)
        )

        // TODO convert to e2e
        // const activeIndicatorStyle = await component.getActiveIndicatorStyle()
        // expect(activeIndicatorStyle?.backgroundColor).to.equal(
        //   'rgba(0, 0, 0, 0)'
        // )
      })
    })

    describe('with "disabled" status', () => {
      variants.forEach((variant) => {
        it(`should be set to disabled for "${variant}" variant items`, () => {
          const { container } = render(
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
          const baseButtonContent = container.querySelector(
            "[class$='baseButton__content']"
          )
          const baseButtonContentStyle = getComputedStyle(baseButtonContent!)

          expect(item).toBeDisabled()
          expect(item).toHaveAttribute('aria-disabled', 'true')
          expect(baseButtonContentStyle.opacity).toBe('0.5')
        })
      })

      it('should disable submenus too', async () => {
        // Use real timers for userEvent
        vi.useRealTimers()

        const { container } = render(
          <TopNavBarItem
            id="item"
            status="disabled"
            renderSubmenu={itemSubmenuExample}
          >
            Menu Item
          </TopNavBarItem>
        )

        const item = screen.getByRole('button')
        const submenuTrigger = container.querySelector(
          "[class$='submenuTriggerContainer']"
        )

        expect(item).toBeDisabled()
        expect(item).toHaveAttribute('aria-disabled', 'true')
        expect(submenuTrigger).toHaveAttribute('disabled')
        expect(submenuTrigger).toHaveAttribute('aria-disabled', 'true')

        await userEvent.click(item)
        await new Promise((resolve) => setTimeout(resolve, 0))

        expect(item).toBeVisible()

        vi.useFakeTimers()
      })
    })
  })

  describe('renderSubmenu prop', () => {
    it('should not accept non-Drilldown elements', () => {
      const { container } = render(
        <TopNavBarItem id="item" renderSubmenu={<div>submenu</div>}>
          Menu Item
        </TopNavBarItem>
      )

      const submenuTrigger = container.querySelector(
        "[class$='submenuTriggerContainer']"
      )

      expect(submenuTrigger).not.toBeInTheDocument()
    })

    it('should render submenu', async () => {
      // Use real timers for userEvent
      vi.useRealTimers()

      const { container, findAllByRole } = render(
        <TopNavBarItem id="item" renderSubmenu={itemSubmenuExample}>
          Menu Item
        </TopNavBarItem>
      )
      const customElementInitial = container.querySelector(
        "span[class$='-position']"
      )

      expect(customElementInitial).toBeInTheDocument()

      const button = container.querySelector(
        "[class$='inlineBlock-baseButton']"
      )

      expect(button).toHaveAttribute('aria-haspopup', 'menu')
      expect(button).toHaveAttribute('aria-expanded', 'false')

      await userEvent.click(button!)
      await new Promise((resolve) => setTimeout(resolve, 0))

      expect(button).toHaveAttribute('aria-haspopup', 'menu')
      expect(button).toHaveAttribute('aria-expanded', 'true')

      const customElementDrilldown = container.querySelector(
        "span[class$='-position']"
      )
      expect(customElementDrilldown).toBeInTheDocument()
      expect(customElementDrilldown).toHaveAttribute(
        'data-cid',
        expect.stringContaining('Drilldown')
      )

      const options = await findAllByRole('link')
      expect(options).toHaveLength(3)

      options.forEach((option) => {
        expect(option).toHaveAttribute(
          'id',
          expect.stringContaining('linkExampleOption')
        )
        expect(option).toBeVisible()
      })

      vi.useFakeTimers()
    })

    it('should throw warning about controlled Drilldown', () => {
      render(
        <TopNavBarItem
          id="item"
          renderSubmenu={
            <Drilldown rootPageId="root" onToggle={vi.fn()} show>
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

      expect(consoleWarningMock).toHaveBeenCalledWith(
        expect.stringContaining(expectedErrorMessage),
        expect.any(String)
      )
    })

    it('should throw warning when trigger is passed to Drilldown', () => {
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

      expect(consoleWarningMock).toHaveBeenCalledWith(
        expect.stringContaining(expectedErrorMessage),
        expect.any(String)
      )
    })

    it('should open on ArrowDown', async () => {
      // Use real timers for userEvent
      vi.useRealTimers()

      const { container, findAllByRole } = render(
        <TopNavBarItem id="item" renderSubmenu={itemSubmenuExample}>
          Menu Item
        </TopNavBarItem>
      )

      const customElementInitial = container.querySelector(
        "span[class$='-position']"
      )
      expect(customElementInitial).toBeInTheDocument()

      const button = container.querySelector(
        "[class$='inlineBlock-baseButton']"
      )

      expect(button).toHaveAttribute('aria-haspopup', 'menu')
      expect(button).toHaveAttribute('aria-expanded', 'false')

      await userEvent.type(button!, '{arrowdown}')
      await new Promise((resolve) => setTimeout(resolve, 0))

      expect(button).toHaveAttribute('aria-haspopup', 'menu')
      expect(button).toHaveAttribute('aria-expanded', 'true')

      const customElementDrilldown = container.querySelector(
        "span[class$='-position']"
      )
      expect(customElementDrilldown).toBeInTheDocument()
      expect(customElementDrilldown).toHaveAttribute(
        'data-cid',
        expect.stringContaining('Drilldown')
      )

      const options = await findAllByRole('link')
      expect(options).toHaveLength(3)

      options.forEach((option) => {
        expect(option).toHaveAttribute(
          'id',
          expect.stringContaining('linkExampleOption')
        )
        expect(option).toBeVisible()
      })

      vi.useFakeTimers()
    })
  })

  describe('customPopoverConfig prop', () => {
    it('should render popover', async () => {
      // Use real timers for userEvent
      vi.useRealTimers()

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

      await userEvent.click(button!)
      await new Promise((resolve) => setTimeout(resolve, 0))

      expect(button).toHaveAttribute('aria-haspopup', 'true')
      expect(button).toHaveAttribute('aria-expanded', 'true')

      const popoverContent = screen.getByText('dialog content')
      expect(popoverContent).toBeInTheDocument()

      vi.useFakeTimers()
    })

    it('should throw error when passed to item with submenu', () => {
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

      expect(consoleWarningMock).toHaveBeenCalledWith(
        expect.stringContaining(expectedErrorMessage),
        expect.any(String)
      )
    })

    it('should throw warning when no content is passed', () => {
      const { container } = render(
        <TopNavBarItem
          id="item"
          customPopoverConfig={getCustomPopoverConfig(false, {
            children: null
          })}
        >
          Menu Item
        </TopNavBarItem>
      )

      const customElementInitialPopover = container.querySelector(
        "span[class$='-position']"
      )

      expect(customElementInitialPopover).not.toBeInTheDocument()

      const expectedErrorMessage = `Warning: Pass the content of the custom Popover as "customPopoverConfig.children" for the item with id: "item".`

      expect(consoleWarningMock).toHaveBeenCalledWith(
        expect.stringContaining(expectedErrorMessage),
        expect.any(String)
      )
    })

    it('should throw warning when renderTrigger is passed in the config', () => {
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

      expect(consoleWarningMock).toHaveBeenCalledWith(
        expect.stringContaining(expectedErrorMessage),
        expect.any(String)
      )
    })

    describe('should not put aria-expanded on the popover trigger, just the button', () => {
      it('when popover `shouldContainFocus="true"`', async () => {
        // Use real timers for userEvent
        vi.useRealTimers()

        const { container } = render(
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

        const customElementInitial = container.querySelector(
          "span[class$='-position']"
        )
        expect(customElementInitial).toBeInTheDocument()

        const button = screen.getByRole('button')
        expect(button).toHaveAttribute('aria-haspopup', 'true')
        expect(button).toHaveAttribute('aria-expanded', 'false')

        const popoverTrigger = container.querySelector(
          "div[class$='submenuTriggerContainer']"
        )
        expect(popoverTrigger).toHaveAttribute('data-popover-trigger', 'true')
        expect(popoverTrigger).not.toHaveAttribute('aria-expanded')

        await userEvent.click(button!)
        await new Promise((resolve) => setTimeout(resolve, 0))

        expect(button).toHaveAttribute('aria-haspopup', 'true')
        expect(button).toHaveAttribute('aria-expanded', 'true')

        const customElementPopover = container.querySelector(
          "span[class$='-position']"
        )
        expect(customElementPopover).toBeInTheDocument()
        expect(customElementPopover).toHaveAttribute(
          'data-cid',
          expect.stringContaining('Popover')
        )

        const popoverTriggerActive = container.querySelector(
          "div[class$='submenuTriggerContainer']"
        )
        expect(popoverTriggerActive).not.toHaveAttribute('aria-expanded')

        const popoverContent = screen.getByText('dialog content')
        expect(popoverContent).toBeInTheDocument()

        vi.useFakeTimers()
      })

      it('when popover `shouldContainFocus="false"`', async () => {
        // Use real timers for userEvent
        vi.useRealTimers()

        const { container } = render(
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

        const customElementInitial = container.querySelector(
          "span[class$='-position']"
        )
        expect(customElementInitial).toBeInTheDocument()

        const button = screen.getByRole('button')
        expect(button).toHaveAttribute('aria-haspopup', 'true')
        expect(button).toHaveAttribute('aria-expanded', 'false')

        const popoverTrigger = container.querySelector(
          "div[class$='submenuTriggerContainer']"
        )
        expect(popoverTrigger).toHaveAttribute('data-popover-trigger', 'true')
        expect(popoverTrigger).not.toHaveAttribute('aria-expanded')

        await userEvent.click(button!)
        await new Promise((resolve) => setTimeout(resolve, 0))

        expect(button).toHaveAttribute('aria-haspopup', 'true')
        expect(button).toHaveAttribute('aria-expanded', 'true')

        const customElementPopover = container.querySelector(
          "span[class$='-position']"
        )
        expect(customElementPopover).toBeInTheDocument()
        expect(customElementPopover).toHaveAttribute(
          'data-cid',
          expect.stringContaining('Popover')
        )

        const popoverTriggerActive = container.querySelector(
          "div[class$='submenuTriggerContainer']"
        )
        expect(popoverTriggerActive).not.toHaveAttribute('aria-expanded')

        const popoverContent = screen.getByText('dialog content')
        expect(popoverContent).toBeInTheDocument()

        vi.useFakeTimers()
      })
    })

    it('should open on ArrowDown', async () => {
      // Use real timers for userEvent
      vi.useRealTimers()

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

      const popoverContentInitial = screen.queryByText('dialog content')
      expect(popoverContentInitial).not.toBeInTheDocument()

      const button = screen.getByRole('button')
      await userEvent.type(button!, '{arrowdown}')
      await new Promise((resolve) => setTimeout(resolve, 0))

      const popoverContentActive = screen.getByText('dialog content')
      expect(popoverContentActive).toBeInTheDocument()

      vi.useFakeTimers()
    })

    it('should work controlled too', async () => {
      // Use real timers for userEvent
      vi.useRealTimers()

      class ControlledExample extends Component {
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
      const popoverContentInitial = screen.queryByText('dialog content')
      const button = screen.getByRole('button')

      expect(popoverContentInitial).not.toBeInTheDocument()

      await userEvent.type(button!, '{arrowdown}')
      await new Promise((resolve) => setTimeout(resolve, 0))

      const popoverContentActive = screen.getByText('dialog content')
      expect(popoverContentActive).toBeInTheDocument()

      await userEvent.click(button!)
      await new Promise((resolve) => setTimeout(resolve, 100))

      const popoverContentInactive = screen.queryByText('dialog content')
      expect(popoverContentInactive).not.toBeInTheDocument()

      vi.useFakeTimers()
    })
  })

  describe('showSubmenuChevron prop', () => {
    it('should not show when no submenu or popover', () => {
      const { container } = render(
        <TopNavBarItem id="item">Menu Item</TopNavBarItem>
      )

      const chevron = container.querySelector("svg[class$='inlineSVG-svgIcon']")
      expect(chevron).not.toBeInTheDocument()
    })

    describe('when true (by default), should show chevron icon', () => {
      it('next to items with submenu', async () => {
        // Use real timers for userEvent
        vi.useRealTimers()

        const { container } = render(
          <TopNavBarItem id="item" renderSubmenu={itemSubmenuExample}>
            Menu Item
          </TopNavBarItem>
        )
        const button = screen.getByRole('button')

        const chevronClosed = container.querySelector(
          'svg[name="IconArrowOpenDown"]'
        )
        expect(chevronClosed).toBeVisible()

        await userEvent.click(button!)
        await new Promise((resolve) => setTimeout(resolve, 0))

        const chevronOpen = container.querySelector(
          'svg[name="IconArrowOpenUp"]'
        )
        expect(chevronOpen).toBeVisible()

        vi.useFakeTimers()
      })

      it('next to items with custom popover', async () => {
        // Use real timers for userEvent
        vi.useRealTimers()

        const { container } = render(
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

        const chevronClosed = container.querySelector(
          'svg[name="IconArrowOpenDown"]'
        )
        expect(chevronClosed).toBeVisible()

        await userEvent.click(button!)
        await new Promise((resolve) => setTimeout(resolve, 0))

        const chevronOpen = container.querySelector(
          'svg[name="IconArrowOpenUp"]'
        )
        expect(chevronOpen).toBeVisible()

        vi.useFakeTimers()
      })

      describe('should show for all variants:', () => {
        variants.forEach((variant) => {
          it(`with "${variant}" variant`, async () => {
            // Use real timers for userEvent
            vi.useRealTimers()

            const { container } = render(
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

            const chevronClosed = container.querySelector(
              'svg[name="IconArrowOpenDown"]'
            )
            expect(chevronClosed).toBeVisible()

            await userEvent.click(button!)
            await new Promise((resolve) => setTimeout(resolve, 0))

            const chevronOpen = container.querySelector(
              'svg[name="IconArrowOpenUp"]'
            )
            expect(chevronOpen).toBeVisible()

            vi.useFakeTimers()
          })
        })
      })
    })

    describe('when false, should not show chevron icon', () => {
      it('next to items with submenu', async () => {
        // Use real timers for userEvent
        vi.useRealTimers()

        const { container } = render(
          <TopNavBarItem
            id="item"
            renderSubmenu={itemSubmenuExample}
            showSubmenuChevron={false}
          >
            Menu Item
          </TopNavBarItem>
        )
        const button = screen.getByRole('button')

        const chevron = container.querySelector(
          "svg[class$='inlineSVG-svgIcon']"
        )
        expect(chevron).not.toBeInTheDocument()

        await userEvent.click(button!)
        await new Promise((resolve) => setTimeout(resolve, 0))

        const chevronAfterClick = container.querySelector(
          "svg[class$='inlineSVG-svgIcon']"
        )
        expect(chevronAfterClick).not.toBeInTheDocument()

        vi.useFakeTimers()
      })

      it('next to items with custom popover', async () => {
        // Use real timers for userEvent
        vi.useRealTimers()

        const { container } = render(
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
        const button = screen.getByRole('button')

        const chevron = container.querySelector(
          "svg[class$='inlineSVG-svgIcon']"
        )
        expect(chevron).not.toBeInTheDocument()

        await userEvent.click(button!)
        await new Promise((resolve) => setTimeout(resolve, 0))

        const chevronAfterClick = container.querySelector(
          "svg[class$='inlineSVG-svgIcon']"
        )
        expect(chevronAfterClick).not.toBeInTheDocument()

        vi.useFakeTimers()
      })

      describe('should show for all variants:', () => {
        variants.forEach((variant) => {
          it(`with "${variant}" variant`, async () => {
            // Use real timers for userEvent
            vi.useRealTimers()

            const { container } = render(
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
            const button = screen.getByRole('button')

            const chevronClosed = container.querySelector(
              'svg[name="IconArrowOpenDown"]'
            )
            expect(chevronClosed).not.toBeInTheDocument()

            await userEvent.click(button!)
            await new Promise((resolve) => setTimeout(resolve, 0))

            const chevronOpen = container.querySelector(
              'svg[name="IconArrowOpenUp"]'
            )
            expect(chevronOpen).not.toBeInTheDocument()

            vi.useFakeTimers()
          })
        })
      })
    })
  })

  describe('tooltip prop', () => {
    describe('should render tooltip', () => {
      it('with string value', () => {
        render(
          <TopNavBarItem id="item" tooltip="Tooltip content">
            Menu Item
          </TopNavBarItem>
        )
        const tooltip = screen.getByRole('tooltip')

        expect(tooltip).toHaveTextContent('Tooltip content')
      })

      it('with config value', () => {
        render(
          <TopNavBarItem
            id="item"
            tooltip={{
              renderTip: 'Tooltip config content'
            }}
          >
            Menu Item
          </TopNavBarItem>
        )
        const tooltip = screen.getByRole('tooltip')

        expect(tooltip).toHaveTextContent('Tooltip config content')
      })
    })

    it('should be able to render with submenu too', () => {
      const { container } = render(
        <TopNavBarItem
          id="item"
          tooltip="Tooltip content"
          renderSubmenu={itemSubmenuExample}
        >
          Menu Item
        </TopNavBarItem>
      )

      const ariaExpandedElements = container.querySelectorAll(
        '[aria-expanded="true"], [aria-expanded="false"]'
      )

      // the only aria-expanded item should be the BaseButton element
      expect(ariaExpandedElements).toHaveLength(1)
      expect(ariaExpandedElements[0].tagName).toBe('BUTTON')

      const tooltip = screen.getByRole('tooltip')
      expect(tooltip).toBeInTheDocument()
      expect(tooltip).toHaveTextContent('Tooltip content')

      const submenu = container.querySelector(
        "[class$='submenuTriggerContainer']"
      )
      expect(submenu).toBeInTheDocument()
      expect(submenu).toHaveAttribute('aria-haspopup', 'menu')
    })

    it('should be able to render with custom popover too', () => {
      const { container } = render(
        <TopNavBarItem
          id="item"
          tooltip="Tooltip content"
          customPopoverConfig={getCustomPopoverConfig()}
        >
          Menu Item
        </TopNavBarItem>
      )
      const ariaExpandedElements = container.querySelectorAll(
        '[aria-expanded="true"], [aria-expanded="false"]'
      )

      // the only aria-expanded item should be the BaseButton element
      expect(ariaExpandedElements).toHaveLength(1)
      expect(ariaExpandedElements[0].tagName).toBe('BUTTON')

      const tooltip = screen.getByRole('tooltip')
      expect(tooltip).toBeInTheDocument()
      expect(tooltip).toHaveTextContent('Tooltip content')

      const customElementInitial = container.querySelector(
        "span[class$='-position']"
      )
      expect(customElementInitial).toBeInTheDocument()
      expect(customElementInitial).toHaveAttribute(
        'data-position',
        expect.stringContaining('Popover')
      )

      const customPopoverContent = screen.getByText('dialog content')
      expect(customPopoverContent).toBeInTheDocument()
    })

    // TODO convert to e2e
    // it('should have "primary-inverse" color by default', async () => {
    //   render(
    //     <TopNavBarItem id="item" tooltip="Tooltip content">
    //       Menu Item
    //     </TopNavBarItem>
    //   )

    //   const tooltip = screen.getByRole('tooltip')
    //   screen.debug(tooltip)
    //   const customPopoverContent = screen.getByText('Tooltip content')

    //   //expect(getComputedStyle(customPopoverContent!.firstChild).backgroundColor).toBe('rgb(255, 255, 255)')
    // })

    // it('should have "primary" color in "inverseColor" mode', async () => {
    //   await mount(
    //     <SmallViewportModeWrapper layout="desktop" inverseColor>
    //       <TopNavBarItem id="item" tooltip="Tooltip content">
    //         console.log('tooltip', JSON.stringify(tooltip, null, 2))
    //         Menu Item
    //       </TopNavBarItem>
    //     </SmallViewportModeWrapper>
    //   )

    //   const component = await TopNavBarItemLocator.find()
    //   const tooltip = await component.findTooltip()
    //   const tooltipContent = await tooltip.findContent()

    //   expect(
    //     getComputedStyle(tooltipContent.getDOMNode().childNodes[0])
    //       .backgroundColor
    //   ).to.equal('rgb(39, 53, 64)')
    // })
  })

  describe('renderAvatar prop', () => {
    it('displays avatar', () => {
      const { container } = render(
        <TopNavBarItem
          id="item"
          renderAvatar={{ ...avatarExample, avatarName: 'User Name' }}
        >
          Menu Item
        </TopNavBarItem>
      )
      const button = screen.getByRole('button')
      const avatar = container.querySelector(
        "span[class$='inlineBlock-avatar']"
      )

      expect(avatar).toBeVisible()
      expect(avatar).toHaveAttribute('name', 'User Name')
      expect(avatar).toHaveAttribute('alt', 'Menu Item')
      expect(avatar).toHaveAttribute('aria-label', 'Menu Item')
      expect(avatar).toHaveTextContent('UN')

      expect(button).toHaveTextContent('Menu Item')
    })

    it('display only the avatar in "avatar" variant', () => {
      const { container } = render(
        <TopNavBarItem
          id="item"
          variant="avatar"
          renderAvatar={{ ...avatarExample, avatarName: 'User Name' }}
        >
          Menu Item
        </TopNavBarItem>
      )
      const button = screen.getByRole('button')
      const avatar = container.querySelector(
        "span[class$='inlineBlock-avatar']"
      )

      expect(avatar).toBeVisible()
      expect(avatar).toHaveAttribute('name', 'User Name')
      expect(avatar).toHaveAttribute('alt', 'Menu Item')
      expect(avatar).toHaveAttribute('aria-label', 'Menu Item')
      expect(avatar).toHaveTextContent('UN')

      expect(button).not.toHaveTextContent('Menu Item')
    })

    describe('throws warning', () => {
      it('when not passed to "avatar" variant', () => {
        const { container } = render(
          <TopNavBarItem id="item" variant="avatar">
            Menu Item
          </TopNavBarItem>
        )

        const avatar = container.querySelector(
          "span[class$='inlineBlock-avatar']"
        )
        expect(avatar).not.toBeInTheDocument()

        const expectedErrorMessage = `Warning: The "renderAvatar" config is required for the 'variant="avatar"' type <TopNavBar.Item> components, but received none for the item with id "item".`

        expect(consoleWarningMock).toHaveBeenCalledWith(
          expect.stringContaining(expectedErrorMessage),
          expect.any(String)
        )
      })

      it('when passed to item with "renderIcon"', () => {
        const { container } = render(
          <TopNavBarItem
            id="item"
            renderIcon={IconSearchLine}
            renderAvatar={avatarExample}
          >
            Menu Item
          </TopNavBarItem>
        )

        const avatar = container.querySelector(
          "span[class$='inlineBlock-avatar']"
        )
        expect(avatar).not.toBeInTheDocument()

        const expectedErrorMessage = `Warning: <TopNavBar.Item> components with icons cannot display avatars, so the "renderAvatar" config prop will be ignored for item with id "item".`

        expect(consoleWarningMock).toHaveBeenCalledWith(
          expect.stringContaining(expectedErrorMessage),
          expect.any(String)
        )
      })

      it('when passed to item with "active" status', () => {
        const { container } = render(
          <TopNavBarItem id="item" renderAvatar={avatarExample} status="active">
            Menu Item
          </TopNavBarItem>
        )

        const avatar = container.querySelector(
          "span[class$='inlineBlock-avatar']"
        )
        expect(avatar).toBeInTheDocument()

        const expectedErrorMessage = `Warning: <TopNavBar.Item> components with avatar cannot have "active" status, so the "active" status on the item with id "item" will be ignored.`

        expect(consoleWarningMock).toHaveBeenCalledWith(
          expect.stringContaining(expectedErrorMessage),
          expect.any(String)
        )

        // TODO convert to e2e
        // topNavBarItem__container ::after
        // const activeIndicatorStyle = await component.getActiveIndicatorStyle()
        // expect(activeIndicatorStyle?.backgroundColor).to.equal(
        //     'rgba(0, 0, 0, 0)'
        // )
      })

      it('when there is no string type "children" or "avatarAlt" passed', () => {
        const { container } = render(
          <TopNavBarItem
            id="item"
            renderAvatar={{ ...avatarExample, avatarAlt: undefined }}
          >
            <div>avatar</div>
          </TopNavBarItem>
        )

        const avatar = container.querySelector(
          "span[class$='inlineBlock-avatar']"
        )
        expect(avatar).toBeInTheDocument()

        const expectedErrorMessage = `Warning: Please supply a label for the avatar with either the "renderAvatar.avatarAlt" or the "children" (as string) prop. It is needed for screen reader support, but missing on the item with the id: "item".`

        expect(consoleWarningMock).toHaveBeenCalledWith(
          expect.stringContaining(expectedErrorMessage),
          expect.any(String)
        )
      })
    })
  })

  describe('renderIcon prop', () => {
    describe('should render icon', () => {
      it('for default variant', () => {
        const { container } = render(
          <TopNavBarItem id="item" renderIcon={IconSearchLine}>
            Menu Item
          </TopNavBarItem>
        )

        const icon = container.querySelector("svg[class$='inlineSVG-svgIcon']")

        expect(icon).toBeVisible()
        expect(icon).toHaveAttribute('name', 'IconSearch')
        // TODO convert to e2e
        // expect(window.getComputedStyle(icon!).fill).toEqual('rgb(255, 255, 255)')

        const button = screen.getByRole('button')
        expect(button).toHaveTextContent('Menu Item')
        // expect(window.getComputedStyle(button).color).toEqual('rgb(255, 255, 255)')
      })

      it('for button variant', () => {
        const { container } = render(
          <TopNavBarItem id="item" variant="button" renderIcon={IconSearchLine}>
            Menu Item
          </TopNavBarItem>
        )
        const icon = container.querySelector("svg[class$='inlineSVG-svgIcon']")

        expect(icon).toBeVisible()
        expect(icon).toHaveAttribute('name', 'IconSearch')
        // TODO convert to e2e
        // expect(window.getComputedStyle(icon!).fill).toEqual('rgb(39, 53, 64)')

        const button = screen.getByRole('button')
        expect(button).toHaveTextContent('Menu Item')
        expect(window.getComputedStyle(button).color).toEqual('rgb(39, 53, 64)')
      })
    })

    describe('should render icon in inverse mode', () => {
      it('for default variant', () => {
        const { container } = render(
          <SmallViewportModeWrapper layout="desktop" inverseColor>
            <TopNavBarItem id="item" renderIcon={IconSearchLine}>
              Menu Item
            </TopNavBarItem>
          </SmallViewportModeWrapper>
        )
        const icon = container.querySelector("svg[class$='inlineSVG-svgIcon']")

        expect(icon).toBeVisible()
        expect(icon).toHaveAttribute('name', 'IconSearch')
        // TODO convert to e2e
        // expect(window.getComputedStyle(icon!).fill).toEqual('rgb(39, 53, 64)')

        const button = screen.getByRole('button')
        expect(button).toHaveTextContent('Menu Item')
        expect(window.getComputedStyle(button).color).toEqual('rgb(39, 53, 64)')
      })

      it('for button variant', () => {
        const { container } = render(
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

        const icon = container.querySelector("svg[class$='inlineSVG-svgIcon']")

        expect(icon).toBeVisible()
        expect(icon).toHaveAttribute('name', 'IconSearch')
        // TODO convert to e2e
        // expect(window.getComputedStyle(icon!).fill).toEqual('rgb(255, 255, 255)')

        const button = screen.getByRole('button')
        expect(button).toHaveTextContent('Menu Item')
        // expect(window.getComputedStyle(button!).color).toEqual('rgb(255, 255, 255)')
      })
    })
  })

  describe('as prop', () => {
    it('should render item as a', () => {
      const { container } = render(
        <TopNavBarItem id="item" as="a">
          Menu Item
        </TopNavBarItem>
      )
      const button = container.querySelector(
        "[class$='inlineBlock-baseButton']"
      )

      expect(button!.tagName).toBe('A')
      expect(button).not.toHaveAttribute('href')
    })
  })

  describe('href prop', () => {
    it('should render item as link', () => {
      const { container } = render(
        <TopNavBarItem id="item" href="/#TopNavBar">
          Menu Item
        </TopNavBarItem>
      )

      const button = container.querySelector(
        "[class$='inlineBlock-baseButton']"
      )

      expect(button!.tagName).toBe('A')
      expect(button).toHaveAttribute('href', '/#TopNavBar')
    })

    it('should not be allowed for items with submenu', () => {
      const { container } = render(
        <TopNavBarItem
          id="item"
          href="/#TopNavBar"
          renderSubmenu={itemSubmenuExample}
        >
          Menu Item
        </TopNavBarItem>
      )

      const button = container.querySelector(
        "[class$='inlineBlock-baseButton']"
      )
      expect(button!.tagName).toBe('BUTTON')
      expect(button).not.toHaveAttribute('href')

      const expectedErrorMessage = `Warning: TopNavBar.Items with submenus are not allowed to have 'href' property, but received href "/#TopNavBar" for item with the id: "item".`

      expect(consoleWarningMock).toHaveBeenCalledWith(
        expect.stringContaining(expectedErrorMessage),
        expect.any(String)
      )
    })
  })

  describe('onClick prop', () => {
    it('should render item as button', () => {
      render(
        <TopNavBarItem id="item" onClick={vi.fn()}>
          Menu Item
        </TopNavBarItem>
      )
      const button = screen.getByRole('button')

      expect(button).toBeInTheDocument()
      expect(button!.tagName).toBe('BUTTON')
    })

    it('should fire onClick on click', () => {
      const onClick = vi.fn()
      render(
        <TopNavBarItem id="item" onClick={onClick}>
          Menu Item
        </TopNavBarItem>
      )
      const button = screen.getByRole('button')

      fireEvent.click(button!)

      expect(onClick).toHaveBeenCalled()
    })

    it('should work combined with "href" prop', () => {
      const onClick = vi.fn()
      const { container } = render(
        <TopNavBarItem id="item" onClick={onClick} href="/#TopNavBar">
          Menu Item
        </TopNavBarItem>
      )
      const button = container.querySelector(
        "[class$='inlineBlock-baseButton']"
      )

      expect(button!.tagName).toBe('A')
      expect(button).toHaveAttribute('href', '/#TopNavBar')
    })

    it('should not be allowed for items with submenu', () => {
      const onClick = vi.fn()

      render(
        <TopNavBarItem
          id="item"
          onClick={onClick}
          renderSubmenu={itemSubmenuExample}
        >
          Menu Item
        </TopNavBarItem>
      )
      const button = screen.getByRole('button')

      fireEvent.click(button!)
      expect(onClick).not.toHaveBeenCalled()

      const expectedErrorMessage = `Warning: TopNavBar.Items with submenus are not allowed to have 'onClick' property, but received onClick for item with the id: "item".Use the \`onSubmenuToggle\` prop instead. OnClick:`

      expect(consoleWarningMock).toHaveBeenCalledWith(
        expect.stringContaining(expectedErrorMessage),
        expect.any(String)
      )
    })
  })

  describe('onSubmenuToggle prop', () => {
    it('should be called on submenu toggle', () => {
      const onSubmenuToggle = vi.fn()

      render(
        <TopNavBarItem
          id="item"
          onSubmenuToggle={onSubmenuToggle}
          renderSubmenu={itemSubmenuExample}
        >
          Menu Item
        </TopNavBarItem>
      )
      const button = screen.getByRole('button')

      fireEvent.click(button!)

      expect(onSubmenuToggle).toHaveBeenLastCalledWith(
        expect.anything(), // First argument is the event object
        expect.objectContaining({ shown: true })
      )

      fireEvent.click(button!)

      expect(onSubmenuToggle).toHaveBeenLastCalledWith(
        expect.anything(), // First argument is the event object
        expect.objectContaining({ shown: false })
      )
    })
  })

  describe('other event handlers', () => {
    it('onMouseOver and onMouseOut should be called', () => {
      const onMouseOver = vi.fn()
      const onMouseOut = vi.fn()

      render(
        <TopNavBarItem
          id="item"
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
        >
          Menu Item
        </TopNavBarItem>
      )
      const button = screen.getByRole('button')

      fireEvent.mouseOver(button)
      expect(onMouseOver).toHaveBeenCalled()

      fireEvent.mouseOut(button)
      expect(onMouseOut).toHaveBeenCalled()
    })

    it('onFocus and onBlur should be called', () => {
      const onFocus = vi.fn()
      const onBlur = vi.fn()

      render(
        <TopNavBarItem id="item" onFocus={onFocus} onBlur={onBlur}>
          Menu Item
        </TopNavBarItem>
      )
      const button = screen.getByRole('button')

      fireEvent.focus(button)
      expect(onFocus).toHaveBeenCalled()

      fireEvent.blur(button)
      expect(onBlur).toHaveBeenCalled()
    })

    it('onKeyDown and onKeyUp should be called', () => {
      const onKeyDown = vi.fn()
      const onKeyUp = vi.fn()

      render(
        <TopNavBarItem id="item" onKeyDown={onKeyDown} onKeyUp={onKeyUp}>
          Menu Item
        </TopNavBarItem>
      )
      const button = screen.getByRole('button')

      fireEvent.keyDown(button, { key: 'ArrowLeft' })
      expect(onKeyDown).toHaveBeenCalled()

      fireEvent.keyUp(button, { key: 'ArrowLeft' })
      expect(onKeyUp).toHaveBeenCalled()
    })
  })

  describe('refs', () => {
    it('elementRef should return root element', () => {
      const elementRef = vi.fn()
      const { container } = render(
        <TopNavBarItem id="item" elementRef={elementRef}>
          Menu Item
        </TopNavBarItem>
      )
      const topNavBarItem = container.querySelector("[class$='topNavBarItem']")

      expect(elementRef).toHaveBeenCalledWith(topNavBarItem!)
    })

    it('itemRef should return the button element', () => {
      const itemRef = vi.fn()
      render(
        <TopNavBarItem id="item" itemRef={itemRef}>
          Menu Item
        </TopNavBarItem>
      )
      const button = screen.getByRole('button')

      expect(itemRef).toHaveBeenCalledWith(button!)
    })
  })

  describe('should be accessible', () => {
    it('a11y', async () => {
      // Use real timers for axe check
      vi.useRealTimers()

      const { container } = render(
        <TopNavBarItem id="item">Menu Item</TopNavBarItem>
      )
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)

      vi.useFakeTimers()
    })
  })
})
