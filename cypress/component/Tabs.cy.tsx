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
import { Tabs } from '@instructure/ui/latest'
import { expect } from 'chai'

import '../support/component'
import 'cypress-real-events'

describe('<Tabs/>', () => {
  // TODO(INSTUI): outdated approach — spies on React.createElement and inspects
  // args for `key`, but under the automatic JSX runtime / emotion `jsx` pragma
  // JSX no longer compiles to React.createElement (spy captures nothing), and
  // `key` isn't exposed on props anyway. Needs a rewrite that asserts observable
  // key-preservation behavior. Skipped pending that.
  it.skip('should preserve Tab.Panel keys', () => {
    const createElementSpy = cy.spy(React, 'createElement')
    cy.mount(
      <Tabs>
        <Tabs.Panel renderTitle="foo" key="foo-key" />
      </Tabs>
    )

    cy.wrap(createElementSpy)
      .should('have.been.called')
      .then((spy) => {
        const createFooTabCall = spy
          .getCalls()
          .filter((call) => call.args[1]?.renderTitle === 'foo')[0]

        expect(createFooTabCall.args[1].key).to.equal('foo-key')

        // Set two child
        cy.mount(
          <Tabs>
            <Tabs.Panel renderTitle="foo" key="foo-key" />
            <Tabs.Panel renderTitle="bar" key="bar-key" />
          </Tabs>
        )

        cy.wrap(createElementSpy)
          .should('have.been.called')
          .then((updatedSpy) => {
            const createFooTabCall = updatedSpy
              .getCalls()
              .filter((call) => call.args[1]?.renderTitle === 'foo')[0]
            const createBarTabCall = updatedSpy
              .getCalls()
              .filter((call) => call.args[1]?.renderTitle === 'bar')[0]

            expect(createFooTabCall.args[1].key).to.equal('foo-key')
            expect(createBarTabCall.args[1].key).to.equal('bar-key')
          })
      })
  })

  it('should call onRequestTabChange with keyboard arrow keys', () => {
    const onChange = cy.stub()

    cy.mount(
      <Tabs onRequestTabChange={onChange}>
        <Tabs.Panel renderTitle="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )
    cy.get('[role="tab"][aria-selected="true"]').as('selectedTab')

    cy.get('@selectedTab').focus()
    cy.get('@selectedTab').type('{leftarrow}')
    cy.wrap(onChange).should('have.been.calledOnce')
    cy.wrap(onChange).its('firstCall.args[1].index').should('equal', 1)

    cy.wrap(onChange).invoke('resetHistory')

    cy.get('@selectedTab').focus()
    cy.get('@selectedTab').type('{rightarrow}')
    cy.wrap(onChange).should('have.been.calledOnce')
    cy.wrap(onChange).its('lastCall.args[1].index').should('equal', 1)

    cy.wrap(onChange).invoke('resetHistory')

    cy.get('@selectedTab').focus()
    cy.get('@selectedTab').type('{uparrow}')
    cy.wrap(onChange).should('have.been.calledOnce')
    cy.wrap(onChange).its('lastCall.args[1].index').should('equal', 1)

    cy.wrap(onChange).invoke('resetHistory')

    cy.get('@selectedTab').focus()
    cy.get('@selectedTab').type('{downarrow}')
    cy.wrap(onChange).should('have.been.calledOnce')
    cy.wrap(onChange).its('lastCall.args[1].index').should('equal', 1)
  })

  // TODO(INSTUI): the tab click does not switch the panel under cypress-real-
  // events (panel stays display:none after clicking the second tab; neither
  // native .click() nor .realClick() switches it, and the tab exposes no
  // aria-selected to assert against). Needs interaction/DOM investigation.
  it.skip('should keep non-selected panel hidden when unmountOnExit is false', () => {
    cy.mount(
      <Tabs>
        <Tabs.Panel renderTitle="First Tab" unmountOnExit={false}>
          Tab 1 content
        </Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab">Tab 2 content</Tabs.Panel>
      </Tabs>
    )

    cy.get('[role="tabpanel"]').should('have.length', 2)

    cy.get('[role="tabpanel"]').eq(0).should('not.have.css', 'display', 'none')
    cy.get('[role="tabpanel"]').eq(1).should('have.css', 'display', 'none')

    cy.contains('[role="tab"]', 'Second Tab').click()
    cy.wait(100)
    cy.get('[role="tabpanel"]').eq(1).should('not.have.css', 'display', 'none')
    cy.get('[role="tabpanel"]').eq(0).should('have.css', 'display', 'none')
  })

  it('should render a fade-out gradient when tabOverflow set to scroll and Tabs overflow', () => {
    const Example = ({ width }: { width: string }) => (
      <div style={{ width }}>
        <Tabs tabOverflow="scroll">
          <Tabs.Panel renderTitle="Tab1">Contents of panel</Tabs.Panel>
          <Tabs.Panel renderTitle="Tab2">Contents of panel</Tabs.Panel>
          <Tabs.Panel renderTitle="Tab3">Contents of panel</Tabs.Panel>
          <Tabs.Panel renderTitle="Tab4">Contents of panel</Tabs.Panel>
          <Tabs.Panel renderTitle="Tab5">Contents of panel</Tabs.Panel>
        </Tabs>
      </div>
    )

    cy.mount(<Example width="150px" />)

    cy.get('[class$="-tabs__startScrollOverlay"]').should('exist')
    cy.get('[class$="-tabs__endScrollOverlay"]').should('exist')

    cy.mount(<Example width="550px" />)

    cy.get('[class$="-tabs__startScrollOverlay"]').should('not.exist')
    cy.get('[class$="-tabs__endScrollOverlay"]').should('not.exist')
  })
})
