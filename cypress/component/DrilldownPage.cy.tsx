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

import 'cypress-real-events'

import { Drilldown } from '@instructure/ui/latest'
import '../support/component'

describe('<DrilldownPage/>', () => {
  it('should have a back arrow in header back navigation', async () => {
    cy.mount(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option1" subPageId="page2">
            Option01
          </Drilldown.Option>
        </Drilldown.Page>
        <Drilldown.Page id="page2" renderBackButtonLabel="HeaderBackString">
          <Drilldown.Option id="option2">Option22</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )

    cy.get('#option1').click()

    cy.contains('li[class$="-optionItem"]', 'HeaderBackString')
      .find('svg[name="IconArrowOpenStart"]')
      .should('exist')
  })

  it('should still display the back icon in header back navigation, even if function has no return value', async () => {
    cy.mount(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0" renderTitle="Page Title">
          <Drilldown.Option id="option1" subPageId="page2">
            Option01
          </Drilldown.Option>
        </Drilldown.Page>
        <Drilldown.Page id="page2" renderBackButtonLabel={() => null}>
          <Drilldown.Option id="option2">Option22</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('#option1').click()

    cy.get('div[role="menu"]')
      .find('svg[name="IconArrowOpenStart"]')
      .should('exist')
  })

  it('should fire onBackButtonClicked on header back navigation click', async () => {
    const backNavCallback = cy.spy()
    cy.mount(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0" renderTitle="Page Title">
          <Drilldown.Option id="option1" subPageId="page2">
            Option01
          </Drilldown.Option>
        </Drilldown.Page>
        <Drilldown.Page id="page2" onBackButtonClicked={backNavCallback}>
          <Drilldown.Option id="option2">Option22</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('#option1').click()

    cy.contains('li[class$="-optionItem"]', 'Back').click()

    cy.wrap(backNavCallback).should('have.been.called')
  })

  it('should go back one page on click', async () => {
    cy.mount(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0" renderTitle="Page Title">
          <Drilldown.Option id="option1" subPageId="page2">
            Option01
          </Drilldown.Option>
        </Drilldown.Page>
        <Drilldown.Page id="page2">
          <Drilldown.Option id="option2">Option22</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.contains('Option01').should('be.visible')

    cy.get('#option1').click()

    cy.contains('Option01').should('not.exist')

    cy.contains('li[class$="-optionItem"]', 'Back').click()

    cy.contains('Option01').should('be.visible')
  })
})
