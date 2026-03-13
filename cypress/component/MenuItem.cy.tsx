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

import { expect } from 'chai'
import 'cypress-real-events'

import '../support/component'
import { MenuItem } from '@instructure/ui/latest'

describe('<MenuItem />', () => {
  it('should call onSelect after SPACE key is pressed', () => {
    const onSelect = cy.spy()
    cy.mount(
      <MenuItem onSelect={onSelect} value="menu_item_value">
        Menu Item Text
      </MenuItem>
    )
    cy.contains('Menu Item Text')
      .type('{downarrow}')
      .then(() => {
        cy.wrap(onSelect)
          .should('have.been.calledOnce')
          .then((spy) => {
            expect(spy.getCall(0).args[1]).to.equal('menu_item_value')
            expect(spy.getCall(0).args[2]).to.equal(true)
          })
        cy.focused().realPress('Space')
      })
      .then(() => {
        cy.wrap(onSelect)
          .should('have.been.calledTwice')
          .then((spy) => {
            expect(spy.getCall(1).args[1]).to.equal('menu_item_value')
            expect(spy.getCall(1).args[2]).to.equal(false)
          })
      })
  })

  it('should call onSelect after ENTER key is pressed', () => {
    const onSelect = cy.spy()
    cy.mount(
      <MenuItem onSelect={onSelect} value="menu_item_value">
        Menu Item Text
      </MenuItem>
    )
    cy.contains('Menu Item Text')
      .type('{downarrow}')
      .then(() => {
        cy.wrap(onSelect)
          .should('have.been.calledOnce')
          .then((spy) => {
            expect(spy.getCall(0).args[1]).to.equal('menu_item_value')
            expect(spy.getCall(0).args[2]).to.equal(true)
          })
        cy.focused().realPress('Enter')
      })
      .then(() => {
        cy.wrap(onSelect)
          .should('have.been.calledTwice')
          .then((spy) => {
            expect(spy.getCall(1).args[1]).to.equal('menu_item_value')
            expect(spy.getCall(1).args[2]).to.equal(false)
          })
      })
  })

  it('should not be able to select when the disabled prop is set', () => {
    const onSelect = cy.spy()
    cy.mount(
      <MenuItem onSelect={onSelect} disabled>
        Menu Item Text
      </MenuItem>
    )
    const menuItem = cy.get('[role="menuitem"]')

    menuItem.should('exist')
    menuItem.should('have.attr', 'aria-disabled', 'true')
    menuItem.click({ force: true })
    menuItem.realPress('Enter')
    menuItem.realPress('Space')

    cy.wrap(onSelect).should('not.have.been.called')
  })
})
