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

import '../support/component'
import canvas from '@instructure/ui-themes'
import {
  DrawerLayoutContext,
  DrawerTray
} from '@instructure/ui-drawer-layout/src/DrawerLayout/v1'
import { InstUISettingsProvider } from '@instructure/emotion'

describe('<DrawerTray/>', () => {
  it('should render tray content when open', async () => {
    cy.mount(
      <DrawerTray
        label="DrawerTray Example"
        open={true}
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )
    cy.get('div[class$="-drawerTray__content"]').should(
      'have.text',
      'Hello from layout tray'
    )
  })

  it('should not render tray content when closed', async () => {
    cy.mount(
      <DrawerTray
        label="DrawerTray Example"
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )
    cy.get('div[class$="-drawerTray__content"]').should('not.exist')
  })

  it(`should place the tray correctly with placement=start`, async () => {
    cy.mount(
      <DrawerTray
        label="DrawerTray Example"
        open={true}
        placement="start"
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )
    cy.get('div[class$="-drawerTray__content"]')
      .parent()
      .should('have.css', 'left', '0px')
  })

  it(`should place the tray correctly with placement=end`, async () => {
    cy.mount(
      <DrawerTray
        label="DrawerTray Example"
        open={true}
        placement="end"
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )
    cy.get('div[class$="-drawerTray__content"]')
      .parent()
      .should('have.css', 'right', '0px')
  })

  it('should apply theme overrides when open', async () => {
    cy.mount(
      <DrawerTray
        label="DrawerTray Example"
        open={true}
        themeOverride={{ zIndex: 333 }}
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )
    cy.get('div[class$="-drawerTray__content"]')
      .parent()
      .should('have.css', 'z-index', '333')
  })

  it('drops a shadow if the prop is set, and it is overlaying content', async () => {
    const onEntered = cy.spy()
    cy.mount(
      <DrawerLayoutContext.Provider value={true}>
        <InstUISettingsProvider theme={canvas}>
          <DrawerTray
            label="DrawerTray Example"
            open={true}
            shadow={true}
            onEntered={onEntered}
            render={() => {
              return 'Hello from layout tray'
            }}
          />
        </InstUISettingsProvider>
      </DrawerLayoutContext.Provider>
    )
    cy.get('div[class*="-drawerTray--with-shadow"]').should(
      'have.css',
      'box-shadow'
    )
    cy.get('div[class*="-drawerTray--with-shadow"]').should(
      'not.have.css',
      'box-shadow',
      'none'
    )
  })
})
