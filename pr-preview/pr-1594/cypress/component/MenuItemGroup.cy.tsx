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
import { expect } from 'chai'
import 'cypress-real-events'

import '../support/component'
import { MenuItem, MenuItemGroup, MenuItemSeparator } from '../../packages/ui'

describe('<MenuItemGroup />', () => {
  it('updates the selected items when allowMultiple is true', () => {
    const onSelect = cy.spy()
    cy.mount(
      <MenuItemGroup label="Group Label" allowMultiple onSelect={onSelect}>
        <MenuItem>First Menu Item</MenuItem>
        <MenuItem>Second Menu Item</MenuItem>
        <MenuItemSeparator />
      </MenuItemGroup>
    )
    cy.contains('First Menu Item')
      .realClick()
      .then(() => {
        cy.get('[role="menuitemcheckbox"]')
          .eq(0)
          .should('have.attr', 'aria-checked', 'true')
        cy.get('[role="menuitemcheckbox"]')
          .eq(1)
          .should('have.attr', 'aria-checked', 'false')

        cy.wrap(onSelect)
          .should('have.been.calledOnce')
          .then((spy) => {
            expect(spy.getCall(0).args[1]).to.deep.equal([0])
            expect(spy.getCall(0).args[2]).to.equal(true)
          })
      })

    cy.contains('Second Menu Item')
      .realClick()
      .then(() => {
        cy.get('[role="menuitemcheckbox"]')
          .eq(0)
          .should('have.attr', 'aria-checked', 'true')
        cy.get('[role="menuitemcheckbox"]')
          .eq(1)
          .should('have.attr', 'aria-checked', 'true')

        cy.wrap(onSelect)
          .should('have.been.calledTwice')
          .then((spy) => {
            expect(spy.getCall(1).args[1]).to.deep.equal([0, 1])
            expect(spy.getCall(1).args[2]).to.equal(true)
          })
      })

    cy.contains('First Menu Item')
      .realClick()
      .then(() => {
        cy.get('[role="menuitemcheckbox"]')
          .eq(0)
          .should('have.attr', 'aria-checked', 'false')
        cy.get('[role="menuitemcheckbox"]')
          .eq(1)
          .should('have.attr', 'aria-checked', 'true')

        cy.wrap(onSelect)
          .should('be.calledThrice')
          .then((spy) => {
            expect(spy.getCall(2).args[1]).to.deep.equal([1])
            expect(spy.getCall(2).args[2]).to.equal(false)
          })
      })
  })

  it('updates the selected items when allowMultiple is false', () => {
    const onSelect = cy.spy()
    cy.mount(
      <MenuItemGroup label="Group Label" onSelect={onSelect}>
        <MenuItem>First Menu Item</MenuItem>
        <MenuItem>Second Menu Item</MenuItem>
        <MenuItemSeparator />
      </MenuItemGroup>
    )

    cy.contains('First Menu Item')
      .realClick()
      .then(() => {
        cy.get('[role="menuitemradio"]')
          .eq(0)
          .should('have.attr', 'aria-checked', 'true')
        cy.get('[role="menuitemradio"]')
          .eq(1)
          .should('have.attr', 'aria-checked', 'false')

        cy.wrap(onSelect)
          .should('have.been.calledOnce')
          .then((spy) => {
            expect(spy.getCall(0).args[1]).to.deep.equal([0])
            expect(spy.getCall(0).args[2]).to.equal(true)
          })
      })

    cy.contains('Second Menu Item')
      .realClick()
      .then(() => {
        cy.get('[role="menuitemradio"]')
          .eq(0)
          .should('have.attr', 'aria-checked', 'false')
        cy.get('[role="menuitemradio"]')
          .eq(1)
          .should('have.attr', 'aria-checked', 'true')

        cy.wrap(onSelect)
          .should('have.been.calledTwice')
          .then((spy) => {
            expect(spy.getCall(1).args[1]).to.deep.equal([1])
            expect(spy.getCall(1).args[2]).to.equal(true)
          })
      })
  })
})
