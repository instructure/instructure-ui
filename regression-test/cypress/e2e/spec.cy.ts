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
    expect(windowErrorSpy).to.have.callCount(0)
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
    values: ['wcag2a', 'wcag2aa', 'section508']
  }
}

describe('visual regression test', () => {
  it('Metric, Pill, Tag, TimeSelect', () => {
    cy.visit('http://localhost:3000/small-components')
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Alert', () => {
    cy.visit('http://localhost:3000/alert')
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Avatar', () => {
    cy.visit('http://localhost:3000/avatar')
    cy.wait(300) // images render a frame later, Chromatic needs a bit more delay
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Badge', () => {
    cy.visit('http://localhost:3000/badge')
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Billboard', () => {
    cy.visit('http://localhost:3000/billboard')
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Breadcrumb', () => {
    cy.visit('http://localhost:3000/breadcrumb')
    cy.wait(300) // wait for text to be truncated
    //TODO There are a11y issues, fix INSTUI-4676 before uncommenting
    //cy.injectAxe()
    //cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Button and derivatives', () => {
    cy.visit('http://localhost:3000/button')
    cy.wait(100)
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Byline', () => {
    cy.visit('http://localhost:3000/byline')
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Calendar', () => {
    cy.visit('http://localhost:3000/calendar')
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Checkbox', () => {
    cy.visit('http://localhost:3000/checkbox')
    cy.wait(100) // needed so checkbox dont trigger axe check fails
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Checkboxgroup', () => {
    cy.visit('http://localhost:3000/checkboxgroup')
    cy.wait(300)
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('ColorPicker', () => {
    cy.visit('http://localhost:3000/colorpicker')
    cy.wait(300)
    cy.injectAxe()
    // TODO: Fix ARIA violations before enabling a11y check
    // - aria-allowed-attr (critical): 1 node
    // - aria-prohibited-attr (serious): 3 nodes
    // ColorMixer has aria-disabled on plain div without proper role
    // cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Contextview', () => {
    cy.visit('http://localhost:3000/contextview')
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Dateinput, DateInput2', () => {
    cy.visit('http://localhost:3000/dateinput')
    cy.wait(400)
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('DateTimeInput', () => {
    cy.visit('http://localhost:3000/datetimeinput')
    cy.wait(400)
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Drilldown', () => {
    cy.visit('http://localhost:3000/drilldown')
    cy.wait(300) // Drilldown dropdown renders a frame later, Chromatic needs a bit more delay
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Filedrop', () => {
    cy.visit('http://localhost:3000/filedrop')
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Form errors', () => {
    cy.visit('http://localhost:3000/form-errors')
    cy.wait(300)
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Heading', () => {
    cy.visit('http://localhost:3000/heading')
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Img', () => {
    cy.visit('http://localhost:3000/img')
    cy.wait(100) // images may render a frame later
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Link', () => {
    cy.visit('http://localhost:3000/link')
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Menu', () => {
    cy.visit('http://localhost:3000/menu')
    cy.wait(300)
    // TODO Fix INSTUI-4677 before enabling this
    //cy.injectAxe()
    //cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Options', () => {
    cy.visit('http://localhost:3000/options')
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Pagination', () => {
    cy.visit('http://localhost:3000/pagination')
    cy.wait(400) // needed so tooltips dont trigger axe check fails
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Progressbar', () => {
    cy.visit('http://localhost:3000/progressbar')
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Select, SimpleSelect', () => {
    cy.visit('http://localhost:3000/select')
    cy.wait(300)
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Table', () => {
    cy.visit('http://localhost:3000/table')
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Tabs', () => {
    cy.visit('http://localhost:3000/tabs')
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('Tooltip', () => {
    cy.visit('http://localhost:3000/tooltip')
    cy.wait(300) // tooltips render a frame later, Chromatic needs a bit more delay
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('TreeBrowser', () => {
    cy.visit('http://localhost:3000/treebrowser')
    cy.wait(600) // large timeout is needed for CI (to finish animation?)
    // TODO axe fails with color contrast issues, try to remove animations from TreeBrowser
    //cy.injectAxe()
    //cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })

  it('View', () => {
    cy.visit('http://localhost:3000/view')
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })
})
