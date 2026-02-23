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

describe('<DrilldownOption/>', () => {
  it('should allow controlled behaviour', async () => {
    const options = ['one', 'two', 'three']
    const Example = ({
      opts,
      selected
    }: {
      opts: typeof options
      selected: string
    }) => {
      return (
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0">
              {opts.map((opt) => {
                return (
                  <Drilldown.Option
                    key={opt}
                    value={opt}
                    name={opt}
                    id={opt}
                    selected={selected === opt}
                  >
                    {opt}
                  </Drilldown.Option>
                )
              })}
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )
    }
    cy.mount(<Example opts={options} selected="two" />)

    cy.get('[role="menuitem"]')
      .eq(0)
      .should('have.attr', 'aria-checked', 'false')
    cy.get('[role="menuitem"]')
      .eq(1)
      .should('have.attr', 'aria-checked', 'true')
    cy.get('[role="menuitem"]')
      .eq(2)
      .should('have.attr', 'aria-checked', 'false')

    cy.mount(<Example opts={options} selected="three" />)

    cy.get('[role="menuitem"]')
      .eq(0)
      .should('have.attr', 'aria-checked', 'false')
    cy.get('[role="menuitem"]')
      .eq(1)
      .should('have.attr', 'aria-checked', 'false')
    cy.get('[role="menuitem"]')
      .eq(2)
      .should('have.attr', 'aria-checked', 'true')
  })

  it('should navigate to subPage on select', async () => {
    cy.mount(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option01" subPageId="page1">
            Option01
          </Drilldown.Option>
        </Drilldown.Page>
        <Drilldown.Page id="page1">
          <Drilldown.Option id="option11">Sub-Option</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.contains('Sub-Option').should('not.exist')
    cy.contains('Option01').should('be.visible')

    cy.get('#option01').click()

    cy.contains('Sub-Option').should('be.visible')
    cy.contains('Option01').should('not.exist')
  })

  it('should disabled prop apply disabled css style', async () => {
    cy.mount(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option1" disabled>
            Option
          </Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('#option1')
      .should('have.attr', 'aria-disabled', 'true')
      .and('have.css', 'cursor', 'not-allowed')
  })

  it('should navigate to url on Focus + Space', async () => {
    cy.mount(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option1" href="#helloWorld">
            Option
          </Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('#option1').focus().realPress('Space')

    cy.url().should('include', '#helloWorld')
  })

  it('should navigate to url on Click', async () => {
    cy.mount(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option1" href="#helloWorld">
            Option
          </Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('#option1').realClick()
    cy.url().should('include', '#helloWorld')
  })

  it("shouldn't navigate to url, if disabled", async () => {
    cy.mount(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option1" href="#helloWorld" disabled>
            Option
          </Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('#option1').realClick()

    cy.url().should('not.include', '#helloWorld')
  })

  it('should renderLabelInfo prop affected by afterLabelContentVAlign prop', async () => {
    cy.mount(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0">
          <Drilldown.Option
            id="option1"
            renderLabelInfo="Info"
            afterLabelContentVAlign="end"
          >
            Option
          </Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.contains('[class$=-drilldown__optionLabelInfo]', 'Info').should(
      'have.css',
      'align-self',
      'flex-end'
    )
  })

  it('should provide goToPreviousPage method that goes back to the previous page', async () => {
    cy.mount(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option01" subPageId="page1">
            Option01
          </Drilldown.Option>
        </Drilldown.Page>

        <Drilldown.Page id="page1">
          <Drilldown.Option
            id="option11"
            onOptionClick={(_e, { goToPreviousPage }) => {
              goToPreviousPage()
            }}
          >
            Option11
          </Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.contains('Option01').should('be.visible')

    cy.get('#option01').click()

    cy.contains('Option01').should('not.exist')
    cy.contains('Option11').should('be.visible')

    cy.get('#option11').click()

    cy.contains('Option01').should('be.visible')
    cy.contains('Option11').should('not.exist')
  })

  it('should provide goToPage method that can be used to go back a page', async () => {
    cy.mount(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option01" subPageId="page1">
            Option01
          </Drilldown.Option>
        </Drilldown.Page>

        <Drilldown.Page id="page1">
          <Drilldown.Option
            id="option11"
            onOptionClick={(_e, { pageHistory, goToPage }) => {
              goToPage(pageHistory[0])
            }}
          >
            Option11
          </Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.contains('Option01').should('be.visible')

    cy.get('#option01').click()

    cy.contains('Option01').should('not.exist')
    cy.contains('Option11').should('be.visible')

    cy.get('#option11').click()

    cy.contains('Option01').should('be.visible')
    cy.contains('Option11').should('not.exist')
  })

  it('should provide goToPage method that can be used to go to a new, existing page', async () => {
    cy.mount(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0">
          <Drilldown.Option
            id="option01"
            onOptionClick={(_e, { goToPage }) => {
              goToPage('page1')
            }}
          >
            Option01
          </Drilldown.Option>
        </Drilldown.Page>

        <Drilldown.Page id="page1">
          <Drilldown.Option id="option11">Option11</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.contains('Option01').should('be.visible')

    cy.get('#option01').click()

    cy.contains('Option01').should('not.exist')
    cy.contains('Option11').should('be.visible')
  })

  it('should themeOverride prop passed to the Options.Item component', async () => {
    cy.mount(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0">
          <Drilldown.Option
            id="option01"
            themeOverride={{
              color: 'rgb(0, 0, 100)',
              background: 'rgb(200, 200, 200)'
            }}
          >
            Option01
          </Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.contains('li[class$="-optionItem"]', 'Option01')
      .should('have.css', 'color', 'rgb(0, 0, 100)')
      .and('have.css', 'backgroundColor', 'rgb(200, 200, 200)')
  })
})
