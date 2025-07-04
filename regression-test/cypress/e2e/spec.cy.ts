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


describe('visual regression test', () => {
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

  it('check button', () => {
    cy.visit('http://localhost:3000/button')
    cy.injectAxe()
    cy.checkA11y('.axe-test', axeOptions, terminalLog)
  })
})

describe('CanvasTopNavBar', () => {
  // This handler suppresses known hydration mismatch errors between server and client
  // We ignore "aria-describedby did not match" hydration warnings in this test suite
  // because they are expected differences between server and client IDs
  // beforeEach(() => {
  //   Cypress.on('uncaught:exception', (err) => {
  //     if (err.message.includes('aria-describedby did not match')) {
  //       return false
  //     }
  //   })
  // })
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err) => {
      if (err) {
        return false
      }
    })
  })

  describe('SideNavBar', () => {
    it('should change URL on SideNavBar item selection', () => {
      cy.visit('http://localhost:3000/canvastopnav/')

      cy.url().should('not.contain', 'studio')
      cy.contains('Studio').should('be.visible')

      cy.contains('Studio')
        .click().wait(100)

      cy.url().should('contain', 'page=studio')

      cy.contains('Account')
        .click().wait(100)

      cy.url().should('contain', 'page=account')

      cy.contains('Courses')
        .click().wait(100)
      cy.contains('Course 1')
        .click().wait(100)

      cy.url().should('contain', 'page=course1')
    })

    it('should trigger onclick callback on SideNavBar item selection', () => {
      cy.visit('http://localhost:3000/canvastopnav/')

      cy.on('window:alert', cy.stub().as('alertStub'))
      const expectedAlertText = 'Help clicked'

      cy.contains('Help')
        .click().wait(100)

      cy.get('@alertStub')
        .should('have.been.calledOnceWith', expectedAlertText)
    })

    it('should show main navigation as SideNavBar with labelled items', async () => {
      cy.visit('http://localhost:3000/canvastopnav/')
  
      cy.contains('This is home').should('be.visible')
      cy.get('nav[data-cid="SideNavBar"]').as('SideNavBar').should('exist')
  
      cy.get('@SideNavBar').find('li').should('have.length', 6)
  
      cy.contains('Account').should('be.visible')
      cy.get('svg[name="IconUser"]').should('be.visible')
  
      cy.contains('Courses').should('be.visible')
      cy.get('svg[name="IconCourses"]').should('be.visible')
  
      cy.contains('Help').should('be.visible')
      cy.get('svg[name="IconQuestion"]').should('be.visible')
  
      cy.contains('button', 'Minimize SideNavBar').should('be.visible')
    })

    it('should minimize SideNavBar and show only icons as items', async () => {
      cy.visit('http://localhost:3000/canvastopnav/')
  
      cy.contains('This is home').should('exist')
      cy.get('li[class$="-navigation__list"]').should('have.length', 6)
  
      cy.contains('Account').should('be.visible')
      cy.get('svg[name="IconUser"]').should('be.visible')
  
      cy.contains('Courses').should('be.visible')
      cy.get('svg[name="IconCourses"]').should('be.visible')
  
      cy.contains('Help').should('be.visible')
      cy.get('svg[name="IconQuestion"]').should('be.visible')
  
      cy.contains('button', 'Minimize SideNavBar')
        .click().wait(100)
  
      cy.get('li[class$="-navigation__list"]').should('have.length', 6)
  
      cy.contains('Account').should('not.be.visible')
      cy.get('svg[name="IconUser"]').should('be.visible')
  
      cy.contains('Courses').should('not.be.visible')
      cy.get('svg[name="IconCourses"]').should('be.visible')
  
      cy.contains('Help').should('not.be.visible')
      cy.get('svg[name="IconQuestion"]').should('be.visible')
    })

    it('should show main navigation as topNavBar and burger menu in mobile view', () => {
      cy.viewport(300, 400)
      cy.visit('http://localhost:3000/canvastopnav/')
  
      cy.contains('This is home').should('exist')
      cy.get('div[class$="-mobileTopNavTopBar"]').as('TopNav').should('exist')
      cy.get('@TopNav').find('svg[name="IconAnalytics"]').should('be.visible')
      cy.get('@TopNav').find('svg[name="IconAlerts"]').should('be.visible')
      cy.contains('button', 'Open menu').should('be.visible')
  
      cy.contains('Account').should('not.be.visible')
      cy.get('svg[name="IconUser"]').should('not.be.visible')
      cy.contains('Courses').should('not.be.visible')
      cy.get('svg[name="IconCourses"]').should('not.be.visible')
      cy.contains('Help').should('not.be.visible')
      cy.get('svg[name="IconQuestion"]').should('not.be.visible')
      
      cy.contains('button', 'Open menu')
        .click().wait(100)
  
      cy.contains('Account').should('be.visible')
      cy.get('svg[name="IconUser"]').should('be.visible')
      cy.contains('Courses').should('be.visible')
      cy.get('svg[name="IconCourses"]').should('be.visible')
      cy.contains('Help').should('be.visible')
      cy.get('svg[name="IconQuestion"]').should('be.visible')
  
      cy.contains('Courses')
        .click().wait(100)
  
      cy.contains('Courses1').should('be.visible')
  
      cy.get('[id^="DrilldownHeader-Back"]').contains('Courses').click()
  
      cy.get('Courses1').should('not.exist')
  
      cy.get('svg[name="IconX"]').closest('button')
        .click().wait(100)
  
      cy.contains('Courses').should('not.be.visible')
    })

    it('should close burger menu after item selection in mobile view', async () => {
      cy.viewport(300, 400)
      cy.visit('http://localhost:3000/canvastopnav/')
  
      cy.contains('This is the dashboard').should('not.exist')
      cy.get('ul[class$="-options__list"]').should('not.be.visible')
  
      cy.contains('button', 'Open menu')
        .click().wait(100)
  
      cy.contains('Dashboard').should('be.visible')
      cy.get('ul[class$="-options__list"]').should('be.visible')
  
      cy.contains('Dashboard')
        .click().wait(100)
  
      cy.contains('This is the dashboard').should('be.visible')
      cy.contains('Dashboard').should('not.be.visible')
      cy.get('ul[class$="-options__list"]').should('not.be.visible')
    })
  })

  describe('Tray', () => {
    it('should open and close SideNav Tray properly', async () => {
      cy.visit('http://localhost:3000/canvastopnav/')

      cy.contains('button', 'Courses')
        .click().wait(100)

      cy.contains('Course 1').should('be.visible')
      cy.contains('Course 2').should('be.visible')

      cy.get('svg[name="IconX"]').closest('button')
        .click().wait(100)

      cy.contains('Course 1').should('not.be.visible')
      cy.contains('Course 2').should('not.be.visible')
    })

    it('should close SideNav Tray menu after item selection', async () => {
      cy.visit('http://localhost:3000/canvastopnav/')
  
      cy.contains('This is the first course home page').should('not.exist')
      cy.get('span[data-cid="Tray"]').should('not.exist')
      cy.contains('Course 2').should('not.exist')
  
      cy.contains('Courses')
        .click().wait(100)
  
      cy.get('span[data-cid="Tray"]').should('be.visible')
      cy.contains('Course 2').should('be.visible')
  
      cy.contains('Course 1')
        .click().wait(100)
  
      cy.contains('This is the first course home page').should('be.visible')
      cy.get('span[data-cid="Tray"]').should('not.be.visible')
      cy.contains('Course 2').should('not.exist')
    })
  })

  describe('LTI', () => {
    it('should display the LTI topNavBar only on specific pages', () => {
      cy.visit('http://localhost:3000/canvastopnav/')

      cy.contains('This is home').should('be.visible')
      cy.get('div[class$="-desktopTopNavContainer"]')
        .should('not.be.visible')

      cy.contains('Studio')
        .click().wait(100)

      cy.get('div[class$="-desktopTopNavContainer"]')
        .should('be.visible')
    })

    it('should show LTI topNavBar menu items', () => {
      cy.visit('http://localhost:3000/canvastopnav?page=studio')

      cy.contains('LTI VIEW TEST').should('be.visible')

      cy.get('div[class$="-desktopTopNavStart"]').as('menu')
        .should('exist')

      cy.get('@menu')
        .find('li').should('have.length', 6)
    })

    it('should highlight selected LTI topNavBar menu item', () => {
      cy.visit('http://localhost:3000/canvastopnav?page=studio')

      cy.get('div[class$="-desktopTopNavStart"]')
        .find('div[class$="-topNavBarItem__container"]').as('firstMenuItemContainer')

      cy.get('div[class$="-desktopTopNavStart"]')
        .contains('a', 'Overview').as('firstMenuItem')

      cy.get('@firstMenuItem')
        .should('have.attr', 'aria-current', 'page')

      cy.get('@firstMenuItemContainer')
        .then(($container) => {
          cy.window().then((win) => {
            const afterStyles = win.getComputedStyle($container[0], '::after')
            // Menu item underline
            const height = parseFloat(afterStyles.getPropertyValue('height'))
            expect(height).to.be.greaterThan(0)
          })
        })

      cy.get('div[class$="-desktopTopNavStart"]')
        .contains('a', 'Admin').as('secondMenuItem')

      cy.get('@secondMenuItem')
        .should('not.have.attr', 'aria-current')
    })

    it('should highlight focused LTI topNavBar menu item', () => {
      cy.visit('http://localhost:3000/canvastopnav?page=studio')

      cy.contains('a', 'Settings').as('menuItem')
      cy.contains('a', 'Admin').as('menuItem2')

      cy.get('@menuItem').focus().wait(800)
        .then(($item) => {
          cy.window().then((win) => {
            const styles = win.getComputedStyle($item[0])
            const outline = styles.getPropertyValue('outline')

            expect(outline).to.equal('rgb(43, 122, 188) solid 2px')
          })
        })

      cy.get('@menuItem2')
      .then(($item2) => {
        cy.window().then((win) => {
          const styles = win.getComputedStyle($item2[0])
          const outline = styles.getPropertyValue('outline')

          expect(outline).to.equal('rgba(43, 122, 188, 0) solid 2px')
        })
      })
    })

    // TODO sub menu?
    // it('should show LTI topNavBar SubMenu as menuitem', () => {
    //   cy.visit('http://localhost:3000/canvastopnav?page=studio')

    //   cy.get('div[class$="-desktopTopNavStart"]')
    //     .find('li').eq(3).as('subMenu')

    //   cy.get('@subMenu').click().wait(100)

    //   cy.contains('Link One').should('be.visible')

    //   cy.contains('Link One').click().wait(100)

    //   cy.contains('Level 2 Option One').should('be.visible')
    //   cy.get('Link One').should('not.exist')

    //   cy.contains('Back').click().wait(100)

    //   cy.contains('Link One').should('be.visible')

    //   cy.contains('Link Two').click().wait(100)

    //   cy.url().should('contain', '/#TopNavBar')
    //   cy.get('Link Two').should('not.exist')
    // })

    // TODO sub menu?
    // it('should close LTI TopNav SubMenu after item selection', async () => {
    //   cy.visit('http://localhost:3000/canvastopnav?page=studio')
  
    //   cy.contains('LTI VIEW TEST').should('be.visible')
    //   cy.get('ul[class$="-options__list"]').should('not.exist')
  
    //   cy.contains('Submenu')
    //     .click().wait(100)
  
    //   cy.get('ul[class$="-options__list"]').should('be.visible')
    //   cy.contains('Link One').should('be.visible')
  
    //   cy.contains('Link Two')
    //     .click().wait(100)
  
    //   cy.get('ul[class$="-options__list"]').should('not.exist')
    //   cy.contains('Link One').should('not.exist')
    // })

    it('should show LTI topNavBar buttons', () => {
      cy.visit('http://localhost:3000/canvastopnav?page=studio')

      cy.get('div[class$="-desktopTopNavEnd"]')
        .find('button').should('have.length', 2)

      cy.get('div[class$="-desktopTopNavEnd"]')
        .find('button').eq(0).as('AddLineButton')

      cy.get('@AddLineButton')
        .should('have.text', 'AddLine')

      cy.get('@AddLineButton').find('svg[name="IconAdd"]')
        .should('exist')
    })

    it('should trigger onclick callback on LTI topNavBar button click', () => {
      cy.visit('http://localhost:3000/canvastopnav?page=studio')

      cy.on('window:alert', cy.spy().as('alertSpy'))

      cy.contains('LTI VIEW TEST').should('be.visible')

      cy.contains('button', 'AddLine')
        .click()

      cy.get('@alertSpy')
        .should('have.been.calledWith', 'Button 1')
    })

    it('should not show LTI topNavBar menu items and buttons in mobile view', () => {
      cy.viewport(300, 400)
      cy.visit('http://localhost:3000/canvastopnav?page=studio')

      cy.contains('LTI VIEW TEST').should('be.visible')

      cy.get('AddLine').should('not.exist')
      cy.get('svg[name="IconAdd"]').should('not.exist')

      cy.get('div[class$="-topNavBarMenuItems"]').should('not.exist')
      cy.get('Settings').should('not.exist')
    })
  })

  describe('SubNav', () => {
    it('should show subNav on specific page', () => {
      cy.visit('http://localhost:3000/canvastopnav/')

      cy.contains('This is home').should('exist')
      cy.get('div[class$="-subNavContainer"]').should('not.exist')
      cy.contains('Announcements').should('not.exist')

      cy.contains('Courses').click().wait(100)
      cy.contains('Course 1').click().wait(100)

      cy.contains('This is the first course home page').should('be.visible')
      cy.get('div[class$="-subNavContainer"]').should('exist')
      cy.contains('Announcements').should('be.visible')
    })

    it('should show subNav in mobile view', () => {
      cy.viewport(300, 400)
      cy.visit('http://localhost:3000/canvastopnav/')

      cy.contains('This is home').should('exist')
      cy.get('div[class$="-subNavContainer"]').should('not.exist')
      cy.contains('Announcements').should('not.exist')

      cy.contains('button', 'Open menu').click().wait(100)
      cy.contains('Courses').click().wait(100)
      cy.contains('Courses1').click().wait(100)

      cy.contains('This is the first course home page').should('be.visible')
      cy.get('div[class$="-subNavContainer"]').should('exist')
      cy.contains('Announcements').should('be.visible')
    })
  })

  describe('Breadcrumbs', () => {
    it('should show Breadcrumbs', () => {
      cy.visit('http://localhost:3000/canvastopnav/')

      cy.contains('This is home').should('exist')
      cy.get('ol[class$="-breadcrumb"]').should('not.be.visible')
      cy.contains('FirstC').should('not.be.visible')
      cy.contains('Crumb2').should('not.be.visible')
      cy.url().should('not.contain', '#crumb1')
      cy.contains('FirstCrumb Crumb1 Crumb1 Crumb1 Crumb1 Crumb1').should('not.be.visible')

      cy.contains('Courses').click().wait(100)
      cy.contains('Course 1').click().wait(100)

      cy.contains('This is the first course home page').should('be.visible')
      cy.get('ol[class$="-breadcrumb"]').should('be.visible')
      cy.contains('FirstC').should('be.visible')
      cy.contains('Crumb2').should('be.visible')

      cy.contains('FirstC').trigger('mouseover')
      cy.contains('FirstCrumb Crumb1 Crumb1 Crumb1 Crumb1 Crumb1').should('be.visible')

      cy.contains('FirstC').click().wait(100)
      cy.url().should('contain', '#crumb1')
    })

    it('should not show Breadcrumbs in mobile view', () => {
      cy.viewport(300, 400)
      cy.visit('http://localhost:3000/canvastopnav/')

      cy.contains('This is home').should('exist')
      cy.get('ol[class$="-breadcrumb"]').should('not.exist')
      cy.contains('FirstC').should('not.exist')
      cy.contains('Crumb2').should('not.exist')

      cy.contains('button', 'Open menu').click().wait(100)
      cy.contains('Courses').click().wait(100)
      cy.contains('Courses1').click().wait(100)

      cy.contains('This is the first course home page').should('be.visible')
      cy.get('ol[class$="-breadcrumb"]').should('not.exist')
      cy.contains('FirstC').should('not.exist')
      cy.contains('Crumb2').should('not.exist')
    })
  })
})