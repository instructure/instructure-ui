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

function terminalLog(violations: Result[]) {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected.`
  )

  violations.map(({ id, impact, description, nodes }) => {
    cy.task('table', {
      id,
      impact,
      description,
      summary: nodes[0].failureSummary
    })
    const ret: any = {}
    cy.task('log', 'This error happens in the following elements:')
    nodes.forEach((item, index) => {
      ret[`${item.target.join(',')}`] = { html: item.html }
    })
    cy.task('table', ret)
  })
}

const axeOptions: { runOnly: RunOnly } = {
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'section508']
  }
}

const BASE_URL = 'http://localhost:3000'

// Themes to capture. Each page is screenshotted once per theme (see the
// `?theme=` handling in src/app/layout.tsx). Adding a theme here multiplies the
// screenshot/baseline count by one.
const THEMES = ['canvas', 'light', 'dark'] as const

type PageSpec = {
  // URL segment and page directory under src/app/<slug>/page.tsx
  slug: string
  // Human-readable Cypress test title
  title: string
  // Extra settle time (ms) for pages with async/animated content
  wait?: number
  // Run the axe a11y check for this page (default true). Some pages have known
  // issues tracked separately and opt out until fixed.
  a11y?: boolean
  // Reason/ticket for skipping a11y, for the record
  a11ySkipReason?: string
}

const PAGES: PageSpec[] = [
  { slug: 'small-components', title: 'Metric, Pill, Tag, TimeSelect, Text' },
  { slug: 'alert', title: 'Alert' },
  { slug: 'avatar', title: 'Avatar', wait: 300 },
  { slug: 'badge', title: 'Badge' },
  { slug: 'billboard', title: 'Billboard' },
  {
    slug: 'breadcrumb',
    title: 'Breadcrumb',
    wait: 300,
    a11y: false,
    a11ySkipReason: 'INSTUI-4676'
  },
  { slug: 'button', title: 'Button and derivatives', wait: 100 },
  { slug: 'byline', title: 'Byline' },
  { slug: 'calendar', title: 'Calendar' },
  { slug: 'checkbox', title: 'Checkbox', wait: 100 },
  { slug: 'checkboxgroup', title: 'Checkboxgroup', wait: 300 },
  {
    slug: 'colorpicker',
    title: 'ColorPicker',
    wait: 300,
    a11y: false,
    a11ySkipReason:
      'ColorMixer ARIA violations (aria-allowed-attr, aria-prohibited-attr)'
  },
  { slug: 'contextview', title: 'Contextview' },
  { slug: 'custom-icons', title: 'Custom and Lucide icons' },
  { slug: 'dateinput', title: 'Dateinput, DateInput2', wait: 400 },
  { slug: 'datetimeinput', title: 'DateTimeInput', wait: 400 },
  { slug: 'drilldown', title: 'Drilldown', wait: 300 },
  { slug: 'filedrop', title: 'Filedrop' },
  { slug: 'form-errors', title: 'Form errors', wait: 300 },
  { slug: 'heading', title: 'Heading' },
  { slug: 'img', title: 'Img', wait: 100 },
  { slug: 'link', title: 'Link' },
  {
    slug: 'menu',
    title: 'Menu',
    wait: 300,
    a11y: false,
    a11ySkipReason: 'INSTUI-4677'
  },
  { slug: 'options', title: 'Options' },
  { slug: 'pagination', title: 'Pagination', wait: 400 },
  { slug: 'progressbar', title: 'Progressbar' },
  { slug: 'select', title: 'Select, SimpleSelect', wait: 300 },
  { slug: 'table', title: 'Table' },
  { slug: 'tabs', title: 'Tabs' },
  { slug: 'tooltip', title: 'Tooltip', wait: 300 },
  {
    slug: 'treebrowser',
    title: 'TreeBrowser',
    wait: 1000,
    a11y: false,
    a11ySkipReason: 'axe color-contrast failures; animations'
  },
  { slug: 'view', title: 'View' }
]

const SCREENSHOT_OPTIONS = {
  capture: 'fullPage',
  overwrite: true,
  disableTimersAndAnimations: true
} as const

describe('visual regression test', () => {
  PAGES.forEach(({ slug, title, wait, a11y = true }) => {
    it(title, () => {
      // Track a11y violations across all themes so a violation in one theme does
      // not abort the others (skipFailures below). We assert the total at the end
      // to keep a11y as a gate while still capturing every screenshot.
      let violationCount = 0

      THEMES.forEach((theme) => {
        cy.visit(`${BASE_URL}/${slug}?theme=${theme}`)
        // Wait until the requested theme has actually been applied before doing
        // anything else (layout.tsx sets data-theme in an effect after mount).
        cy.get(`html[data-theme="${theme}"]`)
        if (wait) {
          cy.wait(wait)
        }

        const name = `${slug}-${theme}`
        cy.task('recordMeta', { name, pagePath: `/${slug}` }, { log: false })
        // Wait until web fonts have finished loading before capturing. Otherwise
        // the screenshot can be taken mid-load, when text is still rendered in a
        // fallback font with different metrics — producing inconsistent, flaky
        // baselines.
        cy.document({ log: false }).then((doc) => doc.fonts.ready)
        // Screenshot BEFORE the a11y check so an a11y failure can never leave a
        // page without a visual baseline.
        cy.screenshot(name, SCREENSHOT_OPTIONS)

        if (a11y) {
          cy.injectAxe()
          cy.checkA11y(
            '.axe-test',
            axeOptions,
            (violations) => {
              terminalLog(violations)
              violationCount += violations.length
            },
            // skipFailures: don't throw here — collect and assert once at the end
            true
          )
        }
      })

      if (a11y) {
        cy.then(() => {
          expect(
            violationCount,
            'total a11y violations across themes'
          ).to.equal(0)
        })
      }
    })
  })
})
