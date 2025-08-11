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

import type { Result, RunOnly } from 'axe-core'

type ConsoleErrorStub = Cypress.Agent<sinon.SinonStub<any[], any>>
let windowErrorSpy: ConsoleErrorStub | undefined

Cypress.on('window:before:load', (win) => {
  // Stub console.error before your application code runs
  // This allows you to capture errors even if they happen very early
  windowErrorSpy = cy.stub(win.console, 'error')
})

afterEach(() => {
  // After each test, assert that console.error was not called
  // Add a small wait if your application might log errors asynchronously
  cy.wait(100).then(() => {
    expect(windowErrorSpy).to.not.be.called
  })
})

// log fn taken from https://www.npmjs.com/package/cypress-axe
function terminalLog(violations: Result[]) {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  )
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length
    })
  )

  cy.task('table', violationData)
}

const axeOptions: { runOnly: RunOnly } = {
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'section508', 'best-practice']
  }
}

describe('visual regression test', () => {
  it('check button', () => {
    cy.visit('http://localhost:3000/button')
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('check alert', () => {
    cy.visit('http://localhost:3000/alert')
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('check avatar', () => {
    cy.visit('http://localhost:3000/avatar')
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })
})
