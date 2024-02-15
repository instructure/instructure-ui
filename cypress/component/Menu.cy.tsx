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

import '../support/component'
import 'cypress-real-events'

import { Menu, MenuItem } from '../../packages/ui'

describe('<Menu/>', () => {
  it('should move focus properly', () => {
    cy.mount(
      <Menu label="Settings">
        <MenuItem value="Account">Item1</MenuItem>
        <MenuItem value="Account">Item2</MenuItem>
      </Menu>
    )

    cy.contains('[role="menuitem"]', 'Item1').should('not.have.focus')
    cy.contains('[role="menuitem"]', 'Item2').should('not.have.focus')
    cy.get('[role="menu"]').focus()

    cy.focused().realPress('ArrowDown')
    cy.contains('[role="menuitem"]', 'Item1').should('have.focus')

    cy.focused().realPress('ArrowDown')
    cy.contains('[role="menuitem"]', 'Item2').should('have.focus')

    cy.focused().realPress('ArrowUp')
    cy.contains('[role="menuitem"]', 'Item1').should('have.focus')
  })

  it('should focus the menu first', () => {
    cy.mount(
      <Menu trigger={<button>More</button>} defaultShow>
        <MenuItem>Learning Mastery</MenuItem>
        <MenuItem disabled>Gradebook</MenuItem>
      </Menu>
    )

    cy.get('[role="menu"]').should('be.focused').and('have.attr', 'tabIndex', '0')
    cy.focused().realPress('ArrowDown')
    cy.get('[role="menuitem"]:first').should('be.focused')
    cy.get('[role="menu"]').should('have.attr', 'tabIndex', '0')
  })

  it('should apply offset values to Popover', () => {
    const getTransforms = (transform: string) => {
      const transformValues = new DOMMatrixReadOnly(transform)
      return {
        transformX: Math.floor(transformValues.m41),
        transformY: Math.floor(transformValues.m42)
      }
    }
    cy.mount(
      <Menu trigger={<button>Trigger</button>} offsetX={-10} offsetY="30px">
      <MenuItem>Menu Item</MenuItem>
      <MenuItem disabled>Gradebook</MenuItem>
    </Menu>
    )

    cy.contains('Trigger').realClick().wait(100)
    cy.get('body').should('contain', 'Menu Item')
    cy.get('[data-position-content^="Menu_"]')
      .then(($menu) => {
        const offsetTransform = getComputedStyle($menu[0]).transform
        const { transformX: offsetTransformX, transformY: offsetTransformY } = getTransforms(offsetTransform)

        cy.wrap(offsetTransformX).should('equal', 18)
        cy.wrap(offsetTransformY).should('equal', 59)
      })
  })

  xit('should apply offset values to Popover', () => {
    let defaultTransformX
    let defaultTransformY

    const getTransforms = (transform: string) => {
      const transformValues = new DOMMatrixReadOnly(transform)
      return {
        transformX: Math.floor(transformValues.m41),
        transformY: Math.floor(transformValues.m42)
      }
    }

    cy.mount(
      <Menu trigger={<button>More</button>}>
        <MenuItem>Learning Mastery</MenuItem>
        <MenuItem disabled>Gradebook</MenuItem>
      </Menu>
    )
    cy.contains('button', 'More')
      .realClick()
      .then(() => {
        cy.get('[data-position-content^="Menu_"]').then(($menu) => {
          const defaultTransform = getComputedStyle($menu[0]).transform
          const defaultTransforms = getTransforms(defaultTransform)
          defaultTransformX = defaultTransforms.transformX
          defaultTransformY = defaultTransforms.transformY
        })
      })
      .then(() => {
        cy.mount(
          <Menu trigger={<button>More</button>} offsetX={-10} offsetY="30px">
            <MenuItem>Menu Item</MenuItem>
            <MenuItem disabled>Gradebook</MenuItem>
          </Menu>
        )
        cy.wait(1500).then(() => {
          cy.contains('button', 'More')
            .realClick()
            .then(() => {
              cy.wait(1500).then(() => {
                cy.get('[data-position-content^="Menu_"]').then(($newMenu) => {
                  const newTransform = getComputedStyle($newMenu[0]).transform
                  const {
                    transformX: newTransformX,
                    transformY: newTransformY
                  } = getTransforms(newTransform)
                  // use wrap instead
                  expect(newTransformX).to.equal(defaultTransformX + 10)
                  expect(newTransformY).to.equal(defaultTransformY + 30)
                })
              })
            })
        })
      })
  })

  describe('Menu with a sub-menu', () => {
    describe('...and keyboard and mouse interaction', () => {
      it(`should show and focus flyout menu on click Copy of the MenuSingle test`, () => {
        cy.mount(
          <Menu label="Parent">
            <Menu label="Flyout">
              <MenuItem>Flyout Menu Item</MenuItem>
              <MenuItem>Bar</MenuItem>
              <MenuItem>Baz</MenuItem>
            </Menu>
          </Menu>
        )
        cy.contains('Flyout')
          .click()
          .then(() => {
            cy.contains('Flyout Menu Item').should('exist')
            cy.get('[role="menu"]').should('be.focused')
          })
      })

      it(`should show and focus flyout menu on click`, () => {
        cy.mount(
          <Menu label="Parent">
            <Menu label="Flyout">
              <MenuItem>Flyout Menu Item</MenuItem>
              <MenuItem>Bar</MenuItem>
              <MenuItem>Baz</MenuItem>
            </Menu>
          </Menu>
        )

        cy.contains('Flyout').realHover().wait(100)
        cy.contains('Flyout Menu Item').should('be.visible')
        cy.contains('Flyout').click()
        cy.get('body').should('not.contain', 'Flyout Menu Item')
        cy.contains('Flyout').click()
        cy.contains('Flyout Menu Item').should('be.visible')
        cy.get('[role="menu"]').should('be.focused')
      })

      it(`should show and focus flyout menu on right arrow keyDown`, () => {
        cy.mount(
          <Menu label="Parent">
            <Menu label="Flyout">
              <MenuItem>Flyout Menu Item</MenuItem>
              <MenuItem>Bar</MenuItem>
              <MenuItem>Baz</MenuItem>
            </Menu>
          </Menu>
        )

        cy.contains('Flyout').focus()
        cy.focused().realPress('ArrowRight').wait(100)
        cy.contains('Flyout Menu Item').should('exist')
        cy.get('[role="menu"]').should('be.focused')
      })

      it(`should show and focus flyout menu on space keyDown`, () => {
        cy.mount(
          <Menu label="Parent">
            <Menu label="Flyout">
              <MenuItem>Flyout Menu Item</MenuItem>
              <MenuItem>Bar</MenuItem>
              <MenuItem>Baz</MenuItem>
            </Menu>
          </Menu>
        )

        cy.contains('Flyout').focus()
        cy.focused().type('Space').wait(100)
        cy.contains('Flyout Menu Item').should('exist')
        cy.get('[role="menu"]').should('be.focused')
      })

      it(`should show and focus flyout menu on enter keyDown`, () => {
        cy.mount(
          <Menu label="Parent">
            <Menu label="Flyout">
              <MenuItem>Flyout Menu Item</MenuItem>
              <MenuItem>Bar</MenuItem>
              <MenuItem>Baz</MenuItem>
            </Menu>
          </Menu>
        )

        cy.contains('Flyout').focus()
        cy.focused().realPress('Enter').wait(100)
        cy.contains('Flyout Menu Item').should('exist')
        cy.get('[role="menu"]').should('be.focused')
      })

      it(`should focus flyout menu on mouseOver`, () => {
        cy.mount(
          <Menu label="Parent">
            <Menu label="Flyout">
              <MenuItem>Flyout Menu Item</MenuItem>
              <MenuItem>Bar</MenuItem>
              <MenuItem>Baz</MenuItem>
            </Menu>
          </Menu>
        )

        cy.contains('Flyout').focus()
        cy.focused().realHover().wait(100)
        cy.get('[role="menu"]').should('be.focused')
      })
    })

    it('it should not open the sub-menu popover when disabled', () => {
      cy.mount(
        <Menu label="Parent" disabled>
          <Menu label="Flyout">
            <MenuItem>Flyout Menu Item</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      cy.contains('Flyout').realClick()
      cy.get('body').should('not.contain', 'Flyout Menu Item')
    })

    it('it should close the sub-menu popover on escape press', () => {
      cy.mount(
        <Menu label="Parent">
          <Menu label="Flyout">
            <MenuItem>Flyout Menu Item</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      cy.contains('Flyout').focus()
      cy.focused().realHover().wait(100)
      cy.contains('Flyout Menu Item').should('be.visible')
      cy.focused().realPress('Escape')
      cy.get('body').should('not.contain', 'Flyout Menu Item')
    })

    it('it should close the sub-menu popover on left press', () => {
      cy.mount(
        <Menu label="Parent">
          <Menu label="Flyout">
            <MenuItem>Flyout Menu Item</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      cy.contains('Flyout').realHover().wait(100)
      cy.contains('Flyout Menu Item').should('be.visible')
      cy.focused().realPress('ArrowLeft')
      cy.get('body').should('not.contain', 'Flyout Menu Item')
    })

    it('it should call onDismiss on tab press', () => {
      const onDismiss = cy.spy()

      cy.mount(
        <Menu label="Parent">
          <Menu label="Flyout" onDismiss={onDismiss}>
            <MenuItem>Flyout Menu Item</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      cy.contains('Flyout').realHover().wait(100)
      cy.contains('Flyout Menu Item').should('be.visible')
      cy.focused().realPress('Tab')
      cy.get('body').should('not.contain', 'Flyout Menu Item')
      cy.wrap(onDismiss).should('have.been.called')
    })

    it('it should call onSelect when sub-menu popover option is selected', () => {
      const onSelect = cy.spy()

      cy.mount(
        <Menu label="Parent">
          <Menu label="Flyout" onSelect={onSelect}>
            <MenuItem>Flyout Menu Item</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      cy.contains('Flyout').realHover().wait(100)
      cy.contains('Flyout Menu Item').should('be.visible')
      cy.contains('Flyout Menu Item').realClick()
      cy.get('body').should('not.contain', 'Flyout Menu Item')
      cy.wrap(onSelect).should('have.been.called')
    })

    it('it should call onToggle on document click and on dismiss', () => {
      const onToggle = cy.spy()

      cy.mount(
        <Menu label="Parent">
          <Menu label="Flyout" onToggle={onToggle}>
            <MenuItem>Flyout Menu Item</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      cy.contains('Flyout').realHover().wait(100)
      cy.contains('Flyout Menu Item').should('be.visible')
      cy.wrap(onToggle).should('have.been.calledWith', true)

      onToggle.resetHistory()

      cy.get('body').click(0, 0)
      cy.wrap(onToggle).should('have.been.calledWith', false)
    })

    it('it should call onMouseOver on hover', () => {
      const onMouseOver = cy.spy()

      cy.mount(
        <Menu label="Parent">
          <Menu label="Flyout" onMouseOver={onMouseOver}>
            <MenuItem>Flyout Menu Item</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      cy.contains('Flyout').realHover().wait(100)
      cy.contains('Flyout Menu Item').should('be.visible')
      cy.wrap(onMouseOver).should('have.been.called')
    })
  })
})
