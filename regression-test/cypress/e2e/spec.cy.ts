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
 */ describe('regression test', () => {
  it('open dialog subpage', () => {
    cy.visit('http://localhost:3000')
    cy.get('a').contains('dialog').click()
    cy.get('button').click()
    cy.get('body').should('contain', 'Full name')
    cy.get('[class$="closeButton"]').click()
  })

  it('open alert subpage', () => {
    cy.visit('http://localhost:3000')
    cy.get('a').contains('alert').click()
    cy.get('body').should('contain', 'Sample info text')
  })

  it('open breadcrumb subpage', () => {
    cy.visit('http://localhost:3000')
    cy.get('a').contains('breadcrumb').click()
    cy.get('body').should('contain', 'Rabbit Is Rich')
    cy.get('body').contains('The Rabbit Novels').click()
    const redirect = 'https://instructure.design'
    cy.origin(redirect, { args: { redirect } }, ({ redirect }) => {
      cy.location().should((loc) => {
        loc.href.includes(redirect)
      })
    })
  })
})
