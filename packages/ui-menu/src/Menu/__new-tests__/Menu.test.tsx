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
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { Popover } from '@instructure/ui-popover'
import { Menu, MenuItem, MenuItemSeparator } from '../index'


describe('<Menu />', () => {
  describe('without a trigger', () => {
    it('should render', async () => {
      render(
        <Menu label="Menu-label-text">
          <MenuItem>Menu Item Text</MenuItem>
        </Menu>
      )
      const menu = screen.getByRole('menu')

      expect(menu).toBeInTheDocument()
      expect(menu).toHaveTextContent('Menu Item Text')
      expect(menu).toHaveAttribute('aria-label', 'Menu-label-text')
    })

    it('should meet a11y standards', async () => {
      const { container } = render(
        <Menu label="Menu-label-text">
          <MenuItem>Menu Item Text</MenuItem>
        </Menu>
      )

      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })

    it('should call onSelect when menu item is selected', async () => {
      const onSelect = jest.fn()

      const { getByText } = render(
        <Menu label="Settings" onSelect={onSelect}>
          <MenuItem value="Test">Test Item</MenuItem>
        </Menu>
      )
      const item = getByText('Test Item')

      await userEvent.click(item)

      expect(onSelect).toHaveBeenCalled()
      expect(onSelect.mock.calls[0][1]).toEqual('Test')
    })

    it('should not call onSelect when disabled', () => {
      const onSelect = jest.fn()

      const { getByText } = render(
        <Menu label="Settings" onSelect={onSelect} disabled>
          <MenuItem value="Account">Account</MenuItem>
        </Menu>
      )
      const item = getByText('Account')

      userEvent.click(item)

      expect(onSelect).not.toHaveBeenCalled()
    })

    // TODO test it with cypress
    // it('should move focus properly', async () => {
    //   await mount(
    //     <Menu label="Settings">
    //       <MenuItem value="Account">Account</MenuItem>
    //     </Menu>
    //   )

    //   const menu = await MenuLocator.find(':label(Settings)')
    //   const items = await menu.findAllItems()

    //   await menu.keyDown('up')

    //   expect(items[items.length - 1].containsFocus()).to.be.true()

    //   await menu.keyDown('down')

    //   expect(items[0].containsFocus()).to.be.true()
    // })

    it('should provide a menu ref', () => {
      const menuRef = jest.fn()

      render(
        <Menu label="Settings" menuRef={menuRef}>
          <MenuItem value="Account">Account</MenuItem>
        </Menu>
      )
      const menu = screen.getByRole('menu')

      expect(menuRef).toHaveBeenLastCalledWith(menu)
    })

    it('should set aria attributes properly', async () => {
      render(
        <Menu disabled label="Settings">
          <MenuItem value="Account">Account</MenuItem>
        </Menu>
      )
      const menu = screen.getByRole('menu')

      expect(menu).toHaveAttribute('aria-disabled', 'true')
      expect(menu).toHaveAttribute('aria-label', 'Settings')
    })
  })

  describe('with a trigger', () => {
    it('should render into a mountNode', () => {
      const mountNode = document.createElement('div')

      document.body.appendChild(mountNode)

      render(
        <Menu
          defaultShow
          mountNode={mountNode}
          label="Settings"
          trigger={<button>Settings</button>}
        >
          <MenuItem>Account</MenuItem>
        </Menu>
      )

      expect(mountNode).toHaveTextContent('Account')

      document.body.removeChild(mountNode)
    })

    it('should set aria attributes properly', () => {
      render(
        <Menu trigger={<button>Settings</button>} defaultShow>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
          <MenuItem type="radio" defaultChecked>
            Default (Grid view)
          </MenuItem>
          <MenuItem type="radio">Individual (List view)</MenuItem>
          <MenuItem type="checkbox" defaultChecked>
            Include Anchor Standards
          </MenuItem>
          <MenuItemSeparator />
          <MenuItem>Open grading history...</MenuItem>
        </Menu>
      )
      const menu = screen.getByRole('menu')
      const trigger = screen.getByRole('button', { name: 'Settings' })

      expect(menu).toBeInTheDocument()
      expect(menu).toHaveAttribute('aria-labelledby', trigger.getAttribute('id'))
    })

    it('should call onFocus on focus', () => {
      const onFocus = jest.fn()

      const { getByRole } = render(
        <Menu trigger={<button>More</button>} onFocus={onFocus}>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )
      const triggerButton = getByRole('button', { name: 'More' })

      fireEvent.focus(triggerButton)
  
      expect(onFocus).toHaveBeenCalled()
    })

    it('should render when show and onToggle props are set', () => {
      const { getByRole, getAllByRole, queryByText } = render(
        <Menu trigger={<button>More</button>} show onToggle={() => {}}>
          <MenuItem>Test1</MenuItem>
          <MenuItem disabled>Test2</MenuItem>
        </Menu>
      )
      const menuItems = getAllByRole('menuitem')
      const triggerButton = getByRole('button', { name: 'More' })

      const menuItem1 = queryByText('Test1')
      const menuItem2 = queryByText('Test2')

      expect(triggerButton).toBeInTheDocument()
      expect(menuItems).toHaveLength(2)
      expect(menuItem1).toBeInTheDocument()
      expect(menuItem2).toBeInTheDocument()
    })

    it('should not show by default', () => {
      const { queryByText, getByRole } = render(
        <Menu trigger={<button>More</button>}>
          <MenuItem>Test1</MenuItem>
          <MenuItem disabled>Test2</MenuItem>
        </Menu>
      )
      const triggerButton = getByRole('button', { name: 'More' })

      const menuItem1 = queryByText('Test1')
      const menuItem2 = queryByText('Test2')

      expect(triggerButton).toBeInTheDocument()
      expect(menuItem1).not.toBeInTheDocument()
      expect(menuItem2).not.toBeInTheDocument()
    })

    it('should accept a default show', () => {
      const { queryByText, getByRole } = render(
        <Menu trigger={<button>More</button>} defaultShow>
          <MenuItem>Test1</MenuItem>
          <MenuItem disabled>Test2</MenuItem>
        </Menu>
      )
      const triggerButton = getByRole('button', { name: 'More' })

      const menuItem1 = queryByText('Test1')
      const menuItem2 = queryByText('Test2')

      expect(triggerButton).toBeInTheDocument()
       expect(menuItem1).toBeInTheDocument()
      expect(menuItem2).toBeInTheDocument()
    })

    it('should provide a menu ref', () => {
      const menuRef = jest.fn()

      render(
        <Menu trigger={<button>More</button>} defaultShow menuRef={menuRef}>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )
      const menu = screen.getByRole('menu')

      expect(menuRef).toHaveBeenCalledWith(menu)
    })

    it('should provide a popoverRef ref', () => {
      const popoverRef = jest.fn()

      render(
        <Menu
          trigger={<button>More</button>}
          defaultShow
          popoverRef={popoverRef}
        >
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )

      expect(popoverRef).toHaveBeenCalled()
    })

    // TODO test it with Cypress
    // it('should focus the menu first', async () => {
    //   await mount(
    //     <Menu trigger={<button>More</button>} defaultShow>
    //       <MenuItem>Learning Mastery</MenuItem>
    //       <MenuItem disabled>Gradebook</MenuItem>
    //     </Menu>
    //   )

    //   const subject = await MenuLocator.find(':label(More)')
    //   const popover = await subject.findPopoverContent()
    //   const menu = await popover.find(`[role="menu"]`)

    //   await wait(() => {
    //     expect(menu.focused()).to.be.true()
    //     expect(menu.getAttribute('tabIndex')).to.equal('0')
    //   })

    //   await menu.keyDown('down')

    //   await wait(() => {
    //     expect(menu.focused()).to.be.false()
    //     expect(menu.getAttribute('tabIndex')).to.equal('0')
    //   })
    // })

  // TODO TEST IT WITH CYPRESS
  //   it('should apply offset values to Popover', async () => {
  //     const getTransforms = (transform: string) => {
  //       const transformValues = new DOMMatrixReadOnly(transform)
  //       return {
  //         transformX: Math.floor(transformValues.m41),
  //         transformY: Math.floor(transformValues.m42)
  //       }
  //     }
  //     await mount(
  //       <Menu trigger={<button>More</button>} defaultShow>
  //         <MenuItem>Learning Mastery</MenuItem>
  //         <MenuItem disabled>Gradebook</MenuItem>
  //       </Menu>
  //     )

  //     const subject = await MenuLocator.find(':label(More)')
  //     const popover = await subject.findPopoverContent()

  //     // offset props influence the transform CSS prop of the Popover
  //     const defaultTransform = getComputedStyle(popover.getDOMNode()).transform
  //     const { transformX: defaultTransformX, transformY: defaultTransformY } =
  //       getTransforms(defaultTransform)

  //     await unmount()

  //     await mount(
  //       <Menu
  //         trigger={<button>More</button>}
  //         defaultShow
  //         offsetX={-10}
  //         offsetY="30px"
  //       >
  //         <MenuItem>Learning Mastery</MenuItem>
  //         <MenuItem disabled>Gradebook</MenuItem>
  //       </Menu>
  //     )

  //     const subject2 = await MenuLocator.find(':label(More)')
  //     const popover2 = await subject2.findPopoverContent()

  //     const newTransform = getComputedStyle(popover2.getDOMNode()).transform
  //     const { transformX: newTransformX, transformY: newTransformY } =
  //       getTransforms(newTransform)

  //     expect(newTransformX).to.equal(defaultTransformX + 10)
  //     expect(newTransformY).to.equal(defaultTransformY + 30)
  //   })

    it('should call onToggle on click', () => {
      const onToggle = jest.fn()

      render(
        <Menu trigger={<button>More</button>} onToggle={onToggle}>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )
      const trigger = screen.getByRole('button')

      fireEvent.click(trigger)

      expect(onToggle).toHaveBeenCalled()
    })

    it('should have an aria-haspopup attribute', () => {
      render(
        <Menu trigger={<button>More</button>}>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )
      const trigger = screen.getByRole('button')

      expect(trigger).toHaveAttribute('aria-haspopup')
    })

    it('should pass positionContainerDisplay prop to Popover', () => {
      let popoverRef: Popover | null = null
      render(
        <Menu
          trigger={<button>More</button>}
          popoverRef={(e) => {
            popoverRef = e
          }}
          positionContainerDisplay="block"
        >
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )

      const popoverProps = popoverRef!.props

      expect(popoverProps.positionContainerDisplay).toBe('block')
    })

    describe('for a11y', () => {
      // TODO find solution
      // Unable to perform pointer interaction as the element inherits `pointer-events: none`
      it('should meet standards when menu is closed', async () => {
        const { container } = render(
          <div data-testid="menu">
            <Menu trigger={<button>More</button>}>
              <MenuItem>Item-1</MenuItem>
              <MenuItem>Item-2</MenuItem>
            </Menu>
          </div>
        )
      //   const axeCheck = await runAxeCheck(container)
      //   expect(axeCheck).toBe(true)



        // const menu = screen.getByTestId('menu')
        
        await act(async () => {
          await screen.getByRole('button').click()
        })
        await waitFor(async() => {
          expect(screen.getByText('Item-1')).toBeInTheDocument()
          screen.debug(document.body)

          const axeCheck = await runAxeCheck(container)
          expect(axeCheck).toBe(true)
        })
      })

      // it('should meet standards when menu is open', async () => {
      //   const { container } = render(
      //     <Menu trigger={<button>More</button>} defaultShow>
      //       <MenuItem>Learning Mastery</MenuItem>
      //       <MenuItem disabled>Gradebook</MenuItem>
      //     </Menu>
      //   )
      //   const axeCheck = await runAxeCheck(container)

      //   expect(axeCheck).toBe(true)
      // })
    })
  })

  describe('with a sub-menu', () => {
  // TODO try it with Cypress
    // const testShowFlyoutOnEvent = (event: { type: string; which?: string }) => {
    //   it(`should show flyout menu on ${event.type} ${event.which || ''}`, async () => {
    //     render(
    //       <Menu label="Parent">
    //         <Menu label="Flyout">
    //           <MenuItem>Flyout Menu Item</MenuItem>
    //           <MenuItem>Bar</MenuItem>
    //           <MenuItem>Baz</MenuItem>
    //         </Menu>
    //       </Menu>
    //     )
    //     const flyoutTrigger = screen.getByText('Flyout')
    
    //     act(() => {
    //       if (event.which) {
    //         (fireEvent as any)[event.type](flyoutTrigger, { key: event.which })
    //       } else {
    //         (fireEvent as any)[event.type](flyoutTrigger)
    //       }
    //     })

    //     const flyoutItem = screen.getByText('Bar')
    //     await waitFor(() => {
    //       expect(flyoutItem).toBeInTheDocument()
    //     })

    //   })
    // }

    describe('...and keyboard and mouse interaction', () => {
      // testShowFlyoutOnEvent({ type: 'click' })
      // testShowFlyoutOnEvent({ type: 'mouseOver' })
      // testShowFlyoutOnEvent({ type: 'keyDown', which: 'right' })
      // testShowFlyoutOnEvent({ type: 'keyUp', which: 'space' })
      // testShowFlyoutOnEvent({ type: 'keyDown', which: 'enter' })

      // testFocusFlyoutOnEvent({ type: 'click' })
      // testFocusFlyoutOnEvent({ type: 'keyDown', which: 'right' })
      // testFocusFlyoutOnEvent({ type: 'keyUp', which: 'space' })
      // testFocusFlyoutOnEvent({ type: 'keyDown', which: 'enter' })
    })

  //   it('it should not open the sub-menu popover when disabled', async () => {
  //     await mount(
  //       <Menu label="Parent" disabled>
  //         <Menu label="Flyout">
  //           <MenuItem>Foo</MenuItem>
  //           <MenuItem>Bar</MenuItem>
  //           <MenuItem>Baz</MenuItem>
  //         </Menu>
  //       </Menu>
  //     )

  //     const menu = await MenuLocator.find(':label(Parent)')
  //     const trigger = await menu.findItem(':label(Flyout)')

  //     await trigger.click(undefined, { clickable: false })

  //     const subMenu = await MenuLocator.find(':label(Flyout)')
  //     const popover = await subMenu.findPopoverContent({ expectEmpty: true })

  //     expect(popover).to.not.exist()
  //   })

  //   it('it should close the sub-menu popover on escape press', async () => {
  //     await mount(
  //       <Menu label="Parent">
  //         <Menu label="Flyout">
  //           <MenuItem>Foo</MenuItem>
  //           <MenuItem>Bar</MenuItem>
  //           <MenuItem>Baz</MenuItem>
  //         </Menu>
  //       </Menu>
  //     )

  //     const menu = await MenuLocator.find(':label(Parent)')
  //     const trigger = await menu.findItem(':label(Flyout)')

  //     await trigger.click()

  //     const subMenu = await MenuLocator.find(':label(Flyout)')
  //     const popover = await subMenu.findPopoverContent()

  //     await wait(() => {
  //       expect(popover.containsFocus()).to.be.true()
  //     })

  //     await popover.keyUp('escape', {
  //       defaultPrevented: false,
  //       bubbles: true,
  //       button: 0
  //     })

  //     expect(
  //       await (
  //         await MenuLocator.find(':label(Flyout)')
  //       ).findPopoverContent({
  //         expectEmpty: true
  //       })
  //     ).to.not.exist()
  //   })

  //   it('it should close the sub-menu popover on left press', async () => {
  //     await mount(
  //       <Menu label="Parent">
  //         <Menu label="Flyout">
  //           <MenuItem>Foo</MenuItem>
  //           <MenuItem>Bar</MenuItem>
  //           <MenuItem>Baz</MenuItem>
  //         </Menu>
  //       </Menu>
  //     )

  //     const menu = await MenuLocator.find(':label(Parent)')
  //     const trigger = await menu.findItem(':label(Flyout)')

  //     await trigger.click()

  //     const subMenu = await MenuLocator.find(':label(Flyout)')
  //     const popover = await subMenu.findPopoverContent()

  //     await wait(() => {
  //       expect(popover.containsFocus()).to.be.true()
  //     })

  //     await popover.keyDown('left')

  //     expect(
  //       await subMenu.findPopoverContent({ expectEmpty: true })
  //     ).to.not.exist()
  //   })

  //   it('it should call onDismiss on tab press', async () => {
  //     const onDismiss = stub()

  //     await mount(
  //       <Menu label="Parent">
  //         <Menu label="Flyout" onDismiss={onDismiss}>
  //           <MenuItem>Foo</MenuItem>
  //           <MenuItem>Bar</MenuItem>
  //           <MenuItem>Baz</MenuItem>
  //         </Menu>
  //       </Menu>
  //     )

  //     const menu = await MenuLocator.find(':label(Parent)')
  //     const trigger = await menu.findItem(':label(Flyout)')

  //     await trigger.click()

  //     const subMenu = await MenuLocator.find(':label(Flyout)')
  //     const popover = await subMenu.findPopoverContent()

  //     await wait(() => {
  //       expect(popover.containsFocus()).to.be.true()
  //     })

  //     await popover.keyDown('tab')

  //     expect(onDismiss).to.have.been.called()
  //   })

  //   it('it should call onSelect when sub-menu popover option is selected', async () => {
  //     const onSelect = stub()

  //     await mount(
  //       <Menu label="Parent">
  //         <Menu label="Flyout" onSelect={onSelect}>
  //           <MenuItem>Foo</MenuItem>
  //           <MenuItem>Bar</MenuItem>
  //           <MenuItem>Baz</MenuItem>
  //         </Menu>
  //       </Menu>
  //     )

  //     const menu = await MenuLocator.find(':label(Parent)')
  //     const trigger = await menu.findItem(':label(Flyout)')

  //     await trigger.click()

  //     const subMenu = await MenuLocator.find(':label(Flyout)')
  //     const popover = await subMenu.findPopoverContent()

  //     await wait(() => {
  //       expect(popover.containsFocus()).to.be.true()
  //     })

  //     const menuItem = await popover.findItem(':label(Foo)')

  //     await menuItem.click()

  //     expect(onSelect).to.have.been.called()
  //   })

  //   // TODO: this test works locally but fails in CI so it's skipped for now
  //   // should be turned back on when these tests are moved to the new format (jest + testing library)
  //   it.skip('it should call onToggle on document click and on dismiss', async () => {
  //     const onToggle = stub()

  //     await mount(
  //       <Menu label="Parent">
  //         <Menu label="Flyout" onToggle={onToggle}>
  //           <MenuItem>Foo</MenuItem>
  //           <MenuItem>Bar</MenuItem>
  //           <MenuItem>Baz</MenuItem>
  //         </Menu>
  //       </Menu>
  //     )

  //     const menu = await MenuLocator.find(':label(Parent)')
  //     const trigger = await menu.findItem(':label(Flyout)')

  //     await trigger.click()

  //     expect(onToggle).to.have.been.called()
  //     expect(onToggle.getCall(0).args[0]).to.equal(true)

  //     const subMenu = await MenuLocator.find(':label(Flyout)')
  //     const popover = await subMenu.findPopoverContent()

  //     await wait(() => {
  //       expect(popover.containsFocus()).to.be.true()
  //     })

  //     onToggle.resetHistory()
  //     await wrapQueryResult(trigger.getOwnerDocument().documentElement).click()

  //     expect(onToggle).to.have.been.called()
  //     expect(onToggle.getCall(0).args[0]).to.equal(false)
  //   })

  //   it('it should call onMouseOver on hover', async () => {
  //     const onMouseOver = stub()

  //     /* eslint-disable jsx-a11y/mouse-events-have-key-events */

  //     await mount(
  //       <Menu label="Parent">
  //         <Menu label="Flyout" onMouseOver={onMouseOver}>
  //           <MenuItem>Foo</MenuItem>
  //           <MenuItem>Bar</MenuItem>
  //           <MenuItem>Baz</MenuItem>
  //         </Menu>
  //       </Menu>
  //     )
  //     /* eslint-enable jsx-a11y/mouse-events-have-key-events */

  //     const menu = await MenuLocator.find(':label(Parent)')
  //     const trigger = await menu.findItem(':label(Flyout)')

  //     await trigger.mouseOver()

  //     expect(onMouseOver).to.have.been.called()
  //   })
  })
})



// function testFocusFlyoutOnEvent(event: { type: string; which?: string }) {
//   it(`expect flyout menu to be focused on ${event.type} ${
//     event.which || ''
//   }`, async () => {
//     await mount(
//       <Menu label="Parent">
//         <Menu label="Flyout">
//           <MenuItem>Foo</MenuItem>
//           <MenuItem>Bar</MenuItem>
//           <MenuItem>Baz</MenuItem>
//         </Menu>
//       </Menu>
//     )

//     const menu = await MenuLocator.find(':label(Parent)')
//     const trigger = (await menu.findItem(':label(Flyout)')) as any

//     await trigger[event.type](event.which)

//     const subMenu = await MenuLocator.find(':label(Flyout)')
//     const popover = await subMenu.findPopoverContent()

//     await wait(() => {
//       expect(popover.containsFocus()).to.be.true()
//     })
//   })
// }
